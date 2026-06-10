import Preloader from '@/components/Preloader';
import HeroBannerSlider from '@/components/about/HeroBannerSlider';
import OrbitSection from '@/components/home/OrbitSection';
import ProdStrip from '@/components/home/ProdStrip';
import CapSection from '@/components/home/CapSection';
import ContentProductionSection from '@/components/home/ContentProductionSection';
import StoriesSection from '@/components/home/StoriesSection';
import GalaxySection from '@/components/home/GalaxySection';
import ServicesPreview from '@/components/home/ServicesPreview';
import ClientsSection from '@/components/home/ClientsSection';
import FooterCTA from '@/components/home/FooterCTA';
import { getClientBrands, mediaUrl } from '@/lib/strapi';

const stripItems = [
  { label: 'Culture', img: '/about%20us/WhatsApp%20Image%202026-06-04%20at%206.19.02%20PM.jpeg', overlay: 'rgba(26,34,64,.38)' },
  { label: 'Production', img: '/about%20us/WhatsApp%20Image%202026-06-04%20at%206.19.02%20PM%20%281%29.jpeg', overlay: 'rgba(32,10,40,.38)' },
  { label: 'People', img: '/about%20us/WhatsApp%20Image%202026-06-04%20at%206.19.02%20PM%20%282%29.jpeg', overlay: 'rgba(20,16,60,.38)' },
  { label: 'Strategy', img: '/about%20us/WhatsApp%20Image%202026-06-04%20at%206.19.02%20PM%20%283%29.jpeg', overlay: 'rgba(5,21,16,.38)' },
  { label: 'Studio', img: '/about%20us/WhatsApp%20Image%202026-06-04%20at%206.19.02%20PM%20%284%29.jpeg', overlay: 'rgba(10,26,48,.38)' },
];

export default async function HomePage() {
  const cmsBrands = await getClientBrands(true);

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

  return (
    <>
      <Preloader />
      <HeroBannerSlider />

      <div className="ab-strip">
        {stripItems.map((s) => (
          <div key={s.label} className="ab-strip-item">
            <div
              className="ab-strip-bg"
              style={{
                backgroundImage: `url(${s.img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div style={{ position: 'absolute', inset: 0, background: s.overlay }} />
            <div className="ab-strip-label">{s.label}</div>
          </div>
        ))}
      </div>

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
