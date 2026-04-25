"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Button, buttonVariants } from "@/components/ui/button";
import PageHeader from "@/components/shared/PageHeader";
import FilterBar from "@/components/shared/FilterBar";
import DataTable from "@/components/shared/DataTable";
import StatusBadge from "@/components/shared/StatusBadge";
import ActionMenu from "@/components/shared/ActionMenu";

// Mock Data
const mockAppointments = [
  { id: "1", time: "09:00", date: "26 Eki 2023", patient: "Ayşe Yılmaz", doctor: "Dr. Ali", type: "TREATMENT", status: "CONFIRMED" },
  { id: "2", time: "10:30", date: "26 Eki 2023", patient: "Mehmet Demir", doctor: "Dr. Ali", type: "CHECKUP", status: "IN_PROGRESS" },
  { id: "3", time: "11:45", date: "26 Eki 2023", patient: "Zeynep Çelik", doctor: "Dr. Ayşe", type: "CLEANING", status: "SCHEDULED" },
  { id: "4", time: "14:00", date: "26 Eki 2023", patient: "Can Özkan", doctor: "Dr. Ali", type: "XRAY", status: "CANCELLED" },
  { id: "5", time: "15:30", date: "26 Eki 2023", patient: "Elif Kaya", doctor: "Dr. Ayşe", type: "SURGERY", status: "COMPLETED" },
  { id: "6", time: "16:00", date: "26 Eki 2023", patient: "Ahmet Yılmaz", doctor: "Dr. Ali", type: "OTHER", status: "NO_SHOW" },
];

export default function AppointmentsPage() {
  const [search, setSearch] = useState("");
  const [doctorFilter, setDoctorFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const columns: ColumnDef<any>[] = [
    { accessorKey: "date", header: "Tarih" },
    { accessorKey: "time", header: "Saat" },
    { accessorKey: "patient", header: "Hasta Adı" },
    { accessorKey: "doctor", header: "Doktor" },
    { accessorKey: "type", header: "Tür" },
    { 
      accessorKey: "status", 
      header: "Durum",
      cell: ({ row }) => <StatusBadge status={row.original.status} />
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <div className="flex justify-end">
            <ActionMenu
              items={[
                { label: "Görüntüle", href: `/appointments/${row.original.id}` },
                { label: "Düzenle", href: `/appointments/${row.original.id}/edit` },
                { label: "separator" },
                { label: "İptal Et", destructive: true, onClick: () => alert("İptal edildi") }
              ]}
            />
          </div>
        );
      }
    }
  ];

  const filteredData = mockAppointments.filter((apt) => {
    if (search && !apt.patient.toLowerCase().includes(search.toLowerCase())) return false;
    if (doctorFilter && apt.doctor !== doctorFilter) return false;
    if (statusFilter && apt.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="flex flex-col h-full bg-[#13151f] rounded-xl border border-white/5">
      <PageHeader
        title="Randevular"
        description="Tüm hasta randevularını görüntüleyin ve yönetin."
        badge={`${filteredData.length} Kayıt`}
        action={
          <Link href="/appointments/new" className={buttonVariants({ variant: "default", className: "bg-brand-500 hover:bg-brand-600 text-white" })}>
            <Plus className="mr-2 h-4 w-4" />
            Yeni Randevu
          </Link>
        }
      />

      <FilterBar
        search={{
          value: search,
          onChange: setSearch,
          placeholder: "Hasta adı ara...",
        }}
        filters={[
          {
            key: "doctor",
            label: "Tüm Doktorlar",
            type: "select",
            value: doctorFilter,
            onChange: setDoctorFilter,
            options: [
              { label: "Dr. Ali", value: "Dr. Ali" },
              { label: "Dr. Ayşe", value: "Dr. Ayşe" },
            ],
          },
          {
            key: "status",
            label: "Tüm Durumlar",
            type: "select",
            value: statusFilter,
            onChange: setStatusFilter,
            options: [
              { label: "Planlandı", value: "SCHEDULED" },
              { label: "Onaylandı", value: "CONFIRMED" },
              { label: "Devam Ediyor", value: "IN_PROGRESS" },
              { label: "Tamamlandı", value: "COMPLETED" },
              { label: "İptal", value: "CANCELLED" },
              { label: "Gelmedi", value: "NO_SHOW" },
            ],
          },
        ]}
        actions={
          <Link href="/appointments/calendar" className={buttonVariants({ variant: "outline", className: "border-white/10 text-slate-300 hover:bg-white/5" })}>
            Takvim Görünümü
          </Link>
        }
      />

      <div className="flex-1 p-6 pt-0">
        <DataTable columns={columns} data={filteredData} />
      </div>
    </div>
  );
}
