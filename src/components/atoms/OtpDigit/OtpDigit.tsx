import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface OtpDigitProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size" | "maxLength"> {
  /** State error: border merah. */
  invalid?: boolean;
}

/** Satu kotak digit OTP: bold, rata tengah, border primary saat fokus. */
export const OtpDigit = forwardRef<HTMLInputElement, OtpDigitProps>(function OtpDigit(
  { invalid, className, ...rest },
  ref,
) {
  return (
    <input
      ref={ref}
      type="text"
      inputMode="numeric"
      maxLength={1}
      aria-invalid={invalid || undefined}
      className={cn(
        "aspect-[84/92] w-full min-w-0 rounded-lg border bg-white text-center text-heading-sm font-bold text-neutral-950 shadow-input outline-none transition-[border-color,box-shadow] md:text-heading-md",
        "focus:ring-4 disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:text-neutral-300",
        invalid
          ? "border-error-300 focus:border-error-500 focus:ring-error-50"
          : "border-neutral-100 focus:border-primary-300 focus:ring-primary-50",
        className,
      )}
      {...rest}
    />
  );
});
