"use client";

import { Navbar } from "@/components/landing/navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { ChallengesSection } from "@/components/landing/challenges-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { FutureSection } from "@/components/landing/future-section";
import { WaitlistFormSection } from "@/components/landing/waitlist-form-section";
import { Footer } from "@/components/landing/footer";

export default function WaitlistPage() {
  const handleScrollToWaitlist = () => {
    const formElement = document.getElementById("waitlist-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans selection:bg-blue-500 selection:text-white">
      <Navbar onJoinClick={handleScrollToWaitlist} />
      <main className="flex-1">
        <HeroSection onJoinClick={handleScrollToWaitlist} />
        <ChallengesSection />
        <HowItWorksSection />
        <FutureSection />
        <WaitlistFormSection />
      </main>
      <Footer />
    </div>
  );
}
