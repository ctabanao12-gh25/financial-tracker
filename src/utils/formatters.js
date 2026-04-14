export function formatCurrency(amount) {
  if (!Number.isFinite(amount)) return "$0.00";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(isoString) {
  if (!isoString || !/^\d{4}-\d{2}-\d{2}$/.test(isoString)) return "Invalid date";
  const [year, month, day] = isoString.split("-").map(Number);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}
