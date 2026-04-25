"use client";

import { useState, useEffect } from "react";
import { Settings, User, Shield, Bell, Database, Globe, Moon, Save } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-700">
      <PageHeader
        title="Sistem Ayarları"
        description="Klinik profili, güvenlik ve uygulama tercihlerini yönetin."
        className="px-0 pt-0"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Navigation */}
        <div className="lg:col-span-1 space-y-2">
          {[
            { label: "Profil Bilgileri", icon: User, active: true },
            { label: "Güvenlik & Şifre", icon: Shield },
            { label: "Bildirimler", icon: Bell },
            { label: "Veri Yönetimi", icon: Database },
            { label: "Bölgesel Ayarlar", icon: Globe },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all",
                    item.active ? "bg-brand-500 text-white shadow-lg shadow-brand-500/20" : "text-slate-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-bold">{item.label}</span>
                </button>
              );
            })}
        </div>

        {/* Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass rounded-3xl p-8 space-y-8">
            <div className="flex items-center gap-3 pb-4 border-b border-white/5">
              <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center">
                <User className="w-5 h-5 text-brand-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Profil Bilgileri</h3>
                <p className="text-xs text-slate-500">Kişisel verileriniz ve klinik kimliğiniz</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Ad Soyad</Label>
                <Input defaultValue="Dr. Tansu Kaya" className="h-11 bg-black/20 border-white/[0.08] text-white rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">E-posta</Label>
                <Input defaultValue="tansu@dentaflow.com" className="h-11 bg-black/20 border-white/[0.08] text-white rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Klinik Adı</Label>
                <Input defaultValue="DentaFlow Premium Clinic" className="h-11 bg-black/20 border-white/[0.08] text-white rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Uzmanlık</Label>
                <Input defaultValue="Ortodonti Uzmanı" className="h-11 bg-black/20 border-white/[0.08] text-white rounded-xl" />
              </div>
            </div>

            <div className="pt-6 flex justify-end">
              <Button className="bg-brand-500 hover:bg-brand-600 text-white shadow-lg shadow-brand-500/20 border-0 rounded-xl px-8 h-11 font-bold uppercase tracking-wider text-xs">
                <Save className="w-4 h-4 mr-2" />
                Değişiklikleri Kaydet
              </Button>
            </div>
          </div>

          <div className="glass rounded-3xl p-8 space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Moon className="w-5 h-5 text-indigo-400" />
              Tema Ayarları
            </h3>
            <div className="flex items-center justify-between p-4 rounded-2xl bg-black/20 border border-white/5">
              <div>
                <p className="text-sm font-bold text-white">Karanlık Mod (Premium Dark)</p>
                <p className="text-xs text-slate-500 mt-1">Göz yormayan, kontrastı yüksek koyu tema</p>
              </div>
              <div className="w-12 h-6 bg-brand-500 rounded-full relative p-1 cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full absolute right-1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
