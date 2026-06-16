'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

const serviceLinks = [
  { href: '/services/content-production', label: 'Content Production' },
  // { href: '/services/performance', label: 'Performance Management' },
  { href: '/services/seo', label: 'SEO' },
  { href: '/services/digital-transformation', label: 'Digital Transformation' },
  { href: '/services/influencer-management', label: 'Influencer Management' },
  { href: '/services/social-media', label: 'Social Media' },
];

const navLinks = [
  { href: '/', label: 'Home', exact: true },
  { href: '/about', label: 'About Us' },
  { href: '/careers', label: 'Careers' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/clients', label: 'Clients' },
  { href: '/media', label: 'Media' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [svcOpen, setSvcOpen] = useState(false);
  const pathname = usePathname();
  const svcTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openSvc = () => {
    if (svcTimer.current) clearTimeout(svcTimer.current);
    setSvcOpen(true);
  };
  const closeSvc = () => {
    svcTimer.current = setTimeout(() => setSvcOpen(false), 120);
  };

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <nav className={`nav-root${scrolled ? ' scrolled' : ''}`}>
      <Link href="/" className="nav-logo">
        <Image src="/tsbilogo.png" alt="The Small Big Idea" width={140} height={48} style={{ height: 38, width: 'auto' }} priority />
      </Link>

      <ul className="nav-links">
        {navLinks.map(({ href, label, exact }) => (
          <li key={href}>
            <Link
              href={href}
              style={isActive(href, exact) ? { color: 'var(--ink)' } : undefined}
            >
              {label}
            </Link>
          </li>
        ))}

        {/* Services dropdown */}
        <li
          className={`nav-dropdown${svcOpen ? ' open' : ''}`}
          onMouseEnter={openSvc}
          onMouseLeave={closeSvc}
        >
          <button
            className="nav-dd-btn"
            style={pathname.startsWith('/services') ? { color: 'var(--ink)' } : undefined}
            onClick={() => setSvcOpen((v) => !v)}
          >
            Services <span className="nav-dd-caret">▾</span>
          </button>
          <div className="nav-dd-panel">
            {serviceLinks.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="nav-dd-item"
                onClick={() => setSvcOpen(false)}
              >
                <span className="nav-dd-dot" />
                {s.label}
              </Link>
            ))}
          </div>
        </li>
      </ul>

      <div className="nav-right">
        <Link href="/contact" className="nav-talk">
          Contact
        </Link>
      </div>
    </nav>
  );
}
