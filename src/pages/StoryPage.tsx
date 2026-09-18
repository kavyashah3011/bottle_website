import { useState } from 'react';
import { Mountain, Compass, ShieldCheck, Sparkles, Clock, ArrowRight, Maximize2, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export function StoryPage() {
  const [showFrameZoom, setShowFrameZoom] = useState(false);

  const timelineEvents = [
    {
      year: 'Year 0',
      title: 'Atmospheric Precipitation',
      desc: 'Glacial melt and pure alpine snowfall land on the uninhabited peaks of the Graian Alps at 2,840 meters altitude.',
    },
    {
      year: 'Years 1 – 6',
      title: 'Basalt Strata Seepage',
      desc: 'Water slowly traverses through hundreds of meters of dense volcanic basalt and igneous quartz rock, naturally filtering particulate.',
    },
    {
      year: 'Years 7 – 14',
      title: 'Mineral Dissolution',
      desc: 'Deep subterranean pressure infuses the water with bioavailable calcium, magnesium, and restorative silica at an alkaline pH of 7.85.',
    },
    {
      year: 'Years 15 – 18',
      title: 'Pressurized Artesian Ascent',
      desc: 'Under natural hydrostatic pressure, the water emerges crystal-clear in a sealed alpine cavern, collected directly at the source.',
    },
  ];

  return (
    <div className="pt-28 pb-24 bg-brand-dark min-h-screen text-white">
      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-16 flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <span className="w-8 h-px bg-brand-amber" />
          <span className="text-xs font-mono tracking-mega text-brand-amber uppercase">
            // HERITAGE & ORIGIN
          </span>
        </div>

        <h1 className="text-4xl sm:text-7xl font-extrabold tracking-tight uppercase max-w-4xl leading-[1.05]">
          A NATURAL PURITY<br />
          <span className="text-stroke-subtle font-light">EIGHTEEN YEARS</span> IN THE MAKING.
        </h1>

        <p className="text-base sm:text-xl text-white/70 font-light max-w-2xl leading-relaxed">
          BOTVOR begins in the silence of high-alpine glaciers, where unpolluted water embarks on an 18-year journey through ancient volcanic strata before reaching its architectural vessel.
        </p>
      </section>

      {/* Origin Visual Showcase */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-8">
        <div className="relative aspect-[21/9] rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-brand-surface">
          <img
            src="/images/story_alpine_origin.jpg"
            alt="Pristine Graian Alps glacier and turquoise reservoir in Val d’Aosta"
            className="w-full h-full object-cover filter brightness-95"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between text-xs font-mono">
            <span className="px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-brand-amber">
              VAL D’AOSTA ALPINE BASIN // 2,840M ALTITUDE
            </span>
            <span className="text-white/60 hidden sm:inline">
              PROTECTED BIOSPHERE SANCTUARY
            </span>
          </div>
        </div>
      </section>

      {/* Geological Filtration Timeline */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-20">
        <div className="flex flex-col gap-3 border-b border-white/10 pb-8 mb-12">
          <span className="text-xs font-mono tracking-mega text-brand-amber uppercase">
            Subterranean Chronology
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight">
            The 18-Year Basalt Odyssey
          </h2>
          <p className="text-xs sm:text-sm text-white/60 font-light">
            Every bottle of BOTVOR contains water that began its subterranean path nearly two decades ago.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {timelineEvents.map((ev, idx) => (
            <div
              key={ev.year}
              className="p-6 rounded-2xl glass-panel border border-white/10 flex flex-col justify-between gap-6 relative group hover:border-brand-amber/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-lg font-mono font-extrabold text-brand-amber">
                  {ev.year}
                </span>
                <span className="text-xs font-mono text-white/30">0{idx + 1}</span>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-base font-bold text-white uppercase tracking-tight">
                  {ev.title}
                </h3>
                <p className="text-xs text-white/60 leading-relaxed font-light">
                  {ev.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Craftsmanship of the Vessel */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-20 border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Studio Pedestal // Frame 026 Showcase */}
          <div
            onClick={() => setShowFrameZoom(true)}
            className="lg:col-span-6 relative aspect-square rounded-3xl overflow-hidden border border-white/15 bg-brand-surface group cursor-pointer shadow-2xl hover:border-brand-amber/40 transition-all duration-500"
          >
            <img
              src="/images/story_vessel_pedestal.jpg"
              alt="BOTVOR Vessel on black marble - Frame 026"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 filter brightness-95 group-hover:brightness-100"
            />
            {/* Dark vignette gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

            {/* Top Telemetry Tag */}
            <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10 pointer-events-none">
              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono tracking-widest text-brand-amber uppercase">
                CAMPAIGN ARCHIVE // FRAME 026
              </span>
              <span className="p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white group-hover:bg-brand-amber group-hover:text-black transition-colors">
                <Maximize2 className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* Bottom Telemetry Overlay */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-2 z-10 pointer-events-none">
              <div className="text-xs font-mono text-brand-amber flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-amber animate-pulse" />
                <span>STUDIO PEDESTAL // FRAME 026</span>
              </div>
              <p className="text-xs text-white/70 font-light">
                Flint crystal vessel resting on Nero Marquina marble with concentric caustic water ripples.
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-1 text-[10px] font-mono text-white/50">
                <span className="px-2 py-0.5 rounded bg-white/10">NERO MARQUINA</span>
                <span className="px-2 py-0.5 rounded bg-white/10">EXPANDING RIPPLE</span>
                <span className="px-2 py-0.5 rounded bg-white/10">ANODIZED ROYAL BLUE</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col gap-6">
            <span className="text-xs font-mono tracking-mega text-brand-amber uppercase">
              Vessel Architecture
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight uppercase leading-tight">
              An Honest Container For Living Water.
            </h2>
            <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed">
              We rejected plastic polymers entirely. BOTVOR is encased in high-density flint crystal that is 100% chemically inert, guaranteeing zero phthalate migration or microplastic contamination.
            </p>
            <p className="text-xs sm:text-sm text-white/50 font-light leading-relaxed">
              The gentle hourglass waist creates an organic ergonomic lock in the palm, while the thick weighted crystal base ensures acoustic resonance and physical equilibrium on stone and glass surfaces.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-extrabold tracking-widest text-xs uppercase hover:bg-brand-amber transition-all shadow-xl"
              >
                <span>VIEW VESSEL EDITIONS</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                onClick={() => setShowFrameZoom(true)}
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full border border-white/20 hover:border-brand-amber text-white font-mono text-xs tracking-wider uppercase transition-colors"
              >
                <Maximize2 className="w-3.5 h-3.5 text-brand-amber" />
                <span>INSPECT FRAME 026</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Frame 026 Fullscreen Lightbox Modal */}
      {showFrameZoom && (
        <div
          className="fixed inset-0 z-[2000] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8 animate-fade-in"
          onClick={() => setShowFrameZoom(false)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] rounded-3xl overflow-hidden glass-panel border border-white/20 shadow-2xl flex flex-col items-center justify-center p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="w-full flex justify-between items-center mb-4 text-xs font-mono text-white/60">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-amber animate-pulse" />
                <span className="text-brand-amber font-bold uppercase tracking-wider">
                  STUDIO PEDESTAL // FRAME 026 — MASTER CAPTURE
                </span>
              </div>
              <button
                onClick={() => setShowFrameZoom(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* High-res Image */}
            <div className="relative w-full aspect-square max-h-[72vh] rounded-2xl overflow-hidden border border-white/10 bg-black flex items-center justify-center">
              <img
                src="/images/story_vessel_pedestal.jpg"
                alt="BOTVOR Studio Pedestal - Frame 026"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Footer Telemetry */}
            <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mt-4 text-[11px] font-mono text-white/50 border-t border-white/10 pt-3">
              <span>CAMERA: 65MM ANAMORPHIC • LIGHTING: DIRECT TOP SPOTLIGHT</span>
              <span className="text-brand-amber">BOTVOR VITAL ELIXIR 500ML • NERO MARQUINA MARBLE</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
