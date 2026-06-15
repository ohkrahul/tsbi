/**
 * Zustand store for The SmallBig Story Quest.
 *
 * This is the single source of truth shared by every React overlay (HUD,
 * milestone card, modals, complete screen). UI intent flows OUT of here as
 * `cmd:*` events on the bus (consumed by Phaser); game progress flows IN via
 * the `on*` handlers, which <GameCanvas> wires up to the Phaser `game:*`
 * events. Keeping the dependency one-directional (store -> bus, GameCanvas ->
 * store) avoids import cycles with the Phaser graph.
 */

'use client';

import { create } from 'zustand';
import { bus } from '@/game/bus';
import { audio } from '@/game/audio';
import { milestones, LAST_INDEX, progressFor, type Milestone } from '@/game/data/milestones';

export type JourneyPhase = 'entry' | 'falling' | 'landing' | 'map' | 'complete';

export interface JourneyGameState {
  /* ── flow ── */
  phase: JourneyPhase;
  started: boolean;
  completed: boolean;

  /* ── progress ── */
  currentIndex: number;
  unlockedIndex: number; // furthest milestone reached
  progress: number; // 0–100

  /* ── milestone card ── */
  activeMilestone: Milestone | null;
  isMilestoneOpen: boolean;

  /* ── settings ── */
  soundEnabled: boolean;
  musicEnabled: boolean;
  reducedMotion: boolean;

  /* ── transient UI ── */
  showHowTo: boolean;
  showSettings: boolean;
  toast: string | null;

  /* ── actions (UI -> game) ── */
  startGame: () => void;
  skipIntro: () => void;
  openMilestone: (index: number) => void;
  closeMilestone: () => void;
  continueJourney: () => void;
  goNext: () => void;
  goPrevious: () => void;
  toggleSound: () => void;
  toggleMusic: () => void;
  toggleReducedMotion: (value?: boolean) => void;
  restartJourney: () => void;
  setHowTo: (open: boolean) => void;
  setSettings: (open: boolean) => void;
  setToast: (message: string | null) => void;

  /* ── handlers (game -> UI), called by <GameCanvas> ── */
  onReady: () => void;
  onLanded: () => void;
  onArrived: (index: number) => void;
  onLocked: (index: number) => void;
  onComplete: () => void;
}

const INITIAL = {
  phase: 'entry' as JourneyPhase,
  started: false,
  completed: false,
  currentIndex: 0,
  unlockedIndex: 0,
  progress: 0,
  activeMilestone: null as Milestone | null,
  isMilestoneOpen: false,
  showHowTo: false,
  showSettings: false,
  toast: null as string | null,
};

export const useJourneyGameStore = create<JourneyGameState>((set, get) => ({
  ...INITIAL,
  // Settings persist across a restart, so they live outside INITIAL.
  soundEnabled: true,
  musicEnabled: true,
  reducedMotion: false,

  startGame: () => {
    if (get().started) return;
    set({ started: true, phase: 'falling' });
    audio.play('enter');
    audio.startMusic();
    bus.emit('cmd:start', undefined);
  },

  skipIntro: () => {
    audio.stop('wind');
    bus.emit('cmd:skip', undefined);
  },

  openMilestone: (index) => {
    const m = milestones[index];
    if (!m) return;
    set({
      currentIndex: index,
      activeMilestone: m,
      isMilestoneOpen: true,
      unlockedIndex: Math.max(get().unlockedIndex, index),
      progress: progressFor(Math.max(get().unlockedIndex, index)),
    });
  },

  closeMilestone: () => set({ isMilestoneOpen: false }),

  continueJourney: () => {
    const { currentIndex } = get();
    audio.play('continue');
    set({ isMilestoneOpen: false });
    if (currentIndex >= LAST_INDEX) {
      bus.emit('cmd:complete', undefined);
    } else {
      bus.emit('cmd:goto', currentIndex + 1);
    }
  },

  goNext: () => {
    const { isMilestoneOpen, currentIndex } = get();
    if (isMilestoneOpen) {
      get().continueJourney();
      return;
    }
    if (currentIndex >= LAST_INDEX) {
      bus.emit('cmd:complete', undefined);
    } else {
      bus.emit('cmd:goto', currentIndex + 1);
    }
  },

  goPrevious: () => {
    const { currentIndex } = get();
    if (currentIndex <= 0) return;
    set({ isMilestoneOpen: false });
    bus.emit('cmd:goto', currentIndex - 1);
  },

  toggleSound: () => {
    const next = !get().soundEnabled;
    set({ soundEnabled: next });
    audio.setSfxEnabled(next);
    if (next) audio.play('ui');
  },

  toggleMusic: () => {
    const next = !get().musicEnabled;
    set({ musicEnabled: next });
    audio.setMusicEnabled(next);
  },

  toggleReducedMotion: (value) => {
    const next = value ?? !get().reducedMotion;
    set({ reducedMotion: next });
    bus.emit('cmd:reducedMotion', next);
  },

  restartJourney: () => {
    set({ ...INITIAL });
    bus.emit('cmd:restart', undefined);
  },

  setHowTo: (open) => set({ showHowTo: open }),
  setSettings: (open) => set({ showSettings: open }),
  setToast: (message) => set({ toast: message }),

  /* ── game -> UI ── */
  onReady: () => {
    /* entry backdrop is up; nothing to change yet */
  },

  onLanded: () => {
    set({ phase: 'map', unlockedIndex: Math.max(get().unlockedIndex, 0) });
  },

  onArrived: (index) => {
    const unlocked = Math.max(get().unlockedIndex, index);
    const m = milestones[index];
    set({
      currentIndex: index,
      unlockedIndex: unlocked,
      progress: progressFor(unlocked),
      activeMilestone: m ?? get().activeMilestone,
      isMilestoneOpen: true,
    });
    audio.play('unlock');
  },

  onLocked: () => {
    audio.play('ui');
    set({ toast: 'Complete the current chapter to unlock this milestone.' });
  },

  onComplete: () => {
    set({ phase: 'complete', completed: true, progress: 100, isMilestoneOpen: false });
    audio.play('complete');
  },
}));
