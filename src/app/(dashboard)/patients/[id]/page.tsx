"use client";

import { useState } from "react";
import { 
  User, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  FileText, 
  History as HistoryIcon, 
  Plus, 
  Edit, 
  ChevronRight, 
  TrendingUp, 
  ShieldAlert,
  Droplet,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  Image as ImageIcon,
  MoreVertical
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import StatusBadge from "@/components/shared/StatusBadge";
import { cn } from "@/lib/utils";

// Mock Data
const patient = {
  id: "1",
  name: "Burak Yılmaz",
  tcNo: "12345678901",
  phone: "0532 111 2233",
  email: "burak@mail.com",
  age: 32,
  gender: "Erkek",
  birthDate: "12.05.1992",
  bloodType: "A Rh (+)",
  allergies: "Penisilin Alerjisi",
  address: "Kadıköy, İstanbul",
  debt: "₺1.200",
  lastVisit: "Bugün",
  totalVisits: 12,
};

const history = [
  { id: 1, date: "25.04.2024", type: "Muayene", doctor: "Dr. Ali Yılmaz", notes: "Genel kontrol yapıldı. Diş taşları temizlendi.", amount: "₺450", status: "Tamamlandı" },
  { id: 2, date: "10.03.2024", type: "Dolgu", doctor: "Dr. Ali Yılmaz", notes: "Sol alt 6 numaralı dişe kompozit dolgu yapıldı.", amount: "₺850", status: "Tamamlandı" },
  { id: 3, date: "15.01.2024", type: "Röntgen", doctor: "Dr. Ayşe Demir", notes: "Panoramik röntgen çekildi.", amount: "₺350", status: "Tamamlandı" },
];

const appointments = [
  { id: 101, date: "15.05.2024", time: "14:30", type: "Kontrol", doctor: "Dr. Ali Yılmaz", status: "SCHEDULED" },
];

const tabs = [
  { id: "history", label: "Muayene Geçmişi", icon: HistoryIcon },
  { id: "appointments", label: "Randevular", icon: Calendar },
  { id: "documents", label: "Belgeler & Röntgen", icon: FileText },
  { id: "finance", label: "Ödeme Detayları", icon: CreditCard },
];

export default function PatientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("history");

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-700 pb-12">
      {/* Top Navigation & Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Link href="/patients" className="hover:text-white transition-colors">Hastalar</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white font-medium">Hasta Kartı</span>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="glass border-white/5 text-slate-300 rounded-xl h-10 px-4">
            <Edit className="w-4 h-4 mr-2" />
            Profili Düzenle
          </Button>
          <Link href="/appointments/new" className={cn(buttonVariants({ variant: "default" }), "bg-brand-500 hover:bg-brand-600 text-white shadow-lg shadow-brand-500/20 border-0 rounded-xl h-10 px-4")}>
            <Plus className="w-4 h-4 mr-2" />
            Yeni Randevu
          </Link>
        </div>
      </div>

      {/* 100% Width Patient Info Bar */}
      <div className="glass rounded-3xl p-6 border-white/[0.05] relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
          <User className="w-40 h-40" />
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-xl border-2 border-white/10">
              {patient.name[0]}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-extrabold text-white tracking-tight">{patient.name}</h1>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20 uppercase tracking-widest">Aktif</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1"><User className="w-3 h-3 text-brand-400" /> ID: #{patient.id}</span>
                <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-brand-400" /> {patient.phone}</span>
                <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-brand-400" /> {patient.email}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 flex-1 gap-6 md:border-l md:border-white/5 md:pl-8">
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Yaş / Cinsiyet</p>
              <p className="text-sm font-bold text-white">{patient.age} Yaş, {patient.gender}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Kan Grubu</p>
              <p className="text-sm font-bold text-rose-400 flex items-center gap-1">
                <Droplet className="w-3 h-3" /> {patient.bloodType}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Bakiyesi</p>
              <p className="text-sm font-bold text-amber-400">{patient.debt}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Son İşlem</p>
              <p className="text-sm font-bold text-white">{patient.lastVisit}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area with Secondary Sidebar */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Secondary Sidebar (Left) */}
        <div className="w-full lg:w-72 shrink-0">
          <div className="glass rounded-3xl p-3 space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 group",
                    isActive 
                      ? "bg-brand-500 text-white shadow-lg shadow-brand-500/20" 
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  <Icon className={cn("w-5 h-5", isActive ? "text-white" : "text-slate-500 group-hover:text-slate-300")} />
                  <span className="text-sm font-bold tracking-tight">{tab.label}</span>
                  {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                </button>
              );
            })}
          </div>

          <div className="mt-6 glass rounded-3xl p-6 border-amber-500/10 bg-gradient-to-br from-amber-500/5 to-transparent">
            <div className="flex items-center gap-2 mb-3">
              <ShieldAlert className="w-4 h-4 text-amber-500" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Alerji Uyarıları</h4>
            </div>
            <p className="text-xs text-amber-500/80 leading-relaxed font-medium">
              {patient.allergies}
            </p>
          </div>
        </div>

        {/* Dynamic Content (Right) */}
        <div className="flex-1 min-w-0">
          <div className="glass rounded-3xl p-8 min-h-[500px] animate-in fade-in slide-in-from-right-4 duration-500">
            {activeTab === "history" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <HistoryIcon className="w-5 h-5 text-brand-400" />
                    Tedavi Geçmişi
                  </h3>
                  <Button size="sm" className="bg-brand-500/10 text-brand-400 border-0 hover:bg-brand-500/20 text-xs font-bold rounded-xl h-8 px-4">
                    Kayıt Ekle
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {history.map((h) => (
                    <div key={h.id} className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-brand-500/20 transition-all group">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex flex-col items-center justify-center border border-brand-500/20">
                            <span className="text-[10px] font-bold text-brand-400 uppercase leading-none">{h.date.split('.')[1]}</span>
                            <span className="text-lg font-bold text-white leading-none mt-1">{h.date.split('.')[0]}</span>
                          </div>
                          <div>
                            <h4 className="text-base font-bold text-white group-hover:text-brand-400 transition-colors">{h.type}</h4>
                            <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                              <User className="w-3 h-3" /> {h.doctor}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <p className="text-lg font-bold text-white">{h.amount}</p>
                            <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest flex items-center gap-1 justify-end">
                              <CheckCircle2 className="w-3 h-3" /> {h.status}
                            </p>
                          </div>
                          <button className="p-2 rounded-lg hover:bg-white/5 text-slate-500 hover:text-white">
                            <MoreVertical className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-4 p-4 rounded-xl bg-black/20 text-sm text-slate-400 leading-relaxed italic border border-white/5">
                        "{h.notes}"
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "appointments" && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-amber-400" />
                  Randevular
                </h3>
                <div className="space-y-4">
                  {appointments.map((a) => (
                    <div key={a.id} className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                          <Clock className="w-6 h-6 text-amber-400" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-base font-bold text-white">{a.type} Randevusu</h4>
                            <StatusBadge status={a.status} />
                          </div>
                          <p className="text-sm text-slate-500">{a.date} • Saat: {a.time} • {a.doctor}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" className="glass border-white/10 text-white rounded-xl h-9 px-4 text-xs font-bold">Düzenle</Button>
                        <Button variant="outline" className="glass border-white/10 text-rose-400 hover:bg-rose-500/10 rounded-xl h-9 px-4 text-xs font-bold">İptal</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "documents" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 text-violet-400" />
                    Belgeler & Röntgen
                  </h3>
                  <Button size="sm" className="bg-violet-500/10 text-violet-400 border-0 hover:bg-violet-500/20 text-xs font-bold rounded-xl h-8 px-4">
                    Dosya Yükle
                  </Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
                  {[
                    { name: "Panoramik Röntgen", date: "15.01.2024", type: "IMAGE" },
                    { name: "Anamnez Formu", date: "12.01.2024", type: "PDF" },
                    { name: "Tedavi Planı", date: "15.01.2024", type: "PDF" },
                  ].map((doc, i) => (
                    <div key={i} className="group relative glass rounded-2xl p-4 border-white/[0.05] hover:border-brand-500/20 transition-all cursor-pointer">
                      <div className="aspect-square rounded-xl bg-black/20 flex items-center justify-center mb-3">
                        {doc.type === "IMAGE" ? <ImageIcon className="w-10 h-10 text-slate-600 group-hover:text-brand-400 transition-colors" /> : <FileText className="w-10 h-10 text-slate-600 group-hover:text-brand-400 transition-colors" />}
                      </div>
                      <p className="text-xs font-bold text-white truncate">{doc.name}</p>
                      <p className="text-[10px] text-slate-500 mt-1">{doc.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "finance" && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-emerald-400" />
                  Ödeme Detayları
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Toplam Tahakkuk</p>
                    <p className="text-2xl font-bold text-white">₺4.850</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Kalan Bakiye</p>
                    <p className="text-2xl font-bold text-amber-400">₺1.200</p>
                  </div>
                </div>
                <div className="pt-4">
                  <DataTable columns={[
                    { accessorKey: "date", header: "Tarih" },
                    { accessorKey: "desc", header: "Açıklama" },
                    { accessorKey: "amount", header: "Tutar" },
                    { accessorKey: "type", header: "Tür" },
                  ]} data={[
                    { date: "25.04.2024", desc: "Ödeme (Nakit)", amount: "₺450", type: "Giriş" },
                    { date: "10.03.2024", desc: "Dolgu İşlemi", amount: "₺850", type: "Tahakkuk" },
                  ]} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Simple DataTable replacement since we don't want to import the whole thing here if it's complex
function DataTable({ columns, data }: { columns: any[], data: any[] }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left text-[13px]">
        <thead className="text-slate-500 border-b border-white/5">
          <tr>
            {columns.map(col => <th key={col.accessorKey} className="pb-3 font-bold uppercase tracking-widest text-[10px] px-2">{col.header}</th>)}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-white/[0.02] transition-colors">
              {columns.map(col => <td key={col.accessorKey} className="py-4 px-2 text-slate-300 font-medium">{row[col.accessorKey]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
