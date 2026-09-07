import SocialMediaClient from './SocialMediaClient';
import { getServiceYouTubeWork } from '@/lib/cms';
import { youtubeWork } from '@/lib/serviceCampaigns';

/* Server wrapper — see the sibling service pages. CMS first, bundled fallback. */
export default async function SocialMediaPage() {
  const cms = await getServiceYouTubeWork('social-media');
  return <SocialMediaClient youtubeWork={cms.length ? cms : youtubeWork} />;
}
