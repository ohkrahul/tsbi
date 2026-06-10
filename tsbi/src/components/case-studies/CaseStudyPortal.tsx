'use client';
import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import type { CaseStudyGalleryItem } from '@/lib/caseStudies';
import CaseStudyHotspot from './CaseStudyHotspot';

interface Props {
  study: CaseStudyGalleryItem;
  index: number;
  activeIndex: number;
  onHotspot: (slug: string) => void;
  transitioning: boolean;
  spacing: number;
}

export default function CaseStudyPortal({ study, index, activeIndex, onHotspot, transitioning, spacing }: Props) {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);

  const diff = index - activeIndex;
  const isActive = diff === 0;
  const absDiff = Math.abs(diff);

  // Canvas texture — loads real image then draws brand identity overlay
  const [texture, setTexture] = useState<THREE.Texture>(() => new THREE.Texture());

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // 16:9 canvas — matches YouTube thumbnail ratio perfectly
    const CW = 640, CH = 360;
    const canvas = document.createElement('canvas');
    canvas.width = CW; canvas.height = CH;
    const ctx = canvas.getContext('2d')!;

    const drawLabels = () => {
      // Bottom dark gradient for text readability
      const grd = ctx.createLinearGradient(0, 0, 0, CH);
      grd.addColorStop(0.55, 'transparent');
      grd.addColorStop(1, 'rgba(0,0,0,0.75)');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, CW, CH);
      // Client name bottom-left
      ctx.font = 'bold 22px Georgia, serif';
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'left';
      ctx.fillText(study.clientName, 18, CH - 16);
      // Category top-left
      ctx.font = '11px sans-serif';
      ctx.fillStyle = 'rgba(255,255,255,0.55)';
      ctx.fillText(study.category.toUpperCase(), 18, 28);
      const t = new THREE.CanvasTexture(canvas);
      setTexture(t);
    };

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      // Fill canvas with object-fit: cover (center-crop)
      const iA = img.naturalWidth / (img.naturalHeight || 1);
      const cA = CW / CH;
      let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;
      if (iA > cA) { sw = img.naturalHeight * cA; sx = (img.naturalWidth - sw) / 2; }
      else         { sh = img.naturalWidth / cA;  sy = (img.naturalHeight - sh) / 2; }
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, CW, CH);
      drawLabels();
    };
    img.onerror = () => {
      // Fallback: solid gradient
      const grd = ctx.createLinearGradient(0, 0, CW, CH);
      grd.addColorStop(0, study.gradFrom);
      grd.addColorStop(1, study.gradTo);
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, CW, CH);
      drawLabels();
    };
    img.src = study.image;
  }, [study]);

  // Initialize animated values matching initial state
  const initZ = isActive ? 0 : absDiff === 1 ? -1.2 : -2.5;
  const initScale = isActive ? 1 : absDiff === 1 ? 0.82 : 0.65;
  const initOpacity = isActive ? 1 : absDiff === 1 ? 0.55 : 0.25;
  const initRotY = diff < 0 ? 0.18 : diff > 0 ? -0.18 : 0;

  const animZ = useRef(initZ);
  const animScale = useRef(initScale);
  const animOpacity = useRef(initOpacity);
  const animRotY = useRef(initRotY);

  useFrame(() => {
    if (!meshRef.current || !matRef.current) return;
    const lf = 0.12;
    const d = index - activeIndex;
    const ad = Math.abs(d);
    const tZ = d === 0 ? 0 : ad === 1 ? -1.2 : -2.5;
    const tScale = d === 0 ? 1 : ad === 1 ? 0.82 : 0.65;
    const tOpacity = d === 0 ? 1 : ad === 1 ? 0.55 : 0.25;
    const tRotY = d < 0 ? 0.18 : d > 0 ? -0.18 : 0;

    animZ.current = THREE.MathUtils.lerp(animZ.current, tZ, lf);
    animScale.current = THREE.MathUtils.lerp(animScale.current, tScale, lf);
    animOpacity.current = THREE.MathUtils.lerp(animOpacity.current, tOpacity, lf);
    animRotY.current = THREE.MathUtils.lerp(animRotY.current, tRotY, lf);

    meshRef.current.position.z = animZ.current;
    meshRef.current.scale.setScalar(animScale.current);
    meshRef.current.rotation.y = animRotY.current;
    matRef.current.opacity = animOpacity.current;
  });

  return (
    <group position={[index * spacing, 0, 0]}>
      <mesh ref={meshRef}>
        <planeGeometry args={[5.6, 3.15]} />
        <meshBasicMaterial ref={matRef} map={texture} transparent />
      </mesh>
      {isActive && !transitioning && (
        <Html center zIndexRange={[10, 20]}>
          <CaseStudyHotspot onClick={() => onHotspot(study.slug)} />
        </Html>
      )}
    </group>
  );
}
