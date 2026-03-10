"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "Creative Director, Studio Forma",
    avatar: "https://i.pravatar.cc/104?img=5",
    quote:
      "The attention to detail and creative vision transformed our brand identity completely.",
  },
  {
    name: "Rajesh Mehta",
    role: "Retail Investor",
    avatar: "https://i.pravatar.cc/104?img=12",
    quote:
      "DigiBonds made bond investing simple. I was able to invest in government bonds from my phone in under 10 minutes. The yields have been consistent and reliable.",
  },
  {
    name: "Priya Sharma",
    role: "First-time Investor",
    avatar: "https://i.pravatar.cc/104?img=9",
    quote:
      "As someone new to bonds, the platform's interface and curated recommendations gave me the confidence to start. Already seeing 9.5% returns on my portfolio.",
  },
  {
    name: "Arun Gupta",
    role: "HNI Investor",
    avatar: "https://i.pravatar.cc/104?img=8",
    quote:
      "The tax-free bond options and the ability to trade on exchange are exactly what I was looking for. Great platform for serious fixed-income investors.",
  },
];

const CYCLE_DURATION = 5000;

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const animateTo = useCallback((index: number) => {
    const content = contentRef.current;
    if (!content || isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const items = content.querySelectorAll(".testimonial-anim");
    gsap.to(items, {
      opacity: 0,
      y: 10,
      duration: 0.2,
      stagger: 0.03,
      ease: "power2.in",
      onComplete: () => {
        activeRef.current = index;
        setActiveIndex(index);
        requestAnimationFrame(() => {
          const fresh = content.querySelectorAll(".testimonial-anim");
          gsap.set(fresh, { opacity: 0, y: -10 });
          gsap.to(fresh, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            stagger: 0.05,
            ease: "power2.out",
            onComplete: () => {
              isAnimatingRef.current = false;
            },
          });
        });
      },
    });
  }, []);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (isAnimatingRef.current) return;
      const next = (activeRef.current + 1) % TESTIMONIALS.length;
      animateTo(next);
    }, CYCLE_DURATION);
  }, [animateTo]);

  const goNext = useCallback(() => {
    if (isAnimatingRef.current) return;
    const next = (activeRef.current + 1) % TESTIMONIALS.length;
    animateTo(next);
    startTimer();
  }, [animateTo, startTimer]);

  const goPrev = useCallback(() => {
    if (isAnimatingRef.current) return;
    const prev =
      (activeRef.current - 1 + TESTIMONIALS.length) % TESTIMONIALS.length;
    animateTo(prev);
    startTimer();
  }, [animateTo, startTimer]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".testimonial-entrance", {
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
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const t = TESTIMONIALS[activeIndex];
  const counter = `${String(activeIndex + 1).padStart(2, "0")}/${String(TESTIMONIALS.length).padStart(2, "0")}`;

  return (
    <section ref={sectionRef} className="bg-white py-[140px]">
      <div className="section-container flex flex-col items-center">
        {/* ─── Avatar group ─── */}
        <div className="testimonial-entrance flex gap-2">
          {TESTIMONIALS.map((person, i) => (
            <img
              key={person.name}
              src={person.avatar}
              alt={person.name}
              className="h-12 w-12 rounded-full border-2 object-cover"
              style={{
                borderColor: i === activeIndex ? "#00DDC3" : "#E5E5E5",
              }}
            />
          ))}
        </div>

        {/* ─── Heading ─── */}
        <h2 className="testimonial-entrance mt-4 text-4xl font-semibold leading-[1.3] tracking-tight text-gray-700">
          What our users are saying
        </h2>

        {/* ─── Testimonial content (animated, fixed height) ─── */}
        <div
          ref={contentRef}
          className="mt-12 flex h-[200px] flex-col items-center justify-center gap-8"
        >
          {/* Quote */}
          <p className="testimonial-anim max-w-[640px] text-center text-xl leading-[1.3] tracking-tight text-gray-800">
            {t.quote}
          </p>

          {/* Author */}
          <div className="testimonial-anim flex items-center gap-3">
            <img
              src={t.avatar}
              alt={t.name}
              className="h-16 w-16 rounded-full object-cover"
            />
            <div className="flex flex-col gap-0.5">
              <p className="text-base font-bold leading-relaxed text-gray-800">
                {t.name}
              </p>
              <p className="text-base leading-relaxed text-gray-500">
                {t.role}
              </p>
            </div>
          </div>
        </div>

        {/* ─── Navigation ─── */}
        <div className="mt-12 flex w-full max-w-[640px] items-center justify-between">
          {/* Progress bars + counter */}
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1.5">
              {TESTIMONIALS.map((_, i) => (
                <div
                  key={i}
                  className="h-[2px] rounded-full transition-all duration-300"
                  style={{
                    width: i === activeIndex ? 40 : 28,
                    backgroundColor:
                      i === activeIndex ? "#2D3142" : "#D9DADE",
                  }}
                />
              ))}
            </div>
            <p className="text-base font-semibold tracking-[1.6px] text-gray-800">
              {counter}
            </p>
          </div>

          {/* Prev / Next arrows */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={goPrev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition-colors hover:border-gray-400"
            >
              <Image
                src="/assets/chevron-right.svg"
                alt="Previous"
                width={20}
                height={20}
                className="rotate-180"
              />
            </button>
            <button
              onClick={goNext}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition-colors hover:border-gray-400"
            >
              <Image
                src="/assets/chevron-right.svg"
                alt="Next"
                width={20}
                height={20}
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
