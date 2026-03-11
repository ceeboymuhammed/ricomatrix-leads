import { HeroSection } from "@/components/HeroSection";
import TrainingLeadClient from "./trainingClient";

export default function TrainingPage() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-start">
      <HeroSection
        headline="Master the Shift: The New Digital Economy Roadmap is Here"
        subheadline="Stop trading time for money. Learn the 3-step system to leverage digital assets and scalable networking for recurring growth."
        bullets={[
          "Why most online income models collapse after initial hype",
          "The difference between one-time commissions and recurring revenue",
          "How subscription-based systems create compounding growth",
          "What to look for before positioning early in any platform",
        ]}
      />

      <TrainingLeadClient />
    </div>
  );
}
