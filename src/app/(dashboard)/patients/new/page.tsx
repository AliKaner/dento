"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { User, Phone, Mail, MapPin, Calendar, Heart, Check, ArrowLeft, Info } from "lucide-react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComp } from "@/components/ui/calendar";

import PageHeader from "@/components/shared/PageHeader";

const patientSchema = z.object({
  name: z.string().min(2, "İsim en az 2 karakter olmalıdır"),
  surname: z.string().min(2, "Soyisim en az 2 karakter olmalıdır"),
  tcNo: z.string().length(11, "TC Kimlik No 11 haneli olmalıdır"),
  phone: z.string().min(10, "Geçerli bir telefon numarası giriniz"),
  email: z.string().email("Geçerli bir e-posta adresi giriniz").optional().or(z.literal("")),
  birthDate: z.date({ required_error: "Doğum tarihi seçilmelidir" }),
  gender: z.string().min(1, "Cinsiyet seçilmelidir"),
  address: z.string().optional(),
  bloodType: z.string().optional(),
  allergies: z.string().optional(),
});

type PatientFormValues = z.infer<typeof patientSchema>;

export default function NewPatientPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PatientFormValues>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      gender: "FEMALE",
      bloodType: "A_POS",
    },
  });

  const birthDate = watch("birthDate");

  const onSubmit = async (data: PatientFormValues) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/patients");
    }, 800);
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <PageHeader
        title="Yeni Hasta Kaydı"
        description="Klinik için yeni bir hasta kartı oluşturun."
        className="px-0 pt-0"
      />

      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass rounded-3xl p-8 space-y-8">
              <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-brand-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Kimlik Bilgileri</h3>
                  <p className="text-xs text-slate-500">Hastanın temel kimlik ve iletişim bilgileri</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Ad <span className="text-rose-400">*</span></Label>
                  <Input 
                    {...register("name")}
                    placeholder="Hasta adı" 
                    className="h-11 bg-black/20 border-white/[0.08] text-white rounded-xl focus:ring-2 focus:ring-brand-500/20"
                  />
                  {errors.name && <p className="text-[11px] font-medium text-rose-400 px-1">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Soyad <span className="text-rose-400">*</span></Label>
                  <Input 
                    {...register("surname")}
                    placeholder="Hasta soyadı" 
                    className="h-11 bg-black/20 border-white/[0.08] text-white rounded-xl focus:ring-2 focus:ring-brand-500/20"
                  />
                  {errors.surname && <p className="text-[11px] font-medium text-rose-400 px-1">{errors.surname.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">TC Kimlik No <span className="text-rose-400">*</span></Label>
                  <Input 
                    {...register("tcNo")}
                    placeholder="11 Haneli" 
                    maxLength={11}
                    className="h-11 bg-black/20 border-white/[0.08] text-white rounded-xl focus:ring-2 focus:ring-brand-500/20"
                  />
                  {errors.tcNo && <p className="text-[11px] font-medium text-rose-400 px-1">{errors.tcNo.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Telefon <span className="text-rose-400">*</span></Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <Input 
                      {...register("phone")}
                      placeholder="05XX XXX XX XX" 
                      className="h-11 bg-black/20 border-white/[0.08] text-white pl-10 rounded-xl focus:ring-2 focus:ring-brand-500/20"
                    />
                  </div>
                  {errors.phone && <p className="text-[11px] font-medium text-rose-400 px-1">{errors.phone.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">E-posta</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <Input 
                      {...register("email")}
                      placeholder="example@mail.com" 
                      className="h-11 bg-black/20 border-white/[0.08] text-white pl-10 rounded-xl focus:ring-2 focus:ring-brand-500/20"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Doğum Tarihi <span className="text-rose-400">*</span></Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="outline" 
                        className={cn(
                          "w-full h-11 justify-start text-left font-normal bg-black/20 border-white/[0.08] hover:bg-black/40 text-white rounded-xl",
                          !birthDate && "text-slate-500"
                        )}
                      >
                        <Calendar className="mr-3 h-4 w-4 text-slate-400" />
                        {birthDate ? format(birthDate, "d MMMM yyyy", { locale: tr }) : <span>Seçiniz</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 border-white/10 bg-[#12141c] text-white" align="center">
                      <CalendarComp
                        mode="single"
                        selected={birthDate}
                        onSelect={(date) => date && setValue("birthDate", date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.birthDate && <p className="text-[11px] font-medium text-rose-400 px-1">{errors.birthDate.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Adres</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  <textarea
                    {...register("address")}
                    rows={3}
                    className="w-full rounded-2xl border border-white/[0.08] bg-black/20 pl-10 pr-4 py-3 text-[13px] text-white focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-all resize-none"
                    placeholder="Hastanın ikamet adresi..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Health Info */}
          <div className="space-y-6">
            <div className="glass rounded-3xl p-8 space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-rose-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Sağlık Bilgileri</h3>
                  <p className="text-xs text-slate-500">Önemli tıbbi veriler</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Cinsiyet</Label>
                  <select
                    {...register("gender")}
                    className="w-full h-11 rounded-xl border border-white/[0.08] bg-black/20 px-4 text-[13px] text-white focus:border-brand-500 focus:outline-none appearance-none"
                  >
                    <option value="MALE" className="bg-[#12141c]">Erkek</option>
                    <option value="FEMALE" className="bg-[#12141c]">Kadın</option>
                    <option value="OTHER" className="bg-[#12141c]">Diğer</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Kan Grubu</Label>
                  <select
                    {...register("bloodType")}
                    className="w-full h-11 rounded-xl border border-white/[0.08] bg-black/20 px-4 text-[13px] text-white focus:border-brand-500 focus:outline-none appearance-none"
                  >
                    <option value="A_POS" className="bg-[#12141c]">A Rh (+)</option>
                    <option value="A_NEG" className="bg-[#12141c]">A Rh (-)</option>
                    <option value="B_POS" className="bg-[#12141c]">B Rh (+)</option>
                    <option value="B_NEG" className="bg-[#12141c]">B Rh (-)</option>
                    <option value="AB_POS" className="bg-[#12141c]">AB Rh (+)</option>
                    <option value="AB_NEG" className="bg-[#12141c]">AB Rh (-)</option>
                    <option value="O_POS" className="bg-[#12141c]">0 Rh (+)</option>
                    <option value="O_NEG" className="bg-[#12141c]">0 Rh (-)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Alerjiler / Hastalıklar</Label>
                  <textarea
                    {...register("allergies")}
                    rows={4}
                    className="w-full rounded-2xl border border-white/[0.08] bg-black/20 px-4 py-3 text-[13px] text-white focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-all resize-none"
                    placeholder="Varsa kronik hastalık veya alerji notları..."
                  />
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
                      Kaydı Tamamla
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
                Önemli
              </h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Hasta kartı oluşturulduktan sonra tedavi planı ve anamnez formu doldurulabilir. Lütfen TC Kimlik No'yu doğru girdiğinizden emin olun.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
