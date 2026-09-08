import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

/**
 * Cache-clearing hook for the CMS. Payload calls this on every save and
 * delete (see tsbi-payload/src/lib/revalidate.ts), so an edit is live at once
 * rather than within the ISR window.
 *
 * It clears cache tags, not paths: one case study shows up on /case-studies,
 * its own page, the service pages, /clients and the home page, and listing
 * those by hand is a list that goes stale the first time someone adds a
 * section. Everything reading a collection carries its tag, so clearing the
 * tag reaches all of it.
 */
export async function POST(req: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  // Without a secret configured this endpoint would let anyone dump the
  // cache, so it stays closed rather than open.
  if (!secret) return NextResponse.json({ error: 'not configured' }, { status: 503 });

  // In a header, not the query string, so it stays out of access logs.
  if (req.headers.get('x-revalidate-secret') !== secret) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const body = (await req.json().catch(() => ({}))) as { collection?: string };
  // No collection named (a manual call, say) clears everything from the CMS.
  const tag = body.collection ? `cms:${body.collection}` : 'cms';
  // Next 16 wants a cache-life profile. Passing the expire window explicitly
  // rather than a named profile: an unknown name is accepted silently and
  // falls back to the default, so the name gives no guarantee. A long window
  // means the purge is remembered for any entry that could still be cached
  // (our fetches only live 60s, so this covers all of them).
  revalidateTag(tag, { expire: 31_536_000 });

  return NextResponse.json({ revalidated: tag, now: Date.now() });
}
