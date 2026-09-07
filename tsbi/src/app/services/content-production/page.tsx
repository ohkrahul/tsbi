import ContentProductionClient from './ContentProductionClient';
import { getServiceCampaigns } from '@/lib/cms';
import { campaigns } from '@/lib/serviceCampaigns';

/* Server wrapper: the page body needs gsap, so the campaigns for this service
   are fetched here. CMS first, the bundled copy as the fallback. */
export default async function ContentProductionPage() {
  const cms = await getServiceCampaigns('content-production');
  return <ContentProductionClient campaigns={cms.length ? cms : campaigns} />;
}
