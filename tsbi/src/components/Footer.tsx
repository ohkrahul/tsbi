import Image from 'next/image';
import Link from 'next/link';

const pillLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/careers', label: 'Careers' },
  { href: '/journal', label: 'Journal' },
];

const socials = [
  {
    href: 'https://instagram.com',
    label: 'Instagram',
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    href: 'https://facebook.com',
    label: 'Facebook',
    icon: <path d="M14 8h2V5h-2c-2 0-3 1-3 3v2H9v3h2v6h3v-6h2l1-3h-3V8c0-.5.5-1 1-1z" />,
  },
  {
    href: 'https://twitter.com',
    label: 'Twitter',
    icon: <path d="M20 6c-.7.5-1.5.8-2.3.9.8-.5 1.4-1.3 1.7-2.2-.8.5-1.7.8-2.6 1A4 4 0 0 0 9.9 9.3 11 11 0 0 1 4 5s-2 4 1 6c-.7 0-1.4-.2-2-.5 0 2 1.4 3.7 3.3 4.1-.6.2-1.2.2-1.8.1.5 1.6 2 2.8 3.8 2.8A8 8 0 0 1 4 19a11 11 0 0 0 6 1.7c7 0 11-6 10.8-11.3.8-.5 1.4-1.2 1.9-2z" />,
  },
  {
    href: 'https://linkedin.com',
    label: 'LinkedIn',
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M7 10v7M7 7v.01M11 17v-4c0-1.5 3-1.5 3 0v4M11 17v-7" />
      </>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="footer-root">
      <div className="ft-top">
        <Link href="/" className="ft-logo" aria-label="The Small Big Idea — home">
          <Image src="/tsbilogo.png" alt="The Small Big Idea" width={200} height={120} style={{ width: 'auto', height: 96 }} />
        </Link>

        <nav className="ft-pills" aria-label="Footer">
          {pillLinks.map(({ href, label }) => (
            <Link key={href} href={href} className="ft-pill">
              {label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="ft-bar">
        <div className="ft-follow">
          <span className="ft-follow-label">Follow us on</span>
          <div className="ft-socials">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="ft-social"
                aria-label={s.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  {s.icon}
                </svg>
              </a>
            ))}
          </div>
        </div>

        <div className="ft-legal">
          <span>Proudly created in India.</span>
          <span>All Right Reserved. All Wrong Reversed.</span>
        </div>
      </div>
    </footer>
  );
}
