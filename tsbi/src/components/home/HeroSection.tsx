'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface HeroStat { val: string; label: string }

const DEFAULT_STATS: HeroStat[] = [
  { val: '300+', label: 'Films' },
  { val: '150+', label: 'Brands' },
  { val: '12', label: 'Years' },
  { val: '98%', label: 'Retained' },
];

export default function HeroSection({ stats }: { stats?: HeroStat[] }) {
  const heroStats = stats?.length ? stats : DEFAULT_STATS;

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const m = () => setIsMobile(window.innerWidth < 860);
    m();
    window.addEventListener('resize', m);
    return () => window.removeEventListener('resize', m);
  }, []);

  return (
    <section
      className="hero"
      style={isMobile ? { flexDirection: 'column', alignItems: 'stretch', minHeight: 'auto', padding: '100px 20px 44px' } : undefined}
    >
      {/* Right dark photo panel */}
      <div
        className="hero-bg-photo"
        style={isMobile ? { display: 'block', position: 'relative', inset: 'auto', width: '100%', height: 300, borderRadius: 16, marginTop: 26, overflow: 'hidden', order: 2 } : undefined}
      >
        <div className="hero-photo-inner">
          <div className="hero-photo-people">
            {/* Single hero image */}
            <div className="hero-single-image" style={{ backgroundImage: "url('/about us/IMG_2081.webp')", backgroundSize: 'cover', backgroundPosition: 'center' }} />

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

      </div>


      <div className="hero-section-nums">

      </div>

      {/* Main content */}
      <div
        className="hero-content reveal"
        style={isMobile ? { order: 1, maxWidth: 'none', padding: 0 } : undefined}
      >
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
          <Link href="/case-studies" className="btn-fill">
            Explore Our Work <span className="arr">→</span>
          </Link>
          <Link href="/services" className="btn-border">
            Our Services
          </Link>
        </div>
      </div>




    </section>
  );
}
