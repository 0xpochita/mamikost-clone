"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import {
  BANNER_INTRINSIC_HEIGHT,
  BANNER_INTRINSIC_WIDTH,
  PROMO_BANNERS,
} from "@/components/(landing)/data/promoBanners";

const BANNER_CSS_WIDTH = 606;
const RAIL_GAP = 24;
const RAIL_MAX_WIDTH = 1216;
const COPY_COUNT = 3;
const ARROW_CLASS =
  "flex size-11 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors hover:border-mami hover:text-mami";

const LOOPED_BANNERS = Array.from({ length: COPY_COUNT }, (_, copy) =>
  PROMO_BANNERS.map((banner) => ({ ...banner, copy })),
).flat();

export function BannerRail() {
  const railRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollLeft = rail.scrollWidth / COPY_COUNT;
  }, []);

  function recentre() {
    const rail = railRef.current;
    if (!rail) return;

    const copyWidth = rail.scrollWidth / COPY_COUNT;
    if (rail.scrollLeft < copyWidth * 0.5) {
      rail.scrollLeft += copyWidth;
    } else if (rail.scrollLeft > copyWidth * 1.5) {
      rail.scrollLeft -= copyWidth;
    }
  }

  function scrollByOneBanner(direction: -1 | 1) {
    const rail = railRef.current;
    if (!rail) return;

    const isReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    rail.scrollBy({
      left: direction * (BANNER_CSS_WIDTH + RAIL_GAP),
      behavior: isReduced ? "auto" : "smooth",
    });
  }

  return (
    <div className="mx-auto w-full" style={{ maxWidth: RAIL_MAX_WIDTH }}>
      <ul
        className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto py-1"
        onScroll={recentre}
        ref={railRef}
        style={{
          paddingInline: `max(1rem, calc((100% - ${BANNER_CSS_WIDTH}px) / 2))`,
        }}
      >
        {LOOPED_BANNERS.map((banner, index) => (
          <li
            aria-hidden={banner.copy !== 1}
            className="w-[606px] max-w-[85vw] shrink-0 snap-center"
            key={`${banner.src}-${banner.copy}`}
          >
            <Link
              className="block overflow-hidden rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mami"
              href={banner.href}
              tabIndex={banner.copy === 1 ? undefined : -1}
            >
              <Image
                alt={banner.copy === 1 ? banner.alt : ""}
                className="h-auto w-full"
                height={BANNER_INTRINSIC_HEIGHT}
                loading={index === PROMO_BANNERS.length ? "eager" : "lazy"}
                sizes="(max-width: 767px) 85vw, 606px"
                src={banner.src}
                width={BANNER_INTRINSIC_WIDTH}
              />
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex items-center justify-center gap-6">
        <button
          aria-label="Promo sebelumnya"
          className={ARROW_CLASS}
          onClick={() => scrollByOneBanner(-1)}
          type="button"
        >
          <ChevronLeft aria-hidden className="size-5" />
        </button>
        <Link
          className="text-base font-bold text-ink hover:text-mami"
          href="/promo"
        >
          Lihat semua promo
        </Link>
        <button
          aria-label="Promo berikutnya"
          className={ARROW_CLASS}
          onClick={() => scrollByOneBanner(1)}
          type="button"
        >
          <ChevronRight aria-hidden className="size-5" />
        </button>
      </div>
    </div>
  );
}
