import Phaser from 'phaser';
import { generateTextures } from '@/game/factory';

/**
 * PreloadScene — no external assets exist for this project, so instead of
 * `this.load.image(...)` we generate every texture procedurally (soft glow +
 * sparkle) here, then start the entry scene.
 */
export class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload() {
    // The explorer avatar (cartoon founder). If it 404s, createAvatar falls
    // back to a drawn figure, so the game still runs.
    this.load.image('avatar', '/mario/user.png');
  }

  create() {
    generateTextures(this);
    this.scene.start('EntryScene');
  }
}
