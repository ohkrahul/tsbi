/**
 * Migrate the hand-authored service-page copy into the CMS, then the pages read
 * from Payload instead of a hardcoded array.
 *
 * For each entry in tsbi/src/lib/serviceCampaigns.ts:
 *   - tick the service on the matching case study (matched by caseStudySlug),
 *   - store copy that genuinely differs from the case study's own fields as
 *     `cardHeadline` / `cardBlurb` / `youtubeFilms`. Copy that merely repeats
 *     the title or concept is left out, because the card falls back to those —
 *     duplicating it would create two sources of truth for the same sentence.
 *   - create a case study for entries that never had one.
 *
 * Idempotent. Run:  npm run seed:cards
 */
import { getPayload } from 'payload'
import config from '@payload-config'
import { campaigns, youtubeWork } from '../../tsbi/src/lib/serviceCampaigns'

const payload = await getPayload({ config })

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80)
// Compare on letters and digits only: the hand-written copy and the CMS copy
// differ by a few curly apostrophes and dashes, which shouldn't count as
// "different text" and earn a duplicate stored blurb.
const norm = (s: string | null | undefined) => (s ?? '').toLowerCase().replace(/[^a-z0-9]/g, '')

const { docs } = await payload.find({ collection: 'case-studies', limit: 1000, depth: 0 })
type Study = Record<string, unknown> & { id: number | string; slug?: string }
const bySlug = new Map<string, Study>(
  docs.map((d) => [String((d as unknown as Study).slug ?? ''), d as unknown as Study]),
)

const stats = { updated: 0, created: 0, skipped: 0, headlines: 0, blurbs: 0, films: 0, cleared: 0 }

/** Merge a service + any genuinely-new card copy onto one study. */
async function applyTo(study: Study, service: string, card: {
  headline?: string
  blurb?: string
  films?: string[]
  video?: string
  poster?: string
}) {
  const data: Record<string, unknown> = {}

  const areas = (study.serviceAreas as string[] | null) ?? []
  if (!areas.includes(service)) data.serviceAreas = [...areas, service]

  // Only store copy the fallback can't already produce — and clear anything a
  // previous run stored that the fallback now covers, so a sentence never has
  // two homes.
  const headlineIsNew = Boolean(card.headline) && norm(card.headline) !== norm(study.title as string)
  if (headlineIsNew && !study.cardHeadline) {
    data.cardHeadline = card.headline
    stats.headlines++
  } else if (!headlineIsNew && study.cardHeadline) {
    data.cardHeadline = null
    stats.cleared++
  }

  const blurbIsNew =
    Boolean(card.blurb) &&
    norm(card.blurb) !== norm(study.concept as string) &&
    norm(card.blurb) !== norm(study.shortDescription as string)
  if (blurbIsNew && !study.cardBlurb) {
    data.cardBlurb = card.blurb
    stats.blurbs++
  } else if (!blurbIsNew && study.cardBlurb) {
    data.cardBlurb = null
    stats.cleared++
  }
  if (card.films && card.films.length > 1 && !((study.youtubeFilms as string[] | null) ?? []).length) {
    data.youtubeFilms = card.films
    stats.films++
  }
  if (card.video && !study.youtube) data.youtube = card.video
  if (card.poster && !study.image) data.image = card.poster

  if (!Object.keys(data).length) {
    stats.skipped++
    return
  }
  await payload.update({ collection: 'case-studies', id: study.id, data: data as never })
  stats.updated++
}

// ── Content Production ───────────────────────────────────────────────────────
for (const c of campaigns) {
  if (!c.caseStudySlug) {
    console.warn(`  ! content-production entry with no case study: ${c.client} — ${c.title}`)
    continue
  }
  const study = bySlug.get(c.caseStudySlug)
  if (!study) {
    console.warn(`  ! slug not in CMS: ${c.caseStudySlug}`)
    continue
  }
  await applyTo(study, 'content-production', {
    headline: c.title,
    blurb: c.desc,
    films: c.videos,
    video: c.videos[0],
    poster: c.poster,
  })
}

// ── Social Media ─────────────────────────────────────────────────────────────
for (const w of youtubeWork) {
  const existing = w.caseStudySlug ? bySlug.get(w.caseStudySlug) : undefined
  if (existing) {
    await applyTo(existing, 'social-media', {
      headline: w.title,
      blurb: w.desc,
      video: w.videoId,
    })
    continue
  }

  // Never had a case study — make one so the card survives the migration.
  const slug = w.caseStudySlug ?? slugify(`${w.house ?? w.client}-${w.title}`)
  if (bySlug.has(slug)) continue
  const created = await payload.create({
    collection: 'case-studies',
    data: {
      title: w.client,
      slug,
      clientName: w.house ?? w.client,
      category: w.category,
      track: 'film',
      order: 100,
      cardHeadline: w.title,
      cardBlurb: w.desc,
      youtube: w.videoId,
      image: `https://img.youtube.com/vi/${w.videoId}/hqdefault.jpg`,
      serviceAreas: ['social-media'],
    } as never,
  })
  bySlug.set(slug, created as unknown as Study)
  stats.created++
  console.log(`  + created case study "${slug}" for ${w.client}`)
}

console.log(
  `Service cards seeded → updated: ${stats.updated}, created: ${stats.created}, already current: ${stats.skipped}` +
    ` | copy stored: ${stats.headlines} headlines, ${stats.blurbs} blurbs, ${stats.films} film lists` +
    ` | redundant copy cleared: ${stats.cleared}`,
)
process.exit(0)
