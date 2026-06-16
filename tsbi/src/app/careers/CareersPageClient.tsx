'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Cycling headline: "Big Thinkers." ↔ job titles ── */
const CYCLE = ['Big Thinkers.', 'Copy Supervisor', 'Copywriter'];

function CyclingText() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(p => (p + 1) % CYCLE.length), 2800);
    return () => clearInterval(t);
  }, []);
  return (
    <span style={{ display: 'block', overflow: 'hidden', height: '1.08em', position: 'relative' }}>
      <AnimatePresence mode="wait">
        <motion.em
          key={idx}
          initial={{ y: '105%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-105%', opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'block', color: '#e0197d', fontStyle: 'italic', willChange: 'transform' }}
        >
          {CYCLE[idx]}
        </motion.em>
      </AnimatePresence>
    </span>
  );
}

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

function FilterSection({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderBottom: '1px solid rgba(0,0,0,0.08)', paddingBottom: 16, marginBottom: 16 }}>
      <button onClick={() => setOpen(o => !o)}
        style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: '0 0 10px', fontFamily: 'var(--fm)', fontSize: 13, fontWeight: 600, color: '#0a0a0a' }}
      >
        {title}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          <path d="M2 4l5 5 5-5" stroke="#0a0a0a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {open && <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>{children}</div>}
    </div>
  );
}

function CheckRow({ label, count, checked, onChange }: { label: string; count: number; checked: boolean; onChange: () => void }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
      <div onClick={onChange}
        style={{ width: 16, height: 16, borderRadius: 3, border: `1.5px solid ${checked ? '#e0197d' : 'rgba(0,0,0,0.25)'}`, background: checked ? '#e0197d' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.15s' }}
      >
        {checked && <svg width="9" height="7" viewBox="0 0 9 7" fill="none"><path d="M1 3.5L3.5 6 8 1" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
      </div>
      <span style={{ fontFamily: 'var(--fm)', fontSize: 13, color: 'rgba(0,0,0,0.7)', flex: 1 }}>{label}</span>
      <span style={{ fontFamily: 'var(--fm)', fontSize: 11, color: 'rgba(0,0,0,0.4)' }}>{count}</span>
    </label>
  );
}

function JobCard({ job, expanded, onToggle, isMobile }: { job: Job; expanded: boolean; onToggle: () => void; isMobile: boolean }) {
  const [applying, setApplying] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleApply = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    await fetch('/api/careers/apply', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(fd.entries())) });
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div style={{ background: '#fff', borderRadius: 12, border: `1px solid ${expanded ? 'rgba(224,25,125,0.3)' : 'rgba(0,0,0,0.1)'}`, boxShadow: expanded ? '0 4px 24px rgba(224,25,125,0.08)' : '0 2px 8px rgba(0,0,0,0.06)', transition: 'all 0.25s', overflow: 'hidden' }}>
      <div style={{ padding: isMobile ? '20px 18px 16px' : '24px 28px 20px', cursor: 'pointer' }} onClick={onToggle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontFamily: 'var(--fm)', fontSize: 18, fontWeight: 700, color: '#0a0a0a', margin: '0 0 8px', lineHeight: 1.25 }}>{job.role}</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
              {[job.department, 'Full-time', 'Mumbai'].map(tag => (
                <span key={tag} style={{ fontFamily: 'var(--fm)', fontSize: 11, color: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(0,0,0,0.25)', display: 'inline-block' }} />{tag}
                </span>
              ))}
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#fff0f6', borderRadius: 999, padding: '4px 12px' }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#e0197d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22,7 13,16 8,11 2,17"/></svg>
              <span style={{ fontFamily: 'var(--fm)', fontSize: 11, fontWeight: 600, color: '#e0197d' }}>{job.experience}</span>
            </div>
          </div>
          <button onClick={e => { e.stopPropagation(); onToggle(); }}
            style={{ flexShrink: 0, background: expanded ? '#e0197d' : 'transparent', color: expanded ? '#fff' : '#e0197d', border: '1.5px solid #e0197d', borderRadius: 999, padding: '8px 18px', fontFamily: 'var(--fm)', fontSize: 12, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', letterSpacing: '0.04em' }}
          >
            {expanded ? 'Close' : 'Learn more'}
          </button>
        </div>
        {!expanded && (
          <div style={{ marginTop: 14 }}>
            <div style={{ fontFamily: 'var(--fm)', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.45)', marginBottom: 8 }}>Minimum qualifications</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 5 }}>
              {job.skills.slice(0, 2).map((s, i) => (
                <li key={i} style={{ fontFamily: 'var(--fm)', fontSize: 13, color: 'rgba(0,0,0,0.65)', display: 'flex', gap: 8, alignItems: 'flex-start', lineHeight: 1.5 }}>
                  <span style={{ color: '#e0197d', marginTop: 3, flexShrink: 0 }}>•</span>{s}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} style={{ overflow: 'hidden' }}>
            <div style={{ padding: isMobile ? '0 18px 22px' : '0 28px 28px', borderTop: '1px solid rgba(0,0,0,0.07)', paddingTop: 24 }}>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 280px', gap: isMobile ? 24 : 40 }}>
                <div>
                  {[{ title: 'Key Responsibilities', items: job.responsibilities }, { title: 'Selection Criteria', items: job.skills }].map(({ title, items }, si) => (
                    <div key={title} style={{ marginBottom: si === 0 ? 28 : 0 }}>
                      <div style={{ fontFamily: 'var(--fm)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.45)', marginBottom: 12 }}>{title}</div>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {items.map((item, i) => (
                          <li key={i} style={{ fontFamily: 'var(--fm)', fontSize: 13, color: 'rgba(0,0,0,0.7)', display: 'flex', gap: 10, alignItems: 'flex-start', lineHeight: 1.6 }}>
                            <span style={{ color: '#e0197d', marginTop: 4, flexShrink: 0 }}>•</span>{item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 4 }}>
                  {!applying ? (
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setApplying(true)}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#e0197d', color: '#fff', border: 'none', borderRadius: 999, padding: '14px 24px', fontFamily: 'var(--fm)', fontSize: 13, fontWeight: 600, cursor: 'pointer', boxShadow: '0 8px 28px rgba(224,25,125,0.3)' }}
                    >
                      Apply Now <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </motion.button>
                  ) : submitted ? (
                    <div style={{ background: '#f0fff8', borderRadius: 14, padding: '16px 18px', fontSize: 13, color: '#1a9080', textAlign: 'center' }}>
                      ✓ Application received! We&apos;ll be in touch.
                    </div>
                  ) : (
                    <form onSubmit={handleApply} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      <input name="name" placeholder="Full name" required style={inputSt} />
                      <input name="email" type="email" placeholder="your@email.com" required style={inputSt} />
                      <input name="role" type="hidden" value={job.role} />
                      <input name="cv" type="file" accept=".pdf,.doc,.docx" style={{ ...inputSt, padding: '8px 12px', fontSize: 12 }} />
                      <button type="submit" disabled={submitting}
                        style={{ background: '#e0197d', color: '#fff', border: 'none', borderRadius: 999, padding: '13px', fontFamily: 'var(--fm)', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
                      >{submitting ? 'Submitting...' : 'Submit Application'}</button>
                      <button type="button" onClick={() => setApplying(false)} style={{ background: 'none', border: 'none', fontSize: 11, color: 'rgba(0,0,0,0.4)', cursor: 'pointer', fontFamily: 'var(--fm)' }}>Cancel</button>
                    </form>
                  )}
                  <div style={{ borderRadius: 14, border: '1px solid rgba(0,0,0,0.08)', padding: '18px 16px', display: 'flex', gap: 12 }}>
                    <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#fff0f6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#e0197d" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--fm)', fontSize: 12, fontWeight: 600, color: '#0a0a0a', marginBottom: 3 }}>Have questions?</div>
                      <a href={`mailto:${job.email ?? 'careers@tsbi.in'}`} style={{ fontFamily: 'var(--fm)', fontSize: 12, color: '#e0197d', textDecoration: 'none', fontWeight: 500 }}>
                        {job.email ?? 'careers@tsbi.in'}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputSt: React.CSSProperties = {
  width: '100%', padding: '11px 14px', border: '1px solid rgba(0,0,0,0.12)',
  borderRadius: 10, fontFamily: 'var(--fm)', fontSize: 13, color: '#0a0a0a',
  outline: 'none', background: '#fbfaf7', boxSizing: 'border-box',
};

export default function CareersPageClient({ jobs }: { jobs: Job[] }) {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState<string[]>([]);
  const [expFilter, setExpFilter] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const m = () => setIsMobile(window.innerWidth < 768);
    m();
    window.addEventListener('resize', m);
    return () => window.removeEventListener('resize', m);
  }, []);

  const departments = [...new Set(jobs.map(j => j.department))];
  const experiences = [...new Set(jobs.map(j => j.experience))];

  const filtered = jobs.filter(j => {
    const matchSearch = !search || j.role.toLowerCase().includes(search.toLowerCase()) || j.department.toLowerCase().includes(search.toLowerCase());
    const matchDept = deptFilter.length === 0 || deptFilter.includes(j.department);
    const matchExp  = expFilter.length === 0  || expFilter.includes(j.experience);
    return matchSearch && matchDept && matchExp;
  });

  const toggle = (val: string, arr: string[], setter: (v: string[]) => void) =>
    setter(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]);

  return (
    <>
      {/* ── HERO ── */}
      <section className="cr-hero">
        {/* LEFT: stagger-animated text */}
        <motion.div className="cr-hero-left"
          initial="hidden" animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.14, delayChildren: 0.08 } } }}
        >
          <motion.div className="sec-label"
            variants={{ hidden: { opacity: 0, y: -14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } }}
          >
            Join Our Team
          </motion.div>

          <h1 className="cr-h1">
            <motion.span style={{ display: 'block' }}
              variants={{ hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } }}
            >
              We&apos;re
            </motion.span>
            <motion.span style={{ display: 'block' }}
              variants={{ hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } }}
            >
              Hiring
            </motion.span>
            {/* Cycling line: Big Thinkers. / Copy Supervisor / Copywriter */}
            <motion.span style={{ display: 'block' }}
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.4 } } }}
            >
              <CyclingText />
            </motion.span>
          </h1>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
            style={{ color: 'var(--muted)', fontFamily: 'var(--fm)', fontSize: 15, fontWeight: 300, maxWidth: 440, lineHeight: 1.85, marginTop: 22 }}
          >
            TSBI is a place where ambitious people do their best work. If you live for big ideas and love the craft, there&apos;s a seat at the table for you.
          </motion.p>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
            style={{ display: 'flex', gap: 14, marginTop: 36, flexWrap: 'wrap' }}
          >
            <a href="#jobs" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#e0197d', color: '#fff', borderRadius: 999, padding: '13px 28px', fontFamily: 'var(--fm)', fontSize: 13, fontWeight: 600, textDecoration: 'none', letterSpacing: '0.04em', boxShadow: '0 8px 28px rgba(224,25,125,0.32)' }}>
              View Open Roles
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="mailto:careers@tsbi.in" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', color: '#0a0a0a', borderRadius: 999, padding: '13px 28px', fontFamily: 'var(--fm)', fontSize: 13, fontWeight: 500, textDecoration: 'none', border: '1px solid rgba(0,0,0,0.18)', letterSpacing: '0.04em' }}>
              careers@tsbi.in
            </a>
          </motion.div>
        </motion.div>

        {/* RIGHT: image with gradient background */}
        <motion.div className="cr-hero-img"
          initial={{ opacity: 0, x: 56, scale: 0.94 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image src="/Careers/cc1.png" alt="Careers at TSBI" fill sizes="46vw" style={{ objectFit: 'cover', objectPosition: 'left center' }} priority />
        </motion.div>
      </section>

      {/* ── JOBS MATCHED BAR ── */}
      <div id="jobs" style={{ background: '#fff', borderBottom: '1px solid rgba(0,0,0,0.08)', padding: isMobile ? '14px 16px' : '16px 40px', display: 'flex', alignItems: 'center', gap: isMobile ? 12 : 20, flexWrap: 'wrap' }}>
        <span style={{ fontFamily: 'var(--fm)', fontSize: 15, fontWeight: 700, color: '#e0197d' }}>{filtered.length}</span>
        <span style={{ fontFamily: 'var(--fm)', fontSize: 15, color: 'rgba(0,0,0,0.6)', fontWeight: 400 }}>
          {filtered.length === 1 ? 'job' : 'jobs'} matched
        </span>
        {(deptFilter.length > 0 || expFilter.length > 0 || search) && (
          <button onClick={() => { setDeptFilter([]); setExpFilter([]); setSearch(''); }}
            style={{ marginLeft: 'auto', fontFamily: 'var(--fm)', fontSize: 12, color: 'rgba(0,0,0,0.5)', background: 'none', border: '1px solid rgba(0,0,0,0.15)', borderRadius: 999, padding: '5px 14px', cursor: 'pointer' }}
          >
            Clear filters
          </button>
        )}
        <div style={{ marginLeft: isMobile ? 0 : 'auto', width: isMobile ? '100%' : undefined, position: 'relative', display: 'flex', alignItems: 'center' }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ position: 'absolute', left: 12, color: 'rgba(0,0,0,0.35)' }}>
            <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.4"/>
            <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
          <input placeholder="What do you want to do?" value={search} onChange={e => setSearch(e.target.value)}
            style={{ paddingLeft: 36, paddingRight: 16, paddingTop: 9, paddingBottom: 9, border: '1px solid rgba(0,0,0,0.15)', borderRadius: 999, fontFamily: 'var(--fm)', fontSize: 13, color: '#0a0a0a', outline: 'none', background: '#fff', width: isMobile ? '100%' : 260, boxSizing: 'border-box' }}
          />
        </div>
      </div>

      {/* ── MAIN LAYOUT ── */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '260px 1fr', minHeight: 'calc(100vh - 360px)', background: '#f8f8f8' }}>
        {/* Sidebar */}
        <aside style={{ background: '#fff', borderRight: isMobile ? 'none' : '1px solid rgba(0,0,0,0.07)', borderBottom: isMobile ? '1px solid rgba(0,0,0,0.08)' : 'none', padding: isMobile ? '18px 16px' : '28px 24px', position: isMobile ? 'static' : 'sticky', top: isMobile ? undefined : 80, height: 'fit-content' }}>
          <FilterSection title="Department" defaultOpen={!isMobile}>
            {departments.map(d => (
              <CheckRow key={d} label={d} count={jobs.filter(j => j.department === d).length}
                checked={deptFilter.includes(d)} onChange={() => toggle(d, deptFilter, setDeptFilter)} />
            ))}
          </FilterSection>
          <FilterSection title="Job Types" defaultOpen={!isMobile}>
            <CheckRow label="Full-time" count={jobs.length} checked onChange={() => {}} />
          </FilterSection>
          <FilterSection title="Experience" defaultOpen={!isMobile}>
            {experiences.map(e => (
              <CheckRow key={e} label={e} count={jobs.filter(j => j.experience === e).length}
                checked={expFilter.includes(e)} onChange={() => toggle(e, expFilter, setExpFilter)} />
            ))}
          </FilterSection>
        </aside>

        {/* Job list */}
        <main style={{ padding: isMobile ? '20px 16px' : '28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', fontFamily: 'var(--fm)', color: 'rgba(0,0,0,0.4)', fontSize: 14 }}>
              No jobs match your filters.
            </div>
          ) : (
            filtered.map(job => {
              const idx = jobs.indexOf(job);
              return (
                <JobCard key={job.role} job={job}
                  expanded={expandedIdx === idx}
                  onToggle={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
                  isMobile={isMobile}
                />
              );
            })
          )}

          <div style={{ marginTop: 16, background: '#fff', borderRadius: 12, border: '1px solid rgba(0,0,0,0.08)', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(224,25,125,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#e0197d" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </div>
            <div>
              <span style={{ fontFamily: 'var(--fm)', fontSize: 13, fontWeight: 600, color: '#0a0a0a' }}>Don&apos;t see the right role?</span>
              <span style={{ fontFamily: 'var(--fm)', fontSize: 13, color: 'rgba(0,0,0,0.5)', marginLeft: 8 }}>Send us your profile and we&apos;ll reach out when a role opens up.</span>
            </div>
            <a href="mailto:careers@tsbi.in" style={{ marginLeft: 'auto', fontFamily: 'var(--fm)', fontSize: 13, color: '#e0197d', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
              Send Your Profile
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
        </main>
      </div>
    </>
  );
}
