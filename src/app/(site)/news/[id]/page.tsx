import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { NEWS_IDS, getNewsPost } from "@/data/news";
import { NewsDetailContent } from "./NewsDetailContent";

type PageProps = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return NEWS_IDS.map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const post = getNewsPost(id);
  return {
    title: post ? `${post.title} | CEO SUITE` : "Article not found | CEO SUITE",
    description: post?.excerpt,
  };
}

// partialPrefetching aktif: `params` dibaca di dalam <Suspense> (bukan di level atas page).
export default function NewsDetailPage({ params }: PageProps) {
  return (
    <Suspense>
      <NewsDetail params={params} />
    </Suspense>
  );
}

async function NewsDetail({ params }: PageProps) {
  const { id } = await params;
  const post = getNewsPost(id);
  if (!post) notFound();

  return <NewsDetailContent post={post} />;
}
