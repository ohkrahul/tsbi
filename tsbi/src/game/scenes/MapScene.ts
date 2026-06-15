import Phaser from 'phaser';
import { bus } from '@/game/bus';
import {
  drawDesertBackdrop,
  driftingSand,
  drawTrail,
  createMarker,
  createAvatar,
  type AvatarObject,
  type MarkerObject,
  type TrailObject,
} from '@/game/factory';
import { WORLD_WIDTH, WORLD_HEIGHT, milestones, LAST_INDEX } from '@/game/data/milestones';

/**
 * MapScene — the persistent, interactive treasure map.
 *
 * Owns the avatar, the milestone markers, the dotted trail and the follow
 * camera. It listens for `cmd:goto` / `cmd:complete` / `cmd:restart` from the
 * store and emits `game:landed`, `game:arrived`, `game:locked` and
 * `game:complete` back. The store keeps the React overlays in sync from those.
 */
export class MapScene extends Phaser.Scene {
  private avatar!: AvatarObject;
  private markers: MarkerObject[] = [];
  private trail!: TrailObject;

  private currentIndex = 0;
  private unlockedMax = 0;
  private moving = false;

  constructor() {
    super('MapScene');
  }

  create() {
    const reduced = !!this.registry.get('reducedMotion');

    drawDesertBackdrop(this, WORLD_WIDTH, WORLD_HEIGHT, { theme: 'desert', stars: true, decorations: true });
    driftingSand(this, WORLD_WIDTH, WORLD_HEIGHT, reduced);

    // Trail under the markers.
    this.trail = drawTrail(this, milestones.map((m) => m.position));

    // Markers.
    this.markers = milestones.map((m, i) =>
      createMarker(this, {
        x: m.position.x,
        y: m.position.y,
        index: i,
        year: m.year,
        onClick: (idx) => this.handleMarkerClick(idx),
      }),
    );

    // Avatar at the first milestone.
    const start = milestones[0].position;
    this.avatar = createAvatar(this, start.x, start.y);

    // Camera follows the avatar within world bounds.
    const cam = this.cameras.main;
    cam.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
    cam.startFollow(this.avatar, true, 0.09, 0.09);
    cam.setDeadzone(this.scale.width * 0.3, this.scale.height * 0.55);
    cam.centerOn(start.x, start.y);
    cam.fadeIn(350, 12, 0, 30);

    this.currentIndex = 0;
    this.unlockedMax = 0;
    this.refreshMarkers();
    this.trail.lightUpTo(0);

    // Announce landing + first milestone (slight delay lets the camera settle).
    this.time.delayedCall(350, () => {
      bus.emit('game:landed', undefined);
      bus.emit('game:arrived', 0);
    });

    // ── command listeners ──
    const offGoto = bus.on('cmd:goto', (target) => this.gotoMilestone(target));
    const offComplete = bus.on('cmd:complete', () => this.completeJourney());
    const offRestart = bus.on('cmd:restart', () => this.scene.start('EntryScene'));
    const offReduced = bus.on('cmd:reducedMotion', (v) => this.registry.set('reducedMotion', v));

    this.events.once('shutdown', () => {
      offGoto();
      offComplete();
      offRestart();
      offReduced();
    });

    // Keep the deadzone sensible across viewport resizes.
    this.scale.on('resize', this.onResize, this);
    this.events.once('shutdown', () => this.scale.off('resize', this.onResize, this));
  }

  private onResize() {
    this.cameras.main.setDeadzone(this.scale.width * 0.3, this.scale.height * 0.55);
  }

  private refreshMarkers() {
    this.markers.forEach((m, i) => {
      if (i < this.currentIndex) m.setMarkerState('complete');
      else if (i === this.currentIndex) m.setMarkerState('active');
      else m.setMarkerState(i <= this.unlockedMax ? 'complete' : 'locked');
    });
  }

  private handleMarkerClick(index: number) {
    // The next-to-unlock marker and any already-reached marker are clickable;
    // anything further is locked.
    if (index <= this.unlockedMax + 1) this.gotoMilestone(index);
    else {
      bus.emit('game:locked', index);
      this.shakeMarker(index);
    }
  }

  private shakeMarker(index: number) {
    const m = this.markers[index];
    if (!m) return;
    this.tweens.add({ targets: m, x: m.x + 4, duration: 60, yoyo: true, repeat: 3 });
  }

  private gotoMilestone(target: number) {
    if (this.moving) return;
    if (target < 0 || target > LAST_INDEX) return;
    if (target > this.unlockedMax + 1) {
      bus.emit('game:locked', target);
      this.shakeMarker(target);
      return;
    }

    const p = milestones[target].position;
    const dist = Phaser.Math.Distance.Between(this.avatar.x, this.avatar.y, p.x, p.y);

    // Re-opening the current milestone — no walk needed.
    if (dist < 3) {
      this.currentIndex = target;
      this.refreshMarkers();
      bus.emit('game:arrived', target);
      return;
    }

    this.moving = true;
    const duration = Phaser.Math.Clamp(dist * 1.7, 350, 1700);
    this.avatar.walkTo(p.x, p.y, duration, () => {
      this.moving = false;
      this.currentIndex = target;
      this.unlockedMax = Math.max(this.unlockedMax, target);
      this.refreshMarkers();
      this.trail.lightUpTo(this.unlockedMax);
      bus.emit('game:arrived', target);
    });
  }

  private completeJourney() {
    const cam = this.cameras.main;
    cam.fadeOut(700, 18, 0, 47);
    cam.once('camerafadeoutcomplete', () => {
      bus.emit('game:complete', undefined);
      this.scene.start('CompleteScene');
    });
  }
}
