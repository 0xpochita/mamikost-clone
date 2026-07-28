const INDONESIAN_LOCALE = "id-ID";
const MILLION = 1_000_000;

/** Renders a rupiah amount the way Mamikos price labels do: `Rp1.250.000`. */
export function formatRupiah(amount: number): string {
  return `Rp${amount.toLocaleString(INDONESIAN_LOCALE)}`;
}

/** Compact variant for chips and filter labels: `Rp1,5 jt`. */
export function formatRupiahCompact(amount: number): string {
  const millions = amount / MILLION;
  return `Rp${millions.toLocaleString(INDONESIAN_LOCALE)} jt`;
}
