import { KOS_LISTINGS } from "@/components/(shared)/data/kosSeed";
import type {
  Kos,
  KosQuery,
  KosSortKey,
} from "@/components/(shared)/types/kos";

const DEFAULT_RELATED_LIMIT = 4;

const SORTERS: Record<KosSortKey, (first: Kos, second: Kos) => number> = {
  recommended: (first, second) =>
    second.badges.length - first.badges.length || second.rating - first.rating,
  cheapest: (first, second) => first.monthlyPrice - second.monthlyPrice,
  priciest: (first, second) => second.monthlyPrice - first.monthlyPrice,
  rating: (first, second) => second.rating - first.rating,
};

function matchesKeyword(kos: Kos, keyword: string): boolean {
  const haystack = [kos.name, kos.area, kos.city, kos.campus ?? ""]
    .join(" ")
    .toLowerCase();
  return haystack.includes(keyword);
}

function matchesQuery(kos: Kos, query: KosQuery): boolean {
  const { keyword, city, type, maxPrice, facilities, badge } = query;
  if (city && kos.city !== city) return false;
  if (type && kos.type !== type) return false;
  if (maxPrice !== undefined && kos.monthlyPrice > maxPrice) return false;
  if (badge && !kos.badges.includes(badge)) return false;
  if (
    facilities?.length &&
    !facilities.every((facility) => kos.facilities.includes(facility))
  ) {
    return false;
  }
  const trimmedKeyword = keyword?.trim().toLowerCase();
  return !trimmedKeyword || matchesKeyword(kos, trimmedKeyword);
}

export function searchKos(query: KosQuery = {}): Kos[] {
  return KOS_LISTINGS.filter((kos) => matchesQuery(kos, query)).sort(
    SORTERS[query.sort ?? "recommended"],
  );
}

export function findKosBySlug(slug: string): Kos | undefined {
  return KOS_LISTINGS.find((kos) => kos.slug === slug);
}

export function findRelatedKos(kos: Kos, limit = DEFAULT_RELATED_LIMIT): Kos[] {
  return KOS_LISTINGS.filter(
    (candidate) => candidate.slug !== kos.slug && candidate.city === kos.city,
  ).slice(0, limit);
}

export function listKosCities(): string[] {
  return [...new Set(KOS_LISTINGS.map((kos) => kos.city))].sort();
}

export function listKosSlugs(): string[] {
  return KOS_LISTINGS.map((kos) => kos.slug);
}
