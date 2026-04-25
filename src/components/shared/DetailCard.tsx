import { cn } from "@/lib/utils";

interface DetailCardProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export function DetailCard({
  title,
  icon,
  children,
  action,
  className,
}: DetailCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-white/[0.06] bg-[#13151f]",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-white/[0.05] px-5 py-3.5">
        <div className="flex items-center gap-2">
          {icon && (
            <span className="text-slate-500 *:h-4 *:w-4">{icon}</span>
          )}
          <h3 className="text-[13px] font-semibold text-slate-300">{title}</h3>
        </div>
        {action && <div>{action}</div>}
      </div>
      <div className="divide-y divide-white/[0.04] px-5">{children}</div>
    </div>
  );
}

interface DetailRowProps {
  label: string;
  value: React.ReactNode;
  fullWidth?: boolean;
}

export function DetailRow({ label, value, fullWidth }: DetailRowProps) {
  if (fullWidth) {
    return (
      <div className="py-3">
        <p className="mb-1 text-[11px] text-slate-600">{label}</p>
        <div className="text-[13px] text-slate-200">{value}</div>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-between gap-4 py-2.5">
      <p className="text-[12px] text-slate-500">{label}</p>
      <div className="text-right text-[13px] text-slate-200">{value}</div>
    </div>
  );
}
