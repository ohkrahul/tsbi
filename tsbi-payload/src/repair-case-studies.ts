/**
 * Refill case-study fields that are empty in the CMS from the bundled source in
 * tsbi/src/lib/caseStudies.ts.
 *
 * Only touches fields that are currently null/empty, so editor changes are
 * never overwritten — it fills blanks, it doesn't reset. Written after a
 * partial form submission blanked several columns on one study; the `__fields`
 * guard in lib/form-data.ts stops that recurring.
 *
 * Run:  npm run repair:case-studies
 */
import { getPayload } from 'payload'
import config from '@payload-config'
import { caseStudies } from '../../tsbi/src/lib/caseStudies'

const payload = await getPayload({ config })

// Only fields the bundled data actually owns. `tags` and `serviceAreas` are
// CMS-only concepts, so they are never touched here.
const FIELDS = [
  'title', 'clientName', 'category', 'shortDescription', 'concept', 'year', 'services',
  'colorTheme', 'accent', 'gradFrom', 'gradTo', 'image', 'youtube', 'videos', 'order', 'track',
  'overview', 'challenge', 'idea', 'experienceIntro', 'experienceItems', 'whyItWorked', 'impact',
] as const

const isEmpty = (v: unknown) =>
  v === null || v === undefined || (typeof v === 'string' && v.trim() === '') || (Array.isArray(v) && v.length === 0)

const bySlug = new Map(caseStudies.map((c) => [c.slug, c as unknown as Record<string, unknown>]))
const { docs } = await payload.find({ collection: 'case-studies', limit: 1000, depth: 0 })

let repaired = 0
for (const doc of docs) {
  const d = doc as unknown as Record<string, unknown>
  const source = bySlug.get(String(d.slug))
  if (!source) continue

  const data: Record<string, unknown> = {}
  for (const key of FIELDS) {
    if (isEmpty(d[key]) && !isEmpty(source[key])) data[key] = source[key]
  }
  if (!Object.keys(data).length) continue

  await payload.update({ collection: 'case-studies', id: d.id as number, data: data as never })
  repaired++
  console.log(`  ${d.slug}: refilled ${Object.keys(data).join(', ')}`)
}

console.log(`Repair done → ${repaired} of ${docs.length} studies had empty fields refilled`)
process.exit(0)
