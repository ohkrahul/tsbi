'use client';

import { useState } from 'react';
import Link from 'next/link';

const TABS = ['All Work', 'Campaigns', 'Films', 'Social', 'Websites', 'Tech'];

interface WorkItem {
  client: string;
  title: string;
  chips: string[];
  bg: string;
  slug: string;
  isSpan2: boolean;
  category: string;
  order: number;
}

interface Metric {
  val: string;
  label: string;
  pink?: boolean;
}

interface Props {
  works: WorkItem[];
  metrics: Metric[];
}

export default function WorkPageClient({ works, metrics }: Props) {
  const [activeTab, setActiveTab] = useState('All Work');
  const filtered = activeTab === 'All Work' ? works : works.filter((w) => w.category === activeTab);

  return (
    <>
      {/* Hero */}
      <section className="wk-hero">
        <div className="wk-hero-inner">
          <div>
            <div className="sec-label">Portfolio</div>
            <h1 className="wk-h1">Ideas in Action.<br/><em>Impact in Motion.</em></h1>
          </div>
          <p style={{ maxWidth: 320, color: 'var(--muted)', fontSize: 15, fontWeight: 300, lineHeight: 1.8, alignSelf: 'flex-end' }}>
            A curated view into the campaigns, films, platforms and strategies we've built for the brands we love.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <div className="wk-tabs">
        {TABS.map((t) => (
          <button
            key={t}
            className={`wk-tab${activeTab === t ? ' active' : ''}`}
            onClick={() => setActiveTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="wk-grid">
        {filtered.map((w) => (
          <Link
            key={w.slug}
            href={`/work/${w.slug}`}
            className={`wk-card${w.isSpan2 ? ' span2' : ''}`}
          >
            <div className="wk-card-img" style={{ aspectRatio: w.isSpan2 ? '21/9' : '4/3' }}>
              <div className="wk-card-img-bg" style={{ background: w.bg, height: '100%' }} />
              {w.isSpan2 && (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div className="hero-play" style={{ width: 56, height: 56 }}>
                    <div className="hero-play-tri" style={{ borderLeftWidth: 13, borderTopWidth: 8, borderBottomWidth: 8 }} />
                  </div>
                </div>
              )}
            </div>
            <div className="wk-card-info">
              <div className="wk-client">{w.client}</div>
              <div className="wk-title">{w.title}</div>
              <div className="wk-chips">
                {w.chips.map((c) => <span key={c} className="wk-chip">{c}</span>)}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Metrics */}
      <div className="wk-metrics">
        {metrics.map((m) => (
          <div key={m.label} className="wk-metric">
            <div className={`wk-mval${m.pink ? ' pink' : ''}`}>{m.val}</div>
            <div className="wk-mlabel">{m.label}</div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <section className="fcta-section" style={{ padding: '100px 48px' }}>
        <h2 className="fcta-h2" style={{ fontSize: 'clamp(32px,5vw,56px)' }}>Have a Project in Mind?</h2>
        <div className="fcta-actions" style={{ marginTop: 32 }}>
          <Link href="/contact" className="btn-fill" style={{ background: 'var(--magenta)' }}>Start a Conversation →</Link>
        </div>
      </section>
    </>
  );
}
