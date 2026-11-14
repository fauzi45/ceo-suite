import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export type RadioSize = "desktop" | "mobile";

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: ReactNode;
  /** desktop = 24px, mobile = 16px (sesuai Figma). */
  size?: RadioSize;
}

const ringSize: Record<RadioSize, string> = {
  desktop: "size-6",
  mobile: "size-4",
};

const dotSize: Record<RadioSize, string> = {
  desktop: "size-3",
  mobile: "size-2",
};

/** Radio: ring 1px grey/200 putih, titik primary/800 saat terpilih, grey/300 saat disabled. */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { label, size = "desktop", className, id, disabled, ...rest },
  ref,
) {
  const autoId = useId();
  const inputId = id ?? autoId;

  return (
    <label
      htmlFor={inputId}
      className={cn(
        "inline-flex items-center gap-2 font-medium text-neutral-900",
        size === "desktop" ? "text-body" : "text-caption",
        disabled ? "cursor-not-allowed text-neutral-300" : "cursor-pointer",
        className,
      )}
    >
      <span className={cn("relative inline-flex shrink-0 items-center justify-center", ringSize[size])}>
        <input
          ref={ref}
          id={inputId}
          type="radio"
          disabled={disabled}
          className="peer absolute inset-0 size-full cursor-[inherit] appearance-none rounded-full border border-neutral-200 bg-white outline-none focus-visible:ring-4 focus-visible:ring-primary-100"
          {...rest}
        />
        <span
          aria-hidden
          className={cn(
            "pointer-events-none relative rounded-full bg-primary-800 opacity-0 transition-opacity peer-checked:opacity-100 peer-disabled:bg-neutral-300",
            dotSize[size],
          )}
        />
      </span>
      {label}
    </label>
  );
});
