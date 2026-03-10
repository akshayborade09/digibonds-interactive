"use client";

import { useEffect } from "react";

const DESIGN_WIDTH = 1920;
const MIN_WIDTH = 1080;

/**
 * Applies CSS zoom to <html> so the entire page (including fixed navbars)
 * renders at 1920px effective width, then shrinks to fit the viewport.
 *
 * - ≥ 1920px  → zoom: 1  (no scaling, site renders naturally)
 * - 1080–1919 → zoom: vw / 1920  (proportional scale-down)
 * - < 1080    → zoom: 1080 / 1920  (locked at minimum)
 */
export function useViewportScale() {
  useEffect(() => {
    function getActualWidth() {
      // window.innerWidth returns CSS-pixel width, which is affected by
      // the current zoom. Multiply by current zoom to get real device pixels.
      const currentZoom =
        parseFloat(document.documentElement.style.zoom) || 1;
      return window.innerWidth * currentZoom;
    }

    function update() {
      const vw = getActualWidth();

      if (vw >= DESIGN_WIDTH) {
        document.documentElement.style.zoom = "1";
      } else if (vw >= MIN_WIDTH) {
        document.documentElement.style.zoom = `${vw / DESIGN_WIDTH}`;
      } else {
        document.documentElement.style.zoom = `${MIN_WIDTH / DESIGN_WIDTH}`;
      }
    }

    update();
    window.addEventListener("resize", update);
    return () => {
      document.documentElement.style.zoom = "1";
      window.removeEventListener("resize", update);
    };
  }, []);
}
