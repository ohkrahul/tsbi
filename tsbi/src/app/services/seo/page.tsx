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

function HeroCard() {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, position: 'relative', height: '100%' }}>
      {/* Mahindra Manulife */}
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0 }}
        whileHover={{ scale: 1.02 }}
        style={{
          background: 'linear-gradient(135deg, rgba(224,25,125,.08) 0%, rgba(26,106,255,.08) 100%)',
          borderRadius: 20,
          padding: 28,
          border: '1.5px solid',
          borderImage: 'linear-gradient(135deg, rgba(224,25,125,.6) 0%, rgba(26,106,255,.4) 100%) 1',
          boxShadow: hovered
            ? '0 0 40px rgba(224,25,125,.3), 0 0 60px rgba(26,106,255,.2), inset 0 0 40px rgba(224,25,125,.1)'
            : '0 0 20px rgba(224,25,125,.15), inset 0 0 20px rgba(224,25,125,.05)',
          transition: 'all .3s ease',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div
            style={{
              fontFamily: 'var(--fm)',
              fontSize: 9,
              letterSpacing: '.15em',
              textTransform: 'uppercase',
              color: 'var(--magenta)',
              fontWeight: 700,
            }}
          >
            Case Study
          </div>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--magenta)' }}>mahindra<br />MANULIFE</div>
        </div>

        <div>
          <h4 style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 6 }}>
            Mahindra Manulife
          </h4>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,.6)', margin: 0 }}>
            Insurance
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, fontSize: 11 }}>
          <div>
            <div style={{ color: 'rgba(255,255,255,.5)', fontSize: 9, marginBottom: 4 }}>Organic Sessions</div>
            <div style={{ color: '#fff', fontWeight: 700 }}>50.6K</div>
            <div style={{ color: 'var(--magenta)', fontSize: 10, marginTop: 2 }}>+68.16%</div>
          </div>
          <div>
            <div style={{ color: 'rgba(255,255,255,.5)', fontSize: 9, marginBottom: 4 }}>Keywords (Top 3)</div>
            <div style={{ color: '#fff', fontWeight: 700 }}>85</div>
            <div style={{ color: 'var(--magenta)', fontSize: 10, marginTop: 2 }}>+84.78%</div>
          </div>
          <div>
            <div style={{ color: 'rgba(255,255,255,.5)', fontSize: 9, marginBottom: 4 }}>Keywords (Top 10)</div>
            <div style={{ color: '#fff', fontWeight: 700 }}>189</div>
            <div style={{ color: 'var(--magenta)', fontSize: 10, marginTop: 2 }}>+110%</div>
          </div>
          <div>
            <div style={{ color: 'rgba(255,255,255,.5)', fontSize: 9, marginBottom: 4 }}>Domain Rating</div>
            <div style={{ color: '#fff', fontWeight: 700 }}>72</div>
            <div style={{ color: 'var(--magenta)', fontSize: 10, marginTop: 2 }}>+33%</div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,.1)', paddingTop: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#fff', marginBottom: 8 }}>The Result</div>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,.7)', lineHeight: 1.5, margin: 0 }}>
            Doubled organic traffic in 12 months with significant growth across key revenue pages.
          </p>
        </div>
      </motion.div>

      {/* Sandu Pharma */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        whileHover={{ scale: 1.02 }}
        style={{
          background: 'linear-gradient(135deg, rgba(34,197,94,.08) 0%, rgba(34,197,94,.04) 100%)',
          borderRadius: 20,
          padding: 28,
          border: '1.5px solid',
          borderImage: 'linear-gradient(135deg, rgba(34,197,94,.5) 0%, rgba(26,106,255,.3) 100%) 1',
          boxShadow: '0 0 20px rgba(34,197,94,.15), inset 0 0 20px rgba(34,197,94,.05)',
          transition: 'all .3s ease',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div
            style={{
              fontFamily: 'var(--fm)',
              fontSize: 9,
              letterSpacing: '.15em',
              textTransform: 'uppercase',
              color: '#22c55e',
              fontWeight: 700,
            }}
          >
            Case Study
          </div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>Sandu<br />PHARMA</div>
        </div>

        <div>
          <h4 style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 6 }}>
            Sandu Pharmaceuticals
          </h4>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,.6)', margin: 0 }}>
            Ayurveda / Wellness
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, fontSize: 11 }}>
          <div>
            <div style={{ color: 'rgba(255,255,255,.5)', fontSize: 9, marginBottom: 4 }}>Organic Traffic</div>
            <div style={{ color: '#fff', fontWeight: 700 }}>189K</div>
            <div style={{ color: '#22c55e', fontSize: 10, marginTop: 2 }}>+119%</div>
          </div>
          <div>
            <div style={{ color: 'rgba(255,255,255,.5)', fontSize: 9, marginBottom: 4 }}>Content Generated</div>
            <div style={{ color: '#fff', fontWeight: 700 }}>7.1K</div>
            <div style={{ color: '#22c55e', fontSize: 10, marginTop: 2 }}>+143%</div>
          </div>
          <div>
            <div style={{ color: 'rgba(255,255,255,.5)', fontSize: 9, marginBottom: 4 }}>Top 10 Keywords</div>
            <div style={{ color: '#fff', fontWeight: 700 }}>66%</div>
            <div style={{ color: '#22c55e', fontSize: 10, marginTop: 2 }}>+122%</div>
          </div>
          <div>
            <div style={{ color: 'rgba(255,255,255,.5)', fontSize: 9, marginBottom: 4 }}>Domain Rating</div>
            <div style={{ color: '#fff', fontWeight: 700 }}>59%</div>
            <div style={{ color: '#22c55e', fontSize: 10, marginTop: 2 }}>+107%</div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,.1)', paddingTop: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#fff', marginBottom: 8 }}>The Result</div>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,.7)', lineHeight: 1.5, margin: 0 }}>
            71% increase in impressions and 66% increase in organic clicks in 6 months.
          </p>
        </div>
      </motion.div>
    </div>
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

const seoClients = [
  { name: 'Mahindra Manulife', industry: 'BFSI' },
  { name: 'Pepe Jeans London', industry: 'E-commerce' },
  { name: 'Sandu Pharma', industry: 'Wellness' },
  { name: 'Purplle', industry: 'E-commerce' },
  { name: 'derma+', industry: 'Healthcare' },
  { name: 'mama earth', industry: 'FMCG' },
  { name: 'boAt', industry: 'E-commerce' },
  { name: 'SUGAR Cosmetics', industry: 'FMCG' },
  { name: 'pepe jeans', industry: 'E-commerce' },
];

const industries = ['All', 'Healthcare', 'FMCG', 'E-commerce', 'Wellness', 'BFSI'];

function BrandsSection() {
  const [activeFilter, setActiveFilter] = useState('All');
  const filtered = activeFilter === 'All' ? seoClients : seoClients.filter((c) => c.industry === activeFilter);

  return (
    <div>
      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 48, flexWrap: 'wrap' }}>
        {industries.map((ind) => (
          <button
            key={ind}
            onClick={() => setActiveFilter(ind)}
            style={{
              padding: '10px 20px',
              borderRadius: 20,
              border: activeFilter === ind ? 'none' : '1px solid var(--border)',
              background: activeFilter === ind ? 'var(--navy)' : 'var(--white)',
              color: activeFilter === ind ? '#fff' : 'var(--ink)',
              fontFamily: 'var(--fm)',
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '.08em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all .2s ease',
            }}
          >
            {ind}
          </button>
        ))}
      </div>

      {/* Brand grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16 }}>
        {filtered.map((client) => (
          <div
            key={client.name}
            style={{
              background: 'var(--white)',
              border: '1px solid var(--border)',
              borderRadius: 12,
              padding: '24px 16px',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 100,
            }}
          >
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', lineHeight: 1.4 }}>
              {client.name}
            </div>
          </div>
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
            {/* <div className="sec-label" style={{ color: 'var(--magenta)', marginBottom: 36 }}>
              03 — SEO
            </div> */}

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
                marginBottom: 32,
              }}
            >
              Full-funnel SEO that drives sustainable organic growth — from technical audits to
              content strategies that search engines and audiences love.
            </p>

            {/* Stats row */}
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              {[
                { icon: 'user', label: '100+ brands', desc: 'Trusted partners' },
                { icon: 'users', label: '10+ industries', desc: 'Across sectors' },
                { icon: 'bolt', label: '9 yrs in SEO', desc: 'Since 2015' },
              ].map((stat) => (
                <div key={stat.label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: 'rgba(224,25,125,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    {stat.icon === 'user' && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--magenta)">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/>
                      </svg>
                    )}
                    {stat.icon === 'users' && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--magenta)">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M16 3a2 2 0 0 1 2 2v1h2a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1v1a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-1H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2V5a2 2 0 0 1 2-2h4z"/>
                      </svg>
                    )}
                    {stat.icon === 'bolt' && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--magenta)">
                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                      </svg>
                    )}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--magenta)' }}>
                      {stat.label}
                    </div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,.5)', marginTop: 2 }}>
                      {stat.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: case study cards ── */}
          <div
            style={{
              flex: '1 1 440px',
              minWidth: 320,
              height: 'clamp(500px, 80vh, 720px)',
            }}
          >
            <HeroCard />
          </div>
        </div>
      </section>

      {/* ── TIMELINE FEATURES ── */}
      {/* <section style={{ background: 'var(--white)', padding: '80px 48px' }}>
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
      </section> */}

      {/* ── SEO SERVICES WE DELIVERED ── */}
      <section style={{ background: 'var(--white)', padding: '100px 48px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="sec-label" style={{ color: 'var(--magenta)', marginBottom: 14, justifyContent: 'center' }}>
              Services
            </div>
            <h2
              style={{
                fontFamily: 'var(--fd)',
                fontSize: 'clamp(30px,4vw,56px)',
                fontWeight: 900,
                color: 'var(--ink)',
                letterSpacing: '-0.02em',
                lineHeight: 1.08,
                marginBottom: 16,
              }}
            >
              SEO Services We Delivered
            </h2>
            <p
              style={{
                fontFamily: 'var(--fd)',
                fontStyle: 'italic',
                fontSize: 'clamp(16px,1.5vw,20px)',
                color: 'var(--muted)',
                lineHeight: 1.6,
                maxWidth: 600,
                margin: '0 auto',
              }}
            >
              From foundational technical work to next-gen AI search optimization.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, maxWidth: 1200, margin: '0 auto' }}>
            {[
              'Technical SEO',
              'On-Page SEO',
              'Local SEO',
              'E-commerce SEO',
              'Healthcare SEO',
              'Content SEO',
              'Blog Optimization',
              'Keyword Ranking Tracking',
              'GSC & GA4 Analysis',
              'AI SEO / AEO / GEO Optimization',
            ].map((service) => (
              <div
                key={service}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '14px 18px',
                  background: 'var(--white)',
                  border: '1px solid var(--border)',
                  borderRadius: 12,
                  transition: 'all .2s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--magenta)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(224,25,125,.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--magenta)" style={{ flexShrink: 0 }}>
                  <path d="M12 1C6.48 1 2 5.48 2 11s4.48 10 10 10 10-4.48 10-10S17.52 1 12 1zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 7 15.5 7 14 7.67 14 8.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 7 8.5 7 7 7.67 7 8.5 7.67 10 8.5 10zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
                </svg>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.3 }}>
                  {service}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8-STEP SEO PLAYBOOK ── */}
      <section style={{ background: 'var(--off)', padding: '100px 48px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="sec-label" style={{ color: 'var(--magenta)', marginBottom: 14, justifyContent: 'center' }}>
              Our Process
            </div>
            <h2
              style={{
                fontFamily: 'var(--fd)',
                fontSize: 'clamp(30px,4vw,56px)',
                fontWeight: 900,
                color: 'var(--ink)',
                letterSpacing: '-0.02em',
                lineHeight: 1.08,
                marginBottom: 16,
              }}
            >
              An 8-Step SEO Playbook
            </h2>
            <p
              style={{
                fontFamily: 'var(--fd)',
                fontStyle: 'italic',
                fontSize: 'clamp(16px,1.5vw,20px)',
                color: 'var(--muted)',
                lineHeight: 1.6,
                maxWidth: 600,
                margin: '0 auto',
              }}
            >
              Battle-tested across industries — from audit to monthly reporting.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, maxWidth: 1200, margin: '0 auto' }}>
            {[
              { n: '01', title: 'SEO Audit', desc: 'Deep technical, content & backlink audit to baseline opportunity.' },
              { n: '02', title: 'Keyword Research', desc: 'Intent-mapped keyword universe across the funnel.' },
              { n: '03', title: 'Technical SEO', desc: 'Crawl, index, schema, speed & Core Web Vitals fixes.' },
              { n: '04', title: 'On-Page Optimization', desc: 'Titles, metas, headings, internal links & content depth.' },
              { n: '05', title: 'Content Strategy', desc: 'Topical authority through clusters & editorial roadmap.' },
              { n: '06', title: 'Local SEO', desc: 'GBP, citations, location pages & review velocity.' },
              { n: '07', title: 'Link Building', desc: 'Editorial, digital PR & niche-relevant backlinks.' },
              { n: '08', title: 'Monthly Reporting', desc: 'Transparent dashboards tied to business outcomes.' },
            ].map((step) => (
              <div
                key={step.n}
                style={{
                  background: 'var(--white)',
                  border: '1px solid var(--border)',
                  borderRadius: 16,
                  padding: 24,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                  transition: 'all .2s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,.08)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40,
                    height: 40,
                    background: 'var(--navy)',
                    color: '#fff',
                    borderRadius: 8,
                    fontFamily: 'var(--fm)',
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '.1em',
                  }}
                >
                  {step.n}
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', lineHeight: 1.3 }}>
                  {step.title}
                </div>
                <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
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

      {/* ── BRANDS WE HAVE WORKED WITH ── */}
      <section style={{ background: 'var(--off)', padding: '80px 48px' }}>
        <div className="sec-label" style={{ color: 'var(--magenta)', marginBottom: 14 }}>
          Clients
        </div>
        <h2
          style={{
            fontFamily: 'var(--fd)',
            fontSize: 'clamp(30px,4vw,56px)',
            fontWeight: 900,
            color: 'var(--ink)',
            letterSpacing: '-0.02em',
            lineHeight: 1.08,
            marginBottom: 20,
          }}
        >
          Brands We Have Worked With
        </h2>
        <p
          style={{
            fontFamily: 'var(--fd)',
            fontStyle: 'italic',
            fontSize: 'clamp(17px,1.8vw,22px)',
            color: 'var(--muted)',
            lineHeight: 1.5,
            marginBottom: 48,
          }}
        >
          A snapshot of the brands trusting our SEO craft across industries.
        </p>

        <BrandsSection />
      </section>

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
