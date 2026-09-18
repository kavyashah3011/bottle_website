import { useRef } from 'react';
import { Play, ArrowDown, Sparkles } from 'lucide-react';
import { BRAND } from '../data/brandContent';

interface HeroSectionProps {
  onOpenFilmModal: () => void;
}

export function HeroSection({ onOpenFilmModal }: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-brand-dark">
      {/* Background Campaign Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          src="/videos/hero_optimized.mp4"
          poster="/posters/hero_poster.jpg"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover scale-105 filter brightness-[0.78] contrast-[1.08]"
        />

        {/* Cinematic Vignette & Gradient Overlays for negative-space readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-black/60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_40%,rgba(0,0,0,0.4)_0%,rgba(0,0,0,0.85)_100%)]" />
      </div>

      {/* Main Content — Intelligently positioned in left safe negative space */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 pt-36 sm:pt-44 pb-16 w-full flex-1 flex flex-col justify-center">
        <div className="max-w-2xl flex flex-col gap-6">
          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <span className="w-6 h-px bg-brand-amber" />
            <span className="text-[11px] font-mono tracking-mega text-brand-amber uppercase font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" />
              {BRAND.heroEyebrow}
            </span>
          </div>

          {/* Headline with tight luxury letter spacing */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter text-white leading-[1.05] uppercase">
            SCULPTED BY NATURE.<br />
            <span className="text-stroke-subtle font-light">DEFINED BY</span>{' '}
            <span className="text-white">MOVEMENT.</span>
          </h1>

          {/* Editorial Paragraph */}
          <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed max-w-xl">
            {BRAND.heroDescription}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a
              href="#vessel"
              data-cursor="EXPLORE"
              className="px-8 py-4 rounded-full bg-white text-black font-bold tracking-widest text-xs uppercase hover:bg-brand-amber transition-all duration-300 transform hover:-translate-y-0.5 shadow-xl hover:shadow-[0_0_25px_rgba(212,175,55,0.4)]"
            >
              {BRAND.ctaPrimary} →
            </a>

            <button
              onClick={onOpenFilmModal}
              data-cursor="PLAY"
              className="flex items-center gap-3 px-7 py-4 rounded-full border border-white/25 bg-black/40 hover:bg-white/10 hover:border-white/50 backdrop-blur-md transition-all duration-300 text-xs font-semibold tracking-widest text-white uppercase group focus:outline-none"
            >
              <div className="w-6 h-6 rounded-full bg-brand-amber/20 border border-brand-amber flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-3 h-3 text-brand-amber fill-brand-amber ml-0.5" />
              </div>
              <span>{BRAND.ctaSecondary} (29s)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Bottom Telemetry Bar */}
      <div className="relative z-10 w-full border-t border-white/10 bg-black/40 backdrop-blur-md py-4 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] sm:text-xs font-mono tracking-widest text-white/60">
          <div className="flex items-center gap-4">
            <span className="text-brand-amber">ELEVATION 2,840M</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span>VAL D’AOSTA AQUIFER</span>
          </div>

          <a
            href="#story"
            className="flex items-center gap-2 text-white hover:text-brand-amber transition-colors group"
          >
            <span>SCROLL TO DISCOVER</span>
            <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform animate-bounce" />
          </a>

          <div className="hidden sm:flex items-center gap-4">
            <span>pH 7.85 ALKALINE</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span>TDS 42 MG/L</span>
          </div>
        </div>
      </div>
    </section>
  );
}
