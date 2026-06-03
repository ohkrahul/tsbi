'use client';

import { useEffect, useRef } from 'react';

const brands = [
  "L'Oréal Paris", 'Chanel', 'OnePlus', 'Dior',
  'Tiger Beer', 'La Mer', 'Glossier', 'Swarovski',
  'Sidewave', 'FWA', 'Saigon Souls', 'GLOW',
];

export default function GalaxySection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let raf: number;
    const stars: { x: number; y: number; r: number; o: number; vx: number; vy: number; t: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight || 600;
      stars.length = 0;
      const n = Math.min(Math.floor(canvas.width * canvas.height / 3000), 180);
      for (let i = 0; i < n; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.5 + 0.3,
          o: Math.random() * 0.7 + 0.1,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          t: Math.random() * Math.PI * 2,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        s.x += s.vx; s.y += s.vy; s.t += 0.015;
        if (s.x < 0) s.x = canvas.width;
        if (s.x > canvas.width) s.x = 0;
        if (s.y < 0) s.y = canvas.height;
        if (s.y > canvas.height) s.y = 0;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.o * (0.6 + 0.4 * Math.sin(s.t))})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <section className="galaxy-section">
      <canvas ref={canvasRef} className="galaxy-canvas" />

      <div className="galaxy-inner">
        <div className="galaxy-sub reveal">The TSBI Galaxy</div>
        <h2 className="galaxy-h2 reveal d1">
          Every Brand a<br/><em>Star in Our Galaxy</em>
        </h2>

        <div className="galaxy-brands reveal d2">
          {brands.map((b, i) => (
            <span key={b} className={`galaxy-brand${i % 3 === 0 ? ' bright' : ''}`}>{b}</span>
          ))}
        </div>

        <div className="galaxy-caption reveal d3">
          <div className="galaxy-cap-line" style={{ color: '#fff' }}>This is just the start of the universe.</div>
          <div className="galaxy-cap-note">150+ collaborations · 300+ campaigns · 12+ years · Growing</div>
        </div>
      </div>
    </section>
  );
}
