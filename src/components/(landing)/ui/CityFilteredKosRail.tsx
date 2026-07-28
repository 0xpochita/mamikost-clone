"use client";

import { useState } from "react";
import type { CityFilteredKosRailProps } from "@/components/(landing)/types/rail";
import { KosRail } from "@/components/(landing)/ui/KosRail";

export const ALL_CITIES_LABEL = "Semua Kota";

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
