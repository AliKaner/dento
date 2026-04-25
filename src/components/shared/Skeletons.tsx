import { cn } from "@/lib/utils";

function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-white/[0.05]",
        className
      )}
    />
  );
}

interface SkeletonTableProps {
  rows?: number;
  cols?: number;
  hasActions?: boolean;
}

export function SkeletonTable({
  rows = 5,
  cols = 4,
  hasActions = true,
}: SkeletonTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/[0.06]">
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-white/[0.06] bg-[#13151f] px-4 py-3">
        {Array.from({ length: cols }).map((_, i) => (
          <Shimmer key={i} className="h-3 flex-1" />
        ))}
        {hasActions && <Shimmer className="h-3 w-16" />}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <div
          key={rowIdx}
          className="flex items-center gap-4 border-b border-white/[0.04] bg-[#13151f] px-4 py-3.5 last:border-0"
        >
          {Array.from({ length: cols }).map((_, colIdx) => (
            <Shimmer
              key={colIdx}
              className={cn("h-3 flex-1", colIdx === 0 ? "max-w-[140px]" : "")}
            />
          ))}
          {hasActions && <Shimmer className="h-6 w-6 rounded-lg" />}
        </div>
      ))}
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-[#13151f] p-5">
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-2">
          <Shimmer className="h-3 w-28" />
          <Shimmer className="h-8 w-20" />
        </div>
        <Shimmer className="h-10 w-10 rounded-lg" />
      </div>
    </div>
  );
}

export function SkeletonKpiRow() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
