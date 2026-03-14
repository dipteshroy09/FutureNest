"use client";

import Header from "@/components/Header";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="bg-[#051129] min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-8">
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
}
