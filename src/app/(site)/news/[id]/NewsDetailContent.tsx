"use client";

import { getRelatedNews, type NewsPost } from "@/data/news";
import { useSiteNavbar } from "@/lib/use-site-navbar";
import { Container } from "@/components/atoms/Container/Container";
import { Breadcrumb } from "@/components/molecules/Breadcrumb/Breadcrumb";
import { ShareCard } from "@/components/molecules/ShareCard/ShareCard";
import { NewsArticle } from "@/components/organisms/NewsArticle/NewsArticle";
import { RelatedNewsSection } from "@/components/organisms/RelatedNewsSection/RelatedNewsSection";
import { LandingLayout } from "@/components/templates/LandingLayout/LandingLayout";

export interface NewsDetailContentProps {
  post: NewsPost;
}

/** Halaman detail artikel: isi artikel di kiri, kartu "Helpful?" (bagikan) + artikel terkait di kanan. */
export function NewsDetailContent({ post }: NewsDetailContentProps) {
  const { navbarProps } = useSiteNavbar("news");

  return (
    <LandingLayout navbarProps={navbarProps}>
      <Container className="flex flex-col gap-6 py-6 md:gap-8 md:py-8">
        <Breadcrumb items={[{ label: "News", href: "/news" }, { label: post.title }]} />
        <div className="grid gap-8 pb-8 lg:grid-cols-[1012fr_525fr] lg:items-start lg:gap-x-16 lg:pb-12">
          <NewsArticle post={post} className="min-w-0" />
          <div className="flex flex-col gap-6 lg:sticky lg:top-4">
            <ShareCard heading="This Article is Helpful?" title={post.title} />
            <RelatedNewsSection posts={getRelatedNews(post)} />
          </div>
        </div>
      </Container>
    </LandingLayout>
  );
}
