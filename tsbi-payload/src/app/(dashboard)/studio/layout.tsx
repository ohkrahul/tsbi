import Link from 'next/link'
import { COLLECTIONS } from '@/lib/collections'
import { PAGE_GLOBALS } from '@/lib/page-globals'
import { currentUser } from '@/lib/auth'
import { SidebarNav } from '@/components/studio/sidebar-nav'
import { LogoutButton, ThemeToggle } from '@/components/studio/forms'

export default async function StudioLayout({ children }: { children: React.ReactNode }) {
  // Chrome only. The actual gate lives in each page (`requireUser`) — a check
  // here can't stop a page segment from rendering its data.
  const user = await currentUser()
  if (!user) return <>{children}</>

  const navItems = [
    { href: '/studio', label: 'Dashboard' },
    ...COLLECTIONS.map((c) => ({ href: `/studio/${c.slug}`, label: c.label })),
    { href: '/studio/media', label: 'Media Library' },
  ]
  const pageItems = PAGE_GLOBALS.map((g) => ({ href: `/studio/pages/${g.slug}`, label: g.label }))

  return (
    <div className="bg-background flex min-h-svh">
      <aside className="bg-sidebar border-sidebar-border sticky top-0 hidden h-svh w-60 shrink-0 flex-col border-r py-5 md:flex">
        <Link href="/studio" className="mb-6 flex items-center gap-2 px-6">
          <span className="bg-primary text-primary-foreground grid size-7 place-items-center rounded-md text-xs font-black">
            T
          </span>
          <span className="text-sm font-semibold tracking-tight">TSBI Studio</span>
        </Link>
        <SidebarNav items={navItems} />
        {pageItems.length ? (
          <>
            <p className="text-muted-foreground mt-5 mb-1 px-6 text-[10px] font-semibold tracking-wider uppercase">
              Service pages
            </p>
            <SidebarNav items={pageItems} />
          </>
        ) : null}
        <div className="mt-auto grid gap-1 px-3 pt-4">
          <ThemeToggle />
          <div className="px-3 pt-2">
            <LogoutButton email={typeof user.email === 'string' ? user.email : undefined} />
          </div>
        </div>
      </aside>
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  )
}
