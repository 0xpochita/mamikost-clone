const INDONESIAN_LOCALE = "id-ID";
const MILLION = 1_000_000;

export function formatRupiah(amount: number): string {
  return `Rp${amount.toLocaleString(INDONESIAN_LOCALE)}`;
}

export function formatRupiahCompact(amount: number): string {
  const millions = amount / MILLION;
  return `Rp${millions.toLocaleString(INDONESIAN_LOCALE)} jt`;
}
