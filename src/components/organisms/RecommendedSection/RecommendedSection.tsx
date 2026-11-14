import { cn } from "@/lib/cn";
import { RECOMMENDED_ROOMS, type RoomListing } from "@/data/landing";
import { Container } from "@/components/atoms/Container/Container";
import { RoomCard } from "@/components/molecules/RoomCard/RoomCard";
import { SectionHeader } from "@/components/molecules/SectionHeader/SectionHeader";

export interface RecommendedSectionProps {
  rooms?: RoomListing[];
  onFilter?: () => void;
  className?: string;
}

/** "Recommended For You": tombol Filter + grid kartu ruangan (1 / 2 / 4 kolom). */
export function RecommendedSection({
  rooms = RECOMMENDED_ROOMS,
  onFilter,
  className,
}: RecommendedSectionProps) {
  return (
    <section className={cn("py-10 md:py-16", className)}>
      <Container className="flex flex-col gap-6 md:gap-8">
        <SectionHeader
          title="Recommended For You"
          subtitle="Explore top-rated meeting rooms and workspaces."
          actionLabel="Filter"
          actionIcon="filter"
          actionHierarchy="secondary-white"
          onAction={onFilter}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-4">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </Container>
    </section>
  );
}
