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
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <nav className="nav-root">
      <div className="nav-inner">
        {/* Decorative sky-blue geometric line.
            - header-blue-svg   → GSAP draws the polyline on load via strokeDashoffset
            - header-blue-end-dot → circle endpoint; fades in after line completes, then pulses
            - header-blue-travel-dot → tiny dot that loops along the line post-load */}
        <svg
          className="nav-svg header-blue-svg"
          width="1130"
          height="108"
          viewBox="0 0 1130 108"
          fill="none"
          aria-hidden
        >
          <polyline
            points="25,98 385,98 445,24 1110,24"
            stroke="#8ecbf0"
            strokeWidth="1"
            fill="none"
          />
          {/* endpoint circle — fades in after the line reaches it */}
          <circle
            className="header-blue-end-dot"
            cx="1110"
            cy="24"
            r="3.5"
            stroke="#8ecbf0"
            strokeWidth="1"
            fill="none"
          />
          {/* pink start square */}
          <rect x="22" y="95" width="6" height="6" fill="#ff1aa0" />
          {/* tiny dot that travels along the line after load */}
          <circle
            className="header-blue-travel-dot"
            cx="25"
            cy="98"
            r="2.5"
            fill="#8ecbf0"
          />
        </svg>

        {/* header-logo → GSAP fades in from opacity:0 scale:0.92 */}
        <Link href="/" className="nav-logo header-logo">
          <Image
            src="/tsbilogo.png"
            alt="The Small Big Idea"
            width={150}
            height={52}
            className="nav-logo-img"
            priority
          />
        </Link>

        {/* header-nav-item on each <li> → GSAP staggers them in (y:-5→0, opacity:0→1) */}
        <ul className="nav-links">
          {navLinks.map(({ href, label, exact }) => (
            <li key={href} className="header-nav-item">
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
      </div>
    </nav>
  );
}
