import type { PromoBanner } from "@/components/(landing)/types/promo";
import { ASSET_PATHS } from "@/config/assets";

export const BANNER_INTRINSIC_WIDTH = 817;
export const BANNER_INTRINSIC_HEIGHT = 346;

export const PROMO_BANNERS: PromoBanner[] = [
  {
    src: `${ASSET_PATHS.banner}/banner-1.webp`,
    alt: "Singgahsini dan Apik: singgah sehari lebih awal, ngekos lebih santai",
    href: "/promo/singgah-sehari-lebih-awal",
  },
  {
    src: `${ASSET_PATHS.banner}/banner-2.png`,
    alt: "Mamikos LebihDariHunian: beragam promo untuk anak kos",
    href: "/promo/lebih-dari-hunian",
  },
  {
    src: `${ASSET_PATHS.banner}/banner-3.webp`,
    alt: "Singgahsini Talangin: masuk kos tanpa deposit di awal",
    href: "/promo/talangin",
  },
  {
    src: `${ASSET_PATHS.banner}/banner-4.webp`,
    alt: "Singgahsini dan Apik: diskon Rp50.000 dengan voucher STARTERPACK",
    href: "/promo/starterpack",
  },
  {
    src: `${ASSET_PATHS.banner}/banner-5.webp`,
    alt: "CusKupon Mamikos: beragam keperluan kos dengan harga miring",
    href: "/promo/cuskupon",
  },
  {
    src: `${ASSET_PATHS.banner}/banner-6.png`,
    alt: "Fitur Survei Hari Ini: survei kos sekarang juga tanpa lama",
    href: "/promo/survei-hari-ini",
  },
  {
    src: `${ASSET_PATHS.banner}/banner-7.jpg`,
    alt: "Apple Music gratis satu bulan untuk anak kos",
    href: "/promo/apple-music",
  },
  {
    src: `${ASSET_PATHS.banner}/banner-8.png`,
    alt: "Kos Andalan: pakai fitur survei kos, gratis voucher Rp100.000",
    href: "/promo/voucher-survei",
  },
  {
    src: `${ASSET_PATHS.banner}/banner-9.jpg`,
    alt: "Singgahsini dan Apik: ngekos aman dengan garansi uang kembali",
    href: "/promo/garansi-uang-kembali",
  },
  {
    src: `${ASSET_PATHS.banner}/banner-10.png`,
    alt: "LebihDariHunian: kos adalah perjalanan",
    href: "/promo/kos-adalah-perjalanan",
  },
  {
    src: `${ASSET_PATHS.banner}/banner-11.webp`,
    alt: "Singgahsini dan Apik: perlindungan lebih luas untuk motor dan barang",
    href: "/promo/perlindungan",
  },
  {
    src: `${ASSET_PATHS.banner}/banner-12.webp`,
    alt: "Singgahsini dan Apik: diskon hingga Rp2,5 juta untuk sewa lebih lama",
    href: "/promo/sewa-lebih-lama",
  },
  {
    src: `${ASSET_PATHS.banner}/banner-13.webp`,
    alt: "Promo Ngebut Extra: diskon Rp729.000 untuk kos dekat kampus",
    href: "/promo/ngebut-extra",
  },
];
