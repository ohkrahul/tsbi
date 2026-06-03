'use client';
import { useState } from 'react';
import type { CaseStudyGalleryItem } from '@/lib/caseStudies';

interface Props {
  studies: CaseStudyGalleryItem[];
  onNavigate: (slug: string) => void;
}

export default function CaseStudyFallbackCarousel({ studies, onNavigate }: Props) {
  const [active, setActive] = useState(0);

  const go = (i: number) => setActive(Math.max(0, Math.min(studies.length - 1, i)));
  const current = studies[active];

  return (
    <div className="cs-fallback">
      <div className="cs-fallback-label">Case Studies</div>
      <div className="cs-fallback-track-wrap">
        <div className="cs-fallback-track" style={{ transform: `translateX(calc(-${active * 100}% - ${active * 24}px))` }}>
          {studies.map((s, i) => {
            return (
              <div
                key={s.id}
                className={`cs-fallback-item${i === active ? ' active' : ''}`}
                onClick={() => i === active ? onNavigate(s.slug) : go(i)}
              >
                <div className="cs-fallback-thumb" style={{ backgroundImage: `url(${s.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                  <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top,${s.gradTo}ee 0%,${s.gradFrom}55 100%)` }} />
                </div>
                <div className="cs-fallback-info">
                  <div className="cs-fallback-name">{s.clientName}</div>
                  <div className="cs-fallback-cat">{s.category}</div>
                  {i === active && <div className="cs-fallback-cta">View Case Study →</div>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="cs-world-arrows" style={{ position: 'static', transform: 'none', marginTop: 32 }}>
        <button className="cs-world-arrow" onClick={() => go(active - 1)} disabled={active === 0}>←</button>
        <div className="cs-world-dots">
          {studies.map((_, i) => (
            <button key={i} className={`cs-world-dot${i === active ? ' active' : ''}`} onClick={() => go(i)} />
          ))}
        </div>
        <button className="cs-world-arrow" onClick={() => go(active + 1)} disabled={active === studies.length - 1}>→</button>
      </div>
    </div>
  );
}
