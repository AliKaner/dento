"use client";

import { useState, useEffect, useRef } from "react";
import { Search, User, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface PatientOption {
  id: string;
  name: string;
  phone?: string;
  birthDate?: string;
}

interface PatientComboboxProps {
  value?: string;
  onChange: (id: string, patient?: PatientOption) => void;
  placeholder?: string;
  className?: string;
}

export default function PatientCombobox({
  value,
  onChange,
  placeholder = "Hasta ara...",
  className,
}: PatientComboboxProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<PatientOption[]>([]);
  const [selected, setSelected] = useState<PatientOption | null>(null);
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (query.length < 3) { setOptions([]); return; }
    setLoading(true);
    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(`/api/patients/search?q=${encodeURIComponent(query)}`);
        if (res.ok) setOptions(await res.json());
      } catch {}
      setLoading(false);
    }, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  const handleSelect = (patient: PatientOption) => {
    setSelected(patient);
    onChange(patient.id, patient);
    setOpen(false);
    setQuery("");
  };

  const handleClear = () => {
    setSelected(null);
    onChange("");
    setQuery("");
  };

  if (selected) {
    return (
      <div className={cn("flex items-center gap-2 rounded-lg border border-white/[0.08] bg-[#1a1d2a] px-3 py-2", className)}>
        <User className="h-3.5 w-3.5 shrink-0 text-slate-500" />
        <div className="flex-1 min-w-0">
          <p className="text-[13px] text-slate-200 truncate">{selected.name}</p>
          {selected.phone && <p className="text-[11px] text-slate-500">{selected.phone}</p>}
        </div>
        <button onClick={handleClear} className="text-slate-500 hover:text-slate-300">
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div ref={ref} className={cn("relative", className)}>
      <div className="relative">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-600" />
        <input
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-white/[0.08] bg-[#1a1d2a] pl-8 pr-3 py-2 text-[13px] text-slate-200 placeholder:text-slate-600 focus:border-brand-500 focus:outline-none"
        />
      </div>

      {open && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 rounded-xl border border-white/[0.08] bg-[#1a1d2a] py-1 shadow-xl">
          {loading && (
            <p className="px-3 py-2 text-[12px] text-slate-500">Aranıyor...</p>
          )}
          {!loading && query.length >= 3 && options.length === 0 && (
            <p className="px-3 py-2 text-[12px] text-slate-500">Sonuç bulunamadı</p>
          )}
          {!loading && query.length < 3 && (
            <p className="px-3 py-2 text-[12px] text-slate-600">En az 3 karakter girin</p>
          )}
          {options.map((p) => (
            <button
              key={p.id}
              onClick={() => handleSelect(p)}
              className="flex w-full items-center gap-2.5 px-3 py-2 hover:bg-white/[0.05] transition-colors"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2e1f5e] text-[11px] font-medium text-violet-300">
                {p.name[0]}
              </div>
              <div className="min-w-0 text-left">
                <p className="text-[13px] text-slate-200 truncate">{p.name}</p>
                {p.phone && <p className="text-[11px] text-slate-500">{p.phone}</p>}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
