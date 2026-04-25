interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {icon && (
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.04] text-slate-600">
          {icon}
        </div>
      )}
      <h3 className="mb-1 text-[14px] font-medium text-slate-400">{title}</h3>
      {description && (
        <p className="mb-4 max-w-[220px] text-[12px] leading-relaxed text-slate-600">
          {description}
        </p>
      )}
      {action}
    </div>
  );
}
