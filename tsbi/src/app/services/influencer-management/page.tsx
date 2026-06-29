'use client';

import Link from 'next/link';
import OtherServices from '@/components/services/OtherServices';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MAGENTA = '#e0197d';
const BLUE    = '#1a6aff';

/* ─── Feature cards ─────────────────────────────────── */
const cards = [
  { num: '01', title: 'Influencer Strategy & Casting',   desc: 'Campaign objectives, audience fit and talent selection from our curated network.' },
  { num: '02', title: 'Campaign Management',              desc: 'End-to-end coordination — timelines, deliverables, revisions and approvals handled for you.' },
  { num: '03', title: 'Content Briefing & Approval',      desc: 'Detailed creative briefs with brand compliance checks at every stage of production.' },
  { num: '04', title: 'Micro & Nano Networks',            desc: 'Hyper-engaged niche communities that drive authentic conversation and high conversion.' },
  { num: '05', title: 'Celebrity & Mega Talent',          desc: "Direct access to India's most prominent voices across entertainment, sport and fashion." },
  { num: '06', title: 'Performance Measurement',          desc: 'Real-time tracking and post-campaign reporting with full performance transparency.' },
];

const spotlight = ['/influncer/1.png', '/influncer/2.png', '/influncer/3.png'];

/* ─── Reels grid data ───────────────────────────────── */
const reels: { type: 'reel' | 'p'; code: string; img: string }[] = [
  { type: 'reel', code: 'DLIJ0Ufy0j5',  img: '/media/thumb/1.png'  },
  { type: 'reel', code: 'DLmLLoKyd-i',  img: '/media/thumb/2.png'  },
  { type: 'reel', code: 'DLzCNCDy9_K',  img: '/media/thumb/3.png'  },
  { type: 'reel', code: 'DMu1BIrT57o',  img: '/media/thumb/4.png'  },
  { type: 'reel', code: 'DNkRlYjTyMp',  img: '/media/thumb/5.png'  },
  { type: 'reel', code: 'DOdk5ywEm9r',  img: '/media/thumb/6.png'  },
  { type: 'reel', code: 'DPgTkkZiMFe',  img: '/media/thumb/7.png'  },
  { type: 'reel', code: 'DPqtG4dksvk',  img: '/media/thumb/8.png'  },
  { type: 'reel', code: 'DP23UgXiKoU',  img: '/media/thumb/9.png'  },
  { type: 'reel', code: 'DQ3zO8xDODq',  img: '/media/thumb/10.png' },
  { type: 'reel', code: 'DRCJoCzilk-',  img: '/media/thumb/11.png' },
  { type: 'reel', code: 'DQ9Dof4jOB6',  img: '/media/thumb/12.png' },
  { type: 'reel', code: 'DRJfwVpk1Hb',  img: '/media/thumb/13.png' },
  { type: 'p',    code: 'DPlofZOjcEa',  img: '/media/thumb/14.png' },
  { type: 'p',    code: 'DPBasHljcow',  img: '/media/thumb/15.png' },
  { type: 'reel', code: 'DPJDd9pjRU_',  img: '/media/thumb/16.png' },
  { type: 'reel', code: 'DOs1uFhjaZb',  img: '/media/thumb/17.png' },
  { type: 'reel', code: 'DRuNUD0k1zg',  img: '/media/thumb/18.png' },
  { type: 'reel', code: 'DR4uxfoEwyU',  img: '/media/thumb/19.png' },
  { type: 'reel', code: 'DR4vuWNDXul',  img: '/media/thumb/20.png' },
  { type: 'reel', code: 'DR6nzDoCCNA',  img: '/media/thumb/21.png' },
  { type: 'p',    code: 'DQUCl81k87E',  img: '/media/thumb/22.png' },
  { type: 'p',    code: 'DP0dTT8EcU7',  img: '/media/thumb/23.png' },
  { type: 'p',    code: 'DPyp9-jk5p5',  img: '/media/thumb/24.png' },
  { type: 'p',    code: 'DP_z6w3j3yF',  img: '/media/thumb/25.png' },
];

/* ─── Hero scattered cards ──────────────────────────── */
/* Update `handle` values to match the actual creator for each thumbnail */
type HeroCard = {
  img:     string;
  handle:  string;
  caption: string;
  w:       number;
  h:       number;
  rot:     number;
  z:       number;
  delay:   number;
  left?:   string;
  right?:  string;
  top?:    string;
  bottom?: string;
};

const heroCards: HeroCard[] = [
  {
    img: '/media/thumb/4.png',
    handle: 'card-4',
    caption: 'BOLD MOVES',
    w: 145, h: 275, rot: -10, z: 1, delay: 0.25,
    left: '0%', top: '18%',
  },
  {
    img: '/media/thumb/2.png',
    handle: 'card-2',
    caption: 'REAL IMPACT',
    w: 245, h: 465, rot: 1, z: 4, delay: 0,
    left: '13%', top: '0%',
  },
  {
    img: '/media/thumb/8.png',
    handle: 'card-8',
    caption: 'RULES? I MAKE THEM.',
    w: 200, h: 380, rot: 8, z: 3, delay: 0.3,
    left: '44%', top: '11%',
  },
  {
    img: '/media/thumb/22.png',
    handle: 'card-22',
    caption: 'GLOW. EVERY DAY.',
    w: 158, h: 298, rot: -5, z: 2, delay: 0.45,
    left: '56%', bottom: '0%',
  },
  {
    img: '/media/thumb/17.png',
    handle: 'card-17',
    caption: 'PURE VIBES.',
    w: 142, h: 268, rot: -6, z: 1, delay: 0.55,
    left: '1%', bottom: '7%',
  },
  {
    img: '/media/thumb/24.png',
    handle: 'card-24',
    caption: 'SHINE ON.',
    w: 150, h: 282, rot: 5, z: 1, delay: 0.65,
    left: '63%', top: '42%',
  },
];

const heroPills = ['Talent Discovery', 'Campaigns', 'Creator Strategy', 'Reporting', 'Celebrity', 'UGC'];
const trustedBy = ['Pepe jeans', 'Zydus', 'TBZ'];

/* ─── Single influencer card ────────────────────────── */
function InfluencerCard({ c }: { c: HeroCard }) {
  const isMain = c.z === 4;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: [0, -8, 0, 5, 0] }}
      transition={{
        opacity: { duration: 0.6, delay: c.delay },
        y: { duration: 7 + c.delay * 0.5, delay: c.delay, repeat: Infinity, ease: 'easeInOut' },
      }}
      style={{
        position: 'absolute',
        ...(c.left   !== undefined && { left:   c.left   }),
        ...(c.right  !== undefined && { right:  c.right  }),
        ...(c.top    !== undefined && { top:    c.top    }),
        ...(c.bottom !== undefined && { bottom: c.bottom }),
        zIndex: c.z,
        width:  c.w,
        height: c.h,
        borderRadius: 26,
        overflow: 'hidden',
        border: isMain
          ? `1.5px solid rgba(224,25,125,.55)`
          : `1.5px solid rgba(255,255,255,.14)`,
        background: '#080808',
        rotate: c.rot,
        boxShadow: isMain
          ? '0 32px 90px rgba(124,58,237,.5), 0 8px 35px rgba(0,0,0,.65)'
          : '0 16px 55px rgba(0,0,0,.55)',
        flexShrink: 0,
      }}
    >
      {/* Notch */}
      <div style={{
        position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)',
        width: 44, height: 5, background: '#000', borderRadius: 3, zIndex: 10,
      }} />

      {/* Full-bleed image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={c.img} alt={c.handle}
           style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />


      {/* Bottom: caption + icons */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,.94) 0%, transparent 100%)',
        padding: '28px 11px 13px',
      }}>
        <div style={{
          fontSize: isMain ? 14 : 11,
          fontWeight: 900, color: '#fff',
          lineHeight: 1.2, letterSpacing: '.03em',
          marginBottom: 8, textShadow: '0 2px 10px rgba(0,0,0,.6)',
        }}>
          {c.caption}
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill={MAGENTA}>
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="rgba(255,255,255,.72)">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.55)" strokeWidth="2">
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Influencer collage (scattered layout) ─────────── */
function InfluencerCollage() {
  return (
    <div style={{ position: 'relative', height: 'clamp(580px,84vh,740px)', overflow: 'visible' }}>

      {/* Deep purple glow at bottom-right */}
      <div style={{
        position: 'absolute', bottom: -40, right: '10%',
        width: '70%', height: 300,
        background: 'radial-gradient(ellipse at 60% 100%, rgba(120,40,230,.6) 0%, transparent 70%)',
        zIndex: 0, pointerEvents: 'none',
      }} />
      {/* Magenta glow behind center card */}
      <div style={{
        position: 'absolute', top: '25%', left: '30%',
        width: 280, height: 280,
        background: 'radial-gradient(circle, rgba(224,25,125,.22) 0%, transparent 70%)',
        zIndex: 0, pointerEvents: 'none',
      }} />

      {/* ─ 4 influencer cards ─ */}
      {heroCards.map((c) => (
        <InfluencerCard key={c.handle} c={c} />
      ))}

      {/* ─ Trending #1 badge ─ */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
        style={{
          position: 'absolute', top: '42%', left: '9%', zIndex: 8,
          width: 74, height: 74, borderRadius: '50%',
          background: `linear-gradient(135deg, ${MAGENTA}, #9333ea)`,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 0 30px rgba(224,25,125,.6)`,
          border: '2px solid rgba(255,255,255,.2)',
        }}
      >
        <div style={{ fontSize: 18, lineHeight: 1 }}>🔥</div>
        <div style={{ fontSize: 8, fontWeight: 700, color: '#fff', letterSpacing: '.06em', marginTop: 1 }}>TRENDING</div>
        <div style={{ fontSize: 11, fontWeight: 900, color: '#fff', lineHeight: 1 }}>#1</div>
      </motion.div>

      {/* ─ Engagement chip near main card ─ */}
      {/* <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.0, duration: 0.5 }}
        style={{
          position: 'absolute', top: '30%', left: '42%', zIndex: 9,
          background: 'rgba(8,14,38,.9)',
          backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,.14)',
          borderRadius: 30, padding: '7px 14px',
          display: 'flex', alignItems: 'center', gap: 7,
          boxShadow: '0 8px 30px rgba(0,0,0,.45)',
        }}
      >
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80', flexShrink: 0 }} />
        <span style={{ fontSize: 12, fontWeight: 800, color: '#fff' }}>427K</span>
        <span style={{ fontSize: 9, color: 'rgba(255,255,255,.55)' }}>Engagement</span>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5">
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
          <polyline points="16 7 22 7 22 13"/>
        </svg>
      </motion.div> */}

      {/* ─ Campaign Impact glass card (top-right) ─ */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        style={{
          position: 'absolute', top: '1%', right: '3%', zIndex: 10,
          background: 'rgba(8,14,38,.92)',
          backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,.12)',
          borderRadius: 14, padding: '14px 18px',
          minWidth: 215, boxShadow: '0 16px 50px rgba(0,0,0,.5)',
        }}
      >
        <div style={{
          fontSize: 9.5, fontWeight: 600, letterSpacing: '.1em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,.5)', marginBottom: 13,
        }}>
          Campaign Impact
        </div>
        <div style={{ display: 'flex', gap: 18 }}>
          {[
            { val: '6.25M', label: 'Total Views'  },
            { val: '530K',  label: 'Engagements' },
            { val: '15x',   label: 'Avg. ROI'    },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 17, fontWeight: 800, color: '#fff', lineHeight: 1, fontFamily: 'var(--fm)' }}>{s.val}</div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,.44)', marginTop: 3 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ─ Top Categories card (bottom-center) ─ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        style={{
          position: 'absolute', bottom: '5%', left: '16%', zIndex: 9,
          background: 'rgba(8,14,38,.92)',
          backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,.12)',
          borderRadius: 14, padding: '12px 16px',
          minWidth: 190, boxShadow: '0 16px 50px rgba(0,0,0,.5)',
        }}
      >
        <div style={{
          fontSize: 9, fontWeight: 600, letterSpacing: '.1em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,.5)', marginBottom: 11,
        }}>
          Top Categories
        </div>
        {[
          { label: 'Fashion',   pct: 38, color: MAGENTA   },
          { label: 'Beauty',    pct: 28, color: BLUE      },
          { label: 'Lifestyle', pct: 20, color: '#7c3aed' },
          { label: 'Tech',      pct: 14, color: '#f59e0b' },
        ].map(cat => (
          <div key={cat.label} style={{ marginBottom: 7, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 9, color: 'rgba(255,255,255,.65)', width: 50, flexShrink: 0 }}>{cat.label}</span>
            <div style={{ flex: 1, height: 5, background: 'rgba(255,255,255,.08)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ width: `${cat.pct}%`, height: '100%', background: cat.color, borderRadius: 3 }} />
            </div>
            <span style={{ fontSize: 9, color: 'rgba(255,255,255,.42)', width: 28, textAlign: 'right', flexShrink: 0 }}>{cat.pct}%</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Reel card ─────────────────────────────────────── */
function ReelCard({ r }: { r: { type: 'reel' | 'p'; code: string; img: string } }) {
  const [hovered, setHovered]         = useState(false);
  const [iframeReady, setIframeReady] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setIframeReady(false); }}
      style={{
        position: 'relative', borderRadius: 14, overflow: 'hidden', height: 420,
        border: `1px solid ${hovered ? 'rgba(224,25,125,0.45)' : 'rgba(255,255,255,0.08)'}`,
        background: '#111',
        boxShadow: hovered
          ? '0 22px 60px rgba(224,25,125,0.16), 0 10px 40px rgba(0,0,0,0.5)'
          : '0 8px 28px rgba(0,0,0,0.4)',
        transition: 'border 0.3s, box-shadow 0.3s, transform 0.3s',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        cursor: 'pointer',
      }}
    >
      <motion.div
        animate={{ opacity: hovered && iframeReady ? 0 : 1, scale: hovered ? 1.04 : 1 }}
        transition={{ duration: 0.4 }}
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${r.img})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
        }}
      />
      <motion.div
        animate={{ opacity: hovered && iframeReady ? 0 : 0.6 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />
      <motion.div
        animate={{ opacity: hovered && iframeReady ? 0 : 1, scale: hovered ? 1.1 : 1 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          width: 52, height: 52, borderRadius: '50%', background: 'rgba(255,255,255,0.9)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 2, pointerEvents: 'none',
        }}
      >
        <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
          <path d="M4 2.5L13.5 8L4 13.5V2.5Z" fill="#111"/>
        </svg>
      </motion.div>
      {hovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: iframeReady ? 1 : 0 }}
          transition={{ duration: 0.35 }}
          style={{ position: 'absolute', inset: 0, zIndex: 4, borderRadius: 14, overflow: 'hidden' }}
        >
          <iframe
            src={`https://www.instagram.com/${r.type}/${r.code}/embed/`}
            onLoad={() => setIframeReady(true)}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none', display: 'block' }}
            allow="autoplay; encrypted-media; picture-in-picture"
          />
        </motion.div>
      )}
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────── */
export default function InfluencerManagementPage() {
  const [vp, setVp] = useState({ w: 1280, h: 800 });
  useEffect(() => {
    const m = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    m();
    window.addEventListener('resize', m);
    return () => window.removeEventListener('resize', m);
  }, []);
  const isMobile = vp.w < 768;
  // Scale the fixed-size collage down so it fits the mobile width.
  const COLLAGE_W = 460;
  const collageH = Math.max(580, Math.min(740, vp.h * 0.84));
  const collageScale = isMobile ? Math.min(1, (vp.w - 40) / COLLAGE_W) : 1;

  return (
    <>
      {/* ── HERO ── */}
      <section style={{
        background:
          'radial-gradient(ellipse at 78% 55%, rgba(120,40,230,.55) 0%, transparent 52%),' +
          'radial-gradient(ellipse at 12% 42%, rgba(224,25,125,.2) 0%, transparent 48%),' +
          'radial-gradient(ellipse at 50% 95%, rgba(100,30,200,.3) 0%, transparent 50%),' +
          'linear-gradient(135deg,#030712 0%,#0b0820 55%,#180432 100%)',
        minHeight: isMobile ? 'auto' : '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: isMobile ? '100px 20px 56px' : '130px 48px 80px',
        overflow: 'hidden',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 40, width: '100%', flexWrap: 'wrap' }}>

          {/* LEFT: copy */}
          <div style={{ flex: '1 1 400px', minWidth: isMobile ? 0 : 300, width: isMobile ? '100%' : undefined }}>

            {/* Label pill */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'rgba(224,25,125,.14)',
              border: '1px solid rgba(224,25,125,.35)',
              borderRadius: 50, padding: '5px 14px',
              marginBottom: 28,
            }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill={MAGENTA}>
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span style={{ fontSize: 10, fontWeight: 700, color: MAGENTA, letterSpacing: '.12em', textTransform: 'uppercase' }}>
                Influencer Marketing, Reimagined
              </span>
            </div>

            <h1 style={{
              fontFamily: 'var(--fd)',
              fontSize: 'clamp(46px,5.8vw,88px)',
              fontWeight: 900,
              lineHeight: 1.0,
              letterSpacing: '-0.04em',
              color: '#fff',
              marginBottom: 20,
            }}>
              Every Brand<br />
              Needs a{' '}
              <span style={{
                color: MAGENTA,
                fontStyle: 'italic',
                textDecoration: 'underline',
                textDecorationColor: `${MAGENTA}60`,
                textUnderlineOffset: 6,
              }}>Star.</span>
            </h1>

            <p style={{
              fontSize: 16, color: 'rgba(255,255,255,.58)',
              fontWeight: 300, lineHeight: 1.75,
              maxWidth: 450, marginBottom: 28,
            }}>
              Full-service influencer marketing and talent management from
              micro-communities to mega-reach — every tier, every category, end-to-end.
            </p>

            {/* Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 30 }}>
              {heroPills.map(p => (
                <div key={p} style={{
                  display: 'inline-flex', alignItems: 'center', padding: '7px 15px',
                  background: 'rgba(255,255,255,.07)',
                  border: '1px solid rgba(255,255,255,.12)',
                  borderRadius: 50, fontSize: 13,
                  color: 'rgba(255,255,255,.72)', fontFamily: 'var(--fm)',
                }}>
                  {p}
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 40 }}>
              <Link href="/case-studies" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: MAGENTA, color: '#fff',
                borderRadius: 50, padding: '13px 28px',
                fontSize: 14, fontWeight: 600, fontFamily: 'var(--fm)',
                textDecoration: 'none', letterSpacing: '.02em',
              }}>
                Explore Work →
              </Link>
              <Link href="/contact" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(255,255,255,.08)',
                color: 'rgba(255,255,255,.75)',
                border: '1.5px solid rgba(255,255,255,.2)',
                borderRadius: 50, padding: '13px 28px',
                fontSize: 14, fontWeight: 600, fontFamily: 'var(--fm)',
                textDecoration: 'none', letterSpacing: '.02em',
              }}>
                Talk to Us →
              </Link>
            </div>

            {/* Trusted by */}
            <div>
              <div style={{
                fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,.32)', fontFamily: 'var(--fm)', marginBottom: 14,
              }}>
                Trusted by Visionary Brands
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                {trustedBy.map((brand, i) => (
                  <span key={brand} style={{
                    fontSize: 13, color: 'rgba(255,255,255,.46)',
                    fontFamily: 'var(--fm)', fontWeight: 600, letterSpacing: '.02em',
                    padding: '0 14px',
                    borderRight: i < trustedBy.length - 1
                      ? '1px solid rgba(255,255,255,.1)' : 'none',
                  }}>
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: scattered influencer collage — scaled to fit + stacked below copy on mobile */}
          <div style={{
            flex: '1 1 520px',
            minWidth: isMobile ? 0 : 400,
            width: isMobile ? '100%' : undefined,
            position: 'relative',
            overflow: isMobile ? 'hidden' : 'visible',
            height: isMobile ? collageH * collageScale : undefined,
            marginTop: isMobile ? 12 : 0,
          }}>
            {isMobile ? (
              <div style={{ width: COLLAGE_W, height: collageH, transform: `scale(${collageScale})`, transformOrigin: 'top left' }}>
                <InfluencerCollage />
              </div>
            ) : (
              <InfluencerCollage />
            )}
          </div>
        </div>
      </section>

      {/* ── REELS GRID ── */}
      <section style={{
        background:
          'radial-gradient(ellipse at 12% 18%, rgba(224,25,125,.12) 0%, transparent 50%), #070e1e',
        padding: '80px 48px',
        borderTop: '1px solid rgba(255,255,255,.06)',
      }}>
        <div className="sec-label" style={{ color: MAGENTA, marginBottom: 12 }}>
          Reels in the Wild
        </div>
        <h2 style={{
          fontFamily: 'var(--fd)',
          fontSize: 'clamp(28px,4vw,52px)',
          fontWeight: 900, letterSpacing: '-0.02em',
          color: '#fff', lineHeight: 1.05,
          marginBottom: 12, maxWidth: 760,
        }}>
          Content that earned its{' '}
          <em style={{ color: BLUE, fontStyle: 'italic' }}>reach.</em>
        </h2>
        <p style={{
          fontSize: 15, color: 'rgba(255,255,255,.55)',
          fontWeight: 300, lineHeight: 1.7,
          maxWidth: 480, marginBottom: 44,
        }}>
          A selection of {reels.length} influencer-led reels and posts produced and managed by the TSBI team.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 16,
        }}>
          {reels.map((r) => (
            <ReelCard key={r.code} r={r} />
          ))}
        </div>
      </section>

      {/* ── TALENT STAT BAND ── */}
      <div style={{
        background: '#070e1e',
        borderTop: '1px solid rgba(255,255,255,.06)',
        borderBottom: '1px solid rgba(255,255,255,.06)',
        padding: isMobile ? '32px 14px' : '40px 48px',
        display: 'flex', gap: 0,
      }}>
        {[
          { val: '150+',           label: 'Active Talents' },
          { val: 'All Categories', label: 'Covered'        },
          { val: 'End-to-End',     label: 'Managed'        },
        ].map((stat, i) => (
          <div key={stat.label} style={{
            flex: 1, textAlign: 'center',
            borderRight: i < 2 ? '1px solid rgba(255,255,255,.08)' : 'none',
            padding: isMobile ? '0 6px' : '0 20px',
          }}>
            <div style={{
              fontFamily: 'var(--fd)',
              fontSize: isMobile ? 22 : 'clamp(32px,4vw,56px)',
              fontWeight: 900, color: '#fff', lineHeight: 1, marginBottom: 8,
            }}>
              {stat.val}
            </div>
            <div style={{
              fontFamily: 'var(--fm)', fontSize: 9,
              letterSpacing: '.18em', textTransform: 'uppercase', color: MAGENTA,
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── FEATURE CARDS ── */}
      <section style={{ background: 'var(--navy)', padding: '80px 48px' }}>
        <div className="sec-label" style={{ color: MAGENTA, marginBottom: 40 }}>What We Manage</div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 24 }}>
          {cards.map((card) => (
            <div key={card.num} style={{
              background: 'rgba(255,255,255,.04)',
              border: '1px solid rgba(255,255,255,.06)',
              borderRadius: 8, padding: '28px 24px',
            }}>
              <div style={{ fontFamily: 'var(--fm)', fontSize: 11, color: MAGENTA, letterSpacing: '.1em', marginBottom: 14 }}>{card.num}</div>
              <div style={{ fontFamily: 'var(--fd)', fontSize: 20, fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: 10 }}>{card.title}</div>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,.55)', fontWeight: 300, lineHeight: 1.65 }}>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SPOTLIGHT IMAGES ── */}
      <section style={{
        background:
          'radial-gradient(ellipse at 85% 10%, rgba(26,106,255,.14) 0%, transparent 55%), #050b1a',
        padding: '80px 48px',
      }}>
        <div className="sec-label" style={{ color: BLUE, marginBottom: 12 }}>In the Spotlight</div>
        <h2 style={{
          fontFamily: 'var(--fd)',
          fontSize: 'clamp(28px,4vw,52px)',
          fontWeight: 900, letterSpacing: '-0.02em',
          color: '#fff', lineHeight: 1.05,
          marginBottom: 44, maxWidth: 760,
        }}>
          Talent and brands,{' '}
          <em style={{ color: MAGENTA, fontStyle: 'italic' }}>made unforgettable.</em>
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 24, alignItems: 'start',
        }}>
          {spotlight.map((src, i) => (
            <div key={src} style={{
              borderRadius: 14, overflow: 'hidden',
              border: `1px solid ${i % 2 === 0 ? 'rgba(224,25,125,.35)' : 'rgba(26,106,255,.35)'}`,
              boxShadow: '0 14px 40px rgba(0,0,0,.4)', background: '#0d1528',
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`Influencer spotlight ${i + 1}`}
                   style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
          ))}
        </div>
      </section>

      {/* ── QUOTE ── */}
      <section style={{ background: '#050b1a', padding: '80px 48px' }}>
        <blockquote style={{
          fontFamily: 'var(--fd)',
          fontSize: 'clamp(24px,4vw,48px)',
          fontStyle: 'italic', fontWeight: 400,
          color: '#fff', lineHeight: 1.3,
          maxWidth: 800, marginBottom: 24,
        }}>
          &ldquo;We don&apos;t just connect brands to influencers. We build movements.&rdquo;
        </blockquote>
        <p style={{
          fontFamily: 'var(--fm)', fontSize: 10,
          letterSpacing: '.14em', textTransform: 'uppercase', color: MAGENTA,
        }}>
          — TSBI Influencer Team
        </p>
      </section>

      {/* ── CTA ── */}
      <section style={{
        background: 'var(--magenta)', padding: '80px 48px',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', flexWrap: 'wrap', gap: 40,
      }}>
        <h2 style={{
          fontFamily: 'var(--fd)',
          fontSize: 'clamp(32px,5vw,60px)',
          fontWeight: 900, color: '#fff',
          lineHeight: 1.05, letterSpacing: '-0.02em',
          whiteSpace: 'pre-line',
        }}>
          {'Build your\ninfluencer strategy.'}
        </h2>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/contact" className="btn-fill"
                style={{ background: '#fff', color: 'var(--magenta)' }}>
            Start a Campaign →
          </Link>
          <OtherServices current="influencer-management" />
        </div>
      </section>
    </>
  );
}
