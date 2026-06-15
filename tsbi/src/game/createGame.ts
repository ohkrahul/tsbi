import Phaser from 'phaser';
import { BootScene } from './scenes/BootScene';
import { PreloadScene } from './scenes/PreloadScene';
import { EntryScene } from './scenes/EntryScene';
import { FallScene } from './scenes/FallScene';
import { LandingScene } from './scenes/LandingScene';
import { MapScene } from './scenes/MapScene';
import { CompleteScene } from './scenes/CompleteScene';

/**
 * Builds the Phaser game. Called only from <GameCanvas> via a dynamic
 * `import()` inside useEffect, so Phaser is never evaluated on the server.
 *
 * RESIZE scale mode makes the canvas track the parent element's size (the
 * full-viewport stage), so the world is responsive on desktop and mobile.
 */
export function createGame(parent: HTMLElement): Phaser.Game {
  return new Phaser.Game({
    type: Phaser.AUTO,
    parent,
    backgroundColor: '#12002f',
    scale: {
      mode: Phaser.Scale.RESIZE,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: '100%',
      height: '100%',
    },
    render: { antialias: true, pixelArt: false },
    fps: { target: 60, min: 30 },
    scene: [BootScene, PreloadScene, EntryScene, FallScene, LandingScene, MapScene, CompleteScene],
  });
}
