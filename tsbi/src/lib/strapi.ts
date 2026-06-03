/**
 * Strapi v5 REST client for the TSBI Next.js frontend.
 * All functions return typed data and fall back to local defaults
 * when Strapi is unreachable, so the site never breaks.
 */

const CMS = process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337';
const TOKEN = process.env.STRAPI_API_TOKEN ?? '';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface StrapiImage {
  url: string;
  width: number;
  height: number;
  alternativeText: string | null;
}

export interface CaseStudy {
  id: number;
  slug: string;
  client: string;
  title: string;
  year: number;
  tags: string[];
  services: string;
  deliverables: string;
  platforms: string;
  conceptTitle: string;
  conceptBody: string;
  heroGrad: string;
  heroImage: StrapiImage | null;
  conceptGrad: string;
  conceptImage: StrapiImage | null;
  frames: { cap: string; grad: string; img: string }[];
  metrics: { val: string; label: string; color?: string }[];
  category: string;
  shortDescription: string;
  accent: string;
  gradFrom: string;
  gradTo: string;
  coverImage: StrapiImage | null;
  isSpan2: boolean;
  order: number;
}

export interface WorkItem {
  id: number;
  client: string;
  title: string;
  slug: string;
  chips: string[];
  bg: string;
  category: 'Campaigns' | 'Films' | 'Social' | 'Websites' | 'Tech';
  isSpan2: boolean;
  order: number;
}

export interface JournalArticle {
  id: number;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  publishedAt: string | null;
  readTime: string;
  gradient: string;
  coverImage: StrapiImage | null;
  content: string | null;
}

export interface JobListing {
  id: number;
  role: string;
  department: string;
  location: string;
  experience: string;
  skills: string[];
  responsibilities: string[];
  order: number;
}

export interface LeadershipSlide {
  id: number;
  type: 'leader' | 'reel';
  num: string;
  title: string;
  role: string | null;
  intro: string;
  bgImage: StrapiImage | null;
  cardImage: StrapiImage | null;
  ctaLabel: string;
  ctaHref: string | null;
  order: number;
}

export interface ClientBrand {
  id: number;
  name: string;
  type: string;
  caption: string;
  accent: string;
  image: StrapiImage | null;
  cells: string[];
  isEntertainment: boolean;
  showOnHome: boolean;
  order: number;
}

export interface SiteSettings {
  heroStats: { val: string; label: string }[];
  aboutStats: { val: string; label: string; pink?: boolean }[];
  workMetrics: { val: string; label: string; pink?: boolean }[];
  metaTitle: string;
  metaDescription: string;
  footerTagline: string;
}

// ─── Core fetch helper ────────────────────────────────────────────────────────

async function strapiGet<T>(path: string, params: Record<string, string> = {}): Promise<T | null> {
  const url = new URL(`/api/${path}`, CMS);
  url.searchParams.set('populate', '*');
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v);
  }

  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (TOKEN) headers['Authorization'] = `Bearer ${TOKEN}`;

  try {
    const res = await fetch(url.toString(), {
      headers,
      // ISR: revalidate every 60s so content updates propagate without a full redeploy
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json as T;
  } catch {
    return null;
  }
}

/** Resolve a Strapi media URL to an absolute URL */
export function mediaUrl(img: StrapiImage | null | undefined): string {
  if (!img) return '';
  if (img.url.startsWith('http')) return img.url;
  return `${CMS}${img.url}`;
}

// ─── API functions ────────────────────────────────────────────────────────────

export async function getCaseStudies(): Promise<CaseStudy[]> {
  const res = await strapiGet<{ data: { id: number; attributes?: Record<string, unknown>; [k: string]: unknown }[] }>(
    'case-studies',
    { 'sort': 'order:asc', 'pagination[limit]': '100', 'filters[publishedAt][$notNull]': 'true' }
  );
  if (!res?.data) return [];
  return res.data.map((d) => flattenStrapi<CaseStudy>(d));
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  const res = await strapiGet<{ data: unknown[] }>(
    'case-studies',
    { 'filters[slug][$eq]': slug }
  );
  if (!res?.data?.length) return null;
  return flattenStrapi<CaseStudy>(res.data[0] as Record<string, unknown>);
}

export async function getWorkItems(): Promise<WorkItem[]> {
  const res = await strapiGet<{ data: unknown[] }>(
    'work-items',
    { 'sort': 'order:asc', 'pagination[limit]': '100', 'filters[publishedAt][$notNull]': 'true' }
  );
  if (!res?.data) return [];
  return (res.data as Record<string, unknown>[]).map((d) => flattenStrapi<WorkItem>(d));
}

export async function getJournalArticles(): Promise<JournalArticle[]> {
  const res = await strapiGet<{ data: unknown[] }>(
    'journal-articles',
    { 'sort': 'publishedAt:desc', 'pagination[limit]': '50', 'filters[publishedAt][$notNull]': 'true' }
  );
  if (!res?.data) return [];
  return (res.data as Record<string, unknown>[]).map((d) => flattenStrapi<JournalArticle>(d));
}

export async function getJobListings(): Promise<JobListing[]> {
  const res = await strapiGet<{ data: unknown[] }>(
    'job-listings',
    { 'sort': 'order:asc', 'pagination[limit]': '50', 'filters[publishedAt][$notNull]': 'true' }
  );
  if (!res?.data) return [];
  return (res.data as Record<string, unknown>[]).map((d) => flattenStrapi<JobListing>(d));
}

export async function getLeadershipSlides(): Promise<LeadershipSlide[]> {
  const res = await strapiGet<{ data: unknown[] }>(
    'leadership-slides',
    { 'sort': 'order:asc', 'pagination[limit]': '20', 'filters[publishedAt][$notNull]': 'true' }
  );
  if (!res?.data) return [];
  return (res.data as Record<string, unknown>[]).map((d) => flattenStrapi<LeadershipSlide>(d));
}

export async function getClientBrands(homeOnly = false): Promise<ClientBrand[]> {
  const params: Record<string, string> = {
    'sort': 'order:asc',
    'pagination[limit]': '50',
    'filters[publishedAt][$notNull]': 'true',
  };
  if (homeOnly) params['filters[showOnHome][$eq]'] = 'true';

  const res = await strapiGet<{ data: unknown[] }>('client-brands', params);
  if (!res?.data) return [];
  return (res.data as Record<string, unknown>[]).map((d) => flattenStrapi<ClientBrand>(d));
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const res = await strapiGet<{ data: Record<string, unknown> }>('site-setting');
  if (!res?.data) return null;
  return flattenStrapi<SiteSettings>(res.data);
}

// ─── Strapi v5 response normalizer ───────────────────────────────────────────
// Strapi v5 returns flat objects (no nested `attributes`), but v4 nests them.
// This handles both formats safely.

function flattenStrapi<T>(raw: Record<string, unknown>): T {
  if (raw && typeof raw === 'object' && 'attributes' in raw) {
    return { id: raw.id, ...(raw.attributes as object) } as T;
  }
  return raw as T;
}
