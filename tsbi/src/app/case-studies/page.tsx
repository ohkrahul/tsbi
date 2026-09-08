import CaseStudiesGallery from '@/components/case-studies/CaseStudiesGallery';
import { getCaseStudiesGallery } from '@/lib/cms';
import { caseStudies } from '@/lib/caseStudies';
import { CLIENT_ROSTER, clientSlug } from '@/lib/clients';

export default async function CaseStudiesPage({
  searchParams,
}: {
  searchParams: Promise<{ client?: string | string[] }>;
}) {
  const cms = await getCaseStudiesGallery();
  const studies = cms.length ? cms : caseStudies; // CMS first, hardcoded fallback

  // `?client=` arrives from a client logo that has more than one case study.
  const asked = await searchParams;
  const wanted = Array.isArray(asked.client) ? asked.client[0] : asked.client;
  const client = wanted ? CLIENT_ROSTER.find((c) => clientSlug(c.name) === wanted) : undefined;

  return <CaseStudiesGallery studies={studies} client={client?.name} />;
}
