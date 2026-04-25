"use client";

import { AlertTriangle, Package, ArrowRight, Download, Plus, Filter, History } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import DataTable from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";

const alerts = [
  { id: "1", name: "Anestezik Solüsyon", stock: 12, minStock: 20, status: "CRITICAL", lastOrder: "15 Mar 2024" },
  { id: "2", name: "Diş Beyazlatma Jeli", stock: 5, minStock: 10, status: "LOW", lastOrder: "02 Nis 2024" },
  { id: "3", name: "İmplant Vidası (4mm)", stock: 8, minStock: 15, status: "LOW", lastOrder: "10 Nis 2024" },
];

const columns: ColumnDef<any>[] = [
  { 
    accessorKey: "name", 
    header: "Malzeme",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-400 border border-rose-500/20">
          <Package className="w-5 h-5" />
        </div>
        <span className="font-bold text-white">{row.original.name}</span>
      </div>
    )
  },
  { accessorKey: "stock", header: "Mevcut Stok" },
  { accessorKey: "minStock", header: "Kritik Eşik" },
  { 
    accessorKey: "status", 
    header: "Durum",
    cell: ({ row }) => (
      <span className={cn(
        "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border",
        row.original.status === "CRITICAL" ? "bg-rose-500/10 text-rose-400 border-rose-500/20" : "bg-amber-500/10 text-amber-400 border-amber-500/20"
      )}>
        {row.original.status === "CRITICAL" ? "KRİTİK" : "AZALIYOR"}
      </span>
    )
  },
  {
    id: "actions",
    cell: () => (
      <Button className="bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold h-9 rounded-xl border-0 shadow-lg shadow-brand-500/20 px-4">
        Hızlı Sipariş
      </Button>
    )
  }
];

export default function InventoryAlertsPage() {
  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-700">
      <PageHeader
        title="Kritik Stok Uyarıları"
        description="Eşik değerinin altına düşen malzemeleri takip edin ve sipariş verin."
        className="px-0 pt-0"
      />
      
      <div className="glass rounded-3xl p-8 border-rose-500/10 bg-gradient-to-br from-rose-500/5 to-transparent">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/20 flex items-center justify-center text-rose-400 shadow-lg shadow-rose-500/20">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Dikkat Gerektiren 3 Ürün</h3>
            <p className="text-sm text-slate-500">Stok seviyeleri operasyonu aksatabilir.</p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/[0.05] overflow-hidden bg-black/20">
          <DataTable columns={columns} data={alerts} />
        </div>
      </div>
    </div>
  );
}
