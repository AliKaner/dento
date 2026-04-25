import Link from "next/link";
import { ArrowLeft, Edit, FileText, Calendar as CalendarIcon, Clock, User, CheckCircle } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import PageHeader from "@/components/shared/PageHeader";
import { DetailCard, DetailRow } from "@/components/shared/DetailCard";
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
            <DetailCard title="Randevu Bilgileri">
              <DetailRow label="Tarih" value={<div className="flex items-center gap-2 font-medium text-white"><CalendarIcon className="h-4 w-4 text-brand-400"/> {appointment.date}</div>} />
              <DetailRow label="Saat" value={<div className="flex items-center gap-2 font-medium text-white"><Clock className="h-4 w-4 text-brand-400"/> {appointment.time}</div>} />
              <DetailRow label="Süre" value={appointment.duration} />
              <DetailRow label="Doktor" value={<div className="flex items-center gap-2 font-medium text-white"><User className="h-4 w-4 text-brand-400"/> {appointment.doctorName}</div>} />
              <DetailRow label="Durum" value={<StatusBadge status={appointment.status} />} />
              <DetailRow label="Tür" value={<span className="text-slate-300">{appointment.type}</span>} />
              <DetailRow label="Notlar" value={appointment.notes} fullWidth />
            </DetailCard>

            <div className="glass rounded-3xl p-6 flex items-center justify-between border-white/[0.05]">
              <div>
                <h3 className="font-bold text-white">Muayene Kaydı</h3>
                <p className="text-xs text-slate-500 mt-1">Bu randevu için muayene kaydı oluşturun veya görüntüleyin.</p>
              </div>
              <Link href={`/exam/new?appointmentId=${appointment.id}`} className={buttonVariants({ variant: "default", className: "bg-brand-500/10 hover:bg-brand-500/20 text-brand-400 border-0" })}>
                <FileText className="mr-2 h-4 w-4" />
                Kayıt Oluştur
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <DetailCard
              title="Hasta Özeti"
              action={
                <Link href={`/patients/${appointment.patientId}`} className="text-xs text-brand-400 hover:text-brand-300 font-bold">
                  Profili Gör
                </Link>
              }
            >
              <DetailRow label="Ad Soyad" value={<Link href={`/patients/${appointment.patientId}`} className="text-brand-400 hover:underline font-bold">{appointment.patientName}</Link>} />
              <DetailRow label="Telefon" value={appointment.patientPhone} />
              <DetailRow label="Yaş" value={appointment.patientAge.toString()} />
            </DetailCard>

            <DetailCard title="Sistem Bilgileri">
              <DetailRow label="Randevu ID" value={<span className="font-mono text-xs">{appointment.id}</span>} />
              <DetailRow label="Oluşturulma" value={appointment.createdAt} />
            </DetailCard>
          </div>
        </div>
      </div>
    </div>
  );
}
