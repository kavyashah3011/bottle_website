import { Play, Film, Clock, Eye } from 'lucide-react';

interface FilmSectionProps {
  onOpenFilmModal: () => void;
}

export function FilmSection({ onOpenFilmModal }: FilmSectionProps) {
  const filmChapters = [
    { time: '00:02', title: 'The Descent', desc: 'Skyscraper canyon gravity drop' },
    { time: '00:07', title: 'The Drive', desc: 'Executive poise and suspended droplets' },
    { time: '00:13', title: 'The Sprint', desc: 'Olympic track high-velocity replenishment' },
    { time: '00:20', title: 'The Elevation', desc: 'Golden hour rooftop terrace serenity' },
    { time: '00:26', title: 'The Sanctuary', desc: 'Monolith studio pedestal spotlight' },
  ];

  return (
    <section id="film" className="relative w-full py-28 sm:py-36 px-6 sm:px-12 bg-black border-t border-white/5 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-amber/5 blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-16 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10 pb-8">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono tracking-mega text-brand-amber uppercase flex items-center gap-2">
              <Film className="w-3.5 h-3.5" />
              THE CAMPAIGN FILM
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase">
              FOR EVERY MOMENT THAT MOVES YOU
            </h2>
            <span className="text-sm font-serif-luxury tracking-widest text-white/50 italic">
              Original 4K Campaign Master • 29 Seconds
            </span>
          </div>

          <div className="text-right">
            <span className="text-xs font-mono text-white/40 tracking-widest">
              DIRECTED BY INTERNATIONAL CREATIVE STUDIO
            </span>
          </div>
        </div>

        {/* Video Hero Spotlight Box */}
        <div
          onClick={onOpenFilmModal}
          className="relative aspect-video max-h-[640px] w-full rounded-3xl overflow-hidden border border-white/15 cursor-pointer group shadow-[0_0_50px_rgba(0,0,0,0.8)] bg-brand-surface"
        >
          {/* Poster image */}
          <img
            src="/posters/hero_poster.jpg"
            alt="BOTVOR Campaign Film Frame"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />

          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />

          {/* Large Center Play Trigger */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <div className="w-20 sm:w-24 h-20 sm:h-24 rounded-full bg-brand-amber text-black flex items-center justify-center pl-1 group-hover:scale-110 shadow-[0_0_35px_rgba(212,175,55,0.6)] transition-all duration-300">
              <Play className="w-8 sm:w-10 h-8 sm:h-10 fill-black" />
            </div>
            <span className="text-xs font-mono tracking-mega uppercase text-white font-bold group-hover:text-brand-amber transition-colors">
              WATCH FULL FILM (29S)
            </span>
          </div>

          {/* Bottom Telemetry inside Film Box */}
          <div className="absolute bottom-6 left-8 right-8 flex items-center justify-between text-xs font-mono text-white/70">
            <span className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-brand-amber" />
              <span>DURATION 00:29.18</span>
            </span>
            <span className="hidden sm:inline text-white/40">
              STEREO MASTER • 48.0 KHZ
            </span>
          </div>
        </div>

        {/* Storyboard Chapters Timeline */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 pt-4">
          {filmChapters.map((ch, idx) => (
            <div
              key={ch.time}
              onClick={onOpenFilmModal}
              className="cursor-pointer p-4 rounded-xl bg-white/5 border border-white/10 hover:border-brand-amber/40 hover:bg-white/10 transition-all flex flex-col gap-1 group"
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-brand-amber">
                <span>SCENE 0{idx + 1}</span>
                <span>{ch.time}</span>
              </div>
              <span className="text-xs font-bold text-white uppercase group-hover:text-brand-amber transition-colors">
                {ch.title}
              </span>
              <span className="text-[11px] text-white/50 line-clamp-1">
                {ch.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
