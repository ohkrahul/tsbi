import type { CollectionConfig } from 'payload'

/** Careers — job listings (mirrors JobListing in strapi.ts). */
export const Careers: CollectionConfig = {
  slug: 'careers',
  labels: { singular: 'Job Listing', plural: 'Careers' },
  admin: { useAsTitle: 'role', defaultColumns: ['role', 'department', 'location', 'order'] },
  access: { read: () => true },
  defaultSort: 'order',
  fields: [
    { name: 'role', type: 'text', required: true },
    { name: 'department', type: 'text' },
    { name: 'location', type: 'text' },
    { name: 'experience', type: 'text' },
    { name: 'order', type: 'number', defaultValue: 100 },
    { name: 'skills', type: 'text', hasMany: true },
    { name: 'responsibilities', type: 'text', hasMany: true },
  ],
}
