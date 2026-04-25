"use client";

import { useState } from "react";
import { DollarSign, Search, Filter, Plus, MoreHorizontal, CheckCircle2, Calendar, CreditCard, Wallet, ArrowUpRight } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import DataTable from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import KpiCard from "@/components/shared/KpiCard";
import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";

// Mock Data
const payments = [
  { id: "PAY-001", patient: "Burak Yılmaz", date: "Bugün", amount: "₺450", method: "Kredi Kartı", status: "COMPLETED" },
  { id: "PAY-002", patient: "Fatma Şahin", date: "Bugün", amount: "₺1.200", method: "Nakit", status: "COMPLETED" },
  { id: "PAY-003", patient: "Mustafa Koç", date: "Dün", amount: "₺3.400", method: "Havale/EFT", status: "COMPLETED" },
  { id: "PAY-004", patient: "Selin Aydın", date: "24 Eki", amount: "₺450", method: "Kredi Kartı", status: "COMPLETED" },
  { id: "PAY-005", patient: "Kemal Yıldız", date: "23 Eki", amount: "₺2.100", method: "Kredi Kartı", status: "COMPLETED" },
];

const columns: ColumnDef<any>[] = [
  { accessorKey: "id", header: "İşlem No" },
  { 
    accessorKey: "patient", 
    header: "Hasta",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 font-bold text-white">
        <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-[10px]">
          {row.original.patient[0]}
        </div>
        {row.original.patient}
      </div>
    )
  },
  { accessorKey: "date", header: "Tarih" },
  { 
    accessorKey: "amount", 
    header: "Tutar",
    cell: ({ row }) => <span className="text-emerald-400 font-bold">{row.original.amount}</span>
  },
  { 
    accessorKey: "method", 
    header: "Ödeme Yöntemi",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-slate-400 text-xs">
        {row.original.method === "Kredi Kartı" && <CreditCard className="w-3 h-3" />}
        {row.original.method === "Nakit" && <Wallet className="w-3 h-3" />}
        {row.original.method === "Havale/EFT" && <ArrowUpRight className="w-3 h-3" />}
        {row.original.method}
      </div>
    )
  },
  { 
    accessorKey: "status", 
    header: "Durum",
    cell: ({ row }) => (
      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold flex items-center gap-1.5 w-fit">
        <CheckCircle2 className="w-3 h-3" />
        TAMAMLANDI
      </span>
    )
  },
  {
    id: "actions",
    cell: () => (
      <Button variant="ghost" size="icon" className="hover:bg-white/5">
        <MoreHorizontal className="w-4 h-4" />
      </Button>
    )
  }
];

export default function PaymentsPage() {
  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-700">
      <PageHeader
        title="Tahsilatlar"
        description="Klinik ödeme girişlerini ve makbuzlarını takip edin."
        className="px-0 pt-0"
        action={
          <Button className="bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 border-0 rounded-xl h-10 px-6 font-bold text-xs uppercase tracking-wider">
            <Plus className="w-4 h-4 mr-2" />
            Ödeme Al
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KpiCard
          title="Bugünkü Tahsilat"
          value="₺4.650"
          delta={{ value: "+₺1.2k", trend: "up" }}
          icon={<DollarSign />}
          iconColor="text-emerald-400"
          iconBg="bg-emerald-500/10"
        />
        <KpiCard
          title="Haftalık Toplam"
          value="₺32.400"
          icon={<CreditCard />}
          iconColor="text-brand-400"
          iconBg="bg-brand-500/10"
        />
        <KpiCard
          title="Bekleyen Tahsilat"
          value="₺12.800"
          icon={<Wallet />}
          iconColor="text-amber-400"
          iconBg="bg-amber-500/10"
        />
      </div>

      <div className="glass rounded-3xl p-6 space-y-6 border-white/[0.05]">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <Input placeholder="İşlem no veya hasta ara..." className="bg-black/20 border-white/[0.08] pl-10 h-11 rounded-xl text-sm" />
          </div>
          <Button variant="outline" className="glass h-11 rounded-xl px-5 border-white/10 text-slate-400 hover:text-white font-bold text-xs uppercase tracking-widest">
            <Filter className="w-4 h-4 mr-2" />
            Filtrele
          </Button>
        </div>

        <div className="rounded-2xl border border-white/[0.05] overflow-hidden">
          <DataTable columns={columns} data={payments} />
        </div>
      </div>
    </div>
  );
}
