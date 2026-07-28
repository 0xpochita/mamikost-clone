import { Search } from "lucide-react";

const SEARCH_FIELD_NAME = "keyword";

export function HeroSection() {
  return (
    <section className="bg-linear-to-b from-mami-tint to-white">
      <div className="mami-container flex flex-col items-center py-10 text-center md:items-start md:py-[60px] md:text-left">
        <h1 className="max-w-xl text-2xl font-black text-ink-3 md:text-hero">
          Cari kos jadi lebih mudah
        </h1>
        <p className="mt-2 max-w-xl text-base text-ink-3 md:text-lead">
          Temukan ribuan kamar kos di seluruh Indonesia. Cek harga, foto, dan
          fasilitas lengkapnya sebelum survei.
        </p>

        <form
          action="/cari"
          className="mt-6 flex w-full max-w-[400px] items-center gap-2 rounded-full border border-line bg-white p-1.5 shadow-sm focus-within:border-mami"
        >
          <label className="sr-only" htmlFor="hero-search">
            Cari kos, area, atau kampus
          </label>
          <Search aria-hidden className="ml-2 size-5 shrink-0 text-mute-2" />
          <input
            className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-mute-2"
            id="hero-search"
            name={SEARCH_FIELD_NAME}
            placeholder="Masukkan nama lokasi/area/alamat"
            type="search"
          />
          <button
            className="shrink-0 rounded-full bg-mami px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-mami-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mami-dark"
            type="submit"
          >
            Cari
          </button>
        </form>
      </div>
    </section>
  );
}
