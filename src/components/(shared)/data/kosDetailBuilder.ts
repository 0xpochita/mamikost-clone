import type { Kos } from "@/components/(shared)/types/kos";
import type {
  KosDetail,
  KosRatingBreakdown,
  KosReview,
  KosRule,
} from "@/components/(shared)/types/kosDetail";

const BATHROOM_FACILITIES = ["Kloset Duduk", "Ember mandi", "Shower"];
const EXTRA_ROOM_FACILITIES = ["Jendela", "Cermin", "Bantal"];
const PUBLIC_FACILITIES = [
  "WiFi",
  "R. Tamu",
  "Penjaga Kos",
  "R. Jemur",
  "Dapur",
  "Jemuran",
];
const PARKING_FACILITIES = ["Parkir Mobil", "Parkir Motor & Sepeda"];
const HOUSE_RULES = [
  "Akses 24 Jam",
  "Boleh pasutri",
  "Boleh bawa anak",
  "Dilarang merokok di kamar",
  "Lawan jenis dilarang ke kamar",
];
const OWNER_NAMES = ["Sintia", "Bu Ratna", "Pak Herman", "Dewi", "Mas Andre"];
const REVIEW_AUTHORS = ["Qoirrul Bhucorry", "Anonim", "Rizky P.", "Nadia"];
const RATING_LABELS = [
  "Kebersihan",
  "Harga",
  "Kenyamanan",
  "Fasilitas Kamar",
  "Keamanan",
  "Fasilitas Umum",
];

const DEPOSIT_AMOUNT = 200_000;
const MAX_RATING = 5;
const RATING_SPREAD = 0.5;
const REVIEW_COUNT_DIVISOR = 3;
const MIN_REVIEWS = 1;
const MAX_REVIEWS = 3;

function seedFrom(slug: string): number {
  let total = 0;
  for (const character of slug) total += character.charCodeAt(0);
  return total;
}

function pick<T>(items: readonly T[], seed: number, offset: number): T {
  return items[(seed + offset) % items.length];
}

function clampRating(value: number): number {
  return Math.min(MAX_RATING, Math.max(1, Math.round(value * 2) / 2));
}

function buildRatingBreakdown(kos: Kos, seed: number): KosRatingBreakdown[] {
  return RATING_LABELS.map((label, index) => ({
    label,
    score: clampRating(kos.rating + (((seed + index) % 3) - 1) * RATING_SPREAD),
  }));
}

function buildReviews(kos: Kos, seed: number): KosReview[] {
  const total = Math.min(
    MAX_REVIEWS,
    Math.max(MIN_REVIEWS, Math.round(kos.reviewCount / REVIEW_COUNT_DIVISOR)),
  );

  return Array.from({ length: total }, (_, index) => {
    const author = pick(REVIEW_AUTHORS, seed, index);
    return {
      author,
      timeAgo: `${index + 3} bulan yang lalu`,
      rating: clampRating(kos.rating - index * RATING_SPREAD),
      body:
        index === 0
          ? `Kamarnya sesuai foto dan lingkungannya tenang. Cocok buat yang cari kos di ${kos.area}.`
          : "Secara umum nyaman, tapi jam ramai kadang agak berisik.",
      ownerReply: `Halo, Kak ${author.split(" ")[0]}. Terima kasih atas ratingnya :)`,
    };
  });
}

function buildRoomRules(kos: Kos): KosRule[] {
  return [
    { label: "Tamu boleh menginap" },
    { label: "Tamu menginap dikenakan biaya" },
    { label: `Maks. ${kos.type === "Putri" ? 1 : 2} orang/kamar` },
    {
      label: "Boleh pasutri",
      detail: "Wajib sertakan surat nikah saat pengajuan sewa",
    },
    {
      label: "Boleh bawa anak",
      detail: "Wajib sertakan kartu keluarga saat pengajuan sewa",
    },
  ];
}

function buildOwnerStory(kos: Kos): string[] {
  return [
    `"Warna sprei yang disediakan bisa berbeda dari foto. Tata letak furnitur pada setiap kamar mungkin tidak persis sama."`,
    `Kos ini berada di ${kos.area}, ${kos.city}, dan hanya memiliki satu tipe kamar. Waktu kunjungan survei tersedia pukul 08.00 sampai 18.00 WIB.`,
    kos.campus
      ? `Lokasinya sekitar ${kos.campusDistance} dari ${kos.campus}, dekat jalan raya dan bisa dilalui mobil.`
      : "Lokasinya dekat jalan raya dan akses jalannya bisa dilalui mobil.",
  ];
}

export function buildKosDetail(kos: Kos): KosDetail {
  const seed = seedFrom(kos.slug);

  return {
    breadcrumb: [
      "Home",
      `Kos ${kos.city}`,
      `Kos ${kos.area} ${kos.city}`,
      kos.name,
    ],
    roomFacilities: [...kos.facilities, ...EXTRA_ROOM_FACILITIES],
    bathroomFacilities: [
      kos.facilities.find((item) => item.startsWith("K. Mandi")) ??
        "K. Mandi Luar",
      ...BATHROOM_FACILITIES,
    ],
    publicFacilities: PUBLIC_FACILITIES,
    parkingFacilities: PARKING_FACILITIES,
    roomRules: buildRoomRules(kos),
    houseRules: HOUSE_RULES,
    ownerStory: buildOwnerStory(kos),
    deposit: DEPOSIT_AMOUNT,
    isElectricityIncluded: kos.facilities.includes("Termasuk listrik"),
    roomDimension: `${kos.roomSize} meter`,
    owner: {
      name: pick(OWNER_NAMES, seed, 0),
      activeSince: "Nov 2025",
      lastOnline: `${(seed % 9) + 1} jam yang lalu`,
      transactionCount: 1000 + (seed % 9000),
    },
    reviews: buildReviews(kos, seed),
    ratingBreakdown: buildRatingBreakdown(kos, seed),
    transactionCount: (seed % 40) + 3,
  };
}
