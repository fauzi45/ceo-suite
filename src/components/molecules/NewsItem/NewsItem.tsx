import { cn } from "@/lib/cn";
import type { NewsArticle } from "@/data/landing";
import { Photo } from "@/components/atoms/Photo/Photo";

export interface NewsItemProps {
  article: NewsArticle;
  className?: string;
}

/** Artikel di daftar berita: foto kecil di kiri, meta + judul + kutipan di kanan. */
export function NewsItem({ article, className }: NewsItemProps) {
  return (
    <article className={cn("flex gap-4", className)}>
      <Photo
        src={article.image}
        alt=""
        sizes="(min-width: 640px) 176px, 112px"
        className="aspect-[312/200] w-32 shrink-0 rounded-md sm:w-52 lg:w-60"
      />
      <div className="flex min-w-0 flex-col gap-1">
        <span className="text-tiny text-neutral-400">{article.meta}</span>
        <h3 className="text-body font-bold leading-[1.2] text-neutral-950 md:text-heading-sm">
          {article.title}
        </h3>
        <p className="line-clamp-2 text-tiny text-neutral-500 md:text-caption">{article.excerpt}</p>
      </div>
    </article>
  );
}
