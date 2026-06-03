import Link from 'next/link';

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

export default function SeoPage() {
  return (
    <>
      {/* ── HERO: ghost outlined headline ── */}
      <section
        style={{
          background: 'var(--off)',
          padding: '140px 48px 80px',
        }}
      >
        <div className="sec-label" style={{ marginBottom: 48 }}>
          03 — SEO
        </div>

        <div style={{ marginBottom: 48 }}>
          {['Rank.', 'Grow.'].map((word) => (
            <div
              key={word}
              style={{
                fontFamily: 'var(--fd)',
                fontSize: 'clamp(80px,13vw,160px)',
                fontWeight: 900,
                lineHeight: 0.88,
                letterSpacing: '-0.04em',
                color: 'transparent',
                WebkitTextStroke: '2px var(--ink)',
                display: 'block',
              }}
            >
              {word}
            </div>
          ))}
          <div
            style={{
              fontFamily: 'var(--fd)',
              fontSize: 'clamp(80px,13vw,160px)',
              fontWeight: 900,
              lineHeight: 0.88,
              letterSpacing: '-0.04em',
              color: 'var(--magenta)',
              WebkitTextStroke: '0',
              display: 'block',
            }}
          >
            Win.
          </div>
        </div>

        <p
          style={{
            fontSize: 16,
            color: 'var(--muted)',
            fontWeight: 300,
            lineHeight: 1.75,
            maxWidth: 480,
          }}
        >
          Full-funnel SEO that drives sustainable organic growth — from technical audits to
          content strategies that search engines and audiences love.
        </p>
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
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: 'var(--ink)',
                    marginBottom: 8,
                  }}
                >
                  {feat.title}
                </div>
                <p
                  style={{
                    fontSize: 15,
                    color: 'var(--muted)',
                    fontWeight: 300,
                    lineHeight: 1.7,
                  }}
                >
                  {feat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── STAT SPLIT ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        {/* Left: dark navy stat */}
        <div
          style={{
            background: 'var(--navy)',
            padding: '80px 48px',
          }}
        >
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
          <p
            style={{
              fontSize: 15,
              color: 'rgba(255,255,255,.5)',
              fontWeight: 300,
              lineHeight: 1.75,
              maxWidth: 320,
            }}
          >
            Our clients consistently see triple the organic traffic within 12 months of
            engaging our full SEO programme.
          </p>
        </div>

        {/* Right: off-white copy */}
        <div
          style={{
            background: 'var(--off)',
            padding: '80px 48px',
          }}
        >
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
          <p
            style={{
              fontSize: 15,
              color: 'var(--muted)',
              fontWeight: 300,
              lineHeight: 1.75,
              marginBottom: 32,
            }}
          >
            We don&apos;t chase algorithms — we build content and architecture that serves users.
            The result is rankings that compound, not collapse.
          </p>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
          >
            {['Content-Led SEO', 'Technical Excellence', 'Monthly Reporting'].map((item) => (
              <div
                key={item}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  fontSize: 14,
                  fontWeight: 600,
                  color: 'var(--ink)',
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: 'var(--magenta)',
                    flexShrink: 0,
                  }}
                />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA: navy ── */}
      <section
        style={{
          background: 'var(--navy)',
          padding: '80px 48px',
        }}
      >
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
          <Link
            href="/contact"
            className="btn-fill"
            style={{ background: 'var(--magenta)' }}
          >
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
