'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useJourneyGameStore } from '@/store/useJourneyGameStore';

const RULES = [
  'Click the arrows to move along the trail',
  'Click a milestone to explore its chapter',
  'Complete each chapter to unlock the next one',
  'Use the ← → arrow keys on desktop',
  'Swipe left / right on mobile',
];

/** "How to Play" modal — opened from the entry screen and the HUD. */
export default function HowToPlayModal() {
  const open = useJourneyGameStore((s) => s.showHowTo);
  const setHowTo = useJourneyGameStore((s) => s.setHowTo);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="jmodal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setHowTo(false)}
        >
          <motion.div
            className="jcard jcard-narrow"
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="jcard-title">How to Play</h3>
            <p className="jcard-desc">Help the explorer travel across the map and unlock every milestone.</p>
            <ul className="jrules">
              {RULES.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
            <button type="button" className="jbtn jcard-cta" onClick={() => setHowTo(false)}>
              Got it
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
