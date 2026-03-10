"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const ROW_1 = [
  {
    name: "Courtney Henry",
    avatar: "https://i.pravatar.cc/72?img=1",
    review:
      "Excellent platform for bond investing. The interface is intuitive and the yield options are far better than what my bank offers. Highly recommend for anyone looking at fixed income.",
  },
  {
    name: "Jacob Jones",
    avatar: "https://i.pravatar.cc/72?img=11",
    review:
      "Seamless KYC process and direct demat settlement. I was investing within minutes. The customer support team is responsive and really knows their products.",
  },
  {
    name: "Darlene Robertson",
    avatar: "https://i.pravatar.cc/72?img=5",
    review:
      "As a first-time bond investor, DigiBonds made everything simple. Clear credit ratings, transparent pricing, and the yield calculator helped me make informed decisions.",
  },
  {
    name: "Kathryn Murphy",
    avatar: "https://i.pravatar.cc/72?img=9",
    review:
      "I moved a significant portion of my FD portfolio to bonds through DigiBonds. The returns are noticeably better and the liquidity from exchange listing is a big plus.",
  },
  {
    name: "Robert Fox",
    avatar: "https://i.pravatar.cc/72?img=3",
    review:
      "The curated bond deals are impressive. Every listing has detailed issuer profiles and risk metrics. This level of transparency is rare in the Indian bond market.",
  },
  {
    name: "Leslie Alexander",
    avatar: "https://i.pravatar.cc/72?img=16",
    review:
      "Portfolio tracking is excellent. I can see all my bond holdings, upcoming coupon dates, and maturity schedules in one clean dashboard. Very well designed platform.",
  },
];

const ROW_2 = [
  {
    name: "Aarav Patel",
    avatar: "https://i.pravatar.cc/72?img=12",
    review:
      "Finally a platform that makes corporate bonds accessible to retail investors. The minimum investment of ₹10K opened doors that were previously shut for small investors like me.",
  },
  {
    name: "Meera Krishnan",
    avatar: "https://i.pravatar.cc/72?img=25",
    review:
      "I've been using DigiBonds for 8 months now. The tax-free bond options are great for my tax bracket. The monthly payout feature has become a reliable income source.",
  },
  {
    name: "Vikram Sharma",
    avatar: "https://i.pravatar.cc/72?img=7",
    review:
      "What sets DigiBonds apart is the quality of bond issuers. AAA-rated PSU bonds, well-known NBFC NCDs — everything is vetted and clearly presented. Trust is paramount here.",
  },
  {
    name: "Ananya Desai",
    avatar: "https://i.pravatar.cc/72?img=20",
    review:
      "The mobile experience is just as good as desktop. I purchased government bonds on my commute. The order confirmation and settlement tracking are very professional.",
  },
  {
    name: "Suresh Nair",
    avatar: "https://i.pravatar.cc/72?img=14",
    review:
      "Compared to other platforms I tried, DigiBonds has the best selection and the lowest fees. The real-time yield data helps me time my investments better.",
  },
  {
    name: "Priya Reddy",
    avatar: "https://i.pravatar.cc/72?img=23",
    review:
      "Outstanding experience overall. From signup to first investment took under 15 minutes. The educational content on bond basics was also very helpful for me.",
  },
];

function StarIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 6.25L24.12 14.58L33.33 15.92L26.67 22.42L28.24 31.58L20 27.25L11.76 31.58L13.33 22.42L6.67 15.92L15.88 14.58L20 6.25Z"
        fill="#FDCA00"
        stroke="#FDCA00"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface ReviewCardProps {
  name: string;
  avatar: string;
  review: string;
}

function ReviewCard({ name, avatar, review }: ReviewCardProps) {
  return (
    <div className="w-[330px] shrink-0 rounded-lg border border-gray-100 bg-white p-3">
      <div className="flex items-center gap-2">
        <img
          src={avatar}
          alt={name}
          className="h-9 w-9 rounded-full object-cover"
        />
        <p className="text-base font-semibold leading-relaxed text-gray-600">
          {name}
        </p>
      </div>
      <p className="mt-3 line-clamp-3 text-base leading-relaxed text-gray-500">
        {review}
      </p>
    </div>
  );
}

export function GoogleReviews() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".gr-header", {
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

  return (
    <section ref={sectionRef} className="relative bg-gray-100 py-[140px]">
      {/* ─── Header ─── */}
      <div className="section-container mb-12 flex items-center justify-between">
        <div className="gr-header flex flex-col gap-3">
          <p className="text-xl font-semibold leading-[1.3] tracking-tight text-teal-600">
            Investor Stories
          </p>
          <h2 className="text-4xl font-semibold leading-[1.3] tracking-tight text-gray-700">
            Trusted by Retail Investors
          </h2>
        </div>
        <div className="gr-header flex flex-col items-start gap-1">
          <div className="flex items-center gap-2">
            <p className="text-5xl font-medium leading-[1.2] tracking-tight text-gray-700">
              4.7
            </p>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} />
              ))}
            </div>
          </div>
          <p className="text-base leading-relaxed text-gray-500">
            Based on 250+ reviews
          </p>
        </div>
      </div>

      {/* ─── Marquee swimlanes ─── */}
      <div className="relative overflow-hidden">
        <div className="flex flex-col gap-3">
          {/* Row 1 — right to left */}
          <div className="marquee-row-rtl flex gap-[15px]">
            {[...ROW_1, ...ROW_1].map((r, i) => (
              <ReviewCard key={`r1-${i}`} {...r} />
            ))}
          </div>

          {/* Row 2 — left to right */}
          <div className="marquee-row-ltr flex gap-[15px]">
            {[...ROW_2, ...ROW_2].map((r, i) => (
              <ReviewCard key={`r2-${i}`} {...r} />
            ))}
          </div>
        </div>

        {/* Edge fade gradients */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[200px] bg-gradient-to-r from-gray-100 via-gray-100/80 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[200px] bg-gradient-to-l from-gray-100 via-gray-100/80 to-transparent" />
      </div>
    </section>
  );
}
