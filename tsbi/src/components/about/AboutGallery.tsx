'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

type GalleryImage = { src: string; event: string; name: string };

/* Infinite draggable gallery — drag to pan an endless tiled grid, click a tile to
   zoom it to centre with an overlay, click again (or the overlay) to close.
   Ported from the GSAP "Infinite Draggable Image Gallery" concept, adapted to React. */
export default function AboutGallery({ images }: { images: GalleryImage[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLDivElement>(null);
  const overlayRef   = useRef<HTMLDivElement>(null);
  const titleRef     = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!images.length) return;
    const container = containerRef.current!;
    const canvas    = canvasRef.current!;
    const overlay   = overlayRef.current!;
    const titleWord = titleRef.current!;

    gsap.registerPlugin(CustomEase);
    try { CustomEase.create('hop', '0.9, 0, 0.1, 1'); } catch { /* already created */ }

    const SRCS  = images.map(i => i.src);
    const NAMES = images.map(i => i.event);
    const itemCount = images.length;

    /* ── settings (Tweakpane removed; sized responsively) ── */
    const small = container.clientWidth < 640;
    const baseWidth = Math.round(Math.min(380, Math.max(220, container.clientWidth * 0.3)));
    const settings = {
      baseWidth,
      smallHeight: Math.round(baseWidth * 0.8),
      largeHeight: Math.round(baseWidth * 1.25),
      itemGap: Math.round(baseWidth * 0.17),
      hoverScale: 1.06,
      expandedScale: small ? 0.82 : 0.42,
      dragEase: 0.075,
      momentumFactor: 200,
      bufferZone: 0.8,
      zoomDuration: 0.6,
      overlayOpacity: 0.92,
      overlayEaseDuration: 0.8,
    };

    const itemSizes = [
      { width: settings.baseWidth, height: settings.smallHeight },
      { width: settings.baseWidth, height: settings.largeHeight },
    ];
    const columns = 4;
    const cellWidth  = settings.baseWidth + settings.itemGap;
    const cellHeight = Math.max(settings.smallHeight, settings.largeHeight) + settings.itemGap;

    let isDragging = false, mouseHasMoved = false, canDrag = true, isExpanded = false;
    let startX = 0, startY = 0;
    let targetX = 0, targetY = 0, currentX = 0, currentY = 0;
    let dragVX = 0, dragVY = 0, lastDragTime = 0;
    let lastX = 0, lastY = 0, lastUpdate = 0;
    let rafId = 0;
    const visibleItems = new Set<string>();
    let activeItemId: string | null = null;
    let activeItem: HTMLElement | null = null;
    let expandedItem: HTMLDivElement | null = null;
    let originalPosition: { rect: DOMRect; w: number; h: number } | null = null;
    let overlayTween: gsap.core.Tween | null = null;

    /* ── title reveal (clip + translate) ── */
    const setTitle = (t: string) => { titleWord.textContent = t; gsap.set(titleWord, { yPercent: 110, opacity: 0 }); };
    const titleIn  = () => gsap.to(titleWord, { yPercent: 0, opacity: 1, duration: 0.7, ease: 'power3.out' });
    const titleOut = () => gsap.to(titleWord, { yPercent: -110, opacity: 0, duration: 0.55, ease: 'power3.in' });

    const overlayIn  = () => { overlayTween?.kill(); overlayTween = gsap.to(overlay, { opacity: settings.overlayOpacity, duration: settings.overlayEaseDuration, ease: 'power2.inOut' }); };
    const overlayOut = () => { overlayTween?.kill(); overlayTween = gsap.to(overlay, { opacity: 0, duration: settings.overlayEaseDuration, ease: 'power2.inOut' }); };

    const getItemSize = (row: number, col: number) => itemSizes[Math.abs((row * columns + col) % itemSizes.length)];
    const getItemId   = (col: number, row: number) => `${col},${row}`;

    function updateVisibleItems() {
      const cw = container.clientWidth, ch = container.clientHeight;
      const buffer = settings.bufferZone;
      const viewW = cw * (1 + buffer), viewH = ch * (1 + buffer);
      const startCol = Math.floor((-currentX - viewW / 2) / cellWidth);
      const endCol   = Math.ceil((-currentX + viewW * 1.5) / cellWidth);
      const startRow = Math.floor((-currentY - viewH / 2) / cellHeight);
      const endRow   = Math.ceil((-currentY + viewH * 1.5) / cellHeight);
      const current = new Set<string>();

      for (let row = startRow; row <= endRow; row++) {
        for (let col = startCol; col <= endCol; col++) {
          const id = getItemId(col, row);
          current.add(id);
          if (visibleItems.has(id)) continue;
          if (activeItemId === id && isExpanded) continue;

          const size = getItemSize(row, col);
          const itemNum = Math.abs((row * columns + col) % itemCount);

          const item = document.createElement('div');
          item.className = 'ig-item';
          item.id = id;
          item.style.width = `${size.width}px`;
          item.style.height = `${size.height}px`;
          item.style.left = `${col * cellWidth}px`;
          item.style.top = `${row * cellHeight}px`;
          item.dataset.width = String(size.width);
          item.dataset.height = String(size.height);
          item.dataset.num = String(itemNum);

          const wrap = document.createElement('div');
          wrap.className = 'ig-item-img';
          const img = document.createElement('img');
          img.src = SRCS[itemNum];
          img.alt = NAMES[itemNum];
          img.loading = 'lazy';
          img.draggable = false;
          wrap.appendChild(img);
          item.appendChild(wrap);

          const cap = document.createElement('div');
          cap.className = 'ig-cap';
          const nm = document.createElement('div');
          nm.className = 'ig-name';
          nm.textContent = NAMES[itemNum];
          cap.appendChild(nm);
          item.appendChild(cap);

          item.addEventListener('click', () => {
            if (mouseHasMoved || isDragging) return;
            handleItemClick(item, itemNum);
          });

          canvas.appendChild(item);
          visibleItems.add(id);
        }
      }

      visibleItems.forEach(id => {
        if (!current.has(id) || (activeItemId === id && isExpanded)) {
          const el = document.getElementById(id);
          if (el && el.parentNode === canvas) canvas.removeChild(el);
          visibleItems.delete(id);
        }
      });
    }

    function handleItemClick(item: HTMLElement, itemNum: number) {
      if (isExpanded) { if (expandedItem) closeExpanded(); }
      else expandItem(item, itemNum);
    }

    function expandItem(item: HTMLElement, itemNum: number) {
      isExpanded = true; activeItem = item; activeItemId = item.id; canDrag = false;
      container.style.cursor = 'auto';

      const imgSrc = (item.querySelector('img') as HTMLImageElement).src;
      const w = Number(item.dataset.width), h = Number(item.dataset.height);
      setTitle(NAMES[itemNum]);

      const cap = item.querySelector('.ig-cap') as HTMLElement | null;
      if (cap) cap.style.opacity = '0';

      const rect = item.getBoundingClientRect();
      originalPosition = { rect, w, h };

      overlay.classList.add('active');
      overlayIn();

      expandedItem = document.createElement('div');
      expandedItem.className = 'ig-expanded';
      expandedItem.style.width = `${w}px`;
      expandedItem.style.height = `${h}px`;
      const eImg = document.createElement('img');
      eImg.src = imgSrc;
      eImg.draggable = false;
      expandedItem.appendChild(eImg);
      expandedItem.addEventListener('click', closeExpanded);
      document.body.appendChild(expandedItem);

      canvas.querySelectorAll('.ig-item').forEach(el => {
        if (el !== activeItem) gsap.to(el, { opacity: 0, duration: settings.overlayEaseDuration, ease: 'power2.inOut' });
      });

      // target size, clamped to viewport
      let targetW = window.innerWidth * settings.expandedScale;
      const aspect = h / w;
      let targetH = targetW * aspect;
      const maxH = window.innerHeight * 0.82;
      if (targetH > maxH) { targetH = maxH; targetW = targetH / aspect; }

      gsap.delayedCall(0.45, titleIn);
      gsap.fromTo(expandedItem,
        { width: w, height: h, x: rect.left + w / 2 - window.innerWidth / 2, y: rect.top + h / 2 - window.innerHeight / 2 },
        { width: targetW, height: targetH, x: 0, y: 0, duration: settings.zoomDuration, ease: 'hop' });

      document.body.style.overflow = 'hidden';
    }

    function closeExpanded() {
      if (!expandedItem || !originalPosition) return;
      titleOut(); overlayOut();

      canvas.querySelectorAll('.ig-item').forEach(el => {
        if ((el as HTMLElement).id !== activeItemId) gsap.to(el, { opacity: 1, duration: settings.overlayEaseDuration, delay: 0.3, ease: 'power2.inOut' });
      });

      const { rect, w, h } = originalPosition;
      gsap.to(expandedItem, {
        width: w, height: h,
        x: rect.left + w / 2 - window.innerWidth / 2,
        y: rect.top + h / 2 - window.innerHeight / 2,
        duration: settings.zoomDuration, ease: 'hop',
        onComplete: () => {
          const orig = activeItemId ? document.getElementById(activeItemId) : null;
          if (orig) { const c = orig.querySelector('.ig-cap') as HTMLElement | null; if (c) c.style.opacity = '1'; }
          if (expandedItem && expandedItem.parentNode) document.body.removeChild(expandedItem);
          expandedItem = null; isExpanded = false; activeItem = null; originalPosition = null; activeItemId = null;
          canDrag = true; container.style.cursor = 'grab'; dragVX = 0; dragVY = 0;
          overlay.classList.remove('active');
          document.body.style.overflow = '';
        },
      });
    }

    /* ── render loop ── */
    function animate() {
      if (canDrag) {
        currentX += (targetX - currentX) * settings.dragEase;
        currentY += (targetY - currentY) * settings.dragEase;
        canvas.style.transform = `translate(${currentX}px, ${currentY}px)`;
        const now = Date.now();
        const moved = Math.hypot(currentX - lastX, currentY - lastY);
        if (moved > 100 || now - lastUpdate > 120) {
          updateVisibleItems();
          lastX = currentX; lastY = currentY; lastUpdate = now;
        }
      }
      rafId = requestAnimationFrame(animate);
    }

    /* ── input ── */
    const onMouseDown = (e: MouseEvent) => {
      if (!canDrag) return;
      e.preventDefault(); // stop the browser from starting a text/image selection while dragging
      isDragging = true; mouseHasMoved = false;
      startX = e.clientX; startY = e.clientY;
      container.style.cursor = 'grabbing';
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging || !canDrag) return;
      const dx = e.clientX - startX, dy = e.clientY - startY;
      if (Math.abs(dx) > 5 || Math.abs(dy) > 5) mouseHasMoved = true;
      const now = Date.now(), dt = Math.max(10, now - lastDragTime);
      lastDragTime = now; dragVX = dx / dt; dragVY = dy / dt;
      targetX += dx; targetY += dy; startX = e.clientX; startY = e.clientY;
    };
    const onMouseUp = () => {
      if (!isDragging) return;
      isDragging = false;
      if (canDrag) {
        container.style.cursor = 'grab';
        if (Math.abs(dragVX) > 0.1 || Math.abs(dragVY) > 0.1) {
          targetX += dragVX * settings.momentumFactor;
          targetY += dragVY * settings.momentumFactor;
        }
      }
    };
    const onTouchStart = (e: TouchEvent) => {
      if (!canDrag) return;
      isDragging = true; mouseHasMoved = false;
      startX = e.touches[0].clientX; startY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || !canDrag) return;
      const dx = e.touches[0].clientX - startX, dy = e.touches[0].clientY - startY;
      if (Math.abs(dx) > 5 || Math.abs(dy) > 5) mouseHasMoved = true;
      targetX += dx; targetY += dy;
      startX = e.touches[0].clientX; startY = e.touches[0].clientY;
      e.preventDefault(); // keep the page from scrolling while panning the gallery
    };
    const onTouchEnd = () => { isDragging = false; };
    const onOverlayClick = () => { if (isExpanded) closeExpanded(); };
    const onResize = () => {
      if (isExpanded && expandedItem && originalPosition) {
        let targetW = window.innerWidth * settings.expandedScale;
        const aspect = originalPosition.h / originalPosition.w;
        let targetH = targetW * aspect;
        const maxH = window.innerHeight * 0.82;
        if (targetH > maxH) { targetH = maxH; targetW = targetH / aspect; }
        gsap.to(expandedItem, { width: targetW, height: targetH, duration: 0.3, ease: 'power2.out' });
      } else {
        updateVisibleItems();
      }
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);
    overlay.addEventListener('click', onOverlayClick);
    window.addEventListener('resize', onResize);

    updateVisibleItems();
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      overlay.removeEventListener('click', onOverlayClick);
      window.removeEventListener('resize', onResize);
      if (expandedItem && expandedItem.parentNode) expandedItem.parentNode.removeChild(expandedItem);
      document.body.style.overflow = '';
      gsap.killTweensOf([overlay, titleWord]);
      canvas.replaceChildren();
      visibleItems.clear();
    };
  }, [images]);

  if (!images.length) return null;

  return (
    <section className="ig-section">
      <style dangerouslySetInnerHTML={{ __html: `
        .ig-section { position:relative; background:#0a0a0a; overflow:hidden; --ig-radius:6px; }
        .ig-section, .ig-section *, .ig-expanded, .ig-expanded * {
          user-select:none; -webkit-user-select:none; -ms-user-select:none;
          -webkit-touch-callout:none; -webkit-user-drag:none;
        }
        .ig-item img, .ig-expanded img { -webkit-user-drag:none; -khtml-user-drag:none; }
        .ig-container { position:relative; width:100%; height:100%; overflow:hidden; cursor:grab; }
        .ig-canvas { position:absolute; top:0; left:0; will-change:transform; }
        .ig-item { position:absolute; overflow:hidden; background:#000; cursor:pointer; border-radius:var(--ig-radius); }
        .ig-item-img { width:100%; height:100%; overflow:hidden; position:relative; }
        .ig-item img { width:100%; height:100%; object-fit:cover; pointer-events:none; display:block; transition:transform .4s ease; }
        .ig-item:hover img { transform:scale(1.06); }
        .ig-cap { position:absolute; left:0; bottom:0; width:100%; padding:10px 12px; z-index:2; pointer-events:none;
          background:linear-gradient(to top, rgba(0,0,0,.72) 0%, transparent 100%); }
        .ig-name { font-family:var(--fm); color:#fff; font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:.05em; }
        .ig-num { font-family:var(--fm); color:#9a9a9a; font-size:10px; margin-top:1px; }
        .ig-overlay { position:fixed; inset:0; background:#000; opacity:0; pointer-events:none; z-index:9999; }
        .ig-overlay.active { pointer-events:auto; }
        .ig-expanded { position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); background:#000; overflow:hidden; cursor:pointer; z-index:10000; border-radius:var(--ig-radius); }
        .ig-expanded img { width:100%; height:100%; object-fit:cover; pointer-events:none; display:block; }
        .ig-title { position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); width:100%; text-align:center; pointer-events:none; z-index:10002; }
        .ig-title p { position:relative; height:48px; overflow:hidden; margin:0; display:inline-block; }
        .ig-title span { display:inline-block; font-family:var(--fa); font-weight:600; font-size:clamp(26px,4vw,42px); letter-spacing:.01em; text-transform:uppercase; color:#fff; will-change:transform; }
        .ig-vignette { position:absolute; inset:0; pointer-events:none; z-index:50; box-shadow: inset 0 0 220px rgba(0,0,0,.8); }
        .ig-header { text-align:center; padding:64px 24px 30px; }
        .ig-eyebrow { font-family:var(--fm); font-size:11px; letter-spacing:.24em; text-transform:uppercase; color:#e0197d; }
        .ig-heading { font-family:var(--fm); font-weight:800; font-size:clamp(30px,4vw,56px); letter-spacing:.01em; color:#fff; margin:8px 0 0; line-height:1.05; }
        .ig-heading em { color:#e0197d; font-style:italic; }
      ` }} />

      {/* visible header (above the draggable canvas, not overlaid on photos) */}
      <div className="ig-header">
        <div className="ig-eyebrow">Life at TSBI ✦</div>
        <h2 className="ig-heading">TSBI <em>Gallery</em></h2>
        <div className="ig-eyebrow mt-1 font-fm font-normal">drag to explore or zoom to view details</div>
      </div>

      <div ref={containerRef} className="ig-container" style={{ height: 'clamp(520px, 96vh, 900px)' }}>
        <div ref={canvasRef} className="ig-canvas" />

        {/* immersive vignette */}
        <div className="ig-vignette" />

        {/* overlay + zoomed title (viewport-fixed) */}
        <div ref={overlayRef} className="ig-overlay" />
        <div className="ig-title"><p><span ref={titleRef} /></p></div>
      </div>
    </section>
  );
}
