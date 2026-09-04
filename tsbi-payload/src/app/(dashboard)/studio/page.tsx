import Link from 'next/link'
import { COLLECTIONS } from '@/lib/collections'
import { getPayloadClient } from '@/lib/payload-client'
import { requireUser } from '@/lib/auth'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default async function StudioDashboard() {
  await requireUser()
  const payload = await getPayloadClient()
  const cards = await Promise.all(
    [...COLLECTIONS.map((c) => ({ slug: c.slug, label: c.label, singular: c.singular })), { slug: 'media', label: 'Media Library', singular: 'File' }].map(
      async (c) => ({ ...c, total: (await payload.count({ collection: c.slug as never })).totalDocs }),
    ),
  )

  return (
    <div className="mx-auto max-w-5xl p-6 md:p-10">
      <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
      <p className="text-muted-foreground mt-1 text-sm">Content for the TSBI site. Pick a collection to edit.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link key={c.slug} href={`/studio/${c.slug}`} className="focus-visible:ring-ring rounded-xl focus-visible:ring-2 focus-visible:outline-none">
            <Card className="hover:border-foreground/20 h-full gap-2 transition-colors">
              <CardHeader>
                <CardDescription>{c.label}</CardDescription>
                <CardTitle className="text-3xl tabular-nums">{c.total}</CardTitle>
                <CardDescription className="text-xs">
                  {c.total === 1 ? c.singular : `${c.singular}s`}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
