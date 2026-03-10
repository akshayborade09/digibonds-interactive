import Lenis from "lenis";
import { gsap } from "gsap";

let lenisInstance: Lenis | null = null;

export function initLenis(): Lenis {
  if (lenisInstance) return lenisInstance;

  const lenis = new Lenis({
    lerp: 0.12,
    wheelMultiplier: 1.2,
    touchMultiplier: 2,
    autoRaf: false,
  });

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  lenisInstance = lenis;
  return lenis;
}

export function destroyLenis(): void {
  if (!lenisInstance) return;
  lenisInstance.destroy();
  lenisInstance = null;
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}
