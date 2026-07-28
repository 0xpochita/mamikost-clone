import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RoomPage } from "@/components/(room)";
import {
  findKosBySlug,
  listKosSlugs,
} from "@/components/(shared)/data/kosRepository";
import { formatRupiah } from "@/components/(shared)/utils/formatCurrency";

export function generateStaticParams() {
  return listKosSlugs().map((slug) => ({ slug }));
}

type RoomRouteProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  props: RoomRouteProps,
): Promise<Metadata> {
  const { slug } = await props.params;
  const kos = findKosBySlug(slug);

  if (!kos) return { title: "Kos tidak ditemukan | Mamikos" };

  return {
    title: `${kos.name} | Mamikos`,
    description: `Sewa ${kos.name} di ${kos.area}, ${kos.city}. Mulai ${formatRupiah(kos.monthlyPrice)} per bulan dengan fasilitas ${kos.facilities.slice(0, 3).join(", ")}.`,
    openGraph: {
      title: kos.name,
      description: `${kos.type} di ${kos.area}, ${kos.city}`,
      images: [kos.coverPhoto],
    },
  };
}

export default async function Page(props: RoomRouteProps) {
  const { slug } = await props.params;
  const kos = findKosBySlug(slug);

  if (!kos) notFound();

  return <RoomPage kos={kos} />;
}
