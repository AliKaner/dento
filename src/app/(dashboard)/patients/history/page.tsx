"use client";

import { History, Search, Filter, Calendar, User, ArrowRight, Clock, FileText, CheckCircle2 } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import DataTable from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import Link from "next/link";

const treatmentHistory = [
  { id: "1", patient: "Burak Yılmaz", date: "25.04.2024", treatment: "Muayene + Temizlik", doctor: "Dr. Ali Yılmaz", status: "COMPLETED" },
  { id: "2", patient: "Fatma Şahin", date: "24.04.2024", treatment: "Kompozit Dolgu", doctor: "Dr. Ali Yılmaz", status: "COMPLETED" },
  { id: "3", patient: "Mustafa Koç", date: "23.04.2024", treatment: "Kanal Tedavisi", doctor: "Dr. Ayşe Demir", status: "COMPLETED" },
  { id: "4", patient: "Selin Aydın", date: "22.04.2024", treatment: "Röntgen Çekimi", doctor: "Dr. Ali Yılmaz", status: "COMPLETED" },
  { id: "5", patient: "Kemal Yıldız", date: "20.04.2024", treatment: "Diş Çekimi", doctor: "Dr. Ayşe Demir", status: "COMPLETED" },
];

const columns: ColumnDef<any>[] = [
  { 
    accessorKey: "patient", 
    header: "Hasta",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 font-bold text-white">
        <div className="w-6 h-6 rounded-full bg-brand-500/10 flex items-center justify-center text-brand-400 text-[10px]">
          {row.original.patient[0]}
        </div>
        {row.original.patient}
      </div>
    )
  },
  { 
    accessorKey: "treatment", 
    header: "Yapılan İşlem",
    cell: ({ row }) => <span className="text-slate-200 font-medium">{row.original.treatment}</span>
  },
  { 
    accessorKey: "date", 
    header: "Tarih",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-slate-400 text-xs">
        <Calendar className="w-3 h-3" />
        {row.original.date}
      </div>
    )
  },
  { accessorKey: "doctor", header: "Hekim" },
  { 
    accessorKey: "status", 
    header: "Durum",
    cell: () => (
      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold flex items-center gap-1.5 w-fit">
        <CheckCircle2 className="w-3 h-3" />
        TAMAMLANDI
      </span>
    )
  },
  {
    id: "actions",
    cell: () => (
      <Link href="/patients/1" className="p-2 rounded-lg hover:bg-white/5 text-slate-500 hover:text-white transition-all">
        <ArrowRight className="w-4 h-4" />
      </Link>
    )
  }
];

export default function PatientsHistoryPage() {
  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-700">
      <PageHeader
        title="Genel Muayene Geçmişi"
        description="Kliniğinizde yapılan tüm tıbbi işlemlerin kronolojik listesi."
        className="px-0 pt-0"
      />

      <div className="glass rounded-3xl p-6 space-y-6 border-white/[0.05]">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <Input placeholder="Hasta, hekim veya işlem ara..." className="bg-black/20 border-white/[0.08] pl-10 h-11 rounded-xl text-sm" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="glass h-11 rounded-xl px-5 border-white/10 text-slate-400 hover:text-white font-bold text-xs uppercase tracking-widest">
              <Calendar className="w-4 h-4 mr-2" />
              Tarih Seç
            </Button>
            <Button variant="outline" className="glass h-11 rounded-xl px-5 border-white/10 text-slate-400 hover:text-white font-bold text-xs uppercase tracking-widest">
              <Filter className="w-4 h-4 mr-2" />
              Filtrele
            </Button>
          </div>
        </div>

        <div className="rounded-2xl border border-white/[0.05] overflow-hidden">
          <DataTable columns={columns} data={treatmentHistory} />
        </div>
      </div>
    </div>
  );
}
