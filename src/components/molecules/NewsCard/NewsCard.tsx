import Link from "next/link";
import { cn } from "@/lib/cn";
import { formatNewsDate, type NewsPost } from "@/data/news";
import { Avatar } from "@/components/atoms/Avatar/Avatar";
import { Photo } from "@/components/atoms/Photo/Photo";

export interface NewsCardProps {
  post: NewsPost;
  className?: string;
}

/** Kartu artikel vertikal: foto lebar, penulis + tanggal, judul, lalu kutipan. Seluruh kartu menuju detail artikel. */
export function NewsCard({ post, className }: NewsCardProps) {
  return (
    <Link href={`/news/${post.id}`} className={cn("group flex flex-col gap-4 outline-none", className)}>
      <Photo
        src={post.image}
        alt=""
        hoverZoom
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="aspect-[413/270] w-full rounded-lg"
      />
      <article className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <Avatar name={post.author} className="size-8" />
            <span className="truncate text-caption font-medium text-neutral-900">{post.author}</span>
          </div>
          <time dateTime={post.date} className="shrink-0 text-caption text-neutral-500">
            {formatNewsDate(post.date)}
          </time>
        </div>
        <h3 className="text-body font-bold leading-[1.2] text-neutral-950 transition-colors group-hover:text-primary-800 group-focus-visible:text-primary-800 md:text-heading-sm">
          {post.title}
        </h3>
        <p className="line-clamp-3 text-caption text-neutral-500">{post.excerpt}</p>
      </article>
    </Link>
  );
}
