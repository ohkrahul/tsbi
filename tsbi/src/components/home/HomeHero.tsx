'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

// Full-bleed hero banner slider. Each slide is one full-cover image with a
// left-to-right dark gradient so the headline stays legible over the artwork.
// Auto-advances every 6s (disabled under prefers-reduced-motion); dots jump.
const SLIDES = [
  { src: '/about%20us/webbanner%201%20Ashish%20Vidyarthi.jpg.jpeg', alt: 'Ashish Vidyarthi' },
  { src: '/about%20us/webbanner%202%20msd.jpg.jpeg', alt: 'MS Dhoni' },
  { src: '/about%20us/webbanner%203%20mi.jpg.jpeg', alt: 'Mumbai Indians' },
];

const INTERVAL = 6000;

export default function HomeHero() {
  const [active, setActive] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || SLIDES.length < 2) return;

    timer.current = setInterval(() => {
      setActive((i) => (i + 1) % SLIDES.length);
    }, INTERVAL);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  const go = (i: number) => {
    setActive(i);
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = setInterval(() => {
        setActive((p) => (p + 1) % SLIDES.length);
      }, INTERVAL);
    }
  };

  return (
    <section className="hh-root" aria-label="TSBI hero">
      {SLIDES.map((s, i) => (
        <div key={s.src} className={`hh-slide${i === active ? ' active' : ''}`} aria-hidden={i !== active}>
          <Image
            src={s.src}
            alt={s.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
      ))}

      <div className="hh-overlay" />

      <div className="hh-content">
        <h1 className="hh-title">
          From Screens to Stadiums.
          <br />
          We Make <span className="accent">Brands</span>
          <br />
          <span className="accent">Unmissable.</span>
        </h1>
        <p className="hh-sub">
          A full-service digital marketing agency helping brands grow through content, culture, and creativity.
        </p>
      </div>

      {/* bottom-left diagonal notch accent */}
      <svg className="hh-notch" viewBox="0 0 120 60" fill="none" aria-hidden>
        <path d="M0 60 L60 60 L120 0" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
      </svg>

      <div className="hh-dots" role="tablist" aria-label="Hero slides">
        {SLIDES.map((s, i) => (
          <button
            key={s.src}
            className={`hh-dot${i === active ? ' active' : ''}`}
            aria-label={`Go to slide ${i + 1}`}
            aria-selected={i === active}
            onClick={() => go(i)}
          />
        ))}
      </div>
    </section>
  );
}
