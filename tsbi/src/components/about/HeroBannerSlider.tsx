'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

const SLIDES = [
  { src: '/about us/webbanner 1 Ashish Vidyarthi.jpg.jpeg', alt: 'TSBI × Ashish Vidyarthi' },
  { src: '/about us/webbanner 2 msd.jpg.jpeg',              alt: 'TSBI × MS Dhoni'         },
  { src: '/about us/webbanner 3 mi.jpg.jpeg',               alt: 'TSBI × Mumbai Indians'   },
];

const INTERVAL = 4500;

export default function HeroBannerSlider() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev]       = useState<number | null>(null);
  const [dir, setDir]         = useState<1 | -1>(1);
  const [paused, setPaused]   = useState(false);

  const goto = useCallback((idx: number, direction: 1 | -1 = 1) => {
    setPrev(current);
    setDir(direction);
    setCurrent(idx);
  }, [current]);

  const next = useCallback(() => goto((current + 1) % SLIDES.length, 1),  [current, goto]);
  const prev_ = useCallback(() => goto((current - 1 + SLIDES.length) % SLIDES.length, -1), [current, goto]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, INTERVAL);
    return () => clearInterval(t);
  }, [next, paused]);

  /* clear prev after transition */
  useEffect(() => {
    const t = setTimeout(() => setPrev(null), 700);
    return () => clearTimeout(t);
  }, [current]);

  return (
    <div
      className="hbs-root"
      
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      {SLIDES.map((s, i) => (
        <div
          key={i}
          className={`hbs-slide ${i === current ? 'active' : i === prev ? 'leaving' : ''}`}
        >
          <Image
            src={s.src}
            alt={s.alt}
            fill
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority={i === 0}
          />
          {/* gradient overlays */}
          <div className="hbs-grad-bottom" />
          <div className="hbs-grad-top" />
        </div>
      ))}

      {/* Headline overlay */}
      <div className="hbs-content">
        <div className="hbs-eyebrow">Our Story</div>
        <h1 className="hbs-h1">
          We Don&apos;t Just<br />Make Content.<br />
          We <em>Move Culture.</em>
        </h1>
      </div>

      {/* Arrows */}
      <button className="hbs-arrow hbs-arrow-left"  onClick={prev_} aria-label="Previous">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M13 4l-6 6 6 6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <button className="hbs-arrow hbs-arrow-right" onClick={next}  aria-label="Next">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M7 4l6 6-6 6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Dots */}
      <div className="hbs-dots">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`hbs-dot ${i === current ? 'active' : ''}`}
            onClick={() => goto(i, i > current ? 1 : -1)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="hbs-progress-bar">
        <div
          key={current}
          className="hbs-progress-fill"
          style={{ animationDuration: `${INTERVAL}ms`, animationPlayState: paused ? 'paused' : 'running' }}
        />
      </div>
    </div>
  );
}
