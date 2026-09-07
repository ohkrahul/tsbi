/**
 * Editors paste links, not IDs. The public site still wants a bare 11-char
 * YouTube ID in `youtube` and a plain image URL in `image`, so the studio
 * normalizes on the way in.
 */

const YT_IN_URL =
  /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?(?:[^#]*&)?v=|embed\/|shorts\/|live\/|v\/))([A-Za-z0-9_-]{11})/
const BARE_ID = /^[A-Za-z0-9_-]{11}$/

/** An 11-char YouTube ID from a watch/share/embed/shorts/live link, or a bare ID. */
export function youtubeId(input: string | null | undefined): string | null {
  const s = String(input ?? '').trim()
  if (!s) return null
  return s.match(YT_IN_URL)?.[1] ?? (BARE_ID.test(s) ? s : null)
}

/** The thumbnail the public site already uses for YouTube-backed covers. */
export const youtubeThumb = (id: string) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`

/**
 * Cover image value. A pasted YouTube link becomes its thumbnail; anything else
 * (a /tech path, a Blob URL, a normal image URL) is kept verbatim. Falls back to
 * the thumbnail of the video on the same document when left blank.
 */
export function coverImageUrl(input: string | null | undefined, fallbackVideo?: string | null): string | null {
  const s = String(input ?? '').trim()
  if (s) {
    const id = s.match(YT_IN_URL)?.[1]
    return id ? youtubeThumb(id) : s
  }
  const fallback = youtubeId(fallbackVideo)
  return fallback ? youtubeThumb(fallback) : null
}
