import type { CollectionConfig } from 'payload'
import { archivedField } from './archived'

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
    // Not editable in the studio any more — lists are newest-first. Kept
    // because it still holds the arrangement the original import
    // established, which is what orders same-day records.
    { name: 'order', type: 'number', defaultValue: 100 },
    { name: 'skills', type: 'text', hasMany: true },
    { name: 'responsibilities', type: 'text', hasMany: true },
    archivedField,
  ],
}
