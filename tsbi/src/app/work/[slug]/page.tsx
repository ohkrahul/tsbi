import Link from 'next/link';
import { getCaseStudies, getCaseStudyBySlug, mediaUrl } from '@/lib/strapi';

// ─── Local fallback study data ────────────────────────────────────────────────

const frameImages = [
  '/images/banner-home3-1-400x500.jpg',
  '/images/banner-home2-2-400x500.jpg',
  '/images/bg-about-company-400x500.jpg',
  '/images/portfolio-popup-10-400x500.jpg',
  '/images/portfolio-popup-12-400x500.jpg',
  '/images/gallery-slider-02-400x500.jpg',
];

const FALLBACK_STUDIES: Record<string, {
  client: string; title: string; year: string;
  tags: string[]; services: string; deliverables: string; platforms: string;
  conceptTitle: string; conceptBody: string;
  heroGrad: string; heroImage: string; conceptGrad: string; conceptImage: string;
  frames: { cap: string; grad: string; img: string }[];
  metrics: { val: string; label: string; color?: string }[];
}> = {
  'tiger-refresh': {
    client: 'Tiger Beer', title: 'Refresh\nYour Vibes', year: '2024',
    tags: ['Campaign', 'Social', 'Influencer', 'Film'],
    services: 'Creative, Social, Production', deliverables: 'Hero Film, Reels, OOH', platforms: 'IG · YT · TikTok · OOH',
    conceptTitle: 'When the heat hits,\nyou need a vibe reset.',
    conceptBody: "We built the campaign around the insight that Tiger isn't just a beer — it's permission to pause, pivot and refresh.",
    heroGrad: 'linear-gradient(135deg,#301500cc,#200d00cc)', heroImage: '/images/banner-home3-1-400x500.jpg',
    conceptGrad: 'linear-gradient(135deg,#301500bb,#200d00bb)', conceptImage: '/images/banner-home2-2-400x500.jpg',
    frames: [
      { cap: '01 — Heat', grad: 'linear-gradient(135deg,#301800cc,#1a0f00cc)', img: frameImages[0] },
      { cap: '02 — Escape', grad: 'linear-gradient(135deg,#200d00cc,#150900cc)', img: frameImages[1] },
      { cap: '03 — Crew', grad: 'linear-gradient(135deg,#0d1528cc,#1a2240cc)', img: frameImages[2] },
      { cap: '04 — Moment', grad: 'linear-gradient(135deg,#051510cc,#0a2018cc)', img: frameImages[3] },
      { cap: '05 — Vibe', grad: 'linear-gradient(135deg,#1a0f00cc,#2a1800cc)', img: frameImages[4] },
      { cap: '06 — Refresh', grad: 'linear-gradient(135deg,#100a20cc,#1a1030cc)', img: frameImages[5] },
    ],
    metrics: [
      { val: '48M', label: 'Total Views', color: 'var(--magenta)' },
      { val: '6.2M', label: 'Engagements', color: 'var(--orange)' },
      { val: '+34%', label: 'Brand Lift', color: 'var(--magenta)' },
      { val: '120+', label: 'Creator Collabs', color: 'var(--magenta)' },
    ],
  },
  'loreal-glycolic': {
    client: "L'Oréal Paris", title: 'Glycolic Bright\nLaunch Campaign', year: '2024',
    tags: ['Campaign', 'Influencer', 'Digital'],
    services: 'Strategy, Creative, Influencer', deliverables: 'Campaign Films, Reels, Digital', platforms: 'IG · YT · Meta Ads',
    conceptTitle: 'Bright skin, bold statement.',
    conceptBody: "A multi-tier influencer strategy that launched Glycolic Bright across beauty communities in India and Southeast Asia.",
    heroGrad: 'linear-gradient(135deg,#1a0f00cc,#301800cc)', heroImage: '/images/banner-home2-2-400x500.jpg',
    conceptGrad: 'linear-gradient(135deg,#1a0f00bb,#301800bb)', conceptImage: '/images/bg-about-company-400x500.jpg',
    frames: [
      { cap: '01 — Skin', grad: 'linear-gradient(135deg,#301800cc,#1a0f00cc)', img: frameImages[1] },
      { cap: '02 — Glow', grad: 'linear-gradient(135deg,#200d00cc,#150900cc)', img: frameImages[2] },
      { cap: '03 — Creator', grad: 'linear-gradient(135deg,#1a0a30cc,#100520cc)', img: frameImages[3] },
      { cap: '04 — Review', grad: 'linear-gradient(135deg,#051510cc,#0a2018cc)', img: frameImages[4] },
      { cap: '05 — Results', grad: 'linear-gradient(135deg,#1a0f00cc,#2a1800cc)', img: frameImages[5] },
      { cap: '06 — Brand', grad: 'linear-gradient(135deg,#0d1528cc,#1a2240cc)', img: frameImages[0] },
    ],
    metrics: [
      { val: '120M', label: 'Total Reach', color: 'var(--magenta)' },
      { val: '8.4M', label: 'Engagements', color: 'var(--orange)' },
      { val: '+52%', label: 'Sales Lift', color: 'var(--magenta)' },
      { val: '200+', label: 'Creators', color: 'var(--magenta)' },
    ],
  },
};

// ─── Static params ────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const cmsStudies = await getCaseStudies();
  const cmsSlgs = cmsStudies.map((s) => ({ slug: s.slug }));
  const localSlgs = Object.keys(FALLBACK_STUDIES).map((slug) => ({ slug }));
  // merge, deduplicate
  const seen = new Set<string>();
  return [...cmsSlgs, ...localSlgs].filter(({ slug }) => {
    if (seen.has(slug)) return false;
    seen.add(slug);
    return true;
  });
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Try CMS first, fall back to local hardcoded data
  const cmsStudy = await getCaseStudyBySlug(slug);
  const allCmsStudies = await getCaseStudies();

  let study: {
    client: string; title: string; year: string | number;
    tags: string[]; services: string; deliverables: string; platforms: string;
    conceptTitle: string; conceptBody: string;
    heroGrad: string; heroImage: string; conceptGrad: string; conceptImage: string;
    frames: { cap: string; grad: string; img: string }[];
    metrics: { val: string; label: string; color?: string }[];
  };

  let navStudies: { slug: string; client: string }[];

  if (cmsStudy) {
    study = {
      client: cmsStudy.client,
      title: cmsStudy.title,
      year: cmsStudy.year,
      tags: cmsStudy.tags ?? [],
      services: cmsStudy.services ?? '',
      deliverables: cmsStudy.deliverables ?? '',
      platforms: cmsStudy.platforms ?? '',
      conceptTitle: cmsStudy.conceptTitle ?? '',
      conceptBody: cmsStudy.conceptBody ?? '',
      heroGrad: cmsStudy.heroGrad ?? 'linear-gradient(135deg,#10101acc,#1a1a28cc)',
      heroImage: cmsStudy.heroImage ? mediaUrl(cmsStudy.heroImage) : '/images/banner-home3-1-400x500.jpg',
      conceptGrad: cmsStudy.conceptGrad ?? 'linear-gradient(135deg,#10101abb,#1a1a28bb)',
      conceptImage: cmsStudy.conceptImage ? mediaUrl(cmsStudy.conceptImage) : '/images/bg-about-company-400x500.jpg',
      frames: cmsStudy.frames ?? [],
      metrics: cmsStudy.metrics ?? [],
    };
    navStudies = allCmsStudies.map((s) => ({ slug: s.slug, client: s.client }));
  } else {
    const local = FALLBACK_STUDIES[slug] ?? FALLBACK_STUDIES['tiger-refresh'];
    study = local;
    navStudies = Object.entries(FALLBACK_STUDIES).map(([s, d]) => ({ slug: s, client: d.client }));
  }

  const titleLines = String(study.title).split('\n');
  const galIdx = navStudies.findIndex((s) => s.slug === slug);
  const prevStudy = galIdx > 0 ? navStudies[galIdx - 1] : null;
  const nextStudy = galIdx < navStudies.length - 1 ? navStudies[galIdx + 1] : null;

  return (
    <>
      {/* Hero */}
      <section className="cs-hero">
        <div className="cs-hero-visual" style={{ backgroundImage: `url(${study.heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="cs-hero-visual" style={{ position: 'absolute', inset: 0, background: study.heroGrad }} />
        <div className="cs-hero-bg" />
        <div style={{ position: 'absolute', top: 120, right: 48, width: '38%', aspectRatio: '16/9', borderRadius: 6, overflow: 'hidden', border: '1px solid rgba(255,255,255,.1)', zIndex: 2 }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${study.heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
          <div style={{ position: 'absolute', inset: 0, background: study.heroGrad }} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="hero-play" style={{ background: 'rgba(255,255,255,.15)', border: '1px solid rgba(255,255,255,.3)' }}>
              <div className="hero-play-tri" />
            </div>
          </div>
        </div>
        <div className="cs-tags">{study.tags.map((t) => <span key={t} className="cs-tag">{t}</span>)}</div>
        <h1 className="cs-title">{titleLines.map((l, i) => <span key={i}>{l}{i < titleLines.length - 1 && <br />}</span>)}</h1>
        <div className="cs-client">{study.client} × TSBI — {study.year}</div>
      </section>

      {/* Info row */}
      <div className="cs-info-row">
        <div className="cs-ic"><div className="cs-ic-label">Client</div><div className="cs-ic-val">{study.client}</div></div>
        <div className="cs-ic"><div className="cs-ic-label">Services</div><div className="cs-ic-val">{study.services}</div></div>
        <div className="cs-ic"><div className="cs-ic-label">Year</div><div className="cs-ic-val">{study.year}</div></div>
        <div className="cs-ic"><div className="cs-ic-label">Deliverables</div><div className="cs-ic-val">{study.deliverables}</div></div>
        <div className="cs-ic"><div className="cs-ic-label">Platforms</div><div className="cs-ic-val">{study.platforms}</div></div>
      </div>

      {/* Concept */}
      <div className="cs-concept">
        <div className="cs-concept-text">
          <div className="sec-label">The Concept</div>
          <h2 className="cs-concept-h2">{study.conceptTitle.split('\n').map((l, i) => <span key={i}>{l}{i === 0 && <br />}</span>)}</h2>
          <p className="cs-concept-body">{study.conceptBody}</p>
        </div>
        <div className="cs-concept-img">
          <div className="cs-concept-img-bg" style={{ backgroundImage: `url(${study.conceptImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
          <div style={{ position: 'absolute', inset: 0, background: study.conceptGrad }} />
        </div>
      </div>

      {/* Storyboard */}
      <div className="cs-frames">
        <div className="sec-label">Storyboard</div>
        <h2 className="cs-frames-h2">The Visual Story</h2>
        <div className="cs-frames-grid">
          {study.frames.map((f) => (
            <div key={f.cap} className="cs-frame">
              <div className="cs-frame-img">
                <div className="cs-frame-bg" style={{ backgroundImage: `url(${f.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <div style={{ position: 'absolute', inset: 0, background: f.grad }} />
              </div>
              <div className="cs-frame-cap">{f.cap}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Results */}
      <section className="cs-results">
        <div className="sec-label" style={{ color: 'rgba(255,255,255,.4)' }}>The Impact</div>
        <h2 className="cs-results-h2">Numbers That Moved Culture</h2>
        <div className="cs-metrics-grid">
          {study.metrics.map((m) => (
            <div key={m.label} className="cs-metric">
              <div className="cs-mval" style={{ color: m.color }}>{m.val}</div>
              <div className="cs-mlabel">{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="fcta-section" style={{ padding: '100px 48px' }}>
        <h2 className="fcta-h2" style={{ fontSize: 'clamp(28px,4vw,48px)' }}>Want Results Like These?</h2>
        <div className="fcta-actions" style={{ marginTop: 28 }}>
          <Link href="/contact" className="btn-fill" style={{ background: 'var(--magenta)' }}>Let&apos;s Build Together →</Link>
          <Link href="/case-studies" className="btn-border">All Case Studies</Link>
        </div>
      </section>

      {/* Prev / Next bar */}
      <div className="cs-nav-bar">
        <Link href={`/case-studies?at=${slug}`} className="cs-nav-btn cs-nav-prev" aria-label="Back to gallery">
          ← Back to Gallery
        </Link>
        <div className="cs-nav-center">
          {galIdx >= 0 && (
            <span className="cs-nav-counter">{String(galIdx + 1).padStart(2, '0')} / {String(navStudies.length).padStart(2, '0')}</span>
          )}
        </div>
        {nextStudy ? (
          <Link href={`/work/${nextStudy.slug}`} className="cs-nav-btn cs-nav-next">
            Next: {nextStudy.client} →
          </Link>
        ) : (
          <Link href="/case-studies" className="cs-nav-btn cs-nav-next">All Studies →</Link>
        )}
      </div>
    </>
  );
}
