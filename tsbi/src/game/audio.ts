/**
 * Audio manager — built on Howler.js.
 *
 * The project ships no audio assets, so instead of loading .mp3 files we
 * synthesize short sound effects + an ambient pad as in-memory WAV data URIs
 * and hand them to Howler. Howler then owns playback, volume, looping and the
 * mobile "unlock on first gesture" behaviour for us.
 *
 * Everything is lazy + browser-guarded: `howler` is dynamically imported the
 * first time `init()` runs (always client-side), so this module is safe to
 * import from code that is server-prerendered.
 */

type SfxName = 'ui' | 'enter' | 'wind' | 'landing' | 'unlock' | 'continue' | 'complete';

const SAMPLE_RATE = 22050;

/* ── WAV encoding ──────────────────────────────────────────────────────── */

function encodeWav(samples: Float32Array, sampleRate = SAMPLE_RATE): string {
  const len = samples.length;
  const buffer = new ArrayBuffer(44 + len * 2);
  const view = new DataView(buffer);
  const writeStr = (off: number, s: string) => {
    for (let i = 0; i < s.length; i++) view.setUint8(off + i, s.charCodeAt(i));
  };
  writeStr(0, 'RIFF');
  view.setUint32(4, 36 + len * 2, true);
  writeStr(8, 'WAVE');
  writeStr(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM
  view.setUint16(22, 1, true); // mono
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeStr(36, 'data');
  view.setUint32(40, len * 2, true);

  let off = 44;
  for (let i = 0; i < len; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(off, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    off += 2;
  }

  const bytes = new Uint8Array(buffer);
  let binary = '';
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode.apply(null, Array.from(bytes.subarray(i, i + chunk)));
  }
  return 'data:audio/wav;base64,' + btoa(binary);
}

/** Render `seconds` of mono audio via a per-sample function. */
function render(seconds: number, fn: (t: number, i: number) => number): Float32Array {
  const n = Math.floor(seconds * SAMPLE_RATE);
  const out = new Float32Array(n);
  for (let i = 0; i < n; i++) out[i] = fn(i / SAMPLE_RATE, i);
  return out;
}

const sine = (f: number, t: number) => Math.sin(2 * Math.PI * f * t);
const noise = () => Math.random() * 2 - 1;
/** Exponential decay envelope. */
const decay = (t: number, k: number) => Math.exp(-t * k);

/* ── Synth definitions (return WAV data URIs) ──────────────────────────── */

function synth(): Record<SfxName, string> {
  return {
    // Soft UI tick
    ui: encodeWav(render(0.08, (t) => sine(1180, t) * decay(t, 55) * 0.3)),
    // Magical whoosh on "Enter the Journey"
    enter: encodeWav(
      render(0.6, (t) => {
        const env = Math.sin((Math.PI * t) / 0.6); // hann-ish swell
        const sweep = sine(180 + t * 900, t);
        return (noise() * 0.4 + sweep * 0.6) * env * 0.5;
      }),
    ),
    // Airy wind loop during the fall
    wind: encodeWav(
      render(1.6, (t) => {
        const lfo = 0.6 + 0.4 * Math.sin(2 * Math.PI * 0.7 * t);
        return noise() * 0.18 * lfo;
      }),
    ),
    // Low thud + dust on landing
    landing: encodeWav(
      render(0.45, (t) => {
        const thud = sine(72, t) * decay(t, 16) * 0.9;
        const dust = noise() * decay(t, 26) * 0.4;
        return thud + dust;
      }),
    ),
    // Bell-like unlock chime
    unlock: encodeWav(
      render(0.7, (t) => {
        const d = decay(t, 6);
        return (sine(660, t) * 0.5 + sine(990, t) * 0.3 + sine(1320, t) * 0.2) * d * 0.5;
      }),
    ),
    // Subtle click on continue
    continue: encodeWav(render(0.1, (t) => sine(540, t) * decay(t, 40) * 0.3)),
    // Triumphant chord at completion
    complete: encodeWav(
      render(1.3, (t) => {
        const d = decay(t, 2.2);
        const shimmer = sine(1568, t) * 0.12 * (0.5 + 0.5 * Math.sin(2 * Math.PI * 6 * t));
        return (
          (sine(523.25, t) * 0.34 + sine(659.25, t) * 0.3 + sine(783.99, t) * 0.3 + shimmer) *
          d *
          0.5
        );
      }),
    ),
  };
}

/** Ambient pad loop, generated separately (longer). */
function synthMusic(): string {
  return encodeWav(
    render(4, (t) => {
      const lfo = 0.5 + 0.5 * Math.sin(2 * Math.PI * 0.12 * t);
      const pad = sine(220, t) * 0.3 + sine(277.18, t) * 0.22 + sine(329.63, t) * 0.2;
      return pad * lfo * 0.22;
    }),
  );
}

/* ── Manager ───────────────────────────────────────────────────────────── */

type HowlCtor = typeof import('howler');

class AudioManager {
  private mod: HowlCtor | null = null;
  private sfx: Partial<Record<SfxName, InstanceType<HowlCtor['Howl']>>> = {};
  private music: InstanceType<HowlCtor['Howl']> | null = null;
  private ready = false;
  private initing: Promise<void> | null = null;

  sfxEnabled = true;
  musicEnabled = true;

  /** Build Howl instances. Safe to call repeatedly; runs once. */
  init(): Promise<void> {
    if (typeof window === 'undefined') return Promise.resolve();
    if (this.ready) return Promise.resolve();
    if (this.initing) return this.initing;

    this.initing = (async () => {
      try {
        this.mod = await import('howler');
        const { Howl } = this.mod;
        const banks = synth();
        (Object.keys(banks) as SfxName[]).forEach((name) => {
          this.sfx[name] = new Howl({
            src: [banks[name]],
            format: ['wav'],
            volume: name === 'wind' ? 0.5 : 0.7,
            loop: name === 'wind',
          });
        });
        this.music = new Howl({
          src: [synthMusic()],
          format: ['wav'],
          volume: 0.4,
          loop: true,
        });
        this.ready = true;
      } catch {
        // If synthesis / Howler fails for any reason the game still runs silently.
        this.ready = false;
      }
    })();

    return this.initing;
  }

  play(name: SfxName) {
    if (!this.sfxEnabled || !this.ready) return;
    this.sfx[name]?.play();
  }

  stop(name: SfxName) {
    this.sfx[name]?.stop();
  }

  startMusic() {
    if (!this.musicEnabled || !this.ready || !this.music) return;
    if (!this.music.playing()) this.music.play();
  }

  stopMusic() {
    this.music?.stop();
  }

  setSfxEnabled(on: boolean) {
    this.sfxEnabled = on;
  }

  setMusicEnabled(on: boolean) {
    this.musicEnabled = on;
    if (!on) this.stopMusic();
    else this.startMusic();
  }
}

export const audio = new AudioManager();
