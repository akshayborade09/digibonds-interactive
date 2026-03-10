import Image from "next/image";

const NAV_LINKS = [
  "Privacy policy",
  "Security",
  "Terms & conditions",
  "Contact us",
];

export function Footer() {
  return (
    <footer className="bg-gray-100 py-[60px]">
      <div className="section-container flex flex-col gap-10">
        {/* Top — logo + nav links */}
        <div className="flex items-center justify-between">
          <Image
            src="/assets/digibonds-logo.svg"
            alt="DigiBonds"
            width={150}
            height={48}
            className="h-[38px] w-auto"
          />
          <nav className="flex items-center gap-[34px]">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm leading-relaxed text-gray-500 transition-colors hover:text-gray-700"
              >
                {link}
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom — regulatory text */}
        <div className="flex flex-col gap-2.5 text-center text-sm leading-relaxed text-gray-500">
          <p>
            SEBI Registration No. : INZ000296636 | BSE Member ID:6746 | NSE
            Member ID: 90329
          </p>
          <p>
            All rights are reserved by Launchpad Fintech Private Limited having
            its brand name BondsIndia, its associates and group Companies.
          </p>
          <p>&copy; 2026 DigiBonds Pvt Ltd</p>
        </div>
      </div>
    </footer>
  );
}
