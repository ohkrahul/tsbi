import Link from 'next/link';
import LeadershipReelShowcase from '@/components/about/LeadershipReelShowcase';
import MarioTimeline from '@/components/about/MarioTimeline';
import AboutAwardsSection from '@/components/about/AboutAwardsSection';
import HeroSection from '@/components/home/HeroSection';
import { getLeadershipSlides, mediaUrl } from '@/lib/strapi';

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
    <>
      {/* Hero Banner Slider */}
      <HeroSection />

      {/* Expanding strip */}
      <div className="ab-strip">
        {stripItems.map(s => (
          <div key={s.label} className="ab-strip-item">
            <div className="ab-strip-bg" style={{ backgroundImage: `url(${s.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <div style={{ position: 'absolute', inset: 0, background: s.overlay }} />
            <div className="ab-strip-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Story + Awards */}
      <AboutAwardsSection />

      {/* Timeline */}
      <MarioTimeline />

      {/* Leadership & Reel Showcase */}
      <LeadershipReelShowcase initialSlides={leadershipSlides} />

      {/* CTA */}
      <section className="fcta-section" style={{ padding: '100px 48px' }}>
        <h2 className="fcta-h2" style={{ fontSize: 'clamp(32px,5vw,56px)' }}>Come Build With Us.</h2>
        <div className="fcta-actions" style={{ marginTop: 28 }}>
          <Link href="/contact" className="btn-fill" style={{ background: 'var(--magenta)' }}>Say Hello →</Link>
        </div>
      </section>
    </>
  );
}
