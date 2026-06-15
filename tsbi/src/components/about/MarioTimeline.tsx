'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useInView, useMotionValue, animate as fmAnimate } from 'framer-motion';

/* ── palette ── */
const NAVY  = '#171066';
const PINK  = '#ec0f79';
const MUTED = '#6d6a8d';
const BG    = '#fbfaf7';

/* ── game world constants ── */
const WORLD_H   = 520;
const SLOT_W    = 280;
const GROUND_H  = 64;
const GROUND_Y  = WORLD_H - GROUND_H;   // 456
const BLOCK_SZ  = 52;
const BLOCK_Y   = GROUND_Y - 190;       // 266
const MARIO_H   = 82;
const CARD_W    = 240;
const L_PAD     = 300;
// R_PAD large enough that even on very wide screens colCenter(12) is reachable
const R_PAD     = 120;
const TOTAL_W   = L_PAD + 13 * SLOT_W + R_PAD;  // 4060px

const colCenter = (i: number) => L_PAD + i * SLOT_W + SLOT_W / 2;

/* ── milestones ── */
const milestones = [
  { year:'2014', title:'The Beginning',                   desc:"Started by an ex-television marketer and an advertising professional to cater to the client's digital needs.",                              icon:'film'   },
  { year:'2015', title:'Established Expertise',           desc:'Built strong expertise in social media management in the entertainment space and launched content production.',                            icon:'star'   },
  { year:'2016', title:'Beyond Entertainment',            desc:'Strengthened hold on e-commerce, tourism, BFSI, pharma. Launched media and influencer division. Onboarded clients from US/UK/ME.',        icon:'screen' },
  { year:'2017', title:'Launched Analytics Division',     desc:'Customer version analytics division to launch soon.',                                                                                       icon:'chart'  },
  { year:'2018', title:'Sports & Movies Division',        desc:'From cricket to football, from Ayushmann to Ajay Devgn.',                                                                                   icon:'ball'   },
  { year:'2019', title:'Going Desi TSBI Bharat',          desc:'Launched to help regional and national brands connect with the next 100M internet users.',                                                  icon:'globe'  },
  { year:'2020', title:'Grew 3X',                         desc:'Growth driven through content and digital transformation mandates.',                                                                         icon:'trend'  },
  { year:'2021', title:'Talent & Partnerships',           desc:'Driving influencer deals, representation and sponsorships.',                                                                                 icon:'shake'  },
  { year:'2022', title:'Early AI Steps',                  desc:'From Web3 experiences with NFT drops to virtual world building.',                                                                            icon:'ai'     },
  { year:'2023', title:'Newer Markets',                   desc:'Expanded to Ahmedabad and Bengaluru.',                                                                                                       icon:'map'    },
  { year:'2024', title:'TSBI Arabia',                     desc:'Driving business in UAE, Africa and Saudi.',                                                                                                 icon:'city'   },
  { year:'2025', title:'Storytelling, Tech & Performance',desc:'Building future-ready solutions that blend creativity, technology and measurable performance.',                                              icon:'rocket', featured:true },
  { year:'2026', title:"What's Next?",                    desc:'The next chapter is being written. Stay tuned.',                                                                                             icon:'spark'  },
] as const;

/* ── CSS keyframes ── */
const KF = `
  @keyframes marioBounce {
    0%,100% { transform:translateX(-50%) translateY(0px); }
    50%     { transform:translateX(-50%) translateY(-7px); }
  }
  @keyframes marioRun {
    0%,100% { transform:translateX(-50%) translateY(0px) scaleX(1); }
    25%     { transform:translateX(-50%) translateY(-5px) scaleX(0.95); }
    75%     { transform:translateX(-50%) translateY(-5px) scaleX(1.05); }
  }
  @keyframes starSpin {
    0%   { transform:translateY(0) translateX(0) rotate(0deg) scale(1); opacity:1; }
    100% { transform:translateY(-60px) translateX(var(--sdx,0px)) rotate(540deg) scale(0); opacity:0; }
  }
  @keyframes cloudFloat {
    0%,100% { transform:translateY(0); }
    50%     { transform:translateY(-5px); }
  }
  @keyframes pixelBlink {
    0%,100% { opacity:1; }
    50%     { opacity:0; }
  }
`;

/* ── SVG icons ── */
function Icon({ type, size=17, color=PINK }: { type:string; size?:number; color?:string }) {
  const s = { stroke:color, strokeWidth:1.7, strokeLinecap:'round' as const, strokeLinejoin:'round' as const, fill:'none' };
  const map: Record<string,React.ReactNode> = {
    film:   <><rect x="2" y="7" width="20" height="13" rx="2" {...s}/><path d="M7 7V5l2-2h6l2 2v2M2 11h20" {...s}/></>,
    star:   <polygon points="12,2 15.1,8.3 22,9.3 17,14.1 18.2,21 12,17.8 5.8,21 7,14.1 2,9.3 8.9,8.3" {...s}/>,
    screen: <><rect x="2" y="3" width="20" height="14" rx="2" {...s}/><path d="M8 21h8M12 17v4" {...s}/></>,
    chart:  <><path d="M3 3v18h18" {...s}/><path d="M7 15l4-5 4 3 4-7" {...s}/></>,
    ball:   <><circle cx="12" cy="12" r="9" {...s}/><path d="M12 3v3.5M20.5 7.5l-3 1.5M3.5 7.5l3 1.5" {...s}/></>,
    globe:  <><circle cx="12" cy="12" r="9" {...s}/><path d="M3 12h18M12 3c-3 4-3 14 0 18M12 3c3 4 3 14 0 18" {...s}/></>,
    trend:  <><polyline points="22,7 13,16 8,11 2,17" {...s}/><polyline points="17,7 22,7 22,12" {...s}/></>,
    shake:  <><path d="M14 9l2-2 4 4-7 7-4-4 1-1M10 15L4 9l3-3 2 2" {...s}/></>,
    ai:     <><rect x="3" y="8" width="18" height="12" rx="2" {...s}/><path d="M8 8V6a4 4 0 018 0v2M12 12v3M10 14h4" {...s}/></>,
    map:    <><path d="M3 7l6-4 6 4 6-4v13l-6 4-6-4-6 4V7z" {...s}/><path d="M9 3v13M15 7v13" {...s}/></>,
    city:   <><rect x="3" y="9" width="18" height="11" rx="1" {...s}/><path d="M9 20v-7h6v7M3 13h18" {...s}/><path d="M7 9V6h10v3" {...s}/></>,
    rocket: <><path d="M12 2s5 5 5 11v2l2 2v2h-4l-2-2-2 2H7v-2l2-2v-2C9 7 12 2 12 2z" {...s}/><circle cx="12" cy="13" r="1.2" fill={color} stroke="none"/></>,
    spark:  <><path d="M12 3l1.5 3.5L17 8l-3.5 1.5L12 13l-1.5-3.5L7 8l3.5-1.5L12 3z" {...s}/><path d="M5 15.5l.8 2L7.5 18l-2 .8L5 20.5l-.8-2L2.5 18l2-.8L5 15.5z" {...s}/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24">{map[type] ?? map.spark}</svg>;
}

/* ── typewriter text ── */
function TypewriterText({ text, active, delay = 0, speed = 28 }: { text:string; active:boolean; delay?:number; speed?:number }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!active) { setDisplayed(''); setDone(false); return; }
    setDisplayed(''); setDone(false);
    let i = 0;
    const timer = setTimeout(() => {
      const iv = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) { clearInterval(iv); setDone(true); }
      }, speed);
      return () => clearInterval(iv);
    }, delay);
    return () => clearTimeout(timer);
  }, [active, text, delay, speed]);

  return (
    <>
      {displayed}
      {!done && active && (
        <span style={{ animation:'pixelBlink 0.7s step-start infinite', fontWeight:900, color:PINK }}>|</span>
      )}
    </>
  );
}

/* ── score HUD ── */
function ScoreHUD({ idx, total }: { idx:number; total:number }) {
  const m = milestones[idx];
  return (
    <div style={{ position:'absolute', top:12, left:0, right:0, zIndex:25, display:'flex', justifyContent:'center', gap:28, alignItems:'center', pointerEvents:'none' }}>
      {([['YEAR', m.year], ['MILESTONE', `${String(idx+1).padStart(2,'0')} / ${String(total).padStart(2,'0')}`], ['WORLD', '1 - 1']] as [string,string][]).map(([label, value]) => (
        <div key={label} style={{ textAlign:'center' }}>
          <div style={{ fontFamily:"'Courier New',monospace", fontSize:7, letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(255,255,255,0.4)', marginBottom:2 }}>{label}</div>
          <motion.div key={value} initial={{ opacity:0, y:-4 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.25 }}
            style={{ fontFamily:"'Courier New',monospace", fontSize:13, fontWeight:700, color:'#fff', textShadow:'0 0 10px rgba(236,15,121,0.7)', letterSpacing:'0.06em' }}
          >{value}</motion.div>
        </div>
      ))}
    </div>
  );
}

/* ── pixel cloud ── */
function Cloud({ x, y, opacity=0.13 }: { x:number; y:number; opacity?:number }) {
  const c = `rgba(200,190,255,${opacity})`;
  return (
    <div style={{ position:'absolute', left:x, top:y, width:16, height:10, background:c, borderRadius:2, pointerEvents:'none',
      boxShadow:`-10px 0 0 ${c},-10px -8px 0 ${c}, 0 -8px 0 ${c}, 8px -8px 0 ${c}, 8px 0 0 ${c}, 16px 0 0 ${c}, 18px -6px 0 ${c}`,
      animation:'cloudFloat 4s ease-in-out infinite',
    }} />
  );
}

/* ── ground pipe ── */
function GroundPipe({ cx }: { cx:number }) {
  return (
    <>
      <div style={{ position:'absolute', left:cx-24, top:GROUND_Y-82, width:48, height:16, background:'#0f0a52', borderRadius:'4px 4px 0 0', borderTop:'2px solid rgba(236,15,121,0.45)', zIndex:3 }} />
      <div style={{ position:'absolute', left:cx-20, top:GROUND_Y-68, width:40, height:68, background:'#0d0840', borderLeft:'2px solid rgba(236,15,121,0.25)', zIndex:3 }} />
    </>
  );
}

/* ── question block ── */
function QuestionBlock({ isActive, wasHit, onClick }: { isActive:boolean; wasHit:boolean; onClick:()=>void }) {
  const [bouncing, setBouncing] = useState(false);
  const prevHit = useRef(false);

  useEffect(() => {
    if (wasHit && !prevHit.current) {
      setBouncing(true);
      const t = setTimeout(() => setBouncing(false), 520);
      return () => clearTimeout(t);
    }
    prevHit.current = wasHit;
  }, [wasHit]);

  const bg = wasHit ? 'linear-gradient(180deg,#1e1870 0%,#171066 100%)' : 'linear-gradient(180deg,#f9c718 0%,#e8a500 55%,#d49000 100%)';
  const shadow = wasHit ? 'inset 0 2px 8px rgba(0,0,0,0.5)' : `0 4px 0 #c47a00, inset 0 1px 0 rgba(255,255,255,0.4)${isActive?', 0 0 28px rgba(249,199,24,0.95)':''}`;

  return (
    <motion.div onClick={onClick}
      animate={bouncing?{y:[0,-16,-5,-12,-3,0]}:wasHit?{y:0}:{y:[0,-4,0,-4,0]}}
      transition={bouncing?{duration:0.52,times:[0,0.2,0.4,0.6,0.8,1]}:wasHit?{duration:0.2}:{duration:2.4,repeat:Infinity,ease:'easeInOut'}}
      style={{ width:BLOCK_SZ, height:BLOCK_SZ, background:bg, borderRadius:8, border:`2px solid ${wasHit?'#1a1460':'#b06500'}`, boxShadow:shadow, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', userSelect:'none', position:'relative' }}
      whileHover={!wasHit?{scale:1.08}:{}}
    >
      {!wasHit && <span style={{ fontFamily:"'Courier New',monospace", fontSize:26, fontWeight:900, color:'#fff', textShadow:'1px 2px 0 rgba(0,0,0,0.45)', lineHeight:1 }}>?</span>}
      {wasHit  && <span style={{ fontSize:20, opacity:0.35 }}>★</span>}
      {isActive && !wasHit && (
        <motion.div animate={{scale:[0.6,1.9],opacity:[0.7,0]}} transition={{duration:1.6,repeat:Infinity,ease:'easeOut'}}
          style={{ position:'absolute', inset:-10, borderRadius:10, border:'1.5px solid rgba(249,199,24,0.55)' }} />
      )}
    </motion.div>
  );
}

/* ── celebration ── */
function CelebrationBurst({ active }: { active:boolean }) {
  if (!active) return null;
  return (
    <div style={{ position:'absolute', bottom:BLOCK_SZ+56, left:'50%', transform:'translateX(-50%)', zIndex:35, pointerEvents:'none' }}>
      {Array.from({length:10},(_,i)=>({dx:`${(i-4.5)*30}px`,delay:`${i*0.06}s`,color:i%2===0?PINK:'#f5c718',char:['★','●','✦','◆'][i%4]})).map((item,i)=>(
        <span key={i} style={{ position:'absolute', left:0, fontSize:14, color:item.color, animation:`starSpin 0.85s ${item.delay} ease-out forwards`, ['--sdx' as string]:item.dx }}>{item.char}</span>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════ */
export default function MarioTimeline() {
  const sectionRef   = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView     = useInView(sectionRef, { once:true, amount:0.15 });

  const [activeIdx,  setActiveIdx]  = useState(0);
  const [blockHit,   setBlockHit]   = useState<Record<number,boolean>>({ 0:true });
  const [isMoving,   setIsMoving]   = useState(false);
  const [viewportW,  setViewportW]  = useState(1200);
  const [showCelebration, setShowCelebration] = useState(false);
  const [startX, setStartX] = useState<number|null>(null);

  /* two synced motion values: world scrolls, mario tracks the active block */
  const worldX = useMotionValue(0);
  const marioX = useMotionValue(0); // Mario's viewport-space x position

  const SPRING = { type:'spring' as const, stiffness:260, damping:28 };

  /* measure container */
  useEffect(() => {
    const measure = () => {
      if (containerRef.current) setViewportW(containerRef.current.offsetWidth);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  /* brick SVG */
  const brickSvg = `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="38" height="32"><rect width="38" height="32" fill="#171066"/><rect x="0" y="0" width="38" height="2" fill="#ec0f79" opacity="0.5"/><rect x="0" y="16" width="38" height="1.5" fill="#1a1280" opacity="0.7"/><rect x="19" y="2" width="1.5" height="14" fill="#1a1280" opacity="0.7"/><rect x="0" y="17.5" width="1.5" height="14.5" fill="#1a1280" opacity="0.7"/></svg>`
  )}`;

  const CLOUDS_DATA = [
    {x:180,y:55,o:0.12},{x:680,y:38,o:0.10},{x:1050,y:72,o:0.14},{x:1480,y:44,o:0.11},
    {x:1950,y:66,o:0.12},{x:2380,y:42,o:0.10},{x:2720,y:58,o:0.13},{x:3100,y:48,o:0.11},
    {x:3520,y:62,o:0.12},{x:3900,y:40,o:0.10},{x:4300,y:55,o:0.11},{x:4700,y:44,o:0.12},
  ];

  /* ── JUMP TO: animate world AND mario in sync ── */
  const jumpTo = (idx: number) => {
    const next       = Math.max(0, Math.min(milestones.length - 1, idx));
    const mVPX       = viewportW * 0.28;
    const rawTarget  = -(colCenter(next) - mVPX);
    const clamped    = Math.max(-(TOTAL_W - viewportW), Math.min(0, rawTarget));
    // Mario lands on the block regardless of clamping
    const marioTarget = clamped + colCenter(next);

    setActiveIdx(next);
    setBlockHit(prev => ({ ...prev, [next]: true }));
    setIsMoving(true);
    setTimeout(() => setIsMoving(false), 700);

    fmAnimate(worldX, clamped,      SPRING);
    fmAnimate(marioX, marioTarget,  SPRING);

    if (next === milestones.length - 1) {
      setTimeout(() => setShowCelebration(true), 650);
    } else {
      setShowCelebration(false);
    }
  };

  /* keyboard */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') jumpTo(activeIdx + 1);
      if (e.key === 'ArrowLeft')  jumpTo(activeIdx - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeIdx, viewportW]);

  /* swipe */
  const onPointerDown = (e: React.PointerEvent) => setStartX(e.clientX);
  const onPointerUp   = (e: React.PointerEvent) => {
    if (startX === null) return;
    const delta = startX - e.clientX;
    if (Math.abs(delta) > 40) delta > 0 ? jumpTo(activeIdx + 1) : jumpTo(activeIdx - 1);
    setStartX(null);
  };

  /* initial position */
  useEffect(() => {
    if (viewportW > 0) {
      const mVPX      = viewportW * 0.28;
      const raw       = -(colCenter(0) - mVPX);
      const clamped   = Math.max(-(TOTAL_W - viewportW), Math.min(0, raw));
      worldX.set(clamped);
      marioX.set(clamped + colCenter(0));
    }
  }, [viewportW]);

  const isMobile = viewportW < 640;

  return (
    <section ref={sectionRef} style={{ background:BG, overflow:'hidden', paddingTop:8, paddingBottom:0 }}>
      <style dangerouslySetInnerHTML={{ __html: KF }} />

      {/* ── HEADER ── */}
      <div style={{ padding:'24px 60px 0', display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
        <div>
          <motion.div initial={{ opacity:0, y:-10 }} animate={isInView?{opacity:1,y:0}:{}} transition={{ duration:0.5, delay:0.1 }}
            style={{ fontFamily:'var(--fm)', fontSize:10, letterSpacing:'0.22em', textTransform:'uppercase', color:PINK, display:'flex', alignItems:'center', gap:7, marginBottom:10 }}
          >
            About Us <span style={{ fontSize:8 }}>✦</span>
          </motion.div>
          <div style={{ overflow:'hidden' }}>
            <motion.h2 initial={{ y:'100%' }} animate={isInView?{y:0}:{}} transition={{ duration:0.7, ease:[0.22,1,0.36,1] }}
              style={{ fontFamily:'var(--fd)', fontSize:'clamp(28px,3.6vw,50px)', fontWeight:900, lineHeight:1, letterSpacing:'-0.03em', margin:0 }}
            >
              <span style={{ color:NAVY }}>The SmallBig </span>
              <em style={{ color:PINK, fontStyle:'italic' }}>Story</em>
            </motion.h2>
          </div>
          <motion.p initial={{ opacity:0 }} animate={isInView?{opacity:1}:{}} transition={{ duration:0.6, delay:0.35 }}
            style={{ fontFamily:'var(--fb)', fontSize:13, color:MUTED, fontWeight:300, margin:'8px 0 0', lineHeight:1.6, maxWidth:520 }}
          >
            From a single idea to a regional force — here&apos;s how we grew, evolved and made impact.
          </motion.p>
        </div>
        <motion.div initial={{ opacity:0, x:16 }} animate={isInView?{opacity:1,x:0}:{}} transition={{ duration:0.6, delay:0.3 }}>
          <img src="/images/tsbi-logo.png" alt="TSBI" style={{ height:50, width:'auto' }} onError={e=>{ (e.currentTarget as HTMLImageElement).style.display='none'; }} />
        </motion.div>
      </div>

      {/* ── GAME VIEWPORT ── */}
      <div ref={containerRef} onPointerDown={onPointerDown} onPointerUp={onPointerUp}
        style={{ position:'relative', height:WORLD_H, overflow:'hidden', background:'linear-gradient(180deg,#08063a 0%,#100c58 35%,#1e155a 65%,#14103a 100%)', cursor:'grab', marginTop:16, userSelect:'none' }}
      >
        <ScoreHUD idx={activeIdx} total={milestones.length} />

        {/* ── USER AVATAR — tracks the active block via marioX motion value ── */}
        <motion.img
          src="/mario/mario-49296.png"
          alt="User"
          draggable={false}
          style={{
            position:'absolute',
            left: marioX,
            bottom: GROUND_H,
            height: isMobile ? 64 : MARIO_H,
            width: 'auto',
            transform: 'translateX(-50%)',
            zIndex: 20,
            borderRadius: '8px',
            filter: 'drop-shadow(0 4px 14px rgba(0,0,0,0.55))',
            pointerEvents: 'none',
            animation: isMoving ? 'marioRun 0.28s steps(2) infinite' : 'marioBounce 1.4s ease-in-out infinite',
          }}
        />

        {/* Left/Right arrows */}
        {(['left','right'] as const).map(dir => {
          const [hov, setHov] = useState(false);
          const dis = dir==='left' ? activeIdx===0 : activeIdx>=milestones.length-1;
          return (
            <button key={dir} onClick={()=>jumpTo(activeIdx+(dir==='right'?1:-1))} disabled={dis}
              onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
              style={{ position:'absolute', top:'50%', transform:'translateY(-50%)', [dir]:14, width:44, height:44, borderRadius:'50%', background:hov&&!dis?PINK:'rgba(0,0,0,0.35)', border:`1.5px solid ${hov&&!dis?PINK:'rgba(255,255,255,0.25)'}`, backdropFilter:'blur(8px)', display:'flex', alignItems:'center', justifyContent:'center', cursor:dis?'default':'pointer', opacity:dis?0.3:1, transition:'all 0.22s', zIndex:15 }}
              aria-label={dir}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                {dir==='left'
                  ? <path d="M8.5 2.5L5 7l3.5 4.5" stroke={hov&&!dis?'#fff':'rgba(255,255,255,0.8)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  : <path d="M5.5 2.5L9 7l-3.5 4.5" stroke={hov&&!dis?'#fff':'rgba(255,255,255,0.8)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                }
              </svg>
            </button>
          );
        })}

        {/* ── SCROLLING WORLD ── */}
        <motion.div style={{ x:worldX, position:'absolute', top:0, left:0, height:WORLD_H, width:TOTAL_W, willChange:'transform' }}>
          {/* Stars */}
          {[80,220,450,630,900,1100,1350,1600,1800,2100,2320,2560,2780,3020,3250,3480,3700,3950,4200,4500].map((x,i)=>(
            <div key={i} style={{ position:'absolute', left:x, top:30+(i%5)*28, width:2, height:2, borderRadius:'50%', background:`rgba(255,255,255,${0.2+i%3*0.15})` }} />
          ))}
          {/* Clouds */}
          {CLOUDS_DATA.map((c,i)=><Cloud key={i} x={c.x} y={c.y} opacity={c.o} />)}
          {/* Ground */}
          <div style={{ position:'absolute', left:0, top:GROUND_Y, width:TOTAL_W, height:GROUND_H, backgroundImage:`url("${brickSvg}")`, backgroundRepeat:'repeat-x', backgroundSize:'38px 32px', borderTop:`3px solid ${PINK}`, zIndex:4 }} />

          {/* ── MILESTONES ── */}
          {milestones.map((m, i) => {
            const cx     = colCenter(i);
            const isAct  = i === activeIdx;
            const wasHit = !!blockHit[i];
            const isFeat = 'featured' in m && m.featured;

            return (
              <React.Fragment key={m.year}>
                <GroundPipe cx={cx} />

                {/* Block + floating card */}
                <div style={{ position:'absolute', left:cx - BLOCK_SZ/2, top:BLOCK_Y, width:BLOCK_SZ, height:BLOCK_SZ, zIndex:10 }}>
                  {/* Mario-style text box card */}
                  <AnimatePresence>
                    {isAct && wasHit && (
                      <motion.div key={`card-${i}`}
                        initial={{ opacity:0, y:14, scale:0.9 }}
                        animate={{ opacity:1, y:0, scale:1 }}
                        exit={{ opacity:0, y:8, scale:0.96 }}
                        transition={{ duration:0.32, ease:[0.22,1,0.36,1] }}
                        style={{ position:'absolute', bottom:'100%', left:'50%', transform:'translateX(-50%)', marginBottom:14, width:CARD_W, background: isFeat ? 'linear-gradient(140deg,#1a1070 0%,#0d0840 100%)' : '#0d0840', border:`2px solid ${isFeat?PINK:'rgba(236,15,121,0.8)'}`, borderRadius:12, padding:'18px 16px 16px', boxShadow:`0 0 0 1px rgba(236,15,121,0.25), 0 16px 50px rgba(0,0,0,0.8)`, pointerEvents:'none', zIndex:30 }}
                      >
                        {/* Triangle pointer */}
                        <div style={{ position:'absolute', bottom:-10, left:'50%', transform:'translateX(-50%)', width:0, height:0, borderLeft:'8px solid transparent', borderRight:'8px solid transparent', borderTop:`8px solid ${isFeat?PINK:'rgba(236,15,121,0.55)'}` }} />

                        {/* Icon + Year */}
                        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
                          <div style={{ width:32, height:32, borderRadius:6, background:'rgba(236,15,121,0.2)', border:'1.5px solid rgba(236,15,121,0.4)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                            <Icon type={m.icon} size={16} color={PINK} />
                          </div>
                          <div>
                            <span style={{ fontFamily:'var(--fm)', fontSize:8, letterSpacing:'0.15em', textTransform:'uppercase', color:'rgba(255,255,255,0.6)', display:'block', marginBottom:2, fontWeight:600 }}>Year</span>
                            <span style={{ fontFamily:'var(--fd)', fontSize:18, fontWeight:900, color:isFeat?'#f9c718':PINK, lineHeight:1, letterSpacing:'-0.01em', textShadow:`0 0 12px ${isFeat?'rgba(249,199,24,0.8)':'rgba(236,15,121,0.8)'}`, display:'flex', alignItems:'center', gap:6 }}>{m.year} {isFeat && <span style={{ fontFamily:'var(--fm)', fontSize:9, color:'#f9c718', letterSpacing:'0.1em', fontWeight:700 }}>★</span>}</span>
                          </div>
                        </div>

                        {/* Title — typewriter, starts at 200ms */}
                        <div style={{ fontFamily:'var(--fm)', fontSize:13, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'#fff', marginBottom:11, lineHeight:1.3, minHeight:18 }}>
                          <TypewriterText text={m.title} active={isAct && wasHit} delay={200} speed={22} />
                        </div>

                        {/* Desc — typewriter, starts after ~title finishes */}
                        <p style={{ fontFamily:'var(--fm)', fontSize:13, color:'#fff', lineHeight:1.7, margin:0, minHeight:40, fontWeight:300, opacity:1 }}>
                          <TypewriterText text={m.desc} active={isAct && wasHit} delay={200 + m.title.length * 22 + 180} speed={14} />
                        </p>

                        {/* Press → hint */}
                        {i < milestones.length - 1 && (
                          <div style={{ marginTop:10, display:'flex', justifyContent:'flex-end' }}>
                            <span style={{ fontFamily:'var(--fm)', fontSize:8, color:'rgba(255,255,255,0.4)', letterSpacing:'0.12em', textTransform:'uppercase', animation:'pixelBlink 1.2s step-start infinite' }}>
                              Press → to continue
                            </span>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <QuestionBlock isActive={isAct} wasHit={wasHit} onClick={()=>jumpTo(i)} />

                  {i === milestones.length - 1 && <CelebrationBurst active={showCelebration} />}
                </div>

                {/* Year label */}
                <div style={{ position:'absolute', left:cx, transform:'translateX(-50%)', top:GROUND_Y+8, fontFamily:"'Courier New',monospace", fontSize:10, fontWeight:700, color:isAct?PINK:'rgba(255,255,255,0.45)', letterSpacing:'0.08em', transition:'color 0.35s', whiteSpace:'nowrap', zIndex:5, textShadow:isAct?`0 0 10px ${PINK}`:undefined }}>
                  {m.year}
                </div>

                {/* Ground glow under active milestone */}
                {isAct && (
                  <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                    style={{ position:'absolute', left:cx-60, top:GROUND_Y-10, width:120, height:22, background:`radial-gradient(ellipse,rgba(236,15,121,0.4) 0%,transparent 70%)`, borderRadius:'50%', pointerEvents:'none', zIndex:3 }}
                  />
                )}
              </React.Fragment>
            );
          })}
        </motion.div>
      </div>

      {/* ── BOTTOM CONTROLS ── */}
      {/* <div style={{ padding:'20px 60px 48px', display:'flex', flexDirection:'column', alignItems:'center', gap:12 }}>
        <div style={{ display:'flex', alignItems:'center', gap:16, width:'100%', maxWidth:720 }}>
          {(['←','→'] as const).map((lbl) => {
            const [hov, setHov] = useState(false);
            const dis = lbl==='←' ? activeIdx===0 : activeIdx>=milestones.length-1;
            return (
              <button key={lbl} onClick={()=>jumpTo(activeIdx+(lbl==='→'?1:-1))} disabled={dis}
                onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
                style={{ width:38, height:38, borderRadius:'50%', background:hov&&!dis?PINK:'#fff', border:`1px solid ${hov&&!dis?PINK:'rgba(0,0,0,0.12)'}`, boxShadow:'0 2px 12px rgba(0,0,0,0.08)', display:'flex', alignItems:'center', justifyContent:'center', cursor:dis?'default':'pointer', opacity:dis?0.3:1, transition:'all 0.22s', flexShrink:0 }}
                aria-label={lbl}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  {lbl==='←'
                    ? <path d="M8.5 2.5L5 7l3.5 4.5" stroke={hov&&!dis?'#fff':NAVY} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    : <path d="M5.5 2.5L9 7l-3.5 4.5" stroke={hov&&!dis?'#fff':NAVY} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  }
                </svg>
              </button>
            );
          })}
          <div style={{ flex:1, height:2, background:'rgba(23,16,102,0.1)', borderRadius:2, position:'relative', overflow:'hidden' }}>
            <motion.div animate={{ width:`${(activeIdx/(milestones.length-1))*100}%` }} transition={SPRING}
              style={{ position:'absolute', left:0, top:0, height:'100%', background:PINK, borderRadius:2 }} />
          </div>
        </div>
        <div style={{ fontFamily:'var(--fm)', fontSize:8.5, letterSpacing:'0.24em', textTransform:'uppercase', color:'rgba(23,16,102,0.3)' }}>
          ← → keys · arrows · swipe to explore
        </div>
      </div> */}
    </section>
  );
}
