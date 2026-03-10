import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin);

export { gsap, ScrollTrigger, ScrollToPlugin, TextPlugin };

/* ─── Reusable animation presets ─── */

export const animationPresets = {
  fadeUpStagger: {
    y: 40,
    opacity: 0,
    stagger: 0.15,
    duration: 0.7,
    ease: "power3.out",
  },
  fadeIn: {
    opacity: 0,
    duration: 0.5,
    ease: "power2.out",
  },
  slideInLeft: {
    x: -60,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
  },
  slideInRight: {
    x: 60,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
  },
  scaleUp: {
    scale: 0.92,
    opacity: 0,
    duration: 0.6,
    ease: "back.out(1.7)",
  },
} as const;
