'use client';

import { useState } from 'react';
import Link from 'next/link';

export interface ClientEntry {
  name: string;
  type: string;
  accent: string;
  isEntertainment: boolean;
  logo?: string;   // path relative to /public  e.g. /images/clients/loreal.png
}

type Tab = 'all' | 'entertainment' | 'non-entertainment';

/* ── Single logo card ── */
function LogoCard({ client }: { client: ClientEntry }) {
  const [imgErr, setImgErr] = useState(false);

  // Derive initials as fallback
  const initials = client.name
    .split(/[\s&·]+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');

  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 16,
        border: '1px solid rgba(0,0,0,0.07)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        padding: '28px 20px 22px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 14,
        cursor: 'default',
        transition: 'transform 0.25s, box-shadow 0.25s, border-color 0.25s',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = 'translateY(-4px)';
        el.style.boxShadow = '0 12px 40px rgba(0,0,0,0.1)';
        el.style.borderColor = 'rgba(224,25,125,0.25)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = 'translateY(0)';
        el.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
        el.style.borderColor = 'rgba(0,0,0,0.07)';
      }}
    >
      {/* Logo image or initial fallback */}
      <div
        style={{
          width: '100%',
          height: 96,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 8px',
        }}
      >
        {client.logo && !imgErr ? (
          <img
            src={client.logo}
            alt={`${client.name} logo`}
            onError={() => setImgErr(true)}
            style={{
              maxWidth: '100%',
              maxHeight: 90,
              width: 'auto',
              height: 'auto',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        ) : (
          /* Text initials fallback — shown until you upload a logo */
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 12,
              background: `${client.accent}18`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--fd)',
              fontSize: 22,
              fontWeight: 900,
              color: client.accent,
              letterSpacing: '-0.02em',
            }}
          >
            {initials}
          </div>
        )}
      </div>

      {/* Brand name */}
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            fontFamily: 'var(--fd)',
            fontSize: 'clamp(13px,1.4vw,16px)',
            fontWeight: 700,
            color: 'var(--ink)',
            lineHeight: 1.2,
            marginBottom: 5,
          }}
        >
          {client.name}
        </div>
        <div
          style={{
            fontFamily: 'var(--fm)',
            fontSize: 9,
            letterSpacing: '0.13em',
            textTransform: 'uppercase',
            color: 'var(--magenta)',
          }}
        >
          {client.type}
        </div>
      </div>
    </div>
  );
}

/* ── Page component ── */
export default function ClientsPageClient({ clients }: { clients: ClientEntry[] }) {
  const [tab, setTab] = useState<Tab>('all');

  const tabs: { key: Tab; label: string }[] = [
    { key: 'all',               label: 'All Clients'              },
    { key: 'entertainment',     label: 'Entertainment'            },
    { key: 'non-entertainment', label: 'Non-Entertainment'         },
  ];

  const current =
    tab === 'all'               ? clients
    : tab === 'entertainment'   ? clients.filter((c) =>  c.isEntertainment)
    :                             clients.filter((c) => !c.isEntertainment);

  return (
    <>
      {/* Hero */}
      <section className="cl-hero" style={{ background: 'var(--navy)' }}>
        <div className="sec-label" style={{ color: 'rgba(255,255,255,.4)' }}>Our Clients</div>
        <h1 className="cl-h1">
          Brands That<br />Trust<br /><em>TSBI.</em>
        </h1>
        <p style={{ color: 'rgba(255,255,255,.5)', fontSize: 16, fontWeight: 300, maxWidth: 480, lineHeight: 1.8, marginTop: 18 }}>
          From multinationals to independents — across entertainment, beauty, tech and luxury —
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

      {/* Logo grid */}
      <section className="cl-section" style={{ background: 'var(--off)' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))',
            gap: 14,
          }}
        >
          {current.map((client) => (
            <LogoCard key={client.name} client={client} />
          ))}
        </div>
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
