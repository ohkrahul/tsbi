/**
 * Seed the service-page globals from the copy currently shipped in
 * tsbi/src/lib/servicePageContent.ts, so the studio opens with the real text
 * instead of empty fields.
 *
 * Only writes a field that is still empty in the CMS, so it never overwrites an
 * editor's changes — safe to re-run after adding a new field.
 *
 * Run:  npm run seed:pages
 */
import { getPayload } from 'payload'
import config from '@payload-config'
import { digitalTransformationDefaults } from '../../tsbi/src/lib/servicePageContent'

const payload = await getPayload({ config })

const pages: { slug: string; defaults: Record<string, unknown> }[] = [
  { slug: 'service-digital-transformation', defaults: digitalTransformationDefaults },
]

const isEmpty = (v: unknown) =>
  v === null || v === undefined || (typeof v === 'string' && v.trim() === '') || (Array.isArray(v) && v.length === 0)

for (const { slug, defaults } of pages) {
  const current = (await payload.findGlobal({ slug: slug as never, depth: 0 })) as unknown as Record<string, unknown>
  const data: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(defaults)) {
    if (isEmpty(current?.[key])) data[key] = value
  }

  if (!Object.keys(data).length) {
    console.log(`${slug}: already populated, nothing to write`)
    continue
  }
  await payload.updateGlobal({ slug: slug as never, data: data as never })
  console.log(`${slug}: seeded ${Object.keys(data).length} field(s) — ${Object.keys(data).join(', ')}`)
}

process.exit(0)
