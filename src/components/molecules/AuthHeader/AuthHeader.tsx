import { cn } from "@/lib/cn";
import { Logo } from "@/components/atoms/Logo/Logo";

export interface AuthHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

/** Logo + judul + subjudul di atas form login/sign up (rata tengah). */
export function AuthHeader({ title, subtitle, className }: AuthHeaderProps) {
  return (
    <header className={cn("flex flex-col items-center gap-8 text-center md:gap-24", className)}>
      <Logo height={40} />
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-heading-md font-bold text-neutral-950 md:text-heading-lg">{title}</h1>
        {subtitle && <p className="text-caption text-neutral-600">{subtitle}</p>}
      </div>
    </header>
  );
}
