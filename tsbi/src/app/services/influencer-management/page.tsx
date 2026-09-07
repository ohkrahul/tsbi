import InfluencerManagementClient from './InfluencerManagementClient';
import { getServiceCampaigns } from '@/lib/cms';

/* Server wrapper — see the sibling service pages. This page never had a work
   list, so there's no bundled fallback: the section simply doesn't render until
   a case study is ticked for this service in the studio. */
export default async function InfluencerManagementPage() {
  const campaigns = await getServiceCampaigns('influencer-management');
  return <InfluencerManagementClient campaigns={campaigns} />;
}
