import CaseStudiesGallery from '@/components/case-studies/CaseStudiesGallery';
import { getCaseStudiesGallery } from '@/lib/cms';
import { caseStudies } from '@/lib/caseStudies';

export default async function CaseStudiesPage() {
  const cms = await getCaseStudiesGallery();
  const studies = cms.length ? cms : caseStudies; // CMS first, hardcoded fallback
  return <CaseStudiesGallery studies={studies} />;
}
