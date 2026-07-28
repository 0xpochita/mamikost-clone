const IMAGE_ROOT = "/img";

/** Public asset folders. A path under `public/` is only ever a string, so the
 * type checker cannot notice when a folder is renamed. Routing every reference
 * through here turns such a move into one edit instead of many. */
export const ASSET_PATHS = {
  brand: `${IMAGE_ROOT}/logo-brands`,
  hero: `${IMAGE_ROOT}/img-hero`,
  banner: `${IMAGE_ROOT}/img-banner`,
  kos: `${IMAGE_ROOT}/img-kost`,
  city: `${IMAGE_ROOT}/img-kota`,
  campus: `${IMAGE_ROOT}/img-kampus`,
} as const;
