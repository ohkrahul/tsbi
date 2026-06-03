import Link from 'next/link';

const cards = [
  { num: '01', cat: 'Documentary Film', title: 'Saigon Souls', meta: '4:30 min · 2024', img: '/images/portfolio-popup-10-400x500.jpg', overlay: 'rgba(26,42,64,.6)' },
  { num: '02', cat: 'Brand Film', title: 'GLOW | 正念', meta: '2:15 min · 2024', img: '/images/banner-home2-400x500.jpg', overlay: 'rgba(13,32,53,.6)' },
  { num: '03', cat: 'Campaign Film', title: 'Fromanother Love', meta: "1:30 min · L'Oréal", img: '/images/bg-home1-counter-400x500.jpg', overlay: 'rgba(16,32,56,.6)' },
  { num: '04', cat: 'Motion Graphics', title: 'FWA of the Day', meta: '9:45 min · 2026', img: '/images/career-detail-01-400x500.jpg', overlay: 'rgba(26,16,32,.6)' },
  { num: '05', cat: 'Brand Film', title: 'Sidewave Launch', meta: '3:20 min · 2025', img: '/images/portfolio-popup-12-400x500.jpg', overlay: 'rgba(48,21,0,.6)' },
  { num: '06', cat: 'Social Series', title: 'Saigon After Hours', meta: '8 Episodes · 2024', img: '/images/gallery-slider-02-400x500.jpg', overlay: 'rgba(10,32,21,.6)' },
];

// Duplicate for infinite loop
const doubled = [...cards, ...cards];

export default function ProdStrip() {
  return (
    <section className="prod-section">
      <div className="prod-header reveal">
        <div>
          <div className="sec-label"><span className="num">03</span> Content Production</div>
          <h2 className="prod-h2">From concept to final cut.<br/>Content that connects.</h2>
        </div>
        <Link href="/work" className="btn-border" style={{ marginBottom: 4 }}>See All Work →</Link>
      </div>

      <div className="prod-track-outer">
        <div className="prod-track">
          {doubled.map((card, i) => (
            <div className="pc" key={i}>
              <div className="pc-bg" style={{ backgroundImage: `url(${card.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <div style={{ position: 'absolute', inset: 0, background: card.overlay }} />
              <div className="pc-frame" />
              <div className="pc-num">{card.num}</div>
              <div className="pc-play"><div className="pc-play-tri" /></div>
              <div className="pc-bot">
                <div className="pc-cat">{card.cat}</div>
                <div className="pc-title">{card.title}</div>
                <div className="pc-meta">{card.meta}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
