import type { KosSortKey, KosType } from "@/components/(landing)/types/kos";

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
  { name: "Jakarta Selatan", photo: "/img/p27.jpg" },
  { name: "Yogyakarta", photo: "/img/p25.jpg" },
  { name: "Bandung", photo: "/img/p14.jpg" },
  { name: "Surabaya", photo: "/img/p26.jpg" },
  { name: "Depok", photo: "/img/p03.jpg" },
  { name: "Semarang", photo: "/img/p09.jpg" },
] as const;

export const POPULAR_CAMPUSES = [
  "UGM",
  "UI",
  "ITB",
  "ITS",
  "Undip",
  "Telkom University",
  "Universitas Brawijaya",
  "Binus",
] as const;
