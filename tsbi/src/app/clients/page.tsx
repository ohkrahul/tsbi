import ClientsPageClient from './ClientsPageClient';
import { getCaseStudiesGallery, getClientBrands, mediaUrl } from '@/lib/cms';
import { caseStudies } from '@/lib/caseStudies';
import { CLIENT_ROSTER, clientSlug, studiesForClient } from '@/lib/clients';

export default async function ClientsPage() {
  const [cmsBrands, cmsStudies] = await Promise.all([getClientBrands(), getCaseStudiesGallery()]);
  const studies = cmsStudies.length ? cmsStudies : caseStudies;

  // The CMS owns the roster (see `npm run seed:clients`); the array in
  // src/lib/clients.ts is the fallback for when it is unreachable.
  const inCode = new Map(CLIENT_ROSTER.map((c) => [c.name.toLowerCase(), c]));
  const roster = cmsBrands.length
    ? cmsBrands.map((b) => ({
        name: b.name,
        type: b.type,
        accent: b.accent || '#e0197d',
        isEntertainment: b.isEntertainment,
        // Fall back to the bundled logo if this client has no image set, so a
        // brand can never lose its logo by being edited in the CMS.
        logo: (b.image ? mediaUrl(b.image) : '') || inCode.get(b.name.toLowerCase())?.logo,
      }))
    : CLIENT_ROSTER;

  // Resolve each client's case studies here, once, rather than shipping all 40
  // studies to the browser for the cards to match against.
  const clients = roster.map((c) => ({
    ...c,
    slug: clientSlug(c.name),
    work: studiesForClient(c.name, studies).map((s) => ({ slug: s.slug, title: s.title })),
  }));

  return <ClientsPageClient clients={clients} />;
}
