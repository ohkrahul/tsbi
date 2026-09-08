'use client'

import * as React from 'react'
import { useActionState, useEffect, useState } from 'react'
import Link from 'next/link'
import { LogOut, Moon, Plus, Sun, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import type { FieldDef } from '@/lib/collections'
import {
  deleteDoc,
  login,
  logout,
  requestPasswordReset,
  resetPassword,
  saveDoc,
  uploadMedia,
} from '@/app/(dashboard)/studio/actions'

export type MediaOption = { id: string | number; filename: string; url: string; mimeType?: string }
export type RelationOption = { id: string | number; label: string }
type Doc = Record<string, unknown>

/** Shared control styling — same look as <Input>, for native select/textarea. */
const ctl =
  'border-input placeholder:text-muted-foreground w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]'

/** `options` accepts bare strings or {label,value} pairs. */
const asChoices = (f: FieldDef) =>
  (f.options ?? []).map((o) => (typeof o === 'string' ? { label: o, value: o } : o))

/** The checkbox grid shared by `relation` and `multiselect`. */
function CheckboxGrid({
  name,
  choices,
  selected,
}: {
  name: string
  choices: { label: string; value: string }[]
  selected: Set<string>
}) {
  return (
    <div className="grid max-h-56 gap-1.5 overflow-y-auto rounded-md border p-3 sm:grid-cols-3">
      {choices.map((c) => (
        <Label key={c.value} htmlFor={`f-${name}-${c.value}`} className="cursor-pointer font-normal">
          <input
            id={`f-${name}-${c.value}`}
            name={name}
            type="checkbox"
            value={c.value}
            defaultChecked={selected.has(c.value)}
            className="border-input size-4 rounded-sm"
          />
          <span className="truncate" title={c.label}>
            {c.label}
          </span>
        </Label>
      ))}
    </div>
  )
}

function Err({ children }: { children?: React.ReactNode }) {
  if (!children) return null
  return (
    <p className="border-destructive/40 bg-destructive/10 text-destructive rounded-md border px-3 py-2 text-sm">
      {children}
    </p>
  )
}

/** Doc value -> the string the input should start with. */
function initialValue(f: FieldDef, doc?: Doc): string {
  // Creating: prefill the schema default so an editor doesn't have to know it.
  if (!doc) return f.defaultValue ?? ''
  const v = doc[f.name]
  if (v === null || v === undefined) return ''
  switch (f.type) {
    // `tags` is rendered by ListField from the array itself, not this string.
    case 'youtubeList':
      return Array.isArray(v) ? v.map(String).join('\n') : ''
    case 'rows':
      return Array.isArray(v)
        ? v
            .map((row) =>
              (f.subFields ?? []).map((s) => String((row as Doc)?.[s.name] ?? '')).join(' | '),
            )
            .join('\n')
        : ''
    case 'date':
      return String(v).slice(0, 10)
    case 'upload':
      return String(typeof v === 'object' ? ((v as Doc).id ?? '') : v)
    case 'password':
      return '' // write-only
    default:
      return String(v)
  }
}

function UploadField({ f, value, media }: { f: FieldDef; value: string; media: MediaOption[] }) {
  const [id, setId] = useState(value)
  const picked = media.find((m) => String(m.id) === id)
  return (
    <>
      <select name={f.name} value={id} onChange={(e) => setId(e.target.value)} className={ctl}>
        <option value="">— none —</option>
        {media.map((m) => (
          <option key={m.id} value={String(m.id)}>
            {m.filename}
          </option>
        ))}
      </select>
      {picked?.url ? (
        picked.mimeType?.startsWith('video/') ? (
          <video src={picked.url} controls preload="metadata" className="bg-muted mt-2 h-24 w-auto rounded-md border" />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={picked.url} alt="" className="bg-muted mt-2 h-24 w-auto rounded-md border object-contain" />
        )
      ) : null}
      {!media.length ? (
        <p className="text-muted-foreground text-xs">
          No files yet — <Link href="/studio/media" className="underline">upload to the media library</Link>.
        </p>
      ) : null}
    </>
  )
}

/**
 * A bulleted list where each item is its own input, rather than one textarea of
 * newline-separated text. Enter starts the next bullet and Backspace in an
 * empty one removes it, so it behaves the way a list in a word processor does.
 * Every input shares the field name, so they submit as repeated values.
 */
function ListField({ f, initial }: { f: FieldDef; initial: string[] }) {
  const nextId = React.useRef(0)
  const make = (value: string) => ({ id: nextId.current++, value })
  const [items, setItems] = useState(() => (initial.length ? initial : ['']).map(make))
  const [focusId, setFocusId] = useState<number | null>(null)

  const setValue = (id: number, value: string) =>
    setItems((cur) => cur.map((it) => (it.id === id ? { ...it, value } : it)))

  const addAfter = (id: number) =>
    setItems((cur) => {
      const at = cur.findIndex((it) => it.id === id)
      const item = make('')
      setFocusId(item.id)
      return [...cur.slice(0, at + 1), item, ...cur.slice(at + 1)]
    })

  const removeAt = (id: number) =>
    setItems((cur) => {
      if (cur.length === 1) return [make('')]
      const at = cur.findIndex((it) => it.id === id)
      setFocusId(cur[at - 1]?.id ?? cur[at + 1]?.id ?? null)
      return cur.filter((it) => it.id !== id)
    })

  return (
    <div className="grid gap-1.5">
      {items.map((it, i) => (
        <div key={it.id} className="flex items-start gap-2">
          <span className="text-muted-foreground w-4 shrink-0 pt-2 text-center text-xs select-none">•</span>
          <textarea
            name={f.name}
            value={it.value}
            rows={1}
            autoFocus={it.id === focusId}
            onChange={(e) => setValue(it.id, e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                addAfter(it.id)
              }
              if (e.key === 'Backspace' && it.value === '' && items.length > 1) {
                e.preventDefault()
                removeAt(it.id)
              }
            }}
            className={cn(ctl, 'min-h-9 resize-y py-1.5')}
            aria-label={`${f.label} item ${i + 1}`}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-destructive shrink-0"
            onClick={() => removeAt(it.id)}
            aria-label={`Remove ${f.label} item ${i + 1}`}
            title="Remove"
          >
            <X />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="mt-1 w-fit"
        onClick={() => addAfter(items[items.length - 1]!.id)}
      >
        <Plus /> Add item
      </Button>
    </div>
  )
}

/** Checkbox list of another collection's docs — e.g. the tags on a case study. */
function RelationField({ f, doc, options }: { f: FieldDef; doc?: Doc; options: RelationOption[] }) {
  const selected = new Set(
    (Array.isArray(doc?.[f.name]) ? (doc[f.name] as unknown[]) : []).map((v) =>
      String(v !== null && typeof v === 'object' ? ((v as Doc).id ?? '') : v),
    ),
  )
  const manage = `/studio/${f.relationTo}`
  return (
    <>
      {options.length ? (
        <CheckboxGrid
          name={f.name}
          choices={options.map((o) => ({ label: o.label, value: String(o.id) }))}
          selected={selected}
        />
      ) : (
        <p className="text-muted-foreground rounded-md border border-dashed px-3 py-4 text-xs">
          No {f.label.toLowerCase()} yet —{' '}
          <Link href={`${manage}/new`} className="underline">
            create the first one
          </Link>
          .
        </p>
      )}
      <p className="text-muted-foreground text-xs">
        {f.hint}{' '}
        <Link href={manage} className="underline">
          Manage {f.label.toLowerCase()}
        </Link>
        .
      </p>
    </>
  )
}

function Field({
  f,
  doc,
  media,
  relations,
  suggestions,
}: {
  f: FieldDef
  doc?: Doc
  media: MediaOption[]
  relations: Record<string, RelationOption[]>
  suggestions: Record<string, string[]>
}) {
  const value = initialValue(f, doc)
  const id = `f-${f.name}`

  if (f.type === 'checkbox') {
    return (
      <div className={cn('flex flex-col gap-1.5', f.half ? 'sm:col-span-1' : 'sm:col-span-2')}>
        <Label htmlFor={id} className="cursor-pointer">
          <input
            id={id}
            name={f.name}
            type="checkbox"
            defaultChecked={Boolean(doc?.[f.name])}
            className="border-input size-4 rounded-sm"
          />
          {f.label}
        </Label>
        {f.hint ? <p className="text-muted-foreground text-xs">{f.hint}</p> : null}
      </div>
    )
  }

  return (
    <div className={cn('flex flex-col gap-1.5', f.half ? 'sm:col-span-1' : 'sm:col-span-2')}>
      <Label htmlFor={id}>
        {f.label}
        {f.required ? <span className="text-destructive">*</span> : null}
      </Label>

      {f.type === 'textarea' ? (
        <textarea id={id} name={f.name} defaultValue={value} rows={4} className={ctl} />
      ) : f.type === 'tags' ? (
        <ListField f={f} initial={Array.isArray(doc?.[f.name]) ? (doc[f.name] as unknown[]).map(String) : []} />
      ) : f.type === 'rows' || f.type === 'youtubeList' ? (
        <textarea id={id} name={f.name} defaultValue={value} rows={4} className={cn(ctl, 'font-mono text-xs')} />
      ) : f.type === 'select' ? (
        <select id={id} name={f.name} defaultValue={value} className={ctl}>
          {!f.required ? <option value="">— none —</option> : null}
          {asChoices(f).map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      ) : f.type === 'upload' ? (
        <UploadField f={f} value={value} media={media} />
      ) : f.type === 'multiselect' ? (
        <CheckboxGrid
          name={f.name}
          choices={asChoices(f)}
          selected={new Set((Array.isArray(doc?.[f.name]) ? (doc[f.name] as unknown[]) : []).map(String))}
        />
      ) : f.type === 'relation' ? (
        <RelationField f={f} doc={doc} options={relations[f.name] ?? []} />
      ) : f.type === 'combo' ? (
        <>
          <Input id={id} name={f.name} defaultValue={value} required={f.required} list={`dl-${f.name}`} autoComplete="off" />
          <datalist id={`dl-${f.name}`}>
            {(suggestions[f.name] ?? []).map((o) => (
              <option key={o} value={o} />
            ))}
          </datalist>
        </>
      ) : (
        <Input
          id={id}
          name={f.name}
          type={
            f.type === 'number' || f.type === 'date' || f.type === 'email' || f.type === 'password'
              ? f.type
              : 'text'
          }
          defaultValue={value}
          required={f.required}
          autoComplete={f.type === 'password' ? 'new-password' : undefined}
        />
      )}

      {f.hint && f.type !== 'upload' && f.type !== 'relation' ? (
        <p className="text-muted-foreground text-xs">{f.hint}</p>
      ) : null}
    </div>
  )
}

export function CollectionForm({
  def,
  doc,
  media = [],
  relations = {},
  suggestions = {},
}: {
  def: { slug: string; singular?: string; fields: FieldDef[] }
  doc?: Doc
  media?: MediaOption[]
  relations?: Record<string, RelationOption[]>
  suggestions?: Record<string, string[]>
}) {
  const [state, formAction, pending] = useActionState(saveDoc, null)
  const docId = doc?.id

  // Ungrouped fields are the form; anything with a `group` is optional detail
  // tucked into a collapsed section so publishing needs the top block only.
  const main = def.fields.filter((f) => !f.group)
  const groups = def.fields.reduce<Record<string, FieldDef[]>>((acc, f) => {
    if (f.group) (acc[f.group] ??= []).push(f)
    return acc
  }, {})

  return (
    <form action={formAction} className="grid max-w-3xl gap-5">
      <input type="hidden" name="__collection" value={def.slug} />
      {/* Tells the action which fields this form actually rendered, so an
          untouched field is never written as null. */}
      <input type="hidden" name="__fields" value={def.fields.map((f) => f.name).join(',')} />
      {docId != null ? <input type="hidden" name="__id" value={String(docId)} /> : null}

      <Err>{state?.error}</Err>

      <div className="grid gap-5 sm:grid-cols-2">
        {main.map((f) => (
          <Field key={f.name} f={f} doc={doc} media={media} relations={relations} suggestions={suggestions} />
        ))}
      </div>

      {Object.entries(groups).map(([name, fields]) => (
        <details key={name} className="rounded-xl border">
          <summary className="hover:bg-muted/50 cursor-pointer rounded-xl px-4 py-3 text-sm font-medium">
            {name}
            <span className="text-muted-foreground ml-2 text-xs font-normal">{fields.length} fields</span>
          </summary>
          <div className="grid gap-5 border-t p-4 sm:grid-cols-2">
            {fields.map((f) => (
              <Field key={f.name} f={f} doc={doc} media={media} relations={relations} suggestions={suggestions} />
            ))}
          </div>
        </details>
      ))}

      <div className="flex items-center gap-2 border-t pt-5">
        <Button type="submit" disabled={pending}>
          {pending ? 'Saving…' : docId != null ? 'Save changes' : `Create ${def.singular}`}
        </Button>
        <Button variant="ghost" asChild>
          <Link href={`/studio/${def.slug}`}>Cancel</Link>
        </Button>
      </div>
    </form>
  )
}

/**
 * One-shot banner for ?saved / ?deleted / ?error. Strips the parameter from the
 * URL as soon as it mounts, so a refresh or a back-navigation doesn't announce
 * a save that already happened, and fades itself after a few seconds. Uses
 * history.replaceState rather than router.replace, which would re-run the
 * page's queries just to tidy the URL.
 */
export function FlashMessage({
  kind,
  children,
}: {
  kind: 'success' | 'info' | 'error'
  children: React.ReactNode
}) {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const url = new URL(window.location.href)
    let changed = false
    for (const key of ['saved', 'deleted', 'error']) {
      if (url.searchParams.has(key)) {
        url.searchParams.delete(key)
        changed = true
      }
    }
    if (changed) window.history.replaceState(null, '', `${url.pathname}${url.search}`)

    const timer = setTimeout(() => setShow(false), 4000)
    return () => clearTimeout(timer)
  }, [])

  if (!show) return null

  const tone =
    kind === 'success'
      ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
      : kind === 'error'
        ? 'border-destructive/40 bg-destructive/10 text-destructive'
        : 'text-muted-foreground'

  return (
    <div
      role="status"
      className={cn('mt-6 flex items-start justify-between gap-3 rounded-md border px-3 py-2 text-sm', tone)}
    >
      <span>{children}</span>
      <button
        type="button"
        onClick={() => setShow(false)}
        aria-label="Dismiss"
        className="shrink-0 opacity-60 hover:opacity-100"
      >
        <X className="size-4" />
      </button>
    </div>
  )
}

/**
 * Sort picker for the list views. Submits its own form on change so picking an
 * option applies immediately, rather than needing the Search button.
 */
export function SortSelect({ value }: { value: string }) {
  return (
    <select
      name="sort"
      defaultValue={value}
      aria-label="Sort order"
      className={cn(ctl, 'w-auto cursor-pointer')}
      onChange={(e) => e.currentTarget.form?.requestSubmit()}
    >
      <option value="newest">Newest first</option>
      <option value="oldest">Oldest first</option>
    </select>
  )
}

export function DeleteButton({
  collection,
  id,
  label,
  compact = false,
}: {
  collection: string
  id: string | number
  /** Named in the confirmation, so a row delete says what it is deleting. */
  label?: string
  /** Text-style button, for use inside a table row. */
  compact?: boolean
}) {
  const confirmText = label
    ? `Delete “${label}”? This cannot be undone.`
    : 'Delete this permanently? This cannot be undone.'
  return (
    <form action={deleteDoc} className={compact ? 'inline' : undefined}>
      <input type="hidden" name="__collection" value={collection} />
      <input type="hidden" name="__id" value={String(id)} />
      <Button
        type="submit"
        variant={compact ? 'ghost' : 'destructive'}
        size="sm"
        className={
          compact ? 'text-destructive hover:text-destructive hover:bg-destructive/10 h-7 px-2.5 text-xs' : undefined
        }
        onClick={(e) => {
          if (!confirm(confirmText)) e.preventDefault()
        }}
      >
        Delete
      </Button>
    </form>
  )
}

export function MediaUpload() {
  const [state, formAction, pending] = useActionState(uploadMedia, null)
  return (
    <form action={formAction} className="grid max-w-md gap-3">
      <Err>{state?.error}</Err>
      {state?.ok ? <p className="text-sm text-emerald-600">Uploaded.</p> : null}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="file">Files</Label>
        <input id="file" name="file" type="file" multiple className={cn(ctl, 'py-1.5')} />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="alt">Alt text</Label>
        <Input id="alt" name="alt" placeholder="Defaults to the filename" />
      </div>
      <Button type="submit" disabled={pending} className="w-fit">
        {pending ? 'Uploading…' : 'Upload'}
      </Button>
    </form>
  )
}

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, null)
  return (
    <form action={formAction} className="grid gap-4">
      <Err>{state?.error}</Err>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" autoComplete="username" required />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" autoComplete="current-password" required />
      </div>
      <Button type="submit" disabled={pending}>
        {pending ? 'Signing in…' : 'Sign in'}
      </Button>
      <Link href="/login/forgot" className="text-muted-foreground hover:text-foreground text-center text-xs underline">
        Forgot your password?
      </Link>
    </form>
  )
}

export function ForgotPasswordForm() {
  const [state, formAction, pending] = useActionState(requestPasswordReset, null)

  if (state?.ok) {
    return (
      <div className="grid gap-4">
        <p className="rounded-md border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-700 dark:text-emerald-400">
          If that address has an account, a reset link is on its way.
        </p>
        <Link href="/login" className="text-muted-foreground hover:text-foreground text-center text-xs underline">
          Back to sign in
        </Link>
      </div>
    )
  }

  return (
    <form action={formAction} className="grid gap-4">
      <Err>{state?.error}</Err>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" autoComplete="username" required />
      </div>
      <Button type="submit" disabled={pending}>
        {pending ? 'Sending…' : 'Send reset link'}
      </Button>
      <Link href="/login" className="text-muted-foreground hover:text-foreground text-center text-xs underline">
        Back to sign in
      </Link>
    </form>
  )
}

export function ResetPasswordForm({ token }: { token: string }) {
  const [state, formAction, pending] = useActionState(resetPassword, null)
  return (
    <form action={formAction} className="grid gap-4">
      <input type="hidden" name="token" value={token} />
      <Err>{state?.error}</Err>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password">New password</Label>
        <Input id="password" name="password" type="password" autoComplete="new-password" required minLength={8} />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="confirm">Confirm new password</Label>
        <Input id="confirm" name="confirm" type="password" autoComplete="new-password" required minLength={8} />
      </div>
      <Button type="submit" disabled={pending}>
        {pending ? 'Saving…' : 'Set new password'}
      </Button>
    </form>
  )
}

export function LogoutButton({ email }: { email?: string }) {
  return (
    <form action={logout} className="flex items-center gap-2">
      <span className="bg-brand/10 text-brand grid size-8 shrink-0 place-items-center rounded-full text-xs font-bold uppercase">
        {email?.[0] ?? '?'}
      </span>
      <span className="min-w-0 flex-1 leading-tight">
        <span className="block truncate text-xs font-medium">{email}</span>
        <span className="text-muted-foreground block text-[11px]">Signed in</span>
      </span>
      <Button type="submit" variant="ghost" size="icon" title="Sign out">
        <LogOut />
      </Button>
    </form>
  )
}

export function ThemeToggle() {
  const [dark, setDark] = useState(false)
  useEffect(() => setDark(document.documentElement.classList.contains('dark')), [])
  return (
    <Button
      variant="ghost"
      size="sm"
      className="w-full justify-start"
      onClick={() => {
        const next = !dark
        setDark(next)
        document.documentElement.classList.toggle('dark', next)
        try {
          localStorage.setItem('studio-theme', next ? 'dark' : 'light')
        } catch {}
      }}
    >
      {dark ? <Sun /> : <Moon />}
      {dark ? 'Light mode' : 'Dark mode'}
    </Button>
  )
}
