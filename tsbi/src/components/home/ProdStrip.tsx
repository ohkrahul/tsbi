import Link from 'next/link';

const cards = [
  { num: '01', cat: 'Liver ki Suno', title: 'Divyanka', link: 'https://www.instagram.com/reel/DLIJ0Ufy0j5/' },
  { num: '02', cat: 'Liver ki Suno', title: 'Karanvir Bohra', link: 'https://www.instagram.com/reel/DMu1BIrT57o/' },
  { num: '03', cat: 'Liver ki Suno', title: 'Gaelyn Mendonca', link: 'https://www.instagram.com/reel/DNkRlYjTyMp/' },
  { num: '04', cat: 'Liver ki Suno', title: 'Venkatesh Iyer', link: 'https://www.instagram.com/reel/DOdk5ywEm9r/' },
  { num: '05', cat: 'Do Haath Teen Minute', title: 'Hina Khan', link: 'https://www.instagram.com/reel/DPgTkkZiMFe/' },
  { num: '06', cat: 'Do Haath Teen Minute', title: 'Saiyami Kher', link: 'https://www.instagram.com/reel/DQ3zO8xDODq/' },
  { num: '07', cat: 'Do Haath Teen Minute', title: 'PriyaMani', link: 'https://www.instagram.com/reel/DRCJoCzilk-/' },
  { num: '08', cat: 'Do Haath Teen Minute', title: 'Roshni Walia', link: 'https://www.instagram.com/reel/DQ9Dof4jOB6/' },
  { num: '09', cat: 'Tyohaar with TBZ', title: 'Priyadarsini', link: 'https://www.instagram.com/p/DPlofZOjcEa/' },
  { num: '10', cat: 'Tyohaar with TBZ', title: 'Mazel Vyas', link: 'https://www.instagram.com/p/DPBasHljcow/' },
  { num: '11', cat: 'Tyohaar with TBZ', title: 'Jinal Padiaa', link: 'https://www.instagram.com/reel/DPJDd9pjRU_/' },
  { num: '12', cat: 'Dohra Detachable Jewellery', title: 'Surabhi & Samridhi', link: 'https://www.instagram.com/reel/DRuNUD0k1zg/' },
  { num: '13', cat: 'Dohra Detachable Jewellery', title: 'Harshita Roopchandani', link: 'https://www.instagram.com/reel/DR4vuWNDXul/' },
  { num: '14', cat: 'Pepe Jeans: Great Denim', title: 'Sushil Bhagtani', link: 'https://www.instagram.com/p/DQUCl81k87E/' },
  { num: '15', cat: 'Pepe Jeans: Great Denim', title: 'Kinshuk Gujral', link: 'https://www.instagram.com/p/DP0dTT8EcU7/' },
  { num: '16', cat: 'Pepe Jeans: Great Denim', title: 'Arun Sharma', link: 'https://www.instagram.com/p/DQuJBfwiBD6/' },
];

export default function ProdStrip() {
  return (
    <section className="prod-section">
      <div className="prod-header reveal">
        <div>
          <div className="sec-label"><span className="num">03</span> Influencer Management</div>
          <h2 className="prod-h2">From brief to viral.<br/>Campaigns that connect.</h2>
        </div>
        <Link href="/work" className="btn-border" style={{ marginBottom: 4 }}>See All Work →</Link>
      </div>

      <div className="prod-track-outer">
        <div className="prod-track">
          {cards.map((card, i) => (
            <div className="pc" key={i} style={{ overflow: 'hidden' }}>
              <div className="pc-num">{card.num}</div>
              <iframe
                src={`${card.link}embed/`}
                scrolling="no"
                allowFullScreen
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  pointerEvents: 'none',
                }}
              />
              {/* clickable overlay — opens reel in new tab */}
              <a
                href={card.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ position: 'absolute', inset: 0, zIndex: 2 }}
                aria-label={`${card.title} — ${card.cat}`}
              />
              <div className="pc-bot" style={{ zIndex: 3, position: 'relative' }}>
                <div className="pc-cat">{card.cat}</div>
                {/* <div className="pc-title">{card.title}</div> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
