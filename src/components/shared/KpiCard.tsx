import Link from "next/link";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  delta?: { value: string; trend: "up" | "down" | "neutral" };
  icon?: React.ReactNode;
  iconColor?: string;
  iconBg?: string;
  href?: string;
  loading?: boolean;
}

export default function KpiCard({
  title,
  value,
  subtitle,
  delta,
  icon,
  iconColor = "text-blue-400",
  iconBg = "bg-[#1e3a5f]",
  href,
  loading,
}: KpiCardProps) {
  const DeltaIcon =
    delta?.trend === "up"
      ? TrendingUp
      : delta?.trend === "down"
      ? TrendingDown
      : Minus;

  const deltaColor =
    delta?.trend === "up"
      ? "text-[#6ee7b7]"
      : delta?.trend === "down"
      ? "text-[#fca5a5]"
      : "text-slate-500";

  const card = (
    <div
      className={cn(
        "rounded-xl border border-white/[0.06] bg-[#13151f] p-5 transition-colors",
        href && "hover:border-white/[0.1] hover:bg-[#1a1d2a]"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[12px] font-medium text-slate-500 truncate">{title}</p>
          {loading ? (
            <div className="mt-2 h-8 w-20 animate-pulse rounded-md bg-white/[0.05]" />
          ) : (
            <p className="mt-1 text-[28px] font-semibold leading-none tracking-tight text-slate-100">
              {value}
            </p>
          )}
          {subtitle && (
            <p className="mt-1 text-[12px] text-slate-600 truncate">{subtitle}</p>
          )}
          {delta && !loading && (
            <div className={cn("mt-2 flex items-center gap-1", deltaColor)}>
              <DeltaIcon className="h-3 w-3" />
              <span className="text-[11px] font-medium">{delta.value}</span>
            </div>
          )}
        </div>
        {icon && (
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
              iconBg
            )}
          >
            <span className={cn("*:h-5 *:w-5", iconColor)}>{icon}</span>
          </div>
        )}
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{card}</Link>;
  }
  return card;
}
