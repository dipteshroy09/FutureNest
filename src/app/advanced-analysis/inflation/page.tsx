"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCalculatorContext } from "@/context/CalculatorContext";
import { formatFullCurrency } from "@/lib/calculations";
import { ArrowLeft, TrendingUp, DollarSign, AlertTriangle } from "lucide-react";

export default function InflationPage() {
  const { inputs, results } = useCalculatorContext();
  const [mounted, setMounted] = useState(false);
  const [animatedPercent, setAnimatedPercent] = useState(0);

  useEffect(() => {
    setMounted(true);
    const targetPercent = ((results.futureGoalValue - inputs.currentCost) / inputs.currentCost) * 100;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setAnimatedPercent(prev => {
          if (prev >= targetPercent) {
            clearInterval(interval);
            return targetPercent;
          }
          return prev + targetPercent / 50;
        });
      }, 30);
    }, 500);
    return () => clearTimeout(timer);
  }, [results.futureGoalValue, inputs.currentCost]);

  const costIncrease = results.futureGoalValue - inputs.currentCost;
  const percentageIncrease = ((results.futureGoalValue - inputs.currentCost) / inputs.currentCost) * 100;

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
              <div className="bg-amber-500/20 rounded-xl p-3">
                <svg className="w-8 h-8 text-amber-400" viewBox="0 0 100 80" fill="none">
                  <rect x="15" y="50" width="22" height="25" rx="2" fill="#fbbf24" />
                  <rect x="42" y="30" width="22" height="45" rx="2" fill="#f59e0b" />
                  <rect x="69" y="10" width="22" height="65" rx="2" fill="#0ea5e9" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">Inflation Impact Visualizer</h1>
                <p className="text-white/60">See how inflation affects your goal cost over time</p>
              </div>
            </div>
          </div>

          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-2 text-amber-400 mb-4">
                <DollarSign className="w-5 h-5" />
                <span className="font-semibold">Current Cost</span>
              </div>
              <div className="text-4xl font-bold text-white mb-2">
                {formatFullCurrency(inputs.currentCost)}
              </div>
              <p className="text-white/50 text-sm">Today's estimated cost for {inputs.goalName}</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-2 text-red-400 mb-4">
                <TrendingUp className="w-5 h-5" />
                <span className="font-semibold">Future Cost</span>
              </div>
              <div className="text-4xl font-bold text-white mb-2">
                {formatFullCurrency(results.futureGoalValue)}
              </div>
              <p className="text-white/50 text-sm">Cost after {inputs.years} years at {inputs.inflationRate}% inflation</p>
            </div>
          </div>

          <div className={`bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h2 className="text-xl font-semibold text-white mb-6">Impact Analysis</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/5 rounded-xl p-4">
                <div className="text-white/60 text-sm mb-2">Cost Increase</div>
                <div className="text-2xl font-bold text-red-400">
                  +{formatFullCurrency(costIncrease)}
                </div>
              </div>
              
              <div className="bg-white/5 rounded-xl p-4">
                <div className="text-white/60 text-sm mb-2">Percentage Increase</div>
                <div className="text-2xl font-bold text-amber-400">
                  +{percentageIncrease.toFixed(1)}%
                </div>
              </div>
              
              <div className="bg-white/5 rounded-xl p-4">
                <div className="text-white/60 text-sm mb-2">Inflation Rate</div>
                <div className="text-2xl font-bold text-blue-400">
                  {inputs.inflationRate}% <span className="text-sm text-white/50">p.a.</span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between text-sm text-white/60 mb-2">
                <span>Current Cost</span>
                <span>Future Cost</span>
              </div>
              <div className="relative h-8 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 transition-all duration-1000 ease-out rounded-full"
                  style={{ width: `${Math.min((results.futureGoalValue / inputs.currentCost) * 50, 100)}%` }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-white">
                  {percentageIncrease.toFixed(1)}% Increase
                </div>
              </div>
            </div>
          </div>

          <div className={`bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5" />
              <div>
                <h3 className="text-amber-400 font-semibold mb-1">Why This Matters</h3>
                <p className="text-white/70 text-sm">
                  Without accounting for inflation, you might save enough for today's cost but fall short when it's time to achieve your goal. 
                  Planning with the future cost ensures you're prepared for the real expense.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
