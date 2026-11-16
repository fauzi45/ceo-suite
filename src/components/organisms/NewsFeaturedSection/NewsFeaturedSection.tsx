"use client";

import { cn } from "@/lib/cn";
import { activateProps, useNavigate } from "@/lib/use-navigate";
import { formatNewsDate, getNewsCategoryLabel, type NewsPost } from "@/data/news";
import { Avatar } from "@/components/atoms/Avatar/Avatar";
import { Container } from "@/components/atoms/Container/Container";
import { Photo } from "@/components/atoms/Photo/Photo";
import { NewsListItem } from "@/components/molecules/NewsListItem/NewsListItem";

export interface NewsFeaturedSectionProps {
  featured: NewsPost;
  /** Artikel ringkas di kolom kanan (Figma: 3). */
  others?: NewsPost[];
  className?: string;
}

/** Artikel utama (foto besar) di kiri dan daftar artikel ringkas di kanan. */
export function NewsFeaturedSection({ featured, others = [], className }: NewsFeaturedSectionProps) {
  const navigate = useNavigate();

  return (
    <section className={cn("pb-10 md:pb-16", className)}>
      <Container className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div
          {...activateProps(() => navigate(`/news/${featured.id}`))}
          className="group flex cursor-pointer flex-col gap-4 outline-none"
        >
          <div className="flex items-center gap-2">
            <Avatar name={featured.author} className="size-10" />
            <div className="flex flex-col leading-[1.2]">
              <span className="text-caption font-medium text-neutral-900">{featured.author}</span>
              <time dateTime={featured.date} className="text-tiny text-neutral-500">
                {formatNewsDate(featured.date)}
              </time>
            </div>
          </div>
          <h2 className="text-heading-md font-bold leading-[1.2] text-neutral-950 transition-colors group-hover:text-primary-800 group-focus-visible:text-primary-800 md:text-heading-lg">
            {featured.title}
          </h2>
          <p className="text-caption text-neutral-500">
            {getNewsCategoryLabel(featured.category)} | {featured.readTime}
          </p>
          <Photo
            src={featured.image}
            alt=""
            priority
            hoverZoom
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="aspect-[4/3] w-full rounded-lg"
          />
        </div>

        <div className="flex flex-col gap-5">
          {others.map((post) => (
            <div key={post.id} className="border-b border-neutral-100 pb-5 last:border-b-0 last:pb-0">
              <NewsListItem post={post} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
