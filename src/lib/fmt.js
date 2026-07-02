// Locale-independent formatters — prevents SSR hydration mismatch from Node.js locale differences

const MONTHS_ES = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];

export function fmtDate(val) {
  if (!val) return "";
  const d = new Date(val);
  if (isNaN(d.getTime())) return "";
  const day   = String(d.getUTCDate()).padStart(2, "0");
  const month = String(d.getUTCMonth() + 1).padStart(2, "0");
  return `${day}/${month}/${d.getUTCFullYear()}`;
}

export function fmtDateLong(val) {
  if (!val) return "";
  const d = new Date(val);
  if (isNaN(d.getTime())) return "";
  return `${MONTHS_ES[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

export function fmtPrice(num) {
  if (num == null || isNaN(Number(num))) return "—";
  const n = Number(num);
  const abs = n.toFixed(n % 1 === 0 ? 0 : 2);
  const [int, dec] = abs.split(".");
  const intFmt = int.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `$${intFmt}${dec !== undefined ? "." + dec : ""}`;
}
