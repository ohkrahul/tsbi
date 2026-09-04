import { getPayloadClient } from '@/lib/payload-client'
import { requireUser } from '@/lib/auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DeleteButton, MediaUpload } from '@/components/studio/forms'

export default async function MediaLibraryPage() {
  await requireUser()
  const payload = await getPayloadClient()
  const res = await payload.find({ collection: 'media', limit: 200, sort: '-createdAt', depth: 0 })

  return (
    <div className="mx-auto max-w-6xl p-6 md:p-10">
      <h1 className="text-2xl font-semibold tracking-tight">Media Library</h1>
      <p className="text-muted-foreground mt-1 text-sm">
        {res.totalDocs} {res.totalDocs === 1 ? 'file' : 'files'}. Uploads here feed the image pickers on Journal and
        Clients.
      </p>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-base">Upload</CardTitle>
          <CardDescription>Images are processed by sharp; several files at once is fine.</CardDescription>
        </CardHeader>
        <CardContent>
          <MediaUpload />
        </CardContent>
      </Card>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {res.docs.map((doc) => {
          const d = doc as unknown as Record<string, unknown>
          const url = String(d.url ?? '')
          const isImage = String(d.mimeType ?? '').startsWith('image/')
          return (
            <div key={String(d.id)} className="flex flex-col gap-2 rounded-xl border p-3">
              <div className="bg-muted grid aspect-video place-items-center overflow-hidden rounded-md">
                {isImage && url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={url} alt={String(d.alt ?? '')} className="h-full w-full object-contain" />
                ) : (
                  <span className="text-muted-foreground text-xs">{String(d.mimeType ?? 'file')}</span>
                )}
              </div>
              <p className="truncate text-xs font-medium" title={String(d.filename ?? '')}>
                {String(d.filename ?? d.id)}
              </p>
              <div className="flex items-center justify-between gap-2">
                <a href={url} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground text-xs">
                  Open
                </a>
                <DeleteButton collection="media" id={String(d.id)} />
              </div>
            </div>
          )
        })}
        {res.docs.length === 0 ? <p className="text-muted-foreground text-sm">No files yet.</p> : null}
      </div>
    </div>
  )
}
