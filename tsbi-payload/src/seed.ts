/**
 * Seed the CMS from the site's existing hardcoded data.
 * Idempotent — skips anything already present (matched by slug/title).
 * Run:  npm run seed        (from tsbi-payload/)
 */
import { getPayload } from 'payload'
import config from '@payload-config'
import { readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// The site's real case-study data (pure data module, safe to import here).
import { caseStudies } from '../../tsbi/src/lib/caseStudies'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80)

// ── Careers (from careers/page.tsx fallback) ──────────────────────────────────
const JOBS = [
  {
    role: 'Copy Supervisor', department: 'Creative', location: 'Full-time · Mumbai', experience: '5-6 years',
    responsibilities: [
      'Be a part of daily ideation, strategy, and campaign building for various brands across digital platforms.',
      'Be a part of the Sales/Pitch team for a new business opportunity.',
      'Led and train a team of creative writers.',
      "Supervise and check the copy quality of the Jr writer's.",
      'Write creative copies, scripts, pitch copies, and case study content as and when necessary.',
      'Support the Servicing team during client interactions and brief explanations.',
    ],
    skills: [
      'Minimum 5-6 years relevant experience.', 'Attention to detail.', 'Knowledge of Pop-culture.',
      "Learn to research and understand the target audience's interests.",
      'Excellent communication skills, both written and oral — English, Hindi, Hinglish.',
      'Strong writing, editing, and proofreading skills.',
    ],
  },
  {
    role: 'Copywriter', department: 'Creative', location: 'Full-time · Mumbai', experience: '1-2 years',
    responsibilities: [
      'Understanding all social media platforms and customizing content for each entertainment brand.',
      'Staying updated with the latest updates about relevant brands.',
      'Research about the brand and its competitors to come up with fresh new ideas.',
      'Maintain close links with other parts of the organization to ensure aligned digital and social media strategy is being delivered.',
      'Deliver real time content within relevant social spaces which dynamically engages the audience.',
      'Create content with quick turnaround time as and when required by the account — example live shows.',
    ],
    skills: [
      'Proficient in English and Hinglish. Looking for candidates with 1-2 years of prior experience.',
      'Attention to detail.', "Learn to research and understand the target audience's interests.",
      'Excellent communication skills, both written and oral.', 'Strong writing, editing, and proofreading skills.',
    ],
  },
]

// ── Journal / News (from journal/page.tsx fallback) ───────────────────────────
const JOURNAL = [
  { category: 'Thought Leadership', title: 'Why Influencer Marketing Is Entering Its Most Mature Phase Yet', excerpt: 'The creator economy is consolidating — and brands that understand talent partnerships at a strategic level will win.', date: 'May 2025', readTime: '6 min', gradient: 'linear-gradient(135deg,#1a0a30,#100520)' },
  { category: 'Behind the Idea', title: "How We Made Tiger's Refresh Your Vibes Campaign in 6 Weeks", excerpt: 'A timeline breakdown of how a single insight turned into one of the most-shared campaigns of 2024.', date: 'April 2025', readTime: '8 min', gradient: 'linear-gradient(135deg,#301500,#200d00)' },
  { category: 'Trends', title: 'The Rise of Short-Form Cinema: Why Reels Are the New TVC', excerpt: 'Sub-60-second storytelling has moved from novelty to necessity — here\'s how to make it count.', date: 'March 2025', readTime: '5 min', gradient: 'linear-gradient(135deg,#0a1a30,#060d1e)' },
  { category: 'Insights', title: 'Measuring What Matters: Brand Lift vs. Vanity Metrics', excerpt: 'Reach and impressions tell you who saw it. Here\'s how we measure whether they cared.', date: 'Feb 2025', readTime: '7 min', gradient: 'linear-gradient(135deg,#051510,#0a2018)' },
  { category: 'Culture', title: 'What 12 Years of Building an Independent Agency Taught Us', excerpt: 'Honesty, resilience and why the best work almost always came from the smallest briefs.', date: 'Jan 2025', readTime: '10 min', gradient: 'linear-gradient(135deg,#1a2240,#0d1528)' },
  { category: 'Thought Leadership', title: 'AI in Creative: Tool, Threat or Opportunity?', excerpt: 'We\'ve been using AI in production since 2023. Here\'s what\'s changed and what hasn\'t.', date: 'Dec 2024', readTime: '6 min', gradient: 'linear-gradient(135deg,#200a28,#100518)' },
]

async function upsert(payload: Awaited<ReturnType<typeof getPayload>>, collection: string, where: object, data: Record<string, unknown>) {
  const existing = await payload.find({ collection: collection as never, where: where as never, limit: 1, depth: 0 })
  if (existing.docs.length) return false
  await payload.create({ collection: collection as never, data: data as never })
  return true
}

async function run() {
  const payload = await getPayload({ config })
  let cs = 0, jb = 0, jn = 0, mc = 0

  for (const c of caseStudies) {
    const created = await upsert(payload, 'case-studies', { slug: { equals: c.slug } }, {
      title: c.title, slug: c.slug, clientName: c.clientName, category: c.category,
      order: c.order, track: c.track ?? 'film', year: c.year,
      shortDescription: c.shortDescription, concept: c.concept,
      services: c.services, image: c.image, youtube: c.youtube, videos: c.videos ?? [],
      colorTheme: c.colorTheme, accent: c.accent, gradFrom: c.gradFrom, gradTo: c.gradTo,
      overview: c.overview, challenge: c.challenge, idea: c.idea,
      experienceIntro: c.experienceIntro, experienceItems: c.experienceItems ?? [],
      whyItWorked: c.whyItWorked, impact: c.impact ?? [],
    })
    if (created) cs++
  }

  for (const j of JOBS) {
    if (await upsert(payload, 'careers', { role: { equals: j.role } }, { ...j, order: jb })) jb++
  }

  for (const a of JOURNAL) {
    const slug = slugify(a.title)
    const created = await upsert(payload, 'journal', { slug: { equals: slug } }, {
      title: a.title, slug, category: a.category, excerpt: a.excerpt,
      readTime: a.readTime, gradient: a.gradient,
      publishedAt: new Date(a.date).toISOString(),
    })
    if (created) jn++
  }

  // Media coverage from the bundled articles.json
  try {
    const raw = readFileSync(path.resolve(dirname, '../../tsbi/public/media/articles.json'), 'utf-8')
    const items = JSON.parse(raw) as { id: string; title: string; source: string; url: string }[]
    let i = 0
    for (const m of items) {
      if (await upsert(payload, 'media-coverage', { url: { equals: m.url } }, { title: m.title, source: m.source, url: m.url, order: i })) mc++
      i++
    }
  } catch (e) {
    console.warn('media-coverage skipped:', (e as Error).message)
  }

  console.log(`Seed done → case-studies:+${cs}  careers:+${jb}  journal:+${jn}  media-coverage:+${mc}`)
  process.exit(0)
}

await run().catch((e) => { console.error(e); process.exit(1) })
