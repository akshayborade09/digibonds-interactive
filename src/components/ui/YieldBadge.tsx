import { cn } from "@/lib/utils";

interface YieldBadgeProps {
  rating: string;
  className?: string;
}

const ratingColorMap: Record<string, string> = {
  AAA: "bg-teal-400/10 text-teal-400 border-teal-400/20",
  "AA+": "bg-blue-400/10 text-blue-400 border-blue-400/20",
  AA: "bg-blue-400/10 text-blue-400 border-blue-400/20",
  "A+": "bg-amber-400/10 text-amber-500 border-amber-400/20",
  A: "bg-amber-400/10 text-amber-500 border-amber-400/20",
};

export function YieldBadge({ rating, className }: YieldBadgeProps) {
  const colors = ratingColorMap[rating] ?? "bg-gray-400/10 text-gray-400 border-gray-400/20";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
        colors,
        className
      )}
    >
      {rating}
    </span>
  );
}
