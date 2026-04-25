import Link from "next/link";
import { ArrowLeft, Edit, FileText, Calendar as CalendarIcon, Clock, User, CheckCircle } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import PageHeader from "@/components/shared/PageHeader";
import { DetailCard } from "@/components/shared/DetailCard";
import StatusBadge from "@/components/shared/StatusBadge";
import AlertBanner from "@/components/shared/AlertBanner";

export default function AppointmentDetailPage({ params }: { params: { id: string } }) {
  // Mock Data
  const appointment = {
    id: params.id,
    patientName: "Ayşe Yılmaz",
    patientPhone: "0532 123 45 67",
    patientAge: 34,
    patientId: "p1",
    doctorName: "Dr. Ali Yılmaz",
    date: "26 Ekim 2023",
    time: "09:00",
    duration: "30 Dk",
    type: "TREATMENT",
    status: "CONFIRMED",
    notes: "Hastanın kanal tedavisi için ikinci seansı. Röntgen çekilmesi gerekiyor.",
    createdAt: "20 Eki 2023, 14:30"
  };

  return (
    <div className="flex flex-col h-full bg-[#13151f] rounded-xl border border-white/5 overflow-hidden">
      <PageHeader
        title="Randevu Detayı"
        badge={`#${appointment.id}`}
        breadcrumb={[
          { label: "Randevular", href: "/appointments" },
          { label: "Detay" }
        ]}
        action={
          <div className="flex items-center gap-2">
            <Link href={`/appointments/${appointment.id}/edit`} className={buttonVariants({ variant: "outline", className: "border-white/10 text-slate-300 hover:bg-white/5" })}>
              <Edit className="mr-2 h-4 w-4" />
              Düzenle
            </Link>
            {appointment.status !== "COMPLETED" && (
              <Button className="bg-brand-500 hover:bg-brand-600 text-white">
                <CheckCircle className="mr-2 h-4 w-4" />
                Tamamlandı İşaretle
              </Button>
            )}
          </div>
        }
      />

      <div className="flex-1 overflow-y-auto p-6 pt-0">
        {appointment.status === "CONFIRMED" && (
          <AlertBanner 
            variant="info" 
            title="Randevu Onaylandı" 
            description="Hasta randevusunu onayladı ve zamanında geleceğini belirtti." 
            className="mb-6"
          />
        )}

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <DetailCard
              title="Randevu Bilgileri"
              sections={[
                { label: "Tarih", value: <div className="flex items-center gap-2"><CalendarIcon className="h-4 w-4 text-slate-400"/> {appointment.date}</div> },
                { label: "Saat", value: <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-slate-400"/> {appointment.time}</div> },
                { label: "Süre", value: appointment.duration },
                { label: "Doktor", value: <div className="flex items-center gap-2"><User className="h-4 w-4 text-slate-400"/> {appointment.doctorName}</div> },
                { label: "Durum", value: <StatusBadge status={appointment.status} /> },
                { label: "Tür", value: <span className="text-slate-300">{appointment.type}</span> },
                { label: "Notlar", value: appointment.notes, colSpan: 2 },
              ]}
            />

            <div className="rounded-xl border border-white/5 bg-[#1a1d2a] p-5 flex items-center justify-between">
              <div>
                <h3 className="font-medium text-slate-200">Muayene Kaydı</h3>
                <p className="text-sm text-slate-500 mt-1">Bu randevu için muayene kaydı oluşturun veya görüntüleyin.</p>
              </div>
              <Link href={`/exam/new?appointmentId=${appointment.id}`} className={buttonVariants({ variant: "default", className: "bg-[#1e3a5f] hover:bg-[#254673] text-brand-300" })}>
                <FileText className="mr-2 h-4 w-4" />
                Kayıt Oluştur
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <DetailCard
              title="Hasta Özeti"
              sections={[
                { label: "Ad Soyad", value: <Link href={`/patients/${appointment.patientId}`} className="text-brand-400 hover:underline">{appointment.patientName}</Link>, colSpan: 2 },
                { label: "Telefon", value: appointment.patientPhone, colSpan: 2 },
                { label: "Yaş", value: appointment.patientAge.toString(), colSpan: 2 },
              ]}
              action={
                <Link href={`/patients/${appointment.patientId}`} className={buttonVariants({ variant: "ghost", size: "sm", className: "h-8 text-brand-400 hover:text-brand-300 hover:bg-brand-400/10" })}>
                  Profili Gör
                </Link>
              }
            />

            <DetailCard
              title="Sistem Bilgileri"
              sections={[
                { label: "Randevu ID", value: <span className="font-mono text-xs">{appointment.id}</span>, colSpan: 2 },
                { label: "Oluşturulma", value: appointment.createdAt, colSpan: 2 },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
