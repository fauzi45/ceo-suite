import { cn } from "@/lib/cn";
import type { NewsPost } from "@/data/news";
import { NewsListItem } from "@/components/molecules/NewsListItem/NewsListItem";

export interface RelatedNewsSectionProps {
  posts: NewsPost[];
  className?: string;
}

/** Kartu "More Related Articles" di kolom kanan detail artikel. */
export function RelatedNewsSection({ posts, className }: RelatedNewsSectionProps) {
  if (posts.length === 0) return null;
  return (
    <section className={cn("flex flex-col gap-4 rounded-xl bg-white p-6 shadow-popover", className)}>
      <h2 className="text-body font-bold leading-[1.2] text-neutral-950">More Related Articles</h2>
      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <div key={post.id} className="border-b border-neutral-100 pb-4 last:border-b-0 last:pb-0">
            <NewsListItem post={post} />
          </div>
        ))}
      </div>
    </section>
  );
}
