import type { FieldDef } from './collections'

/**
 * Studio-side schema for the service-page globals. Mirrors
 * src/globals/ServicePages.ts the same way lib/collections.ts mirrors
 * src/collections/*.ts — Payload owns storage, this owns the form.
 */
export type PageGlobalDef = {
  slug: string
  label: string
  /** Where the page it edits lives, so the form can link to it. */
  preview: string
  fields: FieldDef[]
}

const t = (name: string, label: string, extra: Partial<FieldDef> = {}): FieldDef => ({ name, label, type: 'text', ...extra })

/** A repeating list, edited as one pipe-separated line per item. */
const rows = (name: string, label: string, subFields: string[], hint: string, group?: string): FieldDef => ({
  name,
  label,
  type: 'rows',
  subFields: subFields.map((f) => ({ name: f, label: f })),
  hint: `${subFields.join(' | ')} — one item per line. ${hint}`,
  ...(group ? { group } : {}),
})

const HERO = 'Hero'
const CTA = 'Closing call to action'

export const PAGE_GLOBALS: PageGlobalDef[] = [
  {
    slug: 'service-digital-transformation',
    label: 'Digital Transformation',
    preview: '/services/digital-transformation',
    fields: [
      t('eyebrow', 'Eyebrow', { group: HERO, hint: 'Small label above the headline.' }),
      t('heroTitleBefore', 'Headline — before the coloured words', { group: HERO }),
      rows('heroWords', 'Headline coloured words', ['text', 'color'], 'Colour is a hex value; include any trailing punctuation in the text.', HERO),
      t('heroTitleAfter', 'Headline — after the coloured words', { group: HERO }),
      { name: 'heroBody', label: 'Intro paragraph', type: 'textarea', group: HERO },
      t('heroPrimaryLabel', 'Primary button label', { half: true, group: HERO }),
      t('heroPrimaryHref', 'Primary button link', { half: true, group: HERO }),
      t('heroSecondaryLabel', 'Secondary button label', { half: true, group: HERO }),
      t('heroSecondaryHref', 'Secondary button link', { half: true, group: HERO }),
      t('logosLabel', 'Logos caption', { group: HERO }),
      rows('logos', 'Client logos', ['name', 'color'], 'Colour is a hex value.', HERO),
      rows('phoneRows', 'Phone mockup rows', ['img', 'name', 'v'], 'Image path, label, percentage.', HERO),

      t('offerHeading', '“Services we offer” heading'),
      rows('offerings', 'Services offered', ['icon', 'title', 'desc'], 'Icons: web, app, mobile, micro, cart, game, dash, api, seo, support.'),
      t('buildHeading', '“What we build” heading'),
      rows('whatWeBuild', 'What we build', ['icon', 'tint', 'title', 'desc'], 'Icons: globe, mega, layers, growth. Tint is a hex colour.'),
      t('workHeading', '“Selected work” heading', { half: true }),
      t('workLinkLabel', '“Selected work” link label', { half: true }),
      t('processHeading', '“How we work” heading'),
      rows('steps', 'Process steps', ['n', 'color', 'icon', 'title', 'desc'], 'Icons: search, pen, code, rocket.'),

      t('ctaHeading', 'Heading', { group: CTA }),
      t('ctaBody', 'Sub-line', { group: CTA }),
      t('ctaPrimaryLabel', 'Primary button label', { half: true, group: CTA }),
      t('ctaSecondaryLabel', 'Secondary button label', { half: true, group: CTA }),
    ],
  },
]

export const pageGlobalBySlug = (slug: string) => PAGE_GLOBALS.find((g) => g.slug === slug)
