import { useRef, useEffect, useState, useCallback } from 'react';
import { ArrowDown } from 'lucide-react';

interface VideoScrollHeroProps {
  onOpenFilmModal?: () => void;
}

export interface MinimalMilestone {
  range: [number, number];
  eyebrow: string;
  headline: string;
  sub: string;
}

export const MINIMAL_MILESTONES: MinimalMilestone[] = [
  {
    range: [0.08, 0.28],
    eyebrow: '01 // ORIGIN',
    headline: 'SCULPTED BY NATURE.\nDEFINED BY MOVEMENT.',
    sub: 'Val d’Aosta Alps • Elevation 2,800m',
  },
  {
    range: [0.30, 0.50],
    eyebrow: '02 // AMBITION',
    headline: 'DECISIVE CALM.',
    sub: 'Kinetic Equilibrium in Free Fall',
  },
  {
    range: [0.52, 0.70],
    eyebrow: '03 // VELOCITY',
    headline: 'UNBROKEN MOMENTUM.',
    sub: 'Olympic Sprint • Peak Hydration',
  },
  {
    range: [0.72, 0.85],
    eyebrow: '04 // SERENITY',
    headline: 'DISTINCTION & RESTRAINT.',
    sub: 'Penthouse Horizon • Executive Clarity',
  },
  // Note: Range [0.85, 1.0] has NO milestone text so the final crystal bottle shot is completely clean and unobstructed.
];

// Frame 416 is the final frame of crystal bottle footage before the black title card
const TOTAL_FRAMES = 416;

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

  // Direct DOM Refs (Zero React Re-render during scroll for maximum 60/120fps smoothness)
  const introContainerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const scrollPromptRef = useRef<HTMLDivElement>(null);
  const activeMilestoneIndexRef = useRef<number>(-1);

  // Loading State
  const [loadedCount, setLoadedCount] = useState(0);
  const [allLoaded, setAllLoaded] = useState(false);
  const [loaderVisible, setLoaderVisible] = useState(true);

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

  // High-DPI Canvas Draw with 3D Camera Zoom & Object-Fit: Cover
  const drawCanvasFrame = useCallback((frameIdx: number, zoomLevel: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
    if (!ctx) return;

    // Retrieve requested frame or nearest loaded neighbor
    let img = framesArrayRef.current[frameIdx];
    if (!img || !img.naturalWidth) {
      for (let offset = 1; offset < 20; offset++) {
        const fallback =
          framesArrayRef.current[Math.max(0, frameIdx - offset)] ||
          framesArrayRef.current[Math.min(TOTAL_FRAMES - 1, frameIdx + offset)];
        if (fallback && fallback.naturalWidth) {
          img = fallback;
          break;
        }
      }
    }

    if (!img || !img.naturalWidth) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'medium';

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

  // Preload ALL 416 Frames with Batching & Concurrency Control
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
            img.onload = () => {
              if (!isMounted) return;
              framesArrayRef.current[idx] = img;
              loadedCounter++;
              setLoadedCount(loadedCounter);
              resolve();
            };
            img.onerror = () => {
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
  }, [getFrameUrl, drawCanvasFrame]);

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

  // Main RAF Render Loop: Continuous Smooth Sub-Pixel Frame Lerp & Real-Video Playback Velocity
  useEffect(() => {
    let lastDrawnFrame = -1;
    let lastDrawnZoom = -1;

    const loop = () => {
      // 1. Frame interpolation: Calibrated to real video playback speed with responsive fast-scroll assist
      const targetF = targetFrameRef.current;
      const currentF = currentRenderedFrameRef.current;
      const diffF = targetF - currentF;
      const absDiff = Math.abs(diffF);

      if (absDiff > 0.01) {
        // Natural playback speed: ~0.35 frames per tick (~21fps)
        // Responsive fast-scroll assist: smoothly scales if user scrolls rapidly so it catches up smoothly without stutter
        const baseSpeed = Math.min(0.38, absDiff * 0.04);
        const catchup = absDiff > 25 ? Math.min(0.55, (absDiff - 25) * 0.008) : 0;
        const maxStep = baseSpeed + catchup;
        const step = Math.sign(diffF) * Math.min(absDiff, maxStep);
        currentRenderedFrameRef.current += step;
      } else {
        currentRenderedFrameRef.current = targetF;
      }

      // Single Unified Source of Truth: renderedProgress (from currently visible video frame)
      const renderedProgress = currentRenderedFrameRef.current / (TOTAL_FRAMES - 1);

      // 2. Realistic 3D Camera Zoom interpolation
      const sceneCameraPush = 1.0 + Math.sin(renderedProgress * Math.PI * 2) * 0.04;
      const overallMacroZoom = 1.0 + renderedProgress * 0.03;
      const targetZ = sceneCameraPush * overallMacroZoom;
      const diffZ = targetZ - currentZoomRef.current;
      if (Math.abs(diffZ) > 0.001) {
        currentZoomRef.current += diffZ * 0.10;
      } else {
        currentZoomRef.current = targetZ;
      }

      // 3. Center Intro Headline Overlay (Strictly visible only when renderedProgress < 0.045)
      // Guaranteed 100% mutual exclusion: intro is FORCED hidden whenever renderedProgress >= 0.045
      if (introContainerRef.current) {
        const introLimit = 0.045;
        if (renderedProgress <= 0.0005) {
          introContainerRef.current.style.opacity = '1';
          introContainerRef.current.style.transform = 'translateY(0px) scale(1)';
          introContainerRef.current.style.filter = 'blur(0px)';
          introContainerRef.current.style.visibility = 'visible';
          introContainerRef.current.style.pointerEvents = 'auto';
        } else if (renderedProgress < introLimit) {
          const prog = renderedProgress / introLimit;
          const opacity = Math.max(0, 1 - prog);
          const translateY = -prog * 35;
          const scale = 1 - prog * 0.04;
          const blur = prog * 4;
          introContainerRef.current.style.opacity = `${opacity}`;
          introContainerRef.current.style.transform = `translateY(${translateY}px) scale(${scale})`;
          introContainerRef.current.style.filter = `blur(${blur}px)`;
          introContainerRef.current.style.visibility = opacity > 0.01 ? 'visible' : 'hidden';
          introContainerRef.current.style.pointerEvents = opacity > 0.1 ? 'auto' : 'none';
        } else {
          introContainerRef.current.style.opacity = '0';
          introContainerRef.current.style.transform = 'translateY(-35px) scale(0.96)';
          introContainerRef.current.style.filter = 'blur(4px)';
          introContainerRef.current.style.visibility = 'hidden';
          introContainerRef.current.style.pointerEvents = 'none';
        }
      }

      // 4. Scroll Prompt Indicator (Strictly visible only when renderedProgress < 0.015)
      if (scrollPromptRef.current) {
        const promptOpacity = renderedProgress < 0.015 ? Math.max(0, 0.75 * (1 - renderedProgress / 0.015)) : 0;
        scrollPromptRef.current.style.opacity = `${promptOpacity}`;
        scrollPromptRef.current.style.visibility = promptOpacity > 0.01 ? 'visible' : 'hidden';
      }

      // 5. Narrative Milestone Text (Strictly visible only when renderedProgress in [0.08, 0.85])
      // Guaranteed 100% mutual exclusion: milestones are FORCED hidden whenever renderedProgress < 0.075
      const milestoneIndex = MINIMAL_MILESTONES.findIndex(
        (m) => renderedProgress >= m.range[0] && renderedProgress < m.range[1]
      );

      if (milestoneIndex !== -1 && renderedProgress >= 0.075) {
        const m = MINIMAL_MILESTONES[milestoneIndex];

        if (activeMilestoneIndexRef.current !== milestoneIndex) {
          activeMilestoneIndexRef.current = milestoneIndex;
          if (eyebrowRef.current) eyebrowRef.current.textContent = m.eyebrow;
          if (headlineRef.current) headlineRef.current.textContent = m.headline;
          if (subRef.current) subRef.current.textContent = m.sub;
        }

        const sceneRange = m.range[1] - m.range[0];
        const sceneProgress = Math.min(1, Math.max(0, (renderedProgress - m.range[0]) / sceneRange));

        let opacity = 1;
        let translateY = 0;

        if (sceneProgress < 0.2) {
          opacity = sceneProgress / 0.2;
          translateY = (1 - opacity) * 20;
        } else if (sceneProgress > 0.8) {
          opacity = Math.max(0, (1 - sceneProgress) / 0.2);
          translateY = (1 - opacity) * -15;
        }

        if (textContainerRef.current) {
          textContainerRef.current.style.opacity = `${opacity}`;
          textContainerRef.current.style.transform = `translateY(${translateY}px)`;
          textContainerRef.current.style.visibility = opacity > 0.01 ? 'visible' : 'hidden';
        }
      } else {
        // For renderedProgress < 0.075 or renderedProgress >= 0.85: STRICTLY HIDDEN!
        activeMilestoneIndexRef.current = -1;
        if (textContainerRef.current) {
          textContainerRef.current.style.opacity = '0';
          textContainerRef.current.style.transform = 'translateY(-20px)';
          textContainerRef.current.style.visibility = 'hidden';
        }
      }

      const roundedFrame = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(currentRenderedFrameRef.current))
      );
      const roundedZoom = Math.round(currentZoomRef.current * 1000) / 1000;

      if (roundedFrame !== lastDrawnFrame || Math.abs(roundedZoom - lastDrawnZoom) > 0.0015) {
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

  // Direct High-Performance Progress & Text Updates (Zero Component Re-renders on Scroll)
  // High-Performance Target Frame Calculation (Scroll Event)
  const updateScrollProgress = useCallback((scrollY: number) => {
    const container = containerRef.current;
    if (!container) return;

    const maxScroll = container.offsetHeight - window.innerHeight;
    if (maxScroll <= 0) return;

    const currentScroll = Math.max(0, scrollY - container.offsetTop);
    const p = Math.max(0, Math.min(1, currentScroll / maxScroll));

    // Sub-frame precision floating frame target
    targetFrameRef.current = p * (TOTAL_FRAMES - 1);
  }, []);

  // Synchronize with Lenis Smooth Scroll & Native Window Scroll
  useEffect(() => {
    const handleNativeScroll = () => {
      updateScrollProgress(window.scrollY);
    };

    window.addEventListener('scroll', handleNativeScroll, { passive: true });

    // Connect to Lenis smooth scroll instance if active
    const lenis = (window as any).lenis;
    let lenisUnsub: (() => void) | null = null;
    if (lenis) {
      const onLenisScroll = (e: any) => {
        updateScrollProgress(e.scroll ?? window.scrollY);
      };
      lenis.on('scroll', onLenisScroll);
      lenisUnsub = () => lenis.off('scroll', onLenisScroll);
    }

    updateScrollProgress(window.scrollY);

    return () => {
      window.removeEventListener('scroll', handleNativeScroll);
      if (lenisUnsub) lenisUnsub();
    };
  }, [updateScrollProgress]);

  const loadPercentage = Math.min(100, Math.round((loadedCount / TOTAL_FRAMES) * 100));

  return (
    <div
      id="hero-scroll-container"
      ref={containerRef}
      className="relative w-full"
      style={{ height: '1200vh' }}
    >
      {/* 1. Full-Screen Luxury Preloader (Active Until All 416 Frames Load) */}
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

        {/* Atmospheric Vignette Gradients */}
        <div className="absolute inset-y-0 left-0 w-full lg:w-2/5 bg-gradient-to-r from-black/80 via-black/30 to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black/70 to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-brand-dark/90 via-brand-dark/30 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.15)_55%,transparent_80%)] pointer-events-none z-10" />

        {/* 3. Center Initial Hero Headline (Prominently visible at start, fades away in an instant on scroll) */}
        <div
          ref={introContainerRef}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 sm:px-12 pointer-events-none will-change-[transform,opacity]"
          style={{
            opacity: 1,
            transform: 'translateY(0px) scale(1)',
            visibility: 'visible',
          }}
        >
          <div className="max-w-4xl flex flex-col items-center gap-4 sm:gap-6">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-brand-amber/40 bg-brand-dark/75 backdrop-blur-md shadow-2xl">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-brand-amber animate-pulse" />
              <span className="text-[10px] sm:text-xs font-mono tracking-mega text-brand-amber uppercase font-semibold">
                VAL D’AOSTA ALPS // ELEVATION 2,800M
              </span>
            </div>

            {/* Main Center Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-sans font-black tracking-tighter text-white uppercase leading-[0.92] drop-shadow-[0_12px_36px_rgba(0,0,0,0.95)]">
              FOR EVERY MOMENT
              <br />
              <span className="bg-gradient-to-r from-white via-slate-100 to-white/80 bg-clip-text text-transparent">
                THAT MOVES YOU
              </span>
            </h1>

            {/* Subtitle / Spec Line */}
            <p className="max-w-xl text-[11px] sm:text-xs md:text-sm font-light text-white/90 tracking-widest uppercase drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
              Flint Glass Geometry • Subterranean Purity • Kinetic Equilibrium
            </p>
          </div>
        </div>

        {/* 4. Pure Minimalist Typography with Smooth Fading & Floating Drift */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-14 w-full h-full flex flex-col justify-center pointer-events-none">
          <div
            ref={textContainerRef}
            className="max-w-2xl flex flex-col gap-3 will-change-[transform,opacity]"
            style={{
              opacity: 0,
              transform: 'translateY(20px)',
              visibility: 'hidden',
            }}
          >
            {/* Minimal Eyebrow */}
            <div className="flex items-center gap-3">
              <span className="w-6 h-px bg-brand-amber/80" />
              <span
                ref={eyebrowRef}
                className="text-[11px] font-mono tracking-mega text-brand-amber uppercase font-semibold"
              >
                {MINIMAL_MILESTONES[0].eyebrow}
              </span>
            </div>

            {/* Minimal Headline */}
            <h1
              ref={headlineRef}
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter text-white uppercase leading-[1.08] whitespace-pre-line drop-shadow-2xl"
            >
              {MINIMAL_MILESTONES[0].headline}
            </h1>

            {/* Minimal Subtitle */}
            <p
              ref={subRef}
              className="text-xs sm:text-sm font-light text-white/70 tracking-widest uppercase"
            >
              {MINIMAL_MILESTONES[0].sub}
            </p>
          </div>
        </div>

        {/* 5. Minimal Scroll Indicator Prompt (Visible only at top, fades out immediately on scroll) */}
        <div
          ref={scrollPromptRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center gap-2 will-change-[opacity]"
          style={{ opacity: 0.75, visibility: 'visible' }}
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
