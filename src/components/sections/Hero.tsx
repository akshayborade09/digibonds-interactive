"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { Star } from "lucide-react";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const num500Ref = useRef<HTMLSpanElement>(null);
  const numUsersRef = useRef<HTMLSpanElement>(null);
  const num32kRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.3,
      });

      tl.from(".hero-badge", {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
      });

      if (headlineRef.current) {
        tl.from(
          headlineRef.current.querySelectorAll(".hero-word"),
          { y: 40, opacity: 0, stagger: 0.08, duration: 0.6 },
          "-=0.2"
        );
      }

      tl.from(subtextRef.current, { y: 30, opacity: 0, duration: 0.5 }, "-=0.2");
      tl.from(taglineRef.current, { y: 20, opacity: 0, duration: 0.5 }, "-=0.2");
      tl.from(ctaRef.current, { y: 20, opacity: 0, duration: 0.5 }, "-=0.3");

      tl.from(visualRef.current, { x: 60, opacity: 0, duration: 0.8 }, "-=0.6");

      if (visualRef.current) {
        tl.from(
          visualRef.current.querySelectorAll(".grid-cell"),
          { scale: 0.85, opacity: 0, stagger: 0.12, duration: 0.5, ease: "back.out(1.7)" },
          "-=0.4"
        );
      }

      const scramble = (
        el: HTMLElement,
        finalText: string,
        duration: number
      ) => {
        const digits = "0123456789";
        const len = finalText.length;
        const obj = { progress: 0 };
        return gsap.to(obj, {
          progress: 1,
          duration,
          ease: "power2.out",
          onUpdate() {
            const p = obj.progress;
            const resolved = Math.floor(p * len);
            let str = "";
            for (let i = 0; i < len; i++) {
              if (i < resolved) {
                str += finalText[i];
              } else if (/\d/.test(finalText[i])) {
                str += digits[Math.floor(Math.random() * digits.length)];
              } else {
                str += finalText[i];
              }
            }
            el.textContent = str;
          },
          onComplete() {
            el.textContent = finalText;
          },
        });
      };

      if (num500Ref.current) {
        tl.add(scramble(num500Ref.current, "500", 0.8), "-=0.2");
      }
      if (numUsersRef.current) {
        tl.add(scramble(numUsersRef.current, "500", 0.8), "<");
      }
      if (num32kRef.current) {
        tl.add(scramble(num32kRef.current, "32,000", 1), "<");
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[90vh] items-center overflow-hidden bg-[--bg-primary] pt-[120px] pb-[100px]"
    >
      <div className="section-container w-full py-16 lg:py-0">
        <div className="flex flex-col items-start gap-12 lg:flex-row lg:items-stretch lg:gap-[60px]">
          {/* ─── Left Column ─── */}
          <div className="flex w-full flex-col justify-between lg:w-1/2">
            {/* Top group */}
            <div>
              {/* Trust badges */}
              <div className="flex flex-wrap gap-2">
                {[
                  { icon: "/assets/sebi.svg", text: "SEBI-Registered OBPP" },
                  { icon: "/assets/trades.svg", text: "Trades via NSE & BSE" },
                  { icon: "/assets/digital.svg", text: "Fully Digital Process" },
                ].map((badge) => (
                  <span
                    key={badge.text}
                    className="hero-badge inline-flex items-center gap-1.5 rounded-full bg-[#eef7f6] px-4 py-1.5 text-md text-[--text-primary]"
                  >
                    <Image src={badge.icon} alt="" width={24} height={24} />
                    {badge.text}
                  </span>
                ))}
              </div>

              {/* Headline */}
              <div ref={headlineRef} className="mt-8">
                <h1 className="text-8xl font-medium leading-[1.05] tracking-[-0.04em] text-[--text-primary] md:text-7xl lg:text-8xl">
                  <span className="hero-word inline-block">Access Bond</span>
                  <br />
                  <span className="hero-word inline-block">Deals Yielding</span>
                  <br />
                  <span className="hero-word inline-block italic text-teal-400">
                    up to 15% p.a.
                  </span>
                </h1>
              </div>

              {/* Highlight line */}
              <div ref={subtextRef} className="mt-8 flex flex-wrap items-center gap-2 text-xl font-medium tracking-[-0.01em] text-[#067A69]">
                <span>From just ₹1,000</span>
                <span className="h-2 w-2 rounded-full bg-[#067A69]" />
                <span>Direct to Demat</span>
                <span className="h-2 w-2 rounded-full bg-[#067A69]" />
                <span>100% Digital</span>
              </div>
            </div>

            {/* Bottom group */}
            <div>
              <p ref={taglineRef} className="text-xl tracking-[-0.01em] text-[--text-primary]">
                Exchange-listed government and corporate bonds.
              </p>
              <div ref={ctaRef} className="mt-5 flex flex-wrap items-center gap-8">
                <a
                  href="#"
                  className="inline-flex items-center rounded-[38px] bg-teal-900 px-10 py-6 text-xl font-semibold text-white transition-colors hover:bg-teal-600"
                >
                  Get started
                </a>
                <div>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-6 w-6 fill-yellow text-yellow" />
                      ))}
                    </div>
                    <span className="text-2xl font-semibold text-[--text-primary]">4.7</span>
                  </div>
                  <p className="text-lg text-[--text-muted]">from 250+ reviews</p>
                </div>
              </div>
            </div>
          </div>

          {/* ─── Right Column — 2×2 Visual Grid ─── */}
          <div ref={visualRef} className="hidden w-full flex-1 lg:block">
            <div className="grid grid-cols-2 gap-0">
              {/* ── Row 1 ── */}

              {/* Top-left: Phone — right-side pill radius */}
              <div className="grid-cell relative aspect-square overflow-hidden rounded-br-[200px] rounded-tr-[200px] bg-gray-100">
                <Image
                  src="/assets/phone-in-hand.png"
                  alt="DigiBonds app"
                  fill
                  className="object-contain object-center"
                />
                <Image
                  src="/assets/sparkle.svg"
                  alt=""
                  width={34}
                  height={34}
                  className="sparkle-a absolute left-8 top-7"
                />
                <Image
                  src="/assets/sparkle.svg"
                  alt=""
                  width={24}
                  height={24}
                  className="sparkle-b absolute bottom-[100px] right-15"
                />
              </div>

              {/* Top-right: 500+ Bond Deals — NO border radius (square) */}
              <div className="grid-cell relative flex aspect-square flex-col items-end justify-between bg-teal-900 p-12">
                <div className="mt-auto text-right">
                  <p className="text-7xl font-normal leading-[1.2] tracking-[-0.04em] text-white">
                    <span ref={num500Ref}>&nbsp;</span>+
                  </p>
                  <p className="text-3xl font-normal leading-[1.2] tracking-[-0.04em] text-white">
                    Bond Deals
                  </p>
                  <Image
                    src="/assets/bond-deal.svg"
                    alt=""
                    width={40}
                    height={40}
                    className="ml-auto mt-2.5"
                  />
                </div>
                
              </div>

              {/* ── Row 2 ── */}

              {/* Bottom-left: Users Active — only top-right corner rounded */}
              <div className="grid-cell relative aspect-square overflow-hidden rounded-tr-[160px] bg-teal-600 py-12 px-12">
                {/* Decorative dots */}
                <div className="flex gap-1.5">
                  <div className="dot-seq-1 h-[26px] w-[26px] rounded-full bg-white/40" />
                  <div className="dot-seq-2 h-[26px] w-[26px] rounded-full bg-white/30" />
                  <div className="dot-seq-3 h-[26px] w-[26px] rounded-full bg-white/20" />
                </div>

                {/* Avatars */}
                <div className="absolute bottom-20 left-8 flex -space-x-1.5">
                  {[
                    "https://i.pravatar.cc/80?img=12",
                    "https://i.pravatar.cc/80?img=32",
                    "https://i.pravatar.cc/80?img=47",
                    "https://i.pravatar.cc/80?img=68",
                  ].map((src, i) => (
                    <Image
                      key={i}
                      src={src}
                      alt="User"
                      width={48}
                      height={48}
                      className="h-14 w-14 rounded-full border-2 border-teal-600 object-cover"
                      unoptimized
                    />
                  ))}
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-teal-600 bg-teal-400">
                    <Image src="/assets/arrow-up-2.svg" alt="" width={24} height={24} className="rotate-45 brightness-0 invert" />
                  </div>
                </div>

                <p className="absolute bottom-8 left-8 text-4xl font-normal leading-[1.2] tracking-[-0.04em] text-white">
                  <span ref={numUsersRef}>&nbsp;</span>+ Users Active
                </p>
              </div>

              {/* Bottom-right: ₹32,000 chart — only top-right corner rounded */}
              <div className="grid-cell relative aspect-square overflow-hidden rounded-tr-[160px] bg-teal-400 p-10">
                <div className="relative z-10">
                  <p className="text-7xl font-normal leading-[1.2] tracking-[-0.04em] text-white">
                    ₹<span ref={num32kRef}>&nbsp;</span>
                  </p>
                  <Image
                    src="/assets/arrow-up-2.svg"
                    alt=""
                    width={34}
                    height={34}
                    className="mt-2.5 brightness-0 invert"
                  />
                </div>
                {/* Animated growth line */}
                <svg
                  viewBox="0 0 200 140"
                  fill="none"
                  className="absolute bottom-8 left-8 right-8 h-[55%]"
                  preserveAspectRatio="none"
                >
                  <polyline
                    points="0,130 12,128 24,125 36,122 48,118 55,120 65,115 78,110 90,108 100,112 112,105 125,98 135,100 148,92 158,85 168,80 178,72 188,60 195,45 200,30"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    className="growth-line"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
