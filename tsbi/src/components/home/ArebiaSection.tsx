'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

/**
 * TSBI Arabia — featured-showcase layout: headline + filter tabs + thumbnail picker on the
 * left, a large hero player on the right (poster → plays the clip / opens the link on click),
 * with dot pagination and auto-advance. Uses the compressed /arebia assets.
 */

type Media =
  | { kind: 'video'; src: string }
  | { kind: 'image'; src: string }
  | { kind: 'youtube'; id: string }
  | { kind: 'instagram'; url: string };

type Tag = 'filmcgi' | 'influencer' | 'ooh' | 'games';
type Item = { brand: string; category: string; label?: string; tag: Tag; media: Media };

const ITEMS: Item[] = [
  // { brand: 'Dabur Amla Kids', category: '3D · Character', label: 'Eid', tag: 'filmcgi', media: { kind: 'instagram', url: 'https://www.instagram.com/reel/DY1K6yuIh0p/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' } },
  { brand: 'Dabur Amla Kids', category: '3D · Character', label: 'GRWM', tag: 'filmcgi', media: { kind: 'video', src: '/arebia/grwm-dabur-amla-kids.mp4' } },
  // { brand: 'Vatika', category: 'AI & 3D', label: 'A Drop of Nature', tag: 'filmcgi', media: { kind: 'video', src: '/arebia/vatika-drop-of-nature.mp4' } },
  { brand: 'Vatika', category: 'AI & 3D', label: 'CGI', tag: 'filmcgi', media: { kind: 'video', src: '/arebia/vatika-eho-cgi.mp4' } },
  { brand: 'Vatika Bodywash', category: '3D Animation', label: 'Product AV', tag: 'filmcgi', media: { kind: 'video', src: '/arebia/vatika-bodywash-av.mp4' } },
  { brand: 'Vatika Menz', category: 'Influencer', label: 'Naser', tag: 'influencer', media: { kind: 'video', src: '/arebia/vatika-menz-naser.mp4' } },
  { brand: 'Vatika Ethiopia', category: 'Digital OOH', label: 'Digital Hoarding', tag: 'ooh', media: { kind: 'video', src: '/arebia/vatika-ethiopia-hoarding.mp4' } },
  { brand: 'Hobby', category: 'Digital OOH', label: 'Digital Hoarding', tag: 'ooh', media: { kind: 'video', src: '/arebia/hobby-hoarding.mp4' } },
  { brand: 'Fem', category: 'CGI Film', tag: 'filmcgi', media: { kind: 'video', src: '/arebia/fem-cgi.mp4' } },
  { brand: 'Lipton', category: 'Game Development', label: 'Walkthrough', tag: 'games', media: { kind: 'video', src: '/arebia/lipton-game.mp4' } },
  { brand: 'Brooke Bond Red Label', category: 'Brand Film', tag: 'filmcgi', media: { kind: 'youtube', id: 'msXrpyBuoxo' } },
  { brand: 'Brooke Bond Red Label', category: 'Influencer', label: 'Champions Trophy', tag: 'influencer', media: { kind: 'video', src: '/arebia/red-label-parikshit.mp4' } },
  { brand: 'AllBirds', category: 'CGI', label: 'CGI 1', tag: 'filmcgi', media: { kind: 'video', src: '/arebia/allbirds-cgi-1.mp4' } },
  { brand: 'AllBirds', category: 'CGI', label: 'CGI 2', tag: 'filmcgi', media: { kind: 'video', src: '/arebia/allbirds-cgi-2.mp4' } },
  { brand: 'Thumbay', category: 'Influencer', label: 'Dalelak Nahed', tag: 'influencer', media: { kind: 'video', src: '/arebia/thumbay-dalelak-nahed.mp4' } },
  { brand: 'Thumbay', category: 'Influencer', label: 'Groor Albloshi', tag: 'influencer', media: { kind: 'video', src: '/arebia/thumbay-groor-albloshi.mp4' } },
  { brand: 'Thumbay', category: 'Influencer', label: 'Collab', tag: 'influencer', media: { kind: 'video', src: '/arebia/thumbay-collab.mp4' } },
  // { brand: 'Lulu Hypermarket', category: 'CGI', label: 'Fruit Exotica', tag: 'filmcgi', media: { kind: 'video', src: '/arebia/lulu-fruit-exotica.mp4' } },
  // { brand: 'Lulu Hypermarket', category: 'CGI', label: 'Promo', tag: 'filmcgi', media: { kind: 'video', src: '/arebia/lulu-cgi-2.mp4' } },
  { brand: 'Lulu Hypermarket', category: 'CGI', label: 'Promo', tag: 'filmcgi', media: { kind: 'video', src: '/arebia/lulu-cgi-3.mp4' } },
  { brand: 'Waseem Akram', category: 'Celebrity Shoot', tag: 'influencer', media: { kind: 'image', src: '/arebia/waseem-1.jpg' } },
  { brand: 'Waseem Akram', category: 'Celebrity Shoot', tag: 'influencer', media: { kind: 'image', src: '/arebia/waseem-2.jpg' } },
  { brand: 'Waseem Akram', category: 'Celebrity Shoot', tag: 'influencer', media: { kind: 'image', src: '/arebia/waseem-3.jpg' } },
];

const FILTERS: { id: 'all' | Tag; label: string }[] = [
  // { id: 'all', label: 'All' },
  { id: 'filmcgi', label: 'Films & CGI' },
  { id: 'influencer', label: 'Influencer' },
  { id: 'ooh', label: 'Digital OOH' },
  { id: 'games', label: 'Games' },
];

const posterOf = (src: string) => src.replace(/\.mp4$/, '.jpg');
const posterFor = (it: Item): string | null => {
  const m = it.media;
  if (m.kind === 'video') return posterOf(m.src);
  if (m.kind === 'image') return m.src;
  if (m.kind === 'youtube') return `https://img.youtube.com/vi/${m.id}/hqdefault.jpg`;
  return null; // instagram — no thumbnail
};
const meta = (it: Item) => `${it.category}${it.label ? ` · ${it.label}` : ''}`;

const IG_BG = 'bg-linear-to-br from-[#3a1640] via-[#2a1230] to-[#0c1020]';

export default function ArebiaSection() {
  const [filter, setFilter] = useState<'all' | Tag>('all');
  const [selected, setSelected] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);

  const pool = useMemo(
    () => (filter === 'all' ? ITEMS : ITEMS.filter((it) => it.tag === filter)),
    [filter],
  );
  const idx = Math.min(selected, pool.length - 1);
  const cur = pool[idx] ?? ITEMS[0];
  const curPoster = posterFor(cur);
  const canPlay = cur.media.kind !== 'image';

  // reset when the filter changes
  useEffect(() => { setSelected(0); setPlaying(false); }, [filter]);

  // auto-advance (paused on hover / while a clip is playing)
  useEffect(() => {
    if (paused || playing || pool.length <= 1) return;
    const t = setInterval(() => setSelected((s) => (s + 1) % pool.length), 5200);
    return () => clearInterval(t);
  }, [paused, playing, pool.length]);

  const pick = (i: number) => { setSelected(i); setPlaying(false); };
  const activate = () => {
    const m = cur.media;
    if (m.kind === 'video') setPlaying(true);
    else if (m.kind === 'youtube') window.open(`https://www.youtube.com/watch?v=${m.id}`, '_blank', 'noopener');
    else if (m.kind === 'instagram') window.open(m.url, '_blank', 'noopener');
  };

  return (
    <section
      aria-label="TSBI Arabia — Middle East work"
      className="relative overflow-hidden px-6 py-16 sm:px-10 sm:py-20 lg:px-14"
      style={{ background: 'radial-gradient(circle at 78% 8%, rgba(224,25,125,.16), transparent 42%), radial-gradient(circle at 6% 88%, rgba(26,106,255,.12), transparent 44%), #080b14' }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .arebia-thumbs { scrollbar-width: thin; scrollbar-color: rgba(224,25,125,0.55) transparent; }
        .arebia-thumbs::-webkit-scrollbar { width: 6px; }
        .arebia-thumbs::-webkit-scrollbar-thumb { background: rgba(224,25,125,0.55); border-radius: 6px; }
        .arebia-thumbs::-webkit-scrollbar-track { background: transparent; }
      ` }} />
      <div className="mx-auto grid max-w-[1440px] items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        {/* ── LEFT: headline + filters + thumbnail picker ── */}
        <div>
          <div className="font-fm text-[11px] font-bold uppercase tracking-[0.3em] text-magenta">TSBI Arabia</div>
          <h2 className="mt-4 font-fm text-[clamp(38px,6vw,74px)] font-bold uppercase leading-[0.94] tracking-[-0.01em] text-white">
            Made for the <span className="italic text-magenta">Middle East</span>
          </h2>
          <p className="mt-5 max-w-[440px] text-sm font-light leading-[1.8] text-white/55 sm:text-[15px]">
            From Mumbai to MENA — 3D &amp; CGI, brand films, games, digital hoardings and influencer
            work for the region&apos;s biggest brands.
          </p>

          {/* filter tabs */}
          <div className="mt-7 flex flex-wrap gap-2">
            {FILTERS.map((f) => {
              const active = filter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  className={`rounded-full px-4 py-2 font-fm text-[11px] font-semibold uppercase tracking-[0.06em] transition ${
                    active ? 'bg-magenta text-white' : 'border border-white/15 bg-white/5 text-white/65 hover:border-white/40 hover:text-white'
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          {/* thumbnail picker */}
          <div className="arebia-thumbs mt-6 grid max-h-[344px] grid-cols-4 gap-2.5 overflow-y-auto pr-1.5 sm:gap-3">
            {pool.map((it, i) => {
              const p = posterFor(it);
              const active = i === idx;
              return (
                <button
                  key={`${it.brand}-${i}`}
                  type="button"
                  onClick={() => pick(i)}
                  aria-label={`Show ${it.brand}`}
                  className={`group relative aspect-[4/3] overflow-hidden rounded-lg bg-black text-left transition ${
                    active ? 'ring-2 ring-magenta' : 'ring-1 ring-white/10 hover:ring-white/30'
                  }`}
                >
                  {p ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p} alt={it.brand} loading="lazy" className={`absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${active ? '' : 'opacity-80 group-hover:opacity-100'}`} />
                  ) : (
                    <span className={`absolute inset-0 ${IG_BG}`} />
                  )}
                  <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/90 to-transparent px-2 pb-1.5 pt-6">
                    <span className="block truncate font-fd text-[10px] font-bold leading-tight text-white">{it.brand}</span>
                    <span className="block truncate font-fm text-[7px] uppercase tracking-[0.12em] text-magenta">{it.category}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <Link href="/case-studies" className="mt-6 inline-flex items-center gap-2 font-fm text-[12px] font-semibold uppercase tracking-[0.1em] text-magenta transition hover:gap-3">
            View all projects <span aria-hidden>→</span>
          </Link>
        </div>

        {/* ── RIGHT: featured player ── */}
        <div className="flex flex-col" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-black shadow-[0_30px_90px_rgba(0,0,0,0.5)] ring-1 ring-white/10 lg:aspect-[16/11] lg:max-h-[80vh]">
            {/* blurred backdrop fills the frame so contained media never shows empty bars */}
            {curPoster && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={curPoster} alt="" aria-hidden className="absolute inset-0 h-full w-full scale-110 object-cover opacity-35 blur-2xl" />
            )}
            {playing && cur.media.kind === 'video' ? (
              <video
                key={cur.media.src}
                src={cur.media.src}
                autoPlay
                controls
                loop
                playsInline
                className="absolute inset-0 h-full w-full bg-black object-contain"
              />
            ) : (
              <>
                {curPoster ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={curPoster} alt={cur.brand} className="absolute inset-0 h-full w-full object-contain" />
                ) : (
                  <span className={`absolute inset-0 flex items-center justify-center ${IG_BG}`}>
                    <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.4" aria-hidden>
                      <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1.1" fill="#fff" stroke="none" />
                    </svg>
                  </span>
                )}
                <span className="absolute inset-0 bg-linear-to-t from-black/85 via-black/10 to-black/20" />

                {canPlay && (
                  <button
                    type="button"
                    onClick={activate}
                    aria-label={`Play ${cur.brand}`}
                    className="group absolute left-1/2 top-1/2 flex h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/60 backdrop-blur-md transition hover:bg-magenta hover:ring-magenta"
                  >
                    <span className="ml-1 border-y-[11px] border-l-[18px] border-y-transparent border-l-white" />
                  </button>
                )}

                {/* title / category / watch */}
                <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 px-6 pb-6 pt-16 sm:px-8">
                  <h3 className="font-fm text-[clamp(22px,2.6vw,34px)] font-bold leading-tight text-white">{cur.brand}</h3>
                  <p className="font-fm text-[11px] font-semibold uppercase tracking-[0.16em] text-magenta">{meta(cur)}</p>
                  {canPlay && (
                    <button type="button" onClick={activate} className="mt-3 inline-flex w-max items-center gap-2.5 font-fm text-[12px] font-semibold uppercase tracking-[0.1em] text-white/90 transition hover:text-white">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-magenta">
                        <span className="ml-0.5 border-y-[5px] border-l-[8px] border-y-transparent border-l-white" />
                      </span>
                      Watch showcase
                    </button>
                  )}
                </div>
              </>
            )}
          </div>

          {/* dots + connect */}
          <div className="mt-5 flex items-center justify-between gap-4">
            {pool.length <= 8 ? (
              <div className="flex items-center gap-2">
                {pool.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => pick(i)}
                    aria-label={`Go to item ${i + 1}`}
                    className={`h-2 rounded-full transition-all ${i === idx ? 'w-6 bg-magenta' : 'w-2 bg-white/25 hover:bg-white/55'}`}
                  />
                ))}
              </div>
            ) : (
              <div className="font-fm text-[13px] font-semibold tracking-[0.12em] text-white/55">
                <span className="text-magenta">{String(idx + 1).padStart(2, '0')}</span> / {String(pool.length).padStart(2, '0')}
              </div>
            )}
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-magenta/60 px-5 py-2.5 font-fm text-[12px] font-semibold uppercase tracking-[0.08em] text-magenta transition hover:bg-magenta hover:text-white">
              Connect with Us <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
