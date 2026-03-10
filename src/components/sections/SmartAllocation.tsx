"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

const SLIDER_STEPS = [
  { label: "₹10k", value: 10_000 },
  { label: "₹2L", value: 2_00_000 },
  { label: "₹5L", value: 5_00_000 },
  { label: "₹10L", value: 10_00_000 },
  { label: "₹30L", value: 30_00_000 },
  { label: "₹50L", value: 50_00_000 },
  { label: "₹1Cr", value: 1_00_00_000 },
  { label: "₹5Cr", value: 5_00_00_000 },
];

const SLIDER_RESOLUTION = 1000;

interface RatingBucket {
  rating: string;
  color: string;
  rate: number;
  minTotal: number;
}

const RATING_BUCKETS: RatingBucket[] = [
  { rating: "AA+ to AAA", color: "#0B5ACA", rate: 10.25, minTotal: 0 },
  { rating: "BBB+ to BBB-", color: "#ED382B", rate: 15, minTotal: 0 },
  { rating: "AAA/GSEC", color: "#41CC78", rate: 7.05, minTotal: 10_00_000 },
  { rating: "A+ to A-", color: "#ED762B", rate: 12, minTotal: 0 },
];

function positionToValue(pos: number): number {
  const segments = SLIDER_STEPS.length - 1;
  const segSize = SLIDER_RESOLUTION / segments;
  const idx = Math.min(Math.floor(pos / segSize), segments - 1);
  const t = Math.min((pos - idx * segSize) / segSize, 1);
  return Math.round(
    SLIDER_STEPS[idx].value +
      t * (SLIDER_STEPS[idx + 1].value - SLIDER_STEPS[idx].value)
  );
}

function valueToPosition(val: number): number {
  for (let i = 0; i < SLIDER_STEPS.length - 1; i++) {
    if (val <= SLIDER_STEPS[i + 1].value) {
      const segments = SLIDER_STEPS.length - 1;
      const segSize = SLIDER_RESOLUTION / segments;
      const t =
        (val - SLIDER_STEPS[i].value) /
        (SLIDER_STEPS[i + 1].value - SLIDER_STEPS[i].value);
      return Math.round(i * segSize + t * segSize);
    }
  }
  return SLIDER_RESOLUTION;
}

function formatLargeDisplay(value: number): string {
  if (value >= 1_00_00_000)
    return `₹ ${(value / 1_00_00_000).toFixed(2)} Cr`;
  if (value >= 1_00_000) return `₹ ${(value / 1_00_000).toFixed(2)} L`;
  return `₹ ${(value / 1_000).toFixed(0)}K`;
}

function formatWordsDisplay(value: number): string {
  if (value >= 1_00_00_000) {
    const cr = value / 1_00_00_000;
    return `${cr % 1 === 0 ? cr.toFixed(0) : cr.toFixed(1)} crore rupees`;
  }
  if (value >= 1_00_000) {
    const l = value / 1_00_000;
    return `${l % 1 === 0 ? l.toFixed(0) : l.toFixed(1)} lacs rupees`;
  }
  const k = value / 1_000;
  return `${k % 1 === 0 ? k.toFixed(0) : k.toFixed(1)} thousand rupees`;
}

function formatInvest(value: number): string {
  if (value >= 1_00_00_000) {
    const cr = value / 1_00_00_000;
    return `₹ ${cr % 1 === 0 ? cr.toFixed(0) : cr.toFixed(1)} Cr`;
  }
  if (value >= 1_00_000) {
    const lacs = value / 1_00_000;
    return `₹ ${lacs % 1 === 0 ? lacs.toFixed(0) : lacs.toFixed(1)} Lacs`;
  }
  return `₹ ${(value / 1_000).toFixed(0)}K`;
}

function formatMonthly(value: number): string {
  if (value >= 1_00_000) return `₹ ${(value / 1_00_000).toFixed(2)} L`;
  return `₹ ${Math.round(value).toLocaleString("en-IN")}`;
}

function getAllocations(total: number) {
  return RATING_BUCKETS.map((bucket) => {
    if (total < bucket.minTotal) {
      return { invest: total, monthly: null, needsMore: true };
    }
    const monthly = (total * bucket.rate) / 1200;
    return { invest: total, monthly, needsMore: false };
  });
}

function Tooltip({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <div className="group/tip relative w-full">
      {children}
      <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-800 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover/tip:opacity-100">
        {label}
        <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-gray-800" />
      </div>
    </div>
  );
}

const TICK_COUNT = 36;

export function SmartAllocation() {
  const sectionRef = useRef<HTMLElement>(null);
  const [position, setPosition] = useState(() => valueToPosition(2_00_000));

  const amount = useMemo(() => positionToValue(position), [position]);
  const sliderPercent = (position / SLIDER_RESOLUTION) * 100;
  const allocations = useMemo(() => getAllocations(amount), [amount]);

  const handleSliderChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPosition(Number(e.target.value));
    },
    []
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".sa-left", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        x: -40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".sa-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        opacity: 0,
        stagger: 0.12,
        duration: 0.6,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="smart-allocation"
      className="bg-[#001b17] py-[140px]"
    >
      <div className="section-container">
        <div className="flex items-center gap-10">
          {/* ─── Left Column ─── */}
          <div className="sa-left flex min-w-0 flex-1 flex-col gap-12">
            {/* Header */}
            <div className="flex flex-col gap-3">
              <p className="text-xl font-semibold leading-[1.3] tracking-tight text-[#51e5b8]">
                Smart Allocation
              </p>
              <div>
                <h2 className="text-4xl font-semibold leading-[1.3] tracking-tight text-white">
                  How much would you like to Invest?
                </h2>
                <p className="mt-0.5 text-base leading-relaxed text-[#d9dade]">
                  Slide to explore indicative monthly income across credit
                  rating buckets.
                </p>
              </div>
            </div>

            {/* Amount Display + Slider */}
            <div className="w-full max-w-[640px]">
              <div className="flex flex-col gap-[72px]">
                {/* Big amount */}
                <div className="flex flex-col items-center gap-0.5">
                  <p className="text-[76px] font-semibold leading-[1.3] text-white">
                    {formatLargeDisplay(amount)}
                  </p>
                  <div className="flex items-center gap-1.5">
                    <Image
                      src="/assets/rupee.svg"
                      alt=""
                      width={32}
                      height={32}
                    />
                    <p className="text-2xl font-medium leading-[1.3] text-[#FDCA00]">
                      {formatWordsDisplay(amount)}
                    </p>
                  </div>
                </div>

                {/* Slider */}
                <div className="flex flex-col gap-10">
                  {/* Track + Input */}
                  <div className="relative h-4">
                    <div className="absolute inset-0 overflow-hidden rounded-full bg-white">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#ffe88c] to-[#af8f0f]"
                        style={{ width: `${sliderPercent}%` }}
                      />
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={SLIDER_RESOLUTION}
                      step={1}
                      value={position}
                      onChange={handleSliderChange}
                      className="sa-slider absolute inset-0 z-10 w-full cursor-pointer"
                    />
                  </div>

                  {/* Ticks + Labels */}
                  <div className="flex flex-col items-center gap-5">
                    <div className="flex w-full justify-between px-0.5">
                      {Array.from({ length: TICK_COUNT }, (_, i) => (
                        <div key={i} className="h-2 w-px bg-[#434759]" />
                      ))}
                    </div>
                    <div className="flex w-full justify-between">
                      {SLIDER_STEPS.map((step) => (
                        <p
                          key={step.label}
                          className="text-base font-medium leading-[1.3] text-[#d9dade]"
                        >
                          {step.label}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ─── Right Column — Cards Grid ─── */}
          <div className="flex w-[614px] shrink-0 flex-wrap gap-5">
            {RATING_BUCKETS.map((bucket, i) => {
              const alloc = allocations[i];
              return (
                <div
                  key={bucket.rating}
                  className="sa-card relative flex h-[297px] w-[297px] cursor-pointer flex-col justify-between overflow-hidden rounded-lg bg-white px-5 pb-5 pt-4 transition-transform duration-200 ease-out hover:scale-102"
                >
                  {/* Top: badge + invest + monthly */}
                  <div className="flex flex-col gap-4">
                    <span
                      className="self-start rounded px-2 py-0.5 text-sm font-semibold leading-relaxed text-white"
                      style={{ backgroundColor: bucket.color }}
                    >
                      {bucket.rating}
                    </span>

                    <div className="flex flex-col gap-3">
                      {/* Invest row */}
                      <Tooltip
                        label={`Investment in ${bucket.rating}: ${formatInvest(alloc.invest)}`}
                      >
                        <div className="flex items-end justify-between">
                          <div className="flex items-center gap-1.5">
                            <Image
                              src="/assets/rupee-2.svg"
                              alt=""
                              width={20}
                              height={20}
                            />
                            <p className="text-md font-medium tracking-tight text-gray-600 group-hover/tip:underline group-hover/tip:decoration-dotted group-hover/tip:underline-offset-2">
                              Invest
                            </p>
                          </div>
                          <p className="text-lg font-medium tracking-tight text-gray-700 group-hover/tip:underline group-hover/tip:decoration-dotted group-hover/tip:underline-offset-2">
                            {formatInvest(alloc.invest)}
                          </p>
                        </div>
                      </Tooltip>

                      {alloc.needsMore && (
                        <div className="flex items-center justify-center gap-1.5 rounded bg-gray-100 py-0.5">
                          <Image
                            src="/assets/arrow-up-2.svg"
                            alt=""
                            width={18}
                            height={18}
                          />
                          <p className="text-sm tracking-tight text-gray-700">
                            increase allocation
                          </p>
                        </div>
                      )}

                      {/* Monthly row */}
                      <Tooltip
                        label={`Monthly Interest: ${alloc.monthly !== null ? formatMonthly(alloc.monthly) : "NA"}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <Image
                              src="/assets/calendar.svg"
                              alt=""
                              width={20}
                              height={20}
                            />
                            <p className="text-md font-medium tracking-tight text-gray-600 group-hover/tip:underline group-hover/tip:decoration-dotted group-hover/tip:underline-offset-2">
                              Monthly
                            </p>
                          </div>
                          <p className="text-lg font-medium tracking-tight text-gray-700 group-hover/tip:underline group-hover/tip:decoration-dotted group-hover/tip:underline-offset-2">
                            {alloc.monthly !== null
                              ? formatMonthly(alloc.monthly)
                              : "NA"}
                          </p>
                        </div>
                      </Tooltip>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px w-full bg-gray-100" />

                  {/* Bottom: highest yield */}
                  <Tooltip
                    label={`${bucket.rate.toFixed(2)}% per annum`}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <p className="text-sm font-medium tracking-tight text-gray-700">
                        Highest Yield
                      </p>
                      <p className="text-[32px] font-medium leading-[1.3] tracking-tight text-gray-800 group-hover/tip:underline group-hover/tip:decoration-dotted group-hover/tip:underline-offset-4">
                        {bucket.rate % 1 === 0
                          ? `${bucket.rate}%`
                          : `${bucket.rate.toFixed(2)}%`}{" "}
                        PA
                      </p>
                    </div>
                  </Tooltip>

                  {/* Floral leaves decoration */}
                  <Image
                    src="/assets/floral-leaves.svg"
                    alt=""
                    width={32}
                    height={59}
                    className="absolute bottom-[28px] left-2.5"
                  />
                  <Image
                    src="/assets/floral-leaves.svg"
                    alt=""
                    width={32}
                    height={59}
                    className="absolute bottom-[28px] right-2.5 -scale-x-100"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
