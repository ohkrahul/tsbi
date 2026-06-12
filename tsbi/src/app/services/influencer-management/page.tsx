'use client';

import Link from 'next/link';
import { useState } from 'react';
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

/* ─── Hero data ─────────────────────────────────────── */
type PhoneItem = {
  img:      string;
  username: string;
  caption:  string;
  likes:    string;
  views:    string;
  rot:      number;
  cta?:     string;
};

const phoneData: PhoneItem[] = [
  { img: '/influncer/1.png', username: 'rohanpreetsingh', caption: 'NEW DROP',          likes: '1.2M', views: '98K',  rot: -8 },
  { img: '/influncer/2.png', username: 'kritika.khurana',  caption: 'Power moves only.', likes: '875K', views: '65K',  rot:  0, cta: 'Shop Now' },
  { img: '/influncer/3.png', username: 'aashnashroff',    caption: 'Glow all day.',     likes: '520K', views: '42K',  rot:  7 },
];

const heroPills = ['Talent Discovery', 'Campaigns', 'Creator Strategy', 'Reporting', 'Celebrity', 'UGC'];
const trustedBy = ['pepe jeans', 'mama earth', 'boAt', 'purplle', 'SUGAR', 'derma+'];

/* ─── Donut chart ───────────────────────────────────── */
function DonutChart() {
  const size = 68, r = 24;
  const cx = size / 2, cy = size / 2;
  const circ = 2 * Math.PI * r;
  const segs = [
    { pct: 32, color: MAGENTA   },
    { pct: 28, color: BLUE      },
    { pct: 25, color: '#7c3aed' },
    { pct: 15, color: '#f59e0b' },
  ];
  let cum = 0;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}
         style={{ display: 'block', transform: 'rotate(-90deg)' }}>
      <circle cx={cx} cy={cy} r={r} fill="none"
              stroke="rgba(255,255,255,.07)" strokeWidth={9} />
      {segs.map((s, i) => {
        const dash = (s.pct / 100) * circ;
        const el = (
          <circle key={i} cx={cx} cy={cy} r={r} fill="none"
                  stroke={s.color} strokeWidth={9}
                  strokeDasharray={`${dash} ${circ - dash}`}
                  strokeDashoffset={-cum} />
        );
        cum += dash;
        return el;
      })}
    </svg>
  );
}

/* ─── Phone card ────────────────────────────────────── */
function PhoneCard({ d, delay }: { d: PhoneItem; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: [0, -9, 0, 6, 0] }}
      transition={{
        opacity: { duration: 0.6, delay },
        y: { duration: 7, delay, repeat: Infinity, ease: 'easeInOut' },
      }}
      style={{
        width: 190,
        height: 360,
        borderRadius: 28,
        overflow: 'hidden',
        border: '1.5px solid rgba(255,255,255,0.18)',
        background: '#0a0a0a',
        position: 'relative',
        rotate: d.rot,
        boxShadow: d.rot === 0
          ? '0 28px 80px rgba(139,92,246,0.45), 0 6px 30px rgba(0,0,0,0.6)'
          : '0 14px 50px rgba(0,0,0,0.5)',
        flexShrink: 0,
      }}
    >
      {/* Notch */}
      <div style={{
        position: 'absolute', top: 9, left: '50%', transform: 'translateX(-50%)',
        width: 46, height: 6, background: '#000', borderRadius: 3, zIndex: 10,
      }} />

      {/* Image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={d.img} alt={d.username}
           style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />

      {/* Top gradient + username */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 80,
        background: 'linear-gradient(to bottom, rgba(0,0,0,.78) 0%, transparent 100%)',
        padding: '18px 11px 0',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{
            width: 20, height: 20, borderRadius: '50%', overflow: 'hidden',
            border: '1.5px solid rgba(255,255,255,.6)', flexShrink: 0,
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={d.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: '#fff', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.username}</div>
            <div style={{ fontSize: 7.5, color: 'rgba(255,255,255,.6)' }}>Sponsored</div>
          </div>
          <div style={{ display: 'flex', gap: 2.5, flexShrink: 0 }}>
            {[0,1,2].map(i => (
              <div key={i} style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(255,255,255,.65)' }} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient + engagement */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,.92) 0%, transparent 100%)',
        padding: '24px 11px 11px',
      }}>
        {d.caption && (
          <div style={{ fontSize: 10, fontWeight: 700, color: '#fff', marginBottom: 7, lineHeight: 1.3 }}>
            {d.caption}
          </div>
        )}
        {d.cta && (
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            background: 'rgba(255,255,255,.92)', borderRadius: 20,
            padding: '5px 11px', fontSize: 8.5, fontWeight: 700, color: '#111',
            marginBottom: 7,
          }}>
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            {d.cta}
          </div>
        )}
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill={MAGENTA} style={{ opacity: 0.9 }}>
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(255,255,255,0.75)">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13"/>
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Phone frame collage ───────────────────────────── */
function PhoneFrameCollage() {
  return (
    <div style={{ position: 'relative', height: 'clamp(520px,76vh,640px)', overflow: 'visible' }}>
      {/* Purple glow behind phones */}
      <div style={{
        position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '80%', height: 240,
        background: 'radial-gradient(ellipse at 50% 100%, rgba(124,58,237,.5) 0%, transparent 70%)',
        zIndex: 0, pointerEvents: 'none',
      }} />

      {/* Left phone */}
      <div style={{ position: 'absolute', left: '13%', bottom: 14, zIndex: 1 }}>
        <PhoneCard d={phoneData[0]} delay={0.15} />
      </div>

      {/* Center phone */}
      <div style={{ position: 'absolute', left: '50%', bottom: 60, zIndex: 3, transform: 'translateX(-50%)' }}>
        <PhoneCard d={phoneData[1]} delay={0} />
      </div>

      {/* Right phone */}
      <div style={{ position: 'absolute', right: '13%', bottom: 14, zIndex: 2 }}>
        <PhoneCard d={phoneData[2]} delay={0.3} />
      </div>

      {/* Impact that scales — top-right floating card */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        style={{
          position: 'absolute', top: '4%', right: 0, zIndex: 10,
          background: 'rgba(8,14,36,.92)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,.12)',
          borderRadius: 14,
          padding: '14px 18px',
          minWidth: 218,
          boxShadow: '0 16px 50px rgba(0,0,0,.5)',
        }}
      >
        <div style={{
          fontSize: 9.5, fontWeight: 600, letterSpacing: '.1em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,.5)', marginBottom: 14,
        }}>
          Impact that scales
        </div>
        <div style={{ display: 'flex', gap: 18 }}>
          {[
            { val: '6.25M', label: 'Total Views',  accent: MAGENTA },
            { val: '530K',  label: 'Engagements', accent: MAGENTA },
            { val: '15x',   label: 'Avg. ROI',    accent: BLUE    },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: 17, fontWeight: 800, color: '#fff',
                lineHeight: 1, fontFamily: 'var(--fm)',
              }}>{s.val}</div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,.45)', marginTop: 3 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Campaign Snapshot — bottom-right floating card */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        style={{
          position: 'absolute', bottom: '14%', right: 0, zIndex: 10,
          background: 'rgba(8,14,36,.92)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,.12)',
          borderRadius: 14,
          padding: '14px 16px',
          minWidth: 195,
          boxShadow: '0 16px 50px rgba(0,0,0,.5)',
        }}
      >
        <div style={{
          fontSize: 9.5, fontWeight: 600, letterSpacing: '.1em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,.5)', marginBottom: 12,
        }}>
          Campaign Snapshot
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <DonutChart />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5, flex: 1 }}>
            {[
              { label: 'Nano',      pct: 32, color: MAGENTA   },
              { label: 'Micro',     pct: 28, color: BLUE      },
              { label: 'Macro',     pct: 25, color: '#7c3aed' },
              { label: 'Celebrity', pct: 15, color: '#f59e0b' },
            ].map(s => (
              <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: s.color, flexShrink: 0 }} />
                <span style={{ fontSize: 9.5, color: 'rgba(255,255,255,.7)', flex: 1 }}>{s.label}</span>
                <span style={{ fontSize: 9.5, color: 'rgba(255,255,255,.42)' }}>{s.pct}%</span>
              </div>
            ))}
          </div>
        </div>
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
        position: 'relative',
        borderRadius: 14,
        overflow: 'hidden',
        height: 420,
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
          backgroundSize: 'cover',
          backgroundPosition: 'center',
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
          width: 50, height: 50, borderRadius: '50%', background: 'rgba(255,255,255,0.9)',
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
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none', display: 'block', overflow: 'hidden' }}
            allow="autoplay; encrypted-media; picture-in-picture"
          />
        </motion.div>
      )}
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────── */
export default function InfluencerManagementPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section style={{
        background:
          'radial-gradient(ellipse at 14% 40%, rgba(224,25,125,.2) 0%, transparent 52%),' +
          'radial-gradient(ellipse at 84% 70%, rgba(26,106,255,.22) 0%, transparent 52%),' +
          'linear-gradient(135deg,#050b1a 0%,#0d1528 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '130px 48px 80px',
        overflow: 'hidden',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 40, width: '100%', flexWrap: 'wrap' }}>

          {/* LEFT: copy */}
          <div style={{ flex: '1 1 420px', minWidth: 300 }}>
            <div className="sec-label" style={{ color: MAGENTA, marginBottom: 28 }}>
              05 — Influence
            </div>

            <h1 style={{
              fontFamily: 'var(--fd)',
              fontSize: 'clamp(46px,5.8vw,86px)',
              fontWeight: 900,
              lineHeight: 1.0,
              letterSpacing: '-0.04em',
              color: '#fff',
              marginBottom: 20,
            }}>
              Every Brand<br />
              Needs a{' '}
              <em style={{ color: MAGENTA, fontStyle: 'italic' }}>Star.</em>
            </h1>

            <p style={{
              fontSize: 16,
              color: 'rgba(255,255,255,.58)',
              fontWeight: 300,
              lineHeight: 1.75,
              maxWidth: 460,
              marginBottom: 26,
            }}>
              Full-service influencer marketing and talent management from
              micro-communities to mega-reach — every tier, every category, end-to-end.
            </p>

            {/* Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 30 }}>
              {heroPills.map(p => (
                <div key={p} style={{
                  display: 'inline-flex', alignItems: 'center',
                  padding: '7px 15px',
                  background: 'rgba(255,255,255,.07)',
                  border: '1px solid rgba(255,255,255,.12)',
                  borderRadius: 50,
                  fontSize: 13,
                  color: 'rgba(255,255,255,.72)',
                  fontFamily: 'var(--fm)',
                  backdropFilter: 'blur(6px)',
                  WebkitBackdropFilter: 'blur(6px)',
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
                borderRadius: 50, padding: '13px 26px',
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
                borderRadius: 50, padding: '13px 26px',
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
                Trusted by
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

          {/* RIGHT: phone collage */}
          <div style={{ flex: '1 1 460px', minWidth: 340, position: 'relative' }}>
            <PhoneFrameCollage />
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
          fontWeight: 900,
          letterSpacing: '-0.02em',
          color: '#fff',
          lineHeight: 1.05,
          marginBottom: 12,
          maxWidth: 760,
        }}>
          Content that earned its{' '}
          <em style={{ color: BLUE, fontStyle: 'italic' }}>reach.</em>
        </h2>
        <p style={{
          fontSize: 15,
          color: 'rgba(255,255,255,.55)',
          fontWeight: 300,
          lineHeight: 1.7,
          maxWidth: 480,
          marginBottom: 44,
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
        background: 'rgba(255,255,255,.04)',
        borderTop: '1px solid rgba(255,255,255,.06)',
        borderBottom: '1px solid rgba(255,255,255,.06)',
        padding: '40px 48px',
        display: 'flex',
        gap: 0,
        backgroundColor: '#070e1e',
      }}>
        {[
          { val: '150+',        label: 'Active Talents' },
          { val: 'All Categories', label: 'Covered'     },
          { val: 'End-to-End',  label: 'Managed'        },
        ].map((stat, i) => (
          <div key={stat.label} style={{
            flex: 1, textAlign: 'center',
            borderRight: i < 2 ? '1px solid rgba(255,255,255,.08)' : 'none',
            padding: '0 20px',
          }}>
            <div style={{
              fontFamily: 'var(--fd)',
              fontSize: 'clamp(32px,4vw,56px)',
              fontWeight: 900, color: '#fff',
              lineHeight: 1, marginBottom: 8,
            }}>
              {stat.val}
            </div>
            <div style={{
              fontFamily: 'var(--fm)',
              fontSize: 9, letterSpacing: '.18em',
              textTransform: 'uppercase', color: MAGENTA,
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── FEATURE CARDS ── */}
      <section style={{ background: 'var(--navy)', padding: '80px 48px' }}>
        <div className="sec-label" style={{ color: MAGENTA, marginBottom: 40 }}>
          What We Manage
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {cards.map((card) => (
            <div key={card.num} style={{
              background: 'rgba(255,255,255,.04)',
              border: '1px solid rgba(255,255,255,.06)',
              borderRadius: 8,
              padding: '28px 24px',
            }}>
              <div style={{ fontFamily: 'var(--fm)', fontSize: 11, color: MAGENTA, letterSpacing: '.1em', marginBottom: 14 }}>
                {card.num}
              </div>
              <div style={{ fontFamily: 'var(--fd)', fontSize: 20, fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: 10 }}>
                {card.title}
              </div>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,.55)', fontWeight: 300, lineHeight: 1.65 }}>
                {card.desc}
              </p>
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
        <div className="sec-label" style={{ color: BLUE, marginBottom: 12 }}>
          In the Spotlight
        </div>
        <h2 style={{
          fontFamily: 'var(--fd)',
          fontSize: 'clamp(28px,4vw,52px)',
          fontWeight: 900,
          letterSpacing: '-0.02em',
          color: '#fff',
          lineHeight: 1.05,
          marginBottom: 44,
          maxWidth: 760,
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
              boxShadow: '0 14px 40px rgba(0,0,0,.4)',
              background: '#0d1528',
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`Influencer campaign spotlight ${i + 1}`}
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
          fontFamily: 'var(--fm)',
          fontSize: 10, letterSpacing: '.14em',
          textTransform: 'uppercase', color: MAGENTA,
        }}>
          — TSBI Influencer Team
        </p>
      </section>

      {/* ── CTA ── */}
      <section style={{
        background: 'var(--magenta)',
        padding: '80px 48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 40,
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
          <Link href="/services" className="btn-border"
                style={{ color: 'rgba(255,255,255,.7)', borderColor: 'rgba(255,255,255,.3)' }}>
            All Services
          </Link>
        </div>
      </section>
    </>
  );
}
