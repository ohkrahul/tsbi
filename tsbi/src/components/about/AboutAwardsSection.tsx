'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

/* ── palette ── */
const PINK  = '#e0197d';
const GOLD  = '#d4a843';
const MUTED = 'rgba(255,255,255,0.6)';

/* ── award-receiving photos from /public/award/honours/ (converted + optimized) ── */
const GALLERY_IMGS = Array.from({ length: 18 }, (_, i) => `/award/honours/${i + 1}.jpg`);

/* ── award data ── */
const AWARD_CARDS = [
  {
    platform: "DIGIXX Awards",
    desc:      "Gold — Best Social Media Campaign · Dreamgirl, Runway 34, Zee Cinema & more",
    count:     14,
    color:     "#c89b3c",
  },
  {
    platform: "Global Digital Marketing Awards",
    desc:      "Best Digital Marketing Campaign · Best Social Media Campaign 2020 Ka The End & more",
    count:     5,
    color:     "#d4a843",
  },
  {
    platform: "Foxglove Awards",
    desc:      "Best Social Media Campaign Zee Bollywood · Best use of Twitter Badhaai Ho & more",
    count:     5,
    color:     "#bf9234",
  },
  {
    platform: "Afaqs Marketeers Excellence Awards",
    desc:      "Best Brand Activation Emoji Lahariya · Best Influencer Marketing DID Supermoms · Best Social Media Runway34",
    count:     3,
    color:     "#c89b3c",
  },
  {
    platform: "CMO Asia",
    desc:      "Best Digital Integrated Campaign ZeeTV Radhe · Best Viral Marketing Campaign ZeeTV Meet",
    count:     2,
    color:     "#b87922",
  },
  {
    platform: "Prime Time Awards",
    desc:      "Best Launch Campaign ZeeTV — DID Iri Ma · Best Launch Campaign &tv — Bal Shiv",
    count:     2,
    color:     "#d4a843",
  },
  {
    platform: "Asia's Broadcasting Excellence Awards",
    desc:      "Best Social Media Campaign Zee Bollywood · Best Social Media Campaign &Pictures (Loveyatri)",
    count:     2,
    color:     "#c89b3c",
  },
  {
    platform: "Global ACEF",
    desc:      "Successful use of technology Emoji Lahariya · Experimental Marketing Mithaai · Digital Marketing & Innovation &Pictures",
    count:     3,
    color:     "#bf9234",
  },
  {
    platform: "SPOTT Awards",
    desc:      "Best Influencer Marketing Campaign Badhaai Ho · Best Social Media Campaign Badhaai Ho",
    count:     2,
    color:     "#c89b3c",
  },
  {
    platform: "IAMAI",
    desc:      "B2C Content Campaign Dreamgirl",
    count:     1,
    color:     "#d4a843",
  },
  {
    platform: "Promax India",
    desc:      "Best use of social media — Zee Bollywood",
    count:     1,
    color:     "#bf9234",
  },
  {
    platform: "Abby's Awards",
    desc:      "Innovative use of social media — Zee Bollywood",
    count:     1,
    color:     "#c89b3c",
  },
  {
    platform: "E4M Health Marcomm Awards",
    desc:      "Best Social Media & Best use of Celebrity/Influencer — Disney Delicious Minis",
    count:     2,
    color:     "#d4a843",
  },
  {
    platform: "ET Trendies Silver",
    desc:      "Best Integrated Campaign — ZeeTV",
    count:     1,
    color:     "#c89b3c",
  },
  {
    platform: "Media Brand Awards",
    desc:      "Best Online Campaign &TV — Daayan",
    count:     1,
    color:     "#b87922",
  },
];

/* ── count-up hook ── */
function useCountUp(target: number, duration = 1.5, trigger: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let frame = 0;
    const total = Math.ceil(duration * 60);
    const id = setInterval(() => {
      frame++;
      setVal(Math.min(target, Math.round((frame / total) * target)));
      if (frame >= total) clearInterval(id);
    }, 1000 / 60);
    return () => clearInterval(id);
  }, [target, duration, trigger]);
  return val;
}

/* ══════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════ */
export default function AboutAwardsSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const statsRef    = useRef<HTMLDivElement>(null);
  const galleryRef  = useRef<HTMLElement>(null);
  const statsVisible= useInView(statsRef,    { once: true, amount: 0.5  });
  const galleryVisible = useInView(galleryRef, { once: true, amount: 0.1 });

  const c1 = useCountUp(200, 1.4, statsVisible);
  const c2 = useCountUp(50,  1.2, statsVisible);
  const c3 = useCountUp(12,  1.0, statsVisible);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const m = () => setIsMobile(window.innerWidth < 768);
    m();
    window.addEventListener('resize', m);
    return () => window.removeEventListener('resize', m);
  }, []);

  /* ── GSAP scroll animation for Block 1 ── */
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const label    = root.querySelector<HTMLElement>('.orig-label');
    const lines    = root.querySelectorAll<HTMLElement>('.orig-line-wrap');
    const bodyEl   = root.querySelector<HTMLElement>('.orig-body');
    const ctaEl    = root.querySelector<HTMLElement>('.orig-cta');
    const cardEl   = root.querySelector<HTMLElement>('.orig-card');

    gsap.set(label,  { opacity: 0, y: 14 });
    gsap.set(lines,  { yPercent: 110 });
    gsap.set(bodyEl, { opacity: 0, y: 20 });
    gsap.set(ctaEl,  { opacity: 0, y: 14 });
    gsap.set(cardEl, { opacity: 0, x: 60, scale: 0.97 });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: root, start: 'top 72%', once: true },
      defaults: { ease: 'power3.out' },
    });

    tl.to(label,  { opacity: 1, y: 0,       duration: 0.5 },             0)
      .to(lines,  { yPercent: 0,             duration: 0.72, stagger: 0.09 }, 0.1)
      .to(bodyEl, { opacity: 1, y: 0,       duration: 0.6  },             0.42)
      .to(ctaEl,  { opacity: 1, y: 0,       duration: 0.5  },             0.6)
      .to(cardEl, { opacity: 1, x: 0, scale: 1, duration: 0.8 },         0.18);

    return () => { tl.kill(); };
  }, []);

  /* carousel state removed — replaced with full-width CSS marquee */

  return (
    <>
      {/* ════════════════════════════════════════════
          BLOCK 1 — Origins (white background)
      ════════════════════════════════════════════ */}
      <section
        ref={sectionRef}
        style={{ background: '#ffffff', padding: isMobile ? '48px 20px 52px' : '80px 56px 72px', overflow: 'hidden' }}
      >
        <div style={{ display: 'flex', gap: isMobile ? 32 : 60, alignItems: 'center', flexWrap: 'wrap' }}>

          {/* LEFT — Origins copy */}
          <div style={{ flex: '1 1 320px', maxWidth: 500 }}>
            {/* label — GSAP target: .orig-label */}
            <div className="orig-label" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, fontFamily: 'var(--fm)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(10,10,10,0.42)' }}>
              <span style={{ display: 'block', width: 16, height: 1, background: 'rgba(10,10,10,0.3)' }} />Origins
            </div>

            {/* headline — each line clipped so GSAP can slide up from below */}
            <div style={{ marginBottom: 20 }}>
              {[
                { text: 'One Small Idea.',       color: '#0a0a0a', italic: false },
                { text: 'Countless Big Outcomes.', color: PINK,    italic: true  },
              ].map(({ text, color, italic }) => (
                <div key={text} style={{ overflow: 'hidden', lineHeight: 1 }}>
                  <div className="orig-line-wrap" style={{ fontFamily: 'var(--fa)', fontWeight: 400, fontSize: 'clamp(30px,4vw,52px)', lineHeight: 1.05, letterSpacing: '0.01em', color, fontStyle: italic ? 'italic' : 'normal', paddingBottom: 4 }}>
                    {text}
                  </div>
                </div>
              ))}
            </div>

            {/* body — GSAP target: .orig-body */}
            <p className="orig-body" style={{ fontFamily: 'var(--fb)', fontSize: 14, color: 'rgba(10,10,10,0.62)', fontWeight: 400, lineHeight: 1.82, marginBottom: 32, maxWidth: 460 }}>
              What do you get when you mix curiosity, creativity, and 300+ people who refuse to think small? With offices in Mumbai and Dubai, we help brands across India, the MENA region, the UK and the US grow through social media, content production, influencer marketing, performance marketing and digital innovation.
            </p>

            {/* CTA — GSAP target: .orig-cta */}
            <div className="orig-cta">
              <CtaBtn href="/services">See Our Work →</CtaBtn>
            </div>
          </div>

          {/* RIGHT — Awards card — GSAP target: .orig-card */}
          <div
            className="orig-card"
            style={{ flex: '1 1 440px', background: '#0d1528', borderRadius: 24, border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 32px 80px rgba(0,0,0,0.22)', overflow: 'hidden', position: 'relative' }}
          >
            {/* glow accents */}
            <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle,rgba(212,168,67,0.1) 0%,transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: 20, left: -30, width: 140, height: 140, borderRadius: '50%', background: 'radial-gradient(circle,rgba(224,25,125,0.08) 0%,transparent 70%)', pointerEvents: 'none' }} />

            {/* ── Torch spotlight sweep ── */}
            <div className="card-torch" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', borderRadius: 24 }}>
              <div className="card-torch-beam" />
            </div>

            {/* ── Sparkles ── */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', borderRadius: 24 }}>
              {[
                { x: '12%',  y: '18%', s: 13, d: 0,    t: 2.8, c: GOLD  },
                { x: '78%',  y: '12%', s: 9,  d: 1.1,  t: 2.3, c: '#fff' },
                { x: '62%',  y: '42%', s: 15, d: 2.2,  t: 3.2, c: GOLD  },
                { x: '28%',  y: '58%', s: 10, d: 0.6,  t: 2.6, c: PINK  },
                { x: '88%',  y: '54%', s: 7,  d: 1.9,  t: 2.1, c: '#fff' },
                { x: '48%',  y: '22%', s: 17, d: 3.1,  t: 3.5, c: GOLD  },
                { x: '18%',  y: '72%', s: 8,  d: 0.3,  t: 2.4, c: PINK  },
                { x: '72%',  y: '78%', s: 11, d: 2.7,  t: 2.9, c: '#fff' },
                { x: '55%',  y: '66%', s: 7,  d: 1.5,  t: 3.0, c: GOLD  },
                { x: '92%',  y: '28%', s: 13, d: 4.0,  t: 2.2, c: PINK  },
                { x: '35%',  y: '35%', s: 6,  d: 0.9,  t: 2.7, c: '#fff' },
                { x: '8%',   y: '44%', s: 9,  d: 3.5,  t: 2.5, c: GOLD  },
              ].map(({ x, y, s, d, t, c }, i) => (
                <div key={i} style={{ position: 'absolute', left: x, top: y, color: c, animation: `card-sparkle-pop ${t}s ${d}s ease-in-out infinite` }} className="card-sparkle">
                  {/* 4-pointed star */}
                  <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0L14.4 9.6L24 12L14.4 14.4L12 24L9.6 14.4L0 12L9.6 9.6Z"/>
                  </svg>
                </div>
              ))}
            </div>

            {/* Decorative gold ring SVG */}
            <div style={{ position: 'absolute', top: 16, right: 20, opacity: 0.18, pointerEvents: 'none' }}>
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="40" r="36" stroke={GOLD} strokeWidth="1.5" strokeDasharray="4 5"/>
                <circle cx="40" cy="40" r="24" stroke={GOLD} strokeWidth="1"/>
                <circle cx="40" cy="40" r="4" fill={GOLD}/>
              </svg>
            </div>

            {/* Centered header */}
            <div style={{ padding: isMobile ? '28px 20px 20px' : '36px 32px 24px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--fm)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: PINK, marginBottom: 14 }}>
                Awards &amp; Recognitions
              </div>
              <div style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(20px,2.4vw,30px)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: 2 }}>
                Honours that
              </div>
              <div style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(20px,2.4vw,30px)', fontWeight: 800, color: PINK, fontStyle: 'italic', lineHeight: 1.15, marginBottom: 14 }}>
                inspire us.
              </div>
              <div style={{ width: 28, height: 2.5, background: PINK, borderRadius: 2, margin: '0 auto 14px' }} />
              <p style={{ fontFamily: 'var(--fb)', fontSize: 13, color: MUTED, fontWeight: 300, lineHeight: 1.7, margin: '0 auto 20px', maxWidth: 320 }}>
                A reflection of our ideas, our people and the impact we create.
              </p>
              <Link href="/awards" style={{ fontFamily: 'var(--fm)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: PINK, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                Explore All Awards <span style={{ fontSize: 12 }}>→</span>
              </Link>
            </div>

            {/* Stat strip */}
            <div ref={statsRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              {[
                { label: 'Awards Won',            val: c1,   suf: '+', pink: true  },
                { label: 'Festivals & Platforms',  val: c2,   suf: '+', pink: false },
                { label: 'Years of Recognition',   val: c3,   suf: '+', pink: false },
                { label: 'Drive to Go Further',    val: null, suf: '∞', pink: false },
              ].map((s, i) => (
                <div key={s.label} style={{ padding: isMobile ? '14px 8px' : '18px 14px', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--fd)', fontSize: isMobile ? (s.suf === '∞' ? 20 : 18) : (s.suf === '∞' ? 28 : 24), fontWeight: 900, lineHeight: 1, color: s.pink ? PINK : '#fff', letterSpacing: '-0.02em', marginBottom: 5 }}>
                    {s.val !== null ? s.val : ''}{s.suf}
                  </div>
                  <div style={{ fontFamily: 'var(--fm)', fontSize: isMobile ? 7 : 8, letterSpacing: '0.1em', textTransform: 'uppercase', color: MUTED, lineHeight: 1.3 }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>{/* /orig-card */}

        </div>
      </section>

      {/* ════════════════════════════════════════════
          BLOCK 2 — Awards Gallery (pink background)
      ════════════════════════════════════════════ */}
      <section
        ref={galleryRef}
        style={{ background: PINK, padding: isMobile ? '52px 20px 56px' : '80px 56px 88px', overflow: 'hidden', position: 'relative' }}
      >
        {/* Decorative gold rings */}
        <div style={{ position: 'absolute', top: 24, left: 32, opacity: 0.15, pointerEvents: 'none' }}>
          <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
            <circle cx="45" cy="45" r="40" stroke={GOLD} strokeWidth="1.5" strokeDasharray="5 6"/>
            <circle cx="45" cy="45" r="26" stroke={GOLD} strokeWidth="1"/>
            <circle cx="45" cy="45" r="5" fill={GOLD}/>
          </svg>
        </div>
        <div style={{ position: 'absolute', bottom: 32, right: 48, opacity: 0.12, pointerEvents: 'none' }}>
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <circle cx="30" cy="30" r="27" stroke={GOLD} strokeWidth="1.5" strokeDasharray="3 4"/>
            <circle cx="30" cy="30" r="3" fill={GOLD}/>
          </svg>
        </div>
        {/* Small dots */}
        <div style={{ position: 'absolute', top: 60, right: 100, width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.4)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 120, left: 120, width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.3)', pointerEvents: 'none' }} />

        {/* Centered heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={galleryVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          style={{ textAlign: 'center', marginBottom: isMobile ? 36 : 52 }}
        >
          <div style={{ fontFamily: 'var(--fm)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)', marginBottom: 14 }}>
            Awards &amp; Recognitions
          </div>
          <h2 style={{ fontFamily: 'var(--fa)', fontWeight: 900, fontSize: 'clamp(28px,3.8vw,50px)', lineHeight: 1.05, letterSpacing: '0.09em', color: '#fff', margin: '0 auto 16px', maxWidth: 940 }}>
            A decade of real work,<em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.88)' }}>real people, and real impact.</em>
          </h2>
          {/* <p style={{ fontFamily: 'var(--fb)', fontSize: 15, fontWeight: 300, lineHeight: 1.75, color: 'rgba(255,255,255,0.8)', margin: '0 auto', maxWidth: 520 }}>
            A decade of real work, real people, and real impact.
          </p> */}
        </motion.div>

        {/* Gallery grid — full-width responsive */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: isMobile ? 10 : 16,
          width: '100%',
        }}>
          {GALLERY_IMGS.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 0.9, y: 28 }}
              animate={galleryVisible ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: Math.min(i * 0.05, 0.85), ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, boxShadow: '0 26px 60px rgba(0,0,0,0.45), 0 0 0 2px rgba(212,168,67,0.9)' }}
              style={{ position: 'relative', borderRadius: 14, overflow: 'hidden', aspectRatio: '3/4', boxShadow: '0 12px 40px rgba(0,0,0,0.25)', cursor: 'pointer' }}
            >
              <Image
                src={src}
                alt={`Award moment ${i + 1}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1200px) 33vw, 18vw"
                style={{ objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)' }}
                className="gallery-img-hover"
              />
              {/* subtle gold overlay on hover via inline gradient — static overlay for now */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.28) 0%, transparent 50%)', pointerEvents: 'none' }} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════
          BLOCK 3 — Awards Journey  (full-width marquee)
          Background: /award/4fc7e2d8e6133f67d05cece00a8d11b0.jpg
      ════════════════════════════════════════════ */}
      <section style={{ position: 'relative', padding: isMobile ? '48px 0 52px' : '72px 0 64px', overflow: 'hidden' }}>

        {/* photo bg */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/award/4fc7e2d8e6133f67d05cece00a8d11b0.jpg)', backgroundSize: 'cover', backgroundPosition: 'center top', zIndex: 0 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg,rgba(5,8,22,0.90) 0%,rgba(10,4,28,0.85) 100%)', zIndex: 1 }} />

        <div style={{ position: 'relative', zIndex: 2 }}>

         

         
          <div className="aw-marquee-row" style={{ overflow: 'hidden', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '16px 0' }}>
            <div className="aw-track-rev">
              {[0, 1].map(n => (
                <span key={n} style={{ display: 'flex', alignItems: 'center' }}>
                  {AWARD_CARDS.map((a) => (
                    <span key={`${n}-${a.platform}`} style={{ fontFamily: 'var(--fm)', fontSize: 15, fontWeight: 400, fontStyle: 'italic', color: 'white', whiteSpace: 'nowrap', paddingRight: '4em' }}>
                      {a.desc}
                      <span style={{ color: `${a.color}90`, paddingLeft: '1.5em' }}>✦</span>
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

/* ── CTA button ── */
function CtaBtn({ href, children }: { href: string; children: React.ReactNode }) {
  const [hov, setHov] = useState(false);
  return (
    <Link href={href}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: PINK, color: '#fff', borderRadius: 999, padding: '12px 26px', fontFamily: 'var(--fm)', fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none', boxShadow: hov ? '0 8px 28px rgba(224,25,126,0.5)' : '0 8px 28px rgba(224,25,126,0.3)', transform: hov ? 'translateY(-2px)' : 'translateY(0)', transition: 'box-shadow 0.24s, transform 0.24s' }}
    >{children}</Link>
  );
}

