"use client";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SkeletonTable } from "./Skeletons";

interface PaginationConfig {
  page: number;
  pageSize: number;
  total: number;
}

interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  loading?: boolean;
  emptyState?: React.ReactNode;
  pagination?: PaginationConfig;
  onPageChange?: (page: number) => void;
  stickyHeader?: boolean;
  className?: string;
}

export default function DataTable<T>({
  columns,
  data,
  loading,
  emptyState,
  pagination,
  onPageChange,
  stickyHeader,
  className,
}: DataTableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    rowCount: pagination?.total,
  });

  if (loading) {
    return <SkeletonTable rows={5} cols={columns.length} />;
  }

  const totalPages = pagination
    ? Math.ceil(pagination.total / pagination.pageSize)
    : 1;

  return (
    <div className={cn("overflow-hidden rounded-xl border border-white/[0.06]", className)}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead
            className={cn(
              "bg-[#13151f]",
              stickyHeader && "sticky top-0 z-10"
            )}
          >
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id} className="border-b border-white/[0.06]">
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-widest text-slate-600"
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="bg-[#13151f]">
                  {emptyState ?? (
                    <div className="py-12 text-center text-[13px] text-slate-600">
                      Kayıt bulunamadı
                    </div>
                  )}
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-white/[0.04] bg-[#13151f] transition-colors last:border-0 hover:bg-[#1a1d2a]"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3 text-[13px] text-slate-300">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-white/[0.06] bg-[#13151f] px-4 py-3">
          <p className="text-[12px] text-slate-500">
            {(pagination.page - 1) * pagination.pageSize + 1}–
            {Math.min(pagination.page * pagination.pageSize, pagination.total)}{" "}
            / {pagination.total} kayıt
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => onPageChange?.(pagination.page - 1)}
              disabled={pagination.page <= 1}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-500 hover:bg-white/[0.05] disabled:pointer-events-none disabled:opacity-30 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="px-2 text-[12px] text-slate-400">
              {pagination.page} / {totalPages}
            </span>
            <button
              onClick={() => onPageChange?.(pagination.page + 1)}
              disabled={pagination.page >= totalPages}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-500 hover:bg-white/[0.05] disabled:pointer-events-none disabled:opacity-30 transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
