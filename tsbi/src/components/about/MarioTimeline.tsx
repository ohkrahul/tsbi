'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useInView, useMotionValue, useTransform, animate as fmAnimate } from 'framer-motion';

/* ── palette ── */
const PINK    = '#e0197d';
const INK     = '#241640';           // dark heading colour (reads on the warm sky)
const CARD_BG = '#0d0840';           // dark card floats over the sunny scene

/* ── game assets (copied from Lipton-Game → /public/game) ── */
const A = {
  char:    '/game/character.png',    // 1192×125, 9-frame run cycle, faces right
  floor:   '/game/floor.png',        // 1008×312, brick + dirt, repeat-x
  field:   '/game/field.png',        // 1920×355, green terraces
  fieldup: '/game/fieldup.png',      // 1920×261, distant hills
  gradient:'/game/gradient.png',     // 994×1920, warm sky gradient
  clouds:  ['/game/cloud1.png', '/game/cloud2.png', '/game/cloud3.png', '/game/cloud4.png'],
  obstacles: ['/game/obstacle1.png', '/game/obstacle2.png', '/game/obstacle3.png'],  // crates the hero hops over
};

/* character sprite-sheet geometry */
const SHEET_FRAMES = 9;
const FRAME_RATIO  = (1192 / 9) / 125;   // per-frame width / height ≈ 1.0596

/* ── continuous-run ── */
const SPEED_FWD = 150;   // jog forward through the timeline (px / second)
const FADE_MS   = 380;   // quick fade when looping back to the start
const JUMP_H     = 74;   // hero hop height (px)
const JUMP_RANGE = 104;  // distance (px) at which an approaching crate triggers the hop

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
  { year:'2027', title:'The Road Ahead',                  desc:'Bigger ideas, newer markets and the next wave of stories — coming soon.',                                                                   icon:'rocket', upcoming:true },
  { year:'2028', title:'Scaling New Heights',             desc:'More markets, more mediums, more milestones on the horizon.',                                                                                icon:'trend',  upcoming:true },
  { year:'2029', title:'Beyond Borders',                  desc:'Taking SmallBig stories to brands across the globe.',                                                                                        icon:'globe',  upcoming:true },
  { year:'2030', title:'The Next Decade',                 desc:'A fresh chapter of ideas, people and momentum begins.',                                                                                      icon:'rocket', upcoming:true },
] as const;

const N = milestones.length;
/* hero runs up to the last real milestone; later "upcoming" years are shown ahead but never reached */
const LAST_REACHED = milestones.reduce((acc, m, i) => ('upcoming' in m && m.upcoming) ? acc : i, 0);

/* ── world layout ── */
const SLOT_W = 460;                       // distance the hero runs between milestones
const L_PAD  = 360;
const R_PAD  = 360;
const TOTAL_W = L_PAD + (N - 1) * SLOT_W + R_PAD;
const colCenter = (i: number) => L_PAD + i * SLOT_W;

/* deterministic cloud field (no Math.random → SSR-safe) */
const CLOUD_COUNT = Math.ceil(TOTAL_W / 540);
const CLOUDS = Array.from({ length: CLOUD_COUNT }, (_, i) => ({
  x: 140 + i * 540 + (i % 3) * 70,
  y: 14 + (i % 4) * 24,
  src: A.clouds[i % 4],
  h: 34 + (i % 3) * 16,
  o: 0.7 + (i % 3) * 0.1,
}));

/* one crate in each gap between reached milestones — the hero auto-hops these */
const OBSTACLES = Array.from({ length: LAST_REACHED }, (_, i) => {
  const t = i % 3;
  return {
    x: colCenter(i) + SLOT_W * (0.44 + (i % 4) * 0.05),
    src: A.obstacles[t],
    h: [24, 44, 42][t],
  };
});

/* ── SVG icons (milestone cards) ── */
function Icon({ type, size = 16, color = PINK }: { type: string; size?: number; color?: string }) {
  const s = { stroke: color, strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, fill: 'none' };
  const map: Record<string, React.ReactNode> = {
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

/* ── surprise burst (pops when the hero reaches a milestone) ── */
function CelebrationBurst({ count = 12 }: { count?: number }) {
  const mid = (count - 1) / 2;
  return (
    <div style={{ position:'absolute', bottom:'100%', left:'50%', transform:'translateX(-50%)', marginBottom:6, zIndex:35, pointerEvents:'none' }}>
      {Array.from({ length: count }, (_, i) => ({ dx:`${(i - mid) * 22}px`, delay:`${i * 0.04}s`, color: i % 2 === 0 ? PINK : '#f5c718', char: ['★', '●', '✦', '◆'][i % 4] })).map((item, i) => (
        <span key={i} style={{ position:'absolute', left:0, fontSize:14, color:item.color, animation:`starSpin 0.85s ${item.delay} ease-out forwards`, ['--sdx' as string]: item.dx }}>{item.char}</span>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT — full-bleed, continuously-running timeline
═══════════════════════════════════════════════════════════════ */
export default function MarioTimeline() {
  const sectionRef   = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  // toggles as the section enters / leaves the viewport (NOT once)
  const inView = useInView(sectionRef, { amount: 0.3 });

  const [activeIdx, setActiveIdx] = useState(0);
  const [restarting, setRestarting] = useState(false);     // brief fade while looping back to the start
  const [viewportW, setViewportW] = useState(1200);
  const activeIdxRef = useRef(0);
  const charXRef = useRef(0);

  const worldX = useMotionValue(0);

  /* parallax layers, all driven by the single worldX value */
  const floorX   = useTransform(worldX, v => `${v}px`);
  const fieldX   = useTransform(worldX, v => `${v * 0.45}px`);
  const fieldUpX = useTransform(worldX, v => `${v * 0.2}px`);
  const cloudsX  = useTransform(worldX, v => v * 0.12);

  /* hero auto-hop: a parabolic lift whenever a crate nears the hero's fixed x (no input, synced to scroll) */
  const heroLift = useTransform(worldX, (v) => {
    const cx = charXRef.current;
    let lift = 0;
    for (const o of OBSTACLES) {
      const d = o.x + v - cx;
      if (d > -JUMP_RANGE && d < JUMP_RANGE) {
        const k = d / JUMP_RANGE;
        const arc = (1 - k * k) * JUMP_H;
        if (arc > lift) lift = arc;
      }
    }
    return -lift;
  });
  const shadowScale   = useTransform(heroLift, (y) => Math.max(0.5, 1 + y / (JUMP_H * 1.5)));
  const shadowOpacity = useTransform(heroLift, (y) => Math.max(0.3, 1 + y / JUMP_H));

  /* measure viewport width */
  useEffect(() => {
    const measure = () => { if (containerRef.current) setViewportW(containerRef.current.offsetWidth); };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const isMobile = viewportW < 640;
  const WORLD_H  = isMobile ? 580 : 660;
  const FLOOR_H  = isMobile ? 110 : 150;
  const FIELD_H  = isMobile ? 120 : 165;
  const UP_H     = isMobile ? 110 : 150;
  const STEM_H   = isMobile ? 96  : 118;
  const PILL_H   = 30;
  const CARD_W   = isMobile ? 220 : 256;

  const charH  = isMobile ? 74 : 104;
  const charW  = charH * FRAME_RATIO;
  const sheetW = charW * SHEET_FRAMES;
  const charX  = Math.max(120, Math.round(viewportW * 0.26));
  charXRef.current = charX;

  const worldStart = charX - colCenter(0);
  const worldEnd   = charX - colCenter(LAST_REACHED);   // stop at the last real year, then restart

  /* keyframes (sheetW is baked in so the sprite steps cleanly) */
  const KF = `
    @keyframes runCycle  { from { background-position-x: 0px; } to { background-position-x: -${sheetW}px; } }
    @keyframes runnerBob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
    @keyframes ringPulse { 0% { transform: translate(-50%,-50%) scale(0.6); opacity:0.65; } 100% { transform: translate(-50%,-50%) scale(2); opacity:0; } }
    @keyframes starSpin  { 0% { transform:translateY(0) translateX(0) rotate(0deg) scale(1); opacity:1; } 100% { transform:translateY(-60px) translateX(var(--sdx,0px)) rotate(540deg) scale(0); opacity:0; } }
  `;

  /* derive the active milestone from the world position (the one under the hero) */
  useEffect(() => {
    const update = (v: number) => {
      const raw = (charX - v - L_PAD) / SLOT_W;
      const i = Math.max(0, Math.min(N - 1, Math.round(raw)));
      if (i !== activeIdxRef.current) {
        activeIdxRef.current = i;
        setActiveIdx(i);
      }
    };
    update(worldX.get());
    const unsub = worldX.on('change', update);
    return unsub;
  }, [charX, worldX]);

  /* continuous run loop — always jog forward; on reaching the end, fade and re-run from the start. */
  useEffect(() => {
    if (!inView || viewportW === 0) return;
    let stopped = false;
    let controls: { stop: () => void } | null = null;
    let timer: ReturnType<typeof setTimeout> | null = null;
    setRestarting(false);

    const runForward = () => {
      if (stopped) return;
      const cur = worldX.get();
      const dur = Math.max(0.2, (cur - worldEnd) / SPEED_FWD);
      controls = fmAnimate(worldX, worldEnd, { duration: dur, ease: 'linear', onComplete: restart });
    };
    const restart = () => {
      if (stopped) return;
      setRestarting(true);                 // fade the scene out
      timer = setTimeout(() => {
        if (stopped) return;
        worldX.set(worldStart);            // jump back to the start (hidden by the fade)
        setRestarting(false);              // fade back in
        runForward();                      // run forward again
      }, FADE_MS);
    };

    // if we resume already at/after the end, snap to the start first
    if (worldX.get() <= worldEnd) worldX.set(worldStart);
    runForward();
    return () => { stopped = true; controls?.stop(); if (timer) clearTimeout(timer); };
  }, [inView, viewportW, worldStart, worldEnd, worldX]);

  return (
    <section ref={sectionRef} style={{ background:'#f3e08a', overflow:'hidden', padding:0 }}>
      <style dangerouslySetInnerHTML={{ __html: KF }} />

      {/* ── FULL-BLEED GAME SCENE ── */}
      <div ref={containerRef}
        style={{
          position:'relative', height:WORLD_H, overflow:'hidden',
          backgroundColor:'#f7e07a',
          backgroundImage:`url(${A.gradient})`,
          backgroundSize:'100% 100%',
          backgroundRepeat:'no-repeat',
          userSelect:'none',
        }}
      >
        {/* soft sun glow */}
        <div style={{ position:'absolute', top:-90, right:'12%', width:300, height:300, borderRadius:'50%', background:'radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(255,247,200,0.25) 42%, transparent 70%)', zIndex:1, pointerEvents:'none' }} />

        {/* clouds — slow parallax */}
        <motion.div style={{ position:'absolute', top:0, left:0, height:140, width:TOTAL_W, x:cloudsX, zIndex:1, pointerEvents:'none' }}>
          {CLOUDS.map((c, i) => (
            <img key={i} src={c.src} alt="" draggable={false}
              style={{ position:'absolute', left:c.x, top:c.y, height:c.h, width:'auto', opacity:c.o }} />
          ))}
        </motion.div>

        {/* distant hills */}
        <motion.div style={{ position:'absolute', left:0, bottom:FLOOR_H - 34 + FIELD_H - 100, height:UP_H, width:'100%', backgroundImage:`url(${A.fieldup})`, backgroundRepeat:'repeat-x', backgroundSize:'auto 100%', backgroundPositionY:'bottom', backgroundPositionX:fieldUpX, opacity:0.9, zIndex:2, pointerEvents:'none' }} />

        {/* green fields */}
        <motion.div style={{ position:'absolute', left:0, bottom:FLOOR_H - 34, height:FIELD_H, width:'100%', backgroundImage:`url(${A.field})`, backgroundRepeat:'repeat-x', backgroundSize:'auto 100%', backgroundPositionY:'bottom', backgroundPositionX:fieldX, zIndex:3, pointerEvents:'none' }} />

        {/* floor — scrolls 1:1 with the world */}
        <motion.div style={{ position:'absolute', left:0, bottom:0, height:FLOOR_H, width:'100%', backgroundImage:`url(${A.floor})`, backgroundRepeat:'repeat-x', backgroundSize:'auto 100%', backgroundPositionY:'bottom', backgroundPositionX:floorX, borderTop:`2px solid rgba(224,25,125,0.35)`, zIndex:4, pointerEvents:'none' }} />

        {/* ── HEADING (centered inside the scene) ── */}
        <div style={{ position:'absolute', top: isMobile ? 24 : 40, left:0, right:0, paddingBottom: isMobile ? 28 : 40, zIndex:22, display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', pointerEvents:'none' }}>
          <motion.div initial={{ opacity:0, y:-10 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.5, delay:0.1 }}
            style={{ fontFamily:'var(--fm)', fontSize:10, letterSpacing:'0.22em', textTransform:'uppercase', color:PINK, display:'flex', alignItems:'center', gap:7, marginBottom:9, fontWeight:700 }}
          >
            About Us <span style={{ fontSize:8 }}>✦</span>
          </motion.div>
          <div style={{ overflow:'hidden', padding:'2px 4px 4px' }}>
            <motion.h2 initial={{ y:'110%' }} animate={inView ? { y:0 } : {}} transition={{ duration:0.7, ease:[0.22,1,0.36,1] }}
              style={{ fontFamily:'var(--fa)', fontSize:'clamp(32px,4.2vw,58px)', fontWeight:400, lineHeight:1.28, letterSpacing:'0.01em', margin:0, padding:'2px 0 10px', textShadow:'0 1px 0 rgba(255,255,255,0.35)' }}
            >
              <span style={{ color:INK }}>TSBI </span>
              <em style={{ color:PINK, fontStyle:'italic' }}>Story</em>
            </motion.h2>
          </div>
          <motion.p initial={{ opacity:0 }} animate={inView ? { opacity:1 } : {}} transition={{ duration:0.6, delay:0.35 }}
            style={{ fontFamily:'var(--fb)', fontSize:13, color:'rgba(36,22,64,0.78)', fontWeight:500, margin:'9px auto 0', lineHeight:1.6, maxWidth:460, textShadow:'0 1px 0 rgba(255,255,255,0.25)' }}
          >
            From a single idea to a regional force — watch how we grew, evolved and made impact.
          </motion.p>
        </div>

        {/* ── HUD (bottom-right game chip, clear of the centered heading) ── */}
        <div style={{ position:'absolute', bottom: isMobile ? 16 : 22, right: isMobile ? 14 : 40, zIndex:25, pointerEvents:'none' }}>
          <div style={{ display:'flex', gap: isMobile ? 14 : 26, alignItems:'center', padding:'7px 16px', borderRadius:12, background:'rgba(8,6,44,0.55)', backdropFilter:'blur(6px)', border:'1px solid rgba(255,255,255,0.14)', boxShadow:'0 6px 22px rgba(0,0,0,0.3)' }}>
            {([['YEAR', milestones[activeIdx].year], ['MILESTONE', `${String(activeIdx + 1).padStart(2, '0')} / ${String(LAST_REACHED + 1).padStart(2, '0')}`], ['WORLD', '1 - 1']] as [string, string][]).map(([label, value]) => (
              <div key={label} style={{ textAlign:'center' }}>
                <div style={{ fontFamily:"'Courier New',monospace", fontSize:7, letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(255,255,255,0.55)', marginBottom:2 }}>{label}</div>
                <motion.div key={value} initial={{ opacity:0, y:-4 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.25 }}
                  style={{ fontFamily:"'Courier New',monospace", fontSize:13, fontWeight:700, color:'#fff', textShadow:'0 0 10px rgba(224,25,125,0.8)', letterSpacing:'0.06em' }}
                >{value}</motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* ── SCROLLING WORLD (obstacles + milestone markers) ── */}
        <motion.div style={{ x:worldX, position:'absolute', top:0, left:0, height:WORLD_H, width:TOTAL_W, zIndex:6, willChange:'transform' }}>
          {/* crates / hurdles the hero hops over */}
          {OBSTACLES.map((o, i) => (
            <img key={`obs-${i}`} src={o.src} alt="" draggable={false}
              style={{ position:'absolute', left:o.x, bottom:FLOOR_H - 12, height:o.h, width:'auto', transform:'translateX(-50%)', zIndex:5, filter:'drop-shadow(0 3px 5px rgba(0,0,0,0.3))' }} />
          ))}

          {milestones.map((m, i) => {
            const cx      = colCenter(i);
            const isAct   = i === activeIdx;
            const visited = i < activeIdx;
            const isFeat  = 'featured' in m && m.featured;
            const isUp    = 'upcoming' in m && m.upcoming;

            return (
              <div key={m.year} style={{ position:'absolute', left:cx, bottom:FLOOR_H - 14, width:0, transform:'translateX(-50%)' }}>
                {/* floating card */}
                <AnimatePresence>
                  {isAct && !restarting && (
                    <motion.div key={`card-${i}`}
                      initial={{ opacity:0, y:16, scale:0.94 }}
                      animate={{ opacity:1, y:0, scale:1 }}
                      exit={{ opacity:0, y:10, scale:0.96 }}
                      transition={{ duration:0.4, ease:[0.22,1,0.36,1] }}
                      style={{ position:'absolute', bottom: STEM_H + PILL_H + 18, left:'50%', transform:'translateX(-50%)', width:CARD_W, background: isFeat ? 'linear-gradient(140deg,#1a1070 0%,#0d0840 100%)' : CARD_BG, border:`2px ${isUp ? 'dashed' : 'solid'} ${isFeat ? PINK : 'rgba(224,25,125,0.85)'}`, borderRadius:14, padding:'16px 16px 15px', boxShadow:'0 0 0 1px rgba(224,25,125,0.25), 0 20px 55px rgba(0,0,0,0.5)', zIndex:30 }}
                    >
                      {/* pointer */}
                      <div style={{ position:'absolute', bottom:-10, left:'50%', transform:'translateX(-50%)', width:0, height:0, borderLeft:'9px solid transparent', borderRight:'9px solid transparent', borderTop:`10px solid ${isFeat ? PINK : 'rgba(224,25,125,0.85)'}` }} />

                      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:11 }}>
                        <div style={{ width:32, height:32, borderRadius:8, background:'rgba(224,25,125,0.2)', border:'1.5px solid rgba(224,25,125,0.4)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                          <Icon type={m.icon} size={16} color={PINK} />
                        </div>
                        <div>
                          <span style={{ fontFamily:'var(--fm)', fontSize:8, letterSpacing:'0.15em', textTransform:'uppercase', color:'rgba(255,255,255,0.6)', display:'block', marginBottom:2, fontWeight:600 }}>Year</span>
                          <span style={{ fontFamily:'var(--fd)', fontSize:18, fontWeight:900, color: isFeat ? '#f9c718' : PINK, lineHeight:1, letterSpacing:'-0.01em', textShadow:`0 0 12px ${isFeat ? 'rgba(249,199,24,0.8)' : 'rgba(224,25,125,0.8)'}`, display:'flex', alignItems:'center', gap:6 }}>
                            {m.year} {isFeat && <span style={{ fontFamily:'var(--fm)', fontSize:9, color:'#f9c718', letterSpacing:'0.1em', fontWeight:700 }}>★</span>}
                            {isUp && <span style={{ fontFamily:'var(--fm)', fontSize:8, color:'#f9c718', letterSpacing:'0.14em', fontWeight:700, textTransform:'uppercase' }}>· Soon</span>}
                          </span>
                        </div>
                      </div>

                      <div style={{ fontFamily:'var(--fm)', fontSize:13, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'#fff', marginBottom:9, lineHeight:1.3 }}>
                        {m.title}
                      </div>
                      <p style={{ fontFamily:'var(--fm)', fontSize:12.5, color:'rgba(255,255,255,0.82)', lineHeight:1.65, margin:0, fontWeight:300 }}>
                        {m.desc}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {isAct && !restarting && (
                  <div style={{ position:'absolute', bottom: STEM_H + 4, left:'50%', transform:'translateX(-50%)', zIndex:31 }}>
                    <CelebrationBurst count={i === LAST_REACHED ? 16 : 9} />
                  </div>
                )}

                {/* year pill */}
                <div style={{
                  position:'absolute', bottom:STEM_H, left:'50%', transform:'translateX(-50%)',
                  padding:'5px 13px', borderRadius:20, whiteSpace:'nowrap',
                  fontFamily:"'Courier New',monospace", fontSize:13, fontWeight:700, letterSpacing:'0.05em',
                  color:'#fff',
                  background: isAct ? PINK : 'rgba(13,8,64,0.6)',
                  border: `1.5px ${isUp && !isAct ? 'dashed' : 'solid'} ${isAct ? PINK : (isUp ? 'rgba(224,25,125,0.7)' : (visited ? 'rgba(224,25,125,0.6)' : 'rgba(255,255,255,0.35)'))}`,
                  boxShadow: isAct ? '0 0 22px rgba(224,25,125,0.9), 0 6px 16px rgba(0,0,0,0.35)' : '0 4px 10px rgba(0,0,0,0.25)',
                  backdropFilter:'blur(4px)',
                  opacity: isAct ? 1 : (visited ? 0.92 : 0.7),
                  transition:'background 0.35s, border-color 0.35s, opacity 0.35s, box-shadow 0.35s',
                  zIndex:8,
                }}>
                  {m.year}
                </div>

                {/* stem */}
                <div style={{ position:'absolute', bottom:0, left:'50%', transform:'translateX(-50%)', width:3, height:STEM_H, borderRadius:3, background: isAct ? 'linear-gradient(to top, rgba(224,25,125,0.15), rgba(224,25,125,0.85))' : 'linear-gradient(to top, rgba(255,255,255,0.05), rgba(255,255,255,0.45))', transition:'background 0.35s', zIndex:7 }} />

                {/* ground anchor */}
                <div style={{ position:'absolute', bottom:-6, left:'50%', transform:'translateX(-50%)', width:14, height:14, borderRadius:'50%', background: isAct ? PINK : 'rgba(255,255,255,0.7)', boxShadow: isAct ? '0 0 16px rgba(224,25,125,0.95)' : '0 2px 6px rgba(0,0,0,0.4)', transition:'background 0.35s', zIndex:7 }} />
                {isAct && (
                  <div style={{ position:'absolute', bottom:1, left:'50%', width:14, height:14, borderRadius:'50%', border:`2px solid ${PINK}`, animation:'ringPulse 1.6s ease-out infinite', pointerEvents:'none', zIndex:6 }} />
                )}
              </div>
            );
          })}
        </motion.div>

        {/* ── HERO RUNNER — fixed in screen, world scrolls past, auto-hops crates ── */}
        <div style={{ position:'absolute', left:charX, bottom:FLOOR_H - 6, transform:'translateX(-50%)', zIndex:9, pointerEvents:'none' }}>
          <motion.div style={{ position:'absolute', bottom:-7, left:'50%', x:'-50%', width:charW * 0.66, height:11, borderRadius:'50%', background:'radial-gradient(ellipse, rgba(0,0,0,0.32) 0%, transparent 72%)', scaleX:shadowScale, opacity:shadowOpacity }} />
          <motion.div style={{ y: heroLift }}>
            <div style={{
              width:charW, height:charH,
              backgroundImage:`url(${A.char})`,
              backgroundRepeat:'no-repeat',
              backgroundSize:`${sheetW}px ${charH}px`,
              animation:'runCycle 0.7s steps(9) infinite, runnerBob 0.5s ease-in-out infinite',
              animationPlayState: inView ? 'running' : 'paused',
              filter:'drop-shadow(0 4px 10px rgba(0,0,0,0.35))',
            }} />
          </motion.div>
        </div>

        {/* loop-restart fade — hides the jump back to the start */}
        <div style={{ position:'absolute', inset:0, zIndex:40, pointerEvents:'none', background:'#f4df84', opacity: restarting ? 1 : 0, transition:`opacity ${FADE_MS}ms ease-in-out` }} />
      </div>
    </section>
  );
}
