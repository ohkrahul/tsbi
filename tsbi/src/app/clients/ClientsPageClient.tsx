'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import type { ClientCard } from '@/lib/clients';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Tab = 'all' | 'entertainment' | 'non-entertainment';

/**
 * Which A-Z bucket a client falls in. Anything not starting with a letter
 * ("&TV") goes under #, which is also where localeCompare sorts it.
 */
const letterOf = (name: string) => {
  const ch = name.trim().charAt(0).toUpperCase();
  return ch >= 'A' && ch <= 'Z' ? ch : '#';
};

const ALPHABET = ['#', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];

/* fonts — same as the home page */
const FA = 'font-fa'; // display headings — maps to Space Grotesk
const FM = 'font-fm'; // Space Grotesk — labels & body

/* ── Single logo card ── */
function LogoCard({ client }: { client: ClientCard }) {
  const [imgErr, setImgErr] = useState(false);
  const work = client.work;
  // One case study opens directly; several land on the case-studies page
  // filtered to this client, rather than picking one of them arbitrarily.
  const caseUrl =
    work.length === 0
      ? null
      : work.length === 1
        ? `/case-studies/${work[0].slug}`
        : `/case-studies?client=${client.slug}`;

  const initials = client.name
    .split(/[\s&·]+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');

  const card = (
    <div className={`group relative flex h-full flex-col items-center gap-3.5 overflow-hidden rounded-2xl border border-black/[0.07] bg-white px-5 pb-[22px] pt-7 text-center shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] ${caseUrl ? 'cursor-pointer hover:border-magenta/30' : ''}`}>
      {caseUrl && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-magenta/90 to-transparent pb-2.5 pt-5 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className={`text-[10px] font-bold uppercase tracking-[0.12em] text-white ${FM}`}>
            {work.length > 1 ? `View ${work.length} Case Studies →` : 'View Case Study →'}
          </span>
        </div>
      )}

      {work.length > 1 && (
        <span className={`absolute right-2.5 top-2.5 rounded-full bg-magenta/[0.09] px-2 py-[3px] text-[8px] font-bold uppercase tracking-[0.1em] text-magenta ${FM}`}>
          {work.length} case studies
        </span>
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
            className={`flex h-[72px] w-[72px] items-center justify-center rounded-xl text-[22px] font-semibold tracking-[0.01em] ${FA}`}
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
export default function ClientsPageClient({ clients }: { clients: ClientCard[] }) {
  const [tab, setTab] = useState<Tab>('all');
  const [letter, setLetter] = useState('');
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
  }, [tab, letter]);

  const tabs: { key: Tab; label: string }[] = [
    { key: 'all',               label: 'All Clients'              },
    { key: 'entertainment',     label: 'Entertainment'            },
    { key: 'non-entertainment', label: 'Non-Entertainment'         },
  ];

  const filtered =
    tab === 'all'               ? clients
    : tab === 'entertainment'   ? clients.filter((c) =>  c.isEntertainment)
    :                             clients.filter((c) => !c.isEntertainment);

  // Only offer letters that exist in the section being shown.
  const available = new Set(filtered.map((c) => letterOf(c.name)));

  // Sort alphabetically
  const current = [...filtered]
    .filter((c) => !letter || letterOf(c.name) === letter)
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      {/* Hero */}
      <section className="flex min-h-[50vh] flex-col items-center justify-center bg-[var(--navy)] px-5 pb-16 pt-[120px] text-center sm:px-10 sm:pb-20 sm:pt-32 lg:px-12">
        <div className={`mb-2 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.18em] text-white/40 ${FM}`}>
          <span className="h-px w-6 bg-white/30" /> Our Clients
        </div>
        <h1 ref={heroRef} className={`mt-3 text-[clamp(40px,10vw,96px)] font-semibold uppercase leading-[1.05] tracking-[0.01em] text-white ${FA}`}>
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
            onClick={() => { setTab(t.key); setLetter(''); }}
            className={`shrink-0 whitespace-nowrap border-b-2 px-4 py-4 text-[10px] uppercase tracking-[0.1em] transition-colors sm:px-5 ${FM} ${tab === t.key ? 'border-magenta text-magenta' : 'border-transparent text-black/45 hover:text-[var(--ink)]'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* A–Z filter */}
      <section className="border-b border-[var(--border)] bg-white px-5 py-4 sm:px-10 lg:px-12">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setLetter('')}
            className={`${FM} rounded-md px-2.5 py-1 text-[10px] uppercase tracking-[0.1em] transition-colors ${!letter ? 'bg-magenta text-white' : 'text-black/50 hover:bg-black/[0.04] hover:text-[var(--ink)]'}`}
          >
            All
          </button>
          <span className="mx-1 h-4 w-px bg-black/10" />
          {ALPHABET.map((l) => {
            const has = available.has(l);
            return (
              <button
                key={l}
                onClick={() => setLetter(letter === l ? '' : l)}
                disabled={!has}
                aria-pressed={letter === l}
                aria-label={l === '#' ? 'Clients starting with a symbol or number' : `Clients starting with ${l}`}
                className={`${FM} grid size-7 place-items-center rounded-md text-[11px] font-semibold transition-colors ${
                  letter === l
                    ? 'bg-magenta text-white'
                    : has
                      ? 'text-[var(--ink)] hover:bg-magenta/10 hover:text-magenta'
                      : 'cursor-not-allowed text-black/15'
                }`}
              >
                {l}
              </button>
            );
          })}
          <span className={`${FM} ml-auto text-[10px] uppercase tracking-[0.12em] text-black/40`}>
            {current.length} {current.length === 1 ? 'client' : 'clients'}
          </span>
        </div>
      </section>

      {/* Logo grid */}
      <section className="bg-[var(--off)] px-5 py-12 sm:px-10 sm:py-16 lg:px-12 lg:py-20">
        <div ref={gridRef} className="grid grid-cols-2 gap-3 sm:grid-cols-[repeat(auto-fill,minmax(180px,1fr))] sm:gap-3.5">
          {current.map((client) => (
            <div key={client.name} className="cl-card-anim h-full">
              <LogoCard client={client} />
            </div>
          ))}
        </div>
        {current.length === 0 && (
          <p className={`${FM} py-16 text-center text-sm text-black/35`}>
            No clients under “{letter}” in this section.
          </p>
        )}
      </section>

      {/* CTA */}
      <section className="bg-[var(--navy)] px-5 py-16 text-center sm:px-10 sm:py-20">
        <p className="mb-7 text-[clamp(26px,5vw,48px)] font-normal italic text-white font-fi">Want to work with us?</p>
        <Link href="/contact" className="btn-fill" style={{ background: 'var(--magenta)' }}>
          Start a Conversation →
        </Link>
      </section>
    </>
  );
}
