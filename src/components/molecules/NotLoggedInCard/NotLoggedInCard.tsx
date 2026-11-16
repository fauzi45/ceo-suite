import { cn } from "@/lib/cn";
import { Button } from "@/components/atoms/Button/Button";
import { Icon } from "@/components/atoms/Icon/Icon";

export interface NotLoggedInCardProps {
  onSignIn?: () => void;
  className?: string;
}

/** Kartu "You're not Log in": ikon avatar abu-abu bertanda X, penjelasan singkat, dan tombol Sign In. */
export function NotLoggedInCard({ onSignIn, className }: NotLoggedInCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-4 rounded-lg bg-white px-6 py-12 text-center shadow-input ring-1 ring-neutral-100",
        className,
      )}
    >
      <span className="relative inline-flex size-20 items-center justify-center rounded-full bg-neutral-100 text-neutral-300">
        <Icon name="profile-fill" size={44} />
        <span className="absolute -bottom-1 -right-1 inline-flex size-7 items-center justify-center rounded-full bg-primary-600 text-white ring-2 ring-white">
          <Icon name="close" size={14} />
        </span>
      </span>
      <div className="flex flex-col gap-1">
        <h2 className="text-heading-sm font-bold leading-[1.2] text-neutral-950">You&apos;re not Log in</h2>
        <p className="max-w-sm text-caption text-neutral-500">
          as a guest, you can&apos;t access this profile menu. Please register or log in if you already have an account
        </p>
      </div>
      <Button size="mobile" onClick={onSignIn} className="mt-2 min-w-48">
        Sign In
      </Button>
    </div>
  );
}
