import { cn } from "@/lib/cn";

export interface AvatarProps {
  /** Nama lengkap; inisial diambil dari huruf pertama tiap kata (maks 2). */
  name: string;
  className?: string;
}

const initialsOf = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");

/** Lingkaran berisi inisial pengguna. */
export function Avatar({ name, className }: AvatarProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-700 text-caption font-bold text-white",
        className,
      )}
    >
      {initialsOf(name)}
    </span>
  );
}
