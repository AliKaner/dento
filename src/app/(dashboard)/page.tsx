"use client";

import Link from "next/link";
import { Calendar, CreditCard, Users, AlertTriangle, Plus, ArrowRight } from "lucide-react";
import KpiCard from "@/components/shared/KpiCard";
import ChartCard from "@/components/shared/ChartCard";
import StatusBadge from "@/components/shared/StatusBadge";
import DataTable from "@/components/shared/DataTable";
import PageHeader from "@/components/shared/PageHeader";
import { Button, buttonVariants } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { CHART_COLORS, TOOLTIP_STYLE } from "@/lib/chartColors";
import { ColumnDef } from "@tanstack/react-table";

// Mock Data
const revenueData = [
  { name: "Pzt", total: 15000 },
  { name: "Sal", total: 22000 },
  { name: "Çar", total: 18000 },
  { name: "Per", total: 24000 },
  { name: "Cum", total: 28000 },
  { name: "Cmt", total: 32000 },
  { name: "Paz", total: 12000 },
];

const todayAppointments = [
  { id: 1, time: "09:00", patient: "Ayşe Yılmaz", doctor: "Dr. Ali", status: "CONFIRMED" },
  { id: 2, time: "10:30", patient: "Mehmet Demir", doctor: "Dr. Ali", status: "IN_PROGRESS" },
  { id: 3, time: "11:45", patient: "Zeynep Çelik", doctor: "Dr. Ayşe", status: "SCHEDULED" },
  { id: 4, time: "14:00", patient: "Can Özkan", doctor: "Dr. Ali", status: "CANCELLED" },
  { id: 5, time: "15:30", patient: "Elif Kaya", doctor: "Dr. Ayşe", status: "COMPLETED" },
];

const recentPatients = [
  { id: "1", name: "Burak Yılmaz", phone: "0532 111 2233", date: "Bugün", lastVisit: "-" },
  { id: "2", name: "Fatma Şahin", phone: "0555 444 5566", date: "Dün", lastVisit: "-" },
  { id: "3", name: "Mustafa Koç", phone: "0544 777 8899", date: "24 Eki 2023", lastVisit: "26 Eki 2023" },
  { id: "4", name: "Selin Aydın", phone: "0533 222 3344", date: "22 Eki 2023", lastVisit: "22 Eki 2023" },
  { id: "5", name: "Kemal Yıldız", phone: "0505 999 0011", date: "20 Eki 2023", lastVisit: "15 Kas 2023" },
];

const patientColumns: ColumnDef<any>[] = [
  { accessorKey: "name", header: "Ad Soyad" },
  { accessorKey: "phone", header: "Telefon" },
  { accessorKey: "date", header: "Kayıt Tarihi" },
  { accessorKey: "lastVisit", header: "Son Randevu" },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Klinik Özeti"
        description="Günlük hasta, randevu ve finansal durumunuzun genel görünümü."
        className="px-0 pt-0 pb-2"
        action={
          <div className="flex gap-2">
            <Link href="/appointments/calendar" className={buttonVariants({ variant: "outline", className: "border-white/10 text-slate-300 hover:bg-white/5" })}>
              Takvim
            </Link>
            <Link href="/appointments/new" className={buttonVariants({ variant: "default", className: "bg-brand-500 hover:bg-brand-600 text-white" })}>
              <Plus className="mr-2 h-4 w-4" />
              Yeni Randevu
            </Link>
          </div>
        }
      />

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Bugünkü Randevular"
          value={12}
          delta={{ value: "+2", trend: "up" }}
          icon={<Calendar className="h-4 w-4" />}
          iconColor="text-[#60a5fa]"
          iconBg="bg-[#1e3a5f]"
          href="/appointments"
        />
        <KpiCard
          title="Bekleyen Ödemeler"
          value="₺14,500"
          delta={{ value: "-₺2k", trend: "down" }}
          icon={<CreditCard className="h-4 w-4" />}
          iconColor="text-[#fbbf24]"
          iconBg="bg-[#3d2c0a]"
          href="/finance"
        />
        <KpiCard
          title="Toplam Aktif Hasta"
          value="1,284"
          delta={{ value: "+12", trend: "up" }}
          icon={<Users className="h-4 w-4" />}
          iconColor="text-[#a78bfa]"
          iconBg="bg-[#2e1f5e]"
          href="/patients"
        />
        <KpiCard
          title="Kritik Stok Uyarısı"
          value={3}
          subtitle="Malzeme azalıyor"
          delta={{ value: "+1", trend: "down" }}
          icon={<AlertTriangle className="h-4 w-4" />}
          iconColor="text-[#f87171]"
          iconBg="bg-[#3b1212]"
          href="/inventory"
        />
      </div>

      {/* Charts & Lists */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-white/5 bg-[#13151f] p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-white">Bugünün Randevuları</h3>
            <Link href="/appointments" className="flex items-center text-[13px] text-brand-400 hover:text-brand-300">
              Tümünü Gör
              <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="space-y-4">
            {todayAppointments.map((appt) => (
              <div key={appt.id} className="flex items-center justify-between border-b border-white/5 pb-3 last:border-0 last:pb-0">
                <div>
                  <p className="font-medium text-white">{appt.patient}</p>
                  <p className="text-sm text-slate-400">{appt.time} • {appt.doctor}</p>
                </div>
                <StatusBadge status={appt.status} />
              </div>
            ))}
          </div>
        </div>

        <ChartCard title="Son 7 Gün Gelir" description="Günlük fatura toplamları">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dx={-10} tickFormatter={(value) => `₺${value/1000}k`} />
              <Tooltip 
                cursor={{ fill: 'rgba(255,255,255,0.05)' }} 
                contentStyle={TOOLTIP_STYLE}
                formatter={(value: any) => [`₺${value.toLocaleString()}`, "Gelir"]}
              />
              <Bar dataKey="total" fill={CHART_COLORS.primary} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-white/5 bg-[#13151f] p-5 shadow-sm overflow-hidden">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold text-white">Son Eklenen Hastalar</h3>
          <Link href="/patients" className="flex items-center text-[13px] text-brand-400 hover:text-brand-300">
            Tüm Hastalar
            <ArrowRight className="ml-1 h-3.5 w-3.5" />
          </Link>
        </div>
        <DataTable columns={patientColumns} data={recentPatients} />
      </div>
    </div>
  );
}
