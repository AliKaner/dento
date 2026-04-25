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
  ChevronRight,
  LayoutDashboard,
  Settings,
  Search,
  PlusCircle,
  History,
  FileText,
  Wallet,
  PieChart,
  Warehouse,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SubItem {
  label: string;
  href: string;
  icon?: React.ElementType;
}

interface NavItem {
  label: string;
  icon: React.ElementType;
  href?: string;
  badge?: string;
  subItems?: SubItem[];
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const NAVIGATION: NavSection[] = [
  {
    title: "Genel",
    items: [
      { label: "Dashboard", href: "/", icon: LayoutDashboard },
      { 
        label: "Randevular", 
        icon: Calendar,
        badge: "12",
        subItems: [
          { label: "Randevu Listesi", href: "/appointments", icon: FileText },
          { label: "Takvim Görünümü", href: "/appointments/calendar", icon: Calendar },
          { label: "Yeni Randevu", href: "/appointments/new", icon: PlusCircle },
        ]
      },
    ],
  },
  {
    title: "Yönetim",
    items: [
      { 
        label: "Hastalar", 
        icon: Users,
        subItems: [
          { label: "Hasta Listesi", href: "/patients", icon: Users },
          { label: "Yeni Hasta", href: "/patients/new", icon: PlusCircle },
          { label: "Hasta Geçmişi", href: "/patients/history", icon: History },
        ]
      },
      { 
        label: "Finans", 
        icon: DollarSign,
        subItems: [
          { label: "Gelir / Gider", href: "/finance", icon: Wallet },
          { label: "Faturalar", href: "/finance/invoices", icon: FileText },
          { label: "Ödemeler", href: "/finance/payments", icon: DollarSign },
        ]
      },
      { 
        label: "Stok", 
        icon: Package,
        badge: "!",
        subItems: [
          { label: "Malzeme Listesi", href: "/inventory", icon: Warehouse },
          { label: "Kritik Stok", href: "/inventory/alerts", icon: AlertCircle },
          { label: "Tedarikçiler", href: "/inventory/suppliers", icon: Users },
        ]
      },
    ],
  },
  {
    title: "Analiz",
    items: [
      { 
        label: "Raporlar", 
        icon: BarChart2,
        subItems: [
          { label: "Genel Raporlar", href: "/reports", icon: PieChart },
          { label: "Hekim Performansı", href: "/reports/doctors", icon: Users },
          { label: "Finansal Analiz", href: "/reports/finance", icon: BarChart2 },
        ]
      },
    ],
  },
  {
    title: "Diğer",
    items: [
      { label: "Hasta Uygulaması", href: "/patient-app", icon: Smartphone },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [openItems, setOpenItems] = useState<string[]>([]);

  useEffect(() => {
    // Auto-open parent item if a sub-item is active
    NAVIGATION.forEach(section => {
      section.items.forEach(item => {
        if (item.subItems?.some(sub => pathname?.startsWith(sub.href))) {
          setOpenItems(prev => prev.includes(item.label) ? prev : [...prev, item.label]);
        }
      });
    });
  }, [pathname]);

  const toggleItem = (label: string) => {
    setOpenItems(prev => 
      prev.includes(label) ? prev.filter(i => i !== label) : [...prev, label]
    );
  };

  return (
    <aside className="w-64 h-screen flex flex-col bg-surface-app border-r border-white/[0.05] relative z-20 transition-all duration-300">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-brand-500/20">
          <span className="text-white font-bold text-xl">D</span>
        </div>
        <div className="flex flex-col">
          <span className="text-white font-bold tracking-tight text-lg leading-none">DentaFlow</span>
          <span className="text-brand-400/60 text-[10px] font-medium tracking-widest uppercase mt-1">Premium Clinic</span>
        </div>
      </div>

      <div className="px-4 mb-4">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-brand-400 transition-colors" />
          <input 
            type="text" 
            placeholder="Hızlı ara..." 
            className="w-full bg-white/[0.03] border border-white/[0.05] rounded-xl py-2 pl-9 pr-4 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500/50 transition-all"
          />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 space-y-6 custom-scrollbar pb-6">
        {NAVIGATION.map((section) => (
          <div key={section.title} className="space-y-1">
            <h3 className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2">
              {section.title}
            </h3>
            {section.items.map((item) => {
              const isOpen = openItems.includes(item.label);
              const isActive = item.href ? (pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href))) : item.subItems?.some(sub => pathname?.startsWith(sub.href));
              const Icon = item.icon;

              return (
                <div key={item.label} className="space-y-1">
                  {item.subItems ? (
                    <button
                      onClick={() => toggleItem(item.label)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
                        isActive && !isOpen ? "bg-brand-500/10 text-brand-400" : "text-slate-400 hover:text-slate-100 hover:bg-white/[0.03]"
                      )}
                    >
                      <Icon className={cn("w-5 h-5", isActive ? "text-brand-400" : "text-slate-500 group-hover:text-slate-300")} />
                      <span className="text-[13.5px] font-medium tracking-tight flex-1 text-left">
                        {item.label}
                      </span>
                      <ChevronRight className={cn("w-3.5 h-3.5 transition-transform duration-200", isOpen && "rotate-90")} />
                    </button>
                  ) : (
                    <Link
                      href={item.href || "#"}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
                        isActive ? "bg-brand-500/10 text-brand-400 shadow-[inset_0_0_20px_rgba(59,130,246,0.05)]" : "text-slate-400 hover:text-slate-100 hover:bg-white/[0.03]"
                      )}
                    >
                      {isActive && (
                        <div className="absolute left-0 w-1 h-6 bg-brand-500 rounded-r-full shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                      )}
                      <Icon className={cn("w-5 h-5", isActive ? "text-brand-400" : "text-slate-500 group-hover:text-slate-300")} />
                      <span className="text-[13.5px] font-medium tracking-tight flex-1">
                        {item.label}
                      </span>
                      {item.badge && (
                        <span className={cn(
                          "text-[10px] px-1.5 py-0.5 rounded-full font-bold",
                          item.badge === "!" ? "bg-red-500/20 text-red-400" : "bg-brand-500/20 text-brand-400"
                        )}>
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  )}

                  {item.subItems && isOpen && (
                    <div className="ml-4 pl-4 border-l border-white/5 space-y-1 py-1">
                      {item.subItems.map((sub) => {
                        const isSubActive = pathname === sub.href;
                        const SubIcon = sub.icon || Icon;
                        return (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className={cn(
                              "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group",
                              isSubActive ? "text-brand-400 bg-brand-500/5" : "text-slate-500 hover:text-slate-300 hover:bg-white/[0.02]"
                            )}
                          >
                            <SubIcon className={cn("w-4 h-4", isSubActive ? "text-brand-400" : "text-slate-600 group-hover:text-slate-400")} />
                            <span className="text-[12.5px] font-medium tracking-tight">
                              {sub.label}
                            </span>
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

      <div className="p-4 mt-auto">
        <div className="glass rounded-2xl p-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-slate-700 to-slate-900 border border-white/10 flex items-center justify-center shadow-inner">
            <span className="text-white text-xs font-bold">DT</span>
          </div>
          <div className="flex-1 min-w-0 text-left">
            <p className="text-sm font-semibold text-white truncate leading-none">Dr. Tansu Kaya</p>
            <p className="text-[10px] text-brand-400/70 font-medium mt-1 uppercase tracking-wider">Klinik Sahibi</p>
          </div>
          <Link href="/settings" className="p-1.5 rounded-lg hover:bg-white/5 text-slate-500 hover:text-slate-200 transition-colors">
            <Settings className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
