/** Registry that drives the /studio sidebar, dashboard, lists and forms. */
export type ColumnDef = { key: string; label: string }

export type FieldDef = {
  name: string
  label: string
  /**
   * `tags` = text hasMany (one per line), `rows` = array of objects,
   * `upload` = media relation, `relation` = pick many from another collection,
   * `youtube` = any YouTube link normalized to its id, `coverUrl` = image URL
   * that falls back to the video's thumbnail, `password` = write-only.
   */
  type:
    | 'text'
    | 'textarea'
    | 'number'
    | 'select'
    | 'checkbox'
    | 'date'
    | 'tags'
    | 'rows'
    | 'upload'
    | 'multiselect'
    | 'relation'
    | 'youtube'
    | 'coverUrl'
    | 'email'
    | 'password'
  required?: boolean
  /** For `select` / `multiselect`. A bare string is used as both label and value. */
  options?: (string | { label: string; value: string })[]
  hint?: string
  /** For `rows` — the sub-fields, in the order they appear on each `a | b` line. */
  subFields?: { name: string; label: string }[]
  /** Renders half-width from `sm` up. */
  half?: boolean
  /** Prefilled on the "new" form — mirror the Payload field's defaultValue. */
  defaultValue?: string
  /** Collapsed `<details>` section to file this field under. Ungrouped = always visible. */
  group?: string
  /** For `relation` — the collection to pick from, and which field labels it. */
  relationTo?: string
  relationLabel?: string
}

export type CollectionDef = {
  slug: string
  label: string
  singular: string
  defaultSort?: string
  columns: ColumnDef[]
  fields: FieldDef[]
}

const t = (name: string, label: string, extra: Partial<FieldDef> = {}): FieldDef => ({ name, label, type: 'text', ...extra })

// Collapsed sections — everything an editor can safely ignore.
const THEME = 'Theme colours (optional)'
const TECH = 'Tech-track long-form sections (optional)'

export const COLLECTIONS: CollectionDef[] = [
  {
    slug: 'case-studies', label: 'Case Studies', singular: 'Case Study', defaultSort: 'order',
    columns: [
      { key: 'title', label: 'Title' }, { key: 'clientName', label: 'Client' },
      { key: 'category', label: 'Category' }, { key: 'track', label: 'Track' }, { key: 'order', label: 'Order' },
    ],
    fields: [
      t('title', 'Title', { required: true }),
      t('slug', 'Slug', { required: true, half: true, hint: 'URL segment — must be unique.' }),
      t('clientName', 'Client name', { required: true, half: true }),
      t('category', 'Category', { half: true, hint: 'Shown on the card, e.g. Film Marketing · Romantic Comedy' }),
      { name: 'track', label: 'Track', type: 'select', options: ['film', 'tech'], half: true, defaultValue: 'film', required: true },
      { name: 'order', label: 'Order', type: 'number', half: true, defaultValue: '100', hint: 'Lower numbers show first.' },
      { name: 'year', label: 'Year', type: 'number', half: true },
      {
        name: 'tags', label: 'Tags', type: 'relation', relationTo: 'tags', relationLabel: 'name',
        hint: 'Drives the filter dropdown on the public case-studies page.',
      },
      {
        name: 'serviceAreas', label: 'Show on service pages', type: 'multiselect',
        options: [
          { label: 'Social Media', value: 'social-media' },
          { label: 'Content Production', value: 'content-production' },
          { label: 'Influencer Management', value: 'influencer-management' },
          { label: 'Digital Transformation', value: 'digital-transformation' },
        ],
        hint: 'This case study is listed on every service page you tick.',
      },
      { name: 'shortDescription', label: 'Short description', type: 'textarea' },
      { name: 'concept', label: 'Concept', type: 'textarea' },
      { name: 'services', label: 'Services', type: 'tags' },
      {
        name: 'youtube', label: 'YouTube link', type: 'youtube',
        hint: 'Paste the normal YouTube link — watch, youtu.be, shorts or embed. The ID is pulled out for you.',
      },
      {
        name: 'image', label: 'Cover image', type: 'coverUrl',
        hint: 'Paste an image URL, or a YouTube link to use its thumbnail. Leave blank to reuse the video above.',
      },
      {
        name: 'videos', label: 'Video files', type: 'tags',
        hint: 'Direct video-file URLs only (…/clip.mp4), one per line — these play instead of the YouTube embed. A YouTube link goes in the field above, not here.',
      },
      // Cosmetic — the public detail page falls back to sensible values, so an
      // editor never has to touch these to publish a case study.
      t('colorTheme', 'Colour theme', { half: true, group: THEME }),
      t('accent', 'Accent', { half: true, group: THEME }),
      t('gradFrom', 'Gradient from', { half: true, group: THEME }),
      t('gradTo', 'Gradient to', { half: true, group: THEME }),
      { name: 'overview', label: 'Overview', type: 'textarea', group: TECH },
      { name: 'challenge', label: 'Challenge', type: 'textarea', group: TECH },
      { name: 'idea', label: 'Idea', type: 'textarea', group: TECH },
      { name: 'experienceIntro', label: 'Experience intro', type: 'textarea', group: TECH },
      { name: 'experienceItems', label: 'Experience items', type: 'tags', group: TECH },
      { name: 'whyItWorked', label: 'Why it worked', type: 'textarea', group: TECH },
      {
        name: 'impact', label: 'Impact stats', type: 'rows', group: TECH,
        subFields: [{ name: 'value', label: 'Value' }, { name: 'label', label: 'Label' }],
        hint: 'One per line, pipe-separated: 2.4M | Views in week one. Label is required.',
      },
    ],
  },
  {
    slug: 'journal', label: 'Journal / News', singular: 'Article', defaultSort: '-publishedAt',
    columns: [{ key: 'title', label: 'Title' }, { key: 'category', label: 'Category' }, { key: 'publishedAt', label: 'Published' }],
    fields: [
      t('title', 'Title', { required: true }),
      t('slug', 'Slug', { required: true, half: true }),
      t('category', 'Category', { half: true }),
      { name: 'publishedAt', label: 'Published at', type: 'date', half: true },
      t('readTime', 'Read time', { half: true }),
      { name: 'excerpt', label: 'Excerpt', type: 'textarea' },
      t('gradient', 'Gradient', { hint: 'CSS gradient for the card background.' }),
      { name: 'coverImage', label: 'Cover image', type: 'upload' },
      { name: 'content', label: 'Content', type: 'textarea' },
    ],
  },
  {
    slug: 'media-coverage', label: 'Media Coverage', singular: 'Press Item', defaultSort: 'order',
    columns: [{ key: 'title', label: 'Title' }, { key: 'source', label: 'Source' }, { key: 'order', label: 'Order' }],
    fields: [
      t('title', 'Title', { required: true }),
      t('source', 'Source', { half: true, hint: 'Publication name.' }),
      { name: 'order', label: 'Order', type: 'number', half: true },
      t('url', 'URL', { required: true, hint: 'Link to the article.' }),
    ],
  },
  {
    slug: 'careers', label: 'Careers', singular: 'Job Listing', defaultSort: 'order',
    columns: [{ key: 'role', label: 'Role' }, { key: 'department', label: 'Department' }, { key: 'location', label: 'Location' }],
    fields: [
      t('role', 'Role', { required: true }),
      t('department', 'Department', { half: true }),
      t('location', 'Location', { half: true }),
      t('experience', 'Experience', { half: true }),
      { name: 'order', label: 'Order', type: 'number', half: true },
      { name: 'skills', label: 'Skills', type: 'tags' },
      { name: 'responsibilities', label: 'Responsibilities', type: 'tags' },
    ],
  },
  {
    slug: 'clients', label: 'Clients', singular: 'Client', defaultSort: 'order',
    columns: [{ key: 'name', label: 'Name' }, { key: 'type', label: 'Type' }, { key: 'showOnHome', label: 'On Home' }, { key: 'order', label: 'Order' }],
    fields: [
      t('name', 'Name', { required: true }),
      t('type', 'Type', { half: true }),
      t('caption', 'Caption', { half: true }),
      t('accent', 'Accent', { half: true }),
      { name: 'order', label: 'Order', type: 'number', half: true },
      { name: 'image', label: 'Logo', type: 'upload' },
      { name: 'cells', label: 'Cells', type: 'tags' },
      { name: 'isEntertainment', label: 'Entertainment client', type: 'checkbox', half: true },
      { name: 'showOnHome', label: 'Show on home', type: 'checkbox', half: true },
    ],
  },
  {
    slug: 'tags', label: 'Tags', singular: 'Tag', defaultSort: 'name',
    columns: [{ key: 'name', label: 'Name' }, { key: 'order', label: 'Order' }],
    fields: [
      t('name', 'Name', { required: true, half: true, hint: 'Shown as-is in the public filter dropdown.' }),
      { name: 'order', label: 'Order', type: 'number', half: true, defaultValue: '100', hint: 'Lower numbers sort first.' },
    ],
  },
  {
    // Studio accounts. This is the only place users can be managed now that
    // Payload's own /admin UI is gone. If every user is ever deleted, Payload
    // allows creating the first one unauthenticated:
    //   curl -X POST localhost:3005/api/users -H 'Content-Type: application/json' \
    //        -d '{"email":"you@tsbi.in","password":"…"}'
    slug: 'users', label: 'Users', singular: 'User', defaultSort: 'email',
    columns: [{ key: 'email', label: 'Email' }, { key: 'name', label: 'Name' }],
    fields: [
      { name: 'email', label: 'Email', type: 'email', required: true, half: true },
      t('name', 'Name', { half: true }),
      {
        name: 'password',
        label: 'Password',
        type: 'password',
        hint: 'Required for a new user. Leave blank to keep the existing password.',
      },
    ],
  },
]

export const collectionBySlug = (slug: string) => COLLECTIONS.find((c) => c.slug === slug)

/** Slugs the studio server actions may write to. */
export const WRITABLE = new Set<string>([...COLLECTIONS.map((c) => c.slug), 'media'])
