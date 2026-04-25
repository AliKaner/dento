"use client";

import { useState } from "react";
import { AlertTriangle, Info, CheckCircle, XCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

type AlertVariant = "info" | "warning" | "error" | "success";

const VARIANT_STYLES: Record<
  AlertVariant,
  { bg: string; border: string; icon: string; Icon: React.ElementType }
> = {
  info:    { bg: "bg-[#0c2340]",  border: "border-[#1e4a7a]", icon: "text-[#38bdf8]", Icon: Info },
  warning: { bg: "bg-[#3d2c0a]",  border: "border-[#6b4a12]", icon: "text-[#fbbf24]", Icon: AlertTriangle },
  error:   { bg: "bg-[#3b1212]",  border: "border-[#6b2020]", icon: "text-[#fca5a5]", Icon: XCircle },
  success: { bg: "bg-[#0a2e1a]",  border: "border-[#1a5a30]", icon: "text-[#6ee7b7]", Icon: CheckCircle },
};

interface AlertBannerProps {
  variant?: AlertVariant;
  title: string;
  description?: string;
  action?: React.ReactNode;
  dismissible?: boolean;
  className?: string;
}

export default function AlertBanner({
  variant = "info",
  title,
  description,
  action,
  dismissible,
  className,
}: AlertBannerProps) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  const { bg, border, icon, Icon } = VARIANT_STYLES[variant];

  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-xl border px-4 py-3",
        bg,
        border,
        className
      )}
    >
      <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", icon)} />
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-medium text-slate-200">{title}</p>
        {description && (
          <p className="mt-0.5 text-[12px] text-slate-400">{description}</p>
        )}
        {action && <div className="mt-2">{action}</div>}
      </div>
      {dismissible && (
        <button
          onClick={() => setDismissed(true)}
          className="shrink-0 text-slate-500 hover:text-slate-300 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
