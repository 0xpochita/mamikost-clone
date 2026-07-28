export type KosType = "Putra" | "Putri" | "Campur";

export type KosRibbon = "rare" | "deposit";

export type KosBadge = "andalan" | "prime" | "promo" | "flash";

export type Kos = {
  slug: string;
  name: string;
  type: KosType;
  area: string;
  city: string;
  monthlyPrice: number;
  strikePrice?: number;
  coverPhoto: string;
  gallery: string[];
  rating: number;
  reviewCount: number;
  facilities: string[];
  roomSize: string;
  badges: KosBadge[];
  vacancy: number;
  promoLabel?: string;
  flashRibbon?: KosRibbon;
  campus?: string;
  campusDistance?: string;
};

export type KosSortKey = "recommended" | "cheapest" | "priciest" | "rating";

export type KosQuery = {
  keyword?: string;
  city?: string;
  type?: KosType;
  maxPrice?: number;
  facilities?: string[];
  badge?: KosBadge;
  sort?: KosSortKey;
};
