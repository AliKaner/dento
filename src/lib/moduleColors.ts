export const MODULE_COLORS = {
  appointments: { bg: "bg-[#1e3a5f]", text: "text-[#60a5fa]" },
  patients:     { bg: "bg-[#2e1f5e]", text: "text-[#a78bfa]" },
  exam:         { bg: "bg-[#3b1a12]", text: "text-[#fb923c]" },
  finance:      { bg: "bg-[#3d2c0a]", text: "text-[#fbbf24]" },
  inventory:    { bg: "bg-[#0a2e1a]", text: "text-[#34d399]" },
  reports:      { bg: "bg-[#0c2340]", text: "text-[#38bdf8]" },
  patientApp:   { bg: "bg-[#3b1228]", text: "text-[#f472b6]" },
  clinic:       { bg: "bg-[#1e2535]", text: "text-[#94a3b8]" },
  integrations: { bg: "bg-[#3b1212]", text: "text-[#f87171]" },
} as const;

export type ModuleKey = keyof typeof MODULE_COLORS;
