import Link from 'next/link';

interface HeroStat { val: string; label: string }

const DEFAULT_STATS: HeroStat[] = [
  { val: '300+', label: 'Films' },
  { val: '150+', label: 'Brands' },
  { val: '12', label: 'Years' },
  { val: '98%', label: 'Retained' },
];

export default function HeroSection({ stats }: { stats?: HeroStat[] }) {
  const heroStats = stats?.length ? stats : DEFAULT_STATS;

  return (
    <section className="hero">
      {/* Right dark photo panel */}
      <div className="hero-bg-photo">
        <div className="hero-photo-inner">
          <div className="hero-photo-people">
            {/* Cinematic contact-sheet grid */}
            <div className="hero-visual-grid">
              <div className="hvg-frame" style={{ backgroundImage: "url('/images/banner-home2-2-400x500.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="hvg-badge">Creative</div>
              </div>
              <div className="hvg-frame" style={{ backgroundImage: "url('/images/about-company-410x410.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(45,0,64,.45)' }} />
                <svg width="100%" height="100%" viewBox="0 0 200 200" style={{ position: 'relative', zIndex: 1 }}>
                  <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(224,25,125,.5)" strokeWidth="1"/>
                  <circle cx="100" cy="100" r="38" fill="none" stroke="rgba(224,25,125,.3)" strokeWidth="1"/>
                </svg>
              </div>
              <div className="hvg-frame" style={{ backgroundImage: "url('/images/gallery-slider-02-400x500.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,16,32,.5)' }} />
                <div className="hvg-badge" style={{ position: 'relative', zIndex: 1 }}>Media</div>
              </div>
              <div className="hvg-frame" style={{ backgroundImage: "url('/images/banner-01-400x500.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,26,64,.45)' }} />
              </div>
              <div className="hvg-frame" style={{ backgroundImage: "url('/images/portfolio-popup-10-400x500.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(18,8,32,.4)' }} />
                <div className="hvg-badge" style={{ position: 'relative', zIndex: 1 }}>Film</div>
              </div>
              <div className="hvg-frame" style={{ backgroundImage: "url('/images/why-work-with-us.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,26,16,.45)' }} />
                <svg width="100%" height="100%" viewBox="0 0 200 200" style={{ opacity: .55, position: 'relative', zIndex: 1 }}>
                  <polygon points="75,55 150,100 75,145" fill="rgba(255,255,255,.7)"/>
                </svg>
              </div>
            </div>

            {/* Stats bar */}
            <div className="hero-visual-stats">
              {heroStats.map((s) => (
                <div key={s.label} className="hvs-item">
                  <span className="hvs-num">{s.val}</span>
                  <span className="hvs-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="hero-photo-overlay" />
      </div>

      {/* Left vertical section numbers */}
      <div className="hero-section-nums">
        <span className="hsn active">01</span>
        <span className="hsn">02</span>
        <span className="hsn">03</span>
        <span className="hsn">04</span>
        <span className="hsn">05</span>
        <span className="hsn">06</span>
        <span className="hsn">07</span>
      </div>

      {/* Main content */}
      <div className="hero-content reveal">
        <div className="hero-eyebrow">
          A Creative <span className="eyebrow-dot">·</span> Media <span className="eyebrow-dot">·</span> Tech Company
        </div>
        <h1 className="hero-h1">
          Ideas.<span className="story">Stories.</span><span className="systems">Systems.</span>
        </h1>
        <p className="hero-body">
          We turn small ideas into big impact through creativity, technology and culture.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/work" className="btn-fill">
            Explore Our Work <span className="arr">→</span>
          </Link>
          <Link href="/services" className="btn-border">
            Our Services
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator">
        <div className="hsi-line" />
        <span className="hsi-label">Scroll</span>
      </div>

      {/* Showreel pill */}
      <div className="hero-showreel">
        <div className="hero-play">
          <div className="hero-play-tri" />
        </div>
        <div className="hero-sr-text">
          <div className="hero-sr-title">Showreel 2025</div>
          <div className="hero-sr-sub">Play full showreel — 02:15</div>
        </div>
      </div>
    </section>
  );
}
