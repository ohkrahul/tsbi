'use client';
import { useRef, useState, useCallback, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { useRouter, useSearchParams } from 'next/navigation';
import gsap from 'gsap';
import { caseStudies } from '@/lib/caseStudies';
import type { CaseStudyGalleryItem } from '@/lib/caseStudies';
import CaseStudyPortal from './CaseStudyPortal';
import CaseStudyFallbackCarousel from './CaseStudyFallbackCarousel';

const SPACING = 6;

// Scene: lives inside Canvas, can use useThree
interface SceneProps {
  studies: CaseStudyGalleryItem[];
  activeIndex: number;
  onHotspot: (slug: string) => void;
  transitioning: boolean;
}
function Scene({ studies, activeIndex, onHotspot, transitioning }: SceneProps) {
  const { camera } = useThree();

  // Camera follows active portal horizontally
  useEffect(() => {
    gsap.to(camera.position, {
      x: activeIndex * SPACING,
      y: 0,
      duration: 1.1,
      ease: 'power3.inOut',
      overwrite: 'auto',
    });
  }, [activeIndex, camera]);

  // Camera zooms forward on transition click
  useEffect(() => {
    if (transitioning) {
      gsap.to(camera.position, {
        z: 3.5,
        duration: 0.65,
        ease: 'power2.in',
        overwrite: 'auto',
      });
    }
  }, [transitioning, camera]);

  // Subtle mouse parallax Y
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (transitioning) return;
      const py = (e.clientY / window.innerHeight - 0.5) * -0.4;
      gsap.to(camera.position, { y: py, duration: 1.0, ease: 'power1.out', overwrite: 'auto' });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [transitioning, camera]);

  return (
    <>
      <ambientLight intensity={0.6} />
      {studies.map((study, i) => (
        <CaseStudyPortal
          key={study.id}
          study={study}
          index={i}
          activeIndex={activeIndex}
          onHotspot={onHotspot}
          transitioning={transitioning}
          spacing={SPACING}
        />
      ))}
    </>
  );
}

// Main export
export default function CaseStudyWorld() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [webGLOK, setWebGLOK] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Determine initial index from ?at=slug param
  const atSlug = searchParams?.get('at') ?? null;
  const initIdx = atSlug ? Math.max(0, caseStudies.findIndex(s => s.slug === atSlug)) : 0;

  const [activeIndex, setActiveIndex] = useState(initIdx);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    setMounted(true);
    // WebGL check
    try {
      const c = document.createElement('canvas');
      const gl = c.getContext('webgl') ?? c.getContext('experimental-webgl');
      if (!gl) setWebGLOK(false);
    } catch { setWebGLOK(false); }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setWebGLOK(false);
  }, []);

  const goTo = useCallback((i: number) => {
    if (transitioning) return;
    setActiveIndex(Math.max(0, Math.min(caseStudies.length - 1, i)));
  }, [transitioning]);

  const handleHotspot = useCallback((slug: string) => {
    if (transitioning) return;
    setTransitioning(true);
    setTimeout(() => router.push(`/case-studies/${slug}`), 900);
  }, [router, transitioning]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goTo(activeIndex - 1);
      else if (e.key === 'ArrowRight') goTo(activeIndex + 1);
      else if (e.key === 'Enter' && !transitioning) handleHotspot(caseStudies[activeIndex].slug);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeIndex, transitioning, goTo, handleHotspot]);

  const current = caseStudies[activeIndex];

  if (!mounted) return <div className="cs-world-section" style={{ background: '#050910' }} />;

  if (!webGLOK) return <CaseStudyFallbackCarousel studies={caseStudies} onNavigate={(slug) => router.push(`/case-studies/${slug}`)} />;

  return (
    <div
      className={`cs-world-section${transitioning ? ' is-transitioning' : ''}`}
      role="region"
      aria-label="Case Study Gallery"
    >
      <Canvas
        className="cs-world-canvas"
        camera={{ position: [initIdx * SPACING, 0, 9], fov: 50, near: 0.1, far: 100 }}
        dpr={[1, 1.5]}
        style={{ position: 'absolute', inset: 0 }}
      >
        <Scene
          studies={caseStudies}
          activeIndex={activeIndex}
          onHotspot={handleHotspot}
          transitioning={transitioning}
        />
      </Canvas>

      {/* Overlay UI */}
      <div className="cs-world-overlay" aria-hidden="true">
        <div className="cs-world-label">Case Studies</div>

        <div className="cs-world-info">
          <div className="cs-world-year">{current.year}</div>
          <div className="cs-world-client">{current.clientName}</div>
          <div className="cs-world-category">{current.category}</div>
        </div>

        <div className="cs-world-counter">
          {String(activeIndex + 1).padStart(2, '0')} / {String(caseStudies.length).padStart(2, '0')}
        </div>

        <nav className="cs-world-arrows" aria-label="Gallery navigation">
          <button
            className="cs-world-arrow"
            onClick={() => goTo(activeIndex - 1)}
            disabled={activeIndex === 0 || transitioning}
            aria-label="Previous case study"
          >←</button>
          <div className="cs-world-dots" role="list">
            {caseStudies.map((s, i) => (
              <button
                key={s.id}
                className={`cs-world-dot${i === activeIndex ? ' active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Go to ${s.clientName}`}
                aria-current={i === activeIndex ? 'true' : undefined}
                role="listitem"
              />
            ))}
          </div>
          <button
            className="cs-world-arrow"
            onClick={() => goTo(activeIndex + 1)}
            disabled={activeIndex === caseStudies.length - 1 || transitioning}
            aria-label="Next case study"
          >→</button>
        </nav>
      </div>
    </div>
  );
}
