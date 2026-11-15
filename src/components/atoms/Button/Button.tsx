import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "@/components/atoms/Icon/Icon";

/** Nama varian mengikuti properti `hierarchy` di Figma. */
export type ButtonHierarchy =
  | "primary"
  | "secondary-filled"
  | "secondary-outline"
  | "secondary-white"
  | "tertiary";

/** `desktop` = 16px / padding 12x16, `mobile` = 13px / padding 10x16. */
export type ButtonSize = "desktop" | "mobile";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  hierarchy?: ButtonHierarchy;
  size?: ButtonSize;
  iconLeft?: IconName;
  iconRight?: IconName;
  /** Lebar penuh (`Fill` di Figma). */
  fullWidth?: boolean;
  /** Warna merah untuk aksi destruktif (dipakai modal Delete). */
  destructive?: boolean;
  children?: ReactNode;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium leading-[1.2] " +
  "transition-colors outline-none focus-visible:ring-4 focus-visible:ring-primary-100 " +
  "cursor-pointer disabled:cursor-not-allowed select-none whitespace-nowrap";

const sizes: Record<ButtonSize, string> = {
  desktop: "px-4 py-3 text-body",
  mobile: "px-4 py-2.5 text-caption",
};

const hierarchies: Record<ButtonHierarchy, string> = {
  primary:
    "bg-primary-800 text-white hover:bg-primary-600 active:bg-primary-900 " +
    "disabled:bg-neutral-100 disabled:text-neutral-200",
  "secondary-outline":
    "border border-primary-800 text-primary-800 bg-transparent " +
    "hover:border-primary-600 hover:text-primary-600 active:border-primary-900 active:text-primary-900 " +
    "disabled:border-neutral-100 disabled:text-neutral-200",
  "secondary-filled":
    "bg-primary-100 text-primary-800 hover:bg-gradient-to-r hover:from-primary-50 hover:to-primary-200 " +
    "active:bg-primary-200 disabled:bg-neutral-100 disabled:text-neutral-200",
  "secondary-white":
    "bg-white border border-neutral-100 text-neutral-500 hover:bg-neutral-50 " +
    "active:bg-neutral-100 disabled:text-neutral-200",
  tertiary:
    "bg-transparent text-primary-800 hover:text-primary-600 active:text-primary-900 " +
    "disabled:text-neutral-200",
};

const destructiveOverrides: Partial<Record<ButtonHierarchy, string>> = {
  primary: "bg-error-600 hover:bg-error-500 active:bg-error-700",
  "secondary-outline":
    "border-error-600 text-error-600 hover:border-error-500 hover:text-error-500 active:border-error-700 active:text-error-700",
  tertiary: "text-error-600 hover:text-error-500 active:text-error-700",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    hierarchy = "primary",
    size = "desktop",
    iconLeft,
    iconRight,
    fullWidth,
    destructive,
    className,
    children,
    type = "button",
    ...rest
  },
  ref,
) {
  const iconSize = 16;
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        base,
        sizes[size],
        hierarchies[hierarchy],
        destructive && destructiveOverrides[hierarchy],
        fullWidth && "w-full",
        className,
      )}
      {...rest}
    >
      {iconLeft && <Icon name={iconLeft} size={iconSize} />}
      {children}
      {iconRight && <Icon name={iconRight} size={iconSize} />}
    </button>
  );
});
