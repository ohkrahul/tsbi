'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';

interface Article {
  id: string;
  title: string;
  source: string;
  url: string;
}

/* ── Publication → logo file ─────────────────────────────── */
const PUB_LOGO: Record<string, string> = {
  'exchange4media':         '/media/e4m.png',
  'Social Samosa':          '/media/socialsamosa.png',
  'MediaBrief':             '/media/mediabref.png',
  'The Financial Express':  '/media/financialcontrol.png',
  'afaqs!':                 '/media/afaqs.png',
  'Mint':                   '/media/mint.png',
  'Indian Television':      '/media/indiantelevision.png',
  'IMPACT':                 '/media/impact.png',
  'BW Marketing World':     '/media/bwmarketing.png',
  'Storyboard18':           '/media/storyboard.png',
  'Economic Times':         '/media/theeconomictimes.png',
  'MediaInfoLine':          '/media/mdiainfone.png',
  'Hindustan Times':        '/media/hindustan.png',
  'Business Standard':      '/media/businessStanrd.png',
  'Adgully':                '/media/adgully.png',
  'Adgully ME':             '/media/adgully.png',
  'BestMediaInfo':          '/media/bestmidainfo.png',
  'The Hindu BusinessLine': '/media/businessline.png',
  'Moneycontrol':           '/media/moneycontrol.png',
  'Marketing Mind':         '/media/marketingmind.png',
  'Social Media Dissect':   '/media/socialmediadissect.png',
  'Campaign India':         '/media/compaign.png',
  'ET BrandEquity':         '/media/brandequitycom.png',
  'MxMIndia':               '/media/mxm.png',
  'Dailyhunt':              '/media/dailyhunt.png',
  'Advanced Television':    '/media/advancetelevison.png',
  'Indian Broadcasting World': '/media/ibw.png',
  'Passionate in Marketing': '/media/passionateinmarketing.png',
  'Knowledia News':         '/media/socialmediainfo.png',
};

/* ── Auto-categorise from title keywords ─────────────────── */
const CATEGORIES = ['All', 'Recognition', 'Campaigns', 'Industry Insights', 'Leadership', 'Partnerships', 'Awards'];

function getCategory(title: string): string {
  const t = title.toLowerCase();
  if (/\bwins?\b|award|bags\s+(the\s+)?mandate|bags\s+\w+\s+award|recogni|felicit|honour|honor/.test(t)) return 'Recognition';
  if (/\baward/.test(t)) return 'Awards';
  if (/mandate|partners?\s+(with|up)|partnership|collaborat|ties?\s+up/.test(t)) return 'Partnerships';
  if (/campaign|creative\s+mandate|brand\s+(story|mandate|strat)|storytell/.test(t)) return 'Campaigns';
  if (/leadership|expands?\s+(team|lead)|hires?|appoints?|promotes?|joins?\s+as/.test(t)) return 'Leadership';
  return 'Industry Insights';
}

const PER_PAGE = 30;

/* shared font helpers (matches the home page) */
const FA = 'font-fa'; // display headings — maps to Space Grotesk (same as home hero)
const FM = 'font-fm'; // Space Grotesk — labels & body

export default function MediaPageClient({ articles }: { articles: Article[] }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activePubs, setActivePubs] = useState<Set<string>>(new Set());
  const [pubSearch, setPubSearch] = useState('');
  const [page, setPage] = useState(1);
  const [catOpen, setCatOpen] = useState(true);
  const [pubOpen, setPubOpen] = useState(true);

  /* publication counts */
  const pubCounts = useMemo(() => {
    const map: Record<string, number> = {};
    articles.forEach(a => { map[a.source] = (map[a.source] || 0) + 1; });
    return map;
  }, [articles]);

  const allPubs = useMemo(() =>
    Object.entries(pubCounts).sort((a, b) => b[1] - a[1]),
    [pubCounts]
  );

  const filteredPubs = allPubs.filter(([name]) =>
    name.toLowerCase().includes(pubSearch.toLowerCase())
  );

  /* filtered articles */
  const filtered = useMemo(() => {
    return articles.filter(a => {
      const cat = getCategory(a.title);
      const catOk = activeCategory === 'All' || cat === activeCategory;
      const pubOk = activePubs.size === 0 || activePubs.has(a.source);
      return catOk && pubOk;
    });
  }, [articles, activeCategory, activePubs]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  function togglePub(name: string) {
    setActivePubs(prev => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
    setPage(1);
  }

  function setCategory(cat: string) {
    setActiveCategory(cat);
    setPage(1);
  }

  function clearFilters() {
    setActiveCategory('All');
    setActivePubs(new Set());
    setPubSearch('');
    setPage(1);
  }

  return (
    <div className={`min-h-screen bg-white pt-[76px] text-[#0a0a0a] sm:pt-[90px] ${FM}`}>
      {/* ── Hero ─────────────────────────────────────────── */}
      <div className="flex flex-col gap-8 border-b border-black/[0.07] px-5 py-9 sm:px-10 sm:py-12 lg:flex-row lg:items-center lg:justify-between lg:px-20 lg:py-14">
        <div className="flex-1">
          <div className="mb-3.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-magenta">Media Coverage</div>
          <h1 className={`mb-4 text-[clamp(34px,9vw,68px)] font-semibold uppercase leading-[1.05] tracking-[0.01em] ${FA}`}>
            TSBI In The <em className="italic text-magenta">News</em>
          </h1>
          <div className="mb-[18px] h-[3px] w-9 rounded-sm bg-magenta" />
          <p className="max-w-[400px] text-sm leading-relaxed text-black/50">
            From strategy to storytelling — see how leading publications spotlight TSBI and the work we do.
          </p>
        </div>
        <div className="mx-auto w-full max-w-[240px] shrink-0 sm:max-w-[300px] lg:mx-0 lg:w-80">
          <Image
            src="/media/tsbinewspaperimg.png"
            alt="TSBI in the press"
            width={340}
            height={260}
            className="h-auto w-full object-contain"
            priority
          />
        </div>
      </div>

      {/* ── Main ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 px-5 pb-16 sm:px-10 lg:grid-cols-[240px_1fr] lg:px-20">

        {/* ── Sidebar / Filters ───────────────────────────── */}
        <aside className="border-b border-black/[0.07] py-6 lg:sticky lg:top-[90px] lg:max-h-[calc(100vh-90px)] lg:overflow-y-auto lg:border-b-0 lg:border-r lg:py-10 lg:pr-8">
          <div className="mb-5 text-[9px] uppercase tracking-[0.22em] text-black/[0.36]">Filter By</div>

          {/* Category */}
          <div className="mb-2">
            <div
              className="mb-3.5 flex cursor-pointer items-center justify-between border-b border-black/[0.06] pb-3 text-[11px] font-semibold tracking-[0.04em]"
              onClick={() => setCatOpen(o => !o)}
            >
              Category
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transition: 'transform 0.2s', transform: catOpen ? 'rotate(0deg)' : 'rotate(-90deg)' }}>
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            {catOpen && (
              <div className="flex flex-wrap gap-x-4 gap-y-0.5 lg:block">
                {CATEGORIES.map(cat => (
                  <label key={cat} className="flex cursor-pointer items-center gap-2.5 py-[5px]" onClick={() => setCategory(cat)}>
                    <span className={`relative h-3.5 w-3.5 shrink-0 rounded-full border-[1.5px] transition-colors ${activeCategory === cat ? 'border-magenta bg-magenta shadow-[0_0_0_3px_rgba(224,25,125,0.15)]' : 'border-black/20'}`}>
                      {activeCategory === cat && <span className="absolute left-1/2 top-1/2 h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />}
                    </span>
                    <span className="text-xs text-black/70">{cat}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Publication */}
          <div className="mt-7">
            <div
              className="mb-3.5 flex cursor-pointer items-center justify-between border-b border-black/[0.06] pb-3 text-[11px] font-semibold tracking-[0.04em]"
              onClick={() => setPubOpen(o => !o)}
            >
              Publication
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transition: 'transform 0.2s', transform: pubOpen ? 'rotate(0deg)' : 'rotate(-90deg)' }}>
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className={pubOpen ? 'block' : 'hidden'}>
              <div className="relative mb-3">
                <input
                  className="w-full rounded-md border border-black/[0.12] bg-[#fafaf9] px-3 py-2 pr-8 text-[11px] outline-none focus:border-magenta"
                  placeholder="Search publication"
                  value={pubSearch}
                  onChange={e => setPubSearch(e.target.value)}
                />
                <svg className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-black/30" width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </div>

              <label className="mb-1.5 flex cursor-pointer items-center gap-2.5 border-b border-black/[0.06] pb-2" onClick={() => { setActivePubs(new Set()); setPage(1); }}>
                <span className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-[3px] border-[1.5px] transition-colors ${activePubs.size === 0 ? 'border-magenta bg-magenta' : 'border-black/20'}`}>
                  {activePubs.size === 0 && <svg width="9" height="7" viewBox="0 0 9 7" fill="none"><path d="M1 3.5L3.5 6 8 1" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                </span>
                <span className="flex-1 text-[11px] text-black/[0.68]">All Publications</span>
                <span className="min-w-[20px] text-right text-[10px] font-semibold text-magenta">{articles.length}</span>
              </label>

              <div className="max-h-[280px] overflow-y-auto">
                {filteredPubs.map(([name, count]) => (
                  <label key={name} className="flex cursor-pointer items-center gap-2.5 py-[5px]" onClick={() => togglePub(name)}>
                    <span className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-[3px] border-[1.5px] transition-colors ${activePubs.has(name) ? 'border-magenta bg-magenta' : 'border-black/20'}`}>
                      {activePubs.has(name) && <svg width="9" height="7" viewBox="0 0 9 7" fill="none"><path d="M1 3.5L3.5 6 8 1" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                    </span>
                    <span className="flex-1 text-[11px] text-black/[0.68]">{name}</span>
                    <span className="min-w-[20px] text-right text-[10px] font-semibold text-magenta">{count}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {(activeCategory !== 'All' || activePubs.size > 0) && (
            <button className="mt-5 flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-md border border-black/10 bg-black/[0.04] px-3.5 py-2 text-[10px] uppercase tracking-[0.1em] text-black/45 transition-colors hover:border-magenta hover:text-magenta" onClick={clearFilters}>
              Clear Filters
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7c0-2.76 2.24-5 5-5s5 2.24 5 5-2.24 5-5 5-5-2.24-5-5z" stroke="currentColor" strokeWidth="1.2" /><path d="M9 5l-4 4M5 5l4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
            </button>
          )}
        </aside>

        {/* ── Article list ─────────────────────────────── */}
        <div className="pt-6 lg:pl-10 lg:pt-10">
          {paginated.length === 0 ? (
            <div className="py-16 text-center text-[13px] text-black/40">
              No articles match the selected filters.
            </div>
          ) : (
            paginated.map(article => (
              <a
                key={article.id}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3.5 rounded-md border-b border-black/[0.07] py-4 no-underline transition-colors hover:bg-magenta/[0.03] sm:gap-6 sm:py-[22px]"
              >
                {/* Logo */}
                <div
                  className="flex h-11 w-[84px] shrink-0 items-center justify-center overflow-hidden rounded p-1 sm:h-[52px] sm:w-[120px] lg:w-[140px]"
                  style={{ backgroundColor: PUB_LOGO[article.source] ? 'transparent' : '#f0f0f0' }}
                >
                  {PUB_LOGO[article.source] ? (
                    <Image
                      src={PUB_LOGO[article.source]}
                      alt={article.source}
                      width={220}
                      height={68}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className={`text-center text-[11px] font-bold sm:text-[13px] ${FA}`}>{article.source}</span>
                  )}
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="mb-1.5 text-sm font-bold leading-snug sm:text-[15px] lg:text-[17px]">{article.title}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-magenta">{article.source}</span>
                  </div>
                </div>

                {/* CTA — desktop pill */}
                <div className="hidden shrink-0 items-center justify-center gap-1.5 rounded-md border border-black/[0.12] px-3.5 py-2 text-[11px] tracking-[0.06em] text-black/55 transition-colors group-hover:border-magenta group-hover:text-magenta sm:flex">
                  <span>Read More</span>
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                {/* CTA — mobile chevron */}
                <svg className="shrink-0 text-black/30 transition-colors group-hover:text-magenta sm:hidden" width="16" height="16" viewBox="0 0 14 14" fill="none">
                  <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            ))
          )}

          {/* ── Pagination ───────────────────────────── */}
          {totalPages > 1 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-8">
              <button className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-black/[0.13] transition-colors hover:border-magenta hover:text-magenta disabled:cursor-default disabled:opacity-30 disabled:hover:border-black/[0.13] disabled:hover:text-current" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>

              {Array.from({ length: Math.min(totalPages, 6) }, (_, i) => {
                const pg = i + 1;
                return (
                  <button
                    key={pg}
                    className={`h-[34px] w-[34px] rounded-full border text-xs transition-colors ${page === pg ? 'border-magenta bg-magenta text-white' : 'border-black/[0.13] hover:border-magenta hover:text-magenta'}`}
                    onClick={() => setPage(pg)}
                  >
                    {pg}
                  </button>
                );
              })}

              {totalPages > 6 && <span className="px-1 text-[13px] text-black/40">...</span>}
              {totalPages > 6 && (
                <button className={`h-[34px] w-[34px] rounded-full border text-xs transition-colors ${page === totalPages ? 'border-magenta bg-magenta text-white' : 'border-black/[0.13] hover:border-magenta hover:text-magenta'}`} onClick={() => setPage(totalPages)}>
                  {totalPages}
                </button>
              )}

              <button className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-black/[0.13] transition-colors hover:border-magenta hover:text-magenta disabled:cursor-default disabled:opacity-30 disabled:hover:border-black/[0.13] disabled:hover:text-current" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>

              <button className="ml-auto flex items-center gap-2 rounded-full border border-black/[0.13] px-5 py-2 text-[11px] uppercase tracking-[0.1em] transition-colors hover:border-magenta hover:text-magenta" onClick={() => setPage(p => Math.min(totalPages, p + 1))}>
                Load More
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.2" /><path d="M5 7h4M7 5v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
