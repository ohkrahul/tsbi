'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home', exact: true },
  { href: '/about', label: 'About Us' },
  { href: '/careers', label: 'Careers' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/clients', label: 'Clients' },
  { href: '/media', label: 'Media' },
  { href: '/services', label: 'Services' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on navigation.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

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
            <Link href={href} className={isActive(href, exact) ? 'active' : undefined}>
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="nav-right">
        <button
          className={`nav-burger${menuOpen ? ' open' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {menuOpen && (
        <div className="nav-mobile-menu">
          {navLinks.map(({ href, label, exact }) => (
            <Link
              key={href}
              href={href}
              className={isActive(href, exact) ? 'active' : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
