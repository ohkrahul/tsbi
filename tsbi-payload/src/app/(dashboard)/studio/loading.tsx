/**
 * Shown while a studio page's data loads. Next uses the nearest loading.tsx as
 * a Suspense boundary, so this covers every page under /studio that doesn't
 * define its own — the sidebar stays put and only the content area swaps.
 */
export default function StudioLoading() {
  return (
    <div className="mx-auto max-w-6xl animate-pulse p-6 md:p-10" aria-busy="true" aria-label="Loading">
      <div className="bg-muted h-7 w-56 rounded-md" />
      <div className="bg-muted mt-3 h-4 w-40 rounded" />
      <div className="mt-8 space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-muted h-12 rounded-lg" />
        ))}
      </div>
    </div>
  )
}
