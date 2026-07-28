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
      className="mt-6 flex h-[46px] w-full max-w-[415px] items-center gap-2 rounded-lg border border-line bg-white p-0.5 focus-within:border-mami"
    >
      <label className="sr-only" htmlFor="hero-search">
        Cari kos berdasarkan lokasi, area, atau alamat
      </label>
      <Search aria-hidden className="ml-2.5 size-6 shrink-0 text-mute-2" />
      <input
        className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-ink outline-none placeholder:font-semibold placeholder:text-mute-2"
        id="hero-search"
        name={SEARCH_FIELD_NAME}
        placeholder="Masukan nama lokasi/area/alamat"
        type="search"
      />
      <button
        className="h-full shrink-0 rounded-md bg-mami px-7 text-sm font-bold text-white transition-colors hover:bg-mami-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mami-dark"
        type="submit"
      >
        Cari
      </button>
    </form>
  );
}

/** The skyline is decorative, so it carries no alt text and is not preloaded:
 * the LCP element here is the heading.
 *
 * The supplied artwork strokes at `#bfbfc1` while the reference renders it near
 * `#e7e8ec`. Over white that is an alpha of roughly 0.4, so the fade is applied
 * in CSS rather than by re-exporting the asset.
 *
 * The section clips its own overflow so the artwork can never spill onto the
 * next section, which is exactly what a negative offset caused once already. */
export function HeroSection() {
  return (
    <section className="overflow-hidden bg-white">
      <div className="mami-container relative py-12 lg:pb-16 lg:pt-20">
        <div className="relative z-10 max-w-xl">
          <h1 className="text-3xl font-black leading-tight text-ink-3 lg:text-hero">
            Mau cari kos?
          </h1>
          <p className="mt-1 text-base text-ink-3 lg:text-lead">
            Dapatkan infonya dan langsung sewa di Mamikos.
          </p>
          <HeroSearchField />
        </div>

        <Image
          alt=""
          aria-hidden
          className="pointer-events-none absolute bottom-0 right-4 hidden w-[54%] max-w-[630px] object-contain object-bottom opacity-40 lg:block"
          height={ILLUSTRATION_HEIGHT}
          sizes="(max-width: 1023px) 0px, 630px"
          src={`${ASSET_PATHS.hero}/hero-img.webp`}
          width={ILLUSTRATION_WIDTH}
        />
      </div>
    </section>
  );
}
