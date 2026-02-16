"use client";

import { useMemo, useState } from "react";
import type { CalcInputs } from "@/lib/calculatorMath";
import { runProjection } from "@/lib/calculatorMath";
import { ResultsPanel } from "@/components/ResultsPanel";

type Props = {
  unlocked: boolean;
};

export function Calculator({ unlocked }: Props) {
  const [inputs, setInputs] = useState<CalcInputs>({
    referralsPerMonth: 3,
    growthPercent: 50,
    months: 6,
    subscriptionAmount: 7000,
    level1Earning: 5000,
    decreasePerLevel: 1000,
    maxPaidLevels: 5,
  });

  const [hasCalculated, setHasCalculated] = useState(false);

  const result = useMemo(() => {
    if (!hasCalculated) return null;
    return runProjection(inputs);
  }, [hasCalculated, inputs]);

  function update<K extends keyof CalcInputs>(key: K, value: CalcInputs[K]) {
    setInputs((prev) => ({ ...prev, [key]: value }));
  }

  if (!unlocked) {
    return (
      <div className="rounded-xl2 border border-brand-border bg-brand-surface p-5 text-white shadow-soft">
        <p className="font-semibold">Calculator Locked</p>
        <p className="mt-1 text-sm text-brand-muted">
          Submit the secure form above to unlock results.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl2 border border-brand-border bg-brand-surface p-5 text-white shadow-soft">
        <h2 className="text-lg font-semibold">Recurring Revenue Calculator</h2>
        <p className="mt-1 text-sm text-brand-muted">
          Keep it conservative. No hype — just math.
        </p>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm text-white/90">Referrals per month (R)</label>
            <input
              type="number"
              min={0}
              className="mt-1 w-full rounded-xl border border-white/10 bg-brand-card px-3 py-3 text-base outline-none focus:ring-2 focus:ring-brand-gold"
              value={inputs.referralsPerMonth}
              onChange={(e) => update("referralsPerMonth", Number(e.target.value))}
            />
          </div>

          <div>
            <label className="text-sm text-white/90">Duration</label>
            <select
              className="mt-1 w-full rounded-xl border border-white/10 bg-brand-card px-3 py-3 text-base outline-none focus:ring-2 focus:ring-brand-gold"
              value={inputs.months}
              onChange={(e) => update("months", Number(e.target.value) as 3 | 6 | 12)}
            >
              <option value={3}>3 months</option>
              <option value={6}>6 months</option>
              <option value={12}>12 months</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="text-sm text-white/90">
              Monthly recruits activity / growth % (G): <span className="font-semibold">{inputs.growthPercent}%</span>
            </label>
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              className="mt-2 w-full"
              value={inputs.growthPercent}
              onChange={(e) => update("growthPercent", Number(e.target.value))}
            />
            <p className="mt-1 text-xs text-brand-muted">
              Conservative model uses your growth % with an extra damping factor.
            </p>
          </div>

          <div>
            <label className="text-sm text-white/90">Monthly subscription amount (S)</label>
            <input
              type="number"
              min={0}
              className="mt-1 w-full rounded-xl border border-white/10 bg-brand-card px-3 py-3 text-base outline-none focus:ring-2 focus:ring-brand-gold"
              value={inputs.subscriptionAmount}
              onChange={(e) => update("subscriptionAmount", Number(e.target.value))}
            />
          </div>

          <div>
            <label className="text-sm text-white/90">Level 1 earning</label>
            <input
              type="number"
              min={0}
              className="mt-1 w-full rounded-xl border border-white/10 bg-brand-card px-3 py-3 text-base outline-none focus:ring-2 focus:ring-brand-gold"
              value={inputs.level1Earning}
              onChange={(e) => update("level1Earning", Number(e.target.value))}
            />
          </div>

          <div>
            <label className="text-sm text-white/90">Decrease per level</label>
            <input
              type="number"
              min={0}
              className="mt-1 w-full rounded-xl border border-white/10 bg-brand-card px-3 py-3 text-base outline-none focus:ring-2 focus:ring-brand-gold"
              value={inputs.decreasePerLevel}
              onChange={(e) => update("decreasePerLevel", Number(e.target.value))}
            />
          </div>

          <div>
            <label className="text-sm text-white/90">Max paid levels</label>
            <input
              type="number"
              min={1}
              max={20}
              className="mt-1 w-full rounded-xl border border-white/10 bg-brand-card px-3 py-3 text-base outline-none focus:ring-2 focus:ring-brand-gold"
              value={inputs.maxPaidLevels}
              onChange={(e) => update("maxPaidLevels", Number(e.target.value))}
            />
          </div>
        </div>

        <button
          onClick={() => setHasCalculated(true)}
          className="mt-5 w-full rounded-xl bg-brand-gold px-4 py-3 text-base font-semibold text-black shadow-sm transition hover:bg-brand-gold2"
        >
          Calculate My Projection
        </button>
      </div>

      {result ? <ResultsPanel inputs={inputs} result={result} /> : null}
    </div>
  );
}
