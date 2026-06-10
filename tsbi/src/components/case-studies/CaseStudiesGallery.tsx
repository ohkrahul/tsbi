'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { caseStudies } from '@/lib/caseStudies';
import type { CaseStudyGalleryItem } from '@/lib/caseStudies';

/* ── Category filters ── */
const FILTERS = [
  { label: 'All',                fn: (_: CaseStudyGalleryItem) => true },
  { label: 'Film Marketing',     fn: (s: CaseStudyGalleryItem) => s.category.includes('Film Marketing') },
  { label: 'Digital Campaigns',  fn: (s: CaseStudyGalleryItem) => s.category.includes('Healthcare') || s.category.includes('Commercial') || s.category.includes('Preventive') },
  { label: 'Brand Partnerships', fn: (s: CaseStudyGalleryItem) => s.category.includes('Logistics') || s.category.includes('Defence') || s.category.includes('Food') },
  { label: 'Content & Social',   fn: (s: CaseStudyGalleryItem) => s.category.includes('Comedy') || s.category.includes('Festive') || s.category.includes('Awareness') },
];

const N        = caseStudies.length;   // 13 — all used for infinite fill
const CARD_W   = 420;                  // base card width (px)
const CARD_H   = Math.round(CARD_W * 9 / 16);  // 236px  16:9
const GAP      = 16;
const STRIDE   = CARD_W + GAP;

/* circular distance: shortest path around the ring */
function cDist(i: number, active: number) {
  const d = ((i - active) % N + N) % N;
  return d > N / 2 ? d - N : d;
}

/* scale / opacity per distance */
const scaleOf    = (d: number) => d === 0 ? 1.32 : Math.abs(d) === 1 ? 0.87 : Math.abs(d) === 2 ? 0.76 : 0.68;
const opacityOf  = (d: number) => d === 0 ? 1    : Math.abs(d) === 1 ? 0.72 : Math.abs(d) === 2 ? 0.48 : 0.28;

/* ── Netflix grid card ── */
function GridCard({ study }: { study: CaseStudyGalleryItem }) {
  return (
    <Link href={`/case-studies/${study.slug}`}
      style={{ textDecoration:'none', display:'block', position:'relative', borderRadius:10, overflow:'hidden', aspectRatio:'16/9', cursor:'pointer', transition:'transform 0.3s cubic-bezier(0.22,1,0.36,1)' }}
      onMouseEnter={e=>(e.currentTarget as HTMLElement).style.transform='scale(1.05)'}
      onMouseLeave={e=>(e.currentTarget as HTMLElement).style.transform='scale(1)'}
    >
      <img src={study.image} alt={study.title} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.05) 55%, transparent 100%)' }} />
      <div style={{ position:'absolute', top:10, left:12 }}>
        <span style={{ fontFamily:'var(--fm)', fontSize:8, letterSpacing:'0.14em', textTransform:'uppercase', color:'rgba(255,255,255,0.5)' }}>
          {study.category.split(' · ').join(' • ')}
        </span>
      </div>
      <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'12px 14px' }}>
        <div style={{ fontFamily:'var(--fd)', fontSize:'clamp(13px,1.3vw,16px)', fontWeight:700, color:'#fff', lineHeight:1.2, marginBottom:2 }}>{study.title}</div>
        <div style={{ fontFamily:'var(--fm)', fontSize:10, color:'rgba(255,255,255,0.45)', marginBottom:7 }}>{study.clientName}</div>
        <span style={{ display:'inline-flex', alignItems:'center', gap:5, fontFamily:'var(--fm)', fontSize:9, fontWeight:600, color:'rgba(255,255,255,0.6)', letterSpacing:'0.1em', textTransform:'uppercase' }}>
          View Case Study <svg width="10" height="10" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </span>
      </div>
    </Link>
  );
}

export default function CaseStudiesGallery() {
  const [active, setActive]           = useState(0);
  const [activeFilter, setActiveFilter] = useState(0);
  const [containerW, setContainerW]   = useState(1280);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef     = useRef<ReturnType<typeof setInterval> | null>(null);

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

  /* how many cards fit each side of center */
  const visible = Math.ceil((containerW / 2) / STRIDE) + 2;

  /* center x so active card sits at viewport center */
  const centerX = containerW / 2 - CARD_W / 2;

  const filteredGrid = caseStudies.filter(FILTERS[activeFilter].fn);

  return (
    <div style={{ background:'#08090d', minHeight:'100vh', paddingTop:80 }}>

      {/* ── HEADER ── */}
      <div style={{ textAlign:'center', padding:'52px 48px 40px' }}>
        <div style={{ fontFamily:'var(--fm)', fontSize:10, letterSpacing:'0.28em', textTransform:'uppercase', color:'#e0197d', marginBottom:12 }}>
          Our Work in Action
        </div>
        <h1 style={{ fontFamily:'var(--fd)', fontSize:'clamp(44px,7vw,88px)', fontWeight:900, color:'#fff', lineHeight:0.95, letterSpacing:'-0.03em', margin:'0 0 16px' }}>
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
          style={{ position:'relative', width:'100%', height: CARD_H * scaleOf(0) + 32, overflow:'hidden' }}
        >
          {caseStudies.map((study, i) => {
            const d   = cDist(i, active);
            if (Math.abs(d) > visible) return null; // don't render invisible cards

            const sc  = scaleOf(d);
            const op  = opacityOf(d);
            const isAct = d === 0;
            // x = center + d * STRIDE, adjusted for active card width expansion
            const x   = centerX + d * STRIDE;
            const y   = (CARD_H * scaleOf(0) - CARD_H) / 2 + 16; // vertical center

            return (
              <motion.div
                key={study.id}
                animate={{ x, y, scale: sc, opacity: op }}
                transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => !isAct && goTo(i)}
                style={{
                  position:'absolute', left:0, top:0,
                  width: CARD_W, height: CARD_H,
                  borderRadius: 13, overflow:'hidden',
                  cursor: isAct ? 'default' : 'pointer',
                  zIndex: 10 - Math.abs(d),
                  transformOrigin:'center center',
                }}
              >
                <img src={study.image} alt={study.clientName}
                  style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)' }} />

                {/* Featured badge */}
                {isAct && study.order <= 3 && (
                  <div style={{ position:'absolute', top:12, left:14, background:'rgba(255,200,0,0.92)', color:'#000', fontFamily:'var(--fm)', fontSize:9, fontWeight:700, letterSpacing:'0.1em', padding:'3px 9px', borderRadius:5 }}>
                    ★ FEATURED
                  </div>
                )}

                {/* Content overlay */}
                <div style={{ position:'absolute', bottom:0, left:0, right:0, padding: isAct ? '20px 18px 16px' : '12px 12px 10px' }}>
                  <div style={{ fontFamily:'var(--fm)', fontSize: isAct?10:8, letterSpacing:'0.1em', textTransform:'uppercase', color:'rgba(255,255,255,0.55)', marginBottom:5 }}>
                    {study.category.split(' · ').join(' • ')}
                  </div>
                  <div style={{ fontFamily:'var(--fd)', fontSize: isAct?'clamp(18px,2vw,24px)':'clamp(11px,1.1vw,14px)', fontWeight:700, color:'#fff', lineHeight:1.1, marginBottom:3 }}>
                    {study.title}
                  </div>
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
        <div style={{ display:'flex', justifyContent:'center', gap:7, marginTop:18, paddingBottom:6 }}>
          {caseStudies.map((_,i)=>(
            <button key={i} onClick={()=>goTo(i)}
              style={{ width:i===active?22:7, height:7, borderRadius:4, background:i===active?'#e0197d':'rgba(255,255,255,0.2)', border:'none', cursor:'pointer', padding:0, transition:'all 0.32s cubic-bezier(0.22,1,0.36,1)' }}
            />
          ))}
        </div>
      </div>

      {/* ── NETFLIX GRID ── */}
      <div style={{ padding:'60px 48px 80px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:30, flexWrap:'wrap', gap:20 }}>
          <div>
            <div style={{ fontFamily:'var(--fm)', fontSize:9, letterSpacing:'0.22em', textTransform:'uppercase', color:'#e0197d', marginBottom:10 }}>All Case Studies</div>
            <h2 style={{ fontFamily:'var(--fd)', fontSize:'clamp(26px,3.4vw,44px)', fontWeight:900, color:'#fff', lineHeight:1.0, letterSpacing:'-0.02em', margin:0 }}>
              More Work.<br/>More Impact.
            </h2>
          </div>
          <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
            {FILTERS.map((f,i)=>(
              <button key={f.label} onClick={()=>setActiveFilter(i)}
                style={{ fontFamily:'var(--fm)', fontSize:11, fontWeight:i===activeFilter?600:400, color:i===activeFilter?'#fff':'rgba(255,255,255,0.42)', background:i===activeFilter?'rgba(255,255,255,0.1)':'transparent', border:`1px solid ${i===activeFilter?'rgba(255,255,255,0.22)':'rgba(255,255,255,0.08)'}`, borderRadius:999, padding:'6px 16px', cursor:'pointer', transition:'all 0.2s' }}
              >
                {i===activeFilter && <span style={{ color:'#e0197d', marginRight:4 }}>—</span>}
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          key={activeFilter}
          initial={{ opacity:0, y:10 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:0.35, ease:[0.22,1,0.36,1] }}
          style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12 }}
        >
          {filteredGrid.map(study=><GridCard key={study.slug} study={study}/>)}
        </motion.div>

        {filteredGrid.length===0 && (
          <div style={{ textAlign:'center', padding:'60px 0', fontFamily:'var(--fm)', color:'rgba(255,255,255,0.25)', fontSize:14 }}>
            No case studies in this category yet.
          </div>
        )}
      </div>
    </div>
  );
}
