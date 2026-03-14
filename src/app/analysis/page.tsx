"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCalculatorContext } from "@/context/CalculatorContext";
import { formatFullCurrency } from "@/lib/calculations";
import { useState, useEffect } from "react";
import { 
  TrendingUp, 
  Target, 
  Clock, 
  DollarSign, 
  AlertTriangle,
  PieChart,
  BarChart3,
  Activity,
  ChevronRight,
  Sparkles
} from "lucide-react";

export default function AnalysisPage() {
  const { inputs, results, yearlyBreakdown, comparison, insights } = useCalculatorContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalReturn = results.expectedWealth - results.totalInvested;
  const returnPercent = ((totalReturn / results.totalInvested) * 100).toFixed(1);

  const statCards = [
    {
      label: "Monthly SIP",
      value: formatFullCurrency(results.requiredSIP),
      icon: <DollarSign className="w-5 h-5" />,
      color: "from-blue-500/20 to-blue-600/10",
      borderColor: "border-blue-400/30",
      textColor: "text-blue-400",
    },
    {
      label: "Future Goal",
      value: formatFullCurrency(results.futureGoalValue),
      icon: <Target className="w-5 h-5" />,
      color: "from-amber-500/20 to-amber-600/10",
      borderColor: "border-amber-400/30",
      textColor: "text-amber-400",
    },
    {
      label: "Total Investment",
      value: formatFullCurrency(results.totalInvested),
      icon: <PieChart className="w-5 h-5" />,
      color: "from-emerald-500/20 to-emerald-600/10",
      borderColor: "border-emerald-400/30",
      textColor: "text-emerald-400",
    },
    {
      label: "Expected Returns",
      value: `+${formatFullCurrency(totalReturn)}`,
      subvalue: `(${returnPercent}%)`,
      icon: <TrendingUp className="w-5 h-5" />,
      color: "from-purple-500/20 to-purple-600/10",
      borderColor: "border-purple-400/30",
      textColor: "text-purple-400",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a1530]">
      <Header />
      <main className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className={`mb-6 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-white/10 rounded-xl p-2">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">Investment Analysis</h1>
                <p className="text-white/60 text-sm">Visualizing your path to {inputs.goalName}</p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {statCards.map((stat, index) => (
              <div
                key={stat.label}
                className={`group relative overflow-hidden rounded-xl border ${stat.borderColor} bg-gradient-to-br ${stat.color} p-4 transition-all duration-500 hover:scale-105 hover:shadow-xl cursor-pointer`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className={`${stat.textColor} mb-2`}>{stat.icon}</div>
                  <div className="text-white/60 text-xs mb-1">{stat.label}</div>
                  <div className="text-white font-bold text-lg">{stat.value}</div>
                  {stat.subvalue && (
                    <div className={`${stat.textColor} text-xs font-semibold`}>{stat.subvalue}</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 items-stretch transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {/* Left Column - Insights */}
            <div className="lg:col-span-1 flex flex-col gap-4">
              {/* Smart Insights */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <h3 className="text-white font-semibold text-sm">Smart Insights</h3>
                </div>
                <div className="space-y-2">
                  {insights.slice(0, 3).map((insight, index) => (
                    <div
                      key={index}
                      className="bg-white/5 rounded-lg p-3 text-xs text-white/80 leading-relaxed hover:bg-white/10 transition-colors"
                    >
                      {insight}
                    </div>
                  ))}
                </div>
              </div>

              {/* Inflation Impact */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-4 h-4 text-orange-400" />
                  <h3 className="text-white font-semibold text-sm">Inflation Impact</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Current Cost</span>
                    <span className="text-white font-semibold">{formatFullCurrency(inputs.currentCost)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Future Cost</span>
                    <span className="text-orange-400 font-semibold">{formatFullCurrency(results.futureGoalValue)}</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-orange-400 to-red-500 transition-all duration-1000"
                      style={{ width: `${Math.min((results.futureGoalValue / inputs.currentCost) * 50, 100)}%` }}
                    />
                  </div>
                  <div className="text-xs text-white/50">
                    Inflation at {inputs.inflationRate}% over {inputs.years} years
                  </div>
                </div>
              </div>

              {/* Early vs Late Summary */}
              {comparison && (
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-4 h-4 text-emerald-400" />
                    <h3 className="text-white font-semibold text-sm">Early vs Late</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-emerald-500/10 rounded-lg p-3 border border-emerald-500/20">
                      <div className="text-emerald-400 text-xs font-semibold mb-1">Start Today</div>
                      <div className="text-white font-bold">{formatFullCurrency(comparison.early.requiredSIP)}/mo</div>
                    </div>
                    <div className="bg-orange-500/10 rounded-lg p-3 border border-orange-500/20">
                      <div className="text-orange-400 text-xs font-semibold mb-1">Start After 5 Years</div>
                      <div className="text-white font-bold">{formatFullCurrency(comparison.late.requiredSIP)}/mo</div>
                    </div>
                    <div className="text-center text-xs text-emerald-400">
                      Save {formatFullCurrency(comparison.late.requiredSIP - comparison.early.requiredSIP)}/mo by starting now
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Charts */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {/* Growth Chart */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-blue-400" />
                    <h3 className="text-white font-semibold text-sm">Investment Growth Projection</h3>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <span className="text-white/60">Invested</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-red-400" />
                      <span className="text-white/60">Wealth</span>
                    </div>
                  </div>
                </div>
                
                {/* Mini Chart Visualization */}
                <div className="h-32 flex items-end gap-1">
                  {yearlyBreakdown.filter((_, i) => i % Math.ceil(yearlyBreakdown.length / 20) === 0 || i === yearlyBreakdown.length - 1).map((data, index, arr) => {
                    const maxValue = Math.max(...yearlyBreakdown.map(d => d.portfolioValue));
                    const height = (data.portfolioValue / maxValue) * 100;
                    const investedHeight = (data.invested / maxValue) * 100;
                    return (
                      <div key={data.year} className="flex-1 flex flex-col items-center gap-0.5 group cursor-pointer">
                        <div className="relative w-full flex flex-col items-center">
                          <div 
                            className="w-full bg-red-400/60 rounded-t transition-all duration-300 group-hover:bg-red-400"
                            style={{ height: `${height * 0.5}px` }}
                          />
                          <div 
                            className="w-full bg-blue-500/60 rounded-t transition-all duration-300 group-hover:bg-blue-500"
                            style={{ height: `${investedHeight * 0.5}px` }}
                          />
                        </div>
                        {index % 5 === 0 && (
                          <span className="text-[8px] text-white/40">Y{data.year}</span>
                        )}
                      </div>
                    );
                  })}
                </div>
                
                {/* Yearly Progress */}
                <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                  <div className="bg-white/5 rounded-lg p-2">
                    <div className="text-white/50 text-[10px]">Year 1</div>
                    <div className="text-white text-xs font-semibold">{formatFullCurrency(yearlyBreakdown[0]?.portfolioValue || 0)}</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-2">
                    <div className="text-white/50 text-[10px]">Year {Math.floor(inputs.years / 2)}</div>
                    <div className="text-white text-xs font-semibold">{formatFullCurrency(yearlyBreakdown[Math.floor(yearlyBreakdown.length / 2)]?.portfolioValue || 0)}</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-2">
                    <div className="text-white/50 text-[10px]">Year {inputs.years}</div>
                    <div className="text-emerald-400 text-xs font-semibold">{formatFullCurrency(yearlyBreakdown[yearlyBreakdown.length - 1]?.portfolioValue || 0)}</div>
                  </div>
                </div>
              </div>

              {/* Yearly Breakdown Table */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white font-semibold text-sm">Yearly Breakdown</h3>
                  <button className="text-xs text-white/50 hover:text-white transition-colors flex items-center gap-1">
                    View All <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
                <div className="space-y-1 flex-1 overflow-y-auto">
                  {yearlyBreakdown.filter((_, i) => i < 5 || i === yearlyBreakdown.length - 1).map((row, index) => {
                    const gainPercent = row.invested > 0
                      ? (((row.portfolioValue - row.invested) / row.invested) * 100).toFixed(0)
                      : "0";
                    const isLast = index === 4 && yearlyBreakdown.length > 5;
                    
                    if (isLast) {
                      return (
                        <div key="dots" className="text-center py-1 text-white/30 text-xs">···</div>
                      );
                    }
                    
                    return (
                      <div 
                        key={row.year} 
                        className="flex items-center justify-between py-2 px-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-white/40 text-xs w-8">Y{row.year}</span>
                          <span className="text-white/80 text-xs">{formatFullCurrency(row.invested)}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-white text-xs font-semibold">{formatFullCurrency(row.portfolioValue)}</span>
                          <span className="text-emerald-400 text-[10px]">+{gainPercent}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className={`flex justify-center transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <a 
              href="/advanced-analysis"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              <Sparkles className="w-4 h-4" />
              Explore Advanced Analysis
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
