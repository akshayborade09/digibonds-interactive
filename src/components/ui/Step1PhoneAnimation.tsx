"use client";

import { useEffect, useRef, useState, useCallback, useImperativeHandle, forwardRef } from "react";
import { gsap } from "@/lib/gsap";
import { IPhoneFrame } from "@/components/ui/IPhoneFrame";
import { AppHomeScreen } from "@/components/ui/screens/AppHomeScreen";
import { EnterMobileScreen } from "@/components/ui/screens/EnterMobileScreen";
import { OTPScreen } from "@/components/ui/screens/OTPScreen";
import { WelcomeScreen } from "@/components/ui/screens/WelcomeScreen";

const PHONE_NUMBER = "8655348912";
const OTP_CODE = "847291";

const KEYBOARD_ROWS = [
  [
    { digit: "1", sub: "" },
    { digit: "2", sub: "ABC" },
    { digit: "3", sub: "DEF" },
  ],
  [
    { digit: "4", sub: "GHI" },
    { digit: "5", sub: "JKL" },
    { digit: "6", sub: "MNO" },
  ],
  [
    { digit: "7", sub: "PQRS" },
    { digit: "8", sub: "TUV" },
    { digit: "9", sub: "WXYZ" },
  ],
];

function LiquidGlassKeyboard() {
  return (
    <div className="px-1 pb-4 pt-2 backdrop-blur-2xl" style={{ background: "rgba(209, 213, 219, 0.55)" }}>
      <div className="flex flex-col gap-1.5">
        {KEYBOARD_ROWS.map((row, ri) => (
          <div key={ri} className="flex gap-1.5">
            {row.map((key) => (
              <div
                key={key.digit}
                data-key={key.digit}
                className="flex flex-1 flex-col items-center justify-center rounded-xl py-1.5"
                style={{
                  background: "rgba(255, 255, 255, 0.72)",
                  backdropFilter: "blur(12px)",
                  boxShadow:
                    "0 0.5px 0 rgba(255,255,255,0.6) inset, 0 1px 3px rgba(0,0,0,0.08), 0 0.5px 1px rgba(0,0,0,0.06)",
                }}
              >
                <span className="text-lg font-medium leading-tight text-black">
                  {key.digit}
                </span>
                {key.sub && (
                  <span className="text-[7px] font-semibold tracking-[0.1em] text-gray-500">
                    {key.sub}
                  </span>
                )}
              </div>
            ))}
          </div>
        ))}
        <div className="flex gap-1.5">
          <div className="flex-1" />
          <div
            data-key="0"
            className="flex flex-1 items-center justify-center rounded-xl py-1.5"
            style={{
              background: "rgba(255, 255, 255, 0.72)",
              backdropFilter: "blur(12px)",
              boxShadow:
                "0 0.5px 0 rgba(255,255,255,0.6) inset, 0 1px 3px rgba(0,0,0,0.08), 0 0.5px 1px rgba(0,0,0,0.06)",
            }}
          >
            <span className="text-lg font-medium leading-tight text-black">0</span>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
              <path
                d="M6.5 1H17.5C18.3284 1 19 1.67157 19 2.5V13.5C19 14.3284 18.3284 15 17.5 15H6.5C6.1 15 5.72 14.84 5.44 14.56L1 10L5.44 1.44C5.72 1.16 6.1 1 6.5 1Z"
                stroke="#1e2130"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M13 5.5L9.5 10.5M9.5 5.5L13 10.5" stroke="#1e2130" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export interface Step1PhoneAnimationHandle {
  reset: () => void;
  resetOnly: () => void;
  play: () => void;
}

interface Step1PhoneAnimationProps {
  onComplete?: () => void;
  autoPlay?: boolean;
}

export const Step1PhoneAnimation = forwardRef<Step1PhoneAnimationHandle, Step1PhoneAnimationProps>(function Step1PhoneAnimation({ onComplete, autoPlay = true }, fwdRef) {
  const containerRef = useRef<HTMLDivElement>(null);
  const screen1Ref = useRef<HTMLDivElement>(null);
  const screen2Ref = useRef<HTMLDivElement>(null);
  const screen3Ref = useRef<HTMLDivElement>(null);
  const screen4Ref = useRef<HTMLDivElement>(null);
  const keyboard1Ref = useRef<HTMLDivElement>(null);
  const keyboard2Ref = useRef<HTMLDivElement>(null);
  const tapRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const resendIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [typedDigits, setTypedDigits] = useState("");
  const [otpDigits, setOtpDigits] = useState<string[]>([]);
  const [resendTimer, setResendTimer] = useState(30);

  const animateKeyPress = useCallback(
    (keyboardEl: HTMLElement, digit: string) => {
      const keyEl = keyboardEl.querySelector(`[data-key="${digit}"]`);
      if (!keyEl) return;
      gsap.to(keyEl, {
        scale: 0.85,
        duration: 0.06,
        ease: "power2.in",
        onComplete: () => {
          gsap.to(keyEl, {
            scale: 1,
            duration: 0.1,
            ease: "power2.out",
          });
        },
      });
    },
    []
  );

  const buildTimeline = useCallback(() => {
    const container = containerRef.current;
    const screen1 = screen1Ref.current;
    const screen2 = screen2Ref.current;
    const screen3 = screen3Ref.current;
    const screen4 = screen4Ref.current;
    const keyboard1 = keyboard1Ref.current;
    const keyboard2 = keyboard2Ref.current;
    const tap = tapRef.current;
    if (!container || !screen1 || !screen2 || !screen3 || !screen4 || !keyboard1 || !keyboard2 || !tap)
      return;

    if (timelineRef.current) timelineRef.current.kill();
    if (resendIntervalRef.current) clearInterval(resendIntervalRef.current);

    gsap.set(screen2, { xPercent: 100 });
    gsap.set(screen3, { xPercent: 100 });
    gsap.set(screen4, { xPercent: 100 });
    gsap.set(keyboard1, { yPercent: 100 });
    gsap.set(keyboard2, { yPercent: 100 });
    gsap.set(tap, { opacity: 0, scale: 0 });
    setTypedDigits("");
    setOtpDigits([]);
    setResendTimer(30);

    // Reset welcome screen elements
    const checkImg = screen4.querySelector(".welcome-check-img");
    const welcomeText = screen4.querySelector(".welcome-text");
    if (checkImg) gsap.set(checkImg, { rotation: 3, scale: 0, opacity: 0 });
    if (welcomeText) gsap.set(welcomeText, { y: 20, opacity: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) {
          onComplete();
        } else {
          gsap.delayedCall(2, () => resetAnimation());
        }
      },
    });

    // ── SCREEN 1: App Home ──

    tl.to({}, { duration: 1.2 });

    // Tap indicator
    tl.to(tap, { opacity: 1, scale: 1, duration: 0.2, ease: "power2.out" });
    tl.to(tap, { scale: 0.85, duration: 0.15, ease: "power2.in" });
    tl.to(tap, { scale: 1, opacity: 0, duration: 0.2, ease: "power2.out" });

    const btn = container.querySelector(".btn-continue-mobile");
    if (btn) {
      tl.to(btn, { scale: 0.96, duration: 0.1, ease: "power2.in" }, "-=0.3");
      tl.to(btn, { scale: 1, duration: 0.1, ease: "power2.out" });
    }

    // ── SCREEN 2: Enter Mobile ──

    tl.to(screen1, { xPercent: -100, duration: 0.4, ease: "power3.inOut" });
    tl.to(screen2, { xPercent: 0, duration: 0.4, ease: "power3.inOut" }, "<");

    tl.to({}, { duration: 0.2 });
    tl.to(keyboard1, { yPercent: 0, duration: 0.35, ease: "power2.out" });

    // Reveal the full number instantly with blur-to-clear effect
    tl.add(() => {
      setTypedDigits(PHONE_NUMBER);
      requestAnimationFrame(() => {
        const digitSpan = screen2.querySelector(".phone-digits");
        if (digitSpan) {
          gsap.fromTo(
            digitSpan,
            { filter: "blur(8px)", opacity: 0.3 },
            { filter: "blur(0px)", opacity: 1, duration: 0.6, ease: "power2.out" }
          );
        }
      });
    });

    tl.to({}, { duration: 0.3 });

    // Continue button press, then keyboard slides down
    tl.add(() => {
      const continueBtn = screen2.querySelector(".btn-enter-continue");
      if (continueBtn) {
        gsap.to(continueBtn, {
          scale: 0.96,
          duration: 0.1,
          ease: "power2.in",
          onComplete: () => {
            gsap.to(continueBtn, { scale: 1, duration: 0.1, ease: "power2.out" });
          },
        });
      }
    });
    tl.to({}, { duration: 0.15 });
    tl.to(keyboard1, { yPercent: 100, duration: 0.3, ease: "power2.in" });
    tl.to({}, { duration: 0.2 });

    // ── SCREEN 3: OTP ──

    tl.to(screen2, { xPercent: -100, duration: 0.4, ease: "power3.inOut" });
    tl.to(screen3, { xPercent: 0, duration: 0.4, ease: "power3.inOut" }, "<");

    // Keyboard slides up on OTP screen
    tl.to({}, { duration: 0.2 });
    tl.to(keyboard2, { yPercent: 0, duration: 0.35, ease: "power2.out" });

    // Reveal all OTP digits at once with blur-to-clear effect
    tl.add(() => {
      setOtpDigits(OTP_CODE.split(""));
      requestAnimationFrame(() => {
        const boxes = screen3.querySelectorAll("[data-otp-box]");
        boxes.forEach((box, i) => {
          gsap.fromTo(
            box,
            { filter: "blur(6px)", opacity: 0.3 },
            { filter: "blur(0px)", opacity: 1, duration: 0.5, delay: i * 0.05, ease: "power2.out" }
          );
        });
      });
    });

    tl.to({}, { duration: 0.3 });

    // Start resend countdown
    tl.add(() => {
      let count = 30;
      resendIntervalRef.current = setInterval(() => {
        count--;
        setResendTimer(count);
        if (count <= 25) {
          if (resendIntervalRef.current) clearInterval(resendIntervalRef.current);
        }
      }, 1000);
    });

    // Pause, then Continue press, then keyboard down
    tl.to({}, { duration: 0.3 });
    tl.add(() => {
      const otpBtn = screen3.querySelector(".btn-otp-continue");
      if (otpBtn) {
        gsap.to(otpBtn, {
          scale: 0.96,
          duration: 0.1,
          ease: "power2.in",
          onComplete: () => {
            gsap.to(otpBtn, { scale: 1, duration: 0.1, ease: "power2.out" });
          },
        });
      }
    });
    tl.to({}, { duration: 0.15 });
    tl.to(keyboard2, { yPercent: 100, duration: 0.3, ease: "power2.in" });
    tl.to({}, { duration: 0.2 });

    // ── SCREEN 4: Welcome ──

    tl.to(screen3, { xPercent: -100, duration: 0.4, ease: "power3.inOut" });
    tl.to(screen4, { xPercent: 0, duration: 0.4, ease: "power3.inOut" }, "<");

    // Welcome check animation: scale up from 0 with 3deg rotation → 0deg
    tl.to({}, { duration: 0.2 });
    if (checkImg) {
      tl.to(checkImg, {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 0.6,
        ease: "back.out(1.4)",
      });
    }
    if (welcomeText) {
      tl.to(
        welcomeText,
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
        "-=0.3"
      );
    }

    // Hold welcome
    tl.to({}, { duration: 0.3 });

    timelineRef.current = tl;
  }, [animateKeyPress, onComplete]);

  const resetAnimation = useCallback(() => {
    const screen1 = screen1Ref.current;
    const screen2 = screen2Ref.current;
    const screen3 = screen3Ref.current;
    const screen4 = screen4Ref.current;
    const keyboard1 = keyboard1Ref.current;
    const keyboard2 = keyboard2Ref.current;
    const tap = tapRef.current;
    if (!screen1 || !screen2 || !screen3 || !screen4 || !keyboard1 || !keyboard2 || !tap) return;

    if (timelineRef.current) timelineRef.current.kill();
    if (resendIntervalRef.current) clearInterval(resendIntervalRef.current);

    setTypedDigits("");
    setOtpDigits([]);
    setResendTimer(30);
    gsap.set(screen1, { xPercent: 0 });
    gsap.set(screen2, { xPercent: 100 });
    gsap.set(screen3, { xPercent: 100 });
    gsap.set(screen4, { xPercent: 100 });
    gsap.set(keyboard1, { yPercent: 100 });
    gsap.set(keyboard2, { yPercent: 100 });
    gsap.set(tap, { opacity: 0, scale: 0 });

    [keyboard1, keyboard2].forEach((kb) => {
      kb.querySelectorAll("[data-key]").forEach((k) =>
        gsap.set(k, { scale: 1 })
      );
    });

    gsap.delayedCall(0.3, buildTimeline);
  }, [buildTimeline]);

  const resetOnly = useCallback(() => {
    const screen1 = screen1Ref.current;
    const screen2 = screen2Ref.current;
    const screen3 = screen3Ref.current;
    const screen4 = screen4Ref.current;
    const keyboard1 = keyboard1Ref.current;
    const keyboard2 = keyboard2Ref.current;
    const tap = tapRef.current;
    if (!screen1 || !screen2 || !screen3 || !screen4 || !keyboard1 || !keyboard2 || !tap) return;

    if (timelineRef.current) timelineRef.current.kill();
    if (resendIntervalRef.current) clearInterval(resendIntervalRef.current);

    setTypedDigits("");
    setOtpDigits([]);
    setResendTimer(30);
    gsap.set(screen1, { xPercent: 0 });
    gsap.set(screen2, { xPercent: 100 });
    gsap.set(screen3, { xPercent: 100 });
    gsap.set(screen4, { xPercent: 100 });
    gsap.set(keyboard1, { yPercent: 100 });
    gsap.set(keyboard2, { yPercent: 100 });
    gsap.set(tap, { opacity: 0, scale: 0 });

    [keyboard1, keyboard2].forEach((kb) => {
      kb.querySelectorAll("[data-key]").forEach((k) =>
        gsap.set(k, { scale: 1 })
      );
    });
  }, []);

  useImperativeHandle(
    fwdRef,
    () => ({
      reset: resetAnimation,
      resetOnly,
      play: () => buildTimeline(),
    }),
    [resetAnimation, resetOnly, buildTimeline]
  );

  useEffect(() => {
    if (autoPlay) buildTimeline();
    return () => {
      if (timelineRef.current) timelineRef.current.kill();
      if (resendIntervalRef.current) clearInterval(resendIntervalRef.current);
    };
  }, [buildTimeline, autoPlay]);

  return (
    <IPhoneFrame className="w-[340px] drop-shadow-2xl">
      <div ref={containerRef} className="relative h-full overflow-hidden">
        {/* Screen 1: App Home */}
        <div ref={screen1Ref} className="absolute inset-0">
          <AppHomeScreen />
          <div
            ref={tapRef}
            className="pointer-events-none absolute bottom-[88px] left-1/2 z-20 h-10 w-10 -translate-x-1/2 rounded-full bg-white/50 shadow-lg"
            style={{ opacity: 0 }}
          />
        </div>

        {/* Screen 2: Enter Mobile */}
        <div ref={screen2Ref} className="absolute inset-0">
          <EnterMobileScreen typedDigits={typedDigits} />
          <div ref={keyboard1Ref} className="absolute bottom-0 left-0 right-0 z-10">
            <LiquidGlassKeyboard />
          </div>
        </div>

        {/* Screen 3: OTP */}
        <div ref={screen3Ref} className="absolute inset-0">
          <OTPScreen
            phoneNumber={PHONE_NUMBER}
            otpDigits={otpDigits}
            resendTimer={resendTimer}
          />
          <div ref={keyboard2Ref} className="absolute bottom-0 left-0 right-0 z-10">
            <LiquidGlassKeyboard />
          </div>
        </div>

        {/* Screen 4: Welcome */}
        <div ref={screen4Ref} className="absolute inset-0">
          <WelcomeScreen />
        </div>
      </div>
    </IPhoneFrame>
  );
});
