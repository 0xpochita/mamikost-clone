import { Gift, Star, Ticket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Kos } from "@/components/(landing)/types/kos";
import { formatRupiah } from "@/components/(landing)/utils/formatCurrency";
import { ASSET_PATHS } from "@/config/assets";

const PHOTO_INTRINSIC_WIDTH = 800;
const PHOTO_INTRINSIC_HEIGHT = 534;
const LOW_VACANCY_THRESHOLD = 3;
const CARD_SIZES = "(max-width: 767px) 80vw, (max-width: 1199px) 45vw, 23vw";

/** Mamikos fills the box with a blurred copy of the photo and lays the sharp
 * one over it at 105% height. Sources are rarely the slot ratio, and this shows
 * the whole frame instead of cropping it. */
function KosPhoto({ kos }: { kos: Kos }) {
  return (
    <div className="relative aspect-5/3 w-full overflow-hidden rounded-card shadow-[0_0_0_1px_var(--color-line)]">
      <Image
        alt=""
        aria-hidden
        className="absolute inset-0 size-full scale-110 object-cover blur-lg"
        height={PHOTO_INTRINSIC_HEIGHT}
        sizes={CARD_SIZES}
        src={kos.coverPhoto}
        width={PHOTO_INTRINSIC_WIDTH}
      />
      <Image
        alt={`Kamar di ${kos.name}`}
        className="absolute left-1/2 top-1/2 h-[105%] w-auto max-w-none -translate-x-1/2 -translate-y-1/2"
        height={PHOTO_INTRINSIC_HEIGHT}
        sizes={CARD_SIZES}
        src={kos.coverPhoto}
        width={PHOTO_INTRINSIC_WIDTH}
      />

      {kos.badges.includes("andalan") ? (
        <Image
          alt=""
          aria-hidden
          className="absolute left-1.5 top-1.5 z-10 size-5"
          height={24}
          src={`${ASSET_PATHS.brand}/icon-kos-andalan.svg`}
          unoptimized
          width={24}
        />
      ) : null}

      {kos.badges.includes("promo") || kos.badges.includes("flash") ? (
        <span className="absolute bottom-2 left-2 z-10 flex size-4 items-center justify-center rounded-lg bg-black/25 text-white">
          <Ticket aria-hidden className="size-2.5" />
        </span>
      ) : null}
    </div>
  );
}

const RIBBON: Record<
  NonNullable<Kos["flashRibbon"]>,
  { className: string; src: string; alt: string }
> = {
  rare: {
    className: "bg-ribbon-rare",
    src: `${ASSET_PATHS.icon}/icon-rare-kost.png`,
    alt: "Rare Kost",
  },
  deposit: {
    className: "bg-ribbon-deposit",
    src: `${ASSET_PATHS.icon}/icon-bebas-deposit.png`,
    alt: "Bebas Deposit",
  },
};

function FlashRibbon({ ribbon }: { ribbon: NonNullable<Kos["flashRibbon"]> }) {
  const { className, src, alt } = RIBBON[ribbon];
  return (
    <div
      className={`-mt-2 flex items-center justify-center rounded-b-card py-1.5 ${className}`}
    >
      <Image
        alt={alt}
        className="h-5 w-auto"
        height={72}
        src={src}
        width={456}
      />
    </div>
  );
}

export function KosCard({ kos }: { kos: Kos }) {
  return (
    <Link
      className="group flex flex-col focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mami"
      href={`/room/${kos.slug}`}
    >
      <KosPhoto kos={kos} />
      {kos.flashRibbon ? <FlashRibbon ribbon={kos.flashRibbon} /> : null}

      <div className="mt-2 flex items-center gap-2">
        <span className="rounded border border-line px-2 py-0.5 text-xs text-ink-2">
          {kos.type}
        </span>
        {kos.vacancy <= LOW_VACANCY_THRESHOLD ? (
          <span className="text-xs italic text-sale">
            Sisa {kos.vacancy} kamar
          </span>
        ) : null}
      </div>

      <p className="mt-1 truncate text-[15px] text-ink group-hover:text-mami">
        {kos.name}
      </p>
      <p className="truncate text-[15px] font-bold text-ink-2">{kos.area}</p>

      <p className="mt-0.5 truncate text-xs leading-[18px] text-mute-2">
        {kos.facilities.join(" · ")}
      </p>

      {kos.promoLabel ? (
        <p className="mt-1.5 flex items-center gap-1.5 truncate text-sm font-bold text-mami">
          <Gift aria-hidden className="size-4 shrink-0" />
          {kos.promoLabel}
        </p>
      ) : (
        <p className="mt-1.5 flex items-center gap-1 text-sm">
          <Star aria-hidden className="size-4 shrink-0 fill-mami text-mami" />
          <span className="font-bold text-ink-2">{kos.rating}</span>
          <span className="text-mute-2">({kos.reviewCount})</span>
        </p>
      )}

      <p className="mt-1 text-lg font-bold text-ink">
        {formatRupiah(kos.monthlyPrice)}
        <span className="text-sm font-normal">/bulan</span>
      </p>
    </Link>
  );
}
