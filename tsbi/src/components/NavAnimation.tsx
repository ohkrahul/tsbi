'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(MotionPathPlugin);

export default function NavAnimation() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const cleanups: Array<() => void> = [];
    const q = <T extends Element>(s: string) => document.querySelector<T>(s);

    // ── Convert polyline → path for dash animation + travel dot ────────────
    const converted = MotionPathPlugin.convertToPath('.header-blue-svg polyline');
    const blueLine: SVGPathElement | null = converted[0] ?? null;
    if (blueLine) {
      const len = blueLine.getTotalLength();
      gsap.set(blueLine, { strokeDasharray: len, strokeDashoffset: len });
    }

    // ── Initial hidden states (set synchronously to prevent FOUC) ───────────
    gsap.set('.header-logo',            { opacity: 0, scale: 0.92, transformOrigin: 'left center' });
    gsap.set('.header-nav-item',        { opacity: 0, y: -5 });
    gsap.set('.header-blue-end-dot',    { opacity: 0, scale: 0,    transformOrigin: 'center center' });
    gsap.set('.header-blue-travel-dot', { opacity: 0 });

    // ── Entrance animation ───────────────────────────────────────────────────
    const run = () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.to('.header-logo',     { opacity: 1, scale: 1, duration: 0.45 }, 0);
      tl.to('.header-nav-item', { opacity: 1, y: 0, duration: 0.45, stagger: 0.08 }, 0.35);

      if (blueLine) {
        tl.to(blueLine,               { strokeDashoffset: 0, duration: 1.1, ease: 'power2.inOut' }, 0.2);
        tl.to('.header-blue-end-dot', { opacity: 1, scale: 1, duration: 0.22, ease: 'back.out(2)' }, 1.0);
      }

      // Post-entrance: end dot pulses indefinitely
      tl.add(() => {
        gsap.to('.header-blue-end-dot', {
          scale: 1.75, opacity: 0.38, duration: 1.35,
          ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: 'center center',
        });
      }, 1.4);

      // Post-entrance: tiny dot loops along the nav line
      const travelDot = q<SVGCircleElement>('.header-blue-travel-dot');
      if (travelDot && blueLine) {
        tl.add(() => {
          gsap.to(travelDot, {
            motionPath: { path: blueLine, autoRotate: false, align: blueLine },
            opacity: 0.5, duration: 6, ease: 'none', repeat: -1, delay: 0.4,
          });
        }, 1.8);
      }

      cleanups.push(() => tl.kill());
    };

    // Home page waits for the preloader's tsbi:intro-done signal.
    // Every other page fires after a very short delay (fonts + layout settle).
    let started = false;
    const startOnce = () => {
      if (started) return;
      started = true;
      clearTimeout(fallback);
      run();
    };
    // Listen for the preloader's done signal (home page) OR fall back after
    // a short delay (non-home pages, or home visited via client-side navigation
    // where the preloader doesn't re-run).
    window.addEventListener('tsbi:intro-done', startOnce, { once: true });
    const fallback = setTimeout(startOnce, 300);
    cleanups.push(() => {
      window.removeEventListener('tsbi:intro-done', startOnce);
      clearTimeout(fallback);
    });

    return () => cleanups.forEach(fn => fn());
  }, [pathname]);

  return null;
}
