import { forwardRef } from "react";

export const WelcomeScreen = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className="flex h-full flex-col items-center justify-center bg-white">
      <img
        src="/assets/welcome-check.png"
        alt=""
        className="welcome-check-img h-24 w-24"
      />
      <div className="welcome-text mt-6 flex flex-col items-center gap-2 text-center">
        <p className="text-xl font-semibold leading-[1.2] tracking-tight text-[#00453b]">
          Welcome to
        </p>
        <img
          src="/assets/digibonds-logo.svg"
          alt="digibonds"
          width={160}
          height={42}
        />
      </div>
    </div>
  );
});

WelcomeScreen.displayName = "WelcomeScreen";
