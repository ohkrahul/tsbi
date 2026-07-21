import type { Metadata } from 'next';
import Link from 'next/link';
import { Bricolage_Grotesque } from 'next/font/google';
import { caseStudies } from '@/lib/caseStudies';
import { STUDIO_TIERS, STUDIO_STATS, STUDIO_CLIENTS } from '@/components/studio/studioContent';
import StudioFaq from '@/components/studio/StudioFaq';

// New display font for this prototype only — scoped to the `.studio` wrapper via its CSS
// variable so the global 3-font system (Space Grotesk / DM Sans / Playfair) is untouched.
const bricolage = Bricolage_Grotesque({
  variable: '--font-bricolage',
  subsets: ['latin'],
  weight: ['300', '400', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Studio — TSBI',
  description: 'A global branding, content and digital-growth studio — from Mumbai to MENA.',
};

const CONTAINER = 'mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-14';

// Film work for the case-study grid — real case studies, ordered, top 6.
const WORK = caseStudies.filter((c) => c.track !== 'tech').sort((a, b) => a.order - b.order).slice(0, 6);

export default function StudioPage() {
  return (
    <div className={`studio ${bricolage.variable}`}>
      {/* ── 01 · HERO (dark) ─────────────────────────────── */}
      <section className="st-dark st-hero relative overflow-hidden">
        <div className={`${CONTAINER} pb-24 sm:pb-32`}>
          <div className="reveal sec-label pink"><span className="num">01</span> the small big idea · est. 2013</div>
          <h1 className="st-display reveal d1 mt-6 text-[clamp(52px,10vw,140px)] leading-[0.9] tracking-[-0.02em]" style={{ color: 'var(--sec-fg)' }}>
            <span className="font-light">we make brands</span>
            <br />
            <span className="font-extrabold text-magenta">unmissable.</span>
          </h1>
          <p className="reveal d2 mt-8 max-w-[560px] text-[clamp(15px,1.5vw,19px)] font-light leading-[1.7]" style={{ color: 'var(--sec-muted)' }}>
            A full-service digital marketing agency helping brands grow through content, culture
            and creativity — from Mumbai to MENA.
          </p>
          <div className="reveal d3 mt-10 flex flex-wrap gap-4">
            <Link href="/contact" className="btn-fill">let&apos;s talk <span className="arr">→</span></Link>
            <Link href="#work" className="btn-border">see the work <span className="arr">→</span></Link>
          </div>
        </div>
      </section>

      {/* ── 02 · SERVICES (light) ────────────────────────── */}
      <section className="st-light st-sec">
        <div className={CONTAINER}>
          <div className="reveal sec-label pink"><span className="num">02</span> what we do</div>
          <div className="mt-6 border-t" style={{ borderColor: 'var(--sec-line)' }}>
            {STUDIO_TIERS.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="st-tier reveal group grid items-baseline gap-x-6 gap-y-2 border-b py-7 sm:grid-cols-[auto_minmax(0,1fr)_minmax(0,1.15fr)]"
                style={{ borderColor: 'var(--sec-line)' }}
              >
                <span className="font-fm text-[13px] font-semibold tracking-[0.1em] text-magenta">{t.num}</span>
                <h3 className="st-display text-[clamp(26px,3.4vw,48px)] leading-none transition-colors duration-300 group-hover:text-magenta" style={{ color: 'var(--sec-fg)' }}>
                  {t.title}
                </h3>
                <p className="max-w-[460px] text-[14px] font-light leading-[1.7]" style={{ color: 'var(--sec-muted)' }}>{t.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 03 · WORK (dark navy) ────────────────────────── */}
      <section id="work" className="st-navy st-sec">
        <div className={CONTAINER}>
          <div className="reveal sec-label pink"><span className="num">03</span> selected work</div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
            {WORK.map((item, i) => (
              <Link key={item.slug} href={`/case-studies/${item.slug}`} className="st-work-card reveal group relative block overflow-hidden rounded-xl bg-black ring-1 ring-white/10">
                <div className="relative aspect-[4/3] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={item.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="absolute right-3 top-3 font-fm text-[10px] font-semibold tracking-[0.2em] text-white/70">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div className="p-5">
                  <div className="font-fm text-[10px] font-semibold uppercase tracking-[0.16em] text-magenta">{item.clientName}</div>
                  <h3 className="st-display mt-1.5 text-[20px] leading-[1.1] text-white">{item.title}</h3>
                  <div className="mt-1.5 font-fm text-[11px] tracking-[0.02em] text-white/45">{item.category}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 04 · METRICS (magenta accent) ────────────────── */}
      <section className="st-accent st-sec">
        <div className={CONTAINER}>
          <div className="reveal sec-label pink"><span className="num">04</span> by the numbers</div>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STUDIO_STATS.map((s) => (
              <div key={s.label} className="reveal">
                <div className="st-display text-[clamp(44px,6vw,86px)] font-extrabold leading-[0.9] text-white">{s.value}</div>
                <div className="mt-2 font-fm text-[11px] font-semibold uppercase tracking-[0.18em] text-white/75">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="reveal mt-14 flex flex-wrap gap-2.5">
            {STUDIO_CLIENTS.map((c) => (
              <span key={c} className="rounded-full border border-white/25 px-4 py-2 font-fm text-[12px] font-medium text-white/90">{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 05 · FAQ (light) ─────────────────────────────── */}
      <section className="st-light st-sec">
        <div className={CONTAINER}>
          <div className="reveal sec-label pink"><span className="num">05</span> questions</div>
          <div className="reveal mt-8">
            <StudioFaq />
          </div>
        </div>
      </section>

      {/* ── 06 · CTA (dark) ──────────────────────────────── */}
      <section className="st-dark st-sec">
        <div className={`${CONTAINER} text-center`}>
          <div className="reveal sec-label pink justify-center"><span className="num">06</span> let&apos;s talk</div>
          <h2 className="st-display reveal d1 mx-auto mt-6 max-w-[13ch] text-[clamp(40px,7vw,100px)] font-extrabold leading-[0.95]" style={{ color: 'var(--sec-fg)' }}>
            let&apos;s build something <span className="text-magenta">unmissable.</span>
          </h2>
          <div className="reveal d2 mt-9 flex justify-center">
            <Link href="/contact" className="btn-fill">start a project <span className="arr">→</span></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
