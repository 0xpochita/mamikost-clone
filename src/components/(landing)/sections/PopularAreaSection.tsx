import Image from "next/image";
import Link from "next/link";
import { SeeAllTile } from "@/components/(landing)/ui/SeeAllTile";
import { POPULAR_AREAS } from "@/components/(shared)/data/kosFilters";

const TILE_SIZES = "(max-width: 639px) 45vw, (max-width: 1023px) 30vw, 280px";

export function PopularAreaSection() {
  return (
    <section className="mami-container py-6">
      <h2 className="text-2xl font-black text-ink-3">Area Kos Terpopuler</h2>

      <ul className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {POPULAR_AREAS.map((area) => (
          <li key={area.city}>
            <Link
              className="relative block aspect-4/3 overflow-hidden rounded-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mami"
              href={`/cari?city=${encodeURIComponent(area.city)}`}
            >
              <Image
                alt=""
                aria-hidden
                className="size-full object-cover"
                height={600}
                sizes={TILE_SIZES}
                src={area.photo}
                width={800}
              />
              <span className="absolute inset-0 bg-black/35" />
              <span className="absolute inset-0 flex items-center justify-center px-3 text-center text-3xl font-bold text-white">
                {area.label}
              </span>
            </Link>
          </li>
        ))}
        <li>
          <SeeAllTile className="aspect-4/3" href="/cari" />
        </li>
      </ul>
    </section>
  );
}
