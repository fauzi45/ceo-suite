import { cn } from "@/lib/cn";
import { SPACE_CATEGORIES } from "@/data/landing";
import { Container } from "@/components/atoms/Container/Container";
import { AllSpaceCard } from "@/components/molecules/AllSpaceCard/AllSpaceCard";
import { SectionHeader } from "@/components/molecules/SectionHeader/SectionHeader";
import { SpaceCategoryCard } from "@/components/molecules/SpaceCategoryCard/SpaceCategoryCard";

export interface BrowseSpacesSectionProps {
  onCheckAvailability?: () => void;
  className?: string;
}

/** "Browse Spaces": 3 kategori ruang + kartu "All Space". 2 kolom di mobile, 4 kolom di desktop. */
export function BrowseSpacesSection({ onCheckAvailability, className }: BrowseSpacesSectionProps) {
  return (
    <section className={cn("py-10 md:py-16", className)}>
      <Container className="flex flex-col gap-6 md:gap-8">
        <SectionHeader
          title="Browse Spaces"
          subtitle="Find the perfect space for your next meeting or event."
        />
        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
          {SPACE_CATEGORIES.map((category) => (
            <SpaceCategoryCard
              key={category.id}
              label={category.label}
              icon={category.icon}
              image={category.image}
            />
          ))}
          <AllSpaceCard onClick={onCheckAvailability} />
        </div>
      </Container>
    </section>
  );
}
