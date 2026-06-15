'use client';

import { motion } from 'framer-motion';
import { useJourneyGameStore } from '@/store/useJourneyGameStore';
import { milestones, LAST_INDEX } from '@/game/data/milestones';
import SoundToggle from './SoundToggle';

function Arrow({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
      <path
        d={dir === 'left' ? 'M8.5 2.5L5 7l3.5 4.5' : 'M5.5 2.5L9 7l-3.5 4.5'}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * GameHUD — the heads-up display shown while exploring the map: current year,
 * journey progress, sound toggle, How to Play / Settings, and prev/next nav.
 */
export default function GameHUD() {
  const currentIndex = useJourneyGameStore((s) => s.currentIndex);
  const progress = useJourneyGameStore((s) => s.progress);
  const goNext = useJourneyGameStore((s) => s.goNext);
  const goPrevious = useJourneyGameStore((s) => s.goPrevious);
  const setHowTo = useJourneyGameStore((s) => s.setHowTo);
  const setSettings = useJourneyGameStore((s) => s.setSettings);

  const m = milestones[currentIndex];
  const atStart = currentIndex <= 0;

  return (
    <div className="jhud">
      {/* top-left: current chapter */}
      <div className="jhud-chapter">
        <span className="jhud-year">{m?.year}</span>
        <span className="jhud-mtitle">{m?.title}</span>
      </div>

      {/* top-right: progress */}
      <div className="jhud-progress">
        <div className="jhud-progress-head">
          <span>Journey Progress</span>
          <span className="jhud-progress-pct">{progress}%</span>
        </div>
        <div className="jprogress-track">
          <motion.div
            className="jprogress-fill"
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          />
        </div>
      </div>

      {/* bottom-left: utilities */}
      <div className="jhud-utils">
        <button type="button" className="jchip" onClick={() => setHowTo(true)}>
          How to Play
        </button>
        <button type="button" className="jchip" onClick={() => setSettings(true)}>
          Settings
        </button>
        <SoundToggle />
      </div>

      {/* bottom-right: navigation */}
      <div className="jhud-nav">
        <button
          type="button"
          className="jnav"
          onClick={goPrevious}
          disabled={atStart}
          aria-label="Previous milestone"
        >
          <Arrow dir="left" />
        </button>
        <button type="button" className="jnav jnav-primary" onClick={goNext} aria-label="Next milestone">
          {currentIndex >= LAST_INDEX ? 'Finish' : 'Next'} <Arrow dir="right" />
        </button>
      </div>

      <div className="jhud-keyhint">← → keys · arrows · swipe</div>
    </div>
  );
}
