'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { addedDay, caseStudies } from '@/lib/caseStudies';
import type { CaseStudyGalleryItem } from '@/lib/caseStudies';

/* Collapse same-brand variants into one chip (e.g. Zydus Lifesciences / Zydus India /
   Zydus Vaxiflu → "Zydus"). */
const brandOf = (clientName: string) =>
  clientName.startsWith('Zydus') ? 'Zydus' : clientName;

// Featured carousel — explicit running order (curated brands).
const FEATURED_SLUGS = [
  'gsk-yeh-science-hai',          // GSK
  'zydus-easiest-exam',           // Zydus
  'mumbai-indians',               // DHL × Mumbai Indians
  'danone-nurses-day',            // Danone
  'lipton-squid-game',            // Lipton
  'sitaare-zameen-par',           // Sitaare Zameen Par
  'ashok-leyland-she-drives-it',  // Ashok Leyland
];
const CARD_W   = 420;                  // base (desktop) card width (px)
const GAP      = 16;

/* circular distance: shortest path around the ring */
function cDist(i: number, active: number, n: number) {
  const d = ((i - active) % n + n) % n;
  return d > n / 2 ? d - n : d;
}

/* scale / opacity per distance */
const scaleOf    = (d: number) => d === 0 ? 1.32 : Math.abs(d) === 1 ? 0.87 : Math.abs(d) === 2 ? 0.76 : 0.68;
const opacityOf  = (d: number) => d === 0 ? 1    : Math.abs(d) === 1 ? 0.72 : Math.abs(d) === 2 ? 0.48 : 0.28;

/* ── Netflix grid card — clean image by default; details reveal on hover.
   The "View Case Study" pill stays visible at all times. ── */
function GridCard({ study }: { study: CaseStudyGalleryItem }) {
  const [hov, setHov] = useState(false);
  return (
    <Link href={`/case-studies/${study.slug}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ textDecoration:'none', display:'block', position:'relative', borderRadius:10, overflow:'hidden', aspectRatio:'16/9', cursor:'pointer', transition:'transform 0.3s cubic-bezier(0.22,1,0.36,1)', transform: hov ? 'scale(1.04)' : 'scale(1)' }}
    >
      <img src={study.image} alt={study.title} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />

      {/* darkening + text — only on hover */}
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)', opacity: hov ? 1 : 0, transition:'opacity 0.3s ease', pointerEvents:'none' }} />

      <div style={{ position:'absolute', top:10, left:12, opacity: hov ? 1 : 0, transition:'opacity 0.3s ease', pointerEvents:'none' }}>
        <span style={{ fontFamily:'var(--fm)', fontSize:8, letterSpacing:'0.14em', textTransform:'uppercase', color:'rgba(255,255,255,0.7)' }}>
          {study.category?.split(' · ').join(' • ') ?? ''}
        </span>
      </div>

      <div style={{ position:'absolute', left:14, right:14, bottom:54, opacity: hov ? 1 : 0, transform: hov ? 'translateY(0)' : 'translateY(10px)', transition:'opacity 0.3s ease, transform 0.3s ease', pointerEvents:'none' }}>
        <div style={{ fontFamily:'var(--fd)', fontSize:'clamp(13px,1.3vw,16px)', fontWeight:700, color:'#fff', lineHeight:1.2, marginBottom:3, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{study.title}</div>
        <div style={{ fontFamily:'var(--fm)', fontSize:10, color:'rgba(255,255,255,0.65)' }}>{study.clientName}</div>
      </div>

      {/* View Case Study — always-visible pill button */}
      <span style={{ position:'absolute', bottom:12, left:12, display:'inline-flex', alignItems:'center', gap:6, fontFamily:'var(--fm)', fontSize:9, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'#fff', background:'#e0197d', borderRadius:999, padding:'7px 14px', boxShadow:'0 4px 16px rgba(224,25,125,0.45)' }}>
        View Case Study <svg width="10" height="10" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </span>
    </Link>
  );
}

export default function CaseStudiesGallery({ studies = caseStudies }: { studies?: CaseStudyGalleryItem[] }) {
  const [active, setActive]           = useState(0);
  const [activeTag, setActiveTag]       = useState('');
  const [sortOrder, setSortOrder]     = useState<'newest' | 'oldest'>('newest');
  const [query, setQuery]             = useState('');
  const [containerW, setContainerW]   = useState(1280);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef     = useRef<ReturnType<typeof setInterval> | null>(null);

  /* Filter options come from the CMS `tags` relationship, ordered by each tag's
     `order` then name. If the CMS is unreachable the page falls back to the
     bundled studies, which carry no tags — so fall back to client brands there
     and the filter keeps working either way. */
  const FILTER_OPTIONS = useMemo(() => {
    const tagged = studies.flatMap((c) => c.tags ?? []);
    if (tagged.length) {
      const byName = new Map<string, number>();
      for (const t of tagged) if (!byName.has(t.name)) byName.set(t.name, t.order ?? 100);
      return Array.from(byName, ([name, order]) => ({ name, order }))
        .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name))
        .map((t) => t.name);
    }
    return Array.from(new Set(studies.map((c) => brandOf(c.clientName)))).sort((a, b) => a.localeCompare(b));
  }, [studies]);

  const matchesFilter = (c: CaseStudyGalleryItem) =>
    !activeTag ||
    (c.tags?.length ? c.tags.some((t) => t.name === activeTag) : brandOf(c.clientName) === activeTag);
  const FEATURED = useMemo(
    () => FEATURED_SLUGS.map((slug) => studies.find((c) => c.slug === slug)).filter((c): c is CaseStudyGalleryItem => Boolean(c)),
    [studies],
  );
  const N = FEATURED.length || 1;

  /* measure container */
  useEffect(() => {
    const m = () => { if (containerRef.current) setContainerW(containerRef.current.offsetWidth); };
    m();
    window.addEventListener('resize', m);
    return () => window.removeEventListener('resize', m);
  }, []);

  /* auto-advance */
  useEffect(() => {
    timerRef.current = setInterval(() => setActive(p => (p + 1) % N), 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const goTo = (i: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setActive(((i % N) + N) % N);
    timerRef.current = setInterval(() => setActive(p => (p + 1) % N), 5000);
  };

  /* responsive card sizing — shrink the carousel on small screens */
  const isMobile    = containerW < 768;
  const cardW       = isMobile ? Math.min(containerW - 56, 300) : CARD_W;
  const cardH       = Math.round(cardW * 9 / 16);
  const stride      = cardW + GAP;
  const activeScale = isMobile ? 1.06 : 1.32;
  const sOf = (d: number) => (d === 0 ? activeScale : scaleOf(d));

  /* how many cards fit each side of center */
  const visible = Math.ceil((containerW / 2) / stride) + 2;

  /* center x so active card sits at viewport center */
  const centerX = containerW / 2 - cardW / 2;

  const cmp = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0);
  const q = query.trim().toLowerCase();
  const filteredGrid = studies
    .filter(matchesFilter)
    .filter((s) =>
      !q ||
      (s.title ?? '').toLowerCase().includes(q) ||
      (s.clientName ?? '').toLowerCase().includes(q) ||
      (s.category ?? '').toLowerCase().includes(q),
    )
    .sort((a, b) => {
      const dir = sortOrder === 'newest' ? -1 : 1;
      return (
        cmp(addedDay(a), addedDay(b)) * dir ||
        ((a.year ?? 0) - (b.year ?? 0)) * dir ||
        (a.order ?? 0) - (b.order ?? 0) ||
        (a.title ?? '').localeCompare(b.title ?? '')
      );
    });

  return (
    <div style={{ background:'linear-gradient(to right, #101a33 0%, #241640 50%, #34195a 100%)', minHeight:'100vh', paddingTop:80 }}>

      {/* ── HEADER ── */}
      <div style={{ textAlign:'center', padding: isMobile ? '32px 20px 28px' : '52px 48px 40px' }}>
        <div style={{ fontFamily:'var(--fm)', fontSize:10, letterSpacing:'0.28em', textTransform:'uppercase', color:'#e0197d', marginBottom:12 }}>
          Our Work in Action
        </div>
        <h1 style={{ fontFamily:'var(--fa)', fontSize:'clamp(44px,7vw,88px)', fontWeight:600, textTransform:'uppercase', color:'#fff', lineHeight:1.0, letterSpacing:'0.01em', margin:'0 0 16px' }}>
          Case Studies
        </h1>
        <p style={{ fontFamily:'var(--fm)', fontSize:15, color:'rgba(255,255,255,0.4)', fontWeight:300, maxWidth:480, margin:'0 auto', lineHeight:1.7 }}>
          Explore how we craft powerful stories, build cultural moments,<br/>
          and deliver measurable impact for our partners.
        </p>
      </div>

      {/* ── INFINITE CIRCULAR SLIDER ── */}
      <div style={{ position:'relative' }}>
        <div
          ref={containerRef}
          style={{ position:'relative', width:'100%', height: cardH * activeScale + 32, overflow:'hidden' }}
        >
          {FEATURED.map((study, i) => {
            const d   = cDist(i, active, N);
            if (Math.abs(d) > visible) return null; // don't render invisible cards

            const sc  = sOf(d);
            const op  = opacityOf(d);
            const isAct = d === 0;
            // x = center + d * stride, adjusted for active card width expansion
            const x   = centerX + d * stride;
            const y   = (cardH * activeScale - cardH) / 2 + 16; // vertical center

            return (
              <motion.div
                key={study.id}
                animate={{ x, y, scale: sc, opacity: op }}
                transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => !isAct && goTo(i)}
                style={{
                  position:'absolute', left:0, top:0,
                  width: cardW, height: cardH,
                  borderRadius: 13, overflow:'hidden',
                  cursor: isAct ? 'default' : 'pointer',
                  zIndex: 10 - Math.abs(d),
                  transformOrigin:'center center',
                }}
              >
                <img src={study.image} alt={study.clientName}
                  style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)' }} />

                {/* Featured badge — on whichever card is centered */}
                {isAct && (
                  <div style={{ position:'absolute', top:12, left:14, background:'rgba(255,200,0,0.92)', color:'#000', fontFamily:'var(--fm)', fontSize:9, fontWeight:700, letterSpacing:'0.1em', padding:'3px 9px', borderRadius:5 }}>
                    ★ FEATURED
                  </div>
                )}

                {/* Content overlay */}
                <div style={{ position:'absolute', bottom:0, left:0, right:0, padding: isAct ? '20px 18px 16px' : '12px 12px 10px' }}>
                  {/* <div style={{ fontFamily:'var(--fm)', fontSize: isAct?10:8, letterSpacing:'0.1em', textTransform:'uppercase', color:'rgba(255,255,255,0.55)', marginBottom:5 }}>
                    {study.category?.split(' · ').join(' • ') ?? ''}
                  </div> */}
                  {/* <div style={{ fontFamily:'var(--fd)', fontSize: isAct?'clamp(18px,2vw,24px)':'clamp(11px,1.1vw,14px)', fontWeight:700, color:'#fff', lineHeight:1.1, marginBottom:3 }}>
                    {study.title}
                  </div> */}
                  <div style={{ fontFamily:'var(--fm)', fontSize: isAct?11:9, color:'rgba(255,255,255,0.5)', marginBottom: isAct?12:0 }}>
                    {study.clientName}
                  </div>
                  {isAct && (
                    <Link href={`/case-studies/${study.slug}`}
                      onClick={e => e.stopPropagation()}
                      style={{ display:'inline-flex', alignItems:'center', gap:7, fontFamily:'var(--fm)', fontSize:11, fontWeight:600, color:'#fff', textDecoration:'none', letterSpacing:'0.1em', textTransform:'uppercase', border:'1px solid rgba(255,255,255,0.4)', borderRadius:999, padding:'8px 18px', transition:'background 0.2s, border-color 0.2s' }}
                      onMouseEnter={e=>{const el=e.currentTarget as HTMLElement;el.style.background='rgba(255,255,255,0.18)';el.style.borderColor='#fff';}}
                      onMouseLeave={e=>{const el=e.currentTarget as HTMLElement;el.style.background='transparent';el.style.borderColor='rgba(255,255,255,0.4)';}}
                    >
                      View Case Study
                      <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </Link>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Arrow buttons */}
        {([{dir:-1,side:{left:16}},{dir:1,side:{right:16}}] as {dir:number;side:Record<string,number>}[]).map(({dir,side})=>(
          <button key={dir} onClick={()=>goTo(active+dir)}
            style={{ position:'absolute', top:'50%', transform:'translateY(-50%)', ...side, width:40, height:40, borderRadius:'50%', background:'rgba(255,255,255,0.1)', backdropFilter:'blur(8px)', border:'1px solid rgba(255,255,255,0.15)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', transition:'background 0.2s', zIndex:30 }}
            onMouseEnter={e=>(e.currentTarget as HTMLButtonElement).style.background='rgba(255,255,255,0.22)'}
            onMouseLeave={e=>(e.currentTarget as HTMLButtonElement).style.background='rgba(255,255,255,0.1)'}
          >
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              {dir===-1
                ?<path d="M9 2L4 7l5 5" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                :<path d="M5 2l5 5-5 5" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              }
            </svg>
          </button>
        ))}

        {/* Dots */}
        <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:7, marginTop:18, padding:'0 20px 6px', maxWidth: 520, marginInline: 'auto' }}>
          {FEATURED.map((_,i)=>(
            <button key={i} onClick={()=>goTo(i)}
              style={{ width:i===active?22:7, height:7, borderRadius:4, background:i===active?'#e0197d':'rgba(255,255,255,0.2)', border:'none', cursor:'pointer', padding:0, transition:'all 0.32s cubic-bezier(0.22,1,0.36,1)' }}
            />
          ))}
        </div>
      </div>

      {/* ── NETFLIX GRID ── */}
      <div style={{ padding: isMobile ? '40px 20px 60px' : '60px 48px 80px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:18, flexWrap:'wrap', gap:20 }}>
          <div>
            <div style={{ fontFamily:'var(--fm)', fontSize:9, letterSpacing:'0.22em', textTransform:'uppercase', color:'#e0197d', marginBottom:10 }}>All Case Studies</div>
            <h2 style={{ fontFamily:'var(--fa)', fontSize:'clamp(26px,3.4vw,44px)', fontWeight:600, color:'#fff', lineHeight:1.05, letterSpacing:'0.01em', margin:0 }}>
              More Work.<br/>More Impact.
            </h2>
          </div>
          {/* filter dropdown (options are CMS tags) + search bar */}
          {/* one row on desktop; allowed to wrap on phones so it can't overflow */}
          <div style={{ display:'flex', gap:10, flexWrap: isMobile ? 'wrap' : 'nowrap', alignItems:'center' }}>
          <div style={{ position:'relative', flex:'0 0 auto' }}>
            <select
              value={activeTag}
              onChange={(e) => setActiveTag(e.target.value)}
              aria-label="Filter case studies by tag"
              style={{ appearance:'none', WebkitAppearance:'none', fontFamily:'var(--fm)', fontSize:12, color:'#fff', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.16)', borderRadius:999, padding:'11px 38px 11px 18px', outline:'none', cursor:'pointer', minWidth:190 }}
            >
              <option value="" style={{ background:'#241640', color:'#fff' }}>All case studies</option>
              {FILTER_OPTIONS.map((name) => (
                <option key={name} value={name} style={{ background:'#241640', color:'#fff' }}>{name}</option>
              ))}
            </select>
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden="true"
              style={{ position:'absolute', right:16, top:'50%', transform:'translateY(-50%)', pointerEvents:'none' }}>
              <path d="M3 5l4 4 4-4" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div style={{ position:'relative', flex:'0 0 auto' }}>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
              aria-label="Sort case studies by year"
              style={{ appearance:'none', WebkitAppearance:'none', fontFamily:'var(--fm)', fontSize:12, color:'#fff', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.16)', borderRadius:999, padding:'11px 38px 11px 18px', outline:'none', cursor:'pointer' }}
            >
              <option value="newest" style={{ background:'#241640', color:'#fff' }}>Newest first</option>
              <option value="oldest" style={{ background:'#241640', color:'#fff' }}>Oldest first</option>
            </select>
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden="true"
              style={{ position:'absolute', right:16, top:'50%', transform:'translateY(-50%)', pointerEvents:'none' }}>
              <path d="M3 5l4 4 4-4" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div style={{ position:'relative', flex:'1 1 200px', minWidth:150 }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position:'absolute', left:15, top:'50%', transform:'translateY(-50%)', pointerEvents:'none' }}>
              <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search case studies…"
              aria-label="Search case studies"
              style={{ width:'100%', fontFamily:'var(--fm)', fontSize:12, color:'#fff', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.16)', borderRadius:999, padding:'11px 16px 11px 40px', outline:'none' }}
            />
          </div>
          </div>
        </div>

        {/* result count / active filter readout */}
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:24, flexWrap:'wrap' }}>
          <span style={{ fontFamily:'var(--fm)', fontSize:11, color:'rgba(255,255,255,0.42)' }}>
            {filteredGrid.length} {filteredGrid.length === 1 ? 'case study' : 'case studies'}
            {activeTag ? ' in' : ''}
          </span>
          {activeTag && (
            <button onClick={()=>setActiveTag('')}
              style={{ display:'inline-flex', alignItems:'center', gap:7, fontFamily:'var(--fm)', fontSize:11, fontWeight:600, color:'#fff', background:'rgba(224,25,125,0.18)', border:'1px solid rgba(224,25,125,0.5)', borderRadius:999, padding:'5px 12px', cursor:'pointer' }}
              aria-label={`Clear the ${activeTag} filter`}
            >
              {activeTag}
              <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
            </button>
          )}
        </div>

        <motion.div
          key={`${activeTag}-${sortOrder}`}
          initial={{ opacity:0, y:10 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:0.35, ease:[0.22,1,0.36,1] }}
          style={{ display:'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap:12 }}
        >
          {filteredGrid.map(study=><GridCard key={study.slug} study={study}/>)}
        </motion.div>

        {filteredGrid.length===0 && (
          <div style={{ textAlign:'center', padding:'60px 0', fontFamily:'var(--fm)', color:'rgba(255,255,255,0.25)', fontSize:14 }}>
            No case studies match your search.
          </div>
        )}
      </div>
    </div>
  );
}
