'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';

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

function ReelCard({
  reel,
  index,
  isVisible,
  cardRef,
}: {
  reel: (typeof reels)[0];
  index: number;
  isVisible: boolean;
  cardRef?: React.Ref<HTMLDivElement>;
}) {
  const [hovered, setHovered] = useState(false);
  const [iframeReady, setIframeReady] = useState(false);
  // Debounce the leave so the iframe doesn't flicker when cursor briefly crosses the boundary
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
      ref={cardRef}
      initial={{ opacity: 0, y: 48 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
      transition={{ duration: 0.65, delay: 0.15 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        flex: '0 0 calc((100% - 56px) / 5)',
        minWidth: 200,
        scrollSnapAlign: 'start',
      }}
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
          /* create stacking context so overflow:hidden properly clips the iframe */
          transform: 'translateZ(0)',
        }}
      >
        {/* ── Thumbnail ── */}
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

        {/* ── Instagram embed on hover ── */}
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: iframeReady ? 1 : 0 }}
            transition={{ duration: 0.35 }}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 4,
              borderRadius: 14,
              overflow: 'hidden',
            }}
          >
            <iframe
              src={`https://www.instagram.com/reel/${reel.reelId}/embed/`}
              onLoad={() => setIframeReady(true)}
              /* scrolling="no" removes the internal scrollbar */
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
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '18px 16px',
            zIndex: 3,
            pointerEvents: 'none',
          }}
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
              <span key={cat} style={{
                fontFamily: 'var(--fm)', fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase',
                padding: '3px 8px', borderRadius: 100, background: 'rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.82)',
              }}>{cat}</span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function StoriesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const firstCardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [activeIndex, setActiveIndex] = useState(0);
  const [ctaHovered, setCtaHovered] = useState(false);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const onScroll = () => {
      const step = firstCardRef.current ? firstCardRef.current.offsetWidth + 14 : 260;
      if (step > 0) setActiveIndex(Math.round(row.scrollLeft / step));
    };
    row.addEventListener('scroll', onScroll, { passive: true });
    return () => row.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.7 }}
      style={{
        position: 'relative',
        background: 'linear-gradient(135deg, #ff5c0d 0%, #ff3d12 55%, #e63200 100%)',
        overflow: 'hidden',
        padding: '72px 48px 60px',
      }}
    >
      {/* Radial glow */}
      <div style={{
        position: 'absolute', top: '40%', left: '55%', transform: 'translate(-50%,-50%)',
        width: '70vw', height: '70vw', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* ── HEADER ROW ── */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 40,
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Left: pill + headline */}
        <div>
          {/* Pill */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              border: '1px solid rgba(255,255,255,0.38)', borderRadius: 100,
              padding: '5px 14px 5px 10px', marginBottom: 18,
            }}
          >
            <div style={{
              width: 17, height: 17, borderRadius: '50%',
              border: '1.5px solid rgba(255,255,255,0.55)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                <path d="M2.5 1.5L8.5 5L2.5 8.5V1.5Z" fill="#fff" />
              </svg>
            </div>
            <span style={{ fontFamily: 'var(--fm)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#fff' }}>
              Social Media
            </span>
          </motion.div>

          {/* Headline — use paddingTop on the clip wrapper so ascenders aren't cut */}
          <div style={{ overflow: 'hidden', paddingTop: '0.08em' }}>
            <motion.div
              initial={{ y: '110%' }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 0.72, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(40px, 6vw, 78px)', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.03em', color: '#fff' }}
            >
              Reels that
            </motion.div>
          </div>
          <div style={{ overflow: 'hidden', paddingTop: '0.06em' }}>
            <motion.div
              initial={{ y: '110%' }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 0.72, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(40px, 6vw, 78px)', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.03em', color: '#0a0a0a' }}
            >
              stop the scroll.
            </motion.div>
          </div>
        </div>

        {/* Right: copy + underline */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.45 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}
        >
          <p style={{ fontFamily: 'var(--fb)', fontSize: 15, color: 'rgba(255,255,255,0.85)', textAlign: 'right', lineHeight: 1.7, marginBottom: 14 }}>
            Scroll-stopping reels for the most-watched brands.<br />
            Crafted to drive views, saves, and shares.
          </p>
          <svg width="188" height="20" viewBox="0 0 188 20" fill="none" style={{ display: 'block' }}>
            <motion.path
              d="M 3 16 Q 47 5 94 13 Q 141 21 185 9"
              stroke="rgba(255,255,255,0.65)" strokeWidth="2.2" strokeLinecap="round" fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 1.3, delay: 0.85, ease: 'easeInOut' }}
            />
          </svg>
        </motion.div>
      </div>

      {/* ── REEL CARDS ── */}
      <div
        ref={rowRef}
        className="stories-row"
        style={{ display: 'flex', gap: 14, overflowX: 'auto', scrollSnapType: 'x mandatory', paddingBottom: 2, position: 'relative', zIndex: 1 }}
      >
        {reels.map((reel, i) => (
          <ReelCard
            key={reel.reelId}
            reel={reel}
            index={i}
            isVisible={isInView}
            cardRef={i === 0 ? firstCardRef : undefined}
          />
        ))}
      </div>

      {/* ── PAGINATION ── */}
      {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 7, marginTop: 24, position: 'relative', zIndex: 1 }}>
        {reels.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => {
              setActiveIndex(i);
              const step = firstCardRef.current ? firstCardRef.current.offsetWidth + 14 : 260;
              rowRef.current?.scrollTo({ left: i * step, behavior: 'smooth' });
            }}
            animate={{ width: i === activeIndex ? 28 : 14, opacity: i === activeIndex ? 1 : 0.38 }}
            transition={{ duration: 0.3 }}
            style={{ height: 3, borderRadius: 2, background: '#fff', border: 'none', cursor: 'pointer', padding: 0 }}
            aria-label={`Go to reel ${i + 1}`}
          />
        ))}
      </div> */}

      {/* ── CTA ── */}
      <div style={{ textAlign: 'center', marginTop: 36, position: 'relative', zIndex: 1 }}>
        <motion.div
          onHoverStart={() => setCtaHovered(true)}
          onHoverEnd={() => setCtaHovered(false)}
          animate={{ y: ctaHovered ? -2 : 0 }}
          transition={{ duration: 0.25 }}
          style={{ display: 'inline-block' }}
        >
          <Link
            href="/services/social-media"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: ctaHovered ? '#0a0a0a' : '#fff',
              color: ctaHovered ? '#fff' : '#ff4c0c',
              borderRadius: 100, padding: '13px 32px',
              fontFamily: 'var(--fm)', fontSize: 11, fontWeight: 600,
              letterSpacing: '0.17em', textTransform: 'uppercase',
              textDecoration: 'none', transition: 'background 0.25s, color 0.25s',
              boxShadow: '0 4px 20px rgba(0,0,0,0.22)',
            }}
          >
            View All Reels
            <motion.span animate={{ x: ctaHovered ? 5 : 0 }} transition={{ duration: 0.25 }} style={{ display: 'inline-block' }}>
              →
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
