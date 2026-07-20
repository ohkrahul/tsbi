'use client';

import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import HeroAnimation from '@/components/HeroAnimation';
// import Preloader from '@/components/Preloader'; // preloader disabled for now
// import CaseStudyCarousel from '@/components/CaseStudyCarousel'; // not rendered — kept out of the bundle
import LazyMount from '@/components/LazyMount';
import ArebiaSection from '@/components/home/ArebiaSection';
// Heavy R3F/three.js widget — loaded on demand (kept out of the initial bundle).
const TechWorkTube = dynamic(() => import('@/components/home/TechWorkTube'), { ssr: false });
// MarioTimeline pulls in all of framer-motion and sits far below the fold — load
// it on demand so framer-motion stays out of the initial JS (helps mobile TBT/LCP).
const MarioTimeline = dynamic(() => import('@/components/about/MarioTimeline'), { ssr: false });

gsap.registerPlugin(ScrollTrigger, SplitText);

/* ──────────────────────────────────────────────────────────────────────────
   HOME PAGE — single file (kept in one component so animations can be wired
   across every section). Styles live in globals.css (.hh / .bls / .bts /
   .csc / .cw2 / .bic classes).
   ────────────────────────────────────────────────────────────────────────── */

// ── Hero slides ──────────────────────────────────────────
// All three banners are 1920×630 (aspect ≈ 3.05). Paths are URL-encoded for the
// spaces in the folder/file names. `tag`/`caption` render as a small text overlay
// on the empty left side of the banner — mobile only (see hero markup). Edit freely.
type Slide = { src: string; alt: string; tag?: string; caption?: string };
const SLIDES: Slide[] = [
  { src: '/herobanner/dfdfdfdfz.webp', alt: 'Tsbi Family', tag: 'Family', caption: 'Tsbi Family' },
  { src: '/herobanner/yeh-science-hai-shingles-and-diabetes.webp', alt: 'Yeh Science Hai Shingles and Diabetes', tag: 'Featured', caption: 'Yeh Science Hai Shingles and Diabetes' },
  { src: '/herobanner/11.jpeg', alt: 'Ashish Vidyarthi', tag: 'Featured', caption: 'Ashish Vidyarthi' },
  { src: '/herobanner/12.jpeg', alt: 'MS Dhoni', tag: 'Featured', caption: 'MS Dhoni' },
  { src: '/herobanner/13.jpeg', alt: 'Mumbai Indians', tag: 'Official Partner', caption: 'Mumbai Indians' },
  
  
];

// ── Brand logos (two greyscale rows) ─────────────────────
type Logo = { name: string; src: string; color?: boolean };
const FALLBACK_CLIENTS = [
  // ─────────── Entertainment & Media ──────────────────────────────────
  { name: 'Dharma Productions',   type: 'Film · Entertainment',    accent: '#e0197d', isEntertainment: true,  logo: '/entertainment/dharma%20production.png',               slug: 'dharma-production'   },
  { name: 'Devgn Films',          type: 'Film · Entertainment',    accent: '#c42b6e', isEntertainment: true,  logo: '/entertainment/devgan.png',                            slug: 'son-of-sardaar-2'    },
  { name: 'Disney India',         type: 'Entertainment',           accent: '#0051a5', isEntertainment: true,  logo: '/entertainment/disney%20india.png',                    slug: 'disney-india'        },
  // { name: 'Warner Bros',          type: 'Film · Studio',           accent: '#1a3070', isEntertainment: true,  logo: '/entertainment/warner%20bros.png'                     },
  { name: 'Warner Music India',   type: 'Music Label',             accent: '#f05100', isEntertainment: true,  logo: '/entertainment/warner%20msuic.png'                    },
  // { name: 'North Records',        type: 'Music Label',             accent: '#c42b6e', isEntertainment: true,  logo: '/entertainment/north%20recorods.webp'                 },
  // { name: 'Star Studios',         type: 'Film · Studio',           accent: '#f05100', isEntertainment: true,  logo: '/entertainment/Star_Studios_Logo.jpg'                 },
  { name: 'ZEE TV',               type: 'Media · Broadcasting',    accent: '#1a6aff', isEntertainment: true,  logo: '/entertainment/zee%20tv.png'                          },
  { name: 'Z5',                   type: 'OTT · Streaming',         accent: '#1a6aff', isEntertainment: true,  logo: '/entertainment/z5.png'                                },
  { name: 'Z5 Marathi',           type: 'Regional OTT',            accent: '#1a6aff', isEntertainment: true,  logo: '/entertainment/marathi%20z5.jpg'                      },
  // { name: 'Colors TV',            type: 'Media · Broadcasting',    accent: '#e0197d', isEntertainment: true,  logo: '/entertainment/colors.webp'                           },
  { name: 'Big Magic',            type: 'Media · Broadcasting',    accent: '#f07a1a', isEntertainment: true,  logo: '/entertainment/big%20magic.png'                       },
  { name: '&TV',                  type: 'Media · Broadcasting',    accent: '#1a3070', isEntertainment: true,  logo: '/entertainment/%26tv.webp'                            },
  { name: 'JioHotstar',           type: 'OTT · Streaming',         accent: '#0051a5', isEntertainment: true,  logo: '/entertainment/jiohotstart.png'                       },
  { name: 'Sony LIV',             type: 'OTT · Streaming',         accent: '#1a6aff', isEntertainment: true,  logo: '/entertainment/sony%20liv.png'                        },
  // { name: 'Star Utsav',           type: 'Media · Broadcasting',    accent: '#f05100', isEntertainment: true,  logo: '/entertainment/star%20utsav.jpg'                      },
  { name: 'National Geographic',  type: 'Media · Documentary',     accent: '#f0c000', isEntertainment: true,  logo: '/entertainment/national%20geographic.png'             },
  { name: 'Filmfare',             type: 'Media · Awards',          accent: '#c89b3c', isEntertainment: true,  logo: '/entertainment/filmfare.webp'                         },
  // { name: 'Cineplex',             type: 'Film · Exhibition',        accent: '#e0197d', isEntertainment: true,  logo: '/entertainment/cineplex.png'                          },
  { name: 'Bigg Boss',            type: 'Reality TV',              accent: '#c42b6e', isEntertainment: true,  logo: '/entertainment/big%20boss.jpg'                        },
  { name: 'Shark Tank India',     type: 'Reality TV',              accent: '#1a3070', isEntertainment: true,  logo: '/entertainment/shark%20tank.png'                      },
  // { name: 'Dhaan Dhoom',          type: 'Entertainment',           accent: '#f07a1a', isEntertainment: true,  logo: '/entertainment/dhaan%20dhoom.png'                     },
  // Sports
  { name: 'Mumbai Indians',       type: 'Sports · IPL',            accent: '#004ba0', isEntertainment: true,  logo: '/entertainment/MI.jpg',                                slug: 'mumbai-indians'      },
  { name: 'Jaipur Pink Panthers', type: 'Sports · Pro Kabaddi',    accent: '#e040a0', isEntertainment: true,  logo: '/entertainment/Jaipur_Pink_panthers_logo.jpg'         },
  { name: 'KKR',                  type: 'Sports · IPL',            accent: '#3a0ca3', isEntertainment: true,  logo: '/entertainment/kkr.jpg'                               },
  { name: 'Gujarat Giants',       type: 'Sports · Pro Kabaddi',    accent: '#1a9080', isEntertainment: true,  logo: '/entertainment/gujrat%20giants.png'                   },
  { name: 'Gulf Giants',          type: 'Sports · ILT20',          accent: '#c89b3c', isEntertainment: true,  logo: '/entertainment/gulf%20giants.png'                     },
  { name: 'Desert Vipers',        type: 'Sports · ILT20',          accent: '#00a080', isEntertainment: true,  logo: '/entertainment/Desert_Vipers.png'                     },
  { name: 'Australia Champions',  type: 'Sports · Cricket',        accent: '#f0c000', isEntertainment: true,  logo: '/entertainment/australia%20champions.jpg'             },
  { name: 'ILT20',                type: 'Sports · League',         accent: '#1a6aff', isEntertainment: true,  logo: '/entertainment/International_League_T20_logo.svg.png' },
  { name: 'Adani',                type: 'Sports · Conglomerate',   accent: '#1a3070', isEntertainment: true,  logo: '/entertainment/adani.png'                             },

  // ─────────── Non-Entertainment / Consumer Brands ────────────────────
  // Finance & Banking
  // { name: 'ICICI Direct',         type: 'Finance · BFSI',          accent: '#ff6b00', isEntertainment: false, logo: '/non-entertainment/icici%20diect.jpg'                 },
  { name: 'HSBC',                 type: 'Banking',                  accent: '#db0011', isEntertainment: false, logo: '/non-entertainment/hsbc.png'                          },
  { name: 'IDFC First Bank',      type: 'Banking · Finance',        accent: '#e0197d', isEntertainment: false, logo: '/non-entertainment/Logo_of_IDFC_First_Bank.svg.png'   },
  { name: 'SBI General',          type: 'Insurance',                accent: '#003087', isEntertainment: false, logo: '/non-entertainment/sbi%20general.png'                 },
  { name: 'PolicyBazaar',         type: 'Insurance · Fintech',      accent: '#f07a1a', isEntertainment: false, logo: '/non-entertainment/policy%20bazaar.png'               },
  { name: 'ZebPay',               type: 'Crypto · Fintech',         accent: '#1a6aff', isEntertainment: false, logo: '/non-entertainment/ZebPay_Logo-s1280.png'             },
  { name: 'Mahindra Finance',     type: 'Finance · NBFC',           accent: '#e0197d', isEntertainment: false, logo: '/non-entertainment/mahidra%20finance.png'             },
  { name: 'Mahindra Manulife',    type: 'Mutual Funds',             accent: '#e0197d', isEntertainment: false, logo: '/non-entertainment/mahindra%20manulife.png'           },
  // Real Estate
  // { name: 'Lodha',                type: 'Real Estate',              accent: '#c89b3c', isEntertainment: false, logo: '/non-entertainment/lodha.png'                         },
  { name: 'Sobha Realty',         type: 'Real Estate',              accent: '#1a3070', isEntertainment: false, logo: '/non-entertainment/sobha-logo-png_seeklogo-632813.png'},
  { name: 'K Raheja Corp',        type: 'Real Estate',              accent: '#c42b6e', isEntertainment: false, logo: '/non-entertainment/kraheja.png'                       },
  { name: 'Samana Developers',    type: 'Real Estate · UAE',        accent: '#1a9080', isEntertainment: false, logo: '/non-entertainment/samana%20dev.png'                  },
  { name: 'Sterling Resorts',     type: 'Hospitality · Travel',     accent: '#1a5060', isEntertainment: false, logo: '/non-entertainment/sterling.jpg'                      },
  // Tourism
  { name: 'Dubai Tourism',        type: 'Tourism',                  accent: '#c89b3c', isEntertainment: false, logo: '/non-entertainment/dubai.png'                         },
  { name: 'Thailand Tourism',     type: 'Tourism',                  accent: '#1a6aff', isEntertainment: false, logo: '/non-entertainment/thailand.jpg'                      },
  { name: 'Visit Czechia',        type: 'Tourism',                  accent: '#003087', isEntertainment: false, logo: '/non-entertainment/visit%20czechia.png'               },
  { name: 'Passion Made Possible',type: 'Tourism · Singapore',      accent: '#e0197d', isEntertainment: false, logo: '/non-entertainment/PassionMadePossible.png'           },
  { name: 'Jumeirah',             type: 'Luxury Hospitality',        accent: '#c89b3c', isEntertainment: false, logo: '/non-entertainment/jumeriah.png'                      },
  { name: 'Veena World',          type: 'Travel · Tours',           accent: '#f07a1a', isEntertainment: false, logo: '/non-entertainment/veena%20wirld.jpg'                 },
  // FMCG & Health
  { name: 'Dabur',                type: 'FMCG · Health',            accent: '#1a9080', isEntertainment: false, logo: '/non-entertainment/dabur.png'                         },
  { name: 'GSK',                  type: 'Pharma',                   accent: '#f36f21', isEntertainment: false, logo: '/non-entertainment/GSK_Logo_PNG5.png'                 },
  { name: 'Protinex',             type: 'Health · Nutrition',       accent: '#f05100', isEntertainment: false, logo: '/non-entertainment/protinex.png'                      },
  { name: 'Dexolac',              type: 'Baby Nutrition',           accent: '#1a6aff', isEntertainment: false, logo: '/non-entertainment/dexolac.jpg'                       },
  { name: 'Sandu',                type: 'Pharma · Wellness',        accent: '#00c090', isEntertainment: false, logo: '/non-entertainment/sandu.png'                         },
  { name: 'Zydus',                type: 'Pharma',                   accent: '#003087', isEntertainment: false, logo: '/non-entertainment/zydus.png'                         },
  { name: 'Diet Coke',            type: 'Beverage',                 accent: '#c42b6e', isEntertainment: false, logo: '/non-entertainment/Diet-Coke-Logo.png'                },
  // Automotive
  { name: 'Ashok Leyland',        type: 'Automobile',               accent: '#1a3070', isEntertainment: false, logo: '/non-entertainment/ashok%20leyland.png'               },
  { name: 'Fiat',                 type: 'Automobile',               accent: '#003087', isEntertainment: false, logo: '/non-entertainment/fiat_pe_revised_logo_white1.png'   },
  // Retail & Lifestyle
  { name: 'Pepe Jeans',           type: 'Fashion · Retail',         accent: '#1a3070', isEntertainment: false, logo: '/non-entertainment/pepe%20jeans.jpg'                  },
  { name: 'LuLu',                 type: 'Retail · Hypermarket',     accent: '#e0197d', isEntertainment: false, logo: '/non-entertainment/lulu.png'                          },
  { name: 'Mi Shop',              type: 'Consumer Tech · Retail',   accent: '#f05100', isEntertainment: false, logo: '/non-entertainment/mi%20shop.png'                     },
  // { name: 'Pret A Manger',        type: 'Food & Beverage',          accent: '#8B1A1A', isEntertainment: false, logo: '/non-entertainment/pret.png'                          },
  { name: 'KidZania',             type: 'Family Entertainment',     accent: '#f0c000', isEntertainment: false, logo: '/non-entertainment/kidsznia.png'                      },
  { name: 'TBZ',                  type: 'Jewellery · Luxury',       accent: '#c89b3c', isEntertainment: false, logo: '/non-entertainment/Tbz_logo.jpg'                      },
  // Logistics & B2B
  { name: 'DHL',                  type: 'Logistics',                accent: '#ffcc00', isEntertainment: false, logo: '/non-entertainment/dhl.png',                            slug: 'mumbai-indians'      },
  { name: 'Great White',          type: 'Electricals',              accent: '#1a3070', isEntertainment: false, logo: '/non-entertainment/GreatWhite-logo-696x364.png'        },
  { name: 'AGL',                  type: 'Industry',                 accent: '#003087', isEntertainment: false, logo: '/non-entertainment/agl.png'                           },
  // { name: 'INTOIT',               type: 'Technology',               accent: '#1a6aff', isEntertainment: false, logo: '/non-entertainment/final_logo_INTOIT-02_89b8d92c-0882-4d89-8215-fc7bbe82fb29.webp' },
  { name: 'Quick',                type: 'Services',                 accent: '#f07a1a', isEntertainment: false, logo: '/non-entertainment/quick.png'                         },
  { name: 'Play n Learn',         type: 'Education · EdTech',       accent: '#1a9080', isEntertainment: false, logo: '/non-entertainment/1738318092_Play%20n%20Learn.png'   },
];
// Home marquee logos — derived from the full FALLBACK_CLIENTS roster above (map logo → src),
// then split into two equal-length rows so both tracks scroll in sync.
const MARQUEE_LOGOS: Logo[] = FALLBACK_CLIENTS.map((c) => ({
  name: c.name,
  src: c.logo,
  ...(c.name === 'Devgn Films' ? { color: true } : {}),
}));
const MARQUEE_HALF = Math.ceil(MARQUEE_LOGOS.length / 2);
const ROW_ONE: Logo[] = MARQUEE_LOGOS.slice(0, MARQUEE_HALF);
const ROW_TWO: Logo[] = MARQUEE_LOGOS.slice(MARQUEE_HALF);

// ── Brands that trust us — featured cards. YouTube entries (id only) open on YouTube;
// an entry with `href` opens that link (internal `/…` route → case study, same tab;
// external `http…` → hosted video, new tab) and uses `poster` as the card image ──
type Video = { id: string; client: string; title: string; href?: string; poster?: string };
const VIDEOS: Video[] = [
  { id: 'gsk-yeh-science-hai', client: 'GSK', title: 'Yeh Science Hai',
    href: 'https://res.cloudinary.com/dna8mp2n7/video/upload/v1782721426/CP_45SEC_1920x1080_WA_o3syft.mp4',
    poster: 'https://res.cloudinary.com/dna8mp2n7/video/upload/so_2/v1782721426/CP_45SEC_1920x1080_WA_o3syft.jpg' },
  { id: 'v2c1uigYjLk', client: 'Ashok Leyland', title: 'AI Film' },
  { id: 'wWmPFUrZiHM', client: 'Zydus', title: 'Do Hath teen minute' },
  { id: 'MJofvf2lBNY', client: 'MI', title: 'Dil Se Indian' },
  { id: 'D8cXWh7g2kk', client: 'danone', title: 'Nurses Day Tribute Film' },
  { id: 'lipton-squid-game', client: 'Lipton × Squid Game', title: 'A Gamified Brand Experience',
    href: '/case-studies/lipton-squid-game', poster: '/tech/1.png' },
  
];

const ytThumb = (id: string) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
const ytThumbFallback = (id: string) => `https://img.youtube.com/vi/${id}/mqdefault.jpg`;

// Explicit bento placement (desktop, 3×3) so the grid fills with no lone card and the
// featured renders at its full 2-row height. [0] = featured (big, top-right).
const BTS_CELL = [
  'col-start-2 col-span-2 row-start-1 row-span-2',
  'col-start-1 row-start-1',
  'col-start-1 row-start-2',
  'col-start-1 row-start-3',
  'col-start-2 row-start-3',
  'col-start-3 row-start-3',
];


// ── Connect poster carousel (all 10 posters) ─────────────
const CONNECT_POSTERS = [
  { label: 'Happy Patel',                    img: '/Movie%20Posters/Happy%20Patel.jpg' },
  { label: 'ASSI',                           img: '/Movie%20Posters/ASSI.jpg' },
  { label: 'Main Vaapas Aaunga',             img: '/Movie%20Posters/MVA.jpeg' },
  { label: 'Ek Din',                         img: '/Movie%20Posters/Ek%20Din.jpg' },
  { label: 'Sunny Sanskari Ki Tulsi Kumari', img: '/Movie%20Posters/SSKTK.jpg' },
  { label: 'TMMTMTTM',                       img: '/Movie%20Posters/TMMTMTTM.jpg' },
  { label: 'TYM',                            img: '/Movie%20Posters/TYM.jpg' },
  { label: 'PPAVD',                          img: '/Movie%20Posters/PPAVD.jpeg' },
  { label: 'CMD',                            img: '/Movie%20Posters/CMD.jpg' },
  { label: 'Bandar',                         img: '/Movie%20Posters/Bandar.jpg' },
];

// ── CTA doodle icons (faint inline line-art) ─────────────
type Doodle = { top: string; left: string; node: React.ReactNode };
const DOODLES: Doodle[] = [
  { top: '12%', left: '8%', node: (<path d="M14 4c3 1 5 4 5 8-2 0-3 1-4 2l-3-3c1-1 2-2 2-4 0-1 0-2 0-3zM7 13l-3 1 2 3 3-1M9 17c-1 2-1 4-1 4s2 0 4-1" />) },
  { top: '7%', left: '34%', node: (<><path d="M9 16a5 5 0 1 1 6 0c-1 1-1 2-1 3h-4c0-1 0-2-1-3z" /><path d="M10 21h4" /></>) },
  { top: '14%', left: '62%', node: (<path d="M4 20V10M10 20V5M16 20v-7M20 20h-18" />) },
  { top: '9%', left: '86%', node: (<path d="M7 11v8H4v-8zM7 11l4-7c1 0 2 1 2 2l-1 4h5c1 0 2 1 1 2l-2 6c0 1-1 1-2 1H7" />) },
  { top: '40%', left: '4%', node: (<path d="M4 10v4l9 4V6zM13 8c2 0 3 1 3 4s-1 4-3 4M4 14c-1 0-1 3 1 4" />) },
  { top: '70%', left: '9%', node: (<><circle cx="10" cy="10" r="6" /><path d="M15 15l5 5" /></>) },
  { top: '86%', left: '24%', node: (<><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="1" /></>) },
  { top: '84%', left: '52%', node: (<path d="M4 20l1-4L16 5l3 3L8 19zM14 7l3 3" />) },
  { top: '80%', left: '80%', node: (<><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" /></>) },
  { top: '44%', left: '92%', node: (<><circle cx="12" cy="12" r="9" /><path d="M10 8l6 4-6 4z" /></>) },
  { top: '26%', left: '20%', node: (<path d="M4 5h16v10H9l-4 4v-4H4z" />) },
  { top: '60%', left: '88%', node: (<path d="M12 3l2.5 6 6 .5-4.5 4 1.5 6-5.5-3.5L6 19.5 7.5 13.5 3 9.5l6-.5z" />) },
];

export default function HomePage() {
  // Hero slider (Embla + autoplay)
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);


  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    setSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect).on('reInit', onSelect);
    onSelect();
    return () => {
      emblaApi.off('select', onSelect).off('reInit', onSelect);
    };
  }, [emblaApi]);

  // Preloader is disabled for now — fire the intro-done signal ourselves (next
  // frame, so every listener is already attached) so the hero, nav, scroll-reveal
  // and stat count-up entrance animations still run without the loader.
  useEffect(() => {
    const id = requestAnimationFrame(() => window.dispatchEvent(new Event('tsbi:intro-done')));
    return () => cancelAnimationFrame(id);
  }, []);

  // Stats count-up — animate 0 → target when the row scrolls into view (after the intro).
  useEffect(() => {
    const nums = gsap.utils.toArray<HTMLElement>('.stat-num');
    if (!nums.length) return;
    const setFinal = () => nums.forEach((el) => { el.textContent = (el.dataset.to ?? '0') + (el.dataset.suffix ?? ''); });
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setFinal(); return; }

    let started = false;
    let trigger: ScrollTrigger | undefined;
    const runCount = () =>
      nums.forEach((el) => {
        const to = parseFloat(el.dataset.to ?? '0');
        const suffix = el.dataset.suffix ?? '';
        const obj = { v: 0 };
        gsap.to(obj, {
          v: to,
          duration: 1.6,
          ease: 'power2.out',
          onUpdate: () => { el.textContent = Math.round(obj.v) + suffix; },
        });
      });
    const start = () => {
      if (started) return;
      started = true;
      // The stats row sits right under the hero, so it's usually already on-screen
      // by the time the intro finishes. ScrollTrigger won't fire onEnter for an
      // element that's already past its start at creation — so count immediately
      // when it's in view, and only defer to ScrollTrigger when it's still below.
      const row = document.querySelector<HTMLElement>('.stats-row');
      if (row && row.getBoundingClientRect().top < window.innerHeight * 0.9) {
        runCount();
      } else {
        trigger = ScrollTrigger.create({
          trigger: '.stats-row',
          start: 'top 88%',
          once: true,
          onEnter: runCount,
        });
      }
    };
    // Fire after the preloader intro so the count is actually seen; fallback if the event never comes.
    window.addEventListener('tsbi:intro-done', start, { once: true });
    const fallback = window.setTimeout(start, 2000);
    return () => {
      window.removeEventListener('tsbi:intro-done', start);
      clearTimeout(fallback);
      trigger?.kill();
    };
  }, []);

  // Movie-Connect — "magnetic pull": heading + sub are split into characters that fly in
  // from random positions/rotations and assemble; kicker + CTA fade up. Fires on scroll-in.
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // SplitText (not raw innerHTML) so revert() restores the DOM React owns.
    let titleSplit: ReturnType<typeof SplitText.create> | null = null;
    let subSplit: ReturnType<typeof SplitText.create> | null = null;
    let fallback = 0;
    const ctx = gsap.context(() => {
      const title = document.querySelector<HTMLElement>('.connect-title');
      const sub = document.querySelector<HTMLElement>('.connect-sub');
      if (!title || reduce) return;

      // 'words,chars' keeps whole words together (no mid-word wrap like "SC REENS")
      // while still animating per character.
      titleSplit = SplitText.create(title, { type: 'words,chars' });
      // aria:'none' — the sub is a <p>, and SplitText's default aria-label is
      // prohibited on paragraphs (a11y). The text stays in the DOM for readers.
      if (sub) subSplit = SplitText.create(sub, { type: 'words,chars', aria: 'none' });
      const titleChars = titleSplit.chars as HTMLElement[];
      const subChars = (subSplit?.chars ?? []) as HTMLElement[];

      // Scattered + rotated start state — the "pull" springs each char back to 0.
      const scattered = {
        x: () => gsap.utils.random(-140, 140),
        y: () => gsap.utils.random(-140, 140),
        rotation: () => gsap.utils.random(-60, 60),
        opacity: 0,
      };
      gsap.set([...titleChars, ...subChars], scattered);
      gsap.set(['.connect-kicker', '.connect-cta'], { y: 20, opacity: 0 });

      let revealed = false;
      const reveal = () => {
        if (revealed) return;
        revealed = true;
        // Fast assemble — short duration + tight stagger so it snaps in quickly.
        gsap.to(titleChars, {
          x: 0, y: 0, rotation: 0, opacity: 1,
          duration: 0.5, ease: 'power3.out', stagger: 0.008,
        });
        // The sub has many more chars — cap the total stagger so it doesn't drag on.
        gsap.to(subChars, {
          x: 0, y: 0, rotation: 0, opacity: 1,
          duration: 0.45, ease: 'power3.out', stagger: { amount: 0.3, from: 'random' }, delay: 0.15,
        });
        gsap.to(['.connect-kicker', '.connect-cta'], {
          y: 0, opacity: 1, duration: 0.45, ease: 'power3.out', stagger: 0.1, delay: 0.4,
        });
      };

      ScrollTrigger.create({ trigger: '.connect-text-block', start: 'top 82%', once: true, onEnter: reveal });

      // Bulletproofing so the heading can NEVER stay hidden: reveal now if it's
      // already in view, and a hard fallback in case a lazy section above shifts
      // the trigger's cached position before it fires (was hiding on mobile).
      const block = document.querySelector('.connect-text-block');
      if (block && block.getBoundingClientRect().top < window.innerHeight * 0.9) reveal();
      fallback = window.setTimeout(reveal, 6000);
    });
    return () => {
      clearTimeout(fallback);
      ctx.revert();
      titleSplit?.revert();
      subSplit?.revert();
    };
  }, []);

  // Big-Impact CTA heading — same "magnetic pull": characters fly in from random
  // positions/rotations and assemble; the CTA fades up. Fires on scroll-in.
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let split: ReturnType<typeof SplitText.create> | null = null;
    const ctx = gsap.context(() => {
      const h2 = document.querySelector<HTMLElement>('.bic-h2');
      if (!h2 || reduce) return;

      split = SplitText.create(h2, { type: 'chars' });
      const chars = split.chars as HTMLElement[];
      gsap.set(chars, {
        x: () => gsap.utils.random(-200, 200),
        y: () => gsap.utils.random(-200, 200),
        rotation: () => gsap.utils.random(-90, 90),
        opacity: 0,
      });
      gsap.set('.bic-cta', { y: 20, opacity: 0 });

      ScrollTrigger.create({
        trigger: '.bic-content',
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(chars, {
            x: 0, y: 0, rotation: 0, opacity: 1,
            duration: 1, ease: 'power3.out', stagger: 0.02,
          });
          gsap.to('.bic-cta', { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.6 });
        },
      });
    });
    return () => {
      ctx.revert();
      split?.revert();
    };
  }, []);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  // Brands bento — broken-thumbnail fallback (YouTube thumb → mq fallback → placeholder)
  const [failed, setFailed] = useState<Record<string, boolean>>({});
  const onThumbError = (id: string) => (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (img.dataset.tried !== '1') {
      img.dataset.tried = '1';
      img.src = ytThumbFallback(id);
    } else {
      setFailed((f) => (f[id] ? f : { ...f, [id]: true }));
    }
  };
  // YouTube serves a 120×90 grey "no thumbnail" image (not a 404) for some videos,
  // so onError never fires — detect it by the loaded image's natural width.
  const onThumbLoad = (id: string) => (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (img.naturalWidth > 120) return; // real thumbnail
    if (img.dataset.tried !== '1') {
      img.dataset.tried = '1';
      img.src = ytThumbFallback(id);
    } else {
      setFailed((f) => (f[id] ? f : { ...f, [id]: true }));
    }
  };

  // Brands bento — premium GSAP hover: the hovered card scales up + lifts; every
  // other card recedes (shrinks, dims) and is pushed away from it, so the whole
  // grid reacts. Animates the INNER element (transform) and only the OUTER z-index,
  // so it never collides with the scroll-reveal that drives the outer's transform.
  const focusCard = (e: React.MouseEvent<HTMLElement>) => {
    const inner = e.currentTarget;
    const grid = inner.closest('.bts-grid');
    if (!grid) return;
    const inners = Array.from(grid.querySelectorAll<HTMLElement>('.bts-card-inner'));
    const hr = inner.getBoundingClientRect();
    const hcx = hr.left + hr.width / 2;
    const hcy = hr.top + hr.height / 2;
    inners.forEach((el) => {
      const outer = el.closest<HTMLElement>('.bts-card');
      if (el === inner) {
        if (outer) gsap.set(outer, { zIndex: 30 });
        gsap.to(el, { scale: 1.08, opacity: 1, x: 0, y: 0, duration: 0.5, ease: 'power3.out', overwrite: 'auto' });
      } else {
        if (outer) gsap.set(outer, { zIndex: 1 });
        const r = el.getBoundingClientRect();
        const dx = r.left + r.width / 2 - hcx;
        const dy = r.top + r.height / 2 - hcy;
        const d = Math.hypot(dx, dy) || 1;
        gsap.to(el, { scale: 0.9, opacity: 0.45, x: (dx / d) * 24, y: (dy / d) * 24, duration: 0.5, ease: 'power3.out', overwrite: 'auto' });
      }
    });
  };
  const resetCards = (e: React.MouseEvent<HTMLElement>) => {
    const grid = e.currentTarget;
    gsap.to(grid.querySelectorAll<HTMLElement>('.bts-card-inner'), {
      scale: 1, opacity: 1, x: 0, y: 0, duration: 0.55, ease: 'power3.out', overwrite: 'auto',
    });
    grid.querySelectorAll<HTMLElement>('.bts-card').forEach((o) => gsap.set(o, { zIndex: 1 }));
  };


  return (
    <>
      {/* ── HERO (full-bleed Embla slider with the text overlaid on it) ───── */}
      {/* hero-section → ScrollTrigger anchor; GSAP parallax target */}
      <section className="hero-section group relative bg-navy flex w-full flex-col overflow-hidden min-[1130px]:mt-[108px] sm:block sm:h-190">
        {/* hero-image → clip-path wipe + scale reveal + cursor parallax.
            Mobile: full banner BELOW the copy (order-2), sized to the 1920×630 ratio so
            nothing is cropped. Desktop: full-bleed background behind the overlaid copy. */}
        <div className="hero-image relative order-2 aspect-1920/630 w-full sm:absolute sm:inset-0 sm:order-0 sm:aspect-auto">
          <div ref={emblaRef} className="h-full overflow-hidden">
            <div className="flex h-full">
              {SLIDES.map((s, i) => (
                <div key={s.src} className="relative h-full min-w-0 flex-[0_0_100%]">
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    priority={i === 0}
                    sizes="100vw"
                    className="object-cover object-center "
                  />
                  {/* caption on the empty left side of the banner — mobile only
                      (on desktop the banner is the backdrop for the main headline) */}
                  {s.caption && (
                    <div className="absolute inset-y-0 left-0 z-10 flex max-w-[58%] flex-col justify-center gap-1 bg-linear-to-r from-black/65 via-black/30 to-transparent px-5 sm:hidden">
                      {s.tag && (
                        <span className="font-fm text-[9px] font-semibold uppercase tracking-[0.18em] text-magenta">
                          {s.tag}
                        </span>
                      )}
                      <span className="font-fd text-lg font-bold leading-tight text-white">
                        {s.caption}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* scrim — desktop only; left-to-right fade so the overlaid copy reads while the
            right-hand subject stays clear. (Mobile copy sits on its own navy panel.) */}
        <div className="pointer-events-none absolute inset-0 z-1 hidden bg-linear-to-r from-black/45 via-black/10 to-transparent sm:block" />

        {/* hero-copy → cursor parallax (moves opposite to hero-image).
            Mobile: navy panel stacked ABOVE the banner (order-1). Desktop: overlaid. */}
        <div className="hero-copy relative z-10 order-1 flex flex-col justify-center gap-5 bg-navy px-8 py-6 text-white sm:absolute sm:inset-0 sm:order-0 sm:h-full sm:max-w-150 sm:bg-transparent sm:py-0 sm:pl-12">
          <span className="font-fm text-[11px] uppercase tracking-[0.22em] text-white/80">
            The Small Big Idea
          </span>
          {/* hero-title → SplitText word-stagger; .pink spans get extra scale-pop */}
          <h2 className="hero-title font-fm text-[34px] font-normal leading-[1.22] tracking-[0.01em] sm:text-5xl uppercase font-semibold">
            From Screens to Stadiums. We Make{' '}
            <span className="pink italic text-magenta">Brands</span>{' '}
            <span className="pink italic text-magenta">Unmissable.</span>
          </h2>
          {/* hero-subtitle → y+opacity fade in */}
          <p className="hero-subtitle max-w-[460px] font-light text-white/85">
            A full-service digital marketing agency helping brands grow through content, culture, and creativity
          </p>
          {/* hero-cta → delayed opacity fade in */}
          <Link
            href="/contact"
            className="hero-cta btn-pink-fill w-max rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-magenta"
          >
            Let&apos;s Talk →
          </Link>
        </div>

        {/* prev / next arrows — desktop, fade in on hover, kept clear of the copy */}
        <div className="absolute bottom-4 right-4 z-20 hidden gap-2 opacity-0 transition group-hover:opacity-100 sm:flex">
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Previous slide"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <button
            type="button"
            onClick={scrollNext}
            aria-label="Next slide"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
          </button>
        </div>

        {/* pagination dots — hero-slider-dot → stagger opacity in */}
        <div className="absolute bottom-3 sm:bottom-16 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {snaps.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`hero-slider-dot h-2 rounded-full transition-all ${i === selected ? 'w-6 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'}`}
            />
          ))}
        </div>
      </section>

      

      {/* ── CLIENT LOGO MARQUEE — right after the hero ──────────────────────── */}
      <section className="lm-section" aria-label="Brands we work with">
        {/* magenta connector line — overlaps the hero bottom, runs into the white area.
            hero-pink-svg / hero-pink-start-node / hero-pink-end-node → GSAP draws this
            after the hero headline appears, then pulses the end-node. */}
        <div className="lm-connector" aria-hidden>
          <svg className="lm-connector-svg hero-pink-svg" viewBox="0 0 1000 130" fill="none" preserveAspectRatio="none">
            <polyline points="6,118 300,118 360,40 1000,40" pathLength={1} stroke="#f01891" strokeWidth="1" fill="none" vectorEffect="non-scaling-stroke" />
          </svg>
          <span className="lm-node lm-node--square hero-pink-start-node" />
          <span className="lm-node lm-node--circle hero-pink-end-node" />
        </div>

        {/* Row 1 — moving left→right; cells carry the moving grid lines */}
        <div className="lm-marquee">
          <div className="lm-track lm-track--1" aria-hidden>
            {[...ROW_ONE, ...ROW_ONE, ...ROW_ONE].map((l, i) => (
              <span key={`r1-${i}-${l.name}`} className="lm-cell lm-cell--divider" title={l.name}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={l.src} alt={l.name} loading="lazy" decoding="async" />
              </span>
            ))}
          </div>
        </div>

        {/* Row 2 — same speed so the vertical grid lines stay aligned with row 1 */}
        <div className="lm-marquee">
          <div className="lm-track lm-track--2" aria-hidden>
            {[...ROW_TWO, ...ROW_TWO, ...ROW_TWO].map((l, i) => (
              <span key={`r2-${i}-${l.name}`} className="lm-cell" title={l.name}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={l.src} alt={l.name} loading="lazy" decoding="async" />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRANDS THAT TRUST US (top 6 case studies) — Tailwind ─────── */}
      <section className="relative  w-full overflow-visible bg-[#f01891]" aria-label="Brands that trust us">
        <div className="relative flex w-full items-center justify-between gap-12 px-14 py-14 max-[1280px]:flex-col max-[1280px]:items-stretch max-[1280px]:gap-6 max-[1280px]:px-6 max-[1280px]:pb-15 max-[1280px]:pt-12">
          {/* decorative arcs + dots (top-left) */}
          <svg className="pointer-events-none absolute left-0 top-0 z-[1] h-[300px] w-[320px] max-[1280px]:hidden" viewBox="0 0 320 300" fill="none" aria-hidden>
            <path d="M-20 250 A 280 280 0 0 1 300 -20" stroke="rgba(255,255,255,0.45)" strokeWidth="1" />
            <path d="M-20 205 A 235 235 0 0 1 255 -20" stroke="rgba(255,255,255,0.28)" strokeWidth="1" />
            <circle cx="150" cy="86" r="6" fill="#fff" />
            <circle cx="120" cy="126" r="3.5" fill="#fff" />
          </svg>
          {/* decorative arcs (bottom-right) */}
          <svg className="pointer-events-none absolute bottom-0 right-0 z-[1] h-[220px] w-[260px] max-[1280px]:hidden" viewBox="0 0 260 220" fill="none" aria-hidden>
            <path d="M260 -10 A 250 250 0 0 1 10 230" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
            <path d="M260 55 A 195 195 0 0 1 70 235" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
          </svg>
          {/* large blue dot, partly overlapping the section */}
          <span className="absolute -bottom-6 right-9 z-[6] h-[52px] w-[52px] rounded-full bg-[#209bd8] max-[1280px]:-bottom-[22px] max-[1280px]:right-6" aria-hidden />

          {/* left text — centered in the available left space (sits toward the middle,
              filling the gap) on desktop; full-width left-aligned on mobile. */}
          <div className="bts-text relative z-[4] flex flex-1 justify-center max-[1280px]:block max-[1280px]:flex-none">
            <div className="max-w-95 max-[1280px]:max-w-full">
          <h2 className="hero-title font-fm text-[34px] font-normal text-white leading-[1.22] tracking-[0.01em] sm:text-5xl uppercase">
                Brands that
                <br />
                <span className="italic">trust us</span>
              </h2>
              <p className="mt-3 max-w-75 text-sm font-light leading-relaxed text-white/85">
                Great things happen when the right brands meet the right people. We&apos;re a digital marketing agency that believes the perfect collaboration is waiting to happen.
              </p>
              {/* stats — count up on reveal, white on the pink section */}
              <div className="stats-row mt-8 grid max-w-md grid-cols-2 gap-x-8 gap-y-7">
                {[
                  { to: 15, suffix: 'K+', label: 'Campaigns' },
                  { to: 500, suffix: '+', label: 'Brands' },
                  { to: 300, suffix: '+', label: 'Employees strong' },
                  { to: 30, suffix: '+', label: 'Languages' },
                ].map((s) => (
                  <div key={s.label} className="flex flex-col max-[1280px]:items-center max-[1280px]:text-center">
                    <span
                      className="stat-num font-fm text-[clamp(30px,4.2vw,52px)] font-black leading-none text-white"
                      data-to={s.to}
                      data-suffix={s.suffix}
                    >
                      0{s.suffix}
                    </span>
                    <span className="mt-1.5 text-[11px] font-light uppercase tracking-[0.12em] text-white/75">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* premium bento — outer cell handles grid placement + scroll reveal;
              inner handles the GSAP hover (scale/shift). overflow-visible so the
              enlarged card is never clipped. onMouseLeave on the grid resets all. */}
          <div
            className="bts-grid grid w-240 flex-[0_0_960px] grid-cols-3 gap-4 max-[1280px]:w-full max-[1280px]:flex-none max-[680px]:grid-cols-2"
            onMouseLeave={resetCards}
          >
            {VIDEOS.map((v, i) => {
              const isFeatured = i === 0;
              // Explicit 3×3 placement so the grid fills (no lone card); resets to a
              // simple flow on mobile (full-width featured, then 2-col grid).
              const spanClass = isFeatured
                ? `${BTS_CELL[0]} max-[680px]:col-start-1 max-[680px]:row-start-auto max-[680px]:row-span-1 max-[680px]:aspect-video`
                : `aspect-video ${BTS_CELL[i]} max-[680px]:col-auto max-[680px]:row-auto`;
              const innerClass = 'bts-card-inner relative h-full w-full overflow-hidden rounded-2xl bg-black shadow-[0_10px_30px_rgba(0,0,0,0.28)] will-change-transform';

              // Shared card face — YouTube entries use a YT thumbnail (with fallback);
              // an entry with its own `poster` shows that image as-is.
              const cardFace = (
                <>
                  {failed[v.id] ? (
                    // styled fallback when the YouTube thumbnail can't load
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-linear-to-br from-[#2a1640] to-navy px-4 text-center">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-magenta">
                        <span className="ml-0.75 border-y-[7px] border-l-11 border-y-transparent border-l-white" />
                      </span>
                      <span className="font-fd text-sm font-bold leading-tight text-white">{v.title}</span>
                    </div>
                  ) : (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={v.poster ?? ytThumb(v.id)}
                        onError={v.poster ? undefined : onThumbError(v.id)}
                        onLoad={v.poster ? undefined : onThumbLoad(v.id)}
                        alt={v.title}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-600 ease-out group-hover:scale-110"
                      />
                      <span className="absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-transparent opacity-0 transition-opacity duration-400 ease-out group-hover:opacity-100" />
                    </>
                  )}
                  {/* play button — larger for featured card */}
                  <span className={`pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 ring-1 ring-white/60 backdrop-blur-sm transition group-hover:bg-magenta group-hover:ring-magenta ${isFeatured ? 'h-16 w-16' : 'h-12 w-12'}`}>
                    <span className={`ml-0.75 border-y-transparent border-l-white ${isFeatured ? 'border-y-[9px] border-l-14' : 'border-y-[7px] border-l-11'}`} />
                  </span>
                  {/* title on hover */}
                  <span className={`pointer-events-none absolute inset-x-0 bottom-0 z-2 flex translate-y-2.5 flex-col gap-px text-left opacity-0 transition-[opacity,transform] duration-400 ease-out group-hover:translate-y-0 group-hover:opacity-100 ${isFeatured ? 'px-5 py-4' : 'px-3.5 py-3'}`}>
                    <span className={`font-fm uppercase tracking-[0.14em] text-white/75 ${isFeatured ? 'text-[10px]' : 'text-[8px]'}`}>{v.client}</span>
                    <span className={`font-fd font-bold leading-[1.15] text-white ${isFeatured ? 'text-[18px]' : 'text-[13px]'}`}>{v.title}</span>
                  </span>
                </>
              );
              const faceClass = `group block cursor-pointer ${innerClass}`;
              const isInternal = v.href?.startsWith('/');

              return (
                <div key={v.id} className={`bts-card relative ${spanClass}`}>
                  {isInternal ? (
                    // internal route → its own case study (client-side nav, same tab)
                    <Link
                      href={v.href!}
                      onMouseEnter={focusCard}
                      aria-label={`View the ${v.client} case study`}
                      className={faceClass}
                    >
                      {cardFace}
                    </Link>
                  ) : (
                    // external link → hosted video (v.href) or YouTube (from id); new tab
                    <a
                      href={v.href ?? `https://www.youtube.com/watch?v=${v.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={focusCard}
                      aria-label={v.href ? `Play ${v.title}` : `Watch ${v.title} on YouTube`}
                      className={faceClass}
                    >
                      {cardFace}
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── OUR SERVICES (display only — no links) ─────────── */}
      <section className="bg-white px-6 py-20 sm:px-10 sm:py-24 lg:px-14" aria-label="Our Services">
        <div className="mx-auto max-w-[1300px]">
          <div className="reveal mb-14 text-center sm:mb-16">
            <div className="mb-3 font-fm text-[11px] font-semibold uppercase tracking-[0.24em] text-magenta">Our Services</div>
            <h2 className="font-fm text-[clamp(28px,4.4vw,46px)] font-bold leading-[1.12] tracking-[-0.01em] text-ink uppercase">
              Conceptualising <span className="text-magenta">|</span> Produce <span className="text-magenta">|</span> Perform
            </h2>
            <p className="mx-auto mt-4 max-w-[720px] text-sm font-light leading-[1.8] text-muted sm:text-[15px]">
              We focus on reaching your last-mile customer with the right treatment. Content is crafted
              to maximize ROAS, ensuring it connects with the right audience and delivers your message
              where it matters most.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'Social Media Marketing', desc: "We turn scrolls into stops. From moment marketing to platform-native storytelling, we create thumb-stopping content that builds engagement and drives conversations. Our social media strategies blend trends, reels, carousels, and analytics to keep your brand top of mind—and always in feed.",
                icon: (<><rect x="6" y="2.5" width="12" height="19" rx="2.5" /><path d="M10 5h4" /><circle cx="12" cy="12.5" r="3.2" /><path d="M11.3 11.3l2.2 1.2-2.2 1.2z" fill="currentColor" stroke="none" /></>) },
              { title: 'Performance Media Marketing', desc: "Performance is in our DNA. With funnel-based targeting, real-time optimization, and ROAS-focused campaigns, we deliver digital media strategies that convert. Whether it's Google, Meta, or Programmatic—our media plans reduce spend leakage and increase results.",
                icon: (<><path d="M3 3v18h18" /><path d="M7 14l3.5-4.5 3 2L20 6" /><path d="M16 6h4v4" /></>) },
              { title: 'Content Production (TVC & DVC)', desc: "From storyboard to screen, we produce high-impact content that connects. Be it big-screen TVCs or mobile-first DVCs, our in-house team crafts cinematic, branded content designed for attention and built for scale—across YouTube, OTT, and social platforms.",
                icon: (<><rect x="2.5" y="7" width="13" height="10" rx="2" /><path d="M15.5 10.5l5-2.5v8l-5-2.5z" /></>) },
              { title: 'Influencer & Meme Marketing', desc: "We help brands go viral (for the right reasons). From micro-influencers to celebrity creators, we build influencer collaborations and meme-led campaigns that bring in reach, relevance, and results. Think collabs, reels, reaction trends—done right.",
                icon: (<><circle cx="10" cy="8" r="3.4" /><path d="M4 20a6 6 0 0112 0" /><path d="M18.5 3.5l.8 1.9 2 .2-1.5 1.4.5 2-1.8-1.1-1.8 1.1.5-2-1.5-1.4 2-.2z" /></>) },
              { title: 'Search Engine Optimisation', desc: "We make your brand discoverable, naturally. With keyword-rich content, on-page and off-page SEO, and deep tech audits, we boost rankings and drive high-intent traffic. More clicks, better visibility, zero fluff.",
                icon: (<><circle cx="10.5" cy="10.5" r="6.5" /><path d="M4 10.5h13M10.5 4c-2.6 3-2.6 10 0 13M10.5 4c2.6 3 2.6 10 0 13" /><path d="M15.5 15.5L21 21" /></>) },
              { title: 'Digital Transformation Services', desc: "We build digital-first brands. From identity design to Shopify builds, we enable D2C brands to go live, scale fast, and sell smarter. Whether it's marketplace listings, UI/UX, or quick commerce setup—we help brands go from idea to impact, digitally.",
                icon: (<><rect x="2.5" y="4" width="19" height="12.5" rx="1.5" /><path d="M2.5 20h19" /><path d="M9 8.5l-2 2 2 2M13 8.5l2 2-2 2" /></>) },
            ].map((s) => (
              <div key={s.title} className="reveal flex gap-5">
                <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-magenta">
                  {s.icon}
                </svg>
                <div className="border-l border-black/10 pl-5">
                  <h3 className="font-fm mb-2 text-[18px] font-bold leading-tight text-ink uppercase italic">{s.title}</h3>
                  <p className="text-justify text-[13px] font-light leading-[1.7] text-navy/75">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

       {/* minHeight = the Mario timeline's smallest real height (mobile WORLD_H) so the
           wrapper collapses to the content on every breakpoint — no dead space below it —
           while still reserving space to limit layout shift before it lazy-mounts. */}
       <LazyMount rootMargin="500px" minHeight={580}>
        <MarioTimeline />
      </LazyMount>

      {/* ── SPORTS WORK — posts + reels from /public/sports (masonry; videos play on hover) ── */}
      <section className="bg-white px-6 py-16 sm:px-10 sm:py-24 lg:px-14" aria-label="Sports work">
        <div className="mx-auto max-w-[1300px]">
          <div className="reveal mb-10 text-center sm:mb-14">
            <span className="mb-5 inline-block rounded-full bg-magenta px-4 py-1.5 font-fm text-[11px] font-bold uppercase tracking-[0.18em] text-white">TSBI sports</span>
            <h2 className="font-fm text-[clamp(30px,5vw,58px)] font-bold leading-[1.08] tracking-[-0.01em] text-ink uppercase">
              Where Brands Meet <span className="italic text-magenta">the Game</span>
            </h2>
            <p className="mx-auto mt-4 max-w-[520px] text-sm font-light leading-[1.8] text-muted sm:text-base">
              From matchday hype to always-on fan engagement — content and campaigns built for
              India&apos;s biggest teams, leagues and sporting moments.
            </p>
          </div>

          <div className="columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-4">
            {[
              // Files sourced from /public/sports (all present items). Images compressed with
              // sharp (≤1200px, q72); videos re-encoded to 720p H.264 (muted). Interleaved for the masonry.
              { type: 'image', src: '/sports/614584591_1348221954011940_6027328606420306636_n.jpg' },
              { type: 'video', src: '/sports/SaveInta.com_AQMrc9YHuB_l4_zZQyKoXM7SaOJhHeLOzLi-VVq2gvqCXle8yAts11z8r6y90d1CTJjwPxR9Rcflau20987IXLCMfIVZXWtJFFHn_Gs.mp4' },
                { type: 'video', src: '/sports/SaveInta.com_AQNZw53QTW9_M1zR_EwzNoTKu86y3SLFGf-VLys5ApXwxslD6haxY4WTkiFoAPq0t48crg9t1s7vwavOAvDJwt9arg5dBajGf1SXFZw.mp4' },
              { type: 'image', src: '/sports/ffass.jpeg' },
              //  { type: 'video', src: '/sports/SaveInta.com_AQPU9o5LS1j1m7e76sBbLkGDB4naT1zXJdA0aF8Hv5zBTUBakcLxHW4r6O-8UfB023ylnCI-68rqy64rYaOKkT6pCNgPACniLGYcjeA.mp4' },
          
              { type: 'image', src: '/sports/SaveInta.com_519265654_18376525570126115_5241556755529506506_n.jpg' },
                { type: 'image', src: '/sports/End%20of%20season%20sale%207.jpg.jpeg' },
              // { type: 'image', src: '/sports/SaveInta.com_548320255_17877968577403289_8131991900820163843_n.jpg' },
              { type: 'video', src: '/sports/IMG_6422.MP4' },
              { type: 'image', src: '/sports/SaveInta.com_571892496_18392441026126115_4264773148219399283_n.jpg' },
              // { type: 'image', src: '/sports/SaveInta.com_613589273_18401810815126115_6536866526273168917_n.jpg' },
            ].map((m) => (
              <div key={m.src} className="reveal group mb-3 break-inside-avoid overflow-hidden rounded-xl sm:mb-4">
                {m.type === 'video' ? (
                  <div className="relative">
                    <video
                      src={`${m.src}#t=0.1`}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      onMouseEnter={(e) => { void e.currentTarget.play().catch(() => {}); }}
                      onMouseLeave={(e) => { e.currentTarget.pause(); }}
                      className="block w-full transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="pointer-events-none absolute bottom-3 left-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-0">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                    </span>
                  </div>
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={m.src} alt="TSBI sports work" loading="lazy" className="block w-full transition-transform duration-500 group-hover:scale-105" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TSBI ARABIA — MENA studio work showcase ───────── */}
      <ArebiaSection />

      {/* ── CASE STUDY — CONNECT ─────────────────────────── */}
      {/* <CaseStudyCarousel /> */}


      {/* ── MOVIE CONNECT ────────────────────────────────── */}
      <section className="movie-connect-section" aria-label="Connect — featured productions ">
        <span className="movie-connect-dot" aria-hidden />
        <div className="connect-text-block">
          <span className="connect-kicker uppercase">TSBI Studios</span>
          <h2 className="connect-title ">Stories crafted for screens, shares and second looks.</h2>
          <p className="connect-sub">Lights, lenses, locations and everything in between to bring stories to life frame by frame, shot by shot.</p>
          <Link href="/services/content-production" className="btn-border connect-cta">
            Watch Our Work <span className="arr">→</span>
          </Link>
        </div>
        <div className="mc-overflow" style={{ marginTop: 'clamp(28px,3.5vw,48px)' }}>
          <div className="mc-strip" aria-hidden />
          <div className="mc-track">
            {[...CONNECT_POSTERS, ...CONNECT_POSTERS].map((p, i) => (
              <div key={i} className="poster-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.img} alt={p.label} className="poster-image" loading="lazy" draggable={false} />
                <div className="poster-shade" aria-hidden />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIGITAL TRANSFORMATION (tech) — data mirrored from the service page ── */}
      <section
        className="relative overflow-hidden px-6 py-20 text-white sm:px-10 sm:py-28 lg:px-14"
        style={{ background: 'radial-gradient(circle at 85% 12%, rgba(224,25,125,.20), transparent 46%), radial-gradient(circle at 10% 92%, rgba(26,106,255,.16), transparent 46%), #0a0e1a' }}
        aria-label="Digital Transformation"
      >
        <div className="mx-auto max-w-[1680px]">
          <div className="reveal mb-12 text-center sm:mb-16">
            <span className="mb-5 inline-block rounded-full bg-magenta px-4 py-1.5 font-fm text-[11px] font-bold uppercase tracking-[0.18em] text-white">Digital Transformation</span>
            <h2 className="font-fm text-[clamp(30px,5vw,58px)] font-bold leading-[1.08] tracking-[-0.01em] uppercase text-white">
              We&apos;re not another agency.<br />We&apos;re <span className="text-magenta italic">problem solvers.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-[560px] text-sm font-light leading-[1.8] text-white/60 sm:text-base">
              Websites, apps, campaign tech, commerce and platforms — engineered to solve real
              business problems and built to scale.
            </p>
          </div>

          {/* what we build — 4 categories */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { tint: '#b96cff', title: 'Brand Websites', desc: 'Modern, high-performance websites that strengthen brand presence.' },
              { tint: '#e0197d', title: 'Campaign Tech', desc: 'Interactive campaigns & microsites that engage and convert audiences.' },
              { tint: '#4d8bff', title: 'Business Platforms', desc: 'Custom platforms & portals that streamline operations and boost efficiency.' },
              { tint: '#22c55e', title: 'Commerce & Growth', desc: 'Ecommerce & digital products designed to acquire, engage and scale revenue.' },
            ].map((b) => (
              <div key={b.title} className="reveal rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-200 hover:border-white/25">
                <span className="mb-4 block h-2.5 w-2.5 rounded-full" style={{ background: b.tint }} />
                <div className="font-fm mb-2 text-[19px] font-bold text-white uppercase">{b.title}</div>
                <p className="text-[13px] font-light leading-[1.65] text-white/55">{b.desc}</p>
              </div>
            ))}
          </div>

          {/* tech-work showcase moved below into two designs: TechWorkCarousel + TechWorkTube */}

          <div className="reveal mt-12 text-center">
            <Link href="/services/digital-transformation" className="btn-border" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.4)' }}>
              Explore Digital Transformation <span className="arr">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── DT WORK · scroll-driven 3D image tube (lazy: three.js loads on approach) ── */}
      <LazyMount rootMargin="600px" minHeight="220vh">
        <TechWorkTube />
      </LazyMount>

      {/* ── BIG IMPACT CTA ───────────────────────────────── */}
      {/* <section className="bic-root" aria-label="Get in touch">
        <div className="bic-doodles" aria-hidden>
          {DOODLES.map((d, i) => (
            <svg
              key={i}
              className="bic-doodle"
              style={{ top: d.top, left: d.left }}
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {d.node}
            </svg>
          ))}
        </div>

        <div className="bic-center">
          <svg className="bic-orbit" viewBox="0 0 640 420" fill="none" aria-hidden preserveAspectRatio="xMidYMid meet">
         
            <g className="bic-ring-1">
              <ellipse cx="320" cy="210" rx="300" ry="190" stroke="var(--magenta)" strokeOpacity="0.6" strokeWidth="1.5" />
              <circle cx="612" cy="250" r="9" fill="var(--magenta)" />
              <circle cx="330" cy="402" r="6" fill="var(--magenta)" />
            </g>
          
            <g className="bic-ring-2">
              <ellipse cx="320" cy="210" rx="288" ry="178" stroke="var(--electric)" strokeOpacity="0.5" strokeWidth="1.5" />
              <circle cx="34" cy="232" r="7" fill="var(--electric)" />
            </g>
          </svg>

          <div className="bic-content">
            <h2 className="bic-h2">
              Ready to Turn Your
              <br />
              Small Idea Into a
              <br />
              <span className="accent">Big Impact?</span>
            </h2>
            <Link href="/contact" className="btn-border bic-cta">
              Let&apos;s Talk <span className="arr">→</span>
            </Link>
          </div>
        </div>
      </section> */}

      {/* Our Services section moved above — now sits before the Sports section. */}

      {/* Preloader disabled for now — the intro-done signal is fired on mount
          (see the effect above) so entrance animations still run without it. */}
      {/* <Preloader /> */}

      {/* GSAP animation orchestrator + custom cursor elements */}
      <HeroAnimation />
    </>
  );
}