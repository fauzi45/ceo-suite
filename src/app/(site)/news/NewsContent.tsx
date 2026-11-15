"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { filterNews, parseNewsCategory, type NewsCategoryId } from "@/data/news";
import { useSiteNavbar } from "@/lib/use-site-navbar";
import { Container } from "@/components/atoms/Container/Container";
import { NewsCategoryTabs } from "@/components/organisms/NewsCategoryTabs/NewsCategoryTabs";
import { NewsFeaturedSection } from "@/components/organisms/NewsFeaturedSection/NewsFeaturedSection";
import { NewsGridSection } from "@/components/organisms/NewsGridSection/NewsGridSection";
import { NewsPageHeader } from "@/components/organisms/NewsPageHeader/NewsPageHeader";
import { LandingLayout } from "@/components/templates/LandingLayout/LandingLayout";

/** Jumlah artikel ringkas di samping artikel utama (Figma: 3). */
const SIDE_COUNT = 3;

/**
 * Halaman daftar News. Tab kategori disimpan di URL (`?category=living`), kata kunci pencarian
 * hanya di state lokal. Artikel pertama hasil filter jadi artikel utama, 3 berikutnya di samping,
 * sisanya masuk "Latest News".
 */
export function NewsContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { navbarProps } = useSiteNavbar("news");
  const category = parseNewsCategory(searchParams.get("category"));
  const [search, setSearch] = useState("");

  const selectCategory = (next: NewsCategoryId) => {
    router.replace(next === "all" ? pathname : `${pathname}?category=${next}`, { scroll: false });
  };

  const results = filterNews(category, search);
  const [featured, ...rest] = results;
  const sideArticles = rest.slice(0, SIDE_COUNT);
  const latest = rest.slice(SIDE_COUNT);

  return (
    <LandingLayout navbarProps={navbarProps}>
      <NewsPageHeader search={search} onSearchChange={setSearch} />

      {/* Di Figma, header + tab kategori satu bidang abu-abu (grey/50), terpisah dari isi yang putih. */}
      <div className="sticky top-0 z-20 bg-neutral-50">
        <Container>
          <NewsCategoryTabs value={category} onChange={selectCategory} />
        </Container>
      </div>

      <div className="pt-8 md:pt-12">
        {featured ? (
          <>
            <NewsFeaturedSection featured={featured} others={sideArticles} />
            {latest.length > 0 && <NewsGridSection posts={latest} />}
          </>
        ) : (
          <Container className="py-16 text-center">
            <p className="text-body font-bold text-neutral-950">No articles found</p>
            <p className="mt-1 text-caption text-neutral-500">Try a different keyword or category.</p>
          </Container>
        )}
      </div>
    </LandingLayout>
  );
}
