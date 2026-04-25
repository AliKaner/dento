"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  collapsible?: boolean;
  className?: string;
}

export default function FormSection({
  title,
  description,
  children,
  collapsible,
  className,
}: FormSectionProps) {
  const [open, setOpen] = useState(true);

  return (
    <div className={cn("rounded-xl border border-white/[0.06] bg-[#13151f]", className)}>
      <div
        className={cn(
          "flex items-center justify-between px-5 py-4",
          collapsible && "cursor-pointer select-none"
        )}
        onClick={collapsible ? () => setOpen((v) => !v) : undefined}
      >
        <div>
          <h3 className="text-[14px] font-semibold text-slate-200">{title}</h3>
          {description && (
            <p className="mt-0.5 text-[12px] text-slate-500">{description}</p>
          )}
        </div>
        {collapsible && (
          <ChevronDown
            className={cn(
              "h-4 w-4 text-slate-500 transition-transform duration-200",
              open && "rotate-180"
            )}
          />
        )}
      </div>
      {(!collapsible || open) && (
        <div className="border-t border-white/[0.05] px-5 pb-5 pt-4">
          {children}
        </div>
      )}
    </div>
  );
}
