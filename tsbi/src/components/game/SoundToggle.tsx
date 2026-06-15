'use client';

import { useJourneyGameStore } from '@/store/useJourneyGameStore';

/** Small "Sound: On / Off" toggle used on the entry screen and HUD. */
export default function SoundToggle() {
  const soundEnabled = useJourneyGameStore((s) => s.soundEnabled);
  const toggleSound = useJourneyGameStore((s) => s.toggleSound);

  return (
    <button type="button" className="jsound" onClick={toggleSound} aria-pressed={soundEnabled}>
      <span className={`jsound-dot ${soundEnabled ? 'on' : ''}`} />
      Sound: {soundEnabled ? 'On' : 'Off'}
    </button>
  );
}
