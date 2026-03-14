"use client";

import React, { createContext, useContext, useState, useMemo, ReactNode } from "react";
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

// Define the shape of our context
interface CalculatorContextType {
  inputs: CalculatorInputs;
  results: ReturnType<typeof calculateAll>;
  yearlyBreakdown: ReturnType<typeof generateYearlyBreakdown>;
  comparison: ReturnType<typeof generateComparison> | null;
  insights: ReturnType<typeof generateInsights>;
  updateInput: <K extends keyof CalculatorInputs>(key: K, value: CalculatorInputs[K]) => void;
}

// Create the Context
const CalculatorContext = createContext<CalculatorContextType | undefined>(undefined);

// Create the Provider component
export function CalculatorProvider({ children }: { children: ReactNode }) {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);

  const results = useMemo(() => calculateAll(inputs), [inputs]);

  const yearlyBreakdown = useMemo(
    () => generateYearlyBreakdown(results.requiredSIP, inputs.expectedReturn, inputs.years),
    [results.requiredSIP, inputs.expectedReturn, inputs.years]
  );

  const comparison = useMemo(() => {
    if (inputs.years <= 5) return null;
    return generateComparison(inputs, 5);
  }, [inputs]);

  const insights = useMemo(() => generateInsights(inputs, results), [inputs, results]);

  const updateInput = <K extends keyof CalculatorInputs>(
    key: K,
    value: CalculatorInputs[K]
  ) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const value = {
    inputs,
    results,
    yearlyBreakdown,
    comparison,
    insights,
    updateInput,
  };

  return <CalculatorContext.Provider value={value}>{children}</CalculatorContext.Provider>;
}

// Custom hook to use the context
export function useCalculatorContext() {
  const context = useContext(CalculatorContext);
  if (context === undefined) {
    throw new Error("useCalculatorContext must be used within a CalculatorProvider");
  }
  return context;
}
