'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useMotionValue, animate as fmAnimate } from 'framer-motion';
import Link from 'next/link';

/* ── palette ── */
const PINK  = '#e91e7e';
const NAVY  = '#171066';
const GOLD  = '#b87922';
const MUTED = '#6f6f6f';

/* ── carousel constants ── */
const CARD_W   = 274;
const CARD_GAP = 18;

/* ─────────────────────────────────────────────────────
   AWARD CARDS DATA — sourced from the TSBI awards page.
   Replace each `img` path with the actual trophy image
   once files are added to /public/images/awards/.
───────────────────────────────────────────────────── */
const AWARD_CARDS = [
  {
    platform: "DIGIXX Awards",
    desc:      "Gold — Best Social Media Campaign · Dreamgirl, Runway 34, Zee Cinema & more",
    count:     14,
    style:     "winged",
    color:     "#c89b3c",
    img:       "/images/awards/digixx.png",
  },
  {
    platform: "Global Digital Marketing Awards",
    desc:      "Best Digital Marketing Campaign · Best Social Media Campaign 2020 Ka The End & more",
    count:     5,
    style:     "classic",
    color:     "#d4a843",
    img:       "/images/awards/global-digital.png",
  },
  {
    platform: "Foxglove Awards",
    desc:      "Best Social Media Campaign Zee Bollywood · Best use of Twitter Badhaai Ho & more",
    count:     5,
    style:     "star",
    color:     "#bf9234",
    img:       "/images/awards/foxglove.png",
  },
  {
    platform: "Afaqs Marketeers Excellence Awards",
    desc:      "Best Brand Activation Emoji Lahariya · Best Influencer Marketing DID Supermoms · Best Social Media Runway34",
    count:     3,
    style:     "x",
    color:     "#c89b3c",
    img:       "/images/awards/afaqs.png",
  },
  {
    platform: "CMO Asia",
    desc:      "Best Digital Integrated Campaign ZeeTV Radhe · Best Viral Marketing Campaign ZeeTV Meet",
    count:     2,
    style:     "classic",
    color:     "#b87922",
    img:       "/images/awards/cmo-asia.png",
  },
  {
    platform: "Prime Time Awards",
    desc:      "Best Launch Campaign ZeeTV — DID Iri Ma · Best Launch Campaign &tv — Bal Shiv",
    count:     2,
    style:     "number",
    color:     "#d4a843",
    img:       "/images/awards/prime-time.png",
  },
  {
    platform: "Asia's Broadcasting Excellence Awards",
    desc:      "Best Social Media Campaign Zee Bollywood · Best Social Media Campaign &Pictures (Loveyatri)",
    count:     2,
    style:     "star",
    color:     "#c89b3c",
    img:       "/images/awards/abea.png",
  },
  {
    platform: "Global ACEF",
    desc:      "Successful use of technology Emoji Lahariya · Experimental Marketing Mithaai · Digital Marketing & Innovation &Pictures",
    count:     3,
    style:     "winged",
    color:     "#bf9234",
    img:       "/images/awards/acef.png",
  },
  {
    platform: "SPOTT Awards",
    desc:      "Best Influencer Marketing Campaign Badhaai Ho · Best Social Media Campaign Badhaai Ho",
    count:     2,
    style:     "classic",
    color:     "#c89b3c",
    img:       "/images/awards/spott.png",
  },
  {
    platform: "IAMAI",
    desc:      "B2C Content Campaign Dreamgirl",
    count:     1,
    style:     "winged",
    color:     "#d4a843",
    img:       "/images/awards/iamai.png",
  },
  {
    platform: "Promax India",
    desc:      "Best use of social media — Zee Bollywood",
    count:     1,
    style:     "classic",
    color:     "#bf9234",
    img:       "/images/awards/promax.png",
  },
  {
    platform: "Abby's Awards",
    desc:      "Innovative use of social media — Zee Bollywood",
    count:     1,
    style:     "star",
    color:     "#c89b3c",
    img:       "/images/awards/abbys.png",
  },
  {
    platform: "E4M Health Marcomm Awards",
    desc:      "Best Social Media & Best use of Celebrity/Influencer — Disney Delicious Minis",
    count:     2,
    style:     "classic",
    color:     "#d4a843",
    img:       "/images/awards/e4m.png",
  },
  {
    platform: "ET Trendies Silver",
    desc:      "Best Integrated Campaign — ZeeTV",
    count:     1,
    style:     "winged",
    color:     "#c89b3c",
    img:       "/images/awards/et-trendies.png",
  },
  {
    platform: "Media Brand Awards",
    desc:      "Best Online Campaign &TV — Daayan",
    count:     1,
    style:     "star",
    color:     "#b87922",
    img:       "/images/awards/media-brand.png",
  },
];

/* ── Trophy SVG shapes — replace outer <svg> with <img src={award.img}> once images exist ── */
function Trophy({ style = 'classic', height = 88, color = GOLD }: {
  style?: string; height?: number; color?: string;
}) {
  const w = Math.round(height * 0.68);
  if (style === 'winged') return (
    <svg width={w} height={height} viewBox="0 0 58 82" fill="none">
      <path d="M29 6 Q16 20 16 36 Q16 50 29 56 Q42 50 42 36 Q42 20 29 6z" fill={color}/>
      <path d="M16 18 Q4 20 3 30 Q2 38 12 38 Q14 46 16 48" fill="none" stroke={color} strokeWidth="5" strokeLinecap="round"/>
      <path d="M42 18 Q54 20 55 30 Q56 38 46 38 Q44 46 42 48" fill="none" stroke={color} strokeWidth="5" strokeLinecap="round"/>
      <path d="M22 12 C18 8 14 4 8 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d="M36 12 C40 8 44 4 50 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d="M26 56 L26 68 L32 68 L32 56" fill={color}/>
      <rect x="18" y="67" width="22" height="5" rx="2" fill={color}/>
      <rect x="14" y="71" width="30" height="5" rx="2.5" fill={color}/>
      <circle cx="29" cy="30" r="6" fill="rgba(255,255,255,0.3)"/>
      <path d="M23 18 Q27 14 32 18" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
  if (style === 'star') return (
    <svg width={w} height={height} viewBox="0 0 58 82" fill="none">
      <path d="M29 2 L33 14 L46 14 L36 22 L40 34 L29 26 L18 34 L22 22 L12 14 L25 14 Z" fill={color}/>
      <circle cx="29" cy="20" r="3" fill="rgba(255,255,255,0.5)"/>
      <path d="M29 34 L29 48" stroke={color} strokeWidth="6" strokeLinecap="round"/>
      <path d="M20 48 Q14 52 13 60 Q12 68 29 68 Q46 68 45 60 Q44 52 38 48" fill={color}/>
      <rect x="16" y="67" width="26" height="5" rx="2" fill={color}/>
      <rect x="12" y="71" width="34" height="5" rx="2.5" fill={color}/>
      <rect x="16" y="72" width="26" height="1.5" rx="0.75" fill="rgba(255,255,255,0.25)"/>
    </svg>
  );
  if (style === 'x') return (
    <svg width={w} height={height} viewBox="0 0 58 82" fill="none">
      <text x="29" y="44" textAnchor="middle" fontFamily="Georgia,serif" fontWeight="900" fontSize="44" fill={color}>X</text>
      <rect x="19" y="58" width="20" height="4" rx="1.5" fill={color}/>
      <rect x="14" y="61" width="30" height="5" rx="2" fill={color}/>
      <rect x="10" y="65" width="38" height="5" rx="2.5" fill={color}/>
    </svg>
  );
  if (style === 'number') return (
    <svg width={w} height={height} viewBox="0 0 58 82" fill="none">
      <circle cx="29" cy="26" r="22" fill={color}/>
      <text x="29" y="34" textAnchor="middle" fontFamily="Georgia,serif" fontWeight="900" fontSize="26" fill="rgba(255,255,255,0.85)">9</text>
      <path d="M26 48 L26 60 L32 60 L32 48" fill={color}/>
      <rect x="18" y="59" width="22" height="5" rx="2" fill={color}/>
      <rect x="14" y="63" width="30" height="5" rx="2.5" fill={color}/>
    </svg>
  );
  /* classic cup */
  return (
    <svg width={w} height={height} viewBox="0 0 58 82" fill="none">
      <path d="M14 5 Q8 24 13 35 Q18 44 29 46 Q40 44 45 35 Q50 24 44 5 Z" fill={color}/>
      <path d="M14 9 Q2 14 3 27 Q4 34 13 33" stroke={color} strokeWidth="4.5" fill="none" strokeLinecap="round"/>
      <path d="M44 9 Q56 14 55 27 Q54 34 45 33" stroke={color} strokeWidth="4.5" fill="none" strokeLinecap="round"/>
      <circle cx="28" cy="20" r="3.5" fill="rgba(255,255,255,0.35)"/>
      <path d="M22 13 Q26 11 31 14" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M29 4 l1.8 4.5 4.5 0L32 11l1.8 4.5L29 13l-4.8 2.5L26 11l-3.3-2.5 4.5 0z" fill="rgba(255,255,255,0.45)"/>
      <path d="M26 46 L26 59 L32 59 L32 46" fill={color}/>
      <rect x="18" y="58" width="22" height="5" rx="2" fill={color}/>
      <rect x="14" y="62" width="30" height="5" rx="2.5" fill={color}/>
      <rect x="17" y="63" width="24" height="1.5" rx="0.75" fill="rgba(255,255,255,0.25)"/>
    </svg>
  );
}

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

/* ── hero trophies ── */
const HERO_TROPHIES = [
  { style:'winged',  h:96,  color:'#c89b3c', delay:0    },
  { style:'classic', h:110, color:'#d4a843', delay:0.1  },
  { style:'star',    h:100, color:'#b87922', delay:0.2  },
  { style:'classic', h:116, color:'#c89b3c', delay:0.08 },
  { style:'winged',  h:94,  color:'#d4af37', delay:0.16 },
];

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════ */
export default function AboutAwardsSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const statsRef    = useRef<HTMLDivElement>(null);
  const isVisible   = useInView(sectionRef,  { once:true, amount:0.15 });
  const statsVisible= useInView(statsRef,    { once:true, amount:0.6  });

  const c1 = useCountUp(200, 1.4, statsVisible);
  const c2 = useCountUp(50,  1.2, statsVisible);
  const c3 = useCountUp(12,  1.0, statsVisible);

  /* ── mobile flag ── */
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const m = () => setIsMobile(window.innerWidth < 768);
    m();
    window.addEventListener('resize', m);
    return () => window.removeEventListener('resize', m);
  }, []);

  /* ── Carousel with proper motion value ── */
  const [carouselIdx, setCarouselIdx] = useState(0);
  const carouselX    = useMotionValue(0);
  const maxIdx       = AWARD_CARDS.length - 1;
  const slideW       = CARD_W + CARD_GAP;

  const jumpTo = (idx: number) => {
    const next = Math.max(0, Math.min(maxIdx, idx));
    setCarouselIdx(next);
    fmAnimate(carouselX, -(next * slideW), {
      type: 'spring', stiffness: 280, damping: 30,
    });
  };

  return (
    <section
      ref={sectionRef}
      style={{ background:'var(--off)', padding: isMobile ? '48px 16px 0' : '72px 48px 0', overflow:'hidden' }}
    >
      {/* ════ TWO-COLUMN ════ */}
      <div style={{ display:'flex', gap: isMobile ? 28 : 56, alignItems:'center', flexWrap:'wrap' }}>

        {/* LEFT */}
        <div style={{ flex:'1 1 340px', maxWidth:500 }}>
          <motion.div
            initial={{ opacity:0, y:16 }} animate={isVisible ? { opacity:1, y:0 } : {}}
            transition={{ duration:0.5, delay:0.05 }}
            style={{ display:'flex', alignItems:'center', gap:10, marginBottom:18, fontFamily:'var(--fm)', fontSize:10, letterSpacing:'0.18em', textTransform:'uppercase', color:MUTED }}
          >
            <span style={{ display:'block', width:16, height:1, background:MUTED }}/>Origins
          </motion.div>

          <div style={{ overflow:'hidden', marginBottom:18 }}>
            {['It Started With a', 'Small Big Idea.'].map((line, i) => (
              <motion.div key={line}
                initial={{ y:'110%' }} animate={isVisible ? { y:0 } : {}}
                transition={{ duration:0.7, delay:0.12+i*0.1, ease:[0.22,1,0.36,1] }}
                style={{ fontFamily:'var(--fd)', fontWeight:900, fontSize:'clamp(30px,4.2vw,50px)', lineHeight:1.02, letterSpacing:'-0.02em', color:i===0?'#0a0a0a':PINK, fontStyle:i===1?'italic':'normal' }}
              >{line}</motion.div>
            ))}
          </div>

          {[
            'A one-stop destination for all your digital marketing requirements. With offices set up in Dubai and Mumbai, we work with clientele across the world including the MENA region, India, UK, and the US. With a team of over 300 members, we provide Social Media Management, Video Content Production, Digital Media Planning & Buying, Social Listening & ORM, and Augmented & Virtual Reality.',
            'We work towards creating big campaigns from small but relevant insights. In fact, there is data to back this claim — the numerous awards and accolades under our belt!',
          ].map((txt, i) => (
            <motion.p key={i}
              initial={{ opacity:0, y:18 }} animate={isVisible ? { opacity:1, y:0 } : {}}
              transition={{ duration:0.6, delay:0.36+i*0.1 }}
              style={{ fontFamily:'var(--fb)', fontSize:14, color:MUTED, fontWeight:300, lineHeight:1.82, marginBottom:i===0?14:32, maxWidth:460 }}
            >{txt}</motion.p>
          ))}

          <motion.div initial={{ opacity:0, y:14 }} animate={isVisible ? { opacity:1, y:0 } : {}} transition={{ duration:0.5, delay:0.56 }}>
            <CtaBtn href="/services">See Our Work →</CtaBtn>
          </motion.div>
        </div>

        {/* RIGHT — awards card */}
        <motion.div
          initial={{ opacity:0, x:64, scale:0.96 }}
          animate={isVisible ? { opacity:1, x:0, scale:1 } : {}}
          transition={{ duration:0.8, delay:0.18, ease:[0.22,1,0.36,1] }}
          style={{ flex:'1 1 480px', background:'#fff', borderRadius:24, border:'1px solid rgba(0,0,0,0.07)', boxShadow:'0 24px 80px rgba(23,16,102,0.08)', overflow:'hidden', position:'relative' }}
        >
          {/* glow */}
          <div style={{ position:'absolute', top:-50, right:-50, width:200, height:200, borderRadius:'50%', background:'radial-gradient(circle,rgba(233,30,126,0.07) 0%,transparent 70%)', pointerEvents:'none' }} />

          <div style={{ display:'flex', flexDirection: isMobile ? 'column' : 'row', gap:0, minHeight: isMobile ? 'auto' : 270 }}>
            {/* text */}
            <div style={{ flex:'0 0 auto', width: isMobile ? '100%' : 260, padding: isMobile ? '24px 20px 16px' : '28px 24px 24px', display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
              <div>
                <div style={{ fontFamily:'var(--fm)', fontSize:9, letterSpacing:'0.2em', textTransform:'uppercase', color:PINK, marginBottom:12 }}>Awards &amp; Recognitions</div>
                <div style={{ fontFamily:'var(--fd)', fontSize:'clamp(18px,2.2vw,26px)', fontWeight:800, color:'#0a0a0a', lineHeight:1.1, marginBottom:4 }}>Honours that</div>
                <div style={{ fontFamily:'var(--fd)', fontSize:'clamp(18px,2.2vw,26px)', fontWeight:800, color:PINK, fontStyle:'italic', lineHeight:1.1, marginBottom:16 }}>inspire us.</div>
                <div style={{ width:26, height:2.5, background:PINK, borderRadius:2, marginBottom:14 }} />
                <p style={{ fontFamily:'var(--fb)', fontSize:12.5, color:MUTED, fontWeight:300, lineHeight:1.7, margin:0 }}>
                  A reflection of our ideas, our people and the impact we create.
                </p>
              </div>
              <Link href="/awards" style={{ fontFamily:'var(--fm)', fontSize:10, letterSpacing:'0.15em', textTransform:'uppercase', color:PINK, textDecoration:'none', display:'inline-flex', alignItems:'center', gap:6, marginTop:20 }}>
                Explore All Awards <span style={{ fontSize:12 }}>→</span>
              </Link>
            </div>

            {/* trophies */}
            <div style={{ flex:1, minHeight: isMobile ? 170 : undefined, background:'linear-gradient(135deg,#fdf9f5 0%,#f9f4ef 60%,#f5eeea 100%)', position:'relative', display:'flex', alignItems:'flex-end', justifyContent:'center', padding:'20px 12px 0', gap:4, overflow:'hidden' }}>
              <div style={{ position:'absolute', bottom:'22%', left:'50%', transform:'translateX(-50%)', width:200, height:100, borderRadius:'50%', background:'radial-gradient(circle,rgba(184,121,34,0.13) 0%,transparent 70%)', pointerEvents:'none' }} />
              {HERO_TROPHIES.map((t, i) => (
                <motion.div key={i}
                  initial={{ opacity:0, y:20 }}
                  animate={isVisible ? { opacity:1, y:0 } : {}}
                  transition={{ duration:0.5, delay:0.3+i*0.09 }}
                  style={{ display:'flex', flexDirection:'column', alignItems:'center' }}
                >
                  <motion.div
                    animate={{ y:[0, -(7+i%3*2), 0] }}
                    transition={{ duration:3.4+i*0.45, delay:t.delay, repeat:Infinity, ease:'easeInOut' }}
                    style={{ filter:`drop-shadow(0 7px 16px rgba(184,121,34,0.24))`, cursor:'default' }}
                  >
                    <Trophy style={t.style} height={t.h} color={t.color} />
                  </motion.div>
                  <div style={{ width:t.h*0.52, height:7, background:'linear-gradient(to right,rgba(0,0,0,0.05),rgba(0,0,0,0.1),rgba(0,0,0,0.05))', borderRadius:4, marginTop:3 }} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* stat strip */}
          <div ref={statsRef} style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', borderTop:'1px solid rgba(0,0,0,0.06)' }}>
            {[
              { label:'Awards Won',           val:c1, suf:'+', pink:true  },
              { label:'Festivals & Platforms', val:c2, suf:'+', pink:false },
              { label:'Years of Recognition',  val:c3, suf:'+', pink:false },
              { label:'Drive to Go Further',   val:null, suf:'∞', pink:false },
            ].map((s, i) => (
              <div key={s.label} style={{ padding: isMobile ? '14px 8px' : '18px 16px', borderRight:i<3?'1px solid rgba(0,0,0,0.06)':'none' }}>
                <div style={{ fontFamily:'var(--fd)', fontSize: isMobile ? (s.suf==='∞'?22:20) : (s.suf==='∞'?30:26), fontWeight:900, lineHeight:1, color:s.pink?PINK:'#0a0a0a', letterSpacing:'-0.02em', marginBottom:5 }}>
                  {s.val !== null ? s.val : ''}{s.suf}
                </div>
                <div style={{ fontFamily:'var(--fm)', fontSize: isMobile ? 7.5 : 8, letterSpacing:'0.1em', textTransform:'uppercase', color:MUTED, lineHeight:1.3 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ════ AWARDS CAROUSEL ════ */}
      <div style={{ marginTop: isMobile ? 36 : 52, paddingBottom:36 }}>

        {/* header */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:32 }}>
          <div>
            <motion.div
              initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
              transition={{ duration:0.5 }}
              style={{ display:'flex', alignItems:'center', gap:10, fontFamily:'var(--fm)', fontSize:10, letterSpacing:'0.18em', textTransform:'uppercase', color:PINK, marginBottom:10 }}
            >
              <span style={{ display:'block', width:16, height:1.5, background:PINK }}/>Our Awards Journey
            </motion.div>
            <motion.div
              initial={{ opacity:0, y:14 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
              transition={{ duration:0.6, delay:0.1 }}
              style={{ fontFamily:'var(--fd)', fontSize:'clamp(20px,2.8vw,34px)', fontWeight:700, lineHeight:1.05, letterSpacing:'-0.02em', color:'#0a0a0a' }}
            >
              Celebrating ideas that made an{' '}
              <em style={{ color:PINK, fontStyle:'italic' }}>impact.</em>
            </motion.div>
          </div>

          {/* arrows — always render, disabled when at ends */}
          <div style={{ display:'flex', gap:10, flexShrink:0 }}>
            <ArrowBtn disabled={carouselIdx===0}       onClick={() => jumpTo(carouselIdx - 1)}>←</ArrowBtn>
            <ArrowBtn disabled={carouselIdx===maxIdx}  onClick={() => jumpTo(carouselIdx + 1)}>→</ArrowBtn>
          </div>
        </div>

        {/* track container */}
        <div style={{ overflow:'hidden', cursor:'grab' }}>
          <motion.div
            style={{ display:'flex', gap:CARD_GAP, x:carouselX }}
            drag="x"
            dragConstraints={{ left:-(maxIdx * slideW), right:0 }}
            dragElastic={0.08}
            onDragEnd={(_, info) => {
              const threshold = 50;
              if      (info.offset.x < -threshold) jumpTo(carouselIdx + 1);
              else if (info.offset.x >  threshold) jumpTo(carouselIdx - 1);
              else                                  jumpTo(carouselIdx);     // snap back
            }}
          >
            {AWARD_CARDS.map((a, i) => (
              <AwardCard key={a.platform} award={a} index={i} />
            ))}
          </motion.div>
        </div>

        {/* pagination dots */}
        <div style={{ display:'flex', justifyContent:'center', gap:7, marginTop:24 }}>
          {AWARD_CARDS.map((_, i) => (
            <motion.div key={i}
              animate={{ width:i===carouselIdx?24:8, background:i===carouselIdx?PINK:'rgba(23,16,102,0.18)' }}
              transition={{ duration:0.3 }}
              onClick={() => jumpTo(i)}
              style={{ height:3, borderRadius:2, cursor:'pointer' }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CTA button ── */
function CtaBtn({ href, children }: { href:string; children:React.ReactNode }) {
  const [hov, setHov] = useState(false);
  return (
    <Link href={href} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ display:'inline-flex', alignItems:'center', gap:6, background:hov?PINK:'#0a0a0a', color:'#fff', borderRadius:999, padding:'12px 26px', fontFamily:'var(--fm)', fontSize:11, fontWeight:600, letterSpacing:'0.14em', textTransform:'uppercase', textDecoration:'none', boxShadow:hov?`0 8px 28px rgba(233,30,126,0.35)`:'0 4px 14px rgba(0,0,0,0.18)', transition:'background 0.24s, box-shadow 0.24s' }}
    >{children}</Link>
  );
}

/* ── arrow button ── */
function ArrowBtn({ disabled, onClick, children }: { disabled:boolean; onClick:()=>void; children:React.ReactNode }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      style={{ width:40, height:40, borderRadius:'50%', background:hov&&!disabled?'#0a0a0a':'#fff', border:'1px solid rgba(0,0,0,0.12)', boxShadow:'0 2px 12px rgba(0,0,0,0.08)', display:'flex', alignItems:'center', justifyContent:'center', cursor:disabled?'default':'pointer', opacity:disabled?0.28:1, transition:'all 0.22s', color:hov&&!disabled?'#fff':'#0a0a0a', fontFamily:'var(--fb)', fontSize:15 }}
      aria-label={String(children)}
    >{children}</button>
  );
}

/* ── award carousel card ── */
function AwardCard({ award, index }: { award:(typeof AWARD_CARDS)[0]; index:number }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      initial={{ opacity:0, y:28 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, amount:0.2 }}
      transition={{ duration:0.55, delay:Math.min(index, 4)*0.07, ease:[0.22,1,0.36,1] }}
      onHoverStart={()=>setHov(true)}
      onHoverEnd={()=>setHov(false)}
      style={{ flex:`0 0 ${CARD_W}px`, background:'#fff', borderRadius:16, border:`1px solid ${hov?'rgba(233,30,126,0.26)':'rgba(0,0,0,0.07)'}`, boxShadow:hov?'0 16px 48px rgba(0,0,0,0.12)':'0 5px 20px rgba(0,0,0,0.06)', padding:'18px 18px 16px', display:'flex', gap:14, alignItems:'flex-start', cursor:'pointer', transition:'border-color 0.25s, box-shadow 0.3s, transform 0.3s', transform:hov?'translateY(-5px)':'translateY(0)' }}
    >
      {/* trophy icon */}
      <div style={{ width:60, height:72, borderRadius:10, background:'linear-gradient(135deg,#fdf9f5,#f5eeea)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
        {/* Replace with: <img src={award.img} alt={award.platform} style={{width:'100%',height:'100%',objectFit:'contain',padding:'6px'}}/> */}
        <Trophy style={award.style} height={52} color={award.color} />
      </div>

      <div style={{ flex:1, display:'flex', flexDirection:'column', minHeight:72, justifyContent:'space-between' }}>
        <div>
          <div style={{ fontFamily:'var(--fm)', fontSize:9, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:GOLD, marginBottom:5, lineHeight:1.4 }}>
            {award.platform}
          </div>
          <div style={{ fontFamily:'var(--fb)', fontSize:12, color:MUTED, fontWeight:300, lineHeight:1.65 }}>
            {award.desc.length > 90 ? award.desc.slice(0, 88) + '…' : award.desc}
          </div>
        </div>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:12 }}>
          <span style={{ fontFamily:'var(--fd)', fontSize:15, fontWeight:800, color:PINK, letterSpacing:'-0.01em' }}>
            {award.count} Award{award.count > 1 ? 's' : ''}
          </span>
          {/* <span style={{ color:'rgba(0,0,0,0.3)', fontSize:13, transition:'transform 0.2s', transform:hov?'translateX(4px)':'translateX(0)', display:'inline-block' }}>→</span> */}
        </div>
      </div>
    </motion.div>
  );
}
