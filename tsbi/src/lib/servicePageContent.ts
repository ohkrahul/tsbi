/**
 * Default copy for the service pages. The CMS globals are seeded from this and
 * the pages fall back to it, so an unseeded or unreachable CMS renders exactly
 * what shipped. Edit pages in the studio, not here.
 */

export type Row = Record<string, string>

export type DigitalTransformationContent = {
  eyebrow: string
  heroTitleBefore: string
  heroWords: Row[]
  heroTitleAfter: string
  heroBody: string
  heroPrimaryLabel: string
  heroPrimaryHref: string
  heroSecondaryLabel: string
  heroSecondaryHref: string
  logosLabel: string
  logos: Row[]
  phoneRows: Row[]
  offerHeading: string
  offerings: Row[]
  buildHeading: string
  whatWeBuild: Row[]
  workHeading: string
  workLinkLabel: string
  processHeading: string
  steps: Row[]
  ctaHeading: string
  ctaBody: string
  ctaPrimaryLabel: string
  ctaSecondaryLabel: string
}

export const digitalTransformationDefaults: DigitalTransformationContent = {
  eyebrow: 'Technology · Strategy · Experience',
  heroTitleBefore: 'Tech Solutions That',
  heroWords: [
    { text: 'Build,', color: '#b96cff' },
    { text: 'Launch &', color: '#e0197d' },
    { text: 'Scale', color: '#4d8bff' },
  ],
  heroTitleAfter: 'Digital Experiences',
  heroBody:
    'TSBI is a digital product and technology partner that helps brands create powerful websites, web & mobile apps, microsites, campaign tech, eCommerce experiences, dashboards and custom platforms that drive growth.',
  heroPrimaryLabel: 'Explore Services →',
  heroPrimaryHref: '#offer',
  heroSecondaryLabel: '▶ View Work',
  heroSecondaryHref: '/case-studies',
  logosLabel: 'Trusted by startups, enterprises & global brands',
  logos: [
    { name: 'Lipton', color: '#d99000' },
    { name: 'Red Label', color: '#c4161c' },
    { name: 'Zydus', color: '#0066b3' },
    { name: 'Vatika', color: '#2e7d32' },
    { name: 'Sandu', color: '#1a1a2e' },
    { name: 'LuLu', color: '#6a1b9a' },
  ],
  phoneRows: [
    { img: '/tech/2.png', name: 'Red Label Campaign', v: '2.3%' },
    { img: '/tech/1.png', name: 'Lipton Game', v: '6.3%' },
    { img: '/tech/9.png', name: 'Thank You Fighter', v: '3.5%' },
  ],
  offerHeading: 'Services We Offer',
  offerings: [
    { icon: 'web', title: 'Website Development', desc: 'Fast, responsive and SEO-friendly websites that reflect your brand.' },
    { icon: 'app', title: 'Web App Development', desc: 'Scalable web applications built for performance and growth.' },
    { icon: 'mobile', title: 'Mobile App Development', desc: 'Native & cross-platform apps for iOS and Android.' },
    { icon: 'micro', title: 'Microsites & Landing Pages', desc: 'Conversion-driven microsites for campaigns and launches.' },
    { icon: 'cart', title: 'Ecommerce Development', desc: 'Secure, scalable and delightful online shopping experiences.' },
    { icon: 'game', title: 'Gamified Experiences', desc: 'Engaging games & interactive experiences that drive results.' },
    { icon: 'dash', title: 'Custom Dashboards & Portals', desc: 'Real-time dashboards and portals that simplify complex data.' },
    { icon: 'api', title: 'Backend & API Integrations', desc: 'Robust backend systems and seamless third-party integrations.' },
    { icon: 'seo', title: 'SEO & Performance Optimization', desc: 'Better visibility, speed and performance that rank.' },
    { icon: 'support', title: 'Maintenance & Support', desc: 'Reliable support & continuous updates to keep you ahead.' },
  ],
  buildHeading: 'What We Build',
  whatWeBuild: [
    { icon: 'globe', tint: '#7b1fa2', title: 'Brand Websites', desc: 'Modern, high-performance websites that strengthen brand presence.' },
    { icon: 'mega', tint: '#e0197d', title: 'Campaign Tech', desc: 'Interactive campaigns & microsites that engage and convert audiences.' },
    { icon: 'layers', tint: '#1a6aff', title: 'Business Platforms', desc: 'Custom platforms & portals that streamline operations and boost efficiency.' },
    { icon: 'growth', tint: '#16a34a', title: 'Commerce & Growth', desc: 'Ecommerce & digital products designed to acquire, engage and scale revenue.' },
  ],
  workHeading: 'Selected Work',
  workLinkLabel: 'View all projects →',
  processHeading: 'How We Work',
  steps: [
    { n: '1', color: '#7b1fa2', icon: 'search', title: 'Discover', desc: 'We understand your goals, audience and challenges.' },
    { n: '2', color: '#e0197d', icon: 'pen', title: 'Design', desc: 'We craft strategy, UX/UI and product roadmap.' },
    { n: '3', color: '#1a6aff', icon: 'code', title: 'Develop', desc: 'We build robust, scalable and future-ready solutions.' },
    { n: '4', color: '#16a34a', icon: 'rocket', title: 'Launch & Support', desc: 'We launch, monitor and optimize for long-term growth.' },
  ],
  ctaHeading: 'Need a tech partner for\nyour next digital product?',
  ctaBody: "Let's build something impactful together.",
  ctaPrimaryLabel: "Let's Talk →",
  ctaSecondaryLabel: 'See More Case Studies →',
}
