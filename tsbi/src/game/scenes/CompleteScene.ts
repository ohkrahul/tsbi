import Phaser from 'phaser';
import { bus } from '@/game/bus';
import { drawDesertBackdrop, createAvatar, celebrate, PALETTE, type AvatarObject } from '@/game/factory';
import { WORLD_WIDTH, WORLD_HEIGHT, TRAIL_Y } from '@/game/data/milestones';

/**
 * CompleteScene — the final vista behind the React "Journey Complete" overlay:
 * a sunrise glow over the dunes, an ancient gate, a waving TSBI flag, the
 * explorer on a hill, and a subtle star/sand-sparkle celebration.
 */
export class CompleteScene extends Phaser.Scene {
  private avatar!: AvatarObject;

  constructor() {
    super('CompleteScene');
  }

  create() {
    const reduced = !!this.registry.get('reducedMotion');
    drawDesertBackdrop(this, WORLD_WIDTH, WORLD_HEIGHT, { theme: 'desert', stars: true });

    const cx = WORLD_WIDTH * 0.5;
    const horizon = TRAIL_Y + 30;

    const cam = this.cameras.main;
    cam.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
    cam.centerOn(cx, horizon - 80);
    cam.fadeIn(700, 18, 0, 47);
    if (!reduced) this.tweens.add({ targets: cam, zoom: { from: 1.15, to: 1 }, duration: 2600, ease: 'Sine.easeOut' });

    // Rising sun behind the dunes.
    const sun = this.add.image(cx, horizon - 10, 'glow').setScale(11).setTint(PALETTE.gold).setAlpha(0.5).setBlendMode(Phaser.BlendModes.ADD).setDepth(-55);
    this.tweens.add({ targets: sun, alpha: { from: 0.35, to: 0.6 }, scale: { from: 10, to: 12 }, duration: 3000, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });

    // Ancient gate.
    const gate = this.add.graphics().setDepth(40);
    gate.fillStyle(0x1c1130, 1);
    gate.fillRect(cx - 70, horizon - 130, 22, 130);
    gate.fillRect(cx + 48, horizon - 130, 22, 130);
    gate.fillRect(cx - 78, horizon - 142, 156, 18);

    // Treasure glow inside the gate.
    const chest = this.add.image(cx, horizon - 28, 'glow').setScale(2.4).setTint(PALETTE.hotPink).setAlpha(0.7).setBlendMode(Phaser.BlendModes.ADD).setDepth(41);
    this.tweens.add({ targets: chest, alpha: { from: 0.5, to: 0.9 }, duration: 1400, yoyo: true, repeat: -1 });

    // Hill + explorer.
    const hill = this.add.graphics().setDepth(45);
    hill.fillStyle(PALETTE.duneFront, 1);
    hill.fillEllipse(cx, horizon + 60, 360, 120);

    this.avatar = createAvatar(this, cx, horizon);
    this.avatar.setScale(1.1);

    // Waving TSBI flag — the flag graphic is anchored at the pole so scaleX
    // animates the wave from the correct pivot.
    const pole = this.add.graphics().setDepth(46);
    pole.fillStyle(0x2a2140, 1);
    pole.fillRect(cx + 38, horizon - 96, 4, 96);
    const flag = this.add.graphics({ x: cx + 42, y: horizon - 96 }).setDepth(46);
    flag.fillStyle(PALETTE.magenta, 1);
    flag.fillTriangle(0, 0, 0, 32, 44, 16);
    if (!reduced)
      this.tweens.add({ targets: flag, scaleX: { from: 1, to: 0.82 }, duration: 700, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });

    if (!reduced) celebrate(this, this.scale.width / 2, this.scale.height * 0.2, reduced);

    const offRestart = bus.on('cmd:restart', () => this.scene.start('EntryScene'));
    this.events.once('shutdown', () => offRestart());
  }
}
