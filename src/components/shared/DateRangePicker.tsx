"use client";

import { useState } from "react";
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subMonths, startOfYear, endOfYear } from "date-fns";
import { tr } from "date-fns/locale";
import { cn } from "@/lib/utils";

export interface DateRange {
  from?: Date;
  to?: Date;
}

const PRESETS = [
  { label: "Bugün",     getRange: () => ({ from: new Date(), to: new Date() }) },
  { label: "Bu Hafta",  getRange: () => ({ from: startOfWeek(new Date(), { weekStartsOn: 1 }), to: endOfWeek(new Date(), { weekStartsOn: 1 }) }) },
  { label: "Bu Ay",     getRange: () => ({ from: startOfMonth(new Date()), to: endOfMonth(new Date()) }) },
  { label: "Son 3 Ay",  getRange: () => ({ from: startOfMonth(subMonths(new Date(), 2)), to: endOfMonth(new Date()) }) },
  { label: "Bu Yıl",    getRange: () => ({ from: startOfYear(new Date()), to: endOfYear(new Date()) }) },
];

interface DateRangePickerProps {
  value?: DateRange;
  onChange?: (range: DateRange) => void;
  placeholder?: string;
  className?: string;
}

export default function DateRangePicker({
  value,
  onChange,
  placeholder = "Tarih aralığı seç",
  className,
}: DateRangePickerProps) {
  const [open, setOpen] = useState(false);

  const label =
    value?.from && value?.to
      ? `${format(value.from, "dd MMM", { locale: tr })} – ${format(value.to, "dd MMM yyyy", { locale: tr })}`
      : value?.from
      ? format(value.from, "dd MMM yyyy", { locale: tr })
      : placeholder;

  return (
    <div className={cn("relative", className)}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-[#1a1d2a] px-3 py-1.5 text-[13px] text-slate-300 hover:border-white/[0.14] transition-colors"
      >
        <CalendarIcon className="h-3.5 w-3.5 text-slate-500" />
        <span className={cn(!value?.from && "text-slate-600")}>{label}</span>
        <ChevronDown className="h-3.5 w-3.5 text-slate-600" />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 w-48 rounded-xl border border-white/[0.08] bg-[#1a1d2a] py-1 shadow-xl">
          {PRESETS.map((preset) => (
            <button
              key={preset.label}
              onClick={() => {
                onChange?.(preset.getRange());
                setOpen(false);
              }}
              className="w-full px-3 py-1.5 text-left text-[13px] text-slate-300 hover:bg-white/[0.05] transition-colors"
            >
              {preset.label}
            </button>
          ))}
          <div className="my-1 border-t border-white/[0.06]" />
          <button
            onClick={() => {
              onChange?.({});
              setOpen(false);
            }}
            className="w-full px-3 py-1.5 text-left text-[12px] text-slate-500 hover:bg-white/[0.05] transition-colors"
          >
            Temizle
          </button>
        </div>
      )}
    </div>
  );
}
