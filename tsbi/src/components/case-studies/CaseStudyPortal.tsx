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
    const canvas = document.createElement('canvas');
    canvas.width = 512; canvas.height = 720;
    const ctx = canvas.getContext('2d')!;

    const drawLabels = () => {
      // Gradient overlay for cinematic depth
      const grd = ctx.createLinearGradient(0, 0, 0, 720);
      grd.addColorStop(0, study.gradFrom + '88');
      grd.addColorStop(1, study.gradTo + 'cc');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, 512, 720);
      // Client name bottom
      ctx.font = 'bold 26px Georgia, serif';
      ctx.fillStyle = 'rgba(255,255,255,0.65)';
      ctx.textAlign = 'left';
      ctx.fillText(study.clientName, 28, 676);
      // Category top-left
      ctx.font = '300 14px sans-serif';
      ctx.fillStyle = 'rgba(255,255,255,0.35)';
      ctx.fillText(study.category.toUpperCase(), 28, 46);
      const t = new THREE.CanvasTexture(canvas);
      setTexture(t);
    };

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      ctx.drawImage(img, 0, 0, 512, 720);
      drawLabels();
    };
    img.onerror = () => {
      // Fallback: solid gradient
      const grd = ctx.createLinearGradient(0, 0, 400, 720);
      grd.addColorStop(0, study.gradFrom);
      grd.addColorStop(1, study.gradTo);
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, 512, 720);
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
    const lf = 0.07;
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
        <planeGeometry args={[4.5, 6.5]} />
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
