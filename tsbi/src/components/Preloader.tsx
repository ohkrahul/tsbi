'use client';

import { useEffect, useState } from 'react';

const FLASH_ITEMS = [
  { img: '/images/banner-home2-2-400x500.jpg',       overlay: 'rgba(224,25,125,.38)' },
  { img: '/images/bg-about-company-400x500.jpg',     overlay: 'rgba(13,21,40,.50)' },
  { img: '/images/banner-01-400x500.jpg',            overlay: 'rgba(255,76,12,.30)' },
  { img: '/images/portfolio-popup-10-400x500.jpg',   overlay: 'rgba(26,106,255,.38)' },
  { img: '/images/banner-home3-1-400x500.jpg',       overlay: 'rgba(10,10,10,.30)' },
  { img: '/images/portfolio-popup-12-400x500.jpg',   overlay: 'rgba(224,25,125,.30)' },
  { img: '/images/gallery-slider-02-400x500.jpg',    overlay: 'rgba(255,76,12,.20)' },
  { img: '/images/banner-home2-400x500.jpg',         overlay: 'rgba(26,106,255,.38)' },
  { img: '/images/bg-home1-counter-400x500.jpg',     overlay: 'rgba(13,21,40,.45)' },
  { img: '/images/career-detail-01-400x500.jpg',     overlay: 'rgba(224,25,125,.32)' },
];

export default function Preloader() {
  const [flashShown, setFlashShown] = useState<number[]>([]);
  const [centerShow, setCenterShow] = useState(false);
  const [gone, setGone] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    FLASH_ITEMS.forEach((_, i) => {
      setTimeout(() => setFlashShown((prev) => [...prev, i]), i * 350);
    });

    setTimeout(() => setCenterShow(true), 1800);
    setTimeout(() => setGone(true), 3600);
    setTimeout(() => {
      setHidden(true);
      document.body.style.overflow = '';
    }, 4500);

    return () => { document.body.style.overflow = ''; };
  }, []);

  if (hidden) return null;

  return (
    <div id="pre" className={gone ? 'gone' : ''}>
      <div className="pre-flash">
        {FLASH_ITEMS.map((item, i) => (
          <div key={i} className={`pf${flashShown.includes(i) ? ' show' : ''}`}>
            <div className="pf-inner" style={{
              backgroundImage: `url(${item.img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }} />
            <div style={{ position: 'absolute', inset: 0, background: item.overlay }} />
            <div className="pf-line" />
          </div>
        ))}
      </div>

      <div className="pre-veil" style={{ opacity: centerShow ? 0.95 : 0 }} />

      <div className={`pre-center${centerShow ? ' show' : ''}`}>
        {/* Large stacked ts/bi wordmark */}
        <div className="pre-logo-stack">
          <span className="pre-logo-ts">ts</span>
          <span className="pre-logo-bi">bi</span>
        </div>
        <p className="pre-line1">The Small Big Idea</p>
        <p className="pre-line2">Strategic Creative Agency</p>
      </div>

      <div className="pre-bar">
        <div className="pre-bar-track">
          <div className="pre-bar-fill" />
        </div>
      </div>
    </div>
  );
}
