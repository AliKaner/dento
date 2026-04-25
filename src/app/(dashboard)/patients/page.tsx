"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, Filter, MoreHorizontal, User, Phone, Calendar, ArrowRight, Download } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PageHeader from "@/components/shared/PageHeader";
import DataTable from "@/components/shared/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";

// Mock Data
const patientsData = [
  { id: "1", name: "Burak Yılmaz", phone: "0532 111 2233", lastVisit: "Bugün", status: "Aktif", debt: "₺0" },
  { id: "2", name: "Fatma Şahin", phone: "0555 444 5566", lastVisit: "Dün", status: "Aktif", debt: "₺1.200" },
  { id: "3", name: "Mustafa Koç", phone: "0544 777 8899", lastVisit: "24 Eki 2023", status: "Pasif", debt: "₺0" },
  { id: "4", name: "Selin Aydın", phone: "0533 222 3344", lastVisit: "22 Eki 2023", status: "Aktif", debt: "₺450" },
  { id: "5", name: "Kemal Yıldız", phone: "0505 999 0011", lastVisit: "20 Eki 2023", status: "Aktif", debt: "₺0" },
  { id: "6", name: "Merve Çelik", phone: "0532 222 1100", lastVisit: "15 Eki 2023", status: "Aktif", debt: "₺2.800" },
  { id: "7", name: "Osman Demir", phone: "0544 333 4455", lastVisit: "10 Eki 2023", status: "Pasif", debt: "₺0" },
  { id: "8", name: "Ayşe Gül", phone: "0555 111 2233", lastVisit: "05 Eki 2023", status: "Aktif", debt: "₺150" },
];

export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const columns: ColumnDef<any>[] = [
    { 
      accessorKey: "name", 
      header: "Hasta Bilgisi",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-500/10 flex items-center justify-center text-brand-400 font-bold border border-brand-500/20 shadow-sm">
            {row.original.name[0]}
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-white tracking-tight">{row.original.name}</span>
            <span className="text-[11px] text-slate-500 flex items-center gap-1"><Phone className="w-2.5 h-2.5" /> {row.original.phone}</span>
          </div>
        </div>
      )
    },
    { 
      accessorKey: "lastVisit", 
      header: "Son Randevu",
      cell: ({ row }) => (
        <div className="flex items-center gap-2 text-slate-300">
          <Calendar className="w-3.5 h-3.5 text-slate-500" />
          <span>{row.original.lastVisit}</span>
        </div>
      )
    },
    { 
      accessorKey: "debt", 
      header: "Bakiye",
      cell: ({ row }) => (
        <span className={cn(
          "font-bold",
          row.original.debt !== "₺0" ? "text-rose-400" : "text-emerald-400"
        )}>
          {row.original.debt}
        </span>
      )
    },
    { 
      accessorKey: "status", 
      header: "Durum",
      cell: ({ row }) => (
        <span className={cn(
          "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
          row.original.status === "Aktif" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-slate-500/10 text-slate-400 border border-white/5"
        )}>
          {row.original.status}
        </span>
      )
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex justify-end gap-2">
          <Link 
            href={`/patients/${row.original.id}`} 
            className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "hover:bg-brand-500/10 hover:text-brand-400")}
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Button variant="ghost" size="icon" className="hover:bg-white/5">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <PageHeader
        title="Hasta Yönetimi"
        description="Klinik hasta kayıtlarını görüntüleyin ve yönetin."
        className="px-0 pt-0"
        action={
          <div className="flex gap-3">
            <Button variant="outline" className="glass border-white/5 text-slate-300">
              <Download className="w-4 h-4 mr-2" />
              Dışa Aktar
            </Button>
            <Link href="/patients/new" className={cn(buttonVariants({ variant: "default" }), "bg-brand-500 hover:bg-brand-600 text-white shadow-lg shadow-brand-500/20")}>
              <Plus className="w-4 h-4 mr-2" />
              Yeni Hasta
            </Link>
          </div>
        }
      />

      <div className="glass rounded-3xl p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <Input 
              placeholder="İsim, telefon veya protokol no ile ara..." 
              className="bg-black/20 border-white/[0.08] pl-10 h-11 rounded-xl focus:ring-brand-500/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="glass border-white/5 text-slate-300 h-11 rounded-xl">
              <Filter className="w-4 h-4 mr-2" />
              Filtrele
            </Button>
          </div>
        </div>

        <div className="rounded-2xl border border-white/[0.05] overflow-hidden">
          <DataTable columns={columns} data={patientsData} />
        </div>

        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-slate-500">Toplam 1.284 hastadan 8 tanesi gösteriliyor</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="glass border-white/5 text-slate-400 disabled:opacity-30" disabled>Geri</Button>
            <Button variant="outline" size="sm" className="glass border-white/5 text-slate-300">İleri</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
