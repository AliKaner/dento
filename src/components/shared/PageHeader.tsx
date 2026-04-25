import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  breadcrumb?: Breadcrumb[];
  badge?: string;
  className?: string;
}

export default function PageHeader({
  title,
  description,
  action,
  breadcrumb,
  badge,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("flex items-start justify-between gap-4 px-6 pt-6 pb-4", className)}>
      <div className="min-w-0">
        {breadcrumb && breadcrumb.length > 0 && (
          <nav className="mb-2 flex items-center gap-1">
            {breadcrumb.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1">
                {i > 0 && (
                  <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate-600" />
                )}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="text-[12px] text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-[12px] text-slate-400">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <div className="flex items-center gap-2.5">
          <h1 className="text-[20px] font-semibold tracking-tight text-slate-100">
            {title}
          </h1>
          {badge && (
            <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[11px] text-slate-400">
              {badge}
            </span>
          )}
        </div>
        {description && (
          <p className="mt-0.5 text-[13px] text-slate-500">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
