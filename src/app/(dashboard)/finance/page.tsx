"use client";

import { Wallet, TrendingUp, TrendingDown, DollarSign, ArrowUpRight, ArrowDownRight, FileText, Download, Calendar } from "lucide-react";
import KpiCard from "@/components/shared/KpiCard";
import ChartCard from "@/components/shared/ChartCard";
import DataTable from "@/components/shared/DataTable";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { CHART_COLORS, TOOLTIP_STYLE } from "@/lib/chartColors";
import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";

// Mock Data
const cashFlowData = [
  { name: "Oca", gelir: 120000, gider: 80000 },
  { name: "Şub", gelir: 145000, gider: 85000 },
  { name: "Mar", gelir: 130000, gider: 90000 },
  { name: "Nis", gelir: 160000, gider: 95000 },
  { name: "May", gelir: 185000, gider: 100000 },
  { name: "Haz", gelir: 210000, gider: 110000 },
];

const transactions = [
  { id: "1", date: "Bugün", description: "Muayene Ücreti - Ayşe Y.", category: "Gelir", amount: "₺450", type: "INCOME" },
  { id: "2", date: "Bugün", description: "Kira Ödemesi", category: "Gider", amount: "-₺12.000", type: "EXPENSE" },
  { id: "3", date: "Dün", description: "Dolgu İşlemi - Mehmet D.", category: "Gelir", amount: "₺850", type: "INCOME" },
  { id: "4", date: "Dün", description: "Tıbbi Malzeme Alımı", category: "Gider", amount: "-₺4.500", type: "EXPENSE" },
  { id: "5", date: "24 Eki", description: "Kanal Tedavisi - Zeynep Ç.", category: "Gelir", amount: "₺1.200", type: "INCOME" },
];

const columns: ColumnDef<any>[] = [
  { accessorKey: "date", header: "Tarih" },
  { accessorKey: "description", header: "Açıklama" },
  { accessorKey: "category", header: "Kategori" },
  { 
    accessorKey: "amount", 
    header: "Tutar",
    cell: ({ row }) => (
      <span className={cn(
        "font-bold",
        row.original.type === "INCOME" ? "text-emerald-400" : "text-rose-400"
      )}>
        {row.original.amount}
      </span>
    )
  },
];

export default function FinancePage() {
  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-700">
      <PageHeader
        title="Finansal Yönetim"
        description="Klinik gelir, gider ve nakit akışını takip edin."
        className="px-0 pt-0"
        action={
          <div className="flex gap-3">
            <Button variant="outline" className="glass border-white/5 text-slate-300">
              <Calendar className="w-4 h-4 mr-2" />
              Tarih Aralığı
            </Button>
            <Button className="bg-brand-500 hover:bg-brand-600 text-white shadow-lg shadow-brand-500/20 border-0">
              <Download className="w-4 h-4 mr-2" />
              Rapor Al
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Toplam Gelir (Ay)"
          value="₺185.400"
          delta={{ value: "+12%", trend: "up" }}
          icon={<ArrowUpRight />}
          iconColor="text-emerald-400"
          iconBg="bg-emerald-500/10"
        />
        <KpiCard
          title="Toplam Gider (Ay)"
          value="₺92.150"
          delta={{ value: "+5%", trend: "down" }}
          icon={<ArrowDownRight />}
          iconColor="text-rose-400"
          iconBg="bg-rose-500/10"
        />
        <KpiCard
          title="Net Kâr"
          value="₺93.250"
          delta={{ value: "+18%", trend: "up" }}
          icon={<TrendingUp />}
          iconColor="text-brand-400"
          iconBg="bg-brand-500/10"
        />
        <KpiCard
          title="Bekleyen Tahsilat"
          value="₺24.800"
          subtitle="12 Hasta"
          icon={<FileText />}
          iconColor="text-amber-400"
          iconBg="bg-amber-500/10"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass rounded-3xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Nakit Akışı</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-brand-500" />
                <span className="text-xs text-slate-400">Gelir</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <span className="text-xs text-slate-400">Gider</span>
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cashFlowData}>
                <defs>
                  <linearGradient id="colorGelir" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorGider" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(value) => `₺${value/1000}k`} />
                <Tooltip contentStyle={{ backgroundColor: '#12141c', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', color: '#fff' }} />
                <Area type="monotone" dataKey="gelir" stroke="#3b82f6" strokeWidth={3} fill="url(#colorGelir)" />
                <Area type="monotone" dataKey="gider" stroke="#f43f5e" strokeWidth={2} strokeDasharray="5 5" fill="url(#colorGider)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-3xl p-6 flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6">Son İşlemler</h3>
          <div className="space-y-4 flex-1">
            {transactions.map((t) => (
              <div key={t.id} className="flex items-center justify-between p-3 rounded-2xl hover:bg-white/[0.03] transition-all border border-transparent hover:border-white/[0.05]">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center",
                    t.type === "INCOME" ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
                  )}>
                    {t.type === "INCOME" ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white truncate max-w-[140px]">{t.description}</p>
                    <p className="text-[10px] text-slate-500">{t.date} • {t.category}</p>
                  </div>
                </div>
                <span className={cn(
                  "text-sm font-bold",
                  t.type === "INCOME" ? "text-emerald-400" : "text-rose-400"
                )}>
                  {t.amount}
                </span>
              </div>
            ))}
          </div>
          <Button variant="ghost" className="mt-6 w-full text-slate-500 hover:text-white hover:bg-white/5 rounded-2xl font-bold">
            Tüm İşlemleri Gör
          </Button>
        </div>
      </div>

      <div className="glass rounded-3xl p-6">
        <h3 className="text-lg font-bold text-white mb-6">Detaylı İşlem Listesi</h3>
        <DataTable columns={columns} data={transactions} />
      </div>
    </div>
  );
}
