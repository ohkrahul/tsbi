'use client';

import { useEffect, useRef } from 'react';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: 1 | 2 | 3 | 4;
  tag?: keyof React.JSX.IntrinsicElements;
}

export default function Reveal({ children, className = '', delay, tag: Tag = 'div' }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('vis'); observer.unobserve(el); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const cls = ['reveal', delay ? `d${delay}` : '', className].filter(Boolean).join(' ');

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={cls}>
      {children}
    </Tag>
  );
}
