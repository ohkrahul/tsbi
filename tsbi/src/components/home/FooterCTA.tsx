import Link from 'next/link';

export default function FooterCTA() {
  return (
    <section className="fcta-section">
      <div className="fcta-orbit-ring fcta-orbit-1" />
      <div className="fcta-orbit-ring fcta-orbit-2" />

      <div className="fcta-eyebrow reveal">Ready When You Are</div>

      <h2 className="fcta-h2 reveal d1">
        Ready to Turn Your<br/>Small Idea Into a<br/><em>Big Impact?</em>
      </h2>

      <div className="fcta-actions reveal d2">
        <Link href="/contact" className="btn-fill" style={{ background: 'var(--magenta)' }}>
          Let's Talk →
        </Link>
        <Link href="/case-studies" className="btn-border">
          See Our Work
        </Link>
      </div>
    </section>
  );
}
