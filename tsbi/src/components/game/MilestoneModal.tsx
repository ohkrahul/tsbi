'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useJourneyGameStore } from '@/store/useJourneyGameStore';
import { LAST_INDEX, type MilestoneIcon } from '@/game/data/milestones';

/* Small line illustrations for each chapter's reward. */
function RewardIcon({ type }: { type: MilestoneIcon }) {
  const s = {
    stroke: '#e0197d',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: 'none',
  };
  const map: Record<MilestoneIcon, React.ReactNode> = {
    spark: (
      <>
        <path d="M12 3l1.6 3.9L17.5 8l-3.9 1.6L12 13l-1.6-3.4L6.5 8l3.9-1.1L12 3z" {...s} />
        <path d="M5 15l.8 2 2 .8-2 .8L5 21l-.8-2-2-.8 2-.8L5 15z" {...s} />
      </>
    ),
    content: (
      <>
        <rect x="2" y="6" width="15" height="12" rx="2" {...s} />
        <path d="M17 10l5-3v10l-5-3" {...s} />
      </>
    ),
    compass: (
      <>
        <circle cx="12" cy="12" r="9" {...s} />
        <polygon points="15.5,8.5 11,11 8.5,15.5 13,13" {...s} />
      </>
    ),
    operations: (
      <>
        <circle cx="12" cy="12" r="3" {...s} />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" {...s} />
      </>
    ),
    partnership: (
      <>
        <path d="M8 12l3-3 5 5-3 3-5-5z" {...s} />
        <path d="M3 9l3-3 3 3M21 9l-3-3-3 3" {...s} />
      </>
    ),
    globe: (
      <>
        <circle cx="12" cy="12" r="9" {...s} />
        <path d="M3 12h18M12 3c-3 4-3 14 0 18M12 3c3 4 3 14 0 18" {...s} />
      </>
    ),
  };
  return (
    <svg width="34" height="34" viewBox="0 0 24 24">
      {map[type]}
    </svg>
  );
}

/**
 * MilestoneModal — the parchment chapter card. Fully driven by the store
 * (`isMilestoneOpen` + `activeMilestone`). On the last milestone the CTA reads
 * "Complete Journey" and continuing triggers the completion sequence.
 */
export default function MilestoneModal() {
  const isOpen = useJourneyGameStore((s) => s.isMilestoneOpen);
  const milestone = useJourneyGameStore((s) => s.activeMilestone);
  const currentIndex = useJourneyGameStore((s) => s.currentIndex);
  const closeMilestone = useJourneyGameStore((s) => s.closeMilestone);
  const continueJourney = useJourneyGameStore((s) => s.continueJourney);

  const isFinal = currentIndex >= LAST_INDEX;

  return (
    <AnimatePresence>
      {isOpen && milestone && (
        <motion.div
          className="jmodal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={closeMilestone}
        >
          <motion.div
            className="jcard"
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button type="button" className="jcard-close" onClick={closeMilestone} aria-label="Close">
              ✕
            </button>

            <motion.div
              className="jcard-ribbon"
              initial={{ y: -14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.12, duration: 0.3 }}
            >
              {milestone.year}
            </motion.div>

            <div className="jcard-illu">
              <RewardIcon type={milestone.icon} />
            </div>

            <h3 className="jcard-title">{milestone.title}</h3>
            <p className="jcard-desc">{milestone.description}</p>

            <div className="jcard-reward">
              <span className="jcard-reward-label">Reward Unlocked</span>
              <span className="jcard-reward-name">✦ {milestone.reward}</span>
            </div>

            <button type="button" className="jbtn jcard-cta" onClick={continueJourney}>
              {isFinal ? 'Complete Journey' : 'Continue Journey'} <span className="jarr">→</span>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
