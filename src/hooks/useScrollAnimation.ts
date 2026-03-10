"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface ScrollAnimationConfig {
  from: gsap.TweenVars;
  to?: gsap.TweenVars;
  trigger?: ScrollTrigger.Vars;
}

export function useScrollAnimation<T extends HTMLElement>(
  config: ScrollAnimationConfig
) {
  const ref = useRef<T>(null);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tween = gsap.fromTo(el, config.from, {
      ...config.to,
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        once: true,
        ...config.trigger,
      },
      onComplete: () => setAnimationComplete(true),
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll()
        .filter((st) => st.trigger === el)
        .forEach((st) => st.kill());
    };
  }, [config]);

  return { ref, animationComplete };
}
