"use client";

import { ChevronDown, Megaphone, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MamikosLogo } from "@/components/layout/MamikosLogo";
import { ASSET_PATHS } from "@/config/assets";
import {
  MAIN_NAV_LINKS,
  SEARCH_MENU_LINKS,
  TOP_BAR_LEFT_LINKS,
  TOP_BAR_RIGHT_LINK,
} from "@/config/navigation";

const TOP_BAR_ICON_SIZE = 16;

const TOP_BAR_ICONS = [
  `${ASSET_PATHS.icon}/icon-smartphone.svg`,
  `${ASSET_PATHS.icon}/icon-calendar.svg`,
];

function HeaderTopBar() {
  return (
    <div className="hidden border-b border-line bg-white lg:block">
      <div className="mami-container flex h-10 items-center justify-between text-sm text-ink-2">
        <ul className="flex items-center gap-8">
          {TOP_BAR_LEFT_LINKS.map((link, index) => (
            <li key={link.href}>
              <Link
                className="flex items-center gap-2 hover:text-mami"
                href={link.href}
              >
                <Image
                  alt=""
                  aria-hidden
                  height={TOP_BAR_ICON_SIZE}
                  src={TOP_BAR_ICONS[index]}
                  unoptimized
                  width={TOP_BAR_ICON_SIZE}
                />
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          className="flex items-center gap-2 hover:text-mami"
          href={TOP_BAR_RIGHT_LINK.href}
        >
          <Megaphone aria-hidden className="size-4 text-mute" />
          {TOP_BAR_RIGHT_LINK.label}
        </Link>
      </div>
    </div>
  );
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
    <div className="relative" ref={containerRef}>
      <button
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="flex items-center gap-1.5 text-base font-bold text-ink hover:text-mami"
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
        <ul className="absolute left-0 top-full z-10 mt-3 w-56 rounded-lg border border-line bg-white py-2 shadow-lg">
          {SEARCH_MENU_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                className="block px-4 py-2.5 text-sm text-ink hover:bg-surface hover:text-mami"
                href={link.href}
                onClick={() => setIsOpen(false)}
              >
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

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white">
      <HeaderTopBar />
      <div className="border-b border-line">
        <div className="mami-container flex h-14 items-center justify-between gap-6 lg:h-16">
          <Link aria-label="Beranda Mamikos" href="/">
            <MamikosLogo isEager />
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            <SearchMenu />
            {MAIN_NAV_LINKS.map((link) => (
              <Link
                className="text-base font-bold text-ink hover:text-mami"
                href={link.href}
                key={link.href}
              >
                {link.label}
              </Link>
            ))}
            <Link
              className="rounded-md border border-mami px-6 py-2.5 text-base font-bold text-mami hover:bg-mami-tint"
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
