import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { BondCards } from "@/components/sections/BondCards";
import { LiveBanner } from "@/components/sections/LiveBanner";
import { TrustStats } from "@/components/sections/TrustStats";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { SmartAllocation } from "@/components/sections/SmartAllocation";
import { Testimonials } from "@/components/sections/Testimonials";
import { GoogleReviews } from "@/components/sections/GoogleReviews";
import { FAQ } from "@/components/sections/FAQ";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <BondCards />
        <LiveBanner />
        <TrustStats />
        <WhyChoose />
        <HowItWorks />
        <SmartAllocation />
        <Testimonials />
        <GoogleReviews />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
