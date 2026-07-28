import Link from "next/link";
import {
  LuDoorOpen,
  LuHeart,
  LuMapPin,
  LuRepeat2,
  LuShare2,
  LuStar,
} from "react-icons/lu";
import type { Kos } from "@/components/(shared)/types/kos";
import type { KosDetail } from "@/components/(shared)/types/kosDetail";

const ACTION_CLASS =
  "flex items-center gap-2 rounded-lg border border-line px-5 py-2.5 text-sm font-bold text-ink transition-colors hover:border-mami hover:text-mami";

function Breadcrumb({ trail }: { trail: string[] }) {
  return (
    <nav aria-label="Remah roti" className="text-sm text-ink-2">
      <ol className="flex flex-wrap items-center gap-2">
        {trail.map((crumb, index) => (
          <li className="flex items-center gap-2" key={crumb}>
            {index > 0 ? (
              <span aria-hidden className="text-mute-2">
                &rsaquo;
              </span>
            ) : null}
            {index === trail.length - 1 ? (
              <span className="font-bold text-ink">{crumb}</span>
            ) : (
              <Link className="hover:text-mami" href="/cari">
                {crumb}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function RoomHeader({ kos, detail }: { kos: Kos; detail: KosDetail }) {
  return (
    <header>
      <h1 className="text-3xl font-black leading-tight text-ink">{kos.name}</h1>

      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-base text-ink-2">
        <span className="rounded-md border border-line px-3 py-1 font-bold text-ink">
          Kos {kos.type}
        </span>
        <span aria-hidden>·</span>
        <span className="flex items-center gap-1.5">
          <LuMapPin aria-hidden className="size-4" />
          {kos.area}
        </span>
        <span aria-hidden>·</span>
        <span className="flex items-center gap-1.5">
          <LuStar aria-hidden className="size-4 fill-mami text-mami" />
          <span className="font-bold text-ink">{kos.rating}</span>
          <span className="text-mute-2">({kos.reviewCount})</span>
        </span>
        <span aria-hidden>·</span>
        <span className="flex items-center gap-1.5">
          <LuRepeat2 aria-hidden className="size-4" />
          {detail.transactionCount} transaksi berhasil di kos ini
        </span>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <p className="flex items-center gap-2 text-base text-ink-2">
          <LuDoorOpen aria-hidden className="size-5" />
          Tersisa{" "}
          <span className="font-bold text-sale">{kos.vacancy} kamar</span>
        </p>
        <div className="flex gap-3">
          <button className={ACTION_CLASS} type="button">
            <LuHeart aria-hidden className="size-4" />
            Simpan
          </button>
          <button className={ACTION_CLASS} type="button">
            <LuShare2 aria-hidden className="size-4" />
            Bagikan
          </button>
        </div>
      </div>
    </header>
  );
}

export { Breadcrumb };
