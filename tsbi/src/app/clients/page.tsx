import ClientsPageClient from './ClientsPageClient';
import { getCaseStudiesGallery, getClientBrands, mediaUrl } from '@/lib/cms';
import { caseStudies } from '@/lib/caseStudies';
import { CLIENT_ROSTER, clientSlug, studiesForClient } from '@/lib/clients';

export default async function ClientsPage() {
  const [cmsBrands, cmsStudies] = await Promise.all([getClientBrands(), getCaseStudiesGallery()]);
  const studies = cmsStudies.length ? cmsStudies : caseStudies; // CMS first, bundled fallback

  // Always show the full curated roster (every logo in CLIENT_ROSTER), then fold in
  // any extra CMS-managed brands by name — so a partial CMS response can never hide the
  // logos listed in code.
  const seen = new Set(CLIENT_ROSTER.map((c) => c.name.toLowerCase()));
  const extraFromCms = cmsBrands
    .map((b) => ({
      name: b.name,
      type: b.type,
      accent: b.accent,
      isEntertainment: b.isEntertainment,
      logo: b.image ? mediaUrl(b.image) : undefined,
    }))
    .filter((b) => !seen.has(b.name.toLowerCase()));

  // Resolve each client's case studies here, once, rather than shipping all 40
  // studies to the browser for the cards to match against.
  const clients = [...CLIENT_ROSTER, ...extraFromCms].map((c) => ({
    ...c,
    slug: clientSlug(c.name),
    work: studiesForClient(c.name, studies).map((s) => ({ slug: s.slug, title: s.title })),
  }));

  return <ClientsPageClient clients={clients} />;
}
