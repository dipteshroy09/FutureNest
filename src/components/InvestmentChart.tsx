"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
  Area,
} from "recharts";
import { YearlyBreakdown, formatFullCurrency } from "@/lib/calculations";

interface InvestmentChartProps {
  breakdown: YearlyBreakdown[];
}

export default function InvestmentChart({ breakdown }: InvestmentChartProps) {
  return (
    <section
      className="py-16 px-4 sm:px-6 lg:px-8"
      aria-labelledby="growth-chart-title"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-primary bg-primary/10 rounded-full uppercase mb-4">
            Growth Projection
          </span>
          <h2
            id="growth-chart-title"
            className="text-3xl sm:text-4xl font-bold text-gray-900"
          >
            Investment Growth Chart
          </h2>
          <p className="mt-3 text-neutral max-w-xl mx-auto">
            Visualize how your portfolio grows over time compared to your total
            investment.
          </p>
        </div>

        <div className="bg-surface rounded-2xl shadow-xl shadow-primary/5 border border-gray-100 p-6 sm:p-8">
          <div className="h-[380px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={breakdown}
                margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="mainInvestedGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#224c87" stopOpacity={0.15} />
                    <stop offset="100%" stopColor="#224c87" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="mainPortfolioGrad"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#da3832" stopOpacity={0.15} />
                    <stop offset="100%" stopColor="#da3832" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="year"
                  tick={{ fontSize: 12, fill: "#999" }}
                  axisLine={false}
                  tickLine={false}
                  label={{
                    value: "Year",
                    position: "insideBottomRight",
                    offset: -5,
                    fontSize: 12,
                    fill: "#999",
                  }}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#999" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) =>
                    v >= 10000000
                      ? `${(v / 10000000).toFixed(1)}Cr`
                      : v >= 100000
                      ? `${(v / 100000).toFixed(1)}L`
                      : `${(v / 1000).toFixed(0)}K`
                  }
                />
                <Tooltip
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  formatter={(value: any, name: any) => [
                    formatFullCurrency(Number(value)),
                    name === "invested" ? "Total Invested" : "Portfolio Value",
                  ]}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #e5e7eb",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    fontSize: "13px",
                  }}
                />
                <Legend
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  formatter={(value: any) =>
                    value === "invested" ? "Total Invested" : "Portfolio Value"
                  }
                  wrapperStyle={{ fontSize: "13px" }}
                />
                <Area
                  type="monotone"
                  dataKey="invested"
                  fill="url(#mainInvestedGrad)"
                  stroke="none"
                />
                <Area
                  type="monotone"
                  dataKey="portfolioValue"
                  fill="url(#mainPortfolioGrad)"
                  stroke="none"
                />
                <Line
                  type="monotone"
                  dataKey="invested"
                  stroke="#224c87"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 6, fill: "#224c87", stroke: "#fff", strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="portfolioValue"
                  stroke="#da3832"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 6, fill: "#da3832", stroke: "#fff", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
