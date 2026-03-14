"use client";

import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { formatFullCurrency } from "@/lib/calculations";
import { PieChart as PieChartIcon, TrendingUp, Shield, DollarSign, AlertTriangle, Info } from "lucide-react";

interface AssetAllocation {
  name: string;
  value: number;
  percentage: number;
  risk: 'Low' | 'Medium' | 'High';
  expectedReturn: number;
  color: string;
}

interface PortfolioSimulatorProps {
  totalInvestment: number;
  expectedReturn: number;
  years: number;
}

export default function PortfolioSimulator({ totalInvestment, expectedReturn, years }: PortfolioSimulatorProps) {
  const [mounted, setMounted] = useState(false);
  const [selectedRiskProfile, setSelectedRiskProfile] = useState<'Conservative' | 'Moderate' | 'Aggressive'>('Moderate');
  const [hoveredAsset, setHoveredAsset] = useState<string | null>(null);

  const riskProfiles = {
    Conservative: {
      assets: [
        { name: 'Government Bonds', percentage: 40, risk: 'Low' as const, expectedReturn: 6, color: '#224c87' },
        { name: 'Corporate Bonds', percentage: 30, risk: 'Low' as const, expectedReturn: 7, color: '#3b82f6' },
        { name: 'Large Cap Stocks', percentage: 20, risk: 'Medium' as const, expectedReturn: 10, color: '#10b981' },
        { name: 'Cash & Equivalents', percentage: 10, risk: 'Low' as const, expectedReturn: 3, color: '#94a3b8' },
      ],
      riskScore: 2,
      description: 'Focus on capital preservation with steady returns'
    },
    Moderate: {
      assets: [
        { name: 'Large Cap Stocks', percentage: 35, risk: 'Medium' as const, expectedReturn: 10, color: '#10b981' },
        { name: 'Mid Cap Stocks', percentage: 25, risk: 'Medium' as const, expectedReturn: 12, color: '#3b82f6' },
        { name: 'Corporate Bonds', percentage: 20, risk: 'Low' as const, expectedReturn: 7, color: '#224c87' },
        { name: 'Real Estate', percentage: 10, risk: 'Medium' as const, expectedReturn: 9, color: '#f59e0b' },
        { name: 'International Stocks', percentage: 10, risk: 'High' as const, expectedReturn: 14, color: '#ef4444' },
      ],
      riskScore: 5,
      description: 'Balanced approach with growth and stability'
    },
    Aggressive: {
      assets: [
        { name: 'Small Cap Stocks', percentage: 30, risk: 'High' as const, expectedReturn: 16, color: '#ef4444' },
        { name: 'Mid Cap Stocks', percentage: 25, risk: 'Medium' as const, expectedReturn: 12, color: '#3b82f6' },
        { name: 'Large Cap Stocks', percentage: 20, risk: 'Medium' as const, expectedReturn: 10, color: '#10b981' },
        { name: 'International Stocks', percentage: 15, risk: 'High' as const, expectedReturn: 14, color: '#f97316' },
        { name: 'Cryptocurrency', percentage: 10, risk: 'High' as const, expectedReturn: 25, color: '#8b5cf6' },
      ],
      riskScore: 8,
      description: 'High growth potential with increased volatility'
    }
  };

  const currentProfile = riskProfiles[selectedRiskProfile];
  
  const portfolioData: AssetAllocation[] = currentProfile.assets.map(asset => ({
    ...asset,
    value: (totalInvestment * asset.percentage) / 100
  }));

  const riskReturnData = Object.entries(riskProfiles).map(([profile, data]) => {
    const avgReturn = data.assets.reduce((sum, asset) => sum + (asset.expectedReturn * asset.percentage / 100), 0);
    return {
      profile,
      expectedReturn: avgReturn.toFixed(1),
      riskScore: data.riskScore,
      color: profile === selectedRiskProfile ? '#224c87' : '#e5e7eb'
    };
  });

  const portfolioExpectedReturn = currentProfile.assets.reduce((sum, asset) => 
    sum + (asset.expectedReturn * asset.percentage / 100), 0
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload[0]) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800">{data.name}</p>
          <p className="text-sm text-gray-600">Amount: {formatFullCurrency(data.value)}</p>
          <p className="text-sm text-gray-600">Allocation: {data.percentage}%</p>
          <p className="text-sm text-gray-600">Expected Return: {data.expectedReturn}%</p>
          <p className="text-sm font-medium" style={{
            color: data.risk === 'Low' ? '#10b981' : data.risk === 'Medium' ? '#f59e0b' : '#ef4444'
          }}>
            Risk: {data.risk}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-wider text-primary bg-primary/10 rounded-full uppercase mb-4">
            <PieChartIcon className="w-3 h-3" />
            Portfolio Analysis
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Investment Portfolio Simulator
          </h2>
          <p className="mt-3 text-neutral max-w-xl mx-auto">
            Optimize your asset allocation based on your risk tolerance and financial goals.
          </p>
        </div>

        {/* Risk Profile Selector */}
        <div className="mb-8">
          <div className="flex justify-center">
            <div className="inline-flex rounded-lg bg-white shadow-sm border border-gray-200 p-1">
              {Object.entries(riskProfiles).map(([profile, data]) => (
                <button
                  key={profile}
                  onClick={() => setSelectedRiskProfile(profile as keyof typeof riskProfiles)}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    selectedRiskProfile === profile
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {profile}
                </button>
              ))}
            </div>
          </div>
          <p className="text-center mt-3 text-sm text-gray-600 max-w-md mx-auto">
            {currentProfile.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Portfolio Allocation Chart */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary" />
              Asset Allocation
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={portfolioData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    animationBegin={0}
                    animationDuration={1000}
                  >
                    {portfolioData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color}
                        style={{
                          filter: hoveredAsset === entry.name ? 'brightness(1.1)' : 'brightness(1)',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={() => setHoveredAsset(entry.name)}
                        onMouseLeave={() => setHoveredAsset(null)}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Risk vs Return Chart */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Risk vs Return Analysis
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={riskReturnData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="profile" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="expectedReturn" fill="#224c87" radius={[8, 8, 0, 0]}>
                    {riskReturnData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Portfolio Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Expected Return</p>
                <p className="text-xl font-bold text-gray-900">{portfolioExpectedReturn.toFixed(1)}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Risk Score</p>
                <p className="text-xl font-bold text-gray-900">{currentProfile.riskScore}/10</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Risk Level</p>
                <p className="text-xl font-bold text-gray-900">{selectedRiskProfile}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Asset Breakdown */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Info className="w-5 h-5 text-primary" />
            Detailed Asset Breakdown
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Asset Class</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Allocation</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Amount</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Expected Return</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Risk</th>
                </tr>
              </thead>
              <tbody>
                {portfolioData.map((asset, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: asset.color }}
                        ></div>
                        <span className="text-sm font-medium text-gray-900">{asset.name}</span>
                      </div>
                    </td>
                    <td className="text-right py-3 px-4 text-sm text-gray-700">{asset.percentage}%</td>
                    <td className="text-right py-3 px-4 text-sm font-medium text-gray-900">
                      {formatFullCurrency(asset.value)}
                    </td>
                    <td className="text-right py-3 px-4 text-sm text-gray-700">{asset.expectedReturn}%</td>
                    <td className="text-center py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                        asset.risk === 'Low' ? 'bg-green-100 text-green-800' :
                        asset.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {asset.risk}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
