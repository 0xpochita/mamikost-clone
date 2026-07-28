import Image from "next/image";
import { PromoCard } from "@/components/(landing)/ui/PromoCard";
import { ASSET_PATHS } from "@/config/assets";

const PARTNER_LOGOS = [
  {
    alt: "Singgahsini",
    src: `${ASSET_PATHS.brand}/logo-singgahsini.svg`,
    width: 94,
    height: 32,
    className: "h-8 w-auto",
  },
  {
    alt: "Apik",
    src: `${ASSET_PATHS.brand}/logo-apik.svg`,
    width: 90,
    height: 48,
    className: "h-10 w-auto",
  },
];

function OwnerCardMedia() {
  return (
    <>
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-1/2 text-mami-light md:block"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 400 200"
      >
        <title>Dekorasi</title>
        <path
          d="M0 150 C 90 150, 120 30, 220 30 S 330 120, 400 120"
          stroke="currentColor"
          strokeOpacity="0.5"
        />
        <path
          d="M40 200 C 130 200, 150 70, 260 70 S 350 10, 400 10"
          stroke="currentColor"
          strokeOpacity="0.35"
        />
      </svg>
      <div className="absolute inset-y-0 right-0 hidden w-[27%] md:block">
        <Image
          alt=""
          aria-hidden
          className="h-full w-full rounded-l-[100px] object-cover"
          height={800}
          sizes="27vw"
          src={`${ASSET_PATHS.hero}/images-card.webp`}
          width={800}
        />
      </div>
    </>
  );
}

function SurveyCardMedia() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute bottom-0 right-0 h-28 w-64"
      style={{
        backgroundImage:
          "radial-gradient(circle, var(--color-mami) 1.5px, transparent 1.5px)",
        backgroundSize: "16px 16px",
        maskImage: "linear-gradient(to bottom right, transparent, black)",
        WebkitMaskImage: "linear-gradient(to bottom right, transparent, black)",
      }}
    />
  );
}

function PartnerLogos() {
  return (
    <div className="absolute inset-y-0 right-8 hidden items-center gap-10 md:flex">
      {PARTNER_LOGOS.map((logo) => (
        <Image
          alt={logo.alt}
          className={logo.className}
          height={logo.height}
          key={logo.alt}
          src={logo.src}
          unoptimized
          width={logo.width}
        />
      ))}
    </div>
  );
}

export function ServiceHighlights() {
  return (
    <section aria-label="Layanan Mamikos" className="mami-container py-6">
      <div className="flex flex-col gap-6">
        <PromoCard
          action={{
            label: "Pelajari Lebih Lanjut",
            href: "/pemilik/daftar",
            variant: "outline",
          }}
          description="Berbagai fitur dan layanan untuk meningkatkan bisnis kos Anda"
          media={<OwnerCardMedia />}
          title="Daftarkan Kos Anda di Mamikos"
        />

        <PromoCard
          action={{
            label: "Baca selengkapnya",
            href: "/info/survei-kos",
            variant: "link",
          }}
          className="lg:w-8/12"
          description="Untungnya ada fitur Survei Kos di Mamikos. Cari, pilih, survei, hingga sewa kos idaman dijamin aman dan GRATIS."
          media={<SurveyCardMedia />}
          title="Survei Kos Idaman Kamu Sekarang!"
        />

        <PromoCard
          description="Disurvey langsung oleh Mamikos. Lokasi terverifikasi, bangunan kos lolos seleksi."
          media={<PartnerLogos />}
          title="Kos Dikelola Mamikos, Terjamin Nyaman"
        />
      </div>
    </section>
  );
}
