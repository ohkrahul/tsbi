/** Registry that drives the /studio sidebar, dashboard, lists and forms. */
export type ColumnDef = { key: string; label: string }

export type FieldDef = {
  name: string
  label: string
  /**
   * `tags` = text hasMany (one per line), `rows` = array of objects,
   * `upload` = media relation, `relation` = pick many from another collection,
   * `youtube` = any YouTube link normalized to its id, `coverUrl` = image URL
   * that falls back to the video's thumbnail, `password` = write-only,
   * `combo` = free text with a dropdown of the values already in use, so a new
   * one is created just by typing it.
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
    | 'combo'
    | 'multiselect'
    | 'relation'
    | 'youtube'
    | 'youtubeList'
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
const CARD = 'Service-page card (optional)'

const DEFS: CollectionDef[] = [
  {
    slug: 'case-studies', label: 'Case Studies', singular: 'Case Study', defaultSort: '-createdAt',
    columns: [
      { key: 'title', label: 'Title' }, { key: 'clientName', label: 'Client' },
      { key: 'category', label: 'Category' }, { key: 'track', label: 'Track' },
    ],
    fields: [
      t('title', 'Title', { required: true }),
      t('slug', 'Slug', { required: true, half: true, hint: 'URL segment — must be unique.' }),
      t('clientName', 'Client name', { required: true, half: true }),
      {
        name: 'category', label: 'Category', type: 'combo', half: true,
        hint: 'Pick one already in use, or type a new one — it is created as you type. e.g. Film Marketing · Romantic Comedy',
      },
      { name: 'track', label: 'Track', type: 'select', options: ['film', 'tech'], half: true, defaultValue: 'film', required: true },
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
      // Only needed when a service page should show different copy than the
      // case study itself; every card falls back to the fields above.
      t('cardHeadline', 'Card headline', { group: CARD, hint: 'Shown on service-page cards instead of the title.' }),
      { name: 'cardBlurb', label: 'Card blurb', type: 'textarea', group: CARD, hint: 'Shown on service-page cards instead of the concept.' },
      {
        name: 'youtubeFilms', label: 'All films in this campaign', type: 'youtubeList', group: CARD,
        hint: 'One YouTube link per line. Drives the "N Films" badge on the card. Leave blank to use the single link above.',
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
      { name: 'category', label: 'Category', type: 'combo', half: true, hint: 'Pick one already in use, or type a new one.' },
      { name: 'publishedAt', label: 'Published at', type: 'date', half: true },
      t('readTime', 'Read time', { half: true }),
      { name: 'excerpt', label: 'Excerpt', type: 'textarea' },
      t('gradient', 'Gradient', { hint: 'CSS gradient for the card background.' }),
      { name: 'coverImage', label: 'Cover image', type: 'upload' },
      { name: 'content', label: 'Content', type: 'textarea' },
    ],
  },
  {
    slug: 'media-coverage', label: 'Media Coverage', singular: 'Press Item', defaultSort: '-createdAt',
    columns: [{ key: 'title', label: 'Title' }, { key: 'source', label: 'Publication' }],
    fields: [
      t('title', 'Title', { required: true }),
      {
        name: 'source', label: 'Publication', type: 'combo', half: true,
        hint: 'Pick a publication already in use so its logo is recognised, or type a new one.',
      },
      t('url', 'URL', { required: true, hint: 'Link to the article.' }),
      {
        name: 'logo', label: 'Publication logo', type: 'upload',
        hint: 'Only needed for a publication the site has no logo for yet — otherwise leave it blank and the built-in one is used.',
      },
    ],
  },
  {
    slug: 'careers', label: 'Careers', singular: 'Job Listing', defaultSort: '-createdAt',
    columns: [{ key: 'role', label: 'Role' }, { key: 'department', label: 'Department' }, { key: 'location', label: 'Location' }],
    fields: [
      t('role', 'Role', { required: true }),
      t('department', 'Department', { half: true }),
      t('location', 'Location', { half: true }),
      t('experience', 'Experience', { half: true }),
      { name: 'skills', label: 'Skills', type: 'tags' },
      { name: 'responsibilities', label: 'Responsibilities', type: 'tags' },
    ],
  },
  {
    slug: 'clients', label: 'Clients', singular: 'Client', defaultSort: '-createdAt',
    columns: [{ key: 'name', label: 'Name' }, { key: 'type', label: 'Type' }, { key: 'showOnHome', label: 'On Home' }],
    fields: [
      t('name', 'Name', { required: true }),
      t('type', 'Type', { half: true }),
      t('caption', 'Caption', { half: true }),
      t('accent', 'Accent', { half: true }),
      { name: 'image', label: 'Logo', type: 'upload' },
      { name: 'cells', label: 'Cells', type: 'tags' },
      { name: 'isEntertainment', label: 'Entertainment client', type: 'checkbox', half: true },
      { name: 'showOnHome', label: 'Show on home', type: 'checkbox', half: true },
    ],
  },
  {
    slug: 'tags', label: 'Tags', singular: 'Tag', defaultSort: 'name',
    columns: [{ key: 'name', label: 'Name' }],
    fields: [
      t('name', 'Name', { required: true, half: true, hint: 'Shown as-is in the public filter dropdown.' }),
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

/**
 * Archive instead of delete — hidden from the website, kept here, restorable.
 * Appended to every content collection from one place so none can forget it.
 * `users` is left out: those are login accounts, not website content.
 */
const ARCHIVED: FieldDef = {
  name: 'archived',
  label: 'Archived',
  type: 'checkbox',
  half: true,
  hint: 'Hidden from the website but kept here. Untick to put it back.',
}

export const ARCHIVABLE = new Set(DEFS.map((d) => d.slug).filter((slug) => slug !== 'users'))

export const COLLECTIONS: CollectionDef[] = DEFS.map((def) =>
  ARCHIVABLE.has(def.slug) ? { ...def, fields: [...def.fields, ARCHIVED] } : def,
)

export const collectionBySlug = (slug: string) => COLLECTIONS.find((c) => c.slug === slug)

/**
 * The fields a free-text search runs against — every field that holds prose, so
 * a client name, a category or a phrase from the concept all find the record.
 *
 * `select` is excluded on purpose: it is a postgres enum column and `like`
 * against one is a hard query error, not an empty result.
 */
export const searchableFields = (def: CollectionDef) =>
  def.fields.filter((f) => ['text', 'textarea', 'combo', 'email'].includes(f.type)).map((f) => f.name)

/** Slugs the studio server actions may write to. */
export const WRITABLE = new Set<string>([...COLLECTIONS.map((c) => c.slug), 'media'])
