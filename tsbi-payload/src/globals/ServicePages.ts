import type { GlobalConfig, Field } from 'payload'

/**
 * One global per service page, so every heading, paragraph, button label and
 * list item on those pages is editable in the studio. Globals (not a
 * collection) because there is exactly one of each page.
 *
 * The public pages keep their hardcoded copy as a fallback, so an empty global
 * renders the page exactly as it did before it was seeded.
 */

/** Repeating card/step/logo lists — `rows` in the studio, an array here. */
const list = (name: string, subFields: string[], description: string): Field => ({
  name,
  type: 'array',
  admin: { description },
  fields: subFields.map((f) => ({ name: f, type: 'text' }) as Field),
})

const text = (name: string, description?: string): Field => ({
  name,
  type: 'text',
  ...(description ? { admin: { description } } : {}),
})

const area = (name: string, description?: string): Field => ({
  name,
  type: 'textarea',
  ...(description ? { admin: { description } } : {}),
})

export const DigitalTransformationPage: GlobalConfig = {
  slug: 'service-digital-transformation',
  label: 'Page — Digital Transformation',
  access: { read: () => true },
  fields: [
    text('eyebrow', 'Small label above the hero headline.'),
    text('heroTitleBefore', 'Hero headline text before the coloured words.'),
    list('heroWords', ['text', 'color'], 'The coloured words in the headline, in order. Colour is a hex value.'),
    text('heroTitleAfter', 'Hero headline text after the coloured words.'),
    area('heroBody'),
    text('heroPrimaryLabel'),
    text('heroPrimaryHref'),
    text('heroSecondaryLabel'),
    text('heroSecondaryHref'),
    text('logosLabel', 'Line above the client logos.'),
    list('logos', ['name', 'color'], 'Client logos shown in the hero.'),
    list('phoneRows', ['img', 'name', 'v'], 'Rows in the hero phone mockup: image path, label, percentage.'),
    text('offerHeading'),
    list('offerings', ['icon', 'title', 'desc'], 'Icon keys: web, app, mobile, micro, cart, game, dash, api, seo, support.'),
    text('buildHeading'),
    list('whatWeBuild', ['icon', 'tint', 'title', 'desc'], 'Icon keys: globe, mega, layers, growth. Tint is a hex colour.'),
    text('workHeading'),
    text('workLinkLabel'),
    text('processHeading'),
    list('steps', ['n', 'color', 'icon', 'title', 'desc'], 'Icon keys: search, pen, code, rocket.'),
    text('ctaHeading', 'Use a line break for the second line.'),
    text('ctaBody'),
    text('ctaPrimaryLabel'),
    text('ctaSecondaryLabel'),
  ],
}

export const serviceGlobals = [DigitalTransformationPage]
