import type { FieldDef } from './collections'

const lines = (v: FormDataEntryValue | null) =>
  String(v ?? '')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)

const blankToNull = (v: FormDataEntryValue | null) => {
  const s = String(v ?? '').trim()
  return s === '' ? null : s
}

/** FormData -> Payload document data, driven by the registry's field schema. */
export function parseFields(fields: FieldDef[], fd: FormData) {
  const data: Record<string, unknown> = {}
  for (const f of fields) {
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
      case 'password': {
        // Omitted entirely when blank — sending null would clear the password
        // on every edit. Never trimmed: whitespace can be part of a password.
        const s = String(raw ?? '')
        if (s !== '') data[f.name] = s
        break
      }
      default:
        data[f.name] = blankToNull(raw)
    }
  }
  return data
}
