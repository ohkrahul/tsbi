'use client';

import { useEffect, useState } from 'react';

const FLASH_ITEMS = [
  { img: '/influncer/1.png', overlay: 'rgba(224,25,125,.38)' },
  { img: '/influncer/2.png', overlay: 'rgba(13,21,40,.50)' },
  { img: '/influncer/3.png', overlay: 'rgba(255,76,12,.30)' },
  { img: '/influncer/4.png', overlay: 'rgba(26,106,255,.38)' },
  { img: '/influncer/5.png', overlay: 'rgba(10,10,10,.30)' },
  { img: '/influncer/6.png', overlay: 'rgba(224,25,125,.30)' },
  { img: '/influncer/7.png', overlay: 'rgba(255,76,12,.20)' },
  { img: '/influncer/8.png', overlay: 'rgba(26,106,255,.38)' },
  { img: 'https://img.youtube.com/vi/bYZCeey4b6g/maxresdefault.jpg', overlay: 'rgba(13,21,40,.45)' },
  { img: 'https://img.youtube.com/vi/o2h-9sNPAo4/maxresdefault.jpg', overlay: 'rgba(224,25,125,.32)' },
];

const FLASH_STEP_MS = 350;
const LOGO_GAP_MS = 420;
const PRELOADER_FADE_MS = 1800;
const PRELOADER_HIDE_MS = 900;

export default function Preloader() {
  const [flashShown, setFlashShown] = useState<number[]>([]);
  const [centerShow, setCenterShow] = useState(false);
  const [gone, setGone] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const centerShowDelay = FLASH_ITEMS.length * FLASH_STEP_MS + LOGO_GAP_MS;
    const goneDelay = centerShowDelay + PRELOADER_FADE_MS;
    const hideDelay = goneDelay + PRELOADER_HIDE_MS;

    FLASH_ITEMS.forEach((_, i) => {
      setTimeout(() => setFlashShown((prev) => [...prev, i]), i * FLASH_STEP_MS);
    });

    setTimeout(() => setCenterShow(true), centerShowDelay);
    setTimeout(() => setGone(true), goneDelay);
    setTimeout(() => {
      setHidden(true);
      document.body.style.overflow = '';
    }, hideDelay);

    return () => { document.body.style.overflow = ''; };
  }, []);

  if (hidden) return null;

  return (
    <div id="pre" className={gone ? 'gone' : ''}>
      <div className="pre-flash">
        {FLASH_ITEMS.map((item, i) => (
          <div key={i} className={`pf${flashShown.includes(i) ? ' show' : ''}`}>
            <div className="pf-inner">
              <div className="pf-bg" style={{ backgroundImage: `url(${item.img})` }} />
              <img src={item.img} alt={`Preload ${i + 1}`} className="pf-img" draggable={false} />
            </div>
            <div style={{ position: 'absolute', inset: 0, background: item.overlay }} />
            <div className="pf-line" />
          </div>
        ))}
      </div>

      <div className="pre-veil" style={{ opacity: centerShow ? 0.95 : 0 }} />

      <div className={`pre-center${centerShow ? ' show' : ''}`}>
        <div className="pre-logo-stack">
          <img src="/tsbilogo.png" alt="TSBI" className="pre-logo-image" />
        </div>
        <p className="pre-line1">The Small Big Idea</p>
        <p className="pre-line2">Strategic Creative Agency</p>
      </div>

      <div className="pre-bar">
        <div className="pre-bar-track">
          <div className="pre-bar-fill" />
        </div>
      </div>
    </div>
  );
}
