import { cn } from "@/lib/utils";

const Icon = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" aria-hidden>
    <defs>
      <linearGradient id="df-g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#6366f1" />
      </linearGradient>
    </defs>
    <rect width={36} height={36} rx={9} fill="url(#df-g)" />
    <path
      d="M18 6 C14 6 11 9 11 13 C11 16 12.5 18 14 20 L15 26 L21 26 L22 20 C23.5 18 25 16 25 13 C25 9 22 6 18 6Z"
      fill="white"
      opacity={0.95}
    />
    <path
      d="M15 26 C15 28 16.2 29 18 29 C19.8 29 21 28 21 26"
      fill="none"
      stroke="white"
      strokeWidth={1.2}
      strokeLinecap="round"
      opacity={0.7}
    />
  </svg>
);

export default function DentaFlowLogo({
  variant = "full",
  iconSize = 32,
  className,
}: {
  variant?: "icon" | "full" | "wordmark";
  iconSize?: number;
  className?: string;
}) {
  if (variant === "icon")
    return (
      <div className={className}>
        <Icon size={iconSize} />
      </div>
    );

  if (variant === "wordmark")
    return (
      <svg
        width={120}
        height={28}
        viewBox="0 0 120 28"
        aria-label="DentaFlow"
        className={className}
      >
        <defs>
          <linearGradient id="df-wm" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>
        </defs>
        <text x={0} y={20} fontSize={18} fontWeight={600} fontFamily="sans-serif" fill="url(#df-wm)" letterSpacing={-0.5}>
          Denta
        </text>
        <text x={58} y={20} fontSize={18} fontWeight={300} fontFamily="sans-serif" fill="#f1f5f9" letterSpacing={-0.5}>
          Flow
        </text>
      </svg>
    );

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <Icon size={iconSize} />
      <div className="flex flex-col">
        <span className="text-[14px] font-semibold leading-none tracking-tight text-slate-100">
          DentaFlow
        </span>
        <span className="mt-0.5 text-[11px] tracking-wide text-slate-500">
          Klinik Yönetimi
        </span>
      </div>
    </div>
  );
}
