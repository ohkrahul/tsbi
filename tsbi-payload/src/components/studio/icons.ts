import {
  BriefcaseBusiness,
  Building2,
  Clapperboard,
  Images,
  LayoutDashboard,
  Megaphone,
  Newspaper,
  Tag,
  Users,
  type LucideIcon,
} from 'lucide-react'

/**
 * One icon per studio section, keyed by collection slug (`''` = the dashboard).
 * Shared by the sidebar and the dashboard tiles so the two never drift.
 */
export const SECTION_ICONS: Record<string, LucideIcon> = {
  '': LayoutDashboard,
  'case-studies': Clapperboard,
  journal: Newspaper,
  'media-coverage': Megaphone,
  careers: BriefcaseBusiness,
  clients: Building2,
  tags: Tag,
  users: Users,
  media: Images,
}

export const sectionIcon = (slug: string): LucideIcon => SECTION_ICONS[slug] ?? LayoutDashboard

/** `/studio/case-studies/new` -> `case-studies`, `/studio` -> `''`. */
export const slugFromHref = (href: string) => href.replace(/^\/studio\/?/, '').split('/')[0]
