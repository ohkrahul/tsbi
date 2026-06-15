import Phaser from 'phaser';

/**
 * BootScene — minimal bootstrap. Scale/render config is set on the game
 * instance in `createGame`; here we simply hand off to the preloader.
 */
export class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  create() {
    this.scene.start('PreloadScene');
  }
}
