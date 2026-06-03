import CareersPageClient from './CareersPageClient';
import { getJobListings } from '@/lib/strapi';

const FALLBACK_JOBS = [
  {
    role: 'Account Executive', department: 'Client Servicing', location: 'Full-time · Mumbai', experience: '1–2 years',
    skills: ['Client communication', 'Project coordination', 'Brief writing', 'Presentation skills', 'MS Office / Google Suite'],
    responsibilities: ['Be the primary point of contact for assigned client accounts', 'Write and manage client briefs, timelines and status reports', 'Coordinate across creative, media and production teams', 'Attend and document client meetings and presentations', 'Monitor campaign delivery and flag risks proactively'],
  },
  {
    role: 'Copy Lead', department: 'Creative', location: 'Full-time · Mumbai', experience: '4–6 years',
    skills: ['Conceptual copywriting', 'Campaign ideation', 'Script writing', 'Social copy', 'Brand voice development'],
    responsibilities: ['Lead copy development for campaigns, films and social content', 'Collaborate with Art Directors to create cohesive creative concepts', 'Maintain and evolve brand voice guidelines for multiple clients', 'Present creative work to clients with confidence', 'Mentor junior copywriters and provide constructive feedback'],
  },
  {
    role: 'Group Account Head', department: 'Client Servicing', location: 'Full-time · Mumbai', experience: '8–10 years',
    skills: ['Account leadership', 'P&L management', 'Pitch strategy', 'Team management', 'Senior stakeholder management'],
    responsibilities: ['Lead and grow a portfolio of key client accounts', 'Drive revenue targets and manage account P&L', 'Build and mentor a high-performing servicing team', 'Own strategic direction for all assigned accounts', 'Lead new business pitches and capabilities presentations'],
  },
  {
    role: 'Graphic Designer', department: 'Creative', location: 'Full-time · Mumbai', experience: '2–4 years',
    skills: ['Adobe Creative Suite', 'Motion graphics', 'Social design', 'Brand identity', 'Typography'],
    responsibilities: ['Design static and animated assets for social, digital and print', 'Create brand identity systems and visual guidelines', 'Collaborate with copywriters and content creators', 'Ensure design consistency across all brand touchpoints', 'Adapt global assets to meet local market requirements'],
  },
  {
    role: 'Media Planner & Buyer', department: 'Media & Performance', location: 'Full-time · Mumbai', experience: '3–5 years',
    skills: ['Media planning', 'Programmatic buying', 'Google Ads', 'Meta Ads', 'Analytics & reporting'],
    responsibilities: ['Develop integrated media plans aligned to campaign objectives', 'Execute and manage paid campaigns across digital channels', 'Monitor campaign pacing and optimise in real time', 'Build detailed reporting dashboards and present insights to clients', 'Stay current on emerging media channels and ad tech trends'],
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
        skills: j.skills ?? [],
        responsibilities: j.responsibilities ?? [],
      }))
    : FALLBACK_JOBS;

  return <CareersPageClient jobs={jobs} />;
}
