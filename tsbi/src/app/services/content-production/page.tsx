'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';

type Campaign = {
  client: string;
  house?: string;
  category: string;
  title: string;
  desc: string;
  videos: string[]; // YouTube video IDs
};

// Sourced from the TSBI Content Production sheet (21 campaigns).
const campaigns: Campaign[] = [
  {
    client: 'Ashok Leyland',
    category: 'Commercial Vehicles / Logistics',
    title: '#KhushiyonKiSteering',
    desc: `Festive advertising during Diwali is largely dominated by consumer brands focusing on emotion, family, and celebration, while B2B brands often remain in the background. With #KhushiyonKiSteering, we set out to change that narrative by positioning Ashok Leyland as the unseen force that powers India’s festive joy.

The campaign highlighted how Diwali celebrations across the country are made possible by countless journeys — sweets, diyas, fabrics, and essentials travelling from different regions to one home. Instead of overt product messaging, Ashok Leyland’s presence was subtly woven into the story through creative transitions using truck elements like steering wheels and tyres.

By emotionally anchoring the brand to Diwali and showcasing its role as an enabler of togetherness, the campaign made a traditionally B2B brand culturally relevant, emotionally resonant, and central to India’s festive supply chain — reinforcing Ashok Leyland as the brand that keeps the nation moving, especially when it matters most.`,
    videos: ['37CCZAHaYx8'],
  },
  {
    client: 'DHL',
    house: 'Mumbai Indians × IPL',
    category: 'Logistics',
    title: '#ThatsMyGame · Dil Se Indian',
    desc: `During the IPL season, ad campaigns featuring cricketers dancing and singing on green-screen backgrounds are ubiquitous. When tasked with creating a unique campaign proposition for DHL with Mumbai Indians, we decided to break the mould with #ThatsMyGame — cricketers asserting that their game is cricket, not dancing or singing.

But we didn’t stop there. Capitalising on the same shoot, we crafted a second campaign: ‘Dil Se Indian.’ This showcased the indomitable spirit of the Mumbai Indians, capturing the essence and pride that lies in the heart of every Indian. We also subtly integrated the strengths of DHL, ensuring the videos travelled easily across social feeds, maximising engagement and reach.`,
    videos: ['MJofvf2lBNY', 'KlDctPUfuHI'],
  },
  {
    client: 'Sunny Sanskari Ki Tulsi Kumari',
    house: 'Dharma Productions',
    category: 'Film Marketing / Entertainment (Romantic Comedy)',
    title: 'Chaos Sells Romance',
    desc: `Rom-coms don’t thrive on subtlety — they thrive on chaos, chemistry, and cultural noise. For Sunny Sanskari Ki Tulsi Kumari, we leaned fully into that truth, turning cast energy, heartbreak, and music trends into a high-voltage social ecosystem where chaos sold romance.

The campaign was built around the infectious chemistry of Varun Dhawan and Janhvi Kapoor, amplified through songs, reels, memes, and unfiltered shoot content. Rohit and Sanya’s love for dance became a cultural trigger, pushing audiences to create millions of reels using the film’s tracks — especially Bijuria and Panwadi, whose hook steps quickly took over Instagram feeds.

Instead of polished promotions, the team embraced messiness: fun, chaotic cast videos where heartbreak and entertainment co-existed as the central narrative. AI-led creative units were introduced to break the cookie-cutter rom-com feed, giving Dharma’s social presence a fresh, disruptive edge. Offline, screenings transformed into mini fan-festivals — where fans didn’t just watch the film, but danced, interacted, and became part of its energy.

By making chaos and entertainment the heroes, the campaign fuelled speculation, fandom debates, and repeat engagement — turning “who ends up with whom” into a shared cultural question. The result was sustained buzz, massive music-led virality, and a strong emotional connect that positioned the film as a celebration of modern love, confusion, and second chances long before audiences stepped into theatres.`,
    videos: [],
  },
  {
    client: 'MAA',
    house: 'Devgn Films',
    category: 'Film Marketing / Entertainment (Horror)',
    title: 'End Credit Goes To MAA',
    desc: `In a market where horror-comedy dominates box-office success, launching a pure horror film demanded a strategic expansion of both audience and universe. With MAA, we set out to grow the horror fanbase by blending supernatural fear with the emotional force of maternal strength — anchored in the idea “End credit goes to MAA.”

The campaign strategically inducted MAA into a larger supernatural arc by leveraging the Shaitaan universe, introducing R Madhavan at the trailer launch to instantly deepen credibility and intrigue among horror loyalists. To broaden appeal beyond core horror audiences, we reframed the narrative around faith, belief, and motherhood — most powerfully by replacing surnames with mothers’ names in the film credits, a first in Indian cinema.

To amplify emotional resonance, icons like Kajol and Usha Uthup came together during the song launch to celebrate maternal strength. For hardcore horror fans, immersive fear-first experiences were rolled out through paranormal-themed podcasts, terror train takeovers, and atmospheric digital storytelling that visualised a formless evil using AI-led narratives.

By oscillating between fear and faith, the campaign positioned MAA as more than just a horror release — it became an emotionally charged universe where belief stands as the ultimate weapon against evil, expanding the genre’s appeal and bringing pure horror back into mainstream cultural conversation.`,
    videos: [],
  },
  {
    client: 'Sitaare Zameen Par',
    house: 'Aamir Khan Productions',
    category: 'Film Marketing / Entertainment',
    title: 'Imperfectly Perfect Teaser',
    desc: `In a social feed dominated by algorithmically perfect visuals and polished teaser drops, standing out meant doing the opposite. For Sitaare Zameen Par, we chose to disrupt the scroll by embracing imperfection with the ‘Imperfectly Perfect Teaser’ — a handcrafted, tactile announcement unit designed to spark curiosity ahead of the trailer launch.

Instead of sleek motion graphics, the campaign leaned into a pop-up cutout aesthetic. Printed images of the film’s 10 Sitaare were revealed one by one, culminating in the reveal of Aamir Khan and the announcement that the trailer would drop the very next day. The deliberate roughness and handmade feel broke visual monotony and instantly caught attention.

Rolled out across social platforms, the imperfect design became its biggest strength — inviting intrigue, conversation, and organic pickup by fan and media pages. By rejecting visual perfection and leaning into playful honesty, Sitaare Zameen Par set the tone for what was to come: a film that’s raw, emotional, and refreshingly human long before audiences hit play on the trailer.`,
    videos: [],
  },
  {
    client: 'Son Of Sardaar 2',
    house: 'Devgn Films',
    category: 'Film Marketing / Entertainment (Comedy)',
    title: 'Jahan Son Hai, Wahan Fun Hai',
    desc: `In a crowded comedy landscape where humour often blends into sameness, standing out meant shifting focus from promotion to pure vibe. For Son Of Sardaar 2, we made fun itself the strategy with the campaign ‘Jahan Son Hai, Wahan Fun Hai’ — selling the energy of the film, not just the film.

The campaign leaned heavily into the cast’s natural chemistry, converting behind-the-scenes humour into pop-culture momentum. What began as a simple step evolved into the viral trend #PehlaTuDujaTu, turning even trolls into participants. Quick, exclusive social assets featuring the ensemble were created at speed, capturing spontaneous moments that felt authentic and infectious.

To deepen engagement, casual round-table interactions showcased the cast’s camaraderie, while long-form content like a cast podcast extended the fun beyond short clips. Audience nostalgia for the original film was tapped into with the release of the PO PO song, reinforcing familiarity while reigniting excitement.

Amplified by third-party pages and fan communities, the campaign firmly established one idea across platforms: Fun = Son Of Sardaar 2. By letting audiences witness the cast enjoying themselves, the campaign rebuilt buzz, reignited conversation, and made people want to join the fun long before release.`,
    videos: [],
  },
  {
    client: 'Zydus Lifesciences',
    category: 'Healthcare / Public Health Awareness',
    title: '#LiverKiSuno',
    desc: `Health awareness campaigns often rely on fear, statistics, or medical jargon — especially when the condition is serious. With #LiverKiSuno, we chose to flip that approach by using humour as the strategy, turning apathy around fatty liver disease into attention, conversation, and action.

Fatty liver affects nearly 40% of Indians, yet remains ignored because it shows no early symptoms and doesn’t feel urgent. The key barrier wasn’t lack of care — it was lack of relatability. So we gave the liver a voice. Through everyday humour, familiar situations, and culturally rooted comedy, the campaign made the liver “complain” in ways people could instantly recognise and laugh with, without trivialising the science.

By collaborating with India’s most trusted comedians — Johnny Lever, Jamie Lever, and Suresh Menon — the campaign transformed a silent, neglected condition into content people wanted to watch, share, and discuss at home. Humour became the hook, while medical credibility remained the backbone, ensuring the message stayed accurate, responsible, and impactful.

Built on the simple, culturally intuitive idea of listening to your liver before it’s forced to scream, #LiverKiSuno proved that laughter can be a powerful behavioural tool — repositioning preventive healthcare as something conversational, not clinical, while reinforcing Zydus Lifesciences as a brand willing to rethink how serious health conversations are started at scale.`,
    videos: [],
  },
  {
    client: 'Zydus Lifesciences',
    category: 'Healthcare / Public Health Awareness',
    title: '#LifeKaFilter',
    desc: `Health communication often struggles to break through because medical science feels intimidating and distant. With #LifeKaFilter, we reframed kidney health into a simple, everyday idea — something everyone already understands. Just like every morning begins with a filter for tea or coffee, life itself depends on an internal filter: our kidneys.

By using the familiar metaphor of a beverage filter, the campaign demystified the complex role of kidneys and turned a daunting medical topic into a relatable, mainstream conversation. Instead of fear-based messaging, #LifeKaFilter focused on awareness, simplicity, and daily relevance — making people pause and reflect on what silently filters their lives every day.

Born from the urgent reality that Chronic Kidney Disease often goes undetected due to low awareness, the campaign built a large, credible content ecosystem. Expert-led podcasts with leading oncologists and nephrologists added depth and trust, while promo films, influencer hygiene content, and print integrations ensured scale and mass visibility.

By blending education with familiarity, and science with storytelling, #LifeKaFilter succeeded in making kidney health a part of everyday discourse — positioning Zydus Lifesciences as a brand committed not just to treatment, but to proactive public health awareness at scale.`,
    videos: [],
  },
  {
    client: 'Danone',
    category: 'Food',
    title: "Nurses' Day Tribute Film",
    desc: `A paediatric nurse is the first friend a newborn child meets — tenderly caring for them, feeding them, and nurturing them through their initial hours. In doing so, she often sacrifices time with her own children and family, yet carries out her duties with unwavering dedication.

When tasked with creating a Nurses’ Day asset for Danone India, we decided to illuminate this selfless, motherly nature of paediatric nurses through a poignant and touching film. This tribute celebrated and thanked the paediatric nurses — the unsung heroes who become the first friends and guardians of our children — honouring their relentless compassion and devotion.`,
    videos: ['D8cXWh7g2kk'],
  },
  {
    client: 'ICICI Direct',
    category: 'Banking',
    title: 'Yes To Udhaar — ICICI Direct MTF',
    desc: `When it comes to trading there’s always a belief that it’s for the experts and the monetarily affluent. To break that stigma and take a relatable route to the core messaging of ICICI Direct MTF — which lets users trade on credit — we drew inspiration from the age-old ‘Aaj Nagad, Kal Udhaar’ saying of India’s kiranawalas, who are totally against giving credit, and tied it back to trading with ICICI Direct MTF.`,
    videos: [],
  },
  {
    client: 'ICICI Direct',
    category: 'Banking',
    title: 'Yes To Udhaar — The Kirana Wala',
    desc: `The lack of money should never be a reason to lose out on important opportunities. We drew this message through the portrayal of a funny yet khadoos Kirana Wala and a simpleton who wants to buy groceries but whose empty pockets — and the kirana wala’s ‘Aaj Nagad, Kal Udhaar’ policy — won’t allow him to.

But ICICI Direct MTF is different. ‘Never miss an opportunity with ICICI Direct MTF’ is the message we nailed through the portrayal.`,
    videos: [],
  },
  {
    client: 'ICICI Direct',
    category: 'Banking',
    title: 'E-ATM — Intezaar Sharma',
    desc: `Rather than building a traditional narrative around a product — the common advertising route — we built a character who needs to be rescued from the curse of waiting. Intezaar Sharma, based on Murphy’s Law (‘whatever could go wrong, will go wrong’), is always told ‘Kal aana’ all his life… until ICICI E-ATM offers him instant withdrawals within 5 minutes.

An interesting mix of music and visual aid lends to the strong character of Intezaar Sharma in this ad for ICICI Direct — a man rejected everywhere and told to wait, until ICICI Direct E-ATM enters his life with instant withdrawals on trading in only 5 minutes.`,
    videos: [],
  },
  {
    client: 'ICICI Direct',
    category: 'Banking',
    title: 'Flash Trade — The Turkish Ice-Cream',
    desc: `To bring out the easy and simple nature of ICICI Direct Flash Trade’s user experience, we drew parallels with something completely opposite — the Turkish ice-cream experience: complex, teasy and sometimes frustrating. With unique POV shots putting viewers in the characters’ shoes, a little inspiration from Wes Anderson, and a sprinkle of funny, we made this advertisement for ICICI Direct Flash Trade.

A Turkish ice-cream experience is an emotional rollercoaster — excitement that builds into anxiety, then irritation, then anger. That is not what trading should feel like. Trading shouldn’t be an emotional rollercoaster, but a simple experience of investment — which is exactly what ICICI Direct Flash Trade provides.`,
    videos: ['4D4H43PBEEo'],
  },
  {
    client: 'Proteinx',
    category: 'Fitness',
    title: 'Protein Abhiyaan Anthem',
    desc: `The people are the strength of this country, and their strength comes from protein. We conceptualised and shot the Protein Abhiyaan Anthem for ProteinX India.`,
    videos: ['J4w6sjHgwlI'],
  },
  {
    client: 'Sandu Pharma',
    category: 'Pharma',
    title: 'A 122-Year-Old Brand For Today’s Youth',
    desc: `For a brand that has produced ayurvedic medicines for more than 100 years, it’s a challenge to strike a balance between the age-old benefits of the science of Ayurveda and its communication to the ever-evolving, fast-paced consumer.

We made Sandu Pharma appeal to today’s youth — honouring its heritage while speaking the language of a new generation.`,
    videos: ['yK-Te8ceD64', 'Ef0rp5tt9DM'],
  },
  {
    client: 'Disney',
    category: 'Entertainment',
    title: 'Delicious Minis — Health Meets Taste',
    desc: `Disney India has brought us an array of stories that teach, entertain, and inspire generations. The ‘Disney Delicious Minis’ series was headlined by Chef Saransh Goila and Chef Chinu Vaze — with interesting takes on healthy recipes featuring Disney movie references and characters, making it a wholesome package for adults and kids alike.

The two brilliant chefs brought their expertise to our film with unique takes on classic recipes. Chef Saransh Goila — author and winner of the Food Food Maha Challenge — and Chef Chinu Vaze, a celebrity chef, host, and writer, added their flair to the series of 24 short videos.`,
    videos: ['qzHtzyuk_g4', 'dyVdaCIIMfc'],
  },
  {
    client: 'The Q',
    category: 'Entertainment',
    title: 'Sabse Alag, Sabke Liye',
    desc: `Right since its inception, The Q has been known for its distinctive strategy that brings the best of digital to TV. We conceptualised and established ‘Sabse Alag, Sabke Liye’ for the channel — capturing its uniquely inclusive positioning.`,
    videos: ['gGdQ1aL1LEY', 'rzcKC7OyfVY'],
  },
  {
    client: 'Vibha',
    category: 'Non-Profit',
    title: 'Through The Eyes Of A Curious Kid',
    desc: `As an NGO, Vibha’s challenge is raising funds. We needed to strike a chord with individual donors through great storytelling in the brand TVC, in order to motivate them to donate.

We didn’t want to make the film a sad reflection on the kid’s situation, but a happy, buoyant celebration of his curiosity. The kid’s inquisitiveness became the hero of the campaign — travelling a full journey where it is ignored, made fun of, and even discouraged, but never truly fades away.`,
    videos: ['aUDe3d7HfUE'],
  },
  {
    client: 'Thailand Tourism',
    category: 'Tourism',
    title: 'Evoking Wanderlust For Thai Tourism',
    desc: `Repositioning the brand in the minds of high-value customers was a critical but long-drawn exercise, because premium imagery is not Thailand’s core positioning; it was seen as a mass product with no unique USP or luxury value; and myths and perceptions scare the uninitiated.

We set out to evoke our audience’s wanderlust — recasting Thailand as a destination of premium, aspirational experiences.`,
    videos: ['BglRilfoGOA'],
  },
  {
    client: 'Canapure Canola Oil',
    category: 'Food',
    title: 'Getting India To Switch To Healthy Oil',
    desc: `The challenge was building familiarity for an unknown oil category and establishing it as a healthy alternative, building on the strength of its Canadian heritage. The insight: canola helps fight cholesterol and aims to be a healthy alternative to olive oil — but unlike olive oil, it is fantastic for the Indian style of cooking.

The outcome: healthy oil leads to a healthy you. A healthy you gives you the opportunity to do more — it allows you to say ‘CAN’ to everything.`,
    videos: ['m-ekod_mEzk'],
  },
  {
    client: 'Kesari Chapter 2',
    house: 'Dharma Productions',
    category: 'Film Marketing / Entertainment',
    title: 'Witness The History',
    desc: `In an entertainment-heavy landscape where film promotions often rely on spectacle, song launches, and predictable hype, marketing a century-old courtroom trial for Gen Z needed a radical shift. With Kesari Chapter 2, we chose to break convention by turning audiences from passive spectators into active witnesses through the campaign ‘Witness the History.’

The campaign began with a disruptive, all-platform blank-screen teaser that hijacked feeds and sparked nationwide curiosity. This bold silence set the tone for a story that history had forgotten but needed to be heard. Progressive reveals of Akshay Kumar, R Madhavan, and Ananya Panday followed, carefully balancing mass appeal with cultural relevance.

We amplified the first-ever Akshay vs Maddy courtroom face-off as pop-culture fuel, igniting organic fandom conversations and dialogue-led storytelling. By rooting the narrative in emotion, confrontation, and truth, the campaign summoned a new generation to witness C. Sankaran Nair’s forgotten legal battle against the British Empire.

Through social-first disruption and culturally resonant storytelling, Kesari Chapter 2 was positioned not just as a film, but as a national moment — one that revived history, rebuilt star power, and made the past feel urgent, visceral, and unmissable today.`,
    videos: [],
  },
];

const ticker =
  'ASHOK LEYLAND  ·  DHL  ·  DHARMA  ·  DEVGN FILMS  ·  ZYDUS  ·  DANONE  ·  ICICI DIRECT  ·  DISNEY  ·  THAILAND TOURISM  ·  PROTEINX  ·  ';

const stats = [
  { val: '21', label: 'Campaigns' },
  { val: '15+', label: 'Brands' },
  { val: 'In-house', label: 'Studio & Post' },
];

// Floating video cards shown on the right of the hero.
const heroCards = [
  { id: '37CCZAHaYx8', brand: 'Ashok Leyland', tag: 'Brand Film', x: '6%', y: '4%', rot: '-7deg', z: 6, delay: 0 },
  { id: '4D4H43PBEEo', brand: 'ICICI Direct', tag: 'Campaign', x: '50%', y: '0%', rot: '6deg', z: 5, delay: 0.5 },
  { id: 'qzHtzyuk_g4', brand: 'Disney', tag: 'Series', x: '2%', y: '42%', rot: '4deg', z: 4, delay: 1 },
  { id: 'BglRilfoGOA', brand: 'Thailand Tourism', tag: 'Brand Film', x: '54%', y: '44%', rot: '-5deg', z: 3, delay: 1.5 },
  { id: 'MJofvf2lBNY', brand: 'DHL × MI', tag: 'Social', x: '28%', y: '74%', rot: '3deg', z: 7, delay: 2 },
];

function HeroCard({ c }: { c: (typeof heroCards)[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.a
      href={`https://www.youtube.com/watch?v=${c.id}`}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 60, rotate: 0 }}
      animate={{
        opacity: 1,
        y: [0, -12, 0, 8, 0],
        rotate: hovered ? 0 : parseFloat(c.rot),
        transition: {
          opacity: { duration: 0.6, delay: c.delay * 0.25 },
          rotate: { duration: 0.35 },
          y: { duration: 6, delay: c.delay, repeat: Infinity, ease: 'easeInOut' },
        },
      }}
      whileHover={{ scale: 1.05 }}
      style={{
        position: 'absolute',
        left: c.x,
        top: c.y,
        zIndex: c.z,
        width: 'clamp(170px, 20vw, 250px)',
        display: 'block',
        borderRadius: 14,
        overflow: 'hidden',
        aspectRatio: '16/10',
        background: '#111',
        textDecoration: 'none',
        boxShadow: hovered
          ? '0 22px 60px rgba(224,25,125,.4), 0 4px 20px rgba(26,106,255,.25)'
          : '0 10px 34px rgba(0,0,0,.45)',
        border: hovered ? '1.5px solid rgba(224,25,125,.7)' : '1.5px solid rgba(255,255,255,.08)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(https://img.youtube.com/vi/${c.id}/hqdefault.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: hovered ? 'scale(1.06)' : 'scale(1)',
          transition: 'transform .5s ease',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,.85) 0%, rgba(0,0,0,.1) 55%, transparent 100%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%,-50%) scale(${hovered ? 1.15 : 1})`,
          width: 44,
          height: 44,
          borderRadius: '50%',
          background: 'rgba(255,255,255,.92)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform .3s ease',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M4 2.5L13.5 8L4 13.5V2.5Z" fill="#111" />
        </svg>
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '10px 14px' }}>
        <div style={{ fontFamily: 'var(--fm)', fontSize: 8.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,.6)', marginBottom: 2 }}>{c.tag}</div>
        <div style={{ fontFamily: 'var(--fb)', fontSize: 12, fontWeight: 700, color: '#fff' }}>{c.brand}</div>
      </div>
    </motion.a>
  );
}

function CampaignCard({ c }: { c: Campaign }) {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const hasVideo = c.videos.length > 0;
  const thumb = hasVideo
    ? `https://img.youtube.com/vi/${c.videos[0]}/hqdefault.jpg`
    : null;
  const watchUrl = hasVideo
    ? `https://www.youtube.com/watch?v=${c.videos[0]}`
    : null;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--white)',
        border: '1px solid var(--border)',
        borderRadius: 14,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'box-shadow .3s, transform .3s',
        boxShadow: hovered ? '0 18px 50px rgba(0,0,0,.12)' : '0 2px 12px rgba(0,0,0,.04)',
        transform: hovered ? 'translateY(-4px)' : 'none',
      }}
    >
      {/* ── Visual ── */}
      <a
        href={watchUrl ?? undefined}
        target={hasVideo ? '_blank' : undefined}
        rel="noopener noreferrer"
        style={{
          display: 'block',
          position: 'relative',
          aspectRatio: '16/9',
          background: hasVideo
            ? '#111'
            : 'linear-gradient(135deg,#161616,#2a2a2a)',
          cursor: hasVideo ? 'pointer' : 'default',
          pointerEvents: hasVideo ? 'auto' : 'none',
        }}
      >
        {thumb && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${thumb})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transform: hovered ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform .5s ease',
            }}
          />
        )}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: hasVideo
              ? 'linear-gradient(to top, rgba(0,0,0,.7) 0%, rgba(0,0,0,.05) 55%, transparent 100%)'
              : 'none',
          }}
        />

        {hasVideo ? (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: `translate(-50%,-50%) scale(${hovered ? 1.12 : 1})`,
              width: 52,
              height: 52,
              borderRadius: '50%',
              background: 'rgba(255,255,255,.92)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform .3s ease',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
              <path d="M4 2.5L13.5 8L4 13.5V2.5Z" fill="#111" />
            </svg>
          </div>
        ) : (
          <span
            style={{
              position: 'absolute',
              top: 18,
              left: 18,
              fontFamily: 'var(--fd)',
              fontSize: 40,
              fontWeight: 900,
              color: 'rgba(255,255,255,.12)',
              lineHeight: 1,
            }}
          >
            {c.client.charAt(0)}
          </span>
        )}

        {c.videos.length > 1 && (
          <span
            style={{
              position: 'absolute',
              bottom: 12,
              right: 12,
              fontFamily: 'var(--fm)',
              fontSize: 9,
              letterSpacing: '.12em',
              textTransform: 'uppercase',
              color: '#fff',
              background: 'rgba(0,0,0,.55)',
              borderRadius: 100,
              padding: '4px 10px',
            }}
          >
            {c.videos.length} Films
          </span>
        )}
      </a>

      {/* ── Content ── */}
      <div style={{ padding: '22px 22px 24px', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
        <span
          style={{
            fontFamily: 'var(--fm)',
            fontSize: 10,
            letterSpacing: '.14em',
            textTransform: 'uppercase',
            color: 'var(--magenta)',
          }}
        >
          {c.category}
        </span>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--fb)', fontSize: 18, fontWeight: 700, color: 'var(--ink)' }}>
            {c.client}
          </span>
          {c.house && (
            <span style={{ fontFamily: 'var(--fm)', fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>
              {c.house}
            </span>
          )}
        </div>

        <span style={{ fontFamily: 'var(--fd)', fontStyle: 'italic', fontSize: 17, color: 'var(--ink2)', lineHeight: 1.3 }}>
          {c.title}
        </span>

        <p
          style={{
            fontFamily: 'var(--fb)',
            fontSize: 14,
            fontWeight: 300,
            lineHeight: 1.7,
            color: 'var(--muted)',
            whiteSpace: 'pre-line',
            margin: '4px 0 0',
            display: expanded ? 'block' : '-webkit-box',
            WebkitLineClamp: expanded ? 'unset' : 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {c.desc}
        </p>

        <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginTop: 'auto', paddingTop: 12 }}>
          <button
            onClick={() => setExpanded((v) => !v)}
            style={{
              fontFamily: 'var(--fm)',
              fontSize: 10,
              letterSpacing: '.12em',
              textTransform: 'uppercase',
              color: 'var(--ink)',
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              borderBottom: '1px solid var(--ink)',
            }}
          >
            {expanded ? 'Read less' : 'Read more'}
          </button>

          {hasVideo && (
            <a
              href={watchUrl ?? undefined}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--fm)',
                fontSize: 10,
                letterSpacing: '.12em',
                textTransform: 'uppercase',
                color: 'var(--magenta)',
                textDecoration: 'none',
                borderBottom: '1px solid var(--magenta)',
              }}
            >
              Watch on YouTube →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ContentProductionPage() {
  return (
    <>
      {/* ── HERO: TSBI brand-color cinematic ── */}
      <section
        style={{
          background:
            'radial-gradient(circle at 78% 22%, rgba(224,25,125,.38) 0%, transparent 45%),' +
            'radial-gradient(circle at 90% 88%, rgba(26,106,255,.34) 0%, transparent 45%),' +
            'radial-gradient(circle at 8% 70%, rgba(224,25,125,.18) 0%, transparent 40%),' +
            'linear-gradient(135deg,#120014,#0a0a18)',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          padding: '140px 48px 80px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 40,
            width: '100%',
            flexWrap: 'wrap',
          }}
        >
          {/* ── LEFT: copy ── */}
          <div style={{ flex: '1 1 440px', minWidth: 300 }}>
            <span
              className="sec-label"
              style={{ color: 'rgba(255,255,255,.45)', marginBottom: 40, display: 'block' }}
            >
              <span style={{ color: 'rgba(255,255,255,.25)' }}>01</span> — Production
            </span>

            <h1
              style={{
                fontFamily: 'var(--fd)',
                fontSize: 'clamp(56px,8vw,120px)',
                fontWeight: 900,
                lineHeight: 0.92,
                letterSpacing: '-0.04em',
                color: '#fff',
                marginBottom: 40,
                whiteSpace: 'pre-line',
              }}
            >
              {'Frame.\nStory.\nResonance.'}
            </h1>

            <p
              style={{
                fontSize: 'clamp(15px,1.4vw,18px)',
                color: 'rgba(255,255,255,.65)',
                fontWeight: 300,
                lineHeight: 1.7,
                maxWidth: 480,
                marginBottom: 40,
              }}
            >
              End-to-end content production. Films, reels, photography — in-house, no compromise.
            </p>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {['Film', 'Photography', 'Reels', 'OOH', 'Audio'].map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: 'var(--fm)',
                    fontSize: 10,
                    letterSpacing: '.14em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,.7)',
                    border: '1px solid rgba(255,255,255,.2)',
                    borderRadius: 100,
                    padding: '7px 16px',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* ── RIGHT: floating video collage ── */}
          <div
            style={{
              flex: '1 1 440px',
              minWidth: 320,
              position: 'relative',
              height: 'clamp(420px, 70vh, 620px)',
            }}
          >
            {heroCards.map((c) => (
              <HeroCard key={c.id} c={c} />
            ))}
          </div>
        </div>
      </section>

      {/* ── TICKER STRIP ── */}
      <div
        style={{
          background: '#111',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          borderTop: '1px solid rgba(255,255,255,.06)',
          borderBottom: '1px solid rgba(255,255,255,.06)',
        }}
      >
        <div
          style={{
            display: 'inline-block',
            animation: 'slide 20s linear infinite',
            fontFamily: 'var(--fm)',
            fontSize: 11,
            letterSpacing: '.15em',
            color: 'rgba(255,255,255,.4)',
            padding: '16px 0',
          }}
        >
          {ticker.repeat(6)}
        </div>
      </div>

      {/* ── SELECTED WORK GRID ── */}
      <section style={{ background: 'var(--white)', padding: '80px 48px' }}>
        <div className="sec-label" style={{ marginBottom: 12 }}>
          Selected Work
        </div>
        <h2
          style={{
            fontFamily: 'var(--fd)',
            fontSize: 'clamp(32px,4vw,56px)',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            color: 'var(--ink)',
            lineHeight: 1,
            marginBottom: 48,
            maxWidth: 720,
          }}
        >
          Campaigns we&apos;ve framed, told and made resonate.
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: 28,
          }}
        >
          {campaigns.map((c, i) => (
            <CampaignCard key={`${c.client}-${i}`} c={c} />
          ))}
        </div>
      </section>

      {/* ── STAT BAR ── */}
      <div
        style={{
          background: 'var(--ink)',
          display: 'flex',
        }}
      >
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            style={{
              flex: 1,
              textAlign: 'center',
              padding: '40px 20px',
              borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,.08)' : 'none',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--fd)',
                fontSize: 'clamp(40px,6vw,72px)',
                fontWeight: 900,
                color: '#fff',
                lineHeight: 1,
              }}
            >
              {stat.val}
            </div>
            <div
              style={{
                fontFamily: 'var(--fm)',
                fontSize: 9,
                letterSpacing: '.18em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,.4)',
                marginTop: 8,
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── CTA ── */}
      <section
        style={{
          background: 'var(--magenta)',
          padding: '80px 48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 40,
        }}
      >
        <p
          style={{
            fontFamily: 'var(--fd)',
            fontSize: 'clamp(32px,5vw,60px)',
            fontStyle: 'italic',
            fontWeight: 300,
            color: '#fff',
            lineHeight: 1.1,
            whiteSpace: 'pre-line',
          }}
        >
          {'Have a project\nin mind?'}
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link
            href="/contact"
            className="btn-fill"
            style={{ background: '#fff', color: 'var(--magenta)' }}
          >
            Start a Project →
          </Link>
          <Link
            href="/services"
            className="btn-border"
            style={{
              color: 'rgba(255,255,255,.7)',
              borderColor: 'rgba(255,255,255,.3)',
            }}
          >
            All Services
          </Link>
        </div>
      </section>
    </>
  );
}
