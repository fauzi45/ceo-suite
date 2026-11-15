import { cn } from "@/lib/cn";
import type { RoomListing } from "@/data/landing";
import { Container } from "@/components/atoms/Container/Container";
import { RoomCard } from "@/components/molecules/RoomCard/RoomCard";

export interface SimilarSpacesSectionProps {
  rooms: RoomListing[];
  className?: string;
}

/** "Similar Spaces" di bawah halaman detail ruangan: grid kartu ruangan (1 / 2 / 4 kolom). */
export function SimilarSpacesSection({ rooms, className }: SimilarSpacesSectionProps) {
  if (rooms.length === 0) return null;
  return (
    <section className={cn("bg-neutral-50 py-10 md:py-16", className)}>
      <Container className="flex flex-col gap-6 md:gap-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-heading-md font-bold leading-[1.2] text-neutral-950 md:text-heading-lg">Similar Spaces</h2>
          <p className="text-caption text-neutral-500 md:text-body">
            Check out these spaces with similar features to the ones you&apos;ve been looking at.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-4">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} className="h-full" />
          ))}
        </div>
      </Container>
    </section>
  );
}
