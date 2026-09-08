import Link from 'next/link'
import { ArrowUpRight, ExternalLink, Pencil, Plus, Upload } from 'lucide-react'
import { COLLECTIONS } from '@/lib/collections'
import { getPayloadClient } from '@/lib/payload-client'
import { requireUser } from '@/lib/auth'
import { sectionIcon } from '@/components/studio/icons'
import { Button } from '@/components/ui/button'

/** Collections whose edits are worth surfacing as recent activity. */
const ACTIVITY = ['case-studies', 'journal', 'media-coverage'] as const

function ago(value: unknown) {
  const t = new Date(String(value ?? '')).getTime()
  if (!t) return ''
  const mins = Math.floor((Date.now() - t) / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  if (mins < 1440) return `${Math.floor(mins / 60)}h ago`
  if (mins < 43200) return `${Math.floor(mins / 1440)}d ago`
  return new Date(t).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default async function StudioDashboard() {
  const user = await requireUser()
  const payload = await getPayloadClient()

  const tiles = [
    ...COLLECTIONS.map((c) => ({ slug: c.slug, label: c.label, singular: c.singular })),
    { slug: 'media', label: 'Media Library', singular: 'File' },
  ]

  // Counts and recent edits in one round of parallel queries — the dashboard is
  // uncached (it reads the auth cookie), so this runs on every visit.
  const [counts, activity] = await Promise.all([
    Promise.all(tiles.map(async (t) => (await payload.count({ collection: t.slug as never })).totalDocs)),
    Promise.all(
      ACTIVITY.map(async (slug) => {
        const def = COLLECTIONS.find((c) => c.slug === slug)!
        const titleKey = def.columns[0].key
        const { docs } = await payload.find({
          collection: slug as never,
          limit: 4,
          sort: '-updatedAt',
          depth: 0,
          select: { [titleKey]: true, updatedAt: true } as never,
        })
        return docs.map((d: Record<string, unknown>) => ({
          id: String(d.id),
          slug,
          label: def.singular,
          title: String(d[titleKey] ?? 'Untitled'),
          updatedAt: d.updatedAt,
        }))
      }),
    ),
  ])

  const cards = tiles.map((t, i) => ({ ...t, total: counts[i] }))
  const recent = activity
    .flat()
    .sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt)))
    .slice(0, 7)

  const site = process.env.FRONTEND_URL
  const name = typeof user.email === 'string' ? user.email.split('@')[0] : 'there'

  return (
    <div className="mx-auto max-w-6xl p-6 md:p-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-brand text-xs font-semibold tracking-wider uppercase">TSBI Studio</p>
          <h1 className="mt-1.5 text-2xl font-semibold tracking-tight md:text-3xl">
            Welcome back, <span className="capitalize">{name}</span>
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Everything on thesmallbigidea.com, editable here. Changes go live within a minute.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild size="sm">
            <Link href="/studio/case-studies/new">
              <Plus /> New case study
            </Link>
          </Button>
          <Button asChild size="sm" variant="outline">
            <Link href="/studio/media">
              <Upload /> Upload media
            </Link>
          </Button>
          {site && (
            <Button asChild size="sm" variant="ghost">
              <a href={site} target="_blank" rel="noreferrer">
                <ExternalLink /> View site
              </a>
            </Button>
          )}
        </div>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => {
          const Icon = sectionIcon(c.slug)
          return (
            <Link
              key={c.slug}
              href={`/studio/${c.slug}`}
              className="group bg-card hover:border-brand/40 focus-visible:ring-ring relative overflow-hidden rounded-xl border p-4 transition-colors focus-visible:ring-2 focus-visible:outline-none"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="bg-muted text-muted-foreground group-hover:bg-brand/10 group-hover:text-brand grid size-9 place-items-center rounded-lg transition-colors">
                  <Icon className="size-4.5" />
                </span>
                <ArrowUpRight className="text-muted-foreground/0 group-hover:text-muted-foreground size-4 transition-colors" />
              </div>
              <p className="mt-3 text-2xl font-semibold tabular-nums">{c.total}</p>
              <p className="text-sm font-medium">{c.label}</p>
              <p className="text-muted-foreground text-xs">
                {c.total === 1 ? c.singular : `${c.singular}s`}
              </p>
            </Link>
          )
        })}
      </div>

      <div className="bg-card mt-8 rounded-xl border">
        <div className="flex items-center justify-between gap-3 border-b px-4 py-3">
          <div>
            <h2 className="text-sm font-semibold">Recently edited</h2>
            <p className="text-muted-foreground text-xs">Your latest changes across the site</p>
          </div>
          <Button asChild size="sm" variant="ghost">
            <Link href="/studio/case-studies">All case studies</Link>
          </Button>
        </div>
        {recent.length === 0 ? (
          <p className="text-muted-foreground p-6 text-sm">Nothing edited yet.</p>
        ) : (
          <ul className="divide-y">
            {recent.map((r) => {
              const Icon = sectionIcon(r.slug)
              return (
                <li key={`${r.slug}-${r.id}`}>
                  <Link
                    href={`/studio/${r.slug}/${r.id}`}
                    className="hover:bg-muted/50 group flex items-center gap-3 px-4 py-3 transition-colors"
                  >
                    <span className="bg-muted text-muted-foreground grid size-8 shrink-0 place-items-center rounded-md">
                      <Icon className="size-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">{r.title}</span>
                      <span className="text-muted-foreground text-xs">
                        {r.label} · {ago(r.updatedAt)}
                      </span>
                    </span>
                    <Pencil className="text-muted-foreground/0 group-hover:text-muted-foreground size-4 shrink-0 transition-colors" />
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
