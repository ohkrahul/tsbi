// Full-bleed magenta section: heading + copy on the left, a white bento grid of
// placeholder cards on the right. Decorations (dotted arcs, blue dot) are SVG.
// The bento cards are intentionally empty placeholders — drop imagery in later.
const CARDS = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];

export default function BrandsTrustSection() {
  return (
    <section className="bts-root" aria-label="Brands that trust us">
      {/* dotted concentric arcs, top-left */}
      <svg className="bts-arcs" viewBox="0 0 220 220" fill="none" aria-hidden>
        <circle cx="40" cy="40" r="120" stroke="rgba(255,255,255,0.35)" strokeWidth="1" strokeDasharray="3 7" />
        <circle cx="40" cy="40" r="170" stroke="rgba(255,255,255,0.22)" strokeWidth="1" strokeDasharray="3 7" />
      </svg>
      <span className="bts-dot bts-dot-white" aria-hidden />
      <span className="bts-dot bts-dot-blue" aria-hidden />

      <div className="bts-inner">
        <div className="bts-left reveal">
          <h2 className="bts-h2">
            Brands that
            <br />
            trust us
          </h2>
          <p className="bts-body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.
            Risus commodo viverra maecenas accumsan lacus vel facilisis.
          </p>
        </div>

        <div className="bts-grid reveal d1" aria-hidden>
          {CARDS.map((c) => (
            <div key={c} className={`bts-card ${c}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
