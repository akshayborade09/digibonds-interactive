import { cn } from "@/lib/utils";

export function LegalBanner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "border-t border-[--border] bg-[--bg-secondary] px-4 py-4 text-center text-xs text-[--text-muted]",
        className
      )}
    >
      <p>
        DigiBonds is a SEBI Registered Online Bond Platform Provider (OBPP). All
        bonds listed on the platform are exchange-listed debt securities
        available for trading on NSE and BSE. Investments in bonds are subject to
        market risks. Please read all offer documents carefully before investing.
      </p>
    </div>
  );
}
