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
  { id: 7, slug: 'dharma-production', clientName: 'Dharma Productions', title: 'Sunny Sanskari Ki Tulsi Kumari', category: 'Film Marketing · Entertainment', shortDescription: 'A high-voltage social campaign that turned rom-com chemistry and music trends into cultural noise across India.', year: 2025, services: ['Film Marketing', 'Social Media', 'Influencer'], colorTheme: '#e0197d', accent: '#e0197d', gradFrom: '#3d0028', gradTo: '#1a0015', image: '/images/banner-home2-2-400x500.jpg', order: 7 },
  { id: 12, slug: 'disney-india', clientName: 'Disney India', title: 'Disney Delicious Minis', category: 'Entertainment · Food Series', shortDescription: 'A 24-episode food series blending Disney magic with healthy recipes, headlined by two celebrity chefs for kids and families.', year: 2024, services: ['Content Strategy', 'Video Production', 'Social Media'], colorTheme: '#003f8a', accent: '#1565c0', gradFrom: '#00205b', gradTo: '#001030', image: '/images/banner-home2-2-400x500.jpg', order: 12 },
  { id: 10, slug: 'son-of-sardaar-2', clientName: 'Son Of Sardaar 2 | Devgn Films', title: 'Jahan Son Hai, Wahan Fun Hai', category: 'Film Marketing · Comedy', shortDescription: "Fun as strategy — a viral campaign that turned the cast's chemistry into the film's biggest promotional asset.", year: 2025, services: ['Film Marketing', 'Social Media', 'Viral Campaign'], colorTheme: '#e05500', accent: '#f06000', gradFrom: '#3a1a00', gradTo: '#1a0c00', image: '/images/portfolio-popup-10-400x500.jpg', order: 10 },
  { id: 11, slug: 'maa-devgn', clientName: 'MAA | Devgn Films', title: 'End Credit Goes to MAA', category: 'Film Marketing · Horror', shortDescription: 'A universe-expanding horror campaign anchored in maternal strength — blending fear, faith, and a first in Indian cinema.', year: 2025, services: ['Film Marketing', 'Universe Strategy', 'Experiential'], colorTheme: '#6b0080', accent: '#8800a0', gradFrom: '#0a0010', gradTo: '#050008', image: '/images/bg-about-company-400x500.jpg', order: 11 },
  { id: 9, slug: 'mumbai-indians', clientName: 'DHL — Mumbai Indians', title: 'Life Ka Filter — #ThatsMyGame', category: 'Logistics · IPL Campaign', shortDescription: 'Two campaigns, one shoot — breaking IPL ad stereotypes while integrating DHL across social feeds during the cricket season.', year: 2024, services: ['Campaign Strategy', 'Film Production', 'Social Media'], colorTheme: '#003f8a', accent: '#004fc4', gradFrom: '#00205b', gradTo: '#001845', image: '/images/banner-home3-1-400x500.jpg', order: 9 },
  { id: 8, slug: 'kesari-chapter-2', clientName: 'Kesari Chapter 2 | Dharma Productions', title: 'Witness the History', category: 'Film Marketing · Historical', shortDescription: "A disruptive campaign that turned passive audiences into active witnesses of India's forgotten courtroom history.", year: 2025, services: ['Film Marketing', 'Creative Strategy', 'Digital'], colorTheme: '#c4820a', accent: '#e09420', gradFrom: '#2d1800', gradTo: '#1a0e00', image: '/images/bg-about-company-400x500.jpg', order: 8 },
];
