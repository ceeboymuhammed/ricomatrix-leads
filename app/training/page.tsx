import { HeroSection } from "@/components/HeroSection";
import TrainingLeadClient from "./trainingClient";

export default function TrainingPage() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-start">
      <HeroSection
        headline="Master the New Shift In Digital Economy"
        subheadline="Learn how subscription-based models is creating recurring online income for many"
        bullets={[
        ]}
      />

      <TrainingLeadClient />
    </div>
  );
}
