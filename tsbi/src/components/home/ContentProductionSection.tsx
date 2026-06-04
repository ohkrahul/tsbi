'use client';

import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';

const videos = [
  {
    brand: 'Ashok Leyland',
    title: 'Brand Film',
    category: 'Brand Film',
    duration: '02:45',
    thumbnail: 'https://img.youtube.com/vi/37CCZAHaYx8/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=37CCZAHaYx8',
    rotate: '-6deg',
    x: '4%',
    y: '3%',
    zIndex: 5,
    scale: 1.0,
    floatDelay: 0,
  },
  {
    brand: 'ICICI Direct',
    title: 'Campaign Film',
    category: 'Campaign Film',
    duration: '01:30',
    thumbnail: 'https://img.youtube.com/vi/4D4H43PBEEo/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=4D4H43PBEEo&t=1s',
    rotate: '5deg',
    x: '52%',
    y: '2%',
    zIndex: 4,
    scale: 0.95,
    floatDelay: 0.4,
  },
  {
    brand: 'DHL',
    title: 'Mumbai Indians IPL',
    category: 'Social Reel',
    duration: '00:30',
    thumbnail: 'https://img.youtube.com/vi/MJofvf2lBNY/hqdefault.jpg',
    url: 'https://youtu.be/MJofvf2lBNY',
    rotate: '-4deg',
    x: '3%',
    y: '40%',
    zIndex: 3,
    scale: 0.98,
    floatDelay: 0.8,
  },
  {
    brand: 'Disney',
    title: 'Campaign Film',
    category: 'Campaign Film',
    duration: '01:15',
    thumbnail: 'https://img.youtube.com/vi/qzHtzyuk_g4/hqdefault.jpg',
    url: 'https://youtu.be/qzHtzyuk_g4',
    rotate: '6deg',
    x: '52%',
    y: '38%',
    zIndex: 2,
    scale: 0.92,
    floatDelay: 1.2,
  },
  {
    brand: 'Thailand Tourism',
    title: 'Brand Film',
    category: 'Brand Film',
    duration: '00:45',
    thumbnail: 'https://img.youtube.com/vi/BglRilfoGOA/hqdefault.jpg',
    url: 'https://youtu.be/BglRilfoGOA',
    rotate: '-2deg',
    x: '26%',
    y: '72%',
    zIndex: 6,
    scale: 1,
    floatDelay: 1.6,
  },
];

const floatVariant = (delay: number) => ({
  animate: {
    y: [0, -12, 0, 8, 0],
    transition: {
      duration: 6,
      delay,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  },
});

const cardEnter = (i: number) => ({
  hidden: { opacity: 0, y: 60, rotate: 0 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: parseInt(videos[i].rotate),
    transition: { duration: 0.7, delay: 0.3 + i * 0.15, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  },
});

function VideoCard({ v, i }: { v: typeof videos[0]; i: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={cardEnter(i)}
      initial="hidden"
      animate="visible"
      style={{
        position: 'absolute',
        left: v.x,
        top: v.y,
        zIndex: v.zIndex,
        width: 'clamp(180px, 22vw, 270px)',
      }}
    >
      <motion.div
        variants={floatVariant(v.floatDelay)}
        animate="animate"
      >
        <motion.a
          href={v.url}
          target="_blank"
          rel="noopener noreferrer"
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          animate={{
            rotate: hovered ? 0 : parseInt(v.rotate),
            y: hovered ? -8 : 0,
            scale: hovered ? 1.04 : v.scale,
            boxShadow: hovered
              ? '0 20px 60px rgba(196,81,122,0.35), 0 4px 20px rgba(0,0,0,0.25)'
              : '0 8px 32px rgba(0,0,0,0.18)',
          }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          style={{
            display: 'block',
            borderRadius: 16,
            overflow: 'hidden',
            cursor: 'pointer',
            textDecoration: 'none',
            background: '#111',
            aspectRatio: '16/10',
            position: 'relative',
          }}
        >
          {/* thumbnail */}
          <motion.div
            animate={{ scale: hovered ? 1.07 : 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${v.thumbnail})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

          {/* overlay */}
          <motion.div
            animate={{ opacity: hovered ? 0.72 : 0.52 }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)',
            }}
          />

          {/* play button */}
          <motion.div
            animate={{ scale: hovered ? 1.15 : 1, opacity: hovered ? 1 : 0.88 }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.92)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 2.5L13.5 8L4 13.5V2.5Z" fill="#111" />
            </svg>
          </motion.div>

          {/* bottom info */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '10px 14px',
            zIndex: 2,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div>
                <div style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', fontFamily: 'monospace', marginBottom: 3 }}>{v.category}</div>
                <div style={{ fontSize: 11, color: '#fff', fontWeight: 600, fontFamily: 'monospace', lineHeight: 1.3 }}>{v.brand}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.82)', fontStyle: 'italic', lineHeight: 1.3 }}>{v.title}</div>
              </div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)', fontFamily: 'monospace' }}>{v.duration}</div>
            </div>
          </div>

          {/* pink glow on hover */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0 }}
            style={{
              position: 'absolute',
              inset: -2,
              borderRadius: 18,
              border: '1.5px solid rgba(196,81,122,0.7)',
              pointerEvents: 'none',
            }}
          />
        </motion.a>
      </motion.div>
    </motion.div>
  );
}

export default function ContentProductionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const cardsX = useTransform(springX, [-1, 1], [-10, 10]);
  const cardsY = useTransform(springY, [-1, 1], [-6, 6]);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mouseX.set((e.clientX - cx) / cx);
      mouseY.set((e.clientY - cy) / cy);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [mouseX, mouseY]);

  const textEnter = (delay = 0) => ({
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
  });

  return (
    <section 
      ref={sectionRef}
      style={{
        position: 'relative',
        background: '#f5f0eb',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* ambient blobs */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '10%', right: '20%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(196,81,122,0.1) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '35%', width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(196,81,122,0.07) 0%, transparent 70%)', filter: 'blur(30px)' }} />
      </div>

      {/* SVG orbit lines */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        viewBox="0 0 1400 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <motion.path
          d="M 700,400 Q 900,150 1150,220 Q 1320,280 1280,460 Q 1240,620 1050,650"
          fill="none"
          stroke="rgba(196,81,122,0.22)"
          strokeWidth="1.2"
          strokeDasharray="8 6"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 2.5, delay: 0.5, ease: 'easeInOut' }}
        />
        <motion.path
          d="M 720,380 Q 950,100 1220,180 Q 1380,260 1300,500"
          fill="none"
          stroke="rgba(196,81,122,0.14)"
          strokeWidth="0.8"
          strokeDasharray="4 8"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 2.8, delay: 0.8, ease: 'easeInOut' }}
        />
        {/* Arrow heads */}
        <motion.circle cx="1050" cy="650" r="3" fill="rgba(196,81,122,0.5)"
          initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 3 }} />
        <motion.circle cx="1300" cy="500" r="2.5" fill="rgba(196,81,122,0.4)"
          initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 3.2 }} />
        {/* Sparkle dots */}
        {[[860, 160], [1180, 240], [1260, 390], [980, 580], [1100, 130], [830, 480]].map(([cx, cy], i) => (
          <motion.circle key={i} cx={cx} cy={cy} r={i % 2 === 0 ? 2.5 : 1.8}
            fill={i % 3 === 0 ? 'rgba(196,81,122,0.5)' : 'rgba(180,150,100,0.45)'}
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: [0, 1, 0.5, 1], scale: 1 } : {}}
            transition={{ delay: 1.5 + i * 0.2, duration: 0.4 }}
          />
        ))}
      </svg>

      <div style={{ display: 'flex', width: '100%', alignItems: 'center', position: 'relative', zIndex: 1 }}>

        {/* ── LEFT TEXT ── */}
        <div style={{ flex: '0 0 40%', minWidth: 340, paddingLeft: 72, paddingRight: 40 }}>

          <motion.div
            variants={textEnter(0)}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24, fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#c4517a' }}
          >
            <span style={{ display: 'block', height: 1, width: 16, background: '#c4517a' }} />
            <span style={{ color: '#9b9b9b' }}>04</span>
            <span>Content Production</span>
          </motion.div>

          <div style={{ overflow: 'hidden', marginBottom: 16 }}>
            {['CONTENT', 'PRODUCTION'].map((line, i) => (
              <motion.div
                key={line}
                initial={{ y: '110%', opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                style={{ lineHeight: 0.92, fontFamily: 'Georgia, serif', fontWeight: 900, fontSize: 'clamp(40px,4.5vw,68px)', color: '#1a1a1a', letterSpacing: '-0.02em' }}
              >
                {line}
              </motion.div>
            ))}
          </div>

          <motion.p
            variants={textEnter(0.45)}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            style={{ fontSize: 20, fontFamily: 'Georgia, serif', fontStyle: 'italic', lineHeight: 1.45, color: '#1a1a1a', marginBottom: 16 }}
          >
            Stories crafted for{' '}
            <em style={{ color: '#c4517a', fontStyle: 'italic' }}>screens</em>,{' '}
            <em style={{ color: '#c4517a', fontStyle: 'italic' }}>platforms</em>{' '}
            and{' '}
            <em style={{ color: '#c4517a', fontStyle: 'italic' }}>culture</em>.
          </motion.p>

          <motion.p
            variants={textEnter(0.55)}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            style={{ fontSize: 14, fontWeight: 300, lineHeight: 1.7, color: '#6b6b6b', maxWidth: 340, marginBottom: 32 }}
          >
            We produce cinematic branded films, campaign assets, social reels and
            platform‑first content that inspire action and drive impact.
          </motion.p>

          <motion.div
            variants={textEnter(0.65)}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 32}}
          >
            
            <Link
              href="/services/content-production"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                background: 'transparent', color: '#1a1a1a',
                border: '1.5px solid #1a1a1a', borderRadius: 999,
                padding: '13px 26px', fontFamily: 'monospace', fontSize: 11,
                letterSpacing: '0.14em', textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              Explore Production
            </Link>
          </motion.div>

          <motion.div
            variants={textEnter(0.75)}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}
          >
            {['End-to-end production', 'Cinematic quality', 'Built for every platform'].map(tag => (
              <span key={tag} style={{
                fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase',
                fontFamily: 'monospace', color: '#9b9b9b',
                border: '1px solid rgba(10,10,10,0.12)', borderRadius: 999,
                padding: '5px 12px',
              }}>{tag}</span>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT FLOATING CARDS ── */}
        <div  style={{ flex: '0 0 60%', position: 'relative', height: '92vh', minHeight: 680, overflow: 'hidden' }}>
          <motion.div style={{ x: cardsX, y: cardsY, position: 'absolute', inset: 0 }}>
            {videos.map((v, i) => (
              <VideoCard key={i} v={v} i={i} />
            ))}
          </motion.div>
        </div>

        

      </div>
    </section>
  );
}
