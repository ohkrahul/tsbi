import Phaser from 'phaser';
import { audio } from '@/game/audio';
import { drawDesertBackdrop, createAvatar, sandWave, type AvatarObject } from '@/game/factory';
import { WORLD_WIDTH, WORLD_HEIGHT, TRAIL_Y } from '@/game/data/milestones';

/**
 * LandingScene — the impact moment: the avatar lands in a crouch, sand-wave
 * rings ripple outward, dust bursts, and the camera shakes softly. Then it
 * hands off to the interactive MapScene (which announces "landed").
 */
export class LandingScene extends Phaser.Scene {
  private avatar!: AvatarObject;

  constructor() {
    super('LandingScene');
  }

  create() {
    const reduced = !!this.registry.get('reducedMotion');
    drawDesertBackdrop(this, WORLD_WIDTH, WORLD_HEIGHT, { theme: 'desert', stars: true });

    const landX = WORLD_WIDTH * 0.2;
    const landY = TRAIL_Y;

    const cam = this.cameras.main;
    cam.centerOn(landX, landY - 80);
    cam.fadeIn(200, 12, 0, 30);

    this.avatar = createAvatar(this, landX, landY);
    this.avatar.setPose('land');

    audio.play('landing');
    sandWave(this, landX, landY, reduced);
    if (!reduced) cam.shake(280, 0.008);

    // Settle to idle, then continue to the map.
    this.time.delayedCall(900, () => this.avatar.setPose('idle'));
    this.time.delayedCall(1500, () => {
      cam.fadeOut(350, 12, 0, 30);
      cam.once('camerafadeoutcomplete', () => this.scene.start('MapScene'));
    });
  }
}
