import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function SeeAllTile({
  href,
  className = "",
}: {
  href: string;
  className?: string;
}) {
  return (
    <Link
      className={`flex items-center justify-center gap-2 rounded-card border border-line bg-white text-base font-bold text-ink transition-colors hover:border-mami hover:text-mami ${className}`}
      href={href}
    >
      Lihat semua
      <ArrowRight aria-hidden className="size-4" />
    </Link>
  );
}
