import { cn } from "@/lib/cn";
import { PROFILE_MENU, type ProfileSection } from "@/data/profile";
import { Icon, type IconName } from "@/components/atoms/Icon/Icon";

export interface ProfileSidebarProps {
  active: ProfileSection;
  onSelect?: (section: ProfileSection) => void;
  onBack?: () => void;
  onLogout?: () => void;
  className?: string;
}

const ICONS: Record<ProfileSection, IconName> = {
  overview: "home-outline",
  detail: "profile",
  password: "lock",
};

const itemClass =
  "flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-left text-caption font-medium outline-none transition-colors focus-visible:ring-4 focus-visible:ring-primary-100";

/** Menu samping halaman Profile: tautan kembali, tiga menu (aktif = latar merah muda), lalu Logout. */
export function ProfileSidebar({ active, onSelect, onBack, onLogout, className }: ProfileSidebarProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <button
        type="button"
        onClick={onBack}
        className="inline-flex w-fit cursor-pointer items-center gap-2 text-caption font-medium text-primary-800 outline-none hover:text-primary-600 focus-visible:ring-4 focus-visible:ring-primary-100"
      >
        <Icon name="arrow-left" size={16} />
        back to Home
      </button>

      <nav aria-label="Profile" className="flex flex-col gap-1 rounded-lg bg-white p-3 shadow-input ring-1 ring-neutral-100">
        {PROFILE_MENU.map((item) => {
          const isActive = item.id === active;
          return (
            <button
              key={item.id}
              type="button"
              aria-current={isActive ? "page" : undefined}
              onClick={() => onSelect?.(item.id)}
              className={cn(
                itemClass,
                isActive ? "bg-primary-100 text-primary-800" : "text-neutral-600 hover:bg-neutral-50 hover:text-primary-800",
              )}
            >
              <Icon name={ICONS[item.id]} size={20} />
              {item.label}
            </button>
          );
        })}
        <hr className="my-1 border-neutral-100" />
        <button type="button" onClick={onLogout} className={cn(itemClass, "text-primary-800 hover:bg-primary-50")}>
          <Icon name="logout" size={20} />
          Logout
        </button>
      </nav>
    </div>
  );
}
