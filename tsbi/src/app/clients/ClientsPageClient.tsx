'use client';

import { useState } from 'react';
import Link from 'next/link';

export interface ClientEntry {
  name: string;
  type: string;
  accent: string;
  isEntertainment: boolean;
}

type Tab = 'all' | 'entertainment' | 'non-entertainment';

function ClientGrid({ clients }: { clients: ClientEntry[] }) {
  return (
    <div className="cl-grid">
      {clients.map((client) => (
        <div key={client.name} className="cl-card">
          <div
            style={{
              width: 56, height: 56,
              background: client.accent,
              borderRadius: 6,
              flexShrink: 0,
              opacity: .9,
            }}
          />
          <div className="cl-card-logo">{client.name}</div>
          <div className="cl-card-type">{client.type}</div>
        </div>
      ))}
    </div>
  );
}

export default function ClientsPageClient({ clients }: { clients: ClientEntry[] }) {
  const [tab, setTab] = useState<Tab>('all');

  const tabs: { key: Tab; label: string }[] = [
    { key: 'all', label: 'All Clients' },
    { key: 'entertainment', label: 'Entertainment Clients' },
    { key: 'non-entertainment', label: 'Non-Entertainment Clients' },
  ];

  const current =
    tab === 'all' ? clients
    : tab === 'entertainment' ? clients.filter((c) => c.isEntertainment)
    : clients.filter((c) => !c.isEntertainment);

  const sectionTitle =
    tab === 'all' ? null
    : tab === 'entertainment' ? 'Entertainment & Lifestyle Brands'
    : 'Consumer & Luxury Brands';

  return (
    <>
      {/* Hero */}
      <section className="cl-hero" style={{ background: 'var(--navy)' }}>
        <div className="sec-label" style={{ color: 'rgba(255,255,255,.4)' }}>Our Clients</div>
        <h1 className="cl-h1">
          Brands That<br/>
          Trust<br/>
          <em>TSBI.</em>
        </h1>
        <p style={{ color: 'rgba(255,255,255,.5)', fontSize: 16, fontWeight: 300, maxWidth: 480, lineHeight: 1.8, marginTop: 18 }}>
          From multinationals to independents, across entertainment, beauty, tech and luxury —
          they all chose TSBI.
        </p>
      </section>

      {/* Tab nav */}
      <div className="cl-tabs">
        {tabs.map((t) => (
          <button
            key={t.key}
            className={`cl-tab${tab === t.key ? ' active' : ''}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <section className="cl-section" style={{ background: 'var(--white)' }}>
        {sectionTitle && (
          <div className="cl-section-title">{sectionTitle}</div>
        )}
        <ClientGrid clients={current} />
      </section>

      {/* CTA */}
      <section className="cl-cta" style={{ background: 'var(--navy)' }}>
        <p className="cl-cta-h2">Want to work with us?</p>
        <Link href="/contact" className="btn-fill" style={{ background: 'var(--magenta)' }}>
          Start a Conversation →
        </Link>
      </section>
    </>
  );
}
