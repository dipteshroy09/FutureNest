"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCalculatorContext } from "@/context/CalculatorContext";
import { formatFullCurrency } from "@/lib/calculations";
import { ArrowLeft, Clock, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";

export default function EarlyVsLatePage() {
  const { inputs, results, comparison } = useCalculatorContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!comparison) {
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

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
              <AlertCircle className="w-12 h-12 text-amber-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Need More Time</h2>
              <p className="text-white/60 mb-4">
                This comparison requires at least 10 years of investment horizon. Currently set to {inputs.years} years.
              </p>
              <Link 
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
              >
                Adjust Timeline
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const early = comparison.early;
  const late = comparison.late;
  const lateExtraCost = late.totalInvested - early.totalInvested;
  const missedWealth = early.expectedWealth - late.expectedWealth;

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
              <div className="bg-emerald-500/20 rounded-xl p-3">
                <svg className="w-8 h-8 text-emerald-400" viewBox="0 0 100 80" fill="none">
                  <rect x="10" y="15" width="35" height="20" rx="10" fill="white" />
                  <text x="27" y="28" fill="#0f172a" fontSize="7" fontWeight="bold" textAnchor="middle">Start Today</text>
                  <rect x="55" y="15" width="35" height="20" rx="10" fill="white" />
                  <text x="72" y="26" fill="#0f172a" fontSize="6" fontWeight="bold" textAnchor="middle">Start After</text>
                  <text x="72" y="32" fill="#0f172a" fontSize="6" fontWeight="bold" textAnchor="middle">5 Years</text>
                </svg>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">Start Early vs Start Late</h1>
                <p className="text-white/60">See the impact of starting your investments today vs delaying</p>
              </div>
            </div>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6">
              <div className="flex items-center gap-2 text-emerald-400 mb-4">
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold">Start Today ({early.years} years)</span>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="text-white/60 text-sm mb-1">Monthly SIP</div>
                  <div className="text-2xl font-bold text-white">{formatFullCurrency(early.requiredSIP)}</div>
                </div>
                <div>
                  <div className="text-white/60 text-sm mb-1">Total Invested</div>
                  <div className="text-xl font-semibold text-emerald-400">{formatFullCurrency(early.totalInvested)}</div>
                </div>
                <div>
                  <div className="text-white/60 text-sm mb-1">Final Wealth</div>
                  <div className="text-xl font-semibold text-white">{formatFullCurrency(early.expectedWealth)}</div>
                </div>
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6">
              <div className="flex items-center gap-2 text-red-400 mb-4">
                <Clock className="w-5 h-5" />
                <span className="font-semibold">Start After 5 Years ({late.years} years)</span>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="text-white/60 text-sm mb-1">Monthly SIP</div>
                  <div className="text-2xl font-bold text-white">{formatFullCurrency(late.requiredSIP)}</div>
                </div>
                <div>
                  <div className="text-white/60 text-sm mb-1">Total Invested</div>
                  <div className="text-xl font-semibold text-red-400">{formatFullCurrency(late.totalInvested)}</div>
                </div>
                <div>
                  <div className="text-white/60 text-sm mb-1">Final Wealth</div>
                  <div className="text-xl font-semibold text-white">{formatFullCurrency(late.expectedWealth)}</div>
                </div>
              </div>
            </div>
          </div>

          <div className={`bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h2 className="text-xl font-semibold text-white mb-6">Cost of Delay</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-red-500/10 rounded-xl p-4">
                <div className="flex items-center gap-2 text-red-400 mb-2">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">Extra Investment Required</span>
                </div>
                <div className="text-3xl font-bold text-red-400">
                  +{formatFullCurrency(lateExtraCost)}
                </div>
                <p className="text-white/50 text-sm mt-1">
                  More to invest by starting 5 years later
                </p>
              </div>
              
              <div className="bg-amber-500/10 rounded-xl p-4">
                <div className="flex items-center gap-2 text-amber-400 mb-2">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Missed Wealth Opportunity</span>
                </div>
                <div className="text-3xl font-bold text-amber-400">
                  {formatFullCurrency(missedWealth)}
                </div>
                <p className="text-white/50 text-sm mt-1">
                  Less wealth accumulated by delaying
                </p>
              </div>
            </div>

            <div className="mt-6 bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5" />
                <div>
                  <h3 className="text-emerald-400 font-semibold mb-1">The Power of Compounding</h3>
                  <p className="text-white/70 text-sm">
                    Starting just 5 years earlier means you invest {formatFullCurrency(lateExtraCost)} less 
                    but end up with {formatFullCurrency(missedWealth)} more. That's the magic of compound growth!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
