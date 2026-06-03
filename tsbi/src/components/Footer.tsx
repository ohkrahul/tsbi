import Link from 'next/link';

const workLinks = [
  { href: '/work', label: 'All Work' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/clients', label: 'Our Clients' },
];

const agencyLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/careers', label: 'Careers' },
  { href: '/journal', label: 'Journal' },
];

export default function Footer() {
  return (
    <footer className="footer-root">
      <div className="ft-grid">
        <div>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <svg style={{ width: 'auto', height: 48, marginBottom: 16 }} viewBox="0 0 130 44" fill="none">
              <text x="0" y="21" fontFamily="Georgia,serif" fontSize="22" fontWeight="900" fill="#e0197d">ts</text>
              <text x="0" y="41" fontFamily="Georgia,serif" fontSize="22" fontWeight="900" fill="#1a6aff">bi</text>
              <rect x="34" y="8" width="1" height="28" fill="rgba(255,255,255,.2)" rx="1"/>
              <text x="41" y="23" fontFamily="Arial,Helvetica,sans-serif" fontSize="7.5" letterSpacing="1.8" fill="rgba(255,255,255,.4)">THE SMALL</text>
              <text x="41" y="36" fontFamily="Arial,Helvetica,sans-serif" fontSize="7.5" letterSpacing="1.8" fill="rgba(255,255,255,.4)">BIG IDEA</text>
            </svg>
          </Link>
          <p className="ft-desc">
            The Small Big Idea. Strategy &amp; Creative, undivided.<br/>
            Mumbai · Delhi · Bangalore · Dubai
          </p>
          <div className="ft-social" style={{ marginTop: 24 }}>
            <a className="ft-social-btn" href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a className="ft-social-btn" href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a className="ft-social-btn" href="https://twitter.com" target="_blank" rel="noopener noreferrer">YouTube</a>
          </div>
        </div>

        <div>
          <p className="ft-col-title">Work</p>
          <ul className="ft-links">
            {workLinks.map(({ href, label }) => (
              <li key={href}><Link href={href}>{label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <p className="ft-col-title">Agency</p>
          <ul className="ft-links">
            {agencyLinks.map(({ href, label }) => (
              <li key={href}><Link href={href}>{label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <p className="ft-col-title">Get in Touch</p>
          <ul className="ft-links">
            <li><a href="mailto:hello@tsbi.in">hello@tsbi.in</a></li>
            <li><a href="tel:+919876543210">+91 98765 43210</a></li>
          </ul>
          <a
            className="ft-address"
            href="https://maps.google.com/?q=Neelkamal+Building,+Deonar,+Govandi+East,+Mumbai+400088"
            target="_blank"
            rel="noopener noreferrer"
          >
            📍 Neelkamal Building,<br/>
            Next to Satyam Tower, Deonar,<br/>
            Govandi East, Mumbai – 400088
          </a>
        </div>
      </div>

      <div className="ft-bottom">
        <p className="ft-copy">© {new Date().getFullYear()} TSBI – The Small Big Idea. All rights reserved.</p>
        <div style={{ display: 'flex', gap: 20 }}>
          <Link href="/privacy" className="ft-copy">Privacy</Link>
          <Link href="/terms" className="ft-copy">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
