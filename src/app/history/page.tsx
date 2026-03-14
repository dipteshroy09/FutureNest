"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CalculationHistory from "@/components/CalculationHistory";

export default function HistoryPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-[#c3dafe] via-[#d4c5f9] to-[#fecaca] pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-[#224c87] mb-1">Calculation History</h1>
            <p className="text-[#919090] text-sm">
              View and manage your saved investment calculations
            </p>
          </div>
          <CalculationHistory />
        </div>
      </main>
      <Footer />
    </>
  );
}
