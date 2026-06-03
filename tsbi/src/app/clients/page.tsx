import ClientsPageClient from './ClientsPageClient';
import { getClientBrands } from '@/lib/strapi';

const FALLBACK_CLIENTS = [
  { name: "L'Oréal Paris", type: 'Beauty · FMCG', accent: '#c42b6e', isEntertainment: false },
  { name: 'OnePlus', type: 'Consumer Tech', accent: '#f05100', isEntertainment: false },
  { name: 'Chanel', type: 'Luxury Fashion', accent: '#c8a840', isEntertainment: false },
  { name: 'Glossier', type: 'Beauty · D2C', accent: '#d490a8', isEntertainment: false },
  { name: 'La Mer', type: 'Premium Beauty', accent: '#1a5060', isEntertainment: false },
  { name: 'Dior', type: 'Luxury Fashion', accent: '#8c3030', isEntertainment: false },
  { name: 'Tiger Beer', type: 'Beverage · Entertainment', accent: '#f0c000', isEntertainment: true },
  { name: 'Sidewave', type: 'Music · Events', accent: '#1a6aff', isEntertainment: true },
  { name: 'Saigon Souls', type: 'Entertainment · Film', accent: '#e0197d', isEntertainment: true },
  { name: 'GLOW', type: 'Events · Lifestyle', accent: '#ffd700', isEntertainment: true },
  { name: 'FWA', type: 'Digital · Awards', accent: '#00c9ff', isEntertainment: true },
  { name: 'Swarovski', type: 'Luxury · Lifestyle', accent: '#c0c0c0', isEntertainment: true },
];

export default async function ClientsPage() {
  const cmsBrands = await getClientBrands();

  const clients = cmsBrands.length
    ? cmsBrands.map((b) => ({
        name: b.name,
        type: b.type,
        accent: b.accent,
        isEntertainment: b.isEntertainment,
      }))
    : FALLBACK_CLIENTS;

  return <ClientsPageClient clients={clients} />;
}
