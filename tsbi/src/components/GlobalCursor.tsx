'use client';

import { useEffect } from 'react';
import gsap from 'gsap';

export default function GlobalCursor() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isPointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isPointer) return;

    const cleanups: Array<() => void> = [];
    const q  = <T extends Element>(s: string) => document.querySelector<T>(s);
    const qa = <T extends Element>(s: string) => Array.from(document.querySelectorAll<T>(s));

    const dotEl  = q<HTMLElement>('.cursor-dot');
    const ringEl = q<HTMLElement>('.cursor-ring');
    if (!dotEl || !ringEl) return;

    // ── Cursor movement ───────────────────────────────────────────────────────
    gsap.set([dotEl, ringEl], { xPercent: -50, yPercent: -50 });

    const moveDotX  = gsap.quickTo(dotEl,  'x', { duration: 0.10, ease: 'power3.out' });
    const moveDotY  = gsap.quickTo(dotEl,  'y', { duration: 0.10, ease: 'power3.out' });
    const moveRingX = gsap.quickTo(ringEl, 'x', { duration: 0.38, ease: 'power3.out' });
    const moveRingY = gsap.quickTo(ringEl, 'y', { duration: 0.38, ease: 'power3.out' });

    let shown = false;
    const showCursor = () => {
      if (shown) return;
      shown = true;
      gsap.to([dotEl, ringEl], { opacity: 1, duration: 0.28 });
      document.documentElement.style.cursor = 'none';
    };
    const hideCursor = () => {
      shown = false;
      gsap.to([dotEl, ringEl], { opacity: 0, duration: 0.4 });
      document.documentElement.style.cursor = '';
    };

    const onMove = (e: MouseEvent) => {
      showCursor();
      moveDotX(e.clientX); moveDotY(e.clientY);
      moveRingX(e.clientX); moveRingY(e.clientY);
    };

    document.addEventListener('mousemove',  onMove,       { passive: true });
    document.addEventListener('mouseenter', showCursor);
    document.addEventListener('mouseleave', hideCursor);
    cleanups.push(() => {
      document.removeEventListener('mousemove',  onMove);
      document.removeEventListener('mouseenter', showCursor);
      document.removeEventListener('mouseleave', hideCursor);
      document.documentElement.style.cursor = '';
    });

    // ── Nav hover: ring shrinks + turns pink ──────────────────────────────────
    qa<HTMLElement>('.header-nav-item').forEach(item => {
      const enter = () => gsap.to(ringEl, { width: 24, height: 24, borderColor: '#e0197d', duration: 0.2 });
      const leave = () => gsap.to(ringEl, { width: 34, height: 34, borderColor: '#8ecbf0', duration: 0.3 });
      item.addEventListener('mouseenter', enter);
      item.addEventListener('mouseleave', leave);
      cleanups.push(() => {
        item.removeEventListener('mouseenter', enter);
        item.removeEventListener('mouseleave', leave);
      });
    });

    return () => cleanups.forEach(fn => fn());
  }, []);

  return (
    <>
      <div
        className="cursor-ring pointer-events-none fixed left-0 top-0 z-[9998] h-[34px] w-[34px] rounded-full border border-[#8ecbf0] opacity-0"
        style={{ willChange: 'transform' }}
        aria-hidden
      />
      <div
        className="cursor-dot pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full opacity-0"
        style={{ willChange: 'transform', background: 'var(--magenta)' }}
        aria-hidden
      />
    </>
  );
}
