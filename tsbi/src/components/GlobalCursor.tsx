'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

// ── Particle system ──────────────────────────────────────────────────────────
interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  size: number; color: string;
  alpha: number; decay: number;
  sparkle: boolean;
}

const COLORS = ['#e0197d', '#ff1aa0', '#f01891', '#1a6aff', '#8ecbf0', '#ffffff'];

function drawSparkle(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  const p = r * 0.32;
  ctx.beginPath();
  ctx.moveTo(x, y - r); ctx.lineTo(x + p, y - p); ctx.lineTo(x + r, y);
  ctx.lineTo(x + p, y + p); ctx.lineTo(x, y + r); ctx.lineTo(x - p, y + p);
  ctx.lineTo(x - r, y); ctx.lineTo(x - p, y - p);
  ctx.closePath();
}

export default function GlobalCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isPointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isPointer) return;

    const cleanups: Array<() => void> = [];
    const q  = <T extends Element>(s: string) => document.querySelector<T>(s);
    const qa = <T extends Element>(s: string) => Array.from(document.querySelectorAll<T>(s));

    const dotEl  = q<HTMLElement>('.cursor-dot');
    const ringEl = q<HTMLElement>('.cursor-ring');
    if (!dotEl || !ringEl) return;

    // ── Cursor movement ───────────────────────────────────────────────────────
    gsap.set([dotEl, ringEl], { xPercent: -50, yPercent: -50 });

    const moveDotX  = gsap.quickTo(dotEl,  'x', { duration: 0.10, ease: 'power3.out' });
    const moveDotY  = gsap.quickTo(dotEl,  'y', { duration: 0.10, ease: 'power3.out' });
    const moveRingX = gsap.quickTo(ringEl, 'x', { duration: 0.38, ease: 'power3.out' });
    const moveRingY = gsap.quickTo(ringEl, 'y', { duration: 0.38, ease: 'power3.out' });

    let shown = false;
    const showCursor = () => {
      if (shown) return;
      shown = true;
      gsap.to([dotEl, ringEl], { opacity: 1, duration: 0.28 });
      document.documentElement.style.cursor = 'none';
    };
    const hideCursor = () => {
      shown = false;
      gsap.to([dotEl, ringEl], { opacity: 0, duration: 0.4 });
      document.documentElement.style.cursor = '';
    };

    const onMove = (e: MouseEvent) => {
      showCursor();
      moveDotX(e.clientX); moveDotY(e.clientY);
      moveRingX(e.clientX); moveRingY(e.clientY);
    };

    document.addEventListener('mousemove',  onMove,       { passive: true });
    document.addEventListener('mouseenter', showCursor);
    document.addEventListener('mouseleave', hideCursor);
    cleanups.push(() => {
      document.removeEventListener('mousemove',  onMove);
      document.removeEventListener('mouseenter', showCursor);
      document.removeEventListener('mouseleave', hideCursor);
      document.documentElement.style.cursor = '';
    });

    // ── Nav hover: ring shrinks + turns pink ──────────────────────────────────
    qa<HTMLElement>('.header-nav-item').forEach(item => {
      const enter = () => gsap.to(ringEl, { width: 24, height: 24, borderColor: '#e0197d', duration: 0.2 });
      const leave = () => gsap.to(ringEl, { width: 34, height: 34, borderColor: '#8ecbf0', duration: 0.3 });
      item.addEventListener('mouseenter', enter);
      item.addEventListener('mouseleave', leave);
      cleanups.push(() => {
        item.removeEventListener('mouseenter', enter);
        item.removeEventListener('mouseleave', leave);
      });
    });

    // ── Particle trail ────────────────────────────────────────────────────────
    const canvas = canvasRef.current;
    if (canvas) {
      const setSize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
      setSize();
      window.addEventListener('resize', setSize, { passive: true });
      cleanups.push(() => window.removeEventListener('resize', setSize));

      const ctx  = canvas.getContext('2d')!;
      const pts: Particle[] = [];
      let rafId = 0;
      let lastX = -999, lastY = -999;

      const spawn = (x: number, y: number) => {
        for (let i = 0; i < 5; i++) {
          const a = Math.random() * Math.PI * 2;
          const s = Math.random() * 1.6 + 0.4;
          pts.push({
            x: x + (Math.random() - 0.5) * 6,
            y: y + (Math.random() - 0.5) * 6,
            vx: Math.cos(a) * s,
            vy: Math.sin(a) * s - 0.9,
            size:    Math.random() * 3 + 1.2,
            color:   COLORS[Math.floor(Math.random() * COLORS.length)],
            alpha:   Math.random() * 0.3 + 0.7,
            decay:   Math.random() * 0.03 + 0.028,
            sparkle: Math.random() > 0.42,
          });
        }
        if (pts.length > 90) pts.splice(0, pts.length - 90);
      };

      const drawLoop = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = pts.length - 1; i >= 0; i--) {
          const p = pts[i];
          p.x += p.vx; p.y += p.vy; p.vy += 0.065; p.alpha -= p.decay;
          if (p.alpha <= 0) { pts.splice(i, 1); continue; }
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.fillStyle   = p.color;
          if (p.sparkle) {
            ctx.shadowBlur = 7; ctx.shadowColor = p.color;
            drawSparkle(ctx, p.x, p.y, p.size);
          } else {
            ctx.shadowBlur = 4; ctx.shadowColor = p.color;
            ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          }
          ctx.fill(); ctx.restore();
        }
        rafId = requestAnimationFrame(drawLoop);
      };
      rafId = requestAnimationFrame(drawLoop);

      const onTrail = (e: MouseEvent) => {
        const dx = e.clientX - lastX, dy = e.clientY - lastY;
        if (dx * dx + dy * dy > 9) {
          spawn(e.clientX, e.clientY);
          lastX = e.clientX; lastY = e.clientY;
        }
      };
      document.addEventListener('mousemove', onTrail, { passive: true });
      cleanups.push(() => { document.removeEventListener('mousemove', onTrail); cancelAnimationFrame(rafId); });
    }

    return () => cleanups.forEach(fn => fn());
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[9997]"
        style={{ width: '100vw', height: '100vh' }}
        aria-hidden
      />
      <div
        className="cursor-ring pointer-events-none fixed left-0 top-0 z-[9998] h-[34px] w-[34px] rounded-full border border-[#8ecbf0] opacity-0"
        style={{ willChange: 'transform' }}
        aria-hidden
      />
      <div
        className="cursor-dot pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full opacity-0"
        style={{ willChange: 'transform', background: 'var(--magenta)' }}
        aria-hidden
      />
    </>
  );
}
