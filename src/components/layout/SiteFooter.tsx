import { Mail, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { MamikosLogo } from "@/components/layout/MamikosLogo";
import { ASSET_PATHS } from "@/config/assets";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  FOOTER_COLUMNS,
} from "@/config/navigation";

const STORE_BADGES = [
  {
    alt: "Dapatkan di Google Play",
    src: `${ASSET_PATHS.brand}/icon-playstore.svg`,
    width: 135,
    height: 40,
  },
  {
    alt: "Download di App Store",
    src: `${ASSET_PATHS.brand}/icon-appstore.svg`,
    width: 120,
    height: 40,
  },
];

const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://facebook.com", Icon: FaFacebook },
  { label: "X", href: "https://x.com", Icon: FaXTwitter },
  { label: "Instagram", href: "https://instagram.com", Icon: FaInstagram },
];

function FooterBrand() {
  return (
    <div className="max-w-sm">
      <MamikosLogo className="h-7 w-auto" />
      <p className="mt-5 text-base leading-7 text-ink-2">
        Dapatkan "info kost murah" hanya di MamiKos App. Mau "Sewa Kost Murah"?
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        {STORE_BADGES.map((badge) => (
          <Link href="/download" key={badge.alt}>
            <Image
              alt={badge.alt}
              height={badge.height}
              src={badge.src}
              unoptimized
              width={badge.width}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

function FooterLinkColumn({ title }: { title: string }) {
  const column = FOOTER_COLUMNS.find((entry) => entry.title === title);
  if (!column) return null;

  return (
    <nav aria-label={column.title}>
      <h2 className="text-sm font-bold tracking-wide text-ink">
        {column.title}
      </h2>
      <ul
        className={`mt-6 gap-x-8 gap-y-4 ${
          column.links.length > 3 ? "grid grid-cols-2" : "flex flex-col"
        }`}
      >
        {column.links.map((link) => (
          <li key={link.href}>
            <Link
              className="text-base text-ink-2 hover:text-mami"
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function FooterContact() {
  return (
    <div>
      <h2 className="text-sm font-bold tracking-wide text-ink">HUBUNGI KAMI</h2>
      <ul className="mt-6 flex flex-col gap-4 text-base text-ink-2">
        <li className="flex items-center gap-3">
          <Mail aria-hidden className="size-4 shrink-0 text-mute" />
          {CONTACT_EMAIL}
        </li>
        <li className="flex items-center gap-3">
          <MessageCircle aria-hidden className="size-4 shrink-0 text-mute" />
          {CONTACT_PHONE}
        </li>
      </ul>
      <div className="mt-6 flex gap-5">
        {SOCIAL_LINKS.map(({ label, href, Icon }) => (
          <a
            aria-label={label}
            className="text-ink transition-colors hover:text-mami"
            href={href}
            key={label}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Icon aria-hidden className="size-6" />
          </a>
        ))}
      </div>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mami-container grid gap-10 py-14 lg:grid-cols-[1.4fr_1.6fr_1fr_1fr]">
        <FooterBrand />
        <FooterLinkColumn title="MAMIKOS" />
        <FooterLinkColumn title="KEBIJAKAN" />
        <FooterContact />
      </div>
      <div>
        <div className="mami-container flex flex-col items-center gap-4 border-t border-line pb-24 pt-8 sm:flex-row sm:justify-between">
          <Image
            alt="Sertifikasi ISO SGS"
            height={56}
            src={`${ASSET_PATHS.brand}/icon-iso-certificate-v2.svg`}
            unoptimized
            width={58}
          />
          <p className="text-base text-ink-2">
            © 2026 Mamikos.com. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
