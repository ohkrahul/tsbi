import type { CollectionConfig } from 'payload'
import { revalidateHooks } from '../lib/revalidate'
import { archivedField } from './archived'

/** Media / News — editorial articles (mirrors JournalArticle in strapi.ts). */
export const Journal: CollectionConfig = {
  slug: 'journal',
  labels: { singular: 'Journal Article', plural: 'Journal / News' },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'category', 'publishedAt'] },
  access: { read: () => true },
  defaultSort: '-publishedAt',
  // Push every change to the website's cache straight away.
  hooks: revalidateHooks('journal'),
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'category', type: 'text' },
    { name: 'excerpt', type: 'textarea' },
    { name: 'publishedAt', type: 'date' },
    { name: 'readTime', type: 'text' },
    { name: 'gradient', type: 'text', admin: { description: 'CSS gradient for the card background.' } },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    { name: 'content', type: 'textarea' },
    archivedField,
  ],
}
