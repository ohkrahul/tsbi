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

    // On the home page the preloader fires 'tsbi:intro-done' (~1.1s, or instantly
    // when the intro is skipped). Wait for that signal so .reveal animations don't
    // play behind the preloader. Fall back in case there's no preloader / it errors.
    let started = false;
    const startOnce = () => {
      if (started) return;
      started = true;
      clearTimeout(fallback);
      setTimeout(init, 80);
    };
    window.addEventListener('tsbi:intro-done', startOnce, { once: true });
    // Home page waits for the preloader to fire intro-done; all other pages reveal immediately.
    const isHome = pathname === '/';
    const fallback = setTimeout(startOnce, isHome ? 2000 : 300);

    return () => {
      window.removeEventListener('tsbi:intro-done', startOnce);
      clearTimeout(fallback);
      obs?.disconnect();
    };
  }, [pathname]);

  return null;
}
