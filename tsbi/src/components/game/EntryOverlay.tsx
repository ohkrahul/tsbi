'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useJourneyGameStore } from '@/store/useJourneyGameStore';
import { audio } from '@/game/audio';
import SoundToggle from './SoundToggle';

/**
 * EntryOverlay — the HTML title/subtitle/CTA layer that sits above the Phaser
 * entry backdrop. Kept in React (not Phaser) so the brand typography stays
 * crisp. Clicking the CTA kicks off the fall sequence via the store.
 */
export default function EntryOverlay() {
  const startGame = useJourneyGameStore((s) => s.startGame);
  const setHowTo = useJourneyGameStore((s) => s.setHowTo);

  return (
    <motion.div
      className="jentry"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.45 } }}
    >
      <div className="jentry-topbar">
        <span className="jentry-eyebrow">About Us ✦</span>
        <Link href="/about" className="jentry-back">
          ← Back to About
        </Link>
      </div>

      <div className="jentry-center">
        <motion.h1
          className="jentry-title"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          The SmallBig <em>Story</em>
        </motion.h1>

        <motion.p
          className="jentry-sub"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Every great journey begins with one small step. Step into our world and discover the
          milestones that shaped TSBI.
        </motion.p>

        <motion.button
          type="button"
          className="jbtn jentry-cta"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          onMouseEnter={() => audio.play('ui')}
          onClick={startGame}
        >
          Enter the Journey <span className="jarr">→</span>
        </motion.button>

        <button type="button" className="jentry-howto" onClick={() => setHowTo(true)}>
          How to Play
        </button>
      </div>

      <div className="jentry-foot">
        <span className="jentry-hint">Best experienced on desktop</span>
        <SoundToggle />
      </div>
    </motion.div>
  );
}
