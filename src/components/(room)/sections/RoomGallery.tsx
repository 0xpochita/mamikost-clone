import Image from "next/image";
import type { Kos } from "@/components/(shared)/types/kos";

const GALLERY_WIDTH = 800;
const GALLERY_HEIGHT = 534;
const SIDE_PHOTO_COUNT = 2;

export function RoomGallery({ kos }: { kos: Kos }) {
  const [cover, ...rest] = kos.gallery;
  const sidePhotos = [...rest, cover].slice(0, SIDE_PHOTO_COUNT);

  return (
    <div className="grid gap-3 lg:grid-cols-[2fr_1fr]">
      <div className="relative aspect-3/2 overflow-hidden rounded-xl">
        <Image
          alt={`Kamar utama ${kos.name}`}
          className="size-full object-cover"
          height={GALLERY_HEIGHT}
          loading="eager"
          sizes="(max-width: 1023px) 100vw, 60vw"
          src={cover}
          width={GALLERY_WIDTH}
        />
      </div>

      <div className="grid gap-3">
        {sidePhotos.map((photo, index) => (
          <div
            className="relative aspect-3/2 overflow-hidden rounded-xl"
            key={`${photo}-${index + 1}`}
          >
            <Image
              alt={`Foto ${kos.name} nomor ${index + 2}`}
              className="size-full object-cover"
              height={GALLERY_HEIGHT}
              sizes="(max-width: 1023px) 100vw, 30vw"
              src={photo}
              width={GALLERY_WIDTH}
            />
            {index === sidePhotos.length - 1 ? (
              <button
                className="absolute bottom-4 right-4 rounded-lg bg-white px-4 py-2.5 text-sm font-bold text-ink shadow-card"
                type="button"
              >
                Lihat semua foto
              </button>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
