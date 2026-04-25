"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CalendarIcon } from "lucide-react";
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
import FormSection from "@/components/shared/FormSection";

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
      durationMin: 30,
      type: "CHECKUP",
    },
  });

  const dateValue = watch("date");

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    // Mock save
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/appointments");
    }, 800);
  };

  return (
    <div className="flex flex-col h-full bg-[#13151f] rounded-xl border border-white/5 overflow-hidden">
      <PageHeader
        title="Yeni Randevu"
        description="Hasta için yeni bir randevu oluşturun."
        breadcrumb={[
          { label: "Randevular", href: "/appointments" },
          { label: "Yeni" }
        ]}
      />

      <div className="flex-1 overflow-y-auto p-6 pt-0">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-3xl">
          <FormSection title="Randevu Bilgileri" description="Hasta, doktor ve zaman seçimi">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-slate-300">Hasta <span className="text-red-400">*</span></Label>
                <PatientCombobox 
                  onChange={(id) => setValue("patientId", id)} 
                />
                {errors.patientId && <p className="text-[13px] text-red-400">{errors.patientId.message}</p>}
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300">Doktor <span className="text-red-400">*</span></Label>
                <select
                  {...register("doctorId")}
                  className="w-full rounded-lg border border-white/[0.08] bg-[#1a1d2a] px-3 py-2 text-[13px] text-slate-200 focus:border-brand-500 focus:outline-none"
                >
                  <option value="">Seçiniz</option>
                  <option value="dr-ali">Dr. Ali Yılmaz</option>
                  <option value="dr-ayse">Dr. Ayşe Demir</option>
                </select>
                {errors.doctorId && <p className="text-[13px] text-red-400">{errors.doctorId.message}</p>}
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300">Tarih <span className="text-red-400">*</span></Label>
                <Popover>
                  <PopoverTrigger className={cn("w-full justify-start text-left font-normal bg-[#1a1d2a] border-white/[0.08] hover:bg-[#1a1d2a]/80 text-slate-200 inline-flex items-center rounded-lg border px-3 py-2 text-sm", !dateValue && "text-slate-500")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateValue ? format(dateValue, "d MMMM yyyy", { locale: tr }) : <span>Tarih seçin</span>}
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 border-white/10 bg-[#13151f] text-slate-200" align="start">
                    <Calendar
                      mode="single"
                      selected={dateValue}
                      onSelect={(date) => date && setValue("date", date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.date && <p className="text-[13px] text-red-400">{errors.date.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-300">Saat <span className="text-red-400">*</span></Label>
                  <Input 
                    type="time" 
                    className="bg-[#1a1d2a] border-white/[0.08] text-slate-200" 
                    {...register("time")} 
                  />
                  {errors.time && <p className="text-[13px] text-red-400">{errors.time.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300">Süre (dk) <span className="text-red-400">*</span></Label>
                  <select
                    {...register("durationMin")}
                    className="w-full rounded-lg border border-white/[0.08] bg-[#1a1d2a] px-3 py-2 text-[13px] text-slate-200 focus:border-brand-500 focus:outline-none"
                  >
                    <option value="15">15 dk</option>
                    <option value="30">30 dk</option>
                    <option value="45">45 dk</option>
                    <option value="60">60 dk</option>
                    <option value="90">90 dk</option>
                  </select>
                </div>
              </div>
            </div>
          </FormSection>

          <FormSection title="Muayene Detayı" description="Randevu türü ve notlar">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-slate-300">Randevu Türü <span className="text-red-400">*</span></Label>
                <select
                  {...register("type")}
                  className="w-full rounded-lg border border-white/[0.08] bg-[#1a1d2a] px-3 py-2 text-[13px] text-slate-200 focus:border-brand-500 focus:outline-none"
                >
                  <option value="CHECKUP">Kontrol</option>
                  <option value="TREATMENT">Tedavi</option>
                  <option value="XRAY">Röntgen</option>
                  <option value="CLEANING">Temizleme</option>
                  <option value="SURGERY">Cerrahi</option>
                  <option value="OTHER">Diğer</option>
                </select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label className="text-slate-300">Notlar</Label>
                <textarea
                  {...register("notes")}
                  rows={4}
                  className="w-full rounded-lg border border-white/[0.08] bg-[#1a1d2a] px-3 py-2 text-[13px] text-slate-200 focus:border-brand-500 focus:outline-none resize-none"
                  placeholder="Randevu ile ilgili notlar..."
                />
              </div>
            </div>
          </FormSection>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
            <Button type="button" variant="ghost" onClick={() => router.back()} className="text-slate-300 hover:text-white hover:bg-white/5">
              İptal
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-brand-500 hover:bg-brand-600 text-white border-0">
              {isSubmitting ? "Kaydediliyor..." : "Randevu Oluştur"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
