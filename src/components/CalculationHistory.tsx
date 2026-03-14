"use client";

import { useState, useEffect } from "react";
import { getCalculations, deleteCalculation, updateCalculation, type Calculation } from "@/services/api";
import Link from "next/link";

export default function CalculationHistory() {
  const [calculations, setCalculations] = useState<Calculation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    loadCalculations();
  }, []);

  const loadCalculations = async () => {
    try {
      setLoading(true);
      const data = await getCalculations();
      setCalculations(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load history");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this calculation?")) return;

    setDeletingId(id);
    try {
      await deleteCalculation(id);
      setCalculations(calculations.filter((c) => c.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete");
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggleSave = async (calc: Calculation) => {
    try {
      await updateCalculation(calc.id, { is_saved: !calc.is_saved });
      setCalculations(
        calculations.map((c) =>
          c.id === calc.id ? { ...c, is_saved: !c.is_saved } : c
        )
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to update");
    }
  };

  const formatCurrency = (value: number) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(2)} Cr`;
    }
    if (value >= 100000) {
      return `₹${(value / 100000).toFixed(2)} L`;
    }
    return `₹${value.toLocaleString("en-IN")}`;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#224c87]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={loadCalculations}
          className="px-4 py-2 bg-[#224c87] text-white rounded hover:bg-[#1a3a6b]"
        >
          Retry
        </button>
      </div>
    );
  }

  if (calculations.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-xl">
        <p className="text-gray-600 mb-4">No saved calculations yet.</p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-[#224c87] text-white rounded-lg hover:bg-[#1a3a6b] transition-colors"
        >
          Create Your First Calculation
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#224c87]">
          Your Calculations ({calculations.length})
        </h2>
        <button
          onClick={loadCalculations}
          className="text-sm text-[#224c87] hover:underline"
        >
          Refresh
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {calculations.map((calc) => (
          <div
            key={calc.id}
            className={`bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm border-2 transition-all hover:shadow-md hover:bg-white/90 ${
              calc.is_saved ? "border-[#224c87]" : "border-gray-200"
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg text-gray-900">{calc.goal_name}</h3>
                <p className="text-sm text-gray-500">{formatDate(calc.created_at)}</p>
              </div>
              <button
                onClick={() => handleToggleSave(calc)}
                className={`p-2 rounded-full transition-colors ${
                  calc.is_saved
                    ? "text-yellow-500 hover:bg-yellow-50"
                    : "text-gray-400 hover:bg-gray-100"
                }`}
                title={calc.is_saved ? "Unsave" : "Save"}
              >
                <svg className="w-5 h-5" fill={calc.is_saved ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </button>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Goal Cost:</span>
                <span className="font-medium">{formatCurrency(calc.future_goal_value)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Monthly SIP:</span>
                <span className="font-medium text-[#da3832]">{formatCurrency(calc.required_sip)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Timeline:</span>
                <span className="font-medium">{calc.years} years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Expected Wealth:</span>
                <span className="font-medium text-green-600">{formatCurrency(calc.expected_wealth)}</span>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <Link
                href={`/history/${calc.id}`}
                className="flex-1 text-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
              >
                View Details
              </Link>
              <button
                onClick={() => handleDelete(calc.id)}
                disabled={deletingId === calc.id}
                className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50"
              >
                {deletingId === calc.id ? (
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
