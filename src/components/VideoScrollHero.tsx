import { useRef, useEffect, useState, useCallback } from 'react';
import { ArrowDown } from 'lucide-react';

interface VideoScrollHeroProps {
  onOpenFilmModal?: () => void;
}

export interface MinimalMilestone {
  range: [number, number];
  step: string;
  eyebrow: string;
  headline: string;
  sub: string;
}

export const MINIMAL_MILESTONES: MinimalMilestone[] = [
  {
    range: [0, 0.2],
    step: '01',
    eyebrow: '01 // ORIGIN',
    headline: 'SCULPTED BY NATURE.\nDEFINED BY MOVEMENT.',
    sub: 'Val d’Aosta Alps • Elevation 2,800m',
  },
  {
    range: [0.2, 0.45],
    step: '02',
    eyebrow: '02 // AMBITION',
    headline: 'DECISIVE CALM.',
    sub: 'Kinetic Equilibrium in Free Fall',
  },
  {
    range: [0.45, 0.72],
    step: '03',
    eyebrow: '03 // VELOCITY',
    headline: 'UNBROKEN MOMENTUM.',
    sub: 'Olympic Sprint • Peak Hydration',
  },
  {
    range: [0.72, 0.9],
    step: '04',
    eyebrow: '04 // SERENITY',
    headline: 'DISTINCTION & RESTRAINT.',
    sub: 'Penthouse Horizon • Executive Clarity',
  },
  {
    range: [0.9, 1.0],
    step: '05',
    eyebrow: '05 // THE FINALE',
    headline: 'FOR EVERY MOMENT\nTHAT MOVES YOU.',
    sub: 'Encased in Pure Flint Crystal',
  },
];

const TOTAL_FRAMES = 438;

export function VideoScrollHero({ onOpenFilmModal }: VideoScrollHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animation & Rendering Refs
  const targetFrameRef = useRef(0);
  const currentRenderedFrameRef = useRef(0);
  const currentZoomRef = useRef(1.0);
  const targetZoomRef = useRef(1.0);
  const rafIdRef = useRef<number | null>(null);
  const framesArrayRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const isMobileRef = useRef(false);

  // Loading State
  const [loadedCount, setLoadedCount] = useState(0);
  const [allLoaded, setAllLoaded] = useState(false);
  const [loaderVisible, setLoaderVisible] = useState(true);

  // Minimal Text Overlay State
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [textOpacity, setTextOpacity] = useState(1);
  const [textTranslateY, setTextTranslateY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Detect Mobile Viewport
  useEffect(() => {
    isMobileRef.current = window.innerWidth < 768;
    const handleResize = () => {
      isMobileRef.current = window.innerWidth < 768;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Format Frame URL
  const getFrameUrl = useCallback((index: number) => {
    const padded = (index + 1).toString().padStart(5, '0');
    const folder = isMobileRef.current ? 'mobile' : 'desktop';
    return `/hero-sequence/${folder}/frame-${padded}.webp`;
  }, []);

  // Preload ALL 438 Frames with Batching & Concurrency Control
  useEffect(() => {
    let isMounted = true;
    let loadedCounter = 0;

    const loadSingleFrame = (idx: number): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = getFrameUrl(idx);
        img
          .decode()
          .then(() => {
            if (!isMounted) return;
            framesArrayRef.current[idx] = img;
            loadedCounter++;
            setLoadedCount(loadedCounter);
            resolve();
          })
          .catch(() => {
            // Fallback to onload if decode rejects
            img.onload = () => {
              if (!isMounted) return;
              framesArrayRef.current[idx] = img;
              loadedCounter++;
              setLoadedCount(loadedCounter);
              resolve();
            };
            img.onerror = () => {
              // Graceful resolution so loader reaches 100%
              if (!isMounted) return;
              loadedCounter++;
              setLoadedCount(loadedCounter);
              resolve();
            };
          });
      });
    };

    // Load Frame 0 first for instant background paint
    loadSingleFrame(0).then(() => {
      if (!isMounted) return;
      drawCanvasFrame(0, 1.0);

      // Concurrent batch loading for remaining frames
      const concurrency = 32;
      let currentIndex = 1;

      const runWorker = async () => {
        while (currentIndex < TOTAL_FRAMES && isMounted) {
          const idx = currentIndex++;
          await loadSingleFrame(idx);
        }
      };

      const workers = Array.from({ length: concurrency }, () => runWorker());
      Promise.all(workers).then(() => {
        if (!isMounted) return;
        setAllLoaded(true);
        setTimeout(() => {
          setLoaderVisible(false);
        }, 500);
      });
    });

    return () => {
      isMounted = false;
    };
  }, [getFrameUrl]);

  // Lock scrolling while full-screen loader is active
  useEffect(() => {
    if (loaderVisible) {
      document.body.style.overflow = 'hidden';
      (window as any).lenis?.stop();
    } else {
      document.body.style.overflow = '';
      (window as any).lenis?.start();
    }
    return () => {
      document.body.style.overflow = '';
      (window as any).lenis?.start();
    };
  }, [loaderVisible]);

  // High-DPI Canvas Draw with 3D Camera Zoom & Object-Fit: Cover
  const drawCanvasFrame = useCallback((frameIdx: number, zoomLevel: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Retrieve requested frame or nearest loaded neighbor
    let img = framesArrayRef.current[frameIdx];
    if (!img) {
      for (let offset = 1; offset < 30; offset++) {
        img =
          framesArrayRef.current[Math.max(0, frameIdx - offset)] ||
          framesArrayRef.current[Math.min(TOTAL_FRAMES - 1, frameIdx + offset)];
        if (img) break;
      }
    }

    if (!img || !img.naturalWidth) return;

    const width = canvas.width;
    const height = canvas.height;

    // Base object-fit: cover dimensions
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = width / height;

    let baseWidth: number;
    let baseHeight: number;

    if (canvasRatio > imgRatio) {
      baseWidth = width;
      baseHeight = width / imgRatio;
    } else {
      baseHeight = height;
      baseWidth = height * imgRatio;
    }

    // Realistic 3D camera zoom application
    const finalWidth = baseWidth * zoomLevel;
    const finalHeight = baseHeight * zoomLevel;
    const drawX = (width - finalWidth) / 2;
    const drawY = (height - finalHeight) / 2;

    ctx.drawImage(img, drawX, drawY, finalWidth, finalHeight);
  }, []);

  // Main RAF Render Loop (Smooth Lerping for Frames & 3D Camera Zoom)
  useEffect(() => {
    let lastDrawnFrame = -1;
    let lastDrawnZoom = -1;

    const loop = () => {
      // 1. Frame interpolation
      const targetF = targetFrameRef.current;
      const currentF = currentRenderedFrameRef.current;
      const diffF = targetF - currentF;

      if (Math.abs(diffF) > 0.04) {
        currentRenderedFrameRef.current += diffF * 0.36;
      } else {
        currentRenderedFrameRef.current = targetF;
      }

      // 2. Realistic 3D Camera Zoom interpolation
      const targetZ = targetZoomRef.current;
      const currentZ = currentZoomRef.current;
      const diffZ = targetZ - currentZ;

      if (Math.abs(diffZ) > 0.001) {
        currentZoomRef.current += diffZ * 0.12;
      } else {
        currentZoomRef.current = targetZ;
      }

      const roundedFrame = Math.round(currentRenderedFrameRef.current);
      const roundedZoom = Math.round(currentZoomRef.current * 1000) / 1000;

      if (roundedFrame !== lastDrawnFrame || Math.abs(roundedZoom - lastDrawnZoom) > 0.002) {
        drawCanvasFrame(roundedFrame, roundedZoom);
        lastDrawnFrame = roundedFrame;
        lastDrawnZoom = roundedZoom;
      }

      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [drawCanvasFrame]);

  // Canvas Resize Handler
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        canvas.width = Math.round(rect.width * dpr);
        canvas.height = Math.round(rect.height * dpr);
        drawCanvasFrame(
          Math.round(currentRenderedFrameRef.current),
          currentZoomRef.current
        );
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [drawCanvasFrame]);

  // Scroll Listener: Maps Scroll to Normalized Progress, Frame, 3D Zoom & Text Fades
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const maxScroll = container.offsetHeight - window.innerHeight;
      if (maxScroll <= 0) return;

      const currentScroll = -rect.top;
      const p = Math.max(0, Math.min(1, currentScroll / maxScroll));
      setScrollProgress(p);

      // Frame mapping
      const frame = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.floor(p * (TOTAL_FRAMES - 1)))
      );
      targetFrameRef.current = frame;

      // Find current milestone and calculate scene-local progression
      const milestoneIndex = MINIMAL_MILESTONES.findIndex(
        (m) => p >= m.range[0] && p < m.range[1]
      );
      const resolvedIdx = milestoneIndex !== -1 ? milestoneIndex : MINIMAL_MILESTONES.length - 1;
      setActiveSceneIndex(resolvedIdx);

      const m = MINIMAL_MILESTONES[resolvedIdx];
      const sceneRange = m.range[1] - m.range[0];
      const sceneProgress = Math.min(1, Math.max(0, (p - m.range[0]) / sceneRange));

      // Realistic 3D camera zoom: smooth organic push-in throughout each scene
      // Scene zoom gently expands from 1.0 to 1.08, breathing naturally between cuts
      const sceneCameraPush = 1.0 + Math.sin(sceneProgress * Math.PI * 0.5) * 0.085;
      const overallMacroZoom = 1.0 + p * 0.035;
      targetZoomRef.current = sceneCameraPush * overallMacroZoom;

      // Smooth fading animation for the minimal typography
      // 0.00 -> 0.18: Fade in from 0 to 1, slide up from 25px to 0px
      // 0.18 -> 0.80: Sits at full opacity with slow subtle float
      // 0.80 -> 1.00: Fade out from 1 to 0, slide up from 0px to -20px
      let opacity = 1;
      let translateY = 0;

      if (sceneProgress < 0.18) {
        opacity = sceneProgress / 0.18;
        translateY = (1 - opacity) * 25;
      } else if (sceneProgress > 0.8) {
        opacity = Math.max(0, (1 - sceneProgress) / 0.2);
        translateY = (1 - opacity) * -20;
      }

      setTextOpacity(opacity);
      setTextTranslateY(translateY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentScene = MINIMAL_MILESTONES[activeSceneIndex] || MINIMAL_MILESTONES[0];
  const loadPercentage = Math.min(100, Math.round((loadedCount / TOTAL_FRAMES) * 100));

  return (
    <div
      id="hero-scroll-container"
      ref={containerRef}
      className="relative w-full"
      style={{ height: '500vh' }}
    >
      {/* 1. Full-Screen Luxury Preloader (Active Until All 438 Frames Load) */}
      {loaderVisible && (
        <div
          className={`fixed inset-0 z-[10000] bg-brand-dark flex flex-col items-center justify-between p-8 sm:p-14 transition-opacity duration-1000 ease-out ${
            allLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          {/* Top Archive Badge */}
          <div className="w-full flex justify-between items-center text-[10px] sm:text-xs font-mono tracking-mega text-white/40 uppercase">
            <span>BOTVOR // ARCHIVE 01</span>
            <span>VAL D’AOSTA ALPS</span>
          </div>

          {/* Center Monogram & Progress Counter */}
          <div className="flex flex-col items-center gap-6">
            <div className="relative w-20 h-20 rounded-full border border-brand-amber/30 flex items-center justify-center bg-brand-surface/40 backdrop-blur-md shadow-2xl">
              <span className="text-2xl font-serif-luxury font-bold tracking-widest text-brand-amber animate-pulse">
                VM
              </span>
              <div
                className="absolute inset-0 rounded-full border border-brand-amber/60 animate-ping"
                style={{ animationDuration: '2.5s' }}
              />
            </div>

            <div className="flex flex-col items-center gap-2 text-center">
              <span className="text-[11px] sm:text-xs font-mono tracking-mega text-brand-amber uppercase font-bold">
                SYNCHRONIZING CINEMATIC SEQUENCE
              </span>
              <span className="text-3xl sm:text-5xl font-mono text-white font-light tracking-tighter">
                {loadPercentage}%
              </span>
            </div>
          </div>

          {/* Bottom Progress Bar */}
          <div className="w-full max-w-md flex flex-col gap-2">
            <div className="flex justify-between items-center text-[10px] font-mono text-white/40 uppercase tracking-widest">
              <span>8K WEBP SEQUENCE</span>
              <span>{loadedCount} / {TOTAL_FRAMES} FRAMES</span>
            </div>
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-brand-amber via-white to-brand-aqua transition-all duration-150 ease-out rounded-full"
                style={{ width: `${loadPercentage}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* 2. Sticky Viewport (100vh) */}
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-brand-dark flex flex-col justify-between select-none">
        {/* High-DPI HTML5 Canvas Frame Renderer with 3D Camera Motion */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block"
        />

        {/* Subtle Atmospheric Vignette Gradients */}
        <div className="absolute inset-y-0 left-0 w-full lg:w-2/5 bg-gradient-to-r from-black/75 via-black/25 to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black/60 to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-brand-dark/90 via-brand-dark/30 to-transparent pointer-events-none z-10" />

        {/* 3. Pure Minimalist Typography with Smooth Fading & Floating Drift */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-14 w-full h-full flex flex-col justify-center pointer-events-none">
          <div
            className="max-w-2xl flex flex-col gap-3 transition-transform duration-300 ease-out"
            style={{
              opacity: textOpacity,
              transform: `translateY(${textTranslateY}px)`,
            }}
          >
            {/* Minimal Eyebrow */}
            <div className="flex items-center gap-3">
              <span className="w-6 h-px bg-brand-amber/80" />
              <span className="text-[11px] font-mono tracking-mega text-brand-amber uppercase font-semibold">
                {currentScene.eyebrow}
              </span>
            </div>

            {/* Minimal Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter text-white uppercase leading-[1.08] whitespace-pre-line drop-shadow-2xl">
              {currentScene.headline}
            </h1>

            {/* Minimal Subtitle */}
            <p className="text-xs sm:text-sm font-light text-white/70 tracking-widest uppercase">
              {currentScene.sub}
            </p>
          </div>
        </div>

        {/* 4. Minimal Scroll Indicator Prompt (Visible only at top, fades out immediately on scroll) */}
        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center gap-2 transition-opacity duration-500 ${
            scrollProgress < 0.04 ? 'opacity-70' : 'opacity-0'
          }`}
        >
          <span className="text-[10px] font-mono tracking-mega text-white/60 uppercase">
            SCROLL TO EXPLORE
          </span>
          <ArrowDown className="w-3.5 h-3.5 text-brand-amber animate-bounce" />
        </div>
      </div>
    </div>
  );
}
