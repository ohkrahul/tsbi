'use client';

import { useEffect, useRef } from 'react';

/**
 * Footer white-section wrapper with a scratch-to-reveal photo backdrop.
 * A <canvas> paints the veil (blurred photo + white wash) over the clear photo;
 * brushing the cursor/finger erases the veil (destination-out) to reveal the sharp
 * photo underneath. Pointer moves are read on the wrapper so scratching works over
 * the copy too, while the canvas stays pointer-events-none (links keep working).
 */

const SRC = '/about%20us/IMG_2081.webp';
const BRUSH = 184; // brush diameter (px) — small, scratch-card feel

export default function FooterPhotoSection({ children }: { children: React.ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    let ready = false;

    const drawCover = (image: HTMLImageElement, w: number, h: number) => {
      const ir = image.naturalWidth / image.naturalHeight;
      const cr = w / h;
      let dw: number, dh: number;
      if (ir > cr) { dh = h; dw = h * ir; } else { dw = w; dh = w / ir; }
      dw *= 1.12; dh *= 1.12; // overscale so the blur edges stay off-canvas
      ctx.drawImage(image, (w - dw) / 2, (h - dh) / 2, dw, dh);
    };

    // (re)paint the full veil — wipes any existing scratches
    const paintVeil = () => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      if (w === 0 || h === 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, w, h);
      if (ready) {
        ctx.filter = 'blur(7px)';
        drawCover(img, w, h);
        ctx.filter = 'none';
      }
      ctx.fillStyle = 'rgba(255,255,255,0.8)';
      ctx.fillRect(0, 0, w, h);
    };

    img.onload = () => { ready = true; paintVeil(); };
    img.src = SRC;
    paintVeil();

    // ── auto-heal: re-cover the scratches 5s after the last stroke ──
    const HEAL_DELAY = 5000; // idle time before the veil grows back
    const HEAL_MS = 650;     // covering-animation duration
    let idleTimer = 0;
    let healRaf = 0;
    let healStart = 0;
    const stampVeil = () => {
      // wash the white veil back over the revealed areas, a little each frame
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 0.12;
      ctx.fillStyle = 'rgba(255,255,255,0.8)';
      ctx.fillRect(0, 0, wrap.clientWidth, wrap.clientHeight);
      ctx.globalAlpha = 1;
    };
    const healStep = (now: number) => {
      if (!healStart) healStart = now;
      stampVeil();
      if (now - healStart < HEAL_MS) {
        healRaf = requestAnimationFrame(healStep);
      } else {
        healStart = 0;
        healRaf = 0;
        paintVeil(); // settle to a crisp blurred-photo veil
      }
    };
    const cancelHeal = () => {
      clearTimeout(idleTimer);
      cancelAnimationFrame(healRaf);
      idleTimer = 0;
      healRaf = 0;
      healStart = 0;
    };
    const scheduleHeal = () => {
      clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        cancelAnimationFrame(healRaf);
        healStart = 0;
        healRaf = requestAnimationFrame(healStep);
      }, HEAL_DELAY);
    };

    let last: { x: number; y: number } | null = null;
    const scratch = (clientX: number, clientY: number) => {
      cancelHeal(); // stop any in-progress / pending re-cover
      const r = wrap.getBoundingClientRect();
      const x = clientX - r.left;
      const y = clientY - r.top;
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = BRUSH;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(last ? last.x : x, last ? last.y : y);
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x, y, BRUSH / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = 'source-over';
      last = { x, y };
      scheduleHeal(); // 5s after the cursor stops → veil grows back
    };

    // Reveal as the cursor MOVES — no click/drag needed (so it never selects text).
    const onMove = (e: PointerEvent) => scratch(e.clientX, e.clientY);
    const onLeave = () => { last = null; };
    wrap.addEventListener('pointermove', onMove);
    wrap.addEventListener('pointerleave', onLeave);

    const ro = new ResizeObserver(() => paintVeil());
    ro.observe(wrap);

    return () => {
      cancelHeal();
      wrap.removeEventListener('pointermove', onMove);
      wrap.removeEventListener('pointerleave', onLeave);
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative cursor-crosshair overflow-hidden">
      {/* clear photo underneath */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${SRC}')` }} />
      {/* scratch surface (blurred photo + white veil) — brushed away to reveal the clear photo */}
      <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />
      {/* content above */}
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
