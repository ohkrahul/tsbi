import { getPayload } from 'payload'
import config from '@payload-config'

/** Local API client for the custom /studio admin (server components + actions). */
export const getPayloadClient = () => getPayload({ config })

/** Pick-lists for a collection's `relation` fields, keyed by field name. */
export async function getRelationOptions(fields: { name: string; type: string; relationTo?: string; relationLabel?: string }[]) {
  const payload = await getPayloadClient()
  const out: Record<string, { id: string | number; label: string }[]> = {}
  for (const f of fields) {
    if (f.type !== 'relation' || !f.relationTo) continue
    const labelKey = f.relationLabel ?? 'name'
    const { docs } = await payload.find({
      collection: f.relationTo as never,
      limit: 500,
      sort: labelKey,
      depth: 0,
    })
    out[f.name] = docs.map((d) => {
      const doc = d as unknown as Record<string, unknown>
      return { id: doc.id as string | number, label: String(doc[labelKey] ?? doc.id) }
    })
  }
  return out
}

/** Options for the studio's image picker (upload fields). */
export async function getMediaOptions() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({ collection: 'media', limit: 200, sort: '-createdAt', depth: 0 })
  return docs.map((d) => ({
    id: d.id as string | number,
    filename: String(d.filename ?? d.id),
    url: String(d.url ?? ''),
    mimeType: String(d.mimeType ?? ''),
  }))
}
