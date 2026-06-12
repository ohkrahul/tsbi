import { NextRequest, NextResponse } from 'next/server';

// In-memory cache — survives the server lifetime, resets on redeploy
const cache = new Map<string, string | null>();

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');
  const type = req.nextUrl.searchParams.get('type') || 'reel';

  if (!code) return NextResponse.json({ thumb: null });

  const key = `${type}_${code}`;
  if (cache.has(key)) return NextResponse.json({ thumb: cache.get(key) ?? null });

  // Instagram public oEmbed — works without a token for most public accounts
  const igPath = type === 'reel' ? 'reel' : 'p';
  const oembedUrl = `https://www.instagram.com/oembed/?url=https://www.instagram.com/${igPath}/${code}/&omitscript=true`;

  try {
    const resp = await fetch(oembedUrl, {
      headers: {
        'User-Agent': 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
      },
      signal: AbortSignal.timeout(6000),
    });

    if (resp.ok) {
      const json = (await resp.json()) as { thumbnail_url?: string };
      const thumb = json.thumbnail_url ?? null;
      cache.set(key, thumb);
      return NextResponse.json({ thumb });
    }
  } catch { /* network error or timeout — fall through */ }

  cache.set(key, null);
  return NextResponse.json({ thumb: null });
}
