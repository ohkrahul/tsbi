export type CaseStudyGalleryItem = {
  id: number;
  slug: string;
  clientName: string;
  title: string;
  category: string;
  shortDescription: string;
  year: number;
  services: string[];
  colorTheme: string;
  accent: string;
  gradFrom: string;
  gradTo: string;
  image: string;
  order: number;
};



export const caseStudies: CaseStudyGalleryItem[] = [
  { id: 1, slug: 'tiger-refresh', clientName: 'Tiger Beer', title: 'Refresh Your Vibes', category: 'Brand Refresh · Campaign', shortDescription: 'A cinematic campaign that redefined Tiger Beer\'s cultural presence.', year: 2024, services: ['Creative', 'Social', 'Production'], colorTheme: '#f05100', accent: '#f05100', gradFrom: '#301000', gradTo: '#0a0500', image: '/images/banner-home3-1-400x500.jpg', order: 1 },
  { id: 2, slug: 'loreal-glycolic', clientName: "L'Oréal Paris", title: 'Glycolic Bright Launch', category: 'Beauty · Digital Campaign', shortDescription: 'Multi-tier influencer strategy that launched Glycolic Bright across Asia.', year: 2024, services: ['Strategy', 'Creative', 'Influencer'], colorTheme: '#c42b6e', accent: '#c42b6e', gradFrom: '#2d0015', gradTo: '#1a000a', image: '/images/banner-home2-2-400x500.jpg', order: 2 },
  { id: 3, slug: 'chanel-influence', clientName: 'Chanel', title: 'Luxury Influencer Activation', category: 'Luxury · Influencer', shortDescription: 'Hyper-curated influencer experience for Chanel\'s Southeast Asia launch.', year: 2023, services: ['Influencer', 'Creative', 'Events'], colorTheme: '#b09050', accent: '#b09050', gradFrom: '#1a1400', gradTo: '#0a0a00', image: '/images/bg-about-company-400x500.jpg', order: 3 },
  { id: 4, slug: 'oneplus-film', clientName: 'OnePlus', title: 'Global Product Launch Film', category: 'Tech · Global Film', shortDescription: 'Cinematic product film distributed across 12 global markets.', year: 2024, services: ['Production', 'Distribution', 'Social'], colorTheme: '#f05100', accent: '#f05100', gradFrom: '#200800', gradTo: '#0a0300', image: '/images/banner-01-400x500.jpg', order: 4 },
  { id: 5, slug: 'dior-film', clientName: 'Dior', title: 'Cinematic Brand Film', category: 'Luxury · Film', shortDescription: 'A prestige brand film shot over 3 days across Mumbai and Paris.', year: 2025, services: ['Production', 'Strategy', 'Digital'], colorTheme: '#8c3030', accent: '#c04040', gradFrom: '#1a0808', gradTo: '#080303', image: '/images/portfolio-popup-12-400x500.jpg', order: 5 },
  { id: 6, slug: 'glossier-social', clientName: 'Glossier', title: 'Social-First Beauty Campaign', category: 'Beauty · Social', shortDescription: 'Always-on social strategy that grew Glossier\'s India audience 400%.', year: 2024, services: ['Social', 'Content', 'Influencer'], colorTheme: '#f4b8c8', accent: '#e890a8', gradFrom: '#1a0a10', gradTo: '#0a0508', image: '/images/portfolio-popup-10-400x500.jpg', order: 6 },
];
