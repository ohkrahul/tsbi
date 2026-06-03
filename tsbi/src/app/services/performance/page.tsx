import Link from 'next/link';

const metrics = [
  { val: 'ROI', label: 'Tracked' },
  { val: 'Full-Funnel', label: 'Campaigns' },
  { val: 'Real-Time', label: 'Dashboards' },
  { val: 'Multi-Channel', label: 'Buying' },
];

const features = [
  {
    num: '01',
    title: 'Paid Social',
    desc: 'Meta, LinkedIn, YouTube — precision targeting that finds your audience wherever they scroll.',
  },
  {
    num: '02',
    title: 'Google & Programmatic',
    desc: 'Search, display and programmatic inventory bought at the right price, at the right time.',
  },
  {
    num: '03',
    title: 'Display & Video',
    desc: 'Visually rich formats that drive awareness and intent across the open web.',
  },
  {
    num: '04',
    title: 'Influencer Amplification',
    desc: 'Paid amplification layered onto organic influence to multiply reach.',
  },
  {
    num: '05',
    title: 'Performance Creative',
    desc: 'Ad creative built around conversion data — not just aesthetics.',
  },
  {
    num: '06',
    title: 'Analytics & Reporting',
    desc: 'Transparent, real-time dashboards tied directly to business outcomes.',
  },
];

export default function PerformancePage() {
  return (
    <>
      {/* ── HERO: Dashboard white ── */}
      <section
        style={{
          background: 'var(--white)',
          padding: '140px 48px 60px',
        }}
      >
        <div className="sec-label" style={{ marginBottom: 32 }}>
          02 — Media
        </div>

        <div
          style={{
            fontFamily: 'var(--fd)',
            fontSize: 'clamp(80px,12vw,160px)',
            fontWeight: 900,
            color: 'var(--ink)',
            letterSpacing: '-0.04em',
            lineHeight: 1,
          }}
        >
          ₹50Cr+
        </div>
        <div
          style={{
            fontFamily: 'var(--fm)',
            fontSize: 11,
            letterSpacing: '.2em',
            textTransform: 'uppercase',
            color: 'var(--magenta)',
            marginBottom: 40,
            marginTop: 8,
          }}
        >
          Media Managed
        </div>

        <h1
          style={{
            fontFamily: 'var(--fd)',
            fontSize: 'clamp(48px,7vw,96px)',
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            color: 'var(--ink)',
            marginBottom: 28,
          }}
        >
          Performance
          <br />
          That{' '}
          <em style={{ color: 'var(--magenta)', fontStyle: 'italic' }}>Pays.</em>
        </h1>

        <p
          style={{
            fontSize: 16,
            color: 'var(--muted)',
            fontWeight: 300,
            lineHeight: 1.75,
            maxWidth: 480,
          }}
        >
          Data-driven paid media that maximises every rupee. We plan, buy and optimise across
          channels to deliver measurable, accountable results.
        </p>
      </section>

      {/* ── DARK METRICS BAND ── */}
      <div
        style={{
          background: 'var(--navy)',
          display: 'flex',
        }}
      >
        {metrics.map((m, i) => (
          <div
            key={m.val}
            style={{
              flex: 1,
              padding: '40px 32px',
              borderRight:
                i < metrics.length - 1 ? '1px solid rgba(255,255,255,.06)' : 'none',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--fd)',
                fontSize: 'clamp(22px,2.5vw,32px)',
                fontWeight: 900,
                color: '#fff',
                lineHeight: 1,
                marginBottom: 10,
              }}
            >
              {m.val}
            </div>
            <div
              style={{
                fontFamily: 'var(--fm)',
                fontSize: 9,
                letterSpacing: '.16em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,.35)',
              }}
            >
              {m.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── FEATURES GRID ── */}
      <section style={{ background: 'var(--off)', padding: '80px 48px' }}>
        <div className="sec-label" style={{ marginBottom: 40 }}>
          What We Run
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 2,
          }}
        >
          {features.map((feat) => (
            <div
              key={feat.num}
              style={{
                background: 'var(--white)',
                padding: '28px 32px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 20,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--fm)',
                  fontSize: 11,
                  color: 'var(--magenta)',
                  letterSpacing: '.1em',
                  minWidth: 28,
                  paddingTop: 3,
                }}
              >
                {feat.num}
              </span>
              <div>
                <div
                  style={{
                    fontFamily: 'var(--fb)',
                    fontSize: 16,
                    fontWeight: 700,
                    color: 'var(--ink)',
                    marginBottom: 6,
                  }}
                >
                  {feat.title}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: 'var(--muted)',
                    fontWeight: 300,
                    lineHeight: 1.65,
                  }}
                >
                  {feat.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA: dark ink ── */}
      <section
        style={{
          background: 'var(--ink)',
          padding: '80px 48px',
        }}
      >
        <div className="sec-label" style={{ color: 'rgba(255,255,255,.3)', marginBottom: 32 }}>
          Next Step
        </div>
        <h2
          style={{
            fontFamily: 'var(--fd)',
            fontSize: 'clamp(36px,5vw,64px)',
            fontWeight: 900,
            color: '#fff',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            marginBottom: 40,
          }}
        >
          Ready to perform?
        </h2>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link
            href="/contact"
            className="btn-fill"
            style={{ background: 'var(--magenta)' }}
          >
            Start a Campaign →
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
