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
      // Only the label column — these lists exist to fill a picker.
      select: { [labelKey]: true } as never,
    })
    out[f.name] = docs.map((d) => {
      const doc = d as unknown as Record<string, unknown>
      return { id: doc.id as string | number, label: String(doc[labelKey] ?? doc.id) }
    })
  }
  return out
}

/**
 * Existing values for each `combo` field, so the form can offer them as a
 * dropdown. There is no separate vocabulary to maintain — whatever editors have
 * typed before is the list, and a new value joins it the moment it is saved.
 */
export async function getFieldSuggestions(
  collection: string,
  fields: { name: string; type: string }[],
): Promise<Record<string, string[]>> {
  const combos = fields.filter((f) => f.type === 'combo')
  if (!combos.length) return {}

  const payload = await getPayloadClient()
  // Only the combo columns. Without `select` this pulled every field of every
  // document — on case studies that meant 40-odd long concept and blurb texts
  // fetched just to collect the distinct categories.
  const { docs } = await payload.find({
    collection: collection as never,
    limit: 1000,
    depth: 0,
    select: Object.fromEntries(combos.map((f) => [f.name, true])) as never,
  })
  const out: Record<string, string[]> = {}
  for (const f of combos) {
    const seen = new Set<string>()
    for (const d of docs) {
      const v = (d as unknown as Record<string, unknown>)[f.name]
      if (typeof v === 'string' && v.trim() !== '') seen.add(v.trim())
    }
    out[f.name] = [...seen].sort((a, b) => a.localeCompare(b))
  }
  return out
}

/** Options for the studio's image picker (upload fields). */
export async function getMediaOptions() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'media',
    limit: 200,
    sort: '-createdAt',
    depth: 0,
    select: { filename: true, url: true, mimeType: true },
  })
  return docs.map((d) => ({
    id: d.id as string | number,
    filename: String(d.filename ?? d.id),
    url: String(d.url ?? ''),
    mimeType: String(d.mimeType ?? ''),
  }))
}
