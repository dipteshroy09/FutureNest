"use client";

import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
  Legend,
} from "recharts";
import { formatFullCurrency } from "@/lib/calculations";
import { TrendingUp, AlertCircle, Info } from "lucide-react";

interface InflationChartProps {
  currentCost: number;
  futureCost: number;
  years: number;
  inflationRate: number;
}

export default function InflationChart({
  currentCost,
  futureCost,
  years,
  inflationRate,
}: InflationChartProps) {
  const [mounted, setMounted] = useState(false);
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  const increase = (((futureCost - currentCost) / currentCost) * 100).toFixed(0);

  const data = [
    { 
      name: "Today's Cost", 
      value: currentCost, 
      fill: "#224c87",
      description: "Current cost of your goal"
    },
    { 
      name: `Cost in ${years} Yrs`, 
      value: futureCost, 
      fill: "#da3832",
      description: `Cost after ${years} years at ${inflationRate}% inflation`
    },
  ];

  const [animatedData, setAnimatedData] = useState(data);

  useEffect(() => {
    setMounted(true);
    // Animate bars on mount
    const timer = setTimeout(() => {
      setAnimatedData(data);
    }, 200);
    return () => clearTimeout(timer);
  }, [data]);

  return (
    <section
      className="py-16 px-4 sm:px-6 lg:px-8"
      aria-labelledby="inflation-title"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-wider text-accent bg-accent/10 rounded-full uppercase mb-4">
            <AlertCircle className="w-3 h-3" />
            Inflation Impact
          </span>
          <h2
            id="inflation-title"
            className="text-3xl sm:text-4xl font-bold text-gray-900"
          >
            Inflation Impact Visualizer
          </h2>
          <p className="mt-3 text-neutral max-w-xl mx-auto">
            See how inflation at {inflationRate}% will affect your goal cost over{" "}
            {years} years.
          </p>
          <div className="mt-4 flex justify-center gap-6 text-xs">
            <div className="flex items-center gap-2 text-neutral">
              <div className="w-3 h-3 rounded bg-primary"></div>
              <span>Current Cost</span>
            </div>
            <div className="flex items-center gap-2 text-neutral">
              <div className="w-3 h-3 rounded bg-accent"></div>
              <span>Future Cost</span>
            </div>
          </div>
        </div>

        <div className="bg-surface rounded-2xl shadow-xl shadow-primary/5 border border-gray-100 p-6 sm:p-8">
          {/* Chart */}
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={animatedData}
                margin={{ top: 40, right: 30, left: 30, bottom: 20 }}
                barCategoryGap="30%"
              >
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 13, fill: "#666", fontWeight: 500 }}
                />
                <YAxis 
                  hide 
                  domain={[0, Math.max(currentCost, futureCost) * 1.1]}
                />
                <Tooltip
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  formatter={(value: any) => formatFullCurrency(Number(value))}
                  cursor={{ fill: "rgba(34, 76, 135, 0.05)" }}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #e5e7eb",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                  }}
                  labelStyle={{ fontWeight: 600, marginBottom: 4 }}
                />
                <Bar 
                  dataKey="value" 
                  radius={[12, 12, 0, 0]} 
                  maxBarSize={120}
                  animationDuration={1500}
                  animationBegin={0}
                  onMouseEnter={(_, index) => setHoveredBar(index)}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  {animatedData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.fill}
                      style={{
                        filter: hoveredBar === index ? 'brightness(1.1)' : 'brightness(1)',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                      }}
                    />
                  ))}
                  <LabelList
                    dataKey="value"
                    position="top"
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    formatter={(value: any) => formatFullCurrency(Number(value))}
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      fill: "#1a1a2e",
                    }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Impact badges */}
          <div className="mt-8 space-y-4">
            <div className="flex justify-center">
              <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-500 ${
                mounted 
                  ? "bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20 opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-4"
              }`}>
                <TrendingUp className="w-5 h-5 text-accent" />
                <span className="text-sm font-semibold text-gray-800">
                  Inflation increases your goal cost by{" "}
                  <span className="text-accent text-lg font-bold">{increase}%</span>
                </span>
              </div>
            </div>
            
            {/* Additional insights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className={`bg-blue-50 border border-blue-200 rounded-lg p-4 transition-all duration-500 delay-200 ${
                mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <Info className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-blue-900">Monthly Impact</span>
                </div>
                <p className="text-xs text-blue-700">
                  You need to invest an additional{" "}
                  <span className="font-bold">
                    {formatFullCurrency((futureCost - currentCost) / (years * 12))}
                  </span>{" "}
                  per month due to inflation.
                </p>
              </div>
              
              <div className={`bg-orange-50 border border-orange-200 rounded-lg p-4 transition-all duration-500 delay-300 ${
                mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-orange-600" />
                  <span className="text-sm font-semibold text-orange-900">Total Extra Cost</span>
                </div>
                <p className="text-xs text-orange-700">
                  Inflation adds{" "}
                  <span className="font-bold">
                    {formatFullCurrency(futureCost - currentCost)}
                  </span>{" "}
                  to your goal over {years} years.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
