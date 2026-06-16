'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';

const MAPS_URL = 'https://maps.google.com/?q=401+Satyam+Tower,+Deonar,+Govandi+East,+Mumbai+400088';

const socials = [
  {
    platform: 'Instagram',
    href: 'https://instagram.com/tsbi.official',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    platform: 'LinkedIn',
    href: 'https://linkedin.com/company/thesmallbigidea',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
      </svg>
    ),
  },
  {
    platform: 'YouTube',
    href: 'https://youtube.com/@tsbifilms',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.8zM9.6 15.6V8.4L15.8 12l-6.2 3.6z" />
      </svg>
    ),
  },
  {
    platform: 'Behance',
    href: 'https://behance.net/tsbi',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8.84 10.84c.74-.37 1.3-1.13 1.3-2.18 0-2.17-1.62-2.7-3.49-2.7H1v11.93h5.84c2.04 0 3.96-.98 3.96-3.26 0-1.41-.67-2.45-1.96-2.79zM3.62 7.93h2.48c.95 0 1.81.27 1.81 1.38 0 1.02-.67 1.43-1.61 1.43H3.62V7.93zm2.83 8h-2.83v-3.32h2.89c1.16 0 1.9.49 1.9 1.72 0 1.21-.88 1.6-1.96 1.6zM21.44 8.06h-4.9V6.87h4.9v1.19zM23 13.05c0-2.55-1.49-4.68-4.19-4.68-2.62 0-4.4 1.97-4.4 4.55 0 2.68 1.69 4.52 4.4 4.52 2.05 0 3.38-.92 4.02-2.89h-2.06c-.22.73-.95 1.11-1.89 1.11-1.4 0-2.13-.82-2.13-2.21h6.22c.02-.13.03-.27.03-.4zm-6.25-1.07c.08-1.14.84-1.85 1.99-1.85 1.21 0 1.81.71 1.92 1.85h-3.91z" />
      </svg>
    ),
  },
];

const inputBase: React.CSSProperties = {
  width: '100%',
  fontFamily: 'var(--fb)',
  fontSize: 14,
  color: 'var(--ink)',
  background: '#fff',
  border: '1px solid var(--border)',
  borderRadius: 10,
  padding: '13px 16px',
  outline: 'none',
  transition: 'border-color .25s, box-shadow .25s',
};

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--fb)',
  fontSize: 13,
  fontWeight: 600,
  color: 'var(--ink)',
  marginBottom: 7,
  display: 'block',
};

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <span style={labelStyle}>
      {children} {required && <span style={{ color: 'var(--magenta)' }}>*</span>}
    </span>
  );
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(fd.entries())),
    });
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <>
      <style>{`
        .ct2-input:focus {
          border-color: var(--magenta) !important;
          box-shadow: 0 0 0 3px rgba(224, 25, 125, 0.12);
        }
        .ct2-input::placeholder { color: #b3acb0; }
        .ct2-submit:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 32px rgba(224, 25, 125, 0.38) !important;
        }
        .ct2-map-btn:hover {
          background: var(--magenta) !important;
          color: #fff !important;
        }
        .ct2-soc:hover {
          border-color: var(--magenta) !important;
          color: var(--magenta) !important;
          transform: translateY(-2px);
        }
        .ct2-direct-card:hover {
          border-color: var(--magenta) !important;
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(224, 25, 125, 0.14);
        }
        .ct2-hero-grid {
          display: grid;
          grid-template-columns: 1.05fr 1fr;
          gap: 48px;
          align-items: center;
        }
        .ct2-grid {
          display: grid;
          grid-template-columns: 1.55fr 1fr;
          gap: 28px;
          align-items: start;
        }
        .ct2-direct-grid {
          display: flex;
          align-items: center;
          gap: 28px;
          flex-wrap: wrap;
        }
        .ct2-frow {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }
        @media (max-width: 980px) {
          .ct2-hero-grid { grid-template-columns: 1fr; gap: 36px; }
          .ct2-grid { grid-template-columns: 1fr; }
          .ct2-hero-visual { min-height: 320px !important; }
        }
        @media (max-width: 640px) {
          .ct2-frow { grid-template-columns: 1fr; }
          .ct2-direct-divider { display: none; }
        }
      `}</style>

      <div
        style={{
          background:
            'radial-gradient(ellipse 900px 500px at 92% -5%, rgba(224,25,125,0.10) 0%, transparent 60%),' +
            'radial-gradient(ellipse 700px 460px at -8% 38%, rgba(224,25,125,0.06) 0%, transparent 55%),' +
            'linear-gradient(180deg, #fdfafc 0%, #faf7f9 100%)',
          minHeight: '100vh',
        }}
      >
        {/* ───────────────────────── HERO ───────────────────────── */}
        <section style={{ padding: '150px 48px 56px', maxWidth: 1280, margin: '0 auto' }}>
          <div className="ct2-hero-grid">
            {/* Left: copy */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 26 }}>
                <span style={{ fontFamily: 'var(--fm)', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--magenta)', fontWeight: 600 }}>
                  Get In Touch
                </span>
                <span style={{ width: 54, height: 2, background: 'linear-gradient(90deg, var(--magenta), transparent)', display: 'block' }} />
              </div>

              <h1 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(44px, 6.5vw, 78px)', fontWeight: 800, lineHeight: 1.04, color: 'var(--ink)', margin: 0 }}>
                Let&apos;s Build{' '}
                <em style={{ color: 'var(--magenta)', fontStyle: 'italic' }}>Something</em>{' '}
                Big.
              </h1>

              <p style={{ fontFamily: 'var(--fb)', fontSize: 17, fontWeight: 300, lineHeight: 1.75, color: 'var(--muted)', maxWidth: 460, marginTop: 24 }}>
                Whether it&apos;s a brief, a question, or just an idea — we&apos;d love to hear from you.
              </p>
            </div>

            {/* Right: decorative floating composition */}
            <div className="ct2-hero-visual" style={{ position: 'relative', minHeight: 420 }}>
              {/* Blobs */}
              <div style={{ position: 'absolute', top: '6%', right: '-4%', width: 380, height: 300, background: 'radial-gradient(ellipse at center, rgba(224,25,125,0.28) 0%, rgba(224,25,125,0.10) 50%, transparent 75%)', borderRadius: '58% 42% 55% 45% / 50% 55% 45% 50%', filter: 'blur(2px)' }} />
              <div style={{ position: 'absolute', bottom: '4%', right: '20%', width: 260, height: 200, background: 'radial-gradient(ellipse at center, rgba(224,25,125,0.16) 0%, transparent 70%)', borderRadius: '45% 55% 48% 52% / 55% 45% 55% 45%' }} />

              {/* Dot grid */}
              <div
                style={{
                  position: 'absolute', top: '18%', left: '2%', width: 90, height: 90,
                  backgroundImage: 'radial-gradient(rgba(224,25,125,0.45) 1.5px, transparent 1.5px)',
                  backgroundSize: '14px 14px',
                }}
              />

              {/* Card: New message */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute', top: '12%', right: '8%', width: 280,
                  background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(224,25,125,0.12)', borderRadius: 18,
                  padding: '20px 22px', boxShadow: '0 22px 60px rgba(224,25,125,0.16)',
                  zIndex: 3,
                }}
              >
                {/* Heart badge */}
                <div style={{ position: 'absolute', top: -18, right: -14, width: 44, height: 44, borderRadius: '50%', background: '#16080f', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 24px rgba(0,0,0,0.25)' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#e0197d"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                </div>
                <div style={{ fontFamily: 'var(--fm)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--magenta)', fontWeight: 600, marginBottom: 8 }}>
                  New message
                </div>
                <div style={{ fontFamily: 'var(--fb)', fontSize: 14, lineHeight: 1.6, color: 'var(--ink2)' }}>
                  Let&apos;s create something extraordinary together.
                </div>
                {/* Send badge */}
                <div style={{ position: 'absolute', bottom: -16, left: -14, width: 42, height: 42, borderRadius: '50%', background: 'linear-gradient(135deg, #e0197d, #ff5fa8)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 24px rgba(224,25,125,0.4)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                </div>
              </motion.div>

              {/* Card: Inquiry types */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                style={{
                  position: 'absolute', top: '52%', right: '34%', width: 230,
                  background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(224,25,125,0.1)', borderRadius: 16,
                  padding: '18px 20px', boxShadow: '0 18px 50px rgba(0,0,0,0.08)',
                  zIndex: 2,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--magenta)', flexShrink: 0 }} />
                  <span style={{ fontFamily: 'var(--fb)', fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>Project Inquiry</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(224,25,125,0.3)', flexShrink: 0 }} />
                  <span style={{ fontFamily: 'var(--fb)', fontSize: 13, color: 'var(--muted)' }}>Agency Collaboration</span>
                </div>
              </motion.div>

              {/* Logo chip */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1.6 }}
                style={{
                  position: 'absolute', top: '38%', left: '6%',
                  background: '#fff', borderRadius: 14, padding: '12px 14px',
                  boxShadow: '0 16px 40px rgba(0,0,0,0.1)', border: '1px solid var(--border)',
                  zIndex: 2,
                }}
              >
                <Image src="/tsbilogo.png" alt="TSBI" width={84} height={30} style={{ height: 30, width: 'auto', display: 'block' }} />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───────────────────────── MAIN GRID ───────────────────────── */}
        <section style={{ padding: '0 48px 40px', maxWidth: 1280, margin: '0 auto' }}>
          <div className="ct2-grid">
            {/* ── Form card ── */}
            <div
              style={{
                background: '#fff',
                border: '1px solid var(--border)',
                borderRadius: 20,
                padding: 'clamp(26px, 4vw, 42px)',
                boxShadow: '0 8px 40px rgba(0,0,0,0.05)',
              }}
            >
              <h2 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 800, color: 'var(--ink)', margin: '0 0 28px' }}>
                Tell Us About Your Project
              </h2>

              {submitted ? (
                <div style={{ padding: '48px 0', textAlign: 'center' }}>
                  <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg, #e0197d, #ff5fa8)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: '0 14px 36px rgba(224,25,125,0.35)' }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </div>
                  <div style={{ fontFamily: 'var(--fd)', fontSize: 26, fontWeight: 700, color: 'var(--ink)', marginBottom: 10 }}>
                    Thank you!
                  </div>
                  <p style={{ fontFamily: 'var(--fb)', fontSize: 15, color: 'var(--muted)', lineHeight: 1.7 }}>
                    Your message is on its way. The TSBI team will get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="ct2-frow" style={{ marginBottom: 18 }}>
                    <label>
                      <FieldLabel required>Full Name</FieldLabel>
                      <input name="name" type="text" placeholder="Your full name" required className="ct2-input" style={inputBase} />
                    </label>
                    <label>
                      <FieldLabel required>Email Address</FieldLabel>
                      <input name="email" type="email" placeholder="your@email.com" required className="ct2-input" style={inputBase} />
                    </label>
                  </div>

                  <div className="ct2-frow" style={{ marginBottom: 18 }}>
                    <label>
                      <FieldLabel>Company / Brand</FieldLabel>
                      <input name="company" type="text" placeholder="Your company name" className="ct2-input" style={inputBase} />
                    </label>
                    <label>
                      <FieldLabel>Budget Range</FieldLabel>
                      <select name="budget" className="ct2-input" style={{ ...inputBase, appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b6b6b' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center', cursor: 'pointer' }}>
                        <option value="">Select your budget</option>
                        <option>Under ₹10L</option>
                        <option>₹10L – ₹50L</option>
                        <option>₹50L – ₹1Cr</option>
                        <option>₹1Cr+</option>
                      </select>
                    </label>
                  </div>

                  <div style={{ marginBottom: 18 }}>
                    <label>
                      <FieldLabel>Services Interested In</FieldLabel>
                      <select name="projectType" className="ct2-input" style={{ ...inputBase, appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b6b6b' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center', cursor: 'pointer' }}>
                        <option value="">Select services</option>
                        <option>Strategy &amp; Branding</option>
                        <option>Content Production</option>
                        <option>Social &amp; Influencer</option>
                        <option>Digital Experiences</option>
                        <option>Media Buying</option>
                        <option>Technology</option>
                        <option>Full Service</option>
                      </select>
                    </label>
                  </div>

                  <div style={{ marginBottom: 26 }}>
                    <label>
                      <FieldLabel required>Tell Us About Your Project</FieldLabel>
                      <textarea
                        name="message"
                        required
                        placeholder="Share your goals, ideas, and any details we should know..."
                        className="ct2-input"
                        style={{ ...inputBase, minHeight: 130, resize: 'vertical', lineHeight: 1.6 }}
                      />
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="ct2-submit"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 10,
                      fontFamily: 'var(--fm)', fontSize: 14, fontWeight: 600, letterSpacing: '0.02em',
                      color: '#fff', background: 'linear-gradient(135deg, #e0197d 0%, #ff4d9b 100%)',
                      border: 'none', borderRadius: 100, padding: '15px 34px',
                      cursor: submitting ? 'wait' : 'pointer',
                      boxShadow: '0 10px 26px rgba(224,25,125,0.3)',
                      transition: 'transform .25s, box-shadow .25s',
                      opacity: submitting ? 0.7 : 1,
                    }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                    {submitting ? 'Sending…' : 'Send Inquiry'}
                  </button>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 18 }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                    <span style={{ fontFamily: 'var(--fb)', fontSize: 12, color: 'var(--muted)' }}>
                      Your information is safe and secure. We&apos;ll never share your details.
                    </span>
                  </div>
                </form>
              )}
            </div>

            {/* ── Right column ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
              {/* Get In Touch */}
              <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 20, padding: '28px 28px 26px', boxShadow: '0 8px 40px rgba(0,0,0,0.05)' }}>
                <h3 style={{ fontFamily: 'var(--fd)', fontSize: 21, fontWeight: 800, color: 'var(--ink)', margin: '0 0 22px' }}>
                  Get In Touch
                </h3>

                {[
                  {
                    label: 'Email',
                    value: 'tech@tsbi.in',
                    href: 'mailto:tech@tsbi.in',
                    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
                  },
                  {
                    label: 'Email (Business)',
                    value: 'communication@tsbi.in',
                    href: 'mailto:communication@tsbi.in',
                    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
                  },
                  {
                    label: 'Location',
                    value: '401 Satyam Tower, Deonar,\nGovandi East, Mumbai 400088',
                    href: MAPS_URL,
                    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>,
                  },
                ].map((row) => (
                  <a
                    key={row.label}
                    href={row.href}
                    target={row.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    style={{ display: 'flex', gap: 14, alignItems: 'flex-start', textDecoration: 'none', marginBottom: 18 }}
                  >
                    <span style={{ width: 38, height: 38, borderRadius: 11, background: 'rgba(224,25,125,0.09)', color: 'var(--magenta)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {row.icon}
                    </span>
                    <span>
                      <span style={{ display: 'block', fontFamily: 'var(--fm)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 3 }}>{row.label}</span>
                      <span style={{ display: 'block', fontFamily: 'var(--fb)', fontSize: 14, fontWeight: 500, color: 'var(--ink)', lineHeight: 1.5, whiteSpace: 'pre-line' }}>{row.value}</span>
                    </span>
                  </a>
                ))}

                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ct2-map-btn"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    fontFamily: 'var(--fm)', fontSize: 12, fontWeight: 600,
                    color: 'var(--magenta)', background: 'rgba(224,25,125,0.07)',
                    border: '1px solid rgba(224,25,125,0.25)', borderRadius: 100,
                    padding: '10px 20px', textDecoration: 'none',
                    transition: 'background .25s, color .25s',
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                  View on Map
                </a>
              </div>

              {/* Connect With Us */}
              <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 20, padding: '26px 28px', boxShadow: '0 8px 40px rgba(0,0,0,0.05)' }}>
                <h3 style={{ fontFamily: 'var(--fd)', fontSize: 21, fontWeight: 800, color: 'var(--ink)', margin: '0 0 18px' }}>
                  Connect With Us
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {socials.map((s) => (
                    <a
                      key={s.platform}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ct2-soc"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        fontFamily: 'var(--fb)', fontSize: 13, fontWeight: 600,
                        color: 'var(--ink)', background: '#fff',
                        border: '1px solid var(--border)', borderRadius: 100,
                        padding: '9px 16px', textDecoration: 'none',
                        transition: 'border-color .25s, color .25s, transform .25s',
                      }}
                    >
                      {s.icon}
                      {s.platform}
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                    </a>
                  ))}
                </div>
              </div>

              {/* We Respond Fast */}
              <div style={{ background: 'linear-gradient(135deg, rgba(224,25,125,0.05), rgba(224,25,125,0.02))', border: '1px solid rgba(224,25,125,0.15)', borderRadius: 20, padding: '24px 28px', display: 'flex', gap: 18, alignItems: 'center' }}>
                <div style={{ width: 54, height: 54, borderRadius: '50%', border: '2px solid rgba(224,25,125,0.3)', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--magenta)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--fd)', fontSize: 18, fontWeight: 800, color: 'var(--ink)', marginBottom: 4 }}>
                    We Respond Fast
                  </div>
                  <p style={{ fontFamily: 'var(--fb)', fontSize: 13.5, lineHeight: 1.6, color: 'var(--muted)', margin: 0 }}>
                    We typically reply within 24 hours because great ideas deserve quick responses.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ───────────────────────── DIRECT CONTACT STRIP ───────────────────────── */}
        <section style={{ padding: '0 48px 90px', maxWidth: 1280, margin: '0 auto' }}>
          <div
            style={{
              background: '#fff', border: '1px solid var(--border)', borderRadius: 20,
              padding: 'clamp(24px, 3.5vw, 36px)', boxShadow: '0 8px 40px rgba(0,0,0,0.05)',
            }}
          >
            <div className="ct2-direct-grid">
              {/* Lead */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 18, flex: '1 1 280px' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(224,25,125,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="var(--magenta)"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--fd)', fontSize: 21, fontWeight: 800, color: 'var(--ink)', marginBottom: 3 }}>
                    Prefer to talk directly?
                  </div>
                  <p style={{ fontFamily: 'var(--fb)', fontSize: 13.5, color: 'var(--muted)', margin: 0 }}>
                    Let&apos;s have a quick conversation about your project.
                  </p>
                </div>
              </div>

              {/* Email cards */}
              <a
                href="mailto:tech@tsbi.in"
                className="ct2-direct-card"
                style={{
                  display: 'flex', alignItems: 'center', gap: 14, textDecoration: 'none',
                  border: '1px solid rgba(224,25,125,0.25)', borderRadius: 14,
                  padding: '14px 22px', background: 'rgba(224,25,125,0.03)',
                  transition: 'border-color .25s, transform .25s, box-shadow .25s',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--magenta)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                <span>
                  <span style={{ display: 'block', fontFamily: 'var(--fm)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 2 }}>Email Us</span>
                  <span style={{ fontFamily: 'var(--fb)', fontSize: 14, fontWeight: 700, color: 'var(--magenta)' }}>tech@tsbi.in</span>
                </span>
              </a>

              <a
                href="mailto:communication@tsbi.in"
                className="ct2-direct-card"
                style={{
                  display: 'flex', alignItems: 'center', gap: 14, textDecoration: 'none',
                  border: '1px solid rgba(224,25,125,0.25)', borderRadius: 14,
                  padding: '14px 22px', background: 'rgba(224,25,125,0.03)',
                  transition: 'border-color .25s, transform .25s, box-shadow .25s',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--magenta)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
                <span>
                  <span style={{ display: 'block', fontFamily: 'var(--fm)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 2 }}>Business Enquiries</span>
                  <span style={{ fontFamily: 'var(--fb)', fontSize: 14, fontWeight: 700, color: 'var(--magenta)' }}>communication@tsbi.in</span>
                </span>
              </a>

              {/* Divider */}
              <div className="ct2-direct-divider" style={{ width: 1, alignSelf: 'stretch', background: 'var(--border)' }} />

              {/* Trusted by */}
              <div style={{ flex: '1 1 220px', maxWidth: 280 }}>
                <p style={{ fontFamily: 'var(--fb)', fontSize: 13.5, lineHeight: 1.65, color: 'var(--ink2)', margin: 0 }}>
                  <strong>Trusted by ambitious brands</strong> to build ideas that move, inspire and make an impact.
                </p>
                <span style={{ display: 'block', width: 36, height: 3, background: 'var(--magenta)', borderRadius: 2, marginTop: 10 }} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
