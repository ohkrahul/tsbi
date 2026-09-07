/**
 * Seed the Tags collection from the client names already on the case studies,
 * and tag each study with its brand — so the public filter dropdown has real
 * options the moment tags ship, instead of being empty until someone tags 39
 * studies by hand.
 *
 * Idempotent: existing tags are reused and a study is only written if its tag
 * set would actually change.
 *
 * Run:  npm run seed:tags
 */
import { getPayload } from 'payload'
import config from '@payload-config'

/** Same collapse the public gallery used for its brand chips. */
const brandOf = (clientName: string) => (clientName.startsWith('Zydus') ? 'Zydus' : clientName)

const payload = await getPayload({ config })

const { docs: studies } = await payload.find({ collection: 'case-studies', limit: 1000, depth: 0 })
const { docs: existing } = await payload.find({ collection: 'tags', limit: 1000, depth: 0 })

const tagIdByName = new Map<string, number | string>(
  existing.map((t) => [String((t as { name?: string }).name ?? ''), t.id]),
)

let createdTags = 0
let taggedStudies = 0

for (const study of studies) {
  const s = study as unknown as { id: number | string; clientName?: string; tags?: unknown[] }
  const brand = brandOf(String(s.clientName ?? '').trim())
  if (!brand) continue

  let tagId = tagIdByName.get(brand)
  if (!tagId) {
    const tag = await payload.create({ collection: 'tags', data: { name: brand } })
    tagId = tag.id
    tagIdByName.set(brand, tagId)
    createdTags++
  }

  // Postgres relationship ids are numeric — keep them numeric or Payload
  // rejects the update as an invalid relationship value.
  const current = (Array.isArray(s.tags) ? s.tags : []).map((t) =>
    t !== null && typeof t === 'object' ? ((t as { id?: unknown }).id as number | string) : (t as number | string),
  )
  if (current.some((c) => String(c) === String(tagId))) continue

  try {
    await payload.update({
      collection: 'case-studies',
      id: s.id,
      data: { tags: [...current, tagId] as never },
    })
    taggedStudies++
  } catch (e) {
    const errs = (e as { data?: { errors?: unknown[] } }).data?.errors
    console.error(`  ! ${s.id} (${brand}):`, (e as Error).message, JSON.stringify(errs))
  }
}

console.log(
  `Tags seeded → tags created: ${createdTags}, tags total: ${tagIdByName.size}, studies tagged: ${taggedStudies}/${studies.length}`,
)
process.exit(0)
