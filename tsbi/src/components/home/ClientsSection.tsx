'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface ClientItem {
  name: string; type: string; caption: string; accent: string; image: string; cells: string[];
}

/* ── 6 brands — single source of truth ── */
const BRANDS = [
  { name: 'Dharma Production',    category: 'Entertainment',    imgs: { main: '/images/banner-home2-2-400x500.jpg',    alt1: '/images/gallery-slider-01-410x410.jpg',  alt2: '/images/bg-home1-counter-400x500.jpg'    }, url: '/work/dharma-production'    },
  { name: 'Warner Music India',   category: 'Music Label',      imgs: { main: '/images/banner-01-400x500.jpg',         alt1: '/images/gallery-slider-02-400x500.jpg',  alt2: '/images/portfolio-popup-10-400x500.jpg'  }, url: '/work/warner-music-india'   },
  { name: 'Mumbai Indians',       category: "Women's Sports",   imgs: { main: '/images/banner-home3-1-400x500.jpg',    alt1: '/images/career-detail-01-400x500.jpg',   alt2: '/images/portfolio-popup-12-400x500.jpg'  }, url: '/work/mumbai-indians'       },
  { name: 'GSK',                  category: 'Pharma',           imgs: { main: '/images/portfolio-popup-12-400x500.jpg',alt1: '/images/bg-about-company-400x500.jpg',   alt2: '/images/gallery-slider-01-410x410.jpg'   }, url: '/work/gsk'                  },
  { name: 'Ashok Leyland',        category: 'Automobile',       imgs: { main: '/images/bg-about-company-400x500.jpg',  alt1: '/images/banner-home2-2-400x500.jpg',     alt2: '/images/career-detail-01-400x500.jpg'    }, url: '/work/ashok-leyland'        },
  { name: 'Dabur UAE',            category: 'FMCG',             imgs: { main: '/images/portfolio-popup-10-400x500.jpg',alt1: '/images/portfolio-popup-12-400x500.jpg', alt2: '/images/gallery-slider-02-400x500.jpg'   }, url: '/work/dabur-uae'            },
] as const;

const TOTAL     = BRANDS.length; // 6
const SIDEBAR   = '#140e20';
const ITEM_H    = 68;
const WIN       = 5;

function ExploreBtn({ url }: { url: string }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={url} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 16, textDecoration: 'none' }}>
      <motion.div
        animate={{ background: hov ? '#e0197d' : 'rgba(0,0,0,0)' }}
        transition={{ duration: 0.22 }}
        style={{ width: 44, height: 44, borderRadius: '50%', border: `1px solid ${hov ? '#e0197d' : 'rgba(0,0,0,0.22)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'border-color 0.22s' }}
      >
        <motion.svg animate={{ x: hov ? 4 : 0 }} transition={{ duration: 0.22 }} width="15" height="15" viewBox="0 0 16 16" fill="none">
          <path d="M2 8h12M9 4l4 4-4 4" stroke={hov ? '#fff' : '#0a0a0a'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </motion.div>
      <span style={{ fontFamily: 'var(--fm)', fontSize: 11, letterSpacing: hov ? '0.22em' : '0.16em', textTransform: 'uppercase', color: '#0a0a0a', transition: 'letter-spacing 0.3s' }}>
        Explore Brand
      </span>
    </a>
  );
}

export default function ClientsSection({ initialClients: _ }: { initialClients?: ClientItem[] }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const p = Math.max(0, Math.min(1, -el.getBoundingClientRect().top / scrollable));
      setActiveIdx(Math.min(TOTAL - 1, Math.floor(p * TOTAL)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const brand = BRANDS[activeIdx];
  const go    = (d: 1 | -1) => setActiveIdx(p => Math.max(0, Math.min(TOTAL - 1, p + d)));

  /* sliding window */
  const listTranslateY = Math.max(
    -(TOTAL - WIN) * ITEM_H,
    Math.min(0, -(activeIdx - Math.floor(WIN / 2)) * ITEM_H)
  );

  return (
    <section ref={sectionRef} style={{ height: `${TOTAL * 100}vh`, background: SIDEBAR, position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'grid', gridTemplateColumns: '26% 24% 50%' }}>

        {/* ══ LEFT SIDEBAR ══ */}
        <div style={{
          position: 'relative', background: SIDEBAR,
          padding: '44px 28px 36px 48px',
          display: 'flex', flexDirection: 'column',
          borderRight: '1px solid rgba(255,255,255,0.07)',
          boxShadow: 'inset 0 -120px 160px rgba(224,25,125,0.06)',
        }}>
          {/* Rotated label */}
          <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%) rotate(-90deg)', fontFamily: 'var(--fm)', fontSize: 8, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.14)', whiteSpace: 'nowrap', pointerEvents: 'none' }}>
            Brand Index
          </div>

          {/* ── Heading: 2 horizontal lines ── */}
          <div style={{ flexShrink: 0, marginBottom: 24 }}>
            <div style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(22px,2.6vw,36px)', fontWeight: 900, color: 'rgba(255,255,255,0.9)', lineHeight: 1.05, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>
              Brands that
            </div>
            <div style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(22px,2.6vw,36px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>
              <span style={{ color: 'rgba(255,255,255,0.9)' }}>trust </span>
              <em style={{ color: '#e0197d', fontStyle: 'italic' }}>us.</em>
            </div>
          </div>

          <div style={{ width: 28, height: 2, background: '#e0197d', borderRadius: 1, marginBottom: 24, flexShrink: 0 }} />

          {/* Sliding brand list */}
          <div style={{
            flex: 1, position: 'relative', overflow: 'hidden',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
          }}>
            <motion.div
              animate={{ y: listTranslateY }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: 'absolute', left: 0, right: 0, top: 0 }}
            >
              {BRANDS.map((b, i) => {
                const isActive = i === activeIdx;
                const dist     = Math.abs(i - activeIdx);
                return (
                  <motion.div key={b.name}
                    animate={{ opacity: Math.max(0.18, 1 - dist * 0.22), filter: `blur(${Math.min(1.4, dist * 0.45)}px)` }}
                    transition={{ duration: 0.4 }}
                    onClick={() => setActiveIdx(i)}
                    style={{ height: ITEM_H, display: 'flex', alignItems: 'center', gap: 14, borderBottom: '1px solid rgba(255,255,255,0.06)', cursor: 'pointer', position: 'relative', paddingRight: 8 }}
                  >
                    {isActive && (
                      <motion.div layoutId="bar" style={{ position: 'absolute', left: -20, top: '50%', transform: 'translateY(-50%)', width: 3, height: 28, background: '#e0197d', borderRadius: 2 }} />
                    )}
                    <span style={{ fontFamily: 'var(--fm)', fontSize: 10, minWidth: 22, color: isActive ? '#e0197d' : 'rgba(255,255,255,0.3)', fontWeight: isActive ? 700 : 400, transition: 'color 0.3s' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <div style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(13px,1.4vw,18px)', fontWeight: isActive ? 700 : 400, color: isActive ? '#fff' : 'rgba(255,255,255,0.5)', lineHeight: 1.1, transition: 'color 0.3s' }}>
                        {b.name}
                      </div>
                      <div style={{ fontFamily: 'var(--fm)', fontSize: 8, letterSpacing: '0.13em', textTransform: 'uppercase', color: isActive ? '#e0197d' : 'rgba(255,255,255,0.26)', marginTop: 2, transition: 'color 0.3s' }}>
                        {b.category}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Scroll to explore */}
          <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 10, marginTop: 16 }}>
            <div style={{ width: 30, height: 30, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path d="M7 2v10M3 8l4 4 4-4" stroke="rgba(255,255,255,0.45)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span style={{ fontFamily: 'var(--fm)', fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.26)' }}>
              Scroll to explore
            </span>
          </div>
        </div>

        {/* ══ CENTER ══ */}
        <div style={{ background: '#fbfaf7', padding: '48px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRight: '1px solid rgba(0,0,0,0.06)' }}>
          <AnimatePresence mode="wait">
            <motion.div key={brand.name}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <div style={{ fontFamily: 'var(--fm)', fontSize: 11, display: 'flex', alignItems: 'center', gap: 5, marginBottom: 36 }}>
                <span style={{ color: '#e0197d', fontWeight: 700 }}>{String(activeIdx + 1).padStart(2, '0')}</span>
                <span style={{ color: 'rgba(0,0,0,0.2)' }}>/</span>
                <span style={{ color: 'rgba(0,0,0,0.38)' }}>{String(TOTAL).padStart(2, '0')}</span>
              </div>
              <div style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(26px,3.4vw,50px)', fontWeight: 700, color: '#0a0a0a', letterSpacing: '-0.025em', lineHeight: 0.95, marginBottom: 16 }}>
                {brand.name}
              </div>
              <div style={{ fontFamily: 'var(--fm)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginBottom: 24 }}>
                {brand.category}
              </div>
              <div style={{ width: 28, height: 2, background: '#e0197d', borderRadius: 1, marginBottom: 40 }} />
              <ExploreBtn url={brand.url} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ══ RIGHT GALLERY ══ */}
        <div style={{ padding: '28px 40px 28px 28px', display: 'flex', flexDirection: 'column', background: 'linear-gradient(135deg, #fbfaf7 0%, #f5eaf2 55%, #eddce8 100%)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '8%', right: '-6%', width: '52%', paddingBottom: '52%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(224,25,125,0.09) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <div style={{ flex: 1, position: 'relative', minHeight: 0 }}>
            <AnimatePresence mode="wait">
              <motion.div key={brand.name}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                style={{ position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: '3fr 2fr', gridTemplateRows: '1fr 1fr', gap: 10 }}
              >
                <motion.div initial={{ opacity: 0, y: 24, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
                  style={{ gridRow: 'span 2', borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 14px 48px rgba(0,0,0,0.1)', cursor: 'pointer' }}>
                  <img src={brand.imgs.main} alt={brand.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.55s ease' }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')} onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')} />
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.52, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 8px 28px rgba(0,0,0,0.08)', cursor: 'pointer' }}>
                  <img src={brand.imgs.alt1} alt={`${brand.name} 2`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.55s ease' }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')} onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')} />
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.52, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                  style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 8px 28px rgba(0,0,0,0.08)', cursor: 'pointer' }}>
                  <img src={brand.imgs.alt2} alt={`${brand.name} 3`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'contrast(1.05) saturate(0.85)', transition: 'transform 0.55s ease' }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')} onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')} />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress + arrows */}
          <div style={{ paddingTop: 16, flexShrink: 0, display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ fontFamily: 'var(--fm)', fontSize: 11, minWidth: 52, display: 'flex', gap: 4, alignItems: 'center' }}>
              <span style={{ color: '#e0197d', fontWeight: 700 }}>{String(activeIdx + 1).padStart(2, '0')}</span>
              <span style={{ color: 'rgba(0,0,0,0.22)' }}>/</span>
              <span style={{ color: 'rgba(0,0,0,0.4)' }}>{String(TOTAL).padStart(2, '0')}</span>
            </div>
            <div style={{ flex: 1, height: 2, background: 'rgba(0,0,0,0.1)', borderRadius: 1, overflow: 'hidden' }}>
              <motion.div animate={{ width: `${((activeIdx + 1) / TOTAL) * 100}%` }} transition={{ duration: 0.4, ease: 'easeOut' }}
                style={{ height: '100%', background: '#e0197d', borderRadius: 1 }} />
            </div>
            <div style={{ display: 'flex', gap: 7, flexShrink: 0 }}>
              {([[-1, '←', activeIdx === 0], [1, '→', activeIdx === TOTAL - 1]] as [number, string, boolean][]).map(([d, lbl, off]) => (
                <button key={lbl} onClick={() => go(d as 1 | -1)} disabled={off} aria-label={d === -1 ? 'Prev' : 'Next'}
                  style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid rgba(0,0,0,0.13)', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: off ? 'default' : 'pointer', opacity: off ? 0.28 : 1, fontFamily: 'var(--fm)', fontSize: 13, color: '#0a0a0a', transition: 'background 0.2s, color 0.2s' }}
                  onMouseEnter={e => { if (!off) { const b = e.currentTarget as HTMLButtonElement; b.style.background = '#0a0a0a'; b.style.color = '#fff'; } }}
                  onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = 'transparent'; b.style.color = '#0a0a0a'; }}
                >{lbl}</button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
