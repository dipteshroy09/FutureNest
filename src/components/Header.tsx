"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/about", label: "How It Works" },
    { href: "/insights", label: "Insights" },
    { href: "/history", label: "History" },
  ];

  // On home page: fully transparent until scrolled. On other pages: always solid dark blue.
  const bgClass = isHome
    ? scrolled
      ? "bg-[#282c3f]/90 backdrop-blur-md shadow-lg shadow-black/30 border-b border-white/5"
      : "bg-transparent"
    : "bg-[#282c3f] shadow-lg";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${bgClass}`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group" aria-label="FutureNest Home">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-light to-accent flex items-center justify-center shadow-md group-hover:scale-105 transition-transform overflow-hidden">
              <img src="/logo.png" alt="FutureNest" className="w-full h-full object-contain" />
            </div>
            <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-blue-200 to-[#fca5a5] bg-clip-text text-transparent">
              FutureNest
            </span>
          </Link>

          {/* Desktop nav & profile */}
          <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center gap-1" aria-label="Main navigation">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                      active
                        ? "text-white bg-white/15"
                        : "text-white/75 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#282c3f]/95 backdrop-blur-md border-t border-white/10">
          <nav className="px-6 py-3 space-y-1" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block px-4 py-2.5 text-sm font-semibold text-white/75 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
