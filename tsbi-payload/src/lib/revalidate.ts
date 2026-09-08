import type { CollectionConfig } from 'payload'

/**
 * Tell the website to drop its cache for a collection the moment it changes,
 * so an edit is live immediately instead of within the ISR window.
 *
 * The CMS calls this itself on every save and delete — an editor should never
 * have to remember to press a "publish" button, which is the one step people
 * forget and then report the site as broken.
 *
 * Deliberately best-effort: a website that is down, redeploying or missing the
 * secret must never make a save fail. When the call doesn't land, the site's
 * own timed revalidation still picks the change up within the minute, so the
 * worst case is the behaviour we had before this existed.
 */
async function ping(collection: string) {
  const site = process.env.FRONTEND_URL
  const secret = process.env.REVALIDATE_SECRET
  if (!site || !secret) return

  try {
    const res = await fetch(new URL('/api/revalidate', site), {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-revalidate-secret': secret },
      body: JSON.stringify({ collection }),
      // Awaited rather than fired and forgotten, because a serverless
      // invocation can be frozen the moment it responds and kill an
      // in-flight request. Capped so a hanging site can't hang a save.
      signal: AbortSignal.timeout(4000),
    })
    if (!res.ok) console.warn(`[revalidate] ${collection}: site returned ${res.status}`)
  } catch (e) {
    console.warn(`[revalidate] ${collection}: ${(e as Error).message}`)
  }
}

/**
 * Spread into a collection's `hooks`. The slug is passed in rather than read
 * off the hook argument so it is always the collection you are looking at.
 */
export const revalidateHooks = (collection: string): CollectionConfig['hooks'] => ({
  afterChange: [
    async () => {
      await ping(collection)
    },
  ],
  afterDelete: [
    async () => {
      await ping(collection)
    },
  ],
})
