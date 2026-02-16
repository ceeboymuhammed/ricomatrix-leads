import { HeroSection } from "@/components/HeroSection";
import { TrustLine } from "@/components/TrustLine";
import CalculatorLeadGateClient from "./gateClient";

export default function CalculatorPage() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-start">
      <HeroSection
        headline="What Could 3–5 Serious Referrals Be Worth in 6 Months?"
        subheadline="Use this free recurring revenue calculator to see conservative projections based on your effort — not hype."
        bullets={[
          "Built on subscription-based recurring revenue — not speculation",
          "Uses conservative growth assumptions to avoid unrealistic projections",
          "See how small monthly effort compounds over time",
          "Unlock a transparent breakdown of your potential network size",
        ]}
        microTrustLine="Results unlock after secure submission. No guarantees — just math."
      />

      <div className="space-y-4">
        <CalculatorLeadGateClient />
        <TrustLine lines={["No spam / we don’t sell your data."]} />
      </div>
    </div>
  );
}
