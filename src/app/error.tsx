"use client";

import { RotateCcw, TriangleAlert } from "lucide-react";

type ErrorPageProps = {
  reset: () => void;
};

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <div className="mami-container flex flex-col items-center py-24 text-center">
      <div className="rounded-full bg-mami-tint p-4 text-sale">
        <TriangleAlert aria-hidden className="size-8" />
      </div>
      <h1 className="mt-6 text-2xl font-black text-ink-3">
        Ada yang tidak beres
      </h1>
      <p className="mt-2 max-w-md text-sm leading-6 text-mute">
        Halaman ini gagal dimuat. Coba muat ulang, dan kalau masih bermasalah
        kembali lagi beberapa saat lagi.
      </p>
      <button
        className="mt-6 flex items-center gap-2 rounded-full bg-mami px-5 py-2.5 text-sm font-bold text-white hover:bg-mami-dark"
        onClick={reset}
        type="button"
      >
        <RotateCcw aria-hidden className="size-4" />
        Coba lagi
      </button>
    </div>
  );
}
