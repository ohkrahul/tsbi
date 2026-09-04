import fs from 'fs';
import path from 'path';
import MediaPageClient from '@/components/media/MediaPageClient';
import { getMediaCoverage } from '@/lib/cms';

export const metadata = { title: 'TSBI In The News — Media Coverage' };

type Article = { id: string; title: string; source: string; url: string };

export default async function MediaPage() {
  const cms = await getMediaCoverage();
  let articles: Article[];
  if (cms.length) {
    articles = cms;
  } else {
    // fallback to the bundled list until the CMS has content
    const filePath = path.join(process.cwd(), 'public/media/articles.json');
    articles = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }
  return <MediaPageClient articles={articles} />;
}
