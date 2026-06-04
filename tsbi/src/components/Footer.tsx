import Image from 'next/image';
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

        {/* Brand column */}
        <div>
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: 22 }}>
            <div style={{ background: '#fff', borderRadius: 10, padding: '10px 16px', display: 'inline-flex', alignItems: 'center' }}>
              <Image
                src="/tsbilogo.png"
                alt="The Small Big Idea"
                width={160}
                height={56}
                style={{ height: 46, width: 'auto', display: 'block' }}
                priority
              />
            </div>
          </Link>
          <p className="ft-desc">
            To give our clients ideas that will send their head spinning and execute it with the same passion that we displayed while selling it to them. Also, to pick up their phones on some Saturdays with a smile.
          </p>
          <div className="ft-social" style={{ marginTop: 24 }}>
            <a className="ft-social-btn" href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a className="ft-social-btn" href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a className="ft-social-btn" href="https://youtube.com" target="_blank" rel="noopener noreferrer">YouTube</a>
          </div>
        </div>

        {/* Work links */}
        <div>
          <p className="ft-col-title">Work</p>
          <ul className="ft-links">
            {workLinks.map(({ href, label }) => (
              <li key={href}><Link href={href}>{label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Agency links */}
        <div>
          <p className="ft-col-title">Agency</p>
          <ul className="ft-links">
            {agencyLinks.map(({ href, label }) => (
              <li key={href}><Link href={href}>{label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Offices */}
        <div>
          <p className="ft-col-title">Our Offices</p>

          <div style={{ marginBottom: 24 }}>
            <p style={{ fontFamily: 'var(--fm)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#e0197d', marginBottom: 6 }}>TSBI HQ — Mumbai</p>
            <a
              className="ft-address"
              href="https://maps.google.com/?q=401+Satyam+Tower,+Deonar,+Govandi+East,+Mumbai+400088"
              target="_blank"
              rel="noopener noreferrer"
            >
              401 Satyam Tower, Deonar,<br />
              Govandi East, Mumbai 400088
            </a>
            <a href="mailto:communication@tsbi.in" className="ft-address" style={{ marginTop: 6, display: 'block' }}>
              communication@tsbi.in
            </a>
          </div>

          <div>
            <p style={{ fontFamily: 'var(--fm)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#e0197d', marginBottom: 6 }}>TSBI Arabia — Dubai</p>
            <a
              className="ft-address"
              href="https://maps.google.com/?q=The+Meydan+Hotel,+Nad+Al+Sheba,+Dubai"
              target="_blank"
              rel="noopener noreferrer"
            >
              Business Center 1, M Floor<br />
              The Meydan Hotel, Nad Al Sheba,<br />
              Dubai, U.A.E.
            </a>
            <a href="mailto:enquiries@tsbiglobal.com" className="ft-address" style={{ marginTop: 6, display: 'block' }}>
              enquiries@tsbiglobal.com
            </a>
          </div>
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
