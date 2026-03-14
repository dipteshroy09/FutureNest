"use client";

import { useState } from "react";
import { saveCalculation, type CalculationInput } from "@/services/api";

interface SaveCalculationButtonProps {
  inputs: CalculationInput;
  onSave?: () => void;
  className?: string;
}

export default function SaveCalculationButton({
  inputs,
  onSave,
  className = "",
}: SaveCalculationButtonProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);

    try {
      await saveCalculation(inputs);
      setSaved(true);
      onSave?.();
      
      // Reset saved state after 3 seconds
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={handleSave}
        disabled={isSaving || saved}
        className={`
          px-6 py-3 rounded-lg font-semibold transition-all duration-200
          ${saved 
            ? "bg-green-600 text-white cursor-default" 
            : "bg-[#224c87] text-white hover:bg-[#1a3a6b] hover:shadow-lg active:scale-95"
          }
          disabled:opacity-50 disabled:cursor-not-allowed
          ${className}
        `}
      >
        {isSaving ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Saving...
          </span>
        ) : saved ? (
          <span className="flex items-center gap-2">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Saved!
          </span>
        ) : (
          "Save Calculation"
        )}
      </button>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
