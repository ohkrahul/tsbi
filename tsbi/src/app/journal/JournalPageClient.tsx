'use client';

import { useState } from 'react';

const TABS = ['All', 'Thought Leadership', 'Insights', 'Behind the Idea', 'Culture', 'Trends'];

interface Article {
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  gradient: string;
}

export default function JournalPageClient({ articles }: { articles: Article[] }) {
  const [activeTab, setActiveTab] = useState('All');
  const [email, setEmail] = useState('');
  const [newsletterState, setNewsletterState] = useState<'idle' | 'loading' | 'done'>('idle');

  const filtered = activeTab === 'All' ? articles : articles.filter((a) => a.category === activeTab);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setNewsletterState('loading');
    await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    setNewsletterState('done');
  };

  return (
    <>
      <section className="jn-hero">
        <div className="sec-label">From TSBI</div>
        <h1 className="jn-h1">Ideas.<br/><em>Insights.</em><br/>Inspiration.</h1>
        <p style={{ color: 'var(--muted)', fontSize: 16, fontWeight: 300, maxWidth: 480, lineHeight: 1.8, marginTop: 18 }}>
          Thought leadership, behind-the-scenes stories and the thinking that drives our work.
        </p>
      </section>

      <div className="jn-tabs">
        {TABS.map((t) => (
          <button key={t} className={`jn-tab${activeTab === t ? ' active' : ''}`} onClick={() => setActiveTab(t)}>
            {t}
          </button>
        ))}
      </div>

      <div className="jn-grid">
        {filtered.map((a, i) => (
          <a key={i} href="#" className="jn-card">
            <div className="jn-card-img">
              <div className="jn-card-img-bg" style={{ background: a.gradient }} />
            </div>
            <div className="jn-card-cat">{a.category}</div>
            <div className="jn-card-title">{a.title}</div>
            <div className="jn-card-excerpt">{a.excerpt}</div>
            <div className="jn-card-meta">{a.date}{a.date && a.readTime ? ' · ' : ''}{a.readTime ? `${a.readTime} read` : ''}</div>
          </a>
        ))}
      </div>

      <section style={{ background: 'var(--off)', padding: '100px 48px', textAlign: 'center' }}>
        <div className="sec-label" style={{ justifyContent: 'center' }}>Newsletter</div>
        <h2 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(32px,5vw,52px)', fontWeight: 700, marginBottom: 12 }}>
          Ideas to Your Inbox
        </h2>
        <p style={{ color: 'var(--muted)', fontSize: 15, fontWeight: 300, marginBottom: 36 }}>
          Monthly insights on creativity, media and culture from the TSBI team.
        </p>
        {newsletterState === 'done' ? (
          <p style={{ fontFamily: 'var(--fd)', fontSize: 18 }}>You&apos;re subscribed. Welcome aboard.</p>
        ) : (
          <form
            onSubmit={handleNewsletter}
            style={{ display: 'flex', gap: 0, maxWidth: 440, margin: '0 auto', border: '1px solid var(--border)', borderRadius: 100, overflow: 'hidden' }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              style={{ flex: 1, border: 'none', padding: '14px 20px', fontFamily: 'var(--fb)', fontSize: 14, background: 'var(--white)', outline: 'none', color: 'var(--ink)' }}
            />
            <button
              type="submit"
              disabled={newsletterState === 'loading'}
              style={{ background: 'var(--ink)', border: 'none', padding: '14px 24px', fontFamily: 'var(--fm)', fontSize: 9, letterSpacing: '.12em', textTransform: 'uppercase', color: '#fff', cursor: 'pointer', whiteSpace: 'nowrap' }}
            >
              {newsletterState === 'loading' ? '…' : 'Subscribe →'}
            </button>
          </form>
        )}
      </section>
    </>
  );
}
