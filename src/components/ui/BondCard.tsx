"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface BondCardProps {
  issuer: string;
  category: string;
  yieldPercent: number;
  rating: string;
  ratingColor?: string;
  minInvestment: string;
  tenure: string;
  payout: string;
  soldPercent: number;
  progressColor?: string;
  logo?: string;
  className?: string;
}

const RATING_BG: Record<string, string> = {
  AAA: "bg-[#18bbb0]",
  "AA+": "bg-[#2976e9]",
  AA: "bg-[#2976e9]",
  "A+": "bg-amber-500",
  A: "bg-amber-500",
};

export function BondCard({
  issuer,
  category,
  yieldPercent,
  rating,
  minInvestment,
  tenure,
  payout,
  soldPercent,
  progressColor = "#09C28A",
  logo,
  className,
}: BondCardProps) {
  const [intPart, decPart] = yieldPercent.toFixed(1).split(".");
  const ratingBg = RATING_BG[rating] ?? "bg-gray-400";

  return (
    <div
      className={cn(
        "group/card flex flex-col rounded-lg border-1 border-gray-200/60 bg-[#ffffff] px-4 py-5",
        className
      )}
    >
      {/* Section 1: Logo, Name & Type */}
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded border border-white bg-white">
          <Image
            src={logo || "/assets/bond-icon.png"}
            alt={issuer}
            width={48}
            height={48}
            className="object-contain"
          />
        </div>
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold leading-snug text-gray-800">
            {issuer}
          </h3>
          <p className="text-sm leading-snug text-gray-500">{category}</p>
        </div>
      </div>

      {/* Section 2: Details */}
      <div className="mt-4 rounded-lg border border-gray-100 bg-white p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm leading-relaxed text-gray-400">
              Yield per annum
            </p>
            <div className="mt-0.5 flex items-baseline gap-2.5">
              <div className="flex items-baseline text-gray-700">
                <span className="text-[56px] font-medium leading-[1.2] tracking-tight">
                  {intPart}.{decPart}
                </span>
                <span className="text-[25px] font-semibold tracking-tight">
                  %
                </span>
              </div>
              <Image
                src="/assets/growth-graph.svg"
                alt=""
                width={27}
                height={18}
              />
            </div>
          </div>
          <span
            className={cn(
              "inline-flex items-center justify-center rounded px-2 py-1 text-sm text-white",
              ratingBg
            )}
          >
            {rating}
          </span>
        </div>

        <div className="my-5 border-t border-gray-100" />

        <div className="flex items-center justify-between py-1">
          <div className="flex flex-col gap-1.5">
            <p className="text-xs text-gray-400">Min inv</p>
            <p className="text-xs font-semibold tracking-tight text-gray-700">
              {minInvestment}
            </p>
          </div>
          <div className="h-8 w-px bg-gray-200" />
          <div className="flex flex-col gap-1.5">
            <p className="text-xs text-gray-400">Tenure</p>
            <p className="text-xs font-semibold tracking-tight text-gray-700">
              {tenure}
            </p>
          </div>
          <div className="h-8 w-px bg-gray-200" />
          <div className="flex flex-col gap-1.5">
            <p className="text-xs text-gray-400">Payout</p>
            <p className="text-xs font-semibold tracking-tight text-gray-700">
              {payout}
            </p>
          </div>
        </div>
      </div>

      {/* Section 3: Progress Bar */}
      <div className="mt-8 flex items-center gap-3">
        <span className="shrink-0 text-base text-gray-500">Sold</span>
        <div className="relative h-[5px] flex-1 overflow-hidden rounded-full bg-gray-100">
          <div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              width: `${soldPercent}%`,
              backgroundColor: progressColor,
            }}
          />
        </div>
        <span className="shrink-0 text-lg font-semibold leading-[1.2] text-gray-700">
          {soldPercent}%
        </span>
      </div>

      {/* Section 4: CTA */}
      <div className="mt-8 flex items-center justify-end gap-3">
        <button className="group/share flex h-12 w-12 items-center justify-center rounded-lg border border-gray-100 bg-white transition-all duration-200 hover:rounded-full hover:border-teal-600 hover:bg-teal-600">
          <Image
            src="/assets/share.svg"
            alt="Share"
            width={20}
            height={20}
            className="transition-all duration-200 group-hover/share:brightness-0 group-hover/share:invert"
          />
        </button>
        <button className="group/details flex items-center gap-1 rounded-lg border border-gray-100 bg-white px-4 py-3.5 text-base font-medium tracking-tight text-gray-700 transition-all duration-200 hover:rounded-full hover:border-teal-600 hover:bg-teal-600 hover:text-white">
          View details
          <Image
            src="/assets/chevron-right.svg"
            alt=""
            width={20}
            height={20}
            className="transition-all duration-200 group-hover/details:brightness-0 group-hover/details:invert"
          />
        </button>
      </div>
    </div>
  );
}
