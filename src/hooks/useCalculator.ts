"use client";

import { useState, useMemo } from "react";
import {
  CalculatorInputs,
  calculateAll,
  generateYearlyBreakdown,
  generateComparison,
  generateInsights,
} from "@/lib/calculations";

const DEFAULT_INPUTS: CalculatorInputs = {
  goalName: "Education",
  currentCost: 1000000,
  years: 10,
  inflationRate: 6,
  expectedReturn: 12,
};

export const GOAL_OPTIONS = [
  { value: "Education", emoji: "🎓" },
  { value: "House Purchase", emoji: "🏠" },
  { value: "Wedding", emoji: "💍" },
  { value: "Travel", emoji: "✈️" },
  { value: "Car Purchase", emoji: "🚗" },
  { value: "Retirement", emoji: "🏖️" },
  { value: "Emergency Fund", emoji: "🛟" },
  { value: "Custom Goal", emoji: "🎯" },
];

export function useCalculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);

  const results = useMemo(() => calculateAll(inputs), [inputs]);

  const yearlyBreakdown = useMemo(
    () =>
      generateYearlyBreakdown(results.requiredSIP, inputs.expectedReturn, inputs.years),
    [results.requiredSIP, inputs.expectedReturn, inputs.years]
  );

  const comparison = useMemo(() => {
    if (inputs.years <= 5) return null;
    return generateComparison(inputs, 5);
  }, [inputs]);

  const insights = useMemo(
    () => generateInsights(inputs, results),
    [inputs, results]
  );

  const updateInput = <K extends keyof CalculatorInputs>(
    key: K,
    value: CalculatorInputs[K]
  ) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  return {
    inputs,
    results,
    yearlyBreakdown,
    comparison,
    insights,
    updateInput,
  };
}
