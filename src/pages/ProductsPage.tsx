import { useState, useRef } from 'react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { ShoppingBag, ArrowUpRight, Check, X, RotateCw, Sparkles, Compass } from 'lucide-react';

const TURNTABLE_ANGLES = [
  '/images/vessel/botvor_angle_0.png',
  '/images/vessel/botvor_angle_1.png',
  '/images/vessel/botvor_angle_2.png',
  '/images/vessel/botvor_angle_3.png',
  '/images/vessel/botvor_angle_4.png',
  '/images/vessel/botvor_angle_5.png',
  '/images/vessel/botvor_angle_6.png',
  '/images/vessel/botvor_angle_7.png',
];

const DEGREE_LABELS = ['0° FRONT', '45° ANGLE', '90° PROFILE', '135° REAR', '180° BACK', '225° REAR', '270° PROFILE', '315° ANGLE'];

interface ProductsPageProps {
  onAddToCart: (productId: string) => void;
}

export function ProductsPage({ onAddToCart }: ProductsPageProps) {
  const [filter, setFilter] = useState<'all' | 'still' | 'sparkling' | 'reserve'>('all');
  const [inspectProduct, setInspectProduct] = useState<Product | null>(null);
  const [inspectAngleIndex, setInspectAngleIndex] = useState<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const dragStartXRef = useRef<number>(0);
  const startAngleIndexRef = useRef<number>(0);

  const filteredProducts = PRODUCTS.filter((p) => {
    if (filter === 'still') return p.edition.toLowerCase().includes('endurance') || p.edition.toLowerCase().includes('boardroom');
    if (filter === 'sparkling') return p.edition.toLowerCase().includes('effervescent');
    if (filter === 'reserve') return p.edition.toLowerCase().includes('reserve');
    return true;
  });

  return (
    <div className="pt-28 pb-24 bg-brand-dark min-h-screen text-white">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-16 flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <span className="w-8 h-px bg-brand-amber" />
          <span className="text-xs font-mono tracking-mega text-brand-amber uppercase">
            // VESSEL COLLECTION
          </span>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
          <div className="flex flex-col gap-3 max-w-2xl">
            <h1 className="text-4xl sm:text-7xl font-extrabold tracking-tight uppercase leading-[1.05]">
              FLINT GLASS<br />
              <span className="text-stroke-subtle font-light">ARCHITECTURAL</span> EDITIONS.
            </h1>
            <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed">
              Every edition is created from recyclable crystalline flint glass, capped with aerospace-grade anodized aluminum to guarantee chemical inertness.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-full bg-white/5 border border-white/15">
            {[
              { key: 'all', label: 'ALL EDITIONS' },
              { key: 'still', label: 'STILL MINERAL' },
              { key: 'sparkling', label: 'SPARKLING' },
              { key: 'reserve', label: 'RESERVE' },
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key as any)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all ${
                  filter === f.key
                    ? 'bg-brand-amber text-black font-bold shadow-lg'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Cards Grid */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="p-8 rounded-3xl glass-panel border border-white/10 hover:border-brand-amber/40 transition-all duration-300 flex flex-col justify-between gap-8 group"
            >
              {/* Card Top */}
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono tracking-mega text-brand-amber uppercase">
                    {prod.edition}
                  </span>
                  <h3 className="text-2xl font-extrabold text-white uppercase tracking-tight">
                    {prod.name}
                  </h3>
                  <span className="text-xs font-serif-luxury text-white/50 italic">
                    {prod.tagline}
                  </span>
                </div>

                <span className="text-2xl font-mono font-extrabold text-brand-amber">
                  {prod.price}
                </span>
              </div>

              {/* Authentic BOTVOR Bottle Viewport */}
              <div className="relative h-64 w-full rounded-2xl bg-gradient-to-b from-white/5 to-black/60 border border-white/5 flex items-center justify-center overflow-hidden group/bottle">
                {/* Radial spotlight behind bottle */}
                <div className="absolute inset-0 bg-radial from-brand-aqua/10 via-transparent to-transparent opacity-50 group-hover/bottle:opacity-80 transition-opacity" />
                
                {/* Authentic Bottle Image */}
                <img
                  src="/images/vessel/botvor_angle_0.png"
                  alt={prod.name}
                  className="relative z-10 h-48 w-auto object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.9)] transform group-hover/bottle:scale-105 transition-transform duration-500"
                />

                {/* Soft base reflection */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-6 bg-brand-aqua/15 rounded-full blur-md pointer-events-none" />

                <button
                  onClick={() => {
                    setInspectProduct(prod);
                    setInspectAngleIndex(0);
                  }}
                  className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-white/10 hover:bg-brand-amber hover:text-black backdrop-blur-md text-[10px] font-mono tracking-widest text-white/80 uppercase flex items-center gap-1.5 transition-all shadow-lg z-20"
                >
                  <RotateCw className="w-3 h-3" />
                  <span>360° INSPECT</span>
                </button>
              </div>

              {/* Specifications List */}
              <div className="flex flex-col gap-3 text-xs border-t border-white/10 pt-4">
                <p className="text-white/60 font-light leading-relaxed">
                  {prod.description}
                </p>

                <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] font-mono">
                  <span className="text-white/40">VOLUME: <strong className="text-white">{prod.volume}</strong></span>
                  <span className="text-white/40">ALKALINITY: <strong className="text-white">pH {prod.ph}</strong></span>
                  <span className="text-white/40">TDS: <strong className="text-white">{prod.tds} MG/L</strong></span>
                  <span className="text-white/40">ORIGIN: <strong className="text-white">2,840M ALPS</strong></span>
                </div>
              </div>

              {/* Card Actions */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => onAddToCart(prod.id)}
                  className="flex-1 py-3.5 rounded-full bg-brand-amber text-black font-extrabold tracking-widest text-xs uppercase hover:bg-white transition-colors duration-300 flex items-center justify-center gap-2 shadow-xl"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>REQUEST ALLOCATION ({prod.price})</span>
                </button>

                <button
                  onClick={() => setInspectProduct(prod)}
                  className="p-3.5 rounded-full border border-white/20 hover:border-brand-amber text-white transition-colors"
                  aria-label="Inspect in 3D"
                >
                  <ArrowUpRight className="w-4 h-4 text-brand-amber" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Authentic BOTVOR 360° Inspection Modal */}
      {inspectProduct && (
        <div className="fixed inset-0 z-[2000] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 animate-fade-in">
          <div className="relative w-full max-w-4xl min-h-[580px] rounded-3xl overflow-hidden glass-panel border border-white/20 shadow-2xl flex flex-col justify-between p-6 sm:p-8">
            {/* Top Bar */}
            <div className="flex justify-between items-start z-20">
              <div className="flex flex-col">
                <span className="text-xs font-mono tracking-mega text-brand-amber uppercase flex items-center gap-2">
                  <Compass className="w-3.5 h-3.5" />
                  CAD ORTHOGRAPHIC 360° INSPECTOR
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight mt-1">{inspectProduct.name}</h3>
                <span className="text-xs font-mono text-white/60">
                  {inspectProduct.volume} • {inspectProduct.specs.material} • 220MM × 65MM
                </span>
              </div>
              <button
                onClick={() => setInspectProduct(null)}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Interactive 360 Viewport Area */}
            <div
              className="relative my-auto w-full h-[360px] sm:h-[400px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
              onPointerDown={(e) => {
                isDraggingRef.current = true;
                dragStartXRef.current = e.clientX;
                startAngleIndexRef.current = inspectAngleIndex;
                (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
              }}
              onPointerMove={(e) => {
                if (!isDraggingRef.current) return;
                const deltaX = e.clientX - dragStartXRef.current;
                const angleSteps = Math.floor(deltaX / 30);
                const newIndex = ((startAngleIndexRef.current + angleSteps) % 8 + 8) % 8;
                setInspectAngleIndex(newIndex);
              }}
              onPointerUp={(e) => {
                isDraggingRef.current = false;
                try {
                  (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
                } catch {}
              }}
            >
              {/* Studio spotlight */}
              <div className="absolute inset-0 bg-radial from-brand-aqua/15 via-transparent to-transparent pointer-events-none" />

              {/* Concentric ripple rings */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-64 h-16 rounded-full border border-white/10 pointer-events-none animate-pulse" />
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-40 h-10 rounded-full border border-brand-amber/30 pointer-events-none" />

              {/* Current Angle Bottle Image */}
              <img
                key={inspectAngleIndex}
                src={TURNTABLE_ANGLES[inspectAngleIndex]}
                alt={`BOTVOR ${DEGREE_LABELS[inspectAngleIndex]}`}
                className="relative z-10 h-full max-h-[320px] sm:max-h-[360px] w-auto object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.95)]"
                draggable={false}
              />

              {/* Pedestal reflection */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-40 h-16 opacity-20 blur-[2px] overflow-hidden pointer-events-none">
                <img
                  src={TURNTABLE_ANGLES[inspectAngleIndex]}
                  alt=""
                  className="w-full h-full object-contain transform -scale-y-100"
                />
              </div>

              {/* Angle overlay HUD */}
              <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/60 border border-white/15 text-[11px] font-mono text-brand-amber pointer-events-none flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-amber animate-ping" />
                <span>{DEGREE_LABELS[inspectAngleIndex]}</span>
              </div>
            </div>

            {/* Quick Angle Selector & Drag Instructions */}
            <div className="flex flex-col gap-4 z-20">
              <div className="flex items-center justify-center gap-2 overflow-x-auto py-1">
                {DEGREE_LABELS.map((label, idx) => (
                  <button
                    key={label}
                    onClick={() => setInspectAngleIndex(idx)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all ${
                      inspectAngleIndex === idx
                        ? 'bg-brand-amber text-black font-bold shadow-md'
                        : 'bg-white/5 hover:bg-white/10 text-white/50 hover:text-white'
                    }`}
                  >
                    {idx * 45}°
                  </button>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-white/60 border-t border-white/10 pt-4">
                <span className="flex items-center gap-2">
                  <RotateCw className="w-3.5 h-3.5 text-brand-amber" />
                  DRAG HORIZONTALLY TO SCRUB 360° ROTATION
                </span>
                <button
                  onClick={() => {
                    onAddToCart(inspectProduct.id);
                    setInspectProduct(null);
                  }}
                  className="w-full sm:w-auto px-8 py-3 rounded-full bg-brand-amber text-black font-extrabold uppercase tracking-wider hover:bg-white transition-colors shadow-lg"
                >
                  ADD TO ALLOCATION ({inspectProduct.price})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
