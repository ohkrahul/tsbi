import Link from 'next/link';

const platforms = [
  { name: 'Instagram', color: '#e0197d' },
  { name: 'LinkedIn', color: '#0077b5' },
  { name: 'YouTube', color: '#ff0000' },
  { name: 'Facebook', color: '#1877f2' },
  { name: 'X / Twitter', color: '#000000' },
  { name: 'Threads', color: '#000000' },
];

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

export default function SocialMediaPage() {
  return (
    <>
      {/* ── HERO: Feed dark purple gradient ── */}
      <section
        style={{
          background: 'linear-gradient(135deg,var(--navy),#2d0040)',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '140px 48px 80px',
        }}
      >
        <div
          className="sec-label"
          style={{ color: 'rgba(255,255,255,.35)', marginBottom: 48 }}
        >
          06 — Social
        </div>

        <h1
          style={{
            fontFamily: 'var(--fd)',
            fontSize: 'clamp(60px,9vw,120px)',
            fontWeight: 900,
            lineHeight: 0.92,
            letterSpacing: '-0.04em',
            color: '#fff',
            marginBottom: 48,
            whiteSpace: 'pre-line',
          }}
        >
          {'Always On.\nAlways\nRelevant.'}
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
          Always-on social strategies, content calendars, community management and creative
          production that builds real audiences and drives real engagement.
        </p>
      </section>

      {/* ── PLATFORM BADGES ── */}
      <div
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
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: p.color,
                flexShrink: 0,
              }}
            />
            {p.name}
          </div>
        ))}
      </div>

      {/* ── FEATURES GRID ── */}
      <section style={{ background: 'var(--white)', padding: '80px 48px' }}>
        <div className="sec-label" style={{ marginBottom: 48 }}>
          What We Do
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 40,
          }}
        >
          {features.map((feat) => (
            <div
              key={feat.num}
              style={{
                padding: '32px 0',
                borderTop: '3px solid var(--border)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--fm)',
                  fontSize: 11,
                  color: 'var(--faint)',
                  letterSpacing: '.1em',
                  marginBottom: 2,
                }}
              >
                {feat.num}
              </div>
              <div
                style={{
                  fontFamily: 'var(--fd)',
                  fontSize: 22,
                  fontWeight: 700,
                  color: 'var(--ink)',
                  lineHeight: 1.2,
                  margin: '8px 0',
                }}
              >
                {feat.title}
              </div>
              <p
                style={{
                  fontSize: 14,
                  color: 'var(--muted)',
                  fontWeight: 300,
                  lineHeight: 1.65,
                }}
              >
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SPLIT: dark + off-white ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        {/* Left: dark navy */}
        <div
          style={{
            background: 'var(--navy)',
            padding: '80px 48px',
          }}
        >
          <div
            className="sec-label"
            style={{ color: 'rgba(255,255,255,.3)', marginBottom: 32 }}
          >
            Our Advantage
          </div>
          <h2
            style={{
              fontFamily: 'var(--fd)',
              fontSize: 'clamp(28px,3.5vw,48px)',
              fontWeight: 900,
              color: '#fff',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: 24,
              whiteSpace: 'pre-line',
            }}
          >
            {'Strategy + Creative.\nOne Roof.'}
          </h2>
          <p
            style={{
              fontSize: 15,
              color: 'rgba(255,255,255,.5)',
              fontWeight: 300,
              lineHeight: 1.75,
            }}
          >
            No briefing back and forth between agencies. Our strategists and creatives work
            together to produce social content that&apos;s both on-brand and built to perform.
          </p>
        </div>

        {/* Right: off-white differentiators */}
        <div
          style={{
            background: 'var(--off)',
            padding: '80px 48px',
          }}
        >
          <div className="sec-label" style={{ marginBottom: 40 }}>
            Why TSBI Social
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {differentiators.map((d, i) => (
              <div
                key={d.title}
                style={{
                  padding: '24px 0',
                  borderBottom:
                    i < differentiators.length - 1 ? '1px solid var(--border)' : 'none',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--fb)',
                    fontSize: 16,
                    fontWeight: 700,
                    color: 'var(--ink)',
                    marginBottom: 6,
                  }}
                >
                  {d.title}
                </div>
                <p
                  style={{
                    fontSize: 14,
                    color: 'var(--muted)',
                    fontWeight: 300,
                    lineHeight: 1.6,
                  }}
                >
                  {d.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA: ink dark ── */}
      <section
        style={{
          background: 'var(--ink)',
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
