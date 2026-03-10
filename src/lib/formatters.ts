const inrFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export function formatINR(value: number): string {
  return inrFormatter.format(value);
}

export function formatCrore(value: number): string {
  const crores = value / 1_00_00_000;
  const rounded = Math.floor(crores);
  return `₹${rounded} Cr+`;
}

export function formatLakh(value: number): string {
  const lakhs = value / 1_00_000;
  return `₹${lakhs.toFixed(2)} L`;
}

export function formatYield(value: number): string {
  return `${value.toFixed(1)}%`;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
