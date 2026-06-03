'use client';

import { useRef } from 'react';
import Link from 'next/link';

const stories = [
  { client: "L'Oréal Paris", title: 'Glycolic Bright Launch Campaign', tags: ['Campaign', 'Influencer'], img: '/images/banner-home2-2-400x500.jpg', overlay: 'rgba(26,15,0,.55)', hasVideo: true, slug: 'loreal-glycolic' },
  { client: 'OnePlus', title: 'Never Settle Global Campaign', tags: ['Film', 'Global'], img: '/images/banner-01-400x500.jpg', overlay: 'rgba(10,10,32,.6)', hasVideo: false, slug: 'oneplus-never-settle' },
  { client: 'Tiger Beer', title: 'Refresh Your Vibes', tags: ['Social', 'Film'], img: '/images/banner-home3-1-400x500.jpg', overlay: 'rgba(32,13,0,.55)', hasVideo: true, slug: 'tiger-refresh' },
  { client: 'Dior', title: 'Summer Collection Film', tags: ['Film'], img: '/images/bg-about-company-400x500.jpg', overlay: 'rgba(16,16,26,.6)', hasVideo: false, slug: 'dior-summer' },
  { client: 'Saigon Chronicles', title: 'Social Series — 12 Episodes', tags: ['Social', 'Series'], img: '/images/portfolio-popup-12-400x500.jpg', overlay: 'rgba(5,21,16,.55)', hasVideo: true, slug: 'saigon-chronicles' },
];

export default function StoriesSection() {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    rowRef.current?.scrollBy({ left: dir * 300, behavior: 'smooth' });
  };

  return (
    <section className="stories-section">
      <div className="stories-watermark">STORIES</div>

      <div className="stories-top reveal">
        <div>
          <div className="sec-label" style={{ color: 'rgba(255,255,255,.6)' }}>
            <span className="num" style={{ color: 'rgba(255,255,255,.3)' }}>05</span> Stories
          </div>
          <h2 className="stories-h2">Work we're<br/>proud of.</h2>
        </div>
        <p className="stories-desc">
          Work we're proud of. Partners we grow with. Impact we create.
        </p>
      </div>

      <div className="stories-row" ref={rowRef}>
        {stories.map((s) => (
          <Link key={s.slug} href={`/work/${s.slug}`} className="sc">
            <div className="sc-inner">
              <div className="sc-bg" style={{ backgroundImage: `url(${s.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <div style={{ position: 'absolute', inset: 0, background: s.overlay }} />
              <div className="sc-overlay" />
              {s.hasVideo && (
                <div className="sc-play"><div className="sc-play-tri" /></div>
              )}
              <div className="sc-info">
                <div className="sc-client">{s.client}</div>
                <div className="sc-title">{s.title}</div>
                <div className="sc-tags">
                  {s.tags.map((t) => <span key={t} className="sc-tag">{t}</span>)}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="stories-nav">
        <button className="s-nav-btn" onClick={() => scroll(-1)} aria-label="Previous">←</button>
        <button className="s-nav-btn" onClick={() => scroll(1)} aria-label="Next">→</button>
      </div>

      <div style={{ marginTop: 36, textAlign: 'center' }}>
        <Link href="/work" className="btn-fill" style={{ background: '#fff', color: 'var(--ink)' }}>
          View All Stories →
        </Link>
      </div>
    </section>
  );
}
