"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    question: "What are bonds and how do they work?",
    answer:
      "Bonds are fixed-income debt instruments issued by governments, corporations, and PSUs to raise capital. When you invest in a bond, you lend money to the issuer and receive periodic interest (coupon) payments plus the principal at maturity. Bonds on DigiBonds are exchange-listed on NSE/BSE, offering transparency and liquidity.",
  },
  {
    question: "What is the minimum investment amount?",
    answer:
      "You can start investing from as low as ₹1,000 depending on the bond. Most corporate NCDs have a face value of ₹1,000, making them accessible to retail investors. Some bonds may have higher minimums based on lot size requirements.",
  },
  {
    question: "Are my investments safe on BondsIndia?",
    answer:
      "All bonds on our platform are exchange-listed and regulated by SEBI. Government bonds carry sovereign guarantee. Corporate bonds carry credit risk — we display credit ratings (AAA, AA+, etc.) for every bond. Your bonds settle directly to your Demat account, so you retain full ownership at all times.",
  },
  {
    question: "How do I receive my interest payouts?",
    answer:
      "Interest payouts are credited directly to your registered bank account on the coupon payment dates. Depending on the bond, payouts may be monthly, quarterly, semi-annual, or annual. You can track all upcoming payment dates on your DigiBonds dashboard.",
  },
  {
    question: "Can I sell my bonds before maturity?",
    answer:
      "Yes. Since all bonds on DigiBonds are exchange-listed on NSE/BSE, you can sell them on the exchange before maturity at the prevailing market price. Liquidity may vary depending on the bond and market conditions. Settlement follows the standard T+1 cycle.",
  },
];

import Image from "next/image";

function FAQItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: (typeof FAQS)[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-5 py-6 text-left"
      >
        <span className="text-lg font-regular leading-relaxed text-gray-700">
          {faq.question}
        </span>
        <Image
          src="/assets/chevron-down.svg"
          alt=""
          width={24}
          height={24}
          className={cn(
            "shrink-0 transition-transform duration-300",
            isOpen && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-base leading-relaxed text-gray-500">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="h-px w-full bg-gray-100" />
    </div>
  );
}

export function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".faq-header", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power3.out",
      });

      gsap.from(".faq-item", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.5,
        ease: "power3.out",
      });

      gsap.from(".faq-video", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.3,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="faq" className="bg-white py-[140px]">
      <div className="section-container">
        {/* ─── Centered header ─── */}
        <div className="mb-12 flex flex-col gap-3 text-center">
          <h2 className="faq-header text-[32px] font-semibold leading-[1.3] tracking-tight text-gray-700">
            Frequently Asked Questions
          </h2>
          <p className="faq-header text-base leading-relaxed text-gray-500">
            Everything you need to know about credit investing on DigiBonds.
          </p>
        </div>

        {/* ─── Two-column: FAQs + Video ─── */}
        <div className="flex items-start gap-[60px]">
          {/* Left — FAQ accordion */}
          <div className="w-1/2">
            {FAQS.map((faq, index) => (
              <div key={faq.question} className="faq-item">
                <FAQItem
                  faq={faq}
                  isOpen={openIndex === index}
                  onToggle={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                />
              </div>
            ))}
          </div>

          {/* Right — Video placeholder */}
          <div className="faq-video hidden w-1/2 lg:block">
            <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg bg-black">
              <button className="flex h-[54px] w-[54px] items-center justify-center rounded-full border-2 border-white/30 text-white transition-colors hover:border-white/60">
                <svg
                  className="ml-0.5 h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
