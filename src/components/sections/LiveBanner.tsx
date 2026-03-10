"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

const CHIPS = [
  { icon: "/assets/sebi-2.svg", text: "SEBI-Registered OBPP" },
  { icon: "/assets/trades-2.svg", text: "Trades via NSE & BSE" },
  { icon: "/assets/digita-2.svg", text: "Fully Digital Process" },
];

export function LiveBanner() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        scrollTrigger: { trigger: ref.current, start: "top 85%" },
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      });

      gsap.from(".banner-chip", {
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
        opacity: 0,
        y: 15,
        stagger: 0.1,
        duration: 0.5,
        delay: 0.3,
        ease: "power3.out",
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-gray-100 pb-[140px]">
      <div className="section-container">
        <div
          ref={ref}
          className="relative overflow-hidden rounded-lg bg-[#001b17]"
        >
          {/* Rupee illustration */}
          <div className="absolute left-[45px] top-0 h-full w-[100px]">
            <Image
              src="/assets/bond-banner.svg"
              alt=""
              width={100}
              height={162}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="relative flex flex-col items-center gap-6 px-6 py-10 md:flex-row md:justify-between md:px-10 md:py-0 md:min-h-[162px]">
            {/* Text + Chips */}
            <div className="flex flex-col gap-4 pl-0 md:pl-[140px]">
              <p className="text-[28px] font-medium italic leading-[1.2] tracking-tight text-white md:text-[32px]">
                50+ live bond available
              </p>
              <div className="flex flex-wrap gap-2">
                {CHIPS.map((chip) => (
                  <span
                    key={chip.text}
                    className="banner-chip inline-flex items-center gap-1.5 rounded-full bg-[#005d55] px-3 py-1 text-sm tracking-tight text-white"
                  >
                    <Image
                      src={chip.icon}
                      alt=""
                      width={20}
                      height={20}
                    />
                    {chip.text}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <a
              href="#"
              className="banner-chip inline-flex h-14 shrink-0 items-center gap-2.5 rounded-full bg-teal-400 px-6 text-lg font-semibold text-gray-700 transition-colors hover:bg-teal-400/90"
            >
              Explore all
              <Image
                src="/assets/arrow-up-2.svg"
                alt=""
                width={24}
                height={24}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
