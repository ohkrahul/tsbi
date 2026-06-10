import ClientsPageClient from './ClientsPageClient';
import { getClientBrands } from '@/lib/strapi';

const FALLBACK_CLIENTS = [
  // ─────────── Entertainment & Media ──────────────────────────────────
  { name: 'Dharma Productions',   type: 'Film · Entertainment',    accent: '#e0197d', isEntertainment: true,  logo: '/entertainment/dharma%20production.png',               slug: 'dharma-production'   },
  { name: 'Devgn Films',          type: 'Film · Entertainment',    accent: '#c42b6e', isEntertainment: true,  logo: '/entertainment/devgan.png',                            slug: 'son-of-sardaar-2'    },
  { name: 'Disney India',         type: 'Entertainment',           accent: '#0051a5', isEntertainment: true,  logo: '/entertainment/disney%20india.png',                    slug: 'disney-india'        },
  { name: 'Warner Bros',          type: 'Film · Studio',           accent: '#1a3070', isEntertainment: true,  logo: '/entertainment/warner%20bros.png'                     },
  { name: 'Warner Music India',   type: 'Music Label',             accent: '#f05100', isEntertainment: true,  logo: '/entertainment/warner%20msuic.png'                    },
  { name: 'North Records',        type: 'Music Label',             accent: '#c42b6e', isEntertainment: true,  logo: '/entertainment/north%20recorods.webp'                 },
  { name: 'Star Studios',         type: 'Film · Studio',           accent: '#f05100', isEntertainment: true,  logo: '/entertainment/Star_Studios_Logo.jpg'                 },
  { name: 'ZEE TV',               type: 'Media · Broadcasting',    accent: '#1a6aff', isEntertainment: true,  logo: '/entertainment/zee%20tv.png'                          },
  { name: 'Z5',                   type: 'OTT · Streaming',         accent: '#1a6aff', isEntertainment: true,  logo: '/entertainment/z5.png'                                },
  { name: 'Z5 Marathi',           type: 'Regional OTT',            accent: '#1a6aff', isEntertainment: true,  logo: '/entertainment/marathi%20z5.jpg'                      },
  { name: 'Colors TV',            type: 'Media · Broadcasting',    accent: '#e0197d', isEntertainment: true,  logo: '/entertainment/colors.webp'                           },
  { name: 'Big Magic',            type: 'Media · Broadcasting',    accent: '#f07a1a', isEntertainment: true,  logo: '/entertainment/big%20magic.png'                       },
  { name: '&TV',                  type: 'Media · Broadcasting',    accent: '#1a3070', isEntertainment: true,  logo: '/entertainment/%26tv.webp'                            },
  { name: 'JioHotstar',           type: 'OTT · Streaming',         accent: '#0051a5', isEntertainment: true,  logo: '/entertainment/jiohotstart.png'                       },
  { name: 'Sony LIV',             type: 'OTT · Streaming',         accent: '#1a6aff', isEntertainment: true,  logo: '/entertainment/sony%20liv.png'                        },
  { name: 'Star Utsav',           type: 'Media · Broadcasting',    accent: '#f05100', isEntertainment: true,  logo: '/entertainment/star%20utsav.jpg'                      },
  { name: 'National Geographic',  type: 'Media · Documentary',     accent: '#f0c000', isEntertainment: true,  logo: '/entertainment/national%20geographic.png'             },
  { name: 'Filmfare',             type: 'Media · Awards',          accent: '#c89b3c', isEntertainment: true,  logo: '/entertainment/filmfare.webp'                         },
  { name: 'Cineplex',             type: 'Film · Exhibition',        accent: '#e0197d', isEntertainment: true,  logo: '/entertainment/cineplex.png'                          },
  { name: 'Bigg Boss',            type: 'Reality TV',              accent: '#c42b6e', isEntertainment: true,  logo: '/entertainment/big%20boss.jpg'                        },
  { name: 'Shark Tank India',     type: 'Reality TV',              accent: '#1a3070', isEntertainment: true,  logo: '/entertainment/shark%20tank.png'                      },
  { name: 'Dhaan Dhoom',          type: 'Entertainment',           accent: '#f07a1a', isEntertainment: true,  logo: '/entertainment/dhaan%20dhoom.png'                     },
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
  { name: 'ICICI Direct',         type: 'Finance · BFSI',          accent: '#ff6b00', isEntertainment: false, logo: '/non-entertainment/icici%20diect.jpg'                 },
  { name: 'HSBC',                 type: 'Banking',                  accent: '#db0011', isEntertainment: false, logo: '/non-entertainment/hsbc.png'                          },
  { name: 'IDFC First Bank',      type: 'Banking · Finance',        accent: '#e0197d', isEntertainment: false, logo: '/non-entertainment/Logo_of_IDFC_First_Bank.svg.png'   },
  { name: 'SBI General',          type: 'Insurance',                accent: '#003087', isEntertainment: false, logo: '/non-entertainment/sbi%20general.png'                 },
  { name: 'PolicyBazaar',         type: 'Insurance · Fintech',      accent: '#f07a1a', isEntertainment: false, logo: '/non-entertainment/policy%20bazaar.png'               },
  { name: 'ZebPay',               type: 'Crypto · Fintech',         accent: '#1a6aff', isEntertainment: false, logo: '/non-entertainment/ZebPay_Logo-s1280.png'             },
  { name: 'Mahindra Finance',     type: 'Finance · NBFC',           accent: '#e0197d', isEntertainment: false, logo: '/non-entertainment/mahidra%20finance.png'             },
  { name: 'Mahindra Manulife',    type: 'Mutual Funds',             accent: '#e0197d', isEntertainment: false, logo: '/non-entertainment/mahindra%20manulife.png'           },
  // Real Estate
  { name: 'Lodha',                type: 'Real Estate',              accent: '#c89b3c', isEntertainment: false, logo: '/non-entertainment/lodha.png'                         },
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
  { name: 'Pret A Manger',        type: 'Food & Beverage',          accent: '#8B1A1A', isEntertainment: false, logo: '/non-entertainment/pret.png'                          },
  { name: 'KidZania',             type: 'Family Entertainment',     accent: '#f0c000', isEntertainment: false, logo: '/non-entertainment/kidsznia.png'                      },
  { name: 'TBZ',                  type: 'Jewellery · Luxury',       accent: '#c89b3c', isEntertainment: false, logo: '/non-entertainment/Tbz_logo.jpg'                      },
  // Logistics & B2B
  { name: 'DHL',                  type: 'Logistics',                accent: '#ffcc00', isEntertainment: false, logo: '/non-entertainment/dhl.png',                            slug: 'mumbai-indians'      },
  { name: 'Great White',          type: 'Electricals',              accent: '#1a3070', isEntertainment: false, logo: '/non-entertainment/GreatWhite-logo-696x364.png'        },
  { name: 'AGL',                  type: 'Industry',                 accent: '#003087', isEntertainment: false, logo: '/non-entertainment/agl.png'                           },
  { name: 'INTOIT',               type: 'Technology',               accent: '#1a6aff', isEntertainment: false, logo: '/non-entertainment/final_logo_INTOIT-02_89b8d92c-0882-4d89-8215-fc7bbe82fb29.webp' },
  { name: 'Quick',                type: 'Services',                 accent: '#f07a1a', isEntertainment: false, logo: '/non-entertainment/quick.png'                         },
  { name: 'Play n Learn',         type: 'Education · EdTech',       accent: '#1a9080', isEntertainment: false, logo: '/non-entertainment/1738318092_Play%20n%20Learn.png'   },
];

export default async function ClientsPage() {
  const cmsBrands = await getClientBrands();

  const clients = cmsBrands.length
    ? cmsBrands.map((b) => ({
        name: b.name,
        type: b.type,
        accent: b.accent,
        isEntertainment: b.isEntertainment,
        logo: b.image ?? undefined,
        slug: (b as { slug?: string }).slug ?? undefined,
      }))
    : FALLBACK_CLIENTS;

  return <ClientsPageClient clients={clients} />;
}
