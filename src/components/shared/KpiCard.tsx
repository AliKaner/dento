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
        "glass rounded-3xl p-6 transition-all duration-300 group relative overflow-hidden h-full",
        href && "hover:bg-white/[0.05] hover:scale-[1.02] active:scale-95"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest truncate">{title}</p>
          {loading ? (
            <div className="mt-3 h-8 w-24 animate-pulse rounded-md bg-white/[0.05]" />
          ) : (
            <p className="mt-2 text-3xl font-bold tracking-tight text-white">
              {value}
            </p>
          )}
          {subtitle && (
            <p className="mt-1.5 text-[11px] text-slate-500 font-medium truncate">{subtitle}</p>
          )}
        </div>
        {icon && (
          <div
            className={cn(
              "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-lg transition-transform duration-300 group-hover:rotate-12",
              iconBg
            )}
          >
            <span className={cn("*:h-6 *:w-6", iconColor)}>{icon}</span>
          </div>
        )}
      </div>

      {delta && !loading && (
        <div className={cn(
          "absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/[0.05] border border-white/[0.1] shadow-lg backdrop-blur-md transition-all group-hover:scale-110 group-hover:bg-white/[0.08]", 
          deltaColor
        )}>
          <DeltaIcon className="h-3.5 w-3.5" />
          <span className="text-[11px] font-black tracking-tighter">{delta.value}</span>
        </div>
      )}
    </div>
  );

  if (href) {
    return <Link href={href} className="h-full block">{card}</Link>;
  }
  return card;
}
