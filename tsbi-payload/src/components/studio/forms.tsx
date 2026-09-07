'use client'

import * as React from 'react'
import { useActionState, useEffect, useState } from 'react'
import Link from 'next/link'
import { LogOut, Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import type { FieldDef } from '@/lib/collections'
import { deleteDoc, login, logout, saveDoc, uploadMedia } from '@/app/(dashboard)/studio/actions'

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
    case 'tags':
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
}: {
  f: FieldDef
  doc?: Doc
  media: MediaOption[]
  relations: Record<string, RelationOption[]>
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
      ) : f.type === 'tags' || f.type === 'rows' || f.type === 'youtubeList' ? (
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
  isGlobal = false,
  cancelHref,
}: {
  /** A CollectionDef, or a page global — both just need a slug and fields. */
  def: { slug: string; singular?: string; fields: FieldDef[] }
  doc?: Doc
  media?: MediaOption[]
  relations?: Record<string, RelationOption[]>
  isGlobal?: boolean
  cancelHref?: string
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
      <input type="hidden" name={isGlobal ? '__global' : '__collection'} value={def.slug} />
      {/* Tells the action which fields this form actually rendered, so an
          untouched field is never written as null. */}
      <input type="hidden" name="__fields" value={def.fields.map((f) => f.name).join(',')} />
      {!isGlobal && docId != null ? <input type="hidden" name="__id" value={String(docId)} /> : null}

      <Err>{state?.error}</Err>

      <div className="grid gap-5 sm:grid-cols-2">
        {main.map((f) => (
          <Field key={f.name} f={f} doc={doc} media={media} relations={relations} />
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
              <Field key={f.name} f={f} doc={doc} media={media} relations={relations} />
            ))}
          </div>
        </details>
      ))}

      <div className="flex items-center gap-2 border-t pt-5">
        <Button type="submit" disabled={pending}>
          {pending ? 'Saving…' : isGlobal || docId != null ? 'Save changes' : `Create ${def.singular}`}
        </Button>
        <Button variant="ghost" asChild>
          <Link href={cancelHref ?? `/studio/${def.slug}`}>Cancel</Link>
        </Button>
      </div>
    </form>
  )
}

export function DeleteButton({ collection, id }: { collection: string; id: string | number }) {
  return (
    <form action={deleteDoc}>
      <input type="hidden" name="__collection" value={collection} />
      <input type="hidden" name="__id" value={String(id)} />
      <Button
        type="submit"
        variant="destructive"
        size="sm"
        onClick={(e) => {
          if (!confirm('Delete this permanently?')) e.preventDefault()
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
    </form>
  )
}

export function LogoutButton({ email }: { email?: string }) {
  return (
    <form action={logout} className="flex items-center justify-between gap-2">
      <span className="text-muted-foreground truncate text-xs">{email}</span>
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
