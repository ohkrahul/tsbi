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
  // ── Films / Entertainment ──────────────────────────────────────────
  { id: 1,  slug: 'dharma-production',    clientName: 'Dharma Productions',          title: 'Sunny Sanskari Ki Tulsi Kumari',  category: 'Film Marketing · Romantic Comedy',  shortDescription: 'Turning cast energy, music trends, and chaos into a high-voltage social ecosystem where romance sold itself.',               year: 2025, services: ['Film Marketing', 'Social Media', 'Influencer'],   colorTheme: '#e0197d', accent: '#e0197d', gradFrom: '#3d0028', gradTo: '#1a0015', image: '/images/banner-home2-2-400x500.jpg',     order: 1  },
  { id: 2,  slug: 'kesari-chapter-2',     clientName: 'Dharma Productions',          title: 'Kesari Chapter 2',                category: 'Film Marketing · Historical',       shortDescription: "Turning passive spectators into active witnesses of India's forgotten courtroom history through 'Witness the History'.",  year: 2025, services: ['Film Marketing', 'Creative Strategy', 'Digital'],  colorTheme: '#c4820a', accent: '#e09420', gradFrom: '#2d1800', gradTo: '#1a0e00', image: '/images/bg-about-company-400x500.jpg',    order: 2  },
  { id: 3,  slug: 'maa-devgn',            clientName: 'Devgn Films',                 title: 'MAA',                             category: 'Film Marketing · Horror',           shortDescription: 'Blending supernatural fear with maternal strength — replacing surnames with mothers\' names in credits, a first in India.', year: 2025, services: ['Film Marketing', 'Universe Strategy', 'Experiential'], colorTheme: '#6b0080', accent: '#8800a0', gradFrom: '#0a0010', gradTo: '#050008', image: '/images/portfolio-popup-12-400x500.jpg',  order: 3  },
  { id: 4,  slug: 'son-of-sardaar-2',     clientName: 'Devgn Films',                 title: 'Son Of Sardaar 2',                category: 'Film Marketing · Comedy',           shortDescription: 'Fun itself was the strategy. #PehlaTuDujaTu turned even trolls into participants.',                                       year: 2025, services: ['Film Marketing', 'Social Media', 'Viral'],         colorTheme: '#e05500', accent: '#f06000', gradFrom: '#3a1a00', gradTo: '#1a0c00', image: '/images/portfolio-popup-10-400x500.jpg',  order: 4  },
  { id: 5,  slug: 'sitaare-zameen-par',   clientName: 'Aamir Khan Productions',      title: 'Sitaare Zameen Par',              category: 'Film Marketing · Entertainment',    shortDescription: 'An imperfectly perfect teaser — handcrafted cutout reveals designed to disrupt the scroll before the trailer drop.',      year: 2025, services: ['Film Marketing', 'Creative Strategy', 'Social'],   colorTheme: '#0055cc', accent: '#0066ff', gradFrom: '#001840', gradTo: '#000f28', image: '/images/banner-home3-1-400x500.jpg',     order: 5  },

  // ── Ashok Leyland ──────────────────────────────────────────────────
  { id: 6,  slug: 'ashok-leyland-diwali', clientName: 'Ashok Leyland',               title: '#KhushiyonKiSteering',            category: 'Commercial Vehicles · Festive',     shortDescription: 'Positioning Ashok Leyland as the unseen force that powers India\'s Diwali — the brand that keeps the nation moving.',   year: 2024, services: ['Brand Film', 'Social Media', 'Campaign Strategy'],  colorTheme: '#1a3070', accent: '#1a6aff', gradFrom: '#0a1840', gradTo: '#050e20', image: '/images/banner-01-400x500.jpg',           order: 6  },
  { id: 7,  slug: 'ashok-leyland-kargil', clientName: 'Ashok Leyland',               title: '#EyeOfTheStallion',               category: 'Automotive · Defence · AI Film',    shortDescription: 'India\'s first large-scale AI-led brand film narrating Kargil from the Stallion\'s perspective using GenAI tools.',      year: 2024, services: ['AI Film', 'Brand Strategy', 'Social Media'],        colorTheme: '#2d4a00', accent: '#4a7a00', gradFrom: '#0f1a00', gradTo: '#080d00', image: '/images/gallery-slider-02-400x500.jpg',  order: 7  },

  // ── Zydus Lifesciences ─────────────────────────────────────────────
  { id: 8,  slug: 'zydus-easiest-exam',   clientName: 'Zydus Lifesciences',          title: 'Easiest Exam',                    category: 'Healthcare · Public Awareness',     shortDescription: 'A podcast series hosted by Hina Khan reframing breast self-examination as the simplest tool women already possess.',       year: 2024, services: ['Podcast', 'Content Strategy', 'Digital'],           colorTheme: '#9b35cc', accent: '#c060e0', gradFrom: '#1a0028', gradTo: '#0d0015', image: '/images/portfolio-popup-10-400x500.jpg',  order: 8  },
  { id: 9,  slug: 'zydus-flu-vaccine',    clientName: 'Zydus Lifesciences',          title: 'Flu Vaccine Liya Kya?',           category: 'Healthcare · Preventive Health',    shortDescription: 'Normalising flu vaccination as a yearly habit through radio storytelling and culturally intuitive social nudges.',         year: 2024, services: ['Radio', 'Social Media', 'Brand Strategy'],          colorTheme: '#005580', accent: '#0088cc', gradFrom: '#001828', gradTo: '#000c14', image: '/images/bg-about-company-400x500.jpg',    order: 9  },
  { id: 10, slug: 'zydus-life-ka-filter', clientName: 'Zydus Lifesciences',          title: '#LifeKaFilter',                   category: 'Healthcare · Public Awareness',     shortDescription: 'Using the everyday beverage filter metaphor to demystify kidney health and turn a daunting topic into daily conversation.',year: 2025, services: ['Podcast', 'Content', 'Influencer', 'Digital'],       colorTheme: '#c45000', accent: '#e06000', gradFrom: '#2a1000', gradTo: '#150800', image: '/images/banner-home2-2-400x500.jpg',     order: 10 },
  { id: 11, slug: 'zydus-liver-ki-suno',  clientName: 'Zydus Lifesciences',          title: '#LiverKiSuno',                    category: 'Healthcare · Comedy Campaign',      shortDescription: 'Using humour with Johnny Lever, Jamie Lever & Suresh Menon to turn apathy around fatty liver disease into action.',       year: 2025, services: ['Brand Film', 'Comedy', 'Podcast', 'Social'],        colorTheme: '#c4a000', accent: '#e0b800', gradFrom: '#1a1400', gradTo: '#0d0a00', image: '/images/portfolio-popup-12-400x500.jpg',  order: 11 },

  // ── Others ─────────────────────────────────────────────────────────
  { id: 12, slug: 'mumbai-indians',       clientName: 'DHL × Mumbai Indians',        title: 'Life Ka Filter',                  category: 'Logistics · IPL Campaign',          shortDescription: 'Two campaigns, one shoot — #ThatsMyGame and Dil Se Indian woven into the IPL\'s biggest social ecosystem.',               year: 2024, services: ['Film Marketing', 'Social Media', 'Campaign'],       colorTheme: '#003f8a', accent: '#004fc4', gradFrom: '#00205b', gradTo: '#001845', image: '/images/banner-home3-1-400x500.jpg',     order: 12 },
  { id: 13, slug: 'disney-india',         clientName: 'Disney India',                title: 'Disney Delicious Minis',          category: 'Entertainment · Food Series',       shortDescription: 'A 24-episode food series marrying health with taste through Disney characters, headlined by two celebrity chefs.',        year: 2024, services: ['Content Strategy', 'Video Production', 'Social'],   colorTheme: '#003f8a', accent: '#1565c0', gradFrom: '#00205b', gradTo: '#001030', image: '/images/banner-home2-2-400x500.jpg',     order: 13 },
];
