import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "@/components/atoms/Icon/Icon";

export interface SearchFieldFrameProps {
  label: string;
  icon: IconName;
  /** `id` kontrol di dalam bingkai, supaya label terhubung ke kontrolnya. */
  htmlFor?: string;
  children: ReactNode;
  className?: string;
}

/** Label di atas dan bingkai putih berisi icon + kontrol (select, tombol, dll.) untuk form pencarian ruang. */
export function SearchFieldFrame({ label, icon, htmlFor, children, className }: SearchFieldFrameProps) {
  return (
    <div className={cn("flex min-w-0 flex-col gap-2", className)}>
      <label htmlFor={htmlFor} className="text-caption font-medium text-neutral-700 md:text-body">
        {label}
      </label>
      <div className="relative flex h-12 items-center gap-3 rounded-lg border border-neutral-100 bg-white px-3 text-caption text-neutral-900 focus-within:border-focus-border focus-within:ring-4 focus-within:ring-focus-ring">
        <Icon name={icon} size={20} className="shrink-0 text-primary-800" />
        {children}
      </div>
    </div>
  );
}
