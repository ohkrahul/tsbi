export type CaseStudyGalleryItem = {
  id: number;
  slug: string;
  clientName: string;
  title: string;
  category: string;
  shortDescription: string;
  concept: string;
  year: number;
  services: string[];
  colorTheme: string;
  accent: string;
  gradFrom: string;
  gradTo: string;
  image: string;
  youtube?: string;
  order: number;
};

const YT = (id: string) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

export const caseStudies: CaseStudyGalleryItem[] = [
  {
    id: 1, slug: 'dharma-production', clientName: 'Dharma Productions', title: 'Sunny Sanskari Ki Tulsi Kumari',
    category: 'Film Marketing · Romantic Comedy',
    shortDescription: 'Turning cast chemistry, music trends, and chaos into a high-voltage social ecosystem where romance sold itself.',
    concept: "Rom-coms don't thrive on subtlety — they thrive on chaos, chemistry, and cultural noise. For Sunny Sanskari Ki Tulsi Kumari, we leaned fully into that truth, turning cast energy, heartbreak, and music trends into a high-voltage social ecosystem where chaos sold romance.\n\nThe campaign was built around the infectious chemistry of Varun Dhawan and Janhvi Kapoor, amplified through songs, reels, memes, and unfiltered shoot content. Rohit and Sanya's love for dance became a cultural trigger, pushing audiences to create millions of reels using the film's tracks — especially Bijuria and Panwadi, whose hook steps quickly took over Instagram feeds.\n\nInstead of polished promotions, the team embraced messiness: fun, chaotic cast videos where heartbreak and entertainment co-existed as the central narrative. AI-led creative units were introduced to break the cookie-cutter rom-com feed, giving Dharma's social presence a fresh, disruptive edge.\n\nBy making chaos and entertainment the heroes, the campaign fueled speculation, fandom debates, and repeat engagement — turning 'who ends up with whom' into a shared cultural question. The result was sustained buzz, massive music-led virality, and a strong emotional connect that positioned Sunny Sanskari Ki Tulsi Kumari as a celebration of modern love, confusion, and second chances.",
    year: 2025, services: ['Film Marketing', 'Social Media', 'Influencer', 'AI Creative'],
    colorTheme: '#e0197d', accent: '#e0197d', gradFrom: '#3d0028', gradTo: '#1a0015',
    image: YT('9FUd-D4FWjw'), youtube: '9FUd-D4FWjw', order: 1,
  },
  {
    id: 2, slug: 'kesari-chapter-2', clientName: 'Dharma Productions', title: 'Kesari Chapter 2',
    category: 'Film Marketing · Historical',
    shortDescription: "Turning passive spectators into active witnesses of India's forgotten courtroom history through 'Witness the History'.",
    concept: "In an entertainment-heavy landscape where film promotions often rely on spectacle, song launches, and predictable hype, marketing a century-old courtroom trial for Gen Z needed a radical shift. With Kesari Chapter 2, we chose to break convention by turning audiences from passive spectators into active witnesses through the campaign 'Witness the History.'\n\nThe campaign began with a disruptive, all-platform blank-screen teaser that hijacked feeds and sparked nationwide curiosity. This bold silence set the tone for a story that history had forgotten but needed to be heard. Progressive reveals of Akshay Kumar, R Madhavan, and Ananya Panday followed, carefully balancing mass appeal with cultural relevance.\n\nWe amplified the first-ever Akshay vs Maddy courtroom face-off as pop-culture fuel, igniting organic fandom conversations and dialogue-led storytelling. By rooting the narrative in emotion, confrontation, and truth, the campaign summoned a new generation to witness C. Sankaran Nair's forgotten legal battle against the British Empire.\n\nThrough social-first disruption and culturally resonant storytelling, Kesari Chapter 2 was positioned not just as a film, but as a national moment — one that revived history, rebuilt star power, and made the past feel urgent, visceral, and unmissable today.",
    year: 2025, services: ['Film Marketing', 'Creative Strategy', 'Digital', 'Social Media'],
    colorTheme: '#c4820a', accent: '#e09420', gradFrom: '#2d1800', gradTo: '#1a0e00',
    image: YT('r-7g08INMSI'), youtube: 'r-7g08INMSI', order: 2,
  },
  {
    id: 3, slug: 'maa-devgn', clientName: 'Devgn Films', title: 'MAA',
    category: 'Film Marketing · Horror',
    shortDescription: "Blending supernatural fear with maternal strength — replacing surnames with mothers' names in film credits, a first in Indian cinema.",
    concept: "In a market where horror-comedy dominates box office success, launching a pure horror film demanded a strategic expansion of both audience and universe. With MAA, we set out to grow the horror fanbase by blending supernatural fear with the emotional force of maternal strength — anchored in the idea 'End credit goes to MAA.'\n\nThe campaign strategically inducted MAA into a larger supernatural arc by leveraging the Shaitaan universe, introducing R Madhavan at the trailer launch to instantly deepen credibility and intrigue among horror loyalists. To broaden appeal beyond core horror audiences, we reframed the narrative around faith, belief, and motherhood — most powerfully by replacing surnames with mothers' names in the film credits, a first in Indian cinema.\n\nTo amplify emotional resonance, icons like Kajol and Usha Uthup came together during the song launch to celebrate maternal strength. For hardcore horror fans, immersive fear-first experiences were rolled out through paranormal-themed podcasts, terror train takeovers, and atmospheric digital storytelling that visualised a formless evil using AI-led narratives.\n\nBy oscillating between fear and faith, the campaign positioned MAA as more than just a horror release — it became an emotionally charged universe where belief stands as the ultimate weapon against evil, expanding the genre's appeal and bringing pure horror back into mainstream cultural conversation.",
    year: 2025, services: ['Film Marketing', 'Universe Strategy', 'Experiential', 'AI Storytelling'],
    colorTheme: '#6b0080', accent: '#8800a0', gradFrom: '#0a0010', gradTo: '#050008',
    image: YT('zwtZj6YB9xk'), youtube: 'zwtZj6YB9xk', order: 3,
  },
  {
    id: 4, slug: 'son-of-sardaar-2', clientName: 'Devgn Films', title: 'Son Of Sardaar 2',
    category: 'Film Marketing · Comedy',
    shortDescription: 'Fun itself was the strategy. #PehlaTuDujaTu turned even trolls into participants.',
    concept: "In a crowded comedy landscape where humour often blends into sameness, standing out meant shifting focus from promotion to pure vibe. For Son Of Sardaar 2, we made fun itself the strategy with the campaign 'Jahan Son Hai, Wahan Fun Hai' — selling the energy of the film, not just the film.\n\nThe campaign leaned heavily into the cast's natural chemistry, converting behind-the-scenes humour into pop-culture momentum. What began as a simple step evolved into the viral trend #PehlaTuDujaTu, turning even trolls into participants. Quick, exclusive social assets featuring the ensemble were created at speed, capturing spontaneous moments that felt authentic and infectious.\n\nTo deepen engagement, casual round-table interactions showcased the cast's camaraderie, while long-form content like a cast podcast extended the fun beyond short clips. Audience nostalgia for the original film was tapped into with the release of the PO PO song, reinforcing familiarity while reigniting excitement.\n\nAmplified by third-party pages and fan communities, the campaign firmly established one idea across platforms: Fun = Son Of Sardaar 2. By letting audiences witness the cast enjoying themselves, the campaign rebuilt buzz, reignited conversation, and made people want to join the fun long before release.",
    year: 2025, services: ['Film Marketing', 'Social Media', 'Viral Content', 'Podcast'],
    colorTheme: '#e05500', accent: '#f06000', gradFrom: '#3a1a00', gradTo: '#1a0c00',
    image: YT('HSX_KPfbP1o'), youtube: 'HSX_KPfbP1o', order: 4,
  },
  {
    id: 5, slug: 'sitaare-zameen-par', clientName: 'Aamir Khan Productions', title: 'Sitaare Zameen Par',
    category: 'Film Marketing · Entertainment',
    shortDescription: "An imperfectly perfect teaser — handcrafted cutout reveals designed to disrupt the scroll before the trailer drop.",
    concept: "In a social feed dominated by algorithmically perfect visuals and polished teaser drops, standing out meant doing the opposite. For Sitaare Zameen Par, we chose to disrupt the scroll by embracing imperfection with 'Imperfectly Perfect Teaser' — a handcrafted, tactile announcement unit designed to spark curiosity ahead of the trailer launch.\n\nInstead of sleek motion graphics, the campaign leaned into a pop-up cutout aesthetic. Printed images of the film's 10 Sitaare were revealed one by one, culminating in the reveal of Aamir Khan and the announcement that the trailer would drop the very next day. The deliberate roughness and handmade feel broke visual monotony and instantly caught attention.\n\nRolled out across social platforms, the imperfect design became its biggest strength — inviting intrigue, conversation, and organic pickup by fan and media pages. By rejecting visual perfection and leaning into playful honesty, Sitaare Zameen Par set the tone for what was to come: a film that's raw, emotional, and refreshingly human — long before audiences hit play on the trailer.",
    year: 2025, services: ['Film Marketing', 'Creative Strategy', 'Social Media'],
    colorTheme: '#0055cc', accent: '#0066ff', gradFrom: '#001840', gradTo: '#000f28',
    image: '/images/banner-home3-1-400x500.jpg', order: 5,
  },
  {
    id: 6, slug: 'ashok-leyland-diwali', clientName: 'Ashok Leyland', title: '#KhushiyonKiSteering',
    category: 'Commercial Vehicles · Festive Campaign',
    shortDescription: "Positioning Ashok Leyland as the unseen force that powers India's Diwali — the brand that keeps the nation moving.",
    concept: "Festive advertising during Diwali is largely dominated by consumer brands focusing on emotion, family, and celebration, while B2B brands often remain in the background. With #KhushiyonKiSteering, we set out to change that narrative by positioning Ashok Leyland as the unseen force that powers India's festive joy.\n\nThe campaign highlighted how Diwali celebrations across the country are made possible by countless journeys — sweets, diyas, fabrics, and essentials travelling from different regions to one home. Instead of overt product messaging, Ashok Leyland's presence was subtly woven into the story through creative transitions using truck elements like steering wheels and tyres.\n\nBy emotionally anchoring the brand to Diwali and showcasing its role as an enabler of togetherness, the campaign made a traditionally B2B brand culturally relevant, emotionally resonant, and central to India's festive supply chain — reinforcing Ashok Leyland as the brand that keeps the nation moving, especially when it matters most.",
    year: 2024, services: ['Brand Film', 'Social Media', 'Campaign Strategy'],
    colorTheme: '#1a3070', accent: '#1a6aff', gradFrom: '#0a1840', gradTo: '#050e20',
    image: YT('37CCZAHaYx8'), youtube: '37CCZAHaYx8', order: 6,
  },
  {
    id: 7, slug: 'ashok-leyland-kargil', clientName: 'Ashok Leyland', title: '#EyeOfTheStallion',
    category: 'Automotive · Defence · AI Film',
    shortDescription: "India's first large-scale AI-led brand film — narrating Kargil from the Stallion vehicle's perspective using generative AI.",
    concept: "National-day tributes often follow a familiar format: stock visuals, archival footage, and predictable narratives. For Kargil Vijay Diwas, Ashok Leyland chose to break that pattern with #EyeOfTheStallion — a first-of-its-kind tribute told entirely through Generative AI, making it one of the earliest large-scale AI-led brand films in the Indian automotive category.\n\nInstead of recounting the war through human voices alone, the story was narrated from a fresh and deeply emotional point of view: the Ashok Leyland Stallion — a vehicle that has served the Indian Army for decades. The Stallion became the silent witness carrying soldiers, supplies, and the wounded across the unforgiving terrain of Kargil. The film unfolded as a series of memories seen through its eyes, blending courage, loss, and resilience.\n\nGenerative AI enabled the recreation of war-time landscapes, mountain routes, convoys, and memory-like moments that are impossible to film today. Tools like ChatGPT, Runway, Higgsfield, Veo, Google AI Studio, and Hailuo AI were used to craft hyper-realistic visuals, while the voiceover and music remained human-led to preserve emotional authenticity.\n\nReleased across Ashok Leyland's social platforms, the film struck a strong emotional chord, earning widespread appreciation from defence communities, veterans, employees, and the public. By linking back to the brand promise 'Koi Manzil Door Nahin', #EyeOfTheStallion demonstrated how AI can be used not as a gimmick, but as a respectful, culturally sensitive storytelling tool.",
    year: 2024, services: ['AI Film Production', 'Brand Strategy', 'Social Media'],
    colorTheme: '#2d4a00', accent: '#4a7a00', gradFrom: '#0f1a00', gradTo: '#080d00',
    image: YT('v2c1uigYjLk'), youtube: 'v2c1uigYjLk', order: 7,
  },
  {
    id: 8, slug: 'zydus-easiest-exam', clientName: 'Zydus Lifesciences', title: 'Easiest Exam',
    category: 'Healthcare · Public Awareness',
    shortDescription: "A podcast series hosted by breast cancer survivor Hina Khan reframing breast self-examination as the simplest, most powerful tool women already possess.",
    concept: "Breast cancer awareness in India is widespread, yet early detection through breast self-examination remains low due to fear, stigma, and lack of relatable communication. With Easiest Exam, Zydus set out to bridge this gap by shifting the conversation from awareness to understanding — and from instruction to empathy.\n\nAt the heart of the campaign was a podcast series that treated breast health not as a medical lecture, but as a human conversation. Hosted by Hina Khan, a breast cancer survivor herself, Easiest Exam created a safe, credible, and mobile-first space where oncologists and survivors came together to simplify complex medical information, bust myths, and reduce fear around early detection.\n\nThe podcast reframed breast self-examination as the simplest, most powerful tool women already possess — their own hands. By blending medical credibility with lived experience, each episode gently guided listeners from hesitation to confidence, making early detection feel personal, approachable, and achievable rather than intimidating.\n\nThe campaign was supported by a larger content ecosystem including print, digital, and social touchpoints that directed audiences to deeper engagement through the podcast. Together, these elements transformed symbolic awareness into meaningful action, encouraging women to listen, learn, and take agency over their health.",
    year: 2024, services: ['Podcast Production', 'Content Strategy', 'Digital', 'Influencer'],
    colorTheme: '#9b35cc', accent: '#c060e0', gradFrom: '#1a0028', gradTo: '#0d0015',
    image: '/images/portfolio-popup-10-400x500.jpg', order: 8,
  },
  {
    id: 9, slug: 'zydus-flu-vaccine', clientName: 'Zydus Lifesciences', title: 'Flu Vaccine Liya Kya?',
    category: 'Healthcare · Preventive Health',
    shortDescription: "Normalising flu vaccination as a yearly habit through radio storytelling and culturally intuitive social nudges.",
    concept: "Despite high awareness around seasonal flu, vaccination uptake in India remains low — largely due to complacency and the familiar 'ho jayega' mindset. With the launch of Vaxiflu-4, India's first quadrivalent flu vaccine, Zydus set out to normalise flu vaccination as a yearly health habit, not a crisis-driven decision.\n\nInstead of fear-based medical messaging, the campaign introduced a culturally intuitive nudge: 'Flu Vaccine Liya Kya?' — a line that sounds like everyday small talk, yet carries real preventive intent. By reframing vaccination as a simple social check-in — much like asking about food, travel, or health — the campaign transformed a medical action into a conversational habit.\n\nRadio became the lead medium for this behavioural shift. Through slice-of-life storytelling, routine daily questions were replaced with one that truly mattered, cutting through clutter with warmth, familiarity, and repetition. Partnering with Radio Mirchi, multilingual, high-frequency spots were rolled out across prime cities and time bands to drive recall at scale.\n\nThe conversation was extended beyond airwaves through RJ-led social content, where trusted radio voices carried the message into digital spaces with credibility and relatability. By making prevention sound human, familiar, and timely, the campaign successfully turned flu vaccination into an everyday conversation.",
    year: 2024, services: ['Radio Campaign', 'Social Media', 'Brand Strategy', 'Influencer'],
    colorTheme: '#005580', accent: '#0088cc', gradFrom: '#001828', gradTo: '#000c14',
    image: '/images/bg-about-company-400x500.jpg', order: 9,
  },
  {
    id: 10, slug: 'zydus-life-ka-filter', clientName: 'Zydus Lifesciences', title: '#LifeKaFilter',
    category: 'Healthcare · Public Awareness',
    shortDescription: "Using the everyday beverage filter metaphor to demystify kidney health and turn a complex medical topic into daily conversation.",
    concept: "Health communication often struggles to break through because medical science feels intimidating and distant. With #LifeKaFilter, we reframed kidney health into a simple, everyday idea — something everyone already understands. Just like every morning begins with a filter for tea or coffee, life itself depends on an internal filter: our kidneys.\n\nBy using the familiar metaphor of a beverage filter, the campaign demystified the complex role of kidneys and turned a daunting medical topic into a relatable, mainstream conversation. Instead of fear-based messaging, #LifeKaFilter focused on awareness, simplicity, and daily relevance — making people pause and reflect on what silently filters their lives every day.\n\nBorn from the urgent reality that Chronic Kidney Disease often goes undetected due to low awareness, the campaign built a large, credible content ecosystem. Expert-led podcasts with leading oncologists and nephrologists added depth and trust, while promo films, influencer hygiene content, and print integrations ensured scale and mass visibility.\n\nBy blending education with familiarity, and science with storytelling, #LifeKaFilter succeeded in making kidney health a part of everyday discourse, positioning Zydus Lifesciences as a brand committed not just to treatment, but to proactive public health awareness at scale.",
    year: 2025, services: ['Podcast', 'Content Production', 'Influencer', 'Digital'],
    colorTheme: '#c45000', accent: '#e06000', gradFrom: '#2a1000', gradTo: '#150800',
    image: YT('qnYpXHOVYY0'), youtube: 'qnYpXHOVYY0', order: 10,
  },
  {
    id: 11, slug: 'zydus-liver-ki-suno', clientName: 'Zydus Lifesciences', title: '#LiverKiSuno',
    category: 'Healthcare · Comedy Campaign',
    shortDescription: "Using humour with Johnny Lever, Jamie Lever & Suresh Menon to turn apathy around fatty liver disease into attention, conversation, and action.",
    concept: "Health awareness campaigns often rely on fear, statistics, or medical jargon — especially when the condition is serious. With #LiverKiSuno, we chose to flip that approach by using humour as the strategy, turning apathy around fatty liver disease into attention, conversation, and action.\n\nFatty liver affects nearly 40% of Indians, yet remains ignored because it shows no early symptoms and doesn't feel urgent. The key barrier wasn't lack of care — it was lack of relatability. So we gave the liver a voice. Through everyday humour, familiar situations, and culturally rooted comedy, the campaign made the liver 'complain' in ways people could instantly recognise and laugh with, without trivialising the science.\n\nBy collaborating with India's most trusted comedians — Johnny Lever, Jamie Lever, and Suresh Menon — the campaign transformed a silent, neglected condition into content people wanted to watch, share, and discuss at home. Humour became the hook, while medical credibility remained the backbone, ensuring the message stayed accurate, responsible, and impactful.\n\nBuilt on the simple, culturally intuitive idea of listening to your liver before it's forced to scream, #LiverKiSuno proved that laughter can be a powerful behavioural tool — repositioning preventive healthcare as something conversational, not clinical.",
    year: 2025, services: ['Brand Film', 'Comedy Content', 'Podcast', 'Social Media'],
    colorTheme: '#c4a000', accent: '#e0b800', gradFrom: '#1a1400', gradTo: '#0d0a00',
    image: YT('aQo7sFLPwGw'), youtube: 'aQo7sFLPwGw', order: 11,
  },
  {
    id: 12, slug: 'mumbai-indians', clientName: 'DHL × Mumbai Indians', title: 'Life Ka Filter',
    category: 'Logistics · IPL Campaign',
    shortDescription: "Two campaigns, one shoot — #ThatsMyGame and Dil Se Indian woven into the IPL's biggest social ecosystem.",
    concept: "During the IPL season, ad campaigns featuring cricketers dancing and singing on green screen backgrounds are ubiquitous. However, when tasked with creating a unique campaign proposition for DHL with Mumbai Indians, we decided to break the mold with #ThatsMyGame. This campaign had cricketers asserting that their game is cricket, not dancing or singing.\n\nBut we didn't stop there. Capitalising on the same shoot, we crafted a second campaign: 'Dil Se Indian.' This campaign showcased the indomitable spirit of the Mumbai Indians, capturing the essence and pride that lies in the heart of every Indian. We also subtly integrated the strengths of DHL, ensuring that the videos traveled easily across social feeds, maximising engagement and reach.\n\nTwo complete campaigns from one production day — a testament to efficient creative strategy that delivered maximum impact while respecting the client's resources and the players' time. Both campaigns performed strongly across social platforms, with #ThatsMyGame sparking conversation about authenticity in sports marketing and Dil Se Indian reinforcing the emotional bond between the team and its fans.",
    year: 2024, services: ['Brand Film', 'Social Media', 'Campaign Strategy'],
    colorTheme: '#003f8a', accent: '#004fc4', gradFrom: '#00205b', gradTo: '#001845',
    image: YT('MJofvf2lBNY'), youtube: 'MJofvf2lBNY', order: 12,
  },
  {
    id: 13, slug: 'disney-india', clientName: 'Disney India', title: 'Disney Delicious Minis',
    category: 'Entertainment · Food Series',
    shortDescription: "A 24-episode food series marrying health with taste through Disney characters and two celebrity chefs.",
    concept: "Disney India has brought to us an array of stories that teach us something, entertain, and inspire generations. When tasked with creating branded content for Disney, we asked ourselves: how do we marry health with taste in a way that feels magical?\n\nThe answer was the 'Disney Delicious Minis' series — headlined by Chef Saransh Goila and Chef Chinu Vaze. With interesting takes on healthy recipes featuring Disney movie references and characters, it made a wholesome package for adults and kids alike.\n\nChef Saransh Goila, the author and winner of Food Food Maha Challenge, and Chef Chinu Vaze, a celebrity Chef, Host, and Writer, brought their unique expertise to a series of 24 short videos. Each episode balanced culinary creativity with the warmth and wonder of Disney's storytelling universe — turning healthy eating into a magical, entertaining experience.\n\nThe series proved that branded content works best when it genuinely entertains. By letting the chefs' personalities shine and the Disney characters add visual delight, Disney Delicious Minis became a destination series rather than just branded promotion — content families actually sought out and watched together.",
    year: 2024, services: ['Content Strategy', 'Video Production', 'Social Media'],
    colorTheme: '#003f8a', accent: '#1565c0', gradFrom: '#00205b', gradTo: '#001030',
    image: YT('qzHtzyuk_g4'), youtube: 'qzHtzyuk_g4', order: 13,
  },
  {
    id: 14, slug: 'danone-nurses-day', clientName: 'Danone', title: "Nurses' Day Tribute Film",
    category: 'Food · Healthcare',
    shortDescription: "A poignant tribute celebrating the selfless, motherly nature of paediatric nurses — the unsung heroes of early childhood.",
    concept: "A paediatric nurse is the first friend a newborn child meets — tenderly caring for them, feeding them, and nurturing them through their initial hours. In doing so, she often sacrifices time with her own children and family, yet carries out her duties with unwavering dedication.\n\nWhen tasked with creating a Nurses' Day asset for Danone India, we decided to illuminate this selfless, motherly nature of paediatric nurses through a poignant and touching film. This tribute celebrated and thanked the paediatric nurses — the unsung heroes who become the first friends and guardians of our children — honouring their relentless compassion and devotion.\n\nThe film became a cultural moment, resonating deeply with healthcare workers, parents, and audiences who recognised the quiet sacrifice nurses make every day. By anchoring Danone's purpose to maternal care and healthcare heroism, the brand positioned itself beyond nutrition — as a partner in nurturing and caring for the most vulnerable lives.",
    year: 2024, services: ['Brand Film', 'Healthcare Marketing', 'Social Media'],
    colorTheme: '#0066cc', accent: '#0080ff', gradFrom: '#001840', gradTo: '#000820',
    image: YT('D8cXWh7g2kk'), youtube: 'D8cXWh7g2kk', order: 14,
  },
  {
    id: 15, slug: 'icici-flash-trade', clientName: 'ICICI Direct', title: 'Flash Trade — The Turkish Ice-Cream',
    category: 'Banking · Campaign',
    shortDescription: "Positioning simple trading through a hilariously complex metaphor — the Turkish ice-cream experience that frustrates before it delights.",
    concept: "To bring out the easy and simple nature of ICICI Direct Flash Trade's user experience, we drew parallels with something completely opposite — the Turkish ice-cream experience: complex, teasy and sometimes frustrating. With unique POV shots putting viewers in the characters' shoes, a little inspiration from Wes Anderson, and a sprinkle of funny, we made this advertisement for ICICI Direct Flash Trade.\n\nA Turkish ice-cream experience is an emotional rollercoaster — excitement that builds into anxiety, then irritation, then anger. That is not what trading should feel like. Trading shouldn't be an emotional rollercoaster, but a simple experience of investment — which is exactly what ICICI Direct Flash Trade provides.\n\nThe campaign struck a chord with audiences through its uniqueness, wit, and relatable frustration. By inverting expectations and using humour to communicate product benefits, the film made financial services feel human, approachable, and even entertaining — a rare achievement in the BFSI category.",
    year: 2024, services: ['Brand Film', 'Campaign Strategy', 'Social Media'],
    colorTheme: '#ff9900', accent: '#ffaa00', gradFrom: '#331a00', gradTo: '#1a0d00',
    image: YT('4D4H43PBEEo'), youtube: '4D4H43PBEEo', order: 15,
  },
  {
    id: 16, slug: 'proteinx-abhiyaan', clientName: 'ProteinX India', title: 'Protein Abhiyaan Anthem',
    category: 'Fitness · Wellness',
    shortDescription: "A nation-building anthem celebrating protein as the source of strength for every Indian — the foundation of health and progress.",
    concept: "The people are the strength of this country, and their strength comes from protein. We conceptualised and shot the Protein Abhiyaan Anthem for ProteinX India — a celebration of how protein fuels the nation, from athletes to farmers, students to workers.\n\nThe anthem positioned protein not as a fitness supplement, but as a fundamental building block of Indian strength and progress. By connecting personal wellness with national pride, the campaign transcended typical fitness marketing and became a movement.\n\nThrough dynamic visuals, powerful messaging, and aspirational storytelling, Protein Abhiyaan Anthem became an iconic piece of content that resonated across demographics — proving that fitness and wellness could be celebrated as a collective, nation-wide mission rather than an individual pursuit.",
    year: 2024, services: ['Brand Film', 'Campaign Strategy', 'Social Media'],
    colorTheme: '#c41e3a', accent: '#e02a52', gradFrom: '#1a0a0e', gradTo: '#0d0507',
    image: YT('J4w6sjHgwlI'), youtube: 'J4w6sjHgwlI', order: 16,
  },
  {
    id: 17, slug: 'sandu-pharma-youth', clientName: 'Sandu Pharma', title: "A 122-Year-Old Brand For Today's Youth",
    category: 'Pharma · Brand Positioning',
    shortDescription: "Positioning a century-old ayurvedic brand as relevant to modern youth — honouring heritage while speaking the language of a new generation.",
    concept: "For a brand that has produced ayurvedic medicines for more than 100 years, it's a challenge to strike a balance between the age-old benefits of the science of Ayurveda and its communication to the ever-evolving, fast-paced consumer.\n\nWe made Sandu Pharma appeal to today's youth — honouring its heritage while speaking the language of a new generation. Instead of positioning Ayurveda as a nostalgic relic, we reframed it as an ancient science backed by modern understanding, meeting contemporary wellness needs.\n\nThrough relatable storytelling, contemporary aesthetics, and cultural resonance, the campaign proved that heritage brands can evolve without losing their soul. Sandu Pharma became a bridge between tradition and modernity — a brand your grandmother trusted that your generation would choose too.",
    year: 2024, services: ['Brand Film', 'Social Media', 'Campaign Strategy'],
    colorTheme: '#2d5016', accent: '#3d6b1f', gradFrom: '#0a0e04', gradTo: '#050707',
    image: YT('yK-Te8ceD64'), youtube: 'yK-Te8ceD64', order: 17,
  },
  {
    id: 18, slug: 'the-q-sabse-alag', clientName: 'The Q', title: 'Sabse Alag, Sabke Liye',
    category: 'Entertainment · Channel Positioning',
    shortDescription: "Establishing a channel's uniquely inclusive positioning — distinctly different, yet universally welcoming.",
    concept: "Right since its inception, The Q has been known for its distinctive strategy that brings the best of digital to TV. We conceptualised and established 'Sabse Alag, Sabke Liye' for the channel — capturing its uniquely inclusive positioning.\n\nThe campaign balanced The Q's core identity — being different, experimental, and forward-thinking — with its mission to remain accessible and welcoming to all. By leveraging the channel's unique content strategy and positioning it as both distinctly different AND universally relevant, the campaign carved a unique space in an overcrowded entertainment landscape.\n\nThrough integrated social and on-air content, the campaign successfully established The Q as the channel for people who wanted something different without sacrificing mass appeal — a rare positioning achievement.",
    year: 2024, services: ['Brand Strategy', 'Social Media', 'On-Air Marketing'],
    colorTheme: '#9d4edd', accent: '#b565f5', gradFrom: '#1a0033', gradTo: '#0d001a',
    image: YT('gGdQ1aL1LEY'), youtube: 'gGdQ1aL1LEY', order: 18,
  },
  {
    id: 19, slug: 'vibha-curious-kid', clientName: 'Vibha', title: 'Through The Eyes Of A Curious Kid',
    category: 'Non-Profit · Social Impact',
    shortDescription: "Reframing poverty not through pity, but through the unquenchable curiosity of a child — a celebration of potential over circumstance.",
    concept: "As an NGO, Vibha's challenge is raising funds. We needed to strike a chord with individual donors through great storytelling in the brand TVC, in order to motivate them to donate.\n\nWe didn't want to make the film a sad reflection on the kid's situation, but a happy, buoyant celebration of his curiosity. The kid's inquisitiveness became the hero of the campaign — travelling a full journey where it is ignored, made fun of, and even discouraged, but never truly fades away.\n\nBy shifting the narrative from 'help a poor child' to 'celebrate a curious mind', the campaign gave donors a reason to invest beyond guilt or charity — they were investing in potential, in dreams, and in the future. This reframing transformed donation from an act of sympathy into an act of belief and partnership.",
    year: 2024, services: ['Non-Profit Marketing', 'Brand Film', 'Social Media'],
    colorTheme: '#e85d04', accent: '#ff9500', gradFrom: '#1a0a00', gradTo: '#0d0500',
    image: YT('aUDe3d7HfUE'), youtube: 'aUDe3d7HfUE', order: 19,
  },
  {
    id: 20, slug: 'thailand-tourism', clientName: 'Thailand Tourism Board', title: 'Evoking Wanderlust For Thai Tourism',
    category: 'Tourism · Destination Marketing',
    shortDescription: "Repositioning Thailand as a destination of premium, aspirational experiences — moving beyond mass perceptions to luxury positioning.",
    concept: "Repositioning the brand in the minds of high-value customers was a critical but long-drawn exercise, because premium imagery is not Thailand's core positioning; it was seen as a mass product with no unique USP or luxury value; and myths and perceptions scare the uninitiated.\n\nWe set out to evoke our audience's wanderlust — recasting Thailand as a destination of premium, aspirational experiences. Through carefully curated visuals, emotional storytelling, and luxury-focused messaging, we transformed perceptions.\n\nThe campaign successfully repositioned Thailand from a mass-market beach destination to a place of sophisticated experiences, cultural richness, and aspirational luxury. By changing how high-value travelers saw Thailand, we opened doors to a more profitable, engaged audience segment.",
    year: 2024, services: ['Tourism Marketing', 'Brand Film', 'Social Media'],
    colorTheme: '#00a86b', accent: '#00cc7a', gradFrom: '#001a0f', gradTo: '#000d06',
    image: YT('BglRilfoGOA'), youtube: 'BglRilfoGOA', order: 20,
  },
  {
    id: 21, slug: 'canapure-canola-oil', clientName: 'Canapure Canola Oil', title: 'Getting India To Switch To Healthy Oil',
    category: 'Food · FMCG',
    shortDescription: "Building familiarity for an unknown oil category and establishing it as a healthy alternative perfect for Indian cooking.",
    concept: "The challenge was building familiarity for an unknown oil category and establishing it as a healthy alternative, building on the strength of its Canadian heritage. The insight: canola helps fight cholesterol and aims to be a healthy alternative to olive oil — but unlike olive oil, it is fantastic for the Indian style of cooking.\n\nThe outcome: healthy oil leads to a healthy you. A healthy you gives you the opportunity to do more — it allows you to say 'CAN' to everything.\n\nThrough product education, lifestyle positioning, and culturally relevant messaging, the campaign successfully introduced a new category to Indian households. By making canola feel both healthy AND practical for Indian cooking (unlike olive oil), we created a unique market position and drove adoption among health-conscious Indian families.",
    year: 2024, services: ['FMCG Marketing', 'Brand Strategy', 'Social Media'],
    colorTheme: '#ffd700', accent: '#ffec21', gradFrom: '#1a1a00', gradTo: '#0d0d00',
    image: YT('m-ekod_mEzk'), youtube: 'm-ekod_mEzk', order: 21,
  },
];
