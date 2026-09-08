import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Plus } from 'lucide-react'
import { ARCHIVABLE, collectionBySlug, searchableFields } from '@/lib/collections'
import { getPayloadClient } from '@/lib/payload-client'
import { requireUser } from '@/lib/auth'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ArchiveButton, DeleteButton, FlashMessage, SearchBox, SortSelect, StatusSelect } from '@/components/studio/forms'

const PER_PAGE = 25

function cell(v: unknown) {
  if (v === null || v === undefined || v === '') return '—'
  if (typeof v === 'boolean') return <Badge variant={v ? 'default' : 'secondary'}>{v ? 'Yes' : 'No'}</Badge>
  if (Array.isArray(v)) return v.length ? `${v.length} item${v.length === 1 ? '' : 's'}` : '—'
  const s = String(v)
  if (/^\d{4}-\d{2}-\d{2}T/.test(s)) return new Date(s).toLocaleDateString()
  return s.length > 70 ? `${s.slice(0, 70)}…` : s
}

function PageLink({
  to,
  enabled,
  href,
  children,
}: {
  to: number
  enabled: boolean
  href: (p: number) => string
  children: React.ReactNode
}) {
  if (!enabled)
    return (
      <Button variant="outline" size="sm" disabled>
        {children}
      </Button>
    )
  return (
    <Button variant="outline" size="sm" asChild>
      <Link href={href(to)}>{children}</Link>
    </Button>
  )
}

export default async function ListPage({
  params,
  searchParams,
}: {
  params: Promise<{ collection: string }>
  searchParams: Promise<{ [k: string]: string | string[] | undefined }>
}) {
  await requireUser()
  const { collection } = await params
  const def = collectionBySlug(collection)
  if (!def) notFound()

  const sp = await searchParams
  const one = (k: string) => {
    const v = sp[k]
    return Array.isArray(v) ? v[0] : v
  }
  const q = (one('q') ?? '').trim()
  const page = Math.max(1, Number(one('page') ?? 1) || 1)

  // Newest first by default; A-Z runs on the first column, which is the name
  // of the thing in every collection (Title, Name, Role, Email).
  const titleKey = def.columns[0].key
  const SORTS: Record<string, string> = {
    newest: '-createdAt',
    oldest: 'createdAt',
    az: titleKey,
    za: `-${titleKey}`,
  }
  const sort = SORTS[one('sort') ?? ''] ? one('sort')! : 'newest'
  const sortBy = SORTS[sort]

  const searchable = searchableFields(def)

  // Archived documents are hidden from the website but kept here, so the list
  // shows what is live by default and archived is a deliberate look.
  const archivable = ARCHIVABLE.has(def.slug)
  const status = archivable && ['archived', 'all'].includes(one('status') ?? '') ? one('status')! : 'live'
  const statusWhere =
    !archivable || status === 'all'
      ? []
      : [{ archived: status === 'archived' ? { equals: true } : { not_equals: true } }]

  const search = q && searchable.length ? [{ or: searchable.map((name) => ({ [name]: { like: q } })) }] : []
  const where = [...statusWhere, ...search]

  const payload = await getPayloadClient()
  const [res, archivedCount] = await Promise.all([
    payload.find({
      collection: def.slug as never,
      limit: PER_PAGE,
      page,
      sort: sortBy,
      depth: 0,
      ...(where.length ? { where: { and: where } as never } : {}),
    }),
    archivable
      ? payload
          .count({ collection: def.slug as never, where: { archived: { equals: true } } as never })
          .then((r) => r.totalDocs)
      : Promise.resolve(0),
  ])

  const pageHref = (p: number) =>
    `/studio/${def.slug}?${new URLSearchParams({ ...(q ? { q } : {}), sort, status, page: String(p) })}`

  return (
    <div className="mx-auto max-w-6xl p-6 md:p-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{def.label}</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {/* `label` is already plural, which avoids "40 case studys". */}
            {res.totalDocs} {res.totalDocs === 1 ? def.singular.toLowerCase() : def.label.toLowerCase()}
            {q ? ` matching “${q}”` : ''}
          </p>
        </div>
        <Button asChild>
          <Link href={`/studio/${def.slug}/new`}>
            <Plus /> New {def.singular}
          </Link>
        </Button>
      </div>

      {one('saved') ? <FlashMessage kind="success">Saved.</FlashMessage> : null}
      {one('deleted') ? <FlashMessage kind="info">Deleted.</FlashMessage> : null}
      {one('archived') ? (
        <FlashMessage kind="info">Archived — hidden from the website, still here.</FlashMessage>
      ) : null}
      {one('restored') ? <FlashMessage kind="success">Restored — back on the website.</FlashMessage> : null}
      {one('error') ? <FlashMessage kind="error">{one('error')}</FlashMessage> : null}

      {/* GET form so the sort select can submit `q` with it; the search box also
          updates the URL on its own as you type. */}
      <form className="mt-6 flex flex-wrap items-center gap-2">
        <SearchBox collection={def.slug} placeholder={`Search ${def.label.toLowerCase()}…`} />
        <SortSelect value={sort} label={def.columns[0].label} />
        {archivable ? <StatusSelect value={status} archivedCount={archivedCount} /> : null}
      </form>

      <div className="mt-4 rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              {def.columns.map((c) => (
                <TableHead key={c.key}>{c.label}</TableHead>
              ))}
              <TableHead className="w-0" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {res.docs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={def.columns.length + 1} className="text-muted-foreground py-10 text-center">
                  {q
                    ? `Nothing matches “${q}”.`
                    : status === 'archived'
                      ? 'Nothing archived.'
                      : 'Nothing here yet.'}
                </TableCell>
              </TableRow>
            ) : (
              res.docs.map((doc) => {
                const d = doc as Record<string, unknown>
                const href = `/studio/${def.slug}/${d.id}`
                return (
                  <TableRow key={String(d.id)}>
                    {def.columns.map((c, i) => (
                      <TableCell key={c.key} className={i === 0 ? 'font-medium' : 'text-muted-foreground'}>
                        {i === 0 ? (
                          <span className="flex items-center gap-2">
                            <Link href={href} className="hover:underline">
                              {cell(d[c.key])}
                            </Link>
                            {d.archived ? (
                              <Badge variant="secondary" className="shrink-0 font-normal">
                                Archived
                              </Badge>
                            ) : null}
                          </span>
                        ) : (
                          cell(d[c.key])
                        )}
                      </TableCell>
                    ))}
                    <TableCell className="text-right whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5">
                        <Button variant="outline" size="sm" asChild className="h-7 px-2.5 text-xs">
                          <Link href={href}>Edit</Link>
                        </Button>
                        {archivable ? (
                          <ArchiveButton collection={def.slug} id={String(d.id)} archived={Boolean(d.archived)} />
                        ) : null}
                        <DeleteButton
                          collection={def.slug}
                          id={String(d.id)}
                          label={String(d[def.columns[0].key] ?? d.id)}
                          compact
                        />
                      </span>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>

      {res.totalPages > 1 ? (
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Page {res.page} of {res.totalPages}
          </span>
          <div className="flex gap-2">
            <PageLink to={page - 1} enabled={Boolean(res.hasPrevPage)} href={pageHref}>
              Previous
            </PageLink>
            <PageLink to={page + 1} enabled={Boolean(res.hasNextPage)} href={pageHref}>
              Next
            </PageLink>
          </div>
        </div>
      ) : null}
    </div>
  )
}
