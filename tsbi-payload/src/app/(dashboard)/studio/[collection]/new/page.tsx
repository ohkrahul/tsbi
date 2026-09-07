import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { collectionBySlug } from '@/lib/collections'
import { getMediaOptions, getRelationOptions } from '@/lib/payload-client'
import { requireUser } from '@/lib/auth'
import { CollectionForm } from '@/components/studio/forms'

export default async function NewDocPage({ params }: { params: Promise<{ collection: string }> }) {
  await requireUser()
  const { collection } = await params
  const def = collectionBySlug(collection)
  if (!def) notFound()

  const media = def.fields.some((f) => f.type === 'upload') ? await getMediaOptions() : []
  const relations = await getRelationOptions(def.fields)

  return (
    <div className="mx-auto max-w-6xl p-6 md:p-10">
      <Link
        href={`/studio/${def.slug}`}
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm"
      >
        <ArrowLeft className="size-4" /> {def.label}
      </Link>
      <h1 className="mt-3 mb-8 text-2xl font-semibold tracking-tight">New {def.singular}</h1>
      <CollectionForm def={def} media={media} relations={relations} />
    </div>
  )
}
