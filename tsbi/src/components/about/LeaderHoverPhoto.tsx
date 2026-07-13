'use client';

import { useRef } from 'react';

/**
 * Leader profile photo that plays a short clip on hover. Fills its (positioned)
 * parent; the clip fades in over the still image while hovered, then pauses/resets
 * on leave. Falls back to just the image when no video is provided.
 */
export default function LeaderHoverPhoto({
  image,
  video,
  alt,
}: {
  image: string;
  video?: string;
  alt: string;
}) {
  const vidRef = useRef<HTMLVideoElement>(null);

  const onEnter = () => {
    const v = vidRef.current;
    if (!v) return;
    try { v.currentTime = 0; } catch { /* ignore */ }
    v.style.opacity = '1';
    void v.play().catch(() => {});
  };
  const onLeave = () => {
    const v = vidRef.current;
    if (!v) return;
    v.style.opacity = '0';
    v.pause();
  };

  return (
    <div
      style={{ position: 'absolute', inset: 0 }}
      onMouseEnter={video ? onEnter : undefined}
      onMouseLeave={video ? onLeave : undefined}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt={alt}
        style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }}
      />
      {video && (
        <video
          ref={vidRef}
          src={video}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', opacity: 0, transition: 'opacity .3s ease', pointerEvents: 'none',
          }}
        />
      )}
    </div>
  );
}
