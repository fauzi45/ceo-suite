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
    <article className={cn("group flex cursor-pointer gap-4", className)}>
      <Photo
        src={article.image}
        alt=""
        sizes="(min-width: 1536px) 312px, (min-width: 640px) 240px, 128px"
        hoverZoom
        className="aspect-[312/200] w-32 shrink-0 rounded-md sm:w-52 lg:w-60 2xl:w-[312px]"
      />
      <div className="flex min-w-0 flex-col gap-1">
        <span className="text-tiny text-neutral-400">{article.meta}</span>
        <h3 className="text-body font-bold leading-[1.2] text-neutral-950 transition-colors group-hover:text-primary-800 md:text-heading-sm">
          {article.title}
        </h3>
        <p className="line-clamp-2 text-tiny text-neutral-500 md:text-caption">{article.excerpt}</p>
      </div>
    </article>
  );
}
