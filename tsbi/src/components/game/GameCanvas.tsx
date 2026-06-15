'use client';

import { useEffect, useRef } from 'react';
import type * as Phaser from 'phaser';
import { bus } from '@/game/bus';
import { audio } from '@/game/audio';
import { useJourneyGameStore } from '@/store/useJourneyGameStore';

/**
 * GameCanvas — mounts the Phaser game and bridges it to React.
 *
 * Phaser (and the whole scene graph) is loaded with a dynamic `import()` inside
 * the effect so it never runs on the server. This component:
 *  - maps Phaser `game:*` events onto the Zustand store,
 *  - mirrors the store's `reducedMotion` flag into the Phaser registry,
 *  - pauses the render loop + music when the canvas scrolls offscreen,
 *  - and tears everything down on unmount (no leaks).
 */
export default function GameCanvas() {
  const hostRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let cancelled = false;
    const offs: Array<() => void> = [];

    // Respect OS-level reduced motion on first load.
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      useJourneyGameStore.getState().toggleReducedMotion(true);
    }

    // Prepare synthesized audio (safe to call repeatedly).
    audio.init();

    // Phaser -> store wiring.
    const s = () => useJourneyGameStore.getState();
    offs.push(bus.on('game:ready', () => s().onReady()));
    offs.push(bus.on('game:landed', () => s().onLanded()));
    offs.push(bus.on('game:arrived', (i) => s().onArrived(i)));
    offs.push(bus.on('game:locked', (i) => s().onLocked(i)));
    offs.push(bus.on('game:complete', () => s().onComplete()));

    (async () => {
      const { createGame } = await import('@/game/createGame');
      if (cancelled) return;
      const game = createGame(host);
      gameRef.current = game;
      game.registry.set('reducedMotion', s().reducedMotion);

      // Keep the Phaser registry in sync with the reduced-motion setting.
      const unsub = useJourneyGameStore.subscribe((st) =>
        gameRef.current?.registry.set('reducedMotion', st.reducedMotion),
      );
      offs.push(unsub);
    })();

    // Pause the loop + music when the game is scrolled out of view.
    const io = new IntersectionObserver(
      ([entry]) => {
        const g = gameRef.current;
        if (!g) return;
        if (entry.isIntersecting) {
          g.loop.wake();
          if (useJourneyGameStore.getState().musicEnabled) audio.startMusic();
        } else {
          g.loop.sleep();
          audio.stopMusic();
        }
      },
      { threshold: 0.1 },
    );
    io.observe(host);

    return () => {
      cancelled = true;
      io.disconnect();
      offs.forEach((off) => off());
      audio.stopMusic();
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
  }, []);

  return <div ref={hostRef} className="journey-canvas" aria-hidden="true" />;
}
