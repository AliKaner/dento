"use client";

import { Calendar, CreditCard, Users, AlertTriangle, Plus, ArrowRight, Activity, TrendingUp, Clock, FileText } from "lucide-react";
import Link from "next/link";
import KpiCard from "@/components/shared/KpiCard";
import ChartCard from "@/components/shared/ChartCard";
import StatusBadge from "@/components/shared/StatusBadge";
import DataTable from "@/components/shared/DataTable";
import PageHeader from "@/components/shared/PageHeader";
import { buttonVariants } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { CHART_COLORS, TOOLTIP_STYLE } from "@/lib/chartColors";
import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";

// Mock Data
const revenueData = [
  { name: "Pzt", total: 15000, patients: 12 },
  { name: "Sal", total: 22000, patients: 18 },
  { name: "Çar", total: 18000, patients: 15 },
  { name: "Per", total: 24000, patients: 20 },
  { name: "Cum", total: 28000, patients: 22 },
  { name: "Cmt", total: 32000, patients: 25 },
  { name: "Paz", total: 12000, patients: 10 },
];

const todayAppointments = [
  { id: 1, time: "09:00", patient: "Ayşe Yılmaz", doctor: "Dr. Ali", status: "CONFIRMED", type: "Muayene" },
  { id: 2, time: "10:30", patient: "Mehmet Demir", doctor: "Dr. Ali", status: "IN_PROGRESS", type: "Dolgu" },
  { id: 3, time: "11:45", patient: "Zeynep Çelik", doctor: "Dr. Ayşe", status: "SCHEDULED", type: "Temizlik" },
  { id: 4, time: "14:00", patient: "Can Özkan", doctor: "Dr. Ali", status: "CANCELLED", type: "Röntgen" },
  { id: 5, time: "15:30", patient: "Elif Kaya", doctor: "Dr. Ayşe", status: "COMPLETED", type: "Kontrol" },
];

const recentPatients = [
  { id: "1", name: "Burak Yılmaz", phone: "0532 111 2233", date: "Bugün", lastVisit: "09:00", status: "Aktif" },
  { id: "2", name: "Fatma Şahin", phone: "0555 444 5566", date: "Dün", lastVisit: "14:20", status: "Aktif" },
  { id: "3", name: "Mustafa Koç", phone: "0544 777 8899", date: "24 Eki 2023", lastVisit: "11:00", status: "Pasif" },
  { id: "4", name: "Selin Aydın", phone: "0533 222 3344", date: "22 Eki 2023", lastVisit: "16:45", status: "Aktif" },
];

const patientColumns: ColumnDef<any>[] = [
  { 
    accessorKey: "name", 
    header: "Hasta Bilgisi",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-brand-500/10 flex items-center justify-center text-brand-400 text-xs font-bold">
          {row.original.name[0]}
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-white">{row.original.name}</span>
          <span className="text-[11px] text-slate-500">{row.original.phone}</span>
        </div>
      </div>
    )
  },
  { accessorKey: "date", header: "Kayıt Tarihi" },
  { accessorKey: "lastVisit", header: "Son İşlem" },
  { 
    accessorKey: "status", 
    header: "Durum",
    cell: ({ row }) => (
      <span className={cn(
        "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
        row.original.status === "Aktif" ? "bg-emerald-500/10 text-emerald-400" : "bg-slate-500/10 text-slate-400"
      )}>
        {row.original.status}
      </span>
    )
  },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Klinik Özeti</h1>
          <p className="text-slate-400 mt-1 text-sm">Hoş geldiniz, Dr. Kaya. Bugün 12 randevunuz bulunuyor.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/appointments/calendar" className={cn(buttonVariants({ variant: "outline" }), "glass border-white/5 text-slate-300")}>
            <Calendar className="w-4 h-4 mr-2" />
            Takvim
          </Link>
          <Link href="/appointments/new" className={cn(buttonVariants({ variant: "default" }), "bg-brand-500 hover:bg-brand-600 text-white shadow-lg shadow-brand-500/20")}>
            <Plus className="w-4 h-4 mr-2" />
            Yeni Randevu
          </Link>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Bugünkü Randevular"
          value={12}
          delta={{ value: "+2", trend: "up" }}
          icon={<Calendar />}
          iconColor="text-brand-400"
          iconBg="bg-brand-500/10"
          href="/appointments"
        />
        <KpiCard
          title="Bekleyen Ödemeler"
          value="₺14.500"
          delta={{ value: "-₺2k", trend: "down" }}
          icon={<CreditCard />}
          iconColor="text-amber-400"
          iconBg="bg-amber-500/10"
          href="/finance"
        />
        <KpiCard
          title="Aktif Hastalar"
          value="1.284"
          delta={{ value: "+12", trend: "up" }}
          icon={<Users />}
          iconColor="text-violet-400"
          iconBg="bg-violet-500/10"
          href="/patients"
        />
        <KpiCard
          title="Stok Durumu"
          value={3}
          subtitle="Kritik seviye"
          delta={{ value: "+1", trend: "down" }}
          icon={<AlertTriangle />}
          iconColor="text-rose-400"
          iconBg="bg-rose-500/10"
          href="/inventory"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts Section */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="glass rounded-3xl p-6 relative overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-white">Gelir Analizi</h3>
                <p className="text-xs text-slate-500">Son 7 günlük performans grafiği</p>
              </div>
              <div className="flex gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <TrendingUp className="w-3 h-3 text-emerald-400" />
                  <span className="text-[10px] font-bold text-emerald-400">+14%</span>
                </div>
              </div>
            </div>
            
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 12 }} 
                    dy={10} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 12 }} 
                    tickFormatter={(value) => `₺${value/1000}k`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#12141c', 
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '12px',
                      color: '#fff'
                    }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="total" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorTotal)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass rounded-3xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">Son Eklenen Hastalar</h3>
              <Link href="/patients" className="text-xs text-brand-400 hover:text-brand-300 font-medium flex items-center gap-1">
                Tümünü Gör <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <DataTable columns={patientColumns} data={recentPatients} />
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="flex flex-col gap-6">
          <div className="glass rounded-3xl p-6 flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">Bugünün Programı</h3>
              <Activity className="w-4 h-4 text-brand-400" />
            </div>
            
            <div className="space-y-4">
              {todayAppointments.map((appt) => (
                <div key={appt.id} className="flex gap-4 p-3 rounded-2xl hover:bg-white/[0.03] transition-colors border border-transparent hover:border-white/[0.05] group">
                  <div className="flex flex-col items-center justify-center min-w-[60px] py-1 rounded-xl bg-surface-raised border border-white/[0.05]">
                    <span className="text-xs font-bold text-white">{appt.time}</span>
                    <Clock className="w-3 h-3 text-slate-500 mt-1" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-semibold text-white truncate">{appt.patient}</p>
                      <StatusBadge status={appt.status} />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-slate-500">{appt.type}</span>
                      <span className="text-[11px] text-slate-700">•</span>
                      <span className="text-[11px] text-slate-500">{appt.doctor}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/appointments" className="mt-6 w-full py-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] text-slate-400 hover:text-white text-xs font-bold text-center transition-all border border-white/[0.05]">
              Programın Tamamını Gör
            </Link>
          </div>

          <div className="glass rounded-3xl p-6 bg-gradient-to-br from-brand-600/20 to-transparent border-brand-500/20">
            <h3 className="text-white font-bold mb-2">Hızlı Muayene</h3>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">Hastanın TC Kimlik no veya dosya numarası ile hemen muayene başlatın.</p>
            <div className="flex gap-2">
              <input type="text" placeholder="Hasta ID / TC..." className="flex-1 bg-black/20 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500/50" />
              <button className="bg-brand-500 hover:bg-brand-600 text-white rounded-xl px-3 py-2 text-xs font-bold transition-all shadow-lg shadow-brand-500/20">
                Başlat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
