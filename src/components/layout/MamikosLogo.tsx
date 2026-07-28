import Image from "next/image";
import { ASSET_PATHS } from "@/config/assets";

const LOGO_SRC = `${ASSET_PATHS.brand}/mamikos-logo.svg`;
const LOGO_INTRINSIC_WIDTH = 136;
const LOGO_INTRINSIC_HEIGHT = 32;

type MamikosLogoProps = {
  className?: string;
  isEager?: boolean;
};

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
