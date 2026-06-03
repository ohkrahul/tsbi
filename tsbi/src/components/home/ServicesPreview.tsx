'use client';

import { useState } from 'react';
import Link from 'next/link';

const services = [
  { num: '01', name: 'Strategy & Consulting' },
  { num: '02', name: 'Creative & Content' },
  { num: '03', name: 'Influencer Management' },
  { num: '04', name: 'Media & Performance' },
  { num: '05', name: 'Technology & Data' },
  { num: '06', name: 'Production' },
  { num: '07', name: 'Social & Community' },
];

const tiles = [
  { label: 'Brand Strategy', bg: 'linear-gradient(135deg,#1a2240,#0d1528)' },
  { label: 'Creative Direction', bg: 'linear-gradient(135deg,#200a28,#100518)' },
  { label: 'Influencer Ops', bg: 'linear-gradient(135deg,#0a1a30,#060d1e)' },
  { label: 'Media Performance', bg: 'linear-gradient(135deg,#1a1520,#0d0e18)' },
];

export default function ServicesPreview() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="services-section">
      <div className="services-inner">
        {/* Left */}
        <div className="services-left reveal">
          <div className="sec-label"><span className="num">06</span> Services</div>
          <h2 className="services-h2">
            What We<br/>Bring to<br/>the Table<em>.</em>
          </h2>

          <div>
            {services.map((s, i) => (
              <div
                key={s.num}
                className={`svc-item${activeIdx === i ? ' active' : ''}`}
                onClick={() => setActiveIdx(i)}
              >
                <span className="svc-name">{s.name}</span>
                <span className="svc-num">{s.num}</span>
              </div>
            ))}
          </div>

          <Link href="/services" className="btn-fill" style={{ marginTop: 36 }}>
            Explore Services →
          </Link>
        </div>

        {/* Right tiles */}
        <div className="services-right reveal d2">
          <div className="svc-grid">
            {tiles.map((t) => (
              <div className="svc-tile" key={t.label}>
                <div className="svc-tile-bg" style={{ background: t.bg }} />
                <div className="svc-tile-label">{t.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
