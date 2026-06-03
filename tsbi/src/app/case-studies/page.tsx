import { Suspense } from 'react';
import CaseStudyWorld from '@/components/case-studies/CaseStudyWorld';

export default function CaseStudiesPage() {
  return (
    <Suspense fallback={<div style={{ height: '100vh', background: '#050910' }} />}>
      <CaseStudyWorld />
    </Suspense>
  );
}
