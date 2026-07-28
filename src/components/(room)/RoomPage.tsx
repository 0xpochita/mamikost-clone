import Link from "next/link";
import { LuUserRound } from "react-icons/lu";
import {
  OwnerStory,
  PublicFacilities,
  RentalTerms,
  RoomFacilities,
  RoomLocation,
  RoomRules,
  RoomSpecification,
} from "@/components/(room)/sections/RoomDetails";
import { RoomGallery } from "@/components/(room)/sections/RoomGallery";
import {
  Breadcrumb,
  RoomHeader,
} from "@/components/(room)/sections/RoomHeader";
import {
  RoomOwner,
  RoomReviews,
} from "@/components/(room)/sections/RoomReviews";
import { BookingPanel } from "@/components/(room)/ui/BookingPanel";
import { buildKosDetail } from "@/components/(shared)/data/kosDetailBuilder";
import { findRelatedKos } from "@/components/(shared)/data/kosRepository";
import type { Kos } from "@/components/(shared)/types/kos";
import { KosCard } from "@/components/(shared)/ui/KosCard";

const SECTION_TABS = [
  { label: "Foto Properti", href: "#foto-properti" },
  { label: "Fasilitas Kamar", href: "#fasilitas-kamar" },
  { label: "Fasilitas Umum", href: "#fasilitas-umum" },
  { label: "Lokasi", href: "#lokasi" },
  { label: "Review", href: "#review" },
  { label: "Pemilik Kos", href: "#pemilik-kos" },
];

function SectionTabs() {
  return (
    <nav
      aria-label="Bagian halaman"
      className="sticky top-16 z-40 border-b border-line bg-white"
    >
      <ul className="mami-container no-scrollbar flex gap-8 overflow-x-auto">
        {SECTION_TABS.map((tab) => (
          <li key={tab.href}>
            <a
              className="block whitespace-nowrap py-4 text-base font-bold text-ink transition-colors hover:text-mami"
              href={tab.href}
            >
              {tab.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function OwnerSummary({
  name,
  lastOnline,
}: {
  name: string;
  lastOnline: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-t border-line pt-8">
      <div>
        <h2 className="text-xl font-black text-ink">
          Kos dikelola oleh {name}
        </h2>
        <p className="mt-1 text-base text-ink-2">
          Online <span className="font-bold text-ink">{lastOnline}</span>
        </p>
      </div>
      <span className="flex size-14 items-center justify-center rounded-full bg-mami-tint text-mami">
        <LuUserRound aria-hidden className="size-7" />
      </span>
    </div>
  );
}

function RelatedKos({ kos }: { kos: Kos }) {
  const related = findRelatedKos(kos);
  if (related.length === 0) return null;

  return (
    <section className="mami-container border-t border-line py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-black text-ink">
          Kamu mungkin menyukainya
        </h2>
        <Link
          className="rounded-md border border-line px-5 py-2.5 text-sm font-bold text-ink transition-colors hover:border-mami hover:text-mami"
          href={`/cari?city=${encodeURIComponent(kos.city)}`}
        >
          Lihat semua
        </Link>
      </div>
      <ul className="no-scrollbar mt-6 flex gap-5 overflow-x-auto pb-2">
        {related.map((entry) => (
          <li className="w-[270px] shrink-0 sm:w-[280px]" key={entry.slug}>
            <KosCard kos={entry} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export function RoomPage({ kos }: { kos: Kos }) {
  const detail = buildKosDetail(kos);

  return (
    <>
      <SectionTabs />

      <div className="mami-container pt-6" id="foto-properti">
        <Breadcrumb trail={detail.breadcrumb} />
        <div className="mt-5">
          <RoomGallery kos={kos} />
        </div>
      </div>

      <div className="mami-container grid gap-10 py-10 lg:grid-cols-[1.7fr_1fr] lg:items-start">
        <div className="flex flex-col gap-8">
          <RoomHeader detail={detail} kos={kos} />
          <OwnerSummary
            lastOnline={detail.owner.lastOnline}
            name={detail.owner.name}
          />
          <RoomSpecification detail={detail} />
          <RoomFacilities detail={detail} />
          <RoomRules detail={detail} />
          <OwnerStory detail={detail} />
          <PublicFacilities detail={detail} />
          <RoomLocation kos={kos} />
          <RentalTerms />
          <RoomReviews detail={detail} kos={kos} />
          <RoomOwner detail={detail} />
        </div>

        <div className="lg:sticky lg:top-32">
          <BookingPanel kos={kos} />
        </div>
      </div>

      <RelatedKos kos={kos} />
    </>
  );
}
