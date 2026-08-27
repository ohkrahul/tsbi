import Link from 'next/link';
import NewsletterForm from '@/components/NewsletterForm';

// ── EXPLORE links (each with a small leading icon) ──
const EXPLORE = [
  {
    href: '/about', label: 'About Us',
    icon: <><circle cx="12" cy="12" r="9" /><path d="M12 16v-4M12 8h.01" /></>,
  },
  {
    href: '/services', label: 'Services',
    icon: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>,
  },
  {
    href: '/careers', label: 'Careers',
    icon: <><rect x="2.5" y="7" width="19" height="13" rx="2" /><path d="M8 7V5.5A2 2 0 0 1 10 3.5h4a2 2 0 0 1 2 2V7" /></>,
  },
  {
    href: '/case-studies', label: 'Case Studies',
    icon: <><path d="M14 2.5H7A2 2 0 0 0 5 4.5v15a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7.5z" /><path d="M14 2.5v5h5M9 13h6M9 17h6" /></>,
  },
  {
    href: '/clients', label: 'Clients',
    icon: <><path d="M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20" /><circle cx="10" cy="8" r="3.2" /><path d="M20 20v-1.5a3.5 3.5 0 0 0-2.6-3.4" /></>,
  },
  {
    href: '/media', label: 'Media',
    icon: <><rect x="3" y="4" width="18" height="16" rx="2.5" /><path d="M10 9l5 3-5 3z" fill="currentColor" stroke="none" /></>,
  },
];

const offices = [
  {
    name: 'TSBI HQ',
    address: ['Neelkamal Building, next to Satyam Tower,', 'Deonar, Govandi East, Mumbai,', 'Maharashtra 400088'],
    email: 'communication@tsbi.in',
  },
  {
    name: 'TSBI MENA',
    address: ['Business Center 1, M Floor,', 'The Meydan Hotel, Nad Al Sheba,', 'Dubai, U.A.E.'],
    email: 'enquiries@tsbiglobal.com',
  },
];

const bottomLinks = [
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms' },
  { href: '/contact', label: 'Contact' },
];

const socials = [
  {
    label: 'Instagram', href: 'https://www.instagram.com/thesmallbigidea/',
    svg: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'Facebook', href: 'https://www.facebook.com/TheSmallBigIdea/?fref=ts',
    svg: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14 8.5h2.2V5.4c-.4-.05-1.7-.17-3-.17-3 0-5 1.8-5 5.2v2.3H5.3v3.4h2.9V24h3.5v-7.9h2.8l.5-3.4h-3.3v-2c0-1 .3-1.7 1.8-1.7z" />
      </svg>
    ),
  },
  {
    label: 'X', href: 'https://twitter.com/thesmallbigidea',
    svg: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.6 10.6 20.9 2h-1.7l-6.3 7.4L7.8 2H2l7.7 11.2L2 22h1.7l6.7-7.9 5.4 7.9H22l-8-11.4zm-2.4 2.8-.8-1.1L4.3 3.3h2.6l5 7.2.8 1.1 6.5 9.3h-2.6l-5.2-7.5z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn', href: 'https://www.linkedin.com/company/thesmallbigidea/',
    svg: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
      </svg>
    ),
  },
  {
    label: 'YouTube', href: 'https://www.youtube.com/channel/UCjZKp_9V6SVAKnr9KpQC6OA',
    svg: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2.5" y="6" width="19" height="12" rx="3.5" /><path d="M10.5 9.4l4.6 2.6-4.6 2.6z" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

/** magenta section heading + short underline bar */
function Head({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <h3 className="font-fm text-[12px] font-bold uppercase tracking-[0.18em] text-magenta">{children}</h3>
      <span className="mt-2 block h-[2px] w-7 rounded-full bg-magenta" />
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white p-3 sm:p-4">
      <div
        className="overflow-hidden rounded-[28px] border border-white/10 text-white shadow-[0_24px_90px_-40px_rgba(224,25,125,0.55)]"
        style={{ background: 'linear-gradient(135deg,#1b0b2e 0%,#241041 55%,#2c1247 100%)' }}
      >
        {/* ── Main band ── */}
        <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[1.7fr_0.75fr_1fr_1fr] lg:gap-14 lg:p-12">

          {/* Left — image + brand card (pink glow) */}
          <div className="rounded-2xl border border-magenta/25 bg-white/[0.02] p-3 shadow-[0_0_50px_-14px_rgba(224,25,125,0.55)]">
            <div className="overflow-hidden rounded-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/about%20us/IMG_2081.webp"
                alt="The TSBI team"
                loading="lazy"
                decoding="async"
                className="h-[250px] w-full object-cover"
              />
            </div>
            <div className="mt-4 flex items-center gap-4 px-1 pb-1">
              <span className="h-9 w-[3px] shrink-0 rounded-full bg-magenta" />
              <span className="font-fm text-3xl font-black leading-none tracking-tight text-white">TSBI</span>
              <p className="font-fb text-[12.5px] leading-5 text-white/55">
                Technology. Strategy. Innovation. Building digital solutions that drive impact.
              </p>
            </div>
          </div>

          {/* Explore */}
          <nav aria-label="Footer navigation">
            <Head>Explore</Head>
            <ul className="space-y-0.5">
              {EXPLORE.map(({ href, label, icon }) => (
                <li key={href}>
                  <Link href={href} className="group inline-flex items-center gap-2 py-2 text-white/75 transition-colors hover:text-white">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-magenta/80">
                      {icon}
                    </svg>
                    <span className="font-fb text-[14px]">{label}</span>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-white/30 transition-[transform,color] duration-300 group-hover:translate-x-0.5 group-hover:text-magenta">
                      <path d="M9 6l6 6-6 6" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Newsletter */}
          <div>
            <Head>Subscribe Newsletter</Head>
            <p className="mb-4 font-fb text-[13.5px] leading-6 text-white/60">
              Subscribe to receive our latest news &amp; ideas straight to your inbox.
            </p>
            <NewsletterForm dark />
            <p className="mt-3 flex items-center gap-2 font-fb text-[12px] text-white/45">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-magenta/70">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" />
              </svg>
              No spam. Unsubscribe anytime.
            </p>
          </div>

          {/* Offices */}
          <div>
            <Head>Offices</Head>
            <div className="space-y-5">
              {offices.map((o, idx) => (
                <div key={o.name}>
                  <div className="flex gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-magenta/12 text-magenta">
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" />
                      </svg>
                    </span>
                    <div>
                      <p className="font-fm text-[12px] font-bold uppercase tracking-[0.1em] text-white">{o.name}</p>
                      <p className="mt-1.5 font-fb text-[12.5px] leading-6 text-white/55">
                        {o.address.map((line, i) => (
                          <span key={i} className="block">{line}</span>
                        ))}
                      </p>
                      <a href={`mailto:${o.email}`} className="mt-1 inline-block font-fb text-[12.5px] text-magenta transition-colors hover:underline">
                        {o.email}
                      </a>
                    </div>
                  </div>
                  {idx === 0 && <div className="mt-5 h-px w-full bg-white/10" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex flex-col items-center gap-5 border-t border-white/10 px-6 py-6 text-center sm:px-10 lg:flex-row lg:justify-between lg:px-12 lg:text-left">
          {/* badge + follow + socials */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-magenta/50 font-fm text-[10px] font-black tracking-tight text-magenta shadow-[0_0_20px_-4px_rgba(224,25,125,0.7)]">
              TSBI
            </span>
            <span className="font-fm text-[11px] uppercase tracking-[0.16em] text-white/55">Follow us on</span>
            <div className="flex gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-white/75 transition-colors hover:border-magenta hover:bg-magenta hover:text-white"
                >
                  {s.svg}
                </a>
              ))}
            </div>
          </div>

          {/* legal links */}
          <nav className="flex items-center gap-4 font-fm text-[11px] uppercase tracking-[0.1em] text-white/70">
            {bottomLinks.map((l, i) => (
              <span key={l.href} className="flex items-center gap-4">
                {i > 0 && <span className="h-1 w-1 rounded-full bg-magenta" />}
                <Link href={l.href} className="transition-colors hover:text-magenta">{l.label}</Link>
              </span>
            ))}
          </nav>

          {/* copyright */}
          <div className="font-fm text-[11px] leading-5 lg:text-right">
            <p className="text-white/70">© {year} TSBI. All Rights Reserved.</p>
            <p className="text-magenta">All Wrong Reversed.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
