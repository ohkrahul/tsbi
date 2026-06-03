'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const init = () => {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('vis');
              obs.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      document.querySelectorAll<HTMLElement>('.reveal:not(.vis)').forEach((el) => obs.observe(el));
      return obs;
    };

    // Small delay to let the DOM settle after navigation
    const timer = setTimeout(() => { init(); }, 120);
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
