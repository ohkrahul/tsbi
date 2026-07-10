'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

export default function HeroAnimation() {

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger, SplitText);

    const cleanups: Array<() => void> = [];
    let splitRef: InstanceType<typeof SplitText> | null = null;
    const q  = <T extends Element>(sel: string) => document.querySelector<T>(sel);
    const qa = <T extends Element>(sel: string) => Array.from(document.querySelectorAll<T>(sel));

    // Only activate pointer-specific features (cursor, particles) on true pointer devices.
    const isPointerDevice = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    // The pink connector reveals LEFT→RIGHT *spatially* via a clip-path on the
    // .lm-connector wrapper — NOT via stroke-dash. stroke-dash reveals by path
    // length, and this path's last segment is the top-right portion, so a partial
    // dash would expose the right side too early. The line itself is fully drawn.
    const pinkPoly = q<SVGPolylineElement>('.hero-pink-svg polyline');
    const pinkConnector = q<HTMLElement>('.lm-connector');
    if (pinkPoly) {
      gsap.set(pinkPoly, { strokeDasharray: 'none', strokeDashoffset: 0 });
    }
    if (pinkConnector) {
      // resting state: only the LEFT HALF of the connector is visible
      gsap.set(pinkConnector, { clipPath: 'inset(0 50% 0 0)' });
    }

    // ── Initial states ─────────────────────────────────────────────────────
    // Don't clip-hide the hero image — it's the LCP on the real network. Keeping
    // it visible from first paint (subtle zoom only) means the largest paint no
    // longer waits on hydration/JS (fixes the ~10s mobile LCP on deploy).
    gsap.set('.hero-image',             { scale: 1.06 });
    gsap.set('.hero-subtitle',          { opacity: 0, y: 12 });
    gsap.set('.hero-cta',               { opacity: 0, y: 8 });
    gsap.set('.hero-slider-dot',        { opacity: 0, scale: 0.6 });
    gsap.set('.hero-pink-start-node',   { opacity: 0 });
    gsap.set('.hero-pink-mid-node',     { opacity: 0, scale: 1, svgOrigin: '490 40' });
    gsap.set('.hero-pink-end-node',     { opacity: 0 });

    // ── Below-hero section initial states (revealed on scroll after preloader) ─
    gsap.set('.lm-marquee', { opacity: 0, y: 30 });
    gsap.set('.bts-text',   { opacity: 0, x: -40 });
    gsap.set('.bts-card',   { opacity: 0, y: 32, scale: 0.96 });
    // Movie connect section — strip + track are shown immediately (no entrance
    // reveal); only the small dot accent animates in. The carousel already runs.
    gsap.set('.movie-connect-dot', { y: -30, opacity: 0, scale: 0.7 });
    gsap.set('.connect-text-block', { opacity: 0 });
    gsap.set('.connect-cta',       { opacity: 0, y: 12 });
    // Case study section — hidden before scroll (GSAP-driven, replays on re-entry)
    gsap.set('.csc-visual', { opacity: 0, x: -40 });
    gsap.set('.csc-stats',  { opacity: 0, y: 26 });
    // Big impact CTA — hidden before scroll
    gsap.set('.bic-center',  { opacity: 0 });
    gsap.set('.bic-content', { opacity: 0, y: 24 });
    gsap.set('.bic-cta',     { opacity: 0, y: 12 });

    // ── Main timeline (runs after fonts are ready) ─────────────────────────
    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
    const run = () => {
      // Split the headline for the pink scale-pop, but DON'T hide the words —
      // the headline is the LCP element and is server-rendered, so keeping it
      // visible from first paint makes LCP == FCP (big mobile perf win).
      const titleEl = q<HTMLElement>('.hero-title');
      let split: InstanceType<typeof SplitText> | null = null;
      if (titleEl) {
        split = SplitText.create(titleEl, { type: 'words' });
        splitRef = split;
        cleanups.push(() => split?.revert());
      }

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // NOTE: the hero image (also LCP-adjacent) is revealed immediately in
      // startOnce so the largest paint never waits on fonts.ready. The headline
      // stays visible; we only add a subtle scale-pop on the pink accent (no
      // opacity hide → no LCP penalty) plus the subtitle/CTA fades.
      tl.fromTo('.hero-title .pink',
        { scale: 0.92 },
        { scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.4)' },
        0.15,
      );

      // Subtitle + CTA
      tl.to('.hero-subtitle', { opacity: 1, y: 0, duration: 0.5 }, 0.35);
      tl.to('.hero-cta',      { opacity: 1, y: 0, duration: 0.4 }, 0.5);

      // NOTE: the pink connector line is drawn on SCROLL (scroll-scrubbed timeline set
      // up further below) so it progressively connects to its end node as the user
      // scrolls from the hero into the logo section — it is no longer drawn on load.

      // Slider dots
      tl.to('.hero-slider-dot', { opacity: 1, scale: 1, duration: 0.3, stagger: 0.08 }, 0.75);

      // Pink word glow on hover — activates after words have all appeared (~t=2.6)
      if (isPointerDevice) {
        tl.add(() => {
          document.querySelectorAll<HTMLElement>('.hero-title .pink').forEach(pw => {
            const enter = () => gsap.to(pw, { filter: 'brightness(1.35)', scale: 1.07, duration: 0.22, ease: 'power2.out' });
            const leave = () => gsap.to(pw, { filter: 'brightness(1)', scale: 1, duration: 0.38, ease: 'power2.out' });
            pw.addEventListener('mouseenter', enter);
            pw.addEventListener('mouseleave', leave);
            cleanups.push(() => {
              pw.removeEventListener('mouseenter', enter);
              pw.removeEventListener('mouseleave', leave);
            });
          });
        }, 2.6);
      }

      cleanups.push(() => tl.kill());

      // ── Pink connector: LEFT→RIGHT spatial reveal via clip-path ─────────────
      // The reveal is spatial (by screen position), so only the left half shows at
      // rest and it opens rightward on scroll — the right-hand segment can never
      // appear early the way a stroke-dash (path-length) reveal would let it.
      if (pinkConnector && pinkPoly) {
        // resting state: left half visible, start + mid nodes on, end node hidden
        gsap.set(pinkConnector, { clipPath: 'inset(0 50% 0 0)' });
        gsap.set(['.hero-pink-start-node', '.hero-pink-mid-node'], { opacity: 1 });
        gsap.set('.hero-pink-end-node', { opacity: 0 });

        const pinkTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',      // page at rest → left half visible
            end: 'bottom 30%',     // hero scrolled most of the way up → fully revealed
            scrub: 1,
          },
        });
        pinkTl
          // open the clip left → right as the user scrolls
          .to(pinkConnector, { clipPath: 'inset(0 0% 0 0)', ease: 'none', duration: 1 }, 0)
          // the right-side end node lights up as the clip reaches it
          .to('.hero-pink-end-node', { opacity: 1, ease: 'none', duration: 0.12 }, 0.85);

        // Gentle continuous pulse on the nodes (scale only).
        const midPulse = gsap.to('.hero-pink-mid-node', {
          scale: 1.6, duration: 1.4, ease: 'sine.inOut', repeat: -1, yoyo: true, svgOrigin: '490 40',
        });
        const endPulse = gsap.to('.hero-pink-end-node', {
          scale: 1.5, duration: 1.15, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: 'center center',
        });
        cleanups.push(() => { pinkTl.scrollTrigger?.kill(); pinkTl.kill(); midPulse.kill(); endPulse.kill(); });
      }

      // Scroll transition: hero → logo section
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
      scrollTl
        .to('.hero-image', { scale: 1.04, ease: 'none' }, 0)
        .to('.hero-copy',  { y: -28, opacity: 0.82, ease: 'none' }, 0);

      // ── Section scroll reveals ────────────────────────────────────────────
      // Helper: build a paused fromTo tween driven by ScrollTrigger's onToggle.
      // Using self.isActive means it plays in whenever the section is inside the
      // [start,end] zone — reached scrolling DOWN or UP — and resets to hidden
      // whenever it leaves, with no state-machine gaps. "Replays every time."
      const mkReveal = (
        sel: string,
        fromVars: gsap.TweenVars,
        toVars: gsap.TweenVars,
        triggerSel: string,
        start = 'top 82%',
        end = 'bottom 15%',
      ) => {
        if (!q(sel)) return;
        const tween = gsap.fromTo(sel, fromVars, { ...toVars, paused: true });
        ScrollTrigger.create({
          trigger: triggerSel,
          start,
          end,
          onToggle: (self) => (self.isActive ? tween.restart() : tween.pause(0)),
        });
        cleanups.push(() => tween.kill());
      };

      // Logo strip — both rows slide up, staggered
      mkReveal('.lm-marquee',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.18, ease: 'power3.out' },
        '.lm-section', 'top 88%');

      // Brands section. The heading reveals on its own visibility; the cards reveal
      // on the GRID's own visibility. This matters on mobile, where the layout stacks
      // (heading above, grid below): if the cards were tied to the heading they'd
      // reset to hidden once the heading scrolled off the top — leaving an empty grid.
      mkReveal('.bts-text',
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.75, ease: 'power3.out' },
        '.bts-text', 'top 82%');
      mkReveal('.bts-card',
        { opacity: 0, y: 32, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.06, ease: 'power3.out' },
        '.bts-grid', 'top 85%');

      // Case study section — visual slides in from left, stats fade up
      mkReveal('.csc-visual',
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.75, ease: 'power3.out' },
        '.csc-root', 'top 80%');
      mkReveal('.csc-stats',
        { opacity: 0, y: 26 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '.csc-stats', 'top 88%');

      // Great Place to Work — text slides in from left, badge fades + scales up
      mkReveal('.gptw-text',
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' },
        '.gptw-text', 'top 85%');
      mkReveal('.gptw-badge',
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out' },
        '.gptw-badge', 'top 85%');

      // Movie connect — ticker-based infinite carousel with center-scale highlight
      const mcSection = q<HTMLElement>('.movie-connect-section');
      const mcTrack   = q<HTMLElement>('.mc-track');
      if (mcSection && mcTrack) {
        const cards = qa<HTMLElement>('.poster-card');
        const scaleQ = cards.map(c => gsap.quickSetter(c, 'scale'));
        const yQ     = cards.map(c => gsap.quickSetter(c, 'y', 'px'));
        const zQ     = cards.map(c => gsap.quickSetter(c, 'zIndex'));

        // PERFORMANCE: the old tick called getBoundingClientRect() on the section +
        // every card EACH frame (21 forced layout reflows/frame) while CSS animations
        // ran — that caused the stutter. Cards only move horizontally WITH the track,
        // so we measure each card's centre once (relative to the track, on enter +
        // resize) and per frame read only the track's left edge — a single reflow.
        let sectionCenterX = 0;
        let zone = 1;
        const cardOffset: number[] = [];
        const measure = () => {
          const sRect = mcSection.getBoundingClientRect();
          sectionCenterX = sRect.left + sRect.width / 2;
          zone = sRect.width * 0.12;
          const tLeft = mcTrack.getBoundingClientRect().left;
          cards.forEach((card, i) => {
            const r = card.getBoundingClientRect();
            cardOffset[i] = r.left + r.width / 2 - tLeft; // centre relative to track
          });
        };

        // Reads the track once, then only writes — no read/write thrashing.
        const scaleTick = () => {
          const tLeft = mcTrack.getBoundingClientRect().left;
          for (let i = 0; i < cards.length; i++) {
            const dist = Math.abs(tLeft + cardOffset[i] - sectionCenterX);
            const t = dist < zone ? 1 - dist / zone : 0;
            scaleQ[i](0.72 + t * 0.43);   // scale: 0.72 → 1.15
            yQ[i](-t * 28);               // popup: rises 28 px at center
            zQ[i](Math.round(t * 10) + 1);
          }
        };

        const onResize = () => measure();

        let tickerStarted = false;
        ScrollTrigger.create({
          trigger: mcSection,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            if (tickerStarted) return;
            tickerStarted = true;

            // Set CSS animation duration so speed ≈ 54 px/s regardless of viewport
            const cw = (cards[0] as HTMLElement | null)?.offsetWidth ?? 0;
            if (cw > 0) {
              const setW    = (cards.length / 2) * (cw + 18); // one 10-card copy width
              const dur     = Math.max(10, setW / 54);         // 54 px/s target
              mcTrack.style.setProperty('--mc-duration', `${dur.toFixed(1)}s`);
            }

            // Only the dot accent animates in — no strip wipe / track fade.
            gsap.to('.movie-connect-dot', { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' });

            measure();                                            // cache geometry once
            window.addEventListener('resize', onResize, { passive: true });
            // Cards run straight away (carousel)
            mcTrack.classList.add('mc-running');
            // Start per-card scaling
            gsap.ticker.add(scaleTick);
          },
        });

        cleanups.push(() => {
          gsap.ticker.remove(scaleTick);
          window.removeEventListener('resize', onResize);
          mcTrack.classList.remove('mc-running');
        });

      }

      // ── Pendulum text animation (independent of poster carousel) ────────────
      const connectTextBlock = q<HTMLElement>('.connect-text-block');
      if (connectTextBlock) {
        let splitConnect: ReturnType<typeof SplitText.create> | null = null;
        const playConnect = () => {
          // Kill any in-progress tweens, revert previous split (if re-entering)
          splitConnect?.revert();
          splitConnect = null;
          gsap.killTweensOf('.connect-cta');
          // Reset states
          gsap.set('.connect-cta', { opacity: 0, y: 12 });
          gsap.set('.connect-text-block', { opacity: 1 });
          // Split kicker + headline + sub into chars and pendulum-swing them in
          splitConnect = SplitText.create(
            '.connect-kicker, .connect-title, .connect-sub',
            { type: 'chars' },
          );
          gsap.from(splitConnect.chars, {
            rotation: 90,
            transformOrigin: 'top center',
            opacity: 0,
            stagger: 0.04,
            duration: 1,
            ease: 'elastic.out(1, 0.5)',
          });
          // CTA slides up after chars finish swinging
          gsap.to('.connect-cta', {
            opacity: 1, y: 0,
            duration: 0.55, ease: 'power3.out', delay: 0.8,
          });
        };
        const hideConnect = () => {
          splitConnect?.revert();
          splitConnect = null;
          gsap.killTweensOf('.connect-cta');
          gsap.set('.connect-text-block', { opacity: 0 });
          gsap.set('.connect-cta', { opacity: 0, y: 12 });
        };
        ScrollTrigger.create({
          trigger: connectTextBlock,
          start: 'top 88%',
          end: 'bottom 15%',
          onToggle: (self) => (self.isActive ? playConnect() : hideConnect()),
        });
        cleanups.push(() => { splitConnect?.revert(); });
      }

      // ── Big Impact CTA — orbit reveal + pendulum heading (replays on re-entry) ─
      const bicCenter = q<HTMLElement>('.bic-center');
      if (bicCenter) {
        let splitBic: ReturnType<typeof SplitText.create> | null = null;
        const playBic = () => {
          splitBic?.revert();
          splitBic = null;
          gsap.killTweensOf('.bic-content, .bic-cta');
          gsap.set('.bic-cta',     { opacity: 0, y: 12 });
          gsap.set('.bic-content', { opacity: 0, y: 24 });
          // Orbit rings + container fade in
          gsap.to('.bic-center',  { opacity: 1, duration: 0.6, ease: 'power2.out' });
          gsap.to('.bic-content', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.1 });
          // Pendulum-swing the headline chars
          const bicH2 = q<HTMLElement>('.bic-h2');
          if (bicH2) {
            splitBic = SplitText.create(bicH2, { type: 'chars' });
            gsap.from(splitBic.chars, {
              rotation: 90,
              transformOrigin: 'top center',
              opacity: 0,
              stagger: 0.03,
              duration: 1,
              ease: 'elastic.out(1, 0.5)',
              delay: 0.2,
            });
          }
          // CTA slides up after chars swing in
          gsap.to('.bic-cta', { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out', delay: 0.9 });
        };
        const hideBic = () => {
          splitBic?.revert();
          splitBic = null;
          gsap.killTweensOf('.bic-content, .bic-cta');
          gsap.set('.bic-center',  { opacity: 0 });
          gsap.set('.bic-content', { opacity: 0, y: 24 });
          gsap.set('.bic-cta',     { opacity: 0, y: 12 });
        };
        ScrollTrigger.create({
          trigger: bicCenter,
          start: 'top 82%',
          end: 'bottom 15%',
          onToggle: (self) => (self.isActive ? playBic() : hideBic()),
        });
        cleanups.push(() => { splitBic?.revert(); });
      }

      cleanups.push(() => {
        scrollTl.kill();
        ScrollTrigger.getAll().forEach(t => t.kill());
      });
    };

    // Delay entrance animation until the preloader signals it's done.
    // Falls back after 2s in case the page is loaded without a preloader.
    let started = false;
    const startOnce = () => {
      if (started) return;
      started = true;
      // Hero image is already visible (no clip hide) — just settle the subtle zoom.
      gsap.to('.hero-image', { scale: 1, duration: 0.7, ease: 'power3.out' });
      (fonts?.ready ?? Promise.resolve()).then(run);
    };
    window.addEventListener('tsbi:intro-done', startOnce, { once: true });
    const fallback = setTimeout(startOnce, 2000);
    cleanups.push(() => {
      window.removeEventListener('tsbi:intro-done', startOnce);
      clearTimeout(fallback);
    });

    // ── Hero text magnetic hover (pointer devices only) ───────────────────
    // GlobalCursor handles movement, particles, nav hover globally.
    // HeroAnimation only adds the hero-headline pull effect.
    if (isPointerDevice) {
      const ringEl = q<HTMLElement>('.cursor-ring');
      const heroEl = q<HTMLElement>('.hero-section');
      if (heroEl && ringEl) {
        const onHeroMove = (e: MouseEvent) => {
          if (splitRef) {
            splitRef.words.forEach((word) => {
              const el = word as HTMLElement;
              const rect = el.getBoundingClientRect();
              const cx = rect.left + rect.width / 2;
              const cy = rect.top + rect.height / 2;
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
          }
          gsap.to(ringEl, { width: 44, height: 44, borderColor: '#e0197d', duration: 0.25 });
        };

        const onHeroLeave = () => {
          if (splitRef) {
            splitRef.words.forEach((word) => {
              gsap.to(word as HTMLElement, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1,0.4)', overwrite: 'auto' });
            });
          }
          gsap.to(ringEl, { width: 34, height: 34, borderColor: '#8ecbf0', duration: 0.4 });
        };

        heroEl.addEventListener('mousemove',  onHeroMove,  { passive: true });
        heroEl.addEventListener('mouseleave', onHeroLeave);
        cleanups.push(() => {
          heroEl.removeEventListener('mousemove',  onHeroMove);
          heroEl.removeEventListener('mouseleave', onHeroLeave);
        });
      }
    }

    return () => cleanups.forEach(fn => fn());
  }, []);

  return null;
}
