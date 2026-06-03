import Link from 'next/link';

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

export default function InfluencerManagementPage() {
  return (
    <>
      {/* ── HERO: Galaxy dark navy ── */}
      <section
        style={{
          background:
            'radial-gradient(ellipse at 20% 50%, rgba(224,25,125,.08) 0%, transparent 60%), linear-gradient(135deg,#050b1a,#0d1528)',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '140px 48px 80px',
        }}
      >
        <div
          className="sec-label"
          style={{ color: 'var(--magenta)', marginBottom: 48 }}
        >
          05 — Influence
        </div>

        <h1
          style={{
            fontFamily: 'var(--fd)',
            fontSize: 'clamp(60px,9vw,120px)',
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: '-0.04em',
            color: '#fff',
            marginBottom: 48,
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
            color: 'rgba(255,255,255,.55)',
            fontWeight: 300,
            lineHeight: 1.75,
            maxWidth: 480,
          }}
        >
          Full-service influencer marketing and talent management from micro-communities to
          mega-reach — every tier, every category, end-to-end.
        </p>
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
