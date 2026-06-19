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
  { src: '/about us/webbanner 2 msd.jpg.jpeg', pos: 'right center' },   // MS Dhoni — sport
  { src: '/about us/webbanner 1 Ashish Vidyarthi.jpg.jpeg' },           // film / celebrity
  { src: '/about us/webbanner 3 mi.jpg.jpeg' },                         // cricket — sport
  { src: '/newImages/image-172-scaled-1.jpeg' },                        // team / brand energy
  { src: 'https://img.youtube.com/vi/37CCZAHaYx8/hqdefault.jpg' },      // brand film — production
  { src: 'https://img.youtube.com/vi/4D4H43PBEEo/hqdefault.jpg' },      // campaign film — digital
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
        .timeline({ onComplete: finish })
        // 1. images (and the centre logo) rise into place, one after another
        .to('.img', { y: 0, duration: 1.1, stagger: 0.04, ease: 'power3.inOut' })
        // 2. the 150%-wide row glides left into centre (overlaps step 1)
        .to('.loader-imgs', { x: 0, duration: 1.9, ease: 'power3.inOut' }, '-=1.6')
        // 3. every image wipes away top-to-bottom around the logo, staggered
        .to('.img:not(#loader-logo)', { clipPath: wipeUp, duration: 0.7, stagger: 0.07, ease: 'power3.inOut' }, '-=0.7')
        // 4. ONE white panel sweeps up through the screen — covers the logo, then
        //    continues off the top, revealing the homepage in a single pass.
        .addLabel('sweep', '+=0.05')
        .to('.loader-out', { yPercent: -100, duration: 0.85, ease: 'power2.inOut' }, 'sweep')
        // at mid-sweep the panel fully covers the screen: drop the black reel layer
        // and cue the hero so the trailing edge uncovers the page, not black.
        .set('.loader', { autoAlpha: 0 }, 'sweep+=0.42')
        .call(() => window.dispatchEvent(new Event('tsbi:intro-done')), undefined, 'sweep+=0.42');
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
      {/* light panel that sweeps up to close out the intro (beeyond-style) */}
      {/* <div className="loader-out" /> */}
    </div>
  );
}
