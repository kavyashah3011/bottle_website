import { ArrowUpRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative bg-black border-t border-white/10 pt-20 pb-12 px-6 sm:px-12 text-white/70 overflow-hidden">
      {/* Background ambient water glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-brand-aqua/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-16 relative z-10">
        {/* Top: Large Brand Identity & Newsletter */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 pb-16 border-b border-white/10">
          <div className="flex flex-col gap-4 max-w-md">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center bg-white/5">
                <span className="text-sm font-serif-luxury font-bold tracking-widest text-brand-amber">
                  VM
                </span>
              </div>
              <span className="text-xl font-extrabold tracking-[0.25em] text-white">
                BOTVOR
              </span>
            </div>
            <p className="text-xs tracking-wider uppercase text-brand-amber">
              VITAL ELIXIR  •  NATURAL ALPINE MINERAL WATER
            </p>
            <p className="text-sm text-white/50 leading-relaxed pt-2">
              Extracted from pristine sub-alpine aquifers at 2,840m altitude. Encased in infinite flint glass to preserve chemical purity and elemental vitality.
            </p>
          </div>

          {/* Newsletter / Private Allocation */}
          <div className="flex flex-col gap-3 w-full lg:w-96">
            <span className="text-xs font-semibold tracking-mega uppercase text-white/80">
              Concierge Allocation
            </span>
            <p className="text-xs text-white/50">
              Receive private dispatch notifications for limited-run reserve bottlings and hospitality allocations.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2 mt-2">
              <input
                type="email"
                placeholder="Enter executive email"
                className="w-full px-4 py-2.5 bg-white/5 border border-white/15 rounded-full text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-brand-amber transition-colors"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-white text-black hover:bg-brand-amber transition-colors rounded-full text-xs font-bold tracking-wider uppercase flex items-center gap-1"
              >
                <span>JOIN</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </form>
          </div>
        </div>

        {/* Middle Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-xs">
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-mono tracking-mega text-brand-amber uppercase">
              The Vessel
            </span>
            <a href="#vessel" className="hover:text-white transition-colors">500ml Daily Edition</a>
            <a href="#vessel" className="hover:text-white transition-colors">750ml Grand Cuvée</a>
            <a href="#vessel" className="hover:text-white transition-colors">Flint Glass Architecture</a>
            <a href="#vessel" className="hover:text-white transition-colors">Hermetic Seal Specs</a>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-mono tracking-mega text-brand-amber uppercase">
              Provenance
            </span>
            <a href="#water" className="hover:text-white transition-colors">Alpine Aquifer (2,840m)</a>
            <a href="#water" className="hover:text-white transition-colors">Volcanic Basalt Filter</a>
            <a href="#water" className="hover:text-white transition-colors">Mineral Spectrum (pH 7.85)</a>
            <a href="#water" className="hover:text-white transition-colors">Lab Assay & TDS Certs</a>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-mono tracking-mega text-brand-amber uppercase">
              Endurance
            </span>
            <a href="#performance" className="hover:text-white transition-colors">Hydration Telemetry</a>
            <a href="#performance" className="hover:text-white transition-colors">Athletic Partners</a>
            <a href="#story" className="hover:text-white transition-colors">Campaign Film (4K)</a>
            <a href="#story" className="hover:text-white transition-colors">Brand Manifesto</a>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-mono tracking-mega text-brand-amber uppercase">
              Inquiries
            </span>
            <a href="#" className="hover:text-white transition-colors">Private Concierge</a>
            <a href="#" className="hover:text-white transition-colors">Michelin Hospitality</a>
            <a href="#" className="hover:text-white transition-colors">Global Flagships (NYC/MIL/TYO)</a>
            <a href="#" className="hover:text-white transition-colors">Press & Media Kit</a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10 text-[11px] text-white/40">
          <p>© {new Date().getFullYear()} BOTVOR MINERAL VITALITÉ. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white/70 transition-colors">PRIVACY POLICY</a>
            <a href="#" className="hover:text-white/70 transition-colors">TERMS OF EXCELLENCE</a>
            <a href="#" className="hover:text-white/70 transition-colors">SUSTAINABILITY PACT</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
