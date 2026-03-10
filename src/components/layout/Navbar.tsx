"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { gsap } from "@/lib/gsap";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Deals", href: "#bonds" },
  { label: "Why Us", href: "#why-choose" },
  { label: "Returns", href: "#smart-allocation" },
  { label: "FAQs", href: "#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.from(navRef.current, {
      y: -30,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
    });
  }, []);

  return (
    <nav
      ref={navRef}
      className={cn(
        "fixed inset-x-0 top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-white shadow-sm"
          : "bg-white"
      )}
    >
      <div className="section-container flex h-[88px] items-center justify-between">
        {/* Logo */}
        <a href="#" className="shrink-0">
          <Image
            src="/assets/digibonds-logo.svg"
            alt="DigiBonds"
            width={150}
            height={48}
            className="h-12 w-auto"
            priority
          />
        </a>

        {/* Right group: nav links + sign up */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-base font-normal text-[--text-primary] transition-colors hover:text-teal-400"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#"
            className="rounded-full border border-teal-900 px-5 py-3 text-base font-semibold text-teal-900 transition-colors hover:bg-teal-900 hover:text-white"
          >
            Sign up
          </a>
        </div>

        {/* Mobile: hamburger */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-5 w-5 text-[--text-primary]" />
            ) : (
              <Menu className="h-5 w-5 text-[--text-primary]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "overflow-hidden border-b border-[--border] bg-[--bg-primary] transition-all duration-300 md:hidden",
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 border-none opacity-0"
        )}
      >
        <div className="flex flex-col gap-1 px-6 pb-6 pt-2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-3 text-base font-normal text-[--text-primary] transition-colors hover:bg-[--bg-secondary]"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#"
            className="mt-3 rounded-full border border-teal-900 px-5 py-3 text-center text-base font-semibold text-teal-900 transition-colors hover:bg-teal-900 hover:text-white"
          >
            Sign up
          </a>
        </div>
      </div>
    </nav>
  );
}
