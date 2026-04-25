"use client";

import { Package, Search, Filter, Plus, MoreHorizontal, AlertTriangle, ArrowRight, Download, Warehouse, Activity, History } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import DataTable from "@/components/shared/DataTable";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import KpiCard from "@/components/shared/KpiCard";
import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Mock Data
const inventoryData = [
  { id: "1", name: "Anestezik Solüsyon", category: "Sarf Malzeme", stock: 12, unit: "Kutu", status: "CRITICAL", minStock: 20 },
  { id: "2", name: "Kompozit Dolgu Seti", category: "Dolgu Malzemesi", stock: 45, unit: "Adet", status: "NORMAL", minStock: 10 },
  { id: "3", name: "Steril Eldiven (M)", category: "Koruyucu Ekipman", stock: 150, unit: "Çift", status: "NORMAL", minStock: 50 },
  { id: "4", name: "Diş Beyazlatma Jeli", category: "Estetik", stock: 5, unit: "Tüp", status: "LOW", minStock: 10 },
  { id: "5", name: "Cerrahi Maske", category: "Koruyucu Ekipman", stock: 500, unit: "Adet", status: "NORMAL", minStock: 100 },
  { id: "6", name: "İmplant Vidası (4mm)", category: "Cerrahi", stock: 8, unit: "Adet", status: "LOW", minStock: 15 },
];

const columns: ColumnDef<any>[] = [
  { 
    accessorKey: "name", 
    header: "Malzeme Adı",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-slate-400">
          <Package className="w-4 h-4" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-white tracking-tight">{row.original.name}</span>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider">{row.original.category}</span>
        </div>
      </div>
    )
  },
  { 
    accessorKey: "stock", 
    header: "Stok Miktarı",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span className="font-bold text-white">{row.original.stock}</span>
        <span className="text-xs text-slate-500">{row.original.unit}</span>
      </div>
    )
  },
  { 
    accessorKey: "status", 
    header: "Durum",
    cell: ({ row }) => (
      <span className={cn(
        "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex w-fit items-center gap-1.5",
        row.original.status === "CRITICAL" ? "bg-rose-500/10 text-rose-400 border border-rose-500/20" :
        row.original.status === "LOW" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" :
        "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
      )}>
        {row.original.status === "CRITICAL" && <AlertTriangle className="w-3 h-3" />}
        {row.original.status === "CRITICAL" ? "KRİTİK" : row.original.status === "LOW" ? "AZALIYOR" : "UYGUN"}
      </span>
    )
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex justify-end gap-2">
        <Button variant="ghost" size="sm" className="h-8 px-3 text-brand-400 hover:bg-brand-500/10">
          Stok Ekle
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/5">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>
    )
  }
];

export default function InventoryPage() {
  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-700">
      <PageHeader
        title="Stok ve Malzeme"
        description="Klinik envanterini ve sarf malzemelerini takip edin."
        className="px-0 pt-0"
        action={
          <div className="flex gap-3">
            <Button variant="outline" className="glass border-white/5 text-slate-300">
              <History className="w-4 h-4 mr-2" />
              Hareketler
            </Button>
            <Button className="bg-brand-500 hover:bg-brand-600 text-white shadow-lg shadow-brand-500/20 border-0">
              <Plus className="w-4 h-4 mr-2" />
              Yeni Malzeme
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KpiCard
          title="Toplam Kalem"
          value={124}
          icon={<Warehouse />}
          iconColor="text-brand-400"
          iconBg="bg-brand-500/10"
        />
        <KpiCard
          title="Kritik Seviye"
          value={3}
          delta={{ value: "+1", trend: "up" }}
          icon={<AlertTriangle />}
          iconColor="text-rose-400"
          iconBg="bg-rose-500/10"
          href="/inventory/alerts"
        />
        <KpiCard
          title="Aylık Tüketim"
          value="₺12.450"
          delta={{ value: "-4%", trend: "up" }}
          icon={<Activity />}
          iconColor="text-violet-400"
          iconBg="bg-violet-500/10"
        />
      </div>

      <div className="glass rounded-3xl p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <Input 
              placeholder="Malzeme adı veya kategori ile ara..." 
              className="bg-black/20 border-white/[0.08] pl-10 h-11 rounded-xl focus:ring-brand-500/20"
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
          <DataTable columns={columns} data={inventoryData} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass rounded-3xl p-6 bg-gradient-to-br from-rose-600/10 to-transparent border-rose-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              Hızlı Sipariş Gerekenler
            </h3>
            <Link href="/inventory/alerts" className="text-xs text-rose-400 hover:underline">Tümünü Gör</Link>
          </div>
          <div className="space-y-3">
            {inventoryData.filter(i => i.status === "CRITICAL" || i.status === "LOW").slice(0, 2).map(i => (
              <div key={i.id} className="flex items-center justify-between p-3 rounded-2xl bg-black/20 border border-white/5">
                <div>
                  <p className="text-sm font-bold text-white">{i.name}</p>
                  <p className="text-[10px] text-slate-500">Kalan: {i.stock} {i.unit} (Min: {i.minStock})</p>
                </div>
                <Button size="sm" className="bg-rose-500 hover:bg-rose-600 text-white text-[10px] font-bold h-7 border-0 shadow-lg shadow-rose-500/20">
                  Sipariş Ver
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-3xl p-6 bg-gradient-to-br from-brand-600/10 to-transparent border-brand-500/20">
          <h3 className="font-bold text-white mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-brand-400" />
            Tedarikçi Analizi
          </h3>
          <p className="text-xs text-slate-400 mb-4 leading-relaxed">
            Son 3 ayda en çok malzeme aldığınız tedarikçiler ve harcama detayları.
          </p>
          <div className="flex gap-3">
            <Link href="/inventory/suppliers" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "flex-1 glass border-white/10 text-white rounded-xl text-xs")}>
              Tedarikçileri Yönet
            </Link>
            <Button size="sm" className="flex-1 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-bold border-0 shadow-lg shadow-brand-500/20">
              Yeni Tedarikçi Ekle
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
