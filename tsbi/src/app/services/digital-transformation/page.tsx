import DigitalTransformationClient from './DigitalTransformationClient';
import { getCaseStudiesForService, getServicePageContent } from '@/lib/cms';
import { techCaseStudies } from '@/lib/caseStudies';
import { digitalTransformationDefaults } from '@/lib/servicePageContent';

/* Server wrapper: the page body is a client component (gsap/ScrollTrigger), so
   both the case studies and the editable page copy are fetched here. CMS first,
   shipped copy as the fallback. */
export default async function DigitalTransformationPage() {
  const [cms, content] = await Promise.all([
    getCaseStudiesForService('digital-transformation'),
    getServicePageContent('service-digital-transformation', digitalTransformationDefaults),
  ]);
  return (
    <DigitalTransformationClient
      caseStudies={cms.length ? cms : techCaseStudies}
      content={content}
    />
  );
}
