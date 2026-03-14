"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCalculatorContext } from "@/context/CalculatorContext";
import { formatFullCurrency } from "@/lib/calculations";
import { ArrowLeft, Lightbulb, TrendingUp, Clock, Target, Sparkles } from "lucide-react";

export default function InsightsPage() {
  const { inputs, results, insights } = useCalculatorContext();
  const [mounted, setMounted] = useState(false);
  const [visibleInsights, setVisibleInsights] = useState<Set<number>>(new Set());

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      insights.forEach((_, index) => {
        setTimeout(() => {
          setVisibleInsights(prev => new Set(prev).add(index));
        }, index * 200);
      });
    }, 300);
    return () => clearTimeout(timer);
  }, [insights]);

  const insightIcons = [
    <TrendingUp className="w-5 h-5" key="1" />,
    <Clock className="w-5 h-5" key="2" />,
    <Target className="w-5 h-5" key="3" />,
    <Sparkles className="w-5 h-5" key="4" />,
  ];

  const insightColors = [
    "from-blue-500/20 to-blue-600/10 border-blue-400/30 text-blue-400",
    "from-emerald-500/20 to-emerald-600/10 border-emerald-400/30 text-emerald-400",
    "from-amber-500/20 to-amber-600/10 border-amber-400/30 text-amber-400",
    "from-purple-500/20 to-purple-600/10 border-purple-400/30 text-purple-400",
  ];

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
              <div className="bg-purple-500/20 rounded-xl p-3">
                <Lightbulb className="w-8 h-8 text-purple-400" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">Smart Financial Insights</h1>
                <p className="text-white/60">AI-powered analysis of your investment strategy</p>
              </div>
            </div>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="text-white/60 text-sm mb-2">Goal</div>
              <div className="text-xl font-bold text-white">{inputs.goalName}</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="text-white/60 text-sm mb-2">Future Value Needed</div>
              <div className="text-xl font-bold text-white">{formatFullCurrency(results.futureGoalValue)}</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="text-white/60 text-sm mb-2">Monthly SIP</div>
              <div className="text-xl font-bold text-white">{formatFullCurrency(results.requiredSIP)}</div>
            </div>
          </div>

          <div className={`transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h2 className="text-xl font-semibold text-white mb-4">Generated Insights</h2>
            
            <div className="grid gap-4">
              {insights.map((insight, index) => {
                const isVisible = visibleInsights.has(index);
                const colorClass = insightColors[index % insightColors.length];
                const icon = insightIcons[index % insightIcons.length];

                return (
                  <div
                    key={index}
                    className={`bg-gradient-to-r ${colorClass} border rounded-xl p-5 transition-all duration-500 ${
                      isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="mt-0.5">{icon}</div>
                      <p className="text-white/90 leading-relaxed">{insight}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={`mt-8 bg-white/5 border border-white/10 rounded-2xl p-6 transition-all duration-700 delay-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h3 className="text-lg font-semibold text-white mb-4">Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="text-white/60 text-sm mb-1">Total Investment</div>
                <div className="text-2xl font-bold text-white">{formatFullCurrency(results.totalInvested)}</div>
              </div>
              <div>
                <div className="text-white/60 text-sm mb-1">Expected Returns</div>
                <div className="text-2xl font-bold text-emerald-400">
                  +{formatFullCurrency(results.expectedWealth - results.totalInvested)}
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-white/60">Projected Wealth</span>
                <span className="text-2xl font-bold text-white">{formatFullCurrency(results.expectedWealth)}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
