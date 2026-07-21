// Local content for the /studio prototype. These mirror real TSBI copy that lives inline
// (and un-exported) on the home page / service pages, re-declared here so the prototype
// pulls real content without importing or touching those files.

export type StudioTier = { num: string; title: string; href: string; desc: string };
export type StudioStat = { value: string; label: string };
export type StudioFaqItem = { q: string; a: string };

/** Service tiers — link to the real service routes. */
export const STUDIO_TIERS: StudioTier[] = [
  {
    num: '01',
    title: 'content production',
    href: '/services/content-production',
    desc: 'TVCs, DVCs, brand films and shoots — cinematic, branded content built for attention and scale across YouTube, OTT and social.',
  },
  {
    num: '02',
    title: 'social media',
    href: '/services/social-media',
    desc: 'Always-on, platform-native storytelling — moment marketing, reels and carousels that turn scrolls into stops and keep brands in-feed.',
  },
  {
    num: '03',
    title: 'influencer management',
    href: '/services/influencer-management',
    desc: 'Creator and celebrity collaborations plus meme-led campaigns — built for reach, relevance and results, done right.',
  },
  {
    num: '04',
    title: 'digital transformation',
    href: '/services/digital-transformation',
    desc: 'D2C builds, Shopify, marketplace listings and UI/UX — taking brands from idea to impact, digitally, and scaling them fast.',
  },
];

/** Headline metrics (same figures shown on the home page). */
export const STUDIO_STATS: StudioStat[] = [
  { value: '15K+', label: 'campaigns' },
  { value: '500+', label: 'brands' },
  { value: '300+', label: 'employees strong' },
  { value: '30+', label: 'languages' },
];

/** Curated subset of the real client roster for the proof wall. */
export const STUDIO_CLIENTS: string[] = [
  'Ashok Leyland', 'Dabur', 'GSK', 'DHL', 'Mumbai Indians', 'Dharma Productions',
  'Diet Coke', 'Pepe Jeans', 'LuLu', 'Zydus', 'KidZania', 'TBZ',
  'Great White', 'Dubai Tourism', 'Jumeirah', 'Protinex',
];

export const STUDIO_FAQ: StudioFaqItem[] = [
  {
    q: 'what does tsbi actually do?',
    a: 'We are a full-service digital marketing agency — content production (TVCs, DVCs, brand films), social media, performance media, influencer and meme marketing, SEO and digital transformation. We conceptualise, produce and perform.',
  },
  {
    q: 'where are you based?',
    a: 'Two homes: TSBI HQ in Mumbai, India, and TSBI MENA in Dubai, U.A.E. — so we run work from Mumbai to the Middle East and beyond.',
  },
  {
    q: 'what kind of brands do you work with?',
    a: 'From entertainment and sport (Dharma, Devgn Films, Mumbai Indians) to FMCG, pharma, BFSI, tourism, retail and D2C — 500+ brands across 30+ languages.',
  },
  {
    q: 'do you handle 3d, cgi and games too?',
    a: 'Yes. Our MENA studio ships 3D and CGI films, digital hoardings, and even playable web games — like the Lipton × Squid Game experience and Vatika CGI films.',
  },
  {
    q: 'how do we start a project?',
    a: 'Tell us the brief and the ambition. Hit “let’s talk”, share where your brand wants to go, and we’ll shape the strategy, creative and media to get it there.',
  },
];
