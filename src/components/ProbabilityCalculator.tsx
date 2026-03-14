"use client";

import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { formatFullCurrency } from "@/lib/calculations";
import { Calculator, TrendingUp, Target, BarChart3, Info, AlertCircle } from "lucide-react";

interface ProbabilityCalculatorProps {
  monthlySIP: number;
  expectedReturn: number;
  years: number;
  goalAmount: number;
}

interface SimulationResult {
  year: number;
  lowerBound: number;
  expectedValue: number;
  upperBound: number;
  goalAmount: number;
}

export default function ProbabilityCalculator({ monthlySIP, expectedReturn, years, goalAmount }: ProbabilityCalculatorProps) {
  const [mounted, setMounted] = useState(false);
  const [confidenceLevel, setConfidenceLevel] = useState(90);
  const [volatility, setVolatility] = useState(15);
  const [simulationResults, setSimulationResults] = useState<SimulationResult[]>([]);

  // Monte Carlo simulation for investment returns
  const runMonteCarloSimulation = () => {
    const simulations = 1000;
    const monthlyReturn = expectedReturn / 100 / 12;
    const monthlyVolatility = volatility / 100 / Math.sqrt(12);
    
    const results: SimulationResult[] = [];
    
    for (let year = 1; year <= years; year++) {
      const months = year * 12;
      const lowerBounds: number[] = [];
      const upperBounds: number[] = [];
      
      // Run multiple simulations
      for (let sim = 0; sim < simulations; sim++) {
        let value = 0;
        
        for (let month = 0; month < months; month++) {
          // Random return with normal distribution approximation
          const randomReturn = monthlyReturn + (Math.random() - 0.5) * 2 * monthlyVolatility;
          value = value * (1 + randomReturn) + monthlySIP;
        }
        
        lowerBounds.push(value);
        upperBounds.push(value);
      }
      
      // Calculate percentiles
      lowerBounds.sort((a, b) => a - b);
      upperBounds.sort((a, b) => a - b);
      
      const lowerPercentile = Math.floor((100 - confidenceLevel) / 2);
      const upperPercentile = Math.floor(100 - lowerPercentile);
      
      // Calculate expected value (deterministic)
      let expectedValue = 0;
      const monthlyRate = expectedReturn / 100 / 12;
      for (let month = 0; month < months; month++) {
        expectedValue = expectedValue * (1 + monthlyRate) + monthlySIP;
      }
      
      results.push({
        year,
        lowerBound: lowerBounds[lowerPercentile * simulations / 100],
        expectedValue,
        upperBound: upperBounds[upperPercentile * simulations / 100],
        goalAmount
      });
    }
    
    return results;
  };

  useEffect(() => {
    setMounted(true);
    const results = runMonteCarloSimulation();
    setSimulationResults(results);
  }, [monthlySIP, expectedReturn, years, goalAmount, confidenceLevel, volatility]);

  const calculateSuccessProbability = () => {
    if (simulationResults.length === 0) return 0;
    
    const finalResult = simulationResults[simulationResults.length - 1];
    const range = finalResult.upperBound - finalResult.lowerBound;
    const goalPosition = (goalAmount - finalResult.lowerBound) / range;
    
    // Convert to probability (simplified)
    const probability = Math.max(0, Math.min(100, (1 - goalPosition) * 100));
    
    return Math.round(probability);
  };

  const successProbability = calculateSuccessProbability();
  const finalResult = simulationResults[simulationResults.length - 1];

  const getProbabilityColor = (prob: number) => {
    if (prob >= 80) return 'text-green-600 bg-green-100';
    if (prob >= 60) return 'text-yellow-600 bg-yellow-100';
    if (prob >= 40) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getProbabilityIcon = (prob: number) => {
    if (prob >= 80) return Target;
    if (prob >= 60) return TrendingUp;
    return AlertCircle;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800 mb-2">Year {label}</p>
          <div className="space-y-1">
            <p className="text-sm text-gray-600">
              Lower Bound ({100 - confidenceLevel}%): {formatFullCurrency(data.lowerBound)}
            </p>
            <p className="text-sm font-medium text-gray-800">
              Expected: {formatFullCurrency(data.expectedValue)}
            </p>
            <p className="text-sm text-gray-600">
              Upper Bound ({confidenceLevel}%): {formatFullCurrency(data.upperBound)}
            </p>
            <p className="text-sm font-medium text-blue-600">
              Goal: {formatFullCurrency(data.goalAmount)}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-wider text-blue-700 bg-blue-100 rounded-full uppercase mb-4">
            <Calculator className="w-3 h-3" />
            Probability Analysis
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Goal Achievement Probability Calculator
          </h2>
          <p className="mt-3 text-neutral max-w-xl mx-auto">
            Monte Carlo simulation to estimate the probability of achieving your financial goal.
          </p>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confidence Level: {confidenceLevel}%
            </label>
            <input
              type="range"
              min="70"
              max="99"
              value={confidenceLevel}
              onChange={(e) => setConfidenceLevel(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>70%</span>
              <span>99%</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Market Volatility: {volatility}%
            </label>
            <input
              type="range"
              min="5"
              max="30"
              value={volatility}
              onChange={(e) => setVolatility(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Low (5%)</span>
              <span>High (30%)</span>
            </div>
          </div>
        </div>

        {/* Success Probability Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="text-center">
            <div className={`inline-flex items-center gap-3 px-6 py-4 rounded-2xl ${getProbabilityColor(successProbability)}`}>
              {(() => {
                const Icon = getProbabilityIcon(successProbability);
                return <Icon className="w-8 h-8" />;
              })()}
              <div>
                <div className="text-3xl font-bold">{successProbability}%</div>
                <div className="text-sm font-medium">Probability of Success</div>
              </div>
            </div>
            
            <p className="mt-4 text-gray-600 max-w-md mx-auto">
              {successProbability >= 80 
                ? "Excellent! Your investment plan has a high probability of achieving your goal."
                : successProbability >= 60
                ? "Good chance of success. Consider increasing your SIP or extending the time horizon."
                : successProbability >= 40
                ? "Moderate chance. You may need to adjust your strategy to improve success probability."
                : "Low probability. Consider significantly increasing your investment or adjusting your expectations."
              }
            </p>
          </div>
        </div>

        {/* Projection Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            Monte Carlo Simulation Results
          </h3>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={simulationResults} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`} />
                <Tooltip content={<CustomTooltip />} />
                
                {/* Upper bound area */}
                <Area
                  type="monotone"
                  dataKey="upperBound"
                  stackId="1"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.2}
                  strokeDasharray="5 5"
                />
                
                {/* Expected value area */}
                <Area
                  type="monotone"
                  dataKey="expectedValue"
                  stackId="2"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.4}
                />
                
                {/* Lower bound area */}
                <Area
                  type="monotone"
                  dataKey="lowerBound"
                  stackId="3"
                  stroke="#ef4444"
                  fill="#ef4444"
                  fillOpacity={0.2}
                  strokeDasharray="5 5"
                />
                
                {/* Goal line */}
                <Line
                  type="monotone"
                  dataKey="goalAmount"
                  stroke="#f59e0b"
                  strokeWidth={3}
                  strokeDasharray="10 5"
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-sm text-gray-600">Expected Value</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded opacity-40"></div>
              <span className="text-sm text-gray-600">Upper Bound ({confidenceLevel}% confidence)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded opacity-40"></div>
              <span className="text-sm text-gray-600">Lower Bound ({100 - confidenceLevel}% confidence)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-0 bg-orange-500 border-t-2 border-dashed border-orange-500"></div>
              <span className="text-sm text-gray-600">Goal Amount</span>
            </div>
          </div>
        </div>

        {/* Key Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Target className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Expected Final Value</p>
                <p className="text-xl font-bold text-gray-900">
                  {finalResult ? formatFullCurrency(finalResult.expectedValue) : '₹0'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Best Case Scenario</p>
                <p className="text-xl font-bold text-gray-900">
                  {finalResult ? formatFullCurrency(finalResult.upperBound) : '₹0'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Worst Case Scenario</p>
                <p className="text-xl font-bold text-gray-900">
                  {finalResult ? formatFullCurrency(finalResult.lowerBound) : '₹0'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-1">About Monte Carlo Simulation</p>
              <p>
                This simulation runs 1000 scenarios with random market fluctuations to estimate the probability of achieving your goal. 
                The confidence level determines the range between best and worst case scenarios. Higher volatility increases the range of possible outcomes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
