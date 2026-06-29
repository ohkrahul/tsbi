import Link from 'next/link';
import { notFound } from 'next/navigation';
import { caseStudies } from '@/lib/caseStudies';

/* Small typographic helpers for the rich (tech) case-study layout. */
function Heading({ children }: { children: string }) {
  return (
    <h2 style={{ fontFamily: 'var(--fd)', fontSize: 22, fontWeight: 700, color: 'var(--ink)', margin: '36px 0 12px', lineHeight: 1.2 }}>
      {children}
    </h2>
  );
}
function Para({ children }: { children: string }) {
  return (
    <p style={{ fontFamily: 'var(--fm)', fontSize: 15, lineHeight: 1.85, color: 'rgba(10,10,10,0.72)', fontWeight: 300, margin: 0 }}>
      {children}
    </p>
  );
}

/** Derive a still-frame poster (JPEG at ~2s) from a Cloudinary video URL. */
function cloudinaryPoster(mp4: string) {
  return mp4.replace('/upload/', '/upload/so_2/').replace(/\.mp4$/, '.jpg');
}

export function generateStaticParams() {
  return caseStudies.map((s) => ({ slug: s.slug }));
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const idx   = caseStudies.findIndex((s) => s.slug === slug);
  const study = caseStudies[idx];

  if (!study) notFound();

  const prev = idx > 0                         ? caseStudies[idx - 1] : null;
  const next = idx < caseStudies.length - 1    ? caseStudies[idx + 1] : null;
  const total = caseStudies.length;

  return (
    <main className="cs-detail-main">
      {/* ── HERO ── */}
      <section
        className="cs-hero"
        style={{
          background: `linear-gradient(135deg, ${study.gradFrom} 0%, ${study.gradTo} 100%)`,
          minHeight: '52vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 'clamp(92px,15vw,120px) clamp(20px,5vw,64px) clamp(40px,6vw,56px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        
        {/* Background image with overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${study.image})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.25,
        }} />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${study.gradFrom}f0 0%, ${study.gradFrom}80 50%, transparent 100%)` }} />

        {/* Breadcrumb */}
        <div style={{ position: 'absolute', top: 'clamp(84px,12vw,128px)', left: 'clamp(20px,5vw,64px)', display: 'flex', alignItems: 'center', gap: 16, zIndex: 2 }}>
          
          <Link href="/case-studies" style={{ fontFamily: 'var(--fm)', fontSize: 11, color: 'rgba(255,255,255,0.55)', textDecoration: 'none', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 6 }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Case Studies
          </Link>
          <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 11 }}>•</span>
          <span style={{ fontFamily: 'var(--fm)', fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em' }}>
            {String(idx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>

        {/* Tags */}
        <div className="cs-tags" style={{ position: 'relative', zIndex: 2 }}>
          <span className="cs-tag">{study.category}</span>
          <span className="cs-tag">{study.year}</span>
        </div>

        {/* Title + client */}
        <h1 className="cs-title" style={{ position: 'relative', zIndex: 2, marginTop: 14 }}>
          {study.title}
        </h1>
        <p className="cs-client" style={{ position: 'relative', zIndex: 2 }}>
          {study.clientName}
        </p>
      </section>

      {/* ── VIDEO / THUMBNAIL ── */}
      <div style={{ padding: '0 clamp(20px,5vw,64px)', maxWidth: 1200, margin: '0 auto' }}>
        {study.videos && study.videos.length > 0 ? (
          // Direct MP4s (Cloudinary) — playable inline. Side-by-side on desktop, stacked on mobile.
          <div style={{ display: 'grid', gridTemplateColumns: study.videos.length > 1 ? 'repeat(auto-fit, minmax(320px, 1fr))' : '1fr', gap: 16, margin: '44px 0' }}>
            {study.videos.map((src, i) => (
              <video
                key={i}
                controls
                playsInline
                preload="metadata"
                poster={cloudinaryPoster(src)}
                style={{ width: '100%', aspectRatio: '16 / 9', display: 'block', borderRadius: 14, background: '#000', boxShadow: '0 20px 60px rgba(0,0,0,0.25)' }}
              >
                <source src={src} type="video/mp4" />
              </video>
            ))}
          </div>
        ) : (
          <div className="cs-video-wrap">
            {study.youtube ? (
              // Thumbnail that opens the video on YouTube (avoids blocked/embeddable-off iframes)
              <a
                href={`https://www.youtube.com/watch?v=${study.youtube}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Watch “${study.title}” on YouTube`}
                style={{ position: 'absolute', inset: 0, display: 'block' }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`https://img.youtube.com/vi/${study.youtube}/maxresdefault.jpg`} alt={study.title} />
                <span style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.12) 45%, rgba(0,0,0,0.22) 100%)' }} />
                <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 78, height: 78, borderRadius: '50%', background: 'rgba(224,25,125,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 12px 44px rgba(0,0,0,0.45)' }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff" style={{ marginLeft: 3 }}><path d="M8 5v14l11-7z" /></svg>
                </span>
                <span style={{ position: 'absolute', bottom: 16, left: 18, fontFamily: 'var(--fm)', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff', display: 'inline-flex', alignItems: 'center', gap: 6, textShadow: '0 1px 10px rgba(0,0,0,0.7)' }}>
                  Watch on YouTube ↗
                </span>
              </a>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={study.image} alt={study.title} />
            )}
          </div>
        )}
      </div>

      {/* ── INFO ROW ── */}
      <div className="cs-info-row" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px,5vw,64px)' }}>
        <div className="cs-ic">
          <div className="cs-ic-label">Client</div>
          <div className="cs-ic-val">{study.clientName}</div>
        </div>
        <div className="cs-ic">
          <div className="cs-ic-label">Year</div>
          <div className="cs-ic-val">{study.year}</div>
        </div>
        <div className="cs-ic">
          <div className="cs-ic-label">Category</div>
          <div className="cs-ic-val">{study.category.split(' · ').join(' / ')}</div>
        </div>
        <div className="cs-ic">
          <div className="cs-ic-label">Services</div>
          <div className="cs-ic-val">{study.services.join(', ')}</div>
        </div>
      </div>

      {/* ── PROJECT / CAMPAIGN CONTENT ── */}
      <section style={{ padding: 'clamp(44px,9vw,72px) clamp(20px,5vw,64px)', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ fontFamily: 'var(--fm)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--magenta)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 28, height: 2, background: 'var(--magenta)', display: 'inline-block', borderRadius: 1 }} />
          {study.overview ? 'The Project' : 'The Campaign'}
        </div>

        {study.overview ? (
          /* ── Rich (tech / digital transformation) layout ── */
          <div style={{ maxWidth: 820 }}>
            <Para>{study.overview}</Para>

            {study.challenge && (<><Heading>The Challenge</Heading><Para>{study.challenge}</Para></>)}
            {study.idea && (<><Heading>The Idea</Heading><Para>{study.idea}</Para></>)}

            {study.experienceItems && study.experienceItems.length > 0 && (
              <>
                <Heading>The Experience</Heading>
                {study.experienceIntro && <Para>{study.experienceIntro}</Para>}
                <ul style={{ listStyle: 'none', padding: 0, margin: '8px 0 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '10px 28px' }}>
                  {study.experienceItems.map((item) => (
                    <li key={item} style={{ position: 'relative', paddingLeft: 20, fontFamily: 'var(--fm)', fontSize: 14, lineHeight: 1.6, color: 'rgba(10,10,10,0.72)', fontWeight: 300 }}>
                      <span style={{ position: 'absolute', left: 0, top: 8, width: 7, height: 7, borderRadius: '50%', background: study.accent }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {study.impact && study.impact.length > 0 && (
              <>
                <Heading>Impact</Heading>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 4 }}>
                  {study.impact.map((m, i) => (
                    <div key={i} style={{
                      flex: m.value ? '0 0 auto' : '1 1 280px',
                      minWidth: m.value ? 150 : 280,
                      padding: '20px 22px',
                      borderRadius: 12,
                      border: '1px solid rgba(0,0,0,0.08)',
                      background: 'var(--off)',
                      borderTop: `3px solid ${study.accent}`,
                    }}>
                      {m.value && (
                        <div style={{ fontFamily: 'var(--fd)', fontSize: 34, fontWeight: 900, lineHeight: 1, color: 'var(--ink)', marginBottom: 8 }}>{m.value}</div>
                      )}
                      <div style={{ fontFamily: 'var(--fm)', fontSize: m.value ? 11 : 13.5, letterSpacing: m.value ? '0.12em' : '0', textTransform: m.value ? 'uppercase' : 'none', color: m.value ? 'var(--muted)' : 'rgba(10,10,10,0.72)', lineHeight: 1.5, fontWeight: 300 }}>{m.label}</div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {study.whyItWorked && (<><Heading>Why It Worked</Heading><Para>{study.whyItWorked}</Para></>)}
          </div>
        ) : (
          /* ── Film / campaign layout (single concept block) ── */
          <div style={{ maxWidth: 780 }}>
            {study.concept.split('\n\n').map((para, i) => (
              <p key={i} style={{
                fontFamily: 'var(--fm)',
                fontSize: 15,
                lineHeight: 1.85,
                color: 'rgba(10,10,10,0.72)',
                fontWeight: 300,
                marginBottom: i < study.concept.split('\n\n').length - 1 ? 24 : 0,
              }}>
                {para}
              </p>
            ))}
          </div>
        )}
      </section>

      {/* ── PREV / NEXT NAVIGATION ── */}
      <div style={{
        borderTop: '1px solid rgba(0,0,0,0.07)',
        padding: '32px clamp(20px,5vw,64px)',
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        gap: 20,
        alignItems: 'center',
        maxWidth: 1200,
        margin: '0 auto',
      }}>
        {/* Prev */}
        {prev ? (
          <Link href={`/case-studies/${prev.slug}`} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontFamily: 'var(--fm)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Previous
            </span>
            <span style={{ fontFamily: 'var(--fm)', fontSize: 15, fontWeight: 600, color: 'var(--ink)' }}>{prev.clientName}</span>
            <span style={{ fontFamily: 'var(--fm)', fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>{prev.title}</span>
          </Link>
        ) : <div />}

        {/* All studies */}
        <Link href="/case-studies" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', border: '1.5px solid rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3"/><rect x="8" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3"/><rect x="1" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3"/><rect x="8" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3"/></svg>
          </div>
          <span style={{ fontFamily: 'var(--fm)', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)' }}>All Work</span>
        </Link>

        {/* Next */}
        {next ? (
          <Link href={`/case-studies/${next.slug}`} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-end', textAlign: 'right' }}>
            <span style={{ fontFamily: 'var(--fm)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: 'center', gap: 6 }}>
              Next
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
            <span style={{ fontFamily: 'var(--fm)', fontSize: 15, fontWeight: 600, color: 'var(--ink)' }}>{next.clientName}</span>
            <span style={{ fontFamily: 'var(--fm)', fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>{next.title}</span>
          </Link>
        ) : <div />}
      </div>

      {/* ── CTA ── */}
      <section className="fcta-section" style={{ padding: 'clamp(56px,11vw,80px) clamp(20px,5vw,64px)' }}>
        <h2 className="fcta-h2" style={{ fontSize: 'clamp(26px,3.6vw,42px)' }}>
          Want Results Like These?
        </h2>
        <div className="fcta-actions" style={{ marginTop: 24 }}>
          <Link href="/contact" className="btn-fill" style={{ background: 'var(--magenta)' }}>
            Start a Conversation →
          </Link>
          <Link href="/case-studies" className="btn-border">
            ← All Case Studies
          </Link>
        </div>
      </section>
    </main>
  );
}
