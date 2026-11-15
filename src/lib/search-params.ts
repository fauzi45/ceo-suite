import type { SearchCriteria } from "@/components/organisms/SpaceSearchForm/SpaceSearchForm";

export const SEARCH_PATH = "/search";

const toIso = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

const fromIso = (value: string | null): Date | null => {
  const match = value?.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  return match ? new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3])) : null;
};

/** Susun URL halaman Search Results dari kriteria form (kota, wilayah, tanggal, tipe ruang). */
export function buildSearchHref({ location, region, dates, spaceTypes }: SearchCriteria): string {
  const params = new URLSearchParams();
  if (location) params.set("city", location);
  if (region && region !== "All") params.set("region", region);
  if (dates.start) params.set("start", toIso(dates.start));
  if (dates.end) params.set("end", toIso(dates.end));
  if (spaceTypes.length > 0) params.set("types", spaceTypes.join(","));
  const query = params.toString();
  return query ? `${SEARCH_PATH}?${query}` : SEARCH_PATH;
}

/** Kebalikan `buildSearchHref`. Nilai kota boleh berbentuk "Jakarta, AXA Tower" (opsi hero login): diambil kota-nya saja. */
export function parseSearchParams(params: URLSearchParams, defaultCity: string): SearchCriteria {
  const city = params.get("city")?.split(",")[0]?.trim() || defaultCity;
  return {
    location: city,
    region: params.get("region") ?? "All",
    dates: { start: fromIso(params.get("start")), end: fromIso(params.get("end")) },
    spaceTypes: params.get("types")?.split(",").filter(Boolean) ?? [],
  };
}
