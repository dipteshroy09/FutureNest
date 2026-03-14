import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { CalculatorProvider } from "@/context/CalculatorContext";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "FutureNest – Goal-Based Investment Calculator",
  description:
    "Plan your financial future with inflation-aware investment planning. Calculate the monthly SIP required to achieve your financial goals.",
  keywords: [
    "SIP calculator",
    "investment planner",
    "goal based investing",
    "inflation calculator",
    "mutual fund",
  ],
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.png" sizes="any" />
      </head>
      <body className={`${montserrat.variable} font-sans antialiased`}>
        <CalculatorProvider>
          {children}
        </CalculatorProvider>
      </body>
    </html>
  );
}
