import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { pageGlobalBySlug } from '@/lib/page-globals'
import { getMediaOptions, getPayloadClient, getRelationOptions } from '@/lib/payload-client'
import { requireUser } from '@/lib/auth'
import { CollectionForm } from '@/components/studio/forms'

export default async function EditPageGlobal({
  params,
  searchParams,
}: {
  params: Promise<{ global: string }>
  searchParams: Promise<{ [k: string]: string | string[] | undefined }>
}) {
  await requireUser()
  const { global: slug } = await params
  const def = pageGlobalBySlug(slug)
  if (!def) notFound()

  const sp = await searchParams
  const payload = await getPayloadClient()
  const doc = (await payload.findGlobal({ slug: slug as never, depth: 0 })) as unknown as Record<string, unknown>

  const media = def.fields.some((f) => f.type === 'upload') ? await getMediaOptions() : []
  const relations = await getRelationOptions(def.fields)

  const site = process.env.FRONTEND_URL || 'http://localhost:3000'

  return (
    <div className="mx-auto max-w-6xl p-6 md:p-10">
      <Link href="/studio" className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm">
        <ArrowLeft className="size-4" /> Dashboard
      </Link>
      <div className="mt-3 mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{def.label}</h1>
          <p className="text-muted-foreground text-xs">Everything on this page, editable.</p>
        </div>
        <a
          href={`${site}${def.preview}`}
          target="_blank"
          rel="noreferrer"
          className="text-muted-foreground hover:text-foreground text-xs underline"
        >
          View the live page →
        </a>
      </div>

      {sp.saved ? (
        <p className="mb-6 rounded-md border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-700 dark:text-emerald-400">
          Saved.
        </p>
      ) : null}

      <CollectionForm def={def} doc={doc} media={media} relations={relations} isGlobal cancelHref="/studio" />
    </div>
  )
}
