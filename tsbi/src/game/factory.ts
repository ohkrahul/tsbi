/**
 * Procedural art factory.
 *
 * The world is drawn at runtime with Phaser Graphics + Canvas textures to match
 * the storyboard's warm "treasure-map" look: a sunset desert with golden sand,
 * palm trees, oasis, ruins, a dashed signpost trail and particle effects. The
 * explorer avatar uses the real `user.png` sprite (with a drawn fallback).
 *
 * Only ever reached through the dynamic `import()` in <GameCanvas>, so importing
 * Phaser at module scope here is safe — it never runs on the server.
 */

import Phaser from 'phaser';

/* ── Palette ────────────────────────────────────────────────────────────── */
export const PALETTE = {
  // night (entry) sky
  skyTop: 0x12002f,
  skyLow: 0x2c1147,
  // sunset (map) sky
  sunsetTop: 0x32104f,
  sunsetMid: 0x7a2350,
  sunsetLow: 0xe6a04a,
  // desert dunes / ground
  duneBack: 0xb67c3e,
  duneMid: 0xd9a85e,
  sandLight: 0xe9c78e,
  duneFront: 0x7a5230,
  groundDark: 0x5e3d1e,
  // accents
  gold: 0xf7b84b,
  sand: 0xe9c78e,
  parchment: 0xf7e6c4,
  magenta: 0xe0197d,
  hotPink: 0xff4fa3,
  ink: 0x16103a,
  wood: 0x6b4a2a,
  woodDark: 0x4a3318,
  muted: 0x7a5a3a,
  oasis: 0x2f8f8c,
  white: 0xffffff,
};

const ADD = Phaser.BlendModes.ADD;
const rand = (min: number, max: number) => min + Math.random() * (max - min);

export type DesertTheme = 'night' | 'desert';

/* ── Generated textures ────────────────────────────────────────────────── */

export function generateTextures(scene: Phaser.Scene) {
  if (!scene.textures.exists('glow')) {
    const size = 64;
    const tex = scene.textures.createCanvas('glow', size, size);
    const ctx = tex?.getContext();
    if (ctx) {
      const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      g.addColorStop(0, 'rgba(255,255,255,1)');
      g.addColorStop(0.35, 'rgba(255,255,255,0.55)');
      g.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, size, size);
      tex?.refresh();
    }
  }

  if (!scene.textures.exists('spark')) {
    const size = 32;
    const tex = scene.textures.createCanvas('spark', size, size);
    const ctx = tex?.getContext();
    if (ctx) {
      ctx.translate(size / 2, size / 2);
      ctx.fillStyle = 'rgba(255,255,255,0.95)';
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        const a = (i / 4) * Math.PI * 2;
        ctx.lineTo(Math.cos(a) * 14, Math.sin(a) * 14);
        ctx.lineTo(Math.cos(a + Math.PI / 4) * 3.5, Math.sin(a + Math.PI / 4) * 3.5);
      }
      ctx.closePath();
      ctx.fill();
      tex?.refresh();
    }
  }
}

/* ── Layered desert backdrop ───────────────────────────────────────────── */

export interface Backdrop {
  layers: Phaser.GameObjects.GameObject[];
}

export function drawDesertBackdrop(
  scene: Phaser.Scene,
  width: number,
  height: number,
  opts: { theme?: DesertTheme; silhouette?: boolean; stars?: boolean; decorations?: boolean } = {},
): Backdrop {
  const theme = opts.theme ?? 'night';
  const desert = theme === 'desert';
  const layers: Phaser.GameObjects.GameObject[] = [];
  const W = width * 1.5;

  // Sky.
  const sky = scene.add.graphics();
  if (desert) {
    sky.fillGradientStyle(PALETTE.sunsetTop, PALETTE.sunsetTop, PALETTE.sunsetMid, PALETTE.sunsetMid, 1);
    sky.fillRect(0, 0, width, height * 0.62);
    sky.fillGradientStyle(PALETTE.sunsetMid, PALETTE.sunsetMid, PALETTE.sunsetLow, PALETTE.sunsetLow, 1);
    sky.fillRect(0, height * 0.62 - 1, width, height * 0.2);
  } else {
    sky.fillGradientStyle(PALETTE.skyTop, PALETTE.skyTop, PALETTE.skyLow, PALETTE.skyLow, 1);
    sky.fillRect(0, 0, width, height);
  }
  sky.setScrollFactor(0).setDepth(-100);
  layers.push(sky);

  // Sun / moon glow.
  const orb = scene.add.image(width * (desert ? 0.5 : 0.78), height * (desert ? 0.42 : 0.16), 'glow');
  orb
    .setScale(desert ? 7 : 3.2)
    .setTint(desert ? PALETTE.gold : 0xf3e9ff)
    .setAlpha(desert ? 0.55 : 0.5)
    .setScrollFactor(desert ? 0.15 : 0.1)
    .setDepth(-94)
    .setBlendMode(ADD);
  layers.push(orb);

  // Stars (mostly in the upper sky).
  if (opts.stars !== false) {
    const stars = scene.add.graphics().setScrollFactor(0.1).setDepth(-95);
    for (let i = 0; i < (desert ? 70 : 140); i++) {
      stars.fillStyle(PALETTE.white, rand(0.12, 0.6));
      stars.fillCircle(rand(0, W), rand(0, height * (desert ? 0.4 : 0.55)), rand(0.5, 1.5));
    }
    layers.push(stars);
  }

  // Distant agency silhouette (entry mood).
  if (opts.silhouette) {
    const sil = scene.add.graphics().setScrollFactor(0.2).setDepth(-90);
    sil.fillStyle(0x0d0626, 0.85);
    const baseY = height * 0.62;
    sil.fillRect(width * 0.1, baseY - 60, 46, 60);
    sil.fillRect(width * 0.1 + 50, baseY - 96, 34, 96);
    sil.fillTriangle(width * 0.1 + 50, baseY - 96, width * 0.1 + 67, baseY - 124, width * 0.1 + 84, baseY - 96);
    layers.push(sil);
  }

  // Dune layers.
  const dune = (baseY: number, amp: number, color: number, sf: number, depth: number) => {
    const g = scene.add.graphics().setScrollFactor(sf).setDepth(depth);
    g.fillStyle(color, 1);
    g.beginPath();
    g.moveTo(0, height);
    for (let x = 0; x <= W; x += 24) {
      const y = baseY + Math.sin(x * 0.004 + baseY) * amp + Math.sin(x * 0.013) * (amp * 0.4);
      g.lineTo(x, y);
    }
    g.lineTo(W, height);
    g.closePath();
    g.fillPath();
    layers.push(g);
  };

  if (desert) {
    dune(height * 0.56, 30, PALETTE.duneBack, 0.3, -80);
    dune(height * 0.66, 40, PALETTE.duneMid, 0.5, -70);
    // Main sand playfield (where the trail lives).
    const ground = scene.add.graphics().setDepth(-65);
    ground.fillStyle(PALETTE.sandLight, 1);
    ground.fillRect(0, height * 0.7, W, height * 0.3);
    layers.push(ground);
    dune(height * 0.86, 46, PALETTE.duneFront, 0.78, -58);
  } else {
    dune(height * 0.58, 36, PALETTE.duneBack, 0.3, -80);
    dune(height * 0.68, 48, PALETTE.skyLow, 0.5, -70);
    dune(height * 0.78, 60, 0x7a5230, 0.75, -60);
  }

  if (desert && opts.decorations) drawDecorations(scene, width, height, layers);

  return { layers };
}

/** Palm trees, oasis, ruins + rocks scattered across the desert. */
function drawDecorations(
  scene: Phaser.Scene,
  width: number,
  height: number,
  layers: Phaser.GameObjects.GameObject[],
) {
  const reduced = !!scene.registry.get('reducedMotion');

  const palm = (x: number, y: number, scale: number, depth: number) => {
    const c = scene.add.container(x, y).setDepth(depth);
    const trunk = scene.add.graphics();
    trunk.fillStyle(PALETTE.woodDark, 1);
    trunk.fillRoundedRect(-4, -70, 8, 70, 3);
    const fronds = scene.add.graphics();
    fronds.fillStyle(0x2f6b3a, 1);
    for (let i = 0; i < 6; i++) {
      const a = (-Math.PI / 2) + (i - 2.5) * 0.5;
      const fx = Math.cos(a) * 40;
      const fy = Math.sin(a) * 30 - 68;
      fronds.fillTriangle(0, -70, fx, fy, fx * 0.5, fy + 8);
    }
    c.add([trunk, fronds]);
    c.setScale(scale);
    if (!reduced) scene.tweens.add({ targets: fronds, angle: 3, duration: 2600, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
    layers.push(c);
  };

  const oasis = (x: number, y: number, depth: number) => {
    const g = scene.add.graphics().setDepth(depth);
    g.fillStyle(0x123b3b, 1);
    g.fillEllipse(x, y, 130, 36);
    g.fillStyle(PALETTE.oasis, 1);
    g.fillEllipse(x, y - 3, 116, 28);
    g.fillStyle(0x6fd0c4, 0.5);
    g.fillEllipse(x - 18, y - 6, 40, 9);
    layers.push(g);
  };

  const ruins = (x: number, y: number, depth: number) => {
    const g = scene.add.graphics().setDepth(depth);
    g.fillStyle(0xa07f4c, 1);
    g.fillRect(x, y - 54, 14, 54);
    g.fillRect(x + 26, y - 38, 14, 38);
    g.fillRect(x - 6, y - 60, 52, 9);
    layers.push(g);
  };

  const rock = (x: number, y: number, s: number, depth: number) => {
    const g = scene.add.graphics().setDepth(depth);
    g.fillStyle(PALETTE.groundDark, 1);
    g.fillEllipse(x, y, 46 * s, 22 * s);
    layers.push(g);
  };

  const gy = height * 0.72;
  palm(width * 0.36, gy + 14, 0.95, 8);
  palm(width * 0.37, gy + 8, 0.7, 6);
  palm(width * 0.86, gy + 18, 1.05, 9);
  oasis(width * 0.62, gy + 64, 7);
  palm(width * 0.66, gy + 30, 0.9, 8);
  ruins(width * 0.12, gy + 30, 7);
  ruins(width * 0.98, gy + 24, 7);
  rock(width * 0.5, gy + 96, 1.1, 30);
  rock(width * 0.22, gy + 84, 0.8, 30);
  rock(width * 0.78, gy + 100, 1, 30);
}

/** Continuous drifting sand particles for atmosphere. */
export function driftingSand(scene: Phaser.Scene, width: number, height: number, reduced = false) {
  const emitter = scene.add.particles(0, 0, 'glow', {
    x: { min: 0, max: width },
    y: { min: 0, max: height },
    quantity: reduced ? 1 : 2,
    frequency: reduced ? 600 : 260,
    lifespan: { min: 4000, max: 8000 },
    speedX: { min: -16, max: -4 },
    speedY: { min: -6, max: 6 },
    scale: { start: 0.1, end: 0 },
    alpha: { start: 0.4, end: 0 },
    tint: PALETTE.parchment,
    blendMode: ADD,
  });
  emitter.setScrollFactor(0.3).setDepth(-50);
  return emitter;
}

/* ── Avatar (real sprite, with drawn fallback) ─────────────────────────── */

export interface AvatarObject extends Phaser.GameObjects.Container {
  setPose: (pose: 'idle' | 'fall' | 'run' | 'land') => void;
  walkTo: (x: number, y: number, duration: number, onDone: () => void) => void;
  rig: Phaser.GameObjects.GameObject;
}

export function createAvatar(scene: Phaser.Scene, x: number, y: number): AvatarObject {
  const container = scene.add.container(x, y) as AvatarObject;

  // Soft ground shadow + glow.
  const shadow = scene.add.ellipse(0, 2, 70, 18, 0x000000, 0.32);
  const halo = scene.add.image(0, -42, 'glow').setScale(1.5).setTint(PALETTE.gold).setAlpha(0.22).setBlendMode(ADD);

  let rig: Phaser.GameObjects.GameObject;

  if (scene.textures.exists('avatar')) {
    const sprite = scene.add.image(0, 0, 'avatar').setOrigin(0.5, 0.95);
    const sc = 118 / sprite.height; // normalise to ~118px tall
    sprite.setScale(sc);
    rig = sprite;
    container.add([halo, shadow, sprite]);
  } else {
    // Fallback: drawn hooded explorer.
    const fig = scene.add.graphics();
    fig.fillStyle(PALETTE.magenta, 0.95);
    fig.fillTriangle(-2, -50, -20, -6, 8, -12);
    fig.fillStyle(PALETTE.ink, 1);
    fig.fillRoundedRect(-11, -52, 24, 40, 9);
    fig.fillStyle(0xead7a8, 1);
    fig.fillCircle(2, -60, 11);
    rig = fig;
    container.add([halo, shadow, fig]);
  }

  container.rig = rig;
  container.setDepth(60);

  const isImage = scene.textures.exists('avatar');
  // Both Image and Graphics expose y / setScale / setRotation at runtime;
  // setFlipX only exists on Image, so it's guarded behind `isImage`.
  const t = rig as Phaser.GameObjects.Image;
  const base = isImage ? t.scaleX : 1;

  let poseTween: Phaser.Tweens.Tween | null = null;
  const clearPose = () => {
    poseTween?.remove();
    poseTween = null;
    scene.tweens.killTweensOf(rig);
  };

  container.setPose = (pose) => {
    clearPose();
    t.setRotation(0);
    t.y = 0;
    t.setScale(base);
    if (pose === 'idle') {
      poseTween = scene.tweens.add({ targets: rig, y: -6, duration: 1300, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
    } else if (pose === 'run') {
      poseTween = scene.tweens.add({ targets: rig, y: -10, duration: 220, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
    } else if (pose === 'fall') {
      poseTween = scene.tweens.add({ targets: rig, angle: { from: -8, to: 8 }, duration: 700, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
    } else if (pose === 'land') {
      t.setScale(base * 1.12, base * 0.7);
      poseTween = scene.tweens.add({ targets: rig, scaleX: base, scaleY: base, duration: 600, ease: 'Elastic.easeOut' });
    }
  };

  let lastDust = 0;
  container.walkTo = (tx, ty, duration, onDone) => {
    // Face the direction of travel (sprite faces right by default).
    const dir = tx < container.x ? -1 : 1;
    if (isImage) t.setFlipX(dir < 0);
    container.setPose('run');
    scene.tweens.add({
      targets: container,
      x: tx,
      y: ty,
      duration,
      ease: 'Sine.easeInOut',
      onUpdate: () => {
        const now = scene.time.now;
        if (now - lastDust > 120) {
          lastDust = now;
          dustPuff(scene, container.x - dir * 14, container.y);
        }
      },
      onComplete: () => {
        container.setPose('idle');
        onDone();
      },
    });
  };

  container.setPose('idle');
  return container;
}

/* ── Signpost markers ──────────────────────────────────────────────────── */

export type MarkerState = 'locked' | 'active' | 'complete';

export interface MarkerObject extends Phaser.GameObjects.Container {
  setMarkerState: (state: MarkerState) => void;
}

export function createMarker(
  scene: Phaser.Scene,
  opts: { x: number; y: number; index: number; year: number; onClick: (index: number) => void },
): MarkerObject {
  const { x, y, index, year, onClick } = opts;
  const container = scene.add.container(x, y) as MarkerObject;

  const glow = scene.add.image(0, -34, 'glow').setScale(1.3).setTint(PALETTE.magenta).setAlpha(0).setBlendMode(ADD);

  // Sandy mound + wooden post.
  const base = scene.add.graphics();
  base.fillStyle(PALETTE.groundDark, 0.5);
  base.fillEllipse(0, 2, 44, 14);
  base.fillStyle(PALETTE.wood, 1);
  base.fillRect(-3, -46, 6, 46);
  base.fillStyle(PALETTE.woodDark, 1);
  base.fillRect(-3, -46, 6, 4);

  // Pennant flag (recoloured per state).
  const flag = scene.add.graphics();
  const drawFlag = (color: number) => {
    flag.clear();
    flag.fillStyle(color, 1);
    flag.fillTriangle(3, -46, 3, -28, 34, -37);
  };
  drawFlag(PALETTE.muted);

  const lock = scene.add.graphics();
  lock.fillStyle(0xf0e6cf, 1);
  lock.fillRoundedRect(-7, -40, 14, 11, 2);
  lock.lineStyle(2.4, 0xf0e6cf, 1);
  lock.strokeCircle(0, -40, 5);

  const star = scene.add.image(3, -50, 'spark').setScale(0).setTint(PALETTE.gold).setBlendMode(ADD);

  const label = scene.add
    .text(0, 14, String(year), {
      fontFamily: 'Space Grotesk, sans-serif',
      fontSize: '13px',
      fontStyle: 'bold',
      color: '#5a3d1e',
    })
    .setOrigin(0.5)
    .setResolution(2);

  container.add([glow, base, flag, lock, star, label]);
  container.setSize(56, 80);
  container.setInteractive({
    hitArea: new Phaser.Geom.Rectangle(-28, -52, 56, 74),
    hitAreaCallback: Phaser.Geom.Rectangle.Contains,
    useHandCursor: true,
  });
  container.on('pointerdown', () => onClick(index));
  container.on('pointerover', () => scene.tweens.add({ targets: container, scale: 1.08, duration: 150 }));
  container.on('pointerout', () => scene.tweens.add({ targets: container, scale: 1, duration: 150 }));

  let pulse: Phaser.Tweens.Tween | null = null;
  let sparkle: Phaser.Tweens.Tween | null = null;

  container.setMarkerState = (state) => {
    pulse?.remove();
    pulse = null;
    sparkle?.remove();
    sparkle = null;
    scene.tweens.killTweensOf(glow);

    if (state === 'locked') {
      drawFlag(PALETTE.muted);
      glow.setAlpha(0);
      lock.setVisible(true);
      star.setScale(0);
      label.setColor('#6a4a26');
    } else if (state === 'active') {
      drawFlag(PALETTE.magenta);
      glow.setTint(PALETTE.magenta).setScale(1.2).setAlpha(0.4);
      lock.setVisible(false);
      star.setScale(0);
      label.setColor('#c4135f');
      pulse = scene.tweens.add({
        targets: glow,
        alpha: { from: 0.3, to: 0.62 },
        scale: { from: 1.1, to: 1.6 },
        duration: 1100,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
      });
    } else {
      drawFlag(PALETTE.gold);
      glow.setTint(PALETTE.gold).setScale(1.2).setAlpha(0.38);
      lock.setVisible(false);
      label.setColor('#9a6a1e');
      star.setScale(0.85);
      sparkle = scene.tweens.add({ targets: star, angle: 360, alpha: { from: 0.7, to: 1 }, duration: 2600, repeat: -1, ease: 'Linear' });
    }
  };

  container.setMarkerState('locked');
  return container;
}

/* ── Dashed trail ──────────────────────────────────────────────────────── */

export interface TrailObject {
  lightUpTo: (reachedIndex: number) => void;
}

export function drawTrail(scene: Phaser.Scene, points: { x: number; y: number }[]): TrailObject {
  const segments: Phaser.GameObjects.Image[][] = [];

  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    const dist = Phaser.Math.Distance.Between(a.x, a.y, b.x, b.y);
    const count = Math.max(4, Math.floor(dist / 24));
    const dots: Phaser.GameObjects.Image[] = [];
    for (let s = 1; s < count; s++) {
      const t = s / count;
      const arc = Math.sin(t * Math.PI) * 16;
      const dot = scene.add
        .image(Phaser.Math.Linear(a.x, b.x, t), Phaser.Math.Linear(a.y, b.y, t) - arc, 'glow')
        .setScale(0.3)
        .setTint(PALETTE.woodDark)
        .setAlpha(0.55)
        .setDepth(20);
      dots.push(dot);
    }
    segments.push(dots);
  }

  return {
    lightUpTo: (reachedIndex) => {
      segments.forEach((dots, seg) => {
        const lit = seg < reachedIndex;
        dots.forEach((d) => {
          if (lit) d.setTint(PALETTE.gold).setAlpha(0.95).setScale(0.42).setBlendMode(ADD);
          else d.setTint(PALETTE.woodDark).setAlpha(0.55).setScale(0.3).setBlendMode(Phaser.BlendModes.NORMAL);
        });
      });
    },
  };
}

/* ── One-shot particle effects ─────────────────────────────────────────── */

export function dustPuff(scene: Phaser.Scene, x: number, y: number) {
  const e = scene.add.particles(x, y, 'glow', {
    speed: { min: 10, max: 42 },
    angle: { min: 200, max: 340 },
    lifespan: { min: 300, max: 620 },
    scale: { start: 0.32, end: 0 },
    alpha: { start: 0.5, end: 0 },
    tint: PALETTE.sand,
    emitting: false,
  });
  e.setDepth(55);
  e.explode(5);
  scene.time.delayedCall(700, () => e.destroy());
}

export function sandWave(scene: Phaser.Scene, x: number, y: number, reduced = false) {
  const ring = (color: number, delay: number, to: number) => {
    const c = scene.add.circle(x, y, 16, 0xffffff, 0).setStrokeStyle(3, color, 0.9).setDepth(58);
    scene.tweens.add({ targets: c, scale: to, alpha: 0, delay, duration: 950, ease: 'Cubic.easeOut', onComplete: () => c.destroy() });
  };
  ring(PALETTE.gold, 0, 9);
  if (!reduced) ring(PALETTE.magenta, 130, 7);

  const e = scene.add.particles(x, y, 'glow', {
    speed: { min: 80, max: reduced ? 140 : 230 },
    lifespan: { min: 600, max: 1200 },
    scale: { start: 0.55, end: 0 },
    alpha: { start: 0.85, end: 0 },
    tint: [PALETTE.sand, PALETTE.gold],
    blendMode: ADD,
    emitting: false,
  });
  e.setDepth(57);
  e.explode(reduced ? 14 : 28);
  scene.time.delayedCall(1300, () => e.destroy());
}

export function celebrate(scene: Phaser.Scene, x: number, y: number, reduced = false) {
  const e = scene.add.particles(x, y, 'spark', {
    x: { min: -260, max: 260 },
    speed: { min: 20, max: 90 },
    angle: { min: 230, max: 310 },
    lifespan: { min: 1400, max: 2600 },
    gravityY: 30,
    scale: { start: 0.7, end: 0 },
    alpha: { start: 1, end: 0 },
    tint: [PALETTE.gold, PALETTE.hotPink, PALETTE.parchment],
    blendMode: ADD,
    frequency: reduced ? 220 : 90,
  });
  e.setScrollFactor(0).setDepth(120);
  return e;
}
