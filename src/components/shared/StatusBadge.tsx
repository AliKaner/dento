import { cn } from "@/lib/utils";

export const STATUS_STYLES: Record<string, string> = {
  SCHEDULED:   "bg-[#1e3a5f] text-[#93c5fd]",
  CONFIRMED:   "bg-[#0a2e1a] text-[#6ee7b7]",
  IN_PROGRESS: "bg-[#3d2c0a] text-[#fde68a]",
  COMPLETED:   "bg-[#1e2535] text-[#94a3b8]",
  CANCELLED:   "bg-[#3b1212] text-[#fca5a5]",
  NO_SHOW:     "bg-[#3b1a12] text-[#fdba74]",
  DRAFT:       "bg-[#1e2535] text-[#94a3b8]",
  SENT:        "bg-[#1e3a5f] text-[#93c5fd]",
  PAID:        "bg-[#0a2e1a] text-[#6ee7b7]",
  PARTIAL:     "bg-[#3d2c0a] text-[#fde68a]",
  OVERDUE:     "bg-[#3b1212] text-[#fca5a5]",
  OK:          "bg-[#0a2e1a] text-[#6ee7b7]",
  LOW:         "bg-[#3d2c0a] text-[#fde68a]",
  CRITICAL:    "bg-[#3b1212] text-[#fca5a5]",
  ACTIVE:      "bg-[#0a2e1a] text-[#6ee7b7]",
  INACTIVE:    "bg-[#1e2535] text-[#64748b]",
};

export const STATUS_LABELS: Record<string, string> = {
  SCHEDULED:   "Planlandı",
  CONFIRMED:   "Onaylandı",
  IN_PROGRESS: "Devam Ediyor",
  COMPLETED:   "Tamamlandı",
  CANCELLED:   "İptal",
  NO_SHOW:     "Gelmedi",
  DRAFT:       "Taslak",
  SENT:        "Gönderildi",
  PAID:        "Ödendi",
  PARTIAL:     "Kısmi Ödeme",
  OVERDUE:     "Gecikmiş",
  OK:          "Yeterli",
  LOW:         "Azalıyor",
  CRITICAL:    "Kritik",
  ACTIVE:      "Aktif",
  INACTIVE:    "Pasif",
};

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const style = STATUS_STYLES[status] ?? "bg-[#1e2535] text-[#94a3b8]";
  const label = STATUS_LABELS[status] ?? status;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium leading-none",
        style,
        className
      )}
    >
      {label}
    </span>
  );
}
