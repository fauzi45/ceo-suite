import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "@/components/atoms/Icon/Icon";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "prefix"> {
  /** Icon 20px di kiri. */
  leadingIcon?: IconName;
  /** Icon 20px di kanan. */
  trailingIcon?: IconName;
  /** Teks tambahan di kanan (contoh "Add-on"). */
  addOn?: ReactNode;
  /** Elemen bebas di kanan, misalnya logo kartu pembayaran. */
  suffix?: ReactNode;
  /** State error: border merah. */
  invalid?: boolean;
  /** Lebar penuh (default). */
  fullWidth?: boolean;
}

/**
 * Kotak input dari "Input / Box" di Figma:
 * tinggi 40, radius 6, padding 8x12, border 1px, shadow tipis.
 * Fokus: border primary/300 + ring 4px primary/50. Error: border error/300.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    leadingIcon,
    trailingIcon,
    addOn,
    suffix,
    invalid,
    fullWidth = true,
    className,
    disabled,
    ...rest
  },
  ref,
) {
  return (
    <div
      className={cn(
        "flex h-10 items-center gap-3 rounded-md border bg-white px-3 py-2 shadow-input transition-[border-color,box-shadow]",
        "focus-within:ring-4",
        invalid
          ? "border-error-300 focus-within:border-error-500 focus-within:ring-error-50"
          : "border-neutral-100 focus-within:border-primary-300 focus-within:ring-primary-50",
        disabled && "cursor-not-allowed bg-neutral-50 text-neutral-300",
        fullWidth ? "w-full" : "w-auto",
        className,
      )}
    >
      <div className="flex min-w-0 flex-1 items-center gap-2">
        {leadingIcon && (
          <Icon name={leadingIcon} size={20} className="text-neutral-400" />
        )}
        <input
          ref={ref}
          disabled={disabled}
          aria-invalid={invalid || undefined}
          className="min-w-0 flex-1 bg-transparent text-caption text-neutral-900 outline-none placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:text-neutral-300"
          {...rest}
        />
      </div>
      {(addOn || trailingIcon || suffix) && (
        <div className="flex shrink-0 items-center gap-1 text-caption text-neutral-500">
          {addOn && <span>{addOn}</span>}
          {trailingIcon && (
            <Icon name={trailingIcon} size={20} className="text-neutral-400" />
          )}
          {suffix}
        </div>
      )}
    </div>
  );
});
