import { clamp } from "@/lib/format";

export type CalcInputs = {
  referralsPerMonth: number; // R
  growthPercent: number;     // G 0-100 (slider), default 50
  months: 3 | 6 | 12;
  subscriptionAmount: number; // S default 7000
  level1Earning: number;      // default 5000
  decreasePerLevel: number;   // default 1000
  maxPaidLevels: number;      // default 5
};

export type MonthRow = {
  month: number;
  newMembers: number;
  totalMembers: number;
  estimatedEarnings: number;
};

export type CalcResult = {
  estimatedTotalNetworkSize: number;
  monthTable: MonthRow[];
  totalEarnings: number;
  totalSpent: number;
  net: number;
};

function payoutPerLevel(level1: number, decrease: number, levelIndex: number) {
  const payout = level1 - (levelIndex - 1) * decrease;
  return Math.max(payout, 0);
}

/**
 * Conservative network growth (simple MVP):
 * Month 1 new = R
 * Each month network_generated = floor(prev_total_members * (G/100) * 0.1)
 * total_new = R + network_generated
 * total_members accumulates
 *
 * Earnings approximation:
 * - Level 1 members = R * months (direct)
 * - Remaining members distributed across levels 2..MaxPaid equally
 * - Each month estimated earnings = sum(levelMembers_i * payout_i) / months
 *   (we spread across months so the month table shows a sensible progression)
 */
export function runProjection(raw: CalcInputs): CalcResult {
  const R = clamp(Math.floor(raw.referralsPerMonth || 0), 0, 10_000);
  const G = clamp(raw.growthPercent || 0, 0, 100);
  const months = raw.months;
  const S = clamp(Math.floor(raw.subscriptionAmount || 0), 0, 1_000_000);
  const L1 = clamp(Math.floor(raw.level1Earning || 0), 0, 1_000_000);
  const D = clamp(Math.floor(raw.decreasePerLevel || 0), 0, 1_000_000);
  const maxLevels = clamp(Math.floor(raw.maxPaidLevels || 1), 1, 20);

  const rows: MonthRow[] = [];
  let totalMembers = 0;

  for (let m = 1; m <= months; m++) {
    const prevTotal = totalMembers;

    const networkGenerated =
      m === 1
        ? 0
        : Math.floor(prevTotal * (G / 100) * 0.1); // conservative damping factor

    const newMembers = R + networkGenerated;
    totalMembers += newMembers;

    // Earnings estimate (progressive): compute a running distribution each month
    const directMembersSoFar = R * m;

    const remaining = Math.max(totalMembers - directMembersSoFar, 0);

    const paidLevelsBeyond1 = Math.max(maxLevels - 1, 0);
    const perLevel = paidLevelsBeyond1 > 0 ? Math.floor(remaining / paidLevelsBeyond1) : 0;

    let estimatedMonthlyEarnings = 0;

    // Level 1 earnings: direct members (assume recurring)
    estimatedMonthlyEarnings += directMembersSoFar * payoutPerLevel(L1, D, 1);

    // Levels 2..maxLevels
    for (let level = 2; level <= maxLevels; level++) {
      const membersAtLevel = perLevel;
      const payout = payoutPerLevel(L1, D, level);
      estimatedMonthlyEarnings += membersAtLevel * payout;
    }

    rows.push({
      month: m,
      newMembers,
      totalMembers,
      estimatedEarnings: estimatedMonthlyEarnings,
    });
  }

  const totalEarnings = rows.reduce((sum, r) => sum + r.estimatedEarnings, 0);
  const totalSpent = S * months;
  const net = totalEarnings - totalSpent;

  return {
    estimatedTotalNetworkSize: totalMembers,
    monthTable: rows,
    totalEarnings,
    totalSpent,
    net,
  };
}
