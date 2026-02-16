"use client";

import type { CalcInputs, CalcResult } from "@/lib/calculatorMath";
import { formatNaira } from "@/lib/format";
import { VideoPlaceholder } from "@/components/VideoPlaceholder";
import { CTAButtons } from "@/components/CTAButtons";

const YOUTUBE_LINK = "https://youtu.be/AhtrIrgebM0";

type Props = {
  inputs: CalcInputs;
  result: CalcResult;
};

export function ResultsPanel({ inputs, result }: Props) {
  return (
    <div className="rounded-xl2 border border-brand-border bg-brand-surface p-5 text-white shadow-soft">
      <h3 className="text-lg font-semibold">Your Projection</h3>

      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-brand-card p-4">
          <div className="text-sm text-brand-muted">Estimated total network size</div>
          <div className="mt-1 text-2xl font-semibold">{result.estimatedTotalNetworkSize.toLocaleString()}</div>
        </div>

        <div className="rounded-xl border border-white/10 bg-brand-card p-4">
          <div className="text-sm text-brand-muted">Estimated total earnings</div>
          <div className="mt-1 text-2xl font-semibold">{formatNaira(result.totalEarnings)}</div>
        </div>

        <div className="rounded-xl border border-white/10 bg-brand-card p-4">
          <div className="text-sm text-brand-muted">Net (earned - spent)</div>
          <div className="mt-1 text-2xl font-semibold">{formatNaira(result.net)}</div>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-white/10 bg-brand-card p-4">
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
          <span className="text-brand-muted">Total spent</span>
          <span className="font-semibold">{formatNaira(result.totalSpent)} ({inputs.months} months)</span>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-white/10">
        <div className="bg-brand-card px-4 py-3 text-sm font-semibold">Breakdown by Month</div>
        <div className="overflow-x-auto bg-brand-surface">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead className="bg-brand-card text-white/90">
              <tr>
                <th className="px-4 py-3">Month</th>
                <th className="px-4 py-3">New Members</th>
                <th className="px-4 py-3">Total Members</th>
                <th className="px-4 py-3">Estimated Earnings</th>
              </tr>
            </thead>
            <tbody>
              {result.monthTable.map((r) => (
                <tr key={r.month} className="border-t border-white/10">
                  <td className="px-4 py-3">{r.month}</td>
                  <td className="px-4 py-3">{r.newMembers.toLocaleString()}</td>
                  <td className="px-4 py-3">{r.totalMembers.toLocaleString()}</td>
                  <td className="px-4 py-3">{formatNaira(r.estimatedEarnings)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-4 text-xs text-brand-muted">
        This is a projection based on your inputs and simplified assumptions. Earnings are not guaranteed.
      </p>

      <div className="mt-6">
        <VideoPlaceholder title="You’re In — Watch This Before You Go" youtubeUrl={YOUTUBE_LINK} autoPlay />
      </div>

      <div className="mt-4">
        <CTAButtons
          variant="calculator"
          shareUrlPath="/calculator"
        />
      </div>
    </div>
  );
}
