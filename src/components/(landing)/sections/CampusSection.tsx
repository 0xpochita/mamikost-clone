import Image from "next/image";
import Link from "next/link";
import { POPULAR_CAMPUSES } from "@/components/(landing)/data/kosFilters";
import { SeeAllTile } from "@/components/(landing)/ui/SeeAllTile";

const LOGO_BOX = 56;

export function CampusSection() {
  return (
    <section className="mami-container py-6">
      <h2 className="text-2xl font-black text-ink-3">Kos Sekitar Kampus</h2>

      <ul className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {POPULAR_CAMPUSES.map((campus) => (
          <li key={campus.abbreviation}>
            <Link
              className="flex h-full items-center gap-4 rounded-card border border-line bg-white px-5 py-4 transition-colors hover:border-mami focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mami"
              href={`/cari?campus=${encodeURIComponent(campus.abbreviation)}`}
            >
              <Image
                alt={`Logo ${campus.abbreviation}`}
                className="size-14 shrink-0 object-contain"
                height={LOGO_BOX}
                src={campus.logo}
                width={LOGO_BOX}
              />
              <span>
                <span className="block text-base font-bold text-ink">
                  {campus.abbreviation}
                </span>
                <span className="block text-base text-ink-2">
                  {campus.city}
                </span>
              </span>
            </Link>
          </li>
        ))}
        <li>
          <SeeAllTile className="h-full min-h-[88px]" href="/cari" />
        </li>
      </ul>
    </section>
  );
}
