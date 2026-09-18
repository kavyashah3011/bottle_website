import { useState } from 'react';
import { Activity, Droplets, Flame, Gauge, Sparkles } from 'lucide-react';

export type IntensityLevel = 'low' | 'moderate' | 'elite';

export function HydrationCalculator() {
  const [weightKg, setWeightKg] = useState(75);
  const [durationMin, setDurationMin] = useState(60);
  const [intensity, setIntensity] = useState<IntensityLevel>('moderate');
  const [tempC, setTempC] = useState(24);

  // Scientific sweat rate estimation algorithm
  // Base sweat rate: ~0.8L/hr at moderate intensity 20°C for 70kg athlete
  const intensityMultiplier = intensity === 'low' ? 0.6 : intensity === 'moderate' ? 1.0 : 1.55;
  const tempMultiplier = 1 + Math.max(0, tempC - 20) * 0.025;
  const weightFactor = weightKg / 70;

  const hourlySweatRate = 0.85 * intensityMultiplier * tempMultiplier * weightFactor;
  const totalFluidLossL = (hourlySweatRate * (durationMin / 60)).toFixed(2);
  const bottlesRecommended = Math.ceil(parseFloat(totalFluidLossL) / 0.5);
  const electrolytesLostMg = Math.round(parseFloat(totalFluidLossL) * 800);

  return (
    <div className="w-full rounded-2xl glass-panel border border-brand-amber/25 p-6 sm:p-10 flex flex-col gap-8 shadow-2xl">
      <div className="flex flex-col gap-2 border-b border-white/10 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono tracking-mega text-brand-amber uppercase">
          <Activity className="w-3.5 h-3.5" />
          <span>Hydration Telemetry Matrix</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">
          Scientific Sweat Loss & Replenishment Calculator
        </h3>
        <p className="text-xs sm:text-sm text-white/60 font-light">
          Calibrated using metabolic heat dissipation models for endurance runners, cyclists, and executive athletes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Inputs */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Weight */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-xs">
              <span className="text-white/70 uppercase tracking-wider">Athlete Body Mass</span>
              <span className="font-mono text-brand-amber font-bold">{weightKg} KG</span>
            </div>
            <input
              type="range"
              min="45"
              max="120"
              value={weightKg}
              aria-label="Athlete Body Mass in Kilograms"
              aria-valuemin={45}
              aria-valuemax={120}
              aria-valuenow={weightKg}
              onChange={(e) => setWeightKg(Math.max(45, Math.min(120, parseInt(e.target.value) || 75)))}
              className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-brand-amber"
            />
          </div>

          {/* Duration */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-xs">
              <span className="text-white/70 uppercase tracking-wider">Effort Duration</span>
              <span className="font-mono text-brand-amber font-bold">{durationMin} MIN</span>
            </div>
            <input
              type="range"
              min="15"
              max="240"
              step="15"
              value={durationMin}
              aria-label="Effort Duration in Minutes"
              aria-valuemin={15}
              aria-valuemax={240}
              aria-valuenow={durationMin}
              onChange={(e) => setDurationMin(Math.max(15, Math.min(240, parseInt(e.target.value) || 60)))}
              className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-brand-amber"
            />
          </div>

          {/* Ambient Temp */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-xs">
              <span className="text-white/70 uppercase tracking-wider">Ambient Temperature</span>
              <span className="font-mono text-brand-amber font-bold">{tempC}°C</span>
            </div>
            <input
              type="range"
              min="10"
              max="42"
              value={tempC}
              aria-label="Ambient Temperature in Celsius"
              aria-valuemin={10}
              aria-valuemax={42}
              aria-valuenow={tempC}
              onChange={(e) => setTempC(Math.max(10, Math.min(42, parseInt(e.target.value) || 24)))}
              className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-brand-amber"
            />
          </div>

          {/* Intensity Segmented Control */}
          <div className="flex flex-col gap-2">
            <span className="text-xs text-white/70 uppercase tracking-wider">Metabolic Exertion</span>
            <div
              role="radiogroup"
              aria-label="Metabolic Exertion Level"
              className="grid grid-cols-3 gap-2 p-1 rounded-xl bg-white/5 border border-white/10"
            >
              {[
                { key: 'low' as const, label: 'Endurance Zone 2' },
                { key: 'moderate' as const, label: 'Threshold / Tempo' },
                { key: 'elite' as const, label: 'VO2 Max / Race' },
              ].map((lvl) => (
                <button
                  key={lvl.key}
                  type="button"
                  role="radio"
                  aria-checked={intensity === lvl.key}
                  onClick={() => setIntensity(lvl.key)}
                  className={`py-2 px-2 text-[11px] font-semibold tracking-wider rounded-lg transition-all ${
                    intensity === lvl.key
                      ? 'bg-brand-amber text-black font-bold shadow-md'
                      : 'text-white/50 hover:text-white'
                  }`}
                >
                  {lvl.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Output Dashboard */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-white/5 border border-white/15 flex flex-col gap-6 text-center lg:text-left">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-mono tracking-mega text-brand-amber uppercase">
              Calculated Fluid Deficit
            </span>
            <span className="text-4xl sm:text-5xl font-extrabold text-white font-mono">
              {totalFluidLossL} <span className="text-xl text-white/50 font-normal">LITRES</span>
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs pt-4 border-t border-white/10">
            <div className="flex flex-col gap-1">
              <span className="text-white/40 uppercase text-[10px] font-mono">Electrolytes Lost</span>
              <span className="text-lg font-bold text-white font-mono">~{electrolytesLostMg} mg</span>
              <span className="text-[10px] text-brand-aqua">Essential minerals</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-white/40 uppercase text-[10px] font-mono">BOTVOR Allocation</span>
              <span className="text-lg font-bold text-brand-amber font-mono">{bottlesRecommended} Vessels</span>
              <span className="text-[10px] text-white/60">500ml Classic Still</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-black/50 border border-white/10 text-left flex items-start gap-3 text-xs">
            <Droplets className="w-4 h-4 text-brand-aqua shrink-0 mt-0.5" />
            <p className="text-[11px] text-white/70 leading-relaxed">
              Consume <span className="text-white font-bold">{Math.round((hourlySweatRate * 1000) / 4)} ml</span> every 15 minutes. BOTVOR’s naturally alkaline pH 7.85 prevents gastric fullness during maximal cardiac output.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
