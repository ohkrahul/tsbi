import JournalPageClient from './JournalPageClient';
import { getJournalArticles } from '@/lib/strapi';

const FALLBACK_ARTICLES = [
  { category: 'Thought Leadership', title: "Why Influencer Marketing Is Entering Its Most Mature Phase Yet", excerpt: "The creator economy is consolidating — and brands that understand talent partnerships at a strategic level will win.", date: 'May 2025', readTime: '6 min', gradient: 'linear-gradient(135deg,#1a0a30,#100520)' },
  { category: 'Behind the Idea', title: "How We Made Tiger's Refresh Your Vibes Campaign in 6 Weeks", excerpt: "A timeline breakdown of how a single insight turned into one of the most-shared campaigns of 2024.", date: 'April 2025', readTime: '8 min', gradient: 'linear-gradient(135deg,#301500,#200d00)' },
  { category: 'Trends', title: 'The Rise of Short-Form Cinema: Why Reels Are the New TVC', excerpt: "Sub-60-second storytelling has moved from novelty to necessity — here's how to make it count.", date: 'March 2025', readTime: '5 min', gradient: 'linear-gradient(135deg,#0a1a30,#060d1e)' },
  { category: 'Insights', title: 'Measuring What Matters: Brand Lift vs. Vanity Metrics', excerpt: "Reach and impressions tell you who saw it. Here's how we measure whether they cared.", date: 'Feb 2025', readTime: '7 min', gradient: 'linear-gradient(135deg,#051510,#0a2018)' },
  { category: 'Culture', title: 'What 12 Years of Building an Independent Agency Taught Us', excerpt: "Honesty, resilience and why the best work almost always came from the smallest briefs.", date: 'Jan 2025', readTime: '10 min', gradient: 'linear-gradient(135deg,#1a2240,#0d1528)' },
  { category: 'Thought Leadership', title: 'AI in Creative: Tool, Threat or Opportunity?', excerpt: "We've been using AI in production since 2023. Here's what's changed and what hasn't.", date: 'Dec 2024', readTime: '6 min', gradient: 'linear-gradient(135deg,#200a28,#100518)' },
];

export default async function JournalPage() {
  const cmsArticles = await getJournalArticles();

  const articles = cmsArticles.length
    ? cmsArticles.map((a) => ({
        category: a.category,
        title: a.title,
        excerpt: a.excerpt,
        date: a.publishedAt
          ? new Date(a.publishedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
          : '',
        readTime: a.readTime ?? '',
        gradient: a.gradient ?? 'linear-gradient(135deg,#1a0a30,#100520)',
      }))
    : FALLBACK_ARTICLES;

  return <JournalPageClient articles={articles} />;
}
