import { ArrowUpRight, Sparkles } from 'lucide-react';

export function ClimaxSection() {
  return (
    <section className="relative w-full py-32 sm:py-48 px-6 sm:px-12 bg-brand-dark border-t border-white/5 overflow-hidden flex flex-col items-center justify-center text-center">
      {/* Studio spotlight overhead (reproducing Frame 025/026) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[450px] sm:w-[650px] h-[500px] bg-gradient-to-b from-white/10 via-brand-aqua/5 to-transparent blur-[110px] pointer-events-none" />

      <div className="max-w-5xl mx-auto flex flex-col items-center gap-12 relative z-10">
        {/* Monogram crest */}
        <div className="w-14 h-14 rounded-full border border-brand-amber/50 flex items-center justify-center bg-white/5">
          <span className="text-base font-serif-luxury font-bold tracking-widest text-brand-amber">
            VM
          </span>
        </div>

        {/* Eyebrow */}
        <span className="text-xs font-mono tracking-mega uppercase text-brand-amber">
          THE CAMPAIGN MANIFESTO // FINALE
        </span>

        {/* Climax Tagline from Frame 029 */}
        <h2 className="text-4xl sm:text-7xl lg:text-8xl font-extrabold tracking-tighter text-white uppercase leading-[0.95]">
          FOR EVERY MOMENT<br />
          <span className="text-stroke-subtle font-light">THAT MOVES</span>{' '}
          <span className="text-brand-amber">YOU.</span>
        </h2>

        <p className="max-w-xl text-xs sm:text-base text-white/60 font-light leading-relaxed">
          From high-velocity pursuit to contemplative stillness. Encased in flint glass, sculpted for perpetual motion.
        </p>

        {/* Authentic BOTVOR Bottle Monolith on Dark Marble Pedestal */}
        <div className="relative w-full max-w-md h-[420px] sm:h-[480px] my-4 flex items-center justify-center">
          {/* Subtle pedestal glow */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-72 h-16 bg-brand-aqua/20 rounded-full blur-2xl pointer-events-none" />
          
          {/* Concentric ripple rings */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-80 h-16 rounded-full border border-white/10 pointer-events-none animate-pulse" />
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-48 h-10 rounded-full border border-brand-amber/30 pointer-events-none" />

          {/* Authentic Bottle Image */}
          <img
            src="/images/vessel/botvor_angle_0.png"
            alt="BOTVOR Vital Elixir Architectural Bottle"
            className="relative z-10 h-full max-h-[380px] sm:max-h-[440px] w-auto object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] transition-transform duration-700 hover:scale-105"
          />

          {/* Pedestal reflection */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-48 h-20 opacity-20 blur-[2px] overflow-hidden pointer-events-none">
            <img
              src="/images/vessel/botvor_angle_0.png"
              alt=""
              className="w-full h-full object-contain transform -scale-y-100"
            />
          </div>
        </div>

        {/* Final Actions */}
        <div className="flex flex-wrap items-center justify-center gap-5">
          <a
            href="#vessel"
            className="px-10 py-4 rounded-full bg-white text-black font-extrabold tracking-widest text-xs uppercase hover:bg-brand-amber transition-all duration-300 shadow-2xl hover:scale-105"
          >
            ORDER THE BOTTLE →
          </a>

          <a
            href="#film"
            className="px-8 py-4 rounded-full border border-white/20 hover:border-white/50 text-white font-semibold tracking-widest text-xs uppercase transition-all bg-white/5 backdrop-blur-md"
          >
            REPLAY CAMPAIGN FILM
          </a>
        </div>
      </div>
    </section>
  );
}
