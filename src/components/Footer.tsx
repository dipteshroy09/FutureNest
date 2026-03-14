"use client";

export default function Footer() {
  return (
    <footer className="bg-[#282c3f] text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center overflow-hidden">
                <img src="/logo.png" alt="FutureNest" className="w-full h-full object-contain" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Future<span className="text-accent-light">Nest</span>
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Educational financial planning tool. Helping you visualize and plan
              your financial goals with transparency.
            </p>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-semibold text-white/90 mb-4 text-sm uppercase tracking-wider">
              Features
            </h4>
            <ul className="space-y-2">
              {[
                "Goal Timeline Simulator",
                "Inflation Impact Visualizer",
                "Smart Financial Insights",
                "Scenario Testing",
              ].map((feature) => (
                <li
                  key={feature}
                  className="text-white/60 text-sm flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-light" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Spacer for layout balance */}
          <div />
        </div>

        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} FutureNest. Educational financial
            planning tool.
          </p>
        </div>
      </div>
    </footer>
  );
}
