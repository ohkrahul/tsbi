
'use client';

import { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';

/* ─── Data ─────────────────────────────────────────── */
type SlideType = 'leader' | 'reel' | 'photo';
interface Slide {
  id: number;
  type: SlideType;
  num: string;
  title: string;
  role?: string;
  intro: string;
  bgImage: string;
  cardImage: string;
  video?: string;
  ctaLabel: string;
  ctaHref: string | null;
}

const DEFAULT_SLIDES: Slide[] = [
  {
    id: 2,
    type: 'leader',
    num: '01',
    title: 'Harikrishnan Pillai',
    role: 'Founder & Chief Executive Officer',
    intro:
      'A visionary entrepreneur and business builder, Harikrishnan Pillai brings over 18 years of experience in strategy, marketing and scaling brands. His clarity of thought and long-term perspective continue to shape TSBI’s journey of meaningful impact.',
    bgImage: '/main%20ppl/backgound%20ceo.jpg',
    cardImage: '/Hari/harii.jpeg',
    video: '/Hari/IMG_8689.mp4',
    ctaLabel: 'Know More',
    ctaHref: '/about/leaders/harikrishnan-pillai',
  },
  {
    id: 4,
    type: 'leader',
    num: '02',
    title: 'Manish Solanki',
    role: 'Co-Founder & Chief Operating Officer',
    intro:
      'A seasoned operator and brand strategist, Manish Solanki excels at unlocking growth and building high-performance teams. His deep understanding of markets and focus on operational excellence drive TSBI’s commitment to creating sustainable, scalable value.',
    bgImage: '/main%20ppl/coo%20backgorund.webp',
    cardImage: '/Manish/manish.png',
    video: '/Manish/IMG_8124.mp4',
    ctaLabel: 'Know More',
    ctaHref: '/about/leaders/manish-solanki',
  },
];

const FD = 'font-[family-name:var(--fd)]';
const FM = 'font-[family-name:var(--fm)]';
const FA = 'font-[family-name:var(--fa)]';
const WINE = '#7c3aed';

const VALUES = [
  {
    label: 'Clarity in Purpose',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9.2" />
        <polygon points="15.6 8.4 10.6 10.6 8.4 15.6 13.4 13.4 15.6 8.4" />
      </svg>
    ),
  },
  {
    label: 'Integrity in Action',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 7.5 7 5l3.5 2.2 3-1.2L21 8.5" />
        <path d="m7 13 2.2 2.1c.7.7 1.8.7 2.5 0L17 10" />
        <path d="m12.4 8.6 2.3 2.3c.7.7 1.9.7 2.6 0L21 8.5" />
        <path d="M3 7.5v8l3 1.5" />
      </svg>
    ),
  },
  {
    label: 'Impact for Generations',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19V10M9 19V6M14 19v-5M19 19V4" />
        <path d="M3 19h18" />
      </svg>
    ),
  },
];

function PlayIcon({ size = 16 }: { size?: number }) {
  return (
    <span
      className="inline-block"
      style={{
        width: 0,
        height: 0,
        borderTop: `${Math.round(size * 0.56)}px solid transparent`,
        borderBottom: `${Math.round(size * 0.56)}px solid transparent`,
        borderLeft: `${size}px solid #fff`,
        marginLeft: Math.round(size * 0.2),
      }}
    />
  );
}

/* Small botanical sprig that sits beside each spine badge */
function Sprig({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      width="46"
      height="64"
      viewBox="0 0 46 64"
      fill="none"
      stroke={WINE}
      strokeWidth="1"
      strokeLinecap="round"
      aria-hidden
      className="opacity-55"
      style={{ transform: flip ? 'scaleX(-1)' : 'none' }}
    >
      <path d="M30 62C30 44 24 30 12 20" />
      <path d="M26 50c-6-1-10-4-12-9 5-1 9 1 12 9Z" fill="rgba(138,35,76,.10)" />
      <path d="M22 38c-5-2-8-6-9-11 5 0 8 3 9 11Z" fill="rgba(138,35,76,.10)" />
      <path d="M18 27c-4-2-6-6-6-11 4 1 6 5 6 11Z" fill="rgba(138,35,76,.10)" />
    </svg>
  );
}

function LeaderRow({ slide, index, displayNum }: { slide: Slide; index: number; displayNum: string }) {
  const photoLeft = index % 2 === 0;
  const vidRef = useRef<HTMLVideoElement>(null);
  const playVid = () => {
    const v = vidRef.current;
    if (!v) return;
    try { v.currentTime = 0; } catch { /* ignore */ }
    v.style.opacity = '1';
    void v.play().catch(() => {});
  };
  const stopVid = () => {
    const v = vidRef.current;
    if (!v) return;
    v.style.opacity = '0';
    v.pause();
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative grid grid-cols-1 items-center gap-y-7 text-center lg:grid-cols-2 lg:gap-x-[clamp(60px,9vw,140px)] lg:text-left"
    >
      {/* Photo */}
      <div
        className={[
          'relative mx-auto w-full max-w-[300px] lg:mx-0 lg:max-w-[340px]',
          photoLeft ? 'lg:col-start-1 lg:justify-self-end' : 'lg:order-2 lg:col-start-2 lg:justify-self-start',
        ].join(' ')}
      >
        {/* offset accent frame */}
        <span
          className={[
            'absolute z-0 rounded-[22px] border border-magenta/30 bg-white/5',
            photoLeft ? 'top-4 left-4 -right-4 -bottom-4' : 'top-4 right-4 -left-4 -bottom-4',
          ].join(' ')}
        />
        <div
          className="relative z-[1] aspect-[4/5] overflow-hidden rounded-[20px] border border-magenta/20 bg-navy bg-cover bg-top shadow-[0_30px_70px_rgba(75,15,40,0.16)]"
          style={{ backgroundImage: `url(${slide.cardImage})` }}
          onMouseEnter={slide.video ? playVid : undefined}
          onMouseLeave={slide.video ? stopVid : undefined}
        >
          {slide.video && (
            <video
              ref={vidRef}
              src={slide.video}
              muted
              loop
              playsInline
              preload="none"
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover object-top opacity-0 transition-opacity duration-300"
            />
          )}
        </div>
      </div>

      {/* Text */}
      <div
        className={[
          'flex flex-col items-center pt-1.5 lg:items-start lg:text-left',
          photoLeft ? 'lg:col-start-2' : 'lg:order-1 lg:col-start-1',
        ].join(' ')}
      >
        <h3 className={`${FM} m-0 text-[34px] font-normal leading-[1.22] tracking-[0.01em] sm:text-5xl text-white  `}>
          {slide.title}
        </h3>

        {slide.role && (
          <p className={`${FM} mt-3 text-[11.5px] font-bold uppercase tracking-[.18em] text-magenta`}>
            {slide.role}
          </p>
        )}

        <p className="mt-5 max-w-[440px] text-[15px] font-light leading-[1.22] tracking-[0.01em] text-white/65">
          {slide.intro}
        </p>

        {slide.ctaHref && (
          <Link
            href={slide.ctaHref}
            className={`${FM} mt-7 inline-flex items-center gap-2.5 rounded border border-white/25 bg-transparent px-[22px] py-[13px] text-[11px] font-bold uppercase tracking-[.18em] text-white no-underline transition-colors duration-300 hover:border-magenta hover:bg-magenta hover:text-white`}
          >
            {slide.ctaLabel || 'Know More'} <span aria-hidden>→</span>
          </Link>
        )}
      </div>

      {/* Spine badge + sprig (desktop only) */}
      <div className="absolute left-1/2 top-1/2 z-[4] hidden -translate-x-1/2 -translate-y-1/2 flex-col items-center lg:flex">
        <span className="absolute -top-[58px]" style={{ left: photoLeft ? 8 : undefined, right: photoLeft ? undefined : 8 }}>
          <Sprig flip={!photoLeft} />
        </span>
        <span
          className={`${FM} grid h-[50px] w-[50px] place-items-center rounded-full border-[3px] border-navy text-[13px] font-semibold tracking-[.04em] text-[#f7ede9] shadow-[0_10px_26px_rgba(75,15,40,0.28)]`}
          style={{ background: WINE }}
        >
          {displayNum}
        </span>
      </div>
    </motion.article>
  );
}

function ReelTile({ slide, onPlay }: { slide: Slide; onPlay: () => void }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="overflow-hidden rounded-[20px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] shadow-[0_18px_50px_rgba(75,15,40,0.08)]"
    >
      <button
        onClick={onPlay}
        aria-label={`Play ${slide.title}`}
        className="relative aspect-video w-full cursor-pointer overflow-hidden border-0 bg-[#211118] p-0"
      >
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${slide.cardImage})` }} />
        <div className="absolute inset-0 grid place-items-center bg-[rgba(20,8,14,.3)]">
          <span className="grid h-[60px] w-[60px] place-items-center rounded-full bg-magenta shadow-[0_16px_35px_rgba(0,0,0,0.25)]">
            <PlayIcon size={16} />
          </span>
        </div>
      </button>
      <div className="p-[22px]">
        <div className={`${FM} text-[10px] font-bold uppercase tracking-[.18em] text-magenta`}>{slide.num} · Reel</div>
        <h3 className={`${FD} my-2 text-2xl leading-tight text-white`}>{slide.title}</h3>
        {slide.intro && <p className="m-0 text-sm leading-[1.7] text-white/60">{slide.intro}</p>}
      </div>
    </motion.article>
  );
}

export default function LeadershipReelShowcase({ initialSlides }: { initialSlides?: Slide[] } = {}) {
  const slides = (initialSlides?.length ?? 0) >= 2 ? initialSlides! : DEFAULT_SLIDES;
  const [reelOpen, setReelOpen] = useState<number | null>(null);

  const leaders = useMemo(() => slides.filter((slide) => slide.type === 'leader'), [slides]);
  const reels = useMemo(() => slides.filter((slide) => slide.type === 'reel'), [slides]);

  return (
    <section
      aria-label="Leadership"
      className="relative overflow-hidden px-[clamp(18px,5vw,72px)] py-[clamp(72px,8vw,120px)]"
      style={{
        background:
          'radial-gradient(circle at 88% 8%, rgba(224,25,125,.10), transparent 38%), linear-gradient(180deg, #050b1a 0%, #070e1e 100%)',
      }}
    >
      {/* faint topographic texture, left edge */}
      <svg
        aria-hidden
        width="420"
        height="520"
        viewBox="0 0 420 520"
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        className="pointer-events-none absolute left-[-60px] top-10 z-0"
      >
        {Array.from({ length: 7 }).map((_, i) => (
          <path key={i} d={`M${-40 + i * 14} 0C${120 + i * 10} ${120 + i * 8} ${40 + i * 12} ${300 - i * 6} ${200 + i * 8} 520`} />
        ))}
      </svg>

      <div className="relative z-[1] mx-auto max-w-[1080px]">
        {/* ── Header ── */}
        <motion.header
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-[clamp(56px,7vw,92px)] text-center"
        >
          <div className={`${FM} mb-[22px] inline-flex items-center gap-3.5 text-[11px] font-bold uppercase tracking-[.26em] text-magenta`}>
            <span className="h-px w-[30px] bg-magenta/50" />
            Leadership at TSBI
            <span className="h-px w-[30px] bg-magenta/50" />
          </div>

          <h2 className={`${FM} m-0 text-[clamp(34px,5.2vw,64px)] font-semibold leading-[1.08] tracking-[0.06em] text-white uppercase`}>
            Guided by Purpose.
            <br />
            Driven by <em className="italic text-magenta ">Impact.</em>
          </h2>

          {/* lotus flourish */}
          <div className="my-5 flex justify-center">
            <svg width="40" height="20" viewBox="0 0 40 20" fill="none" aria-hidden>
              <path d="M20 18C20 18 14 14 14 7c0-3 3-5 6-5s6 2 6 5c0 7-6 11-6 11Z" fill="rgba(224,25,125,.18)" stroke="var(--magenta)" strokeWidth="1" />
              <path d="M20 18C20 18 11 16 8 10c-1-2 0-5 2-5 4 0 9 6 10 13Z" fill="rgba(224,25,125,.12)" stroke="var(--magenta)" strokeWidth="0.8" />
              <path d="M20 18C20 18 29 16 32 10c1-2 0-5-2-5-4 0-9 6-10 13Z" fill="rgba(224,25,125,.12)" stroke="var(--magenta)" strokeWidth="0.8" />
            </svg>
          </div>

          <p className="mx-auto max-w-[540px] text-[15.5px] font-light leading-[1.8] text-white/60">
            At TSBI, our leadership blends deep expertise with a shared purpose to build businesses that create lasting value for people and communities.
          </p>
        </motion.header>

        {/* ── Leaders zigzag with center spine ── */}
        <div className="relative grid gap-y-[clamp(56px,7vw,96px)]">
          <span
            className="absolute left-1/2 top-5 bottom-5 hidden w-px -translate-x-1/2 lg:block"
            style={{ background: 'linear-gradient(180deg, transparent, rgba(224,25,125,.35) 12%, rgba(224,25,125,.35) 88%, transparent)' }}
          />
          {leaders.map((leader, index) => (
            <LeaderRow key={leader.id} slide={leader} index={index} displayNum={String(index + 1).padStart(2, '0')} />
          ))}
        </div>

        {/* ── Values bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-[clamp(56px,7vw,96px)] flex flex-wrap items-center gap-[clamp(28px,4vw,56px)] rounded-[22px] border border-magenta/15 px-[clamp(28px,5vw,56px)] py-[clamp(28px,4vw,40px)]"
          style={{ background: 'linear-gradient(120deg, rgba(224,25,125,.10), rgba(224,25,125,.05))' }}
        >
          <div className="flex flex-[1_1_360px] items-start gap-[18px]">
            <span className={`${FD} text-[64px] leading-[0.7] text-magenta opacity-45`}>“</span>
            <p className={`${FM} m-0 text-[clamp(18px,2vw,23px)] font-medium italic leading-[1.5] text-white`}>
              We believe in building with integrity, partnering with purpose, and scaling impact that lasts.
            </p>
          </div>

          <div className="hidden w-px self-stretch bg-magenta/20 sm:block" />

          <div className="flex flex-wrap gap-[clamp(22px,3vw,40px)]">
            {VALUES.map((v) => (
              <div key={v.label} className="flex min-w-[86px] flex-col gap-2.5">
                <span className="text-magenta">{v.icon}</span>
                <span className={`${FM} text-[11px] font-semibold leading-[1.45] tracking-[.06em] text-white/70`}>
                  {v.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        
      </div>

      <AnimatePresence>
        {reelOpen !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={() => setReelOpen(null)}
            className="fixed inset-0 z-[900] grid place-items-center bg-[rgba(20,8,14,.9)] p-[18px]"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              onClick={(event) => event.stopPropagation()}
              className="relative aspect-video w-[min(920px,92vw)] overflow-hidden rounded-[20px]"
            >
              <button
                onClick={() => setReelOpen(null)}
                className={`${FM} absolute right-4 top-4 z-[3] cursor-pointer rounded-full border-0 bg-white/15 px-[13px] py-2.5 text-[11px] uppercase tracking-[.12em] text-white`}
              >
                Close
              </button>
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slides.find((slide) => slide.id === reelOpen)?.cardImage})` }}
              />
              <div className="absolute inset-0 grid place-items-center bg-[rgba(20,8,14,.45)]">
                <span className="grid h-[86px] w-[86px] place-items-center rounded-full bg-magenta shadow-[0_18px_55px_rgba(0,0,0,0.34)]">
                  <PlayIcon size={24} />
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
