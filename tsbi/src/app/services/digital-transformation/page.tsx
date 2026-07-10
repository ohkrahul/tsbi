'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { techCaseStudies } from '@/lib/caseStudies';

gsap.registerPlugin(ScrollTrigger);

/* ── compact line-icon set ── */
function Icon({ type, color = '#e0197d', size = 26 }: { type: string; color?: string; size?: number }) {
  const p = { fill: 'none', stroke: color, strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  const map: Record<string, React.ReactNode> = {
    web: <><rect x="2.5" y="4" width="19" height="14" rx="2" {...p} /><path d="M2.5 8h19M6 21h12" {...p} /></>,
    app: <><rect x="3" y="3" width="18" height="18" rx="3" {...p} /><path d="M8 8h8M8 12h8M8 16h5" {...p} /></>,
    mobile: <><rect x="7" y="2.5" width="10" height="19" rx="2.5" {...p} /><path d="M11 18.5h2" {...p} /></>,
    micro: <><rect x="3" y="5" width="18" height="11" rx="2" {...p} /><path d="M8 20h8M12 16v4" {...p} /></>,
    cart: <><circle cx="9" cy="20" r="1.4" {...p} /><circle cx="17" cy="20" r="1.4" {...p} /><path d="M2 3h3l2.2 11h10l2-7H6" {...p} /></>,
    game: <><rect x="2.5" y="7" width="19" height="10" rx="4" {...p} /><path d="M7 11v2M6 12h2M15.5 11.5h.01M18 13.5h.01" {...p} /></>,
    dash: <><rect x="3" y="3" width="8" height="11" rx="1.5" {...p} /><rect x="13" y="3" width="8" height="6" rx="1.5" {...p} /><rect x="13" y="12" width="8" height="9" rx="1.5" {...p} /><rect x="3" y="17" width="8" height="4" rx="1.5" {...p} /></>,
    api: <><path d="M9 7l-5 5 5 5M15 7l5 5-5 5" {...p} /></>,
    seo: <><circle cx="11" cy="11" r="6.5" {...p} /><path d="M16 16l4 4M8.5 11l2 2 3.5-4" {...p} /></>,
    support: <><path d="M4 13a8 8 0 0116 0" {...p} /><rect x="2.5" y="13" width="4" height="6" rx="1.5" {...p} /><rect x="17.5" y="13" width="4" height="6" rx="1.5" {...p} /><path d="M19.5 19a4 4 0 01-4 3h-2" {...p} /></>,
    globe: <><circle cx="12" cy="12" r="9" {...p} /><path d="M3 12h18M12 3c-3 4-3 14 0 18M12 3c3 4 3 14 0 18" {...p} /></>,
    mega: <><path d="M3 11v2a1 1 0 001 1h2l5 4V6L6 10H4a1 1 0 00-1 1z" {...p} /><path d="M15 8a4 4 0 010 8" {...p} /></>,
    layers: <><path d="M12 3l9 5-9 5-9-5 9-5z" {...p} /><path d="M3 13l9 5 9-5" {...p} /></>,
    growth: <><path d="M3 3v18h18" {...p} /><path d="M7 15l4-5 3 3 5-7" {...p} /></>,
    search: <><circle cx="11" cy="11" r="6" {...p} /><path d="M15.5 15.5L20 20" {...p} /></>,
    pen: <><path d="M4 20l4-1 11-11-3-3L5 16l-1 4z" {...p} /></>,
    code: <><path d="M9 8l-4 4 4 4M15 8l4 4-4 4" {...p} /></>,
    rocket: <><path d="M5 14c-1 2-1 5-1 5s3 0 5-1m-4-4c0-7 5-10 11-11 -1 6-4 11-11 11z" {...p} /><circle cx="14.5" cy="9.5" r="1.4" {...p} /></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24">{map[type] ?? map.web}</svg>;
}

const offerings = [
  { icon: 'web', title: 'Website Development', desc: 'Fast, responsive and SEO-friendly websites that reflect your brand.' },
  { icon: 'app', title: 'Web App Development', desc: 'Scalable web applications built for performance and growth.' },
  { icon: 'mobile', title: 'Mobile App Development', desc: 'Native & cross-platform apps for iOS and Android.' },
  { icon: 'micro', title: 'Microsites & Landing Pages', desc: 'Conversion-driven microsites for campaigns and launches.' },
  { icon: 'cart', title: 'Ecommerce Development', desc: 'Secure, scalable and delightful online shopping experiences.' },
  { icon: 'game', title: 'Gamified Experiences', desc: 'Engaging games & interactive experiences that drive results.' },
  { icon: 'dash', title: 'Custom Dashboards & Portals', desc: 'Real-time dashboards and portals that simplify complex data.' },
  { icon: 'api', title: 'Backend & API Integrations', desc: 'Robust backend systems and seamless third-party integrations.' },
  { icon: 'seo', title: 'SEO & Performance Optimization', desc: 'Better visibility, speed and performance that rank.' },
  { icon: 'support', title: 'Maintenance & Support', desc: 'Reliable support & continuous updates to keep you ahead.' },
];

const whatWeBuild = [
  { icon: 'globe', tint: '#7b1fa2', title: 'Brand Websites', desc: 'Modern, high-performance websites that strengthen brand presence.' },
  { icon: 'mega', tint: '#e0197d', title: 'Campaign Tech', desc: 'Interactive campaigns & microsites that engage and convert audiences.' },
  { icon: 'layers', tint: '#1a6aff', title: 'Business Platforms', desc: 'Custom platforms & portals that streamline operations and boost efficiency.' },
  { icon: 'growth', tint: '#16a34a', title: 'Commerce & Growth', desc: 'Ecommerce & digital products designed to acquire, engage and scale revenue.' },
];

const steps = [
  { n: '1', color: '#7b1fa2', icon: 'search', title: 'Discover', desc: 'We understand your goals, audience and challenges.' },
  { n: '2', color: '#e0197d', icon: 'pen', title: 'Design', desc: 'We craft strategy, UX/UI and product roadmap.' },
  { n: '3', color: '#1a6aff', icon: 'code', title: 'Develop', desc: 'We build robust, scalable and future-ready solutions.' },
  { n: '4', color: '#16a34a', icon: 'rocket', title: 'Launch & Support', desc: 'We launch, monitor and optimize for long-term growth.' },
];

const logos = [
  { name: 'Lipton', color: '#d99000' },
  { name: 'Red Label', color: '#c4161c' },
  { name: 'Zydus', color: '#0066b3' },
  { name: 'Vatika', color: '#2e7d32' },
  { name: 'Sandu', color: '#1a1a2e' },
  { name: 'LuLu', color: '#6a1b9a' },
];

const phoneRows = [
  { img: '/tech/2.png', name: 'Red Label Campaign', v: '2.3%' },
  { img: '/tech/1.png', name: 'Lipton Game', v: '6.3%' },
  { img: '/tech/9.png', name: 'Thank You Fighter', v: '3.5%' },
];

export default function DigitalTransformationPage() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set('.dt-hero-anim, .dt-hero-art, .dt-reveal, .dt-card', { opacity: 1, y: 0, scale: 1 });
        return;
      }
      // Hero entrance — staggered fade-up on load.
      gsap.set('.dt-hero-anim', { y: 24 });
      gsap.set('.dt-hero-art', { y: 30, scale: 0.97 });
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.to('.dt-hero-anim', { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 }, 0.1)
        .to('.dt-hero-art', { opacity: 1, y: 0, scale: 1, duration: 0.9 }, 0.3);

      // Headings / CTA — fade-up as they scroll in (no hover transform, safe to move).
      gsap.set('.dt-reveal', { y: 28 });
      ScrollTrigger.batch('.dt-reveal', {
        start: 'top 88%',
        once: true,
        onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' }),
      });

      // Cards — opacity-only stagger so GSAP never writes a transform that would
      // override the Tailwind hover:-translate-y lift.
      ScrollTrigger.batch('.dt-card', {
        start: 'top 90%',
        once: true,
        onEnter: (els) => gsap.to(els, { opacity: 1, duration: 0.55, stagger: 0.07, ease: 'power2.out' }),
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ── HERO ── */}
      <section
        className="overflow-hidden px-12 pt-[140px] pb-16 max-[900px]:px-8 max-[900px]:pt-[120px] max-[900px]:pb-14"
        style={{
          background:
            'radial-gradient(circle at 78% 22%, rgba(224,25,125,.38) 0%, transparent 45%),' +
            'radial-gradient(circle at 90% 88%, rgba(26,106,255,.34) 0%, transparent 45%),' +
            'radial-gradient(circle at 8% 70%, rgba(224,25,125,.18) 0%, transparent 40%),' +
            'linear-gradient(135deg,#120014,#0a0a18)',
        }}
      >
        <div className="mx-auto grid max-w-[1300px] items-center gap-9 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12">
          {/* left — copy */}
          <div>
            <div className="sec-label pink mb-[18px] dt-hero-anim opacity-0">Technology · Strategy · Experience</div>
            <h1 className="dt-hero-anim opacity-0 font-fa m-0 text-[clamp(30px,4.4vw,56px)] font-semibold uppercase leading-[1.06] tracking-[0.01em] text-white">
              Tech Solutions That{' '}
              <span className="text-[#b96cff]">Build</span>,{' '}
              <span className="text-magenta">Launch</span> &{' '}
              <span className="text-[#4d8bff]">Scale</span>{' '}
              Digital Experiences
            </h1>
            <p className="dt-hero-anim opacity-0 font-fb mt-6 mb-8 max-w-[540px] text-base font-light leading-[1.8] text-white/65">
              TSBI is a digital product and technology partner that helps brands create powerful websites,
              web &amp; mobile apps, microsites, campaign tech, eCommerce experiences, dashboards and custom
              platforms that drive growth.
            </p>
            <div className="dt-hero-anim opacity-0 flex flex-wrap gap-3.5">
              <Link href="#offer" className="btn-fill" style={{ background: 'var(--magenta)' }}>Explore Services →</Link>
              <Link href="/case-studies" className="btn-border" style={{ color: 'rgba(255,255,255,.8)', borderColor: 'rgba(255,255,255,.3)' }}>▶ View Work</Link>
            </div>
            <div className="dt-hero-anim opacity-0 mt-9 flex flex-wrap items-center gap-[22px]">
              <span className="font-fm -mb-2 w-full text-[11px] tracking-[0.04em] text-white/45">Trusted by startups, enterprises &amp; global brands</span>
              {logos.map((l) => (
                <span key={l.name} className="font-fd text-[19px] font-extrabold leading-none text-white/75">{l.name}</span>
              ))}
            </div>
          </div>

          {/* right — device banner */}
          <div className="dt-hero-art opacity-0 relative min-h-[460px] max-[900px]:min-h-[380px]">
            {/* decorative */}
            <div className="absolute right-[-6%] top-[2%] z-0 aspect-square w-[86%] rounded-full bg-[radial-gradient(circle_at_55%_42%,rgba(123,31,162,0.16),rgba(224,25,125,0.10)_46%,transparent_70%)]" />
            <div className="absolute left-0 top-[4%] z-[1] h-[60px] w-24 bg-[radial-gradient(currentColor_1.5px,transparent_1.6px)] bg-[length:13px_13px] text-[#b9a7ff] opacity-55" />
            <div className="absolute bottom-[10%] right-[2%] z-[1] h-[60px] w-24 bg-[radial-gradient(currentColor_1.5px,transparent_1.6px)] bg-[length:13px_13px] text-[#f4a7c8] opacity-55" />

            {/* laptop */}
            <div className="absolute left-[9%] top-[7%] z-[2] w-[80%]">
              <div className="rounded-t-xl border-[7px] border-[#161a2c] bg-[#11152a] p-3">
                <div className="overflow-hidden rounded-lg bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/tech/1.png" alt="Lipton" className="block aspect-16/10 w-full object-cover" />
                </div>
              </div>
              <div className="-ml-[8%] h-[13px] w-[116%] rounded-b-xl bg-gradient-to-b from-[#d4d8e3] to-[#a9aebd] shadow-[0_16px_30px_rgba(0,0,0,0.18)]" />
            </div>

            {/* code badge */}
            <div className="absolute right-[8%] top-[28%] z-[5] rounded-lg bg-[#11152a] px-3 py-2 font-mono text-[13px] text-white shadow-[0_10px_24px_rgba(0,0,0,0.3)]">&lt;/&gt;</div>

            {/* phone */}
            <div className="absolute bottom-0 left-0 z-[4] w-[27%] rounded-[22px] bg-[#11152a] p-2 shadow-[0_24px_50px_rgba(0,0,0,0.28)]">
              <div className="overflow-hidden rounded-2xl bg-white px-[11px] py-3">
                <div className="font-fm text-[9px] font-semibold text-muted">Campaign Overview</div>
                <div className="font-fd mb-3 mt-0.5 text-xl font-black leading-[1.1] text-ink">2.45M<small className="font-fm ml-1.5 text-[9px] font-semibold text-[#16a34a]">+8.32%</small></div>
                {phoneRows.map((r) => (
                  <div key={r.name} className="flex items-center gap-2 border-t border-black/5 py-1.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={r.img} alt="" className="h-[22px] w-[22px] shrink-0 rounded-md object-cover" />
                    <span className="font-fm flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-[9px] text-ink">{r.name}</span>
                    <em className="font-fm text-[9px] font-semibold not-italic text-magenta">{r.v}</em>
                  </div>
                ))}
              </div>
            </div>

            {/* tablet */}
            <div className="absolute bottom-[3%] right-[-2%] z-[3] w-[33%] rounded-[14px] bg-[#11152a] p-1.5 shadow-[0_22px_45px_rgba(0,0,0,0.24)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/tech/7.png" alt="Sandu — 125 years of trust" className="block aspect-[3/4] w-full rounded-[9px] object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES WE OFFER ── */}
      <section id="offer" className="bg-off px-12 py-[84px] max-sm:px-6 max-sm:py-[60px]">
        <div className="mx-auto max-w-[1300px]">
          <h2 className="dt-reveal opacity-0 font-fa m-0 text-center text-[clamp(28px,3.4vw,44px)] font-semibold leading-[1.1] tracking-[0.01em]">Services We Offer</h2>
          <div className="mx-auto mb-12 mt-2 h-[3px] w-[46px] rounded-sm bg-magenta" />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {offerings.map((o) => (
              <div key={o.title} className="dt-card opacity-0 rounded-xl border border-border-c bg-white p-6 transition-all duration-200 hover:-translate-y-1.5 hover:border-magenta hover:shadow-[0_22px_50px_rgba(0,0,0,0.10)]">
                <div className="mb-4 flex h-[46px] w-[46px] items-center justify-center rounded-[10px] bg-magenta/10"><Icon type={o.icon} /></div>
                <div className="font-fd mb-2 text-lg font-bold leading-tight">{o.title}</div>
                <p className="font-fb m-0 text-[13px] font-light leading-[1.65] text-muted">{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT WE BUILD ── */}
      <section className="bg-white px-12 py-[84px] max-sm:px-6 max-sm:py-[60px]">
        <div className="mx-auto max-w-[1300px]">
          <h2 className="dt-reveal opacity-0 font-fa m-0 text-center text-[clamp(28px,3.4vw,44px)] font-semibold leading-[1.1] tracking-[0.01em]">What We Build</h2>
          <div className="mx-auto mb-12 mt-2 h-[3px] w-[46px] rounded-sm bg-magenta" />
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {whatWeBuild.map((b) => (
              <div key={b.title} className="dt-card opacity-0 rounded-xl border border-border-c bg-white p-7">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: `${b.tint}14` }}><Icon type={b.icon} color={b.tint} size={24} /></div>
                <div className="font-fd mb-2 text-[19px] font-bold">{b.title}</div>
                <p className="font-fb m-0 text-[13px] font-light leading-[1.65] text-muted">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SELECTED WORK ── */}
      <section className="bg-off  py-[84px] max-sm:px-6 max-sm:py-[60px]">
        <div className="mx-auto max-w-[1300px]">
          <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
            <h2 className="dt-reveal opacity-0 font-fa m-0 text-[clamp(28px,3.4vw,44px)] font-semibold leading-[1.1] tracking-[0.01em]">Selected Work</h2>
            <Link href="/case-studies" className="font-fm text-xs tracking-[0.06em] text-magenta no-underline">View all projects →</Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...techCaseStudies]
              .sort((a, b) => a.clientName.localeCompare(b.clientName))
              .map((s) => (
              <Link key={s.slug} href={`/case-studies/${s.slug}`} className="dt-card opacity-0 group block overflow-hidden rounded-xl border border-border-c bg-white no-underline transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_50px_rgba(0,0,0,0.12)]">
                <div className="relative aspect-video overflow-hidden" style={{ background: `linear-gradient(135deg, ${s.gradFrom}, ${s.gradTo})` }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.image} alt={s.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[400ms] group-hover:scale-105" />
                </div>
                <div className="flex items-center justify-between gap-2 px-3.5 pb-3.5 pt-3">
                  <div>
                    <div className="font-fm mb-1 text-[8px] uppercase tracking-[0.1em]" style={{ color: s.accent }}>{s.category.split(' · ')[0]}</div>
                    <div className="font-fd text-[15px] font-bold leading-tight text-ink">{s.clientName}</div>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0 text-muted"><path d="M7 17L17 7M17 7H9M17 7v8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW WE WORK ── */}
      <section className="bg-white px-12 py-[84px] max-sm:px-6 max-sm:py-[60px]">
        <div className="mx-auto max-w-[1300px]">
          <h2 className="dt-reveal opacity-0 font-fa m-0 text-center text-[clamp(28px,3.4vw,44px)] font-semibold leading-[1.1] tracking-[0.01em]">How We Work</h2>
          <div className="mx-auto mb-12 mt-2 h-[3px] w-[46px] rounded-sm bg-magenta" />
          <div className="relative grid grid-cols-2 gap-7 md:grid-cols-4 md:before:absolute md:before:left-[6%] md:before:right-[6%] md:before:top-4 md:before:z-0 md:before:border-t-2 md:before:border-dashed md:before:border-black/10 md:before:content-['']">
            {steps.map((st) => (
              <div key={st.n} className="dt-card opacity-0 relative z-[1] text-center">
                <div className="font-fd mx-auto mb-[18px] flex h-[34px] w-[34px] items-center justify-center rounded-full text-[15px] font-extrabold text-white" style={{ background: st.color }}>{st.n}</div>
                <div className="mx-auto mb-3.5 flex h-11 w-11 items-center justify-center rounded-xl bg-off"><Icon type={st.icon} color={st.color} size={22} /></div>
                <div className="font-fd mb-2 text-lg font-bold">{st.title}</div>
                <p className="font-fb mx-auto m-0 max-w-[220px] text-[13px] font-light leading-[1.65] text-muted">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="px-12 pb-20 pt-6 max-sm:px-6">
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-8 rounded-[22px] bg-[linear-gradient(110deg,#7b1fa2_0%,#e0197d_70%,#ff4fa3_100%)] p-[clamp(36px,5vw,64px)] text-white">
          <div>
            <h2 className="dt-reveal opacity-0 font-fa m-0 mb-2 text-[clamp(24px,3vw,40px)] font-semibold leading-[1.12] tracking-[0.01em]">Need a tech partner for<br />your next digital product?</h2>
            <p className="font-fb m-0 text-sm font-light opacity-90">Let&apos;s build something impactful together.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className="btn-fill" style={{ background: '#fff', color: 'var(--ink)' }}>Let&apos;s Talk →</Link>
            <Link href="/case-studies" className="btn-border" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.45)' }}>See More Case Studies →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
