"use client";

import { useState } from "react";
import type { CityFilteredKosRailProps } from "@/components/(landing)/types/rail";
import { KosRail } from "@/components/(landing)/ui/KosRail";

export const ALL_CITIES_LABEL = "Semua Kota";

/** Filters a list the server already sent, using local state rather than the
 * URL. Reading `searchParams` here would opt the whole home page out of static
 * rendering for a browsing convenience. The shareable filter lives on `/cari`,
 * and `Lihat semua` carries the choice there. */
export function CityFilteredKosRail({
  title,
  kos,
  cities,
  seeAllHref,
  hasCountdown,
}: CityFilteredKosRailProps) {
  const [selectedCity, setSelectedCity] = useState(ALL_CITIES_LABEL);

  const visibleKos =
    selectedCity === ALL_CITIES_LABEL
      ? kos
      : kos.filter((entry) => entry.city === selectedCity);

  const href =
    selectedCity === ALL_CITIES_LABEL
      ? seeAllHref
      : `${seeAllHref}${seeAllHref.includes("?") ? "&" : "?"}city=${encodeURIComponent(selectedCity)}`;

  return (
    <KosRail
      cities={[ALL_CITIES_LABEL, ...cities]}
      hasCountdown={hasCountdown}
      kos={visibleKos}
      onCityChange={setSelectedCity}
      seeAllHref={href}
      selectedCity={selectedCity}
      title={title}
    />
  );
}
