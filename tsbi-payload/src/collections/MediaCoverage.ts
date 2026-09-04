import type { CollectionConfig } from 'payload'

/** Media page — external press coverage links (mirrors public/media/articles.json). */
export const MediaCoverage: CollectionConfig = {
  slug: 'media-coverage',
  labels: { singular: 'Press Item', plural: 'Media Coverage' },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'source', 'order'] },
  access: { read: () => true },
  defaultSort: 'order',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'source', type: 'text', admin: { description: 'Publication name.' } },
    { name: 'url', type: 'text', required: true, admin: { description: 'Link to the article.' } },
    { name: 'order', type: 'number', defaultValue: 100 },
  ],
}
