"use client";

import { useRef, useState, useEffect } from "react";
import CountUp from "react-countup";
import { cn } from "@/lib/utils";

interface CounterStatProps {
  end: number;
  prefix?: string;
  suffix?: string;
  label: string;
  decimals?: number;
  duration?: number;
  className?: string;
}

export function CounterStat({
  end,
  prefix = "",
  suffix = "",
  label,
  decimals = 0,
  duration = 2.5,
  className,
}: CounterStatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldStart, setShouldStart] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldStart(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn("text-center", className)}>
      <p className="text-4xl font-extrabold text-[--text-primary] md:text-5xl">
        {shouldStart ? (
          <CountUp
            start={0}
            end={end}
            prefix={prefix}
            suffix={suffix}
            decimals={decimals}
            duration={duration}
            separator=","
          />
        ) : (
          <span>{prefix}0{suffix}</span>
        )}
      </p>
      <p className="mt-2 text-sm text-[--text-muted]">{label}</p>
    </div>
  );
}
