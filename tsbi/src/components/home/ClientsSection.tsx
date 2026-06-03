'use client';

import { useState, useEffect, useRef } from 'react';

export interface ClientItem {
  name: string;
  type: string;
  caption: string;
  accent: string;
  image: string;
  cells: string[];
}

const DEFAULT_CLIENTS: ClientItem[] = [
  {
    name: "L'Oréal Paris", type: 'Beauty · FMCG',
    caption: 'Digital beauty campaign — 2024', accent: '#f72585',
    image: '/images/banner-home2-2-400x500.jpg',
    cells: ['linear-gradient(160deg,#c42b6e,#8c1040)', 'linear-gradient(160deg,#f72585,#c42b6e)', 'linear-gradient(160deg,#7209b7,#3a0ca3)'],
  },
  {
    name: 'OnePlus', type: 'Consumer Tech',
    caption: 'Global product launch film — 2024', accent: '#f05100',
    image: '/images/banner-01-400x500.jpg',
    cells: ['linear-gradient(160deg,#f05100,#8a2600)', 'linear-gradient(160deg,#cc2200,#660a00)', 'linear-gradient(160deg,#1a1a2e,#0a0a1a)'],
  },
  {
    name: 'Tiger Beer', type: 'Beverage · Entertainment',
    caption: 'Brand refresh campaign — 2024', accent: '#f0c000',
    image: '/images/banner-home3-1-400x500.jpg',
    cells: ['linear-gradient(160deg,#a08000,#504000)', 'linear-gradient(160deg,#f0c000,#a07000)', 'linear-gradient(160deg,#2a1800,#150c00)'],
  },
  {
    name: 'Dior', type: 'Luxury Fashion',
    caption: 'Cinematic brand film — 2025', accent: '#c04040',
    image: '/images/bg-about-company-400x500.jpg',
    cells: ['linear-gradient(160deg,#2d1515,#150808)', 'linear-gradient(160deg,#8c3030,#5a1a1a)', 'linear-gradient(160deg,#5c2020,#2a0a0a)'],
  },
  {
    name: 'La Mer', type: 'Premium Beauty',
    caption: 'Premium brand production — 2025', accent: '#1a9080',
    image: '/images/portfolio-popup-12-400x500.jpg',
    cells: ['linear-gradient(160deg,#0a1628,#061020)', 'linear-gradient(160deg,#1a3050,#0d2040)', 'linear-gradient(160deg,#1a5060,#0d3040)'],
  },
  {
    name: 'Skechers', type: 'Footwear · Lifestyle',
    caption: 'Lifestyle campaign — 2024', accent: '#5070e8',
    image: '/images/portfolio-popup-10-400x500.jpg',
    cells: ['linear-gradient(160deg,#1a2060,#0d1040)', 'linear-gradient(160deg,#4060e0,#2040a0)', 'linear-gradient(160deg,#202040,#101028)'],
  },
  {
    name: 'Sandu', type: 'Pharma · Wellness',
    caption: 'Brand identity · digital — 2023', accent: '#00c090',
    image: '/images/gallery-slider-02-400x500.jpg',
    cells: ['linear-gradient(160deg,#003028,#001a18)', 'linear-gradient(160deg,#00a080,#006050)', 'linear-gradient(160deg,#004030,#001a18)'],
  },
  {
    name: 'Jaipur Pink Panthers', type: 'Sports · Entertainment',
    caption: 'Season campaign — 2024', accent: '#e040a0',
    image: '/images/career-detail-01-400x500.jpg',
    cells: ['linear-gradient(160deg,#400030,#200018)', 'linear-gradient(160deg,#e060b0,#a02070)', 'linear-gradient(160deg,#600050,#300028)'],
  },
];

// items visible above/below the active one
const VISIBLE_RANGE = 3;
// vertical spacing between steps (px)
const STEP = 110;

export default function ClientsSection({ initialClients }: { initialClients?: ClientItem[] }) {
  const clients = initialClients?.length ? initialClients : DEFAULT_CLIENTS;

  const [scrollActive, setScrollActive] = useState(0);
  const [hoverActive, setHoverActive] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  // Keep a ref to clients.length so the scroll handler always reads the
  // latest value without the dep array size ever changing.
  const clientsLenRef = useRef(clients.length);
  clientsLenRef.current = clients.length;

  const active = hoverActive !== null ? hoverActive : scrollActive;
  const current = clients[active];

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = Math.max(0, Math.min(1, -rect.top / scrollable));
      setScrollActive(Math.round(progress * (clientsLenRef.current - 1)));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="clients-section">
      <div className="clients-sticky">
        <h2 className="clients-h2">
          Brands that<br />
          <strong>trust us.</strong>
        </h2>

        <div className="clients-layout">
          {/* 3D perspective wheel */}
          <div className="clients-wheel" aria-label="Brand list">
            {clients.map((c, i) => {
              const delta = i - active;
              const abs = Math.abs(delta);
              if (abs > VISIBLE_RANGE) return null;

              const translateY = delta * STEP;
              const scale = 1 - abs * 0.085;
              const opacity = Math.max(0.05, 1 - abs * 0.24);
              const blur = abs * 0.7;
              const rotX = delta * 5.5;

              return (
                <div
                  key={c.name}
                  className={`cbn-item${i === active ? ' active' : ''}`}
                  style={{
                    transform: `translateY(calc(-50% + ${translateY}px)) scale(${scale}) rotateX(${rotX}deg)`,
                    opacity,
                    filter: blur > 0 ? `blur(${blur}px)` : undefined,
                    zIndex: VISIBLE_RANGE - abs,
                  }}
                  onMouseEnter={() => setHoverActive(i)}
                  onMouseLeave={() => setHoverActive(null)}
                >
                  {i === active && (
                    <span style={{
                      display: 'inline-block', width: 28, height: 2,
                      background: c.accent, marginBottom: 8, borderRadius: 2,
                      transition: 'background .3s',
                    }} />
                  )}
                  <div className="cbn-name">{c.name}</div>
                  <div className="cbn-type">{c.type}</div>
                </div>
              );
            })}
          </div>

          {/* Magazine gallery */}
          <div className="clients-panel active">
            <div className="clients-gallery-grid">
              <div className="cg-frame" style={{
                backgroundImage: `url(${current.image})`,
                backgroundSize: 'cover', backgroundPosition: 'center',
              }}>
                <div style={{ position: 'absolute', inset: 0, background: current.cells[0], opacity: .45 }} />
              </div>
              <div className="cg-frame" style={{ background: current.cells[1] }} />
              <div className="cg-frame" style={{ background: current.cells[2] }} />
            </div>
            <div className="clients-gallery-info">
              <div className="clients-gallery-caption">{current.caption}</div>
              <div className="clients-gallery-name">{current.name}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
