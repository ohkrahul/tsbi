/** Skeleton shaped like the edit form, so the page doesn't jump when it lands. */
export function FormLoading() {
  return (
    <div className="mx-auto max-w-6xl animate-pulse p-6 md:p-10" aria-busy="true" aria-label="Loading">
      <div className="bg-muted h-4 w-24 rounded" />
      <div className="bg-muted mt-3 h-7 w-72 rounded-md" />
      <div className="mt-8 grid max-w-3xl gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <div className="bg-muted h-3.5 w-16 rounded" />
          <div className="bg-muted mt-2 h-9 rounded-md" />
        </div>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i}>
            <div className="bg-muted h-3.5 w-20 rounded" />
            <div className="bg-muted mt-2 h-9 rounded-md" />
          </div>
        ))}
        <div className="sm:col-span-2">
          <div className="bg-muted h-3.5 w-28 rounded" />
          <div className="bg-muted mt-2 h-24 rounded-md" />
        </div>
      </div>
      <div className="mt-8 flex gap-2 border-t pt-5">
        <div className="bg-muted h-9 w-32 rounded-md" />
        <div className="bg-muted h-9 w-20 rounded-md" />
      </div>
    </div>
  )
}
