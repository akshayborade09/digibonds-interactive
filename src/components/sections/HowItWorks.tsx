"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Step1PhoneAnimation, Step1PhoneAnimationHandle } from "@/components/ui/Step1PhoneAnimation";
import { BondSwimLanes, BondSwimLanesHandle } from "@/components/ui/BondSwimLanes";
import { IPhoneFrame } from "@/components/ui/IPhoneFrame";
import { BondCard } from "@/components/ui/BondCard";
import { BondDetailScreen } from "@/components/ui/screens/BondDetailScreen";

const STEPS = [
  {
    number: "01",
    title: "Complete Free Signup",
    description:
      "Quick digital KYC — use your existing Demat account. No paperwork, fully online.",
    tags: ["PAN Verification", "Aadhaar-Based eKYC"],
  },
  {
    number: "02",
    title: "Browse & Select Bonds",
    description:
      "Explore curated bond deals with real-time yield data, credit ratings, and detailed issuer profiles.",
    tags: ["Yield Calculator", "Rating Filters"],
  },
  {
    number: "03",
    title: "Invest & Track Returns",
    description:
      "Place your order — bonds settle directly to your Demat. Track payouts and maturity on your dashboard.",
    tags: ["Direct to Demat", "Payout Tracking"],
  },
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const progressRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressTweenRef = useRef<gsap.core.Tween | null>(null);
  const isAnimatingRef = useRef(false);
  const activeStepRef = useRef(0);

  const phoneRef = useRef<Step1PhoneAnimationHandle>(null);
  const phoneContainerRef = useRef<HTMLDivElement>(null);
  const swimWrapperRef = useRef<HTMLDivElement>(null);
  const swimHandleRef = useRef<BondSwimLanesHandle>(null);
  const floatingCardRef = useRef<HTMLDivElement>(null);
  const detailPhoneRef = useRef<HTMLDivElement>(null);
  const cardInPhoneRef = useRef<HTMLDivElement>(null);
  const transitionTlRef = useRef<gsap.core.Timeline | null>(null);

  const startProgressBar = useCallback((index: number, duration: number) => {
    if (progressTweenRef.current) progressTweenRef.current.kill();

    progressRefs.current.forEach((bar, i) => {
      if (!bar) return;
      gsap.set(bar, { scaleX: i < index ? 1 : 0 });
    });

    const activeBar = progressRefs.current[index];
    if (activeBar) {
      progressTweenRef.current = gsap.fromTo(
        activeBar,
        { scaleX: 0 },
        { scaleX: 1, duration, ease: "none" }
      );
    }
  }, []);

  const animateStep = useCallback(
    (index: number, duration: number) => {
      const card = cardRef.current;
      if (!card || isAnimatingRef.current) return;
      isAnimatingRef.current = true;

      const items = card.querySelectorAll(".step-anim-item");
      gsap.killTweensOf(items);

      gsap.to(items, {
        opacity: 0,
        y: 12,
        duration: 0.18,
        stagger: 0.03,
        ease: "power2.in",
        onComplete: () => {
          activeStepRef.current = index;
          setActiveStep(index);
          startProgressBar(index, duration);

          requestAnimationFrame(() => {
            const freshItems = card.querySelectorAll(".step-anim-item");
            gsap.set(freshItems, { opacity: 0, y: -12 });
            gsap.to(freshItems, {
              opacity: 1,
              y: 0,
              duration: 0.28,
              stagger: 0.08,
              ease: "power2.out",
              onComplete: () => {
                isAnimatingRef.current = false;
              },
            });
          });
        },
      });
    },
    [startProgressBar]
  );

  const goToStep = useCallback(
    (index: number, duration: number) => {
      animateStep(index, duration);
    },
    [animateStep]
  );

  const handlePhoneComplete = useCallback(() => {
    const phoneEl = phoneContainerRef.current;
    const swimWrap = swimWrapperRef.current;
    const floatingCard = floatingCardRef.current;
    const detailPhone = detailPhoneRef.current;
    if (!phoneEl || !swimWrap || !floatingCard || !detailPhone) return;

    if (transitionTlRef.current) transitionTlRef.current.kill();

    const scrollInner = detailPhone.querySelector(".detail-scroll-inner") as HTMLElement | null;

    const investBtn = detailPhone.querySelector(".btn-invest") as HTMLElement | null;
    const cardInPhone = cardInPhoneRef.current;

    // Reset all layers
    gsap.set(floatingCard, { opacity: 0, scale: 1, x: 0, y: 0 });
    gsap.set(detailPhone, { opacity: 0, scale: 1, y: 0 });
    if (scrollInner) gsap.set(scrollInner, { y: 0, opacity: 0 });
    if (investBtn) gsap.set(investBtn.parentElement!, { opacity: 0 });
    if (cardInPhone) gsap.set(cardInPhone, { opacity: 0 });

    // Restart swim lane scroll for this cycle
    swimHandleRef.current?.restart();

    const tl = gsap.timeline();
    transitionTlRef.current = tl;

    // ── Left side: Step 02 (Choose bonds) ──
    tl.add(() => goToStep(1, 4));

    // ── Phase 1: Step1 Phone exits ──
    tl.to(phoneEl, { y: 80, opacity: 0, duration: 0.5, ease: "power3.in" });

    // ── Phase 2: Swim lanes enter ──
    tl.fromTo(
      swimWrap,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
    );

    // ── Phase 3: Scroll 3rd card to exact center, then fuse into phone ──
    tl.add(() => {
      tl.pause();

      // Continues scrolling at the same speed until the 3rd card is exactly centered
      swimHandleRef.current?.scrollCardToCenter(2, () => {
        // Card is now at exact center X — floating card at x:0 matches perfectly
        gsap.set(floatingCard, { x: 0, y: 0, opacity: 1, scale: 1 });

        const fadeTl = gsap.timeline({
          onComplete: () => { tl.resume(); },
        });

        // Fade out swim lane
        fadeTl.to(swimWrap, { opacity: 0, duration: 0.5, ease: "power2.in" });

        // Phone appears around the card
        fadeTl.fromTo(
          detailPhone,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" },
          0.2
        );

        // Card only scales down — no x/y movement, just snaps into phone vertically
        fadeTl.to(
          floatingCard,
          { scale: 0.88, duration: 0.6, ease: "power2.inOut" },
          0.2
        );
      });
    });

    // Show the chevron + "show more bonds" overlay inside phone
    if (cardInPhone) {
      tl.to(cardInPhone, { opacity: 1, duration: 0.4, ease: "power2.out" }, "-=0.3");
    }

    // Card fused inside phone — hold
    tl.to({}, { duration: 0.2 });

    // ── Tap effect on fused card to "open" bond detail ──
    tl.to(floatingCard, { scale: 0.85, duration: 0.2, ease: "power2.in" });
    tl.to(floatingCard, { scale: 0.88, duration: 0.2, ease: "back.out(1.7)" });

    // Brief pause after tap
    tl.to({}, { duration: 0.2 });

    // ── Left side: Step 03 (Invest) ──
    tl.add(() => goToStep(2, 5));

    // ── Phase 6: Card morphs to bond detail ──
    tl.to(floatingCard, { opacity: 0, duration: 0.5, ease: "power2.in" });
    if (cardInPhone) {
      tl.to(cardInPhone, { opacity: 0, duration: 0.4, ease: "power2.in" }, "<");
    }

    // Reveal detail screen content
    if (scrollInner) {
      tl.to(scrollInner, { opacity: 1, duration: 0.5, ease: "power2.out" });
    }

    // Show invest button
    if (investBtn) {
      tl.to(investBtn.parentElement!, { opacity: 1, duration: 0.3, ease: "power2.out" }, "-=0.3");
    }

    // Let the user see the top of the detail screen
    tl.to({}, { duration: 0.5 });

    // ── Phase 7: Detail screen scrolls completely to bottom ──
    if (scrollInner) {
      tl.add(() => {
        const parent = scrollInner.parentElement;
        if (!parent) return;
        const scrollDistance = scrollInner.scrollHeight - parent.clientHeight;
        gsap.to(scrollInner, {
          y: -scrollDistance,
          duration: 1,
          ease: "power1.inOut",
        });
      });
      tl.to({}, { duration: 1.7 });
    }

    // ── Phase 8: Invest button tap ──
    tl.to({}, { duration: 0.5 });
    if (investBtn) {
      tl.to(investBtn, { scale: 0.96, duration: 0.1, ease: "power2.in" });
      tl.to(investBtn, { scale: 1, duration: 0.1, ease: "power2.out" });
    }

    // Hold after invest tap
    tl.to({}, { duration: 0.4 });

    // ── Phase 9: Crossfade inside the phone — bond detail → login page ──
    // Fade out detail content and invest button inside the phone
    if (scrollInner) {
      tl.to(scrollInner, { opacity: 0, duration: 0.2, ease: "power2.in" });
    }
    if (investBtn) {
      tl.to(investBtn.parentElement!, { opacity: 0, duration: 0.3, ease: "power2.in" }, "<");
    }

    // Reset Step1 phone screens to initial state (App Home visible) without starting animation
    tl.add(() => {
      phoneRef.current?.resetOnly();
    });

    // Position Step1 phone on top of detail phone, invisible
    tl.set(phoneEl, { y: 0, opacity: 0 });

    // Crossfade: detail phone out, Step1 phone in — phone frame stays in place
    tl.to(detailPhone, { opacity: 0, duration: 0.5, ease: "power2.inOut" });
    tl.to(phoneEl, { opacity: 1, duration: 0.5, ease: "power2.inOut" }, "<");

    // Now that Step1 phone is visible with App Home, start its animation
    tl.add(() => {
      goToStep(0, 6);
      phoneRef.current?.play();
    });

    // Reset detail layers for next loop
    tl.set(floatingCard, { opacity: 0, scale: 1, x: 0, y: 0 });
    if (scrollInner) tl.set(scrollInner, { y: 0, opacity: 0 });
    if (investBtn) tl.set(investBtn.parentElement!, { opacity: 0 });
    if (cardInPhone) tl.set(cardInPhone, { opacity: 0 });

    // Reset swim lane cards and overlays so they're visible for the next cycle
    tl.add(() => {
      const allCards = swimWrap.querySelectorAll("[data-lane-card]");
      allCards.forEach((card) => gsap.set(card, { opacity: 1 }));
      const overlays = swimWrap.querySelectorAll(".pointer-events-none");
      overlays.forEach((el) => gsap.set(el, { opacity: 1 }));
    });
  }, [goToStep]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from(".process-header-item", {
        scrollTrigger: { trigger: section, start: "top 80%" },
        y: 30,
        opacity: 0,
        stagger: 0.12,
        duration: 0.6,
        ease: "power3.out",
      });

      gsap.from(".process-left", {
        scrollTrigger: { trigger: section, start: "top 75%" },
        x: -40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".process-right", {
        scrollTrigger: { trigger: section, start: "top 75%" },
        x: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2,
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        once: true,
        onEnter: () => {
          startProgressBar(0, 6);
          phoneRef.current?.play();
        },
      });
    }, section);

    return () => {
      ctx.revert();
      if (progressTweenRef.current) progressTweenRef.current.kill();
    };
  }, [startProgressBar]);

  const step = STEPS[activeStep];

  return (
    <section
      ref={sectionRef}
      className="bg-white py-[140px]"
    >
      <div className="section-container">
        {/* Content — two equal columns */}
        <div className="flex items-stretch gap-12 lg:gap-16">
          {/* ─── Left Column (50%) ─── */}
          <div className="process-left flex w-1/2 flex-col">
            {/* Header */}
            <div className="mb-12">
              <p className="process-header-item text-xl font-semibold leading-[1.3] tracking-tight text-teal-600">
                Simple Process
              </p>
              <div className="mt-3">
                <h2 className="process-header-item text-4xl font-semibold leading-[1.3] tracking-tight text-gray-700">
                  Start Investing in 3 Simple Steps
                </h2>
                <p className="process-header-item mt-1 text-base leading-relaxed text-gray-500">
                  Fast, paperless, completely digital.
                </p>
              </div>
            </div>

            {/* Step Card — box stays, content animates progressively */}
            <div
              ref={cardRef}
              className="flex h-[434px] flex-col justify-between overflow-hidden rounded-lg bg-teal-900 p-8"
            >
              {/* Top: animated content */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <p className="step-anim-item text-[56px] font-medium leading-[1.3] text-white">
                    {step.number}
                  </p>
                  {/* Progress bars */}
                  <div className="flex items-center gap-2">
                    {STEPS.map((_, i) => (
                      <div
                        key={i}
                        className="h-[3px] w-6 overflow-hidden rounded-full bg-white/30"
                      >
                        <div
                          ref={(el) => { progressRefs.current[i] = el; }}
                          className="h-full w-full origin-left rounded-full bg-white"
                          style={{ transform: "scaleX(0)" }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <p className="step-anim-item text-[30px] font-medium leading-[1.3] text-[#09C28A]">
                    {step.title}
                  </p>
                  <p className="step-anim-item text-xl leading-relaxed text-white">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Bottom: tags pinned at bottom of card */}
              <div className="step-anim-item flex flex-wrap gap-3">
                {step.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded bg-[#51e5b8] px-2.5 py-1.5 text-base text-black"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom bar */}
            <div className="mt-11 flex items-center justify-between gap-3">
              <p className="text-xl font-medium leading-[1.3] tracking-tight text-gray-500">
                Investors are currently allocating capital to active credit
                issues.
              </p>
              <a
                href="#"
                className="inline-flex h-14 shrink-0 items-center gap-2.5 rounded-full bg-teal-900 px-6 text-lg font-semibold text-white transition-colors hover:bg-teal-900/90"
              >
                KYC in 2 mins
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

          {/* ─── Right Column (50%) — iPhone + Grid BG ─── */}
          <div className="process-right relative hidden w-1/2 items-center justify-center lg:flex">
            {/* Grid background */}
            <div className="relative h-full w-full overflow-hidden rounded backdrop-blur-sm">
              <img
                src="/assets/simple-process-bg.svg"
                alt=""
                className="absolute left-1/2 top-1/2 h-full w-auto -translate-x-1/2 -translate-y-1/2 opacity-50"
              />
            </div>

            {/* Step1 Phone overlay — flex wrapper for centering, GSAP animates inner div */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div ref={phoneContainerRef} className="pointer-events-auto">
                <Step1PhoneAnimation ref={phoneRef} onComplete={handlePhoneComplete} autoPlay={false} />
              </div>
            </div>

            {/* Bond swim lanes (initially hidden) */}
            <div
              ref={swimWrapperRef}
              className="absolute inset-0 flex items-center"
              style={{ opacity: 0 }}
            >
              <BondSwimLanes ref={swimHandleRef} />
            </div>

            {/* Detail phone (initially hidden) */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div ref={detailPhoneRef} className="pointer-events-auto" style={{ opacity: 0 }}>
                <IPhoneFrame className="w-[340px] drop-shadow-2xl">
                  <div className="relative h-full">
                    {/* Bond detail screen (content hidden initially) */}
                    <BondDetailScreen />

                    {/* Card-in-phone overlay: chevron + "show more bonds" (hidden initially) */}
                    <div
                      ref={cardInPhoneRef}
                      className="absolute inset-0 z-30 flex flex-col bg-gray-100"
                      style={{ opacity: 0 }}
                    >
                      {/* Chevron back */}
                      <div className="px-4 pt-14">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M15 18L9 12L15 6"
                            stroke="#1e2130"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>

                      {/* Spacer — card floats here via the floating card layer */}
                      <div className="flex-1" />

                      {/* Show more bonds button */}
                      <div className="px-4 pb-10">
                        <button className="flex h-11 w-full items-center justify-center rounded-lg bg-[#00453b] text-sm font-medium text-white">
                          Show more bonds
                        </button>
                      </div>
                    </div>
                  </div>
                </IPhoneFrame>
              </div>
            </div>

            {/* Floating bond card (initially hidden, z-10 above detail phone) */}
            <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
              <div ref={floatingCardRef} className="pointer-events-auto" style={{ opacity: 0 }}>
                <BondCard
                  issuer="Axis Bank NCD"
                  category="Private Bank – Corporate Finance"
                  yieldPercent={9.0}
                  rating="AA"
                  minInvestment="~ ₹ 10,000/-"
                  tenure="15 M to 30 M"
                  payout="Semi-Annual"
                  soldPercent={85}
                  progressColor="#EF4444"
                  className="w-[320px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
