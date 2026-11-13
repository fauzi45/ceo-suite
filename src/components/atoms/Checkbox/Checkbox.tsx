import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/atoms/Icon/Icon";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: ReactNode;
}

/**
 * Checkbox 16px, radius 3, border primary/800.
 * Checked: bg primary/800 + centang putih. Disabled: abu-abu.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
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
      <span className="relative inline-flex size-4 shrink-0">
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          disabled={disabled}
          className="peer absolute inset-0 size-4 cursor-[inherit] appearance-none rounded-[3px] border border-primary-800 bg-white outline-none transition-colors checked:bg-primary-800 focus-visible:ring-4 focus-visible:ring-primary-100 disabled:border-neutral-200 disabled:checked:bg-neutral-200"
          {...rest}
        />
        <Icon
          name="check-small"
          size={12}
          className="pointer-events-none absolute left-0.5 top-0.5 text-white opacity-0 peer-checked:opacity-100 peer-disabled:text-neutral-300"
        />
      </span>
      {label}
    </label>
  );
});
