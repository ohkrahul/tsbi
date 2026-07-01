'use client';

import Link from 'next/link';
import OtherServices from '@/components/services/OtherServices';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Campaign = {
  client: string;
  house?: string;
  category: string;
  title: string;
  desc: string;
  videos: string[]; // YouTube video IDs
  poster?: string;  // thumbnail override (e.g. Cloudinary still) when there's no YouTube video
  caseStudySlug?: string; // Link to full case study
};

// Sourced from the TSBI Content Production sheet (21 campaigns).
const campaigns: Campaign[] = [
  {
    client: 'Ashok Leyland',
    category: 'Commercial Vehicles / Logistics',
    title: '#KhushiyonKiSteering',
    desc: `Festive advertising during Diwali is largely dominated by consumer brands focusing on emotion, family, and celebration, while B2B brands often remain in the background. With #KhushiyonKiSteering, we set out to change that narrative by positioning Ashok Leyland as the unseen force that powers India's festive joy.

The campaign highlighted how Diwali celebrations across the country are made possible by countless journeys — sweets, diyas, fabrics, and essentials travelling from different regions to one home. Instead of overt product messaging, Ashok Leyland's presence was subtly woven into the story through creative transitions using truck elements like steering wheels and tyres.

By emotionally anchoring the brand to Diwali and showcasing its role as an enabler of togetherness, the campaign made a traditionally B2B brand culturally relevant, emotionally resonant, and central to India's festive supply chain — reinforcing Ashok Leyland as the brand that keeps the nation moving, especially when it matters most.`,
    videos: ['37CCZAHaYx8'],
    caseStudySlug: 'ashok-leyland-diwali',
  },
  {
    client: 'DHL',
    house: 'Mumbai Indians × IPL',
    category: 'Logistics',
    title: '#ThatsMyGame · Dil Se Indian',
    desc: `During the IPL season, ad campaigns featuring cricketers dancing and singing on green-screen backgrounds are ubiquitous. When tasked with creating a unique campaign proposition for DHL with Mumbai Indians, we decided to break the mould with #ThatsMyGame — cricketers asserting that their game is cricket, not dancing or singing.

But we didn't stop there. Capitalising on the same shoot, we crafted a second campaign: 'Dil Se Indian.' This showcased the indomitable spirit of the Mumbai Indians, capturing the essence and pride that lies in the heart of every Indian. We also subtly integrated the strengths of DHL, ensuring the videos travelled easily across social feeds, maximising engagement and reach.`,
    videos: ['MJofvf2lBNY', 'KlDctPUfuHI'],
    caseStudySlug: 'mumbai-indians',
  },
  {
    client: 'Danone',
    category: 'Food',
    title: "Nurses' Day Tribute Film",
    desc: `A paediatric nurse is the first friend a newborn child meets — tenderly caring for them, feeding them, and nurturing them through their initial hours. In doing so, she often sacrifices time with her own children and family, yet carries out her duties with unwavering dedication.

When tasked with creating a Nurses' Day asset for Danone India, we decided to illuminate this selfless, motherly nature of paediatric nurses through a poignant and touching film. This tribute celebrated and thanked the paediatric nurses — the unsung heroes who become the first friends and guardians of our children — honouring their relentless compassion and devotion.`,
    videos: ['D8cXWh7g2kk'],
    caseStudySlug: 'danone-nurses-day',
  },
  {
    client: 'ICICI Direct',
    category: 'Banking',
    title: 'Flash Trade — The Turkish Ice-Cream',
    desc: `To bring out the easy and simple nature of ICICI Direct Flash Trade's user experience, we drew parallels with something completely opposite — the Turkish ice-cream experience: complex, teasy and sometimes frustrating. With unique POV shots putting viewers in the characters' shoes, a little inspiration from Wes Anderson, and a sprinkle of funny, we made this advertisement for ICICI Direct Flash Trade.

A Turkish ice-cream experience is an emotional rollercoaster — excitement that builds into anxiety, then irritation, then anger. That is not what trading should feel like. Trading shouldn't be an emotional rollercoaster, but a simple experience of investment — which is exactly what ICICI Direct Flash Trade provides.`,
    videos: ['4D4H43PBEEo'],
    caseStudySlug: 'icici-flash-trade',
  },
  {
    client: 'Proteinx',
    category: 'Fitness',
    title: 'Protein Abhiyaan Anthem',
    desc: `The people are the strength of this country, and their strength comes from protein. We conceptualised and shot the Protein Abhiyaan Anthem for ProteinX India.`,
    videos: ['J4w6sjHgwlI'],
    caseStudySlug: 'proteinx-abhiyaan',
  },
  {
    client: 'Sandu Pharma',
    category: 'Pharma',
    title: "A 122-Year-Old Brand For Today's Youth",
    desc: `For a brand that has produced ayurvedic medicines for more than 100 years, it's a challenge to strike a balance between the age-old benefits of the science of Ayurveda and its communication to the ever-evolving, fast-paced consumer.

We made Sandu Pharma appeal to today's youth — honouring its heritage while speaking the language of a new generation.`,
    videos: ['yK-Te8ceD64', 'Ef0rp5tt9DM'],
    caseStudySlug: 'sandu-pharma-youth',
  },
  {
    client: 'Disney',
    category: 'Entertainment',
    title: 'Delicious Minis — Health Meets Taste',
    desc: `Disney India has brought us an array of stories that teach, entertain, and inspire generations. The 'Disney Delicious Minis' series was headlined by Chef Saransh Goila and Chef Chinu Vaze — with interesting takes on healthy recipes featuring Disney movie references and characters, making it a wholesome package for adults and kids alike.

The two brilliant chefs brought their expertise to our film with unique takes on classic recipes. Chef Saransh Goila — author and winner of the Food Food Maha Challenge — and Chef Chinu Vaze, a celebrity chef, host, and writer, added their flair to the series of 24 short videos.`,
    videos: ['qzHtzyuk_g4', 'dyVdaCIIMfc'],
    caseStudySlug: 'disney-india',
  },
  {
    client: 'The Q',
    category: 'Entertainment',
    title: 'Sabse Alag, Sabke Liye',
    desc: `Right since its inception, The Q has been known for its distinctive strategy that brings the best of digital to TV. We conceptualised and established 'Sabse Alag, Sabke Liye' for the channel — capturing its uniquely inclusive positioning.`,
    videos: ['gGdQ1aL1LEY', 'rzcKC7OyfVY'],
    caseStudySlug: 'the-q-sabse-alag',
  },
  {
    client: 'Vibha',
    category: 'Non-Profit',
    title: 'Through The Eyes Of A Curious Kid',
    desc: `As an NGO, Vibha's challenge is raising funds. We needed to strike a chord with individual donors through great storytelling in the brand TVC, in order to motivate them to donate.

We didn't want to make the film a sad reflection on the kid's situation, but a happy, buoyant celebration of his curiosity. The kid's inquisitiveness became the hero of the campaign — travelling a full journey where it is ignored, made fun of, and even discouraged, but never truly fades away.`,
    videos: ['aUDe3d7HfUE'],
    caseStudySlug: 'vibha-curious-kid',
  },
  {
    client: 'Thailand Tourism',
    category: 'Tourism',
    title: 'Evoking Wanderlust For Thai Tourism',
    desc: `Repositioning the brand in the minds of high-value customers was a critical but long-drawn exercise, because premium imagery is not Thailand's core positioning; it was seen as a mass product with no unique USP or luxury value; and myths and perceptions scare the uninitiated.

We set out to evoke our audience's wanderlust — recasting Thailand as a destination of premium, aspirational experiences.`,
    videos: ['BglRilfoGOA'],
    caseStudySlug: 'thailand-tourism',
  },
  {
    client: 'Canapure Canola Oil',
    category: 'Food',
    title: 'Getting India To Switch To Healthy Oil',
    desc: `The challenge was building familiarity for an unknown oil category and establishing it as a healthy alternative, building on the strength of its Canadian heritage. The insight: canola helps fight cholesterol and aims to be a healthy alternative to olive oil — but unlike olive oil, it is fantastic for the Indian style of cooking.

The outcome: healthy oil leads to a healthy you. A healthy you gives you the opportunity to do more — it allows you to say 'CAN' to everything.`,
    videos: ['m-ekod_mEzk'],
    caseStudySlug: 'canapure-canola-oil',
  },
  {
    client: 'GSK',
    category: 'Pharma / Health Awareness',
    title: 'Yeh Science Hai',
    desc: "Many people believe shingles is rare or just a skin problem — in reality it's the reactivation of the chickenpox virus already in the body. Yeh Science Hai simplifies this through relatable, everyday conversations, helping people understand their risk and the importance of prevention. Because the most surprising health facts aren't myths — they're simply science.",
    videos: [],
    poster: 'https://res.cloudinary.com/dna8mp2n7/video/upload/so_2/v1782721426/CP_45SEC_1920x1080_WA_o3syft.jpg',
    caseStudySlug: 'gsk-yeh-science-hai',
  },
  {
    client: 'Ashok Leyland',
    category: 'Commercial Vehicles / WPL',
    title: 'Zidd Wahi Manzil Nayi',
    desc: "An Ashok Leyland × Mumbai Indians WPL film. Women's cricket has reached new heights, but behind every boundary lies the same discipline and hard work — success raises the stage, it never changes what it takes. Kuch Nahi Badla.",
    videos: ['pW8Z44YLtKA'],
    caseStudySlug: 'ashok-leyland-zidd-wahi-manzil-nayi',
  },
  {
    client: 'Ashok Leyland',
    category: 'Commercial Vehicles / IPL',
    title: 'Whistle Podu Please',
    desc: "An Ashok Leyland × Chennai Super Kings film connecting two cultures that keep India moving — from 'Horn OK Please' on the highway to 'Whistle Podu' in the stands. Built on precision, teamwork and the spirit to keep going.",
    videos: ['o2h-9sNPAo4'],
    caseStudySlug: 'ashok-leyland-whistle-podu-please',
  },
  {
    client: 'Ashok Leyland',
    category: "Commercial Vehicles / Women's Day",
    title: 'She Drives It',
    desc: "A Women's Day film with Ashok Leyland and the Mumbai Indians Women's Team — celebrating women who don't wait for change, they drive it. Because when ambition takes the wheel, no destination is too far. #SheDrivesIt.",
    videos: ['Hx7l9Uoj7CQ'],
    caseStudySlug: 'ashok-leyland-she-drives-it',
  },
  {
    client: 'Ashok Leyland',
    category: "Commercial Vehicles / Mother's Day",
    title: "Mother's Day",
    desc: "A Mother's Day film rooted in the Indian ritual of seeking a mother's blessing before a journey. A mother's blessing is the first layer of protection; Ashok Leyland is the second — helping every driver reach their destination safely.",
    videos: ['tMP_euOcGx4'],
    caseStudySlug: 'ashok-leyland-mothers-day',
  },
  {
    client: 'Ashok Leyland',
    category: 'Commercial Vehicles / Festive',
    title: 'Built Like Santa',
    desc: "A Christmas film drawing a parallel between Santa's never-miss-a-destination journey and the reliability of Ashok Leyland trucks — celebrating those Built Like Santa, always on the move, delivering joy no matter how far the destination.",
    videos: ['Mr8fSjgj-qI'],
    caseStudySlug: 'ashok-leyland-built-like-santa',
  },
  {
    client: 'Happy Patel',
    category: 'Film Marketing / Spy Comedy',
    title: 'Khatarnak Jasoos',
    desc: "A meme-zone social strategy that mirrored the film's erratic spy-comedy tone — self-deprecating humour, punchy character memes and reaction clips built for sharing. Imran Khan's comeback was amplified for nostalgia and buzz, cool street-styled song reels kept it viral, moment marketing rode the Dhurandhar craze, and AI-generated visuals added a surreal, tech-savvy edge — a refreshing laugh riot that drove awareness among younger, digital-native audiences.",
    videos: ['YEv0zokK140'],
    caseStudySlug: 'happy-patel-khatarnak-jasoos',
  },
  {
    client: 'Ek Din',
    category: 'Film Marketing / Romance',
    title: 'The Magic of One Day',
    desc: "A hopeless-romantic social world built around the film's themes of fleeting, life-changing love. Soulful lyrical videos — the Arijit Singh title track, 'Khwaab Dekhoon' and other Ram Sampath & Irshad Kamil songs — set the emotional tone, while AI trend edits (Animal Crossing-style and dreamy anime looks) and slow-motion dialogue moments spotlighting Sai Pallavi and Junaid Khan made the promotion feel like an extension of the movie's emotional core.",
    videos: ['RCmyr_d3Hi0'],
    caseStudySlug: 'ek-din',
  },
];

const ticker =
  'ASHOK LEYLAND  ·  DHL  ·  DANONE  ·  ICICI DIRECT  ·  DISNEY  ·  THAILAND TOURISM  ·  PROTEINX  ·  SANDU  ·  THE Q  ·  VIBHA  ·  CANAPURE  ·  ';

const stats = [
  { val: '21', label: 'Campaigns' },
  { val: '15+', label: 'Brands' },
  { val: 'In-house', label: 'Studio & Post' },
];

// Hero slider data
const SLIDER_DATA = [
  { id: '37CCZAHaYx8', brand: 'Ashok Leyland',       title: 'Khushiyon Ki Steering', tag: 'Brand Film', dur: '02:48' },
  { id: '4D4H43PBEEo', brand: 'ICICI Direct',        title: 'Flash Trade',            tag: 'Campaign',   dur: '01:15' },
  { id: 'qzHtzyuk_g4', brand: 'Disney',               title: 'Delicious Minis',        tag: 'Series',     dur: '01:08' },
  { id: 'BglRilfoGOA', brand: 'Thailand Tourism',     title: 'Evoking Wanderlust',     tag: 'Brand Film', dur: '01:42' },
  { id: 'MJofvf2lBNY', brand: 'DHL × Mumbai Indians', title: 'Dil Se Indian',          tag: 'Social',     dur: '00:30' },
];

const CARD_W  = 480;
const CARD_H  = 300;   // ~16:10
const STRIDE  = 500;   // card width + gap — makes ±1 cards peek on each side

function cDist(i: number, active: number, n: number) {
  const d = ((i - active) % n + n) % n;
  return d > n / 2 ? d - n : d;
}

function HeroSlider() {
  const [active, setActive]     = useState(0);
  const [containerW, setContainerW] = useState(640);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef     = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const m = () => { if (containerRef.current) setContainerW(containerRef.current.offsetWidth); };
    m();
    window.addEventListener('resize', m);
    return () => window.removeEventListener('resize', m);
  }, []);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setActive(p => (p + 1) % SLIDER_DATA.length), 4500);
  };
  useEffect(() => { resetTimer(); return () => { if (timerRef.current) clearInterval(timerRef.current); }; }, []);

  const goTo = (i: number) => { setActive(((i % SLIDER_DATA.length) + SLIDER_DATA.length) % SLIDER_DATA.length); resetTimer(); };
  const N = SLIDER_DATA.length;

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: CARD_H + 56, overflow: 'hidden' }}>
      {SLIDER_DATA.map((c, i) => {
        const dist   = cDist(i, active, N);
        const isAct  = dist === 0;
        const absDist = Math.abs(dist);
        if (absDist > 2) return null;

        const x       = containerW / 2 - CARD_W / 2 + dist * STRIDE;
        const scale   = isAct ? 1 : absDist === 1 ? 0.85 : 0.72;
        const opacity = isAct ? 1 : absDist === 1 ? 0.62 : 0.28;

        return (
          <motion.div
            key={c.id}
            animate={{ x, scale, opacity }}
            transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => !isAct && goTo(i)}
            style={{
              position: 'absolute', top: 4, left: 0,
              width: CARD_W, height: CARD_H,
              borderRadius: 16, overflow: 'hidden',
              cursor: isAct ? 'default' : 'pointer',
              zIndex: isAct ? 10 : absDist === 1 ? 5 : 1,
              boxShadow: isAct
                ? '0 0 0 2px #7700cc, 0 0 0 3.5px #e0197d, 0 0 32px rgba(119,0,204,0.55), 0 0 60px rgba(224,25,125,0.22)'
                : '0 8px 32px rgba(0,0,0,0.55)',
            }}
          >
            <img src={`https://img.youtube.com/vi/${c.id}/hqdefault.jpg`} alt={c.brand}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.08) 55%, transparent 100%)' }} />

            {/* Tag badge */}
            {isAct && (
              <div style={{ position: 'absolute', top: 13, left: 13, fontFamily: 'var(--fm)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#fff', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 4, padding: '4px 10px' }}>
                {c.tag}
              </div>
            )}

            {/* Play */}
            {isAct && (
              <a href={`https://www.youtube.com/watch?v=${c.id}`} target="_blank" rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 54, height: 54, borderRadius: '50%', background: 'rgba(255,255,255,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', zIndex: 2 }}
              >
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none"><path d="M4 2.5L13.5 8L4 13.5V2.5Z" fill="#111" /></svg>
              </a>
            )}

            {/* Bottom info */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '14px 16px' }}>
              {isAct && (
                <div style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(15px,1.8vw,20px)', fontWeight: 700, color: '#fff', lineHeight: 1.15, marginBottom: 2 }}>
                  {c.brand}
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div style={{ fontFamily: 'var(--fb)', fontSize: isAct ? 12 : 10, color: 'rgba(255,255,255,0.58)', lineHeight: 1.2 }}>{c.title}</div>
                {isAct && <div style={{ fontFamily: 'var(--fm)', fontSize: 10, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em', flexShrink: 0, marginLeft: 8 }}>{c.dur}</div>}
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* Arrows */}
      {(['prev','next'] as const).map(dir => (
        <button key={dir} onClick={() => goTo(dir === 'prev' ? (active - 1 + N) % N : (active + 1) % N)}
          style={{ position: 'absolute', top: CARD_H / 2 + 4, ...(dir === 'prev' ? { left: `calc(50% - ${CARD_W/2 + 28}px)` } : { left: `calc(50% + ${CARD_W/2 - 10}px)` }), transform: 'translateY(-50%)', width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 20, padding: 0 }}
        >
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
            {dir === 'prev'
              ? <path d="M9 2L4 7l5 5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              : <path d="M5 2l5 5-5 5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            }
          </svg>
        </button>
      ))}

      {/* Dots */}
      <div style={{ position: 'absolute', bottom: 4, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 7 }}>
        {SLIDER_DATA.map((_, i) => (
          <button key={i} onClick={() => goTo(i)}
            style={{ width: i === active ? 22 : 7, height: 7, borderRadius: 4, background: i === active ? '#e0197d' : 'rgba(255,255,255,0.28)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.32s cubic-bezier(0.22,1,0.36,1)' }} />
        ))}
      </div>
    </div>
  );
}

function CampaignCard({ c }: { c: Campaign }) {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const hasVideo = c.videos.length > 0;
  const watchUrl = hasVideo ? `https://www.youtube.com/watch?v=${c.videos[0]}` : null;
  const caseUrl = c.caseStudySlug ? `/case-studies/${c.caseStudySlug}` : null;
  // poster overrides the YouTube thumb (e.g. GSK, whose film lives on Cloudinary).
  const thumb = c.poster ?? (hasVideo ? `https://img.youtube.com/vi/${c.videos[0]}/hqdefault.jpg` : null);
  const hasMedia = hasVideo || !!c.poster;
  const mediaHref = watchUrl ?? caseUrl; // play → YouTube if present, else the case study

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
        href={mediaHref ?? undefined}
        target={hasVideo ? '_blank' : undefined}
        rel="noopener noreferrer"
        style={{
          display: 'block',
          position: 'relative',
          aspectRatio: '16/9',
          background: hasMedia
            ? '#111'
            : 'linear-gradient(135deg,#161616,#2a2a2a)',
          cursor: mediaHref ? 'pointer' : 'default',
          pointerEvents: mediaHref ? 'auto' : 'none',
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
            background: hasMedia
              ? 'linear-gradient(to top, rgba(0,0,0,.7) 0%, rgba(0,0,0,.05) 55%, transparent 100%)'
              : 'none',
          }}
        />

        {hasMedia ? (
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
          {c.caseStudySlug ? (
            <Link
              href={`/case-studies/${c.caseStudySlug}`}
              style={{
                fontFamily: 'var(--fm)',
                fontSize: 10,
                letterSpacing: '.12em',
                textTransform: 'uppercase',
                color: 'var(--ink)',
                textDecoration: 'none',
                borderBottom: '1px solid var(--ink)',
              }}
            >
              View Case Study →
            </Link>
          ) : (
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
          )}

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
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set('.cp-hero-line, .cp-hero-anim, .cp-reveal', { opacity: 1, yPercent: 0, y: 0, filter: 'none' });
        return;
      }
      // hero entrance (on load) — line-mask reveal + staggered fade-up
      gsap.set('.cp-hero-line', { yPercent: 115, filter: 'blur(10px)' });
      gsap.set('.cp-hero-anim', { y: 22 });
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.to('.cp-hero-line', { opacity: 1, yPercent: 0, filter: 'blur(0px)', duration: 0.9, stagger: 0.13 }, 0.1)
        .to('.cp-hero-anim', { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, 0.42);

      // sections below — fade-up as they scroll into view
      gsap.set('.cp-reveal', { y: 30 });
      ScrollTrigger.batch('.cp-reveal', {
        start: 'top 88%',
        once: true,
        onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out' }),
      });
    });
    return () => ctx.revert();
  }, []);

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
              className="sec-label cp-hero-anim"
              style={{ color: 'rgba(255,255,255,.45)', marginBottom: 40, display: 'block', opacity: 0 }}
            >
              <span style={{ color: 'rgba(255,255,255,.25)' }}></span> — Production
            </span>

            <h1
              style={{
                fontFamily: 'var(--fa)',
                fontSize: 'clamp(48px,8vw,108px)',
                fontWeight: 400,
                lineHeight: 1.0,
                letterSpacing: '0.01em',
                color: '#fff',
                marginBottom: 40,
              }}
            >
              {['Frame.', 'Story.', 'Resonance.'].map((w) => (
                <span key={w} style={{ display: 'block', overflow: 'hidden' }}>
                  <span className="cp-hero-line" style={{ display: 'block', opacity: 0, paddingBottom: '0.06em', willChange: 'transform, opacity, filter' }}>{w}</span>
                </span>
              ))}
            </h1>

            <p
              className="cp-hero-anim"
              style={{
                fontSize: 'clamp(15px,1.4vw,18px)',
                color: 'rgba(255,255,255,.65)',
                fontWeight: 300,
                lineHeight: 1.7,
                maxWidth: 480,
                marginBottom: 40,
                opacity: 0,
              }}
            >
              End-to-end content production. Films, reels, photography — in-house, no compromise.
            </p>

            <div className="cp-hero-anim" style={{ display: 'flex', gap: 10, flexWrap: 'wrap', opacity: 0 }}>
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

          {/* ── RIGHT: hero video slider ── */}
          <div style={{ flex: '1 1 440px', minWidth: 320 }}>
            <HeroSlider />
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
          className="cp-reveal"
          style={{
            fontFamily: 'var(--fa)',
            fontSize: 'clamp(30px,4vw,54px)',
            fontWeight: 400,
            letterSpacing: '0.01em',
            color: 'var(--ink)',
            lineHeight: 1.08,
            marginBottom: 48,
            maxWidth: 760,
            opacity: 0,
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
          {[...campaigns]
            .sort((a, b) => a.client.localeCompare(b.client))
            .map((c, i) => (
              <CampaignCard key={`${c.client}-${i}`} c={c} />
            ))}
        </div>
      </section>

      {/* ── STAT BAR ── */}
      <div
        className="cp-reveal"
        style={{
          background: 'var(--ink)',
          display: 'flex',
          opacity: 0,
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
                fontFamily: 'var(--fa)',
                fontSize: 'clamp(40px,6vw,72px)',
                fontWeight: 400,
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
          className="cp-reveal"
          style={{
            fontFamily: 'var(--fa)',
            fontSize: 'clamp(30px,5vw,58px)',
            fontStyle: 'italic',
            fontWeight: 400,
            color: '#fff',
            lineHeight: 1.15,
            whiteSpace: 'pre-line',
            opacity: 0,
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
          <OtherServices current="content-production" />
        </div>
      </section>
    </>
  );
}
