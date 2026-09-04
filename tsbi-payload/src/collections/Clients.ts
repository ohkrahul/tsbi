import type { CollectionConfig } from 'payload'

/** Clients — client brands (mirrors ClientBrand in strapi.ts). */
export const Clients: CollectionConfig = {
  slug: 'clients',
  labels: { singular: 'Client', plural: 'Clients' },
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'type', 'showOnHome', 'order'] },
  access: { read: () => true },
  defaultSort: 'order',
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'type', type: 'text' },
    { name: 'caption', type: 'text' },
    { name: 'accent', type: 'text' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'cells', type: 'text', hasMany: true },
    { type: 'row', fields: [
      { name: 'isEntertainment', type: 'checkbox', admin: { width: '50%' } },
      { name: 'showOnHome', type: 'checkbox', admin: { width: '50%' } },
    ] },
    { name: 'order', type: 'number', defaultValue: 100 },
  ],
}
