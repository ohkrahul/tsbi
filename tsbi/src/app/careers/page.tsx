import CareersPageClient from './CareersPageClient';
import { getJobListings } from '@/lib/strapi';

const FALLBACK_JOBS = [
  {
    role: 'Copy Supervisor',
    department: 'Creative',
    location: 'Full-time · Mumbai',
    experience: '5-6 years',
    summary: undefined,
    responsibilities: [
      'Be a part of daily ideation, strategy, and campaign building for various brands across digital platforms.',
      'Be a part of the Sales/Pitch team for a new business opportunity.',
      'Led and train a team of creative writers.',
      'Supervise and check the copy quality of the Jr writer\'s.',
      'Write creative copies, scripts, pitch copies, and case study content as and when necessary.',
      'Support the Servicing team during client interactions and brief explanations.',
    ],
    skills: [
      'Minimum 5-6 years relevant experience.',
      'Attention to detail.',
      'Knowledge of Pop-culture.',
      'Learn to research and understand the target audience\'s interests.',
      'Excellent communication skills, both written and oral — English, Hindi, Hinglish.',
      'Strong writing, editing, and proofreading skills.',
    ],
    email: 'careers@tsbi.in',
  },
  {
    role: 'Copywriter',
    department: 'Creative',
    location: 'Full-time · Mumbai',
    experience: '1-2 years',
    summary: undefined,
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
      'Attention to detail.',
      'Learn to research and understand the target audience\'s interests.',
      'Excellent communication skills, both written and oral.',
      'Strong writing, editing, and proofreading skills.',
    ],
    email: 'careers@tsbi.in',
  },
];

export default async function CareersPage() {
  const cmsJobs = await getJobListings();

  const jobs = cmsJobs.length
    ? cmsJobs.map((j) => ({
        role: j.role,
        department: j.department,
        location: j.location,
        experience: j.experience,
        summary: undefined as string | undefined,
        skills: j.skills ?? [],
        responsibilities: j.responsibilities ?? [],
        software: undefined as string[] | undefined,
        email: 'careers@tsbi.in',
      }))
    : FALLBACK_JOBS;

  return <CareersPageClient jobs={jobs} />;
}
