"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
      </main>
      <Footer />
    </>
  );
}
