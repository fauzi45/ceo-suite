import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export type TextLinkProps = ComponentProps<typeof Link>;

/** Link teks kecil berwarna primary (contoh "Forgot Password", "Sign Up Here"). */
export function TextLink({ className, ...rest }: TextLinkProps) {
  return (
    <Link
      className={cn(
        "rounded-sm text-caption font-medium text-primary-800 outline-none transition-colors",
        "hover:text-primary-600 active:text-primary-900 focus-visible:ring-4 focus-visible:ring-primary-100",
        className,
      )}
      {...rest}
    />
  );
}
