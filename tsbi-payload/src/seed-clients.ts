/**
 * Put the whole client roster into the CMS: every logo into the Media Library
 * and every brand into `clients`, so the /clients page becomes editable
 * instead of living as a hardcoded array in the frontend.
 *
 * The roster in tsbi/src/lib/clients.ts stays as the fallback the site uses
 * when the CMS is unreachable — this reads it as the source for the import.
 *
 * Idempotent, and deliberately non-destructive: a client that already exists
 * is left exactly as it is, so re-running can never undo an editor's changes.
 *
 * Run:  npm run seed:clients
 */
import { getPayload } from 'payload'
import config from '@payload-config'
import { existsSync, readFileSync } from 'fs'
import path from 'path'
import { CLIENT_ROSTER } from '../../tsbi/src/lib/clients.ts'

const PUBLIC_DIR = path.resolve('../tsbi/public')

const MIME: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
}

const payload = await getPayload({ config })

/**
 * Cloudinary rejects an upload whose name carries characters it uses in its
 * own URLs — "&tv.webp" fails with an unhelpful "Unknown error". Spaces are
 * fine, and leaving them alone keeps the names already in the library
 * matching on re-run.
 */
const safeName = (name: string) => name.replace(/[^a-zA-Z0-9 ._-]+/g, '-').replace(/^-+/, '')

// Match uploads on the filename stem: Payload renames on collision
// (logo.png -> logo-1.png) and rewrites the extension to .webp.
const { docs: media } = await payload.find({ collection: 'media', limit: 1000, depth: 0 })
const stemOf = (name: string) => name.replace(/\.[^.]+$/, '').toLowerCase()
const mediaByStem = new Map(
  media.map((d) => [stemOf(String((d as { filename?: string }).filename ?? '')), Number(d.id)]),
)

const { docs: clients } = await payload.find({ collection: 'clients', limit: 1000, depth: 0 })
const clientNames = new Set(clients.map((d) => String((d as { name?: string }).name ?? '').toLowerCase()))

let uploaded = 0
let reused = 0
let created = 0
let present = 0
const missing: string[] = []

for (const c of CLIENT_ROSTER) {
  // The roster stores web paths, so "dharma%20production.png" has to come back
  // to a real filename before the disk can find it.
  const rel = c.logo ? decodeURIComponent(c.logo) : ''
  const file = rel ? path.join(PUBLIC_DIR, rel) : ''
  const base = rel ? safeName(path.basename(rel)) : ''
  const ext = path.extname(base).toLowerCase()

  let image: number | undefined
  if (base && MIME[ext] && existsSync(file)) {
    const existing = mediaByStem.get(stemOf(base))
    if (existing) {
      image = existing
      reused++
    } else {
      const data = readFileSync(file)
      const doc = await payload.create({
        collection: 'media',
        data: { alt: `${c.name} logo` },
        file: { data, mimetype: MIME[ext]!, name: base, size: data.length },
      })
      mediaByStem.set(stemOf(base), Number(doc.id))
      image = Number(doc.id)
      uploaded++
      console.log(`  + ${base} (${(data.length / 1024).toFixed(0)} KB) → ${c.name}`)
    }
  } else if (c.logo) {
    missing.push(`${c.name} (${rel})`)
  }

  if (clientNames.has(c.name.toLowerCase())) {
    present++
    continue
  }

  await payload.create({
    collection: 'clients',
    data: {
      name: c.name,
      type: c.type,
      accent: c.accent,
      isEntertainment: c.isEntertainment,
      image,
      // The home-page strip is a separate curated set; importing the roster
      // must not silently rewrite it.
      showOnHome: false,
    },
  })
  clientNames.add(c.name.toLowerCase())
  created++
}

console.log(
  `\nClients seeded → created: ${created}, already present: ${present}` +
    `\nLogos → uploaded: ${uploaded}, already in library: ${reused}` +
    `\nMedia total: ${(await payload.count({ collection: 'media' })).totalDocs}` +
    `, clients total: ${(await payload.count({ collection: 'clients' })).totalDocs}`,
)
if (missing.length) console.warn(`\nNo logo file found for ${missing.length}:\n  ${missing.join('\n  ')}`)
process.exit(0)
