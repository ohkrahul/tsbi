'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { sectionIcon, slugFromHref } from './icons'

export type NavItem = { href: string; label: string }
export type NavGroup = { label?: string; items: NavItem[] }

function isActive(pathname: string, href: string) {
  // Match child segments, not prefixes — so /studio/media-coverage doesn't
  // light up /studio/media, and /studio (Dashboard) stays exact-only.
  if (href === '/studio') return pathname === '/studio'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function SidebarNav({ groups }: { groups: NavGroup[] }) {
  const pathname = usePathname()
  return (
    <nav className="grid gap-5 px-3">
      {groups.map((g, gi) => (
        <div key={g.label ?? gi} className="grid gap-0.5">
          {g.label && (
            <p className="text-muted-foreground/70 px-3 pb-1.5 text-[11px] font-semibold tracking-wider uppercase">
              {g.label}
            </p>
          )}
          {g.items.map((i) => {
            const active = isActive(pathname, i.href)
            const Icon = sectionIcon(slugFromHref(i.href))
            return (
              <Link
                key={i.href}
                href={i.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'group relative flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  active
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground',
                )}
              >
                {/* Brand rail marks the current section without recolouring the label. */}
                <span
                  className={cn(
                    'bg-brand absolute top-1.5 bottom-1.5 -left-3 w-0.75 rounded-r-full transition-opacity',
                    active ? 'opacity-100' : 'opacity-0',
                  )}
                />
                <Icon
                  className={cn(
                    'size-4 shrink-0 transition-colors',
                    active ? 'text-brand' : 'text-muted-foreground group-hover:text-foreground',
                  )}
                />
                <span className="truncate">{i.label}</span>
              </Link>
            )
          })}
        </div>
      ))}
    </nav>
  )
}

/**
 * Below `md` the sidebar is hidden, so the same nav opens from the top bar.
 * Closes itself on navigation — the layout (and therefore this state) survives
 * a move between studio pages.
 */
export function MobileNav({ groups }: { groups: NavGroup[] }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  useEffect(() => setOpen(false), [pathname])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? 'Close menu' : 'Open menu'}
        className="hover:bg-accent grid size-9 place-items-center rounded-md"
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>
      {open && (
        <div className="bg-sidebar border-sidebar-border absolute inset-x-0 top-full border-b py-4 shadow-lg">
          <SidebarNav groups={groups} />
        </div>
      )}
    </>
  )
}
