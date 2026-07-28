import {
  listKosCities,
  searchKos,
} from "@/components/(landing)/data/kosRepository";
import { CityFilteredKosRail } from "@/components/(landing)/ui/CityFilteredKosRail";

export function PromoNgebutSection() {
  return (
    <CityFilteredKosRail
      cities={listKosCities()}
      hasCountdown
      kos={searchKos({ badge: "flash" })}
      seeAllHref="/cari?badge=flash"
      title="Promo Ngebut"
    />
  );
}

export function RecommendationSection() {
  return (
    <CityFilteredKosRail
      cities={listKosCities()}
      kos={searchKos()}
      seeAllHref="/cari"
      title="Rekomendasi kos di"
    />
  );
}

export function PromoKosSection() {
  return (
    <CityFilteredKosRail
      cities={listKosCities()}
      kos={searchKos({ badge: "promo" })}
      seeAllHref="/cari?badge=promo"
      title="Kos yang lagi promo di"
    />
  );
}
