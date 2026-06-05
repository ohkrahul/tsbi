'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

/* ── types ── */
interface Job {
  role: string;
  department: string;
  location: string;
  experience: string;
  summary?: string;
  responsibilities: string[];
  skills: string[];
  software?: string[];
  email?: string;
}

/* ── role icons (inline SVG — no extra dependency) ── */
function RoleIcon({ id, active }: { id: string; active: boolean }) {
  const c = active ? '#e0197d' : '#9b9b9b';
  const s = { stroke: c, strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, fill: 'none' };
  const icons: Record<string, React.ReactNode> = {
    'account-executive': <><circle cx="12" cy="8" r="4" {...s}/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" {...s}/></>,
    'copy-lead':         <><path d="M12 20h9" {...s}/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" {...s}/></>,
    'group-account-head':<><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" {...s}/><circle cx="9" cy="7" r="4" {...s}/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" {...s}/></>,
    'graphic-designer':  <><rect x="2" y="3" width="20" height="14" rx="2" {...s}/><path d="M8 21h8M12 17v4" {...s}/></>,
    'media-planner':     <><path d="M3 11l19-9-9 19-2-8-8-2z" {...s}/></>,
  };
  return <svg width="28" height="28" viewBox="0 0 24 24">{icons[id] ?? icons['account-executive']}</svg>;
}

/* ── section block inside card ── */
function DetailBlock({
  title, items, index,
}: { title: string; items: string[]; index: number }) {
  const colors = ['#fff0f6','#f0f4ff','#fff8f0','#f0fff8'];
  const iconColors = ['#e0197d','#4f6ef7','#f07a1a','#1a9080'];
  const bg = colors[index % colors.length];
  const ic = iconColors[index % iconColors.length];

  return (
    <motion.div
      variants={{ hidden:{opacity:0,y:16}, visible:{opacity:1,y:0} }}
      style={{ display:'flex', flexDirection:'column', gap:12 }}
    >
      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
        <div style={{ width:32, height:32, borderRadius:'50%', background:bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={ic} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
          </svg>
        </div>
        <span style={{ fontFamily:'var(--fm)', fontSize:11, fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:'#0a0a0a' }}>
          {title}
        </span>
      </div>
      <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:8 }}>
        {items.map((item, i) => (
          <li key={i} style={{ display:'flex', gap:8, alignItems:'flex-start', fontSize:13, lineHeight:1.72, color:'rgba(10,10,10,0.62)', fontWeight:300 }}>
            <span style={{ color:ic, marginTop:4, flexShrink:0 }}>•</span>
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

/* ── main component ── */
const ROLES = [
  { id:'account-executive',   title:'Account Executive'      },
  { id:'copy-lead',           title:'Copy Lead'              },
  { id:'group-account-head',  title:'Group Account Head'     },
  { id:'graphic-designer',    title:'Graphic Designer'       },
  { id:'media-planner',       title:'Media Planner and Buyer'},
];

export default function CareersPageClient({ jobs }: { jobs: Job[] }) {
  const [active, setActive] = useState(ROLES[0].id);
  const [applying, setApplying] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  /* map role id → job data */
  const jobMap: Record<string, Job> = {};
  jobs.forEach(j => {
    const key = j.role.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    // also handle "media-planner-and-buyer" → "media-planner"
    const shortKey = key.replace('-and-buyer','').replace('-buyer','');
    jobMap[key] = j;
    jobMap[shortKey] = j;
  });

  const job = jobMap[active] ?? jobs[0];
  if (!job) return null;

  // sections built inline in the JSX for better left/right balancing

  const handleApply = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    await fetch('/api/careers/apply', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify(Object.fromEntries(fd.entries())),
    });
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="cr-hero">
        <div className="sec-label">Join Our Team</div>
        <h1 className="cr-h1">
          We&apos;re<br />Hiring<br /><em>Big Thinkers.</em>
        </h1>
        <p style={{ color:'var(--muted)', fontSize:16, fontWeight:300, maxWidth:480, lineHeight:1.8, marginTop:18 }}>
          TSBI is a place where ambitious people do their best work. If you live for big
          ideas and love the craft, there&apos;s a seat at the table for you.
        </p>
      </section>

      {/* ── Role tabs ── */}
      <div style={{ background:'#fff', borderBottom:'1px solid rgba(0,0,0,0.08)' }}>
        <div style={{ maxWidth:1120, margin:'0 auto', padding:'0 32px', display:'flex' }}>
          {ROLES.map(r => (
            <button
              key={r.id}
              aria-selected={active === r.id}
              onClick={() => setActive(r.id)}
              style={{
                flex:1, display:'flex', flexDirection:'column', alignItems:'center',
                gap:10, padding:'28px 12px 20px',
                background:'none', border:'none', cursor:'pointer',
                borderBottom:`2px solid ${active===r.id ? '#e0197d' : 'transparent'}`,
                transition:'border-color 0.25s',
                position:'relative',
              }}
            >
              {active === r.id && (
                <motion.div layoutId="tab-underline"
                  style={{ position:'absolute', bottom:-1, left:0, right:0, height:2, background:'#e0197d', borderRadius:2 }}
                />
              )}
              <RoleIcon id={r.id} active={active===r.id} />
              <span style={{
                fontFamily:'var(--fm)', fontSize:11, letterSpacing:'0.05em',
                color: active===r.id ? '#e0197d' : '#9b9b9b',
                fontWeight: active===r.id ? 600 : 400,
                transition:'color 0.25s',
                textAlign:'center', lineHeight:1.35,
              }}>{r.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Job detail card ── */}
      <section style={{ background:'var(--off)', padding:'48px 32px 0' }}>
        <div style={{ maxWidth:1120, margin:'0 auto' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity:0, y:20, scale:0.99 }}
              animate={{ opacity:1, y:0, scale:1 }}
              exit={{ opacity:0, y:-14, scale:0.99 }}
              transition={{ duration:0.42, ease:[0.22,1,0.36,1] }}
              style={{
                background:'#fff',
                borderRadius:24,
                border:'1px solid rgba(0,0,0,0.08)',
                boxShadow:'0 16px 60px rgba(0,0,0,0.07)',
                padding:'52px 48px',
                display:'grid',
                gridTemplateColumns:'1fr 260px',
                gap:48,
              }}
            >
              {/* ── Main content ── */}
              <div>
                {/* Title */}
                <h2 style={{ fontFamily:'var(--fd)', fontSize:'clamp(26px,3.5vw,44px)', fontWeight:700, color:'#0a0a0a', letterSpacing:'-0.02em', lineHeight:1.05, marginBottom:18 }}>
                  {job.role}
                </h2>

                {/* Meta row */}
                <div style={{ display:'flex', alignItems:'center', gap:18, marginBottom:22, flexWrap:'wrap' }}>
                  {[
                    { icon:<><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 2v5M8 2v5"/></>, label: job.location.split('·')[0]?.trim() ?? 'Full-time' },
                    { icon:<><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></>, label: job.location.split('·')[1]?.trim() ?? 'Mumbai' },
                    { icon:<><polyline points="22,7 13,16 8,11 2,17"/><polyline points="17,7 22,7 22,12"/></>, label:`Experience: ${job.experience}` },
                  ].map((m,i) => (
                    <div key={i} style={{ display:'flex', alignItems:'center', gap:6 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(10,10,10,0.45)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        {m.icon}
                      </svg>
                      <span style={{ fontFamily:'var(--fm)', fontSize:12, color:'rgba(10,10,10,0.55)', fontWeight:400 }}>{m.label}</span>
                    </div>
                  ))}
                </div>

                {/* Experience badge */}
                <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#fff0f6', borderRadius:999, padding:'6px 14px 6px 10px', marginBottom:18 }}>
                  <div style={{ width:22, height:22, borderRadius:'50%', background:'#e0197d', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="22,7 13,16 8,11 2,17"/>
                    </svg>
                  </div>
                  <span style={{ fontFamily:'var(--fm)', fontSize:12, fontWeight:600, color:'#e0197d' }}>
                    Experience Required:
                  </span>
                  <span style={{ fontFamily:'var(--fb)', fontSize:12, color:'rgba(10,10,10,0.65)' }}>
                    {job.experience}
                  </span>
                </div>

                {/* Intro / Summary */}
                {job.summary && (
                  <p style={{ fontSize:14, fontWeight:300, lineHeight:1.8, color:'rgba(10,10,10,0.62)', marginBottom:28, maxWidth:640 }}>
                    {job.summary}
                  </p>
                )}

                <div style={{ width:'100%', height:1, background:'rgba(0,0,0,0.06)', marginBottom:28 }} />

                {/* Detail sections — single column, no whitespace gaps */}
                {(() => {
                  const allSecs = [
                    ...(job.responsibilities.length ? [{title:'Key Responsibilities',  items:job.responsibilities, colorIdx:1}] : []),
                    ...(job.skills.length           ? [{title:'Requirements / Skills', items:job.skills,           colorIdx:0}] : []),
                    ...(job.software?.length        ? [{title:'Software Knowledge',    items:job.software!,        colorIdx:3}] : []),
                  ];
                  return (
                    <motion.div
                      variants={{ hidden:{}, visible:{ transition:{ staggerChildren:0.09, delayChildren:0.1 } } }}
                      initial="hidden" animate="visible"
                      style={{ display:'flex', flexDirection:'column', gap:0 }}
                    >
                      {allSecs.map((s, idx) => (
                        <div key={s.title}>
                          {idx > 0 && <div style={{ height:1, background:'rgba(0,0,0,0.05)', margin:'24px 0' }} />}
                          <DetailBlock title={s.title} items={s.items} index={s.colorIdx} />
                        </div>
                      ))}
                    </motion.div>
                  );
                })()}
              </div>

              {/* ── Right CTA panel ── */}
              <div style={{ display:'flex', flexDirection:'column', gap:14, paddingTop:8 }}>
                {/* Apply Now */}
                {!applying ? (
                  <motion.button
                    whileHover={{ scale:1.02 }}
                    whileTap={{ scale:0.98 }}
                    onClick={() => setApplying(true)}
                    style={{
                      display:'flex', alignItems:'center', justifyContent:'center', gap:8,
                      background:'#e0197d', color:'#fff',
                      border:'none', borderRadius:999,
                      padding:'15px 24px',
                      fontFamily:'var(--fm)', fontSize:13, fontWeight:600,
                      letterSpacing:'0.04em', cursor:'pointer',
                      boxShadow:'0 8px 28px rgba(224,25,125,0.32)',
                    }}
                  >
                    Apply Now
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </motion.button>
                ) : submitted ? (
                  <div style={{ background:'#f0fff8', borderRadius:14, padding:'16px 18px', fontSize:13, color:'#1a9080', fontWeight:400, textAlign:'center' }}>
                    ✓ Application received! We&apos;ll be in touch.
                  </div>
                ) : (
                  <form onSubmit={handleApply} style={{ display:'flex', flexDirection:'column', gap:10 }}>
                    <input name="name" placeholder="Full name" required style={inputStyle} />
                    <input name="email" type="email" placeholder="your@email.com" required style={inputStyle} />
                    <input name="role" type="hidden" value={job.role} />
                    <input name="cv" type="file" accept=".pdf,.doc,.docx" style={{ ...inputStyle, padding:'8px 12px', fontSize:12 }} />
                    <button type="submit" disabled={submitting} style={{ background:'#e0197d', color:'#fff', border:'none', borderRadius:999, padding:'13px', fontFamily:'var(--fm)', fontSize:12, fontWeight:600, cursor:'pointer' }}>
                      {submitting ? 'Submitting…' : 'Submit Application →'}
                    </button>
                    <button type="button" onClick={()=>setApplying(false)} style={{ background:'none', border:'none', fontSize:11, color:'rgba(10,10,10,0.4)', cursor:'pointer', fontFamily:'var(--fm)' }}>Cancel</button>
                  </form>
                )}

                {/* View Full Description
                <button
                  style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:6, background:'transparent', color:'#0a0a0a', border:'1px solid rgba(0,0,0,0.14)', borderRadius:999, padding:'14px 24px', fontFamily:'var(--fm)', fontSize:13, fontWeight:500, cursor:'pointer', transition:'border-color 0.2s' }}
                  onMouseEnter={e=>(e.currentTarget.style.borderColor='#e0197d')}
                  onMouseLeave={e=>(e.currentTarget.style.borderColor='rgba(0,0,0,0.14)')}
                >
                  View Full Description
                </button> */}

                {/* Help block */}
                <div style={{ marginTop:8, borderRadius:16, border:'1px solid rgba(0,0,0,0.07)', padding:'20px 18px', display:'flex', gap:12, alignItems:'flex-start' }}>
                  <div style={{ width:36, height:36, borderRadius:'50%', background:'#fff0f6', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e0197d" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontFamily:'var(--fm)', fontSize:12, fontWeight:600, color:'#0a0a0a', marginBottom:4 }}>Have questions?</div>
                    <div style={{ fontFamily:'var(--fb)', fontSize:12, color:'rgba(10,10,10,0.5)', marginBottom:8 }}>We&apos;re here to help.</div>
                    <a href={`mailto:${job.email ?? 'careers@tsbi.in'}`} style={{ fontFamily:'var(--fm)', fontSize:12, color:'#e0197d', textDecoration:'none', fontWeight:500 }}>
                      {job.email ?? 'careers@tsbi.in'}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Bottom strip ── */}
      <div style={{ background:'var(--off)', padding:'32px 32px 48px' }}>
        <div style={{
          maxWidth:1120, margin:'0 auto',
          borderTop:'1px solid rgba(0,0,0,0.08)', paddingTop:24,
          display:'flex', alignItems:'center', gap:16, flexWrap:'wrap',
        }}>
          <div style={{ width:36, height:36, borderRadius:'50%', border:'1px solid rgba(224,25,125,0.3)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e0197d" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
            </svg>
          </div>
          <div>
            <span style={{ fontFamily:'var(--fm)', fontSize:13, fontWeight:600, color:'#0a0a0a' }}>Don&apos;t see the right role?</span>
            <span style={{ fontFamily:'var(--fb)', fontSize:13, color:'rgba(10,10,10,0.55)', marginLeft:8 }}>
              Send us your profile and we&apos;ll reach out when a role that fits opens up.
            </span>
          </div>
          <Link href="mailto:careers@tsbi.in" style={{ marginLeft:'auto', fontFamily:'var(--fm)', fontSize:13, color:'#e0197d', textDecoration:'none', fontWeight:600, display:'flex', alignItems:'center', gap:6 }}>
            Send Your Profile
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}

const inputStyle: React.CSSProperties = {
  width:'100%', padding:'11px 14px', border:'1px solid rgba(0,0,0,0.12)',
  borderRadius:10, fontFamily:'var(--fb)', fontSize:13, color:'#0a0a0a',
  outline:'none', background:'#fbfaf7', boxSizing:'border-box',
};
