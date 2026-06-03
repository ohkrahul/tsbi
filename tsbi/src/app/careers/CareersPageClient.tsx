'use client';

import { useState } from 'react';

interface Job {
  role: string;
  department: string;
  location: string;
  experience: string;
  skills: string[];
  responsibilities: string[];
}

export default function CareersPageClient({ jobs }: { jobs: Job[] }) {
  const [openJob, setOpenJob] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    await fetch('/api/careers/apply', {
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
      <section className="cr-hero">
        <div className="sec-label">Join Our Team</div>
        <h1 className="cr-h1">
          We&apos;re<br />Hiring<br /><em>Big Thinkers.</em>
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: 16, fontWeight: 300, maxWidth: 480, lineHeight: 1.8, marginTop: 18 }}>
          TSBI is a place where ambitious people do their best work. If you live for big ideas
          and love the craft, there&apos;s a seat at the table for you.
        </p>
      </section>

      {/* Open Positions */}
      <section className="cr-jobs">
        <h2 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(28px,4vw,44px)', marginBottom: 40 }}>Open Positions</h2>
        <div className="cr-jobs-grid">
          {jobs.map((job, i) => (
            <div
              key={job.role}
              className={`cr-job-card${openJob === i ? ' open' : ''}`}
              onClick={() => setOpenJob(openJob === i ? null : i)}
            >
              <div className="cr-job-dept">{job.department}</div>
              <div className="cr-job-role">{job.role}</div>
              <div className="cr-job-type">{job.location}</div>
              <div className="cr-job-exp">Experience: {job.experience}</div>
              {openJob === i && (
                <div className="cr-job-details">
                  <div>
                    <div className="cr-detail-label">Skills</div>
                    <ul className="cr-detail-list">{job.skills.map((s) => <li key={s}>{s}</li>)}</ul>
                  </div>
                  <div>
                    <div className="cr-detail-label">Key Responsibilities</div>
                    <ul className="cr-detail-list">{job.responsibilities.map((r) => <li key={r}>{r}</li>)}</ul>
                  </div>
                  <div>
                    <div className="cr-detail-label">Experience Required</div>
                    <ul className="cr-detail-list"><li>{job.experience} of relevant experience</li></ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Apply Form */}
      <section className="cr-apply">
        <h2 className="cr-apply-h2">Apply Now</h2>
        {submitted ? (
          <div style={{ padding: '32px 0', fontFamily: 'var(--fd)', fontSize: 22 }}>
            Thank you! We&apos;ve received your application and will be in touch soon.
          </div>
        ) : (
          <form className="cr-form" onSubmit={handleSubmit}>
            <div className="ff"><div className="fl">Name</div><input name="name" className="fi" type="text" placeholder="Your full name" required /></div>
            <div className="ff"><div className="fl">Email</div><input name="email" className="fi" type="email" placeholder="your@email.com" required /></div>
            <div className="ff">
              <div className="fl">Role</div>
              <select name="role" className="fi fsel" required>
                <option value="">Select a role</option>
                {jobs.map((j) => <option key={j.role} value={j.role}>{j.role}</option>)}
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="ff"><div className="fl">Upload CV / Résumé</div><input name="cv" className="fi" type="file" accept=".pdf,.doc,.docx" /></div>
            <button type="submit" className="fsubmit" disabled={submitting}>
              {submitting ? 'Submitting…' : 'Submit Application →'}
            </button>
          </form>
        )}
      </section>
    </>
  );
}
