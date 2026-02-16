export function formatNaira(amount: number) {
  const safe = Number.isFinite(amount) ? amount : 0;
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(safe);
}

export function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}
