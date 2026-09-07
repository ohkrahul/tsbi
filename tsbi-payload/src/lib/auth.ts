import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayloadClient } from './payload-client'

/**
 * The logged-in Payload user, or null.
 *
 * Reads the httpOnly `payload-token` cookie and hands it to Payload as a
 * bearer token rather than passing the raw request headers through: Payload's
 * cookie strategy only trusts a cookie when the request's `Origin` is listed
 * in `config.csrf`, and a browser sends no `Origin` on a plain navigation, so
 * `auth({ headers })` never authenticates a /studio page load. Writes are
 * still origin-checked — Next verifies Origin/Host on every server action.
 *
 * Server-only, and deliberately outside the `'use server'` actions module so
 * it isn't also exposed as a callable server action.
 */
export async function currentUser() {
  const token = (await cookies()).get('payload-token')?.value
  if (!token) return null
  const payload = await getPayloadClient()
  const { user } = await payload.auth({ headers: new Headers({ Authorization: `JWT ${token}` }) })
  return user
}

/**
 * Page guard. Every /studio page that touches data calls this *first* — an
 * early return in the layout is not enough, because Next renders page
 * segments even when the layout drops `children`, which would put their data
 * in the RSC payload of an unauthenticated response.
 *
 * Sends people to /login rather than a route under the studio layout: Next
 * reuses a layout across navigations inside it, so a signed-out redirect that
 * stayed under the shell left the authenticated sidebar on screen.
 */
export async function requireUser() {
  const user = await currentUser()
  if (!user) redirect('/login')
  return user
}
