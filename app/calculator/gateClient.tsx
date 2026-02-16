"use client";

import { useState } from "react";
import { LeadForm } from "@/components/LeadForm";
import { Calculator } from "@/components/Calculator";

export default function CalculatorLeadGateClient() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <div className="space-y-4">
      <LeadForm
        source="calculator"
        title="Unlock Your Results"
        emailMicrocopy="We’ll send your projection summary here. No spam."
        phoneMicrocopy="Optional support on WhatsApp if you want help understanding your results."
        buttonText="Unlock My Calculator"
        afterButtonMicrocopy="Takes less than 10 seconds."
        privacyLine="We respect your privacy and never sell your data."
        onSuccess={() => setUnlocked(true)}
      />

      <Calculator unlocked={unlocked} />
    </div>
  );
}
