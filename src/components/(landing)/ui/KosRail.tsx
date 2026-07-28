"use client";

import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Kos } from "@/components/(landing)/types/kos";
import { KosCard } from "@/components/(landing)/ui/KosCard";
import { PromoCountdown } from "@/components/(landing)/ui/PromoCountdown";

const CARD_SCROLL_STEP = 300;
const ARROW_CLASS =
  "flex size-10 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors hover:border-mami hover:text-mami disabled:opacity-40";

type KosRailProps = {
  title: string;
  kos: Kos[];
  seeAllHref: string;
  cities?: string[];
  selectedCity?: string;
  onCityChange?: (city: string) => void;
  hasCountdown?: boolean;
};

function CityPicker({
  cities,
  selected,
  onChange,
}: {
  cities: string[];
  selected: string;
  onChange: (city: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

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
    <span className="relative inline-block" ref={containerRef}>
      <button
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="inline-flex items-center gap-2 border-b-2 border-mami pb-0.5 text-mami"
        onClick={() => setIsOpen((wasOpen) => !wasOpen)}
        type="button"
      >
        {selected}
        <ChevronDown aria-hidden className="size-5 text-ink" />
      </button>
      {isOpen ? (
        <ul className="absolute left-0 top-full z-20 mt-2 max-h-72 w-56 overflow-y-auto rounded-lg border border-line bg-white py-2 text-base shadow-lg">
          {cities.map((city) => (
            <li key={city}>
              <button
                className={`block w-full px-4 py-2 text-left font-normal hover:bg-surface ${
                  city === selected ? "font-bold text-mami" : "text-ink"
                }`}
                onClick={() => {
                  onChange(city);
                  setIsOpen(false);
                }}
                type="button"
              >
                {city}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </span>
  );
}

export function KosRail({
  title,
  kos,
  seeAllHref,
  cities,
  selectedCity,
  onCityChange,
  hasCountdown = false,
}: KosRailProps) {
  const railRef = useRef<HTMLUListElement>(null);

  function scrollRail(direction: -1 | 1) {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    railRef.current?.scrollBy({
      left: direction * CARD_SCROLL_STEP,
      behavior: reduced ? "auto" : "smooth",
    });
  }

  return (
    <section className="mami-container py-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-black text-ink-3">
          {title}{" "}
          {cities && selectedCity && onCityChange ? (
            <CityPicker
              cities={cities}
              onChange={onCityChange}
              selected={selectedCity}
            />
          ) : null}
        </h2>

        <div className="flex items-center gap-4">
          {hasCountdown ? <PromoCountdown /> : null}
          <Link
            className="rounded-md border border-line px-5 py-2.5 text-sm font-bold text-ink transition-colors hover:border-mami hover:text-mami"
            href={seeAllHref}
          >
            Lihat semua
          </Link>
          <span aria-hidden className="h-6 w-px bg-line" />
          <button
            aria-label="Geser ke kiri"
            className={ARROW_CLASS}
            onClick={() => scrollRail(-1)}
            type="button"
          >
            <ChevronLeft aria-hidden className="size-5" />
          </button>
          <button
            aria-label="Geser ke kanan"
            className={ARROW_CLASS}
            onClick={() => scrollRail(1)}
            type="button"
          >
            <ChevronRight aria-hidden className="size-5" />
          </button>
        </div>
      </div>

      {kos.length === 0 ? (
        <p className="mt-8 rounded-lg border border-line bg-surface px-6 py-10 text-center text-sm text-mute">
          Belum ada kos yang cocok di kota ini. Coba pilih kota lain.
        </p>
      ) : (
        <ul
          className="no-scrollbar mt-6 flex snap-x gap-5 overflow-x-auto pb-2"
          ref={railRef}
        >
          {kos.map((entry) => (
            <li
              className="w-[270px] shrink-0 snap-start sm:w-[280px]"
              key={entry.slug}
            >
              <KosCard kos={entry} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
