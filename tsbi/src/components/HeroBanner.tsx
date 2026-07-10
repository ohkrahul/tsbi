'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

gsap.registerPlugin(SplitText);

/**
 * Reusable version of the home-page hero banner — a full-bleed Embla slider with
 * the copy overlaid (navy panel on mobile). Same markup/classes and entrance feel
 * as the home hero, but self-contained (its own scoped GSAP), so it works on any
 * page. Pass `slides` + copy.
 */

export type BannerSlide = { src: string; alt: string; tag?: string; caption?: string };

type Props = {
  slides: BannerSlide[];
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  cta?: { label: string; href: string };
};

export default function HeroBanner({ slides, eyebrow, title, subtitle, cta }: Props) {
  const rootRef = useRef<HTMLElement>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    setSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect).on('reInit', onSelect);
    onSelect();
    return () => { emblaApi.off('select', onSelect).off('reInit', onSelect); };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  // Entrance — same feel as the home hero, scoped to this instance.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let split: ReturnType<typeof SplitText.create> | null = null;
    const ctx = gsap.context(() => {
      gsap.set('.hero-image', { clipPath: 'inset(0 0 100% 0)', scale: 1.06 });
      gsap.set('.hero-subtitle', { opacity: 0, y: 12 });
      gsap.set('.hero-cta', { opacity: 0, y: 8 });
      gsap.set('.hero-slider-dot', { opacity: 0, scale: 0.6 });

      const titleEl = root.querySelector<HTMLElement>('.hero-title');
      if (titleEl) {
        split = SplitText.create(titleEl, { type: 'words' });
        gsap.set(split.words, { y: 32, opacity: 0 });
      }

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.to('.hero-image', { clipPath: 'inset(0 0 0% 0)', scale: 1, duration: 1.0 }, 0.1);
      if (split?.words.length) tl.to(split.words, { y: 0, opacity: 1, duration: 0.65, stagger: 0.055 }, 0.5);
      tl.fromTo('.hero-title .pink', { scale: 0.88, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, stagger: 0.14, ease: 'back.out(1.5)' }, 0.9);
      tl.to('.hero-subtitle', { opacity: 1, y: 0, duration: 0.5 }, 1.0);
      tl.to('.hero-cta', { opacity: 1, y: 0, duration: 0.4 }, 1.15);
      tl.to('.hero-slider-dot', { opacity: 1, scale: 1, duration: 0.3, stagger: 0.08 }, 1.25);
    }, root);

    return () => { split?.revert(); ctx.revert(); };
  }, []);

  const multi = slides.length > 1;

  return (
    <section ref={rootRef} className="hero-section group relative flex w-full flex-col overflow-hidden min-[1130px]:mt-[108px] sm:block sm:h-190">
      {/* hero-image → clip-path wipe + scale reveal. Mobile: banner below the copy. */}
      <div className="hero-image relative order-2 aspect-1920/630 w-full sm:absolute sm:inset-0 sm:order-0 sm:aspect-auto">
        <div ref={emblaRef} className="h-full overflow-hidden">
          <div className="flex h-full">
            {slides.map((s, i) => (
              <div key={s.src} className="relative h-full min-w-0 flex-[0_0_100%]">
                <Image src={s.src} alt={s.alt} fill priority={i === 0} sizes="100vw" className="object-cover object-center" />
                {s.caption && (
                  <div className="absolute inset-y-0 left-0 z-10 flex max-w-[58%] flex-col justify-center gap-1 bg-linear-to-r from-black/65 via-black/30 to-transparent px-5 sm:hidden">
                    {s.tag && <span className="font-fm text-[9px] font-semibold uppercase tracking-[0.18em] text-magenta">{s.tag}</span>}
                    <span className="font-fd text-lg font-bold leading-tight text-white">{s.caption}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* desktop scrim so the overlaid copy reads */}
      <div className="pointer-events-none absolute inset-0 z-1 hidden bg-linear-to-r from-black/45 via-black/10 to-transparent sm:block" />

      {/* hero-copy — navy panel on mobile, overlaid on desktop */}
      <div className="hero-copy relative z-10 order-1 flex flex-col justify-center gap-5 bg-navy px-8 py-6 text-white sm:absolute sm:inset-0 sm:order-0 sm:h-full sm:max-w-150 sm:bg-transparent sm:py-0 sm:pl-12">
        {eyebrow && <span className="font-fm text-[11px] uppercase tracking-[0.22em] text-white/80">{eyebrow}</span>}
        <h2 className="hero-title font-fm text-[34px] font-semibold uppercase leading-[1.22] tracking-[0.01em] sm:text-5xl">
          {title}
        </h2>
        {subtitle && <p className="hero-subtitle max-w-[460px] font-light text-white/85">{subtitle}</p>}
        {cta && (
          <Link href={cta.href} className="hero-cta btn-pink-fill w-max rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-magenta">
            {cta.label} →
          </Link>
        )}
      </div>

      {multi && (
        <div className="absolute bottom-4 right-4 z-20 hidden gap-2 opacity-0 transition group-hover:opacity-100 sm:flex">
          <button type="button" onClick={scrollPrev} aria-label="Previous slide" className="flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <button type="button" onClick={scrollNext} aria-label="Next slide" className="flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
          </button>
        </div>
      )}

      {multi && (
        <div className="absolute bottom-16 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {snaps.map((_, i) => (
            <button key={i} type="button" onClick={() => scrollTo(i)} aria-label={`Go to slide ${i + 1}`} className={`hero-slider-dot h-2 rounded-full transition-all ${i === selected ? 'w-6 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'}`} />
          ))}
        </div>
      )}
    </section>
  );
}
