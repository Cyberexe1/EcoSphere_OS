export function Skeleton({ className = '' }) {
  return <div className={`animate-pulse bg-surface-container rounded ${className}`} />
}

export function SkeletonTable({ rows = 5, cols = 5 }) {
  return (
    <div className="w-full">
      <div className="flex gap-4 px-6 py-4 border-b border-outline-variant">
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} className="h-4 flex-1" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex gap-4 px-6 py-4 border-b border-outline-variant/30">
          {Array.from({ length: cols }).map((_, c) => (
            <Skeleton key={c} className="h-4 flex-1" />
          ))}
        </div>
      ))}
    </div>
  )
}

export function SkeletonCards({ count = 4, className = 'h-32' }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className={`rounded-xl ${className}`} />
      ))}
    </>
  )
}
