/**
 * Self-check for the studio's FormData -> Payload coercion.
 * Run:  node --experimental-strip-types src/lib/form-data.check.ts
 */
import assert from 'node:assert/strict'
import { parseFields } from './form-data.ts'
import { youtubeId } from './media-url.ts'
import { COLLECTIONS, collectionBySlug } from './collections.ts'
import type { FieldDef } from './collections.ts'

const fd = (pairs: [string, string][]) => {
  const f = new FormData()
  for (const [k, v] of pairs) f.append(k, v)
  return f
}

// Every field type, filled.
const fields: FieldDef[] = [
  { name: 'title', label: 'T', type: 'text' },
  { name: 'body', label: 'B', type: 'textarea' },
  { name: 'order', label: 'O', type: 'number' },
  { name: 'track', label: 'K', type: 'select', options: ['film', 'tech'] },
  { name: 'live', label: 'L', type: 'checkbox' },
  { name: 'at', label: 'A', type: 'date' },
  { name: 'services', label: 'S', type: 'tags' },
  { name: 'cover', label: 'C', type: 'upload' },
  {
    name: 'impact',
    label: 'I',
    type: 'rows',
    subFields: [{ name: 'value', label: 'V' }, { name: 'label', label: 'L' }],
  },
]

assert.deepEqual(
  parseFields(
    fields,
    fd([
      ['title', '  Hello  '],
      ['body', 'line one\nline two'],
      ['order', '7'],
      ['track', 'tech'],
      ['live', 'on'],
      ['at', '2026-01-31'],
      ['services', ' Film '],
      ['services', ' Edit '],
      ['services', '   '],
      ['cover', '42'],
      ['impact', '2.4M | Views in week one\n | Label only\n88% | Recall'],
    ]),
  ),
  {
    title: 'Hello',
    body: 'line one\nline two',
    order: 7,
    track: 'tech',
    live: true,
    at: '2026-01-31',
    services: ['Film', 'Edit'],
    cover: 42,
    impact: [
      { value: '2.4M', label: 'Views in week one' },
      { value: '', label: 'Label only' },
      { value: '88%', label: 'Recall' },
    ],
  },
)

// Everything empty / absent: blanks become null, not '' or NaN, so Payload
// clears the column instead of storing an empty string.
assert.deepEqual(parseFields(fields, fd([['order', '  ']])), {
  title: null,
  body: null,
  order: null,
  track: null,
  live: false,
  at: null,
  services: [],
  cover: null,
  impact: [],
})

// One bullet per value: blanks are dropped and each item is trimmed.
assert.deepEqual(
  parseFields([{ name: 'skills', label: 'S', type: 'tags' }], fd([
    ['skills', '  Attention to detail.  '],
    ['skills', ''],
    ['skills', 'Strong writing, editing, and proofreading skills.'],
  ])),
  { skills: ['Attention to detail.', 'Strong writing, editing, and proofreading skills.'] },
)
// A list emptied down to one blank bullet clears the field.
assert.deepEqual(parseFields([{ name: 'skills', label: 'S', type: 'tags' }], fd([['skills', '']])), { skills: [] })

// Non-numeric upload ids (non-postgres adapters) stay strings.
assert.deepEqual(parseFields([fields[7]!], fd([['cover', 'abc123']])), { cover: 'abc123' })

// Auth fields: a blank password is omitted (an edit must not wipe it), a filled
// one goes through verbatim — no trimming, whitespace can be part of it.
const authFields: FieldDef[] = [
  { name: 'email', label: 'E', type: 'email', required: true },
  { name: 'password', label: 'P', type: 'password' },
]
assert.deepEqual(parseFields(authFields, fd([['email', ' me@tsbi.in '], ['password', '']])), {
  email: 'me@tsbi.in',
})
assert.deepEqual(parseFields(authFields, fd([['email', 'me@tsbi.in'], ['password', ' pa ss ']])), {
  email: 'me@tsbi.in',
  password: ' pa ss ',
})
assert.deepEqual(parseFields(authFields, fd([])), { email: null })

// Editors paste links, not ids — every common YouTube URL shape must resolve.
const YT = 'dQw4w9WgXcQ'
for (const url of [
  `https://www.youtube.com/watch?v=${YT}`,
  `https://www.youtube.com/watch?v=${YT}&t=42s`,
  `https://www.youtube.com/watch?list=PL123&v=${YT}`,
  `https://youtu.be/${YT}`,
  `https://youtu.be/${YT}?si=abcdef`,
  `https://www.youtube.com/embed/${YT}`,
  `https://www.youtube.com/shorts/${YT}`,
  `https://www.youtube.com/live/${YT}`,
  `https://m.youtube.com/watch?v=${YT}`,
  `  https://www.youtube.com/watch?v=${YT}  `,
  YT,
]) {
  assert.equal(youtubeId(url), YT, `youtubeId failed for ${url}`)
}
assert.equal(youtubeId(''), null)
assert.equal(youtubeId('https://vimeo.com/12345'), null)
assert.equal(youtubeId('https://example.com/video.mp4'), null)
assert.equal(youtubeId('short'), null)
assert.equal(youtubeId('twelve-chars'), null)
// Anything 11 chars of YouTube's own alphabet is indistinguishable from an id,
// so a bare token that long is taken at face value — that's the point.
assert.equal(youtubeId('not-a-video'), 'not-a-video')

const mediaFields: FieldDef[] = [
  { name: 'youtube', label: 'Y', type: 'youtube' },
  { name: 'image', label: 'I', type: 'coverUrl' },
]
const thumb = `https://img.youtube.com/vi/${YT}/hqdefault.jpg`

// A pasted watch link becomes an id, and the blank cover falls back to its thumbnail.
assert.deepEqual(parseFields(mediaFields, fd([['youtube', `https://youtu.be/${YT}`], ['image', '']])), {
  youtube: YT,
  image: thumb,
})
// A YouTube link pasted into the cover field becomes that video's thumbnail.
assert.deepEqual(parseFields(mediaFields, fd([['youtube', ''], ['image', `https://www.youtube.com/watch?v=${YT}`]])), {
  youtube: null,
  image: thumb,
})
// Any other cover URL is kept exactly as given.
assert.deepEqual(parseFields(mediaFields, fd([['youtube', ''], ['image', '/tech/cover.jpg']])), {
  youtube: null,
  image: '/tech/cover.jpg',
})
assert.deepEqual(parseFields(mediaFields, fd([])), { youtube: null, image: null })

// Relations arrive as one checkbox per option.
const relField: FieldDef[] = [{ name: 'tags', label: 'Tags', type: 'relation', relationTo: 'tags' }]
assert.deepEqual(parseFields(relField, fd([['tags', '3'], ['tags', '7']])), { tags: [3, 7] })
assert.deepEqual(parseFields(relField, fd([])), { tags: [] })

// Multiselect keeps the option strings as given (no numeric coercion).
const msField: FieldDef[] = [{
  name: 'serviceAreas', label: 'S', type: 'multiselect',
  options: [{ label: 'Social Media', value: 'social-media' }, { label: 'Content', value: 'content-production' }],
}]
assert.deepEqual(parseFields(msField, fd([['serviceAreas', 'social-media'], ['serviceAreas', 'content-production']])), {
  serviceAreas: ['social-media', 'content-production'],
})
assert.deepEqual(parseFields(msField, fd([])), { serviceAreas: [] })

// A list of YouTube links, one per line, becomes a list of ids; junk is dropped.
const listField: FieldDef[] = [{ name: 'youtubeFilms', label: 'F', type: 'youtubeList' }]
assert.deepEqual(
  parseFields(listField, fd([['youtubeFilms', `https://youtu.be/${YT}
  https://www.youtube.com/watch?v=aaaaaaaaaaa  

https://vimeo.com/1
`]])),
  { youtubeFilms: [YT, 'aaaaaaaaaaa'] },
)
assert.deepEqual(parseFields(listField, fd([])), { youtubeFilms: [] })

// `combo` is stored as plain text — typing a value that isn't in the dropdown
// is how a new one gets created, so it must pass through untouched.
const comboField: FieldDef[] = [{ name: 'category', label: 'C', type: 'combo' }]
assert.deepEqual(parseFields(comboField, fd([['category', '  Brand New Category  ']])), {
  category: 'Brand New Category',
})
assert.deepEqual(parseFields(comboField, fd([['category', '']])), { category: null })

// __fields scopes the write: a field the form didn't render is left alone, so a
// partial submission can't blank out unrelated columns.
const partial = new FormData()
// boolSelect: a two-option select stored as a boolean, and a blank (only
// possible when the field wasn't rendered) must not invent a value.
{
  const seg: FieldDef[] = [
    { name: 'isEntertainment', label: 'Section', type: 'boolSelect', required: true,
      options: [{ label: 'Entertainment', value: 'true' }, { label: 'Non-Entertainment', value: 'false' }] },
  ]
  assert.deepEqual(parseFields(seg, fd([['isEntertainment', 'true']])), { isEntertainment: true })
  assert.deepEqual(parseFields(seg, fd([['isEntertainment', 'false']])), { isEntertainment: false })
  assert.deepEqual(parseFields(seg, fd([['isEntertainment', '']])), {}, 'blank leaves the stored value alone')
  assert.deepEqual(parseFields(seg, fd([])), {}, 'absent leaves the stored value alone')
}

partial.append('__fields', 'title,order')
partial.append('title', 'Only this')
assert.deepEqual(parseFields(fields, partial), { title: 'Only this', order: null })

// A rendered but empty field is still cleared.
const cleared = new FormData()
cleared.append('__fields', 'title,body')
cleared.append('title', '')
cleared.append('body', '')
assert.deepEqual(parseFields(fields, cleared), { title: null, body: null })

// An unticked checkbox that WAS rendered still becomes false.
const box = new FormData()
box.append('__fields', 'live')
assert.deepEqual(parseFields(fields, box), { live: false })

// Registry sanity: unique slugs, every column has a field, rows declare subFields.
const slugs = COLLECTIONS.map((c) => c.slug)
assert.equal(new Set(slugs).size, slugs.length, 'collection slugs must be unique')
for (const c of COLLECTIONS) {
  assert.equal(collectionBySlug(c.slug), c)
  const names = new Set(c.fields.map((f) => f.name))
  assert.equal(new Set(names).size, c.fields.length, `${c.slug}: duplicate field names`)
  for (const col of c.columns) {
    assert.ok(names.has(col.key), `${c.slug}: column "${col.key}" has no matching field`)
  }
  for (const f of c.fields) {
    if (f.type === 'rows') assert.ok(f.subFields?.length, `${c.slug}.${f.name}: rows needs subFields`)
    if (f.type === 'select' || f.type === 'multiselect') {
      assert.ok(f.options?.length, `${c.slug}.${f.name}: ${f.type} needs options`)
    }
    if (f.type === 'relation') {
      assert.ok(f.relationTo, `${c.slug}.${f.name}: relation needs relationTo`)
      assert.ok(collectionBySlug(f.relationTo!), `${c.slug}.${f.name}: relationTo "${f.relationTo}" is not in the registry`)
    }
  }
}

console.log('form-data check: ok')
