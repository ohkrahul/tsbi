import type { FieldDef } from './collections'
import { coverImageUrl, youtubeId } from './media-url.ts'

const lines = (v: FormDataEntryValue | null) =>
  String(v ?? '')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)

const blankToNull = (v: FormDataEntryValue | null) => {
  const s = String(v ?? '').trim()
  return s === '' ? null : s
}

/**
 * FormData -> Payload document data, driven by the registry's field schema.
 *
 * The form posts `__fields` listing what it actually rendered, and only those
 * fields are written. Without it a submission that omits a field would write
 * null over it: checkbox and checkbox-group fields are absent from FormData
 * when nothing is ticked, so "absent" can't be read as "clear this". A rendered
 * field that is present but empty is still cleared, which is what an editor
 * blanking an input expects.
 */
export function parseFields(fields: FieldDef[], fd: FormData) {
  const rendered = fd.get('__fields')
  const only = typeof rendered === 'string' ? new Set(rendered.split(',').filter(Boolean)) : null

  const data: Record<string, unknown> = {}
  for (const f of fields) {
    if (only && !only.has(f.name)) continue
    const raw = fd.get(f.name)
    switch (f.type) {
      case 'checkbox':
        // Unchecked boxes are simply absent from the submission.
        data[f.name] = raw !== null
        break
      case 'number': {
        const s = blankToNull(raw)
        data[f.name] = s === null ? null : Number(s)
        break
      }
      case 'tags':
        data[f.name] = lines(raw)
        break
      case 'rows': {
        const subs = f.subFields ?? []
        // ponytail: pipe-separated lines instead of a repeatable row editor.
        // Swap for indexed inputs (impact.0.value) if a value ever needs a "|".
        data[f.name] = lines(raw).map((line) => {
          const parts = line.split('|')
          return Object.fromEntries(subs.map((s, i) => [s.name, (parts[i] ?? '').trim()]))
        })
        break
      }
      case 'upload': {
        const s = blankToNull(raw)
        // Postgres media ids are numeric; keep strings working for other adapters.
        data[f.name] = s === null ? null : /^\d+$/.test(s) ? Number(s) : s
        break
      }
      case 'relation':
        // One checkbox per related doc, so read every checked value.
        data[f.name] = fd
          .getAll(f.name)
          .map((v) => String(v))
          .filter(Boolean)
          .map((v) => (/^\d+$/.test(v) ? Number(v) : v))
        break
      case 'multiselect':
        // Same checkbox shape, but the values are the option strings themselves.
        data[f.name] = fd
          .getAll(f.name)
          .map((v) => String(v))
          .filter(Boolean)
        break
      case 'youtube':
        // Accepts a watch/share/embed/shorts link or a bare id.
        data[f.name] = youtubeId(raw as string)
        break
      case 'youtubeList':
        // One link per line; anything that isn't a YouTube link is dropped
        // rather than stored as a broken id.
        data[f.name] = lines(raw)
          .map((l) => youtubeId(l))
          .filter((v): v is string => Boolean(v))
        break
      case 'password': {
        // Omitted entirely when blank — sending null would clear the password
        // on every edit. Never trimmed: whitespace can be part of a password.
        const s = String(raw ?? '')
        if (s !== '') data[f.name] = s
        break
      }
      case 'coverUrl':
        // Filled in by the post-pass below, which needs the video field too.
        break
      default:
        data[f.name] = blankToNull(raw)
    }
  }

  // A cover image can be derived from the video on the same document, so it is
  // resolved after every field has been read.
  const cover = fields.find((f) => f.type === 'coverUrl')
  if (cover) {
    const video = fields.find((f) => f.type === 'youtube')
    data[cover.name] = coverImageUrl(fd.get(cover.name) as string, video ? (data[video.name] as string) : null)
  }

  return data
}
