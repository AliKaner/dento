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
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ModuleKey =
  | "appointments"
  | "patients"
  | "exam"
  | "finance"
  | "inventory"
  | "reports"
  | "patientApp"
  | "clinic"
  | "integrations";

const M: Record<ModuleKey, { Icon: LucideIcon; bg: string; text: string }> = {
  appointments: { Icon: Calendar,       bg: "bg-[#1e3a5f]", text: "text-[#60a5fa]" },
  patients:     { Icon: Users,          bg: "bg-[#2e1f5e]", text: "text-[#a78bfa]" },
  exam:         { Icon: ClipboardCheck, bg: "bg-[#3b1a12]", text: "text-[#fb923c]" },
  finance:      { Icon: DollarSign,     bg: "bg-[#3d2c0a]", text: "text-[#fbbf24]" },
  inventory:    { Icon: Package,        bg: "bg-[#0a2e1a]", text: "text-[#34d399]" },
  reports:      { Icon: BarChart2,      bg: "bg-[#0c2340]", text: "text-[#38bdf8]" },
  patientApp:   { Icon: Smartphone,     bg: "bg-[#3b1228]", text: "text-[#f472b6]" },
  clinic:       { Icon: Radio,          bg: "bg-[#1e2535]", text: "text-[#94a3b8]" },
  integrations: { Icon: Share2,         bg: "bg-[#3b1212]", text: "text-[#f87171]" },
};

const S = {
  sm: { w: "h-7 w-7 rounded-lg",   i: "h-3.5 w-3.5" },
  md: { w: "h-8 w-8 rounded-lg",   i: "h-[15px] w-[15px]" },
  lg: { w: "h-10 w-10 rounded-xl", i: "h-5 w-5" },
};

export default function ModuleIcon({
  module,
  size = "md",
  className,
}: {
  module: ModuleKey;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const { Icon, bg, text } = M[module];
  const s = S[size];
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center",
        bg,
        s.w,
        className
      )}
    >
      <Icon className={cn(text, s.i)} strokeWidth={1.8} />
    </div>
  );
}
