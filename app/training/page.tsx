import { HeroSection } from "@/components/HeroSection";
import TrainingLeadClient from "./trainingClient";

export default function TrainingPage() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-start">
      <HeroSection
        headline="Master the Shift: The New Digital Economy Roadmap is Here"
        subheadline="Free 20-minute training: How subscription-based models can create recurring online income"
        bullets={[
          "For Nigerians exploring affiliate and network marketing models",
          "Learn the difference between one-time commissions and recurring revenue",
          "See the framework first, then decide whether to continue",
        ]}
      />

      <TrainingLeadClient />
    </div>
  );
}
