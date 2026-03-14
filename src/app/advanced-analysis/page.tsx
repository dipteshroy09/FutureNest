"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useState, useEffect } from "react";

const features = [
  {
    id: "timeline",
    title: "Goal Timeline Simulator",
    description: "Year-by-year investment growth",
    icon: (
      <svg className="w-20 h-20 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" viewBox="0 0 100 80" fill="none">
        <rect x="8" y="45" width="14" height="30" rx="2" fill="#60a5fa" className="transition-all duration-300 group-hover:fill-blue-400" />
        <rect x="26" y="35" width="14" height="40" rx="2" fill="#3b82f6" className="transition-all duration-300 group-hover:fill-blue-500" />
        <rect x="44" y="25" width="14" height="50" rx="2" fill="#2563eb" className="transition-all duration-300 group-hover:fill-blue-600" />
        <rect x="62" y="15" width="14" height="60" rx="2" fill="#1d4ed8" className="transition-all duration-300 group-hover:fill-blue-700" />
        <path d="M10 50 L25 38 L43 28 L61 18 L79 8 L90 5" stroke="white" strokeWidth="3" fill="none" markerEnd="url(#arrowBlue)" className="animate-pulse" />
        <defs>
          <marker id="arrowBlue" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto">
            <polygon points="0 0, 10 4, 0 8" fill="white" />
          </marker>
        </defs>
      </svg>
    ),
    gradient: "from-blue-500/20 to-blue-700/20",
    borderColor: "border-blue-400/50",
    iconBg: "bg-blue-500/20",
    href: "/advanced-analysis/timeline",
  },
  {
    id: "inflation",
    title: "Inflation Impact Visualizer",
    description: "Current vs future cost comparison",
    icon: (
      <svg className="w-20 h-20 transition-transform duration-500 group-hover:scale-110" viewBox="0 0 100 80" fill="none">
        <rect x="10" y="50" width="22" height="25" rx="1" fill="#fbbf24" className="transition-all duration-300 group-hover:fill-amber-300" />
        <rect x="37" y="30" width="22" height="45" rx="1" fill="#f59e0b" className="transition-all duration-300 group-hover:fill-amber-400" />
        <rect x="64" y="10" width="22" height="65" rx="1" fill="#0ea5e9" className="transition-all duration-300 group-hover:fill-sky-400" />
        <rect x="10" y="42" width="22" height="12" rx="1" fill="#fbbf24" fillOpacity="0.9" />
        <rect x="37" y="22" width="22" height="12" rx="1" fill="#f59e0b" fillOpacity="0.9" />
        <rect x="64" y="2" width="22" height="12" rx="1" fill="#0ea5e9" fillOpacity="0.9" />
        <text x="21" y="51" fill="#1e293b" fontSize="7" fontWeight="bold" textAnchor="middle">₹10L</text>
        <text x="48" y="31" fill="#1e293b" fontSize="7" fontWeight="bold" textAnchor="middle">₹31.7L</text>
        <text x="75" y="11" fill="white" fontSize="7" fontWeight="bold" textAnchor="middle">₹31L</text>
      </svg>
    ),
    gradient: "from-amber-500/20 to-orange-700/20",
    borderColor: "border-amber-400/50",
    iconBg: "bg-amber-500/20",
    href: "/advanced-analysis/inflation",
  },
  {
    id: "early-vs-late",
    title: "Start Early vs Start Late Comparison",
    description: "Compare two investing scenarios",
    icon: (
      <svg className="w-20 h-20 transition-transform duration-500 group-hover:scale-110" viewBox="0 0 100 80" fill="none">
        <rect x="8" y="10" width="38" height="22" rx="4" fill="white" fillOpacity="0.95" className="transition-all duration-300 group-hover:fill-emerald-100" />
        <text x="27" y="22" fill="#0f172a" fontSize="6" fontWeight="bold" textAnchor="middle">Start Today</text>
        <rect x="54" y="10" width="38" height="22" rx="4" fill="white" fillOpacity="0.95" className="transition-all duration-300 group-hover:fill-blue-100" />
        <text x="73" y="20" fill="#0f172a" fontSize="5" fontWeight="bold" textAnchor="middle">Start After</text>
        <text x="73" y="27" fill="#0f172a" fontSize="5" fontWeight="bold" textAnchor="middle">5 Years</text>
        <path d="M15 45 L42 45" stroke="#fbbf24" strokeWidth="10" strokeLinecap="round" className="transition-all duration-300 group-hover:stroke-amber-300" />
        <path d="M42 42 L52 45 L42 48 Z" fill="#fbbf24" className="transition-all duration-300 group-hover:fill-amber-300" />
        <path d="M58 45 L85 45" stroke="#3b82f6" strokeWidth="10" strokeLinecap="round" className="transition-all duration-300 group-hover:stroke-blue-400" />
        <path d="M85 42 L95 45 L85 48 Z" fill="#3b82f6" className="transition-all duration-300 group-hover:fill-blue-400" />
      </svg>
    ),
    gradient: "from-emerald-500/20 to-green-700/20",
    borderColor: "border-emerald-400/50",
    iconBg: "bg-emerald-500/20",
    href: "/advanced-analysis/early-vs-late",
  },
  {
    id: "insights",
    title: "Smart Financial Insights",
    description: "Generate automatic insights",
    icon: (
      <svg className="w-20 h-20 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" viewBox="0 0 100 80" fill="none">
        <ellipse cx="38" cy="38" rx="18" ry="22" fill="#fcd34d" className="transition-all duration-300 group-hover:fill-yellow-300" />
        <path d="M32 58 Q38 62 44 58" stroke="#f59e0b" strokeWidth="3" fill="none" />
        <line x1="38" y1="58" x2="38" y2="63" stroke="#f59e0b" strokeWidth="3" />
        <line x1="33" y1="63" x2="43" y2="63" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
        <line x1="20" y1="20" x2="26" y2="26" stroke="#fcd34d" strokeWidth="3" strokeLinecap="round" className="animate-pulse" />
        <line x1="56" y1="20" x2="50" y2="26" stroke="#fcd34d" strokeWidth="3" strokeLinecap="round" className="animate-pulse" />
        <line x1="38" y1="8" x2="38" y2="14" stroke="#fcd34d" strokeWidth="3" strokeLinecap="round" className="animate-pulse" />
        <line x1="65" y1="38" x2="71" y2="38" stroke="#fcd34d" strokeWidth="3" strokeLinecap="round" className="animate-pulse" />
        <line x1="11" y1="38" x2="17" y2="38" stroke="#fcd34d" strokeWidth="3" strokeLinecap="round" className="animate-pulse" />
        <line x1="24" y1="56" x2="20" y2="62" stroke="#fcd34d" strokeWidth="3" strokeLinecap="round" className="animate-pulse" />
        <line x1="52" y1="56" x2="56" y2="62" stroke="#fcd34d" strokeWidth="3" strokeLinecap="round" className="animate-pulse" />
      </svg>
    ),
    gradient: "from-purple-500/20 to-purple-700/20",
    borderColor: "border-purple-400/50",
    iconBg: "bg-purple-500/20",
    href: "/advanced-analysis/insights",
  },
  {
    id: "scenario",
    title: "Scenario Testing",
    description: "Adjust inflation, returns, goal years",
    icon: (
      <svg className="w-20 h-20 transition-transform duration-500 group-hover:scale-110" viewBox="0 0 100 80" fill="none">
        <circle cx="20" cy="25" r="7" fill="#5eead4" className="transition-all duration-300 group-hover:fill-teal-300 group-hover:animate-bounce" />
        <circle cx="55" cy="18" r="7" fill="#5eead4" className="transition-all duration-300 group-hover:fill-teal-300 group-hover:animate-bounce" style={{ animationDelay: '100ms' }} />
        <circle cx="85" cy="30" r="7" fill="#5eead4" className="transition-all duration-300 group-hover:fill-teal-300 group-hover:animate-bounce" style={{ animationDelay: '200ms' }} />
        <circle cx="35" cy="55" r="7" fill="#5eead4" className="transition-all duration-300 group-hover:fill-teal-300 group-hover:animate-bounce" style={{ animationDelay: '300ms' }} />
        <circle cx="70" cy="60" r="7" fill="#5eead4" className="transition-all duration-300 group-hover:fill-teal-300 group-hover:animate-bounce" style={{ animationDelay: '400ms' }} />
        <path d="M26 25 L49 20" stroke="#0d9488" strokeWidth="2.5" className="transition-all duration-300 group-hover:stroke-teal-400" />
        <path d="M61 19 L79 27" stroke="#0d9488" strokeWidth="2.5" className="transition-all duration-300 group-hover:stroke-teal-400" />
        <path d="M41 52 L64 58" stroke="#0d9488" strokeWidth="2.5" className="transition-all duration-300 group-hover:stroke-teal-400" />
        <path d="M55 24 L35 49" stroke="#0d9488" strokeWidth="2" strokeDasharray="3,3" className="transition-all duration-300 group-hover:stroke-teal-500" />
      </svg>
    ),
    gradient: "from-teal-500/20 to-cyan-700/20",
    borderColor: "border-teal-400/50",
    iconBg: "bg-teal-500/20",
    href: "/advanced-analysis/scenario-testing",
  },
];

export default function AdvancedAnalysisPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a1530]">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`mb-12 text-center transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Advanced <span className="text-[#fca5a5]">Analysis</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Explore powerful tools to visualize, analyze, and optimize your investment strategy
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <Link
                key={feature.id}
                href={feature.href}
                className={`group relative overflow-hidden rounded-2xl border ${feature.borderColor} bg-gradient-to-br ${feature.gradient} backdrop-blur-sm p-6 transition-all duration-500 hover:scale-105 hover:shadow-2xl w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-sm ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <div className="mb-4">
                    {feature.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-white/90">
                    {feature.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <div className="mt-4 flex items-center text-white/60 text-sm group-hover:text-white/80 transition-colors">
                    <span>Explore</span>
                    <svg 
                      className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
