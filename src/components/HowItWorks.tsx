"use client";

import { motion } from "framer-motion";
import { 
  FileText, 
  TrendingUp, 
  Calculator, 
  BarChart3, 
  AlertTriangle, 
  ChevronRight,
  Target,
  LineChart,
  Scale,
  Goal
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Enter Goal Details",
    description: "Select your financial goal and enter the current cost of your target.",
    icon: FileText,
    bottomIcon: Target,
    color: "blue",
    gradient: "from-blue-500/20 to-blue-600/5",
    accent: "text-blue-400",
    bgAccent: "bg-blue-500",
  },
  {
    number: "02",
    title: "Adjust for Inflation",
    description: "Set the expected inflation rate to calculate the real future cost.",
    icon: LineChart,
    bottomIcon: Scale,
    color: "red",
    gradient: "from-red-500/20 to-red-600/5",
    accent: "text-red-400",
    bgAccent: "bg-red-500",
  },
  {
    number: "03",
    title: "Calculate Investment",
    description: "The calculator determines the monthly SIP needed to reach your goal.",
    icon: Calculator,
    bottomIcon: Goal,
    color: "emerald",
    gradient: "from-emerald-500/20 to-emerald-600/5",
    accent: "text-emerald-400",
    bgAccent: "bg-emerald-500",
  },
  {
    number: "04",
    title: "View Projections",
    description: "Explore detailed charts, timelines, and insights about your investment.",
    icon: BarChart3,
    bottomIcon: TrendingUp,
    color: "amber",
    gradient: "from-amber-500/20 to-amber-600/5",
    accent: "text-amber-400",
    bgAccent: "bg-amber-500",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative py-8 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#051129]"
      aria-labelledby="how-title"
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            id="how-title"
            className="text-3xl sm:text-4xl font-extrabold text-white mb-3 tracking-tight"
          >
            Simple Steps to Start
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base text-white/60 max-w-2xl mx-auto"
          >
            Start planning your financial goals in just four easy steps.
          </motion.p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-6 relative">
          {steps.map((step, i) => (
            <div key={step.number} className="relative group">
              {/* Connector Arrow (Desktop Only) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 -right-[1.15rem] translate-x-1/2 -translate-y-1/2 z-20 items-center justify-center">
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-white/30"
                  >
                    <ChevronRight className="w-7 h-7" />
                  </motion.div>
                </div>
              )}

              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className={`relative h-full bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2rem] p-6 flex flex-col items-center text-center transition-all duration-300 hover:bg-white/[0.06] hover:border-white/20 shadow-2xl`}
              >
                {/* Glow Effect on Hover */}
                <div className={`absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br ${step.gradient}`} />

                {/* Top Icon */}
                <div className={`relative w-14 h-14 rounded-2xl ${step.bgAccent} shadow-2xl flex items-center justify-center mb-4 ring-4 ring-white/5`}>
                  <step.icon className="w-7 h-7 text-white" />
                </div>

                {/* Step Label */}
                <span className={`text-[10px] font-bold tracking-[0.2em] uppercase ${step.accent} mb-2`}>
                  Step {step.number}
                </span>

                {/* Title & Desc */}
                <h3 className="text-lg font-bold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed mb-6 flex-grow">
                  {step.description}
                </p>

                {/* Bottom Illustration Placeholder */}
                <div className="relative w-full h-16 mt-auto flex items-end justify-center">
                   <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent rounded-2xl opacity-50" />
                   <motion.div
                     animate={{ 
                       y: [0, -4, 0],
                       rotate: [0, 2, 0]
                     }}
                     transition={{ repeat: Infinity, duration: 4, delay: i * 0.5 }}
                     className="z-10 pb-2"
                   >
                     <step.bottomIcon size={48} className={`${step.accent} opacity-80`} strokeWidth={1.5} />
                   </motion.div>
                   {/* Decorative dots/circles for "illustration" feel */}
                   <div className={`absolute bottom-2 left-1/4 w-2 h-2 rounded-full ${step.bgAccent} opacity-40 blur-sm`} />
                   <div className={`absolute bottom-6 right-1/4 w-3 h-3 rounded-full ${step.bgAccent} opacity-20 blur-[2px]`} />
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <motion.div
           initial={{ opacity: 0, y: 15 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.3 }}
           className="relative max-w-5xl mx-auto"
        >
          <div className="bg-amber-500/5 backdrop-blur-3xl border border-amber-500/20 rounded-[1.5rem] p-5 flex flex-col md:flex-row items-center md:items-start gap-4 shadow-2xl overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-[40px] -mr-24 -mt-24" />
            
            <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 ring-2 ring-amber-500/20">
              <AlertTriangle className="w-5 h-5" />
            </div>
            
            <div className="flex-1">
              <h4 className="text-lg font-bold text-amber-200 mb-1">Disclaimer</h4>
              <p className="text-sm text-amber-200/60 leading-relaxed">
                This tool has been designed for information purposes only. Actual results may vary depending on various factors involved in the capital market. Please consult your financial advisor before making investment decisions.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
