import Link from 'next/link';
import GalaxySection from '@/components/home/GalaxySection';

const services = [
  { id: 'content-production', href: '/services/content-production', num: '01 — Production', title: 'Content Production', desc: 'End-to-end production — films, reels, photography, OOH and social content — produced in-house with cinematic quality.' },
  { id: 'performance', href: '/services/performance', num: '02 — Media', title: 'Performance Management', desc: 'Paid social, programmatic, search and digital media that maximises every rupee and drives measurable, accountable return.' },
  { id: 'seo', href: '/services/seo', num: '03 — SEO', title: 'SEO & Organic Growth', desc: 'Full-funnel SEO strategies — technical audits, content frameworks and link building to sustainably grow organic visibility.' },
  { id: 'digital', href: '/services/digital-transformation', num: '04 — Tech', title: 'Digital Transformation', desc: 'Web platforms, digital experiences, dashboards and data systems that make brands smarter and faster online.' },
  { id: 'influencer', href: '/services/influencer-management', num: '05 — Influence', title: 'Influencer Management', desc: 'Full-service talent management and influencer marketing — from micro-communities to mega-reach, every tier managed end-to-end.' },
  { id: 'social', href: '/services/social-media', num: '06 — Social', title: 'Social Media', desc: 'Always-on social strategies, community management and content calendars that build audiences and drive real engagement.' },
];

const steps = [
  { num: '01', title: 'Discover', desc: 'Deep-dive into your brand, audience and competitive landscape.', dot: true },
  { num: '02', title: 'Strategize', desc: 'Build the blueprint — positioning, messaging, channel strategy.', dot: false },
  { num: '03', title: 'Create', desc: 'Bring ideas to life with world-class creative production.', dot: true },
  { num: '04', title: 'Amplify', desc: 'Distribute across owned, earned and paid channels with precision.', dot: false },
  { num: '05', title: 'Measure', desc: 'Track, learn and optimise toward outcomes that matter.', dot: true },
];

const words = ['STRATEGY', 'CREATIVE', 'MEDIA', 'TECH'];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="sp-hero">
        <div className="sec-label">What We Do</div>
        <h1 className="sp-h1">
          Ideas.<br/><span className="dim">Powered by</span><br/><em>Expertise.</em>
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: 16, fontWeight: 300, maxWidth: 520, lineHeight: 1.8, marginTop: 24 }}>
          Six disciplines. One agency. Every touchpoint from strategy to launch — and everything that comes after.
        </p>
      </section>

      {/* Service cards */}
      <section className="sp-cards">
        <div className="sec-label"><span style={{ color: 'var(--faint)' }}>06</span> Services</div>
        <div className="sp-cards-grid" style={{ marginTop: 48 }}>
          {services.map(s => (
            <Link key={s.num} href={s.href} id={s.id} className="sp-card" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
              <div className="sp-card-num">{s.num}</div>
              <div className="sp-card-title">{s.title}</div>
              <div className="sp-card-desc">{s.desc}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Galaxy — linked to Influencer Management */}
      <GalaxySection />

      {/* Process */}
      <section className="sp-process">
        <div className="sec-label"><span style={{ color: 'var(--faint)' }}>Our Process</span></div>
        <h2 className="sp-proc-h2">How We<br/><em>Work</em></h2>
        <div className="sp-proc-steps">
          {steps.map(s => (
            <div key={s.num} className="sp-step">
              <div className="sp-step-dot" style={{ background: s.dot ? 'var(--magenta)' : 'var(--faint)' }} />
              <div className="sp-step-num">{s.num}</div>
              <div className="sp-step-title">{s.title}</div>
              <p className="sp-step-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cap wall */}
      <section className="cap-section" style={{ padding: '80px 48px' }}>
        <div className="cap-inner">
          <div className="cap-words">
            {words.map((w, i) => (
              <span key={w} className={`cw${i === 1 ? ' lit' : ''}`}>{w}</span>
            ))}
          </div>
          <div className="cap-side">
            <p className="cap-quote">"Six disciplines. One vision. Zero compromise."</p>
            <Link href="/contact" className="btn-fill" style={{ marginTop: 20 }}>Get Started →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
