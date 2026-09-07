import DigitalTransformationClient from './DigitalTransformationClient';
import { getCaseStudiesForService } from '@/lib/cms';
import { techCaseStudies } from '@/lib/caseStudies';

/* Server wrapper: the page body is a client component (gsap/ScrollTrigger), so
   the case studies for this service are fetched here and passed down. CMS first,
   bundled tech studies as the fallback — same pattern as /case-studies. */
export default async function DigitalTransformationPage() {
  const cms = await getCaseStudiesForService('digital-transformation');
  return <DigitalTransformationClient caseStudies={cms.length ? cms : techCaseStudies} />;
}
