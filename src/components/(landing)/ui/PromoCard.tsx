import Link from "next/link";
import type {
  PromoCardAction,
  PromoCardProps,
} from "@/components/(landing)/types/promo";

const ACTION_CLASS: Record<PromoCardAction["variant"], string> = {
  outline:
    "mt-5 inline-flex rounded-md border border-mami px-5 py-2.5 text-sm font-bold text-mami transition-colors hover:bg-mami-tint",
  link: "mt-5 inline-flex text-sm font-bold text-ink underline underline-offset-4 hover:text-mami",
};

export function PromoCard({
  title,
  description,
  action,
  media,
  className = "",
}: PromoCardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-white shadow-card ${className}`}
    >
      {media}
      <div className="relative z-10 max-w-[62%] px-7 py-7">
        <h2 className="text-2xl font-black text-ink-3">{title}</h2>
        <p className="mt-2 text-base leading-6 text-ink-2">{description}</p>
        {action ? (
          <Link className={ACTION_CLASS[action.variant]} href={action.href}>
            {action.label}
          </Link>
        ) : null}
      </div>
    </div>
  );
}
