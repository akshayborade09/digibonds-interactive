import Image from "next/image";

export function AppHomeScreen() {
  return (
    <div className="flex h-full flex-col bg-[#eafdb4]">
      {/* Title area */}
      <div className="mt-16 flex flex-col items-center gap-1.5 px-6 pt-10">
        <Image
          src="/assets/digibonds-logo.svg"
          alt="digibonds"
          width={130}
          height={34}
        />
        <div className="text-center text-4xl font-extrabold italic leading-[1.15] tracking-tight">
          <p className="bg-gradient-to-b from-[#00ca87] to-[#008257] bg-clip-text text-transparent">
            Access bonds
          </p>
          <p className="bg-gradient-to-b from-[#00ca87] to-[#008257] bg-clip-text text-transparent">
            up to 15% p.a.
          </p>
        </div>
      </div>

      {/* 3D Bar chart illustration */}
      <div className="relative mt-2 flex-1">
        <div className="absolute inset-0 overflow-hidden bg-[#EAFDB4]">
          <img
            src="/assets/home-graph.png"
            alt=""
            className="absolute bottom-0 left-0 w-full"
          />
        </div>
      </div>

      {/* Bottom section: buttons + T&C */}
      <div className="flex flex-col items-center gap-3.5 bg-[#eafdb4] px-4 pb-8 pt-4">
        <div className="flex w-full flex-col gap-3">
          <button className="btn-continue-mobile flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#00453b] text-sm font-medium text-white">
            <Image
              src="/assets/icon-phone.svg"
              alt=""
              width={18}
              height={18}
              className="brightness-0 invert"
            />
            Continue with mobile
          </button>
          <button className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-white text-sm font-medium text-[#1e2130]">
            <Image
              src="/assets/icon-google.png"
              alt=""
              width={16}
              height={16}
            />
            Continue with Google
          </button>
        </div>
        <p className="text-center text-[10px] leading-relaxed text-[#737373]">
          By continuing, I agree to the{" "}
          <span className="text-[#262626]">T&C</span> and{" "}
          <span className="text-[#262626]">Privacy policy.</span>
        </p>
      </div>
    </div>
  );
}
