import { forwardRef } from "react";

interface EnterMobileScreenProps {
  typedDigits?: string;
}

export const EnterMobileScreen = forwardRef<HTMLDivElement, EnterMobileScreenProps>(
  ({ typedDigits = "" }, ref) => {
    return (
      <div ref={ref} className="flex h-full flex-col bg-white">
        {/* Back arrow */}
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

        {/* Header + Input */}
        <div className="mt-6 flex flex-col gap-5 px-4">
          <p className="text-lg font-semibold leading-[1.2] tracking-tight text-[#1e2130]">
            What&apos;s your mobile number?
          </p>

          <div className="flex flex-col gap-5">
            {/* Input field */}
            <div className="flex flex-col gap-1.5">
              <p className="text-xs font-medium text-[#404040]">
                Mobile number
              </p>
              <div className="flex items-center gap-2.5 overflow-hidden rounded-lg border-[1.5px] border-[#1e2130] px-3.5 py-3">
                <div className="flex shrink-0 items-center gap-2">
                  <img
                    src="/assets/india-flag.svg"
                    alt="IN"
                    className="h-3.5 w-5 object-cover"
                  />
                  <span className="text-sm font-medium text-[#1e2130]">+91</span>
                </div>
                <div className="h-5 w-px shrink-0 bg-[#d4d4d4]" />
                <div className="flex min-w-0 items-center whitespace-nowrap">
                  {typedDigits ? (
                    <span className="phone-digits text-sm font-medium tracking-tight text-[#1e2130]">
                      {typedDigits}
                      <span className="inline-block w-px animate-pulse text-[#1e2130]">|</span>
                    </span>
                  ) : (
                    <>
                      <span className="animate-pulse text-sm text-[#1e2130]">|</span>
                      <span className="truncate text-xs font-medium text-[#1e2130]/40">
                        Enter your mobile number
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Continue button */}
            <button className="btn-enter-continue flex h-11 w-full items-center justify-center rounded-lg bg-[#00453b] text-sm font-medium text-white">
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }
);

EnterMobileScreen.displayName = "EnterMobileScreen";
