'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

// Convex coverflow "billboard wall" of movie posters. The whole wall streams
// continuously LEFT -> RIGHT: a poster enters faded on the left, grows and turns
// to face you as it reaches dead-center (where an optical sheen sweeps across it),
// then shrinks and exits to the right. Driven by a requestAnimationFrame loop so
// the flow never stops. Sizes are controlled by explicit `scale` (not perspective
// depth) so the centered poster can't overflow / clip.

const POSTERS = [
  { label: 'ASSI', img: '/Movie%20Posters/ASSI.jpg' },
  { label: 'Bandar', img: '/Movie%20Posters/Bandar.jpg' },
  { label: 'CMD', img: '/Movie%20Posters/CMD.jpg' },
  { label: 'Ek Din', img: '/Movie%20Posters/Ek%20Din.jpg' },
  { label: 'Happy Patel', img: '/Movie%20Posters/Happy%20Patel.jpg' },
  { label: 'MVA', img: '/Movie%20Posters/MVA.jpeg' },
  { label: 'PPAVD', img: '/Movie%20Posters/PPAVD.jpeg' },
  { label: 'SSKTK', img: '/Movie%20Posters/SSKTK.jpg' },
  { label: 'TMMTMTTM', img: '/Movie%20Posters/TMMTMTTM.jpg' },
  { label: 'TYM', img: '/Movie%20Posters/TYM.jpg' },
];

const M = POSTERS.length;     // slots around the loop
const SLOT_ANGLE = 14;        // degrees each poster turns per slot from center
const SPEED = 0.32;           // slots advanced per second (~3s per poster to center)

// Signed distance (in slots) of poster `i` from dead-center, wrapped to [-M/2, M/2).
function dist(i: number, phase: number) {
  let d = (((phase - i) % M) + M) % M;
  if (d > M / 2) d -= M;
  return d;
}

const opacityFor = (ad: number) => Math.min(1, Math.max(0, (4.4 - ad) / 1.8));
const zFor = (ad: number) => Math.round(1000 - ad * 100);
const sheenFor = (ad: number) => Math.max(0, 1 - ad / 0.7) ** 2 * 0.9; // peaks only at center
const dimFor = (ad: number) => Math.min(0.55, ad * 0.16);             // darken off-center posters

function transformFor(d: number, dims: { arc: number; depth: number }) {
  const ad = Math.abs(d);
  const ang = d * SLOT_ANGLE;
  const x = Math.sin((ang * Math.PI) / 180) * dims.arc;
  const z = -ad * dims.depth;
  const scale = Math.max(0.5, 1 - ad * 0.12);
  return `translateX(${x.toFixed(1)}px) translateZ(${z.toFixed(0)}px) rotateY(${ang.toFixed(1)}deg) scale(${scale.toFixed(3)})`;
}

function sizeFor(vw: number) {
  const cardW = Math.round(Math.min(250, Math.max(150, vw * 0.16)));
  const cardH = Math.round(cardW * 1.42);
  const arc = Math.round(cardW * 2.6);   // horizontal spread of the convex curve
  const depth = Math.round(cardW * 0.5); // how far side posters fall back in z
  return { cardW, cardH, arc, depth };
}

export default function PosterWheel() {
  const [dims, setDims] = useState(() => sizeFor(1280));

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sheenRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dimRefs = useRef<(HTMLDivElement | null)[]>([]);
  const phaseRef = useRef(0);
  const pausedRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number | null>(null);

  // Track viewport width so the wall scales down on small screens.
  useEffect(() => {
    const measure = () => setDims(sizeFor(window.innerWidth));
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Continuous left->right stream (or a static wall under reduced-motion).
  useEffect(() => {
    const apply = () => {
      const phase = phaseRef.current;
      for (let i = 0; i < M; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;
        const d = dist(i, phase);
        const ad = Math.abs(d);
        el.style.transform = transformFor(d, dims);
        el.style.opacity = String(opacityFor(ad));
        el.style.zIndex = String(zFor(ad));
        const sheen = sheenRefs.current[i];
        if (sheen) sheen.style.opacity = String(sheenFor(ad));
        const dim = dimRefs.current[i];
        if (dim) dim.style.opacity = String(dimFor(ad));
      }
    };

    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduce) {
      apply();
      return;
    }

    const tick = (t: number) => {
      if (lastRef.current == null) lastRef.current = t;
      const dt = (t - lastRef.current) / 1000;
      lastRef.current = t;
      if (!pausedRef.current) {
        phaseRef.current = (phaseRef.current + SPEED * dt) % M;
      }
      apply();
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastRef.current = null;
    };
  }, [dims]);

  return (
    <section className="pw-section" aria-label="Featured productions">
      <div
        className="pw-stage"
        style={{ height: dims.cardH + 90 }}
        onMouseEnter={() => {
          pausedRef.current = true;
        }}
        onMouseLeave={() => {
          pausedRef.current = false;
        }}
      >
        {POSTERS.map((p, i) => {
          const d = dist(i, 0);
          const ad = Math.abs(d);
          return (
            <div
              key={p.img}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="pw-card"
              style={{
                width: dims.cardW,
                height: dims.cardH,
                marginLeft: -dims.cardW / 2,
                marginTop: -dims.cardH / 2,
                transform: transformFor(d, dims),
                opacity: opacityFor(ad),
                zIndex: zFor(ad),
              }}
            >
              <Image
                src={p.img}
                alt={p.label}
                fill
                sizes="(max-width: 600px) 55vw, 260px"
                style={{ objectFit: 'cover' }}
                draggable={false}
              />
              <div
                className="pw-dim"
                ref={(el) => {
                  dimRefs.current[i] = el;
                }}
                style={{ opacity: dimFor(ad) }}
              />
              <div className="pw-shade" />
              <div
                className="pw-sheen"
                ref={(el) => {
                  sheenRefs.current[i] = el;
                }}
                style={{ opacity: sheenFor(ad) }}
              />
              <div className="pw-label">{p.label}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
