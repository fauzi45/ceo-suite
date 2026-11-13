import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/atoms/Icon/Icon";
import { Button } from "@/components/atoms/Button/Button";

export interface TableColumn<Row> {
  key: string;
  header: ReactNode;
  /** Render isi sel; default menampilkan `row[key]`. */
  render?: (row: Row) => ReactNode;
  /** Lebar kolom (class Tailwind, misal `w-40`). */
  className?: string;
  align?: "left" | "center" | "right";
}

export interface TableProps<Row extends { id: string | number }> {
  columns: TableColumn<Row>[];
  rows: Row[];
  /** Tampilkan kolom aksi (edit / hapus) di kanan. */
  onEdit?: (row: Row) => void;
  onDelete?: (row: Row) => void;
  /** Paginasi sederhana. */
  page?: number;
  pageCount?: number;
  onPageChange?: (page: number) => void;
  emptyText?: ReactNode;
  className?: string;
}

const alignClass = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

/**
 * Tabel data: header tinggi 44 (padding 12x24, 13px Medium grey/600),
 * sel tinggi 72 (padding 16, 13px), garis bawah 1px neutral-100, aksi icon 40x40.
 */
export function Table<Row extends { id: string | number }>({
  columns,
  rows,
  onEdit,
  onDelete,
  page,
  pageCount,
  onPageChange,
  emptyText = "Tidak ada data",
  className,
}: TableProps<Row>) {
  const hasActions = Boolean(onEdit || onDelete);
  const showPagination = page !== undefined && pageCount !== undefined && pageCount > 1;

  return (
    <div className={cn("overflow-hidden rounded-lg border border-neutral-100 bg-white", className)}>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-caption text-neutral-900">
          <thead>
            <tr className="border-b border-neutral-100 bg-neutral-25">
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  className={cn(
                    "h-11 px-6 py-3 text-left font-medium text-neutral-600",
                    col.align && alignClass[col.align],
                    col.className,
                  )}
                >
                  {col.header}
                </th>
              ))}
              {hasActions && (
                <th scope="col" className="h-11 w-[116px] px-6 py-3">
                  <span className="sr-only">Aksi</span>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length + (hasActions ? 1 : 0)}
                  className="h-[72px] px-6 text-center text-neutral-400"
                >
                  {emptyText}
                </td>
              </tr>
            )}
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-neutral-100 last:border-b-0 hover:bg-neutral-25">
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn("h-[72px] px-6 py-4", col.align && alignClass[col.align], col.className)}
                  >
                    {col.render ? col.render(row) : String((row as Record<string, unknown>)[col.key] ?? "")}
                  </td>
                ))}
                {hasActions && (
                  <td className="h-[72px] px-4 py-4">
                    <div className="flex items-center justify-end gap-1">
                      {onDelete && (
                        <button
                          type="button"
                          aria-label="Hapus"
                          onClick={() => onDelete(row)}
                          className="inline-flex size-10 items-center justify-center rounded-lg text-neutral-500 transition-colors hover:bg-error-50 hover:text-error-600 focus-visible:ring-4 focus-visible:ring-error-50"
                        >
                          <Icon name="trash" size={20} />
                        </button>
                      )}
                      {onEdit && (
                        <button
                          type="button"
                          aria-label="Ubah"
                          onClick={() => onEdit(row)}
                          className="inline-flex size-10 items-center justify-center rounded-lg text-neutral-500 transition-colors hover:bg-neutral-50 hover:text-primary-800 focus-visible:ring-4 focus-visible:ring-primary-100"
                        >
                          <Icon name="edit" size={20} />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPagination && (
        <div className="flex items-center justify-between border-t border-neutral-100 px-6 py-3">
          <Button
            hierarchy="secondary-white"
            size="mobile"
            iconLeft="arrow-left"
            disabled={page <= 1}
            onClick={() => onPageChange?.(page - 1)}
          >
            Previous
          </Button>
          <div className="flex items-center gap-1">
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                type="button"
                aria-current={p === page ? "page" : undefined}
                onClick={() => onPageChange?.(p)}
                className={cn(
                  "size-9 rounded-lg text-caption font-medium transition-colors",
                  p === page
                    ? "bg-primary-100 text-primary-800"
                    : "text-neutral-500 hover:bg-neutral-50",
                )}
              >
                {p}
              </button>
            ))}
          </div>
          <Button
            hierarchy="secondary-white"
            size="mobile"
            iconRight="chevron-right"
            disabled={page >= pageCount}
            onClick={() => onPageChange?.(page + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
