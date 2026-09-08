'use client'

import Link from 'next/link'
import { RotateCcw, TriangleAlert } from 'lucide-react'
import { Button } from '@/components/ui/button'

/**
 * Anything that throws while rendering the studio lands here instead of on a
 * bare crash page. The sidebar stays, so a failure on one page never leaves
 * you stranded with no way back.
 */
export default function StudioError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto max-w-lg p-6 md:p-10">
      <div className="bg-card rounded-xl border p-6">
        <span className="bg-destructive/10 text-destructive grid size-10 place-items-center rounded-lg">
          <TriangleAlert className="size-5" />
        </span>
        <h1 className="mt-4 text-lg font-semibold tracking-tight">That didn’t work</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Nothing was lost — the page failed to load, not your content. Try again, and if it keeps
          happening the message below is what to report.
        </p>
        <p className="bg-muted text-muted-foreground mt-4 rounded-md p-3 font-mono text-xs break-words">
          {error.message || 'Unknown error'}
        </p>
        <div className="mt-5 flex gap-2">
          <Button onClick={reset}>
            <RotateCcw /> Try again
          </Button>
          <Button variant="outline" asChild>
            <Link href="/studio">Back to dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
