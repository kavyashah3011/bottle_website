import { Briefcase, Zap, Shield, ArrowUpRight } from 'lucide-react';
import { CHAPTERS } from '../data/brandContent';

export function AmbitionSection() {
  const chapter = CHAPTERS[1]; // The Drive

  return (
    <section className="relative w-full py-28 sm:py-36 px-6 sm:px-12 bg-brand-dark border-t border-white/5 overflow-hidden">
      {/* Background warm amber glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-brand-amber/5 blur-[140px] pointer-events-none" />

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

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Editorial Text Column (Left) */}
          <div className="lg:col-span-5 flex flex-col gap-8 order-2 lg:order-1">
            <div className="flex flex-col gap-4">
              <span className="text-xs font-mono tracking-mega text-brand-amber uppercase">
                FORWARD THINKING
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white uppercase leading-tight">
                MOMENTUM DEMANDS ABSOLUTE CLARITY.
              </h3>
              <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed">
                {chapter.description}
              </p>
              <p className="text-xs sm:text-sm text-white/50 leading-relaxed font-light">
                Whether steering multinational acquisitions or shaping technological frontiers, mental stamina relies on optimal cellular hydration. BOTVOR delivers pristine trace electrolytes without heavy sodium burden.
              </p>
            </div>

            {/* Metric Pills */}
            <div className="flex flex-col gap-3 pt-2">
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10">
                <Zap className="w-4 h-4 text-brand-amber shrink-0" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white tracking-wide">Rapid Cellular Hydration</span>
                  <span className="text-[11px] text-white/50">Natural 7.85 pH balance facilitates swift cellular osmosis.</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10">
                <Briefcase className="w-4 h-4 text-brand-aqua shrink-0" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white tracking-wide">Executive Poise & Focus</span>
                  <span className="text-[11px] text-white/50">Engineered for executive desks, boardrooms, and private aviation.</span>
                </div>
              </div>
            </div>

            <a
              href="#vessel"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold tracking-widest text-white uppercase transition-all w-fit group"
            >
              <span>DISCOVER 500ML DAILY VESSEL</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-brand-amber group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Image Column (Right) with droplet overlay */}
          <div className="lg:col-span-7 relative group order-1 lg:order-2">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/15 bg-brand-surface shadow-2xl">
              <img
                src={chapter.image}
                alt="Executive holding water bottle with splashing water droplets"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              {/* Tag */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-mono text-white/80">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-brand-amber">
                  SUSPENDED HYDRATION // 00:08.2
                </span>
                <span className="text-[11px] text-white/50 hidden sm:inline">
                  ULTRA SLOW-MOTION FLUID DYNAMICS
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
