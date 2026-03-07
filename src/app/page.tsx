import Hero from "@/components/landing/Hero";
import DualValueSection from "@/components/landing/DualValueSection";
import CategoryMapSection from "@/components/landing/CategoryMapSection";
import DemoScenarioSection from "@/components/landing/DemoScenarioSection";
import TrustSection from "@/components/landing/TrustSection";
import CTASection from "@/components/landing/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <DualValueSection />
      <CategoryMapSection />
      <DemoScenarioSection />
      <TrustSection />
      <CTASection />
    </>
  );
}
