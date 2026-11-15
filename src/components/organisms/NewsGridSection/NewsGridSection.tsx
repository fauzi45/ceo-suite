import { cn } from "@/lib/cn";
import type { NewsPost } from "@/data/news";
import { Container } from "@/components/atoms/Container/Container";
import { NewsCard } from "@/components/molecules/NewsCard/NewsCard";
import { SectionHeader } from "@/components/molecules/SectionHeader/SectionHeader";

export interface NewsGridSectionProps {
  title?: string;
  posts: NewsPost[];
  className?: string;
}

/** "Latest News": grid kartu artikel 3 kolom (2 di tablet, 1 di mobile). */
export function NewsGridSection({ title = "Latest News", posts, className }: NewsGridSectionProps) {
  return (
    <section className={cn("pb-12 md:pb-20", className)}>
      <Container className="flex flex-col gap-6 md:gap-8">
        <SectionHeader title={title} />
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <NewsCard key={post.id} post={post} />
          ))}
        </div>
      </Container>
    </section>
  );
}
