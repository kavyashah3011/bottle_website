import { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [percent, setPercent] = useState(0);
  const [fadeState, setFadeState] = useState<'counting' | 'fading' | 'hidden'>('counting');

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setFadeState('fading'), 150);
          setTimeout(() => {
            setFadeState('hidden');
            onComplete();
          }, 600);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 18 + 8);
        return Math.min(100, next);
      });
    }, 35);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (fadeState === 'hidden') return null;

  return (
    <div
      className={`fixed inset-0 z-[10000] bg-brand-dark flex flex-col items-center justify-between p-12 transition-all duration-700 ease-out ${
        fadeState === 'fading' ? '-translate-y-full opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="w-full flex justify-between items-center text-xs tracking-widest text-white/40 font-mono">
        <span>BOTVOR // MINERAL ELEVATION</span>
        <span>VAL D’AOSTA ALPS</span>
      </div>

      <div className="flex flex-col items-center gap-6">
        {/* Monogram */}
        <div className="w-16 h-16 rounded-full border border-brand-amber/40 flex items-center justify-center animate-pulse-slow">
          <span className="text-xl font-serif-luxury font-bold tracking-widest text-brand-amber">
            VM
          </span>
        </div>
        <span className="text-xs tracking-mega uppercase text-white/70">
          FOR EVERY MOMENT THAT MOVES YOU
        </span>
      </div>

      <div className="w-full flex justify-between items-end">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] tracking-widest text-white/40 uppercase">Loading Experience</span>
          <div className="w-32 sm:w-48 h-0.5 bg-white/10 overflow-hidden">
            <div
              className="h-full bg-brand-amber transition-all duration-150 ease-out"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
        <span className="font-mono text-2xl sm:text-3xl text-white font-light">
          {percent.toString().padStart(2, '0')}%
        </span>
      </div>
    </div>
  );
}
