import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { collectionBySlug } from '@/lib/collections'
import { getMediaOptions, getPayloadClient, getRelationOptions } from '@/lib/payload-client'
import { requireUser } from '@/lib/auth'
import { CollectionForm, DeleteButton } from '@/components/studio/forms'

export default async function EditDocPage({ params }: { params: Promise<{ collection: string; id: string }> }) {
  await requireUser()
  const { collection, id } = await params
  const def = collectionBySlug(collection)
  if (!def) notFound()

  const payload = await getPayloadClient()
  const doc = await payload
    .findByID({ collection: def.slug as never, id, depth: 0 })
    .catch(() => null)
  if (!doc) notFound()

  const media = def.fields.some((f) => f.type === 'upload') ? await getMediaOptions() : []
  const relations = await getRelationOptions(def.fields)
  const d = doc as Record<string, unknown>
  const title = String(d[def.columns[0].key] ?? id)

  return (
    <div className="mx-auto max-w-6xl p-6 md:p-10">
      <Link
        href={`/studio/${def.slug}`}
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm"
      >
        <ArrowLeft className="size-4" /> {def.label}
      </Link>
      <div className="mt-3 mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          <p className="text-muted-foreground text-xs">
            {def.singular} · ID {String(d.id)}
          </p>
        </div>
        <DeleteButton collection={def.slug} id={String(d.id)} />
      </div>
      <CollectionForm def={def} doc={d} media={media} relations={relations} />
    </div>
  )
}
