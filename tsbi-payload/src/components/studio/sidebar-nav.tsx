'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export function SidebarNav({ items }: { items: { href: string; label: string }[] }) {
  const pathname = usePathname()
  return (
    <nav className="grid gap-1 px-3">
      {items.map((i) => {
        // Match child segments, not prefixes — so /studio/media-coverage doesn't
        // light up /studio/media, and /studio (Dashboard) stays exact-only.
        const active =
          i.href === '/studio'
            ? pathname === '/studio'
            : pathname === i.href || pathname.startsWith(`${i.href}/`)
        return (
          <Link
            key={i.href}
            href={i.href}
            className={cn(
              'rounded-md px-3 py-2 text-sm font-medium transition-colors',
              active
                ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
            )}
          >
            {i.label}
          </Link>
        )
      })}
    </nav>
  )
}
