'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

interface HeroStat { val: string; label: string }
interface HeroContent {
  h1?: React.ReactNode;
  body?: string;
  cta1?: { label: string; href: string };
  cta2?: { label: string; href: string };
}

const DEFAULT_STATS: HeroStat[] = [
  { val: '300+', label: 'Films' },
  { val: '150+', label: 'Brands' },
  { val: '12', label: 'Years' },
  { val: '98%', label: 'Retained' },
];

export default function HeroSection({ stats, content }: { stats?: HeroStat[]; content?: HeroContent }) {
  const heroStats = stats?.length ? stats : DEFAULT_STATS;
  const h1Node = content?.h1 ?? (
    <>Ideas.<span className="story">Stories.</span><span className="systems">Systems.</span></>
  );
  const bodyText = content?.body ?? 'We turn small ideas into big impact through creativity, technology and culture.';
  const cta1 = content?.cta1 ?? { label: 'Explore Our Work', href: '/case-studies' };
  const cta2 = content?.cta2 ?? { label: 'Our Services', href: '/services' };

  const sectionRef = useRef<HTMLElement>(null);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const m = () => setIsMobile(window.innerWidth < 860);
    m();
    window.addEventListener('resize', m);
    return () => window.removeEventListener('resize', m);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const root = sectionRef.current;
    if (!root) return;

    let split: ReturnType<typeof SplitText.create> | null = null;
    let tl: gsap.core.Timeline | null = null;
    let extraCleanup: (() => void) | null = null;

    const run = () => {
      const photo  = root.querySelector<HTMLElement>('.hero-bg-photo');
      const h1El   = root.querySelector<HTMLElement>('.hero-h1');
      const bodyEl = root.querySelector<HTMLElement>('.hero-body');
      const btnsEl = root.querySelector<HTMLElement>('.hero-btns');

      // Initial hidden states
      if (photo)  gsap.set(photo,  { clipPath: 'inset(0 0 100% 0)', scale: 1.08, transformOrigin: 'center center' });
      if (bodyEl) gsap.set(bodyEl, { opacity: 0, y: 14 });
      if (btnsEl) gsap.set(btnsEl, { opacity: 0, y: 10 });

      if (h1El) {
        split = SplitText.create(h1El, { type: 'words' });
        gsap.set(split.words, { y: 36, opacity: 0 });
      }

      tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Image wipe from top
      if (photo) tl.to(photo, { clipPath: 'inset(0 0 0% 0)', scale: 1, duration: 1.1 }, 0);

      // H1 word stagger
      if (split?.words.length) tl.to(split.words, { y: 0, opacity: 1, duration: 0.65, stagger: 0.06 }, 0.45);

      // Body + buttons
      if (bodyEl) tl.to(bodyEl, { opacity: 1, y: 0, duration: 0.5 }, 0.9);
      if (btnsEl) tl.to(btnsEl, { opacity: 1, y: 0, duration: 0.4 }, 1.05);

      // Magnetic text pull — same as home hero
      if (split?.words.length && root) {
        const ringEl = document.querySelector<HTMLElement>('.cursor-ring');
        const onMove = (e: MouseEvent) => {
          split!.words.forEach((word) => {
            const el = word as HTMLElement;
            const rect = el.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top  + rect.height / 2;
            const dx = e.clientX - cx;
            const dy = e.clientY - cy;
            const dist = Math.hypot(dx, dy);
            if (dist < 1) return;
            const pull = dist < 230 ? (1 - dist / 230) * 7 : 0;
            gsap.to(el, {
              x: pull > 0 ? (dx / dist) * pull : 0,
              y: pull > 0 ? (dy / dist) * pull * 0.5 : 0,
              duration: pull > 0 ? 0.35 : 0.5,
              ease: pull > 0 ? 'power2.out' : 'power3.out',
              overwrite: 'auto',
            });
          });
          if (ringEl) gsap.to(ringEl, { width: 44, height: 44, borderColor: '#e0197d', duration: 0.25 });
        };
        const onLeave = () => {
          split!.words.forEach((word) =>
            gsap.to(word as HTMLElement, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1,0.4)', overwrite: 'auto' }),
          );
          if (ringEl) gsap.to(ringEl, { width: 34, height: 34, borderColor: '#8ecbf0', duration: 0.4 });
        };
        root.addEventListener('mousemove',  onMove,  { passive: true });
        root.addEventListener('mouseleave', onLeave);
        extraCleanup = () => {
          root.removeEventListener('mousemove',  onMove);
          root.removeEventListener('mouseleave', onLeave);
        };
      }
    };

    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
    (fonts?.ready ?? Promise.resolve()).then(run);

    return () => {
      split?.revert();
      tl?.kill();
      extraCleanup?.();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
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
            <div className="hero-single-image" style={{ backgroundImage: "url('/about us/IMG_2081.webp')", backgroundSize: 'contain', backgroundPosition: 'left' }} />

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

      <div className="hero-section-nums" />

      {/* Main content */}
      <div
        className="hero-content"
        style={isMobile ? { order: 1, maxWidth: 'none', padding: 0 } : undefined}
      >
        <h1 className="hero-h1">
          {h1Node}
        </h1>
        <p className="hero-body">
          {bodyText}
        </p>
        <div className="hero-btns" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href={cta1.href} className="btn-fill">
            {cta1.label} <span className="arr">→</span>
          </Link>
          <Link href={cta2.href} className="btn-border">
            {cta2.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
