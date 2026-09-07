import type { CollectionConfig } from 'payload'

/**
 * Tags — the filter options on the public /case-studies page. Editors own this
 * list, so adding a filter is a CMS action rather than a code change.
 */
export const Tags: CollectionConfig = {
  slug: 'tags',
  labels: { singular: 'Tag', plural: 'Tags' },
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'order'] },
  access: { read: () => true },
  defaultSort: 'name',
  fields: [
    { name: 'name', type: 'text', required: true, unique: true, index: true },
    { name: 'order', type: 'number', defaultValue: 100, admin: { description: 'Lower numbers sort first in the filter dropdown.' } },
  ],
}
