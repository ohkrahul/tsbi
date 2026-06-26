'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    let obs: IntersectionObserver | null = null;
    const init = () => {
      obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('vis');
              obs!.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      document.querySelectorAll<HTMLElement>('.reveal:not(.vis)').forEach((el) => obs!.observe(el));
    };

    // On the home page the preloader fires 'tsbi:intro-done' after ~4 s.
    // Wait for that signal so .reveal animations don't play behind the preloader.
    // Fall back after 5 s in case we're on a page without a preloader.
    let started = false;
    const startOnce = () => {
      if (started) return;
      started = true;
      clearTimeout(fallback);
      setTimeout(init, 80); // small settle delay
    };
    window.addEventListener('tsbi:intro-done', startOnce, { once: true });
    const fallback = setTimeout(startOnce, 5000);

    return () => {
      window.removeEventListener('tsbi:intro-done', startOnce);
      clearTimeout(fallback);
      obs?.disconnect();
    };
  }, [pathname]);

  return null;
}
