import type { CollectionConfig } from 'payload'

/**
 * Mirrors CaseStudyGalleryItem in the frontend (tsbi/src/lib/caseStudies.ts),
 * so the case-studies list + detail pages can consume it unchanged.
 * `image` stays a URL string (YouTube thumbnails / /tech paths) to match the
 * existing consumers and the home-page fallback data.
 */
export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  labels: { singular: 'Case Study', plural: 'Case Studies' },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'clientName', 'order', 'track'] },
  access: { read: () => true },
  defaultSort: 'order',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'clientName', type: 'text', required: true },
    { name: 'category', type: 'text' },
    { name: 'tags', type: 'relationship', relationTo: 'tags', hasMany: true,
      admin: { description: 'Drives the filter dropdown on the public case-studies page.' } },
    // Values are the /services/<slug> route segments — a new option here needs a
    // matching service page, so this is a fixed list rather than a collection.
    { name: 'serviceAreas', type: 'select', hasMany: true, options: [
      { label: 'Social Media', value: 'social-media' },
      { label: 'Content Production', value: 'content-production' },
      { label: 'Influencer Management', value: 'influencer-management' },
      { label: 'Digital Transformation', value: 'digital-transformation' },
    ], admin: { description: 'Which service pages this case study is listed on.' } },
    // Not editable in the studio any more — lists are newest-first. Kept
    // because it still holds the arrangement the original import
    // established, which is what orders same-day records.
    { name: 'order', type: 'number', defaultValue: 100 },
    { name: 'track', type: 'select', options: ['film', 'tech'], defaultValue: 'film' },
    { name: 'year', type: 'number' },
    { name: 'shortDescription', type: 'textarea' },
    { name: 'concept', type: 'textarea' },
    { name: 'services', type: 'text', hasMany: true },
    { name: 'image', type: 'text', admin: { description: 'Cover image URL (YouTube thumbnail, /tech path, or a Blob URL).' } },
    { name: 'youtube', type: 'text', admin: { description: 'YouTube video ID (optional).' } },
    { name: 'videos', type: 'text', hasMany: true, admin: { description: 'Direct MP4 URLs (optional).' } },
    // theme colors
    { type: 'row', fields: [
      { name: 'colorTheme', type: 'text', admin: { width: '25%' } },
      { name: 'accent', type: 'text', admin: { width: '25%' } },
      { name: 'gradFrom', type: 'text', admin: { width: '25%' } },
      { name: 'gradTo', type: 'text', admin: { width: '25%' } },
    ] },
    // tech-track long-form fields
    { name: 'overview', type: 'textarea' },
    { name: 'challenge', type: 'textarea' },
    { name: 'idea', type: 'textarea' },
    { name: 'experienceIntro', type: 'textarea' },
    { name: 'experienceItems', type: 'text', hasMany: true },
    { name: 'whyItWorked', type: 'textarea' },
    // Service-page card overrides. The cards fall back to title/concept, so these
    // only exist for copy written specifically for a service page.
    { name: 'cardHeadline', type: 'text', admin: { description: 'Headline shown on service-page cards instead of the title.' } },
    { name: 'cardBlurb', type: 'textarea', admin: { description: 'Short blurb for service-page cards instead of the concept.' } },
    { name: 'youtubeFilms', type: 'text', hasMany: true, admin: { description: 'Every film in this campaign (YouTube IDs). Drives the "N Films" badge.' } },
    { name: 'impact', type: 'array', fields: [
      { name: 'value', type: 'text' },
      { name: 'label', type: 'text', required: true },
    ] },
  ],
}
