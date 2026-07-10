'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Renders its children only once the placeholder scrolls near the viewport.
 * Used to defer heavy, below-the-fold widgets (e.g. the R3F/three.js tube) so
 * their JS + textures stay out of the initial page load. Reserve the eventual
 * height via `minHeight` to avoid layout shift when the real content mounts.
 */
export default function LazyMount({
  children,
  rootMargin = '400px',
  minHeight,
}: {
  children: ReactNode;
  rootMargin?: string;
  minHeight?: number | string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) return;
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') { setShow(true); return; }
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) { setShow(true); obs.disconnect(); }
      },
      { rootMargin },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin, show]);

  // When the deferred content mounts it changes the page height, which leaves any
  // ScrollTrigger below it with stale positions. Recalculate them so scroll-reveal
  // animations further down the page still fire correctly.
  useEffect(() => {
    if (!show) return;
    const id = requestAnimationFrame(() => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => ScrollTrigger.refresh()).catch(() => {});
    });
    return () => cancelAnimationFrame(id);
  }, [show]);

  return <div ref={ref} style={minHeight != null ? { minHeight } : undefined}>{show ? children : null}</div>;
}
