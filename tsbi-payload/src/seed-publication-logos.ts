/**
 * Upload the publication logos that ship in tsbi/public/media into the Media
 * Library, so an editor can pick one for a press item instead of the logo only
 * existing as a hardcoded path in the frontend.
 *
 * Idempotent: a logo already in the library (matched on filename) is skipped.
 *
 * Run:  npm run seed:logos
 */
import { getPayload } from 'payload'
import config from '@payload-config'
import { readFileSync, readdirSync } from 'fs'
import path from 'path'

const DIR = path.resolve('../tsbi/public/media')

// Not a publication logo — it's artwork used on the media page itself.
const SKIP = new Set(['tsbinewspaperimg.png'])

const MIME: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
}

const payload = await getPayload({ config })

const { docs: existing } = await payload.find({
  collection: 'media',
  limit: 1000,
  depth: 0,
  select: { filename: true },
})
// Payload may rename on upload (logo.png -> logo-1.png), so compare on the stem.
const have = new Set(
  existing.map((d) => String((d as { filename?: string }).filename ?? '').replace(/\.[^.]+$/, '').toLowerCase()),
)

const files = readdirSync(DIR).filter((f) => MIME[path.extname(f).toLowerCase()] && !SKIP.has(f))

let uploaded = 0
let skipped = 0
for (const file of files) {
  const stem = file.replace(/\.[^.]+$/, '').toLowerCase()
  if (have.has(stem)) {
    skipped++
    continue
  }
  const data = readFileSync(path.join(DIR, file))
  await payload.create({
    collection: 'media',
    data: { alt: `${stem} logo` },
    file: { data, mimetype: MIME[path.extname(file).toLowerCase()]!, name: file, size: data.length },
  })
  have.add(stem)
  uploaded++
  console.log(`  + ${file} (${(data.length / 1024).toFixed(0)} KB)`)
}

console.log(
  `Logos seeded → uploaded: ${uploaded}, already present: ${skipped}, media total: ${
    (await payload.count({ collection: 'media' })).totalDocs
  }`,
)
process.exit(0)
