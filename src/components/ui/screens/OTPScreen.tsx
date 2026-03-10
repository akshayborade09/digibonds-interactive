import { forwardRef } from "react";

interface OTPScreenProps {
  phoneNumber?: string;
  otpDigits?: string[];
  resendTimer?: number;
}

export const OTPScreen = forwardRef<HTMLDivElement, OTPScreenProps>(
  ({ phoneNumber = "8655348912", otpDigits = [], resendTimer = 30 }, ref) => {
    const formattedPhone = `+91 ${phoneNumber}`;

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

        {/* Header */}
        <div className="mt-6 flex flex-col gap-5 px-4">
          <div className="flex flex-col gap-1.5">
            <p className="text-lg font-semibold leading-[1.2] tracking-tight text-[#1e2130]">
              We sent you a code
            </p>
            <p className="text-xs leading-relaxed text-[#404040]">
              Enter the security code sent to
              <br />
              <span className="font-bold text-[#171717]">{formattedPhone}</span>
            </p>
          </div>

          {/* OTP boxes */}
          <div className="flex flex-col gap-5">
            <div className="flex gap-1.5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  data-otp-box={i}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border-[1.5px] bg-white text-base font-semibold text-[#1e2130]"
                  style={{
                    borderColor:
                      otpDigits[i] !== undefined
                        ? "#00453b"
                        : i === otpDigits.length
                          ? "#404040"
                          : "#d9dade",
                  }}
                >
                  {otpDigits[i] || ""}
                </div>
              ))}
            </div>

            {/* Continue button */}
            <button className="btn-otp-continue flex h-11 w-full items-center justify-center rounded-lg bg-[#00453b] text-sm font-medium text-white">
              Continue
            </button>
          </div>

          {/* Resend timer */}
          <p className="resend-timer text-center text-xs font-medium text-[#404040]">
            Resend code ({resendTimer} sec)
          </p>
        </div>
      </div>
    );
  }
);

OTPScreen.displayName = "OTPScreen";
