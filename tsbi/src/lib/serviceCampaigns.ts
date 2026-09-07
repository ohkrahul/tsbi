/**
 * The hand-authored campaign copy that used to live inline in the two service
 * pages. Kept as a pure data module for two reasons: `seed-service-cards.ts`
 * migrates it into the CMS from here, and the pages fall back to it when the
 * CMS is unreachable — the same arrangement `caseStudies.ts` already has.
 *
 * The CMS is the source of truth now; edit case studies in the studio, not this.
 */

export type Campaign = {
  client: string;
  house?: string;
  category: string;
  title: string;
  desc: string;
  videos: string[]; // YouTube video IDs
  poster?: string;  // thumbnail override (e.g. Cloudinary still) when there's no YouTube video
  caseStudySlug?: string; // Link to full case study
  /** Set by the CMS; absent on the bundled copy. Drives newest-first order. */
  createdAt?: string | null;
};

export const campaigns: Campaign[] = [
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

export type YTWork = {
  client: string; house?: string; category: string;
  title: string; desc: string; videoId: string; caseStudySlug?: string;
  /** Set by the CMS; absent on the bundled copy. Drives newest-first order. */
  createdAt?: string | null;
};

export const youtubeWork: YTWork[] = [
  { client: 'Sunny Sanskari Ki Tulsi Kumari', house: 'Dharma Productions', category: 'Film Marketing · Romantic Comedy', title: 'Chaos Sells Romance', desc: "Rom-coms don't thrive on subtlety — they thrive on chaos, chemistry, and cultural noise. We turned cast energy, heartbreak, and music trends into a high-voltage social ecosystem where Bijuria and Panwadi ignited millions of reels.", videoId: '9FUd-D4FWjw', caseStudySlug: 'dharma-production' },
  { client: 'MAA', house: 'Devgn Films', category: 'Film Marketing · Horror', title: 'End Credit Goes To MAA', desc: "Blending supernatural fear with maternal strength, we inducted MAA into the Shaitaan universe and replaced surnames with mothers' names in the credits — a first in Indian cinema.", videoId: 'zwtZj6YB9xk', caseStudySlug: 'maa-devgn' },
  { client: 'Sitaare Zameen Par', house: 'Aamir Khan Productions', category: 'Film Marketing · Entertainment', title: 'Imperfectly Perfect Teaser', desc: "A handcrafted pop-up cutout aesthetic revealing the film's 10 Sitaare one by one before the trailer drop. Playful honesty over polished perfection.", videoId: 'YH6k5weqwy8', caseStudySlug: 'sitaare-zameen-par' },
  { client: 'Son Of Sardaar 2', house: 'Devgn Films', category: 'Film Marketing · Comedy', title: 'Jahan Son Hai, Wahan Fun Hai', desc: "#PehlaTuDujaTu turned even trolls into participants. Cast chemistry, behind-the-scenes chaos and the PO PO song established one idea: Fun = Son Of Sardaar 2.", videoId: 'RaJGfQ_bb18', caseStudySlug: 'son-of-sardaar-2' },
  { client: 'ICICI Direct', category: 'Banking · Campaign Film', title: 'Yes To Udhaar — MTF Campaign', desc: "Drawing on India's 'Aaj Nagad, Kal Udhaar' kirana culture, we reframed ICICI Direct MTF's credit trading as a relatable, culturally resonant proposition for everyday investors.", videoId: 'wawKnq3860g' },
  { client: 'Kesari Chapter 2', house: 'Dharma Productions', category: 'Film Marketing · Historical', title: 'Witness The History', desc: "A blank-screen teaser hijacked all feeds. Progressive reveals of Akshay Kumar, R Madhavan and Ananya Panday turned audiences from passive spectators into active witnesses.", videoId: 'r-7g08INMSI', caseStudySlug: 'kesari-chapter-2' },
];
