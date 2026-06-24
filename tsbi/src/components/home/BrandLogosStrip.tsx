import Image from 'next/image';

// Two greyscale rows of client logos with a divider line between them.
// Logos render desaturated/faded and bloom into colour on hover. Devgn keeps
// its colour by default (it is the one coloured mark in the mockup).
type Logo = { name: string; src: string; color?: boolean };

const ROW_ONE: Logo[] = [
  { name: "Dabur Herb'l", src: '/non-entertainment/dabur.png' },
  { name: 'Into It', src: '/non-entertainment/final_logo_INTOIT-02_89b8d92c-0882-4d89-8215-fc7bbe82fb29.webp' },
  { name: 'AGL', src: '/non-entertainment/agl.png' },
  { name: 'GSK', src: '/non-entertainment/GSK_Logo_PNG5.png' },
  { name: 'Devgn Films', src: '/entertainment/devgan.png', color: true },
  { name: 'Lodha', src: '/non-entertainment/lodha.png' },
  { name: 'Pret', src: '/non-entertainment/pret.png' },
  { name: 'GreatWhite', src: '/non-entertainment/GreatWhite-logo-696x364.png' },
];

const ROW_TWO: Logo[] = [
  { name: 'Mumbai Indians', src: '/entertainment/MI.jpg' },
  { name: 'Zee TV', src: '/entertainment/zee%20tv.png' },
  { name: 'JioHotstar', src: '/entertainment/jiohotstart.png' },
  { name: 'National Geographic', src: '/entertainment/national%20geographic.png' },
  { name: 'KidZania', src: '/non-entertainment/kidsznia.png' },
  { name: 'Dharma Productions', src: '/entertainment/dharma%20production.png' },
  { name: 'Disney India', src: '/entertainment/disney%20india.png' },
  { name: 'Filmfare', src: '/entertainment/filmfare.webp' },
  { name: 'Cinepolis', src: '/entertainment/cineplex.png' },
  { name: 'Colors', src: '/entertainment/colors.webp' },
];

function LogoRow({ logos }: { logos: Logo[] }) {
  return (
    <div className="bls-row">
      {logos.map((l) => (
        // Inline position+height guarantees a sized, positioned parent for the
        // fill image even before the stylesheet applies (avoids the Turbopack
        // dev "fill / height 0" race). Width stays in CSS so it can flex/wrap.
        <div key={l.name} className={`bls-logo${l.color ? ' color' : ''}`} title={l.name} style={{ position: 'relative', height: 42 }}>
          <Image src={l.src} alt={l.name} fill loading="eager" sizes="140px" style={{ objectFit: 'contain' }} />
        </div>
      ))}
    </div>
  );
}

export default function BrandLogosStrip() {
  return (
    <section className="bls-root reveal" aria-label="Brands we work with">
      <LogoRow logos={ROW_ONE} />
      <div className="bls-divider" />
      <LogoRow logos={ROW_TWO} />
    </section>
  );
}
