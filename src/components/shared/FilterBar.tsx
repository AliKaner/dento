"use client";

import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchConfig {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

type FilterConfig = {
  key: string;
  label: string;
  type: "select";
  options: { label: string; value: string }[];
  value: string;
  onChange: (v: string) => void;
};

interface FilterBarProps {
  search?: SearchConfig;
  filters?: FilterConfig[];
  actions?: React.ReactNode;
  className?: string;
}

export default function FilterBar({
  search,
  filters,
  actions,
  className,
}: FilterBarProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2 px-6 pb-3", className)}>
      {search && (
        <div className="relative flex-1 min-w-[180px] max-w-xs">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-600" />
          <input
            type="text"
            value={search.value}
            onChange={(e) => search.onChange(e.target.value)}
            placeholder={search.placeholder ?? "Ara..."}
            className="w-full rounded-lg border border-white/[0.08] bg-[#1a1d2a] pl-8 pr-3 py-1.5 text-[13px] text-slate-200 placeholder:text-slate-600 focus:border-brand-500 focus:outline-none"
          />
        </div>
      )}

      {filters?.map((filter) => (
        <select
          key={filter.key}
          value={filter.value}
          onChange={(e) => filter.onChange(e.target.value)}
          className="rounded-lg border border-white/[0.08] bg-[#1a1d2a] px-3 py-1.5 text-[13px] text-slate-300 focus:border-brand-500 focus:outline-none"
        >
          <option value="">{filter.label}</option>
          {filter.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ))}

      {actions && <div className="ml-auto">{actions}</div>}
    </div>
  );
}
