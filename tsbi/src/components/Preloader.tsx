'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

/**
 * Fast intro loader. A 150%-wide row of TSBI work visuals rises + pans into
 * centre, then every image except the centre TSBI wordmark wipes away and the
 * whole dark layer fades out to reveal the homepage.
 *
 * Time-based (~1.1s) — it never waits on real asset loading. Shows once per
 * browser-tab session (sessionStorage), so returning to Home is instant.
 * Layout lives in `.loader / .loader-imgs / .img` in globals.css.
 */

const REEL: { src: string; pos?: string }[] = [
  { src: '/loader/tsbi1.png ', pos: 'right center' },
  { src: '/loader/tsbi.png' },
  { src: '/loader/tsbi4.png' },
  { src: '/loader/tsbi3.png' },
  { src: '/loader/tsbi1.png ' },
  { src: '/about%20us/webbanner%203%20mi.jpg.jpeg' },
];

export default function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  // 'pending' until we decide; 'play' runs the intro; 'done' unmounts.
  const [phase, setPhase] = useState<'pending' | 'play' | 'done'>('pending');

  // Decide once on mount: skip entirely if the intro already played this session.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem('tsbi:intro-seen')) {
      // Defer to the next frame so every 'tsbi:intro-done' listener (attached in
      // its own mount effect) is registered before we fire — else they'd miss it.
      const id = requestAnimationFrame(() => window.dispatchEvent(new Event('tsbi:intro-done')));
      setPhase('done');
      return () => cancelAnimationFrame(id);
    }
    setPhase('play');
  }, []);

  // Run the GSAP intro once the loader DOM is mounted.
  useEffect(() => {
    if (phase !== 'play') return;
    document.body.style.overflow = 'hidden';
    const finish = () => {
      document.body.style.overflow = '';
      // Flag only after a real completion (not at decide-time) so React
      // StrictMode's throwaway first mount doesn't suppress the intro in dev.
      sessionStorage.setItem('tsbi:intro-seen', '1');
      setPhase('done');
    };

    const ctx = gsap.context(() => {
      gsap.set('.img', { y: 240 });
      gsap.set('.loader-imgs', { x: 240 });

      const wipeUp = 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)'; // collapse to top edge

      gsap
        .timeline({ onComplete: finish, defaults: { force3D: true } })
        // 1. images rise into place
        .to('.img', { y: 0, duration: 0.45, stagger: 0.03, ease: 'expo.out' })
        // 2. row glides into centre alongside the rise
        .to('.loader-imgs', { x: 0, duration: 0.6, ease: 'expo.out' }, 0)
        // 3. wipe every image except the centre logo
        .to('.img:not(#loader-logo)', { clipPath: wipeUp, duration: 0.28, stagger: 0.03, ease: 'expo.in' }, '-=0.12')
        // 4. fade the whole dark layer out to reveal the page
        .to('.loader', { autoAlpha: 0, duration: 0.28, ease: 'power2.inOut' }, '-=0.02')
        .call(() => window.dispatchEvent(new Event('tsbi:intro-done')), undefined, '-=0.26');
    }, rootRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = '';
    };
  }, [phase]);

  if (phase !== 'play') return null;

  // If a visual fails to load, hide just that cell — the timeline is time-based
  // and never waits on images, so the sequence still completes cleanly.
  const hideCell = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.opacity = '0';
  };

  const cell = ({ src, pos }: { src: string; pos?: string }) => (
    <div className="img" key={src}>
      <img
        src={src}
        alt=""
        draggable={false}
        onError={hideCell}
        style={pos ? { objectPosition: pos } : undefined}
      />
    </div>
  );

  return (
    <div ref={rootRef} aria-hidden="true">
      <div className="loader">
        <div className="loader-imgs">
          {REEL.slice(0, 3).map(cell)}
          <div className="img" id="loader-logo">
            <img src="/TSBIInOBG.png" alt="TSBI" draggable={false} onError={hideCell} />
          </div>
          {REEL.slice(3).map(cell)}
        </div>
      </div>
    </div>
  );
}
