import { LuCalendarCheck, LuFlag, LuStar, LuUserRound } from "react-icons/lu";
import { StarRating } from "@/components/(room)/ui/StarRating";
import type { Kos } from "@/components/(shared)/types/kos";
import type { KosDetail } from "@/components/(shared)/types/kosDetail";

const SECTION_CLASS = "border-t border-line pt-8";

export function RoomReviews({ kos, detail }: { kos: Kos; detail: KosDetail }) {
  return (
    <section className={SECTION_CLASS} id="review">
      <h2 className="flex items-center gap-2 text-2xl font-black text-ink">
        <LuStar aria-hidden className="size-6 fill-mami text-mami" />
        {kos.rating} ({kos.reviewCount} review)
      </h2>

      <dl className="mt-6 grid gap-x-10 gap-y-4 sm:grid-cols-2">
        {detail.ratingBreakdown.map((entry) => (
          <div
            className="flex items-center justify-between gap-4"
            key={entry.label}
          >
            <dt className="text-base text-ink">{entry.label}</dt>
            <dd className="flex items-center gap-3">
              <StarRating score={entry.score} />
              <span className="w-8 text-right text-base text-ink">
                {entry.score.toFixed(1)}
              </span>
            </dd>
          </div>
        ))}
      </dl>

      <ul className="mt-8 flex flex-col gap-8">
        {detail.reviews.map((review) => (
          <li key={`${review.author}-${review.timeAgo}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-full bg-surface text-ink-2">
                  <LuUserRound aria-hidden className="size-5" />
                </span>
                <span>
                  <span className="block text-base font-bold text-ink">
                    {review.author}
                  </span>
                  <span className="block text-sm text-mute">
                    {review.timeAgo}
                  </span>
                </span>
              </div>
              <span className="flex items-center gap-1 rounded-lg border border-line px-3 py-1 text-sm font-bold text-ink">
                <LuStar aria-hidden className="size-3.5 fill-ink text-ink" />
                {review.rating.toFixed(1)}
              </span>
            </div>

            <p className="mt-3 text-base leading-7 text-ink-2">{review.body}</p>

            <div className="mt-4 border-l-2 border-line pl-4">
              <p className="text-base font-bold text-ink">
                Balasan dari Pemilik kos
              </p>
              <p className="text-sm text-mute">{review.timeAgo}</p>
              <p className="mt-2 text-base leading-7 text-ink-2">
                {review.ownerReply}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function RoomOwner({ detail }: { detail: KosDetail }) {
  return (
    <section className={SECTION_CLASS} id="pemilik-kos">
      <div className="flex items-center gap-4">
        <span className="flex size-14 items-center justify-center rounded-full bg-mami-tint text-mami">
          <LuUserRound aria-hidden className="size-7" />
        </span>
        <div>
          <h2 className="text-2xl font-black text-ink">{detail.owner.name}</h2>
          <p className="text-base text-ink-2">
            Pemilik Kos · Aktif sejak {detail.owner.activeSince}
          </p>
        </div>
      </div>

      <p className="mt-5 flex items-center gap-3 text-base text-ink">
        <LuCalendarCheck aria-hidden className="size-5 text-mami" />
        {detail.owner.transactionCount.toLocaleString("id-ID")} transaksi
        berhasil
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-line px-6 py-5">
        <p className="text-base text-mute">
          Ada data yang kurang tepat atau kendala lain dengan Kos?
        </p>
        <button
          className="flex items-center gap-2 text-base font-bold text-ink underline underline-offset-4 hover:text-mami"
          type="button"
        >
          <LuFlag aria-hidden className="size-4" />
          Laporkan
        </button>
      </div>
    </section>
  );
}
