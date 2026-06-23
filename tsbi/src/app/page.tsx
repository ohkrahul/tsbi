import HomeHero from '@/components/home/HomeHero';
import BrandLogosStrip from '@/components/home/BrandLogosStrip';
import BrandsTrustSection from '@/components/home/BrandsTrustSection';
import CaseStudyConnect from '@/components/home/CaseStudyConnect';
import ConnectWheel from '@/components/home/ConnectWheel';
import BigImpactCTA from '@/components/home/BigImpactCTA';

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <BrandLogosStrip />
      <BrandsTrustSection />
      <CaseStudyConnect />
      <ConnectWheel />
      <BigImpactCTA />
    </>
  );
}
