import {
  LuBadgeCheck,
  LuMapPin,
  LuRepeat2,
  LuRuler,
  LuScrollText,
  LuZapOff,
} from "react-icons/lu";
import {
  FacilityIcon,
  FacilityList,
} from "@/components/(room)/ui/FacilityList";
import type { Kos } from "@/components/(shared)/types/kos";
import type { KosDetail } from "@/components/(shared)/types/kosDetail";
import { formatRupiah } from "@/components/(shared)/utils/formatCurrency";

const SECTION_CLASS = "border-t border-line pt-8";
const HEADING_CLASS = "text-2xl font-black text-ink";

export function RoomSpecification({ detail }: { detail: KosDetail }) {
  return (
    <section className={SECTION_CLASS} id="fasilitas-kamar">
      <h2 className={HEADING_CLASS}>Spesifikasi tipe kamar</h2>
      <ul className="mt-5 flex flex-col gap-4 text-base text-ink">
        <li className="flex items-center gap-3">
          <LuRuler aria-hidden className="size-5 shrink-0 text-ink-2" />
          {detail.roomDimension}
        </li>
        <li className="flex items-center gap-3">
          {detail.isElectricityIncluded ? (
            <LuBadgeCheck aria-hidden className="size-5 shrink-0 text-ink-2" />
          ) : (
            <LuZapOff aria-hidden className="size-5 shrink-0 text-ink-2" />
          )}
          {detail.isElectricityIncluded
            ? "Termasuk listrik"
            : "Tidak termasuk listrik"}
        </li>
      </ul>
    </section>
  );
}

export function RoomFacilities({ detail }: { detail: KosDetail }) {
  return (
    <>
      <section className={SECTION_CLASS}>
        <h2 className={HEADING_CLASS}>Fasilitas kamar</h2>
        <div className="mt-5">
          <FacilityList items={detail.roomFacilities} />
        </div>
      </section>

      <section className={SECTION_CLASS}>
        <h2 className={HEADING_CLASS}>Fasilitas kamar mandi</h2>
        <div className="mt-5">
          <FacilityList items={detail.bathroomFacilities} />
        </div>
      </section>
    </>
  );
}

export function RoomRules({ detail }: { detail: KosDetail }) {
  return (
    <section className={SECTION_CLASS}>
      <h2 className={HEADING_CLASS}>Peraturan khusus tipe kamar ini</h2>
      <ul className="mt-5 flex flex-col gap-5">
        {detail.roomRules.map((rule) => (
          <li className="flex gap-3" key={rule.label}>
            <FacilityIcon name={rule.label} />
            <span>
              <span className="block text-base text-ink">{rule.label}</span>
              {rule.detail ? (
                <span className="block text-sm text-mute">{rule.detail}</span>
              ) : null}
            </span>
          </li>
        ))}
        <li className="flex gap-3">
          <LuRepeat2 aria-hidden className="size-5 shrink-0 text-ink-2" />
          <span className="flex-1">
            <span className="flex items-baseline justify-between gap-4">
              <span className="text-base text-ink">Deposit</span>
              <span className="text-base text-ink">
                {formatRupiah(detail.deposit)}
              </span>
            </span>
            <span className="block text-sm text-mute">
              Dikembalikan di akhir periode sewa jika tidak ditemukan kerusakan
              pada kamar.
            </span>
          </span>
        </li>
      </ul>
    </section>
  );
}

export function OwnerStory({ detail }: { detail: KosDetail }) {
  return (
    <section className={SECTION_CLASS} id="fasilitas-umum">
      <h2 className={HEADING_CLASS}>Cerita pemilik tentang kos ini</h2>
      <div className="mt-5 flex flex-col gap-4 text-base leading-7 text-ink-2">
        {detail.ownerStory.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}

export function PublicFacilities({ detail }: { detail: KosDetail }) {
  return (
    <>
      <section className={SECTION_CLASS}>
        <h2 className={HEADING_CLASS}>Fasilitas umum</h2>
        <div className="mt-5">
          <FacilityList items={detail.publicFacilities} />
        </div>
      </section>

      <section className={SECTION_CLASS}>
        <h2 className={HEADING_CLASS}>Fasilitas parkir</h2>
        <div className="mt-5">
          <FacilityList items={detail.parkingFacilities} />
        </div>
      </section>

      <section className={SECTION_CLASS}>
        <h2 className={HEADING_CLASS}>Peraturan di kos ini</h2>
        <ul className="mt-5 flex flex-col gap-4">
          {detail.houseRules.map((rule) => (
            <li
              className="flex items-center gap-3 text-base text-ink"
              key={rule}
            >
              <FacilityIcon name={rule} />
              {rule}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export function RoomLocation({ kos }: { kos: Kos }) {
  return (
    <section className={SECTION_CLASS} id="lokasi">
      <h2 className={HEADING_CLASS}>Lokasi dan lingkungan sekitar</h2>
      <p className="mt-4 flex items-center gap-2 text-base text-ink-2">
        <LuMapPin aria-hidden className="size-5" />
        {kos.area}, {kos.city}
      </p>
      <div className="mt-5 flex aspect-video items-center justify-center rounded-xl bg-surface">
        <p className="rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-ink shadow-card">
          Peta tidak tersedia di klon ini
        </p>
      </div>
    </section>
  );
}

export function RentalTerms() {
  return (
    <section className={SECTION_CLASS}>
      <h2 className={HEADING_CLASS}>Ketentuan pengajuan sewa</h2>
      <p className="mt-5 text-base font-bold text-ink">
        Bisa bayar DP (uang muka) dulu
      </p>
      <p className="mt-1 text-base text-ink-2">
        Biaya DP adalah 30% dari biaya yang dipilih.
      </p>
      <ul className="mt-6 grid gap-5 sm:grid-cols-2">
        <li className="flex gap-3">
          <LuScrollText aria-hidden className="size-5 shrink-0 text-ink-2" />
          <span>
            <span className="block text-base text-ink">
              Waktu mulai ngekos terdekat:
            </span>
            <span className="block text-sm text-mute">
              Bisa di hari H setelah pengajuan sewa.
            </span>
          </span>
        </li>
        <li className="flex gap-3">
          <LuScrollText aria-hidden className="size-5 shrink-0 text-ink-2" />
          <span>
            <span className="block text-base text-ink">
              Waktu mulai ngekos terjauh:
            </span>
            <span className="block text-sm text-mute">
              1 bulan setelah pengajuan sewa.
            </span>
          </span>
        </li>
        <li className="flex gap-3">
          <LuBadgeCheck aria-hidden className="size-5 shrink-0 text-ink-2" />
          <span className="text-base text-ink">
            Calon penyewa wajib sertakan KTP.
          </span>
        </li>
      </ul>
    </section>
  );
}
