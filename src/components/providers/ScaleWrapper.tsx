"use client";

import { useViewportScale } from "@/hooks/useViewportScale";

/**
 * Applies viewport-based zoom scaling to the entire page.
 * No wrapper div needed — zoom is applied directly to <html>.
 */
export function ScaleWrapper({ children }: { children: React.ReactNode }) {
  useViewportScale();
  return <>{children}</>;
}
