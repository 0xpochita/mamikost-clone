"use client";

import {
  Bed,
  Building2,
  ChevronDown,
  House,
  Menu,
  Search,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MamikosLogo } from "@/components/layout/MamikosLogo";
import {
  MAIN_NAV_LINKS,
  SEARCH_MENU_ICON_SIZE,
  SEARCH_MENU_LINKS,
  type SearchMenuIcon,
  TOP_BAR_ICON_SIZE,
  TOP_BAR_LEFT_LINKS,
  TOP_BAR_RIGHT_LINK,
  type TopBarLink,
} from "@/config/navigation";

const COMPACT_SCROLL_THRESHOLD = 240;

/** Matches `.nav-search:hover:after` in the production stylesheet: a 3px brand
 * bar pinned to the bottom of the full-height nav item, radius 2px 2px 0 0. */
const NAV_ITEM_CLASS =
  "relative flex h-full items-center px-3 text-base font-bold text-ink transition-colors hover:text-mami after:absolute after:inset-x-0 after:bottom-0 after:h-[3px] after:rounded-t-[2px] after:bg-mami after:opacity-0 after:transition-opacity hover:after:opacity-100";

/** Mirrors `.nav-topbar-label`: 12px, weight 700, `#757575`, 18px line box,
 * 8px between the glyph and its label. */
function TopBarEntry({ link }: { link: TopBarLink }) {
  return (
    <Link
      className="flex items-center gap-2 text-xs font-black leading-4.5 text-mute transition-colors hover:text-mami"
      href={link.href}
    >
      <Image
        alt=""
        aria-hidden
        height={TOP_BAR_ICON_SIZE}
        src={link.icon}
        unoptimized
        width={TOP_BAR_ICON_SIZE}
      />
      {link.label}
    </Link>
  );
}

function HeaderTopBar() {
  return (
    <div className="hidden bg-surface-soft lg:block">
      <div className="mami-container flex h-10 items-center justify-between">
        <ul className="flex items-center gap-6">
          {TOP_BAR_LEFT_LINKS.map((link) => (
            <li key={link.href}>
              <TopBarEntry link={link} />
            </li>
          ))}
        </ul>
        <TopBarEntry link={TOP_BAR_RIGHT_LINK} />
      </div>
    </div>
  );
}

const SEARCH_MENU_GLYPHS = {
  bed: Bed,
  apartment: Building2,
  property: House,
} as const;

function SearchMenuGlyph({ icon }: { icon: SearchMenuIcon }) {
  if (icon.kind === "asset") {
    return (
      <Image
        alt=""
        aria-hidden
        className="size-6 shrink-0"
        height={SEARCH_MENU_ICON_SIZE}
        src={icon.src}
        unoptimized
        width={SEARCH_MENU_ICON_SIZE}
      />
    );
  }

  const Glyph = SEARCH_MENU_GLYPHS[icon.name];
  return <Glyph aria-hidden className="size-6 shrink-0 text-ink" />;
}

function SearchMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node))
        setIsOpen(false);
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="relative h-full" ref={containerRef}>
      <button
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className={`${NAV_ITEM_CLASS} gap-1.5 ${isOpen ? "after:opacity-100" : ""}`}
        onClick={() => setIsOpen((wasOpen) => !wasOpen)}
        type="button"
      >
        Cari Apa?
        <ChevronDown
          aria-hidden
          className={`size-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen ? (
        <ul className="absolute left-0 top-full z-10 w-72 rounded-lg border border-line bg-white py-3 shadow-lg">
          {SEARCH_MENU_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                className="flex items-center gap-4 px-5 py-3 text-base font-bold text-ink hover:bg-surface hover:text-mami"
                href={link.href}
                onClick={() => setIsOpen(false)}
              >
                <SearchMenuGlyph icon={link.icon} />
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function MobileMenu({ onNavigate }: { onNavigate: () => void }) {
  const links = [
    ...SEARCH_MENU_LINKS,
    ...MAIN_NAV_LINKS,
    ...TOP_BAR_LEFT_LINKS,
  ];

  return (
    <div className="border-t border-line bg-white lg:hidden">
      <nav aria-label="Navigasi seluler" className="mami-container py-2">
        <ul className="flex flex-col">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                className="block py-3 text-sm font-bold text-ink"
                href={link.href}
                onClick={onNavigate}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          className="my-3 block rounded-md border border-mami py-2.5 text-center text-sm font-bold text-mami"
          href="/masuk"
          onClick={onNavigate}
        >
          Masuk
        </Link>
      </nav>
    </div>
  );
}

/** Once the hero search has scrolled away the wordmark shrinks to its mark so
 * the search field can move into the bar itself. The top strip stays put: the
 * reference keeps it visible in the scrolled state. */
function useCompactHeader() {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    function syncCompactState() {
      setIsCompact(window.scrollY > COMPACT_SCROLL_THRESHOLD);
    }
    syncCompactState();
    window.addEventListener("scroll", syncCompactState, { passive: true });
    return () => window.removeEventListener("scroll", syncCompactState);
  }, []);

  return isCompact;
}

function HeaderSearchField() {
  return (
    <form
      action="/cari"
      className="flex h-11 flex-1 items-center gap-2 rounded-lg border border-line bg-white p-0.5 focus-within:border-mami"
    >
      <label className="sr-only" htmlFor="header-search">
        Cari kos berdasarkan lokasi, area, atau alamat
      </label>
      <Search aria-hidden className="ml-2.5 size-6 shrink-0 text-ink" />
      <input
        className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-ink outline-none placeholder:font-semibold placeholder:text-mute-2"
        id="header-search"
        name="keyword"
        placeholder="Masukan nama lokasi/area/alamat"
        type="search"
      />
      <button
        className="h-full shrink-0 rounded-md bg-mami px-6 text-sm font-bold text-white transition-colors hover:bg-mami-dark"
        type="submit"
      >
        Cari
      </button>
    </form>
  );
}

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isCompact = useCompactHeader();

  return (
    <header className="sticky top-0 z-50 bg-white">
      <HeaderTopBar />
      <div className="border-b border-line">
        <div className="mami-container flex h-14 items-center justify-between gap-6 lg:h-16">
          <div className="flex flex-1 items-center gap-3">
            <Link aria-label="Beranda Mamikos" className="shrink-0" href="/">
              <span
                className={`block overflow-hidden ${isCompact ? "w-9" : "w-[123px] lg:w-[136px]"}`}
              >
                <MamikosLogo
                  className="h-5 w-[123px] max-w-none lg:h-[30px] lg:w-[136px]"
                  isEager
                />
              </span>
            </Link>

            {isCompact ? (
              <div className="hidden w-full max-w-[470px] lg:block">
                <HeaderSearchField />
              </div>
            ) : null}
          </div>

          <div className="hidden h-full items-center lg:flex">
            <SearchMenu />
            {MAIN_NAV_LINKS.map((link) => (
              <Link
                aria-current={pathname === link.href ? "page" : undefined}
                className={`${NAV_ITEM_CLASS} ${
                  pathname === link.href ? "after:opacity-100" : ""
                }`}
                href={link.href}
                key={link.href}
              >
                {link.label}
              </Link>
            ))}
            <Link
              className="ml-3 rounded-md border border-mami px-4.5 py-2 text-base font-bold text-mami transition-colors hover:bg-mami-tint"
              href="/masuk"
            >
              Masuk
            </Link>
          </div>

          <button
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Tutup menu" : "Buka menu"}
            className="rounded-full p-2 text-ink-2 hover:bg-surface lg:hidden"
            onClick={() => setIsMenuOpen((wasOpen) => !wasOpen)}
            type="button"
          >
            {isMenuOpen ? (
              <X aria-hidden className="size-6" />
            ) : (
              <Menu aria-hidden className="size-6" />
            )}
          </button>
        </div>
      </div>
      {isMenuOpen ? (
        <div id="mobile-menu">
          <MobileMenu onNavigate={() => setIsMenuOpen(false)} />
        </div>
      ) : null}
    </header>
  );
}
