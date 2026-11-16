import { formatLongDate } from "@/lib/format-date";
import { PACKAGES_HERO, PACKAGE_HOW_TO_USE, type MeetingPackage } from "@/data/packages";
import { Button } from "@/components/atoms/Button/Button";
import { Container } from "@/components/atoms/Container/Container";
import { Icon } from "@/components/atoms/Icon/Icon";
import { Photo } from "@/components/atoms/Photo/Photo";

export interface PackageConfirmationProps {
  item: MeetingPackage;
  startDate: Date;
  onViewBooking?: () => void;
}

/** "Your booking is confirmed!" untuk paket: foto, ringkasan paket, "View Booking", dan kartu "How to Use This Package". */
export function PackageConfirmation({ item, startDate, onViewBooking }: PackageConfirmationProps) {
  return (
    <Container className="flex flex-col items-center gap-8 py-10 text-center md:py-14">
      <div className="relative aspect-[300/123] w-full max-w-75 overflow-hidden rounded-2xl">
        <Photo src={PACKAGES_HERO.image} alt="" sizes="300px" className="size-full" />
        <div className="absolute inset-0 bg-primary-800/70" />
      </div>
      <h1 className="text-heading-md font-bold leading-[1.2] text-primary-800 md:text-heading-lg">
        Your booking is confirmed!
      </h1>

      <section className="flex w-full max-w-[400px] flex-col gap-3 rounded-lg bg-white p-4 text-left shadow-input ring-1 ring-neutral-100">
        <h2 className="text-body font-bold leading-[1.2] text-neutral-950">{item.name}</h2>
        <p className="text-caption text-neutral-500">{item.access}</p>
        <span className="flex items-center gap-1.5 text-caption text-neutral-500">
          <Icon name="customers" size={16} />
          {item.capacity}
        </span>
        <div className="flex flex-col gap-1 border-t border-neutral-100 pt-3">
          <span className="text-tiny text-neutral-500">Starting Date:</span>
          <span className="flex items-center gap-2 text-caption font-medium text-neutral-950">
            <Icon name="calendar" size={16} className="text-neutral-500" />
            {formatLongDate(startDate)}
          </span>
        </div>
      </section>

      <Button onClick={onViewBooking} className="w-full max-w-[400px]">
        View Booking
      </Button>

      <section className="flex w-full max-w-3xl flex-col gap-3 rounded-lg bg-white p-6 text-left shadow-input ring-1 ring-neutral-100">
        <h2 className="text-body font-bold leading-[1.2] text-neutral-950">How to Use This Package</h2>
        <ol className="list-decimal space-y-1 pl-5 text-caption leading-[1.5] text-neutral-600">
          {PACKAGE_HOW_TO_USE.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>
    </Container>
  );
}
