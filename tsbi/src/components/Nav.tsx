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
];

/* Individual service routes — reached only through this dropdown (the parent
   "Services" label is a trigger, not a link). */
const serviceLinks = [
  { href: '/services/content-production',    label: 'Content Production' },
  { href: '/services/performance',           label: 'Performance Management' },
  { href: '/services/digital-transformation', label: 'Digital Transformation' },
  { href: '/services/influencer-management', label: 'Influencer Management' },
  { href: '/services/social-media',          label: 'Social Media' },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);
  const servicesActive = pathname.startsWith('/services');

  return (
    <nav className="nav-root">
      {/* scoped overrides so dropdown items aren't restyled by `.nav-links a` */}
      <style dangerouslySetInnerHTML={{ __html: `
        .nav-links .nav-dd-btn { font-family: var(--fm); font-size: 14px; font-weight: 600; letter-spacing: .02em; text-transform: uppercase; color: #9b9b9b; }
        .nav-links .nav-dropdown.open .nav-dd-btn, .nav-links .nav-dd-btn:hover { color: var(--ink); }
        .nav-links .nav-dd-btn.active { color: #f01891; font-weight: 800; }
        /* invisible bridge across the 18px gap so the menu stays open while the cursor travels to it */
        .nav-links .nav-dropdown .nav-dd-panel::before { content: ''; position: absolute; left: -8px; right: -8px; bottom: 100%; height: 26px; }
        /* CSS-driven hover (no JS timing race): panel + bridge become interactive the instant the trigger is hovered */
        .nav-links .nav-dropdown:hover .nav-dd-panel { opacity: 1; pointer-events: auto; transform: translateX(-50%) translateY(0); }
        .nav-links .nav-dropdown:hover .nav-dd-caret { transform: rotate(180deg); }
        .nav-links a.nav-dd-item { font-family: var(--fb); font-size: 13px; font-weight: 500; letter-spacing: normal; text-transform: none; color: var(--ink); padding: 10px 14px; }
        .nav-links a.nav-dd-item:hover { color: var(--magenta); background: var(--off); }
        .nav-links a.nav-dd-item.active { color: var(--magenta); }
      ` }} />

      <div className="nav-inner">
        {/* Decorative sky-blue geometric line. */}
        <svg
          className="nav-svg header-blue-svg"
          width="1130"
          height="108"
          viewBox="0 0 1130 108"
          fill="none"
          aria-hidden
        >
          <polyline points="25,98 385,98 445,24 1110,24" stroke="#8ecbf0" strokeWidth="1" fill="none" />
          <circle className="header-blue-end-dot" cx="1110" cy="24" r="3.5" stroke="#8ecbf0" strokeWidth="1" fill="none" />
          <rect x="22" y="95" width="6" height="6" fill="#ff1aa0" />
          <circle className="header-blue-travel-dot" cx="25" cy="98" r="2.5" fill="#8ecbf0" />
        </svg>

        {/* header-logo → GSAP fades in from opacity:0 scale:0.92 */}
        <Link href="/" className="nav-logo header-logo">
          <Image
            src="/TSBIInOBG.png"
            alt="The Small Big Idea"
            width={350}
            height={72}
            className="nav-logo-img"
            priority
          />
        </Link>

        {/* header-nav-item on each <li> → GSAP staggers them in */}
        <ul className="nav-links">
          {navLinks.map(({ href, label, exact }) => (
            <li key={href} className="header-nav-item">
              <Link href={href} className={isActive(href, exact) ? 'active' : undefined}>
                {label}
              </Link>
            </li>
          ))}

          {/* Services — dropdown trigger (NOT a link; opens on hover/click) */}
          <li
            className={`header-nav-item nav-dropdown${servicesOpen ? ' open' : ''}`}
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              className={`nav-dd-btn${servicesActive ? ' active' : ''}`}
              aria-haspopup="true"
              aria-expanded={servicesOpen}
              onClick={() => setServicesOpen((v) => !v)}
            >
              Services <span className="nav-dd-caret">▾</span>
            </button>
            <div className="nav-dd-panel">
              {serviceLinks.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className={`nav-dd-item${pathname === s.href ? ' active' : ''}`}
                >
                  <span className="nav-dd-dot" />
                  {s.label}
                </Link>
              ))}
            </div>
          </li>
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

            {/* Services group — label is not a link, sub-services are */}
            <div className="nav-mobile-services-label">Services</div>
            {serviceLinks.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className={`nav-mobile-sub${pathname === s.href ? ' active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {s.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
