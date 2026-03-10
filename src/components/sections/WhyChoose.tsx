"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, animationPresets } from "@/lib/gsap";

const FEATURES = [
  {
    icon: "/assets/curated-bond.png",
    title: "Curated Bond Opportunities",
    description:
      "Access rigorously screened listed government & corporate bonds across tenures and risk profiles.",
  },
  {
    icon: "/assets/buy-sell.png",
    title: "Buy & Sell on Exchange",
    description:
      "Two-way pricing on select bonds. Liquidity when you need it through NSE & BSE.",
  },
  {
    icon: "/assets/clear-yield.png",
    title: "Clear Yields & Cashflows",
    description:
      "Transparent payout schedules with no hidden charges. Know exactly what you earn and when.",
  },
  {
    icon: "/assets/digital-process.png",
    title: "100% Digital Process",
    description:
      "Paperless. Secure. Direct settlement to your Demat. No branch visits, no delays.",
  },
  {
    icon: "/assets/sebi-registered.png",
    title: "SEBI Registered OBPP",
    description:
      "Regulated and compliant. All transactions executed through recognised stock exchanges.",
  },
  {
    icon: "/assets/dedicated-support.png",
    title: "Dedicated Support",
    description:
      "Relationship managers and in-app support for guidance at every stage of your investment.",
  },
];

export function WhyChoose() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".why-header-item", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        stagger: 0.12,
        duration: 0.6,
        ease: "power3.out",
      });

      gsap.from(".why-card", {
        scrollTrigger: {
          trigger: ".why-grid",
          start: "top 85%",
        },
        ...animationPresets.scaleUp,
        stagger: 0.1,
      });

      gsap.from(".why-footer", {
        scrollTrigger: {
          trigger: ".why-footer",
          start: "top 90%",
        },
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-choose"
      className="bg-gray-50 py-[140px]"
    >
      <div className="section-container">
        {/* Header */}
        <div className="mb-12">
          <p className="why-header-item text-xl font-semibold leading-[1.3] tracking-tight text-teal-600">
            Platform Advantage
          </p>
          <div className="mt-3">
            <h2 className="why-header-item text-4xl font-semibold leading-[1.3] tracking-tight text-gray-700">
              Why choose DigiBonds?
            </h2>
            <p className="why-header-item mt-1 text-base leading-relaxed text-gray-500">
              Built for disciplined investors who demand more from fixed income.
            </p>
          </div>
        </div>

        {/* 3×2 Grid */}
        <div className="why-grid grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="why-card flex flex-col gap-5 rounded-lg border border-[#f5f5f5] bg-white p-6"
            >
              {/* Icon */}
              <div
                className="relative h-[70px] w-[70px] shrink-0 overflow-hidden rounded-xl border border-white"
                style={{
                  background:
                    "linear-gradient(138deg, rgba(255,255,255,0.4) 2%, #cbffdd 98%), #fff",
                }}
              >
                <Image
                  src={feature.icon}
                  alt=""
                  width={86}
                  height={86}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 mix-blend-multiply"
                />
              </div>

              {/* Text */}
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold leading-relaxed text-gray-700">
                  {feature.title}
                </h3>
                <p className="text-base leading-relaxed text-gray-500">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* SEBI Footer Banner */}
        <div className="why-footer mt-12 flex items-center justify-center gap-2.5 rounded bg-[#d7f7ea] px-5 py-1.5">
          <Image
            src="/assets/verify-tick.svg"
            alt=""
            width={32}
            height={32}
          />
          <p className="text-base leading-relaxed text-gray-600">
            DigiBonds is a SEBI-Registered Online Bond Platform Provider (OBPP).
            All transactions executed on NSE &amp; BSE.
          </p>
        </div>
      </div>
    </section>
  );
}
