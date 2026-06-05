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

const PER_PAGE = 9;

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
    <div className="media-page">
      {/* ── Hero ─────────────────────────────────────────── */}
      <div className="media-hero">
        <div className="media-hero-left">
          <div className="media-eyebrow">Media Coverage</div>
          <h1 className="media-h1">TSBI In The News</h1>
          <div className="media-divider" />
          <p className="media-desc">
            From strategy to storytelling — see how leading publications spotlight TSBI and the work we do.
          </p>
        </div>
        <div className="media-hero-img-wrap">
          <Image
            src="/media/tsbinewspaperimg.png"
            alt="TSBI in the press"
            width={340}
            height={260}
            style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
            priority
          />
        </div>
      </div>

      {/* ── Main ─────────────────────────────────────────── */}
      <div className="media-main">

        {/* ── Sidebar ──────────────────────────────────── */}
        <aside className="media-sidebar">
          <div className="media-filter-label">Filter By</div>

          {/* Category */}
          <div className="media-filter-section">
            <div className="media-filter-title" onClick={() => setCatOpen(o => !o)} style={{ cursor: 'pointer' }}>
              Category
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transition: 'transform 0.2s', transform: catOpen ? 'rotate(0deg)' : 'rotate(-90deg)' }}>
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            {catOpen && CATEGORIES.map(cat => (
              <label key={cat} className="media-radio-row" onClick={() => setCategory(cat)}>
                <span className={`media-radio ${activeCategory === cat ? 'active' : ''}`} />
                <span className="media-radio-label">{cat}</span>
              </label>
            ))}
          </div>

          {/* Publication */}
          <div className="media-filter-section" style={{ marginTop: 28 }}>
            <div className="media-filter-title" onClick={() => setPubOpen(o => !o)} style={{ cursor: 'pointer' }}>
              Publication
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transition: 'transform 0.2s', transform: pubOpen ? 'rotate(0deg)' : 'rotate(-90deg)' }}>
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div style={{ display: pubOpen ? 'block' : 'none' }}>
              <div className="media-pub-search-wrap">
                <input
                  className="media-pub-search"
                  placeholder="Search publication"
                  value={pubSearch}
                  onChange={e => setPubSearch(e.target.value)}
                />
                <svg className="media-pub-search-icon" width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.4"/>
                  <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
              </div>

              <label className="media-check-row all-pubs" onClick={() => { setActivePubs(new Set()); setPage(1); }}>
                <span className={`media-checkbox ${activePubs.size === 0 ? 'active' : ''}`}>
                  {activePubs.size === 0 && <svg width="9" height="7" viewBox="0 0 9 7" fill="none"><path d="M1 3.5L3.5 6 8 1" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </span>
                <span className="media-check-label">All Publications</span>
                <span className="media-check-count">{articles.length}</span>
              </label>

              <div className="media-pub-list">
                {filteredPubs.map(([name, count]) => (
                  <label key={name} className="media-check-row" onClick={() => togglePub(name)}>
                    <span className={`media-checkbox ${activePubs.has(name) ? 'active' : ''}`}>
                      {activePubs.has(name) && <svg width="9" height="7" viewBox="0 0 9 7" fill="none"><path d="M1 3.5L3.5 6 8 1" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    </span>
                    <span className="media-check-label">{name}</span>
                    <span className="media-check-count">{count}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {(activeCategory !== 'All' || activePubs.size > 0) && (
            <button className="media-clear-btn" onClick={clearFilters}>
              Clear Filters
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7c0-2.76 2.24-5 5-5s5 2.24 5 5-2.24 5-5 5-5-2.24-5-5z" stroke="currentColor" strokeWidth="1.2"/><path d="M9 5l-4 4M5 5l4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
            </button>
          )}
        </aside>

        {/* ── Article list ─────────────────────────────── */}
        <div className="media-list-wrap">
          {paginated.length === 0 ? (
            <div style={{ padding: '60px 0', textAlign: 'center', color: 'rgba(0,0,0,0.4)', fontFamily: 'var(--fm)', fontSize: 13 }}>
              No articles match the selected filters.
            </div>
          ) : (
            paginated.map(article => (
              <a
                key={article.id}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="media-article-row"
              >
                {/* Logo */}
                <div className="media-article-logo-wrap">
                  {PUB_LOGO[article.source] ? (
                    <Image
                      src={PUB_LOGO[article.source]}
                      alt={article.source}
                      width={120}
                      height={48}
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  ) : (
                    <span className="media-article-logo-text">{article.source}</span>
                  )}
                </div>

                {/* Content */}
                <div className="media-article-content">
                  <div className="media-article-title">{article.title}</div>
                  <div className="media-article-meta">
                    <span className="media-article-source">{article.source}</span>
                  </div>
                </div>

                {/* CTA */}
                <div className="media-article-cta">
                  <span>Read More</span>
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </a>
            ))
          )}

          {/* ── Pagination ───────────────────────────── */}
          {totalPages > 1 && (
            <div className="media-pagination">
              <button className="media-pg-btn" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>

              {Array.from({ length: Math.min(totalPages, 6) }, (_, i) => {
                const pg = i + 1;
                return (
                  <button key={pg} className={`media-pg-num ${page === pg ? 'active' : ''}`} onClick={() => setPage(pg)}>
                    {pg}
                  </button>
                );
              })}

              {totalPages > 6 && <span className="media-pg-ellipsis">...</span>}
              {totalPages > 6 && (
                <button className={`media-pg-num ${page === totalPages ? 'active' : ''}`} onClick={() => setPage(totalPages)}>
                  {totalPages}
                </button>
              )}

              <button className="media-pg-btn" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>

              <button className="media-load-more" onClick={() => setPage(p => Math.min(totalPages, p + 1))}>
                Load More
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.2"/><path d="M5 7h4M7 5v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
