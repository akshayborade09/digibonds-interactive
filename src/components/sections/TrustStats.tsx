"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const AVATAR_URLS = [
  "https://i.pravatar.cc/80?img=12",
  "https://i.pravatar.cc/80?img=32",
  "https://i.pravatar.cc/80?img=47",
  "https://i.pravatar.cc/80?img=68",
  "https://i.pravatar.cc/80?img=15",
  "https://i.pravatar.cc/80?img=25",
  "https://i.pravatar.cc/80?img=36",
  "https://i.pravatar.cc/80?img=52",
  "https://i.pravatar.cc/80?img=59",
  "https://i.pravatar.cc/80?img=44",
  "https://i.pravatar.cc/80?img=3",
  "https://i.pravatar.cc/80?img=7",
  "https://i.pravatar.cc/80?img=20",
  "https://i.pravatar.cc/80?img=41",
  "https://i.pravatar.cc/80?img=56",
  "https://i.pravatar.cc/80?img=60",
  "https://i.pravatar.cc/80?img=8",
  "https://i.pravatar.cc/80?img=11",
  "https://i.pravatar.cc/80?img=22",
  "https://i.pravatar.cc/80?img=33",
  "https://i.pravatar.cc/80?img=38",
  "https://i.pravatar.cc/80?img=49",
  "https://i.pravatar.cc/80?img=53",
  "https://i.pravatar.cc/80?img=64",
];

const AVATAR_LAYOUT: { left: string; size: number }[] = [
  { left: "2%",  size: 48 },
  { left: "10%", size: 64 },
  { left: "4%",  size: 32 },
  { left: "18%", size: 40 },
  { left: "24%", size: 56 },
  { left: "30%", size: 32 },
  { left: "36%", size: 64 },
  { left: "42%", size: 40 },
  { left: "48%", size: 48 },
  { left: "54%", size: 56 },
  { left: "58%", size: 32 },
  { left: "64%", size: 48 },
  { left: "70%", size: 40 },
  { left: "74%", size: 64 },
  { left: "80%", size: 56 },
  { left: "86%", size: 32 },
  { left: "7%",  size: 56 },
  { left: "16%", size: 32 },
  { left: "27%", size: 48 },
  { left: "34%", size: 40 },
  { left: "45%", size: 64 },
  { left: "52%", size: 32 },
  { left: "62%", size: 40 },
  { left: "76%", size: 48 },
];

const MIN_INVEST_LABELS = ["₹1k", "₹1L", "₹2L", "₹5L", "₹10L", "₹30L", "₹50L", "₹1Cr"];

export function TrustStats() {
  const sectionRef = useRef<HTMLElement>(null);

  const deployedPathRef = useRef<SVGPathElement>(null);
  const deployedAreaRef = useRef<SVGPathElement>(null);
  const deployedHandleRef = useRef<HTMLDivElement>(null);
  const deployedTooltipRef = useRef<HTMLDivElement>(null);
  const deployedValueRef = useRef<HTMLSpanElement>(null);
  const deployedLabelRef = useRef<HTMLDivElement>(null);

  const investorsValueRef = useRef<HTMLSpanElement>(null);
  const investorsLabelRef = useRef<HTMLDivElement>(null);
  const investorsBubblesRef = useRef<HTMLDivElement>(null);

  const yieldPathRef = useRef<SVGPathElement>(null);
  const yieldAreaRef = useRef<SVGPathElement>(null);
  const yieldHandleRef = useRef<HTMLDivElement>(null);
  const yieldTooltipRef = useRef<HTMLDivElement>(null);
  const yieldValueRef = useRef<HTMLSpanElement>(null);
  const yieldLabelRef = useRef<HTMLDivElement>(null);

  const minInvestValueRef = useRef<HTMLSpanElement>(null);
  const minInvestLabelRef = useRef<HTMLDivElement>(null);
  const minInvestBarRef = useRef<HTMLDivElement>(null);
  const minInvestTooltipRef = useRef<HTMLDivElement>(null);
  const minInvestAmountRef = useRef<HTMLParagraphElement>(null);
  const minInvestTooltipTextRef = useRef<HTMLParagraphElement>(null);

  const getPointOnPath = useCallback(
    (pathEl: SVGPathElement, progress: number) => {
      const len = pathEl.getTotalLength();
      return pathEl.getPointAtLength(len * progress);
    },
    []
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // ─── Entrance animation for header ───
      gsap.from(".trust-header-item", {
        scrollTrigger: { trigger: section, start: "top 80%" },
        y: 30,
        opacity: 0,
        stagger: 0.12,
        duration: 0.6,
        ease: "power3.out",
      });

      gsap.from(".trust-card", {
        scrollTrigger: { trigger: ".trust-cards-row", start: "top 85%" },
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.7,
        ease: "power3.out",
      });

      // ═══════════════════════════════════════════
      // CARD 1 — Deployed ₹47 Cr+ area chart
      // Handle stops at 80% of path; line draws to 100%
      // ═══════════════════════════════════════════
      const deployedPath = deployedPathRef.current;
      const deployedArea = deployedAreaRef.current;
      if (deployedPath && deployedArea) {
        const pathLen = deployedPath.getTotalLength();
        gsap.set(deployedPath, {
          strokeDasharray: pathLen,
          strokeDashoffset: pathLen,
        });
        gsap.set(deployedArea, { opacity: 0, clipPath: "inset(0 100% 0 0)" });
        if (deployedHandleRef.current) gsap.set(deployedHandleRef.current, { opacity: 0 });
        if (deployedTooltipRef.current) gsap.set(deployedTooltipRef.current, { opacity: 0 });

        const DEPLOYED_HANDLE_STOP = 0.8;
        const deployedObj = { progress: 0, value: 0 };

        gsap.to(deployedObj, {
          progress: 1,
          value: 47,
          duration: 2.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".trust-cards-row",
            start: "top 75%",
            once: true,
          },
          onStart: () => {
            gsap.to(deployedPath, {
              strokeDashoffset: 0,
              duration: 2.5,
              ease: "power2.out",
            });
            gsap.to(deployedArea, {
              opacity: 1,
              clipPath: "inset(0 0% 0 0)",
              duration: 2.5,
              ease: "power2.out",
            });
            gsap.to(deployedHandleRef.current, {
              opacity: 1,
              duration: 0.3,
            });
            gsap.to(deployedTooltipRef.current, {
              opacity: 1,
              duration: 0.3,
            });
          },
          onUpdate: () => {
            const handleP = Math.min(deployedObj.progress, DEPLOYED_HANDLE_STOP);
            const pt = getPointOnPath(deployedPath, handleP);
            const leftPct = (pt.x / 243) * 100;
            const bottomPct = ((126 - pt.y) / 126) * 100;
            if (deployedHandleRef.current) {
              deployedHandleRef.current.style.left = `${leftPct}%`;
              deployedHandleRef.current.style.bottom = `${bottomPct}%`;
            }
            if (deployedTooltipRef.current) {
              deployedTooltipRef.current.style.left = `${leftPct}%`;
              deployedTooltipRef.current.style.bottom = `${bottomPct + 20}%`;
            }
            if (deployedValueRef.current) {
              const val = Math.round(deployedObj.value);
              deployedValueRef.current.textContent = `₹${val} Cr+`;
            }
          },
        });
      }

      // ═══════════════════════════════════════════
      // CARD 2 — Investors 2,500+ bubbles (continuous individual loops)
      // Each bubble independently pops in and fades out on its own cycle
      // ═══════════════════════════════════════════
      const bubblesContainer = investorsBubblesRef.current;
      if (bubblesContainer) {
        const bubbles = bubblesContainer.querySelectorAll<HTMLElement>(".investor-bubble");
        gsap.set(bubbles, { y: 80, opacity: 0 });

        const animateBubble = (bubble: HTMLElement, initialDelay: number) => {
          const riseDuration = 4 + Math.random() * 3;
          const pause = 0.1 + Math.random() * 0.8;
          const totalTravel = 450;
          const obj = { p: 0 };

          gsap.timeline({ repeat: -1, delay: initialDelay, repeatDelay: pause })
            .fromTo(
              obj,
              { p: 0 },
              {
                p: 1,
                duration: riseDuration,
                ease: "none",
                onUpdate: () => {
                  const p = obj.p;
                  const y = 80 - p * totalTravel;
                  let opacity = 1;
                  if (p < 0.12) opacity = p / 0.12;
                  else if (p > 0.75) opacity = (1 - p) / 0.25;
                  gsap.set(bubble, { y, opacity });
                },
              }
            );
        };

        const investorObj = { value: 0 };

        gsap.to(investorObj, {
          value: 2500,
          duration: 2.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".trust-cards-row",
            start: "top 75%",
            once: true,
          },
          onStart: () => {
            bubbles.forEach((bubble, i) => {
              animateBubble(bubble, i * 0.3 + Math.random() * 0.6);
            });
          },
          onUpdate: () => {
            if (investorsValueRef.current) {
              const val = Math.round(investorObj.value);
              investorsValueRef.current.textContent = val.toLocaleString("en-IN") + "+";
            }
          },
        });
      }

      // ═══════════════════════════════════════════
      // CARD 3 — Max Yield 14.8% line graph
      // Handle stops at 80% of path; line draws to 100%
      // ═══════════════════════════════════════════
      const yieldPath = yieldPathRef.current;
      const yieldArea = yieldAreaRef.current;
      if (yieldPath && yieldArea) {
        const yLen = yieldPath.getTotalLength();
        gsap.set(yieldPath, {
          strokeDasharray: yLen,
          strokeDashoffset: yLen,
        });
        gsap.set(yieldArea, { opacity: 0, clipPath: "inset(0 100% 0 0)" });
        if (yieldHandleRef.current) gsap.set(yieldHandleRef.current, { opacity: 0 });
        if (yieldTooltipRef.current) gsap.set(yieldTooltipRef.current, { opacity: 0 });

        const YIELD_HANDLE_STOP = 0.8;
        const yieldObj = { progress: 0, value: 0 };

        gsap.to(yieldObj, {
          progress: 1,
          value: 14.8,
          duration: 2.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".trust-cards-row",
            start: "top 75%",
            once: true,
          },
          onStart: () => {
            gsap.to(yieldPath, {
              strokeDashoffset: 0,
              duration: 2.5,
              ease: "power2.out",
            });
            gsap.to(yieldArea, {
              opacity: 1,
              clipPath: "inset(0 0% 0 0)",
              duration: 2.5,
              ease: "power2.out",
            });
            gsap.to(yieldHandleRef.current, {
              opacity: 1,
              duration: 0.3,
              delay: 0.3,
            });
            gsap.to(yieldTooltipRef.current, {
              opacity: 1,
              duration: 0.3,
              delay: 0.3,
            });
          },
          onUpdate: () => {
            const handleP = Math.min(yieldObj.progress, YIELD_HANDLE_STOP);
            const pt = getPointOnPath(yieldPath, handleP);
            const leftPct = (pt.x / 231) * 100;
            const bottomPct = ((146 - pt.y) / 146) * 100;
            if (yieldHandleRef.current) {
              yieldHandleRef.current.style.left = `${leftPct}%`;
              yieldHandleRef.current.style.bottom = `${bottomPct}%`;
            }
            if (yieldTooltipRef.current) {
              yieldTooltipRef.current.style.left = `${leftPct}%`;
              yieldTooltipRef.current.style.bottom = `${bottomPct + 18}%`;
            }
            if (yieldValueRef.current) {
              yieldValueRef.current.textContent = `${yieldObj.value.toFixed(1)}%`;
            }
          },
        });
      }

      // ═══════════════════════════════════════════
      // CARD 4 — Min Investment ₹1Cr → ₹1,000
      // ═══════════════════════════════════════════
      const bar = minInvestBarRef.current;
      if (bar) {
        gsap.set(bar, { width: "100%" });

        const minObj = { widthPct: 100, value: 10000000 };

        gsap.to(minObj, {
          widthPct: 8.7,
          value: 1000,
          duration: 2.5,
          ease: "power2.inOut",
          delay: 0.5,
          scrollTrigger: {
            trigger: ".trust-cards-row",
            start: "top 75%",
            once: true,
          },
          onUpdate: () => {
            bar.style.width = `${minObj.widthPct}%`;

            if (minInvestValueRef.current) {
              const v = Math.round(minObj.value);
              if (v >= 10000000) {
                minInvestValueRef.current.textContent = "₹1,000";
              } else if (v >= 100000) {
                minInvestValueRef.current.textContent = `₹${(v / 100000).toFixed(v >= 1000000 ? 0 : 1)}L`;
              } else {
                minInvestValueRef.current.textContent = `₹${v.toLocaleString("en-IN")}`;
              }
            }

            if (minInvestAmountRef.current) {
              const v = Math.round(minObj.value);
              if (v >= 10000000) {
                minInvestAmountRef.current.textContent = "₹1cr";
              } else if (v >= 100000) {
                minInvestAmountRef.current.textContent = `₹${Math.round(v / 100000)}L`;
              } else {
                minInvestAmountRef.current.textContent = `₹${v.toLocaleString("en-IN")}`;
              }
            }

            if (minInvestTooltipRef.current) {
              minInvestTooltipRef.current.style.left = `${minObj.widthPct}%`;
            }

            if (minInvestTooltipTextRef.current) {
              const v = Math.round(minObj.value);
              if (v >= 10000000) {
                minInvestTooltipTextRef.current.textContent = "₹1 Cr";
              } else if (v >= 100000) {
                minInvestTooltipTextRef.current.textContent = `₹${(v / 100000).toFixed(v >= 1000000 ? 0 : 1)}L`;
              } else {
                minInvestTooltipTextRef.current.textContent = `₹${v.toLocaleString("en-IN")}`;
              }
            }
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, [getPointOnPath]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-teal-900 py-[140px]"
    >
      {/* Background grid pattern — positioned behind the cards area */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/live-opportunity-element.svg"
          alt=""
          className="absolute left-1/2 top-[20%] w-[55%] max-w-[728px] -translate-x-1/2 -translate-y-[35%]"
        />
      </div>

      <div className="section-container relative z-10">
        {/* ─── Header ─── */}
        <div className="mb-12">
          <p className="trust-header-item text-xl font-semibold leading-[1.3] tracking-tight text-[#51e5b8]">
            Live Opportunities
          </p>
          <div className="mt-3">
            <h2 className="trust-header-item text-4xl font-semibold leading-[1.3] tracking-tight text-white">
              Trusted by Thousands.
              <br />
              Backed by Real Numbers.
            </h2>
            <p className="trust-header-item mt-3 text-base leading-relaxed text-gray-300">
              Every rupee deployed, every investor served — here&apos;s what
              DigiBonds has built since day one.
            </p>
          </div>
        </div>

        {/* ─── Cards Row ─── */}
        <div className="trust-cards-row grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* ════════════════════════════
              CARD 1 — ₹47 Cr+ Deployed
             ════════════════════════════ */}
          <div className="trust-card relative aspect-[1/1] overflow-hidden rounded-lg border border-gray-100 bg-white">
            <div ref={deployedLabelRef} className="absolute left-5 top-5 z-10">
              <p className="text-5xl font-semibold leading-[1.2] tracking-tight text-gray-700">
                <span ref={deployedValueRef}>₹0</span>
              </p>
              <p className="text-lg tracking-tight text-gray-700">Deployed</p>
            </div>

            {/* Chart area */}
            <div className="absolute bottom-7 left-5 right-5 h-[55%]">
              {/* Tooltip */}
              <div
                ref={deployedTooltipRef}
                className="absolute z-20 -translate-x-1/2"
                style={{ bottom: "80%", left: "0%" }}
              >
                <div className="relative whitespace-nowrap rounded bg-gray-700 px-2.5 py-1.5">
                  <p className="text-md font-medium text-white">₹47 cr</p>
                  <div className="absolute left-1/2 top-full -translate-x-1/2 border-[5px] border-transparent border-t-gray-700" />
                </div>
              </div>

              {/* Handle circle (HTML so it stays perfectly round) */}
              <div
                ref={deployedHandleRef}
                className="absolute z-10 -translate-x-1/2 translate-y-1/2"
                style={{ left: "0%", bottom: "5%" }}
              >
                <div className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-[#09C28A]/15">
                  <div className="h-[32px] w-[32px] rounded-full border-[8px] border-[#09C28A] bg-white" />
                </div>
              </div>

              <svg
                viewBox="0 0 243 126"
                fill="none"
                className="absolute inset-0 h-full w-full"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="deployedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#09C28A" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#09C28A" stopOpacity="0.02" />
                  </linearGradient>
                </defs>

                {/* Area fill */}
                <path
                  ref={deployedAreaRef}
                  d="M5,118 C25,116 45,113 65,108 C85,103 105,96 125,86 C145,76 165,63 185,46 C198,35 212,25 228,18 L237,14 L237,126 L5,126 Z"
                  fill="url(#deployedGradient)"
                />

                {/* Line stroke */}
                <path
                  ref={deployedPathRef}
                  d="M5,118 C25,116 45,113 65,108 C85,103 105,96 125,86 C145,76 165,63 185,46 C198,35 212,25 228,18 L237,14"
                  stroke="#09C28A"
                  strokeWidth="5"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </div>
          </div>

          {/* ════════════════════════════
              CARD 2 — 2,500+ Investors
             ════════════════════════════ */}
          <div className="trust-card relative aspect-[1/1] overflow-hidden rounded-lg border border-gray-100 bg-white">
            <div ref={investorsLabelRef} className="absolute left-5 top-5 z-10">
              <p className="text-5xl font-semibold leading-[1.2] tracking-tight text-gray-700">
                <span ref={investorsValueRef}>0</span>
              </p>
              <p className="text-lg tracking-tight text-gray-700">Investors</p>
            </div>

            {/* Bubbles container — full width, tall so bubbles start hidden below */}
            <div
              ref={investorsBubblesRef}
              className="absolute bottom-0 left-0 right-0 h-[65%] overflow-hidden"
            >
              {AVATAR_LAYOUT.map((pos, i) => (
                <div
                  key={i}
                  className="investor-bubble absolute bottom-0"
                  style={{
                    left: pos.left,
                    width: pos.size,
                    height: pos.size,
                  }}
                >
                  <Image
                    src={AVATAR_URLS[i % AVATAR_URLS.length]}
                    alt=""
                    width={pos.size}
                    height={pos.size}
                    className="h-full w-full rounded-full border-2 border-white object-cover shadow-md"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ════════════════════════════
              CARD 3 — 15% Max Yield
             ════════════════════════════ */}
          <div className="trust-card relative aspect-[1/1] overflow-hidden rounded-lg border border-gray-100 bg-white">
            <div ref={yieldLabelRef} className="absolute left-5 top-5 z-10">
              <p className="text-5xl font-semibold leading-[1.2] tracking-tight text-gray-700">
                <span ref={yieldValueRef}>0%</span>
              </p>
              <p className="text-lg tracking-tight text-gray-700">Max yield</p>
            </div>

            {/* Chart area */}
            <div className="absolute bottom-5 left-5 right-5 h-[55%]">
              {/* Tooltip */}
              <div
                ref={yieldTooltipRef}
                className="absolute z-20 -translate-x-1/2"
                style={{ bottom: "85%", left: "0%" }}
              >
                <div className="relative whitespace-nowrap rounded bg-gray-700 px-2.5 py-1.5">
                  <p className="text-md font-medium text-white">+14.8%</p>
                  <div className="absolute left-1/2 top-full -translate-x-1/2 border-[5px] border-transparent border-t-gray-700" />
                </div>
              </div>

              {/* Handle circle (HTML so it stays perfectly round) */}
              <div
                ref={yieldHandleRef}
                className="absolute z-10 -translate-x-1/2 translate-y-1/2"
                style={{ left: "0%", bottom: "5%" }}
              >
                <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#09C28A]/15">
                  <div className="h-[24px] w-[24px] rounded-full bg-[#09C28A]" />
                </div>
              </div>

              <svg
                viewBox="0 0 231 146"
                fill="none"
                className="absolute inset-0 h-full w-full"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="yieldGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#09C28A" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#09C28A" stopOpacity="0.02" />
                  </linearGradient>
                </defs>

                {/* Dashed guide lines */}
                <line
                  x1="0" y1="65" x2="231" y2="65"
                  stroke="#2DD39C"
                  strokeWidth="1"
                  strokeDasharray="6 5"
                />
                <line
                  x1="0" y1="120" x2="231" y2="120"
                  stroke="#2DD39C"
                  strokeWidth="1"
                  strokeDasharray="6 5"
                />

                {/* Area fill — flat, one dip down, then strong climb */}
                <path
                  ref={yieldAreaRef}
                  d="M5,140 L75,85 L135,108 L225,38 L225,146 L5,146 Z"
                  fill="url(#yieldGradient)"
                />

                <path
                  ref={yieldPathRef}
                  d="M5,140 L75,85 L135,108 L225,38"
                  stroke="#09C28A"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </div>
          </div>

          {/* ════════════════════════════
              CARD 4 — ₹1,000 Min Invest
             ════════════════════════════ */}
          <div className="trust-card relative aspect-[1/1] overflow-hidden rounded-lg border border-gray-100 bg-white">
            <div ref={minInvestLabelRef} className="absolute left-5 top-5 z-10">
              <p className="text-5xl font-semibold leading-[1.2] tracking-tight text-gray-700">
                <span ref={minInvestValueRef}>₹1,000</span>
              </p>
              <p className="text-lg tracking-tight text-gray-700">Min invest</p>
            </div>

            {/* Bar chart area */}
            <div className="absolute bottom-6 left-[18px] right-[18px] h-[142px]">
              {/* Tooltip */}
              <div
                ref={minInvestTooltipRef}
                className="absolute z-20 -translate-x-1/2"
                style={{ left: "100%", top: "0px" }}
              >
                <div className="relative whitespace-nowrap rounded bg-gray-700 px-2.5 py-1.5">
                  <p ref={minInvestTooltipTextRef} className="text-md font-medium text-white">₹1 Cr</p>
                  <div className="absolute left-1/2 top-full -translate-x-1/2 border-[5px] border-transparent border-t-gray-700" />
                </div>
              </div>

              {/* Bar container */}
              <div className="absolute left-0 right-0 top-[50px] h-[57px] rounded-sm bg-gray-100">
                {/* Animated gradient bar */}
                <div
                  ref={minInvestBarRef}
                  className="absolute left-0 top-[-5px] h-[67px]"
                  style={{
                    background: "linear-gradient(to right, #a5e1cd, #00a770)",
                    width: "100%",
                  }}
                />
                {/* Amount label */}
                <p
                  ref={minInvestAmountRef}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[32px] tracking-tight text-gray-700"
                >
                  ₹1cr
                </p>
              </div>

              {/* Scale labels */}
              <div className="absolute bottom-0 left-0 right-0 flex items-start justify-between text-sm font-medium leading-[1.3] text-gray-300">
                {MIN_INVEST_LABELS.map((label) => (
                  <span key={label}>{label}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
