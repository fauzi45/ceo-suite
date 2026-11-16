"use client";

import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { useNavigate } from "@/lib/use-navigate";

export interface TextLinkProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  /** Tujuan setelah diklik (`onClick` dijalankan lebih dulu). */
  href?: string;
}

/** Teks kecil berwarna primary yang pindah halaman lewat `onClick` (contoh "Forgot Password", "Sign Up Here"). */
export function TextLink({ href, onClick, className, ...rest }: TextLinkProps) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={(event) => {
        onClick?.(event);
        navigate(href);
      }}
      className={cn(
        "cursor-pointer rounded-sm text-caption font-medium text-primary-800 outline-none transition-colors",
        "hover:text-primary-600 active:text-primary-900 focus-visible:ring-4 focus-visible:ring-primary-100",
        className,
      )}
      {...rest}
    />
  );
}
