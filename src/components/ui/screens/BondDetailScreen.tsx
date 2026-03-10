"use client";

import { forwardRef } from "react";
import Image from "next/image";

export const BondDetailScreen = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className="relative h-full overflow-hidden bg-gray-100">
      {/* Scrollable content */}
      <div className="detail-scroll-inner px-3 pb-28 pt-12">
        {/* Back arrow */}
        <div className="mb-3">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18L9 12L15 6"
              stroke="#1e2130"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Bond header */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden">
            <Image
              src="/assets/bond-icon.png"
              alt=""
              width={36}
              height={36}
              className="object-contain"
            />
          </div>
          <div>
            <p className="text-sm font-semibold leading-snug text-[#1e2130]">
              Axis Bank NCD
            </p>
            <p className="text-[11px] leading-snug text-[#666a7b]">
              Private Bank – Corporate Finance
            </p>
          </div>
        </div>

        {/* Yield card */}
        <div className="mt-3 rounded-lg border border-[#f2f3f5] bg-white p-3">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] text-[#858895]">Yield per annum *</p>
              <div className="mt-0.5 flex items-baseline gap-1.5">
                <div className="flex items-baseline text-[#2d3142]">
                  <span className="text-[36px] font-medium leading-[1.2] tracking-tight">
                    9.0
                  </span>
                  <span className="text-base font-semibold tracking-tight">
                    %
                  </span>
                </div>
                <Image
                  src="/assets/growth-graph.svg"
                  alt=""
                  width={18}
                  height={12}
                />
              </div>
            </div>
            <div className="flex gap-1">
              <span className="rounded bg-[#fff1a2] px-1.5 py-0.5 text-[10px] font-semibold text-black">
                Secured
              </span>
              <span className="rounded bg-[#18bbb0] px-1.5 py-0.5 text-[10px] font-semibold text-white">
                AA
              </span>
            </div>
          </div>

          <div className="mt-2.5 flex gap-3 text-[10px] text-black">
            <span>Monthly interest</span>
            <span>2 years 6 months</span>
          </div>

          <div className="my-2.5 border-t border-[#f2f3f5]" />

          <div className="flex items-center justify-between py-0.5">
            <div className="flex flex-col gap-1">
              <p className="text-[10px] text-[#858895]">Min inv</p>
              <p className="text-[11px] font-semibold tracking-tight text-[#2d3142]">
                ~ ₹ 10,000/-
              </p>
            </div>
            <div className="h-6 w-px bg-[#f2f3f5]" />
            <div className="flex flex-col gap-1">
              <p className="text-[10px] text-[#858895]">Tenure</p>
              <p className="text-[11px] font-semibold tracking-tight text-[#2d3142]">
                15 M to 30 M
              </p>
            </div>
            <div className="h-6 w-px bg-[#f2f3f5]" />
            <div className="flex flex-col gap-1">
              <p className="text-[10px] text-[#858895]">Payout</p>
              <p className="text-[11px] font-semibold tracking-tight text-[#2d3142]">
                Semi-Annual
              </p>
            </div>
          </div>
        </div>

        {/* Allocation status */}
        <div className="mt-3 rounded-lg border border-[#f2f3f5] bg-white px-3 pb-3.5 pt-3">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold tracking-tight text-[#2d3142]">
              Allocation status
            </p>
            <div className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#09c28a]" />
              <span className="text-[10px] font-semibold text-[#09c28a]">Live</span>
            </div>
          </div>

          <div className="mt-3 flex justify-between">
            <div>
              <p className="text-[10px] text-black">Total allocated</p>
              <p className="mt-0.5 text-lg font-semibold tracking-tight text-[#2d3142]">
                ₹3.4 cr
              </p>
            </div>
            <div>
              <p className="text-[10px] text-black">Remaining</p>
              <p className="mt-0.5 text-lg font-semibold tracking-tight text-[#2d3142]">
                ₹60L
              </p>
            </div>
          </div>

          <div className="mt-3 flex items-center">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#f2f3f5]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#ff7e53] to-[#d12300]"
                style={{ width: "85%" }}
              />
            </div>
          </div>
        </div>

        {/* Projected returns */}
        <div className="mt-5">
          <p className="text-sm font-semibold tracking-tight text-[#1e2130]">
            Projected returns and payout
          </p>

          <div className="mt-3 rounded-lg border border-[#f2f3f5] bg-white p-3">
            <p className="text-[10px] text-black">Investment Amount</p>
            <div className="mt-1.5 flex h-10 items-center rounded-lg border border-[#f2f3f5] px-2.5">
              <p className="text-lg font-semibold tracking-tight text-[#2d3142]">
                ₹ 50,000
              </p>
            </div>

            <p className="mt-3 text-[11px] font-medium text-[#067a69]">
              Units : 50 (face value of ₹1,000 per unit)
            </p>

            <p className="mt-3 text-[30px] font-medium leading-[1.2] tracking-tight text-[#2d3142]">
              ₹ 50k
            </p>

            {/* Slider */}
            <div className="mt-4">
              <div className="relative h-2.5 w-full rounded-full bg-[#f2f3f5]">
                <div className="absolute left-0 top-0 h-2.5 w-8 rounded-full bg-gradient-to-r from-[#ffe88c] to-[#e0b612]" />
                <div className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-[#ffd700] shadow-md" />
              </div>
              <div className="mt-3 flex justify-between text-[9px] font-medium text-[#b0b2b9]">
                <span>₹10k</span>
                <span>₹1L</span>
                <span>₹2L</span>
                <span>₹10L</span>
                <span>₹30L</span>
                <span>₹50L</span>
                <span>₹1Cr</span>
              </div>
            </div>

            <div className="my-4 border-t border-[#f2f3f5]" />

            {/* Returns breakdown */}
            <div className="flex flex-col gap-2 rounded-xl bg-[#f6faf9] p-2.5">
              <div className="flex justify-between text-[11px] font-medium text-[#00453b]">
                <span>Annual interest</span>
                <span>₹5,375</span>
              </div>
              <div className="border-t border-[#e5e7eb]" />
              <div className="flex justify-between text-[11px] font-medium text-[#00453b]">
                <span>Total interest over tenure</span>
                <span>₹13,438</span>
              </div>
              <div className="border-t border-[#e5e7eb]" />
              <div className="flex justify-between text-[11px] font-medium text-[#00453b]">
                <span>Total return over tenure</span>
                <span>₹63,438</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky invest button */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div
          className="px-3 pb-6 pt-3"
          style={{
            background:
              "linear-gradient(to bottom, rgba(242,243,245,0), #f3f4f6)",
          }}
        >
          <button className="btn-invest flex h-11 w-full items-center justify-center gap-1.5 rounded-lg bg-[#00453b] text-sm font-medium text-white">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            Invest now
          </button>
        </div>
      </div>
    </div>
  );
});

BondDetailScreen.displayName = "BondDetailScreen";
