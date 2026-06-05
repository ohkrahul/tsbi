import Link from 'next/link';
import { getCaseStudies, getCaseStudyBySlug, mediaUrl } from '@/lib/strapi';

// ─── Local fallback study data ────────────────────────────────────────────────

const frameImages = [
  '/images/banner-home3-1-400x500.jpg',
  '/images/banner-home2-2-400x500.jpg',
  '/images/bg-about-company-400x500.jpg',
  '/images/portfolio-popup-10-400x500.jpg',
  '/images/portfolio-popup-12-400x500.jpg',
  '/images/gallery-slider-02-400x500.jpg',
];

const FALLBACK_STUDIES: Record<string, {
  client: string; title: string; year: string;
  tags: string[]; services: string; deliverables: string; platforms: string;
  conceptTitle: string; conceptBody: string;
  heroGrad: string; heroImage: string; conceptGrad: string; conceptImage: string;
  frames: { cap: string; grad: string; img: string }[];
  metrics: { val: string; label: string; color?: string }[];
  youtube?: string;
}> = {
  'tiger-refresh': {
    client: 'Tiger Beer', title: 'Refresh\nYour Vibes', year: '2024',
    tags: ['Campaign', 'Social', 'Influencer', 'Film'],
    services: 'Creative, Social, Production', deliverables: 'Hero Film, Reels, OOH', platforms: 'IG · YT · TikTok · OOH',
    conceptTitle: 'When the heat hits,\nyou need a vibe reset.',
    conceptBody: "We built the campaign around the insight that Tiger isn't just a beer — it's permission to pause, pivot and refresh.",
    heroGrad: 'linear-gradient(135deg,#301500cc,#200d00cc)', heroImage: '/images/banner-home3-1-400x500.jpg',
    conceptGrad: 'linear-gradient(135deg,#301500bb,#200d00bb)', conceptImage: '/images/banner-home2-2-400x500.jpg',
    frames: [
      { cap: '01 — Heat', grad: 'linear-gradient(135deg,#301800cc,#1a0f00cc)', img: frameImages[0] },
      { cap: '02 — Escape', grad: 'linear-gradient(135deg,#200d00cc,#150900cc)', img: frameImages[1] },
      { cap: '03 — Crew', grad: 'linear-gradient(135deg,#0d1528cc,#1a2240cc)', img: frameImages[2] },
      { cap: '04 — Moment', grad: 'linear-gradient(135deg,#051510cc,#0a2018cc)', img: frameImages[3] },
      { cap: '05 — Vibe', grad: 'linear-gradient(135deg,#1a0f00cc,#2a1800cc)', img: frameImages[4] },
      { cap: '06 — Refresh', grad: 'linear-gradient(135deg,#100a20cc,#1a1030cc)', img: frameImages[5] },
    ],
    metrics: [
      { val: '48M', label: 'Total Views', color: 'var(--magenta)' },
      { val: '6.2M', label: 'Engagements', color: 'var(--orange)' },
      { val: '+34%', label: 'Brand Lift', color: 'var(--magenta)' },
      { val: '120+', label: 'Creator Collabs', color: 'var(--magenta)' },
    ],
  },
  'loreal-glycolic': {
    client: "L'Oréal Paris", title: 'Glycolic Bright\nLaunch Campaign', year: '2024',
    tags: ['Campaign', 'Influencer', 'Digital'],
    services: 'Strategy, Creative, Influencer', deliverables: 'Campaign Films, Reels, Digital', platforms: 'IG · YT · Meta Ads',
    conceptTitle: 'Bright skin, bold statement.',
    conceptBody: "A multi-tier influencer strategy that launched Glycolic Bright across beauty communities in India and Southeast Asia.",
    heroGrad: 'linear-gradient(135deg,#1a0f00cc,#301800cc)', heroImage: '/images/banner-home2-2-400x500.jpg',
    conceptGrad: 'linear-gradient(135deg,#1a0f00bb,#301800bb)', conceptImage: '/images/bg-about-company-400x500.jpg',
    frames: [
      { cap: '01 — Skin', grad: 'linear-gradient(135deg,#301800cc,#1a0f00cc)', img: frameImages[1] },
      { cap: '02 — Glow', grad: 'linear-gradient(135deg,#200d00cc,#150900cc)', img: frameImages[2] },
      { cap: '03 — Creator', grad: 'linear-gradient(135deg,#1a0a30cc,#100520cc)', img: frameImages[3] },
      { cap: '04 — Review', grad: 'linear-gradient(135deg,#051510cc,#0a2018cc)', img: frameImages[4] },
      { cap: '05 — Results', grad: 'linear-gradient(135deg,#1a0f00cc,#2a1800cc)', img: frameImages[5] },
      { cap: '06 — Brand', grad: 'linear-gradient(135deg,#0d1528cc,#1a2240cc)', img: frameImages[0] },
    ],
    metrics: [
      { val: '120M', label: 'Total Reach', color: 'var(--magenta)' },
      { val: '8.4M', label: 'Engagements', color: 'var(--orange)' },
      { val: '+52%', label: 'Sales Lift', color: 'var(--magenta)' },
      { val: '200+', label: 'Creators', color: 'var(--magenta)' },
    ],
  },
  'dharma-production': {
    client: 'Sunny Sanskari Ki Tulsi Kumari | Dharma Productions',
    title: 'Chaos, Chemistry\n& Cultural Noise',
    year: '2025',
    tags: ['Film Marketing', 'Entertainment', 'Social Media', 'Reels'],
    services: 'Film Marketing, Social Media Strategy, Influencer Activation',
    deliverables: 'Campaign Films, Reels, Meme Strategy, Influencer Content',
    platforms: 'IG · YT · Twitter · OTT',
    conceptTitle: "Rom-coms don't thrive on subtlety —\nthey thrive on chaos.",
    conceptBody: "We turned cast energy, heartbreak, and music trends into a high-voltage social ecosystem where chaos sold romance. Built around the infectious chemistry of Varun Dhawan and Janhvi Kapoor, songs like Bijuria and Panwadi ignited millions of reels and took over Instagram feeds — Rohit and Sanya's love for dance becoming a cultural trigger that audiences couldn't resist recreating.",
    heroGrad: 'linear-gradient(135deg,#3d0028cc,#1a0015cc)',
    heroImage: '/images/banner-home2-2-400x500.jpg',
    conceptGrad: 'linear-gradient(135deg,#3d0028bb,#1a0015bb)',
    conceptImage: '/images/banner-home3-1-400x500.jpg',
    youtube: '9FUd-D4FWjw',
    frames: [
      { cap: '01 — Chemistry', grad: 'linear-gradient(135deg,#3d0028cc,#1a0015cc)', img: frameImages[0] },
      { cap: '02 — Bijuria Hook', grad: 'linear-gradient(135deg,#2a0030cc,#1a0025cc)', img: frameImages[1] },
      { cap: '03 — Reel Storm', grad: 'linear-gradient(135deg,#200d00cc,#150900cc)', img: frameImages[2] },
      { cap: '04 — Meme Culture', grad: 'linear-gradient(135deg,#1a1530cc,#100f20cc)', img: frameImages[3] },
      { cap: '05 — Panwadi Trend', grad: 'linear-gradient(135deg,#1a0030cc,#0d0020cc)', img: frameImages[4] },
      { cap: '06 — Box Office', grad: 'linear-gradient(135deg,#2d0050cc,#1a0030cc)', img: frameImages[5] },
    ],
    metrics: [
      { val: '500M+', label: 'Total Reach', color: 'var(--magenta)' },
      { val: '2M+', label: 'UGC Reels Created', color: 'var(--orange)' },
      { val: '#1', label: 'Trending Songs', color: 'var(--magenta)' },
      { val: '85M+', label: 'Video Views', color: 'var(--magenta)' },
    ],
  },
  'disney-india': {
    client: 'Disney India',
    title: 'Disney\nDelicious Minis',
    year: '2024',
    youtube: 'qzHtzyuk_g4',
    tags: ['Content Series', 'Entertainment', 'Food', 'Kids & Family'],
    services: 'Content Strategy, Video Production, Social Media',
    deliverables: '24 Short Videos, Social Content, Series Packaging',
    platforms: 'YT · IG · Disney+ Hotstar',
    conceptTitle: "How we married health\nwith taste for Disney India.",
    conceptBody: "Disney India's stories teach, entertain, and inspire generations. Headlined by Chef Saransh Goila and Chef Chinu Vaze, the Disney Delicious Minis series blended healthy recipes with Disney movie references and characters — making it a wholesome package for adults and kids alike. Goila, author and winner of Food Food Maha Challenge, and Vaze, celebrity chef, host, and writer, brought their unique expertise to 24 short videos that made healthy eating magical.",
    heroGrad: 'linear-gradient(135deg,#00205bcc,#001030cc)',
    heroImage: '/images/banner-home2-2-400x500.jpg',
    conceptGrad: 'linear-gradient(135deg,#00205bbb,#001030bb)',
    conceptImage: '/images/portfolio-popup-10-400x500.jpg',
    frames: [
      { cap: '01 — The Series', grad: 'linear-gradient(135deg,#00205bcc,#001030cc)', img: frameImages[0] },
      { cap: '02 — Chef Saransh Goila', grad: 'linear-gradient(135deg,#001845cc,#000d28cc)', img: frameImages[1] },
      { cap: '03 — Chef Chinu Vaze', grad: 'linear-gradient(135deg,#00102acc,#000820cc)', img: frameImages[2] },
      { cap: '04 — Disney Characters', grad: 'linear-gradient(135deg,#0a0850cc,#060530cc)', img: frameImages[3] },
      { cap: '05 — Healthy Recipes', grad: 'linear-gradient(135deg,#001845cc,#00102acc)', img: frameImages[4] },
      { cap: '06 — 24 Episodes', grad: 'linear-gradient(135deg,#00205bcc,#001030cc)', img: frameImages[5] },
    ],
    metrics: [
      { val: '24', label: 'Episodes Produced', color: 'var(--magenta)' },
      { val: '50M+', label: 'Total Views', color: 'var(--orange)' },
      { val: '2', label: 'Celebrity Chefs', color: 'var(--magenta)' },
      { val: '98%', label: 'Positive Sentiment', color: 'var(--magenta)' },
    ],
  },
  'son-of-sardaar-2': {
    client: 'Son Of Sardaar 2 | Devgn Films',
    title: 'Jahan Son Hai,\nWahan Fun Hai',
    year: '2025',
    youtube: 'HSX_KPfbP1o',
    tags: ['Film Marketing', 'Entertainment', 'Comedy', 'Viral Campaign'],
    services: 'Film Marketing, Social Media Strategy, Influencer Activation',
    deliverables: 'Campaign Films, Viral Content, Podcast, Social Assets',
    platforms: 'IG · YT · Twitter · OTT',
    conceptTitle: "Fun itself was\nthe strategy.",
    conceptBody: "In a crowded comedy landscape where humour blends into sameness, we shifted focus from promotion to pure vibe. What began as a simple step evolved into the viral trend #PehlaTuDujaTu — turning even trolls into participants. Casual round-tables, a cast podcast, and the nostalgia-fuelled PO PO song reignited excitement, while third-party amplification ensured one idea landed firmly across platforms: Fun = Son Of Sardaar 2.",
    heroGrad: 'linear-gradient(135deg,#3a1a00cc,#1a0c00cc)',
    heroImage: '/images/banner-home3-1-400x500.jpg',
    conceptGrad: 'linear-gradient(135deg,#3a1a00bb,#1a0c00bb)',
    conceptImage: '/images/portfolio-popup-10-400x500.jpg',
    frames: [
      { cap: '01 — The Vibe', grad: 'linear-gradient(135deg,#3a1a00cc,#1a0c00cc)', img: frameImages[0] },
      { cap: '02 — #PehlaTuDujaTu', grad: 'linear-gradient(135deg,#2a1200cc,#150900cc)', img: frameImages[1] },
      { cap: '03 — Behind the Scenes', grad: 'linear-gradient(135deg,#201000cc,#110800cc)', img: frameImages[2] },
      { cap: '04 — Cast Chemistry', grad: 'linear-gradient(135deg,#1a0c00cc,#0d0600cc)', img: frameImages[3] },
      { cap: '05 — PO PO Song', grad: 'linear-gradient(135deg,#301500cc,#1a0c00cc)', img: frameImages[4] },
      { cap: '06 — Box Office', grad: 'linear-gradient(135deg,#2a1000cc,#150800cc)', img: frameImages[5] },
    ],
    metrics: [
      { val: '800M+', label: 'Total Reach', color: 'var(--magenta)' },
      { val: '50M+', label: 'Reel Views', color: 'var(--orange)' },
      { val: '#1', label: 'Trending — #PehlaTuDujaTu', color: 'var(--magenta)' },
      { val: '3M+', label: 'UGC Posts', color: 'var(--magenta)' },
    ],
  },
  'maa-devgn': {
    client: 'MAA | Devgn Films',
    title: 'End Credit\nGoes to MAA',
    year: '2025',
    youtube: 'zwtZj6YB9xk',
    tags: ['Film Marketing', 'Horror', 'Emotional Campaign', 'Universe Building'],
    services: 'Film Marketing, Universe Strategy, Digital, Experiential',
    deliverables: 'Trailers, Experiential Activations, Digital Storytelling, AI Narratives',
    platforms: 'IG · YT · Twitter · OTT · Podcast',
    conceptTitle: "Fear meets faith.\nMotherhood as armour.",
    conceptBody: "Launching a pure horror film demanded expanding both audience and universe. We inducted MAA into the Shaitaan supernatural arc by introducing R Madhavan at the trailer launch, deepening horror credibility instantly. To broaden appeal, we reframed the narrative around faith and motherhood — replacing surnames with mothers' names in the credits, a first in Indian cinema. Immersive fear-first experiences: terror train takeovers, paranormal podcasts, and AI-led atmospheric storytelling made evil feel formless and real.",
    heroGrad: 'linear-gradient(135deg,#0a0010cc,#050008cc)',
    heroImage: '/images/bg-about-company-400x500.jpg',
    conceptGrad: 'linear-gradient(135deg,#0a0010bb,#050008bb)',
    conceptImage: '/images/portfolio-popup-12-400x500.jpg',
    frames: [
      { cap: '01 — The Universe', grad: 'linear-gradient(135deg,#0a0010cc,#050008cc)', img: frameImages[0] },
      { cap: '02 — Shaitaan Arc', grad: 'linear-gradient(135deg,#0f000fcc,#070007cc)', img: frameImages[1] },
      { cap: '03 — R Madhavan Reveal', grad: 'linear-gradient(135deg,#100015cc,#08000acc)', img: frameImages[2] },
      { cap: '04 — Mothers\' Credits', grad: 'linear-gradient(135deg,#08000acc,#040006cc)', img: frameImages[3] },
      { cap: '05 — Terror Train', grad: 'linear-gradient(135deg,#050010cc,#030008cc)', img: frameImages[4] },
      { cap: '06 — AI Storytelling', grad: 'linear-gradient(135deg,#0a0012cc,#06000acc)', img: frameImages[5] },
    ],
    metrics: [
      { val: '600M+', label: 'Total Impressions', color: 'var(--magenta)' },
      { val: '70M+', label: 'Video Views', color: 'var(--orange)' },
      { val: '#1', label: 'Horror Genre Debut 2025', color: 'var(--magenta)' },
      { val: '1st', label: 'Credits with Mothers\' Names', color: 'var(--magenta)' },
    ],
  },
  'mumbai-indians': {
    client: 'DHL — Mumbai Indians',
    title: 'Life Ka Filter\n#ThatsMyGame',
    year: '2024',
    youtube: 'MJofvf2lBNY',
    tags: ['IPL Campaign', 'Logistics', 'Brand Film', 'Social Media'],
    services: 'Campaign Strategy, Film Production, Social Media',
    deliverables: 'Campaign Films, Social Content, Digital',
    platforms: 'IG · YT · Twitter · IPL Broadcast',
    conceptTitle: "Cricket, not dancing.\nNot singing. Cricket.",
    conceptBody: "During the IPL season, ad campaigns featuring cricketers dancing on green screens are ubiquitous. When tasked with creating a unique proposition for DHL with Mumbai Indians, we broke the mold with #ThatsMyGame — cricketers asserting their game is cricket. On the same shoot we crafted 'Dil Se Indian', capturing the indomitable spirit of Mumbai Indians while subtly integrating DHL's strengths, ensuring videos traveled easily across social feeds and maximised engagement.",
    heroGrad: 'linear-gradient(135deg,#00205bcc,#001845cc)',
    heroImage: '/images/banner-home3-1-400x500.jpg',
    conceptGrad: 'linear-gradient(135deg,#00205bbb,#001845bb)',
    conceptImage: '/images/portfolio-popup-12-400x500.jpg',
    frames: [
      { cap: '01 — Breaking the Mold', grad: 'linear-gradient(135deg,#00205bcc,#001845cc)', img: frameImages[0] },
      { cap: '02 — #ThatsMyGame', grad: 'linear-gradient(135deg,#001845cc,#00102acc)', img: frameImages[1] },
      { cap: '03 — Cricketers Speak', grad: 'linear-gradient(135deg,#00305acc,#001030cc)', img: frameImages[2] },
      { cap: '04 — Dil Se Indian', grad: 'linear-gradient(135deg,#0a0a50cc,#050530cc)', img: frameImages[3] },
      { cap: '05 — DHL Integration', grad: 'linear-gradient(135deg,#8b0000cc,#5a0000cc)', img: frameImages[4] },
      { cap: '06 — Social Reach', grad: 'linear-gradient(135deg,#001845cc,#00102acc)', img: frameImages[5] },
    ],
    metrics: [
      { val: '200M+', label: 'Total Reach', color: 'var(--magenta)' },
      { val: '45M+', label: 'Video Views', color: 'var(--orange)' },
      { val: '2', label: 'Campaigns in 1 Shoot', color: 'var(--magenta)' },
      { val: '#1', label: 'Trending on Twitter', color: 'var(--magenta)' },
    ],
  },
  'kesari-chapter-2': {
    client: 'Kesari Chapter 2 | Dharma Productions',
    title: 'Witness\nthe History',
    year: '2025',
    youtube: 'r-7g08INMSI',
    tags: ['Film Marketing', 'Entertainment', 'Historical', 'Gen Z'],
    services: 'Film Marketing, Creative Strategy, Digital',
    deliverables: 'Teaser Campaign, Progressive Reveals, Social Content, Influencer',
    platforms: 'IG · YT · Twitter · All Platforms',
    conceptTitle: "From passive spectators\nto active witnesses.",
    conceptBody: "In an entertainment-heavy landscape where film promotions often rely on spectacle, marketing a century-old courtroom trial for Gen Z needed a radical shift. With Kesari Chapter 2, we broke convention — starting with a disruptive all-platform blank-screen teaser that hijacked feeds and sparked nationwide curiosity, then progressively revealing Akshay Kumar, R Madhavan, and Ananya Panday while balancing mass appeal with cultural relevance.",
    heroGrad: 'linear-gradient(135deg,#2d1800cc,#1a0e00cc)',
    heroImage: '/images/bg-about-company-400x500.jpg',
    conceptGrad: 'linear-gradient(135deg,#2d1800bb,#1a0e00bb)',
    conceptImage: '/images/portfolio-popup-12-400x500.jpg',
    frames: [
      { cap: '01 — The Silence', grad: 'linear-gradient(135deg,#1a0e00cc,#2d1800cc)', img: frameImages[0] },
      { cap: '02 — Blank Teaser', grad: 'linear-gradient(135deg,#200d00cc,#150900cc)', img: frameImages[1] },
      { cap: '03 — Akshay Kumar', grad: 'linear-gradient(135deg,#2a1500cc,#1a0e00cc)', img: frameImages[2] },
      { cap: '04 — R Madhavan', grad: 'linear-gradient(135deg,#1a0a00cc,#0d0600cc)', img: frameImages[3] },
      { cap: '05 — Ananya Panday', grad: 'linear-gradient(135deg,#301800cc,#1a0f00cc)', img: frameImages[4] },
      { cap: '06 — In Theatres', grad: 'linear-gradient(135deg,#2d1500cc,#1a0c00cc)', img: frameImages[5] },
    ],
    metrics: [
      { val: '1B+', label: 'Total Impressions', color: 'var(--magenta)' },
      { val: '85M+', label: 'Video Views', color: 'var(--orange)' },
      { val: '200Cr+', label: 'Box Office', color: 'var(--magenta)' },
      { val: '96%', label: 'Positive Sentiment', color: 'var(--magenta)' },
    ],
  },
};

// ─── Static params ────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const cmsStudies = await getCaseStudies();
  const cmsSlgs = cmsStudies.map((s) => ({ slug: s.slug }));
  const localSlgs = Object.keys(FALLBACK_STUDIES).map((slug) => ({ slug }));
  // merge, deduplicate
  const seen = new Set<string>();
  return [...cmsSlgs, ...localSlgs].filter(({ slug }) => {
    if (seen.has(slug)) return false;
    seen.add(slug);
    return true;
  });
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Try CMS first, fall back to local hardcoded data
  const cmsStudy = await getCaseStudyBySlug(slug);
  const allCmsStudies = await getCaseStudies();

  let study: {
    client: string; title: string; year: string | number;
    tags: string[]; services: string; deliverables: string; platforms: string;
    conceptTitle: string; conceptBody: string;
    heroGrad: string; heroImage: string; conceptGrad: string; conceptImage: string;
    frames: { cap: string; grad: string; img: string }[];
    metrics: { val: string; label: string; color?: string }[];
    youtube?: string;
  };

  let navStudies: { slug: string; client: string }[];

  if (cmsStudy) {
    study = {
      client: cmsStudy.client,
      title: cmsStudy.title,
      year: cmsStudy.year,
      tags: cmsStudy.tags ?? [],
      services: cmsStudy.services ?? '',
      deliverables: cmsStudy.deliverables ?? '',
      platforms: cmsStudy.platforms ?? '',
      conceptTitle: cmsStudy.conceptTitle ?? '',
      conceptBody: cmsStudy.conceptBody ?? '',
      heroGrad: cmsStudy.heroGrad ?? 'linear-gradient(135deg,#10101acc,#1a1a28cc)',
      heroImage: cmsStudy.heroImage ? mediaUrl(cmsStudy.heroImage) : '/images/banner-home3-1-400x500.jpg',
      conceptGrad: cmsStudy.conceptGrad ?? 'linear-gradient(135deg,#10101abb,#1a1a28bb)',
      conceptImage: cmsStudy.conceptImage ? mediaUrl(cmsStudy.conceptImage) : '/images/bg-about-company-400x500.jpg',
      frames: cmsStudy.frames ?? [],
      metrics: cmsStudy.metrics ?? [],
      youtube: undefined,
    };
    navStudies = allCmsStudies.map((s) => ({ slug: s.slug, client: s.client }));
  } else {
    const local = FALLBACK_STUDIES[slug] ?? FALLBACK_STUDIES['tiger-refresh'];
    study = local;
    navStudies = Object.entries(FALLBACK_STUDIES).map(([s, d]) => ({ slug: s, client: d.client }));
  }

  const titleLines = String(study.title).split('\n');
  const galIdx = navStudies.findIndex((s) => s.slug === slug);
  const prevStudy = galIdx > 0 ? navStudies[galIdx - 1] : null;
  const nextStudy = galIdx < navStudies.length - 1 ? navStudies[galIdx + 1] : null;

  return (
    <>
      {/* Hero */}
      <section className="cs-hero">
        <div className="cs-hero-visual" style={{ backgroundImage: `url(${study.heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="cs-hero-visual" style={{ position: 'absolute', inset: 0, background: study.heroGrad }} />
        <div className="cs-hero-bg" />
        <div style={{ position: 'absolute', top: 120, right: 48, width: '38%', aspectRatio: '16/9', borderRadius: 6, overflow: 'hidden', border: '1px solid rgba(255,255,255,.1)', zIndex: 2 }}>
          {study.youtube ? (
            <iframe
              src={`https://www.youtube.com/embed/${study.youtube}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
            />
          ) : (
            <>
              <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${study.heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <div style={{ position: 'absolute', inset: 0, background: study.heroGrad }} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="hero-play" style={{ background: 'rgba(255,255,255,.15)', border: '1px solid rgba(255,255,255,.3)' }}>
                  <div className="hero-play-tri" />
                </div>
              </div>
            </>
          )}
        </div>
        <div className="cs-tags">{study.tags.map((t) => <span key={t} className="cs-tag">{t}</span>)}</div>
        <h1 className="cs-title">{titleLines.map((l, i) => <span key={i}>{l}{i < titleLines.length - 1 && <br />}</span>)}</h1>
        <div className="cs-client">{study.client} × TSBI — {study.year}</div>
      </section>

      {/* Info row */}
      <div className="cs-info-row">
        <div className="cs-ic"><div className="cs-ic-label">Client</div><div className="cs-ic-val">{study.client}</div></div>
        <div className="cs-ic"><div className="cs-ic-label">Services</div><div className="cs-ic-val">{study.services}</div></div>
        <div className="cs-ic"><div className="cs-ic-label">Year</div><div className="cs-ic-val">{study.year}</div></div>
        <div className="cs-ic"><div className="cs-ic-label">Deliverables</div><div className="cs-ic-val">{study.deliverables}</div></div>
        <div className="cs-ic"><div className="cs-ic-label">Platforms</div><div className="cs-ic-val">{study.platforms}</div></div>
      </div>

      {/* Concept */}
      <div className="cs-concept">
        <div className="cs-concept-text">
          <div className="sec-label">The Concept</div>
          <h2 className="cs-concept-h2">{study.conceptTitle.split('\n').map((l, i) => <span key={i}>{l}{i === 0 && <br />}</span>)}</h2>
          <p className="cs-concept-body">{study.conceptBody}</p>
        </div>
        <div className="cs-concept-img">
          <div className="cs-concept-img-bg" style={{ backgroundImage: `url(${study.conceptImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
          <div style={{ position: 'absolute', inset: 0, background: study.conceptGrad }} />
        </div>
      </div>

      {/* Storyboard */}
      <div className="cs-frames">
        <div className="sec-label">Storyboard</div>
        <h2 className="cs-frames-h2">The Visual Story</h2>
        <div className="cs-frames-grid">
          {study.frames.map((f) => (
            <div key={f.cap} className="cs-frame">
              <div className="cs-frame-img">
                <div className="cs-frame-bg" style={{ backgroundImage: `url(${f.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <div style={{ position: 'absolute', inset: 0, background: f.grad }} />
              </div>
              <div className="cs-frame-cap">{f.cap}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Results */}
      <section className="cs-results">
        <div className="sec-label" style={{ color: 'rgba(255,255,255,.4)' }}>The Impact</div>
        <h2 className="cs-results-h2">Numbers That Moved Culture</h2>
        <div className="cs-metrics-grid">
          {study.metrics.map((m) => (
            <div key={m.label} className="cs-metric">
              <div className="cs-mval" style={{ color: m.color }}>{m.val}</div>
              <div className="cs-mlabel">{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="fcta-section" style={{ padding: '100px 48px' }}>
        <h2 className="fcta-h2" style={{ fontSize: 'clamp(28px,4vw,48px)' }}>Want Results Like These?</h2>
        <div className="fcta-actions" style={{ marginTop: 28 }}>
          <Link href="/contact" className="btn-fill" style={{ background: 'var(--magenta)' }}>Let&apos;s Build Together →</Link>
          <Link href="/case-studies" className="btn-border">All Case Studies</Link>
        </div>
      </section>

      {/* Prev / Next bar */}
      <div className="cs-nav-bar">
        <Link href={`/case-studies?at=${slug}`} className="cs-nav-btn cs-nav-prev" aria-label="Back to gallery">
          ← Back to Gallery
        </Link>
        <div className="cs-nav-center">
          {galIdx >= 0 && (
            <span className="cs-nav-counter">{String(galIdx + 1).padStart(2, '0')} / {String(navStudies.length).padStart(2, '0')}</span>
          )}
        </div>
        {nextStudy ? (
          <Link href={`/work/${nextStudy.slug}`} className="cs-nav-btn cs-nav-next">
            Next: {nextStudy.client} →
          </Link>
        ) : (
          <Link href="/case-studies" className="cs-nav-btn cs-nav-next">All Studies →</Link>
        )}
      </div>
    </>
  );
}
