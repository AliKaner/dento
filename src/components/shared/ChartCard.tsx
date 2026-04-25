import { cn } from "@/lib/utils";
import { SkeletonCard } from "./Skeletons";

interface ChartCardProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  loading?: boolean;
  height?: number;
  className?: string;
}

export default function ChartCard({
  title,
  description,
  action,
  children,
  loading,
  className,
}: ChartCardProps) {
  if (loading) return <SkeletonCard />;

  return (
    <div
      className={cn(
        "rounded-xl border border-white/[0.06] bg-[#13151f] p-5",
        className
      )}
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-[13px] font-semibold text-slate-200">{title}</h3>
          {description && (
            <p className="mt-0.5 text-[12px] text-slate-500">{description}</p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      {children}
    </div>
  );
}
