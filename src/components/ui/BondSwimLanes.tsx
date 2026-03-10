"use client";

import { useEffect, useRef, forwardRef, useCallback, useImperativeHandle } from "react";
import { gsap } from "@/lib/gsap";
import { BondCard } from "@/components/ui/BondCard";

const BONDS = [
  {
    issuer: "National Highways Infra Trust",
    category: "NBFC – Auto Finance",
    yieldPercent: 8.5,
    rating: "AAA",
    minInvestment: "~ ₹ 10,000/-",
    tenure: "11 M to 29 M",
    payout: "Quarterly",
    soldPercent: 88,
    progressColor: "#EF4444",
  },
  {
    issuer: "Shriram Transport NCD",
    category: "NBFC – Transport Finance",
    yieldPercent: 11.5,
    rating: "AA+",
    minInvestment: "~ ₹ 10,000/-",
    tenure: "11 M to 29 M",
    payout: "Quarterly",
    soldPercent: 58,
    progressColor: "#2976E9",
  },
  {
    issuer: "Axis Bank NCD",
    category: "Private Bank – Corporate Finance",
    yieldPercent: 9.0,
    rating: "AA",
    minInvestment: "~ ₹ 10,000/-",
    tenure: "15 M to 30 M",
    payout: "Semi-Annual",
    soldPercent: 85,
    progressColor: "#EF4444",
  },
  {
    issuer: "IRFC Tax-Free Bonds",
    category: "PSU – Railway Finance",
    yieldPercent: 7.8,
    rating: "AAA",
    minInvestment: "~ ₹ 10,000/-",
    tenure: "15 M to 36 M",
    payout: "Annual",
    soldPercent: 64,
    progressColor: "#8B5CF6",
  },
];

export interface BondSwimLanesHandle {
  pause: () => void;
  restart: () => void;
  scrollCardToCenter: (index: number, onCentered: () => void) => void;
}

export const BondSwimLanes = forwardRef<BondSwimLanesHandle>((_, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const laneRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const startScroll = useCallback(() => {
    const lane = laneRef.current;
    if (!lane) return;
    if (tweenRef.current) tweenRef.current.kill();
    const halfWidth = lane.scrollWidth / 2;
    gsap.set(lane, { x: 0 });
    tweenRef.current = gsap.to(lane, {
      x: -halfWidth,
      duration: 7,
      ease: "none",
      repeat: -1,
    });
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      pause: () => {
        tweenRef.current?.pause();
      },
      restart: () => {
        startScroll();
      },
      scrollCardToCenter: (index: number, onCentered: () => void) => {
        const lane = laneRef.current;
        const container = containerRef.current;
        if (!lane || !container) return;

        if (tweenRef.current) tweenRef.current.kill();

        const card = lane.querySelector(`[data-lane-card="${index}"]`) as HTMLElement | null;
        if (!card) return;

        const containerCenter = container.offsetWidth / 2;
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const targetX = -(cardCenter - containerCenter);

        const currentX = gsap.getProperty(lane, "x") as number;
        const distance = Math.abs(targetX - currentX);
        const halfWidth = lane.scrollWidth / 2;
        const speed = halfWidth / 7;
        const duration = distance / speed;

        tweenRef.current = gsap.to(lane, {
          x: targetX,
          duration: Math.max(duration, 0.3),
          ease: "none",
          onComplete: onCentered,
        });
      },
    }),
    [startScroll]
  );

  useEffect(() => {
    startScroll();
    return () => {
      if (tweenRef.current) tweenRef.current.kill();
    };
  }, [startScroll]);

  return (
    <div ref={containerRef} className="relative flex w-full items-center overflow-x-clip">
      <div ref={laneRef} className="flex gap-5">
        {[...BONDS, ...BONDS].map((bond, i) => (
          <div key={`lane-${i}`} data-lane-card={i % BONDS.length} className="shrink-0">
            <BondCard {...bond} className="w-[320px]" />
          </div>
        ))}
      </div>

      {/* Left edge fade + progressive blur */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-24"
        style={{
          background: "linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0))",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-24"
        style={{
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          maskImage: "linear-gradient(to right, black, transparent)",
          WebkitMaskImage: "linear-gradient(to right, black, transparent)",
        }}
      />

      {/* Right edge fade + progressive blur */}
      <div
        className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-24"
        style={{
          background: "linear-gradient(to left, rgba(255,255,255,1), rgba(255,255,255,0))",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-24"
        style={{
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          maskImage: "linear-gradient(to left, black, transparent)",
          WebkitMaskImage: "linear-gradient(to left, black, transparent)",
        }}
      />
    </div>
  );
});

BondSwimLanes.displayName = "BondSwimLanes";
