"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import PageHeader from "@/components/shared/PageHeader";

// Haftalık takvim görünümü için temel yapılar
const HOURS = Array.from({ length: 12 }, (_, i) => i + 8); // 08:00 - 19:00
const DAYS = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"];

const mockEvents = [
  { id: "1", day: 0, hour: 9, duration: 1, title: "Ayşe Yılmaz", type: "TREATMENT", color: "bg-blue-500/20 border-blue-500/50 text-blue-300" },
  { id: "2", day: 0, hour: 11, duration: 1, title: "Mehmet Demir", type: "CHECKUP", color: "bg-green-500/20 border-green-500/50 text-green-300" },
  { id: "3", day: 1, hour: 10, duration: 2, title: "Zeynep Çelik", type: "SURGERY", color: "bg-red-500/20 border-red-500/50 text-red-300" },
  { id: "4", day: 2, hour: 14, duration: 1.5, title: "Can Özkan", type: "CLEANING", color: "bg-yellow-500/20 border-yellow-500/50 text-yellow-300" },
  { id: "5", day: 4, hour: 15, duration: 1, title: "Elif Kaya", type: "XRAY", color: "bg-purple-500/20 border-purple-500/50 text-purple-300" },
];

export default function CalendarPage() {
  const [currentWeek, setCurrentWeek] = useState("23 - 29 Ekim 2023");

  return (
    <div className="flex flex-col h-full bg-[#13151f] rounded-xl border border-white/5 overflow-hidden">
      <PageHeader
        title="Takvim Görünümü"
        breadcrumb={[
          { label: "Randevular", href: "/appointments" },
          { label: "Takvim" }
        ]}
        action={
          <div className="flex items-center gap-2">
            <Link href="/appointments" className={buttonVariants({ variant: "outline", className: "border-white/10 text-slate-300 hover:bg-white/5" })}>
              Liste Görünümü
            </Link>
            <Link href="/appointments/new" className={buttonVariants({ variant: "default", className: "bg-brand-500 hover:bg-brand-600 text-white" })}>
              <Plus className="mr-2 h-4 w-4" />
              Yeni Randevu
            </Link>
          </div>
        }
      />

      <div className="px-6 pb-4 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-4">
          <div className="flex items-center rounded-lg border border-white/10 bg-[#1a1d2a] p-1">
            <button className="rounded px-2 py-1 text-slate-400 hover:text-white hover:bg-white/5">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="px-3 text-[13px] font-medium text-slate-200">{currentWeek}</span>
            <button className="rounded px-2 py-1 text-slate-400 hover:text-white hover:bg-white/5">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white h-8">Bugün</Button>
        </div>
        <select className="rounded-lg border border-white/[0.08] bg-[#1a1d2a] px-3 py-1.5 text-[13px] text-slate-300 focus:border-brand-500 focus:outline-none">
          <option value="all">Tüm Doktorlar</option>
          <option value="dr-ali">Dr. Ali Yılmaz</option>
          <option value="dr-ayse">Dr. Ayşe Demir</option>
        </select>
      </div>

      <div className="flex-1 overflow-auto flex flex-col relative min-w-[800px]">
        {/* Header Row */}
        <div className="flex border-b border-white/5 sticky top-0 bg-[#13151f] z-10">
          <div className="w-16 shrink-0 border-r border-white/5" />
          {DAYS.map((day, i) => (
            <div key={day} className="flex-1 text-center py-3 border-r border-white/5 last:border-0">
              <span className="text-[13px] font-medium text-slate-300">{day}</span>
              <div className="text-[11px] text-slate-500 mt-0.5">{23 + i} Eki</div>
            </div>
          ))}
        </div>

        {/* Time Grid */}
        <div className="flex-1 relative bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSI2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48bGluZSB4MT0iMCIgeTE9IjYwIiB4Mj0iMTAwJSIgeTI9IjYwIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wMikiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')]">
          <div className="flex h-full">
            {/* Hour labels */}
            <div className="w-16 shrink-0 border-r border-white/5 bg-[#13151f]">
              {HOURS.map((h) => (
                <div key={h} className="h-[60px] text-right pr-2 pt-2">
                  <span className="text-[11px] text-slate-500">{h.toString().padStart(2, '0')}:00</span>
                </div>
              ))}
            </div>

            {/* Day columns */}
            {DAYS.map((day, dayIdx) => (
              <div key={day} className="flex-1 border-r border-white/5 last:border-0 relative">
                {/* Events for this day */}
                {mockEvents.filter(e => e.day === dayIdx).map(event => (
                  <Link 
                    href={`/appointments/${event.id}`}
                    key={event.id}
                    className={`absolute w-[calc(100%-8px)] left-1 rounded border p-2 overflow-hidden hover:opacity-90 transition-opacity ${event.color}`}
                    style={{
                      top: `${(event.hour - 8) * 60}px`,
                      height: `${event.duration * 60}px`
                    }}
                  >
                    <p className="text-[11px] font-semibold leading-tight truncate">{event.title}</p>
                    <p className="text-[10px] opacity-80 mt-0.5">{event.hour}:00 - {event.hour + event.duration}:00</p>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
