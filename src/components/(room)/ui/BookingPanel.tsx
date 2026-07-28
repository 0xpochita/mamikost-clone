import {
  LuGift,
  LuMessageSquareText,
  LuTicketPercent,
  LuZap,
} from "react-icons/lu";
import type { Kos } from "@/components/(shared)/types/kos";
import { formatRupiah } from "@/components/(shared)/utils/formatCurrency";

const THOUSAND = 1000;
const VOUCHER_CODE = "SECRET6MO";
const VOUCHER_PERIOD = "11 May 2026 - 30 Aug 2026";

function DiscountLine({ kos }: { kos: Kos }) {
  if (!kos.strikePrice) return null;
  const saving = Math.round((kos.strikePrice - kos.monthlyPrice) / THOUSAND);

  return (
    <p className="flex flex-wrap items-center gap-2 text-base font-bold text-sale">
      <LuZap aria-hidden className="size-4 shrink-0" />
      Diskon {saving}rb
      <span className="font-normal text-mute-2 line-through">
        {formatRupiah(kos.strikePrice)}
      </span>
    </p>
  );
}

export function BookingPanel({ kos }: { kos: Kos }) {
  return (
    <aside className="flex flex-col gap-6">
      <div className="rounded-xl bg-white p-6 shadow-card">
        <DiscountLine kos={kos} />
        <p className="mt-1 text-2xl font-black text-ink">
          {formatRupiah(kos.monthlyPrice)}
          <span className="text-base font-normal text-ink-2">
            {" "}
            {kos.strikePrice ? "(Bulan pertama)" : "/bulan"}
          </span>
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <label className="sr-only" htmlFor="booking-start">
            Tanggal mulai kos
          </label>
          <input
            className="rounded-lg border border-line px-3 py-2.5 text-sm text-ink outline-none focus:border-mami"
            id="booking-start"
            placeholder="Mulai kos"
            type="date"
          />
          <label className="sr-only" htmlFor="booking-period">
            Periode sewa
          </label>
          <select
            className="rounded-lg border border-line px-3 py-2.5 text-sm text-ink outline-none focus:border-mami"
            defaultValue="bulan"
            id="booking-period"
          >
            <option value="bulan">Per Bulan</option>
            <option value="3bulan">Per 3 Bulan</option>
            <option value="6bulan">Per 6 Bulan</option>
            <option value="tahun">Per Tahun</option>
          </select>
        </div>

        <button
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-mami py-3 text-base font-bold text-mami transition-colors hover:bg-mami-tint"
          type="button"
        >
          <LuMessageSquareText aria-hidden className="size-5" />
          Tanya Pemilik
        </button>
        <button
          className="mt-3 w-full rounded-lg bg-mami py-3 text-base font-bold text-white transition-colors hover:bg-mami-dark"
          type="button"
        >
          Ajukan Sewa
        </button>
      </div>

      <button
        className="flex items-center gap-3 rounded-xl bg-white p-5 text-left shadow-card"
        type="button"
      >
        <LuTicketPercent aria-hidden className="size-6 shrink-0 text-ink" />
        <span className="flex-1 text-lg font-bold text-ink">
          Voucher Khusus {kos.badges.includes("prime") ? "Prime" : "Mamikos"}
        </span>
        <span aria-hidden className="text-mute">
          &rsaquo;
        </span>
      </button>

      <div className="rounded-xl bg-white p-6 shadow-card">
        <LuGift aria-hidden className="size-6 text-ink" />
        <h2 className="mt-3 text-lg font-bold text-ink">
          Secret Rare Voucher Found!
        </h2>
        <p className="mt-2 text-base leading-6 text-ink-2">
          Gunakan kode {VOUCHER_CODE} untuk dapatkan diskon 13% (maks 1,2jt).
          Khusus transaksi 6 bulan.
        </p>
        <p className="mt-3 text-sm text-mute-2">{VOUCHER_PERIOD}</p>
        <p className="mt-3 text-sm font-bold text-ink">Lihat selengkapnya</p>
      </div>
    </aside>
  );
}
