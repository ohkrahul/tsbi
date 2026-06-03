import Link from 'next/link';

export default function OrbitSection() {
  return (
    <section className="orbit-section">
      <div className="orbit-inner">
        {/* Left text */}
        <div className="orbit-text reveal">
          <div className="sec-label"><span className="num">02</span> Influencer Management</div>
          <h2 className="orbit-h2">
            Building real connections between brands and voices that <em>move culture</em>
          </h2>
          <p className="orbit-body">
            From nano to mega, we manage influencer partnerships that convert audiences into
            communities and campaigns into movements.
          </p>
          <div className="orbit-stat-big">150+</div>
          <div className="orbit-stat-sub">Talents and growing</div>
          <Link href="/work" className="btn-fill" style={{ marginTop: 8 }}>
            Meet the Talent →
          </Link>
        </div>

        {/* Right orbit SVG */}
        <div className="orbit-canvas reveal d2">
          <svg className="orbit-svg-el" viewBox="0 0 520 460">
            {/* Static orbit tracks */}
            <ellipse cx="260" cy="230" rx="220" ry="120" fill="none" stroke="rgba(10,10,10,.07)" strokeWidth="1"/>
            <ellipse cx="260" cy="230" rx="150" ry="80" fill="none" stroke="rgba(10,10,10,.05)" strokeWidth="1"/>
            <ellipse cx="260" cy="230" rx="80" ry="45" fill="none" stroke="rgba(224,25,125,.1)" strokeWidth="1"/>

            {/* Center hub */}
            <ellipse cx="260" cy="230" rx="42" ry="42" fill="rgba(224,25,125,.06)" stroke="rgba(224,25,125,.2)" strokeWidth="1"/>
            <text x="260" y="226" textAnchor="middle" fontFamily="Arial Black,sans-serif" fontSize="20" fontWeight="900" fill="#e0197d">150+</text>
            <text x="260" y="245" textAnchor="middle" fontFamily="Courier New,monospace" fontSize="7" fill="#6b6b6b" letterSpacing="2">TALENTS</text>

            {/* Outer orbit — 18s */}
            <g style={{ transformOrigin: '260px 230px', animation: 'orbit1 18s linear infinite' }}>
              <ellipse cx="480" cy="230" rx="38" ry="22" fill="white" stroke="rgba(10,10,10,.12)" strokeWidth="1"/>
              <text x="480" y="228" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8" fill="#6b6b6b" letterSpacing="1">L&#39;ORÉAL</text>
              <text x="480" y="240" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="7" fill="#c8c5be" letterSpacing="1">PARIS</text>

              <ellipse cx="40" cy="230" rx="36" ry="22" fill="white" stroke="rgba(10,10,10,.12)" strokeWidth="1"/>
              <text x="40" y="234" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#6b6b6b" letterSpacing=".5">DIOR</text>

              <ellipse cx="260" cy="110" rx="36" ry="18" fill="white" stroke="rgba(10,10,10,.12)" strokeWidth="1"/>
              <text x="260" y="114" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8" fill="#6b6b6b" letterSpacing="1">CHANEL</text>

              <ellipse cx="260" cy="350" rx="36" ry="18" fill="white" stroke="rgba(10,10,10,.12)" strokeWidth="1"/>
              <text x="260" y="354" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8" fill="#6b6b6b" letterSpacing=".5">LA MER</text>
            </g>

            {/* Inner orbit — 12s reverse */}
            <g style={{ transformOrigin: '260px 230px', animation: 'orbit1 12s linear infinite reverse' }}>
              <ellipse cx="410" cy="150" rx="30" ry="16" fill="white" stroke="rgba(10,10,10,.1)" strokeWidth="1"/>
              <text x="410" y="154" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="7" fill="#888" letterSpacing=".5">ONEPLUS</text>

              <ellipse cx="110" cy="310" rx="30" ry="16" fill="white" stroke="rgba(10,10,10,.1)" strokeWidth="1"/>
              <text x="110" y="314" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="7" fill="#888" letterSpacing=".5">GLOSSIER</text>

              <ellipse cx="410" cy="310" rx="28" ry="15" fill="white" stroke="rgba(10,10,10,.1)" strokeWidth="1"/>
              <text x="410" y="314" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="7" fill="#888" letterSpacing=".5">SWAROVSKI</text>

              <ellipse cx="110" cy="150" rx="28" ry="15" fill="white" stroke="rgba(10,10,10,.1)" strokeWidth="1"/>
              <text x="110" y="154" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="7" fill="#888" letterSpacing=".5">TIGER</text>
            </g>

            {/* Accent dots */}
            <circle cx="260" cy="110" r="3" fill="#e0197d"/>
            <circle cx="480" cy="230" r="3" fill="rgba(10,10,10,.2)"/>
          </svg>
        </div>
      </div>
    </section>
  );
}
