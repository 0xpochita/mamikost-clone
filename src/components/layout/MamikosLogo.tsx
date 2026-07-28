import Image from "next/image";
import { ASSET_PATHS } from "@/config/assets";

const LOGO_SRC = `${ASSET_PATHS.brand}/mamikos-logo.svg`;
const LOGO_INTRINSIC_WIDTH = 136;
const LOGO_INTRINSIC_HEIGHT = 32;

type MamikosLogoProps = {
  className?: string;
  isEager?: boolean;
};

/** Renders the supplied brand mark.
 *
 * Vector art needs no raster pipeline, so it is passed through `unoptimized`
 * rather than opting the whole app into SVG handling in the image optimizer.
 *
 * Next.js 16 deprecated `priority` in favour of `preload`, and its own docs
 * recommend `loading="eager"` or `fetchPriority` over `preload` in most cases,
 * which is what an above-the-fold mark needs. */
export function MamikosLogo({
  className = "h-5 w-auto lg:h-[30px]",
  isEager = false,
}: MamikosLogoProps) {
  return (
    <Image
      alt="Mamikos"
      className={className}
      height={LOGO_INTRINSIC_HEIGHT}
      loading={isEager ? "eager" : "lazy"}
      src={LOGO_SRC}
      unoptimized
      width={LOGO_INTRINSIC_WIDTH}
    />
  );
}
