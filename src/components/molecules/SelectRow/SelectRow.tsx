import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "@/components/atoms/Icon/Icon";

export interface SelectRowProps {
  icon: IconName;
  /** Teks saat belum ada pilihan, contoh "Select add ons". */
  placeholder: string;
  /** Ringkasan pilihan; bila diisi menggantikan `placeholder`. */
  children?: ReactNode;
  /** `success` = hijau (voucher terpasang). */
  tone?: "default" | "success";
  onClick?: () => void;
  className?: string;
}

/** Baris tombol "Select add ons >" / "Add Voucher Code >" yang membuka modal; menampilkan ringkasan setelah dipilih. */
export function SelectRow({ icon, placeholder, children, tone = "default", onClick, className }: SelectRowProps) {
  const success = tone === "success";
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-left outline-none transition-colors focus-visible:ring-4 focus-visible:ring-primary-100",
        success
          ? "border-success-100 bg-success-50 hover:bg-success-100"
          : "border-neutral-100 bg-white hover:bg-neutral-50",
        className,
      )}
    >
      <Icon name={icon} size={20} className={success ? "text-success-600" : "text-primary-800"} />
      <span className="flex min-w-0 flex-1 flex-col gap-0.5 text-caption text-neutral-700">
        {children ?? placeholder}
      </span>
      <Icon name="chevron-right" size={20} className="shrink-0 text-neutral-400" />
    </button>
  );
}
