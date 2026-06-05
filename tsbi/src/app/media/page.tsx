import fs from 'fs';
import path from 'path';
import MediaPageClient from '@/components/media/MediaPageClient';

export const metadata = { title: 'TSBI In The News — Media Coverage' };

export default function MediaPage() {
  const filePath = path.join(process.cwd(), 'public/media/articles.json');
  const articles: { id: string; title: string; source: string; url: string }[] =
    JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  return <MediaPageClient articles={articles} />;
}
