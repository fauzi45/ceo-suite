import { cn } from "@/lib/cn";
import { Icon } from "@/components/atoms/Icon/Icon";

export interface SuccessBadgeProps {
  className?: string;
}

/** Lingkaran hijau dengan centang putih dan halo hijau muda (ikon di modal sukses). */
export function SuccessBadge({ className }: SuccessBadgeProps) {
  return (
    <span
      aria-hidden="true"
      className={cn("inline-flex size-24 items-center justify-center rounded-full bg-success-50", className)}
    >
      <span className="inline-flex size-18 items-center justify-center rounded-full bg-gradient-to-b from-success-400 to-success-600 text-white">
        <Icon name="check" size={40} />
      </span>
    </span>
  );
}
