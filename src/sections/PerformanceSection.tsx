import { Flame, Gauge, Activity, ArrowUpRight } from 'lucide-react';
import { CHAPTERS } from '../data/brandContent';

export function PerformanceSection() {
  const chapter = CHAPTERS[2]; // Unbroken Momentum

  return (
    <section id="performance" className="relative w-full py-28 sm:py-36 px-6 sm:px-12 bg-black border-t border-white/5 overflow-hidden">
      {/* Background kinetic stadium flare */}
      <div className="absolute top-1/3 right-0 w-[650px] h-[650px] bg-brand-amber/10 blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        {/* Header */}
        <div className="border-b border-white/10 pb-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase">
              {chapter.title}
            </h2>
            <span className="text-sm font-serif-luxury tracking-widest text-white/50 italic">
              {chapter.subtitle}
            </span>
          </div>
        </div>

        {/* Athletic Grid: Sprinter + Cyclist Dual Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Large Visual: Track Sprinter drinking mid-stride */}
          <div className="lg:col-span-7 relative rounded-2xl overflow-hidden border border-white/15 bg-brand-surface shadow-2xl group">
            <div className="relative aspect-[16/11] w-full h-full">
              <img
                src={chapter.image}
                alt="Olympic sprinter drinking water bottle with explosive droplets at sunset stadium"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              <div className="absolute bottom-8 left-8 right-8 flex flex-col gap-2">
                <span className="text-xs font-mono text-brand-amber uppercase tracking-wider">
                  GOLDEN HOUR TRACK SPRINT // 00:13.4
                </span>
                <h4 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-tight">
                  BUILT AROUND MOMENTUM.
                </h4>
                <p className="text-xs sm:text-sm text-white/70 max-w-lg font-light leading-relaxed">
                  Water is delivered through the laminar-flow spout without interrupting respiration or stride mechanics. Every drop cools and revives.
                </p>
              </div>
            </div>
          </div>

          {/* Secondary Visual: Coastal Road Cyclist + Endurance Metrics */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Cyclist Image */}
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/15 bg-brand-surface shadow-xl group">
              <img
                src="/images/cyclist.jpg"
                alt="Road cyclist on mountain highway in aero posture"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-xs font-mono text-white/80">
                <span className="px-2.5 py-1 rounded bg-black/70 border border-white/15 text-brand-amber">
                  AERODYNAMIC ENDURANCE // 00:22.0
                </span>
              </div>
            </div>

            {/* Endurance Telemetry Metrics */}
            <div className="p-6 rounded-2xl glass-panel border border-white/10 flex flex-col gap-4">
              <span className="text-[10px] font-mono tracking-mega text-brand-amber uppercase">
                Physiological Telemetry
              </span>

              <div className="grid grid-cols-2 gap-4 text-left">
                <div className="flex flex-col gap-1 border-r border-white/10 pr-2">
                  <span className="text-xs text-white/40">Osmotic Balance</span>
                  <span className="text-lg font-bold text-white">285 mOsm/kg</span>
                  <span className="text-[10px] text-brand-amber">Matches human plasma</span>
                </div>
                <div className="flex flex-col gap-1 pl-2">
                  <span className="text-xs text-white/40">Silica Index</span>
                  <span className="text-lg font-bold text-white">14.2 mg/L</span>
                  <span className="text-[10px] text-brand-aqua">Joint & tissue recovery</span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-between items-center text-xs">
                <span className="text-white/60">Natural Mineralization</span>
                <span className="text-white font-mono font-semibold">ZERO SYNTHETIC ADDITIVES</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
