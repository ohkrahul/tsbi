'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useJourneyGameStore } from '@/store/useJourneyGameStore';
import GameCanvas from './GameCanvas';
import EntryOverlay from './EntryOverlay';
import GameHUD from './GameHUD';
import MobileControls from './MobileControls';
import MilestoneModal from './MilestoneModal';
import HowToPlayModal from './HowToPlayModal';
import SettingsModal from './SettingsModal';
import JourneyCompleteOverlay from './JourneyCompleteOverlay';

/**
 * GameWrapper — top-level client shell for the quest. Holds the Phaser canvas
 * and every React overlay, and owns global input (keyboard + swipe), the intro
 * skip button and the locked-marker toast. Overlays are switched on the
 * store's `phase`.
 */
export default function GameWrapper() {
  const phase = useJourneyGameStore((s) => s.phase);
  const toast = useJourneyGameStore((s) => s.toast);
  const [isMobile, setIsMobile] = useState(false);
  const swipeStart = useRef<number | null>(null);

  /* ── responsive flag ── */
  useEffect(() => {
    const measure = () => setIsMobile(window.innerWidth < 768);
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  /* ── keyboard controls ── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const st = useJourneyGameStore.getState();

      if (st.showHowTo || st.showSettings) {
        if (e.key === 'Escape') {
          st.setHowTo(false);
          st.setSettings(false);
        }
        return;
      }

      if (st.phase === 'entry') {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          st.startGame();
        }
        return;
      }

      if (st.isMilestoneOpen) {
        if (e.key === 'Escape') st.closeMilestone();
        else if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') {
          e.preventDefault();
          st.continueJourney();
        } else if (e.key === 'ArrowLeft') st.goPrevious();
        return;
      }

      if (st.phase === 'map') {
        if (e.key === 'ArrowRight') st.goNext();
        else if (e.key === 'ArrowLeft') st.goPrevious();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  /* ── auto-dismiss the toast ── */
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => useJourneyGameStore.getState().setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  /* ── swipe navigation (map only) ── */
  const onPointerDown = (e: React.PointerEvent) => {
    swipeStart.current = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (swipeStart.current === null) return;
    const delta = swipeStart.current - e.clientX;
    swipeStart.current = null;
    const st = useJourneyGameStore.getState();
    if (st.phase !== 'map' || st.isMilestoneOpen) return;
    if (Math.abs(delta) > 55) (delta > 0 ? st.goNext() : st.goPrevious());
  };

  return (
    <div className="journey-root">
      <div className="journey-stage" onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
        <GameCanvas />

        <AnimatePresence>{phase === 'entry' && <EntryOverlay key="entry" />}</AnimatePresence>

        {/* Intro caption + skip during the fall/landing sequence */}
        <AnimatePresence>
          {phase === 'falling' && (
            <motion.div
              key="intro"
              className="jintro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p className="jintro-caption">A single idea falls into the unknown…</p>
              <button type="button" className="jskip" onClick={() => useJourneyGameStore.getState().skipIntro()}>
                Skip ›
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {phase === 'map' && <GameHUD />}
        {phase === 'map' && isMobile && <MobileControls />}

        <AnimatePresence>{phase === 'complete' && <JourneyCompleteOverlay key="complete" />}</AnimatePresence>

        <MilestoneModal />
        <HowToPlayModal />
        <SettingsModal />

        {/* locked-marker toast */}
        <AnimatePresence>
          {toast && (
            <motion.div
              key="toast"
              className="jtoast"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              {toast}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
