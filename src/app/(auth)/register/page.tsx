"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, ArrowRight, Building2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/login");
    }, 1500);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#030407] relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-500/10 blur-[120px] rounded-full" />
      
      <div className="w-full max-w-[480px] z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-indigo-600 flex items-center justify-center shadow-2xl shadow-brand-500/20 mx-auto mb-6">
            <span className="text-white font-black text-3xl">D</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">Klinik Oluşturun</h1>
          <p className="text-slate-500 text-sm">Ücretsiz deneme sürenizi hemen başlatın.</p>
        </div>

        <div className="glass rounded-[32px] p-10 border-white/[0.05] shadow-2xl">
          <form onSubmit={handleRegister} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Adınız</Label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-brand-400 transition-colors" />
                  <Input 
                    placeholder="Ad" 
                    required
                    className="h-12 bg-black/20 border-white/[0.08] text-white pl-12 rounded-2xl focus:ring-2 focus:ring-brand-500/20 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Soyadınız</Label>
                <Input 
                  placeholder="Soyad" 
                  required
                  className="h-12 bg-black/20 border-white/[0.08] text-white px-4 rounded-2xl focus:ring-2 focus:ring-brand-500/20 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Klinik Adı</Label>
              <div className="relative group">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-brand-400 transition-colors" />
                <Input 
                  placeholder="Klinik veya Muayenehane Adı" 
                  required
                  className="h-12 bg-black/20 border-white/[0.08] text-white pl-12 rounded-2xl focus:ring-2 focus:ring-brand-500/20 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">E-Posta</Label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-brand-400 transition-colors" />
                <Input 
                  type="email" 
                  placeholder="isim@klinik.com" 
                  required
                  className="h-12 bg-black/20 border-white/[0.08] text-white pl-12 rounded-2xl focus:ring-2 focus:ring-brand-500/20 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Şifre</Label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-brand-400 transition-colors" />
                <Input 
                  type="password" 
                  placeholder="En az 8 karakter" 
                  required
                  className="h-12 bg-black/20 border-white/[0.08] text-white pl-12 rounded-2xl focus:ring-2 focus:ring-brand-500/20 transition-all"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full h-12 bg-brand-500 hover:bg-brand-600 text-white rounded-2xl font-bold shadow-lg shadow-brand-500/20 transition-all border-0 mt-4"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Kayıt Yapılıyor...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  Hesabı Oluştur
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </Button>
          </form>

          <p className="text-center mt-6 text-[11px] text-slate-600 leading-relaxed px-4">
            Kaydolarak <Link href="#" className="underline">Hizmet Şartlarını</Link> ve <Link href="#" className="underline">Gizlilik Politikasını</Link> kabul etmiş sayılırsınız.
          </p>
        </div>

        <p className="text-center mt-8 text-slate-500 text-sm">
          Zaten bir hesabınız var mı?{" "}
          <Link href="/login" className="text-brand-400 font-bold hover:text-brand-300 transition-colors">Giriş Yapın</Link>
        </p>
      </div>

      {/* Trust Badge */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em]">
        <CheckCircle2 className="w-3 h-3" />
        Bulut Tabanlı Veri Koruma
      </div>
    </div>
  );
}
