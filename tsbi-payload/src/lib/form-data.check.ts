/**
 * Self-check for the studio's FormData -> Payload coercion.
 * Run:  node --experimental-strip-types src/lib/form-data.check.ts
 */
import assert from 'node:assert/strict'
import { parseFields } from './form-data.ts'
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
      ['services', ' Film \n\n Edit \n'],
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
    if (f.type === 'select') assert.ok(f.options?.length, `${c.slug}.${f.name}: select needs options`)
  }
}

console.log('form-data check: ok')
