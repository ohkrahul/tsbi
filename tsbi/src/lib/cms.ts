/**
 * Payload CMS (v3) REST client for the TSBI Next.js frontend.
 * Every function returns typed data and falls back to empty results when the CMS
 * is unreachable, so the site never breaks (pages layer their own hardcoded
 * fallbacks on top of an empty response).
 */
import type { CaseStudyGalleryItem } from './caseStudies';
import type { Campaign, YTWork } from './serviceCampaigns';

const CMS = process.env.NEXT_PUBLIC_CMS_URL ?? 'http://localhost:3001';

// ─── Types (kept identical to the old Strapi client so pages don't change) ────

export interface StrapiImage {
  url: string;
  width: number;
  height: number;
  alternativeText: string | null;
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

export interface MediaCoverageItem {
  id: string;
  title: string;
  source: string;
  url: string;
  /** Logo chosen in the CMS. Overrides the built-in per-publication logo. */
  logo?: string | null;
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

// ─── Core fetch helper ────────────────────────────────────────────────────────

type QueryOpts = { sort?: string; limit?: number; depth?: number; where?: Record<string, string> };

/**
 * Collections whose documents can be archived in the CMS. Archived means kept
 * there and hidden here, so the filter belongs in the fetch helper rather than
 * in each caller — one of a dozen queries forgetting it is how archived content
 * leaks back onto the site.
 */
const ARCHIVABLE = new Set(['case-studies', 'journal', 'media-coverage', 'careers', 'clients', 'tags']);

async function payloadGet<T = Record<string, unknown>>(
  collection: string,
  opts: QueryOpts = {},
): Promise<T[]> {
  const url = new URL(`/api/${collection}`, CMS);
  url.searchParams.set('depth', String(opts.depth ?? 1));
  url.searchParams.set('limit', String(opts.limit ?? 100));
  if (opts.sort) url.searchParams.set('sort', opts.sort);
  if (opts.where) {
    for (const [k, v] of Object.entries(opts.where)) url.searchParams.set(k, v);
  }
  // ANDed with anything the caller asked for.
  if (ARCHIVABLE.has(collection)) url.searchParams.set('where[archived][not_equals]', 'true');
  try {
    // Tagged so the CMS can clear exactly this collection the moment it
    // changes (see app/api/revalidate). The 60s window stays as the safety
    // net: if a revalidate call is ever missed, the site still catches up on
    // its own rather than serving a stale page until the next deploy.
    const res = await fetch(url.toString(), {
      next: { revalidate: 60, tags: ['cms', `cms:${collection}`] },
    });
    if (!res.ok) return [];
    const json = (await res.json()) as { docs?: T[] };
    return json.docs ?? [];
  } catch {
    return [];
  }
}

/** Payload upload doc → StrapiImage (absolute URL). */
type PayloadUpload = { url?: string | null; width?: number | null; height?: number | null; alt?: string | null };
function toImage(u: unknown): StrapiImage | null {
  if (!u || typeof u !== 'object') return null;
  const up = u as PayloadUpload;
  if (!up.url) return null;
  return {
    url: up.url.startsWith('http') ? up.url : `${CMS}${up.url}`,
    width: up.width ?? 0,
    height: up.height ?? 0,
    alternativeText: up.alt ?? null,
  };
}

/** Resolve an image (StrapiImage) to an absolute URL — kept for call-site compatibility. */
export function mediaUrl(img: StrapiImage | null | undefined): string {
  if (!img) return '';
  return img.url.startsWith('http') ? img.url : `${CMS}${img.url}`;
}

/**
 * Newest first, older at the bottom — the ordering every list on the site uses
 * now that `order` is no longer edited in the CMS.
 *
 * Day precision first, because the original content was all imported in single
 * runs with timestamps milliseconds apart: sorting on the raw value would
 * reverse the arrangement those imports established. Within the same day the
 * imported `order` still decides, which is what keeps /media and the
 * case-study grid looking exactly as they were curated. Anything added later
 * lands on a later day and goes straight to the top, and two things added on
 * the same day fall back to the actual time.
 */
function newestFirst(a: Record<string, unknown>, b: Record<string, unknown>): number {
  const day = (d: Record<string, unknown>) => String(d.createdAt ?? '').slice(0, 10);
  const rank = (d: Record<string, unknown>) => (typeof d.order === 'number' ? d.order : 0);
  const at = (d: Record<string, unknown>) => String(d.createdAt ?? '');
  return (
    (day(a) < day(b) ? 1 : day(a) > day(b) ? -1 : 0) ||
    rank(a) - rank(b) ||
    at(b).localeCompare(at(a))
  );
}

// ─── API functions ────────────────────────────────────────────────────────────

/** Case studies for the /case-studies list + detail pages (matches CaseStudyGalleryItem). */
/**
 * Payload returns null for every field an editor left blank, but
 * CaseStudyGalleryItem declares the text fields as always present — and these
 * functions used a blind `as unknown as` cast, so the nulls went straight
 * through a type that promised strings. `study.concept.split('

')` then
 * took the whole detail page down for any case study written in the studio
 * without a concept.
 *
 * Filling them here, at the one place raw docs become typed, makes the type
 * honest and covers every consumer — rather than each page having to remember
 * which of a dozen fields might be null.
 *
 * `year` is deliberately left alone: it renders nothing when null, whereas a 0
 * default would publish a wrong year.
 */
function asCaseStudy(d: Record<string, unknown>): CaseStudyGalleryItem {
  const str = (v: unknown) => (typeof v === 'string' ? v : '');
  return {
    ...d,
    slug: str(d.slug),
    title: str(d.title),
    clientName: str(d.clientName),
    category: str(d.category),
    shortDescription: str(d.shortDescription),
    concept: str(d.concept),
    image: str(d.image),
    services: Array.isArray(d.services) ? d.services.map(String) : [],
    // The studio calls these optional, so the site owes them a usable default:
    // an empty gradient renders a blank hero, not a neutral one.
    colorTheme: str(d.colorTheme) || '#e0197d',
    accent: str(d.accent) || '#e0197d',
    gradFrom: str(d.gradFrom) || '#2a0a1c',
    gradTo: str(d.gradTo) || '#14060e',
  } as unknown as CaseStudyGalleryItem;
}

export async function getCaseStudiesGallery(): Promise<CaseStudyGalleryItem[]> {
  const docs = await payloadGet<Record<string, unknown>>('case-studies', { sort: 'order' });
  return [...docs].sort(newestFirst).map(asCaseStudy);
}

/**
 * Case studies an editor has ticked for a given service page, e.g.
 * 'digital-transformation'. Ordered by the curated `order` field.
 */
export async function getCaseStudiesForService(service: string): Promise<CaseStudyGalleryItem[]> {
  const docs = await payloadGet<Record<string, unknown>>('case-studies', {
    sort: 'order',
    where: { 'where[serviceAreas][contains]': service },
  });
  return [...docs].sort(newestFirst).map(asCaseStudy);
}

/** Films for a card: the full campaign list if set, else the single video. */
function filmsOf(s: CaseStudyGalleryItem): string[] {
  if (s.youtubeFilms?.length) return s.youtubeFilms;
  return s.youtube ? [s.youtube] : [];
}

/**
 * Case studies shaped for the Content Production cards: the brand on top, the
 * campaign as the headline. Falls back to the case study's own copy when no
 * service-card override is set.
 */
export async function getServiceCampaigns(service: string): Promise<Campaign[]> {
  const studies = await getCaseStudiesForService(service);
  return studies.map((s) => ({
    client: s.clientName,
    category: s.category,
    title: s.cardHeadline || s.title,
    desc: s.cardBlurb || s.concept || s.shortDescription || '',
    videos: filmsOf(s),
    poster: s.image || undefined,
    caseStudySlug: s.slug,
    createdAt: s.createdAt ?? null,
  }));
}

/**
 * Case studies shaped for the Social Media cards, which show three lines: the
 * campaign, the brand under it, and the headline. Studies with no video are
 * skipped — the card is built around one.
 */
export async function getServiceYouTubeWork(service: string): Promise<YTWork[]> {
  const studies = await getCaseStudiesForService(service);
  return studies
    .filter((s) => filmsOf(s).length > 0)
    .map((s) => ({
      client: s.title,
      house: s.clientName,
      category: s.category,
      title: s.cardHeadline || s.title,
      desc: s.cardBlurb || s.shortDescription || s.concept || '',
      videoId: filmsOf(s)[0],
      caseStudySlug: s.slug,
      createdAt: s.createdAt ?? null,
    }));
}

/** Single case study by slug (for /case-studies/[slug]); null if not found. */
export async function getCaseStudyBySlug(slug: string): Promise<CaseStudyGalleryItem | null> {
  const docs = await payloadGet('case-studies', { where: { 'where[slug][equals]': slug }, limit: 1 });
  return docs[0] ? asCaseStudy(docs[0]) : null;
}

export async function getJournalArticles(): Promise<JournalArticle[]> {
  const docs = await payloadGet<Record<string, unknown>>('journal', { sort: '-publishedAt', limit: 50 });
  return docs.map((d) => ({
    id: Number(d.id),
    slug: String(d.slug ?? ''),
    category: String(d.category ?? ''),
    title: String(d.title ?? ''),
    excerpt: String(d.excerpt ?? ''),
    publishedAt: (d.publishedAt as string) ?? null,
    readTime: String(d.readTime ?? ''),
    gradient: String(d.gradient ?? ''),
    coverImage: toImage(d.coverImage),
    content: (d.content as string) ?? null,
  }));
}

export async function getJobListings(): Promise<JobListing[]> {
  const raw = await payloadGet<Record<string, unknown>>('careers', { sort: 'order', limit: 50 });
  const docs = [...raw].sort(newestFirst);
  return docs.map((d) => ({
    id: Number(d.id),
    role: String(d.role ?? ''),
    department: String(d.department ?? ''),
    location: String(d.location ?? ''),
    experience: String(d.experience ?? ''),
    skills: (d.skills as string[]) ?? [],
    responsibilities: (d.responsibilities as string[]) ?? [],
    order: Number(d.order ?? 0),
  }));
}

export async function getClientBrands(homeOnly = false): Promise<ClientBrand[]> {
  const opts: QueryOpts = { sort: 'order', limit: 300 };
  if (homeOnly) opts.where = { 'where[showOnHome][equals]': 'true' };
  const raw = await payloadGet<Record<string, unknown>>('clients', opts);
  const docs = [...raw].sort(newestFirst);
  return docs.map((d) => ({
    id: Number(d.id),
    name: String(d.name ?? ''),
    type: String(d.type ?? ''),
    caption: String(d.caption ?? ''),
    accent: String(d.accent ?? ''),
    image: toImage(d.image),
    cells: (d.cells as string[]) ?? [],
    isEntertainment: Boolean(d.isEntertainment),
    showOnHome: Boolean(d.showOnHome),
    order: Number(d.order ?? 0),
  }));
}

export async function getMediaCoverage(): Promise<MediaCoverageItem[]> {
  const raw = await payloadGet<Record<string, unknown>>('media-coverage', { sort: 'order', limit: 200 });
  const docs = [...raw].sort(newestFirst);
  return docs.map((d) => ({
    id: String(d.id),
    title: String(d.title ?? ''),
    source: String(d.source ?? ''),
    url: String(d.url ?? ''),
    logo: mediaUrl(toImage(d.logo)) || null,
  }));
}

/** Leadership slides — not part of the CMS scope; returns [] so /about keeps its
 *  hardcoded fallback. Kept only for call-site compatibility. */
export async function getLeadershipSlides(): Promise<LeadershipSlide[]> {
  const docs = await payloadGet<Record<string, unknown>>('leadership-slides', { sort: 'order', limit: 20 });
  return docs.map((d) => ({
    id: Number(d.id),
    type: (d.type as 'leader' | 'reel') ?? 'leader',
    num: String(d.num ?? ''),
    title: String(d.title ?? ''),
    role: (d.role as string) ?? null,
    intro: String(d.intro ?? ''),
    bgImage: toImage(d.bgImage),
    cardImage: toImage(d.cardImage),
    ctaLabel: String(d.ctaLabel ?? ''),
    ctaHref: (d.ctaHref as string) ?? null,
    order: Number(d.order ?? 0),
  }));
}
