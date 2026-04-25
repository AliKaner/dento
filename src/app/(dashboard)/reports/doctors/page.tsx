"use client";

import { Users, TrendingUp, Calendar, ArrowUpRight, Star, Clock, FileText, Download, User } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import KpiCard from "@/components/shared/KpiCard";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { cn } from "@/lib/utils";

const doctorPerformance = [
  { name: "Dr. Ali Yılmaz", patients: 142, revenue: 85000, satisfaction: 4.9, appointments: 160 },
  { name: "Dr. Ayşe Demir", patients: 128, revenue: 72000, satisfaction: 4.7, appointments: 145 },
  { name: "Dr. Mehmet Kaya", patients: 98, revenue: 54000, satisfaction: 4.5, appointments: 110 },
];

const skillsData = [
  { subject: 'Hız', A: 120, B: 110, fullMark: 150 },
  { subject: 'Memnuniyet', A: 98, B: 130, fullMark: 150 },
  { subject: 'Gelir', A: 86, B: 130, fullMark: 150 },
  { subject: 'Verimlilik', A: 99, B: 100, fullMark: 150 },
  { subject: 'Yeni Hasta', A: 85, B: 90, fullMark: 150 },
  { subject: 'Tedavi Başarı', A: 65, B: 85, fullMark: 150 },
];

export default function DoctorPerformancePage() {
  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-700">
      <PageHeader
        title="Hekim Performans Analizi"
        description="Klinik hekimlerinizin çalışma verilerini ve hasta memnuniyetini inceleyin."
        className="px-0 pt-0"
        action={
          <Button className="bg-brand-500 hover:bg-brand-600 text-white shadow-lg shadow-brand-500/20 border-0 rounded-xl h-10 px-6 font-bold text-xs uppercase tracking-wider">
            <Download className="w-4 h-4 mr-2" />
            Performans Raporu Al
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KpiCard
          title="En Çok Hasta"
          value="Dr. Ali Yılmaz"
          subtitle="142 Hasta / Ay"
          icon={<Users />}
          iconColor="text-brand-400"
          iconBg="bg-brand-500/10"
        />
        <KpiCard
          title="En Yüksek Gelir"
          value="₺85.400"
          subtitle="Dr. Ali Yılmaz"
          icon={<TrendingUp />}
          iconColor="text-emerald-400"
          iconBg="bg-emerald-500/10"
        />
        <KpiCard
          title="Ort. Memnuniyet"
          value="4.7 / 5"
          delta={{ value: "+0.2", trend: "up" }}
          icon={<Star />}
          iconColor="text-amber-400"
          iconBg="bg-amber-500/10"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass rounded-3xl p-8">
          <h3 className="text-lg font-bold text-white mb-6">Aylık Tedavi Hacmi</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={doctorPerformance}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip contentStyle={{ backgroundColor: '#12141c', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', color: '#fff' }} />
                <Bar dataKey="patients" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-3xl p-8">
          <h3 className="text-lg font-bold text-white mb-6">Klinik Yetenek Analizi</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillsData}>
                <PolarGrid stroke="rgba(255,255,255,0.05)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10 }} />
                <Radar name="Klinik Ortalaması" dataKey="B" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
                <Radar name="Seçili Hekim" dataKey="A" stroke="#a78bfa" fill="#a78bfa" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="glass rounded-3xl p-6 overflow-hidden">
        <h3 className="text-lg font-bold text-white mb-6">Detaylı Performans Tablosu</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead className="text-slate-500 border-b border-white/5 uppercase tracking-widest text-[10px] font-bold">
              <tr>
                <th className="pb-4 px-4">Hekim</th>
                <th className="pb-4 px-4">Hasta Sayısı</th>
                <th className="pb-4 px-4">Randevu Sayısı</th>
                <th className="pb-4 px-4">Toplam Gelir</th>
                <th className="pb-4 px-4">Memnuniyet</th>
                <th className="pb-4 px-4">Verimlilik</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {doctorPerformance.map((d) => (
                <tr key={d.name} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-500/10 flex items-center justify-center text-brand-400 font-bold">
                        {d.name[4]}
                      </div>
                      <span className="font-bold text-white">{d.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-300">{d.patients}</td>
                  <td className="py-4 px-4 text-slate-300">{d.appointments}</td>
                  <td className="py-4 px-4 font-bold text-emerald-400">₺{d.revenue.toLocaleString()}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-amber-400 font-bold">{d.satisfaction}</span>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className={cn("w-3 h-3", s <= Math.floor(d.satisfaction) ? "text-amber-400 fill-amber-400" : "text-slate-700")} />
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="w-24 bg-white/5 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-brand-500 h-full" style={{ width: `${(d.patients / 160) * 100}%` }} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
