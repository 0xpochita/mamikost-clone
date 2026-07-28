import type { Kos } from "@/components/(landing)/types/kos";

export type KosRailProps = {
  title: string;
  kos: Kos[];
  seeAllHref: string;
  cities?: string[];
  selectedCity?: string;
  onCityChange?: (city: string) => void;
  hasCountdown?: boolean;
};

export type CityPickerProps = {
  cities: string[];
  selected: string;
  onChange: (city: string) => void;
};

export type CityFilteredKosRailProps = {
  title: string;
  kos: Kos[];
  cities: string[];
  seeAllHref: string;
  hasCountdown?: boolean;
};

export type CountdownRemaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export type MamikosFeature = {
  title: string;
  body: string;
};
