import { cn } from "@/lib/cn";

export interface BookingTabEntry<Id extends string = string> {
  id: Id;
  label: string;
}

export interface BookingTabsProps<Id extends string = string> {
  tabs: BookingTabEntry<Id>[];
  value: Id;
  onChange?: (id: Id) => void;
  className?: string;
}

/** Tab "Active / History" di My Bookings: lebar sama, teks merah + garis bawah merah pada tab aktif. */
export function BookingTabs<Id extends string = string>({ tabs, value, onChange, className }: BookingTabsProps<Id>) {
  return (
    <div role="tablist" aria-label="Booking" className={cn("flex border-b border-neutral-100", className)}>
      {tabs.map((tab) => {
        const active = tab.id === value;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange?.(tab.id)}
            className={cn(
              "w-40 cursor-pointer border-b-2 px-4 py-3 text-body leading-[1.2] outline-none transition-colors focus-visible:ring-4 focus-visible:ring-primary-100",
              active
                ? "border-primary-800 font-bold text-primary-800"
                : "border-transparent font-medium text-neutral-400 hover:text-neutral-600",
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
