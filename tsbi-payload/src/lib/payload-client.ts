import { getPayload } from 'payload'
import config from '@payload-config'

/** Local API client for the custom /studio admin (server components + actions). */
export const getPayloadClient = () => getPayload({ config })

/** Options for the studio's image picker (upload fields). */
export async function getMediaOptions() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({ collection: 'media', limit: 200, sort: '-createdAt', depth: 0 })
  return docs.map((d) => ({
    id: d.id as string | number,
    filename: String(d.filename ?? d.id),
    url: String(d.url ?? ''),
  }))
}
