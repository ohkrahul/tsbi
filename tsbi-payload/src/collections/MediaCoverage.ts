import type { CollectionConfig } from 'payload'
import { revalidateHooks } from '../lib/revalidate'
import { archivedField } from './archived'

/** Media page — external press coverage links (mirrors public/media/articles.json). */
export const MediaCoverage: CollectionConfig = {
  slug: 'media-coverage',
  labels: { singular: 'Press Item', plural: 'Media Coverage' },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'source', 'order'] },
  access: { read: () => true },
  defaultSort: 'order',
  // Push every change to the website's cache straight away.
  hooks: revalidateHooks('media-coverage'),
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'source', type: 'text', admin: { description: 'Publication name.' } },
    { name: 'url', type: 'text', required: true, admin: { description: 'Link to the article.' } },
    // Not editable in the studio any more — lists are newest-first. Kept
    // because it still holds the arrangement the original import
    // established, which is what orders same-day records.
    { name: 'order', type: 'number', defaultValue: 100 },
    { name: 'logo', type: 'upload', relationTo: 'media',
      admin: { description: 'Publication logo. Only needed when the site has no logo for this publication yet.' } },
    archivedField,
  ],
}
