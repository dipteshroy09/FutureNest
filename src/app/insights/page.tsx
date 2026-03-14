"use client";

import Header from "@/components/Header";
import Insights from "@/components/Insights";
import Footer from "@/components/Footer";
import { useCalculatorContext } from "@/context/CalculatorContext";

export default function InsightsPage() {
  const { insights } = useCalculatorContext();

  return (
    <div className="bg-[#050023] min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Insights insights={insights} />
      </main>
      <Footer />
    </div>
  );
}
