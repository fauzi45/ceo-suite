import { forwardRef, useId, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Input, type InputProps } from "@/components/atoms/Input/Input";

export interface FormFieldProps extends InputProps {
  label?: ReactNode;
  /** Teks bantuan di bawah input. Saat `invalid`, berubah merah. */
  helperText?: ReactNode;
  /** Pesan error; otomatis mengaktifkan `invalid` dan menggantikan helperText. */
  errorText?: ReactNode;
}

/**
 * Label + Input + helper text (gap 4px), sesuai "Input / Box" di Figma.
 * Label: 13px Medium neutral-900. Helper: 13px Regular neutral-500, error: error-500.
 */
export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(function FormField(
  { label, helperText, errorText, invalid, id, className, disabled, ...inputProps },
  ref,
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const helperId = `${inputId}-helper`;
  const isInvalid = invalid || Boolean(errorText);
  const message = errorText ?? helperText;

  return (
    <div className={cn("flex w-full flex-col gap-1", className)}>
      {label && (
        <label
          htmlFor={inputId}
          className={cn(
            "text-caption font-medium leading-[1.2]",
            disabled ? "text-neutral-300" : "text-neutral-900",
          )}
        >
          {label}
        </label>
      )}
      <Input
        ref={ref}
        id={inputId}
        invalid={isInvalid}
        disabled={disabled}
        aria-describedby={message ? helperId : undefined}
        {...inputProps}
      />
      {message && (
        <p
          id={helperId}
          className={cn(
            "text-caption leading-[1.2]",
            isInvalid ? "text-error-500" : "text-neutral-500",
            disabled && !isInvalid && "text-neutral-300",
          )}
        >
          {message}
        </p>
      )}
    </div>
  );
});
