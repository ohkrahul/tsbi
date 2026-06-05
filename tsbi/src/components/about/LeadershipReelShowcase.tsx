'use client';
import { useEffect, useRef, useState, CSSProperties } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

/* ─── Data ─────────────────────────────────────────── */
type SlideType = 'leader' | 'reel' | 'photo';
interface Slide {
  id: number; type: SlideType; num: string;
  title: string; role?: string; intro: string;
  bgImage: string; cardImage: string;
  ctaLabel: string; ctaHref: string | null;
}

const DEFAULT_SLIDES: Slide[] = [
  // ── 01  Hari — full-bleed portrait background ────────
  {
    id: 1, type: 'photo', num: '01',
    title: 'Harikrishnan (Hari) Pillai',
    role: 'Co-Founder & Chief Executive Officer',
    intro: '',
    bgImage: '/main%20ppl/backgound%20ceo.jpg',
    cardImage: '/main%20ppl/backgound%20ceo.jpg',
    ctaLabel: '', ctaHref: null,
  },
  // ── 02  Hari — white bg, portrait left, bio right ────
  {
    id: 2, type: 'leader', num: '02',
    title: 'Harikrishnan (Hari) Pillai',
    role: 'Co-Founder & Chief Executive Officer',
    intro: 'Harikrishnan (Hari) Pillai is the Co-Founder and CEO of TheSmallBigIdea (TSBI), a prominent Mumbai-based digital and social media marketing agency founded in 2014. With over 15 years of industry experience, he specialises in building brand strategies and integrating creative, content, and technology for various major brands.',
    bgImage: '/main%20ppl/backgound%20ceo.jpg',
    cardImage: '/main%20ppl/hari.jpeg',
    ctaLabel: 'View Profile', ctaHref: '/about#leadership',
  },
  // ── 03  Manish — full-bleed background ──────────────
  {
    id: 3, type: 'photo', num: '03',
    title: 'Manish Solanki',
    role: 'Chief Operating Officer',
    intro: '',
    bgImage: '/main%20ppl/coo%20backgorund.webp',
    cardImage: '/main%20ppl/coo%20backgorund.webp',
    ctaLabel: '', ctaHref: null,
  },
  // ── 04  Manish — white bg, portrait left, bio right ──
  {
    id: 4, type: 'leader', num: '04',
    title: 'Manish Solanki',
    role: 'Chief Operating Officer',
    intro: 'Manish found his early passion in Marketing during his college days. With over 8 years of experience, he started in client servicing with SSC&B Lintas and Publicis Ambience — working on brands like HDFC Mutual Funds, Capgemini, Nerolac, ICICI and Videocon d2h. He later moved to CRISIL Ratings as Brand Manager and then entered television, working with ZEE TV and Times Television Network. Manish has headed the Global broadcast for the World\'s Biggest India Day Parade live from New York.',
    bgImage: '/main%20ppl/coo%20backgorund.webp',
    cardImage: '/main%20ppl/manish.jpg',
    ctaLabel: 'View Profile', ctaHref: '/about#leadership',
  },
];

/* ─── Helpers ───────────────────────────────────────── */
const fm: CSSProperties = { fontFamily: 'var(--fm)' };
const fd: CSSProperties = { fontFamily: 'var(--fd)' };
const MAGENTA = 'var(--magenta)';
const INK = 'var(--ink)';
const CREAM = 'rgba(252,250,247,0.97)';

function Tri({ size = 16 }: { size?: number }) {
  return (
    <div style={{
      width: 0, height: 0,
      borderTop: `${Math.round(size * .56)}px solid transparent`,
      borderBottom: `${Math.round(size * .56)}px solid transparent`,
      borderLeft: `${size}px solid rgba(255,255,255,.88)`,
      marginLeft: Math.round(size * .2),
      flexShrink: 0,
    }} />
  );
}

/* ─── Sub-components ────────────────────────────────── */

/** Full-portrait slide — no card, just name + role at bottom-left */
function PhotoSlide({ slide }: { slide: Slide }) {
  return (
    <div style={{
      position: 'absolute',
      bottom: 88,
      left: 160,
      zIndex: 20,
    }}>
      <div style={{
        ...fm,
        fontSize: 9,
        letterSpacing: '0.28em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.55)',
        marginBottom: 12,
      }}>
        {slide.role}
      </div>
      <h2 style={{
        ...fd,
        fontSize: 'clamp(36px,4.5vw,68px)',
        fontWeight: 900,
        color: '#fff',
        lineHeight: 0.96,
        letterSpacing: '-0.025em',
        margin: 0,
        textShadow: '0 4px 32px rgba(0,0,0,0.5)',
      }}>
        {slide.title}
      </h2>
    </div>
  );
}

/** Full-viewport 2-column bio layout: portrait LEFT, white text panel RIGHT */
function LeaderBioLayout({ slide }: { slide: Slide }) {
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex' }}>
      {/* ── Left: portrait photo ── */}
      <div style={{
        flex: '0 0 44%',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${slide.cardImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 15%',
        }} />
        {/* subtle right-edge fade into white panel */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, transparent 70%, rgba(255,255,255,0.6) 100%)',
        }} />
      </div>

      {/* ── Right: white text panel ── */}
      <div style={{
        flex: 1,
        background: '#fff',
        display: 'flex', alignItems: 'center',
        padding: '0 7% 0 6%',
        borderLeft: '1px solid rgba(0,0,0,0.06)',
      }}>
        <div style={{ maxWidth: 460 }}>
          <div style={{ ...fm, fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: MAGENTA, marginBottom: 10 }}>{slide.num}</div>
          <div style={{ ...fm, fontSize: 8, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(10,10,10,.4)', marginBottom: 16 }}>{slide.role}</div>
          <h3 style={{ ...fd, fontSize: 'clamp(22px,2.4vw,32px)', fontWeight: 700, color: INK, lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 18 }}>{slide.title}</h3>
          <div style={{ width: 28, height: 2, background: MAGENTA, borderRadius: 1, marginBottom: 22 }} />
          <p style={{ fontSize: 14, fontWeight: 300, lineHeight: 1.85, color: 'rgba(10,10,10,.58)', marginBottom: 30 }}>{slide.intro}</p>
          {slide.ctaHref && (
            <Link href={slide.ctaHref} style={{
              ...fm, fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase',
              color: INK, textDecoration: 'none',
              borderBottom: '1px solid rgba(10,10,10,.22)', paddingBottom: 2,
              display: 'inline-block',
            }}>{slide.ctaLabel} →</Link>
          )}
        </div>
      </div>
    </div>
  );
}

function ReelCard({ slide, onPlay }: { slide: Slide; onPlay: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{
      width: 'clamp(340px,34vw,480px)',
      borderRadius: 4, overflow: 'hidden',
      boxShadow: '0 32px 80px rgba(0,0,0,.65)',
    }}>
      {/* Thumbnail */}
      <div
        role="button" aria-label={`Play ${slide.title}`}
        onClick={onPlay}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', cursor: 'pointer' }}
      >
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${slide.cardImage})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          transform: hovered ? 'scale(1.04)' : 'scale(1)',
          transition: 'transform .5s cubic-bezier(.16,1,.3,1)',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.38)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{
            width: 62, height: 62, borderRadius: '50%',
            border: '1.5px solid rgba(255,255,255,.7)',
            background: 'rgba(0,0,0,.3)', backdropFilter: 'blur(6px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transform: hovered ? 'scale(1.1)' : 'scale(1)',
            transition: 'transform .25s',
          }}>
            <Tri size={16} />
          </div>
        </div>
      </div>
      {/* Text */}
      <div style={{
        padding: '28px 28px 32px',
        display: 'flex', flexDirection: 'column',
        background: CREAM,
      }}>
        <div style={{ ...fm, fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: MAGENTA, marginBottom: 8 }}>{slide.num}</div>
        <div style={{ ...fm, fontSize: 8, letterSpacing: '0.18em', textTransform: 'uppercase', color: MAGENTA, marginBottom: 12, opacity: 0.75 }}>Production Reel</div>
        <h3 style={{ ...fd, fontSize: 'clamp(20px,2.2vw,26px)', fontWeight: 700, color: INK, lineHeight: 1.1, marginBottom: 12 }}>{slide.title}</h3>
        <p style={{ fontSize: 12, fontWeight: 300, lineHeight: 1.8, color: 'rgba(10,10,10,.55)', marginBottom: 22 }}>{slide.intro}</p>
        <button
          onClick={onPlay}
          style={{
            ...fm, fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase',
            color: INK, background: 'none',
            border: 'none', borderBottom: '1px solid rgba(10,10,10,.25)',
            paddingBottom: 2, cursor: 'pointer', alignSelf: 'flex-start',
          }}
        >{slide.ctaLabel} →</button>
      </div>
    </div>
  );
}

/* ─── Main component ────────────────────────────────── */
/* ─── Mobile card ───────────────────────────────────── */
function MobileSlideCard({ slide, onPlay }: { slide: Slide; onPlay: () => void }) {
  const isReel = slide.type === 'reel';
  const isPhoto = slide.type === 'photo';
  return (
    <div style={{
      background: '#0a0d14', borderRadius: 6, overflow: 'hidden',
      boxShadow: '0 16px 48px rgba(0,0,0,.5)',
    }}>
      {/* Image header — show for photo slides and reels only */}
      <div style={{ position: 'relative', aspectRatio: isReel ? '16/9' : '3/2', overflow: 'hidden', display: isPhoto ? 'block' : isReel ? 'block' : 'none' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${slide.cardImage})`,
          backgroundSize: 'cover', backgroundPosition: 'center 18%',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.4)' }} />
        {isReel && (
          <button
            aria-label={`Play ${slide.title}`}
            onClick={onPlay}
            style={{
              position: 'absolute', inset: 0, background: 'none', border: 'none',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <div style={{
              width: 56, height: 56, borderRadius: '50%',
              border: '1.5px solid rgba(255,255,255,.75)', background: 'rgba(0,0,0,.35)',
              backdropFilter: 'blur(6px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Tri size={14} />
            </div>
          </button>
        )}
      </div>
      {/* Text */}
      <div style={{ padding: '24px 20px 28px', background: 'rgba(252,250,247,.97)' }}>
        <div style={{ ...fm, fontSize: 9, letterSpacing: '.28em', textTransform: 'uppercase', color: MAGENTA, marginBottom: 6 }}>{slide.num}</div>
        {slide.role && (
          <div style={{ ...fm, fontSize: 8, letterSpacing: '.16em', textTransform: 'uppercase', color: 'rgba(10,10,10,.42)', marginBottom: 8 }}>{slide.role}</div>
        )}
        {!slide.role && (
          <div style={{ ...fm, fontSize: 8, letterSpacing: '.16em', textTransform: 'uppercase', color: MAGENTA, marginBottom: 8, opacity: .75 }}>Production Reel</div>
        )}
        <h3 style={{ ...fd, fontSize: 'clamp(20px,5vw,26px)', fontWeight: 700, color: INK, lineHeight: 1.1, marginBottom: 10 }}>{slide.title}</h3>
        <p style={{ fontSize: 13, fontWeight: 300, lineHeight: 1.75, color: 'rgba(10,10,10,.55)', marginBottom: 16 }}>{slide.intro}</p>
        {slide.ctaHref && (
          <Link href={slide.ctaHref} style={{
            ...fm, fontSize: 8, letterSpacing: '.2em', textTransform: 'uppercase',
            color: INK, textDecoration: 'none',
            borderBottom: '1px solid rgba(10,10,10,.25)', paddingBottom: 2,
          }}>{slide.ctaLabel} →</Link>
        )}
        {isReel && (
          <button onClick={onPlay} style={{
            ...fm, fontSize: 8, letterSpacing: '.2em', textTransform: 'uppercase',
            color: INK, background: 'none', border: 'none',
            borderBottom: '1px solid rgba(10,10,10,.25)', paddingBottom: 2, cursor: 'pointer',
          }}>{slide.ctaLabel} →</button>
        )}
      </div>
    </div>
  );
}

export default function LeadershipReelShowcase({ initialSlides }: { initialSlides?: Slide[] } = {}) {
  // Always use DEFAULT_SLIDES so the 4-slide sequence is preserved.
  // CMS overrides are ignored unless they have ≥ 4 entries.
  const SLIDES = (initialSlides?.length ?? 0) >= 4 ? initialSlides! : DEFAULT_SLIDES;
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [reelOpen, setReelOpen] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  /* Scroll-driven slide activation.
     `mounted` in deps ensures the effect re-runs after the real section
     (with the ref attached) replaces the SSR placeholder. */
  useEffect(() => {
    if (!mounted || isMobile) return;
    const section = sectionRef.current;
    if (!section) return;
    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = Math.max(0, Math.min(1, -rect.top / scrollable));
      setActive(Math.min(SLIDES.length - 1, Math.floor(progress * SLIDES.length)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [mounted, isMobile]);

  const goToSlide = (i: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const scrollable = section.offsetHeight - window.innerHeight;
    window.scrollTo({ top: section.offsetTop + scrollable * (i / SLIDES.length), behavior: 'smooth' });
  };

  /* SSR placeholder — matches final section height so layout doesn't shift */
  if (!mounted) {
    return <section style={{ position: 'relative', height: `${SLIDES.length * 100}vh`, background: '#0a0d14' }} />;
  }

  /* ── Mobile layout ── */
  if (isMobile) {
    return (
      <>
        <section style={{ background: '#0a0d14', padding: '80px 20px 60px' }} aria-label="Leadership and Reels">
          <div style={{ ...fm, fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,.32)', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 40 }}>
            <div style={{ width: 14, height: 1, background: 'rgba(255,255,255,.25)' }} />
            Leadership &amp; Reels
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {SLIDES.map((s) => (
              <MobileSlideCard key={s.id} slide={s} onPlay={() => setReelOpen(s.id - 1)} />
            ))}
          </div>
        </section>
        <AnimatePresence>
          {reelOpen !== null && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setReelOpen(null)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.9)', zIndex: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 16px' }}
            >
              <motion.div
                initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                onClick={e => e.stopPropagation()}
                style={{ position: 'relative', width: '100%', aspectRatio: '16/9', borderRadius: 6, overflow: 'hidden' }}
              >
                <button onClick={() => setReelOpen(null)} style={{ position: 'absolute', top: -38, right: 0, zIndex: 10, background: 'none', border: 'none', color: 'rgba(255,255,255,.65)', cursor: 'pointer', ...fm, fontSize: 9, letterSpacing: '.18em', textTransform: 'uppercase' }}>✕ Close</button>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${SLIDES[reelOpen].cardImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 64, height: 64, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,.7)', background: 'rgba(0,0,0,.3)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Tri size={18} />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  const rm = reducedMotion;

  return (
    <section ref={sectionRef} style={{ position: 'relative', height: `${SLIDES.length * 100}vh` }} aria-label="Leadership and Reels">

      {/* ── Sticky viewport panel ── */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: '#0a0d14' }}>

        {/* Stacked backgrounds */}
        {SLIDES.map((s, i) => (
          <div key={s.id} style={{
            position: 'absolute', inset: 0,
            opacity: i === active ? 1 : 0,
            transition: rm ? 'none' : 'opacity 0.9s cubic-bezier(0.16,1,0.3,1)',
            willChange: 'opacity',
          }}>
            {/* Parallax image — shifts subtly with active index */}
            <div style={{
              position: 'absolute',
              top: '-8%', left: '-4%', right: '-4%', bottom: '-8%',
              backgroundImage: `url(${s.bgImage})`,
              backgroundSize: 'cover', backgroundPosition: 'center 18%',
              transform: rm ? 'none' : `translateY(${(i - active) * 8}%)`,
              transition: rm ? 'none' : 'transform 1s cubic-bezier(0.16,1,0.3,1)',
            }} />
            {/* Overlay — white for bio slides, gradient for photo/reel slides */}
            <div style={{
              position: 'absolute', inset: 0,
              background: s.type === 'leader'
                ? '#fff'   /* fully opaque — LeaderBioLayout renders its own layout on top */
                : s.type === 'photo'
                  ? 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.12) 55%, rgba(0,0,0,0.08) 100%)'
                  : 'linear-gradient(135deg,rgba(0,0,0,.72) 0%,rgba(0,0,0,.44) 100%)',
            }} />
          </div>
        ))}

        {/* Section label — top left (colour adapts to dark/light background) */}
        {(() => { const isLight = SLIDES[active].type === 'leader'; return (
        <div style={{
          position: 'absolute', top: 108, left: 48, zIndex: 20,
          ...fm, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase',
          color: isLight ? 'rgba(10,10,10,.4)' : 'rgba(255,255,255,.32)',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{ width: 14, height: 1, background: isLight ? 'rgba(10,10,10,.25)' : 'rgba(255,255,255,.25)' }} />
          Leadership &amp; Reels
        </div>
        ); })()}

        {/* Watermark number */}
        <div style={{
          position: 'absolute', right: '-1%', bottom: '-4%', zIndex: 1,
          pointerEvents: 'none', userSelect: 'none',
          ...fd, fontSize: 'clamp(160px,20vw,300px)', fontWeight: 900,
          color: 'rgba(255,255,255,.04)', lineHeight: 1, letterSpacing: '-0.04em',
        }}>
          {SLIDES[active].num}
        </div>

        {/* ── Left sidebar progress ── */}
        <nav style={{
          position: 'absolute', left: 44, top: '50%', transform: 'translateY(-50%)',
          zIndex: 20, display: 'flex', flexDirection: 'column', gap: 0,
        }}>
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goToSlide(i)}
              aria-label={`Go to ${s.title}`}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '9px 0', background: 'none', border: 'none', cursor: 'pointer',
              }}
            >
              {(() => { const isLight = SLIDES[active].type === 'leader'; return (<>
              <div style={{
                width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
                background: i === active ? MAGENTA : isLight ? 'rgba(10,10,10,.18)' : 'rgba(255,255,255,.2)',
                transform: i === active ? 'scale(1.5)' : 'scale(1)',
                transition: 'background .35s, transform .35s',
              }} />
              <div style={{ textAlign: 'left' }}>
                <div style={{
                  ...fm, fontSize: 8, letterSpacing: '0.25em', textTransform: 'uppercase',
                  color: i === active ? MAGENTA : isLight ? 'rgba(10,10,10,.28)' : 'rgba(255,255,255,.22)',
                  transition: 'color .3s', marginBottom: 2,
                }}>{s.num}</div>
                <div style={{
                  ...fm, fontSize: 8, letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: i === active ? (isLight ? INK : 'rgba(255,255,255,.62)') : isLight ? 'rgba(10,10,10,.25)' : 'rgba(255,255,255,.18)',
                  transition: 'color .3s',
                }}>
                  {s.type === 'photo'  ? s.title.split(' ').slice(-1)[0] + ' ↗'
                 : s.type === 'leader' ? s.title.split(' ').slice(-1)[0] + ' —'
                 : s.title}
                </div>
              </div>
              </>); })()}
            </button>
          ))}
        </nav>

        {/* ── Card area ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={rm ? {} : { opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={rm ? {} : { opacity: 0, y: -22, scale: 0.985 }}
            transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'absolute', inset: 0, zIndex: 15 }}
          >
            {SLIDES[active].type === 'photo' ? (
              <PhotoSlide slide={SLIDES[active]} />
            ) : SLIDES[active].type === 'leader' ? (
              <LeaderBioLayout slide={SLIDES[active]} />
            ) : (
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 8% 0 160px' }}>
                <ReelCard slide={SLIDES[active]} onPlay={() => setReelOpen(active)} />
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Scroll cue */}
        <div style={{
          position: 'absolute', bottom: 44, left: '50%', transform: 'translateX(-50%)',
          zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          ...fm, fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,.3)',
          opacity: active === 0 ? 1 : 0, transition: 'opacity .4s',
          pointerEvents: 'none',
        }}>
          <div style={{ width: 1, height: 36, background: 'rgba(255,255,255,.18)' }} />
          Scroll
        </div>

        {/* Bottom progress bar */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'rgba(255,255,255,.07)', zIndex: 20 }}>
          <div style={{
            height: 2, background: MAGENTA,
            width: `${((active + 1) / SLIDES.length) * 100}%`,
            transition: 'width .6s cubic-bezier(.16,1,.3,1)',
          }} />
        </div>

      </div>{/* end sticky */}

      {/* ── Reel modal ── */}
      <AnimatePresence>
        {reelOpen !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            onClick={() => setReelOpen(null)}
            style={{
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,.88)',
              zIndex: 900, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              onClick={e => e.stopPropagation()}
              style={{
                position: 'relative',
                width: 'min(88vw,900px)', aspectRatio: '16/9',
                borderRadius: 6, overflow: 'hidden',
              }}
            >
              <button
                onClick={() => setReelOpen(null)}
                style={{
                  position: 'absolute', top: -44, right: 0, zIndex: 10,
                  background: 'none', border: 'none',
                  color: 'rgba(255,255,255,.65)', cursor: 'pointer',
                  ...fm, fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase',
                  transition: 'color .2s',
                }}
              >✕ Close</button>
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: `url(${SLIDES[reelOpen].cardImage})`,
                backgroundSize: 'cover', backgroundPosition: 'center',
              }} />
              <div style={{
                position: 'absolute', inset: 0, background: 'rgba(0,0,0,.5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{
                  width: 80, height: 80, borderRadius: '50%',
                  border: '1.5px solid rgba(255,255,255,.7)',
                  background: 'rgba(0,0,0,.3)', backdropFilter: 'blur(8px)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Tri size={22} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
