import { Activity, Gauge, Flame, Zap, ArrowRight } from 'lucide-react';
import { HydrationCalculator } from '../components/HydrationCalculator';
import { Link } from 'react-router-dom';

export function PerformancePage() {
  const caseStudies = [
    {
      discipline: 'Track Sprinting (400M)',
      athlete: 'National Sprint Cadre',
      metric: '90-Second Cellular Uptake',
      desc: 'High-intensity anaerobic output triggers rapid lactic acid accumulation. BOTVOR’s naturally alkaline bicarbonate buffer prevents severe acidosis without gastric distress.',
      image: '/images/perf_track_sprinter.jpg',
    },
    {
      discipline: 'Alpine Road Cycling',
      athlete: 'Pro Peloton Endurance',
      metric: '285 mOsm/kg Plasma Parity',
      desc: '6-hour mountain passes require continuous hypotonic hydration. BOTVOR matches human blood osmolarity, maximizing fluid transfer across intestinal enterocytes.',
      image: '/images/perf_peloton_cyclist.jpg',
    },
    {
      discipline: 'Executive Ambition',
      athlete: 'Metropolitan Decision Makers',
      metric: 'Zero Post-Hydration Fog',
      desc: 'Cognitive vigilance in high-stakes negotiations demands pure hydration free from chlorine, BPA, and heavy sodium additives that induce lethargy.',
      image: '/images/perf_executive_focus.jpg',
    },
  ];

  return (
    <div className="pt-28 pb-24 bg-brand-dark min-h-screen text-white">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-16 flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <span className="w-8 h-px bg-brand-amber" />
          <span className="text-xs font-mono tracking-mega text-brand-amber uppercase">
            // ENDURANCE TELEMETRY
          </span>
        </div>

        <h1 className="text-4xl sm:text-7xl font-extrabold tracking-tight uppercase max-w-4xl leading-[1.05]">
          HYDRATION AS<br />
          <span className="text-stroke-subtle font-light">PHYSIOLOGICAL</span> TELEMETRY.
        </h1>

        <p className="text-base sm:text-xl text-white/70 font-light max-w-2xl leading-relaxed">
          Engineered for the demands of peak velocity. BOTVOR accelerates cellular osmolarity and replaces depleted trace electrolytes without synthetic additives.
        </p>
      </section>

      {/* Interactive Hydration Calculator */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-8">
        <HydrationCalculator />
      </section>

      {/* Case Studies */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-20">
        <div className="flex flex-col gap-3 border-b border-white/10 pb-8 mb-12">
          <span className="text-xs font-mono tracking-mega text-brand-amber uppercase">
            Field Evidence
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight">
            Performance Case Studies
          </h2>
          <p className="text-xs sm:text-sm text-white/60 font-light">
            Observed across Olympic tracks, mountain highways, and boardroom environments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {caseStudies.map((study) => (
            <div
              key={study.discipline}
              className="rounded-2xl overflow-hidden glass-panel border border-white/10 flex flex-col group hover:border-brand-amber/40 transition-colors"
            >
              <div className="relative aspect-video w-full overflow-hidden">
                <img
                  src={study.image}
                  alt={study.discipline}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-[10px] font-mono px-2 py-0.5 rounded bg-black/70 border border-white/10 text-brand-amber uppercase">
                  {study.metric}
                </span>
              </div>

              <div className="p-6 flex flex-col gap-3 flex-1 justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono uppercase text-white/40">{study.athlete}</span>
                  <h3 className="text-lg font-bold text-white uppercase tracking-tight">{study.discipline}</h3>
                  <p className="text-xs text-white/60 leading-relaxed font-light pt-2">
                    {study.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand-amber text-black font-extrabold tracking-widest text-xs uppercase hover:bg-white transition-all shadow-xl"
          >
            <span>DISCOVER THE 500ML DAILY ENDURANCE VESSEL</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
