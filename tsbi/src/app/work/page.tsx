import WorkPageClient from './WorkPageClient';
import { getWorkItems, getSiteSettings } from '@/lib/strapi';

// ─── Local fallback data (used when CMS is unreachable) ──────────────────────

const FALLBACK_WORKS = [
  { client: "L'Oréal Paris", title: 'Glycolic Bright Launch Campaign', chips: ['Campaign', '2024', 'Influencer'], bg: 'linear-gradient(135deg,#301800,#1a0f00)', slug: 'loreal-glycolic', isSpan2: true, category: 'Campaigns', order: 1 },
  { client: 'OnePlus', title: 'Never Settle Global Campaign', chips: ['Film', '2024'], bg: 'linear-gradient(135deg,#0d1528,#1a2240)', slug: 'oneplus-never-settle', isSpan2: false, category: 'Films', order: 2 },
  { client: 'Tiger Beer', title: 'Refresh Your Vibes', chips: ['Social', 'Film'], bg: 'linear-gradient(135deg,#301500,#200d00)', slug: 'tiger-refresh', isSpan2: false, category: 'Social', order: 3 },
  { client: 'Dior', title: 'Summer Collection Film', chips: ['Film', '2025'], bg: 'linear-gradient(135deg,#10101a,#1a1a28)', slug: 'dior-summer', isSpan2: false, category: 'Films', order: 4 },
  { client: 'Saigon Chronicles', title: 'Social Series — 12 Episodes', chips: ['Social', 'Series'], bg: 'linear-gradient(135deg,#0a2015,#051510)', slug: 'saigon-chronicles', isSpan2: false, category: 'Social', order: 5 },
  { client: 'Chanel', title: 'Beauty Edit Influencer Series', chips: ['Influencer', '2023'], bg: 'linear-gradient(135deg,#1a0a30,#100520)', slug: 'chanel-beauty', isSpan2: false, category: 'Campaigns', order: 6 },
];

const FALLBACK_METRICS = [
  { val: '300+', label: 'Projects Delivered', pink: true },
  { val: '150+', label: 'Talent Partners', pink: false },
  { val: '98%', label: 'Client Retention', pink: false },
  { val: '12+', label: 'Years of Impact', pink: false },
];

// ─── Server component — fetches CMS data then passes to client shell ──────────

export default async function WorkPage() {
  const [cmsWorks, settings] = await Promise.all([getWorkItems(), getSiteSettings()]);

  const works = cmsWorks.length
    ? cmsWorks.map((w) => ({
        client: w.client,
        title: w.title,
        chips: w.chips ?? [],
        bg: w.bg ?? 'linear-gradient(135deg,#0d1528,#1a2240)',
        slug: w.slug,
        isSpan2: w.isSpan2,
        category: w.category,
        order: w.order,
      }))
    : FALLBACK_WORKS;

  const metrics = settings?.workMetrics ?? FALLBACK_METRICS;

  return <WorkPageClient works={works} metrics={metrics} />;
}
