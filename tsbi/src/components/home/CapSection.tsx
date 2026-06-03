import Link from 'next/link';

const words = [
  { text: 'STRATEGY', lit: false },
  { text: 'CREATIVE', lit: true },
  { text: 'MEDIA', lit: false },
  { text: 'TECH', lit: false },
  { text: 'PRODUCTION', lit: false },
  { text: 'SOCIAL', lit: false },
];

export default function CapSection() {
  return (
    <section className="cap-section">
      <div className="cap-inner">
        <div className="cap-words reveal">
          {words.map((w) => (
            <span key={w.text} className={`cw${w.lit ? ' lit' : ''}`}>{w.text}</span>
          ))}
        </div>

        <div className="cap-side reveal d2">
          <div className="sec-label pink"><span className="num">04</span> What We Do</div>
          <p className="cap-quote">
            "Integrated thinking. Built to scale. Designed to last."
          </p>
          <p className="cap-body">
            Six disciplines, one vision. From first brief to final frame — and every touchpoint
            in between. We don't just create. We make it matter.
          </p>
          <Link href="/services" className="btn-fill">Our Capabilities →</Link>
        </div>
      </div>
    </section>
  );
}
