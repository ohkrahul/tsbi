'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

/**
 * beeyond.agency-style intro loader. A 150%-wide row of TSBI work visuals rises
 * up and pans across the screen; then every image except the centre TSBI
 * wordmark is wiped away (clip-path collapsing to the top edge), the curtain wipes
 * up the same way, and the whole layer fades out to reveal the homepage.
 *
 * Purely time-based (~4s) — it never waits on real asset loading. Layout lives
 * in the `.loader / .loader-imgs / .img` rules in globals.css; timing lives in
 * the GSAP timeline below. Edit REEL (work visuals) or LOGO to restyle it.
 */

// 6 work visuals; the TSBI logo is injected dead-centre as the 7th cell so it
// is the one image left standing when the others wipe away. `pos` keeps the
// subject in frame when a cell crops (object-fit: cover).
const REEL: { src: string; pos?: string }[] = [
  { src: '/about%20us/webbanner%202%20msd.jpg.jpeg', pos: 'right center' },
  { src: '/about%20us/webbanner%201%20Ashish%20Vidyarthi.jpg.jpeg' },
  { src: '/about%20us/webbanner%203%20mi.jpg.jpeg' },
  { src: '/newImages/image-172-scaled-1.jpeg' },
  { src: '/about%20us/webbanner%201%20Ashish%20Vidyarthi.jpg.jpeg' },
  { src: '/about%20us/webbanner%203%20mi.jpg.jpeg' },
];

export default function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const finish = () => {
      document.body.style.overflow = '';
      setDone(true);
    };

    const ctx = gsap.context(() => {
      // Starting states: every image 500px below its slot; the whole row shoved
      // 500px to the right so it can pan back into centre.
      gsap.set('.img', { y: 500 });
      gsap.set('.loader-imgs', { x: 500 });
      gsap.set('.loader-out', { yPercent: 100 }); // white panel parked below the viewport

      const wipeUp = 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)'; // collapse to top edge

      gsap
        .timeline({ onComplete: finish, defaults: { force3D: true } })
        // 1. images fly up — expo.out lands crisply with no slow crawl at the top
        .to('.img', { y: 0, duration: 0.95, stagger: 0.055, ease: 'expo.out' })
        // 2. row glides left into centre, starts immediately with the rise
        .to('.loader-imgs', { x: 0, duration: 1.7, ease: 'expo.out' }, 0)
        // 3. wipe images away — starts as soon as the last image lands
        .to('.img:not(#loader-logo)', { clipPath: wipeUp, duration: 0.55, stagger: 0.06, ease: 'expo.in' }, '-=0.1')
        // 4. white panel sweeps up immediately after wipe — no gap
        .to('.loader-out', { yPercent: -100, duration: 0.75, ease: 'power3.inOut' }, '-=0.05')
        .set('.loader', { autoAlpha: 0 }, '-=0.38')
        .call(() => window.dispatchEvent(new Event('tsbi:intro-done')), undefined, '-=0.38');
    }, rootRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = '';
    };
  }, []);

  if (done) return null;

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
            <img src="/TSBI%20%20Logo-01.png" alt="TSBI" draggable={false} onError={hideCell} />
          </div>
          {REEL.slice(3).map(cell)}
        </div>
      </div>
      <div className="loader-out" />
    </div>
  );
}
