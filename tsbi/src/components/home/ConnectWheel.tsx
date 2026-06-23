'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

// Static fanned coverflow of five posters sitting over a navy band. The centre
// poster is largest and raised; the flanking posters shrink and turn to face it.
// Sizes are measured from the viewport so the fan scales down on small screens.
const POSTERS = [
  { label: 'ASSI', img: '/Movie%20Posters/ASSI.jpg' },
  { label: 'Happy Patel', img: '/Movie%20Posters/Happy%20Patel.jpg' },
  { label: 'Main Vaapas Aaunga', img: '/Movie%20Posters/MVA.jpeg' },
  { label: 'Ek Din', img: '/Movie%20Posters/Ek%20Din.jpg' },
  { label: 'Sunny Sanskari Ki Tulsi Kumari', img: '/Movie%20Posters/SSKTK.jpg' },
];

const CENTER = 2;

function sizeFor(vw: number) {
  const cardW = Math.round(Math.min(228, Math.max(116, vw * 0.155)));
  const cardH = Math.round(cardW * 1.46);
  const gap = Math.round(cardW * 0.74); // horizontal spacing per slot
  return { cardW, cardH, gap };
}

function transformFor(offset: number, gap: number) {
  const ao = Math.abs(offset);
  const x = offset * gap;
  const rotate = -offset * 15; // side cards turn toward centre
  const scale = ao === 0 ? 1.12 : ao === 1 ? 0.94 : 0.8;
  const y = ao === 0 ? -10 : ao === 1 ? 12 : 30;
  return `translateX(${x}px) translateY(${y}px) rotateY(${rotate}deg) scale(${scale})`;
}

export default function ConnectWheel() {
  const [dims, setDims] = useState(() => sizeFor(1280));

  useEffect(() => {
    const measure = () => setDims(sizeFor(window.innerWidth));
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  return (
    <section className="cw2-root" aria-label="Connect — featured productions">
      <span className="cw2-circle" aria-hidden />

      <div className="cw2-stage" style={{ height: Math.round(dims.cardH * 1.12) + 40 }}>
        <div className="cw2-band" style={{ height: Math.round(dims.cardH * 0.62) }} />
        {POSTERS.map((p, i) => {
          const offset = i - CENTER;
          const ao = Math.abs(offset);
          return (
            <div
              key={p.img}
              className={`cw2-card${offset === 0 ? ' is-center' : ''}`}
              style={{
                width: dims.cardW,
                height: dims.cardH,
                marginLeft: -dims.cardW / 2,
                marginTop: -dims.cardH / 2,
                transform: transformFor(offset, dims.gap),
                zIndex: 50 - ao * 10,
              }}
            >
              <Image src={p.img} alt={p.label} fill sizes="230px" style={{ objectFit: 'cover' }} draggable={false} />
              <div className="cw2-shade" />
            </div>
          );
        })}
      </div>

      <div className="cw2-caption reveal">
        <h2 className="cw2-h2">Connect</h2>
        <p className="cw2-body">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo
          viverra maecenas accumsan lacus vel facilisis.
        </p>
      </div>
    </section>
  );
}
