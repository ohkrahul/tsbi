/**
 * Backfill `serviceAreas` for the Digital Transformation page.
 *
 * That page used to list `caseStudies.filter(track === 'tech')` from a hardcoded
 * module, so mapping track 'tech' -> 'digital-transformation' reproduces exactly
 * what it showed before, now driven by the CMS. Film-track studies are left
 * unassigned on purpose: which of them belong on Social Media / Content
 * Production / Influencer Management is an editorial call, made by ticking the
 * boxes in the studio.
 *
 * Idempotent. Run:  npm run seed:services
 */
import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })
const { docs } = await payload.find({ collection: 'case-studies', limit: 1000, depth: 0 })

let updated = 0
for (const doc of docs) {
  const s = doc as unknown as { id: number | string; track?: string; serviceAreas?: string[] | null }
  if (s.track !== 'tech') continue
  const current = s.serviceAreas ?? []
  if (current.includes('digital-transformation')) continue

  await payload.update({
    collection: 'case-studies',
    id: s.id,
    data: { serviceAreas: [...current, 'digital-transformation'] as never },
  })
  updated++
}

const tech = docs.filter((d) => (d as unknown as { track?: string }).track === 'tech').length
console.log(`Service areas seeded → tech studies: ${tech}, newly assigned: ${updated}`)
process.exit(0)
