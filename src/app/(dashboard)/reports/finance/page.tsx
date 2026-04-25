"use client";

import { TrendingUp, DollarSign, PieChart, BarChart2, Calendar, Download, ArrowUpRight, ArrowDownRight, Wallet, Activity } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import KpiCard from "@/components/shared/KpiCard";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart as RePieChart, Pie } from "recharts";
import { cn } from "@/lib/utils";

const revenueData = [
  { name: "Oca", revenue: 120000, profit: 45000 },
  { name: "Şub", revenue: 145000, profit: 58000 },
  { name: "Mar", revenue: 130000, profit: 48000 },
  { name: "Nis", revenue: 160000, profit: 65000 },
  { name: "May", revenue: 185000, profit: 82000 },
  { name: "Haz", revenue: 210000, profit: 95000 },
];

const categoryData = [
  { name: "İmplant", value: 45, color: "#3b82f6" },
  { name: "Ortodonti", value: 25, color: "#a78bfa" },
  { name: "Estetik", value: 15, color: "#10b981" },
  { name: "Genel", value: 15, color: "#f43f5e" },
];

export default function FinancialAnalysisPage() {
  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-700">
      <PageHeader
        title="Finansal Analiz Raporu"
        description="Gelir dağılımı, kârlılık oranları ve gelecek dönem projeksiyonları."
        className="px-0 pt-0"
        action={
          <div className="flex gap-3">
            <Button variant="outline" className="glass border-white/5 text-slate-300">
              <Calendar className="w-4 h-4 mr-2" />
              Yıllık Görünüm
            </Button>
            <Button className="bg-brand-500 hover:bg-brand-600 text-white shadow-lg shadow-brand-500/20 border-0 rounded-xl h-10 px-6 font-bold text-xs uppercase tracking-wider">
              <Download className="w-4 h-4 mr-2" />
              Excel'e Aktar
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Yıllık Ciro"
          value="₺1.240.000"
          delta={{ value: "+18%", trend: "up" }}
          icon={<DollarSign />}
          iconColor="text-brand-400"
          iconBg="bg-brand-500/10"
        />
        <KpiCard
          title="Ort. Marj"
          value="%48"
          delta={{ value: "+2.4", trend: "up" }}
          icon={<TrendingUp />}
          iconColor="text-emerald-400"
          iconBg="bg-emerald-500/10"
        />
        <KpiCard
          title="Gider Oranı"
          value="%32"
          delta={{ value: "-4%", trend: "up" }}
          icon={<Activity />}
          iconColor="text-rose-400"
          iconBg="bg-rose-500/10"
        />
        <KpiCard
          title="Nakit Rezervi"
          value="₺245.000"
          icon={<Wallet />}
          iconColor="text-amber-400"
          iconBg="bg-amber-500/10"
        />
      </div>

      <div className="glass rounded-3xl p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-lg font-bold text-white">Gelir & Kâr Projeksiyonu</h3>
            <p className="text-xs text-slate-500">Son 6 aylık performans ve kârlılık analizi</p>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-brand-500" />
              <span className="text-xs text-slate-400">Brüt Gelir</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-xs text-slate-400">Net Kâr</span>
            </div>
          </div>
        </div>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(value) => `₺${value/1000}k`} />
              <Tooltip contentStyle={{ backgroundColor: '#12141c', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', color: '#fff' }} />
              <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} fill="url(#colorRevenue)" />
              <Area type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={2} fill="url(#colorProfit)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="glass rounded-3xl p-8 flex flex-col items-center">
          <h3 className="text-lg font-bold text-white mb-8 w-full text-left">Gelir Kaynakları</h3>
          <div className="h-[250px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#12141c', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px' }} />
              </RePieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">En Yüksek</p>
              <p className="text-sm font-bold text-white">İmplant</p>
            </div>
          </div>
          <div className="w-full space-y-3 mt-6">
            {categoryData.map((c) => (
              <div key={c.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />
                  <span className="text-xs text-slate-400 font-medium">{c.name}</span>
                </div>
                <span className="text-xs font-bold text-white">%{c.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 glass rounded-3xl p-8">
          <h3 className="text-lg font-bold text-white mb-8">Gider Dağılımı Analizi</h3>
          <div className="space-y-8">
            {[
              { label: "Personel Giderleri", value: 45, amount: "₺42.500", color: "bg-brand-500" },
              { label: "Malzeme Alımları", value: 30, amount: "₺28.400", color: "bg-violet-500" },
              { label: "Kira & Sabit Giderler", value: 15, amount: "₺14.200", color: "bg-emerald-500" },
              { label: "Pazarlama & Reklam", value: 10, amount: "₺9.450", color: "bg-amber-500" },
            ].map((g) => (
              <div key={g.label} className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white">{g.label}</span>
                  <span className="text-sm font-bold text-slate-400">{g.amount}</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                  <div className={cn("h-full rounded-full transition-all duration-1000", g.color)} style={{ width: `${g.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
