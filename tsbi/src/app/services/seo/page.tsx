'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';

// TSBI brand blue (paired with --magenta).
const BLUE = '#1a6aff';

const timelineFeatures = [
  {
    num: '01',
    title: 'Technical SEO Audits',
    desc: 'A comprehensive crawl of your site architecture, Core Web Vitals, indexability and structured data to find every issue holding you back.',
  },
  {
    num: '02',
    title: 'Keyword Strategy',
    desc: 'Search intent mapping, competitive gap analysis and opportunity sizing to prioritise exactly where to invest for maximum organic return.',
  },
  {
    num: '03',
    title: 'Content Optimisation',
    desc: 'On-page rewrites, content briefs and new article strategies built around what searchers and algorithms actually reward.',
  },
  {
    num: '04',
    title: 'Link Building',
    desc: 'Editorial outreach, digital PR and authority-building campaigns that earn links from relevant, high-quality sources.',
  },
  {
    num: '05',
    title: 'Local SEO',
    desc: 'Google Business Profile optimisation, citation building and local content strategies to dominate near-me searches.',
  },
  {
    num: '06',
    title: 'SEO Reporting',
    desc: 'Monthly ranking trend analysis, traffic attribution and iterative recommendations delivered in plain language, not jargon.',
  },
];

// Floating client result cards shown on the right of the hero.
const heroCards = [
  { src: '/seo/2.png', label: 'Mahindra Manulife', x: '1%', y: '2%', rot: '-6deg', z: 6, delay: 0 },
  { src: '/seo/3.png', label: 'Pepe Jeans London', x: '46%', y: '12%', rot: '5deg', z: 5, delay: 0.6 },
  { src: '/seo/1.png', label: 'Sandu Pharma', x: '20%', y: '54%', rot: '-3deg', z: 7, delay: 1.2 },
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
        width: 'clamp(170px, 22vw, 280px)',
        background: '#fff',
        borderRadius: 14,
        overflow: 'hidden',
        boxShadow: hovered
          ? '0 22px 60px rgba(224,25,125,.45), 0 4px 24px rgba(26,106,255,.3)'
          : '0 14px 40px rgba(0,0,0,.45)',
        border: hovered
          ? '1.5px solid rgba(224,25,125,.7)'
          : '1.5px solid rgba(255,255,255,.12)',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={c.src}
        alt={`${c.label} SEO results`}
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
      <div
        style={{
          fontFamily: 'var(--fm)',
          fontSize: 9,
          letterSpacing: '.12em',
          textTransform: 'uppercase',
          color: 'var(--ink)',
          padding: '8px 12px',
          borderTop: '1px solid var(--border)',
        }}
      >
        {c.label}
      </div>
    </motion.div>
  );
}

type CaseStudy = {
  tag: string;
  client: string;
  image: string;
  title: string;
  clientDesc: string;
  objective: string;
  solution: { h: string; t: string }[];
  results: { v: string; l: string }[];
};

const caseStudies: CaseStudy[] = [
  {
    tag: 'Mutual Funds / BFSI',
    client: 'Mahindra Manulife',
    image: '/seo/2.png',
    title: 'Compounding organic growth for a mutual-fund leader',
    clientDesc:
      'Mahindra Manulife is an investment platform for mutual funds offering a wide range of investment solutions across India — a joint venture of Mahindra & Mahindra Financial Services Limited and Manulife Investment Management (Singapore) Pte. Ltd.',
    objective:
      'Enhance organic visibility, improve keyword ranking and achieve a higher click-through rate.',
    solution: [
      { h: 'Keyword Research', t: 'Comprehensive keyword analysis focused on long-tail keywords with lower competition but higher conversion potential.' },
      { h: 'Enhanced User Experience', t: 'Improved loading speed to reduce bounce, clearer calls to action and mobile-first optimisation for a growing mobile base.' },
      { h: 'In-Depth Content Analysis', t: 'Optimised in-depth, engaging content for relevant keywords to lift search visibility and engagement time.' },
    ],
    results: [
      { v: '+68.16%', l: 'Sessions' },
      { v: '+84.78%', l: 'Keyword Ranking' },
      { v: '+59.83%', l: 'Users' },
      { v: '+10.26%', l: 'Avg. Engagement' },
    ],
  },
  {
    tag: 'Fashion / Retail',
    client: 'Pepe Jeans London',
    image: '/seo/3.png',
    title: 'Clicks, impressions & position in just 4 months',
    clientDesc:
      'Pepe Jeans London (India) is an iconic brand synonymous with denim and limitless creativity. Born in 1973 on the streets of Portobello, worn around the world today.',
    objective: 'Increase clicks and impressions, and improve keyword position.',
    solution: [
      { h: 'Meta Optimisation', t: 'Optimised meta titles and descriptions with unique content built around focus keywords.' },
      { h: 'Always-Fresh Content', t: 'A unique content strategy that kept every page updated month on month.' },
      { h: 'Internal Linking', t: 'Hyperlinks to focus-product keywords strengthened internal linking and improved visibility for user queries.' },
    ],
    results: [
      { v: '+254%', l: 'Impressions' },
      { v: '+78%', l: 'Clicks' },
      { v: '+27%', l: 'Position' },
    ],
  },
  {
    tag: 'Ayurveda / Wellness',
    client: 'Sandu Pharma',
    image: '/seo/1.png',
    title: 'Fuelling traffic & ranking for 125+ years of Ayurveda',
    clientDesc:
      'Sandu Pharma has crafted Ayurveda products for wellness for over 125 years — a heritage brand earning its place in modern search.',
    objective: 'Overcome low online brand awareness for an established Ayurveda brand.',
    solution: [
      { h: 'Keyword-Rich Category Pages', t: 'Updated category pages with Ayurveda-specific keywords.' },
      { h: 'E-E-A-T Content Clusters', t: 'A content plan built over cluster topics, aligned with Google E-E-A-T and YMYL.' },
      { h: 'Seasonal & AI-Ready Content', t: 'Optimised footer and blog content for seasonal topics, current trends and AI answers.' },
      { h: 'Smart Interlinking', t: 'Interlinked category and product pages, and vice versa.' },
    ],
    results: [
      { v: '+91.6%', l: 'Clicks · 17K → 33K' },
      { v: '+91.4%', l: 'Impressions · 721K → 1.38M' },
      { v: '+55.8%', l: 'Top-10 Keywords · 616 → 960' },
      { v: '+63.1%', l: 'Non-Branded Top 10 · 545 → 889' },
    ],
  },
];

const mahindraTable = {
  cols: ['Metric', 'Apr-24', 'May-24', 'Jun-24', 'Jul-24', 'Apr → Jul %'],
  rows: [
    ['Users', '18,974', '21,879', '29,929', '30,326', '+59.83%'],
    ['Sessions', '50,590', '58,026', '76,843', '85,074', '+68.16%'],
    ['Avg. Eng. Time / session', '01:57', '01:57', '02:09', '02:09', '+10.26%'],
    ['Bounce Rate', '19.17%', '20.07%', '18.56%', '21.26%', '10.90%'],
    ['Clicks', '27,775', '32,483', '46,930', '46,437', '+67.19%'],
    ['Impressions', '2,73,887', '3,17,660', '3,98,436', '4,04,516', '+47.69%'],
    ['CTR', '10.10%', '10.20%', '11.80%', '11.50%', '+13.86%'],
    ['Keyword Ranking (/100)', '46', '63', '74', '85', '+84.78%'],
  ],
};

function ResultChip({ v, l, accent }: { v: string; l: string; accent: string }) {
  return (
    <div
      style={{
        border: `1px solid var(--border)`,
        borderRadius: 12,
        padding: '18px 18px',
        background: 'var(--white)',
        flex: '1 1 140px',
        minWidth: 140,
      }}
    >
      <div
        style={{
          fontFamily: 'var(--fd)',
          fontSize: 'clamp(28px,3vw,40px)',
          fontWeight: 900,
          color: accent,
          lineHeight: 1,
          letterSpacing: '-0.02em',
        }}
      >
        {v}
      </div>
      <div
        style={{
          fontFamily: 'var(--fm)',
          fontSize: 10,
          letterSpacing: '.08em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
          marginTop: 8,
          lineHeight: 1.4,
        }}
      >
        {l}
      </div>
    </div>
  );
}

function CaseStudyBlock({ cs, i }: { cs: CaseStudy; i: number }) {
  const reversed = i % 2 === 1;
  const accent = i % 2 === 0 ? 'var(--magenta)' : BLUE;
  return (
    <div style={{ marginBottom: 96 }}>
      <div
        style={{
          display: 'flex',
          gap: 48,
          alignItems: 'center',
          flexDirection: reversed ? 'row-reverse' : 'row',
          flexWrap: 'wrap',
        }}
      >
        {/* Image */}
        <div style={{ flex: '1 1 360px', minWidth: 300 }}>
          <div
            style={{
              borderRadius: 16,
              overflow: 'hidden',
              border: `1px solid ${accent === BLUE ? 'rgba(26,106,255,.35)' : 'rgba(224,25,125,.35)'}`,
              boxShadow: '0 16px 44px rgba(0,0,0,.1)',
              background: 'var(--white)',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={cs.image}
              alt={`${cs.client} SEO results`}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        </div>

        {/* Copy */}
        <div style={{ flex: '1 1 360px', minWidth: 300 }}>
          <div
            style={{
              fontFamily: 'var(--fm)',
              fontSize: 10,
              letterSpacing: '.16em',
              textTransform: 'uppercase',
              color: accent,
              marginBottom: 14,
            }}
          >
            {cs.tag}
          </div>
          <h3
            style={{
              fontFamily: 'var(--fd)',
              fontSize: 'clamp(26px,3vw,40px)',
              fontWeight: 900,
              color: 'var(--ink)',
              lineHeight: 1.12,
              letterSpacing: '-0.02em',
              marginBottom: 16,
            }}
          >
            {cs.title}
          </h3>
          <p style={{ fontSize: 15, color: 'var(--muted)', fontWeight: 300, lineHeight: 1.75, marginBottom: 16 }}>
            {cs.clientDesc}
          </p>
          <p style={{ fontSize: 15, color: 'var(--ink)', fontWeight: 400, lineHeight: 1.7, marginBottom: 24 }}>
            <span style={{ fontWeight: 700 }}>Objective — </span>
            {cs.objective}
          </p>

          {/* Solution */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
            {cs.solution.map((s) => (
              <div key={s.h} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: accent,
                    flexShrink: 0,
                    marginTop: 8,
                  }}
                />
                <p style={{ fontSize: 14, color: 'var(--muted)', fontWeight: 300, lineHeight: 1.6 }}>
                  <span style={{ color: 'var(--ink)', fontWeight: 700 }}>{s.h}: </span>
                  {s.t}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Result chips — full width under the block */}
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 32 }}>
        {cs.results.map((r) => (
          <ResultChip key={r.l} v={r.v} l={r.l} accent={accent} />
        ))}
      </div>
    </div>
  );
}

export default function SeoPage() {
  return (
    <>
      {/* ── HERO: TSBI brand-color cinematic with floating result cards ── */}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 40, width: '100%', flexWrap: 'wrap' }}>
          {/* ── LEFT: copy ── */}
          <div style={{ flex: '1 1 440px', minWidth: 300 }}>
            <div className="sec-label" style={{ color: 'var(--magenta)', marginBottom: 36 }}>
              03 — SEO
            </div>

            <div style={{ marginBottom: 36 }}>
              {['Rank.', 'Grow.'].map((word) => (
                <div
                  key={word}
                  style={{
                    fontFamily: 'var(--fd)',
                    fontSize: 'clamp(64px,10vw,140px)',
                    fontWeight: 900,
                    lineHeight: 0.88,
                    letterSpacing: '-0.04em',
                    color: 'transparent',
                    WebkitTextStroke: '2px rgba(255,255,255,.92)',
                    display: 'block',
                  }}
                >
                  {word}
                </div>
              ))}
              <div
                style={{
                  fontFamily: 'var(--fd)',
                  fontSize: 'clamp(64px,10vw,140px)',
                  fontWeight: 900,
                  lineHeight: 0.88,
                  letterSpacing: '-0.04em',
                  color: 'var(--magenta)',
                  display: 'block',
                }}
              >
                Win.
              </div>
            </div>

            <p
              style={{
                fontSize: 16,
                color: 'rgba(255,255,255,.6)',
                fontWeight: 300,
                lineHeight: 1.75,
                maxWidth: 480,
              }}
            >
              Full-funnel SEO that drives sustainable organic growth — from technical audits to
              content strategies that search engines and audiences love.
            </p>
          </div>

          {/* ── RIGHT: floating result collage ── */}
          <div
            style={{
              flex: '1 1 440px',
              minWidth: 320,
              position: 'relative',
              height: 'clamp(440px, 72vh, 640px)',
            }}
          >
            {heroCards.map((c) => (
              <HeroCard key={c.src} c={c} />
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE FEATURES ── */}
      <section style={{ background: 'var(--white)', padding: '80px 48px' }}>
        <div className="sec-label" style={{ marginBottom: 48 }}>
          What We Do
        </div>

        <div style={{ maxWidth: 800 }}>
          {timelineFeatures.map((feat) => (
            <div
              key={feat.num}
              style={{
                display: 'flex',
                gap: 40,
                padding: '28px 0',
                borderBottom: '1px solid var(--border)',
                alignItems: 'flex-start',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--fd)',
                  fontSize: 56,
                  fontWeight: 900,
                  color: 'var(--faint)',
                  lineHeight: 1,
                  minWidth: 80,
                  flexShrink: 0,
                }}
              >
                {feat.num}
              </span>
              <div>
                <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>
                  {feat.title}
                </div>
                <p style={{ fontSize: 15, color: 'var(--muted)', fontWeight: 300, lineHeight: 1.7 }}>
                  {feat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CASE STUDIES ── */}
      <section style={{ background: 'var(--off)', padding: '90px 48px' }}>
        <div className="sec-label" style={{ color: 'var(--magenta)', marginBottom: 14 }}>
          Let&apos;s Get Known
        </div>
        <h2
          style={{
            fontFamily: 'var(--fd)',
            fontSize: 'clamp(30px,4vw,56px)',
            fontWeight: 900,
            color: 'var(--ink)',
            letterSpacing: '-0.02em',
            lineHeight: 1.08,
            maxWidth: 820,
            marginBottom: 20,
          }}
        >
          Proven results, not promises.
        </h2>
        <p
          style={{
            fontFamily: 'var(--fd)',
            fontStyle: 'italic',
            fontSize: 'clamp(17px,1.8vw,22px)',
            color: 'var(--muted)',
            lineHeight: 1.5,
            maxWidth: 720,
            marginBottom: 64,
          }}
        >
          &ldquo;Build it, and they will come,&rdquo; as they say. But we believe in building it,
          nurturing it, engaging them — and they may come <em style={{ color: 'var(--magenta)' }}>&amp; stay</em>.
        </p>

        {caseStudies.map((cs, i) => (
          <CaseStudyBlock key={cs.client} cs={cs} i={i} />
        ))}

        {/* ── MAHINDRA MANULIFE DATA TABLE ── */}
        <div style={{ marginTop: 8 }}>
          <div className="sec-label" style={{ color: BLUE, marginBottom: 16 }}>
            Mahindra Manulife — Apr to Jul 2024
          </div>
          <div style={{ overflowX: 'auto', border: '1px solid var(--border)', borderRadius: 14, background: 'var(--white)' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                minWidth: 680,
                fontFamily: 'var(--fb)',
              }}
            >
              <thead>
                <tr>
                  {mahindraTable.cols.map((col, ci) => (
                    <th
                      key={col}
                      style={{
                        textAlign: ci === 0 ? 'left' : 'center',
                        padding: '16px 18px',
                        fontFamily: 'var(--fm)',
                        fontSize: 11,
                        letterSpacing: '.1em',
                        textTransform: 'uppercase',
                        color: ci === mahindraTable.cols.length - 1 ? 'var(--magenta)' : 'var(--ink)',
                        borderBottom: '2px solid var(--border)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mahindraTable.rows.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, ci) => (
                      <td
                        key={ci}
                        style={{
                          textAlign: ci === 0 ? 'left' : 'center',
                          padding: '14px 18px',
                          fontSize: 14,
                          fontWeight: ci === 0 ? 700 : ci === row.length - 1 ? 700 : 400,
                          color:
                            ci === row.length - 1
                              ? 'var(--magenta)'
                              : ci === 0
                              ? 'var(--ink)'
                              : 'var(--muted)',
                          borderBottom: '1px solid var(--border)',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── STAT SPLIT ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        {/* Left: dark navy stat */}
        <div style={{ background: 'var(--navy)', padding: '80px 48px' }}>
          <div className="sec-label" style={{ color: 'rgba(255,255,255,.3)', marginBottom: 32 }}>
            Our Numbers
          </div>
          <div
            style={{
              fontFamily: 'var(--fd)',
              fontSize: 'clamp(72px,10vw,120px)',
              fontWeight: 900,
              color: '#fff',
              lineHeight: 1,
              marginBottom: 8,
            }}
          >
            3x
          </div>
          <div
            style={{
              fontFamily: 'var(--fm)',
              fontSize: 10,
              letterSpacing: '.18em',
              textTransform: 'uppercase',
              color: 'var(--magenta)',
              marginBottom: 20,
            }}
          >
            Average Organic Growth
          </div>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,.5)', fontWeight: 300, lineHeight: 1.75, maxWidth: 320 }}>
            Our clients consistently see triple the organic traffic within 12 months of engaging our
            full SEO programme.
          </p>
        </div>

        {/* Right: off-white copy */}
        <div style={{ background: 'var(--off)', padding: '80px 48px' }}>
          <div className="sec-label" style={{ marginBottom: 32 }}>
            Our Approach
          </div>
          <h3
            style={{
              fontFamily: 'var(--fd)',
              fontSize: 'clamp(28px,3vw,40px)',
              fontWeight: 700,
              color: 'var(--ink)',
              lineHeight: 1.15,
              marginBottom: 20,
            }}
          >
            Strategy First.
            <br />
            Rankings Follow.
          </h3>
          <p style={{ fontSize: 15, color: 'var(--muted)', fontWeight: 300, lineHeight: 1.75, marginBottom: 32 }}>
            We don&apos;t chase algorithms — we build content and architecture that serves users.
            The result is rankings that compound, not collapse.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {['Content-Led SEO', 'Technical Excellence', 'Monthly Reporting'].map((item) => (
              <div
                key={item}
                style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}
              >
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--magenta)', flexShrink: 0 }} />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA: navy ── */}
      <section style={{ background: 'var(--navy)', padding: '80px 48px' }}>
        <h2
          style={{
            fontFamily: 'var(--fd)',
            fontSize: 'clamp(36px,5vw,64px)',
            fontWeight: 900,
            color: '#fff',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            marginBottom: 40,
            whiteSpace: 'pre-line',
          }}
        >
          {"Let's grow your\norganic reach."}
        </h2>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/contact" className="btn-fill" style={{ background: 'var(--magenta)' }}>
            Start a Project →
          </Link>
          <Link
            href="/services"
            className="btn-border"
            style={{ color: 'rgba(255,255,255,.6)', borderColor: 'rgba(255,255,255,.2)' }}
          >
            All Services
          </Link>
        </div>
      </section>
    </>
  );
}
