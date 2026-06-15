'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useJourneyGameStore } from '@/store/useJourneyGameStore';

/**
 * JourneyCompleteOverlay — the emotional closing screen shown over the
 * CompleteScene vista, with onward CTAs to Work and the team.
 */
export default function JourneyCompleteOverlay() {
  const restartJourney = useJourneyGameStore((s) => s.restartJourney);

  return (
    <motion.div
      className="jcomplete"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h2
        className="jcomplete-title"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        The Journey <em>Continues</em>
      </motion.h2>

      <motion.p
        className="jcomplete-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.5 }}
      >
        From a single spark to a path of impact, The SmallBig Story is still being written.
        <br />
        Thank you for being part of our journey.
      </motion.p>

      <motion.div
        className="jcomplete-actions"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <Link href="/work" className="jbtn">
          Explore Our Work <span className="jarr">→</span>
        </Link>
        <Link href="/about" className="jbtn-ghost">
          Meet The Team
        </Link>
        <button type="button" className="jbtn-ghost" onClick={restartJourney}>
          Replay Journey
        </button>
      </motion.div>
    </motion.div>
  );
}
