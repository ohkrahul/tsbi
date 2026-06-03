'use client';

import { useState } from 'react';

const socials = [
  { platform: 'Instagram', handle: '@tsbi.official' },
  { platform: 'LinkedIn', handle: 'The Small Big Idea' },
  { platform: 'YouTube', handle: 'TSBI Films' },
  { platform: 'Behance', handle: 'tsbi.work' },
];

const contactMetrics = [
  { val: '150+', label: 'Talents', pink: true },
  { val: '300+', label: 'Projects', pink: false },
  { val: '98%', label: 'Retention', pink: false },
  { val: '12+', label: 'Years', pink: false },
];

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
      {/* Hero */}
      <section className="ct-hero">
        <div className="sec-label">Get in Touch</div>
        <h1 className="ct-h1">Let's Build<br/><em>Something</em><br/>Big.</h1>
        <p style={{ color: 'var(--muted)', fontSize: 16, fontWeight: 300, maxWidth: 480, lineHeight: 1.8, marginTop: 18 }}>
          Whether it's a brief, a question or just an idea — we want to hear it.
        </p>
      </section>

      {/* Body */}
      <div className="ct-body">
        {/* Form */}
        <div>
          <h2 className="ct-form-h2">Tell Us About<br/><em>Your Project</em></h2>

          {submitted ? (
            <div style={{ padding: '32px 0', fontFamily: 'var(--fd)', fontSize: 22 }}>
              Thank you! The TSBI team will be in touch.
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="frow">
                <div className="ff">
                  <div className="fl">Name</div>
                  <input name="name" className="fi" type="text" placeholder="Your full name" required />
                </div>
                <div className="ff">
                  <div className="fl">Email</div>
                  <input name="email" className="fi" type="email" placeholder="your@email.com" required />
                </div>
              </div>
              <div className="frow">
                <div className="ff">
                  <div className="fl">Company</div>
                  <input name="company" className="fi" type="text" placeholder="Company name" />
                </div>
                <div className="ff">
                  <div className="fl">Budget</div>
                  <select name="budget" className="fi fsel">
                    <option value="">Select range</option>
                    <option>Under ₹10L</option>
                    <option>₹10L – ₹50L</option>
                    <option>₹50L – ₹1Cr</option>
                    <option>₹1Cr+</option>
                  </select>
                </div>
              </div>
              <div className="ff">
                <div className="fl">Project Type</div>
                <select name="projectType" className="fi fsel">
                  <option value="">What are you looking for?</option>
                  <option>Strategy &amp; Branding</option>
                  <option>Content Production</option>
                  <option>Social &amp; Influencer</option>
                  <option>Digital Experiences</option>
                  <option>Media Buying</option>
                  <option>Technology</option>
                  <option>Full Service</option>
                </select>
              </div>
              <div className="ff">
                <div className="fl">Message</div>
                <textarea name="message" className="fi fta" placeholder="Tell us about your brief, goals and ideas..." />
              </div>
              <button type="submit" className="fsubmit" disabled={submitting}>
                {submitting ? 'Sending…' : 'Send Brief →'}
              </button>
            </form>
          )}
        </div>

        {/* Right info */}
        <div>
          <div className="ct-info-title">Find Us Online</div>
          <div className="ct-social-list">
            {socials.map(s => (
              <a key={s.platform} className="ct-soc-link" href="#">
                <span className="ct-soc-platform">{s.platform}</span>
                <span className="ct-soc-handle">{s.handle} →</span>
              </a>
            ))}
          </div>

          <div className="ct-info-title">By the Numbers</div>
          <div className="ct-metrics">
            {contactMetrics.map(m => (
              <div key={m.label} className="ct-metric">
                <div className={`ct-mval${m.pink ? ' pink' : ''}`}>{m.val}</div>
                <div className="ct-mlabel">{m.label}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}
