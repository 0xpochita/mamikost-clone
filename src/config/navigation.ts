import { ASSET_PATHS } from "@/config/assets";

export type NavLink = {
  label: string;
  href: string;
};

/** The icon travels with its link so the pairing cannot drift. A parallel
 * array indexed by position looks fine and silently mismatches the moment an
 * entry is reordered. */
export type TopBarLink = NavLink & {
  icon: string;
};

export type FooterColumn = {
  title: string;
  links: NavLink[];
};

export const TOP_BAR_ICON_SIZE = 16;

export const TOP_BAR_LEFT_LINKS: TopBarLink[] = [
  {
    label: "Download App",
    href: "/download",
    icon: `${ASSET_PATHS.icon}/icon-smartphone.svg`,
  },
  {
    label: "Sewa Kos",
    href: "/cari",
    icon: `${ASSET_PATHS.icon}/icon-calendar.svg`,
  },
];

export const TOP_BAR_RIGHT_LINK: TopBarLink = {
  label: "Promosikan Iklan Anda",
  href: "/pemilik/daftar",
  icon: `${ASSET_PATHS.icon}/icon-promote.svg`,
};

export const MAIN_NAV_LINKS: NavLink[] = [
  { label: "Pusat Bantuan", href: "/bantuan" },
  { label: "Syarat dan Ketentuan", href: "/syarat" },
];

export const SEARCH_MENU_ICON_SIZE = 24;

/** Supplied brand marks travel as asset paths. Generic icons travel as a key
 * that the header maps to a component, so this config never imports React and
 * stays a plain data module. */
export type SearchMenuIcon =
  | { kind: "asset"; src: string }
  | { kind: "glyph"; name: "bed" | "apartment" | "property" };

export type SearchMenuLink = NavLink & {
  icon: SearchMenuIcon;
};

export const SEARCH_MENU_LINKS: SearchMenuLink[] = [
  {
    label: "Kos",
    href: "/cari",
    icon: { kind: "glyph", name: "bed" },
  },
  {
    label: "Kos Singgahsini & Apik",
    href: "/cari?program=singgahsini",
    icon: {
      kind: "asset",
      src: `${ASSET_PATHS.icon}/icon-singgahsini-no-text.svg`,
    },
  },
  {
    label: "Kos Andalan",
    href: "/cari?badge=andalan",
    icon: { kind: "asset", src: `${ASSET_PATHS.brand}/icon-kos-andalan.svg` },
  },
  {
    label: "Apartemen",
    href: "/cari?kategori=apartemen",
    icon: { kind: "glyph", name: "apartment" },
  },
  {
    label: "Jual-Beli Properti",
    href: "/properti",
    icon: { kind: "glyph", name: "property" },
  },
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
