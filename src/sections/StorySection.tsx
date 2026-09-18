import { ArrowDownRight, Compass, ShieldCheck } from 'lucide-react';
import { CHAPTERS } from '../data/brandContent';

export function StorySection() {
  const chapter = CHAPTERS[0]; // The Descent

  return (
    <section id="story" className="relative w-full py-28 sm:py-36 px-6 sm:px-12 bg-brand-dark overflow-hidden border-t border-white/5">
      {/* Subtle radial spotlight */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-brand-aqua/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-20">
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

        {/* Two-Column Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Cinematic High-Res Image Still with border & badge */}
          <div className="lg:col-span-7 relative group">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/15 bg-brand-surface shadow-2xl">
              <img
                src={chapter.image}
                alt="Executive catching falling bottle between glass skyscrapers"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              {/* In-Image Tag */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-mono text-white/80">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-brand-amber">
                  DECISIVE CATCH // 00:04.8
                </span>
                <span className="text-[11px] text-white/50 hidden sm:inline">
                  SKYSCRAPER CANYON, DOWNTOWN
                </span>
              </div>
            </div>

            {/* Floating Decorative Glass Stat */}
            <div className="absolute -bottom-6 -right-6 hidden sm:flex items-center gap-3 p-4 rounded-xl glass-panel border border-brand-amber/30 shadow-2xl">
              <div className="p-2.5 rounded-lg bg-brand-amber/10 border border-brand-amber/40 text-brand-amber">
                <Compass className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono tracking-wider text-white/40 uppercase">Natural Descent</span>
                <span className="text-xs font-bold tracking-widest text-white">GRAVITY REDEFINED</span>
              </div>
            </div>
          </div>

          {/* Right: Editorial Narrative */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <p className="text-lg sm:text-xl text-white font-normal leading-relaxed">
                {chapter.description}
              </p>
              <p className="text-sm text-white/60 leading-relaxed font-light">
                Captured amidst glass monoliths and morning sunbeams, the vessel tumbles in zero-stress equilibrium. Designed to withstand kinetic impact and extreme pressure while maintaining microscopic optical clarity.
              </p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
              {chapter.stats?.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1 p-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] font-mono tracking-wider text-white/40 uppercase">
                    {stat.label}
                  </span>
                  <span className="text-base sm:text-lg font-bold tracking-tight text-white">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Action */}
            <a
              href="#vessel"
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-brand-amber hover:text-white transition-colors group mt-2"
            >
              <span>INSPECT THE VESSEL ARCHITECTURE</span>
              <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
