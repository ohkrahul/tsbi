export type LeaderSlug = 'harikrishnan-pillai' | 'manish-solanki';

export interface Experience {
  company: string;
  title: string;
  duration: string;
  location: string;
  description: string[];
  accomplishments?: string[];
}

export interface Education {
  school: string;
  degree: string;
  field: string;
  year: string;
}

export interface Achievement {
  metric: string;
  description: string;
}

export interface ClientWithLogo {
  name: string;
  logo: string;
}

export interface LeaderProfile {
  slug: LeaderSlug;
  name: string;
  role: string;
  shortBio: string;
  fullBio: string;
  profileImage: string;
  bgImage: string;
  email: string;
  phone?: string;
  location: string;
  topSkills: string[];
  experience: Experience[];
  education: Education[];
  awards: string[];
  socialLinks: {
    linkedin?: string;
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
  highlights: string[];
  clients: ClientWithLogo[];
  achievements: Achievement[];
  serviceSpecialties: string[];
}

export const leaders: Record<LeaderSlug, LeaderProfile> = {
  'harikrishnan-pillai': {
    slug: 'harikrishnan-pillai',
    name: 'Harikrishnan Pillai',
    role: 'Founder & CEO',
    shortBio: 'Harikrishnan Pillai is the Founder and CEO of TheSmallBigIdea (TSBI), a prominent Mumbai-based digital and social media marketing agency founded in 2014. With over 15 years of industry experience, he specialises in building brand strategies and integrating creative, content, and technology for various major brands.',
    fullBio: `Harikrishnan Pillai comes with more than 18 years of experience in marketing and advertising. He founded TheSmallBigIdea, a full-service, independent digital agency, in 2014, along with Manish Solanki. Before TSBI Hari has worked with brands like Zee network & Reliance broadcast. His role at TSBI includes driving organizational growth and creative strategy. Over the last decade, the agency has managed to create a substantial presence in the broadcast, OTT, sports and film marketing space. In the last 5 years, the agency has landed this understanding to categories beyond entertainment, like banking, FMCG, fashion, and e-commerce, among others. In recent years, the agency has also made a serious foray into ad films and influencer marketing. Ads for brands like DHL, GreatWhite Electricals, Zydus Lifesciences and Ashok Leyland are shaping TSBI's full-service ad agency avatar. Managing the digital interests of celebrities like Ajay Devgn, Aaman Devgn has also shaped the celebrities and creator services at TSBI. Hari wears multiple hats, including that of an early-stage investor and that of a speaker on youth issues, innovation, and leadership. He's served as a jury member for reputed events and has been invited as a speaker to various events and awards, where he shares insights and knowledge with eager audiences. Hari comes with an MBA and a diploma degree in innovation and design from Sweden. He has been on the academic boards for media studies at leading schools and does occasional lectures and workshops at various B-schools in Mumbai. He has been associated actively with Rotary International for about two decades and has held critical positions in the state, national and international councils of Rotaract.`,
    profileImage: '/Hari/Hari.png',
    bgImage: '/main%20ppl/backgound%20ceo.jpg',
    email: 'hari@tsbi.in',
    location: 'Mumbai, Maharashtra, India',
    topSkills: ['Brand Development', 'Marketing Communications', 'Anchoring', 'Digital Strategy', 'Creative Direction'],
    experience: [
      {
        company: 'TheSmallBigIdea',
        title: 'Founder & CEO',
        duration: 'February 2014 - Present (12+ years)',
        location: 'Mumbai & Dubai',
        description: [
          'Founded and scaled a 300-person creative, content and technology company',
          'Built presence across broadcast, OTT, sports and film marketing space',
          'Expanded services to enterprise clients across India, MENA, UK, and US',
          'Pioneered influencer marketing and AI-led experiences',
          'Manages celebrity digital interests and creator ecosystems',
        ],
      },
      {
        company: 'Reliance Broadcast Network Limited',
        title: 'Senior Manager, Marketing',
        duration: 'September 2011 - January 2014',
        location: 'Mumbai',
        description: [
          'Marketing head for BIG RTL THRILL channel launch',
          'Led distribution & monetization of content on digital platforms',
          'Responsible for trade and distribution marketing initiatives',
          'Led digitization transition for the RBNL network',
          'In-charge of all digital initiatives for 5-channel television business',
        ],
      },
      {
        company: 'Zee Network',
        title: 'Brand Manager',
        duration: 'June 2008 - August 2011',
        location: 'Mumbai',
        description: [
          'Developed launch and sustenance strategies for fiction and reality shows',
          'Managed multi-channel marketing (Outdoor, Print, Television, Digital, Radio)',
          'Conceptualized creative communication campaigns',
          'Facilitated tie-ups with allied organizations',
          'Studied TAM data to project growth patterns',
        ],
      },
    ],
    education: [
      {
        school: 'Welingkar Institute of Management',
        degree: 'PGDBM',
        field: 'Management (Marketing)',
        year: '2006 - 2008',
      },
      {
        school: 'University of Mumbai',
        degree: 'Bachelor',
        field: 'Mass Media, Advertising',
        year: '2002 - 2005',
      },
    ],
    awards: ['Best Management Student', 'Notable Networker Award'],
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/harikrishnan-pillai-7626114',
    },
    highlights: [
      '18+ years in marketing & advertising',
      'Founded TSBI in 2014 with 300+ team members',
      'MBA from Sweden with innovation focus',
      'Early-stage investor & speaker',
      'Active with Rotary International',
      'Expanded to Dubai and MENA region',
    ],
    clients: [
      { name: 'Zee TV', logo: '/entertainment/zee%20tv.png' },
      { name: 'Colors TV', logo: '/entertainment/colors.webp' },
      { name: 'Big Magic', logo: '/entertainment/big%20magic.png' },
      { name: 'Disney India', logo: '/entertainment/disney%20india.png' },
      { name: 'Devgn Films', logo: '/entertainment/devgan.png' },
      { name: 'Dharma Productions', logo: '/entertainment/dharma%20production.png' },
      { name: 'Warner Bros', logo: '/entertainment/warner%20bros.png' },
      { name: 'Star Studios', logo: '/entertainment/Star_Studios_Logo.jpg' },
      { name: 'JioHotstar', logo: '/entertainment/jiohotstart.png' },
      { name: 'Z5', logo: '/entertainment/z5.png' },
      { name: 'Sony LIV', logo: '/entertainment/sony%20liv.png' },
      { name: 'Mumbai Indians', logo: '/entertainment/MI.jpg' },
      { name: 'KKR', logo: '/entertainment/kkr.jpg' },
      { name: 'Bigg Boss', logo: '/entertainment/big%20boss.jpg' },
      { name: 'Shark Tank India', logo: '/entertainment/shark%20tank.png' },
      { name: 'Cineplex', logo: '/entertainment/cineplex.png' },
      { name: 'DHL', logo: '/non-entertainment/dhl.png' },
      { name: 'Great White', logo: '/non-entertainment/GreatWhite-logo-696x364.png' },
      { name: 'Zydus', logo: '/non-entertainment/zydus.png' },
      { name: 'Ashok Leyland', logo: '/non-entertainment/ashok%20leyland.png' },
      { name: 'ICICI Direct', logo: '/non-entertainment/icici%20diect.jpg' },
      { name: 'Pepe Jeans', logo: '/non-entertainment/pepe%20jeans.jpg' },
    ],
    achievements: [
      {
        metric: '300+',
        description: 'Team members across Mumbai, Dubai, and international offices',
      },
      {
        metric: '18+ years',
        description: 'Industry experience in marketing and advertising',
      },
      {
        metric: '5+ regions',
        description: 'Expanded presence across MENA, UK, and US markets',
      },
      {
        metric: 'Pioneered',
        description: 'Influencer marketing and AI-led experiences at TSBI',
      },
    ],
    serviceSpecialties: ['Influencer Management', 'Content Production', 'Digital Transformation', 'Social Media', 'SEO & Organic Growth'],
  },
  'manish-solanki': {
    slug: 'manish-solanki',
    name: 'Manish Solanki',
    role: 'Co-Founder & Chief Operating Officer',
    shortBio: 'Manish found his early passion in Marketing during his college days. With over 20 years of experience, he started in client servicing with SSC&B Lintas and Publicis Ambience — working on brands like HDFC Mutual Funds, Capgemini, and ICICI. He later moved to CRISIL Ratings as a strategist and then entered television, working with ZEE TV and Times Television Network.',
    fullBio: `Manish has over two decades of experience in the marketing industry, working across various domains such as advertising, brand management, and digital marketing. He is a co-founder of TheSmallBigIdea, a full-service digital agency based in Mumbai, India. Manish's expertise lies in understanding the scope of an assignment, planning the importance of every aspect, and ensuring the nature and tone of the message to be delivered. He excels in breaking down assignments into simpler brackets, assigning accountability for each. He plays a crucial role at TheSmallBigIdea, serving as a visionary leader who guides the company's digital transformation initiatives, leads influencer marketing strategies, and oversees the TSBI Studios Division. With his strategic insight and deep understanding of market dynamics, Manish identifies opportunities, develops innovative solutions, and effectively drives business growth. Manish's journey began in consumer servicing at SSC&B Lintas and Publicis Ambience, in which he worked on numerous renowned brands such as HDFC Mutual Funds, VIP, Capgemini, and ICICI. He became additionally part of a hit release of Videocon d2h. His experience in advertising and marketing helped him sharpen his skills, and he gained an in-depth expertise of the nuances of emblem building. After his stint in advertising and marketing, Manish moved to CRISIL ratings as Brand Manager for SME ratings, where he gained expertise in research and brand strategy. With his extensive experience, Manish joined the television sector, working for channels such as ZEE TV and Times Television Network (International Business), where he worked as the marketing head, leading brand communication and strategy for the channels. As Project Head for the World's Biggest India Day Parade in New York, he handled both on-ground and global broadcast for Times Television Network.`,
    profileImage: '/Manish/manish.png',
    bgImage: '/main%20ppl/coo%20backgorund.webp',
    email: 'manish85in@gmail.com',
    phone: '9892188544',
    location: 'Mumbai, Maharashtra, India',
    topSkills: ['Brand Management', 'Marketing Strategy', 'Market Research', 'Digital Transformation', 'Influencer Marketing'],
    experience: [
      {
        company: 'TheSmallBigIdea',
        title: 'Co-Founder & COO',
        duration: 'February 2014 - Present (12+ years)',
        location: 'Mumbai',
        description: [
          'Co-founded and built a digital-first branding agency from ground up',
          'Guides digital transformation initiatives and influencer marketing strategies',
          'Oversees TSBI Studios Division operations',
          'Develops strategies on social, digital and technological platforms',
          'Provides consumer insights that enhance marketing plans',
        ],
      },
      {
        company: 'Times Television Network',
        title: 'Manager - Marketing (International Business)',
        duration: 'March 2013 - October 2013',
        location: 'Mumbai',
        description: [
          'Ideated & implemented strategies for brand resonance',
          'Developed partnerships & alliances across markets',
          'Created brand solutions for leading brands across categories',
          'Managed P&L for each project with focus on bottomline',
          'Project Head for World\'s Biggest India Day Parade in New York',
        ],
        accomplishments: [
          'Handled on-ground and global broadcast of World\'s Biggest India Day Parade',
          'Developed highly profitable relationships through extensive negotiations',
        ],
      },
      {
        company: 'Zee Entertainment Enterprises Limited',
        title: 'Marketing Manager',
        duration: 'June 2011 - February 2013',
        location: 'Mumbai',
        description: [
          'Handled Marketing & Programming for Zee TV in Asia Pacific Region (18 countries)',
          'Complete brand management across regions',
          'Managed on-air and off-air marketing initiatives',
        ],
      },
      {
        company: 'Publicis Groupe',
        title: 'Senior Brand Associate',
        duration: 'August 2008 - September 2010',
        location: 'Mumbai',
        description: [
          'Interfaced between clients and functional departments',
          'Managed campaign work and ensured timely delivery within budget',
          'Prepared and presented creative work for client approval',
          'Conducted extensive market research for brand upliftment',
        ],
        accomplishments: [
          'Launched New VIP Superlite bag with animation film and 360° campaign',
          'Drove Pan India brand launch for Videocon d2h across all media',
          'Handled TV commercials for Nerolac paints',
        ],
      },
    ],
    education: [
      {
        school: 'Welingkar Institute of Management',
        degree: 'MBA',
        field: 'Marketing',
        year: '2009 - 2012',
      },
    ],
    awards: [],
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/manish85in/',
      instagram: 'https://www.instagram.com/manish85in/',
    },
    highlights: [
      '20+ years in marketing & advertising',
      'Co-founder of TSBI in 2014',
      'Digital transformation leader',
      'Influencer marketing strategist',
      'TSBI Studios Division overseer',
      'Project Head - World\'s Biggest India Day Parade',
    ],
    clients: [
      { name: 'Zee TV', logo: '/entertainment/zee%20tv.png' },
      { name: 'Colors TV', logo: '/entertainment/colors.webp' },
      { name: 'JioHotstar', logo: '/entertainment/jiohotstart.png' },
      { name: 'Star Utsav', logo: '/entertainment/star%20utsav.jpg' },
      { name: 'Sony LIV', logo: '/entertainment/sony%20liv.png' },
      { name: 'Z5', logo: '/entertainment/z5.png' },
      { name: 'National Geographic', logo: '/entertainment/national%20geographic.png' },
      { name: 'Filmfare', logo: '/entertainment/filmfare.webp' },
      { name: 'Shark Tank India', logo: '/entertainment/shark%20tank.png' },
      { name: 'Bigg Boss', logo: '/entertainment/big%20boss.jpg' },
      { name: 'ICICI Direct', logo: '/non-entertainment/icici%20diect.jpg' },
      { name: 'Mahindra Manulife', logo: '/non-entertainment/mahindra%20manulife.png' },
      { name: 'Pepe Jeans', logo: '/non-entertainment/pepe%20jeans.jpg' },
      { name: 'Pret A Manger', logo: '/non-entertainment/pret.png' },
      { name: 'Veena World', logo: '/non-entertainment/veena%20wirld.jpg' },
      { name: 'Dabur', logo: '/non-entertainment/dabur.png' },
      { name: 'Sandu', logo: '/non-entertainment/sandu.png' },
      { name: 'Diet Coke', logo: '/non-entertainment/Diet-Coke-Logo.png' },
      { name: 'LuLu', logo: '/non-entertainment/lulu.png' },
      { name: 'KidZania', logo: '/non-entertainment/kidsznia.png' },
      { name: 'DHL', logo: '/non-entertainment/dhl.png' },
      { name: 'Lodha', logo: '/non-entertainment/lodha.png' },
    ],
    achievements: [
      {
        metric: '20+ years',
        description: 'Industry experience across advertising, branding, and digital marketing',
      },
      {
        metric: 'Digital-first',
        description: 'Built TSBI from ground up as a creative and technology agency',
      },
      {
        metric: 'Influencer',
        description: 'Led marketing strategies and creator ecosystem development',
      },
      {
        metric: 'TSBI Studios',
        description: 'Oversees operations of the production division',
      },
    ],
    serviceSpecialties: ['Content Production', 'SEO & Organic Growth', 'Digital Transformation', 'Influencer Management', 'Social Media'],
  },
};

export function getLeaderBySlug(slug: string): LeaderProfile | null {
  return leaders[slug as LeaderSlug] || null;
}

export function getAllLeaderSlugs(): LeaderSlug[] {
  return Object.keys(leaders) as LeaderSlug[];
}
