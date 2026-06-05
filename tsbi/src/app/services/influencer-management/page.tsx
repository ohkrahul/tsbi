'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';

const cards = [
  {
    num: '01',
    title: 'Influencer Strategy & Casting',
    desc: 'Campaign objectives, audience fit and talent selection from our curated network.',
  },
  {
    num: '02',
    title: 'Campaign Management',
    desc: 'End-to-end coordination — timelines, deliverables, revisions and approvals handled for you.',
  },
  {
    num: '03',
    title: 'Content Briefing & Approval',
    desc: 'Detailed creative briefs with brand compliance checks at every stage of production.',
  },
  {
    num: '04',
    title: 'Micro & Nano Networks',
    desc: 'Hyper-engaged niche communities that drive authentic conversation and high conversion.',
  },
  {
    num: '05',
    title: 'Celebrity & Mega Talent',
    desc: 'Direct access to India\'s most prominent voices across entertainment, sport and fashion.',
  },
  {
    num: '06',
    title: 'Performance Measurement',
    desc: 'Real-time tracking and post-campaign reporting with full performance transparency.',
  },
];

// TSBI brand blue (paired with --magenta).
const BLUE = '#1a6aff';

const spotlight = ['/influncer/1.png', '/influncer/2.png', '/influncer/3.png'];

// Instagram reels & posts the team has delivered.
const reels: { type: 'reel' | 'p'; code: string }[] = [
  { type: 'reel', code: 'DLIJ0Ufy0j5' },
  { type: 'reel', code: 'DLmLLoKyd-i' },
  { type: 'reel', code: 'DLzCNCDy9_K' },
  { type: 'reel', code: 'DMu1BIrT57o' },
  { type: 'reel', code: 'DNkRlYjTyMp' },
  { type: 'reel', code: 'DOdk5ywEm9r' },
  { type: 'reel', code: 'DPgTkkZiMFe' },
  { type: 'reel', code: 'DPqtG4dksvk' },
  { type: 'reel', code: 'DP23UgXiKoU' },
  { type: 'reel', code: 'DQ3zO8xDODq' },
  { type: 'reel', code: 'DRCJoCzilk-' },
  { type: 'reel', code: 'DQ9Dof4jOB6' },
  { type: 'reel', code: 'DRJfwVpk1Hb' },
  { type: 'p', code: 'DPlofZOjcEa' },
  { type: 'p', code: 'DPBasHljcow' },
  { type: 'reel', code: 'DPJDd9pjRU_' },
  { type: 'reel', code: 'DOs1uFhjaZb' },
  { type: 'reel', code: 'DRuNUD0k1zg' },
  { type: 'reel', code: 'DR4uxfoEwyU' },
  { type: 'reel', code: 'DR4vuWNDXul' },
  { type: 'reel', code: 'DR6nzDoCCNA' },
  { type: 'p', code: 'DQUCl81k87E' },
  { type: 'p', code: 'DP0dTT8EcU7' },
  { type: 'p', code: 'DPyp9-jk5p5' },
  { type: 'p', code: 'DP_z6w3j3yF' },
];

// Floating spotlight images shown on the right of the hero.
const heroCards = [
  { src: '/influncer/1.png', x: '2%', y: '4%', rot: '-7deg', z: 6, delay: 0 },
  { src: '/influncer/2.png', x: '44%', y: '0%', rot: '6deg', z: 5, delay: 0.6 },
  { src: '/influncer/3.png', x: '22%', y: '46%', rot: '-3deg', z: 7, delay: 1.2 },
];

function HeroCard({ c }: { c: (typeof heroCards)[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
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
        boxShadow: hovered
          ? '0 22px 60px rgba(224,25,125,.45), 0 4px 24px rgba(26,106,255,.3)'
          : '0 12px 38px rgba(0,0,0,.5)',
        border: hovered
          ? '1.5px solid rgba(224,25,125,.7)'
          : '1.5px solid rgba(255,255,255,.1)',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={c.src}
        alt="Influencer campaign"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          transform: hovered ? 'scale(1.06)' : 'scale(1)',
          transition: 'transform .5s ease',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(5,11,26,.55) 0%, transparent 45%)',
        }}
      />
    </motion.div>
  );
}

export default function InfluencerManagementPage() {
  return (
    <>
      {/* ── HERO: Galaxy dark navy ── */}
      <section
        style={{
          background:
            'radial-gradient(ellipse at 16% 38%, rgba(224,25,125,.22) 0%, transparent 55%),' +
            'radial-gradient(ellipse at 86% 72%, rgba(26,106,255,.24) 0%, transparent 55%),' +
            'linear-gradient(135deg,#050b1a,#0d1528)',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          padding: '140px 48px 80px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 40,
            width: '100%',
            flexWrap: 'wrap',
          }}
        >
          {/* ── LEFT: copy ── */}
          <div style={{ flex: '1 1 440px', minWidth: 300 }}>
            <div
              className="sec-label"
              style={{ color: 'var(--magenta)', marginBottom: 40 }}
            >
              05 — Influence
            </div>

            <h1
              style={{
                fontFamily: 'var(--fd)',
                fontSize: 'clamp(56px,8vw,120px)',
                fontWeight: 900,
                lineHeight: 0.95,
                letterSpacing: '-0.04em',
                color: '#fff',
                marginBottom: 40,
              }}
            >
              Every Brand
              <br />a{' '}
              <em
                style={{
                  color: 'var(--magenta)',
                  fontStyle: 'italic',
                }}
              >
                Star.
              </em>
            </h1>

            <p
              style={{
                fontSize: 16,
                color: 'rgba(255,255,255,.6)',
                fontWeight: 300,
                lineHeight: 1.75,
                maxWidth: 480,
              }}
            >
              Full-service influencer marketing and talent management from micro-communities to
              mega-reach — every tier, every category, end-to-end.
            </p>
          </div>

          {/* ── RIGHT: floating spotlight collage ── */}
          <div
            style={{
              flex: '1 1 440px',
              minWidth: 320,
              position: 'relative',
              height: 'clamp(420px, 70vh, 620px)',
            }}
          >
            {heroCards.map((c) => (
              <HeroCard key={c.src} c={c} />
            ))}
          </div>
        </div>
      </section>

      {/* ── TALENT STAT BAND ── */}
      <div
        style={{
          background: 'rgba(255,255,255,.04)',
          borderTop: '1px solid rgba(255,255,255,.06)',
          borderBottom: '1px solid rgba(255,255,255,.06)',
          padding: '40px 48px',
          display: 'flex',
          gap: 0,
          backgroundColor: '#070e1e',
        }}
      >
        {[
          { val: '150+', label: 'Active Talents' },
          { val: 'All Categories', label: 'Covered' },
          { val: 'End-to-End', label: 'Managed' },
        ].map((stat, i) => (
          <div
            key={stat.label}
            style={{
              flex: 1,
              textAlign: 'center',
              borderRight: i < 2 ? '1px solid rgba(255,255,255,.08)' : 'none',
              padding: '0 20px',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--fd)',
                fontSize: 'clamp(32px,4vw,56px)',
                fontWeight: 900,
                color: '#fff',
                lineHeight: 1,
                marginBottom: 8,
              }}
            >
              {stat.val}
            </div>
            <div
              style={{
                fontFamily: 'var(--fm)',
                fontSize: 9,
                letterSpacing: '.18em',
                textTransform: 'uppercase',
                color: 'var(--magenta)',
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── FEATURE CARDS ── */}
      <section style={{ background: 'var(--navy)', padding: '80px 48px' }}>
        <div
          className="sec-label"
          style={{ color: 'var(--magenta)', marginBottom: 40 }}
        >
          What We Manage
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 24,
          }}
        >
          {cards.map((card) => (
            <div
              key={card.num}
              style={{
                background: 'rgba(255,255,255,.04)',
                border: '1px solid rgba(255,255,255,.06)',
                borderRadius: 8,
                padding: '28px 24px',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--fm)',
                  fontSize: 11,
                  color: 'var(--magenta)',
                  letterSpacing: '.1em',
                  marginBottom: 14,
                }}
              >
                {card.num}
              </div>
              <div
                style={{
                  fontFamily: 'var(--fd)',
                  fontSize: 20,
                  fontWeight: 700,
                  color: '#fff',
                  lineHeight: 1.2,
                  marginBottom: 10,
                }}
              >
                {card.title}
              </div>
              <p
                style={{
                  fontSize: 14,
                  color: 'rgba(255,255,255,.55)',
                  fontWeight: 300,
                  lineHeight: 1.65,
                }}
              >
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SPOTLIGHT IMAGES ── */}
      <section
        style={{
          background:
            'radial-gradient(ellipse at 85% 10%, rgba(26,106,255,.14) 0%, transparent 55%), #050b1a',
          padding: '80px 48px',
        }}
      >
        <div className="sec-label" style={{ color: BLUE, marginBottom: 12 }}>
          In the Spotlight
        </div>
        <h2
          style={{
            fontFamily: 'var(--fd)',
            fontSize: 'clamp(28px,4vw,52px)',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            color: '#fff',
            lineHeight: 1.05,
            marginBottom: 44,
            maxWidth: 760,
          }}
        >
          Talent and brands,{' '}
          <em style={{ color: 'var(--magenta)', fontStyle: 'italic' }}>made unforgettable.</em>
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
            alignItems: 'start',
          }}
        >
          {spotlight.map((src, i) => (
            <div
              key={src}
              style={{
                borderRadius: 14,
                overflow: 'hidden',
                border: `1px solid ${i % 2 === 0 ? 'rgba(224,25,125,.35)' : 'rgba(26,106,255,.35)'}`,
                boxShadow: '0 14px 40px rgba(0,0,0,.4)',
                background: '#0d1528',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`Influencer campaign spotlight ${i + 1}`}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── REELS GRID ── */}
      <section
        style={{
          background:
            'radial-gradient(ellipse at 12% 18%, rgba(224,25,125,.12) 0%, transparent 50%), #070e1e',
          padding: '80px 48px',
          borderTop: '1px solid rgba(255,255,255,.06)',
        }}
      >
        <div className="sec-label" style={{ color: 'var(--magenta)', marginBottom: 12 }}>
          Reels in the Wild
        </div>
        <h2
          style={{
            fontFamily: 'var(--fd)',
            fontSize: 'clamp(28px,4vw,52px)',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            color: '#fff',
            lineHeight: 1.05,
            marginBottom: 12,
            maxWidth: 760,
          }}
        >
          Content that earned its{' '}
          <em style={{ color: BLUE, fontStyle: 'italic' }}>reach.</em>
        </h2>
        <p
          style={{
            fontSize: 15,
            color: 'rgba(255,255,255,.55)',
            fontWeight: 300,
            lineHeight: 1.7,
            maxWidth: 480,
            marginBottom: 44,
          }}
        >
          A selection of {reels.length} influencer-led reels and posts produced and managed by the TSBI team.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 24,
          }}
        >
          {reels.map((r) => (
            <div
              key={r.code}
              style={{
                borderRadius: 14,
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,.08)',
                background: '#fff',
                boxShadow: '0 10px 34px rgba(0,0,0,.35)',
              }}
            >
              <iframe
                src={`https://www.instagram.com/${r.type}/${r.code}/embed`}
                title={`Instagram ${r.type} ${r.code}`}
                loading="lazy"
                scrolling="no"
                allowTransparency
                allow="encrypted-media"
                style={{
                  width: '100%',
                  height: 620,
                  border: 'none',
                  display: 'block',
                }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── QUOTE SECTION ── */}
      <section
        style={{
          background: '#050b1a',
          padding: '80px 48px',
        }}
      >
        <blockquote
          style={{
            fontFamily: 'var(--fd)',
            fontSize: 'clamp(24px,4vw,48px)',
            fontStyle: 'italic',
            fontWeight: 400,
            color: '#fff',
            lineHeight: 1.3,
            maxWidth: 800,
            marginBottom: 24,
          }}
        >
          &ldquo;We don&apos;t just connect brands to influencers. We build movements.&rdquo;
        </blockquote>
        <p
          style={{
            fontFamily: 'var(--fm)',
            fontSize: 10,
            letterSpacing: '.14em',
            textTransform: 'uppercase',
            color: 'var(--magenta)',
          }}
        >
          — TSBI Influencer Team
        </p>
      </section>

      {/* ── CTA: magenta ── */}
      <section
        style={{
          background: 'var(--magenta)',
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
          {'Build your\ninfluencer strategy.'}
        </h2>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link
            href="/contact"
            className="btn-fill"
            style={{ background: '#fff', color: 'var(--magenta)' }}
          >
            Start a Campaign →
          </Link>
          <Link
            href="/services"
            className="btn-border"
            style={{ color: 'rgba(255,255,255,.7)', borderColor: 'rgba(255,255,255,.3)' }}
          >
            All Services
          </Link>
        </div>
      </section>
    </>
  );
}
