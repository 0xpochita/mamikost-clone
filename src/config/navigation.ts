export type NavLink = {
  label: string;
  href: string;
};

export type FooterColumn = {
  title: string;
  links: NavLink[];
};

export const TOP_BAR_LEFT_LINKS: NavLink[] = [
  { label: "Download App", href: "/download" },
  { label: "Sewa Kos", href: "/cari" },
];

export const TOP_BAR_RIGHT_LINK: NavLink = {
  label: "Promosikan Iklan Anda",
  href: "/pemilik/daftar",
};

export const MAIN_NAV_LINKS: NavLink[] = [
  { label: "Pusat Bantuan", href: "/bantuan" },
  { label: "Syarat dan Ketentuan", href: "/syarat" },
];

export const SEARCH_MENU_LINKS: NavLink[] = [
  { label: "Cari Kos", href: "/cari" },
  { label: "Cari Apartemen", href: "/cari?kategori=apartemen" },
  { label: "Cari Kos Andalan", href: "/cari?badge=andalan" },
  { label: "Cari Kos Promo", href: "/cari?badge=promo" },
];

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "MAMIKOS",
    links: [
      { label: "Tentang Kami", href: "/tentang" },
      { label: "Job Mamikos", href: "/karier" },
      { label: "Promosikan Kost Anda", href: "/pemilik/daftar" },
      { label: "Pusat Bantuan", href: "/bantuan" },
      { label: "Blog Mamikos", href: "/blog" },
      { label: "Singgahsini", href: "/singgahsini" },
    ],
  },
  {
    title: "KEBIJAKAN",
    links: [
      { label: "Kebijakan Privasi", href: "/privasi" },
      { label: "Syarat dan Ketentuan Umum", href: "/syarat" },
    ],
  },
];

export const CONTACT_EMAIL = "cs@mamikos.com";
export const CONTACT_PHONE = "+6281325111171";
