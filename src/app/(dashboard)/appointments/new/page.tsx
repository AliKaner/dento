"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CalendarIcon, Clock, User, Clipboard, Info, Check } from "lucide-react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

import PageHeader from "@/components/shared/PageHeader";
import PatientCombobox from "@/components/shared/PatientCombobox";

const formSchema = z.object({
  patientId: z.string().min(1, "Lütfen bir hasta seçin"),
  doctorId: z.string().min(1, "Lütfen bir doktor seçin"),
  date: z.date({
    message: "Lütfen bir tarih seçin",
  }),
  time: z.string().min(1, "Lütfen bir saat seçin"),
  durationMin: z.any(),
  type: z.string().min(1, "Lütfen randevu türünü seçin"),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function NewAppointmentPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      durationMin: "30",
      type: "CHECKUP",
    },
  });

  const dateValue = watch("date");

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/appointments");
    }, 800);
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <PageHeader
        title="Yeni Randevu"
        description="Hasta için yeni bir randevu kaydı oluşturun."
        className="px-0 pt-0"
      />

      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass rounded-3xl p-8 space-y-8">
              <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center">
                  <Clipboard className="w-5 h-5 text-brand-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Genel Bilgiler</h3>
                  <p className="text-xs text-slate-500">Hasta ve doktor seçimi</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Hasta Seçimi</Label>
                  <PatientCombobox 
                    onChange={(id) => setValue("patientId", id)} 
                  />
                  {errors.patientId && <p className="text-[11px] font-medium text-rose-400 px-1">{errors.patientId.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Görevli Doktor</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <select
                      {...register("doctorId")}
                      className="w-full h-11 rounded-xl border border-white/[0.08] bg-black/20 pl-10 pr-4 text-[13px] text-white focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-all appearance-none"
                    >
                      <option value="" className="bg-[#12141c]">Doktor Seçiniz</option>
                      <option value="dr-ali" className="bg-[#12141c]">Dr. Ali Yılmaz</option>
                      <option value="dr-ayse" className="bg-[#12141c]">Dr. Ayşe Demir</option>
                    </select>
                  </div>
                  {errors.doctorId && <p className="text-[11px] font-medium text-rose-400 px-1">{errors.doctorId.message}</p>}
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Randevu Notları</Label>
                <div className="relative">
                  <Info className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  <textarea
                    {...register("notes")}
                    rows={5}
                    className="w-full rounded-2xl border border-white/[0.08] bg-black/20 pl-10 pr-4 py-3 text-[13px] text-white focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-all resize-none"
                    placeholder="Randevu ile ilgili özel notlar veya hatırlatmalar..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Time and Type Column */}
          <div className="space-y-6">
            <div className="glass rounded-3xl p-8 space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-violet-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Zamanlama</h3>
                  <p className="text-xs text-slate-500">Tarih, saat ve tür</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Tarih</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="outline" 
                        className={cn(
                          "w-full h-11 justify-start text-left font-normal bg-black/20 border-white/[0.08] hover:bg-black/40 text-white rounded-xl",
                          !dateValue && "text-slate-500"
                        )}
                      >
                        <CalendarIcon className="mr-3 h-4 w-4 text-slate-400" />
                        {dateValue ? format(dateValue, "d MMMM yyyy", { locale: tr }) : <span>Tarih seçin</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 border-white/10 bg-[#12141c] text-white" align="center">
                      <Calendar
                        mode="single"
                        selected={dateValue}
                        onSelect={(date) => date && setValue("date", date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.date && <p className="text-[11px] font-medium text-rose-400 px-1">{errors.date.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Saat</Label>
                    <Input 
                      type="time" 
                      className="h-11 bg-black/20 border-white/[0.08] text-white rounded-xl focus:ring-2 focus:ring-brand-500/20" 
                      {...register("time")} 
                    />
                    {errors.time && <p className="text-[11px] font-medium text-rose-400 px-1">{errors.time.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Süre</Label>
                    <select
                      {...register("durationMin")}
                      className="w-full h-11 rounded-xl border border-white/[0.08] bg-black/20 px-4 text-[13px] text-white focus:border-brand-500 focus:outline-none appearance-none"
                    >
                      <option value="15" className="bg-[#12141c]">15 dk</option>
                      <option value="30" className="bg-[#12141c]">30 dk</option>
                      <option value="45" className="bg-[#12141c]">45 dk</option>
                      <option value="60" className="bg-[#12141c]">60 dk</option>
                      <option value="90" className="bg-[#12141c]">90 dk</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">İşlem Türü</Label>
                  <select
                    {...register("type")}
                    className="w-full h-11 rounded-xl border border-white/[0.08] bg-black/20 px-4 text-[13px] text-white focus:border-brand-500 focus:outline-none appearance-none"
                  >
                    <option value="CHECKUP" className="bg-[#12141c]">🦷 Kontrol</option>
                    <option value="TREATMENT" className="bg-[#12141c]">💉 Tedavi</option>
                    <option value="XRAY" className="bg-[#12141c]">📸 Röntgen</option>
                    <option value="CLEANING" className="bg-[#12141c]">✨ Temizleme</option>
                    <option value="SURGERY" className="bg-[#12141c]">🔪 Cerrahi</option>
                    <option value="OTHER" className="bg-[#12141c]">📝 Diğer</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 space-y-3">
                <Button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="w-full h-12 bg-brand-500 hover:bg-brand-600 text-white rounded-2xl font-bold shadow-lg shadow-brand-500/20 transition-all border-0"
                >
                  {isSubmitting ? "Kaydediliyor..." : (
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      Randevu Oluştur
                    </div>
                  )}
                </Button>
                <Button 
                  type="button" 
                  variant="ghost" 
                  onClick={() => router.back()} 
                  className="w-full h-12 text-slate-500 hover:text-white hover:bg-white/5 rounded-2xl font-bold transition-all"
                >
                  Vazgeç
                </Button>
              </div>
            </div>

            <div className="glass rounded-3xl p-6 bg-gradient-to-br from-brand-600/10 to-transparent">
              <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                <div className="w-1 h-3 bg-brand-500 rounded-full" />
                Yardımcı Not
              </h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Randevu oluştururken hastanın son muayene tarihlerini kontrol etmeyi unutmayın. Acil durumlar için süre alanını 15dk olarak güncelleyebilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
