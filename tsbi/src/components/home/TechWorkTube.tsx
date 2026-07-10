'use client';

/**
 * Design B — scroll-driven 3D image tube (original R3F implementation, inspired by
 * the "fly through a field of images" effect). Image planes are laid out on a
 * golden-angle spiral receding down the -z axis; a sticky canvas over a tall
 * section reads scroll progress and glides the whole cluster past the camera while
 * it slowly rotates. Fog fades the far end into the dark. WebGL/reduced-motion
 * safe — falls back to a plain image grid.
 */

import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { techCaseStudies } from '@/lib/caseStudies';

/* all 10 tech-work images from the Digital Transformation service page (no repeats) */
const SRCS = techCaseStudies.map((s) => s.image);

const COUNT = SRCS.length;
const GAP = 3.0;          // z-distance between successive planes
const RADIUS = 4.6;       // ring radius — wide enough to keep the centre (text) clear
const DEPTH = COUNT * GAP;
const GOLDEN = 2.399963;  // golden angle (rad) — spreads planes left/right/top/bottom

function Planes({ progress }: { progress: React.RefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  const eased = useRef(0);

  const textures = useTexture(SRCS);

  const layout = useMemo(
    () =>
      Array.from({ length: COUNT }, (_, i) => {
        const ang = i * GOLDEN;
        const r = RADIUS * (0.9 + ((i * 37) % 20) / 100); // ~4.1–5.0, ring around the centre
        return { pos: [Math.cos(ang) * r, Math.sin(ang) * r, -i * GAP] as [number, number, number] };
      }),
    [],
  );

  useFrame((_, dt) => {
    const g = group.current;
    if (!g) return;
    const clamped = Math.min(dt, 0.05);
    eased.current = THREE.MathUtils.damp(eased.current, (progress.current ?? 0) * DEPTH, 4, clamped);
    g.position.z = eased.current;
  });

  return (
    <group ref={group}>
      {layout.map((it, i) => {
        const tex = textures[i];
        const img = tex.image as HTMLImageElement | undefined;
        const aspect = img && img.naturalHeight ? img.naturalWidth / img.naturalHeight : 1.5;
        const h = 2.3;
        return (
          <mesh key={i} position={it.pos}>
            <planeGeometry args={[h * aspect, h]} />
            <meshBasicMaterial map={tex} toneMapped={false} side={THREE.DoubleSide} />
          </mesh>
        );
      })}
    </group>
  );
}

export default function TechWorkTube() {
  const hostRef = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const [enabled, setEnabled] = useState(false);

  // WebGL + reduced-motion gate
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let webgl = false;
    try {
      const c = document.createElement('canvas');
      webgl = !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl')));
    } catch {
      webgl = false;
    }
    setEnabled(webgl && !reduce && SRCS.length > 0);
  }, []);

  // scroll progress through the tall section (0 → 1)
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const onScroll = () => {
      const rect = host.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      progress.current = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section ref={hostRef} className="relative h-[220vh] bg-[#05060a]" aria-label="Digital Transformation work — 3D tube">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* heading overlay */}
        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center text-center">
          <div className="font-fm mb-3 text-[11px] uppercase tracking-[0.24em] text-magenta">Work</div>
          <h2 className="font-fm text-[clamp(26px,4.4vw,52px)] font-bold leading-[1.05] tracking-[-0.01em] text-white">
           TSBI Work in  <span className="text-magenta">Action</span>
          </h2>
          <p className="mx-auto mt-3 max-w-[380px] px-6 text-xs font-light text-white/50">Explore how we turn brand challenges into websites, platforms, dashboards and digital systems that create measurable impact.</p>
        </div>

        {enabled ? (
          <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 6], fov: 62 }} gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}>
            <color attach="background" args={['#05060a']} />
            <fog attach="fog" args={['#05060a', 5, 30]} />
            <Suspense fallback={null}>
              <Planes progress={progress} />
            </Suspense>
          </Canvas>
        ) : (
          <div className="grid h-full grid-cols-2 gap-3 overflow-auto p-6 sm:grid-cols-3 lg:grid-cols-4">
            {SRCS.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={i} src={src} alt="" className="h-full w-full rounded-lg object-cover" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
