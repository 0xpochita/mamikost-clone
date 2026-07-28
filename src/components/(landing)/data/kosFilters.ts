import type { KosSortKey, KosType } from "@/components/(landing)/types/kos";
import { ASSET_PATHS } from "@/config/assets";

export const KOS_TYPES = [
  "Putra",
  "Putri",
  "Campur",
] as const satisfies readonly KosType[];

export const FACILITY_OPTIONS = [
  "K. Mandi Dalam",
  "AC",
  "WiFi",
  "Kasur",
  "Lemari",
  "Termasuk listrik",
  "Parkir Motor",
  "Water Heater",
] as const;

export const SORT_OPTIONS = [
  { value: "recommended", label: "Paling sesuai" },
  { value: "cheapest", label: "Harga terendah" },
  { value: "priciest", label: "Harga tertinggi" },
  { value: "rating", label: "Rating tertinggi" },
] as const satisfies readonly { value: KosSortKey; label: string }[];

export const PRICE_CEILINGS = [
  { value: 1000000, label: "Di bawah Rp1 juta" },
  { value: 1500000, label: "Di bawah Rp1,5 juta" },
  { value: 2000000, label: "Di bawah Rp2 juta" },
  { value: 3000000, label: "Di bawah Rp3 juta" },
] as const;

export const POPULAR_AREAS = [
  {
    label: "Kos Jakarta",
    city: "Jakarta Selatan",
    photo: `${ASSET_PATHS.city}/kos-jakarta.webp`,
  },
  {
    label: "Kos Jogja",
    city: "Yogyakarta",
    photo: `${ASSET_PATHS.city}/kos-yogyakarta.webp`,
  },
  {
    label: "Kos Bandung",
    city: "Bandung",
    photo: `${ASSET_PATHS.city}/kos-bandung.webp`,
  },
  {
    label: "Kos Surabaya",
    city: "Surabaya",
    photo: `${ASSET_PATHS.city}/kos-surabaya.webp`,
  },
  {
    label: "Kos Malang",
    city: "Malang",
    photo: `${ASSET_PATHS.city}/kos-malang.webp`,
  },
  {
    label: "Kos Medan",
    city: "Medan",
    photo: `${ASSET_PATHS.city}/kos-medan.webp`,
  },
] as const;

export const POPULAR_CAMPUSES = [
  {
    abbreviation: "UGM",
    city: "Jogja",
    logo: `${ASSET_PATHS.campus}/ugm-jogja.png`,
  },
  {
    abbreviation: "UNDIP",
    city: "Semarang",
    logo: `${ASSET_PATHS.campus}/undip-semarang.png`,
  },
  {
    abbreviation: "UI",
    city: "Depok",
    logo: `${ASSET_PATHS.campus}/ui-depok.png`,
  },
  {
    abbreviation: "UNPAD",
    city: "Jatinangor",
    logo: `${ASSET_PATHS.campus}/unpad-jatinangor.webp`,
  },
  {
    abbreviation: "STAN",
    city: "Jakarta",
    logo: `${ASSET_PATHS.campus}/stan-jakarta.png`,
  },
  {
    abbreviation: "UB",
    city: "Malang",
    logo: `${ASSET_PATHS.campus}/ub-malang.png`,
  },
  {
    abbreviation: "UNAIR",
    city: "Surabaya",
    logo: `${ASSET_PATHS.campus}/unair-surabaya.png`,
  },
] as const;
