import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, Droplets, Compass, Sparkles, Eye, Maximize2, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const SCROLL_STEPS = [
  {
    step: '01',
    title: 'THE SCULPTURE',
    subtitle: 'Flint Glass Geometry',
    desc: 'An ergonomic waist contour (220mm × 65mm) with twisted diamond facets inspired by aerodynamic fluid curves. Sculpted from 100% inert flint crystal to refract natural sunlight and ensure anti-slip palm grip.',
    icon: Compass,
    image: '/images/vessel/bottle_master_front.jpg',
    detailImage: '/images/vessel/showcase_wireframe.jpg',
    detailLabel: 'CAD ERGONOMIC WIREFRAME',
    detailSubtitle: '220mm Height × 65mm Diameter Profile',
    metric: '220MM × 65MM FLINT GLASS • ZERO MICROPLASTICS',
    angleLabel: 'MONOLITH // 0° FRONT',
    cameraTransform: 'scale-100 translate-y-0',
  },
  {
    step: '02',
    title: 'HYDRODYNAMICS',
    subtitle: 'Subterranean Purity',
    desc: 'Filtered for 18 years through alpine basalt strata. Enriched naturally with vital calcium, magnesium, and silica. Light cascades through the helical diamond facets, refracting prismatic clarity.',
    icon: Droplets,
    image: '/images/vessel/bottle_master_angle.jpg',
    detailImage: '/images/vessel/detail_texture.jpg',
    detailLabel: 'HELICAL DIAMOND FACETS',
    detailSubtitle: 'Micro-prism water refraction',
    metric: 'pH 7.85 ALKALINE • TDS 42 MG/L • 18-YR BASALT',
    angleLabel: 'PRISMATIC TWIST // 45°',
    cameraTransform: 'scale-110 translate-y-2',
  },
  {
    step: '03',
    title: 'THE SEAL',
    subtitle: 'Machined Aluminum Cap',
    desc: 'Precision knurled threads in aerospace-grade anodized royal blue aluminum with the embossed VM monogram. Medical-grade silicone inner liner locks in crisp freshness without plastic migration.',
    icon: ShieldCheck,
    image: '/images/vessel/bottle_master_cap.jpg',
    detailImage: '/images/vessel/detail_cap.jpg',
    detailLabel: 'ANODIZED BLUE CLOSURE',
    detailSubtitle: 'Vertical knurl bands & silicone liner',
    metric: 'AEROSPACE ALLOY • HERMETIC VACUUM SEAL',
    angleLabel: 'MACRO CLOSURE // ANODIZED BLUE',
    cameraTransform: 'scale-125 -translate-y-4',
  },
  {
    step: '04',
    title: 'EQUILIBRIUM',
    subtitle: 'Weighted Crystal Base',
    desc: 'An ultra-thick fluted petal crystal pedestal grounds the bottle with low center of gravity. Settles on black Nero Marquina marble with tactile acoustic resonance and zero wobble.',
    icon: Sparkles,
    image: '/images/vessel/bottle_master_base.jpg',
    detailImage: '/images/vessel/detail_bottom_view.jpg',
    detailLabel: 'FLUTED CRYSTAL PEDESTAL',
    detailSubtitle: 'Weighted base & 100% recyclable mark',
    metric: 'WEIGHTED PEDESTAL • EXPANDING CAUSTIC RIPPLE',
    angleLabel: 'GROUNDED EQUILIBRIUM // ACOUSTIC BASE',
    cameraTransform: 'scale-120 translate-y-6',
  },
];

export function PinnedBottleScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const activeStepRef = useRef(0);
  const [activeStep, setActiveStep] = useState(0);
  const [showDetailModal, setShowDetailModal] = useState<string | null>(null);

  // Mouse Parallax 3D State
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: '+=300%',
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 0.5,
        onUpdate: (self) => {
          const index = Math.min(
            Math.floor(self.progress * SCROLL_STEPS.length),
            SCROLL_STEPS.length - 1
          );
          if (index !== activeStepRef.current) {
            activeStepRef.current = index;
            setActiveStep(index);
          }
        },
      });
    }, containerRef);

    // Refresh ScrollTrigger to ensure accurate trigger offsets after preceding pin spacers settle
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      ctx.revert();
      scrollTriggerRef.current = null;
    };
  }, []);

  // Smooth step selection with synchronized page scroll
  const handleSelectStep = (idx: number) => {
    setActiveStep(idx);
    const st = scrollTriggerRef.current;
    if (st) {
      const stepDuration = (st.end - st.start) / SCROLL_STEPS.length;
      const targetScroll = st.start + idx * stepDuration + 10;
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(targetScroll, { immediate: false });
      } else {
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
      }
    }
  };

  // Smooth mouse tilt handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1 to 1
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  const currentConfig = SCROLL_STEPS[activeStep];

  return (
    <div
      id="vessel-pinned"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-screen bg-brand-dark overflow-hidden flex items-center select-none"
    >
      {/* Dynamic studio overhead spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(18,28,45,0.85)_0%,rgba(6,9,14,1)_100%)] pointer-events-none" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-aqua/10 rounded-full blur-[150px] pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `translate(calc(-50% + ${mouseOffset.x * 40}px), calc(-50% + ${mouseOffset.y * 40}px))`,
        }}
      />

      {/* Central Photorealistic 3D Stage with Dynamic Perspective Parallax */}
      <div
        ref={stageRef}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none perspective-[1400px]"
      >
        <div
          className="relative flex flex-col items-center justify-center pointer-events-auto transition-transform duration-500 ease-out"
          style={{
            transform: `rotateY(${mouseOffset.x * 8}deg) rotateX(${-mouseOffset.y * 6}deg) translateZ(20px)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Studio Pedestal Frame Display with Smooth Camera Cross-Fade */}
          <div className="relative w-[320px] sm:w-[420px] md:w-[480px] lg:w-[500px] max-h-[60vh] aspect-square rounded-3xl overflow-hidden glass-panel border border-white/15 shadow-[0_30px_70px_rgba(0,0,0,0.9)] bg-black/60 flex items-center justify-center group">
            {/* The 4 Photorealistic Master Studio Views Cross-Fading Smoothly */}
            {SCROLL_STEPS.map((step, idx) => (
              <img
                key={step.step}
                src={step.image}
                alt={`BOTVOR Bottle - ${step.title}`}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${
                  activeStep === idx
                    ? 'opacity-100 scale-100 filter brightness-100'
                    : 'opacity-0 scale-105 filter brightness-75 pointer-events-none'
                }`}
              />
            ))}

            {/* Dynamic Glass Refraction Caustic Glint */}
            <div
              className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none opacity-40 transition-transform duration-700 ease-out"
              style={{
                transform: `translateX(${mouseOffset.x * 60}px) translateY(${mouseOffset.y * 40}px)`,
              }}
            />

            {/* Top Angle Telemetry Badge */}
            <div className="absolute top-4 right-4 z-20 px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-brand-amber/30 text-[10px] font-mono text-brand-amber tracking-widest uppercase shadow-xl flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-amber animate-pulse" />
              <span>{currentConfig.angleLabel}</span>
            </div>

            {/* Bottom Metric Telemetry Overlay */}
            <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-center px-4 py-2 rounded-xl bg-black/80 backdrop-blur-md border border-white/15 text-[10px] font-mono text-white/80 tracking-wider uppercase shadow-2xl">
              <span className="truncate">{currentConfig.metric}</span>
              <button
                onClick={() => setShowDetailModal(currentConfig.detailImage)}
                className="shrink-0 ml-2 px-2.5 py-1 rounded bg-white/10 hover:bg-brand-amber hover:text-black transition-colors flex items-center gap-1 text-[9px]"
              >
                <Maximize2 className="w-3 h-3" />
                <span>SPECS</span>
              </button>
            </div>
          </div>

          {/* Photorealistic Soft Pedestal Grounding Shadow */}
          <div className="relative -mt-4 w-72 h-8 pointer-events-none flex items-center justify-center">
            <div className="w-56 h-6 bg-black/85 rounded-full blur-xl" />
          </div>
        </div>
      </div>

      {/* Choreographed Editorial Content Overlay */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-12 w-full flex justify-between items-center pointer-events-none">
        {/* Left Side: Chapter Narrative Card */}
        <div className="max-w-md pointer-events-auto p-6 sm:p-8 rounded-3xl glass-panel border border-white/15 shadow-2xl backdrop-blur-2xl transition-all duration-500 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono tracking-mega text-brand-amber uppercase font-bold">
              STEP {currentConfig.step} // 04
            </span>
            <span className="w-8 h-px bg-white/20" />
            <span className="text-[11px] font-mono text-white/50 uppercase">
              ARCHITECTURAL ANATOMY
            </span>
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white uppercase mb-1">
              {currentConfig.title}
            </h3>
            <p className="text-xs font-serif-luxury tracking-widest text-brand-amber/90 italic">
              {currentConfig.subtitle}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-white/75 font-light leading-relaxed">
            {currentConfig.desc}
          </p>

          {/* Interactive Macro Detail Callout Card */}
          <div
            onClick={() => setShowDetailModal(currentConfig.detailImage)}
            className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 transition-all duration-300 flex items-center gap-3.5 cursor-pointer group"
            title="Click to view macro zoom"
          >
            <div className="w-14 h-14 rounded-xl overflow-hidden border border-white/20 bg-black/40 shrink-0 relative shadow-inner">
              <img
                src={currentConfig.detailImage}
                alt={currentConfig.detailLabel}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-brand-amber/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Maximize2 className="w-3.5 h-3.5 text-white drop-shadow" />
              </div>
            </div>

            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-wider text-brand-amber uppercase font-bold truncate">
                  {currentConfig.detailLabel}
                </span>
                <Eye className="w-3 h-3 text-white/40 group-hover:text-brand-amber transition-colors" />
              </div>
              <span className="text-[11px] text-white/60 truncate">
                {currentConfig.detailSubtitle}
              </span>
              <span className="text-[9px] font-mono text-white/40 tracking-widest uppercase pt-0.5">
                TAP TO ZOOM RENDER
              </span>
            </div>
          </div>

          {/* Step Progress Dots */}
          <div className="flex items-center gap-2 pt-2">
            {SCROLL_STEPS.map((s, idx) => (
              <button
                key={s.step}
                onClick={() => handleSelectStep(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeStep === idx
                    ? 'w-8 bg-brand-amber shadow-[0_0_12px_rgba(212,175,55,0.7)]'
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Jump to step ${s.step}`}
              />
            ))}
          </div>
        </div>

        {/* Right Side: Chapter Quick Switcher (Desktop) */}
        <div className="hidden lg:flex flex-col gap-6 pointer-events-auto text-right">
          {SCROLL_STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === idx;
            return (
              <div
                key={step.step}
                onClick={() => handleSelectStep(idx)}
                className={`cursor-pointer transition-all duration-300 flex items-center justify-end gap-3 group ${
                  isActive ? 'text-white' : 'text-white/30 hover:text-white/60'
                }`}
              >
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono tracking-widest uppercase">
                    {step.step} // {step.title}
                  </span>
                  <span className="text-xs font-semibold">{step.subtitle}</span>
                </div>
                <div
                  className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all shadow-md ${
                    isActive
                      ? 'border-brand-amber bg-brand-amber/15 text-brand-amber scale-110 shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                      : 'border-white/10 group-hover:border-white/30 text-white/40'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>
      </div>



      {/* Modal Zoom for Technical Detail Renders */}
      {showDetailModal && (
        <div
          className="fixed inset-0 z-[2000] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-6 animate-fade-in"
          onClick={() => setShowDetailModal(null)}
        >
          <div
            className="max-w-xl w-full p-6 rounded-3xl glass-panel border border-white/20 shadow-2xl flex flex-col gap-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-xs font-mono tracking-mega text-brand-amber uppercase">
                Official BOTVOR Vessel Blueprint Detail
              </span>
              <button
                onClick={() => setShowDetailModal(null)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden bg-black flex items-center justify-center border border-white/10 max-h-[60vh] p-2">
              <img
                src={showDetailModal}
                alt="Macro Detail"
                className="w-full h-full object-contain"
              />
            </div>

            <span className="text-xs text-white/60 text-center font-light">
              Captured directly from the BOTVOR master CAD blueprint & photorealistic studio suite.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
