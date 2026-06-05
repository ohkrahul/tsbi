'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useMotionValue, animate as fmAnimate } from 'framer-motion';

/* ── palette ── */
const NAVY  = '#171066';
const PINK  = '#ec0f79';
const MUTED = '#6d6a8d';
const BG    = '#fbfaf7';

/* ── layout ── */
const SLOT_W  = 276;
const CARD_W  = 232;
const TRACK_H = 540;
const LINE_Y  = 262;
const CONN_H  = 46;
const DOT_R   = 9;
const L_PAD   = 60;
const R_PAD   = 100;

/* ── milestone data ── */
const milestones = [
  { year:'2014', title:'The Beginning',                   desc:"Started by an ex-television marketer and an advertising professional to cater to the client's digital needs.",                              icon:'film',   pos:'bottom' },
  { year:'2015', title:'Established Expertise',           desc:'Built strong expertise in social media management in the entertainment space and launched content production.',                            icon:'star',   pos:'top'    },
  { year:'2016', title:'Beyond Entertainment',            desc:'Strengthened hold on e-commerce, tourism, BFSI, pharma. Launched media and influencer division. Onboarded clients from US/UK/ME.',        icon:'screen', pos:'bottom' },
  { year:'2017', title:'Launched Analytics Division',     desc:'Customer version analytics division to launch soon.',                                                                                       icon:'chart',  pos:'top'    },
  { year:'2018', title:'Sports & Movies Division',        desc:'From cricket to football, from Ayushmann to Ajay Devgn.',                                                                                   icon:'ball',   pos:'bottom' },
  { year:'2019', title:'Going Desi TSBI Bharat',          desc:'Launched to help regional and national brands connect with the next 100M internet users.',                                                  icon:'globe',  pos:'top'    },
  { year:'2020', title:'Grew 3X',                         desc:'Growth driven through content and digital transformation mandates.',                                                                         icon:'trend',  pos:'bottom' },
  { year:'2021', title:'Talent & Partnerships',           desc:'Driving influencer deals, representation and sponsorships.',                                                                                 icon:'shake',  pos:'top'    },
  { year:'2022', title:'Early AI Steps',                  desc:'From Web3 experiences with NFT drops to virtual world building.',                                                                            icon:'ai',     pos:'bottom' },
  { year:'2023', title:'Newer Markets',                   desc:'Expanded to Ahmedabad and Bengaluru.',                                                                                                       icon:'map',    pos:'top'    },
  { year:'2024', title:'TSBI Arabia',                     desc:'Driving business in UAE, Africa and Saudi.',                                                                                                 icon:'city',   pos:'bottom' },
  { year:'2025', title:'Storytelling, Tech & Performance',desc:'Building future-ready solutions that blend creativity, technology and measurable performance.',                                              icon:'rocket', pos:'top',   featured:true },
  { year:'2026', title:"What's Next?",                    desc:'The next chapter is being written. Stay tuned.',                                                                                             icon:'spark',  pos:'bottom' },
] as const;

type M = (typeof milestones)[number];

/* ── SVG icons ── */
function Icon({ type, size=20, color=PINK }: { type:string; size?:number; color?:string }) {
  const s = { stroke:color, strokeWidth:1.7, strokeLinecap:'round' as const, strokeLinejoin:'round' as const, fill:'none' };
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

/* ── milestone card ── */
function MCard({ m, idx, isActive }: { m:M; idx:number; isActive:boolean }) {
  const isFeat    = 'featured' in m && m.featured;
  const iconBg    = idx % 2 === 0 ? '#ffe7f1' : '#f1edff';
  const yearColor = idx % 2 === 0 ? PINK : NAVY;
  const iconColor = idx % 2 === 0 ? PINK : NAVY;

  return (
    <motion.div
      initial={{ opacity:0, y: m.pos==='top' ? 28 : -28, scale:0.97 }}
      whileInView={{ opacity:1, y:0, scale:1 }}
      whileHover={{ y: m.pos==='top' ? -6 : 6, borderColor:'rgba(236,15,121,0.28)' }}
      viewport={{ once:true, amount:0.15 }}
      transition={{ duration:0.55, ease:[0.22,1,0.36,1] }}
      style={{
        width: CARD_W,
        background: isFeat ? 'linear-gradient(140deg,#fff8fc 0%,#fff 70%)' : '#fff',
        border: `1px solid ${isFeat ? 'rgba(236,15,121,0.28)' : 'rgba(23,16,102,0.09)'}`,
        borderRadius: 20,
        padding: '20px 18px 18px',
        boxShadow: isFeat ? '0 18px 60px rgba(236,15,121,0.13)' : '0 12px 40px rgba(23,16,102,0.08)',
        cursor: 'default',
        position:'relative',
        overflow:'hidden',
      }}
    >
      {isFeat && <div style={{ position:'absolute', top:-24, right:-24, width:80, height:80, borderRadius:'50%', background:'radial-gradient(circle,rgba(236,15,121,0.13) 0%,transparent 70%)', pointerEvents:'none' }} />}
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
        <div style={{ width:36, height:36, borderRadius:'50%', background:iconBg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
          <Icon type={m.icon} size={17} color={iconColor} />
        </div>
        <span style={{ fontFamily:'var(--fd)', fontSize:21, fontWeight:800, color:yearColor, lineHeight:1, letterSpacing:'-0.02em' }}>{m.year}</span>
      </div>
      <div style={{ fontFamily:'var(--fm)', fontSize:9, fontWeight:700, letterSpacing:'0.13em', textTransform:'uppercase', color:NAVY, marginBottom:7, lineHeight:1.35 }}>{m.title}</div>
      <p style={{ fontFamily:'var(--fb)', fontSize:11.5, color:MUTED, lineHeight:1.72, margin:0, fontWeight:300 }}>{m.desc}</p>
    </motion.div>
  );
}

/* ── nav arrow ── */
function NavBtn({ disabled, onClick, children }: { disabled:boolean; onClick:()=>void; children:React.ReactNode }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick} disabled={disabled}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ width:38, height:38, borderRadius:'50%', background:hov&&!disabled?PINK:'#fff', border:`1px solid ${hov&&!disabled?PINK:'rgba(0,0,0,0.12)'}`, boxShadow:'0 2px 12px rgba(0,0,0,0.08)', display:'flex', alignItems:'center', justifyContent:'center', cursor:disabled?'default':'pointer', opacity:disabled?0.3:1, transition:'all 0.22s', flexShrink:0 }}
      aria-label={String(children)}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        {children === '←'
          ? <path d="M8.5 2.5L5 7l3.5 4.5" stroke={hov&&!disabled?'#fff':NAVY} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          : <path d="M5.5 2.5L9 7l-3.5 4.5" stroke={hov&&!disabled?'#fff':NAVY} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        }
      </svg>
    </button>
  );
}

/* ═══════════════════════ MAIN COMPONENT ═══════════════════════ */
export default function SmallBigStoryTimeline() {
  const sectionRef  = useRef<HTMLElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);
  const isInView    = useInView(sectionRef, { once:true, amount:0.15 });
  const [activeIdx, setActiveIdx] = useState(0);
  const [maxStep,   setMaxStep]   = useState(milestones.length - 1);
  const trackX = useMotionValue(0);

  const totalW = L_PAD + milestones.length * SLOT_W + R_PAD;

  /* calculate how many steps are needed to reach the end */
  useEffect(() => {
    const calc = () => {
      const container = trackRef.current?.parentElement;
      if (!container) return;
      const overflowPx = totalW - container.offsetWidth;
      if (overflowPx > 0) {
        setMaxStep(Math.ceil(overflowPx / SLOT_W));
      } else {
        setMaxStep(0);
      }
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, [totalW]);

  const jumpTo = (idx: number) => {
    const next = Math.max(0, Math.min(maxStep, idx));
    setActiveIdx(next);
    fmAnimate(trackX, -(next * SLOT_W), { type:'spring', stiffness:280, damping:30 });
  };

  /* positions */
  const topCardBottom = LINE_Y - CONN_H - DOT_R - 8;
  const bottomCardTop = LINE_Y + CONN_H + DOT_R + 8;
  const topConnBottom = LINE_Y - DOT_R - 3;
  const bottomConnTop = LINE_Y + DOT_R + 3;

  return (
    <section
      ref={sectionRef}
      style={{ background:BG, overflow:'hidden', paddingTop:8 }}
    >
      {/* Decorative rings */}
      <div style={{ position:'absolute', pointerEvents:'none', overflow:'hidden' }}>
        <svg width="180" height="180" viewBox="0 0 180 180" style={{ position:'absolute', left:-50, bottom:0, opacity:0.05 }}>
          <circle cx="90" cy="90" r="70" fill="none" stroke={NAVY} strokeWidth="1"/>
          <circle cx="90" cy="90" r="48" fill="none" stroke={PINK} strokeWidth="0.7"/>
        </svg>
      </div>

      {/* ── HEADER ── */}
      <div style={{ padding:'24px 60px 0', display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
        <div>
          <motion.div
            initial={{ opacity:0, y:-10 }} animate={isInView?{opacity:1,y:0}:{}}
            transition={{ duration:0.5, delay:0.1 }}
            style={{ fontFamily:'var(--fm)', fontSize:10, letterSpacing:'0.22em', textTransform:'uppercase', color:PINK, display:'flex', alignItems:'center', gap:7, marginBottom:10 }}
          >
            About Us <span style={{ fontSize:8 }}>✦</span>
          </motion.div>

          <div style={{ overflow:'hidden' }}>
            <motion.h2
              initial={{ y:'100%' }} animate={isInView?{y:0}:{}}
              transition={{ duration:0.7, ease:[0.22,1,0.36,1] }}
              style={{ fontFamily:'var(--fd)', fontSize:'clamp(28px,3.6vw,50px)', fontWeight:900, lineHeight:1, letterSpacing:'-0.03em', margin:0 }}
            >
              <span style={{ color:NAVY }}>The SmallBig </span>
              <em style={{ color:PINK, fontStyle:'italic' }}>Story</em>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity:0 }} animate={isInView?{opacity:1}:{}}
            transition={{ duration:0.6, delay:0.35 }}
            style={{ fontFamily:'var(--fb)', fontSize:13, color:MUTED, fontWeight:300, margin:'8px 0 0', lineHeight:1.6, maxWidth:520 }}
          >
            From a single idea to a regional force — here&apos;s how we grew, evolved and made impact.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity:0, x:16 }} animate={isInView?{opacity:1,x:0}:{}}
          transition={{ duration:0.6, delay:0.3 }}
        >
          <img src="/images/tsbi-logo.png" alt="TSBI" style={{ height:50, width:'auto' }}
            onError={(e)=>{ (e.currentTarget as HTMLImageElement).style.display='none'; }}
          />
        </motion.div>
      </div>

      {/* ── TIMELINE TRACK ── */}
      <div style={{ position:'relative', overflow:'hidden', height:TRACK_H, marginTop:8 }}>
        <motion.div
          ref={trackRef}
          style={{ x:trackX, position:'absolute', top:0, left:0, height:TRACK_H, width:totalW, willChange:'transform' }}
        >
          {/* Horizontal line */}
          <div style={{ position:'absolute', left:0, right:0, top:LINE_Y, height:1.5, background:`linear-gradient(to right, transparent, ${NAVY} 5%, ${NAVY} 95%, transparent)`, opacity:0.15 }} />
          {/* Arrow tip */}
          <div style={{ position:'absolute', right:R_PAD-14, top:LINE_Y-5, width:0, height:0, borderTop:'5px solid transparent', borderBottom:'5px solid transparent', borderLeft:`9px solid rgba(23,16,102,0.15)` }} />

          {/* Milestones */}
          {milestones.map((m, i) => {
            const isActive  = i === activeIdx;
            const colCenter = L_PAD + i * SLOT_W + SLOT_W / 2;
            const cardLeft  = colCenter - CARD_W / 2;
            const isTop     = m.pos === 'top';
            const isPink    = i % 2 === 0;

            return (
              <React.Fragment key={m.year}>
                {/* Card */}
                <div style={{ position:'absolute', left:cardLeft, ...(isTop ? { bottom:TRACK_H - topCardBottom } : { top:bottomCardTop }) }}>
                  <MCard m={m} idx={i} isActive={isActive} />
                </div>

                {/* Connector */}
                <div style={{ position:'absolute', left:colCenter - 0.75, width:1.5, ...(isTop ? { bottom:TRACK_H - topConnBottom, height:CONN_H - 4 } : { top:bottomConnTop, height:CONN_H - 4 }), background:isActive ? PINK : 'rgba(23,16,102,0.16)', transition:'background 0.4s' }} />

                {/* Dot */}
                <div style={{ position:'absolute', left:colCenter - DOT_R, top:LINE_Y - DOT_R, width:DOT_R*2, height:DOT_R*2, borderRadius:'50%', background:isActive ? PINK : isPink ? PINK : NAVY, boxShadow:isActive ? `0 0 0 8px rgba(236,15,121,0.12),0 0 24px rgba(236,15,121,0.4)` : isPink ? '0 0 0 3px rgba(236,15,121,0.14)' : '0 0 0 3px rgba(23,16,102,0.1)', transition:'all 0.4s', zIndex:2 }}>
                  {isActive && (
                    <motion.div animate={{ scale:[0.6,1.7], opacity:[0.7,0] }} transition={{ duration:1.8, repeat:Infinity, ease:'easeOut' }}
                      style={{ position:'absolute', inset:-10, borderRadius:'50%', border:'1.5px solid rgba(236,15,121,0.32)' }} />
                  )}
                </div>

                {/* Year label */}
                <div style={{ position:'absolute', left:colCenter, transform:'translateX(-50%)', ...(isTop ? { top:LINE_Y + DOT_R + 11 } : { bottom:TRACK_H - LINE_Y + DOT_R + 11 }), fontFamily:'var(--fd)', fontSize:13, fontWeight:700, color:isActive ? PINK : isPink ? PINK : NAVY, letterSpacing:'-0.01em', transition:'color 0.4s', whiteSpace:'nowrap' }}>
                  {m.year}
                </div>
              </React.Fragment>
            );
          })}
        </motion.div>
      </div>

      {/* ── BOTTOM CONTROLS ── */}
      <div style={{ padding:'0 60px 48px', display:'flex', flexDirection:'column', alignItems:'center', gap:14 }}>

        <div style={{ display:'flex', alignItems:'center', gap:16, width:'100%', maxWidth:720 }}>
          <NavBtn disabled={activeIdx === 0}       onClick={() => jumpTo(activeIdx - 1)}>←</NavBtn>

          {/* progress track */}
          <div style={{ flex:1, height:2, background:'rgba(23,16,102,0.1)', borderRadius:2, position:'relative', overflow:'hidden' }}>
            <motion.div
              animate={{ width:`${(activeIdx / Math.max(1, maxStep)) * 100}%` }}
              transition={{ type:'spring', stiffness:280, damping:30 }}
              style={{ position:'absolute', left:0, top:0, height:'100%', background:PINK, borderRadius:2 }}
            />
          </div>

          <NavBtn disabled={activeIdx >= maxStep}  onClick={() => jumpTo(activeIdx + 1)}>→</NavBtn>
        </div>

        <div style={{ fontFamily:'var(--fm)', fontSize:8.5, letterSpacing:'0.24em', textTransform:'uppercase', color:'rgba(23,16,102,0.3)' }}>
          Click arrows to explore our journey
        </div>
      </div>
    </section>
  );
}
