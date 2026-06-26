'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { caseStudies, CaseStudyGalleryItem } from '@/lib/caseStudies';

const FEATURED = caseStudies.filter((c) => c.order <= 6);
const INTERVAL = 5000;
const FADE_MS = 350;

export default function CaseStudyCarousel() {
  const [active, setActive] = useState(0);
  // fading drives opacity via a CSS class — no extra re-render cost
  const textRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (next: number) => {
    if (!textRef.current) { setActive(next); return; }
    textRef.current.style.opacity = '0';
    setTimeout(() => {
      setActive(next);
      if (textRef.current) textRef.current.style.opacity = '1';
    }, FADE_MS);
  };

  // restart the auto-cycle timer (called on manual dot click too)
  const restart = (next: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    goTo(next);
    timerRef.current = setInterval(() => {
      setActive(prev => {
        const n = (prev + 1) % FEATURED.length;
        if (textRef.current) {
          textRef.current.style.opacity = '0';
          setTimeout(() => {
            if (textRef.current) textRef.current.style.opacity = '1';
          }, FADE_MS);
        }
        return n;
      });
    }, INTERVAL);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActive(prev => {
        const n = (prev + 1) % FEATURED.length;
        if (textRef.current) {
          textRef.current.style.opacity = '0';
          setTimeout(() => {
            if (textRef.current) textRef.current.style.opacity = '1';
          }, FADE_MS);
        }
        return n;
      });
    }, INTERVAL);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const cs = FEATURED[active];

  return (
    <section className="csc-root" aria-label="Featured case studies">
      <div className="csc-inner">
        {/* ── poster stack ── */}
        <div className="csc-visual">
          {/* two static overlapping orbit rings — matches design reference */}
          <svg className="csc-orbit" viewBox="0 0 260 200" fill="none" aria-hidden>
            <ellipse cx="130" cy="100" rx="118" ry="84"
              stroke="var(--magenta)" strokeOpacity="0.45" strokeWidth="1.3" />
            <ellipse cx="130" cy="100" rx="108" ry="76"
              stroke="var(--electric)" strokeOpacity="0.35" strokeWidth="1.3" />
            {/* magenta dot — top-right arc, exactly on outer ellipse */}
            <circle cx="160" cy="17" r="5.5" fill="var(--magenta)" />
            {/* blue dot — top-center arc, exactly on inner ellipse */}
            <circle cx="120" cy="24" r="5" fill="var(--electric)" />
          </svg>
          <div className="csc-stack">
            {FEATURED.map((item, i) => {
              const offset = (i - active + FEATURED.length) % FEATURED.length;
              const cls =
                offset === 0 ? 'csc-poster csc-poster-front' :
                offset === 1 ? 'csc-poster csc-poster-back-a' :
                offset === 2 ? 'csc-poster csc-poster-back-b' : 'csc-poster csc-poster-hidden';
              return (
                <div key={item.slug} className={cls}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={item.title} className="absolute inset-0 h-full w-full object-cover" />
                </div>
              );
            })}
          </div>
        </div>

        {/* ── text ── */}
        <div ref={textRef} className="csc-text" style={{ transition: `opacity ${FADE_MS}ms ease` }}>
          <p className="csc-kicker">{cs.clientName}</p>
          <h2 className="csc-h2">{cs.title}</h2>
          <p className="csc-body">{cs.shortDescription}</p>
          <Link href={`/case-studies/${cs.slug}`} className="btn-border csc-cta">
            View Case Study <span className="arr">→</span>
          </Link>
        </div>
      </div>

      {/* ── stats + dots ── */}
      <div className="csc-stats">
        <div className="csc-stat">
          <span className="csc-stat-val">{cs.year}</span>
          <span className="csc-stat-label">Year</span>
        </div>
        <div className="csc-stat">
          <span className="csc-stat-val">{cs.services.length}+</span>
          <span className="csc-stat-label">Services Delivered</span>
        </div>
        <div className="csc-stat" style={{ borderRight: 'none' }}>
          <span className="csc-stat-val" style={{ fontSize: 'clamp(14px,1.4vw,20px)', lineHeight: '1.2' }}>
            {cs.category.split(' · ')[0]}
          </span>
          <span className="csc-stat-label">Category</span>
        </div>
        <div className="csc-dots">
          {FEATURED.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to case study ${i + 1}`}
              onClick={() => restart(i)}
              className={`csc-dot${i === active ? ' active' : ''}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
