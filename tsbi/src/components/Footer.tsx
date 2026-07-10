import Image from 'next/image';
import Link from 'next/link';
import NewsletterForm from '@/components/NewsletterForm';
import FooterPhotoSection from '@/components/FooterPhotoSection';

const pills = [
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/careers', label: 'Careers' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/clients', label: 'Clients' },
  { href: '/media', label: 'Media' },
];

const offices = [
  {
    name: 'TSBI HQ',
    address: [
      'Neelkamal Building, next to Satyam Tower,',
      'Deonar, Govandi East, Mumbai,',
      'Maharashtra 400088',
    ],
    email: 'communication@tsbi.in',
    phone: '+022 2551 3339',
    phoneHref: 'tel:+912225513339',
  },
  {
    name: 'TSBI MENA',
    address: [
      'Business Center 1, M Floor,',
      'The Meydan Hotel, Nad Al Sheba,',
      'Dubai, U.A.E.',
    ],
    email: 'enquiries@tsbiglobal.com',
    phone: '',
    phoneHref: '',
  },
];

const bottomLinks = [
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms' },
  { href: '/contact', label: 'Contact' },
];

const socials = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/thesmallbigidea/',
    svg: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/TheSmallBigIdea/?fref=ts',
    svg: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14 8.5h2.2V5.4c-.4-.05-1.7-.17-3-.17-3 0-5 1.8-5 5.2v2.3H5.3v3.4h2.9V24h3.5v-7.9h2.8l.5-3.4h-3.3v-2c0-1 .3-1.7 1.8-1.7z" />
      </svg>
    ),
  },
  {
    label: 'X',
    href: 'https://twitter.com/thesmallbigidea',
    svg: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.6 10.6 20.9 2h-1.7l-6.3 7.4L7.8 2H2l7.7 11.2L2 22h1.7l6.7-7.9 5.4 7.9H22l-8-11.4zm-2.4 2.8-.8-1.1L4.3 3.3h2.6l5 7.2.8 1.1 6.5 9.3h-2.6l-5.2-7.5z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/thesmallbigidea/',
    svg: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/channel/UCjZKp_9V6SVAKnr9KpQC6OA',
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2.5" y="6" width="19" height="12" rx="3.5" />
        <path d="M10.5 9.4l4.6 2.6-4.6 2.6z" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

const pinIcon = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);
const mailIcon = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);
const phoneIcon = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7A2 2 0 0 1 22 16.9z" />
  </svg>
);

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white">
      {/* ── White content area (photo backdrop + cursor spotlight) ── */}
      <FooterPhotoSection>
        <div className="mx-auto max-w-[1180px] px-6 pb-12 pt-16 text-center">
        <Link href="/" className="inline-flex" aria-label="The Small Big Idea — home">
          <Image src="/TSBIInOBG.png" alt="The Small Big Idea" width={517} height={483} style={{ width: 'auto', height: 100 }} />
        </Link>

        <p className="mt-5 font-fm text-[11px] font-semibold uppercase tracking-[0.32em] text-magenta">
          The Small Big Idea
        </p>

        <h2 className="mt-3 font-fm text-[44px] font-black leading-[1.02] tracking-tight text-ink sm:text-[64px] uppercase italic">
          Small Ideas.
          <br />
          <span className="italic text-magenta">Big Impact.</span>
        </h2>

        {/* dot divider */}
        <div className="mt-4 flex items-center justify-center gap-2.5">
          <span className="h-px w-12 bg-magenta/40" />
          <span className="h-1.5 w-1.5 rounded-full bg-magenta" />
          <span className="h-px w-12 bg-magenta/40" />
        </div>

        <p className="mx-auto mt-5 max-w-[540px] font-fb text-[15px] leading-7 text-[#666]">
          From Mumbai to MENA, we help brands create stories that move culture, conversations, and communities.
        </p>

        {/* pill nav */}
        <nav className="mt-8 flex flex-wrap justify-center gap-3" aria-label="Footer">
          {pills.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="btn-pink-fill rounded-full border border-black/15 px-5 py-2.5 font-fm text-[11px] font-semibold uppercase tracking-[0.1em] text-ink"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* office cards */}
        <div className="mx-auto mt-10 grid max-w-[940px] gap-6 text-left md:grid-cols-2">
          {offices.map((o) => (
            <div
              key={o.name}
              className="rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[0_12px_40px_rgba(0,0,0,0.06)]"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-magenta/10 text-magenta">
                  {pinIcon}
                </span>
                <div>
                  <h3 className="font-fm text-sm font-bold uppercase tracking-[0.12em] text-magenta">{o.name}</h3>
                  <span className="mt-1.5 block h-[3px] w-6 rounded-full bg-magenta" />
                  <p className="mt-2.5 font-fb text-[14px] leading-6 text-[#333]">
                    {o.address.map((line, i) => (
                      <span key={i} className="block">{line}</span>
                    ))}
                  </p>
                </div>
              </div>

              <hr className="my-4 border-black/[0.07]" />

              <div className="flex flex-wrap items-center gap-y-3">
                <a href={`mailto:${o.email}`} className="group flex items-center gap-2.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-magenta/10 text-magenta">
                    {mailIcon}
                  </span>
                  <span className="font-fb text-[14px] text-[#333] group-hover:text-magenta">{o.email}</span>
                </a>
                {o.phone && (
                  <>
                    <span className="mx-4 h-5 w-px bg-black/10" />
                    <a href={o.phoneHref} className="group flex items-center gap-2.5">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-magenta/10 text-magenta">
                        {phoneIcon}
                      </span>
                      <span className="font-fb text-[14px] text-[#333] group-hover:text-magenta">{o.phone}</span>
                    </a>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ── Subscribe Newsletter ── */}
        <div className="mx-auto mt-12 max-w-[520px]">
          <h3 className="font-fm text-lg font-bold uppercase tracking-[0.08em] text-ink">Subscribe Newsletter</h3>
          <p className="mx-auto mt-2 mb-5 max-w-[420px] font-fb text-[14px] leading-6 text-[#666]">
            Subscribe to receive our latest news &amp; ideas straight to your inbox.
          </p>
          <NewsletterForm />
        </div>
        </div>
      </FooterPhotoSection>

      {/* ── Dark bottom bar ── */}
      <div className="relative bg-linear-to-r from-[#101a33] via-[#241640] to-[#34195a]">
        {/* magenta top line + centered notch */}
        <span className="absolute inset-x-0 top-0 h-px bg-magenta" aria-hidden />
        <span
          className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 border-l border-t border-magenta bg-[#1b1240]"
          aria-hidden
        />

        <div className="mx-auto flex max-w-[1180px] flex-col items-center gap-5 px-8 py-7 text-center md:flex-row md:justify-between md:text-left">
          {/* follow + socials */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
            <span className="font-fm text-[11px] uppercase tracking-[0.16em] text-white/60">Follow us on</span>
            <div className="flex gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white/80 transition-colors hover:border-magenta hover:bg-magenta hover:text-white"
                >
                  {s.svg}
                </a>
              ))}
            </div>
          </div>

          {/* center links */}
          <nav className="flex items-center gap-3 font-fm text-[11px] uppercase tracking-[0.1em] text-white/75">
            {bottomLinks.map((l, i) => (
              <span key={l.href} className="flex items-center gap-3">
                {i > 0 && <span className="text-white/25">|</span>}
                <Link href={l.href} className="transition-colors hover:text-magenta">{l.label}</Link>
              </span>
            ))}
          </nav>

          {/* copyright */}
          <div className="font-fm text-[11px] leading-5 md:text-right">
            <p className="text-white/80">© {year} TSBI. All Right Reserved.</p>
            <p className="text-magenta">All Wrong Reversed.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
