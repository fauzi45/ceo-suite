import { formatLongDate } from "@/lib/format-date";
import type { ProductDetail } from "@/data/product";
import { RoomTypeChip } from "@/components/atoms/Chip/Chip";
import { Button } from "@/components/atoms/Button/Button";
import { Container } from "@/components/atoms/Container/Container";
import { Icon, type IconName } from "@/components/atoms/Icon/Icon";
import type { TimeRange } from "@/components/organisms/TimePicker/TimePicker";

export interface BookingConfirmationProps {
  product: ProductDetail;
  date: Date;
  time: TimeRange;
  /** "View Booking": belum ada halaman tujuan (My Booking), jadi opsional. */
  onViewBooking?: () => void;
}

function Meta({ icon, children }: { icon: IconName; children: string }) {
  return (
    <span className="flex items-center gap-2 text-caption text-neutral-500">
      <Icon name={icon} size={16} />
      {children}
    </span>
  );
}

/** Halaman "Your booking is confirmed!": ringkasan booking (ruangan, jadwal, alamat) dan tombol View Booking. */
export function BookingConfirmation({ product, date, time, onViewBooking }: BookingConfirmationProps) {
  const { room, locationLabel, address } = product;
  return (
    <Container className="flex flex-col items-center gap-8 py-10 text-center md:py-14">
      <div className="flex aspect-[300/123] w-full max-w-75 items-center justify-center rounded-2xl bg-primary-50 text-primary-800">
        <Icon name="handshake" size={64} />
      </div>
      <h1 className="text-heading-md font-bold leading-[1.2] text-primary-800 md:text-heading-lg">
        Your booking is confirmed!
      </h1>

      <section className="flex w-full max-w-[400px] flex-col gap-3 text-left">
        <h2 className="text-body font-bold text-neutral-950">Booking Summary</h2>
        <div className="flex flex-col gap-3 rounded-lg bg-white p-4 shadow-input ring-1 ring-neutral-100">
          <div className="flex flex-col gap-2">
            <span className="text-caption font-medium text-neutral-950">{room.name}</span>
            <RoomTypeChip roomType={room.roomType} className="self-start" />
          </div>
          <div className="flex flex-col gap-1.5 border-t border-neutral-100 pt-3">
            <Meta icon="customers">{`${room.people} People`}</Meta>
            <Meta icon="calendar">{formatLongDate(date)}</Meta>
            <Meta icon="clock">{`${time.start} - ${time.end}`}</Meta>
          </div>
          <div className="flex items-start gap-2 border-t border-neutral-100 pt-3">
            <Icon name="map-pin" size={16} className="mt-0.5 shrink-0 text-primary-800" />
            <div className="flex flex-col text-tiny text-neutral-500">
              <span className="font-medium text-neutral-900">{locationLabel}</span>
              <span>{address}</span>
            </div>
          </div>
        </div>
      </section>

      <Button onClick={onViewBooking} className="w-full max-w-[400px]">
        View Booking
      </Button>
    </Container>
  );
}
