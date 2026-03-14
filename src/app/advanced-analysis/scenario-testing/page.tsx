"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCalculatorContext } from "@/context/CalculatorContext";
import { formatFullCurrency, calculateAll, CalculatorInputs } from "@/lib/calculations";
import { ArrowLeft, SlidersHorizontal, RefreshCcw, Save } from "lucide-react";

export default function ScenarioTestingPage() {
  const { inputs: baseInputs } = useCalculatorContext();
  const [mounted, setMounted] = useState(false);
  
  const [scenarioInputs, setScenarioInputs] = useState<CalculatorInputs>(baseInputs);
  const [savedScenarios, setSavedScenarios] = useState<Array<{ name: string; inputs: CalculatorInputs; results: ReturnType<typeof calculateAll> }>>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scenarioResults = calculateAll(scenarioInputs);

  const updateScenario = (key: keyof CalculatorInputs, value: number | string) => {
    setScenarioInputs(prev => ({ ...prev, [key]: value }));
  };

  const saveScenario = () => {
    const name = `Scenario ${savedScenarios.length + 1}`;
    setSavedScenarios(prev => [...prev, { name, inputs: { ...scenarioInputs }, results: { ...scenarioResults } }]);
  };

  const resetToBase = () => {
    setScenarioInputs(baseInputs);
  };

  return (
    <div className="min-h-screen bg-[#0a1530]">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/advanced-analysis"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Features
          </Link>

          <div className={`mb-8 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-teal-500/20 rounded-xl p-3">
                <SlidersHorizontal className="w-8 h-8 text-teal-400" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">Scenario Testing</h1>
                <p className="text-white/60">Adjust inflation, returns, and goal years to see different outcomes</p>
              </div>
            </div>
          </div>

          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-white">Adjust Parameters</h2>
                <button
                  onClick={resetToBase}
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-white/70 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <RefreshCcw className="w-4 h-4" />
                  Reset
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-white/80 text-sm">Investment Horizon</label>
                    <span className="text-white font-semibold">{scenarioInputs.years} Years</span>
                  </div>
                  <input
                    type="range"
                    min="1" max="40"
                    value={scenarioInputs.years}
                    onChange={(e) => updateScenario("years", Number(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-teal-400"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-white/80 text-sm">Expected Return</label>
                    <span className="text-white font-semibold">{scenarioInputs.expectedReturn}% p.a.</span>
                  </div>
                  <input
                    type="range"
                    min="5" max="25" step="0.5"
                    value={scenarioInputs.expectedReturn}
                    onChange={(e) => updateScenario("expectedReturn", Number(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-teal-400"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-white/80 text-sm">Inflation Rate</label>
                    <span className="text-white font-semibold">{scenarioInputs.inflationRate}% p.a.</span>
                  </div>
                  <input
                    type="range"
                    min="1" max="15" step="0.5"
                    value={scenarioInputs.inflationRate}
                    onChange={(e) => updateScenario("inflationRate", Number(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-teal-400"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-white/80 text-sm">Current Cost</label>
                    <span className="text-white font-semibold">{formatFullCurrency(scenarioInputs.currentCost)}</span>
                  </div>
                  <input
                    type="range"
                    min="100000" max="10000000" step="50000"
                    value={scenarioInputs.currentCost}
                    onChange={(e) => updateScenario("currentCost", Number(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-teal-400"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-white">Current Scenario Results</h2>
                <button
                  onClick={saveScenario}
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-white bg-teal-500/20 hover:bg-teal-500/30 border border-teal-400/30 rounded-lg transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Save Scenario
                </button>
              </div>

              <div className="space-y-4">
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="text-white/60 text-sm mb-1">Monthly SIP Required</div>
                  <div className="text-3xl font-bold text-teal-400">{formatFullCurrency(scenarioResults.requiredSIP)}</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="text-white/60 text-sm mb-1">Future Goal Value</div>
                    <div className="text-xl font-semibold text-white">{formatFullCurrency(scenarioResults.futureGoalValue)}</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="text-white/60 text-sm mb-1">Total Investment</div>
                    <div className="text-xl font-semibold text-white">{formatFullCurrency(scenarioResults.totalInvested)}</div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-4">
                  <div className="text-white/60 text-sm mb-1">Expected Wealth</div>
                  <div className="text-2xl font-bold text-white">{formatFullCurrency(scenarioResults.expectedWealth)}</div>
                  <div className="text-emerald-400 text-sm mt-1">
                    +{formatFullCurrency(scenarioResults.expectedWealth - scenarioResults.totalInvested)} in returns
                  </div>
                </div>
              </div>
            </div>
          </div>

          {savedScenarios.length > 0 && (
            <div className={`bg-white/5 border border-white/10 rounded-2xl p-6 transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <h2 className="text-lg font-semibold text-white mb-4">Saved Scenarios</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedScenarios.map((scenario, index) => (
                  <div key={index} className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="font-semibold text-white mb-3">{scenario.name}</div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-white/60">Years:</span>
                        <span className="text-white">{scenario.inputs.years}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Return:</span>
                        <span className="text-white">{scenario.inputs.expectedReturn}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Inflation:</span>
                        <span className="text-white">{scenario.inputs.inflationRate}%</span>
                      </div>
                      <div className="pt-2 border-t border-white/10 flex justify-between">
                        <span className="text-white/60">Monthly SIP:</span>
                        <span className="text-teal-400 font-semibold">{formatFullCurrency(scenario.results.requiredSIP)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
