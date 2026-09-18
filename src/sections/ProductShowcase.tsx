import { useState, useRef } from 'react';
import { PRODUCTS } from '../data/products';
import {
  Sparkles,
  ArrowUpRight,
  Compass,
  FileCode2,
  ShieldCheck,
  CheckCircle2,
  Sun,
  Moon,
  Sparkle,
  X,
} from 'lucide-react';

export const REAL_HOTSPOTS = [
  {
    id: 'cap',
    title: 'Machined Royal Blue Cap',
    subtitle: 'Threaded Anodized Aluminum Closure',
    desc: 'Precision knurled vertical grip bands in deep royal blue anodized alloy with embossed VM monogram and a medical-grade silicone inner liner for a hermetic seal.',
    image: '/images/vessel/bottle_master_cap.jpg',
    targetMode: 'cap',
    metric: 'ANODIZED ALLOY • HERMETIC SEAL',
  },
  {
    id: 'neck',
    title: 'Precision Threaded Neck',
    subtitle: 'Crystalline Fluid Delivery Profile',
    desc: 'Ergonomically engineered bottle mouth with calibrated thread pitch for zero-turbulence, non-spill drinking during Olympic-pace velocity.',
    image: '/images/vessel/detail_neck.jpg',
    targetMode: 'hero',
    metric: 'PRECISION GLASS THREADS',
  },
  {
    id: 'monogram',
    title: 'Apex Monogram & Wordmark',
    subtitle: 'Heritage Brand Identity',
    desc: 'The iconic stylized VM crest and bold BOTVOR VITAL ELIXIR typography celebrating subterranean alpine origin and Olympic endurance.',
    image: '/images/vessel/bottle_master_front.jpg',
    targetMode: 'hero',
    metric: 'BOTVOR VITAL ELIXIR',
  },
  {
    id: 'texture',
    title: 'Helical Diamond Facets',
    subtitle: 'Aerodynamic Fluid Sculpting',
    desc: 'Twisted diamond crystal facets sculpted along the ergonomic waist to refract natural sunlight and provide tactile anti-slip palm grip.',
    image: '/images/vessel/bottle_master_angle.jpg',
    targetMode: 'angle',
    metric: 'PRISMATIC LIGHT REFRACTION',
  },
  {
    id: 'label',
    title: 'Purity & Telemetry Label',
    subtitle: 'Mineral Composition Assay',
    desc: 'Minimalist lower label detailing: Pure Balance Performance • 500 ML • Naturally Alkaline pH 7.85 • TDS 42 mg/L subterranean mineral profile.',
    image: '/images/vessel/detail_label.jpg',
    targetMode: 'hero',
    metric: '500 ML • pH 7.85 • TDS 42 MG/L',
  },
  {
    id: 'base',
    title: 'Fluted Petal Crystal Base',
    subtitle: 'Weighted Low Center of Gravity',
    desc: 'An ultra-thick fluted crystal pedestal that grounds the bottle with zero wobble on marble, complete with acoustic resonance and recyclable mark.',
    image: '/images/vessel/bottle_master_base.jpg',
    targetMode: 'base',
    metric: 'WEIGHTED PEDESTAL • 100% RECYCLABLE',
  },
];

type ViewMode = 'hero' | 'angle' | 'cap' | 'base';
type LightingPreset = 'noir' | 'prism' | 'pure';

export function ProductShowcase() {
  const [viewMode, setViewMode] = useState<ViewMode>('hero');
  const [lighting, setLighting] = useState<LightingPreset>('noir');
  const [activeHotspotId, setActiveHotspotId] = useState('texture');
  const [blueprintModalOpen, setBlueprintModalOpen] = useState(false);
  const [allocationSuccess, setAllocationSuccess] = useState(false);

  // Mouse Parallax 3D
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const viewportRef = useRef<HTMLDivElement>(null);

  const product = PRODUCTS[0];
  const activeHotspot = REAL_HOTSPOTS.find((h) => h.id === activeHotspotId) || REAL_HOTSPOTS[3];

  // 3D Mouse Parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!viewportRef.current) return;
    const rect = viewportRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  return (
    <section
      id="vessel"
      className={`relative w-full py-28 sm:py-36 px-6 sm:px-12 overflow-hidden border-t border-white/10 transition-colors duration-1000 ${
        lighting === 'noir'
          ? 'bg-gradient-to-b from-[#070c16] via-[#0a1426] to-[#04070e]'
          : lighting === 'prism'
          ? 'bg-gradient-to-b from-[#140e0a] via-[#1c140c] to-[#0a0705]'
          : 'bg-gradient-to-b from-[#0a121f] via-[#101c2e] to-[#060b12]'
      }`}
    >
      {/* 1. Architectural Precision Grid Matrix Overlay with Radial Soft Falloff */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:4.5rem_4.5rem] [mask-image:radial-gradient(ellipse_80%_65%_at_50%_45%,#000_50%,transparent_95%)] pointer-events-none" />

      {/* 2. Editorial Luxury Typographic Horizon */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full select-none pointer-events-none text-center overflow-hidden opacity-[0.03] z-0">
        <span className="text-[14vw] font-black tracking-mega uppercase font-serif-luxury text-white block">
          ARCHITECTURAL
        </span>
      </div>

      {/* 3. Overhead Curved Studio Canopy Spotlight */}
      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[650px] rounded-full blur-[150px] pointer-events-none transition-all duration-1000 opacity-60 z-0 ${
          lighting === 'noir'
            ? 'bg-gradient-to-b from-sky-400/25 via-blue-600/15 to-transparent'
            : lighting === 'prism'
            ? 'bg-gradient-to-b from-amber-400/30 via-orange-500/15 to-transparent'
            : 'bg-gradient-to-b from-cyan-100/25 via-blue-300/15 to-transparent'
        }`}
      />

      {/* 4. Floor Ambient Horizon Glow */}
      <div
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[450px] rounded-full blur-[160px] pointer-events-none transition-all duration-1000 opacity-50 z-0 ${
          lighting === 'noir'
            ? 'bg-blue-600/15'
            : lighting === 'prism'
            ? 'bg-amber-600/20'
            : 'bg-cyan-400/15'
        }`}
      />

      <div className="max-w-7xl mx-auto flex flex-col gap-12 relative z-10">
        {/* Header with Lighting & Mode Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-px bg-brand-amber" />
              <span className="text-xs font-mono tracking-mega uppercase text-brand-amber font-semibold">
                // ARCHITECTURAL VESSEL
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white uppercase leading-tight">
              PHOTOREALISTIC VESSEL<br />
              <span className="text-stroke-subtle font-light">STUDIO EXPERIENCE</span>
            </h2>
            <p className="text-xs sm:text-sm text-white/60 font-light mt-1 max-w-xl">
              Photorealistic 8K Studio Renders • Dynamic Studio Lighting • Macro Anatomy Telemetry
            </p>
          </div>

          {/* Right Toolbar: View Modes & Lighting Presets */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Lighting Toggle (Luxury Bezel) */}
            <div className="flex items-center gap-1 p-1 rounded-2xl bg-black/50 backdrop-blur-xl border border-white/20 text-xs font-mono shadow-lg">
              <button
                onClick={() => setLighting('noir')}
                className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                  lighting === 'noir'
                    ? 'bg-gradient-to-r from-brand-amber to-amber-400 text-black font-extrabold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                    : 'text-white/60 hover:text-white'
                }`}
                title="Obsidian Noir Lighting"
              >
                <Moon className="w-3 h-3" />
                <span className="hidden sm:inline">NOIR</span>
              </button>
              <button
                onClick={() => setLighting('prism')}
                className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                  lighting === 'prism'
                    ? 'bg-gradient-to-r from-brand-amber to-amber-400 text-black font-extrabold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                    : 'text-white/60 hover:text-white'
                }`}
                title="Caustic Prism Lighting"
              >
                <Sparkle className="w-3 h-3" />
                <span className="hidden sm:inline">PRISM</span>
              </button>
              <button
                onClick={() => setLighting('pure')}
                className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                  lighting === 'pure'
                    ? 'bg-gradient-to-r from-brand-amber to-amber-400 text-black font-extrabold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                    : 'text-white/60 hover:text-white'
                }`}
                title="Daylight Pure Lighting"
              >
                <Sun className="w-3 h-3" />
                <span className="hidden sm:inline">PURE</span>
              </button>
            </div>

            {/* Master Blueprint Button */}
            <button
              onClick={() => setBlueprintModalOpen(true)}
              className="px-4 py-2.5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/20 text-xs font-mono tracking-wider text-brand-amber uppercase flex items-center gap-2 transition-all shadow-md backdrop-blur-md"
            >
              <FileCode2 className="w-3.5 h-3.5" />
              <span>CAD BLUEPRINT</span>
            </button>
          </div>
        </div>

        {/* Studio View Mode Navigation Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {[
            { mode: 'hero', label: 'STUDIO HERO', icon: Sparkles },
            { mode: 'angle', label: '45° PRISMATIC', icon: Compass },
            { mode: 'cap', label: 'AEROSPACE SEAL', icon: ShieldCheck },
            { mode: 'base', label: 'CRYSTAL BASE', icon: Sparkle },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = viewMode === item.mode;
            return (
              <button
                key={item.mode}
                onClick={() => setViewMode(item.mode as ViewMode)}
                className={`px-5 py-3 rounded-xl text-xs font-mono tracking-wider uppercase transition-all shrink-0 flex items-center gap-2.5 ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-amber via-amber-400 to-amber-500 text-black font-extrabold shadow-[0_0_25px_rgba(212,175,55,0.4)] scale-105 border border-amber-300'
                    : 'bg-white/[0.05] hover:bg-white/[0.1] text-white/70 hover:text-white border border-white/15 backdrop-blur-md'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Studio Viewport & Engineering Telemetry Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left / Center: Interactive Smoked Crystal Studio Pedestal Stage */}
          <div
            ref={viewportRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="lg:col-span-7 relative min-h-[580px] sm:min-h-[660px] rounded-3xl overflow-hidden backdrop-blur-3xl bg-gradient-to-b from-white/[0.08] via-slate-950/75 to-[#05080e]/95 border border-white/20 shadow-[0_35px_80px_-15px_rgba(0,0,0,0.95),0_0_50px_rgba(56,189,248,0.06),inset_0_1px_1px_rgba(255,255,255,0.2)] flex flex-col justify-between p-6 perspective-[1400px] group"
          >
            {/* Precision CAD Corner Ticks */}
            <span className="absolute top-3.5 left-3.5 text-white/30 font-mono text-[10px] select-none pointer-events-none">┌</span>
            <span className="absolute top-3.5 right-3.5 text-white/30 font-mono text-[10px] select-none pointer-events-none">┐</span>
            <span className="absolute bottom-3.5 left-3.5 text-white/30 font-mono text-[10px] select-none pointer-events-none">└</span>
            <span className="absolute bottom-3.5 right-3.5 text-white/30 font-mono text-[10px] select-none pointer-events-none">┘</span>

            {/* Specular Top Rim Highlight */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

            {/* Top Viewport Header */}
            <div className="flex items-center justify-between z-20 text-xs font-mono text-white/60">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-amber animate-pulse" />
                <span className="text-brand-amber font-bold tracking-wider uppercase">
                  {viewMode === 'hero' && 'STUDIO PERSPECTIVE // 0° FRONT HERO'}
                  {viewMode === 'angle' && 'STUDIO PERSPECTIVE // 45° PRISMATIC FACETS'}
                  {viewMode === 'cap' && 'STUDIO PERSPECTIVE // AEROSPACE CLOSURE'}
                  {viewMode === 'base' && 'STUDIO PERSPECTIVE // CRYSTAL PEDESTAL'}
                </span>
              </div>
              <span className="text-[10px] font-mono text-white/60 uppercase bg-white/10 px-2.5 py-1 rounded-full border border-white/15 backdrop-blur-md">
                8K STUDIO RENDER
              </span>
            </div>

            {/* Central Stage Layer with Dynamic 3D Mouse Parallax */}
            <div
              className="relative flex-1 flex flex-col items-center justify-center select-none py-6 transition-transform duration-500 ease-out"
              style={{
                transform: `rotateY(${mouseOffset.x * 6}deg) rotateX(${-mouseOffset.y * 5}deg)`,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Studio Spotlight tracking mouse */}
              <div
                className={`absolute inset-0 pointer-events-none transition-all duration-700 blur-[80px] opacity-70 ${
                  lighting === 'noir'
                    ? 'bg-radial from-sky-400/20 via-blue-900/15 to-transparent'
                    : lighting === 'prism'
                    ? 'bg-radial from-amber-400/25 via-orange-600/15 to-transparent'
                    : 'bg-radial from-white/20 via-sky-300/15 to-transparent'
                }`}
                style={{
                  transform: `translate(${mouseOffset.x * 35}px, ${mouseOffset.y * 25}px)`,
                }}
              />

              {/* Architectural Studio Pedestal Grounding Plinth */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-4/5 h-20 pointer-events-none flex items-center justify-center">
                <div
                  className={`w-3/4 h-8 rounded-full blur-xl transition-all duration-700 ${
                    lighting === 'noir'
                      ? 'bg-sky-500/25'
                      : lighting === 'prism'
                      ? 'bg-amber-400/30'
                      : 'bg-white/20'
                  }`}
                />
                {/* Elliptical marble plinth light ring */}
                <div className="absolute inset-0 rounded-[100%] border border-white/20 bg-gradient-to-t from-white/[0.08] to-transparent shadow-[0_0_30px_rgba(255,255,255,0.08)]" />
                {/* Concentric subtle ripples */}
                <div className="absolute inset-[-12px] rounded-[100%] border border-brand-amber/25 animate-pulse-slow" />
                <div className="absolute inset-[-28px] rounded-[100%] border border-white/[0.06]" />
              </div>

              {/* View Mode 1: STUDIO HERO (8K Front Render with Caustics) */}
              {viewMode === 'hero' && (
                <div className="relative w-full h-[440px] sm:h-[500px] flex items-center justify-center animate-fade-in">
                  <img
                    src="/images/vessel/bottle_master_front.jpg"
                    alt="BOTVOR Bottle Studio Hero"
                    className="h-full w-auto object-contain rounded-2xl drop-shadow-[0_30px_50px_rgba(0,0,0,0.95)]"
                    draggable={false}
                  />
                  <div className="absolute bottom-1 px-4 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-[10px] font-mono text-white/90 uppercase shadow-lg">
                    8K STUDIO HERO • NERO MARQUINA MARBLE PEDESTAL
                  </div>
                </div>
              )}

              {/* View Mode 2: 45° PRISMATIC ANGLE (Twisted Diamond Facets) */}
              {viewMode === 'angle' && (
                <div className="relative w-full h-[440px] sm:h-[500px] flex items-center justify-center animate-fade-in">
                  <img
                    src="/images/vessel/bottle_master_angle.jpg"
                    alt="BOTVOR Bottle 45 Prismatic Angle"
                    className="h-full w-auto object-contain rounded-2xl drop-shadow-[0_30px_50px_rgba(0,0,0,0.95)]"
                    draggable={false}
                  />
                  <div className="absolute bottom-1 px-4 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-[10px] font-mono text-white/90 uppercase shadow-lg">
                    45° PRISMATIC ANGLE • HELICAL WATER REFRACTION
                  </div>
                </div>
              )}

              {/* View Mode 3: AEROSPACE SEAL (Macro Cap & Monogram) */}
              {viewMode === 'cap' && (
                <div className="relative w-full h-[440px] sm:h-[500px] flex items-center justify-center animate-fade-in">
                  <img
                    src="/images/vessel/bottle_master_cap.jpg"
                    alt="BOTVOR Cap Macro"
                    className="h-full w-auto object-contain rounded-2xl drop-shadow-[0_30px_50px_rgba(0,0,0,0.95)]"
                    draggable={false}
                  />
                  <div className="absolute bottom-1 px-4 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-[10px] font-mono text-white/90 uppercase shadow-lg">
                    AEROSPACE-GRADE ANODIZED ROYAL BLUE ALLOY • VM CREST
                  </div>
                </div>
              )}

              {/* View Mode 4: CRYSTAL BASE (Weighted Fluted Pedestal) */}
              {viewMode === 'base' && (
                <div className="relative w-full h-[440px] sm:h-[500px] flex items-center justify-center animate-fade-in">
                  <img
                    src="/images/vessel/bottle_master_base.jpg"
                    alt="BOTVOR Base Macro"
                    className="h-full w-auto object-contain rounded-2xl drop-shadow-[0_30px_50px_rgba(0,0,0,0.95)]"
                    draggable={false}
                  />
                  <div className="absolute bottom-1 px-4 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-[10px] font-mono text-white/90 uppercase shadow-lg">
                    WEIGHTED FLUTED CRYSTAL BASE • CONCENTRIC WATER RIPPLE
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Interactive Anatomical Telemetry & Allocation Card */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Real Anatomical Hotspot Card */}
            <div className="p-8 rounded-3xl backdrop-blur-3xl bg-gradient-to-b from-white/[0.08] via-slate-950/75 to-[#05080e]/95 border border-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.15)] flex flex-col gap-6 relative overflow-hidden group">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-amber" />
                  <span className="text-xs font-mono tracking-mega text-brand-amber uppercase font-semibold">
                    ANATOMICAL TELEMETRY // {activeHotspot.id.toUpperCase()}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-white/60 uppercase bg-white/10 px-2.5 py-1 rounded-full border border-white/15 backdrop-blur-md">
                  {activeHotspot.metric}
                </span>
              </div>

              {/* Hotspot Visual & Header */}
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 rounded-2xl overflow-hidden border border-white/25 bg-black/80 shrink-0 relative shadow-inner">
                  <img
                    src={activeHotspot.image}
                    alt={activeHotspot.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="flex flex-col">
                  <h3 className="text-xl font-bold text-white uppercase tracking-tight">
                    {activeHotspot.title}
                  </h3>
                  <span className="text-xs font-serif-luxury italic text-brand-amber/90">
                    {activeHotspot.subtitle}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                {activeHotspot.desc}
              </p>

              {/* Hotspot Selector Pills */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
                {REAL_HOTSPOTS.map((spot) => (
                  <button
                    key={spot.id}
                    onClick={() => {
                      setActiveHotspotId(spot.id);
                      if (spot.targetMode) {
                        setViewMode(spot.targetMode as ViewMode);
                      }
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-[10px] font-mono tracking-wider uppercase transition-all ${
                      activeHotspotId === spot.id
                        ? 'bg-gradient-to-r from-brand-amber via-amber-400 to-amber-500 text-black font-extrabold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                        : 'bg-white/[0.05] hover:bg-white/[0.1] text-white/60 hover:text-white border border-white/10'
                    }`}
                  >
                    {spot.title.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Allocation Card */}
            <div className="p-8 rounded-3xl backdrop-blur-3xl bg-gradient-to-b from-white/[0.08] via-slate-950/75 to-[#05080e]/95 border border-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.15)] flex flex-col gap-6 relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-extrabold text-white uppercase tracking-tight">
                    BOTVOR CLASSIC
                  </h3>
                  <span className="text-xs font-mono text-white/50">
                    500 ML • ALPINE GRAIAN SPRING RUN • pH 7.85
                  </span>
                </div>
                <span className="text-3xl font-mono font-extrabold text-brand-amber">
                  $8.50
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono border-t border-white/10 pt-4">
                <div className="p-3.5 rounded-xl bg-white/[0.05] border border-white/10 backdrop-blur-md">
                  <span className="text-white/40 block text-[10px]">VESSEL MATERIAL</span>
                  <strong className="text-white">100% Flint Crystal</strong>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.05] border border-white/10 backdrop-blur-md">
                  <span className="text-white/40 block text-[10px]">CAP CLOSURE</span>
                  <strong className="text-brand-amber">Anodized Royal Blue</strong>
                </div>
              </div>

              <button
                onClick={() => {
                  setAllocationSuccess(true);
                  setTimeout(() => setAllocationSuccess(false), 3000);
                }}
                className={`w-full py-4 rounded-full font-extrabold tracking-widest text-xs uppercase transition-all duration-500 flex items-center justify-center gap-2 shadow-2xl ${
                  allocationSuccess
                    ? 'bg-green-500 text-black shadow-green-500/50 scale-[1.02]'
                    : 'bg-gradient-to-r from-white via-amber-100 to-brand-amber hover:from-brand-amber hover:to-amber-400 text-black shadow-[0_10px_30px_rgba(212,175,55,0.3)] hover:scale-[1.02]'
                }`}
              >
                {allocationSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>ALLOCATION CONFIRMED</span>
                  </>
                ) : (
                  <>
                    <span>REQUEST BOTVOR ALLOCATION</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Master CAD Blueprint Modal */}
      {blueprintModalOpen && (
        <div
          className="fixed inset-0 z-[2000] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8 animate-fade-in"
          onClick={() => setBlueprintModalOpen(false)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[92vh] rounded-3xl overflow-hidden glass-panel border border-white/20 shadow-2xl flex flex-col p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center pb-4 border-b border-white/10">
              <div className="flex flex-col">
                <span className="text-xs font-mono tracking-mega text-brand-amber uppercase">
                  OFFICIAL CAD MASTER BLUEPRINT // BOTVOR VITAL ELIXIR
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white uppercase mt-1">
                  Orthographic Turntable & Industrial Engineering Sheet
                </h3>
              </div>
              <button
                onClick={() => setBlueprintModalOpen(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Blueprint Drawing Viewport */}
            <div className="my-4 rounded-2xl overflow-hidden bg-black/80 border border-white/10 flex items-center justify-center max-h-[65vh]">
              <img
                src="/images/vessel/botvor_design_sheet.jpg"
                alt="BOTVOR CAD Master Blueprint"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Blueprint Telemetry Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] font-mono border-t border-white/10 pt-4 text-white/60">
              <div>
                <span className="text-white/40 block">HEIGHT / DIAMETER</span>
                <strong className="text-white">220 mm × 65 mm</strong>
              </div>
              <div>
                <span className="text-white/40 block">VOLUME CAPACITY</span>
                <strong className="text-white">500 ml Pure Run</strong>
              </div>
              <div>
                <span className="text-white/40 block">MATERIAL COMPOSITION</span>
                <strong className="text-white">100% Recyclable Flint Glass</strong>
              </div>
              <div>
                <span className="text-white/40 block">CLOSURE ALLOY</span>
                <strong className="text-brand-amber">Anodized Royal Blue 6061-T6</strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
