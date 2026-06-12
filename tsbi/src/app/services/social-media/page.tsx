'use client';

import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// Shared brand orange (matches the home Social Media section).
const ORANGE_GRAD = 'linear-gradient(135deg, #ff5c0d 0%, #ff3d12 55%, #e63200 100%)';

/* ── YouTube social media campaign work ── */
type YTWork = {
  client: string; house?: string; category: string;
  title: string; desc: string; videoId: string; caseStudySlug?: string;
};
const youtubeWork: YTWork[] = [
  { client: 'Sunny Sanskari Ki Tulsi Kumari', house: 'Dharma Productions', category: 'Film Marketing · Romantic Comedy', title: 'Chaos Sells Romance', desc: "Rom-coms don't thrive on subtlety — they thrive on chaos, chemistry, and cultural noise. We turned cast energy, heartbreak, and music trends into a high-voltage social ecosystem where Bijuria and Panwadi ignited millions of reels.", videoId: '9FUd-D4FWjw', caseStudySlug: 'dharma-production' },
  { client: 'MAA', house: 'Devgn Films', category: 'Film Marketing · Horror', title: 'End Credit Goes To MAA', desc: "Blending supernatural fear with maternal strength, we inducted MAA into the Shaitaan universe and replaced surnames with mothers' names in the credits — a first in Indian cinema.", videoId: 'zwtZj6YB9xk', caseStudySlug: 'maa-devgn' },
  { client: 'Sitaare Zameen Par', house: 'Aamir Khan Productions', category: 'Film Marketing · Entertainment', title: 'Imperfectly Perfect Teaser', desc: "A handcrafted pop-up cutout aesthetic revealing the film's 10 Sitaare one by one before the trailer drop. Playful honesty over polished perfection.", videoId: 'YH6k5weqwy8', caseStudySlug: 'sitaare-zameen-par' },
  { client: 'Son Of Sardaar 2', house: 'Devgn Films', category: 'Film Marketing · Comedy', title: 'Jahan Son Hai, Wahan Fun Hai', desc: "#PehlaTuDujaTu turned even trolls into participants. Cast chemistry, behind-the-scenes chaos and the PO PO song established one idea: Fun = Son Of Sardaar 2.", videoId: 'RaJGfQ_bb18', caseStudySlug: 'son-of-sardaar-2' },
  { client: 'ICICI Direct', category: 'Banking · Campaign Film', title: 'Yes To Udhaar — MTF Campaign', desc: "Drawing on India's 'Aaj Nagad, Kal Udhaar' kirana culture, we reframed ICICI Direct MTF's credit trading as a relatable, culturally resonant proposition for everyday investors.", videoId: 'wawKnq3860g' },
  { client: 'Kesari Chapter 2', house: 'Dharma Productions', category: 'Film Marketing · Historical', title: 'Witness The History', desc: "A blank-screen teaser hijacked all feeds. Progressive reveals of Akshay Kumar, R Madhavan and Ananya Panday turned audiences from passive spectators into active witnesses.", videoId: 'r-7g08INMSI', caseStudySlug: 'kesari-chapter-2' },
];

function YouTubeCard({ w, index }: { w: YTWork; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: 0.08 * index, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'box-shadow .3s, transform .3s', boxShadow: hovered ? '0 18px 50px rgba(0,0,0,.12)' : '0 2px 12px rgba(0,0,0,.04)', transform: hovered ? 'translateY(-4px)' : 'none' }}
    >
      {/* Thumbnail */}
      <a href={`https://www.youtube.com/watch?v=${w.videoId}`} target="_blank" rel="noopener noreferrer"
        style={{ display: 'block', position: 'relative', aspectRatio: '16/9', background: '#111', textDecoration: 'none' }}
      >
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(https://img.youtube.com/vi/${w.videoId}/hqdefault.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center', transform: hovered ? 'scale(1.05)' : 'scale(1)', transition: 'transform .5s ease' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,.7) 0%, rgba(0,0,0,.05) 55%, transparent 100%)' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: `translate(-50%,-50%) scale(${hovered ? 1.12 : 1})`, width: 52, height: 52, borderRadius: '50%', background: 'rgba(255,255,255,.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform .3s ease' }}>
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M4 2.5L13.5 8L4 13.5V2.5Z" fill="#111" /></svg>
        </div>
      </a>
      {/* Content */}
      <div style={{ padding: '20px 20px 22px', display: 'flex', flexDirection: 'column', gap: 7, flex: 1 }}>
        <span style={{ fontFamily: 'var(--fm)', fontSize: 10, letterSpacing: '.13em', textTransform: 'uppercase', color: 'var(--magenta)' }}>{w.category}</span>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--fb)', fontSize: 17, fontWeight: 700, color: 'var(--ink)' }}>{w.client}</span>
          {w.house && <span style={{ fontFamily: 'var(--fm)', fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>{w.house}</span>}
        </div>
        <span style={{ fontFamily: 'var(--fd)', fontStyle: 'italic', fontSize: 15, color: 'var(--ink2)', lineHeight: 1.3 }}>{w.title}</span>
        <p style={{ fontFamily: 'var(--fb)', fontSize: 13, fontWeight: 300, lineHeight: 1.7, color: 'var(--muted)', margin: '2px 0 0' }}>{w.desc}</p>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginTop: 'auto', paddingTop: 12 }}>
          <a href={`https://www.youtube.com/watch?v=${w.videoId}`} target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: 'var(--fm)', fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--magenta)', textDecoration: 'none', borderBottom: '1px solid var(--magenta)' }}>
            Watch on YouTube →
          </a>
          {w.caseStudySlug && (
            <Link href={`/case-studies/${w.caseStudySlug}`}
              style={{ fontFamily: 'var(--fm)', fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--ink)', textDecoration: 'none', borderBottom: '1px solid var(--ink)' }}>
              View Case Study →
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}

const platforms = [
  { name: 'Instagram', color: '#e0197d' },
  { name: 'LinkedIn', color: '#0077b5' },
  { name: 'YouTube', color: '#ff0000' },
  { name: 'Facebook', color: '#1877f2' },
  { name: 'X / Twitter', color: '#000000' },
  { name: 'Threads', color: '#000000' },
];

// Same reels data as the home Social Media section.
const reels = [
  {
    brand: 'Dharmatic Entertainment',
    title: 'Accused — Movie Campaign',
    categories: ['Movie', 'Reel'],
    img: '/thumbnail/accused%20.png',
    reelId: 'DVvK4zsCODL',
  },
  {
    brand: 'Dharmatic Entertainment',
    title: 'Aap Jaisa Koi — Reel',
    categories: ['Movie', 'Reel'],
    img: '/thumbnail/aap%20jaisa%20koi%20.png',
    reelId: 'DMZ4SKSRwB_',
  },
  {
    brand: 'Dharmatic Entertainment',
    title: 'Aap Jaisa Koi — BTS',
    categories: ['Movie', 'BTS'],
    img: '/thumbnail/3rd.jpg',
    reelId: 'DLwntzhI1rB',
  },
  {
    brand: 'Dharmatic Entertainment',
    title: 'Aap Jaisa Koi — Sajan',
    categories: ['Movie', 'Reel'],
    img: '/thumbnail/sajan%20song.png',
    reelId: 'DLrP6KcID4-',
  },
  {
    brand: 'Dharmatic Entertainment',
    title: 'Accused — Social Reel',
    categories: ['Movie', 'Social'],
    img: '/thumbnail/last.png',
    reelId: 'DViU2BVCGRr',
  },
];


// ── Phone-frame reel slider ─────────────────────────────────────────────────
function smCDist(i: number, active: number, n: number) {
  const d = ((i - active) % n + n) % n;
  return d > n / 2 ? d - n : d;
}

const PHONE_W    = 220;
const PHONE_H    = 430;
const PHONE_STRIDE = 210;

function PhoneReelSlider() {
  const [active, setActive]       = useState(0);
  const [containerW, setContainerW] = useState(660);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef     = useRef<ReturnType<typeof setInterval> | null>(null);
  const N = reels.length;

  useEffect(() => {
    const m = () => { if (containerRef.current) setContainerW(containerRef.current.offsetWidth); };
    m();
    window.addEventListener('resize', m);
    return () => window.removeEventListener('resize', m);
  }, []);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setActive(p => (p + 1) % N), 4500);
  };
  useEffect(() => { resetTimer(); return () => { if (timerRef.current) clearInterval(timerRef.current); }; }, []);

  const goTo = (i: number) => { setActive(((i % N) + N) % N); resetTimer(); };

  return (
    <div style={{ width: '100%' }}>
      <div ref={containerRef} style={{ position: 'relative', height: PHONE_H + 60, overflow: 'hidden' }}>
        {reels.map((reel, i) => {
          const d       = smCDist(i, active, N);
          if (Math.abs(d) > 2) return null;
          const isAct   = d === 0;
          const absDist = Math.abs(d);
          const x       = containerW / 2 - PHONE_W / 2 + d * PHONE_STRIDE;
          const scale   = isAct ? 1 : absDist === 1 ? 0.82 : 0.66;
          const opacity = isAct ? 1 : absDist === 1 ? 0.72 : 0.36;
          const rotateY = isAct ? 0 : d < 0 ? 22 : -22;

          return (
            <motion.div
              key={reel.reelId}
              animate={{ x, scale, opacity, rotateY }}
              transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => !isAct && goTo(i)}
              style={{
                position: 'absolute', top: 10, left: 0,
                width: PHONE_W, height: PHONE_H,
                borderRadius: 34, overflow: 'hidden',
                background: '#0a0a0a',
                border: isAct ? '2px solid rgba(255,92,13,0.9)' : '1.5px solid rgba(255,255,255,0.15)',
                boxShadow: isAct
                  ? '0 0 0 1px rgba(255,92,13,0.35), 0 0 48px rgba(255,92,13,0.28), 0 22px 60px rgba(0,0,0,0.65)'
                  : '0 10px 40px rgba(0,0,0,0.55)',
                zIndex: 10 - absDist,
                cursor: isAct ? 'default' : 'pointer',
                transformPerspective: 1100,
              }}
            >
              {/* Phone notch */}
              <div style={{ position: 'absolute', top: 11, left: '50%', transform: 'translateX(-50%)', width: 72, height: 9, background: '#000', borderRadius: 9, zIndex: 20 }} />

              {/* Thumbnail */}
              <img src={reel.img} alt={reel.title}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />

              {/* Dark overlay */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.05) 55%, transparent 100%)' }} />

              {/* Category badge */}
              {isAct && (
                <div style={{ position: 'absolute', top: 32, right: 12, fontFamily: 'var(--fm)', fontSize: 8, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#fff', background: 'rgba(255,92,13,0.82)', borderRadius: 4, padding: '3px 9px', zIndex: 5 }}>
                  {reel.categories[0]}
                </div>
              )}

              {/* Play button */}
              {isAct && (
                <a href={`https://www.instagram.com/reel/${reel.reelId}/`} target="_blank" rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 54, height: 54, borderRadius: '50%', background: 'rgba(255,255,255,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', zIndex: 10 }}
                >
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="none"><path d="M4 2.5L13.5 8L4 13.5V2.5Z" fill="#111" /></svg>
                </a>
              )}

              {/* Bottom info */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '18px 14px' }}>
                <div style={{ fontFamily: 'var(--fm)', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 5 }}>{reel.brand}</div>
                <div style={{ fontFamily: 'var(--fd)', fontSize: isAct ? 15 : 12, fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>{reel.title}</div>
                {isAct && (
                  <div style={{ display: 'flex', gap: 5, marginTop: 8, flexWrap: 'wrap' }}>
                    {reel.categories.map(cat => (
                      <span key={cat} style={{ fontFamily: 'var(--fm)', fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: 100, background: 'rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.8)' }}>{cat}</span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── Nav: arrows + counter + progress ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, paddingTop: 6 }}>
        <button onClick={() => goTo(active - 1)}
          style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 0 }}
        >
          <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontFamily: 'var(--fm)', fontSize: 16, fontWeight: 700, color: '#ff5c0d', letterSpacing: '-0.01em', minWidth: 26, textAlign: 'right' }}>
            {String(active + 1).padStart(2, '0')}
          </span>
          <span style={{ fontFamily: 'var(--fm)', fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>/ {String(N).padStart(2, '0')}</span>
          <div style={{ width: 90, height: 3, background: 'rgba(255,255,255,0.18)', borderRadius: 3, position: 'relative', marginLeft: 6 }}>
            <motion.div
              animate={{ width: `${((active + 1) / N) * 100}%` }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: 'absolute', left: 0, top: 0, height: '100%', background: '#ff5c0d', borderRadius: 3 }}
            />
            <motion.div
              animate={{ left: `${((active + 1) / N) * 100}%` }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: 'absolute', top: '50%', translateY: '-50%', width: 11, height: 11, borderRadius: '50%', background: '#ff5c0d', marginLeft: -5, marginTop: -4 }}
            />
          </div>
        </div>

        <button onClick={() => goTo(active + 1)}
          style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 0 }}
        >
          <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M5 2l5 5-5 5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
    </div>
  );
}

// Floating reel cards shown on the right of the hero.
const heroCards = [
  { reelId: 'DVvK4zsCODL', img: '/thumbnail/accused%20.png', label: 'Accused', x: '2%', y: '4%', rot: '-7deg', z: 6, delay: 0 },
  { reelId: 'DMZ4SKSRwB_', img: '/thumbnail/aap%20jaisa%20koi%20.png', label: 'Aap Jaisa Koi', x: '44%', y: '0%', rot: '6deg', z: 5, delay: 0.6 },
  { reelId: 'DLrP6KcID4-', img: '/thumbnail/sajan%20song.png', label: 'Sajan', x: '22%', y: '48%', rot: '-3deg', z: 7, delay: 1.2 },
];

function HeroCard({ c }: { c: (typeof heroCards)[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.a
      href={`https://www.instagram.com/reel/${c.reelId}/`}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 60, rotate: 0 }}
      animate={{
        opacity: 1,
        y: [0, -12, 0, 8, 0],
        rotate: hovered ? 0 : parseFloat(c.rot),
        transition: {
          opacity: { duration: 0.6, delay: c.delay * 0.25 },
          rotate: { duration: 0.35 },
          y: { duration: 6, delay: c.delay, repeat: Infinity, ease: 'easeInOut' },
        },
      }}
      whileHover={{ scale: 1.05 }}
      style={{
        position: 'absolute',
        left: c.x,
        top: c.y,
        zIndex: c.z,
        width: 'clamp(150px, 19vw, 240px)',
        aspectRatio: '3/4',
        borderRadius: 16,
        overflow: 'hidden',
        display: 'block',
        textDecoration: 'none',
        background: '#111',
        boxShadow: hovered
          ? '0 22px 60px rgba(0,0,0,.5), 0 0 0 1.5px rgba(255,255,255,.4)'
          : '0 12px 38px rgba(0,0,0,.4)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${c.img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: hovered ? 'scale(1.06)' : 'scale(1)',
          transition: 'transform .5s ease',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,.85) 0%, transparent 50%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%,-50%) scale(${hovered ? 1.15 : 1})`,
          width: 44,
          height: 44,
          borderRadius: '50%',
          background: 'rgba(255,255,255,.92)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform .3s ease',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M4 2.5L13.5 8L4 13.5V2.5Z" fill="#111" />
        </svg>
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ff7a40', flexShrink: 0 }} />
          <span style={{ fontFamily: 'var(--fb)', fontSize: 12, fontWeight: 700, color: '#fff' }}>{c.label}</span>
        </div>
      </div>
    </motion.a>
  );
}

const features = [
  {
    num: '01',
    title: 'Strategy & Calendars',
    desc: 'Platform-specific strategy and monthly content calendars built around your brand voice and business goals.',
  },
  {
    num: '02',
    title: 'Content Creation & Design',
    desc: 'In-house creatives producing scroll-stopping visuals, copy and short-form video every week.',
  },
  {
    num: '03',
    title: 'Community Management',
    desc: 'Real-time engagement, DM management and brand reputation handled by dedicated community specialists.',
  },
  {
    num: '04',
    title: 'Paid Social Amplification',
    desc: 'Boosting the best-performing organic content with precision paid targeting to multiply reach.',
  },
  {
    num: '05',
    title: 'Social Listening & Analytics',
    desc: 'Brand sentiment tracking, competitor benchmarking and trend identification to stay ahead.',
  },
  {
    num: '06',
    title: 'Platform Management',
    desc: 'IG, LinkedIn, YouTube, X and more — one team managing every channel with no drop in quality.',
  },
];

const differentiators = [
  {
    title: 'Strategy + Creative, One Roof',
    desc: 'No briefing back and forth. Our strategists and creatives work together.',
  },
  {
    title: 'Always-On Delivery',
    desc: 'Content calendars locked, approved and scheduled weeks in advance.',
  },
  {
    title: 'Performance-Driven',
    desc: 'Every post benchmarked against KPIs. Monthly reports in plain language.',
  },
];

function ReelCard({ reel, index }: { reel: (typeof reels)[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [iframeReady, setIframeReady] = useState(false);
  // Debounce the leave so the iframe doesn't flicker when the cursor briefly crosses the boundary.
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = () => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setHovered(true);
  };
  const handleLeave = () => {
    leaveTimer.current = setTimeout(() => {
      setHovered(false);
      setIframeReady(false);
    }, 120);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <motion.div
        animate={{
          y: hovered ? -10 : 0,
          boxShadow: hovered
            ? '0 28px 70px rgba(0,0,0,0.55), 0 0 0 1.5px rgba(255,255,255,0.25)'
            : '0 6px 24px rgba(0,0,0,0.28)',
        }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        style={{
          borderRadius: 14,
          overflow: 'hidden',
          position: 'relative',
          aspectRatio: '3/4',
          background: '#111',
          transform: 'translateZ(0)',
        }}
      >
        {/* Thumbnail */}
        <motion.div
          animate={{ opacity: hovered && iframeReady ? 0 : 1, scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${reel.img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Gradient overlay */}
        <motion.div
          animate={{ opacity: hovered && iframeReady ? 0 : 0.72 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Instagram embed on hover */}
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: iframeReady ? 1 : 0 }}
            transition={{ duration: 0.35 }}
            style={{ position: 'absolute', inset: 0, zIndex: 4, borderRadius: 14, overflow: 'hidden' }}
          >
            <iframe
              src={`https://www.instagram.com/reel/${reel.reelId}/embed/`}
              onLoad={() => setIframeReady(true)}
              scrolling="no"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 'none',
                display: 'block',
                overflow: 'hidden',
              }}
              allow="autoplay; encrypted-media; picture-in-picture"
            />
          </motion.div>
        )}

        {/* Play icon */}
        <motion.div
          animate={{ scale: hovered ? 1.12 : 1, opacity: hovered && iframeReady ? 0 : 0.9 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute',
            top: 14,
            right: 14,
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.16)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <path d="M4 2.5L13.5 8L4 13.5V2.5Z" fill="#fff" />
          </svg>
        </motion.div>

        {/* Bottom info */}
        <motion.div
          animate={{ opacity: hovered && iframeReady ? 0 : 1, y: hovered && iframeReady ? 8 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '18px 16px', zIndex: 3, pointerEvents: 'none' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#ff7a40', flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--fm)', fontSize: 9, letterSpacing: '0.13em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.72)' }}>
              {reel.brand}
            </span>
          </div>
          <div style={{ fontFamily: 'var(--fd)', fontSize: 14, fontWeight: 700, color: '#fff', lineHeight: 1.25, marginBottom: 10 }}>
            {reel.title}
          </div>
          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
            {reel.categories.map((cat) => (
              <span
                key={cat}
                style={{
                  fontFamily: 'var(--fm)',
                  fontSize: 8,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  padding: '3px 8px',
                  borderRadius: 100,
                  background: 'rgba(255,255,255,0.14)',
                  color: 'rgba(255,255,255,0.82)',
                }}
              >
                {cat}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function SocialMediaPage() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });
  // Orange through hero, quick fade to dark so both reels + YouTube show on dark bg
  const bgColor = useTransform(
    smooth,
    [0,        0.15,      0.16,      0.28,      0.75,      0.88,     1   ],
    ['#ff5c0d','#ff5c0d','#c93600','#0f0806','#0f0806','#cc3600','#ff5c0d']
  );

  return (
    <motion.main style={{ background: bgColor }}>
      {/* ── HERO: brand orange feed ── */}
      <section
        style={{
          background: ORANGE_GRAD,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          padding: '140px 48px 80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Radial glow, same as home section */}
        <div
          style={{
            position: 'absolute',
            top: '40%',
            left: '55%',
            transform: 'translate(-50%,-50%)',
            width: '70vw',
            height: '70vw',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 65%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: 40, width: '100%', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
          {/* ── LEFT: copy ── */}
          <div style={{ flex: '1 1 400px', minWidth: 280 }}>
            {/* Pill */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                border: '1px solid rgba(255,255,255,0.38)',
                borderRadius: 100,
                padding: '5px 14px 5px 10px',
                marginBottom: 28,
              }}
            >
              <div
                style={{
                  width: 17,
                  height: 17,
                  borderRadius: '50%',
                  border: '1.5px solid rgba(255,255,255,0.55)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                  <path d="M2.5 1.5L8.5 5L2.5 8.5V1.5Z" fill="#fff" />
                </svg>
              </div>
              <span style={{ fontFamily: 'var(--fm)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#fff' }}>
                06 — Social Media
              </span>
            </div>

            <h1
              style={{
                fontFamily: 'var(--fd)',
                fontSize: 'clamp(52px,7.5vw,108px)',
                fontWeight: 900,
                lineHeight: 0.92,
                letterSpacing: '-0.04em',
                marginBottom: 32,
              }}
            >
              <span style={{ color: '#fff', display: 'block' }}>Always On.</span>
              <span style={{ color: '#0a0a0a', display: 'block' }}>Always Relevant.</span>
            </h1>

            <p
              style={{
                fontSize: 16,
                color: 'rgba(255,255,255,.9)',
                fontWeight: 300,
                lineHeight: 1.75,
                maxWidth: 480,
              }}
            >
              Always-on social strategies, content calendars, community management and creative
              production that builds real audiences and drives real engagement.
            </p>
          </div>

          {/* ── RIGHT: phone reel slider ── */}
          <div style={{ flex: '1 1 500px', minWidth: 340, display: 'flex', justifyContent: 'center' }}>
            <PhoneReelSlider />
          </div>
        </div>
      </section>

      {/* ── PLATFORM BADGES ── */}
      {/* <div
        style={{
          background: '#fff',
          padding: '32px 48px',
          display: 'flex',
          gap: 12,
          flexWrap: 'wrap',
          borderBottom: '1px solid var(--border)',
        }}
      >
        {platforms.map((p) => (
          <div
            key={p.name}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '12px 20px',
              borderRadius: 100,
              border: '1px solid var(--border)',
              fontFamily: 'var(--fb)',
              fontSize: 13,
              color: 'var(--ink)',
              fontWeight: 500,
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: p.color, flexShrink: 0 }} />
            {p.name}
          </div>
        ))}
      </div> */}

      {/* ── REELS SHOWCASE ── */}
      <section style={{ background: 'transparent', position: 'relative', overflow: 'hidden', padding: '88px 48px 80px' }}>
        <div
          style={{
            position: 'absolute',
            top: '40%',
            left: '55%',
            transform: 'translate(-50%,-50%)',
            width: '70vw',
            height: '70vw',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 65%)',
            pointerEvents: 'none',
          }}
        />

        {/* Header row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: 24,
            marginBottom: 56,
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div>
            <div style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(40px,6vw,78px)', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.03em', color: '#fff' }}>
              Reels that
            </div>
            <div style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(40px,6vw,78px)', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.03em', color: '#0a0a0a' }}>
              stop the scroll.
            </div>
          </div>
          <p style={{ fontFamily: 'var(--fb)', fontSize: 15, color: 'rgba(255,255,255,0.9)', textAlign: 'right', lineHeight: 1.7, maxWidth: 360 }}>
            Scroll-stopping reels for the most-watched brands.<br />
            Crafted to drive views, saves, and shares.
          </p>
        </div>

        {/* Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: 16,
            position: 'relative',
            zIndex: 1,
          }}
        >
          {reels.map((reel, i) => (
            <ReelCard key={reel.reelId} reel={reel} index={i} />
          ))}
        </div>
      </section>

      {/* ── FEATURES GRID ── */}
      {/* <section style={{ background: 'var(--white)', padding: '80px 48px' }}>
        <div className="sec-label" style={{ marginBottom: 48 }}>
          What We Do
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 40 }}>
          {features.map((feat) => (
            <div key={feat.num} style={{ padding: '32px 0', borderTop: '3px solid var(--border)' }}>
              <div style={{ fontFamily: 'var(--fm)', fontSize: 11, color: 'var(--faint)', letterSpacing: '.1em', marginBottom: 2 }}>
                {feat.num}
              </div>
              <div style={{ fontFamily: 'var(--fd)', fontSize: 22, fontWeight: 700, color: 'var(--ink)', lineHeight: 1.2, margin: '8px 0' }}>
                {feat.title}
              </div>
              <p style={{ fontSize: 14, color: 'var(--muted)', fontWeight: 300, lineHeight: 1.65 }}>
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </section> */}


      {/* ── YOUTUBE CAMPAIGN WORK ── */}
      <section style={{ background: 'transparent', padding: '80px 48px', position: 'relative' }}>
        <div className="sec-label" style={{ marginBottom: 12, color: 'rgba(255,255,255,0.55)', position: 'relative' }}>YouTube Campaign Work</div>
        <h2 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(28px,3.6vw,48px)', fontWeight: 900, letterSpacing: '-0.02em', color: '#fff', lineHeight: 1, marginBottom: 48, maxWidth: 640, position: 'relative' }}>
          Social-first campaigns. Crafted for YouTube.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 28 }}>
          {youtubeWork.map((w, i) => <YouTubeCard key={w.videoId} w={w} index={i} />)}
        </div>
      </section>

      {/* ── CTA: brand orange ── */}
      <section
        style={{
          background: ORANGE_GRAD,
          padding: '80px 48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 40,
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--fd)',
            fontSize: 'clamp(32px,5vw,60px)',
            fontWeight: 900,
            color: '#fff',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            whiteSpace: 'pre-line',
          }}
        >
          {"Let's build your\nsocial presence."}
        </h2>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/contact" className="btn-fill" style={{ background: '#fff', color: '#ff4c0c' }}>
            Start a Project →
          </Link>
          <Link
            href="/services"
            className="btn-border"
            style={{ color: 'rgba(255,255,255,.85)', borderColor: 'rgba(255,255,255,.45)' }}
          >
            All Services
          </Link>
        </div>
      </section>
    </motion.main>
  );
}
