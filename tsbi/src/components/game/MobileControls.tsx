'use client';

import { useJourneyGameStore } from '@/store/useJourneyGameStore';
import { LAST_INDEX } from '@/game/data/milestones';

/**
 * MobileControls — large tap targets for prev / next, shown only on small
 * screens while exploring the map. (Swiping is also wired up in GameWrapper.)
 */
export default function MobileControls() {
  const currentIndex = useJourneyGameStore((s) => s.currentIndex);
  const goNext = useJourneyGameStore((s) => s.goNext);
  const goPrevious = useJourneyGameStore((s) => s.goPrevious);

  return (
    <div className="jmobile-controls">
      <button
        type="button"
        className="jmobile-btn"
        onClick={goPrevious}
        disabled={currentIndex <= 0}
        aria-label="Previous milestone"
      >
        ←
      </button>
      <button type="button" className="jmobile-btn jmobile-primary" onClick={goNext}>
        {currentIndex >= LAST_INDEX ? 'Finish Journey' : 'Continue →'}
      </button>
    </div>
  );
}
