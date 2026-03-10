import { forwardRef } from "react";

export const WelcomeScreen = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className="flex h-full flex-col items-center justify-center bg-white">
      <img
        src="/assets/welcome-check.png"
        alt=""
        className="welcome-check-img h-24 w-24"
      />
      <div className="welcome-text mt-6 flex flex-col items-center gap-px text-center">
        <p className="text-xl font-semibold leading-[1.2] tracking-tight text-[#00453b]">
          Welcome to
        </p>
        <p className="text-[32px] font-semibold leading-[1.2] tracking-tight text-[#00453b]">
          digibonds
        </p>
      </div>
    </div>
  );
});

WelcomeScreen.displayName = "WelcomeScreen";
