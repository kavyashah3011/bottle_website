import { Droplets, Sparkles, ShieldCheck, Activity, Award } from 'lucide-react';
import { MineralComparator } from '../components/MineralComparator';
import { WaterPuritySection } from '../sections/WaterPuritySection';

export function WaterPage() {
  const mineralBreakdown = [
    {
      name: 'Calcium (Ca²⁺)',
      value: '12.4 mg/L',
      purpose: 'Cardiovascular conductivity and muscular contraction balance.',
    },
    {
      name: 'Magnesium (Mg²⁺)',
      value: '6.8 mg/L',
      purpose: 'Enzymatic ATP energy synthesis and neuro-muscular relaxation.',
    },
    {
      name: 'Bioavailable Silica (SiO₂)',
      value: '14.2 mg/L',
      purpose: 'Vascular elasticity, collagen synthesis, and cellular wall integrity.',
    },
    {
      name: 'Natural Bicarbonates (HCO₃⁻)',
      value: '48.0 mg/L',
      purpose: 'Buffers blood lactic acid and sustains metabolic alkaline pH 7.85.',
    },
    {
      name: 'Sodium (Na⁺)',
      value: '1.2 mg/L',
      purpose: 'Ultra-low trace concentration prevents water retention and bloating.',
    },
    {
      name: 'Potassium (K⁺)',
      value: '0.9 mg/L',
      purpose: 'Maintains intracellular hydrostatic pressure and hydration equilibrium.',
    },
  ];

  return (
    <div className="pt-28 pb-24 bg-brand-dark min-h-screen text-white">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-16 flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <span className="w-8 h-px bg-brand-aqua" />
          <span className="text-xs font-mono tracking-mega text-brand-aqua uppercase">
            // MOLECULAR CHEMISTRY
          </span>
        </div>

        <h1 className="text-4xl sm:text-7xl font-extrabold tracking-tight uppercase max-w-4xl leading-[1.05]">
          WATER AT ITS<br />
          <span className="text-stroke-subtle font-light">ELEMENTAL</span> PEAK.
        </h1>

        <p className="text-base sm:text-xl text-white/70 font-light max-w-2xl leading-relaxed">
          Naturally alkaline at pH 7.85 with low total dissolved solids. Analyzed and certified by independent third-party laboratories in Zurich and Milan.
        </p>
      </section>

      {/* Lab Certification Banner */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-6">
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-wrap items-center justify-between gap-6 text-xs font-mono">
          <div className="flex items-center gap-3">
            <Award className="w-5 h-5 text-brand-amber shrink-0" />
            <span className="text-white font-bold">CERTIFICATE OF LAB ASSAY: ISO 17025 ACCREDITED</span>
          </div>
          <span className="text-brand-amber">BATCH ASSAY #ALP-2840-2026</span>
          <span className="text-white/40">ZERO DETECTABLE MICROPLASTICS (0.00 PPM)</span>
        </div>
      </section>

      {/* Mineral Spectrum Grid */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-16">
        <div className="flex flex-col gap-3 border-b border-white/10 pb-8 mb-12">
          <span className="text-xs font-mono tracking-mega text-brand-aqua uppercase">
            Bioavailable Elements
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight">
            The Mineral Spectrum
          </h2>
          <p className="text-xs sm:text-sm text-white/60 font-light">
            Naturally dissolved through volcanic basalt strata — never chemically fortified.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mineralBreakdown.map((min) => (
            <div
              key={min.name}
              className="p-6 rounded-2xl glass-panel border border-white/10 flex flex-col justify-between gap-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-white/50">{min.name}</span>
                <span className="text-lg font-mono font-extrabold text-brand-aqua">
                  {min.value}
                </span>
              </div>
              <p className="text-xs text-white/70 font-light leading-relaxed">
                {min.purpose}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Comparative Chemistry Benchmark */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-12">
        <MineralComparator />
      </section>

      {/* Interactive Fluid Canvas Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-12">
        <WaterPuritySection />
      </section>
    </div>
  );
}
