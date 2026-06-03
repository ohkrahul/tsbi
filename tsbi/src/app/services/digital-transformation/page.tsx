import Link from 'next/link';

const terminalLines = [
  { text: '> running brand audit...', color: '#00ff88' },
  { text: '> building digital experience...', color: '#00ff88' },
  { text: '> deploying to production...', color: '#00ff88' },
  { text: '> done. 🚀', color: '#ffffff' },
];

const services = [
  {
    num: '01',
    title: 'Website Design & Development',
    desc: 'Performance-first websites built for users and search engines alike.',
  },
  {
    num: '02',
    title: 'E-Commerce',
    desc: 'Conversion-optimised storefronts that turn browsers into buyers.',
  },
  {
    num: '03',
    title: 'Analytics Dashboards',
    desc: 'Custom data visualisation that surfaces insights you can act on.',
  },
  {
    num: '04',
    title: 'CRM & MarTech',
    desc: 'Integrating the tools that power your marketing and sales engine.',
  },
  {
    num: '05',
    title: 'Mobile Experiences',
    desc: 'Native and progressive web apps for audiences on the go.',
  },
  {
    num: '06',
    title: 'Data Strategy',
    desc: 'First-party data infrastructure that makes every decision smarter.',
  },
];

export default function DigitalTransformationPage() {
  return (
    <>
      {/* ── HERO: Terminal dark ── */}
      <section
        style={{
          background: '#0a0a0a',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '140px 48px 80px',
        }}
      >
        <div
          className="sec-label"
          style={{
            color: '#00ff88',
            fontFamily: 'var(--fm)',
            marginBottom: 40,
          }}
        >
          04 — Technology
        </div>

        <h1
          style={{
            fontFamily: 'var(--fd)',
            fontSize: 'clamp(64px,10vw,120px)',
            fontWeight: 900,
            lineHeight: 0.92,
            letterSpacing: '-0.04em',
            color: '#fff',
            marginBottom: 52,
            whiteSpace: 'pre-line',
          }}
        >
          {'Digital.\nTransformed.\nBuilt.'}
        </h1>

        {/* Fake terminal window */}
        <div
          style={{
            position: 'relative',
            background: '#111',
            border: '1px solid rgba(255,255,255,.1)',
            borderRadius: 8,
            padding: '20px 24px',
            maxWidth: 480,
          }}
        >
          {/* Window traffic lights */}
          <div
            style={{
              display: 'flex',
              gap: 6,
              marginBottom: 16,
            }}
          >
            {['#ff5f57', '#febc2e', '#28c840'].map((color) => (
              <span
                key={color}
                style={{
                  display: 'block',
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: color,
                }}
              />
            ))}
          </div>
          {terminalLines.map((line, i) => (
            <div
              key={i}
              style={{
                fontFamily: 'var(--fm)',
                fontSize: 13,
                color: line.color,
                lineHeight: 2,
              }}
            >
              {line.text}
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES GRID: dark ── */}
      <section style={{ background: '#111', padding: '80px 48px' }}>
        <div
          className="sec-label"
          style={{ color: '#00ff88', marginBottom: 40 }}
        >
          What We Build
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 1,
            background: 'rgba(255,255,255,.06)',
          }}
        >
          {services.map((svc) => (
            <div
              key={svc.num}
              style={{
                background: '#111',
                padding: 32,
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--fm)',
                  fontSize: 11,
                  color: '#00ff88',
                  letterSpacing: '.12em',
                  marginBottom: 12,
                }}
              >
                {svc.num}
              </div>
              <div
                style={{
                  fontFamily: 'var(--fd)',
                  fontSize: 22,
                  fontWeight: 700,
                  color: '#fff',
                  marginBottom: 8,
                  lineHeight: 1.2,
                }}
              >
                {svc.title}
              </div>
              <p
                style={{
                  fontFamily: 'var(--fm)',
                  fontSize: 12,
                  color: 'rgba(255,255,255,.5)',
                  lineHeight: 1.7,
                }}
              >
                {svc.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── IMPACT STATS: white ── */}
      <section style={{ background: 'var(--white)', padding: '80px 48px' }}>
        <div className="sec-label" style={{ marginBottom: 48 }}>
          Our Numbers
        </div>

        <div style={{ display: 'flex', gap: 0 }}>
          {[
            { val: '50+', label: 'Platforms Built' },
            { val: 'Performance', label: 'First Development' },
            { val: 'Post-Launch', label: 'Support Included' },
          ].map((stat, i) => (
            <div
              key={stat.label}
              style={{
                flex: 1,
                padding: '40px 32px',
                borderRight: i < 2 ? '1px solid var(--border)' : 'none',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--fd)',
                  fontSize: 'clamp(36px,5vw,64px)',
                  fontWeight: 900,
                  color: 'var(--ink)',
                  lineHeight: 1,
                  marginBottom: 10,
                }}
              >
                {stat.val}
              </div>
              <div
                style={{
                  fontFamily: 'var(--fm)',
                  fontSize: 9,
                  letterSpacing: '.16em',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA: black terminal ── */}
      <section
        style={{
          background: '#0a0a0a',
          padding: '80px 48px',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--fd)',
            fontSize: 'clamp(36px,5vw,64px)',
            fontWeight: 900,
            fontStyle: 'italic',
            color: '#fff',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            marginBottom: 40,
          }}
        >
          Ready to go digital?
        </h2>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link
            href="/contact"
            className="btn-fill"
            style={{ background: '#00ff88', color: '#0a0a0a' }}
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
