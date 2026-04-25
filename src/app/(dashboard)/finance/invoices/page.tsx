"use client";

import { useState } from "react";
import { FileText, Search, Download, Plus, Filter, MoreHorizontal, CheckCircle2, Clock, XCircle, ChevronDown, Calendar, User } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import DataTable from "@/components/shared/DataTable";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";

// Mock Data
const allInvoices = [
  { id: "INV-001", patient: "Burak Yılmaz", date: "25.04.2024", amount: "₺1.200", status: "PAID" },
  { id: "INV-002", patient: "Fatma Şahin", date: "24.04.2024", amount: "₺850", status: "PENDING" },
  { id: "INV-003", patient: "Mustafa Koç", date: "23.04.2024", amount: "₺3.400", status: "OVERDUE" },
  { id: "INV-004", patient: "Selin Aydın", date: "22.04.2024", amount: "₺450", status: "PAID" },
  { id: "INV-005", patient: "Kemal Yıldız", date: "20.04.2024", amount: "₺2.100", status: "PENDING" },
  { id: "INV-006", patient: "Merve Çelik", date: "15.04.2024", amount: "₺5.800", status: "OVERDUE" },
];

export default function InvoicesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);

  const filteredInvoices = allInvoices.filter(inv => {
    const matchesSearch = inv.patient.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         inv.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter.length === 0 || statusFilter.includes(inv.status);
    return matchesSearch && matchesStatus;
  });

  const columns: ColumnDef<any>[] = [
    { 
      accessorKey: "id", 
      header: "Fatura No",
      cell: ({ row }) => <span className="font-mono text-xs font-bold text-slate-400">{row.original.id}</span>
    },
    { 
      accessorKey: "patient", 
      header: "Hasta Bilgisi",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-brand-500/10 flex items-center justify-center text-brand-400 text-[10px] font-bold">
            {row.original.patient[0]}
          </div>
          <span className="font-bold text-white">{row.original.patient}</span>
        </div>
      )
    },
    { 
      accessorKey: "date", 
      header: "Tarih",
      cell: ({ row }) => (
        <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
          <Calendar className="w-3 h-3" />
          {row.original.date}
        </div>
      )
    },
    { 
      accessorKey: "amount", 
      header: "Tutar",
      cell: ({ row }) => <span className="font-bold text-white">{row.original.amount}</span>
    },
    { 
      accessorKey: "status", 
      header: "Durum",
      cell: ({ row }) => (
        <span className={cn(
          "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 w-fit",
          row.original.status === "PAID" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
          row.original.status === "PENDING" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" :
          "bg-rose-500/10 text-rose-400 border border-rose-500/20"
        )}>
          {row.original.status === "PAID" ? <CheckCircle2 className="w-3 h-3" /> :
           row.original.status === "PENDING" ? <Clock className="w-3 h-3" /> :
           <XCircle className="w-3 h-3" />}
          {row.original.status === "PAID" ? "ÖDENDİ" : row.original.status === "PENDING" ? "BEKLEMEDE" : "GECİKMİŞ"}
        </span>
      )
    },
    {
      id: "actions",
      cell: () => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-brand-500/10 hover:text-brand-400 transition-colors">
            <Download className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/5 text-slate-500">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      )
    }
  ];

  const toggleStatusFilter = (status: string) => {
    setStatusFilter(prev => 
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-700">
      <PageHeader
        title="Faturalar"
        description="Oluşturulan faturaları ve ödeme durumlarını yönetin."
        className="px-0 pt-0"
        action={
          <div className="flex gap-3">
            <Button variant="outline" className="glass border-white/5 text-slate-300 rounded-xl h-10 font-bold text-xs uppercase tracking-wider">
              Toplu İndir
            </Button>
            <Button className="bg-brand-500 hover:bg-brand-600 text-white shadow-lg shadow-brand-500/20 border-0 rounded-xl h-10 px-6 font-bold text-xs uppercase tracking-wider">
              <Plus className="w-4 h-4 mr-2" />
              Yeni Fatura
            </Button>
          </div>
        }
      />

      <div className="glass rounded-3xl p-6 space-y-6 border-white/[0.05]">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <Input 
              placeholder="Fatura no veya hasta ara..." 
              className="bg-black/20 border-white/[0.08] pl-10 h-11 rounded-xl focus:ring-brand-500/20 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger 
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "glass h-11 rounded-xl px-5 border-white/10 font-bold text-xs uppercase tracking-widest transition-all",
                  statusFilter.length > 0 ? "bg-brand-500/10 text-brand-400 border-brand-500/30" : "text-slate-400 hover:text-white"
                )}
              >
                <Filter className="w-4 h-4 mr-2" />
                Durum: {statusFilter.length === 0 ? "Hepsi" : `${statusFilter.length} Seçili`}
                <ChevronDown className="w-3 h-3 ml-2 opacity-50" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-[#12141c] border-white/10 text-slate-200 p-2 rounded-2xl shadow-2xl" align="end">
                <DropdownMenuLabel className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2 py-1">Filtrele</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/5 my-1" />
                <DropdownMenuCheckboxItem 
                  checked={statusFilter.includes("PAID")}
                  onCheckedChange={() => toggleStatusFilter("PAID")}
                  className="rounded-xl focus:bg-emerald-500/10 focus:text-emerald-400 cursor-pointer"
                >
                  Ödendi
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem 
                  checked={statusFilter.includes("PENDING")}
                  onCheckedChange={() => toggleStatusFilter("PENDING")}
                  className="rounded-xl focus:bg-amber-500/10 focus:text-amber-400 cursor-pointer"
                >
                  Beklemede
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem 
                  checked={statusFilter.includes("OVERDUE")}
                  onCheckedChange={() => toggleStatusFilter("OVERDUE")}
                  className="rounded-xl focus:bg-rose-500/10 focus:text-rose-400 cursor-pointer"
                >
                  Gecikmiş
                </DropdownMenuCheckboxItem>
                {statusFilter.length > 0 && (
                  <>
                    <DropdownMenuSeparator className="bg-white/5 my-1" />
                    <DropdownMenuItem 
                      onClick={() => setStatusFilter([])}
                      className="rounded-xl focus:bg-white/5 text-center justify-center text-xs font-bold text-slate-500 hover:text-white cursor-pointer"
                    >
                      Filtreleri Temizle
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="h-6 w-px bg-white/10 mx-1" />
            
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              {filteredInvoices.length} Kayıt Bulundu
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/[0.05] overflow-hidden bg-white/[0.01]">
          <DataTable columns={columns} data={filteredInvoices} />
        </div>
      </div>
    </div>
  );
}
