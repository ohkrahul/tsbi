/**
 * The SmallBig Story Quest — milestone data + world geometry.
 *
 * This module is framework-agnostic (no Phaser / React imports) so it can be
 * shared safely between the Zustand store, the React overlays and the Phaser
 * scenes without dragging client-only code into the server bundle.
 */

export type MilestoneIcon =
  | 'spark'
  | 'content'
  | 'compass'
  | 'operations'
  | 'partnership'
  | 'globe';

export interface Milestone {
  year: number;
  title: string;
  description: string;
  /** Short label of the "reward" unlocked for this chapter. */
  reward: string;
  icon: MilestoneIcon;
  /** Position inside the Phaser world (see WORLD_WIDTH / WORLD_HEIGHT). */
  position: { x: number; y: number };
  /** Whether the milestone starts unlocked (only 2014 does). */
  unlocked: boolean;
}

/* ── World geometry (Phaser coordinate space) ──────────────────────────────
 * The world is wider than the viewport; the camera follows the avatar across
 * it. Markers sit on a gently winding trail so it reads like a treasure map. */
export const WORLD_WIDTH = 1840;
export const WORLD_HEIGHT = 900;

/** Baseline y the trail meanders around. */
export const TRAIL_Y = 560;

export const milestones: Milestone[] = [
  {
    year: 2014,
    title: 'The Beginning',
    description:
      'A bold idea took shape. TSBI began its journey with the vision to build digital-first brand solutions with creativity and strategy.',
    reward: 'First Spark',
    icon: 'spark',
    position: { x: 230, y: 565 },
    unlocked: true,
  },
  {
    year: 2015,
    title: 'Established Expertise',
    description:
      'Built strong expertise in social media management in the entertainment space and launched content production.',
    reward: 'Content Craft',
    icon: 'content',
    position: { x: 520, y: 495 },
    unlocked: false,
  },
  {
    year: 2016,
    title: 'Expanded Horizons',
    description:
      'Expanded capabilities, broadened categories, and began exploring larger opportunities.',
    reward: 'Explorer',
    icon: 'compass',
    position: { x: 820, y: 560 },
    unlocked: false,
  },
  {
    year: 2017,
    title: 'Scaled Operations',
    description:
      'Strengthened operations, built internal processes, and scaled the work with greater consistency and efficiency.',
    reward: 'Scale Builder',
    icon: 'operations',
    position: { x: 1120, y: 490 },
    unlocked: false,
  },
  {
    year: 2018,
    title: 'Stronger Partnerships',
    description:
      'Built stronger client relationships and long-term partnerships that deepened trust and impact.',
    reward: 'Partnership Power',
    icon: 'partnership',
    position: { x: 1420, y: 555 },
    unlocked: false,
  },
  {
    year: 2019,
    title: 'Regional Impact',
    description:
      'Expanded influence and built a stronger regional presence with broader brand impact.',
    reward: 'Regional Impact',
    icon: 'globe',
    position: { x: 1700, y: 460 },
    unlocked: false,
  },
];

export const LAST_INDEX = milestones.length - 1;

/** Journey progress (0–100) for a given furthest-reached milestone index. */
export function progressFor(index: number): number {
  return Math.round((index / LAST_INDEX) * 100);
}
