"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface Tab {
  key: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string;
}

interface SectionTabsProps {
  tabs: Tab[];
  defaultTab?: string;
  children: (activeTab: string) => React.ReactNode;
  className?: string;
}

export default function SectionTabs({
  tabs,
  defaultTab,
  children,
  className,
}: SectionTabsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") ?? defaultTab ?? tabs[0]?.key ?? "";

  const setTab = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", key);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className={className}>
      <div className="border-b border-white/[0.06] px-6">
        <div className="flex gap-0.5">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setTab(tab.key)}
              className={cn(
                "flex items-center gap-1.5 border-b-2 px-3 py-3 text-[13px] font-medium transition-colors",
                activeTab === tab.key
                  ? "border-brand-500 text-slate-100"
                  : "border-transparent text-slate-500 hover:text-slate-300"
              )}
            >
              {tab.icon && <span className="*:h-3.5 *:w-3.5">{tab.icon}</span>}
              {tab.label}
              {tab.badge && (
                <span className="rounded-full bg-white/[0.06] px-1.5 text-[10px] text-slate-400">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      <div>{children(activeTab)}</div>
    </div>
  );
}
