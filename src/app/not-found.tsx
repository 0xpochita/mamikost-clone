import { Link as LinkIcon } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mami-container flex flex-col items-center py-24 text-center">
      <div className="rounded-full bg-mami-tint p-4 text-mami">
        <LinkIcon aria-hidden className="size-8" />
      </div>
      <h1 className="mt-6 text-2xl font-black text-ink-3">
        Halaman tidak ditemukan
      </h1>
      <p className="mt-2 max-w-md text-sm leading-6 text-mute">
        Kos yang kamu cari mungkin sudah tidak tersedia atau tautannya salah.
        Coba cari kos lain lewat pencarian.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link
          className="rounded-full bg-mami px-5 py-2.5 text-sm font-bold text-white hover:bg-mami-dark"
          href="/cari"
        >
          Cari kos
        </Link>
        <Link
          className="rounded-full border border-line px-5 py-2.5 text-sm font-bold text-ink hover:border-mami hover:text-mami"
          href="/"
        >
          Kembali ke beranda
        </Link>
      </div>
    </div>
  );
}
