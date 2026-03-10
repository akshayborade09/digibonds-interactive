import Image from "next/image";
import { ReactNode, forwardRef } from "react";

interface IPhoneFrameProps {
  children?: ReactNode;
  className?: string;
}

export const IPhoneFrame = forwardRef<HTMLDivElement, IPhoneFrameProps>(
  ({ children, className = "" }, ref) => {
    return (
      <div ref={ref} className={`relative ${className}`}>
        {/* Phone body — sizes the container */}
        <img
          src="/assets/iPhone-bg.png"
          alt=""
          className="block w-full"
          draggable={false}
        />

        {/* Screen container — 12px inset over the phone body */}
        <div className="absolute inset-3 mx-0.5 overflow-hidden rounded-[42px]">
          {/* Screen content fills the entire screen area */}
          <div className="absolute inset-0">{children}</div>

          {/* Status bar — floating above screen content */}
          <div className="pointer-events-none absolute left-0 right-0 top-0 z-10 px-5 pt-3">
            <Image
              src="/assets/status.png"
              alt=""
              width={585}
              height={62}
              className="w-full"
            />
          </div>

          {/* Home indicator — floating above screen content */}
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10">
            <Image
              src="/assets/home-indicator.png"
              alt=""
              width={786}
              height={68}
              className="w-full"
            />
          </div>
        </div>
      </div>
    );
  }
);

IPhoneFrame.displayName = "IPhoneFrame";
