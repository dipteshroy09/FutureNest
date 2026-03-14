// Financial Calculation Utilities - Server-side version
// Matches the client-side calculations in src/lib/calculations.ts

/**
 * Calculate future value with inflation
 * FV = Present Cost × (1 + Inflation Rate)^Years
 */
function calculateFutureValue(presentCost, inflationRate, years) {
  const r = inflationRate / 100;
  return presentCost * Math.pow(1 + r, years);
}

/**
 * Calculate monthly SIP required
 * r = Annual Return / 12
 * n = Years × 12
 * Required SIP = FV × r ÷ [((1 + r)^n − 1) × (1 + r)]
 */
function calculateSIP(futureValue, annualReturn, years) {
  const r = annualReturn / 100 / 12;
  const n = years * 12;
  if (r === 0) return futureValue / n;
  return (futureValue * r) / ((Math.pow(1 + r, n) - 1) * (1 + r));
}

/**
 * Full calculation combining all steps
 */
function calculateAll(inputs) {
  const futureGoalValue = calculateFutureValue(
    inputs.current_cost,
    inputs.inflation_rate,
    inputs.years
  );
  
  const requiredSIP = calculateSIP(
    futureGoalValue,
    inputs.expected_return,
    inputs.years
  );
  
  const totalInvested = requiredSIP * inputs.years * 12;

  // Expected wealth = SIP × [((1 + r)^n - 1) / r] × (1 + r)
  const r = inputs.expected_return / 100 / 12;
  const n = inputs.years * 12;
  const expectedWealth =
    r === 0 ? totalInvested : requiredSIP * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);

  return {
    future_goal_value: Math.round(futureGoalValue),
    required_sip: Math.round(requiredSIP),
    total_invested: Math.round(totalInvested),
    expected_wealth: Math.round(expectedWealth)
  };
}

/**
 * Generate year-by-year portfolio breakdown
 */
function generateYearlyBreakdown(sip, annualReturn, years) {
  const breakdown = [];
  const monthlyRate = annualReturn / 100 / 12;
  let portfolioValue = 0;

  for (let year = 1; year <= years; year++) {
    for (let month = 1; month <= 12; month++) {
      portfolioValue = (portfolioValue + sip) * (1 + monthlyRate);
    }
    breakdown.push({
      year: year,
      invested: Math.round(sip * year * 12),
      portfolio_value: Math.round(portfolioValue)
    });
  }

  return breakdown;
}

module.exports = {
  calculateFutureValue,
  calculateSIP,
  calculateAll,
  generateYearlyBreakdown
};
