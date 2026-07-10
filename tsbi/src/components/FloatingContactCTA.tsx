'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

/**
 * Floating "Connect with us" CTA — fixed bottom-right on every page (except the
 * contact page itself). Shows the running Mario-style character (the sprite used
 * in the About journey), pops a speech bubble every ~5s to draw attention, wipes
 * magenta on hover, and routes to /contact on click.
 */
export default function FloatingContactCTA() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const [bubble, setBubble] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setShow(true); return; }
    const entrance = window.setTimeout(() => setShow(true), 1000);
    const pop = () => { setBubble(true); window.setTimeout(() => setBubble(false), 2600); };
    const first = window.setTimeout(pop, 2400);
    const every5s = window.setInterval(pop, 5000);
    return () => { clearTimeout(entrance); clearTimeout(first); clearInterval(every5s); };
  }, []);

  // Don't show it on the contact page itself.
  if (pathname?.startsWith('/contact')) return null;

  return (
    <Link href="/contact" aria-label="Connect with us — go to contact" className="fcta" data-show={show || undefined}>
      <span className="fcta-bubble" data-on={bubble || undefined}>Let&apos;s talk! 👋</span>
      <span className="fcta-char" aria-hidden />
      <span className="fcta-label">Connect with us <span className="fcta-arr">→</span></span>
    </Link>
  );
}
