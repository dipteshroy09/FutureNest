"use client";

import { useState, useEffect } from "react";
import { YearlyBreakdown, formatFullCurrency } from "@/lib/calculations";
import { TrendingUp, Target, Calendar, Download, FileText } from "lucide-react";

interface TimelineTableProps {
  breakdown: YearlyBreakdown[];
}

export default function TimelineTable({ breakdown }: TimelineTableProps) {
  const [mounted, setMounted] = useState(false);
  const [visibleRows, setVisibleRows] = useState<Set<number>>(new Set());

  useEffect(() => {
    setMounted(true);
    // Animate rows appearing one by one
    const timer = setTimeout(() => {
      breakdown.forEach((_, index) => {
        setTimeout(() => {
          setVisibleRows(prev => new Set(prev).add(index));
        }, index * 100);
      });
    }, 300);
    return () => clearTimeout(timer);
  }, [breakdown]);

  const exportToCSV = () => {
    const headers = ['Year', 'Amount Invested', 'Portfolio Value', 'Gain %'];
    const csvContent = [
      headers.join(','),
      ...breakdown.map(row => {
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
    a.download = 'investment-timeline.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportToJSON = () => {
    const data = breakdown.map(row => ({
      year: row.year,
      invested: row.invested,
      portfolioValue: row.portfolioValue,
      gainPercent: row.invested > 0 
        ? parseFloat((((row.portfolioValue - row.invested) / row.invested) * 100).toFixed(1))
        : 0
    }));
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'investment-timeline.json';
    a.click();
    window.URL.revokeObjectURL(url);
  };
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8" aria-labelledby="timeline-title">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-wider text-primary bg-primary/10 rounded-full uppercase mb-4">
            <Calendar className="w-3 h-3" />
            Year-by-Year Growth
          </span>
          <h2
            id="timeline-title"
            className="text-3xl sm:text-4xl font-bold text-gray-900"
          >
            Goal Timeline Simulator
          </h2>
          <p className="mt-3 text-neutral max-w-xl mx-auto">
            See how your investment grows each year through the power of compounding.
          </p>
          <div className="mt-4 flex justify-center gap-4 text-xs text-neutral">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span>On Track</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span>Milestone</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              <span>Goal Achieved</span>
            </div>
          </div>
          
          {/* Export buttons */}
          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={exportToCSV}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-primary bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors"
            >
              <Download className="w-3 h-3" />
              Export CSV
            </button>
            <button
              onClick={exportToJSON}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-primary bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors"
            >
              <FileText className="w-3 h-3" />
              Export JSON
            </button>
          </div>
        </div>

        <div className="bg-surface rounded-2xl shadow-xl shadow-primary/5 border border-gray-100 overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-3 bg-gradient-to-r from-primary to-primary-dark text-white text-sm font-semibold">
            <div className="px-6 py-4 text-center">Year</div>
            <div className="px-6 py-4 text-center">Amount Invested</div>
            <div className="px-6 py-4 text-center">Portfolio Value</div>
          </div>

          {/* Table body */}
          <div className="max-h-[400px] overflow-y-auto">
            {breakdown.map((row, i) => {
              const gainPercent =
                row.invested > 0
                  ? (((row.portfolioValue - row.invested) / row.invested) * 100).toFixed(
                      1
                    )
                  : "0";
              
              const isVisible = visibleRows.has(i);
              const isMilestone = (i + 1) % 5 === 0 || i === breakdown.length - 1;
              const isGoalAchieved = i === breakdown.length - 1;
              const progressPercentage = (row.portfolioValue / breakdown[breakdown.length - 1].portfolioValue) * 100;

              return (
                <div
                  key={row.year}
                  className={`grid grid-cols-3 text-sm transition-all duration-500 hover:bg-primary/5 ${
                    i % 2 === 0 ? "bg-white" : "bg-gray-50/60"
                  } ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                  }`}
                >
                  <div className="px-6 py-3.5 text-center font-medium text-gray-700">
                    <div className="relative inline-flex items-center justify-center">
                      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-all duration-300 ${
                        isGoalAchieved 
                          ? "bg-purple-100 text-purple-700 ring-2 ring-purple-300" 
                          : isMilestone 
                          ? "bg-blue-100 text-blue-700 ring-2 ring-blue-300" 
                          : "bg-primary/10 text-primary"
                      }`}>
                        {isGoalAchieved ? <Target className="w-4 h-4" /> : isMilestone ? <TrendingUp className="w-4 h-4" /> : row.year}
                      </span>
                      {isMilestone && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                      )}
                    </div>
                  </div>
                  <div className="px-6 py-3.5 text-center text-gray-600 font-medium">
                    <div className="relative">
                      {formatFullCurrency(row.invested)}
                      {/* Progress bar */}
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-primary-dark transition-all duration-1000 ease-out"
                          style={{ width: isVisible ? `${progressPercentage}%` : "0%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="px-6 py-3.5 text-center">
                    <span className="font-semibold text-gray-800">
                      {formatFullCurrency(row.portfolioValue)}
                    </span>
                    <span className={`ml-2 text-xs font-medium ${
                      parseFloat(gainPercent) >= 50 ? "text-emerald-600" : 
                      parseFloat(gainPercent) >= 20 ? "text-blue-600" : 
                      "text-orange-600"
                    }`}>
                      +{gainPercent}%
                    </span>
                    {isGoalAchieved && (
                      <div className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                        <Target className="w-3 h-3" />
                        Goal Achieved
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary footer */}
          {breakdown.length > 0 && (
            <div className="grid grid-cols-3 bg-gradient-to-r from-primary/5 to-primary/10 border-t border-primary/10 text-sm font-bold">
              <div className="px-6 py-4 text-center text-primary">Total</div>
              <div className="px-6 py-4 text-center text-gray-700">
                {formatFullCurrency(breakdown[breakdown.length - 1].invested)}
              </div>
              <div className="px-6 py-4 text-center text-primary">
                {formatFullCurrency(
                  breakdown[breakdown.length - 1].portfolioValue
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
