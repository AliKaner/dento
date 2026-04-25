type EmptyVariant =
  | "appointments"
  | "patients"
  | "invoices"
  | "inventory"
  | "exam"
  | "documents";

const ICONS: Record<EmptyVariant, () => React.ReactElement> = {
  appointments: () => (
    <svg width={64} height={64} viewBox="0 0 64 64" aria-hidden>
      <rect x={8} y={12} width={48} height={44} rx={8} fill="#1e3a5f" stroke="#2d5a9e" strokeWidth={1}/>
      <rect x={8} y={22} width={48} height={2} fill="#2d5a9e" opacity={0.5}/>
      <rect x={18} y={8} width={4} height={10} rx={2} fill="#60a5fa"/>
      <rect x={42} y={8} width={4} height={10} rx={2} fill="#60a5fa"/>
      <rect x={16} y={32} width={14} height={4} rx={2} fill="#1e3a5f"/>
      <rect x={34} y={32} width={14} height={4} rx={2} fill="#1e3a5f"/>
      <rect x={16} y={40} width={10} height={4} rx={2} fill="#1e3a5f"/>
      <circle cx={46} cy={46} r={10} fill="#0a0b0f" stroke="#1e2535" strokeWidth={1}/>
      <line x1={42} y1={46} x2={50} y2={46} stroke="#334155" strokeWidth={1.5} strokeLinecap="round"/>
      <line x1={46} y1={42} x2={46} y2={50} stroke="#334155" strokeWidth={1.5} strokeLinecap="round"/>
    </svg>
  ),
  patients: () => (
    <svg width={64} height={64} viewBox="0 0 64 64" aria-hidden>
      <circle cx={32} cy={22} r={12} fill="#2e1f5e" stroke="#5a3fa0" strokeWidth={1}/>
      <circle cx={32} cy={22} r={6} fill="#1a1025" stroke="#3a2a5a" strokeWidth={0.8}/>
      <path d="M12 56 C12 44 20 38 32 38 C44 38 52 44 52 56" fill="#2e1f5e" stroke="#5a3fa0" strokeWidth={1}/>
      <line x1={28} y1={48} x2={36} y2={48} stroke="#3a2a5a" strokeWidth={5} strokeLinecap="round"/>
      <line x1={32} y1={44} x2={32} y2={52} stroke="#3a2a5a" strokeWidth={5} strokeLinecap="round"/>
    </svg>
  ),
  invoices: () => (
    <svg width={64} height={64} viewBox="0 0 64 64" aria-hidden>
      <rect x={14} y={8} width={36} height={46} rx={6} fill="#3d2c0a" stroke="#6b4a12" strokeWidth={1}/>
      <rect x={20} y={18} width={24} height={2} rx={1} fill="#6b4a12"/>
      <rect x={20} y={24} width={18} height={2} rx={1} fill="#6b4a12"/>
      <rect x={20} y={30} width={20} height={2} rx={1} fill="#6b4a12"/>
      <rect x={20} y={38} width={24} height={8} rx={3} fill="#5a3a0a"/>
      <line x1={26} y1={42} x2={38} y2={42} stroke="#3d2c0a" strokeWidth={5} strokeLinecap="round"/>
    </svg>
  ),
  inventory: () => (
    <svg width={64} height={64} viewBox="0 0 64 64" aria-hidden>
      <path d="M32 8 L54 46 L10 46 Z" fill="#0a2e1a" stroke="#1a4a2e" strokeWidth={1}/>
      <line x1={32} y1={22} x2={32} y2={34} stroke="#34d399" strokeWidth={2.5} strokeLinecap="round"/>
      <circle cx={32} cy={39} r={2} fill="#34d399"/>
      <circle cx={50} cy={50} r={8} fill="#0a2e1a" stroke="#1a4a2e" strokeWidth={1}/>
      <path d="M47 50 L49.5 52.5 L53 47" stroke="#34d399" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  ),
  exam: () => (
    <svg width={64} height={64} viewBox="0 0 64 64" aria-hidden>
      <rect x={12} y={8} width={40} height={48} rx={6} fill="#3b1a12" stroke="#6b3a20" strokeWidth={1}/>
      <rect x={20} y={18} width={24} height={2} rx={1} fill="#6b3a20"/>
      <rect x={20} y={24} width={16} height={2} rx={1} fill="#6b3a20"/>
      <path d="M20 36 C20 32 24 30 28 30 C32 30 36 32 36 36 C36 40 34 42 28 44 C22 42 20 40 20 36Z" fill="#5a2a14" stroke="#7a3a18" strokeWidth={0.8}/>
      <line x1={28} y1={33} x2={28} y2={39} stroke="#fb923c" strokeWidth={1.5} strokeLinecap="round"/>
      <line x1={25} y1={36} x2={31} y2={36} stroke="#fb923c" strokeWidth={1.5} strokeLinecap="round"/>
    </svg>
  ),
  documents: () => (
    <svg width={64} height={64} viewBox="0 0 64 64" aria-hidden>
      <path d="M36 10 L48 22 L48 50 C48 52.2 46.2 54 44 54 L20 54 C17.8 54 16 52.2 16 50 L16 14 C16 11.8 17.8 10 20 10 Z" fill="#1e2535" stroke="#2d3748" strokeWidth={1}/>
      <path d="M36 10 L36 22 L48 22" fill="none" stroke="#2d3748" strokeWidth={1}/>
      <line x1={24} y1={30} x2={40} y2={30} stroke="#2d3748" strokeWidth={4} strokeLinecap="round"/>
      <line x1={24} y1={37} x2={36} y2={37} stroke="#2d3748" strokeWidth={4} strokeLinecap="round"/>
      <circle cx={32} cy={32} r={14} fill="none" stroke="#334155" strokeWidth={1.5} strokeDasharray="3 3"/>
      <line x1={22} y1={22} x2={42} y2={42} stroke="#3b1212" strokeWidth={1.5} strokeLinecap="round"/>
    </svg>
  ),
};

const COPY: Record<EmptyVariant, { title: string; description: string }> = {
  appointments: { title: "Randevu yok",      description: "Henüz randevu oluşturulmamış" },
  patients:     { title: "Hasta yok",         description: "İlk hastayı kaydedin" },
  invoices:     { title: "Fatura yok",        description: "Bekleyen ödeme bulunmuyor" },
  inventory:    { title: "Stok normal",       description: "Kritik uyarı yok" },
  exam:         { title: "Muayene kaydı yok", description: "Henüz muayene yapılmamış" },
  documents:    { title: "Belge yok",         description: "Henüz dosya yüklenmemiş" },
};

export default function EmptyStateIllustration({
  variant,
  title,
  description,
  action,
}: {
  variant: EmptyVariant;
  title?: string;
  description?: string;
  action?: React.ReactNode;
}) {
  const Icon = ICONS[variant];
  const copy = COPY[variant];
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4">
        <Icon />
      </div>
      <h3 className="mb-1 text-[14px] font-medium text-slate-400">
        {title ?? copy.title}
      </h3>
      <p className="mb-4 max-w-[200px] text-[12px] leading-relaxed text-slate-600">
        {description ?? copy.description}
      </p>
      {action}
    </div>
  );
}
