import Link from 'next/link';
import LeadershipReelShowcase from '@/components/about/LeadershipReelShowcase';
import { getLeadershipSlides, getSiteSettings, mediaUrl } from '@/lib/strapi';

const stripItems = [
  { label: 'Culture', img: '/images/banner-home2-2-400x500.jpg', overlay: 'rgba(26,34,64,.55)' },
  { label: 'Production', img: '/images/bg-about-company-400x500.jpg', overlay: 'rgba(32,10,40,.55)' },
  { label: 'People', img: '/images/why-work-with-us.jpg', overlay: 'rgba(48,21,0,.5)' },
  { label: 'Strategy', img: '/images/portfolio-popup-10-400x500.jpg', overlay: 'rgba(5,21,16,.55)' },
  { label: 'Studio', img: '/images/banner-01-400x500.jpg', overlay: 'rgba(10,26,48,.55)' },
];

const stats = [
  { val: '150+', label: 'Talents Managed', pink: true },
  { val: '300+', label: 'Projects Done', pink: false },
  { val: '98%', label: 'Client Retention', pink: false },
  { val: '12+', label: 'Years of Impact', pink: false },
];

const timeline = [
  { year: '2012', title: 'Founded in Mumbai', desc: 'Started with three people, one camera and an unshakeable belief in the power of small ideas.' },
  { year: '2016', title: 'Influencer Division Launched', desc: "Built one of India's first dedicated influencer management arms. 50+ talents in the first year." },
  { year: '2020', title: 'Tech & Performance Wing', desc: 'Launched our technology and data division — digital product, performance marketing and analytics under one roof.' },
  { year: '2025', title: '150+ Talents, Dubai Expansion', desc: 'Operating across Mumbai and Dubai. One of India\'s most formidable independent creative agencies.' },
];


export default async function AboutPage() {
  const [cmsSlides, settings] = await Promise.all([
    getLeadershipSlides(),
    getSiteSettings(),
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

  const aboutStats = settings?.aboutStats?.length
    ? settings.aboutStats
    : stats;

  return (
    <>
      {/* Hero */}
      <section className="ab-hero">
        <div className="ab-hero-content">
          <div className="sec-label">Our Story</div>
          <h1 className="ab-h1">
            We Don't<br/>Just Make<br/>Content. We<br/><em>Move Culture.</em>
          </h1>
        </div>
      </section>

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

      {/* Story + Stats */}
      <section className="ab-story">
        <div className="ab-story-text">
          <div className="sec-label">Origins</div>
          <h2 className="ab-story-h2">It Started With a<br/><em>Small Big Idea.</em></h2>
          <p className="ab-story-body">
            TSBI was founded on the belief that great ideas don't need big budgets — they need the right people,
            the right strategy and the courage to execute brilliantly. Over twelve years, we've grown from a scrappy
            creative team into a full-service agency powering some of India's most talked-about campaigns.
            <br/><br/>
            We are creative directors, strategists, media planners, technologists and producers united by one
            obsession: making things that matter.
          </p>
          <Link href="/work" className="btn-fill" style={{ marginTop: 36 }}>See Our Work →</Link>
        </div>

        <div className="ab-stats">
          {aboutStats.map(s => (
            <div key={s.label} className="ab-stat">
              <div className={`ab-stat-val${'pink' in s && s.pink ? ' pink' : ''}`}>{s.val}</div>
              <div className="ab-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="ab-timeline">
        <div className="sec-label">The Journey</div>
        <h2 className="ab-tl-h2">12 Years of<br/><em>Building</em></h2>
        <div className="ab-tl-items">
          {timeline.map(t => (
            <div key={t.year} className="ab-tl-item">
              <div className="ab-tl-year">{t.year}</div>
              <div className="ab-tl-dot" />
              <div className="ab-tl-content">
                <div className="ab-tl-title">{t.title}</div>
                <p className="ab-tl-desc">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

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
