import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { SPACE_CATEGORY_PAGES, getCategoryPage } from "@/data/categories";
import { CategoryContent } from "./CategoryContent";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return SPACE_CATEGORY_PAGES.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getCategoryPage(slug);
  return {
    title: page ? `${page.title} | CEO SUITE` : "Category not found | CEO SUITE",
    description: page?.tagline,
  };
}

// partialPrefetching aktif: `params` dibaca di dalam <Suspense> (bukan di level atas page).
export default function CategoryPage({ params }: PageProps) {
  return (
    <Suspense>
      <Category params={params} />
    </Suspense>
  );
}

async function Category({ params }: PageProps) {
  const { slug } = await params;
  const page = getCategoryPage(slug);
  if (!page) notFound();

  return <CategoryContent page={page} />;
}
