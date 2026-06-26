'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import gsap from 'gsap';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import HeroAnimation from '@/components/HeroAnimation';
import Preloader from '@/components/Preloader';
import CaseStudyCarousel from '@/components/CaseStudyCarousel';

/* ──────────────────────────────────────────────────────────────────────────
   HOME PAGE — single file (kept in one component so animations can be wired
   across every section). Styles live in globals.css (.hh / .bls / .bts /
   .csc / .cw2 / .bic classes).
   ────────────────────────────────────────────────────────────────────────── */

// ── Hero slides ──────────────────────────────────────────
// All three banners are 1920×630 (aspect ≈ 3.05). Paths are URL-encoded for the
// spaces in the folder/file names. `tag`/`caption` render as a small text overlay
// on the empty left side of the banner — mobile only (see hero markup). Edit freely.
type Slide = { src: string; alt: string; tag?: string; caption?: string };
const SLIDES: Slide[] = [
  { src: '/about%20us/webbanner%201%20Ashish%20Vidyarthi.jpg.jpeg', alt: 'Ashish Vidyarthi', tag: 'Featured', caption: 'Ashish Vidyarthi' },
  { src: '/about%20us/webbanner%202%20msd.jpg.jpeg', alt: 'MS Dhoni', tag: 'Featured', caption: 'MS Dhoni' },
  { src: '/about%20us/webbanner%203%20mi.jpg.jpeg', alt: 'Mumbai Indians', tag: 'Official Partner', caption: 'Mumbai Indians' },
];

// ── Brand logos (two greyscale rows) ─────────────────────
type Logo = { name: string; src: string; color?: boolean };

const ROW_ONE: Logo[] = [
  { name: "Dabur Herb'l", src: '/non-entertainment/dabur.png' },
  { name: 'Into It', src: '/non-entertainment/final_logo_INTOIT-02_89b8d92c-0882-4d89-8215-fc7bbe82fb29.webp' },
  { name: 'AGL', src: '/non-entertainment/agl.png' },
  { name: 'GSK', src: '/non-entertainment/GSK_Logo_PNG5.png' },
  { name: 'Devgn Films', src: '/entertainment/devgan.png', color: true },
  { name: 'Lodha', src: '/non-entertainment/lodha.png' },
  { name: 'Pret', src: '/non-entertainment/pret.png' },
  { name: 'GreatWhite', src: '/non-entertainment/GreatWhite-logo-696x364.png' },
];

const ROW_TWO: Logo[] = [
  { name: 'Mumbai Indians', src: '/entertainment/MI.jpg' },
  { name: 'Zee TV', src: '/entertainment/zee%20tv.png' },
  { name: 'JioHotstar', src: '/entertainment/jiohotstart.png' },
  { name: 'National Geographic', src: '/entertainment/national%20geographic.png' },
  { name: 'KidZania', src: '/non-entertainment/kidsznia.png' },
  { name: 'Dharma Productions', src: '/entertainment/dharma%20production.png' },
  { name: 'Disney India', src: '/entertainment/disney%20india.png' },
  { name: 'Filmfare', src: '/entertainment/filmfare.webp' },
  { name: 'Cinepolis', src: '/entertainment/cineplex.png' },
  { name: 'Colors', src: '/entertainment/colors.webp' },
];

// ── Brands that trust us — 6 featured trailers, played inline (no routing) ──
type Video = { id: string; client: string; title: string };
const VIDEOS: Video[] = [
  { id: '9FUd-D4FWjw', client: 'Dharma Productions', title: 'Sunny Sanskari Ki Tulsi Kumari' },
  { id: 'r-7g08INMSI', client: 'Dharma Productions', title: 'Kesari Chapter 2' },
  { id: 'zwtZj6YB9xk', client: 'Devgn Films', title: 'MAA' },
  { id: 'HSX_KPfbP1o', client: 'Devgn Films', title: 'Son Of Sardaar 2' },
  { id: 'MJofvf2lBNY', client: 'DHL × Mumbai Indians', title: '#ThatsMyGame & Dil Se Indian' },
  { id: 'aQo7sFLPwGw', client: 'Zydus Lifesciences', title: '#LifeKaFilter' },
];
const ytThumb = (id: string) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
const ytThumbFallback = (id: string) => `https://img.youtube.com/vi/${id}/mqdefault.jpg`;

// Explicit bento placement (desktop, 3×3) so the grid fills with no lone card and the
// featured renders at its full 2-row height. [0] = featured (big, top-right).
const BTS_CELL = [
  'col-start-2 col-span-2 row-start-1 row-span-2',
  'col-start-1 row-start-1',
  'col-start-1 row-start-2',
  'col-start-1 row-start-3',
  'col-start-2 row-start-3',
  'col-start-3 row-start-3',
];


// ── Connect poster carousel (all 10 posters) ─────────────
const CONNECT_POSTERS = [
  { label: 'Happy Patel',                    img: '/Movie%20Posters/Happy%20Patel.jpg' },
  { label: 'ASSI',                           img: '/Movie%20Posters/ASSI.jpg' },
  { label: 'Main Vaapas Aaunga',             img: '/Movie%20Posters/MVA.jpeg' },
  { label: 'Ek Din',                         img: '/Movie%20Posters/Ek%20Din.jpg' },
  { label: 'Sunny Sanskari Ki Tulsi Kumari', img: '/Movie%20Posters/SSKTK.jpg' },
  { label: 'TMMTMTTM',                       img: '/Movie%20Posters/TMMTMTTM.jpg' },
  { label: 'TYM',                            img: '/Movie%20Posters/TYM.jpg' },
  { label: 'PPAVD',                          img: '/Movie%20Posters/PPAVD.jpeg' },
  { label: 'CMD',                            img: '/Movie%20Posters/CMD.jpg' },
  { label: 'Bandar',                         img: '/Movie%20Posters/Bandar.jpg' },
];

// ── CTA doodle icons (faint inline line-art) ─────────────
type Doodle = { top: string; left: string; node: React.ReactNode };
const DOODLES: Doodle[] = [
  { top: '12%', left: '8%', node: (<path d="M14 4c3 1 5 4 5 8-2 0-3 1-4 2l-3-3c1-1 2-2 2-4 0-1 0-2 0-3zM7 13l-3 1 2 3 3-1M9 17c-1 2-1 4-1 4s2 0 4-1" />) },
  { top: '7%', left: '34%', node: (<><path d="M9 16a5 5 0 1 1 6 0c-1 1-1 2-1 3h-4c0-1 0-2-1-3z" /><path d="M10 21h4" /></>) },
  { top: '14%', left: '62%', node: (<path d="M4 20V10M10 20V5M16 20v-7M20 20h-18" />) },
  { top: '9%', left: '86%', node: (<path d="M7 11v8H4v-8zM7 11l4-7c1 0 2 1 2 2l-1 4h5c1 0 2 1 1 2l-2 6c0 1-1 1-2 1H7" />) },
  { top: '40%', left: '4%', node: (<path d="M4 10v4l9 4V6zM13 8c2 0 3 1 3 4s-1 4-3 4M4 14c-1 0-1 3 1 4" />) },
  { top: '70%', left: '9%', node: (<><circle cx="10" cy="10" r="6" /><path d="M15 15l5 5" /></>) },
  { top: '86%', left: '24%', node: (<><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="1" /></>) },
  { top: '84%', left: '52%', node: (<path d="M4 20l1-4L16 5l3 3L8 19zM14 7l3 3" />) },
  { top: '80%', left: '80%', node: (<><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" /></>) },
  { top: '44%', left: '92%', node: (<><circle cx="12" cy="12" r="9" /><path d="M10 8l6 4-6 4z" /></>) },
  { top: '26%', left: '20%', node: (<path d="M4 5h16v10H9l-4 4v-4H4z" />) },
  { top: '60%', left: '88%', node: (<path d="M12 3l2.5 6 6 .5-4.5 4 1.5 6-5.5-3.5L6 19.5 7.5 13.5 3 9.5l6-.5z" />) },
];

export default function HomePage() {
  // Hero slider (Embla + autoplay)
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);

  // Which "Brands that trust us" trailer is currently playing inline (one at a time).
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    setSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect).on('reInit', onSelect);
    onSelect();
    return () => {
      emblaApi.off('select', onSelect).off('reInit', onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  // Brands bento — broken-thumbnail fallback (YouTube thumb → mq fallback → placeholder)
  const [failed, setFailed] = useState<Record<string, boolean>>({});
  const onThumbError = (id: string) => (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (img.dataset.tried !== '1') {
      img.dataset.tried = '1';
      img.src = ytThumbFallback(id);
    } else {
      setFailed((f) => (f[id] ? f : { ...f, [id]: true }));
    }
  };
  // YouTube serves a 120×90 grey "no thumbnail" image (not a 404) for some videos,
  // so onError never fires — detect it by the loaded image's natural width.
  const onThumbLoad = (id: string) => (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (img.naturalWidth > 120) return; // real thumbnail
    if (img.dataset.tried !== '1') {
      img.dataset.tried = '1';
      img.src = ytThumbFallback(id);
    } else {
      setFailed((f) => (f[id] ? f : { ...f, [id]: true }));
    }
  };

  // Brands bento — premium GSAP hover: the hovered card scales up + lifts; every
  // other card recedes (shrinks, dims) and is pushed away from it, so the whole
  // grid reacts. Animates the INNER element (transform) and only the OUTER z-index,
  // so it never collides with the scroll-reveal that drives the outer's transform.
  const focusCard = (e: React.MouseEvent<HTMLElement>) => {
    const inner = e.currentTarget;
    const grid = inner.closest('.bts-grid');
    if (!grid) return;
    const inners = Array.from(grid.querySelectorAll<HTMLElement>('.bts-card-inner'));
    const hr = inner.getBoundingClientRect();
    const hcx = hr.left + hr.width / 2;
    const hcy = hr.top + hr.height / 2;
    inners.forEach((el) => {
      const outer = el.closest<HTMLElement>('.bts-card');
      if (el === inner) {
        if (outer) gsap.set(outer, { zIndex: 30 });
        gsap.to(el, { scale: 1.08, opacity: 1, x: 0, y: 0, duration: 0.5, ease: 'power3.out', overwrite: 'auto' });
      } else {
        if (outer) gsap.set(outer, { zIndex: 1 });
        const r = el.getBoundingClientRect();
        const dx = r.left + r.width / 2 - hcx;
        const dy = r.top + r.height / 2 - hcy;
        const d = Math.hypot(dx, dy) || 1;
        gsap.to(el, { scale: 0.9, opacity: 0.45, x: (dx / d) * 24, y: (dy / d) * 24, duration: 0.5, ease: 'power3.out', overwrite: 'auto' });
      }
    });
  };
  const resetCards = (e: React.MouseEvent<HTMLElement>) => {
    const grid = e.currentTarget;
    gsap.to(grid.querySelectorAll<HTMLElement>('.bts-card-inner'), {
      scale: 1, opacity: 1, x: 0, y: 0, duration: 0.55, ease: 'power3.out', overwrite: 'auto',
    });
    grid.querySelectorAll<HTMLElement>('.bts-card').forEach((o) => gsap.set(o, { zIndex: 1 }));
  };


  return (
    <>
      {/* ── HERO (full-bleed Embla slider with the text overlaid on it) ───── */}
      {/* hero-section → ScrollTrigger anchor; GSAP parallax target */}
      <section className="hero-section group relative mt-[72px] flex w-full flex-col overflow-hidden min-[1130px]:mt-[108px] sm:block sm:h-160">
        {/* hero-image → clip-path wipe + scale reveal + cursor parallax.
            Mobile: full banner BELOW the copy (order-2), sized to the 1920×630 ratio so
            nothing is cropped. Desktop: full-bleed background behind the overlaid copy. */}
        <div className="hero-image relative order-2 aspect-1920/630 w-full sm:absolute sm:inset-0 sm:order-0 sm:aspect-auto">
          <div ref={emblaRef} className="h-full overflow-hidden">
            <div className="flex h-full">
              {SLIDES.map((s, i) => (
                <div key={s.src} className="relative h-full min-w-0 flex-[0_0_100%]">
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    priority={i === 0}
                    sizes="100vw"
                    className="object-cover object-center sm:object-right"
                  />
                  {/* caption on the empty left side of the banner — mobile only
                      (on desktop the banner is the backdrop for the main headline) */}
                  {s.caption && (
                    <div className="absolute inset-y-0 left-0 z-10 flex max-w-[58%] flex-col justify-center gap-1 bg-linear-to-r from-black/65 via-black/30 to-transparent px-5 sm:hidden">
                      {s.tag && (
                        <span className="font-fm text-[9px] font-semibold uppercase tracking-[0.18em] text-magenta">
                          {s.tag}
                        </span>
                      )}
                      <span className="font-fd text-lg font-bold leading-tight text-white">
                        {s.caption}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* scrim — desktop only; left-to-right fade so the overlaid copy reads while the
            right-hand subject stays clear. (Mobile copy sits on its own navy panel.) */}
        <div className="pointer-events-none absolute inset-0 z-1 hidden bg-linear-to-r from-black/45 via-black/10 to-transparent sm:block" />

        {/* hero-copy → cursor parallax (moves opposite to hero-image).
            Mobile: navy panel stacked ABOVE the banner (order-1). Desktop: overlaid. */}
        <div className="hero-copy relative z-10 order-1 flex flex-col justify-center gap-5 bg-navy px-8 py-12 text-white sm:absolute sm:inset-0 sm:order-0 sm:h-full sm:max-w-150 sm:bg-transparent sm:py-0 sm:pl-12">
          <span className="font-fm text-[11px] uppercase tracking-[0.22em] text-white/80">
            The Small Big Idea
          </span>
          {/* hero-title → SplitText word-stagger; .pink spans get extra scale-pop */}
          <h2 className="hero-title font-fa text-[34px] font-normal leading-[1.22] tracking-[0.01em] sm:text-6xl">
            From Screens to Stadiums. We Make{' '}
            <span className="pink italic text-magenta">Brands</span>{' '}
            <span className="pink italic text-magenta">Unmissable.</span>
          </h2>
          {/* hero-subtitle → y+opacity fade in */}
          <p className="hero-subtitle max-w-[460px] font-light text-white/85">
            A full-service digital marketing agency helping brands grow through content, culture, and creativity
          </p>
          {/* hero-cta → delayed opacity fade in */}
          <Link
            href="/contact"
            className="hero-cta btn-pink-fill w-max rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-magenta"
          >
            Let&apos;s Talk →
          </Link>
        </div>

        {/* prev / next arrows — desktop, fade in on hover, kept clear of the copy */}
        <div className="absolute bottom-4 right-4 z-20 hidden gap-2 opacity-0 transition group-hover:opacity-100 sm:flex">
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Previous slide"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <button
            type="button"
            onClick={scrollNext}
            aria-label="Next slide"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
          </button>
        </div>

        {/* pagination dots — hero-slider-dot → stagger opacity in */}
        <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {snaps.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`hero-slider-dot h-2 rounded-full transition-all ${i === selected ? 'w-6 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'}`}
            />
          ))}
        </div>
      </section>

      {/* ── CLIENT LOGO MARQUEE ──────────────────────────── */}
      <section className="lm-section" aria-label="Brands we work with">
        {/* magenta connector line — overlaps the hero bottom, runs into the white area.
            hero-pink-svg / hero-pink-start-node / hero-pink-end-node → GSAP draws this
            after the hero headline appears, then pulses the end-node. */}
        <div className="lm-connector" aria-hidden>
          <svg className="lm-connector-svg hero-pink-svg" viewBox="0 0 1000 130" fill="none" preserveAspectRatio="none">
            <polyline points="6,118 300,118 360,40 1000,40" pathLength={1} stroke="#f01891" strokeWidth="1" fill="none" vectorEffect="non-scaling-stroke" />
            {/* mid-point dot at the geometric centre of the line */}
            {/* <circle className="hero-pink-mid-node" cx="490" cy="40" r="5" fill="#f01891" /> */}
          </svg>
          <span className="lm-node lm-node--square hero-pink-start-node" />
          <span className="lm-node lm-node--circle hero-pink-end-node" />
        </div>

        {/* Row 1 — moving left→right; cells carry the moving grid lines */}
        <div className="lm-marquee">
          <div className="lm-track lm-track--1" aria-hidden>
            {[...ROW_ONE, ...ROW_ONE, ...ROW_ONE].map((l, i) => (
              <span key={`r1-${i}-${l.name}`} className="lm-cell lm-cell--divider" title={l.name}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={l.src} alt={l.name} loading="eager" />
              </span>
            ))}
          </div>
        </div>

        {/* Row 2 — same speed so the vertical grid lines stay aligned with row 1 */}
        <div className="lm-marquee">
          <div className="lm-track lm-track--2" aria-hidden>
            {[...ROW_TWO, ...ROW_TWO, ...ROW_TWO].map((l, i) => (
              <span key={`r2-${i}-${l.name}`} className="lm-cell" title={l.name}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={l.src} alt={l.name} loading="eager" />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRANDS THAT TRUST US (top 6 case studies) — Tailwind ─────── */}
      <section className="relative mt-[55px] w-full overflow-visible bg-[#f01891]" aria-label="Brands that trust us">
        <div className="relative flex w-full items-center justify-between gap-12 px-14 py-14 max-[1280px]:flex-col max-[1280px]:items-stretch max-[1280px]:gap-6 max-[1280px]:px-6 max-[1280px]:pb-15 max-[1280px]:pt-12">
          {/* decorative arcs + dots (top-left) */}
          <svg className="pointer-events-none absolute left-0 top-0 z-[1] h-[300px] w-[320px] max-[1280px]:hidden" viewBox="0 0 320 300" fill="none" aria-hidden>
            <path d="M-20 250 A 280 280 0 0 1 300 -20" stroke="rgba(255,255,255,0.45)" strokeWidth="1" />
            <path d="M-20 205 A 235 235 0 0 1 255 -20" stroke="rgba(255,255,255,0.28)" strokeWidth="1" />
            <circle cx="150" cy="86" r="6" fill="#fff" />
            <circle cx="120" cy="126" r="3.5" fill="#fff" />
          </svg>
          {/* decorative arcs (bottom-right) */}
          <svg className="pointer-events-none absolute bottom-0 right-0 z-[1] h-[220px] w-[260px] max-[1280px]:hidden" viewBox="0 0 260 220" fill="none" aria-hidden>
            <path d="M260 -10 A 250 250 0 0 1 10 230" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
            <path d="M260 55 A 195 195 0 0 1 70 235" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
          </svg>
          {/* large blue dot, partly overlapping the section */}
          <span className="absolute -bottom-6 right-9 z-[6] h-[52px] w-[52px] rounded-full bg-[#209bd8] max-[1280px]:-bottom-[22px] max-[1280px]:right-6" aria-hidden />

          {/* left text — centered in the available left space (sits toward the middle,
              filling the gap) on desktop; full-width left-aligned on mobile. */}
          <div className="bts-text relative z-[4] flex flex-1 justify-center max-[1280px]:block max-[1280px]:flex-none">
            <div className="max-w-95 max-[1280px]:max-w-full">
          <h2 className="hero-title font-fa text-[34px] font-normal text-white leading-[1.22] tracking-[0.01em] sm:text-6xl">
                Brands that
                <br />
                <span className="italic">trust us</span>
              </h2>
              <p className="mt-3 max-w-75 text-sm font-light leading-relaxed text-white/85">
                Great things happen when the right brands meet the right people. We&apos;re a digital marketing agency that believes the perfect collaboration is waiting to happen.
              </p>
              <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3">
                {[
                  { value: '150+', label: 'Storytellers & Strategists' },
                  { value: '100+', label: 'Brands in Our Orbit' },
                  { value: '500+', label: 'Creators in Our Universe' },
                  { value: '1000+', label: 'Stories & Campaigns Set in Motion' },
                ].map(s => (
                  <div key={s.label}>
                    <span className="block font-fm text-2xl font-black text-white sm:text-3xl">{s.value}</span>
                    <span className="block text-xs font-light leading-snug text-white/75">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* premium bento — outer cell handles grid placement + scroll reveal;
              inner handles the GSAP hover (scale/shift). overflow-visible so the
              enlarged card is never clipped. onMouseLeave on the grid resets all. */}
          <div
            className="bts-grid grid w-240 flex-[0_0_960px] grid-cols-3 gap-4 max-[1280px]:w-full max-[1280px]:flex-none max-[680px]:grid-cols-2"
            onMouseLeave={resetCards}
          >
            {VIDEOS.map((v, i) => {
              const isFeatured = i === 0;
              // Explicit 3×3 placement so the grid fills (no lone card); resets to a
              // simple flow on mobile (full-width featured, then 2-col grid).
              const spanClass = isFeatured
                ? `${BTS_CELL[0]} max-[680px]:col-start-1 max-[680px]:row-start-auto max-[680px]:row-span-1 max-[680px]:aspect-video`
                : `aspect-video ${BTS_CELL[i]} max-[680px]:col-auto max-[680px]:row-auto`;
              const innerClass = 'bts-card-inner relative h-full w-full overflow-hidden rounded-2xl bg-black shadow-[0_10px_30px_rgba(0,0,0,0.28)] will-change-transform';

              return (
                <div key={v.id} className={`bts-card relative ${spanClass}`}>
                  {playingVideo === v.id ? (
                    <div className={innerClass}>
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0&playsinline=1`}
                        title={v.title}
                        className="absolute inset-0 h-full w-full"
                        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                        allowFullScreen
                      />
                      {/* escape hatch — some videos have embedding disabled by the
                          owner and show "unavailable"; this opens it on YouTube. */}
                      <a
                        href={`https://www.youtube.com/watch?v=${v.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute right-2.5 top-2.5 z-10 rounded-full bg-black/70 px-3 py-1.5 font-fm text-[10px] font-semibold uppercase tracking-[0.08em] text-white backdrop-blur-sm transition hover:bg-magenta"
                      >
                        Watch on YouTube ↗
                      </a>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setPlayingVideo(v.id)}
                      onMouseEnter={focusCard}
                      aria-label={`Play ${v.title}`}
                      className={`group cursor-pointer ${innerClass}`}
                    >
                      {failed[v.id] ? (
                        // styled fallback when the YouTube thumbnail can't load
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-linear-to-br from-[#2a1640] to-navy px-4 text-center">
                          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-magenta">
                            <span className="ml-0.75 border-y-[7px] border-l-11 border-y-transparent border-l-white" />
                          </span>
                          <span className="font-fd text-sm font-bold leading-tight text-white">{v.title}</span>
                        </div>
                      ) : (
                        <>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={ytThumb(v.id)}
                            onError={onThumbError(v.id)}
                            onLoad={onThumbLoad(v.id)}
                            alt={v.title}
                            loading="lazy"
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-600 ease-out group-hover:scale-110"
                          />
                          <span className="absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-transparent opacity-0 transition-opacity duration-400 ease-out group-hover:opacity-100" />
                        </>
                      )}
                      {/* play button — larger for featured card */}
                      <span className={`pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 ring-1 ring-white/60 backdrop-blur-sm transition group-hover:bg-magenta group-hover:ring-magenta ${isFeatured ? 'h-16 w-16' : 'h-12 w-12'}`}>
                        <span className={`ml-0.75 border-y-transparent border-l-white ${isFeatured ? 'border-y-[9px] border-l-14' : 'border-y-[7px] border-l-11'}`} />
                      </span>
                      {/* title on hover */}
                      <span className={`pointer-events-none absolute inset-x-0 bottom-0 z-2 flex translate-y-2.5 flex-col gap-px text-left opacity-0 transition-[opacity,transform] duration-400 ease-out group-hover:translate-y-0 group-hover:opacity-100 ${isFeatured ? 'px-5 py-4' : 'px-3.5 py-3'}`}>
                        <span className={`font-fm uppercase tracking-[0.14em] text-white/75 ${isFeatured ? 'text-[10px]' : 'text-[8px]'}`}>{v.client}</span>
                        <span className={`font-fd font-bold leading-[1.15] text-white ${isFeatured ? 'text-[18px]' : 'text-[13px]'}`}>{v.title}</span>
                      </span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CASE STUDY — CONNECT ─────────────────────────── */}
      <CaseStudyCarousel />

      {/* ── MOVIE CONNECT ────────────────────────────────── */}
      <section className="movie-connect-section" aria-label="Connect — featured productions">
        <span className="movie-connect-dot" aria-hidden />
        <div className="mc-overflow">
          <div className="mc-strip" aria-hidden />
          <div className="mc-track">
            {[...CONNECT_POSTERS, ...CONNECT_POSTERS].map((p, i) => (
              <div key={i} className="poster-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.img} alt={p.label} className="poster-image" loading="lazy" draggable={false} />
                <div className="poster-shade" aria-hidden />
              </div>
            ))}
          </div>
        </div>
        <div className="connect-text-block">
          <span className="connect-kicker">TSBI Studios</span>
          <h2 className="connect-title">Stories crafted for screens, shares and second looks.</h2>
          <p className="connect-sub">Lights, lenses, locations and everything in between to bring stories to life frame by frame, shot by shot.</p>
          <Link href="/case-studies" className="btn-border connect-cta">
            Watch Our Work <span className="arr">→</span>
          </Link>
        </div>
      </section>

      {/* ── BIG IMPACT CTA ───────────────────────────────── */}
      <section className="bic-root" aria-label="Get in touch">
        <div className="bic-doodles" aria-hidden>
          {DOODLES.map((d, i) => (
            <svg
              key={i}
              className="bic-doodle"
              style={{ top: d.top, left: d.left }}
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {d.node}
            </svg>
          ))}
        </div>

        <div className="bic-center">
          <svg className="bic-orbit" viewBox="0 0 640 420" fill="none" aria-hidden preserveAspectRatio="xMidYMid meet">
            {/* magenta ring — rotates clockwise */}
            <g className="bic-ring-1">
              <ellipse cx="320" cy="210" rx="300" ry="190" stroke="var(--magenta)" strokeOpacity="0.6" strokeWidth="1.5" />
              <circle cx="612" cy="250" r="9" fill="var(--magenta)" />
              <circle cx="330" cy="402" r="6" fill="var(--magenta)" />
            </g>
            {/* electric blue ring — rotates counter-clockwise */}
            <g className="bic-ring-2">
              <ellipse cx="320" cy="210" rx="288" ry="178" stroke="var(--electric)" strokeOpacity="0.5" strokeWidth="1.5" />
              <circle cx="34" cy="232" r="7" fill="var(--electric)" />
            </g>
          </svg>

          <div className="bic-content">
            <h2 className="bic-h2">
              Ready to Turn Your
              <br />
              Small Idea Into a
              <br />
              <span className="accent">Big Impact?</span>
            </h2>
            <Link href="/contact" className="btn-border bic-cta">
              Let&apos;s Talk <span className="arr">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── GREAT PLACE TO WORK ──────────────────────────── */}
   

      {/* Preloader — overlays the page with a ~4s intro sequence */}
      <Preloader />

      {/* GSAP animation orchestrator + custom cursor elements */}
      <HeroAnimation />
    </>
  );
}
