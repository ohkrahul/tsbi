'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useJourneyGameStore } from '@/store/useJourneyGameStore';

function Toggle({ label, on, onToggle }: { label: string; on: boolean; onToggle: () => void }) {
  return (
    <div className="jsetting-row">
      <span>{label}</span>
      <button
        type="button"
        className={`jswitch ${on ? 'on' : ''}`}
        onClick={onToggle}
        role="switch"
        aria-checked={on}
        aria-label={label}
      >
        <span className="jswitch-knob" />
      </button>
    </div>
  );
}

/** Settings modal — music, sfx, reduced motion, restart and back-to-map. */
export default function SettingsModal() {
  const open = useJourneyGameStore((s) => s.showSettings);
  const musicEnabled = useJourneyGameStore((s) => s.musicEnabled);
  const soundEnabled = useJourneyGameStore((s) => s.soundEnabled);
  const reducedMotion = useJourneyGameStore((s) => s.reducedMotion);
  const toggleMusic = useJourneyGameStore((s) => s.toggleMusic);
  const toggleSound = useJourneyGameStore((s) => s.toggleSound);
  const toggleReducedMotion = useJourneyGameStore((s) => s.toggleReducedMotion);
  const restartJourney = useJourneyGameStore((s) => s.restartJourney);
  const setSettings = useJourneyGameStore((s) => s.setSettings);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="jmodal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSettings(false)}
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
            <h3 className="jcard-title">Settings</h3>

            <div className="jsettings">
              <Toggle label="Music" on={musicEnabled} onToggle={toggleMusic} />
              <Toggle label="Sound Effects" on={soundEnabled} onToggle={toggleSound} />
              <Toggle label="Reduced Motion" on={reducedMotion} onToggle={() => toggleReducedMotion()} />
            </div>

            <div className="jsettings-actions">
              <button
                type="button"
                className="jbtn-ghost"
                onClick={() => {
                  restartJourney();
                  setSettings(false);
                }}
              >
                Restart Journey
              </button>
              <button type="button" className="jbtn jcard-cta" onClick={() => setSettings(false)}>
                Back to Map
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
