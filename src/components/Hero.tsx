"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useCalculatorContext } from "@/context/CalculatorContext";
import { GOAL_OPTIONS } from "@/hooks/useCalculator";
import { formatFullCurrency } from "@/lib/calculations";
import Link from "next/link";
import TransparentImage from "@/components/TransparentImage";
import SaveCalculationButton from "@/components/SaveCalculationButton";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const { inputs, results, updateInput } = useCalculatorContext();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden pt-16"
      aria-labelledby="hero-title"
    >
      {/* ── Background Image ── */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/bg-city-lights.jpg" 
          alt="Night city lights background" 
          fill
          priority
          className="object-cover object-center opacity-80 mix-blend-screen"
        />
        {/* Dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-[#0a1530]/60" />
      </div>

      {/* ── Main content wrapper ── */}
      <div className="relative z-10 flex-1 flex flex-col justify-center items-center max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Header Text */}
        <div className={`text-center mb-6 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h1
            id="hero-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-white mb-2"
          >
            Goal-Based <span className="text-white">Investment </span>
            <span className="text-[#fca5a5] drop-shadow-[0_0_15px_rgba(248,113,113,0.5)]">
              Calculator
            </span>
          </h1>
          <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto leading-relaxed">
            Plan your financial future with inflation-aware investment planning. Calculate the monthly SIP you need to reach your goals.
          </p>
        </div>

        {/* ── Interactive Glassmorphism Dashboard Card ── */}
        <div className={`w-full max-w-4xl rounded-[1.5rem] border border-white/10 bg-[#0f1b3b]/60 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-1000 delay-200 ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
          <div className="flex flex-col lg:flex-row h-full">
            
            {/* LEFT COLUMN: Visuals & CTAs */}
            <div className="w-full lg:w-[28%] p-3 lg:p-4 flex flex-col justify-center relative gap-4 lg:pr-0">
              <div className="relative w-full aspect-square mb-1 flex items-center justify-center scale-100">
                 <TransparentImage
                   src="/hero-left.png"
                   alt="Man planning goals"
                   className="w-full h-full object-contain"
                   threshold={40}
                 />
              </div>

              <div className="flex justify-center gap-3">
                {/* Embedded Stats inside left panel */}
                <div className="flex-1 flex items-center justify-center gap-2 bg-white/5 border border-white/10 rounded-xl p-2 backdrop-blur-sm">
                   <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400">
                     <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" /></svg>
                   </div>
                   <div>
                     <div className="text-white font-bold text-xs">5+ Goal</div>
                     <div className="text-white/50 text-[10px]">Types</div>
                   </div>
                </div>
                <div className="flex-1 flex items-center justify-center gap-2 bg-white/5 border border-white/10 rounded-xl p-2 backdrop-blur-sm">
                   <div className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400">
                     <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                   </div>
                   <div>
                     <div className="text-white font-bold text-xs">Real-time</div>
                     <div className="text-white/50 text-[10px]">Calculations</div>
                   </div>
                </div>
              </div>
            </div>

            {/* MIDDLE COLUMN: Calculator Inputs */}
            <div className="w-full lg:w-[42%] p-3 lg:px-5 py-5 flex flex-col justify-center border-y lg:border-y-0 lg:border-x border-white/10">
              <h3 className="text-white font-bold tracking-wide mb-3 text-sm">Select Your Goal</h3>
              
              <div className="flex flex-col gap-3 flex-1 justify-center">
                {/* Goal Type Dropdown */}
                <div className="relative">
                  <select
                    value={inputs.goalName}
                    onChange={(e) => updateInput("goalName", e.target.value)}
                    className="w-full bg-[#1e2a4f] text-white text-xs rounded-lg px-3 py-2 outline-none border border-white/5 focus:border-blue-500/50 appearance-none cursor-pointer"
                  >
                    {GOAL_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.value}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>

                {/* Years slider */}
                <div className="flex items-center justify-between group">
                  <label className="text-white/70 text-xs text-nowrap">Investment Horizon</label>
                  <div className="text-white font-bold text-xs text-nowrap">{inputs.years} <span className="text-white/50 text-[10px] font-normal">Years</span></div>
                </div>
                <input
                  type="range"
                  min="1" max="40"
                  value={inputs.years}
                  onChange={(e) => updateInput("years", Number(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#fca5a5]"
                />

                {/* Current Cost */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <label className="text-white/70 text-xs mt-1">Estimated Cost</label>
                    <input
                      type="text"
                      value={formatFullCurrency(inputs.currentCost)}
                      onChange={(e) => {
                        const val = Number(e.target.value.replace(/[^0-9.-]+/g, ""));
                        if (!isNaN(val)) updateInput("currentCost", val);
                      }}
                      className="bg-[#1e2a4f] rounded-lg px-3 py-1 text-right text-white font-bold text-xs w-32 outline-none border border-white/5 focus:border-blue-500/50"
                    />
                  </div>
                </div>

                {/* Returns */}
                <div className="flex items-center justify-between group">
                  <label className="text-white/70 text-xs text-nowrap mt-1">Expected Return</label>
                  <div className="text-white font-bold text-xs text-nowrap mt-1">{inputs.expectedReturn}% <span className="text-white/50 text-[10px] font-normal">p.a.</span></div>
                </div>
                <input
                  type="range"
                  min="5" max="25" step="0.5"
                  value={inputs.expectedReturn}
                  onChange={(e) => updateInput("expectedReturn", Number(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#fca5a5]"
                />

                {/* Inflation */}
                <div className="flex items-center justify-between group">
                  <label className="text-white/70 text-xs text-nowrap mt-1">Inflation Rate</label>
                  <div className="text-white font-bold text-xs text-nowrap mt-1">{inputs.inflationRate}% <span className="text-white/50 text-[10px] font-normal">p.a.</span></div>
                </div>
                <input
                  type="range"
                  min="1" max="15" step="0.5"
                  value={inputs.inflationRate}
                  onChange={(e) => updateInput("inflationRate", Number(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#fca5a5]"
                />

              </div>

              <div className="mt-5 relative z-10 w-full">
                 <Link href="/analysis" className="flex items-center justify-center w-full bg-gradient-to-r from-[#ef4444] to-[#dc2626] hover:from-[#dc2626] hover:to-[#b91c1c] text-white font-bold py-2.5 text-sm rounded-lg transition-all shadow-lg shadow-red-500/20 active:scale-95 cursor-pointer pointer-events-auto">
                   Start Planning &rarr;
                 </Link>
              </div>

              <div className="mt-3 relative z-10 w-full">
                 <Link 
                   href="/advanced-analysis"
                   className="inline-flex items-center justify-center gap-3 w-full px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-sm rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 group"
                 >
                   <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                   </svg>
                   Advanced Analysis
                   <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                   </svg>
                 </Link>
               </div>
            </div>

            {/* RIGHT COLUMN: Results & Illustration */}
            <div className="w-full lg:w-[30%] p-3 lg:p-5 flex flex-col justify-between relative overflow-hidden lg:pl-3">
               
               {/* Result header */}
               <div className="relative z-10">
                 <div className="text-white/80 text-xs mb-1">Monthly SIP Required:</div>
                 <div className="text-3xl font-extrabold text-white tracking-tight">
                   {formatFullCurrency(results.requiredSIP)}
                 </div>
               </div>

               {/* Right Illustration */}
               <div className="relative w-full flex-1 min-h-[140px] my-1 z-10 flex items-center justify-center scale-[0.85]">
                 <TransparentImage
                   src="/hero-right.png"
                   alt="Investment growth"
                   className="w-full h-full object-contain"
                   threshold={40}
                 />
               </div>

               {/* Result Breakdown table */}
               <div className="relative z-10 flex flex-col gap-2 mb-4">
                 <div className="flex justify-between items-center text-xs">
                   <span className="text-white/70">Investment Amount</span>
                   <span className="text-white font-bold">{formatFullCurrency(results.totalInvested)}</span>
                 </div>
                 <div className="flex justify-between items-center text-xs">
                   <span className="text-white/70">Expected Returns</span>
                   <span className="text-white font-bold text-green-400">+{formatFullCurrency(results.expectedWealth - results.totalInvested)}</span>
                 </div>
                 <div className="flex justify-between items-center text-xs pt-2 border-t border-white/10">
                   <span className="text-white/70">Total Wealth</span>
                   <span className="text-white font-bold text-sm tracking-wide">{formatFullCurrency(results.expectedWealth)}</span>
                 </div>
               </div>

               {/* Save Calculation Button */}
               <div className="relative z-10 mb-3">
                 <SaveCalculationButton
                   inputs={{
                     goal_name: inputs.goalName,
                     current_cost: inputs.currentCost,
                     years: inputs.years,
                     inflation_rate: inputs.inflationRate,
                     expected_return: inputs.expectedReturn,
                   }}
                   className="w-full text-sm py-2"
                 />
               </div>

               <Link href="/about" className="relative z-10 block w-full text-center bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-sm py-2 rounded-lg transition-colors cursor-pointer active:scale-95 pointer-events-auto">
                 How It Works &gt;
               </Link>
            </div>

          </div>
        </div>



      </div>
    </section>
  );
}
