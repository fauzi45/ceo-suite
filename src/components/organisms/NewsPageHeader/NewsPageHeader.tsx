import { cn } from "@/lib/cn";
import { Container } from "@/components/atoms/Container/Container";
import { Input } from "@/components/atoms/Input/Input";

export interface NewsPageHeaderProps {
  title?: string;
  search: string;
  onSearchChange?: (value: string) => void;
  className?: string;
}

/** Kepala halaman News: label kecil, judul tengah, dan kolom pencarian artikel. */
export function NewsPageHeader({
  title = "Sharing Expert Insights From Across Our Global Member Network",
  search,
  onSearchChange,
  className,
}: NewsPageHeaderProps) {
  return (
    <section className={cn("bg-neutral-50 pb-4 pt-8 md:pt-10", className)}>
      <Container className="flex flex-col items-center gap-4 text-center md:gap-6">
        <span className="text-body font-bold leading-[1.2] text-primary-800 md:text-heading-sm">CEO NEWS!</span>
        <h1 className="max-w-[1059px] text-heading-lg font-bold leading-[1.2] text-black md:text-display-md">{title}</h1>
        <Input
          type="search"
          inputSize="lg"
          leadingIcon="search"
          placeholder="Search for article here"
          aria-label="Search articles"
          value={search}
          onChange={(e) => onSearchChange?.(e.target.value)}
          className="max-w-md"
        />
      </Container>
    </section>
  );
}
