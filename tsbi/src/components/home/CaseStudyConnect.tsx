import Image from 'next/image';
import Link from 'next/link';

// Featured case study. Left: a stacked poster cluster with an orbit-ring accent.
// Right: heading + copy + outline CTA. A stats strip sits beneath the visual.
// TODO: replace POSTER with the real "Son of Sardaar 2" key art when available —
// using an existing poster as a placeholder for now.
const POSTER = '/Movie%20Posters/PPAVD.jpeg';
const POSTER_BACK_A = '/Movie%20Posters/CMD.jpg';
const POSTER_BACK_B = '/Movie%20Posters/TYM.jpg';

const STATS = [
  { value: '5M+', label: 'Reach' },
  { value: '250+', label: 'Engagements' },
  { value: '40%', label: 'Increase in followers' },
];

export default function CaseStudyConnect() {
  return (
    <section className="csc-root" aria-label="Son of Sardaar 2 — Connect case study">
      <div className="csc-inner">
        <div className="csc-visual reveal">
          {/* orbit ring + dots */}
          <svg className="csc-orbit" viewBox="0 0 320 220" fill="none" aria-hidden>
            <ellipse cx="170" cy="110" rx="150" ry="96" stroke="var(--magenta)" strokeOpacity="0.4" strokeWidth="1" />
            <circle cx="320" cy="110" r="5" fill="var(--magenta)" />
            <circle cx="186" cy="14" r="4" fill="var(--electric)" />
          </svg>

          <div className="csc-stack">
            <div className="csc-poster csc-poster-back-a">
              <Image src={POSTER_BACK_A} alt="" fill sizes="320px" style={{ objectFit: 'cover' }} />
            </div>
            <div className="csc-poster csc-poster-back-b">
              <Image src={POSTER_BACK_B} alt="" fill sizes="320px" style={{ objectFit: 'cover' }} />
            </div>
            <div className="csc-poster csc-poster-front">
              <Image src={POSTER} alt="Son of Sardaar 2" fill sizes="420px" style={{ objectFit: 'cover' }} priority={false} />
            </div>
          </div>
        </div>

        <div className="csc-text reveal d1">
          <p className="csc-kicker">Son of sardaar-2</p>
          <h2 className="csc-h2">Connect</h2>
          <p className="csc-body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.
            Risus commodo viverra maecenas accumsan lacus vel facilisis.
          </p>
          <Link href="/case-studies" className="btn-border csc-cta">
            View Case Study <span className="arr">→</span>
          </Link>
        </div>
      </div>

      <div className="csc-stats reveal d2">
        {STATS.map((s) => (
          <div key={s.label} className="csc-stat">
            <span className="csc-stat-val">{s.value}</span>
            <span className="csc-stat-label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
