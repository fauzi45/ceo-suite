import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface ToggleProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: ReactNode;
}

/**
 * Toggle 36x20, radius 12, padding 2, knob 16px putih.
 * Off: track grey/100. On: track success/600.
 */
export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(function Toggle(
  { label, className, id, disabled, ...rest },
  ref,
) {
  const autoId = useId();
  const inputId = id ?? autoId;

  return (
    <label
      htmlFor={inputId}
      className={cn(
        "inline-flex items-center gap-2 text-caption font-medium text-neutral-900",
        disabled ? "cursor-not-allowed text-neutral-300" : "cursor-pointer",
        className,
      )}
    >
      <span className="relative inline-flex h-5 w-9 shrink-0">
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          role="switch"
          disabled={disabled}
          className="peer absolute inset-0 size-full cursor-[inherit] appearance-none rounded-xl bg-neutral-100 outline-none transition-colors checked:bg-success-600 focus-visible:ring-4 focus-visible:ring-success-100 disabled:opacity-50"
          {...rest}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute left-0.5 top-0.5 size-4 rounded-full bg-white shadow-sm transition-transform peer-checked:translate-x-4"
        />
      </span>
      {label}
    </label>
  );
});
