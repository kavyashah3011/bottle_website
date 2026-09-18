import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Mountain, Droplets, Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  const telemetryStats = [
    {
      icon: Mountain,
      stat: '2,840m',
      label: 'Aquifer Elevation',
      detail: 'Val d’Aosta Glacier Source',
    },
    {
      icon: Droplets,
      stat: '7.85 pH',
      label: 'Natural Alkalinity',
      detail: 'Subterranean Basalt Filtration',
    },
    {
      icon: Sparkles,
      stat: '42 mg/L',
      label: 'Mineral Equilibrium',
      detail: 'Ultra-Pure TDS Spectrum',
    },
    {
      icon: ShieldCheck,
      stat: '100%',
      label: 'Flint Glass Vessel',
      detail: 'Hermetic Machined Aluminum Cap',
    },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-[#0A101D] via-[#0E1726] to-[#070B14] border-t border-cyan-500/20 pt-20 pb-12 px-6 sm:px-12 text-slate-300 overflow-hidden">
      {/* Luminous Alpine Atmospheric Glows */}
      <div className="absolute -top-32 left-1/4 w-[750px] h-[380px] bg-sky-500/10 blur-[160px] pointer-events-none -z-0" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[320px] bg-amber-400/5 blur-[150px] pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto flex flex-col gap-16 relative z-10">
        {/* Top: Brand Identity & VIP Private Allocation Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pb-12 border-b border-white/10">
          {/* Left Column: Brand Crest & Philosophy */}
          <div className="lg:col-span-6 flex flex-col gap-5">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full border border-amber-400/40 flex items-center justify-center bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md shadow-[0_0_25px_rgba(212,175,55,0.2)]">
                <span className="text-base font-serif-luxury font-bold tracking-widest text-[#E2C785]">
                  VM
                </span>
              </div>
              <span className="text-2xl font-extrabold tracking-[0.28em] text-white">
                BOTVOR
              </span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-400/30 bg-amber-400/5 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[10px] font-mono tracking-mega text-[#E2C785] uppercase font-semibold">
                VITAL ÉLIXIR • NATURAL ALPINE MINERAL WATER
              </span>
            </div>

            <p className="text-sm text-slate-300/80 leading-relaxed max-w-xl">
              Extracted from protected sub-alpine aquifers at 2,840m elevation in the Val d’Aosta Alps. Encased in infinite flint glass architecture to preserve geological purity, mineral vitality, and kinetic hydration.
            </p>

            {/* Quick Provenance Badges */}
            <div className="flex flex-wrap gap-2 pt-1 text-[10px] font-mono uppercase text-slate-400">
              <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10">
                ● 2,840M ELEVATION
              </span>
              <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10">
                ● pH 7.85 ALKALINE
              </span>
              <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10">
                ● LOW TDS 42mg/L
              </span>
              <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10">
                ● 100% FLINT GLASS
              </span>
            </div>
          </div>

          {/* Right Column: VIP Private Allocation Card */}
          <div className="lg:col-span-6 rounded-3xl p-7 sm:p-8 bg-gradient-to-br from-[#141F32]/90 via-[#0F1828]/85 to-[#0A1220]/95 border border-white/15 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.45)] relative overflow-hidden flex flex-col gap-4">
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/10 blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[10px] font-mono tracking-mega text-[#E2C785] uppercase font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>CONTACT US // PRIVATE ALLOCATION</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 uppercase">
                RESERVE ACCESS
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Request Private Allocation
              </h3>
              <p className="text-xs text-slate-300/75 leading-relaxed">
                Receive confidential dispatches for limited-harvest reserve bottlings, private cellar access, and Michelin hospitality allotments.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter executive email address"
                required
                className="flex-1 px-5 py-3.5 bg-[#090E18]/80 border border-white/20 rounded-full text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-400/70 transition-colors shadow-inner"
              />
              <button
                type="submit"
                className="px-7 py-3.5 bg-gradient-to-r from-[#E2C785] via-[#ECD89E] to-[#D4B062] hover:brightness-110 text-[#090E17] font-bold text-xs tracking-wider uppercase rounded-full transition-all shadow-[0_0_25px_rgba(226,199,133,0.3)] flex items-center justify-center gap-1.5 shrink-0"
              >
                <span>{subscribed ? 'REQUESTED' : 'JOIN ALLOCATION'}</span>
                {subscribed ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-900" />
                ) : (
                  <ArrowUpRight className="w-3.5 h-3.5" />
                )}
              </button>
            </form>

            {subscribed && (
              <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 animate-fade-in">
                <CheckCircle2 className="w-3 h-3" /> Allocation request received. Our client services team will verify credentials.
              </span>
            )}
          </div>
        </div>

        {/* Middle: Architectural Alpine Telemetry Ribbon (Replaces empty void) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {telemetryStats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#111A29]/60 border border-white/10 hover:border-white/20 transition-colors flex flex-col gap-2 group backdrop-blur-sm"
              >
                <div className="flex items-center justify-between text-slate-400">
                  <Icon className="w-4 h-4 text-[#E2C785] group-hover:scale-110 transition-transform" />
                  <span className="text-[9px] font-mono text-slate-500">
                    STAT 0{idx + 1}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl sm:text-2xl font-mono font-bold text-white tracking-tight">
                    {item.stat}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-200 uppercase tracking-wider">
                    {item.label}
                  </span>
                  <span className="text-[10px] text-slate-400 pt-0.5">
                    {item.detail}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pt-4 text-xs">
          <div className="flex flex-col gap-3.5">
            <span className="text-[11px] font-mono tracking-mega text-[#E2C785] uppercase font-bold">
              01 // THE VESSEL
            </span>
            <a href="#vessel" className="text-slate-300 hover:text-white transition-colors hover:translate-x-1 inline-block duration-200">500ml Daily Edition</a>
            <a href="#vessel" className="text-slate-300 hover:text-white transition-colors hover:translate-x-1 inline-block duration-200">750ml Grand Cuvée</a>
            <a href="#vessel" className="text-slate-300 hover:text-white transition-colors hover:translate-x-1 inline-block duration-200">Flint Glass Architecture</a>
            <a href="#vessel" className="text-slate-300 hover:text-white transition-colors hover:translate-x-1 inline-block duration-200">Hermetic Aluminum Cap</a>
            <a href="#vessel" className="text-slate-300 hover:text-white transition-colors hover:translate-x-1 inline-block duration-200">Weighted Crystal Base</a>
          </div>

          <div className="flex flex-col gap-3.5">
            <span className="text-[11px] font-mono tracking-mega text-[#E2C785] uppercase font-bold">
              02 // PROVENANCE
            </span>
            <a href="#water" className="text-slate-300 hover:text-white transition-colors hover:translate-x-1 inline-block duration-200">Alpine Aquifer (2,840m)</a>
            <a href="#water" className="text-slate-300 hover:text-white transition-colors hover:translate-x-1 inline-block duration-200">Volcanic Basalt Filter</a>
            <a href="#water" className="text-slate-300 hover:text-white transition-colors hover:translate-x-1 inline-block duration-200">Mineral Spectrum (pH 7.85)</a>
            <a href="#water" className="text-slate-300 hover:text-white transition-colors hover:translate-x-1 inline-block duration-200">Lab Assay & TDS Certs</a>
            <a href="#water" className="text-slate-300 hover:text-white transition-colors hover:translate-x-1 inline-block duration-200">Geological Chronology</a>
          </div>

          <div className="flex flex-col gap-3.5">
            <span className="text-[11px] font-mono tracking-mega text-[#E2C785] uppercase font-bold">
              03 // ENDURANCE
            </span>
            <a href="#performance" className="text-slate-300 hover:text-white transition-colors hover:translate-x-1 inline-block duration-200">Hydration Telemetry</a>
            <a href="#performance" className="text-slate-300 hover:text-white transition-colors hover:translate-x-1 inline-block duration-200">Athletic Partnerships</a>
            <a href="#film" className="text-slate-300 hover:text-white transition-colors hover:translate-x-1 inline-block duration-200">Campaign Master Film (4K)</a>
            <a href="#story" className="text-slate-300 hover:text-white transition-colors hover:translate-x-1 inline-block duration-200">Brand Manifesto</a>
            <a href="#story" className="text-slate-300 hover:text-white transition-colors hover:translate-x-1 inline-block duration-200">Executive Poise Study</a>
          </div>

          <div className="flex flex-col gap-3.5">
            <span className="text-[11px] font-mono tracking-mega text-[#E2C785] uppercase font-bold">
              04 // CONTACT US
            </span>
            <Link to="/contact" className="text-slate-300 hover:text-white transition-colors hover:translate-x-1 inline-block duration-200">Contact Us & Inquiries</Link>
            <Link to="/contact" className="text-slate-300 hover:text-white transition-colors hover:translate-x-1 inline-block duration-200">Private Cellar Allocations</Link>
            <Link to="/contact" className="text-slate-300 hover:text-white transition-colors hover:translate-x-1 inline-block duration-200">Michelin Hospitality Program</Link>
            <Link to="/contact" className="text-slate-300 hover:text-white transition-colors hover:translate-x-1 inline-block duration-200">Global Flagships (NYC / MIL / TYO)</Link>
            <Link to="/contact" className="text-slate-300 hover:text-white transition-colors hover:translate-x-1 inline-block duration-200">Corporate & Aviation Orders</Link>
          </div>
        </div>

        {/* Bottom Legal & Telemetry Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10 text-[11px] text-slate-400">
          <p>© {new Date().getFullYear()} BOTVOR MINERAL VITALITÉ. ALL RIGHTS RESERVED.</p>
          
          <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
            <span>VAL D’AOSTA, ALPS</span>
            <span>•</span>
            <span>45°44'N 7°20'E</span>
            <span>•</span>
            <span>ELEVATION 2,840M</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">PRIVACY POLICY</a>
            <a href="#" className="hover:text-white transition-colors">TERMS OF EXCELLENCE</a>
            <a href="#" className="hover:text-white transition-colors">SUSTAINABILITY PACT</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
