import Phaser from 'phaser';
import { bus } from '@/game/bus';
import { drawDesertBackdrop, driftingSand } from '@/game/factory';
import { WORLD_WIDTH, WORLD_HEIGHT } from '@/game/data/milestones';

/**
 * EntryScene — the cinematic "mood" backdrop behind the React entry overlay
 * (title / subtitle / CTA). The world canvas shows the purple twilight desert,
 * stars, a distant silhouette and drifting sand. It waits for `cmd:start`
 * (fired by the store when the user clicks "Enter the Journey") and then fades
 * out into the fall sequence.
 */
export class EntryScene extends Phaser.Scene {
  constructor() {
    super('EntryScene');
  }

  create() {
    const reduced = !!this.registry.get('reducedMotion');

    drawDesertBackdrop(this, WORLD_WIDTH, WORLD_HEIGHT, { silhouette: true, stars: true });
    driftingSand(this, WORLD_WIDTH, WORLD_HEIGHT, reduced);

    const cam = this.cameras.main;
    cam.centerOn(WORLD_WIDTH * 0.28, WORLD_HEIGHT * 0.46);
    cam.fadeIn(700, 18, 0, 47);

    // Subtle continuous drift on the camera for life (disabled w/ reduced motion).
    if (!reduced) {
      this.tweens.add({
        targets: cam,
        scrollX: cam.scrollX + 40,
        duration: 9000,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
      });
    }

    bus.emit('game:ready', undefined);

    const start = () => this.beginFall();
    const offStart = bus.on('cmd:start', start);
    this.events.once('shutdown', () => offStart());
  }

  private beginFall() {
    const cam = this.cameras.main;
    cam.fadeOut(550, 12, 0, 30);
    cam.once('camerafadeoutcomplete', () => this.scene.start('FallScene'));
  }
}
