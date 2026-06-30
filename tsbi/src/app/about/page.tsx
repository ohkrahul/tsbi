import Link from 'next/link';
import LeadershipReelShowcase from '@/components/about/LeadershipReelShowcase';
import MarioTimeline from '@/components/about/MarioTimeline';
import AboutAwardsSection from '@/components/about/AboutAwardsSection';
import AboutGallery from '@/components/about/AboutGallery';
import HeroSection from '@/components/home/HeroSection';
import { getLeadershipSlides, mediaUrl } from '@/lib/strapi';
import { getGalleryImages } from '@/lib/gallery';

const stripItems = [
  { label: 'Culture',    img: '/about%20us/WhatsApp%20Image%202026-06-04%20at%206.19.02%20PM.jpeg',      overlay: 'rgba(26,34,64,.38)' },
  { label: 'Production', img: '/about%20us/WhatsApp%20Image%202026-06-04%20at%206.19.02%20PM%20%281%29.jpeg', overlay: 'rgba(32,10,40,.38)' },
  { label: 'People',     img: '/about%20us/WhatsApp%20Image%202026-06-04%20at%206.19.02%20PM%20%282%29.jpeg', overlay: 'rgba(20,16,60,.38)' },
  { label: 'Strategy',   img: '/about%20us/WhatsApp%20Image%202026-06-04%20at%206.19.02%20PM%20%283%29.jpeg', overlay: 'rgba(5,21,16,.38)' },
  { label: 'Studio',     img: '/about%20us/WhatsApp%20Image%202026-06-04%20at%206.19.02%20PM%20%284%29.jpeg', overlay: 'rgba(10,26,48,.38)' },
];

export default async function AboutPage() {
  const [cmsSlides] = await Promise.all([
    getLeadershipSlides(),
  ]);

  const galleryImages = getGalleryImages();

  const leadershipSlides = cmsSlides.length
    ? cmsSlides.map((s) => ({
        id: s.id,
        type: s.type,
        num: s.num,
        title: s.title,
        role: s.role ?? undefined,
        intro: s.intro,
        bgImage: mediaUrl(s.bgImage),
        cardImage: mediaUrl(s.cardImage),
        ctaLabel: s.ctaLabel,
        ctaHref: s.ctaHref,
      }))
    : undefined;

  return (
    <div className="about-dark">
      {/* Hero Banner Slider */}
      <HeroSection content={{
        h1: <>Ideas.<span style={{ display: 'block', color: 'var(--magenta)' }}>People.</span><span style={{ display: 'block' }}>Momentum.</span></>,
        body: 'A decade of building TSBI powered by digital marketing experts, strategists, and storytellers who help brands grow.',
        cta1: { label: 'Explore Our Work', href: '/case-studies' },
        cta2: { label: 'Avail Our Services', href: '/services' },
      }} />

      {/* Expanding strip */}
      <div className="ab-strip">
        {stripItems.map(s => (
          <div key={s.label} className="ab-strip-item">
            <div className="ab-strip-bg" style={{ backgroundImage: `url(${s.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <div style={{ position: 'absolute', inset: 0, background: s.overlay }} />
            {/* <div className="ab-strip-label">{s.label}</div> */}
          </div>
        ))}
      </div>

      {/* Story + Awards */}
      <AboutAwardsSection />

      {/* Timeline */}
      <MarioTimeline />

      {/* Interactive quest entry point */}
      {/* <section
        style={{
          padding: '72px 48px',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #12002f 0%, #1b0748 60%, #2c1147 100%)',
          color: '#fff',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--fm)',
            fontSize: 11,
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: '#ff4fa3',
            marginBottom: 16,
          }}
        >
          Play the story ✦
        </div>
        <h2
          style={{
            fontFamily: 'var(--fd)',
            fontSize: 'clamp(28px,4vw,48px)',
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            margin: '0 auto 18px',
            maxWidth: 640,
          }}
        >
          Step into <em style={{ color: '#f7b84b', fontStyle: 'italic' }}>The SmallBig Story Quest</em>
        </h2>
        <p
          style={{
            fontFamily: 'var(--fb)',
            fontSize: 15,
            fontWeight: 300,
            lineHeight: 1.7,
            color: 'rgba(255,255,255,0.72)',
            maxWidth: 480,
            margin: '0 auto 30px',
          }}
        >
          An interactive 2D adventure across our milestones — fall into the desert, follow the trail, and
          unlock every chapter from 2014 to 2019.
        </p>
        <Link href="/about/journey" className="btn-fill" style={{ background: 'var(--magenta)' }}>
          Enter the Journey →
        </Link>
      </section> */}

      {/* Leadership & Reel Showcase */}
      <LeadershipReelShowcase initialSlides={leadershipSlides} />

      {/* TSBI Gallery */}
      <AboutGallery images={galleryImages} />

    
    </div>
  );
}
