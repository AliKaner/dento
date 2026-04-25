"use client";

import { BarChart2, PieChart, TrendingUp, Users, DollarSign, Calendar, Download, Filter, ArrowUpRight, Activity } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RePieChart, Pie, Cell } from "recharts";
import { CHART_COLORS, TOOLTIP_STYLE } from "@/lib/chartColors";
import { cn } from "@/lib/utils";
import NoSSR from "@/components/shared/NoSSR";

// Mock Data
const monthlyGrowth = [
  { name: "Oca", value: 400 },
  { name: "Şub", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Nis", value: 800 },
  { name: "May", value: 500 },
  { name: "Haz", value: 900 },
];

const treatmentDist = [
  { name: "Muayene", value: 45, color: "#3b82f6" },
  { name: "Dolgu", value: 25, color: "#a78bfa" },
  { name: "Kanal", value: 15, color: "#fbbf24" },
  { name: "Cerrahi", value: 10, color: "#f43f5e" },
  { name: "Diğer", value: 5, color: "#10b981" },
];

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-700">
      <PageHeader
        title="Genel Raporlar"
        description="Klinik performansınızı ve büyüme verilerinizi analiz edin."
        className="px-0 pt-0"
        action={
          <div className="flex gap-3">
            <Button variant="outline" className="glass border-white/5 text-slate-300">
              <Calendar className="w-4 h-4 mr-2" />
              Haziran 2024
            </Button>
            <Button className="bg-brand-500 hover:bg-brand-600 text-white shadow-lg shadow-brand-500/20 border-0">
              <Download className="w-4 h-4 mr-2" />
              PDF Raporu İndir
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="glass rounded-3xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <TrendingUp className="w-24 h-24 text-brand-400" />
          </div>
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2">Aylık Büyüme</p>
          <div className="flex items-end gap-3">
            <h2 className="text-3xl font-bold text-white tracking-tight">+24.5%</h2>
            <div className="flex items-center gap-1 text-emerald-400 text-xs font-bold mb-1">
              <ArrowUpRight className="w-3 h-3" />
              Önceki aya göre
            </div>
          </div>
          <div className="h-20 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyGrowth}>
                <Area type="monotone" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-3xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Users className="w-24 h-24 text-violet-400" />
          </div>
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2">Yeni Hastalar</p>
          <div className="flex items-end gap-3">
            <h2 className="text-3xl font-bold text-white tracking-tight">124</h2>
            <div className="flex items-center gap-1 text-emerald-400 text-xs font-bold mb-1">
              <ArrowUpRight className="w-3 h-3" />
              Hedef: 150
            </div>
          </div>
          <div className="w-full bg-white/5 rounded-full h-1.5 mt-6">
            <div className="bg-violet-500 h-1.5 rounded-full shadow-[0_0_10px_rgba(167,139,250,0.5)]" style={{ width: "82%" }} />
          </div>
        </div>

        <div className="glass rounded-3xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <DollarSign className="w-24 h-24 text-emerald-400" />
          </div>
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2">Kâr Oranı</p>
          <div className="flex items-end gap-3">
            <h2 className="text-3xl font-bold text-white tracking-tight">%42.8</h2>
            <div className="flex items-center gap-1 text-emerald-400 text-xs font-bold mb-1">
              <ArrowUpRight className="w-3 h-3" />
              +2.4 puan artış
            </div>
          </div>
          <div className="flex gap-2 mt-6">
            {[30, 45, 35, 60, 55, 70, 85].map((v, i) => (
              <div key={i} className="flex-1 bg-white/5 rounded-t-sm relative group/bar">
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-emerald-500/40 group-hover/bar:bg-emerald-500 transition-all rounded-t-sm" 
                  style={{ height: `${v}%` }} 
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass rounded-3xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-white">İşlem Dağılımı</h3>
            <Activity className="w-5 h-5 text-brand-400" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
            <div className="h-[250px] relative">
              <NoSSR>
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={treatmentDist}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {treatmentDist.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#12141c', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', color: '#fff' }} />
                  </RePieChart>
                </ResponsiveContainer>
              </NoSSR>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Toplam</p>
                <p className="text-xl font-bold text-white">842</p>
              </div>
            </div>
            <div className="space-y-4">
              {treatmentDist.map((t) => (
                <div key={t.name} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: t.color }} />
                    <span className="text-sm text-slate-400 group-hover:text-white transition-colors">{t.name}</span>
                  </div>
                  <span className="text-sm font-bold text-white">{t.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="glass rounded-3xl p-8 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-white">Hekim Karşılaştırması</h3>
            <Users className="w-5 h-5 text-violet-400" />
          </div>
          <div className="space-y-6 flex-1">
            {[
              { name: "Dr. Ali Yılmaz", patients: 324, revenue: "₺142k", perf: 92, color: "bg-brand-500" },
              { name: "Dr. Ayşe Demir", patients: 286, revenue: "₺128k", perf: 88, color: "bg-violet-500" },
              { name: "Dr. Mehmet Kaya", patients: 232, revenue: "₺98k", perf: 76, color: "bg-amber-500" },
            ].map((d) => (
              <div key={d.name} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-white">{d.name}</span>
                    <span className="text-[10px] text-slate-500">{d.patients} Hasta • {d.revenue} Gelir</span>
                  </div>
                  <span className="text-xs font-bold text-brand-400">{d.perf}/100</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                  <div className={cn("h-full rounded-full transition-all duration-1000", d.color)} style={{ width: `${d.perf}%` }} />
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="mt-8 glass border-white/10 text-white rounded-2xl h-12 font-bold hover:bg-white/5">
            Detaylı Performans Raporu
          </Button>
        </div>
      </div>
    </div>
  );
}
