import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ExternalLink } from 'lucide-react'
import { COLLECTIONS } from '@/lib/collections'
import { currentUser } from '@/lib/auth'
import { MobileNav, SidebarNav, type NavGroup } from '@/components/studio/sidebar-nav'
import { LogoutButton, ThemeToggle } from '@/components/studio/forms'

/** Which sidebar section each collection files under. Anything unlisted lands in "Content". */
const SECTIONS: { label?: string; slugs: string[] }[] = [
  { label: 'Content', slugs: ['case-studies', 'journal', 'media-coverage'] },
  { label: 'Site', slugs: ['careers', 'clients', 'tags'] },
  { label: 'Admin', slugs: ['users'] },
]

function Wordmark() {
  return (
    <Link href="/studio" className="flex items-center gap-2.5">
      <span className="bg-brand grid size-7 shrink-0 place-items-center rounded-md text-xs font-black text-white">
        T
      </span>
      <span className="grid leading-none">
        <span className="text-sm font-semibold tracking-tight">TSBI Studio</span>
        <span className="text-muted-foreground text-[11px]">Content manager</span>
      </span>
    </Link>
  )
}

export default async function StudioLayout({ children }: { children: React.ReactNode }) {
  // Chrome only. The actual gate lives in each page (`requireUser`) — a check
  // here can't stop a page segment from rendering its data. The login page
  // lives outside this layout, so there is nothing to pass through here.
  const user = await currentUser()
  if (!user) redirect('/login')

  const filed = new Set(SECTIONS.flatMap((s) => s.slugs))
  const groups: NavGroup[] = [
    {
      items: [
        { href: '/studio', label: 'Dashboard' },
        { href: '/studio/media', label: 'Media Library' },
      ],
    },
    ...SECTIONS.map((s, i) => ({
      label: s.label,
      // A collection added to the registry but not to SECTIONS still shows up,
      // under the first heading, rather than silently vanishing from the nav.
      items: [
        ...COLLECTIONS.filter((c) => s.slugs.includes(c.slug)),
        ...(i === 0 ? COLLECTIONS.filter((c) => !filed.has(c.slug)) : []),
      ].map((c) => ({ href: `/studio/${c.slug}`, label: c.label })),
    })),
  ].filter((g) => g.items.length > 0)

  const site = process.env.FRONTEND_URL
  const email = typeof user.email === 'string' ? user.email : undefined

  return (
    <div className="bg-background flex min-h-svh">
      <aside className="bg-sidebar border-sidebar-border sticky top-0 hidden h-svh w-64 shrink-0 flex-col border-r py-5 md:flex">
        <div className="mb-6 px-6">
          <Wordmark />
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">
          <SidebarNav groups={groups} />
        </div>
        <div className="border-sidebar-border mt-4 grid gap-1 border-t px-3 pt-4">
          {site && (
            <a
              href={site}
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:bg-sidebar-accent hover:text-foreground flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors"
            >
              <ExternalLink className="size-4" />
              View site
            </a>
          )}
          <ThemeToggle />
          <div className="pt-2">
            <LogoutButton email={email} />
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="bg-background/85 border-border relative z-20 flex items-center gap-3 border-b px-4 py-2.5 backdrop-blur md:hidden">
          <MobileNav groups={groups} />
          <Wordmark />
        </header>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  )
}

