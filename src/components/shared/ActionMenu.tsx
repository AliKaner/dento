"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

type ActionItem =
  | { label: "separator" }
  | {
      label: string;
      icon?: React.ReactNode;
      href?: string;
      onClick?: () => void;
      destructive?: boolean;
      disabled?: boolean;
    };

interface ActionMenuProps {
  items: ActionItem[];
}

export default function ActionMenu({ items }: ActionMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-500 hover:bg-white/[0.05] hover:text-slate-300 transition-colors"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 min-w-[160px] rounded-xl border border-white/[0.08] bg-[#1a1d2a] py-1 shadow-xl">
          {items.map((item, i) => {
            if (item.label === "separator") {
              return (
                <div key={i} className="my-1 border-t border-white/[0.06]" />
              );
            }
            // TypeScript workaround for discriminant union with string overlapping
            const actionItem = item as { label: string; icon?: React.ReactNode; href?: string; onClick?: () => void; destructive?: boolean; disabled?: boolean; };
            const content = (
              <>
                {actionItem.icon && (
                  <span className="*:h-3.5 *:w-3.5">{actionItem.icon}</span>
                )}
                {actionItem.label}
              </>
            );
            const cls = cn(
              "flex w-full items-center gap-2 px-3 py-1.5 text-[13px] transition-colors",
              actionItem.destructive
                ? "text-[#fca5a5] hover:bg-[#3b1212]"
                : "text-slate-300 hover:bg-white/[0.05]",
              actionItem.disabled && "pointer-events-none opacity-40"
            );
            if (actionItem.href) {
              return (
                <Link
                  key={i}
                  href={actionItem.href}
                  className={cls}
                  onClick={() => setOpen(false)}
                >
                  {content}
                </Link>
              );
            }
            return (
              <button
                key={i}
                className={cls}
                disabled={actionItem.disabled}
                onClick={() => {
                  actionItem.onClick?.();
                  setOpen(false);
                }}
              >
                {content}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
