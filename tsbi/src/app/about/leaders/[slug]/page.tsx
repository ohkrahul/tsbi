import Link from 'next/link';
import { getLeaderBySlug, getAllLeaderSlugs } from '@/lib/leaders';
import { notFound } from 'next/navigation';
import { use } from 'react';

export const generateStaticParams = async () => {
  const slugs = getAllLeaderSlugs();
  return slugs.map((slug) => ({ slug }));
};

export const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const leader = getLeaderBySlug(slug);
  if (!leader) return { title: 'Not Found' };
  return { title: `${leader.name} — TSBI` };
};

const styles = `
  .contact-card {
    transition: all 0.3s ease !important;
  }
  .contact-card:hover {
    background: rgba(224,25,125,.2) !important;
    border-color: rgba(224,25,125,.4) !important;
  }
  .contact-card-phone:hover {
    background: rgba(26,106,255,.2) !important;
    border-color: rgba(26,106,255,.4) !important;
  }
  .skill-card {
    transition: all 0.3s ease;
  }
  .skill-card:hover {
    border-color: var(--magenta) !important;
    box-shadow: 0 12px 40px rgba(224,25,125,.1) !important;
    transform: translateY(-4px);
  }
  .job-card {
    transition: all 0.3s ease;
  }
  .job-card:hover {
    border-color: var(--magenta) !important;
    box-shadow: 0 16px 50px rgba(224,25,125,.1) !important;
  }
  .education-card {
    transition: all 0.3s ease;
  }
  .education-card:hover {
    border-color: var(--magenta) !important;
  }
  .award-card {
    transition: all 0.3s ease;
  }
  .award-card:hover {
    border-color: var(--magenta) !important;
    background: linear-gradient(135deg, rgba(224,25,125,.08) 0%, rgba(224,25,125,.04) 100%) !important;
  }
  .social-link {
    transition: all 0.3s ease;
  }
  .social-link-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 30px rgba(224,25,125,.3) !important;
  }
  .social-link-secondary:hover {
    background: rgba(224,25,125,.25) !important;
  }
  .client-card {
    transition: all 0.3s ease;
  }
  .client-card:hover {
    border-color: var(--magenta) !important;
    background: rgba(224,25,125,.05) !important;
  }
  .achievement-card {
    transition: all 0.3s ease;
  }
  .achievement-card:hover {
    border-color: var(--magenta) !important;
    box-shadow: 0 12px 40px rgba(224,25,125,.1) !important;
  }
  .case-study-card {
    transition: all 0.3s ease;
  }
  .case-study-card:hover {
    border-color: var(--magenta) !important;
    box-shadow: 0 16px 50px rgba(224,25,125,.1) !important;
  }
  .service-card {
    transition: all 0.3s ease;
  }
  .service-card:hover {
    border-color: var(--magenta) !important;
    box-shadow: 0 12px 40px rgba(224,25,125,.1) !important;
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
`;

/* Key terms (brands, names, places) highlighted inside the biography. */
const HL_TERMS = [
  'TheSmallBigIdea', 'TSBI Studios Division', 'TSBI Studios', 'TSBI',
  'Harikrishnan Pillai', 'Manish Solanki',
  'GreatWhite Electricals', 'Zydus Lifesciences', 'Ashok Leyland',
  'Reliance Broadcast Network', 'Reliance broadcast', 'Zee Entertainment', 'Zee network', 'ZEE TV', 'Zee TV',
  'Times Television Network', 'Publicis Ambience', 'SSC&B Lintas', 'HDFC Mutual Funds', 'Videocon d2h',
  'Ajay Devgn', 'Aaman Devgn', 'Rotary International', 'Rotaract',
  'India Day Parade', 'New York', 'Capgemini', 'CRISIL', 'Nerolac', 'Sweden',
  'MBA', 'OTT', 'FMCG', 'e-commerce', 'ICICI', 'DHL', 'VIP',
];
const HL_RE = new RegExp(
  '(' +
    HL_TERMS.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') +
    '|\\b\\d{4}\\b|\\b\\d+\\+?\\s?(?:years?|countries|decades?|channel|person)\\b|\\b\\d+\\+|two decades|a decade|last decade' +
    ')',
  'g',
);

/** Split a paragraph and wrap key terms in a highlighted <strong>. */
function highlightBio(text: string) {
  return text.split(HL_RE).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} style={{ color: 'var(--magenta)', fontWeight: 600 }}>
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

export default function LeaderPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const leader = getLeaderBySlug(slug);

  if (!leader) {
    notFound();
  }

  return (
    <>
      <style>{styles}</style>

      {/* Hero Section */}
      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          padding: '120px 48px 80px',
          background: `linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 50%, #16213e 100%)`,
          overflow: 'hidden',
        }}
      >
        {/* Animated gradient background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 20% 50%, rgba(224,25,125,.25) 0%, transparent 50%),' +
              'radial-gradient(circle at 80% 80%, rgba(26,106,255,.15) 0%, transparent 50%)',
            animation: 'pulse 8s ease-in-out infinite',
          }}
        />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1300, margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 80, alignItems: 'center' }}>
          {/* Left: Profile Image */}
          <div style={{ perspective: '1000px' }}>
            <div
              style={{
                position: 'relative',
                borderRadius: 32,
                overflow: 'hidden',
                border: '2px solid rgba(224,25,125,.5)',
                boxShadow: '0 40px 120px rgba(224,25,125,.25), 0 0 80px rgba(26,106,255,.15), inset 0 0 40px rgba(255,255,255,.05)',
                aspectRatio: '3/4',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={leader.profileImage}
                alt={leader.name}
                style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(15,15,30,.3) 100%)',
                  pointerEvents: 'none',
                }}
              />
            </div>

            <div
              style={{
                position: 'absolute',
                bottom: -20,
                right: -20,
                width: 120,
                height: 120,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--magenta) 0%, rgba(26,106,255,.6) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontFamily: 'var(--fm)',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '.1em',
                textAlign: 'center',
                padding: 12,
                boxShadow: '0 20px 60px rgba(224,25,125,.3)',
              }}
            >
              TSBI<br />LEADER
            </div>
          </div>

          {/* Right: Bio */}
          <div>
            <div style={{ fontFamily: 'var(--fm)', fontSize: 11, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--magenta)', marginBottom: 20, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 20, height: 2, background: 'linear-gradient(90deg, var(--magenta), transparent)' }} />
              Leadership
            </div>

            <h1
              style={{
                fontFamily: 'var(--fd)',
                fontSize: 'clamp(48px,5vw,72px)',
                fontWeight: 900,
                background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,.8) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                marginBottom: 16,
              }}
            >
              {leader.name}
            </h1>

            <div
              style={{
                display: 'inline-block',
                fontSize: 14,
                color: '#fff',
                fontWeight: 700,
                background: 'rgba(224,25,125,.15)',
                border: '1px solid rgba(224,25,125,.3)',
                padding: '8px 16px',
                borderRadius: 20,
                marginBottom: 32,
              }}
            >
              {leader.role}
            </div>

            <p
              style={{
                fontSize: 15,
                color: 'rgba(255,255,255,.8)',
                fontWeight: 300,
                lineHeight: 1.9,
                marginBottom: 40,
                maxWidth: 520,
              }}
            >
              {leader.shortBio}
            </p>

            {/* Contact Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 32 }}>
              <a
                href={`mailto:${leader.email}`}
                className="contact-card"
                style={{
                  padding: '16px',
                  background: 'rgba(224,25,125,.1)',
                  border: '1px solid rgba(224,25,125,.2)',
                  borderRadius: 12,
                  color: 'var(--magenta)',
                  textDecoration: 'none',
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                ✉ {leader.email}
              </a>
              {leader.phone && (
                <a
                  href={`tel:${leader.phone}`}
                  className="contact-card-phone"
                  style={{
                    padding: '16px',
                    background: 'rgba(26,106,255,.1)',
                    border: '1px solid rgba(26,106,255,.2)',
                    borderRadius: 12,
                    color: '#1a6aff',
                    textDecoration: 'none',
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  📱 {leader.phone}
                </a>
              )}
            </div>

            {/* Social Links */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 40, flexWrap: 'wrap' }}>
              {leader.socialLinks.linkedin && (
                <a
                  href={leader.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link social-link-primary"
                  style={{
                    padding: '10px 20px',
                    background: 'linear-gradient(135deg, var(--magenta), rgba(224,25,125,.6))',
                    color: '#fff',
                    textDecoration: 'none',
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: '.1em',
                    textTransform: 'uppercase',
                    borderRadius: 8,
                    display: 'inline-block',
                  }}
                >
                  LinkedIn →
                </a>
              )}
              {leader.socialLinks.instagram && (
                <a
                  href={leader.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link social-link-secondary"
                  style={{
                    padding: '10px 20px',
                    background: 'rgba(224,25,125,.15)',
                    border: '1.5px solid rgba(224,25,125,.3)',
                    color: 'var(--magenta)',
                    textDecoration: 'none',
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: '.1em',
                    textTransform: 'uppercase',
                    borderRadius: 8,
                    display: 'inline-block',
                  }}
                >
                  Instagram →
                </a>
              )}
            </div>

            <Link href="/about" className="btn-border" style={{ color: 'rgba(255,255,255,.7)', borderColor: 'rgba(255,255,255,.2)', display: 'inline-block' }}>
              ← Back to Leadership
            </Link>
          </div>
        </div>
      </section>

      {/* Clients & Brands Section */}
      <section style={{ background: 'var(--white)', padding: '100px 48px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 48 }}>
            <div style={{ width: 40, height: 4, background: 'linear-gradient(90deg, var(--magenta), transparent)', borderRadius: 2 }} />
            <div style={{ fontFamily: 'var(--fm)', fontSize: 11, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--magenta)', fontWeight: 700 }}>
              Partnerships
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 48 }}>
            <div>
              <h2 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(32px,4vw,48px)', fontWeight: 900, color: 'var(--ink)', marginBottom: 16 }}>
                Brands & Clients
              </h2>

              <p style={{ fontSize: 15, color: 'var(--muted)', maxWidth: 700 }}>
                A snapshot of the major brands this leader has partnered with and managed
              </p>
            </div>
            <Link
              href="/clients"
              style={{
                padding: '12px 24px',
                background: 'var(--magenta)',
                color: '#fff',
                textDecoration: 'none',
                fontWeight: 700,
                borderRadius: 8,
                fontSize: 12,
                letterSpacing: '.1em',
                textTransform: 'uppercase',
                display: 'inline-block',
                whiteSpace: 'nowrap',
              }}
            >
              View All Clients →
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 20 }}>
            {leader.clients.map((client) => (
              <div
                key={client.name}
                className="client-card"
                style={{
                  padding: '16px',
                  background: '#fff',
                  border: '1.5px solid var(--border)',
                  borderRadius: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '120px',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={client.logo}
                  alt={client.name}
                  style={{
                    maxWidth: '90%',
                    maxHeight: '80px',
                    objectFit: 'contain',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section style={{ background: 'var(--white)', padding: '100px 48px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 48 }}>
            <div style={{ width: 40, height: 4, background: 'linear-gradient(90deg, var(--magenta), transparent)', borderRadius: 2 }} />
            <div style={{ fontFamily: 'var(--fm)', fontSize: 11, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--magenta)', fontWeight: 700 }}>
              Expertise
            </div>
          </div>

          <h2 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(32px,4vw,48px)', fontWeight: 900, color: 'var(--ink)', marginBottom: 48 }}>
            Core Competencies
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
            {leader.topSkills.map((skill, idx) => (
              <div
                key={skill}
                className="skill-card"
                style={{
                  padding: '24px',
                  background: 'linear-gradient(135deg, var(--off) 0%, rgba(250,249,247,.6) 100%)',
                  borderRadius: 16,
                  border: '1.5px solid var(--border)',
                  fontSize: 15,
                  fontWeight: 700,
                  color: 'var(--ink)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    background: 'var(--magenta)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                >
                  {idx + 1}
                </div>
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section style={{ background: 'linear-gradient(135deg, #f5f3ef 0%, #faf9f7 100%)', padding: '100px 48px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 48 }}>
            <div style={{ width: 40, height: 4, background: 'linear-gradient(90deg, var(--magenta), transparent)', borderRadius: 2 }} />
            <div style={{ fontFamily: 'var(--fm)', fontSize: 11, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--magenta)', fontWeight: 700 }}>
              Career Journey
            </div>
          </div>

          <h2 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(32px,4vw,48px)', fontWeight: 900, color: 'var(--ink)', marginBottom: 56 }}>
            Professional Experience
          </h2>

          <div style={{ position: 'relative', paddingLeft: 40 }}>
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: 2,
                background: 'linear-gradient(180deg, var(--magenta) 0%, rgba(224,25,125,.2) 100%)',
                borderRadius: 1,
              }}
            />

            {leader.experience.map((job, idx) => (
              <div key={idx} style={{ marginBottom: idx === leader.experience.length - 1 ? 0 : 40 }}>
                <div
                  style={{
                    position: 'absolute',
                    left: -20,
                    top: 8,
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    background: 'var(--magenta)',
                    border: '3px solid #faf9f7',
                  }}
                />

                <div
                  className="job-card"
                  style={{
                    padding: '28px',
                    background: '#fff',
                    borderRadius: 16,
                    border: '1.5px solid var(--border)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 12 }}>
                    <h3 style={{ fontFamily: 'var(--fd)', fontSize: 18, fontWeight: 800, color: 'var(--ink)', margin: 0 }}>
                      {job.title}
                    </h3>
                    <span style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600, textAlign: 'right' }}>
                      {job.duration}
                    </span>
                  </div>

                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--magenta)', marginBottom: 16 }}>
                    {job.company} · {job.location}
                  </div>

                  <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--muted)', fontSize: 13, lineHeight: 1.8 }}>
                    {job.description.map((desc, i) => (
                      <li key={i} style={{ marginBottom: 8 }}>
                        {desc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section style={{ background: 'var(--white)', padding: '100px 48px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 48 }}>
            <div style={{ width: 40, height: 4, background: 'linear-gradient(90deg, var(--magenta), transparent)', borderRadius: 2 }} />
            <div style={{ fontFamily: 'var(--fm)', fontSize: 11, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--magenta)', fontWeight: 700 }}>
              Services
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 48 }}>
            <div>
              <h2 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(32px,4vw,48px)', fontWeight: 900, color: 'var(--ink)', marginBottom: 16 }}>
                Areas of Expertise
              </h2>

              <p style={{ fontSize: 15, color: 'var(--muted)', maxWidth: 700 }}>
                Core service areas where this leader drives strategy and execution
              </p>
            </div>
            <Link
              href="/services"
              style={{
                padding: '12px 24px',
                background: 'var(--magenta)',
                color: '#fff',
                textDecoration: 'none',
                fontWeight: 700,
                borderRadius: 8,
                fontSize: 12,
                letterSpacing: '.1em',
                textTransform: 'uppercase',
                display: 'inline-block',
                whiteSpace: 'nowrap',
              }}
            >
              All Services →
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {[
              { icon: '🎬', title: 'Content Production', service: 'production', desc: 'End-to-end production — films, reels, photography and social content' },
              { icon: '🔍', title: 'SEO & Organic Growth', service: 'seo', desc: 'Full-funnel SEO strategies and sustainable organic visibility' },
              { icon: '⚙️', title: 'Digital Transformation', service: 'digital', desc: 'Web platforms, dashboards and data systems for smarter operations' },
              { icon: '⭐', title: 'Influencer Management', service: 'influencer', desc: 'Full-service talent management and influencer marketing' },
              { icon: '💬', title: 'Social Media', service: 'social', desc: 'Always-on social strategies and community management' },
            ].map((svc) => {
              const isSpecialty = leader.serviceSpecialties.includes(svc.title);
              return (
                <Link
                  key={svc.service}
                  href={`/services/${svc.service === 'production' ? 'content-production' : svc.service === 'digital' ? 'digital-transformation' : svc.service === 'influencer' ? 'influencer-management' : svc.service === 'social' ? 'social-media' : svc.service}`}
                  className="service-card"
                  style={{
                    padding: '28px',
                    background: isSpecialty ? 'linear-gradient(135deg, rgba(224,25,125,.08) 0%, rgba(224,25,125,.04) 100%)' : '#fff',
                    border: isSpecialty ? '1.5px solid var(--magenta)' : '1.5px solid var(--border)',
                    borderRadius: 16,
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                  }}
                >
                  <div style={{ fontSize: 32 }}>{svc.icon}</div>
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--ink)', margin: 0, marginBottom: 8 }}>
                      {svc.title}
                    </h3>
                    {isSpecialty && (
                      <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--magenta)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 8 }}>
                        ⭐ Leadership Focus
                      </div>
                    )}
                    <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                      {svc.desc}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Education & Awards Section */}
      <section style={{ background: 'var(--white)', padding: '100px 48px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: 80 }}>
            {/* Education */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40 }}>
                <div style={{ width: 40, height: 4, background: 'linear-gradient(90deg, var(--magenta), transparent)', borderRadius: 2 }} />
                <div style={{ fontFamily: 'var(--fm)', fontSize: 11, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--magenta)', fontWeight: 700 }}>
                  Education
                </div>
              </div>

              <h2 style={{ fontFamily: 'var(--fd)', fontSize: 28, fontWeight: 900, color: 'var(--ink)', marginBottom: 32 }}>
                Academic Background
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {leader.education.map((edu, idx) => (
                  <div
                    key={idx}
                    className="education-card"
                    style={{
                      padding: '24px',
                      background: 'linear-gradient(135deg, var(--off) 0%, rgba(250,249,247,.6) 100%)',
                      borderRadius: 16,
                      border: '1.5px solid var(--border)',
                    }}
                  >
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>
                      {edu.degree} in {edu.field}
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 4 }}>
                      {edu.school}
                    </div>
                    <div style={{ fontSize: 12, color: 'rgba(0,0,0,.5)', fontWeight: 600 }}>
                      {edu.year}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Awards */}
            {leader.awards.length > 0 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40 }}>
                  <div style={{ width: 40, height: 4, background: 'linear-gradient(90deg, var(--magenta), transparent)', borderRadius: 2 }} />
                  <div style={{ fontFamily: 'var(--fm)', fontSize: 11, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--magenta)', fontWeight: 700 }}>
                    Recognition
                  </div>
                </div>

                <h2 style={{ fontFamily: 'var(--fd)', fontSize: 28, fontWeight: 900, color: 'var(--ink)', marginBottom: 32 }}>
                  Awards & Recognition
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {leader.awards.map((award, idx) => (
                    <div
                      key={idx}
                      className="award-card"
                      style={{
                        padding: '24px',
                        background: '#fff',
                        borderRadius: 16,
                        border: '1.5px solid var(--border)',
                        fontSize: 14,
                        fontWeight: 700,
                        color: 'var(--ink)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                      }}
                    >
                      <span style={{ fontSize: 20 }}>⭐</span>
                      {award}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Key Achievements Section */}
      <section style={{ background: 'linear-gradient(135deg, #f5f3ef 0%, #faf9f7 100%)', padding: '100px 48px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 48 }}>
            <div style={{ width: 40, height: 4, background: 'linear-gradient(90deg, var(--magenta), transparent)', borderRadius: 2 }} />
            <div style={{ fontFamily: 'var(--fm)', fontSize: 11, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--magenta)', fontWeight: 700 }}>
              Impact
            </div>
          </div>

          <h2 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(32px,4vw,48px)', fontWeight: 900, color: 'var(--ink)', marginBottom: 16 }}>
            Key Achievements
          </h2>

          <p style={{ fontSize: 15, color: 'var(--muted)', marginBottom: 48, maxWidth: 700 }}>
            Notable milestones and measurable impact
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {leader.achievements.map((achievement, idx) => (
              <div
                key={idx}
                className="achievement-card"
                style={{
                  padding: '28px',
                  background: '#fff',
                  border: '1.5px solid var(--border)',
                  borderRadius: 16,
                }}
              >
                <div style={{ fontSize: 28, fontWeight: 900, color: 'var(--magenta)', marginBottom: 12 }}>
                  {achievement.metric}
                </div>
                <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>
                  {achievement.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section style={{ background: 'var(--white)', padding: '100px 48px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 48 }}>
            <div style={{ width: 40, height: 4, background: 'linear-gradient(90deg, var(--magenta), transparent)', borderRadius: 2 }} />
            <div style={{ fontFamily: 'var(--fm)', fontSize: 11, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--magenta)', fontWeight: 700 }}>
              Case Studies
            </div>
          </div>

          <h2 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(32px,4vw,48px)', fontWeight: 900, color: 'var(--ink)', marginBottom: 16 }}>
            Featured Work
          </h2>

          <p style={{ fontSize: 15, color: 'var(--muted)', marginBottom: 48, maxWidth: 700 }}>
            Recent campaigns and projects that showcase strategic thinking and execution
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {[
              { title: 'Influencer Marketing Ecosystem', industry: 'Entertainment', description: 'Built and scaled influencer marketing division for 300+ creators and celebrities' },
              { title: 'Digital Transformation', industry: 'Multiple', description: 'Led digital-first initiatives across broadcast, OTT, sports and film marketing' },
              { title: 'Celebrity Brand Management', industry: 'Entertainment', description: 'Managed digital presence and brand strategies for A-list celebrities' },
            ].map((caseStudy, idx) => (
              <div
                key={idx}
                className="case-study-card"
                style={{
                  padding: '24px',
                  background: '#fff',
                  border: '1.5px solid var(--border)',
                  borderRadius: 16,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--magenta)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.1em' }}>
                  {caseStudy.industry}
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--ink)', marginBottom: 12, margin: 0 }}>
                  {caseStudy.title}
                </h3>
                <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                  {caseStudy.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Biography Section */}
      <section style={{ background: 'linear-gradient(135deg, #f5f3ef 0%, #faf9f7 100%)', padding: '100px 48px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40 }}>
            <div style={{ width: 40, height: 4, background: 'linear-gradient(90deg, var(--magenta), transparent)', borderRadius: 2 }} />
            <div style={{ fontFamily: 'var(--fm)', fontSize: 11, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--magenta)', fontWeight: 700 }}>
              About
            </div>
          </div>

          <h2 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(32px,4vw,48px)', fontWeight: 900, color: 'var(--ink)', marginBottom: 40 }}>
            Full Biography
          </h2>

          <div
            style={{
              background: '#fff',
              padding: '48px',
              borderRadius: 24,
              border: '1px solid var(--border)',
              fontSize: 15,
              lineHeight: 1.9,
              color: 'var(--ink)',
            }}
          >
            {leader.fullBio.split('\n\n').map((para, idx, arr) => (
              <p key={idx} style={{ marginBottom: idx < arr.length - 1 ? 20 : 0 }}>
                {highlightBio(para)}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          position: 'relative',
          padding: '100px 48px',
          background: 'linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 50%, #16213e 100%)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 20% 50%, rgba(224,25,125,.15) 0%, transparent 50%),' +
              'radial-gradient(circle at 80% 80%, rgba(26,106,255,.1) 0%, transparent 50%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <h2
            style={{
              fontFamily: 'var(--fd)',
              fontSize: 'clamp(32px,4vw,48px)',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,.8) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: 24,
            }}
          >
            Let's Build Something Remarkable
          </h2>

          <p
            style={{
              fontSize: 15,
              color: 'rgba(255,255,255,.8)',
              lineHeight: 1.8,
              marginBottom: 40,
            }}
          >
            Connect with our team to transform your brand's digital presence. Whether you're looking for strategic direction or execution excellence, we're here to help.
          </p>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="mailto:tech@tsbi.in"
              style={{
                padding: '14px 32px',
                background: 'linear-gradient(135deg, var(--magenta), rgba(224,25,125,.8))',
                color: '#fff',
                textDecoration: 'none',
                fontWeight: 700,
                borderRadius: 8,
                fontSize: 13,
                letterSpacing: '.1em',
                textTransform: 'uppercase',
                display: 'inline-block',
              }}
            >
              Get In Touch
            </a>
            <Link
              href="/about"
              style={{
                padding: '14px 32px',
                background: 'rgba(255,255,255,.1)',
                border: '1px solid rgba(255,255,255,.2)',
                color: '#fff',
                textDecoration: 'none',
                fontWeight: 700,
                borderRadius: 8,
                fontSize: 13,
                letterSpacing: '.1em',
                textTransform: 'uppercase',
                display: 'inline-block',
              }}
            >
              Back to Leadership
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
