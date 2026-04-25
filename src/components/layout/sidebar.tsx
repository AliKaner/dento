"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calendar,
  Users,
  ClipboardCheck,
  DollarSign,
  Package,
  BarChart2,
  Smartphone,
  Radio,
  Share2,
  ChevronRight,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SubItem {
  label: string;
  href: string;
}

interface NavItem {
  key: string;
  label: string;
  icon: React.ElementType;
  iconColor: string;
  iconStroke: string;
  badge?: string;
  badgeColor?: string;
  subItems: SubItem[];
}

const NAV_SECTIONS: { label: string; items: NavItem[] }[] = [
  {
    label: "Ana Menü",
    items: [
      {
        key: "randevu",
        label: "Randevu Yönetimi",
        icon: Calendar,
        iconColor: "bg-blue-900/60",
        iconStroke: "text-blue-400",
        badge: "12",
        badgeColor: "bg-blue-900 text-blue-400",
        subItems: [
          { label: "Takvim görünümü", href: "/appointments/calendar" },
          { label: "Online randevu alma", href: "/appointments/online" },
          { label: "SMS / e-posta hatırlatma", href: "/appointments/reminders" },
          { label: "Bekleme listesi", href: "/appointments/waitlist" },
        ],
      },
      {
        key: "hasta",
        label: "Hasta Yönetimi",
        icon: Users,
        iconColor: "bg-violet-900/60",
        iconStroke: "text-violet-400",
        subItems: [
          { label: "Hasta kartı ve geçmiş", href: "/patients" },
          { label: "Röntgen ve belgeler", href: "/patients/documents" },
          { label: "Anamnez formu", href: "/patients/anamnesis" },
          { label: "İlaç alerjileri", href: "/patients/allergies" },
          { label: "Sigorta bilgileri", href: "/patients/insurance" },
        ],
      },
      {
        key: "muayene",
        label: "Klinik Muayene",
        icon: ClipboardCheck,
        iconColor: "bg-orange-900/50",
        iconStroke: "text-orange-400",
        subItems: [
          { label: "Diş şeması (odontogram)", href: "/exam/odontogram" },
          { label: "Tedavi planı", href: "/exam/treatment-plan" },
          { label: "Klinik notlar", href: "/exam/notes" },
          { label: "Reçete yazma", href: "/exam/prescription" },
          { label: "Fotoğraf ekleme", href: "/exam/photos" },
        ],
      },
      {
        key: "finans",
        label: "Finans ve Fatura",
        icon: DollarSign,
        iconColor: "bg-amber-900/50",
        iconStroke: "text-amber-400",
        badge: "3",
        badgeColor: "bg-amber-900 text-amber-400",
        subItems: [
          { label: "Fatura oluşturma", href: "/finance/invoices" },
          { label: "Ödeme takibi", href: "/finance/payments" },
          { label: "Taksit planı", href: "/finance/installments" },
          { label: "Gelir / gider raporu", href: "/finance/reports" },
        ],
      },
      {
        key: "stok",
        label: "Stok ve Malzeme",
        icon: Package,
        iconColor: "bg-emerald-900/50",
        iconStroke: "text-emerald-400",
        badge: "!",
        badgeColor: "bg-red-900 text-red-400",
        subItems: [
          { label: "Sarf malzeme takibi", href: "/inventory" },
          { label: "Kritik stok uyarısı", href: "/inventory/alerts" },
          { label: "Tedarikçi yönetimi", href: "/inventory/suppliers" },
          { label: "Sterilizasyon takibi", href: "/inventory/sterilization" },
        ],
      },
    ],
  },
  {
    label: "Destek Katmanı",
    items: [
      {
        key: "raporlar",
        label: "Raporlar ve Analitik",
        icon: BarChart2,
        iconColor: "bg-sky-900/50",
        iconStroke: "text-sky-400",
        subItems: [
          { label: "Doluluk oranı", href: "/reports/occupancy" },
          { label: "Hekim performansı", href: "/reports/performance" },
          { label: "Hasta sadakat analizi", href: "/reports/retention" },
          { label: "Aylık gelir özeti", href: "/reports/revenue" },
        ],
      },
      {
        key: "hasta-app",
        label: "Hasta Uygulaması",
        icon: Smartphone,
        iconColor: "bg-pink-900/50",
        iconStroke: "text-pink-400",
        subItems: [
          { label: "Randevu alma / iptal", href: "/patient-app/appointments" },
          { label: "Tedavi geçmişi", href: "/patient-app/history" },
          { label: "Online ödeme", href: "/patient-app/payment" },
        ],
      },
      {
        key: "klinik",
        label: "Klinik Yönetim",
        icon: Radio,
        iconColor: "bg-slate-700/50",
        iconStroke: "text-slate-400",
        subItems: [
          { label: "Personel ve roller", href: "/clinic/staff" },
          { label: "Vardiya ve çalışma saati", href: "/clinic/shifts" },
          { label: "KVKK ve log", href: "/clinic/compliance" },
        ],
      },
      {
        key: "entegrasyon",
        label: "Entegrasyonlar",
        icon: Share2,
        iconColor: "bg-red-900/50",
        iconStroke: "text-red-400",
        subItems: [
          { label: "E-fatura (GİB)", href: "/integrations/einvoice" },
          { label: "WhatsApp / SMS API", href: "/integrations/messaging" },
          { label: "Ödeme altyapısı", href: "/integrations/payment" },
        ],
      },
    ],
  },
];

function getOpenKeyFromPath(pathname: string): string {
  for (const section of NAV_SECTIONS) {
    for (const item of section.items) {
      if (
        item.subItems.some(
          (sub) =>
            pathname === sub.href || pathname.startsWith(sub.href + "/")
        )
      ) {
        return item.key;
      }
    }
  }
  return "";
}

export default function DentalSidebar() {
  const pathname = usePathname();
  const [openKey, setOpenKey] = useState(() => getOpenKeyFromPath(pathname));

  useEffect(() => {
    const key = getOpenKeyFromPath(pathname);
    if (key) setOpenKey(key);
  }, [pathname]);

  const toggle = (key: string) =>
    setOpenKey((prev) => (prev === key ? "" : key));

  return (
    <aside className="flex h-screen w-[260px] flex-col bg-[#13151f] border-r border-white/[0.06] px-2.5 py-4 shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-2 pb-4 mb-1 border-b border-white/[0.05]">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shrink-0">
          <Zap className="h-4 w-4 text-white" strokeWidth={2.5} />
        </div>
        <div className="flex flex-col">
          <span className="text-[14px] font-semibold text-slate-100 tracking-tight leading-none">
            DentaFlow
          </span>
          <span className="text-[11px] text-slate-500 mt-0.5">Klinik Yönetimi</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col gap-0.5 py-2 scrollbar-none">
        {NAV_SECTIONS.map((section) => (
          <div key={section.label}>
            <p className="px-3 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-widest text-slate-600">
              {section.label}
            </p>
            {section.items.map((item) => {
              const isOpen = openKey === item.key;
              const Icon = item.icon;

              return (
                <div key={item.key}>
                  <button
                    onClick={() => toggle(item.key)}
                    className={cn(
                      "flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 transition-colors duration-150 text-left",
                      isOpen ? "bg-white/[0.05]" : "hover:bg-white/[0.04]"
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                        item.iconColor
                      )}
                    >
                      <Icon
                        className={cn("h-[15px] w-[15px]", item.iconStroke)}
                        strokeWidth={1.8}
                      />
                    </div>
                    <span
                      className={cn(
                        "flex-1 text-[13.5px] font-medium tracking-tight transition-colors",
                        isOpen ? "text-slate-200" : "text-slate-400"
                      )}
                    >
                      {item.label}
                    </span>
                    {item.badge && (
                      <span
                        className={cn(
                          "rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
                          item.badgeColor
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight
                      className={cn(
                        "h-3.5 w-3.5 shrink-0 text-slate-600 transition-transform duration-200",
                        isOpen && "rotate-90 text-slate-400"
                      )}
                    />
                  </button>

                  {isOpen && (
                    <div className="flex flex-col gap-px pb-1 pl-[42px] pr-1">
                      {item.subItems.map((sub) => {
                        const isActive =
                          pathname === sub.href ||
                          pathname.startsWith(sub.href + "/");
                        return (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className={cn(
                              "flex items-center gap-2 rounded-lg px-2.5 py-[7px] text-[13px] font-normal tracking-tight transition-colors duration-100",
                              isActive
                                ? "bg-blue-900/20 text-blue-300"
                                : "text-slate-500 hover:bg-white/[0.04] hover:text-slate-300"
                            )}
                          >
                            <span
                              className={cn(
                                "h-1.5 w-1.5 shrink-0 rounded-full",
                                isActive ? "bg-blue-400" : "bg-slate-700"
                              )}
                            />
                            {sub.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User Footer */}
      <div className="border-t border-white/[0.05] pt-2">
        <button className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2.5 hover:bg-white/[0.04] transition-colors">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-600 text-[13px] font-semibold text-white">
            DT
          </div>
          <div className="flex-1 overflow-hidden text-left">
            <p className="text-[13px] font-medium text-slate-200 truncate">
              Dr. Tansu Kaya
            </p>
            <p className="text-[11px] text-slate-500">Klinik Sahibi</p>
          </div>
          <Radio
            className="h-3.5 w-3.5 shrink-0 text-slate-600"
            strokeWidth={1.8}
          />
        </button>
      </div>
    </aside>
  );
}
