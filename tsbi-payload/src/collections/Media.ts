import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: { read: () => true },
  upload: {
    // Compress before the bytes ever leave this server. sharp caps the longest
    // edge and re-encodes to WebP, which is where nearly all the saving is:
    // client photos arrive many times larger than anything the site renders.
    // SVG and video are untouched — Payload's canResizeImage() excludes them.
    resizeOptions: { width: 2400, height: 2400, fit: 'inside', withoutEnlargement: true },
    formatOptions: { format: 'webp', options: { quality: 82 } },
  },
  fields: [
    { name: 'alt', type: 'text' },
  ],
}
