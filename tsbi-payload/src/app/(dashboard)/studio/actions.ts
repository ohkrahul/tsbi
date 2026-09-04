'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getPayloadClient } from '@/lib/payload-client'
import { currentUser } from '@/lib/auth'
import { parseFields } from '@/lib/form-data'
import { collectionBySlug, WRITABLE } from '@/lib/collections'

export type ActionState = { error?: string; ok?: boolean } | null

// Server actions are public endpoints — every write goes through this. Throws
// rather than redirecting, so the form can show the message.
async function assertUser() {
  const user = await currentUser()
  if (!user) throw new Error('Unauthorized')
  return user
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

export async function logout() {
  ;(await cookies()).delete('payload-token')
  redirect('/studio')
}
