"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCalculatorContext } from "@/context/CalculatorContext";
import { formatFullCurrency } from "@/lib/calculations";
import { ArrowLeft, TrendingUp, Target, Calendar, Download } from "lucide-react";

export default function TimelinePage() {
  const { inputs, results, yearlyBreakdown } = useCalculatorContext();
  const [mounted, setMounted] = useState(false);
  const [visibleRows, setVisibleRows] = useState<Set<number>>(new Set());

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      yearlyBreakdown.forEach((_, index) => {
        setTimeout(() => {
          setVisibleRows(prev => new Set(prev).add(index));
        }, index * 80);
      });
    }, 300);
    return () => clearTimeout(timer);
  }, [yearlyBreakdown]);

  const exportToCSV = () => {
    const headers = ['Year', 'Amount Invested', 'Portfolio Value', 'Gain %'];
    const csvContent = [
      headers.join(','),
      ...yearlyBreakdown.map(row => {
        const gainPercent = row.invested > 0 
          ? (((row.portfolioValue - row.invested) / row.invested) * 100).toFixed(1)
          : "0";
        return [
          row.year,
          `"${formatFullCurrency(row.invested)}"`,
          `"${formatFullCurrency(row.portfolioValue)}"`,
          `${gainPercent}%`
        ].join(',');
      })
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'goal-timeline-simulator.csv';
    a.click();
    window.URL.revokeObjectURL(url);
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
              <div className="bg-blue-500/20 rounded-xl p-3">
                <svg className="w-8 h-8 text-blue-400" viewBox="0 0 100 80" fill="none">
                  <rect x="10" y="50" width="12" height="25" rx="2" fill="#3b82f6" />
                  <rect x="28" y="40" width="12" height="35" rx="2" fill="#60a5fa" />
                  <rect x="46" y="30" width="12" height="45" rx="2" fill="#93c5fd" />
                  <rect x="64" y="20" width="12" height="55" rx="2" fill="#bfdbfe" />
                  <rect x="82" y="10" width="12" height="65" rx="2" fill="#dbeafe" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">Goal Timeline Simulator</h1>
                <p className="text-white/60">Year-by-year investment growth visualization</p>
              </div>
            </div>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 text-white/60 mb-2">
                <Target className="w-4 h-4" />
                <span className="text-sm">Goal</span>
              </div>
              <div className="text-xl font-bold text-white">{inputs.goalName}</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 text-white/60 mb-2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Timeline</span>
              </div>
              <div className="text-xl font-bold text-white">{inputs.years} Years</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 text-white/60 mb-2">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">Monthly SIP</span>
              </div>
              <div className="text-xl font-bold text-white">{formatFullCurrency(results.requiredSIP)}</div>
            </div>
          </div>

          <div className={`bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h2 className="text-lg font-semibold text-white">Year-by-Year Breakdown</h2>
              <button
                onClick={exportToCSV}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-white/80 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>

            <div className="grid grid-cols-3 bg-white/10 text-white/80 text-sm font-medium">
              <div className="px-4 py-3 text-center">Year</div>
              <div className="px-4 py-3 text-center">Amount Invested</div>
              <div className="px-4 py-3 text-center">Portfolio Value</div>
            </div>

            <div className="max-h-[500px] overflow-y-auto">
              {yearlyBreakdown.map((row, i) => {
                const gainPercent = row.invested > 0
                  ? (((row.portfolioValue - row.invested) / row.invested) * 100).toFixed(1)
                  : "0";
                const isVisible = visibleRows.has(i);
                const isMilestone = (i + 1) % 5 === 0 || i === yearlyBreakdown.length - 1;
                const isGoalAchieved = i === yearlyBreakdown.length - 1;

                return (
                  <div
                    key={row.year}
                    className={`grid grid-cols-3 text-sm transition-all duration-500 hover:bg-white/5 ${
                      i % 2 === 0 ? "bg-white/5" : "bg-transparent"
                    } ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
                  >
                    <div className="px-4 py-3 text-center">
                      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold ${
                        isGoalAchieved 
                          ? "bg-purple-500/20 text-purple-300 ring-2 ring-purple-400/50" 
                          : isMilestone 
                          ? "bg-blue-500/20 text-blue-300 ring-2 ring-blue-400/50" 
                          : "bg-white/10 text-white/80"
                      }`}>
                        {row.year}
                      </span>
                    </div>
                    <div className="px-4 py-3 text-center text-white/70">
                      {formatFullCurrency(row.invested)}
                    </div>
                    <div className="px-4 py-3 text-center">
                      <span className="font-semibold text-white">
                        {formatFullCurrency(row.portfolioValue)}
                      </span>
                      <span className={`ml-2 text-xs ${
                        parseFloat(gainPercent) >= 50 ? "text-emerald-400" : 
                        parseFloat(gainPercent) >= 20 ? "text-blue-400" : 
                        "text-amber-400"
                      }`}>
                        +{gainPercent}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-3 bg-white/10 border-t border-white/10 text-sm font-bold">
              <div className="px-4 py-4 text-center text-white">Total</div>
              <div className="px-4 py-4 text-center text-white/90">
                {formatFullCurrency(yearlyBreakdown[yearlyBreakdown.length - 1]?.invested || 0)}
              </div>
              <div className="px-4 py-4 text-center text-white">
                {formatFullCurrency(yearlyBreakdown[yearlyBreakdown.length - 1]?.portfolioValue || 0)}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
