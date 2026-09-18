import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioControllerProps {
  audioSrc?: string;
  autoPlayOnInteract?: boolean;
}

export function AudioController({
  audioSrc = '/audio/ambient_soundscape.mp3'
}: AudioControllerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(audioSrc);
    audio.loop = true;
    audio.volume = 0.45;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, [audioSrc]);

  const toggleSound = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        console.warn('Audio playback blocked or failed:', e);
      });
    }
  };

  return (
    <button
      onClick={toggleSound}
      className="flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-white/10 bg-black/40 hover:bg-white/5 backdrop-blur-md transition-all duration-300 text-xs tracking-widest text-white/80 hover:text-white"
      aria-label={isPlaying ? 'Mute ambient sound' : 'Unmute ambient sound'}
    >
      {isPlaying ? (
        <Volume2 className="w-3.5 h-3.5 text-brand-amber animate-pulse" />
      ) : (
        <VolumeX className="w-3.5 h-3.5 text-white/40" />
      )}

      {/* Sound frequency visualizer bars */}
      <div className="flex items-end gap-0.5 h-3 w-4">
        <span
          className={`w-0.5 bg-brand-amber rounded-full transition-all duration-200 ${
            isPlaying ? 'h-3 animate-pulse' : 'h-1 bg-white/20'
          }`}
        />
        <span
          className={`w-0.5 bg-brand-amber rounded-full transition-all duration-300 ${
            isPlaying ? 'h-2 animate-pulse delay-75' : 'h-1 bg-white/20'
          }`}
        />
        <span
          className={`w-0.5 bg-brand-amber rounded-full transition-all duration-150 ${
            isPlaying ? 'h-3.5 animate-pulse delay-150' : 'h-1 bg-white/20'
          }`}
        />
        <span
          className={`w-0.5 bg-brand-amber rounded-full transition-all duration-250 ${
            isPlaying ? 'h-1.5 animate-pulse' : 'h-1 bg-white/20'
          }`}
        />
      </div>

      <span className="text-[10px] font-mono uppercase hidden sm:inline text-white/60">
        {isPlaying ? 'SOUND ON' : 'SOUND OFF'}
      </span>
    </button>
  );
}
