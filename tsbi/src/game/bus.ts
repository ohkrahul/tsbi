/**
 * Tiny typed event bus that bridges React <-> Phaser.
 *
 * - React (via the Zustand store) emits `cmd:*` events that the Phaser scenes
 *   listen to (start, advance, restart, ...).
 * - Phaser scenes emit `game:*` events that <GameCanvas> listens to and maps
 *   onto the store (landed, arrived, locked, complete, ...).
 *
 * It is deliberately framework-agnostic and dependency-free so it can be
 * imported from both the client React tree and the dynamically-loaded Phaser
 * module graph without pulling either into the other.
 */

export type GameBusEvents = {
  /* React -> Phaser (commands) */
  'cmd:start': void;
  'cmd:skip': void;
  /** Walk the avatar to a specific milestone index (next / prev / marker). */
  'cmd:goto': number;
  'cmd:complete': void;
  'cmd:restart': void;
  'cmd:reducedMotion': boolean;

  /* Phaser -> React (state) */
  'game:ready': void; // entry backdrop is up
  'game:landed': void; // avatar has landed, map is interactive
  'game:arrived': number; // avatar reached milestone <index>
  'game:locked': number; // user clicked a still-locked marker <index>
  'game:complete': void; // final destination reached
};

type EventKey = keyof GameBusEvents;
type Handler<K extends EventKey> = (payload: GameBusEvents[K]) => void;

type AnyHandler = (payload: unknown) => void;

class GameBus {
  // Internally untyped (variance across the event union is awkward to express);
  // the public on/off/emit signatures keep everything type-safe at the edges.
  private handlers = new Map<EventKey, Set<AnyHandler>>();

  on<K extends EventKey>(event: K, handler: Handler<K>): () => void {
    let set = this.handlers.get(event);
    if (!set) {
      set = new Set();
      this.handlers.set(event, set);
    }
    set.add(handler as AnyHandler);
    // Return an unsubscribe function for ergonomic cleanup.
    return () => this.off(event, handler);
  }

  off<K extends EventKey>(event: K, handler: Handler<K>): void {
    this.handlers.get(event)?.delete(handler as AnyHandler);
  }

  emit<K extends EventKey>(event: K, payload: GameBusEvents[K]): void {
    this.handlers.get(event)?.forEach((h) => h(payload));
  }
}

/** Singleton shared by React and Phaser. */
export const bus = new GameBus();
