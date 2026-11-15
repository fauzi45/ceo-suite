import Link from "next/link";
import { cn } from "@/lib/cn";
import { formatNewsDate, getNewsCategoryLabel, type NewsPost } from "@/data/news";
import { Photo } from "@/components/atoms/Photo/Photo";

export interface NewsListItemProps {
  post: NewsPost;
  className?: string;
}

/** Artikel ringkas di daftar samping: kategori + tanggal, judul, kutipan di kiri, thumbnail di kanan. */
export function NewsListItem({ post, className }: NewsListItemProps) {
  return (
    <Link href={`/news/${post.id}`} className={cn("group flex items-center justify-between gap-4 outline-none", className)}>
      <article className="flex min-w-0 flex-col gap-1">
        <span className="text-tiny text-neutral-400">
          {getNewsCategoryLabel(post.category)} – {formatNewsDate(post.date)}
        </span>
        <h3 className="text-body font-medium leading-[1.2] text-neutral-950 transition-colors group-hover:text-primary-800 group-focus-visible:text-primary-800 md:text-heading-sm">
          {post.title}
        </h3>
        <p className="line-clamp-2 text-tiny text-neutral-500 md:text-caption">{post.excerpt}</p>
      </article>
      <Photo
        src={post.image}
        alt=""
        hoverZoom
        sizes="(min-width: 768px) 200px, 112px"
        className="aspect-[200/120] w-28 shrink-0 rounded-md md:w-40 2xl:w-[200px]"
      />
    </Link>
  );
}
