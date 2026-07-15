'use client';

import { useRef, useState } from 'react';

/**
 * TSBI Arabia — MENA studio work as a two-row auto-scrolling marquee. Cards show a light
 * poster/image by default; local clips load + play on hover (rows pause on hover), and
 * YouTube/Instagram items open externally. A brand roster strip lists the full regional
 * client list (including work without a public asset).
 */

type Media =
  | { kind: 'video'; src: string }
  | { kind: 'image'; src: string }
  | { kind: 'youtube'; id: string }
  | { kind: 'instagram'; url: string };

type Item = { brand: string; category: string; label?: string; media: Media };

const ITEMS: Item[] = [
  // { brand: 'Dabur Amla Kids', category: '3D · Character', label: 'Eid', media: { kind: 'instagram', url: 'https://www.instagram.com/reel/DY1K6yuIh0p/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' } },
  { brand: 'Dabur Amla Kids', category: '3D · Character', label: 'GRWM', media: { kind: 'video', src: '/arebia/grwm-dabur-amla-kids.mp4' } },
  { brand: 'Vatika', category: 'AI & 3D', label: 'A Drop of Nature', media: { kind: 'video', src: '/arebia/vatika-drop-of-nature.mp4' } },
  { brand: 'Vatika', category: 'AI & 3D', label: 'CGI', media: { kind: 'video', src: '/arebia/vatika-eho-cgi.mp4' } },
  { brand: 'Vatika Bodywash', category: '3D Animation', label: 'Product AV', media: { kind: 'video', src: '/arebia/vatika-bodywash-av.mp4' } },
  { brand: 'Vatika Menz', category: 'Influencer', label: 'Naser', media: { kind: 'video', src: '/arebia/vatika-menz-naser.mp4' } },
  { brand: 'Vatika Ethiopia', category: '3D Animation', label: 'Digital Hoarding', media: { kind: 'video', src: '/arebia/vatika-ethiopia-hoarding.mp4' } },
  { brand: 'Hobby', category: '3D · OOH', label: 'Digital Hoarding', media: { kind: 'video', src: '/arebia/hobby-hoarding.mp4' } },
  { brand: 'Fem', category: 'CGI', label: 'CGI Film', media: { kind: 'video', src: '/arebia/fem-cgi.mp4' } },
  { brand: 'Lipton', category: 'Game Dev', label: 'Game Walkthrough', media: { kind: 'video', src: '/arebia/lipton-game.mp4' } },
  { brand: 'Brooke Bond Red Label', category: 'Brand Film', label: 'Brand Film', media: { kind: 'youtube', id: 'msXrpyBuoxo' } },
  { brand: 'Brooke Bond Red Label', category: 'Influencer', label: 'Champions Trophy', media: { kind: 'video', src: '/arebia/red-label-parikshit.mp4' } },
  { brand: 'AllBirds', category: 'CGI', label: 'CGI 1', media: { kind: 'video', src: '/arebia/allbirds-cgi-1.mp4' } },
  { brand: 'AllBirds', category: 'CGI', label: 'CGI 2', media: { kind: 'video', src: '/arebia/allbirds-cgi-2.mp4' } },
  { brand: 'Thumbay', category: 'Influencer', label: 'Dalelak Nahed', media: { kind: 'video', src: '/arebia/thumbay-dalelak-nahed.mp4' } },
  { brand: 'Thumbay', category: 'Influencer', label: 'Groor Albloshi', media: { kind: 'video', src: '/arebia/thumbay-groor-albloshi.mp4' } },
  { brand: 'Thumbay', category: 'Influencer', label: 'Collab', media: { kind: 'video', src: '/arebia/thumbay-collab.mp4' } },
  { brand: 'Lulu Hypermarket', category: 'CGI', label: 'Fruit Exotica', media: { kind: 'video', src: '/arebia/lulu-fruit-exotica.mp4' } },
  { brand: 'Lulu Hypermarket', category: 'CGI', label: 'Promo', media: { kind: 'video', src: '/arebia/lulu-cgi-2.mp4' } },
  { brand: 'Lulu Hypermarket', category: 'CGI', label: 'Promo', media: { kind: 'video', src: '/arebia/lulu-cgi-3.mp4' } },
  { brand: 'Goot', category: 'Product Shoot', media: { kind: 'image', src: '/arebia/goot-1.jpg' } },
  { brand: 'Goot', category: 'Product Shoot', media: { kind: 'image', src: '/arebia/goot-2.jpg' } },
  { brand: 'Goot', category: 'Product Shoot', media: { kind: 'image', src: '/arebia/goot-3.jpg' } },
  { brand: 'Goot', category: 'Product Shoot', media: { kind: 'image', src: '/arebia/goot-4.jpg' } },
  { brand: 'Goot', category: 'Product Shoot', media: { kind: 'image', src: '/arebia/goot-5.jpg' } },
  { brand: 'Waseem Akram', category: 'Photography', media: { kind: 'image', src: '/arebia/waseem-1.jpg' } },
  { brand: 'Waseem Akram', category: 'Photography', media: { kind: 'image', src: '/arebia/waseem-2.jpg' } },
  { brand: 'Waseem Akram', category: 'Photography', media: { kind: 'image', src: '/arebia/waseem-3.jpg' } },
];

// Full regional roster — includes brands whose work has no public asset above.
const BRANDS = [
  'Dabur Amla', 'Dabur Amla Kids', 'Dabur Healthcare', 'Vatika', 'Vatika Bodywash', 'Vatika Menz',
  'Vatika Ethiopia', 'ORS Olive Oil', 'Hobby', 'Dabur Herbal Toothpaste', 'Fem', 'Dubai College of Tourism',
  'Lipton', 'Brooke Bond Red Label', 'Nair', 'Goot', 'Sobha Realty', 'Thumbay', 'Black Amber', 'AllBirds',
  'Iraave Skincare', 'Lulu Hypermarket', 'Policy Bazaar', 'Paisa Bazaar',
];

const ROW_A = ITEMS.filter((_, i) => i % 2 === 0);
const ROW_B = ITEMS.filter((_, i) => i % 2 === 1);
const ytThumb = (id: string) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
const posterOf = (src: string) => src.replace(/\.mp4$/, '.jpg');

function Label({ item }: { item: Item }) {
  return (
    <span className="pointer-events-none absolute inset-x-0 bottom-0 z-2 bg-linear-to-t from-black/90 via-black/35 to-transparent px-3 pb-2.5 pt-8 text-left">
      <span className="block font-fm text-[8px] font-semibold uppercase tracking-[0.14em] text-magenta">
        {item.category}{item.label ? ` · ${item.label}` : ''}
      </span>
      <span className="block font-fd text-[13px] font-bold leading-tight text-white">{item.brand}</span>
    </span>
  );
}

function PlayBadge() {
  return (
    <span className="pointer-events-none absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 ring-1 ring-white/50 backdrop-blur-sm transition group-hover:bg-magenta group-hover:ring-magenta">
      <span className="ml-0.5 border-y-[6px] border-l-9 border-y-transparent border-l-white" />
    </span>
  );
}

// Uniform card HEIGHT keeps the strip tidy; WIDTH is natural so nothing is cropped —
// EXCEPT ultra-wide digital hoardings, which are width-capped (object-cover) so a 5:1
// banner can't blow out the row. "wide" is detected from the media's natural dimensions.
const CARD = 'arebia-card group relative shrink-0 overflow-hidden rounded-xl bg-black h-[clamp(168px,18.5vw,230px)]';
const WIDE_W = 'w-[clamp(300px,30vw,430px)]';

function Card({ item }: { item: Item }) {
  const m = item.media;
  const vidRef = useRef<HTMLVideoElement>(null);
  const [wide, setWide] = useState(false);
  const measure = (el: HTMLImageElement | null) => {
    if (el && el.naturalWidth && el.naturalHeight) setWide(el.naturalWidth / el.naturalHeight > 2.2);
  };
  const cls = `${CARD}${wide ? ` ${WIDE_W}` : ''}`;
  const imgCls = `block select-none ${wide ? 'h-full w-full object-cover' : 'h-full w-auto max-w-none'}`;

  if (m.kind === 'video') {
    const play = () => { const v = vidRef.current; if (!v) return; v.style.opacity = '1'; void v.play().catch(() => {}); };
    const stop = () => { const v = vidRef.current; if (!v) return; v.style.opacity = '0'; v.pause(); };
    return (
      <div className={cls} onMouseEnter={play} onMouseLeave={stop}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img ref={measure} src={posterOf(m.src)} onLoad={(e) => measure(e.currentTarget)} alt={`${item.brand} — ${item.category}`} className={imgCls} draggable={false} />
        <video
          ref={vidRef}
          src={m.src}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300"
        />
        <PlayBadge />
        <Label item={item} />
      </div>
    );
  }

  if (m.kind === 'image') {
    return (
      <div className={cls}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img ref={measure} src={m.src} onLoad={(e) => measure(e.currentTarget)} alt={`${item.brand} — ${item.category}`} loading="lazy" className={imgCls} draggable={false} />
        <Label item={item} />
      </div>
    );
  }

  if (m.kind === 'youtube') {
    return (
      <a href={`https://www.youtube.com/watch?v=${m.id}`} target="_blank" rel="noopener noreferrer" aria-label={`Watch ${item.brand} on YouTube`} className={`${cls} cursor-pointer`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img ref={measure} src={ytThumb(m.id)} onLoad={(e) => measure(e.currentTarget)} alt={`${item.brand} — ${item.label ?? ''}`} loading="lazy" className={imgCls} draggable={false} />
        <PlayBadge />
        <Label item={item} />
      </a>
    );
  }

  // instagram — no media, so a fixed portrait-ish branded card that links out
  return (
    <a href={m.url} target="_blank" rel="noopener noreferrer" aria-label={`Watch ${item.brand} on Instagram`} className={`${CARD} w-[clamp(132px,15vw,178px)] cursor-pointer`}>
      <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-linear-to-br from-[#3a1640] via-[#2a1230] to-navy px-4 text-center">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6" aria-hidden>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1.1" fill="#fff" stroke="none" />
        </svg>
        <span className="font-fm text-[9px] uppercase tracking-[0.16em] text-magenta">Watch on Instagram →</span>
      </span>
      <Label item={item} />
    </a>
  );
}

export default function ArebiaSection() {
  return (
    <section
      aria-label="TSBI Arabia — Middle East work"
      className="relative overflow-hidden py-20 sm:py-24"
      style={{ background: 'radial-gradient(circle at 82% 10%, rgba(224,25,125,.18), transparent 46%), radial-gradient(circle at 8% 90%, rgba(26,106,255,.14), transparent 46%), #0a0e1a' }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .arebia-marquee { position:relative; overflow:hidden; }
        .arebia-marquee::before, .arebia-marquee::after { content:''; position:absolute; top:0; bottom:0; width:clamp(40px,7vw,110px); z-index:4; pointer-events:none; }
        .arebia-marquee::before { left:0; background:linear-gradient(90deg,#0a0e1a,transparent); }
        .arebia-marquee::after { right:0; background:linear-gradient(270deg,#0a0e1a,transparent); }
        .arebia-row { display:flex; align-items:center; gap:16px; width:max-content; will-change:transform; }
        .arebia-row.a { animation: arebiaA var(--dur,70s) linear infinite; }
        .arebia-row.b { animation: arebiaB var(--dur,70s) linear infinite; }
        .arebia-marquee:hover .arebia-row { animation-play-state: paused; }
        @keyframes arebiaA { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes arebiaB { from { transform: translateX(-50%); } to { transform: translateX(0); } }
        @media (prefers-reduced-motion: reduce) { .arebia-row { animation: none; } }
      ` }} />

      <div className="reveal mb-10 px-6 text-center sm:mb-14 sm:px-10">
        <span className="mb-5 inline-flex items-center gap-2.5 font-fm text-[11px] font-bold uppercase tracking-[0.24em] text-magenta">
          <span className="h-px w-7 bg-magenta/50" /> TSBI Arabia <span className="h-px w-7 bg-magenta/50" />
        </span>
        <h2 className="font-fm text-[clamp(30px,5vw,58px)] font-bold uppercase leading-[1.08] tracking-[-0.01em] text-white">
          Made for the <span className="italic text-magenta">Middle East</span>
        </h2>
        <p className="mx-auto mt-4 max-w-[560px] text-sm font-light leading-[1.8] text-white/60 sm:text-[15px]">
          From Mumbai to MENA — 3D &amp; CGI, brand films, games, digital hoardings and influencer
          work for the region&apos;s biggest brands.
        </p>
      </div>

      {/* two auto-scrolling rows (opposite directions) — pause on hover */}
      <div className="arebia-marquee flex flex-col gap-4">
        <div className="arebia-row a">
          {[...ROW_A, ...ROW_A].map((item, i) => <Card key={`a${i}`} item={item} />)}
        </div>
        <div className="arebia-row b">
          {[...ROW_B, ...ROW_B].map((item, i) => <Card key={`b${i}`} item={item} />)}
        </div>
      </div>

      {/* Brand roster */}
      <div className="reveal mx-auto mt-12 flex max-w-[1200px] flex-wrap justify-center gap-2.5 px-6 sm:mt-16">
        {BRANDS.map((b) => (
          <span key={b} className="rounded-full border border-white/12 bg-white/5 px-3.5 py-1.5 font-fm text-[11px] font-medium tracking-[0.02em] text-white/70">
            {b}
          </span>
        ))}
      </div>
    </section>
  );
}
