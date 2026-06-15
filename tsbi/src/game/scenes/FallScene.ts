import Phaser from 'phaser';
import { bus } from '@/game/bus';
import { audio } from '@/game/audio';
import { drawDesertBackdrop, createAvatar, PALETTE, type AvatarObject } from '@/game/factory';
import { WORLD_WIDTH, WORLD_HEIGHT, TRAIL_Y } from '@/game/data/milestones';

/**
 * FallScene — the avatar falls from the sky into the desert with a glowing
 * golden/magenta trail while the camera zooms toward the landing point. Wind
 * plays via Howler. Honors `cmd:skip` (jump straight to the map).
 */
export class FallScene extends Phaser.Scene {
  private avatar!: AvatarObject;
  private trail?: Phaser.GameObjects.Particles.ParticleEmitter;
  private skipped = false;

  constructor() {
    super('FallScene');
  }

  create() {
    const reduced = !!this.registry.get('reducedMotion');
    drawDesertBackdrop(this, WORLD_WIDTH, WORLD_HEIGHT, { theme: 'desert', stars: true });

    const landX = WORLD_WIDTH * 0.2;
    const landY = TRAIL_Y;

    const cam = this.cameras.main;
    cam.centerOn(landX, landY - 120);
    cam.fadeIn(400, 12, 0, 30);

    this.avatar = createAvatar(this, landX, landY - 560);
    this.avatar.setPose('fall');

    // Glowing fall trail that follows the avatar.
    this.trail = this.add.particles(0, 0, 'glow', {
      lifespan: 520,
      speedY: { min: -20, max: 30 },
      speedX: { min: -12, max: 12 },
      scale: { start: 0.6, end: 0 },
      alpha: { start: 0.85, end: 0 },
      tint: [PALETTE.gold, PALETTE.magenta, PALETTE.hotPink],
      blendMode: Phaser.BlendModes.ADD,
      frequency: 22,
    });
    this.trail.setDepth(50);
    this.trail.startFollow(this.avatar, 0, -34);

    audio.play('wind');

    const duration = reduced ? 1200 : 2200;
    if (!reduced) {
      this.tweens.add({ targets: cam, zoom: 1.14, duration, ease: 'Sine.easeIn' });
    }

    this.tweens.add({
      targets: this.avatar,
      y: landY,
      duration,
      ease: 'Cubic.easeIn',
      onComplete: () => this.land(),
    });

    const offSkip = bus.on('cmd:skip', () => this.skip());
    this.events.once('shutdown', () => offSkip());
  }

  private land() {
    if (this.skipped) return;
    audio.stop('wind');
    this.trail?.stop();
    this.scene.start('LandingScene');
  }

  private skip() {
    if (this.skipped) return;
    this.skipped = true;
    audio.stop('wind');
    this.tweens.killAll();
    const cam = this.cameras.main;
    cam.fadeOut(250, 12, 0, 30);
    cam.once('camerafadeoutcomplete', () => this.scene.start('MapScene'));
  }
}
