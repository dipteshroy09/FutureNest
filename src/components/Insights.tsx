"use client";

import { useState, useEffect } from "react";
import { 
  TrendingUp, 
  ChevronRight,
  Lightbulb,
  Target,
  Zap,
  Shield,
  Clock,
} from "lucide-react";
import FintechMotion from "./FintechMotion";

interface InsightsProps {
  insights: string[];
}

export default function Insights({ insights }: InsightsProps) {
  const [mounted, setMounted] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

  useEffect(() => {
    setMounted(true);
    // Animate cards appearing one by one
    const timer = setTimeout(() => {
      insights.forEach((_, index) => {
        setTimeout(() => {
          setVisibleCards(prev => new Set(prev).add(index));
        }, index * 200);
      });
    }, 500);
    return () => clearTimeout(timer);
  }, [insights]);

  const getInsightIcon = (index: number) => {
    const icons = [Lightbulb, Target, Zap, Shield, Clock, TrendingUp];
    return icons[index % icons.length];
  };

  const getInsightColor = (index: number) => {
    const colors = [
      'from-blue-500/20 to-cyan-500/20',
      'from-purple-500/20 to-pink-500/20', 
      'from-emerald-500/20 to-green-500/20',
      'from-orange-500/20 to-red-500/20',
      'from-indigo-500/20 to-blue-500/20',
      'from-yellow-500/20 to-orange-500/20'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="relative min-h-screen bg-[#050023] overflow-hidden selection:bg-cyan-500/30">
      {/* Fintech Motion Background */}
      <FintechMotion />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-12">
        
        {/* Intelligent Projections Title - Centered at Top */}
        <div className="flex items-center gap-6 mb-12">
          <div className="h-[2px] flex-grow bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
          <h1 className="text-2xl font-bold text-white tracking-widest uppercase">Intelligent Projections</h1>
          <div className="h-[2px] flex-grow bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
        </div>

        {/* Financial Insights Grid - Enhanced cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {insights.map((insight, i) => {
            const Icon = getInsightIcon(i);
            const isVisible = visibleCards.has(i);
            const isHovered = hoveredCard === i;
            
            return (
              <div
                key={i}
                className={`group relative p-6 rounded-[2rem] bg-white/[0.03] backdrop-blur-2xl border border-white/10 transition-all duration-700 overflow-hidden cursor-pointer ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                } ${
                  isHovered ? 'bg-white/[0.08] border-white/30 scale-105 shadow-2xl' : 'hover:bg-white/[0.06] hover:border-white/20'
                }`}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  transitionDelay: `${i * 100}ms`
                }}
              >
                {/* Animated gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${getInsightColor(i)} opacity-0 transition-opacity duration-500 ${
                  isHovered ? 'opacity-100' : ''
                }`}></div>
                
                {/* Accent Glow */}
                <div className={`absolute -top-12 -right-12 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl transition-all duration-500 ${
                  isHovered ? 'bg-blue-500/30 scale-150' : ''
                }`}></div>
                
                <div className="relative flex flex-col h-full">
                  {/* Icon with animation */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getInsightColor(i)} flex items-center justify-center text-white mb-6 transition-all duration-300 ${
                    isHovered ? 'scale-110 rotate-6' : 'group-hover:scale-105'
                  }`}>
                    <Icon size={24} className="transition-transform duration-300" />
                  </div>
                  
                  {/* Insight content */}
                  <p className="text-white/80 text-sm leading-relaxed mb-6 flex-grow">
                    {insight}
                  </p>
                  
                  {/* Interactive footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs font-bold tracking-wider text-blue-400 uppercase transition-all duration-300 group-hover:gap-2">
                      <span>Learn More</span>
                      <ChevronRight 
                        size={14} 
                        className={`transition-transform duration-300 ${
                          isHovered ? 'translate-x-1' : ''
                        }`}
                      />
                    </div>
                    
                    {/* Interactive dots */}
                    <div className="flex gap-1">
                      {[...Array(3)].map((_, dotIndex) => (
                        <div
                          key={dotIndex}
                          className={`w-1.5 h-1.5 rounded-full bg-blue-400/50 transition-all duration-300 ${
                            isHovered ? 'bg-blue-400' : ''
                          }`}
                          style={{
                            transitionDelay: `${dotIndex * 50}ms`
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Subtle border animation */}
                <div className={`absolute inset-0 rounded-[2rem] border-2 border-transparent transition-all duration-500 ${
                  isHovered ? 'border-blue-400/30' : ''
                }`}></div>
              </div>
            );
          })}
        </div>
        
        {/* Additional Interactive Section */}
        {mounted && (
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-white/80">
                {insights.length} personalized insights generated for your financial goals
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
