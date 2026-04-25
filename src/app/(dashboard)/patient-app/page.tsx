"use client";

import { Smartphone, QrCode, Download, Share2, CheckCircle2, ShieldCheck, Zap, Calendar, Heart, MessageSquare } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function PatientAppPage() {
  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-700 pb-20">
      <PageHeader
        title="Hasta Mobil Uygulaması"
        description="Hastalarınızın randevularını takip edebileceği ve kliniğinizle iletişim kurabileceği mobil çözüm."
        className="px-0 pt-0"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left: Info & QR */}
        <div className="space-y-8">
          <div className="glass rounded-[32px] p-8 space-y-8 border-white/[0.05]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-500/10 flex items-center justify-center text-brand-400">
                <QrCode className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Kliniğinize Özel QR Kod</h3>
                <p className="text-sm text-slate-500">Hastalarınız bu kodu taratarak uygulamayı indirebilir.</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8 bg-black/20 rounded-[24px] p-8 border border-white/5">
              <div className="bg-white p-4 rounded-3xl shadow-2xl shadow-brand-500/20 group cursor-pointer transition-transform hover:scale-105">
                {/* Mock QR Code with CSS */}
                <div className="w-40 h-40 bg-white flex flex-col gap-1 p-1">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="flex gap-1 h-full">
                      {[...Array(10)].map((_, j) => (
                        <div key={j} className={cn(
                          "w-full h-full rounded-[1px]",
                          (i + j) % 3 === 0 || (i * j) % 4 === 0 ? "bg-black" : "bg-white"
                        )} />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Bağlantı Linki</p>
                  <p className="text-sm font-mono text-brand-400 bg-brand-500/5 px-3 py-2 rounded-lg border border-brand-500/10 break-all">
                    app.dentaflow.com/clinic/premium-dent
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-brand-500 hover:bg-brand-600 text-white rounded-xl h-9 px-4 font-bold text-xs border-0">
                    <Download className="w-3.5 h-3.5 mr-2" />
                    Kodu İndir
                  </Button>
                  <Button size="sm" variant="outline" className="glass border-white/10 text-white rounded-xl h-9 px-4 font-bold text-xs">
                    <Share2 className="w-3.5 h-3.5 mr-2" />
                    Paylaş
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "Dijital Anamnez", desc: "Hastalar formları evinden doldurabilir.", icon: ShieldCheck },
              { title: "Anlık Bildirim", desc: "Randevu hatırlatıcıları ve kampanya duyuruları.", icon: Zap },
              { title: "Tedavi Takibi", desc: "Tedavi aşamalarını ve röntgenleri görüntüleme.", icon: CheckCircle2 },
              { title: "Online Randevu", desc: "Müsaitlik durumuna göre direkt randevu alımı.", icon: Calendar },
            ].map((feature, i) => (
              <div key={i} className="glass rounded-2xl p-6 border-white/[0.05] hover:bg-white/[0.03] transition-all">
                <feature.icon className="w-6 h-6 text-brand-400 mb-3" />
                <h4 className="text-sm font-bold text-white mb-1">{feature.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Mobile Preview */}
        <div className="flex justify-center lg:sticky lg:top-24">
          <div className="relative w-[300px] h-[600px] rounded-[3rem] border-[8px] border-slate-800 bg-slate-900 shadow-[0_0_100px_rgba(59,130,246,0.15)] overflow-hidden">
            {/* Speaker/Camera Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-2xl z-20" />
            
            {/* Screen Content */}
            <div className="absolute inset-0 bg-[#0f1117] flex flex-col pt-10 px-5">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Hoş Geldin</p>
                  <p className="text-sm font-bold text-white">Burak Yılmaz 👋</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-brand-500/20 border border-brand-500/40 flex items-center justify-center text-brand-400 text-xs font-bold">
                  BY
                </div>
              </div>

              {/* Next Appointment Card */}
              <div className="bg-brand-500 rounded-2xl p-4 shadow-lg shadow-brand-500/20 mb-6">
                <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest mb-2">Gelecek Randevu</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Yarın, 14:30</p>
                    <p className="text-[10px] text-white/80">Dr. Ali Yılmaz • Kontrol</p>
                  </div>
                </div>
              </div>

              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 px-1">Klinik Servisleri</p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                <div className="bg-white/5 rounded-xl p-3 border border-white/5 flex flex-col items-center gap-2">
                  <Heart className="w-5 h-5 text-rose-400" />
                  <span className="text-[10px] font-bold text-slate-300 text-center">Tedavilerim</span>
                </div>
                <div className="bg-white/5 rounded-xl p-3 border border-white/5 flex flex-col items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-brand-400" />
                  <span className="text-[10px] font-bold text-slate-300 text-center">Destek</span>
                </div>
              </div>

              {/* Bottom Nav */}
              <div className="mt-auto mb-4 bg-white/5 rounded-2xl p-2 flex items-center justify-around border border-white/5">
                <div className="p-2 rounded-xl bg-brand-500 text-white shadow-lg">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div className="p-2 text-slate-600">
                  <Calendar className="w-4 h-4" />
                </div>
                <div className="p-2 text-slate-600">
                  <User className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Elements around phone */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-brand-500/20 blur-3xl rounded-full -z-10" />
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-indigo-500/20 blur-3xl rounded-full -z-10" />
        </div>
      </div>
    </div>
  );
}
