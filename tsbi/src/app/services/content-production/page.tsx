import Link from 'next/link';

const tiles = [
  { num: '01', title: 'Brand Films & TVCs', desc: 'Stories that move.' },
  { num: '02', title: 'Social-First Video', desc: 'Built for the feed.' },
  { num: '03', title: 'Photography & Stills', desc: 'Every frame intentional.' },
  { num: '04', title: 'Reels & Short-Form', desc: 'Scroll-stopping content.' },
  { num: '05', title: 'OOH & Print', desc: 'Physical presence.' },
  { num: '06', title: 'Audio & Podcast', desc: 'Sound with substance.' },
];

const ticker = 'BRAND FILMS  ·  SOCIAL CONTENT  ·  PHOTOGRAPHY  ·  REELS  ·  OOH  ·  PODCAST  ·  ';

export default function ContentProductionPage() {
  return (
    <>
      {/* ── HERO: Film Roll dark cinematic ── */}
      <section
        style={{
          background: 'linear-gradient(135deg,#0d0d0d,#1a1a1a)',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '140px 48px 80px',
        }}
      >
        <span
          className="sec-label"
          style={{ color: 'rgba(255,255,255,.35)', marginBottom: 48 }}
        >
          <span style={{ color: 'rgba(255,255,255,.2)' }}>01</span> — Production
        </span>

        <h1
          style={{
            fontFamily: 'var(--fd)',
            fontSize: 'clamp(64px,10vw,130px)',
            fontWeight: 900,
            lineHeight: 0.92,
            letterSpacing: '-0.04em',
            color: '#fff',
            marginBottom: 48,
            whiteSpace: 'pre-line',
          }}
        >
          {'Frame.\nStory.\nResonance.'}
        </h1>

        <p
          style={{
            fontSize: 'clamp(15px,1.4vw,18px)',
            color: 'rgba(255,255,255,.5)',
            fontWeight: 300,
            lineHeight: 1.7,
            maxWidth: 520,
            marginBottom: 52,
          }}
        >
          End-to-end content production. Films, reels, photography — in-house, no compromise.
        </p>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {['Film', 'Photography', 'Reels', 'OOH', 'Audio'].map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: 'var(--fm)',
                fontSize: 10,
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,.55)',
                border: '1px solid rgba(255,255,255,.15)',
                borderRadius: 100,
                padding: '7px 16px',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* ── TICKER STRIP ── */}
      <div
        style={{
          background: '#111',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          borderTop: '1px solid rgba(255,255,255,.06)',
          borderBottom: '1px solid rgba(255,255,255,.06)',
        }}
      >
        <div
          style={{
            display: 'inline-block',
            animation: 'slide 20s linear infinite',
            fontFamily: 'var(--fm)',
            fontSize: 11,
            letterSpacing: '.15em',
            color: 'rgba(255,255,255,.4)',
            padding: '16px 0',
          }}
        >
          {ticker.repeat(6)}
        </div>
      </div>

      {/* ── SERVICE TILES GRID ── */}
      <section style={{ background: 'var(--white)', padding: '80px 48px' }}>
        <div className="sec-label" style={{ marginBottom: 40 }}>
          What We Produce
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 1,
            background: 'var(--border)',
          }}
        >
          {tiles.map((tile) => (
            <div
              key={tile.num}
              style={{
                background: 'var(--white)',
                padding: '32px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--fd)',
                  fontSize: 48,
                  fontWeight: 900,
                  color: 'var(--faint)',
                  lineHeight: 1,
                }}
              >
                {tile.num}
              </span>
              <span
                style={{
                  fontFamily: 'var(--fb)',
                  fontSize: 16,
                  fontWeight: 700,
                  color: 'var(--ink)',
                }}
              >
                {tile.title}
              </span>
              <span
                style={{
                  fontFamily: 'var(--fb)',
                  fontSize: 14,
                  color: 'var(--muted)',
                  fontWeight: 300,
                }}
              >
                {tile.desc}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── STAT BAR ── */}
      <div
        style={{
          background: 'var(--ink)',
          display: 'flex',
        }}
      >
        {[
          { val: '300+', label: 'Films Produced' },
          { val: 'In-house', label: 'Studio & Post' },
          { val: '24hr', label: 'Quick Turnarounds' },
        ].map((stat, i) => (
          <div
            key={stat.label}
            style={{
              flex: 1,
              textAlign: 'center',
              padding: '40px 20px',
              borderRight: i < 2 ? '1px solid rgba(255,255,255,.08)' : 'none',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--fd)',
                fontSize: 'clamp(40px,6vw,72px)',
                fontWeight: 900,
                color: '#fff',
                lineHeight: 1,
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
                color: 'rgba(255,255,255,.4)',
                marginTop: 8,
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── CTA ── */}
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
        <p
          style={{
            fontFamily: 'var(--fd)',
            fontSize: 'clamp(32px,5vw,60px)',
            fontStyle: 'italic',
            fontWeight: 300,
            color: '#fff',
            lineHeight: 1.1,
            whiteSpace: 'pre-line',
          }}
        >
          {'Have a project\nin mind?'}
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link
            href="/contact"
            className="btn-fill"
            style={{ background: '#fff', color: 'var(--magenta)' }}
          >
            Start a Project →
          </Link>
          <Link
            href="/services"
            className="btn-border"
            style={{
              color: 'rgba(255,255,255,.7)',
              borderColor: 'rgba(255,255,255,.3)',
            }}
          >
            All Services
          </Link>
        </div>
      </section>
    </>
  );
}
