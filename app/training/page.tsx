import { HeroSection } from "@/components/HeroSection";
import TrainingLeadClient from "./trainingClient";

export default function TrainingPage() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-start">
      <HeroSection
        headline="How to Build Recurring Online Income in Nigeria (Without Trading or Creating Your Own Product)"
        subheadline="A free 20-minute training explaining how subscription-based models create compounding income."
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
