"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, animationPresets } from "@/lib/gsap";
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
    issuer: "REC Infrastructure Bonds",
    category: "PSU – Power Finance",
    yieldPercent: 8.5,
    rating: "AAA",
    minInvestment: "~ ₹ 10,000/-",
    tenure: "11 M to 29 M",
    payout: "Quarterly",
    soldPercent: 76,
    progressColor: "#F59E0B",
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

export function BondCards() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".bond-header", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      });

      gsap.from(".bond-card-item", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        opacity: 0,
        stagger: 0.15,
        duration: 0.7,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="bonds"
      className="bg-gray-100 py-[140px]"
    >
      <div className="section-container">
        {/* Header */}
        <div className="bond-header flex flex-col gap-3">
          <p className="text-xl font-semibold leading-[1.3] tracking-tight text-teal-600">
            Live Opportunities
          </p>
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="flex flex-col gap-0.5">
              <h2 className="text-4xl font-semibold leading-[1.3] tracking-tight text-gray-700">
                Explore Exchange-Listed Bonds
              </h2>
              <p className="text-base leading-relaxed text-gray-500">
                Curated, rated, and ready to invest. Updated with new issues
                regularly.
              </p>
            </div>
            <a
              href="#"
              className="inline-flex h-14 shrink-0 items-center gap-2.5 rounded-full bg-teal-900 px-6 text-lg font-semibold text-white transition-colors hover:bg-teal-900/90"
            >
              View all Bond Deals
              <Image
                src="/assets/arrow-up-2.svg"
                alt=""
                width={24}
                height={24}
                className="brightness-0 invert"
              />
            </a>
          </div>
        </div>

        {/* Cards grid */}
        <div className="mt-10 flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-4 md:overflow-visible md:pb-0">
          {BONDS.map((bond) => (
            <BondCard
              key={bond.issuer}
              {...bond}
              className="bond-card-item min-w-[320px] shrink-0 snap-start md:min-w-0 cursor-pointer transition-transform duration-200 ease-out hover:scale-[1.02]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
