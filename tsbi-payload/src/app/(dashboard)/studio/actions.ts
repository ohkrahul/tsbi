'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getPayloadClient } from '@/lib/payload-client'
import { currentUser } from '@/lib/auth'
import { parseFields } from '@/lib/form-data'
import { collectionBySlug, searchableFields, WRITABLE } from '@/lib/collections'

export type ActionState = { error?: string; ok?: boolean } | null

// Server actions are public endpoints — every write goes through this. Throws
// rather than redirecting, so the form can show the message.
async function assertUser() {
  const user = await currentUser()
  if (!user) throw new Error('Unauthorized')
  return user
}

export type Suggestion = { id: string; title: string; sub: string }

/**
 * Autocomplete for the list search boxes: the handful of documents matching
 * what has been typed so far, labelled with the same columns the list shows.
 * Read-only, but still behind the auth check — a server action is a public
 * endpoint regardless of who can reach the page that calls it.
 */
export async function suggest(slug: string, q: string): Promise<Suggestion[]> {
  const def = collectionBySlug(slug)
  const term = q.trim()
  // One letter matches most of the table; not worth a round trip.
  if (!def || term.length < 2) return []
  await assertUser()

  const fields = searchableFields(def)
  if (!fields.length) return []

  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: slug as never,
    limit: 7,
    depth: 0,
    sort: def.defaultSort ?? '-createdAt',
    where: { or: fields.map((name) => ({ [name]: { like: term } })) } as never,
  })

  const [titleKey, ...rest] = def.columns.map((c) => c.key)
  return docs.map((doc) => {
    const d = doc as Record<string, unknown>
    return {
      id: String(d.id),
      title: String(d[titleKey] ?? 'Untitled'),
      sub: rest
        .map((k) => d[k])
        .filter((v): v is string => typeof v === 'string' && v !== '')
        .join(' · '),
    }
  })
}

/** Create (no `__id`) or update a document, then bounce back to the list. */
export async function saveDoc(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const slug = String(fd.get('__collection') ?? '')
  const id = String(fd.get('__id') ?? '')
  const def = collectionBySlug(slug)
  if (!def) return { error: `Unknown collection "${slug}"` }

  try {
    await assertUser()
    const payload = await getPayloadClient()
    const data = parseFields(def.fields, fd) as never
    if (id) await payload.update({ collection: slug as never, id, data })
    else await payload.create({ collection: slug as never, data })
  } catch (e) {
    return { error: (e as Error).message }
  }

  revalidatePath(`/studio/${slug}`)
  redirect(`/studio/${slug}?saved=1`)
}

export async function deleteDoc(fd: FormData) {
  const slug = String(fd.get('__collection') ?? '')
  const id = String(fd.get('__id') ?? '')
  if (!WRITABLE.has(slug) || !id) throw new Error('Bad delete request')

  const user = await assertUser()
  const payload = await getPayloadClient()

  // Losing every account means losing the studio — there's no /admin to fall
  // back to any more.
  if (slug === 'users') {
    const blocked =
      String(user.id) === id
        ? 'You cannot delete the account you are signed in with.'
        : (await payload.count({ collection: 'users' })).totalDocs <= 1
          ? 'This is the last account — the studio would be locked out.'
          : null
    if (blocked) redirect(`/studio/users?error=${encodeURIComponent(blocked)}`)
  }

  await payload.delete({ collection: slug as never, id })

  revalidatePath(`/studio/${slug}`)
  redirect(`/studio/${slug}?deleted=1`)
}

export async function uploadMedia(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const files = fd.getAll('file').filter((f): f is File => f instanceof File && f.size > 0)
  if (!files.length) return { error: 'Choose at least one file.' }

  try {
    await assertUser()
    const payload = await getPayloadClient()
    const alt = String(fd.get('alt') ?? '').trim()
    for (const file of files) {
      await payload.create({
        collection: 'media',
        data: { alt: alt || file.name },
        file: { data: Buffer.from(await file.arrayBuffer()), mimetype: file.type, name: file.name, size: file.size },
      })
    }
  } catch (e) {
    return { error: (e as Error).message }
  }

  revalidatePath('/studio/media')
  return { ok: true }
}

export async function login(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const email = String(fd.get('email') ?? '').trim()
  const password = String(fd.get('password') ?? '')
  if (!email || !password) return { error: 'Email and password are required.' }

  let token: string | undefined
  try {
    const payload = await getPayloadClient()
    ;({ token } = await payload.login({ collection: 'users', data: { email, password } }))
  } catch {
    return { error: 'Invalid email or password.' }
  }
  if (!token) return { error: 'Login failed — no token returned.' }

  ;(await cookies()).set('payload-token', token, {
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })
  redirect('/studio')
}

/**
 * Start a password reset. Always reports success, whether or not the address
 * exists — telling an anonymous caller which emails are registered is an
 * account-enumeration leak. Payload mails the reset link through the
 * configured email adapter; with none configured it writes it to the server
 * log, so see the CLI escape hatch in `npm run reset:password`.
 */
export async function requestPasswordReset(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const email = String(fd.get('email') ?? '').trim()
  if (!email) return { error: 'Enter the email address on your account.' }

  try {
    const payload = await getPayloadClient()
    await payload.forgotPassword({ collection: 'users', data: { email }, disableEmail: false })
  } catch (e) {
    // A missing account throws; that must look identical to a real send.
    console.warn('[studio] password reset request failed:', (e as Error).message)
  }
  return { ok: true }
}

/** Finish a reset with the emailed token. */
export async function resetPassword(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const token = String(fd.get('token') ?? '').trim()
  const password = String(fd.get('password') ?? '')
  const confirm = String(fd.get('confirm') ?? '')

  if (!token) return { error: 'This reset link is missing its token — request a new one.' }
  if (password.length < 8) return { error: 'Use at least 8 characters.' }
  if (password !== confirm) return { error: 'The two passwords do not match.' }

  try {
    const payload = await getPayloadClient()
    await payload.resetPassword({ collection: 'users', data: { token, password }, overrideAccess: true })
  } catch {
    return { error: 'That reset link is invalid or has expired. Request a new one.' }
  }
  redirect('/login?reset=1')
}

export async function logout() {
  ;(await cookies()).delete('payload-token')
  // Straight to /login: bouncing through /studio would re-use the signed-in
  // layout for one render and flash the sidebar at a signed-out user.
  redirect('/login')
}
