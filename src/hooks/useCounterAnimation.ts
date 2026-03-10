"use client";

import { useEffect, useRef, useState } from "react";

interface CounterOptions {
  target: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}

export function useCounterAnimation(options: CounterOptions) {
  const ref = useRef<HTMLElement>(null);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasTriggered) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasTriggered]);

  return {
    ref,
    shouldStart: hasTriggered,
    countUpProps: {
      end: options.target,
      duration: options.duration ?? 2,
      decimals: options.decimals ?? 0,
      prefix: options.prefix ?? "",
      suffix: options.suffix ?? "",
      start: 0,
    },
  };
}
