import { cn } from "@/lib/cn";
import { PASSWORD_RULES } from "@/lib/validations/auth";
import { Icon } from "@/components/atoms/Icon/Icon";

export interface PasswordRulesProps {
  /** Password yang sedang diketik; tiap aturan menyala hijau saat terpenuhi. */
  value: string;
  className?: string;
}

/** Checklist aturan password di bawah field password (form Sign Up). */
export function PasswordRules({ value, className }: PasswordRulesProps) {
  return (
    <ul aria-label="Password requirements" className={cn("flex flex-col gap-2", className)}>
      {PASSWORD_RULES.map((rule) => {
        const met = rule.test(value);
        return (
          <li key={rule.id} className="flex items-center gap-2 text-caption text-neutral-700">
            <span
              aria-hidden="true"
              className={cn(
                "inline-flex size-4 shrink-0 items-center justify-center rounded-full text-white transition-colors",
                met ? "bg-success-600" : "bg-neutral-200",
              )}
            >
              <Icon name="check-small" size={12} />
            </span>
            {rule.label}
            <span className="sr-only">{met ? " (met)" : " (not met)"}</span>
          </li>
        );
      })}
    </ul>
  );
}
