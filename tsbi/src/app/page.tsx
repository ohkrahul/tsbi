import HeroSection from '@/components/home/HeroSection';
import OrbitSection from '@/components/home/OrbitSection';
import ProdStrip from '@/components/home/ProdStrip';
import CapSection from '@/components/home/CapSection';
import ContentProductionSection from '@/components/home/ContentProductionSection';
import StoriesSection from '@/components/home/StoriesSection';
import GalaxySection from '@/components/home/GalaxySection';
import ServicesPreview from '@/components/home/ServicesPreview';
import ClientsSection from '@/components/home/ClientsSection';
import FooterCTA from '@/components/home/FooterCTA';
import { getClientBrands, getSiteSettings, mediaUrl } from '@/lib/strapi';

export default async function HomePage() {
  const [cmsBrands, settings] = await Promise.all([
    getClientBrands(true),
    getSiteSettings(),
  ]);

  const clients = cmsBrands.length
    ? cmsBrands.map((b) => ({
        name: b.name,
        type: b.type,
        caption: b.caption,
        accent: b.accent,
        image: mediaUrl(b.image),
        cells: b.cells ?? [],
      }))
    : undefined;

  const heroStats = settings?.heroStats?.length ? settings.heroStats : undefined;

  return (
    <>
      <HeroSection stats={heroStats} />
      <OrbitSection />
      {/* <GalaxySection /> */}
      <ProdStrip />
      <ContentProductionSection />
      {/* <CapSection /> */}
      <ClientsSection initialClients={clients} />
      <StoriesSection />
      {/* <ServicesPreview /> */}
      <FooterCTA />
    </>
  );
}
