"use client";

import { Users, Search, Filter, Plus, MoreHorizontal, Phone, Mail, Globe, Package, ArrowUpRight, Building2, MapPin } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import DataTable from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import KpiCard from "@/components/shared/KpiCard";
import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";

// Mock Data
const suppliers = [
  { id: "1", name: "DentaMed Tıbbi Cihazlar", contact: "Ali Demir", phone: "0212 444 55 66", category: "Genel Malzeme", rating: 4.8, lastOrder: "12 Mar 2024" },
  { id: "2", name: "Modern Dental Depo", contact: "Ayşe Ak", phone: "0216 333 44 55", category: "İmplant/Cerrahi", rating: 4.5, lastOrder: "05 Nis 2024" },
  { id: "3", name: "Elite Laboratuvar", contact: "Mehmet Can", phone: "0212 222 11 00", category: "Protez", rating: 4.9, lastOrder: "18 Nis 2024" },
  { id: "4", name: "Hijyen Market", contact: "Selin Yılmaz", phone: "0850 111 22 33", category: "Sarf/Temizlik", rating: 4.2, lastOrder: "20 Nis 2024" },
];

const columns: ColumnDef<any>[] = [
  { 
    accessorKey: "name", 
    header: "Tedarikçi / Firma",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-400 border border-brand-500/20">
          <Building2 className="w-5 h-5" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-white tracking-tight">{row.original.name}</span>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider">{row.original.category}</span>
        </div>
      </div>
    )
  },
  { 
    accessorKey: "contact", 
    header: "İlgili Kişi",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-sm text-slate-200">{row.original.contact}</span>
        <span className="text-[11px] text-slate-500">{row.original.phone}</span>
      </div>
    )
  },
  { 
    accessorKey: "rating", 
    header: "Puan",
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5">
        <div className="flex items-center gap-0.5">
          <span className="text-sm font-bold text-amber-400">{row.original.rating}</span>
          <span className="text-amber-400">★</span>
        </div>
        <div className="w-16 bg-white/5 h-1 rounded-full overflow-hidden">
          <div className="bg-amber-400 h-full" style={{ width: `${(row.original.rating / 5) * 100}%` }} />
        </div>
      </div>
    )
  },
  { 
    accessorKey: "lastOrder", 
    header: "Son Sipariş" 
  },
  {
    id: "actions",
    cell: () => (
      <div className="flex justify-end gap-2">
        <Button variant="ghost" size="sm" className="h-8 px-3 text-brand-400 hover:bg-brand-500/10">
          Yeni Sipariş
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/5 text-slate-500">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>
    )
  }
];

export default function SuppliersPage() {
  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-700">
      <PageHeader
        title="Tedarikçi Yönetimi"
        description="Birlikte çalıştığınız tıbbi depoları ve laboratuvarları yönetin."
        className="px-0 pt-0"
        action={
          <Button className="bg-brand-500 hover:bg-brand-600 text-white shadow-lg shadow-brand-500/20 border-0 rounded-xl h-10 px-6 font-bold text-xs uppercase tracking-wider">
            <Plus className="w-4 h-4 mr-2" />
            Yeni Tedarikçi
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KpiCard
          title="Aktif Tedarikçi"
          value={24}
          icon={<Users />}
          iconColor="text-brand-400"
          iconBg="bg-brand-500/10"
        />
        <KpiCard
          title="Aylık Alım"
          value="₺45.200"
          delta={{ value: "+8%", trend: "up" }}
          icon={<Package />}
          iconColor="text-violet-400"
          iconBg="bg-violet-500/10"
        />
        <KpiCard
          title="Bekleyen Sipariş"
          value={4}
          icon={<ArrowUpRight />}
          iconColor="text-emerald-400"
          iconBg="bg-emerald-500/10"
        />
      </div>

      <div className="glass rounded-3xl p-6 space-y-6 border-white/[0.05]">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <Input placeholder="Firma adı veya ilgili kişi ara..." className="bg-black/20 border-white/[0.08] pl-10 h-11 rounded-xl text-sm" />
          </div>
          <Button variant="outline" className="glass h-11 rounded-xl px-5 border-white/10 text-slate-400 hover:text-white font-bold text-xs uppercase tracking-widest">
            <Filter className="w-4 h-4 mr-2" />
            Filtrele
          </Button>
        </div>

        <div className="rounded-2xl border border-white/[0.05] overflow-hidden">
          <DataTable columns={columns} data={suppliers} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass rounded-3xl p-8 bg-gradient-to-br from-brand-500/10 to-transparent">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-500/20 flex items-center justify-center text-brand-400">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Toplu Teklif Al</h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed mb-6">
            Eksilen malzemeleriniz için tüm tedarikçilerden tek tıkla fiyat teklifi isteyebilirsiniz.
          </p>
          <Button className="w-full bg-brand-500/20 hover:bg-brand-500/30 text-brand-400 border-0 rounded-xl font-bold">
            Teklif İsteği Oluştur
          </Button>
        </div>

        <div className="glass rounded-3xl p-8 bg-gradient-to-br from-violet-500/10 to-transparent">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-violet-500/20 flex items-center justify-center text-violet-400">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Pazar Yeri Analizi</h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed mb-6">
            En uygun fiyatlı depoları ve güncel tıbbi malzeme piyasa verilerini inceleyin.
          </p>
          <Button className="w-full bg-violet-500/20 hover:bg-violet-500/30 text-violet-400 border-0 rounded-xl font-bold">
            Piyasayı İncele
          </Button>
        </div>
      </div>
    </div>
  );
}
