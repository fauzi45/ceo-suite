"use client";

import { useRef, type ClipboardEvent, type KeyboardEvent } from "react";
import { cn } from "@/lib/cn";
import { OtpDigit } from "@/components/atoms/OtpDigit/OtpDigit";

export interface OtpFieldProps {
  /** Kode saat ini (hanya digit, maksimal `length`). */
  value: string;
  onChange: (value: string) => void;
  length?: number;
  invalid?: boolean;
  disabled?: boolean;
  className?: string;
}

/**
 * Deretan kotak OTP. Mengetik memindah fokus ke kotak berikutnya, Backspace
 * kembali ke kotak sebelumnya, panah kiri/kanan berpindah, dan paste mengisi semua kotak.
 */
export function OtpField({
  value,
  onChange,
  length = 6,
  invalid,
  disabled,
  className,
}: OtpFieldProps) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const digits = Array.from({ length }, (_, i) => value[i] ?? "");

  const focusAt = (index: number) => {
    const target = refs.current[Math.min(Math.max(index, 0), length - 1)];
    target?.focus();
    target?.select();
  };

  const setDigit = (index: number, digit: string) => {
    const next = digits.slice();
    next[index] = digit;
    onChange(next.join("").slice(0, length));
  };

  const handleChange = (index: number, raw: string) => {
    const typed = raw.replace(/\D/g, "");
    if (!typed) return;
    setDigit(index, typed[typed.length - 1]);
    if (index < length - 1) focusAt(index + 1);
  };

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace") {
      event.preventDefault();
      if (digits[index]) {
        setDigit(index, "");
      } else if (index > 0) {
        setDigit(index - 1, "");
        focusAt(index - 1);
      }
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      focusAt(index - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      focusAt(index + 1);
    }
  };

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    const pasted = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (!pasted) return;
    event.preventDefault();
    onChange(pasted);
    focusAt(pasted.length - 1);
  };

  return (
    <div
      role="group"
      aria-label="Verification code"
      className={cn("grid gap-2 md:gap-4", className)}
      style={{ gridTemplateColumns: `repeat(${length}, minmax(0, 1fr))` }}
    >
      {digits.map((digit, index) => (
        <OtpDigit
          key={index}
          ref={(el) => {
            refs.current[index] = el;
          }}
          value={digit}
          aria-label={`Digit ${index + 1} of ${length}`}
          autoComplete={index === 0 ? "one-time-code" : "off"}
          invalid={invalid}
          disabled={disabled}
          onChange={(event) => handleChange(index, event.target.value)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          onPaste={handlePaste}
          onFocus={(event) => event.target.select()}
        />
      ))}
    </div>
  );
}
