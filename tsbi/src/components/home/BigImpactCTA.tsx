import Link from 'next/link';

// Closing CTA. A field of faint hand-drawn doodle icons surrounds a loose
// pink/blue orbit that frames the headline. All art is inline SVG (no assets).
type Doodle = { top: string; left: string; node: React.ReactNode };

// 24x24 viewBox line icons; colour/stroke come from the .bic-doodle class.
const DOODLES: Doodle[] = [
  { top: '12%', left: '8%', node: ( // rocket
    <path d="M14 4c3 1 5 4 5 8-2 0-3 1-4 2l-3-3c1-1 2-2 2-4 0-1 0-2 0-3zM7 13l-3 1 2 3 3-1M9 17c-1 2-1 4-1 4s2 0 4-1" />
  ) },
  { top: '7%', left: '34%', node: ( // lightbulb
    <><path d="M9 16a5 5 0 1 1 6 0c-1 1-1 2-1 3h-4c0-1 0-2-1-3z" /><path d="M10 21h4" /></>
  ) },
  { top: '14%', left: '62%', node: ( // bar chart
    <><path d="M4 20V10M10 20V5M16 20v-7M20 20h-18" /></>
  ) },
  { top: '9%', left: '86%', node: ( // thumbs up
    <path d="M7 11v8H4v-8zM7 11l4-7c1 0 2 1 2 2l-1 4h5c1 0 2 1 1 2l-2 6c0 1-1 1-2 1H7" />
  ) },
  { top: '40%', left: '4%', node: ( // megaphone
    <path d="M4 10v4l9 4V6zM13 8c2 0 3 1 3 4s-1 4-3 4M4 14c-1 0-1 3 1 4" />
  ) },
  { top: '70%', left: '9%', node: ( // magnifier
    <><circle cx="10" cy="10" r="6" /><path d="M15 15l5 5" /></>
  ) },
  { top: '86%', left: '24%', node: ( // target
    <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="1" /></>
  ) },
  { top: '84%', left: '52%', node: ( // pencil
    <path d="M4 20l1-4L16 5l3 3L8 19zM14 7l3 3" />
  ) },
  { top: '80%', left: '80%', node: ( // gear
    <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" /></>
  ) },
  { top: '44%', left: '92%', node: ( // play button
    <><circle cx="12" cy="12" r="9" /><path d="M10 8l6 4-6 4z" /></>
  ) },
  { top: '26%', left: '20%', node: ( // speech bubble
    <path d="M4 5h16v10H9l-4 4v-4H4z" />
  ) },
  { top: '60%', left: '88%', node: ( // star
    <path d="M12 3l2.5 6 6 .5-4.5 4 1.5 6-5.5-3.5L6 19.5 7.5 13.5 3 9.5l6-.5z" />
  ) },
];

export default function BigImpactCTA() {
  return (
    <section className="bic-root" aria-label="Get in touch">
      <div className="bic-doodles" aria-hidden>
        {DOODLES.map((d, i) => (
          <svg
            key={i}
            className="bic-doodle"
            style={{ top: d.top, left: d.left }}
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {d.node}
          </svg>
        ))}
      </div>

      <div className="bic-center reveal">
        {/* loose hand-drawn orbit */}
        <svg className="bic-orbit" viewBox="0 0 640 420" fill="none" aria-hidden preserveAspectRatio="xMidYMid meet">
          <ellipse cx="320" cy="210" rx="300" ry="190" transform="rotate(-6 320 210)" stroke="var(--magenta)" strokeOpacity="0.6" strokeWidth="1.5" />
          <ellipse cx="320" cy="210" rx="288" ry="178" transform="rotate(5 320 210)" stroke="var(--electric)" strokeOpacity="0.5" strokeWidth="1.5" />
          <circle cx="34" cy="232" r="7" fill="var(--electric)" />
          <circle cx="612" cy="250" r="9" fill="var(--magenta)" />
          <circle cx="330" cy="402" r="6" fill="var(--magenta)" />
        </svg>

        <div className="bic-content">
          <h2 className="bic-h2">
            Ready to Turn Your
            <br />
            Small Idea Into a
            <br />
            <span className="accent">Big Impact?</span>
          </h2>
          <Link href="/contact" className="btn-border bic-cta">
            Let&apos;s Talk <span className="arr">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
