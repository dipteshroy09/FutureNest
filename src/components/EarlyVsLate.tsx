"use client";

import { useState, useEffect } from "react";
import { ComparisonScenario, formatFullCurrency } from "@/lib/calculations";
import { TrendingUp, Clock, DollarSign, Target, AlertTriangle } from "lucide-react";

interface EarlyVsLateProps {
  early: ComparisonScenario;
  late: ComparisonScenario;
}

export default function EarlyVsLate({ early, late }: EarlyVsLateProps) {
  const [mounted, setMounted] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const sipSavings = late.requiredSIP - early.requiredSIP;
  const sipSavingsPercent = ((sipSavings / late.requiredSIP) * 100).toFixed(0);
  const totalSavings = late.totalInvested - early.totalInvested;
  
  // Calculate risk scores
  const earlyRiskScore = Math.max(0, 100 - early.years * 2); // Lower risk for longer time
  const lateRiskScore = Math.max(0, 100 - late.years * 2);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      className="py-16 px-4 sm:px-6 lg:px-8"
      aria-labelledby="comparison-title"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-wider text-emerald-700 bg-emerald-100 rounded-full uppercase mb-4">
            <Clock className="w-3 h-3" />
            Comparison
          </span>
          <h2
            id="comparison-title"
            className="text-3xl sm:text-4xl font-bold text-gray-900"
          >
            Start Early vs Start Late
          </h2>
          <p className="mt-3 text-neutral max-w-xl mx-auto">
            See the real impact of starting your investment journey today.
          </p>
          <div className="mt-4 flex justify-center gap-6 text-xs text-neutral">
            <div className="flex items-center gap-2">
              <Target className="w-3 h-3 text-emerald-600" />
              <span>Lower Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-3 h-3 text-blue-600" />
              <span>Cost Savings</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-3 h-3 text-purple-600" />
              <span>Better Returns</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Start Today card */}
          <div 
            className={`relative rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20 p-6 sm:p-8 transition-all duration-500 cursor-pointer ${
              hoveredCard === 'early' ? 'shadow-xl -translate-y-2 scale-105' : 'shadow-lg hover:-translate-y-1'
            } ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            onMouseEnter={() => setHoveredCard('early')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Recommended badge */}
            <div className="absolute -top-3 left-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary text-white text-xs font-bold rounded-full shadow-md animate-pulse">
                ✨ Recommended
              </span>
            </div>

            <div className="text-center mt-2">
              <div className="text-4xl mb-3 transform transition-transform duration-300 hover:scale-110">🚀</div>
              <h3 className="text-xl font-bold text-primary mb-1">
                {early.label}
              </h3>
              <p className="text-sm text-neutral mb-6">
                {early.years} years of investing
              </p>
              
              {/* Risk indicator */}
              <div className="mb-4">
                <div className="flex items-center justify-center gap-2 text-xs">
                  <span className="text-gray-600">Risk Level:</span>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                          i < Math.ceil(earlyRiskScore / 20) ? 'bg-emerald-500' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-emerald-600 font-semibold">Low</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-primary/10">
                <span className="text-sm text-gray-600">Monthly SIP</span>
                <span className="text-lg font-bold text-primary">
                  {formatFullCurrency(early.requiredSIP)}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-primary/10">
                <span className="text-sm text-gray-600">Total Invested</span>
                <span className="font-semibold text-gray-800">
                  {formatFullCurrency(early.totalInvested)}
                </span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-sm text-gray-600">Expected Wealth</span>
                <span className="font-semibold text-gray-800">
                  {formatFullCurrency(early.expectedWealth)}
                </span>
              </div>
            </div>
            
            {/* Advantages list */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-xs text-emerald-700">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                <span>Lower monthly investment</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-emerald-700">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                <span>More time for compounding</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-emerald-700">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                <span>Better risk management</span>
              </div>
            </div>
          </div>

          {/* Start Late card */}
          <div 
            className={`relative rounded-2xl bg-surface border border-gray-200 p-6 sm:p-8 transition-all duration-500 cursor-pointer ${
              hoveredCard === 'late' ? 'shadow-xl -translate-y-2 scale-105 border-orange-300' : 'shadow-lg hover:-translate-y-1'
            } ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            onMouseEnter={() => setHoveredCard('late')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Warning badge */}
            <div className="absolute -top-3 left-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full shadow-md">
                <AlertTriangle className="w-3 h-3" />
                Higher Cost
              </span>
            </div>

            <div className="text-center mt-2">
              <div className="text-4xl mb-3 transform transition-transform duration-300 hover:scale-110">⏳</div>
              <h3 className="text-xl font-bold text-gray-700 mb-1">
                {late.label}
              </h3>
              <p className="text-sm text-neutral mb-6">
                {late.years} years of investing
              </p>
              
              {/* Risk indicator */}
              <div className="mb-4">
                <div className="flex items-center justify-center gap-2 text-xs">
                  <span className="text-gray-600">Risk Level:</span>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                          i < Math.ceil(lateRiskScore / 20) ? 'bg-orange-500' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-orange-600 font-semibold">Medium</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">Monthly SIP</span>
                <span className="text-lg font-bold text-accent">
                  {formatFullCurrency(late.requiredSIP)}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">Total Invested</span>
                <span className="font-semibold text-gray-800">
                  {formatFullCurrency(late.totalInvested)}
                </span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-sm text-gray-600">Expected Wealth</span>
                <span className="font-semibold text-gray-800">
                  {formatFullCurrency(late.expectedWealth)}
                </span>
              </div>
            </div>
            
            {/* Disadvantages list */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-xs text-orange-700">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                <span>Higher monthly investment</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-orange-700">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                <span>Less time for compounding</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-orange-700">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                <span>Higher market risk</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Savings highlight */}
        <div className={`mt-8 p-6 rounded-2xl bg-gradient-to-r from-emerald-50 via-green-50 to-emerald-50 border border-emerald-200 text-center transition-all duration-700 ${
          mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          <div className="flex items-center justify-center gap-2 mb-3">
            <DollarSign className="w-5 h-5 text-emerald-600" />
            <h3 className="text-lg font-bold text-emerald-800">Starting Today Saves You Money</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-white/70 rounded-lg p-3">
              <div className="text-2xl font-bold text-emerald-700">
                {formatFullCurrency(sipSavings)}
              </div>
              <div className="text-xs text-gray-600">Monthly Savings</div>
            </div>
            <div className="bg-white/70 rounded-lg p-3">
              <div className="text-2xl font-bold text-emerald-700">
                {sipSavingsPercent}%
              </div>
              <div className="text-xs text-gray-600">Lower SIP Required</div>
            </div>
            <div className="bg-white/70 rounded-lg p-3">
              <div className="text-2xl font-bold text-emerald-700">
                {formatFullCurrency(totalSavings)}
              </div>
              <div className="text-xs text-gray-600">Total Investment Savings</div>
            </div>
          </div>
          
          <p className="text-sm text-gray-700">
            Starting your investment journey today not only saves you money but also reduces risk and gives you more time to reach your financial goals.
          </p>
        </div>
      </div>
    </section>
  );
}
