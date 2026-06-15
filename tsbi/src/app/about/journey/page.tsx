import type { Metadata } from 'next';
import '../../../styles/game.css';
import GameWrapper from '@/components/game/GameWrapper';

export const metadata: Metadata = {
  title: 'The SmallBig Story Quest — TSBI',
  description:
    'An interactive 2D journey through the milestones that shaped TSBI, from a single spark in 2014 to regional impact.',
};

/**
 * Standalone, full-screen route for The SmallBig Story Quest. The root layout's
 * nav + footer are hidden for this route via the `body:has(.journey-root)`
 * rule in game.css so the experience can take over the viewport.
 */
export default function JourneyPage() {
  return <GameWrapper />;
}
