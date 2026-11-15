import { cn } from "@/lib/cn";
import { formatNewsDate, getNewsCategoryLabel, type NewsBlock, type NewsPost } from "@/data/news";
import { Avatar } from "@/components/atoms/Avatar/Avatar";
import { Photo } from "@/components/atoms/Photo/Photo";

export interface NewsArticleProps {
  post: NewsPost;
  className?: string;
}

function Block({ block }: { block: NewsBlock }) {
  switch (block.type) {
    case "heading":
      return <h2 className="pt-2 text-body font-bold leading-[1.2] text-neutral-950 md:text-heading-sm">{block.text}</h2>;
    case "list": {
      const List = block.ordered ? "ol" : "ul";
      return (
        <List className={cn("space-y-2 pl-5", block.ordered ? "list-decimal" : "list-disc")}>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </List>
      );
    }
    default:
      return <p>{block.text}</p>;
  }
}

/** Kolom kiri detail artikel: judul, penulis + meta, foto utama, lalu isi artikel. */
export function NewsArticle({ post, className }: NewsArticleProps) {
  return (
    <article className={cn("flex flex-col gap-6", className)}>
      <header className="flex flex-col gap-4">
        <h1 className="text-heading-md font-bold leading-[1.2] text-neutral-950 md:text-heading-lg">{post.title}</h1>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Avatar name={post.author} className="size-10" />
            <div className="flex flex-col leading-[1.2]">
              <span className="text-caption font-medium text-neutral-900">{post.author}</span>
              <time dateTime={post.date} className="text-tiny text-neutral-500">
                {formatNewsDate(post.date)}
              </time>
            </div>
          </div>
          <p className="text-caption text-neutral-500">
            {getNewsCategoryLabel(post.category)} | {post.readTime}
          </p>
        </div>
      </header>

      <Photo
        src={post.image}
        alt={post.title}
        priority
        sizes="(min-width: 1024px) 66vw, 100vw"
        className="aspect-[16/9] w-full rounded-lg"
      />

      <div className="flex flex-col gap-4 text-caption leading-[1.6] text-neutral-600 md:text-body">
        {post.body.map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </div>
    </article>
  );
}
