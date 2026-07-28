import { Search } from "lucide-react";
import Image from "next/image";
import { ASSET_PATHS } from "@/config/assets";

const SEARCH_FIELD_NAME = "keyword";
const ILLUSTRATION_WIDTH = 1200;
const ILLUSTRATION_HEIGHT = 609;

function HeroSearchField() {
  return (
    <form
      action="/cari"
      className="mt-8 flex w-full max-w-[470px] items-center gap-2 rounded-lg border border-line bg-white p-2 shadow-sm focus-within:border-mami"
    >
      <label className="sr-only" htmlFor="hero-search">
        Cari kos berdasarkan lokasi, area, atau alamat
      </label>
      <Search aria-hidden className="ml-2 size-5 shrink-0 text-mute-2" />
      <input
        className="min-w-0 flex-1 bg-transparent text-base text-ink outline-none placeholder:text-mute-2"
        id="hero-search"
        name={SEARCH_FIELD_NAME}
        placeholder="Masukan nama lokasi/area/alamat"
        type="search"
      />
      <button
        className="shrink-0 rounded-md bg-mami px-7 py-2.5 text-base font-bold text-white transition-colors hover:bg-mami-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mami-dark"
        type="submit"
      >
        Cari
      </button>
    </form>
  );
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mami-container relative py-12 lg:py-20">
        <div className="relative z-10 max-w-xl">
          <h1 className="text-3xl font-black text-ink-3 lg:text-hero">
            Mau cari kos?
          </h1>
          <p className="mt-2 text-base text-ink-3 lg:text-lead">
            Dapatkan infonya dan langsung sewa di Mamikos.
          </p>
          <HeroSearchField />
        </div>
      </div>

      <Image
        alt=""
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 hidden h-full w-auto max-w-[52%] object-contain object-right-bottom lg:block"
        height={ILLUSTRATION_HEIGHT}
        sizes="(max-width: 1023px) 0px, 52vw"
        src={`${ASSET_PATHS.hero}/hero-img.webp`}
        width={ILLUSTRATION_WIDTH}
      />
    </section>
  );
}
