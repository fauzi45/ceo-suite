import { cn } from "@/lib/cn";
import { NEWS_ARTICLES, NEWS_FEATURED, type NewsArticle } from "@/data/landing";
import { Button } from "@/components/atoms/Button/Button";
import { Container } from "@/components/atoms/Container/Container";
import { Photo } from "@/components/atoms/Photo/Photo";
import { NewsItem } from "@/components/molecules/NewsItem/NewsItem";
import { SectionHeader } from "@/components/molecules/SectionHeader/SectionHeader";

export interface NewsSectionProps {
  articles?: NewsArticle[];
  featuredImage?: string;
  onSeeAll?: () => void;
  className?: string;
}

/** "News, events and insights for you": 3 artikel + kartu besar "TIPS" (kartu di bawah daftar pada mobile). */
export function NewsSection({
  articles = NEWS_ARTICLES,
  featuredImage = NEWS_FEATURED.image,
  onSeeAll,
  className,
}: NewsSectionProps) {
  return (
    <section className={cn("py-10 md:py-16", className)}>
      <Container className="flex flex-col gap-6 md:gap-8">
        <SectionHeader title="News, events and insights for you" />
        <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch lg:gap-10">
          <div className="flex flex-col gap-5 lg:justify-between">
            {articles.map((article) => (
              <div key={article.id} className="border-b border-neutral-100 pb-5">
                <NewsItem article={article} />
              </div>
            ))}
            <Button iconRight="chevron-right" size="mobile" onClick={onSeeAll} className="self-start">
              See All Updates
            </Button>
          </div>

          {/* Rasio kartu = rasio foto asli dari Figma (760x812) supaya foto tidak terpotong/melar. */}
          <article className="group relative aspect-[760/812] cursor-pointer overflow-hidden rounded-lg transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-popover">
            <Photo
              src={featuredImage}
              alt=""
              sizes="(min-width: 1024px) 50vw, 100vw"
              hoverZoom
              className="absolute inset-0 size-full"
            />
            {/* Foto aslinya terang; di Figma ditutup lapisan gelap agar teks putih terbaca. */}
            <div className="absolute inset-0 bg-neutral-1000/55" />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-1000/50 via-transparent to-transparent" />
            <span className="absolute left-4 top-4 rounded-sm border border-white px-3 py-1 text-caption font-medium text-white">
              {NEWS_FEATURED.tag}
            </span>
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-5 text-white md:p-8">
              <span className="text-caption">{NEWS_FEATURED.meta}</span>
              <h3 className="text-heading-md font-bold leading-[1.2] md:text-heading-lg">
                {NEWS_FEATURED.title}
              </h3>
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}
