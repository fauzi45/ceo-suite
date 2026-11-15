import { cn } from "@/lib/cn";
import { Icon } from "@/components/atoms/Icon/Icon";

export interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
  className?: string;
}

const buttonClass =
  "inline-flex size-4 items-center justify-center rounded-full bg-primary-800 text-white outline-none " +
  "transition-colors hover:bg-primary-600 focus-visible:ring-4 focus-visible:ring-primary-100 " +
  "disabled:cursor-not-allowed disabled:bg-neutral-200";

/** Pengatur jumlah (− 0 +) dengan tombol bulat merah, dipakai di daftar add-on. */
export function QuantityStepper({ value, onChange, min = 0, max = 99, disabled, className }: QuantityStepperProps) {
  return (
    <div className={cn("flex items-center gap-2 text-tiny font-medium text-neutral-700", className)}>
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={disabled || value <= min}
        onClick={() => onChange(value - 1)}
        className={buttonClass}
      >
        <Icon name="minus" size={10} />
      </button>
      <span aria-live="polite" className="min-w-3 text-center tabular-nums">
        {value}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        disabled={disabled || value >= max}
        onClick={() => onChange(value + 1)}
        className={buttonClass}
      >
        <Icon name="plus" size={10} />
      </button>
    </div>
  );
}
