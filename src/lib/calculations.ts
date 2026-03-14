// ─── Financial Calculation Utilities ─────────────────────────────────────────

export interface CalculatorInputs {
  goalName: string;
  currentCost: number;
  years: number;
  inflationRate: number; // percentage e.g. 6 for 6%
  expectedReturn: number; // percentage e.g. 12 for 12%
}

export interface CalculatorResults {
  futureGoalValue: number;
  requiredSIP: number;
  totalInvested: number;
  expectedWealth: number;
}

export interface YearlyBreakdown {
  year: number;
  invested: number;
  portfolioValue: number;
}

export interface ComparisonScenario {
  label: string;
  years: number;
  requiredSIP: number;
  totalInvested: number;
  expectedWealth: number;
}

// ─── Step 1: Inflate goal value ──────────────────────────────────────────────
// FV = Present Cost × (1 + Inflation Rate)^Years
export function calculateFutureValue(
  presentCost: number,
  inflationRate: number,
  years: number
): number {
  const r = inflationRate / 100;
  return presentCost * Math.pow(1 + r, years);
}

// ─── Step 2: Calculate monthly SIP ───────────────────────────────────────────
// r = Annual Return / 12
// n = Years × 12
// Required SIP = FV × r ÷ [((1 + r)^n − 1) × (1 + r)]
export function calculateSIP(
  futureValue: number,
  annualReturn: number,
  years: number
): number {
  const r = annualReturn / 100 / 12;
  const n = years * 12;
  if (r === 0) return futureValue / n;
  return (futureValue * r) / ((Math.pow(1 + r, n) - 1) * (1 + r));
}

// ─── Full calculation ────────────────────────────────────────────────────────
export function calculateAll(inputs: CalculatorInputs): CalculatorResults {
  const futureGoalValue = calculateFutureValue(
    inputs.currentCost,
    inputs.inflationRate,
    inputs.years
  );
  const requiredSIP = calculateSIP(
    futureGoalValue,
    inputs.expectedReturn,
    inputs.years
  );
  const totalInvested = requiredSIP * inputs.years * 12;

  // Expected wealth = SIP × [((1 + r)^n - 1) / r] × (1 + r)
  const r = inputs.expectedReturn / 100 / 12;
  const n = inputs.years * 12;
  const expectedWealth =
    r === 0 ? totalInvested : requiredSIP * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);

  return {
    futureGoalValue,
    requiredSIP,
    totalInvested,
    expectedWealth,
  };
}

// ─── Year-by-year growth breakdown ───────────────────────────────────────────
export function generateYearlyBreakdown(
  sip: number,
  annualReturn: number,
  years: number
): YearlyBreakdown[] {
  const breakdown: YearlyBreakdown[] = [];
  const monthlyRate = annualReturn / 100 / 12;
  let portfolioValue = 0;

  for (let year = 1; year <= years; year++) {
    for (let month = 1; month <= 12; month++) {
      portfolioValue = (portfolioValue + sip) * (1 + monthlyRate);
    }
    breakdown.push({
      year,
      invested: Math.round(sip * year * 12),
      portfolioValue: Math.round(portfolioValue),
    });
  }

  return breakdown;
}

// ─── Early vs Late comparison ────────────────────────────────────────────────
export function generateComparison(
  inputs: CalculatorInputs,
  delayYears: number = 5
): { early: ComparisonScenario; late: ComparisonScenario } {
  const earlyResults = calculateAll(inputs);
  const lateInputs = { ...inputs, years: inputs.years - delayYears };

  // Recalculate future value with fewer years still targeting the same timeline
  const lateFV = calculateFutureValue(
    inputs.currentCost,
    inputs.inflationRate,
    inputs.years // same target year
  );
  const lateSIP = calculateSIP(lateFV, inputs.expectedReturn, lateInputs.years);
  const lateTotalInvested = lateSIP * lateInputs.years * 12;

  const r = inputs.expectedReturn / 100 / 12;
  const n = lateInputs.years * 12;
  const lateWealth =
    r === 0
      ? lateTotalInvested
      : lateSIP * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);

  return {
    early: {
      label: "Start Today",
      years: inputs.years,
      requiredSIP: earlyResults.requiredSIP,
      totalInvested: earlyResults.totalInvested,
      expectedWealth: earlyResults.expectedWealth,
    },
    late: {
      label: `Start After ${delayYears} Years`,
      years: lateInputs.years,
      requiredSIP: lateSIP,
      totalInvested: lateTotalInvested,
      expectedWealth: lateWealth,
    },
  };
}

// ─── Smart financial insights ────────────────────────────────────────────────
export function generateInsights(
  inputs: CalculatorInputs,
  results: CalculatorResults
): string[] {
  const insights: string[] = [];

  // Inflation impact insight
  const inflationMultiplier = results.futureGoalValue / inputs.currentCost;
  const inflationIncrease = ((inflationMultiplier - 1) * 100).toFixed(0);
  insights.push(
    `Inflation will increase your goal cost by ${inflationIncrease}% over ${inputs.years} years.`
  );

  // Early start insight
  if (inputs.years > 5) {
    const laterSIP = calculateSIP(
      results.futureGoalValue,
      inputs.expectedReturn,
      inputs.years - 5
    );
    const savings = ((1 - results.requiredSIP / laterSIP) * 100).toFixed(0);
    insights.push(
      `Starting today instead of 5 years later reduces your SIP by ${savings}%.`
    );
  }

  // Return impact insight
  if (inputs.expectedReturn > 2) {
    const lowerReturnSIP = calculateSIP(
      results.futureGoalValue,
      inputs.expectedReturn - 2,
      inputs.years
    );
    const extraSIP = lowerReturnSIP - results.requiredSIP;
    insights.push(
      `A 2% higher return saves you ₹${formatCurrency(extraSIP)}/month in SIP.`
    );
  }

  // Total wealth insight
  const wealthGain = results.expectedWealth - results.totalInvested;
  insights.push(
    `Your investments could generate ₹${formatCurrency(wealthGain)} in returns beyond your invested amount.`
  );

  return insights;
}

// ─── Currency formatting (Indian system) ─────────────────────────────────────
export function formatCurrency(value: number): string {
  if (value >= 10000000) {
    return (value / 10000000).toFixed(2) + " Cr";
  }
  if (value >= 100000) {
    return (value / 100000).toFixed(2) + " L";
  }
  return value.toLocaleString("en-IN", {
    maximumFractionDigits: 0,
  });
}

export function formatFullCurrency(value: number): string {
  return "₹" + value.toLocaleString("en-IN", { maximumFractionDigits: 0 });
}
