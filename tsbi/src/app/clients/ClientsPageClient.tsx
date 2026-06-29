'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface ClientEntry {
  name: string;
  type: string;
  accent: string;
  isEntertainment: boolean;
  logo?: string;   // path relative to /public  e.g. /images/clients/loreal.png
  slug?: string;   // case study slug — card becomes a link when set
}

/* ── client name → case study slug ── */
const CASE_STUDY_MAP: Record<string, string> = {
  'Dharma Productions':       '/case-studies/dharma-production',
  'Devgn Films':              '/case-studies/son-of-sardaar-2',
  'Disney India':             '/case-studies/disney-india',
  'Mumbai Indians':           '/case-studies/mumbai-indians',
  'DHL':                      '/case-studies/mumbai-indians',
  'Ashok Leyland':            '/case-studies/ashok-leyland-diwali',
  'Zydus':                    '/case-studies/zydus-liver-ki-suno',
  'Aamir Khan Productions':   '/case-studies/sitaare-zameen-par',
};

type Tab = 'all' | 'entertainment' | 'non-entertainment';

/* fonts — same as the home page */
const FA = 'font-fa'; // Abril Fatface — display headings
const FM = 'font-fm'; // Space Grotesk — labels & body

/* ── Single logo card ── */
function LogoCard({ client }: { client: ClientEntry }) {
  const [imgErr, setImgErr] = useState(false);
  const caseUrl = CASE_STUDY_MAP[client.name];

  const initials = client.name
    .split(/[\s&·]+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');

  const card = (
    <div className={`group relative flex h-full flex-col items-center gap-3.5 overflow-hidden rounded-2xl border border-black/[0.07] bg-white px-5 pb-[22px] pt-7 text-center shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] ${caseUrl ? 'cursor-pointer hover:border-magenta/30' : ''}`}>
      {caseUrl && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-magenta/90 to-transparent pb-2.5 pt-5 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className={`text-[10px] font-bold uppercase tracking-[0.12em] text-white ${FM}`}>View Case Study →</span>
        </div>
      )}

      <div className="flex h-24 w-full items-center justify-center px-2">
        {client.logo && !imgErr ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={client.logo}
            alt={`${client.name} logo`}
            onError={() => setImgErr(true)}
            className="block h-auto max-h-[90px] w-auto max-w-full object-contain"
          />
        ) : (
          <div
            className={`flex h-[72px] w-[72px] items-center justify-center rounded-xl text-[22px] font-normal tracking-[0.01em] ${FA}`}
            style={{ background: `${client.accent}18`, color: client.accent }}
          >
            {initials}
          </div>
        )}
      </div>

      <div>
        <div className={`mb-[5px] text-[clamp(13px,1.4vw,16px)] font-bold leading-tight text-[var(--ink)] ${FM}`}>{client.name}</div>
        <div className={`text-[9px] uppercase tracking-[0.13em] text-magenta ${FM}`}>{client.type}</div>
      </div>
    </div>
  );

  return caseUrl
    ? <Link href={caseUrl} className="block no-underline">{card}</Link>
    : card;
}

/* ── Page component ── */
export default function ClientsPageClient({ clients }: { clients: ClientEntry[] }) {
  const [tab, setTab] = useState<Tab>('all');
  const heroRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  /* hero headline — line-by-line mask reveal with a blur-fade (matches the home/about treatment) */
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const lines = el.querySelectorAll<HTMLElement>('.cl-hero-line');
    if (!lines.length) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(lines, { opacity: 1, yPercent: 0, filter: 'none' });
        return;
      }
      gsap.set(lines, { yPercent: 115, filter: 'blur(12px)' });
      gsap.to(lines, {
        opacity: 1,
        yPercent: 0,
        filter: 'blur(0px)',
        duration: 0.95,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.2,
      });
    }, el);

    return () => ctx.revert();
  }, []);

  /* logo grid — staggered fade-up; re-runs on tab change, reveals on scroll-in */
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const cards = grid.querySelectorAll('.cl-card-anim');
    if (!cards.length) return;
    const ctx = gsap.context(() => {
      gsap.from(cards, {
        opacity: 0,
        y: 24,
        duration: 0.5,
        ease: 'power3.out',
        stagger: { amount: 0.6, from: 'start' },
        scrollTrigger: { trigger: grid, start: 'top 85%', once: true },
      });
    }, grid);
    return () => ctx.revert();
  }, [tab]);

  const tabs: { key: Tab; label: string }[] = [
    { key: 'all',               label: 'All Clients'              },
    { key: 'entertainment',     label: 'Entertainment'            },
    { key: 'non-entertainment', label: 'Non-Entertainment'         },
  ];

  const filtered =
    tab === 'all'               ? clients
    : tab === 'entertainment'   ? clients.filter((c) =>  c.isEntertainment)
    :                             clients.filter((c) => !c.isEntertainment);

  // Sort alphabetically
  const current = [...filtered].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      {/* Hero */}
      <section className="flex min-h-[50vh] flex-col items-center justify-center bg-[var(--navy)] px-5 pb-16 pt-[120px] text-center sm:px-10 sm:pb-20 sm:pt-32 lg:px-12">
        <div className={`mb-2 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.18em] text-white/40 ${FM}`}>
          <span className="h-px w-6 bg-white/30" /> Our Clients
        </div>
        <h1 ref={heroRef} className={`mt-3 text-[clamp(40px,10vw,96px)] font-normal leading-[1.05] tracking-[0.01em] text-white ${FA}`}>
          <span className="block overflow-hidden"><span className="cl-hero-line block opacity-0 [will-change:transform,opacity,filter]">Brands That</span></span>
          <span className="block overflow-hidden"><span className="cl-hero-line block opacity-0 [will-change:transform,opacity,filter]">Trust</span></span>
          <span className="block overflow-hidden"><span className="cl-hero-line block opacity-0 [will-change:transform,opacity,filter]"><em className="italic text-magenta">TSBI.</em></span></span>
        </h1>
        <p className="mx-auto mt-5 max-w-[480px] text-sm font-light leading-[1.8] text-white/50 sm:text-base">
          From multinationals to independents — across entertainment, beauty, tech and luxury —
          they all chose TSBI.
        </p>
      </section>

      {/* Tab nav */}
      <div className="sticky top-14 z-[100] flex gap-0 overflow-x-auto border-b border-[var(--border)] bg-white px-5 sm:px-10 lg:px-12 [&::-webkit-scrollbar]:hidden">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`shrink-0 whitespace-nowrap border-b-2 px-4 py-4 text-[10px] uppercase tracking-[0.1em] transition-colors sm:px-5 ${FM} ${tab === t.key ? 'border-magenta text-magenta' : 'border-transparent text-black/45 hover:text-[var(--ink)]'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Logo grid */}
      <section className="bg-[var(--off)] px-5 py-12 sm:px-10 sm:py-16 lg:px-12 lg:py-20">
        <div ref={gridRef} className="grid grid-cols-2 gap-3 sm:grid-cols-[repeat(auto-fill,minmax(180px,1fr))] sm:gap-3.5">
          {current.map((client) => (
            <div key={client.name} className="cl-card-anim h-full">
              <LogoCard client={client} />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--navy)] px-5 py-16 text-center sm:px-10 sm:py-20">
        <p className={`mb-7 text-[clamp(26px,5vw,48px)] font-normal italic text-white ${FA}`}>Want to work with us?</p>
        <Link href="/contact" className="btn-fill" style={{ background: 'var(--magenta)' }}>
          Start a Conversation →
        </Link>
      </section>
    </>
  );
}
