import { Sparkles, Sun, ShieldCheck } from 'lucide-react';
import { CHAPTERS } from '../data/brandContent';

export function LifestyleSection() {
  const chapter = CHAPTERS[3]; // The Elevation

  return (
    <section className="relative w-full py-28 sm:py-36 px-6 sm:px-12 bg-brand-dark border-t border-white/5 overflow-hidden">
      {/* Warm sunset horizon glow */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-brand-amber/8 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        {/* Section Header */}
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

        {/* Editorial Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual: Executive in Ivory Blazer on Rooftop */}
          <div className="lg:col-span-7 relative group">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/15 bg-brand-surface shadow-2xl">
              <img
                src={chapter.image}
                alt="Executive woman in white blazer catching floating bottle at sunset rooftop"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-mono text-white/80">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-brand-amber">
                  PENTHOUSE HORIZON // 00:20.1
                </span>
                <span className="text-[11px] text-white/50 hidden sm:inline">
                  GOLDEN HOUR ELEVATION
                </span>
              </div>
            </div>
          </div>

          {/* Editorial Content */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <span className="text-xs font-mono tracking-mega text-brand-amber uppercase">
                DISTINCTION & RESTRAINT
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white uppercase leading-tight">
                AN OBJECT OF PURE CONTEMPLATION.
              </h3>
              <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed">
                {chapter.description}
              </p>
              <p className="text-xs sm:text-sm text-white/50 leading-relaxed font-light">
                On high-floor residences and private balconies, hydration becomes a conscious pause in the cadence of the day. A tactile vessel that mirrors modern architectural restraint.
              </p>
            </div>

            {/* Editorial Quote Box */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-3">
              <span className="text-sm sm:text-base font-serif-luxury italic text-white/90">
                “Luxury is the absence of unnecessary ornament. It is the clarity of elemental water held within an honest form.”
              </span>
              <span className="text-[10px] font-mono tracking-widest text-brand-amber uppercase">
                // ARCHITECTURAL NOTES, MILAN EDITION
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
