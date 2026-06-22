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
  { label: 'ASSI', img: '/Movie%20Posters/ASSI.jpg', overlay: 'rgba(26,34,64,.28)' },
  { label: 'Bandar', img: '/Movie%20Posters/Bandar.jpg', overlay: 'rgba(32,10,40,.28)' },
  { label: 'CMD', img: '/Movie%20Posters/CMD.jpg', overlay: 'rgba(20,16,60,.28)' },
  { label: 'Ek Din', img: '/Movie%20Posters/Ek%20Din.jpg', overlay: 'rgba(5,21,16,.28)' },
  { label: 'Happy Patel', img: '/Movie%20Posters/Happy%20Patel.jpg', overlay: 'rgba(10,26,48,.28)' },
  { label: 'MVA', img: '/Movie%20Posters/MVA.jpeg', overlay: 'rgba(26,34,64,.28)' },
  { label: 'PPAVD', img: '/Movie%20Posters/PPAVD.jpeg', overlay: 'rgba(32,10,40,.28)' },
  { label: 'SSKTK', img: '/Movie%20Posters/SSKTK.jpg', overlay: 'rgba(20,16,60,.28)' },
  { label: 'TMMTMTTM', img: '/Movie%20Posters/TMMTMTTM.jpg', overlay: 'rgba(5,21,16,.28)' },
  { label: 'TYM', img: '/Movie%20Posters/TYM.jpg', overlay: 'rgba(10,26,48,.28)' },
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
            {/* <div className="ab-strip-label">{s.label}</div> */}
          </div>
        ))}
      </div>

      <OrbitSection />
      {/* <GalaxySection /> */}
     
      {/* <CapSection /> */}
      <ClientsSection initialClients={clients} />
       <ContentProductionSection />
       <ProdStrip />

      <StoriesSection />
      {/* <ServicesPreview /> */}
      <FooterCTA />
    </>
  );
}
