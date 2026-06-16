import Link from 'next/link';

export default function OrbitSection() {
  return (
    <section className="relative overflow-hidden bg-[#f8f3ee] px-5 py-16 sm:py-24 lg:pl-10 lg:pr-2.5">
      <div className="flex w-full flex-col items-center gap-10 lg:flex-row lg:gap-0">

        {/* ── LEFT TEXT ── */}
        <div className="reveal w-full pr-0 sm:pr-7 lg:ml-10 lg:w-[420px] lg:shrink-0">
          {/* section label */}
          <div className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[.18em] text-[#9b9b9b]">
            <span className="block h-px w-4 bg-[rgba(10,10,10,.45)]" />
            <span className="text-[#9b9b9b]">02</span> Influencer Management
          </div>

          <h2
            className="mb-4 mt-3 font-serif font-black leading-none tracking-tighter text-[#1a1a1a]"
            style={{ fontSize: 'clamp(72px,10vw,120px)' }}
          >
            TSBI
          </h2>

          <h3
            className="mb-6 font-serif font-normal leading-snug text-[#1a1a1a]"
            style={{ fontSize: 'clamp(18px,2.2vw,26px)' }}
          >
            A galaxy of brands,<br />
            <em className="block italic text-[#c4517a]">creators, culture and influence.</em>
          </h3>

          <p className="mb-8 max-w-[340px] text-sm font-light leading-relaxed text-[#6b6b6b]">
            We connect the right voices with the right brands and turn partnerships
            into meaningful influence that moves culture forward.
          </p>

          <div className="flex items-center gap-4">
            <span className="text-sm leading-none text-[#c4517a]">✦</span>
            <div>
              <div className="font-serif text-[72px] font-black leading-none text-[#c4517a]">150+</div>
              <div className="mt-1 font-mono text-[9px] uppercase tracking-[.15em] text-[#9b9b9b]">
                Talents and Growing
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT ORBIT VISUAL ── */}
        <div className="reveal d2 relative h-[360px] w-full overflow-hidden sm:h-[480px] lg:h-[680px] lg:flex-1">
          <svg className="h-full w-full" viewBox="0 0 640 560" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="coreBlob" cx="50%" cy="50%" r="50%">
                <stop offset="0%"   stopColor="#f0a8c5" stopOpacity="0.95"/>
                <stop offset="30%"  stopColor="#edaabe" stopOpacity="0.8"/>
                <stop offset="65%"  stopColor="#f5cce0" stopOpacity="0.45"/>
                <stop offset="100%" stopColor="#f8f3ee" stopOpacity="0"/>
              </radialGradient>
              <radialGradient id="ambientBlob" cx="50%" cy="50%" r="50%">
                <stop offset="0%"   stopColor="#f5d0e5" stopOpacity="0.35"/>
                <stop offset="100%" stopColor="#f8f3ee" stopOpacity="0"/>
              </radialGradient>
              <filter id="bs" x="-40%" y="-40%" width="180%" height="180%">
                <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#a07890" floodOpacity="0.28"/>
              </filter>
              <filter id="coreGlowF" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="10" result="blur"/>
                <feMerge>
                  <feMergeNode in="blur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <clipPath id="clip31"><circle cx="0" cy="0" r="31"/></clipPath>
              <clipPath id="clip25"><circle cx="0" cy="0" r="25"/></clipPath>
              <clipPath id="clipCore"><circle cx="320" cy="280" r="82"/></clipPath>
            </defs>

            {/* sparkles */}
            <text x="92"  y="76"  fontSize="9" fill="#c8a870" opacity="0.55" textAnchor="middle">✦</text>
            <text x="556" y="96"  fontSize="7" fill="#c8a870" opacity="0.45" textAnchor="middle">✦</text>
            <text x="68"  y="418" fontSize="8" fill="#c8a870" opacity="0.5"  textAnchor="middle">✦</text>
            <text x="572" y="452" fontSize="9" fill="#c8a870" opacity="0.5"  textAnchor="middle">✦</text>
            <text x="482" y="70"  fontSize="6" fill="#c0a0b8" opacity="0.45" textAnchor="middle">✦</text>
            <text x="158" y="492" fontSize="7" fill="#c0a0b8" opacity="0.4"  textAnchor="middle">✦</text>
            <circle cx="82"  cy="252" r="2"   fill="#c8b0c0" opacity="0.35"/>
            <circle cx="568" cy="308" r="2"   fill="#c8b0c0" opacity="0.35"/>
            <circle cx="200" cy="58"  r="1.5" fill="#c8a870" opacity="0.4"/>
            <circle cx="450" cy="498" r="1.5" fill="#c8a870" opacity="0.4"/>
            <circle cx="590" cy="182" r="1.5" fill="#c8b0c0" opacity="0.3"/>
            <circle cx="68"  cy="372" r="1.5" fill="#c8b0c0" opacity="0.3"/>

            {/* ambient glow */}
            <ellipse cx="320" cy="280" rx="250" ry="210" fill="url(#ambientBlob)"/>

            {/* orbit tracks */}
            <ellipse cx="320" cy="280" rx="275" ry="158" fill="none" stroke="#d8b0c5" strokeWidth="0.7" opacity="0.38"/>
            <ellipse cx="320" cy="280" rx="198" ry="114" fill="none" stroke="#d0a8bc" strokeWidth="0.8" opacity="0.42"/>
            <ellipse cx="320" cy="280" rx="125" ry="72"  fill="none" stroke="#e0c0d4" strokeWidth="0.9" opacity="0.5"/>

            {/* swirl paths */}
            <path d="M 202,212 Q 272,165 347,196 Q 412,228 382,296" fill="none" stroke="#f0c8da" strokeWidth="1.8" opacity="0.28"/>
            <path d="M 438,350 Q 368,395 293,365 Q 226,334 258,266" fill="none" stroke="#f0c8da" strokeWidth="1.8" opacity="0.28"/>
            <path d="M 175,300 Q 200,240 260,234" fill="none" stroke="#e8c0d0" strokeWidth="1.2" opacity="0.2"/>
            <path d="M 465,260 Q 440,322 380,326" fill="none" stroke="#e8c0d0" strokeWidth="1.2" opacity="0.2"/>

            {/* core blob */}
            <ellipse cx="320" cy="280" rx="118" ry="118" fill="url(#coreBlob)" filter="url(#coreGlowF)"/>
            <ellipse cx="320" cy="280" rx="82"  ry="82"  fill="#f2bcd6" opacity="0.6"/>
            {/* hari.png — centre */}
            <image href="/logoss/hari.png"
              x="238" y="198" width="164" height="164"
              clipPath="url(#clipCore)" preserveAspectRatio="xMidYMid slice"/>
            <circle cx="320" cy="280" r="82" fill="none" stroke="#e0b0cc" strokeWidth="1.5" opacity="0.6"/>

            {/* ═══ OUTER ORBIT — CW 22s ═══
                Positions (CX, CY) on the outermost ellipse (rx=275, ry=158)
                Right(595,280)  Bottom(320,438)  Left(45,280)  Top(320,122) */}
            <g style={{ transformOrigin: '320px 280px', animation: 'orbit1 22s linear infinite' }}>

              {/* Right — GSK */}
              <g transform="translate(595,280)" filter="url(#bs)">
                <circle r="38" fill="white" stroke="#c8a868" strokeWidth="1.6"/>
                <image href="/logoss/GSK_Logo_PNG5.png"
                  x="-22" y="-22" width="44" height="44"
                  clipPath="url(#clip31)" preserveAspectRatio="xMidYMid meet"/>
                <circle r="31" fill="none" stroke="#c8a868" strokeWidth="1"/>
              </g>

              {/* Bottom — Mumbai Indians */}
              <g transform="translate(320,438)" filter="url(#bs)">
                <circle r="38" fill="white" stroke="#c8a868" strokeWidth="1.6"/>
                <image href="/logoss/MI.jpg"
                  x="-22" y="-22" width="44" height="44"
                  clipPath="url(#clip31)" preserveAspectRatio="xMidYMid meet"/>
                <circle r="31" fill="none" stroke="#c8a868" strokeWidth="1"/>
              </g>

              {/* Left — Ashok Leyland */}
              <g transform="translate(45,280)" filter="url(#bs)">
                <circle r="38" fill="white" stroke="#c8a868" strokeWidth="1.6"/>
                <image href="/logoss/ashok%20leyland.png"
                  x="-22" y="-22" width="44" height="44"
                  clipPath="url(#clip31)" preserveAspectRatio="xMidYMid meet"/>
                <circle r="31" fill="none" stroke="#c8a868" strokeWidth="1"/>
              </g>

              {/* Top — Dharma Productions */}
              <g transform="translate(320,122)" filter="url(#bs)">
                <circle r="33" fill="white" stroke="#c8a868" strokeWidth="1.6"/>
                <image href="/logoss/dharma%20production.png"
                  x="-20" y="-20" width="40" height="40"
                  clipPath="url(#clip25)" preserveAspectRatio="xMidYMid meet"/>
                <circle r="26" fill="none" stroke="#c8a868" strokeWidth="1"/>
              </g>
            </g>

            {/* ═══ INNER ORBIT — CCW 14s ═══
                Positions on the middle ellipse (rx=198, ry=114)
                Upper-right(460,199)  Lower-right(460,361)  Lower-left(180,361)  Upper-left(180,199) */}
            <g style={{ transformOrigin: '320px 280px', animation: 'orbit1 14s linear infinite reverse' }}>

              {/* Upper right — IDFC First Bank */}
              <g transform="translate(460,199)" filter="url(#bs)">
                <circle r="32" fill="white" stroke="#c0a0b8" strokeWidth="1.4"/>
                <image href="/logoss/Logo_of_IDFC_First_Bank.svg.png"
                  x="-18" y="-18" width="36" height="36"
                  clipPath="url(#clip25)" preserveAspectRatio="xMidYMid meet"/>
                <circle r="25" fill="none" stroke="#c0a0b8" strokeWidth="0.8"/>
              </g>

              {/* Lower right — Gulf Giants */}
              <g transform="translate(460,361)" filter="url(#bs)">
                <circle r="32" fill="white" stroke="#c0a0b8" strokeWidth="1.4"/>
                <image href="/logoss/gulf%20giants.png"
                  x="-18" y="-18" width="36" height="36"
                  clipPath="url(#clip25)" preserveAspectRatio="xMidYMid meet"/>
                <circle r="25" fill="none" stroke="#c0a0b8" strokeWidth="0.8"/>
              </g>

              {/* Lower left — AGL */}
              <g transform="translate(180,361)" filter="url(#bs)">
                <circle r="32" fill="white" stroke="#c0a0b8" strokeWidth="1.4"/>
                <image href="/logoss/agl.png"
                  x="-18" y="-18" width="36" height="36"
                  clipPath="url(#clip25)" preserveAspectRatio="xMidYMid meet"/>
                <circle r="25" fill="none" stroke="#c0a0b8" strokeWidth="0.8"/>
              </g>

              {/* Upper left — TBZ */}
              <g transform="translate(180,199)" filter="url(#bs)">
                <circle r="32" fill="white" stroke="#c0a0b8" strokeWidth="1.4"/>
                <image href="/logoss/Tbz_logo.jpg"
                  x="-18" y="-18" width="36" height="36"
                  clipPath="url(#clip25)" preserveAspectRatio="xMidYMid meet"/>
                <circle r="25" fill="none" stroke="#c0a0b8" strokeWidth="0.8"/>
              </g>
            </g>

            {/* rose-gold node dots */}
            <circle cx="320" cy="122" r="5" fill="#c8a068" opacity="0.75"/>
            <circle cx="595" cy="280" r="5" fill="#c8a068" opacity="0.75"/>
            <circle cx="320" cy="438" r="5" fill="#c8a068" opacity="0.75"/>
            <circle cx="45"  cy="280" r="5" fill="#c8a068" opacity="0.75"/>
          </svg>
        </div>

      </div>
    </section>
  );
}
