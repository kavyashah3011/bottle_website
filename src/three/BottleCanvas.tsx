import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { BottleModel } from './BottleModel';
import { StudioLights } from './StudioLights';
import { Hotspot } from '../types';

interface BottleCanvasProps {
  interactive?: boolean;
  enableOrbit?: boolean;
  edition?: '500ml' | '750ml';
  rotation?: [number, number, number];
  position?: [number, number, number];
  scale?: number;
  hotspots?: Hotspot[];
  activeHotspot?: string | null;
  onSelectHotspot?: (id: string) => void;
  showRipple?: boolean;
  className?: string;
}

export function BottleCanvas({
  interactive = true,
  enableOrbit = false,
  edition = '500ml',
  rotation = [0, 0, 0],
  position = [0, 0, 0],
  scale = 0.75,
  hotspots = [],
  activeHotspot = null,
  onSelectHotspot,
  showRipple = true,
  className = 'w-full h-full'
}: BottleCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<React.ComponentRef<typeof OrbitControls>>(null);
  const [isInView, setIsInView] = useState(true);

  // Viewport intersection observer to pause WebGL render loop when out of view (solves BUG-08)
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: '100px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <Canvas
        camera={{ position: [0, 0.1, 5.6], fov: 38 }}
        frameloop={isInView ? 'always' : 'demand'}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2
        }}
      >
        <Suspense fallback={null}>
          <Environment preset="city" environmentIntensity={0.5} />
          <StudioLights />

          <BottleModel
            rotation={rotation}
            position={position}
            scale={scale}
            interactive={interactive}
            edition={edition}
            showRipple={showRipple}
          />

          {/* 3D Hotspot Markers */}
          {hotspots.map((spot) => {
            const isActive = activeHotspot === spot.id;
            return (
              <group key={spot.id} position={spot.position}>
                <Html center distanceFactor={6}>
                  <button
                    onClick={() => onSelectHotspot && onSelectHotspot(spot.id)}
                    className="group relative flex items-center justify-center p-2 focus:outline-none"
                    aria-label={`Inspect ${spot.title}`}
                  >
                    <span
                      className={`block w-4 h-4 rounded-full border transition-all duration-300 ${
                        isActive
                          ? 'bg-brand-amber border-white scale-125 shadow-[0_0_15px_rgba(212,175,55,0.8)]'
                          : 'bg-black/60 border-white/60 hover:border-brand-amber hover:scale-110'
                      }`}
                    >
                      <span className="block w-1.5 h-1.5 rounded-full bg-white m-auto translate-y-1" />
                    </span>
                    <span
                      className={`absolute left-6 whitespace-nowrap px-2.5 py-1 text-[10px] font-semibold tracking-widest rounded uppercase glass-panel border transition-opacity duration-300 ${
                        isActive ? 'opacity-100 text-brand-amber border-brand-amber/40' : 'opacity-0 group-hover:opacity-100 text-white/80'
                      }`}
                    >
                      {spot.title}
                    </span>
                  </button>
                </Html>
              </group>
            );
          })}

          {enableOrbit && (
            <OrbitControls
              ref={controlsRef}
              enableZoom={false}
              enablePan={false}
              maxPolarAngle={Math.PI / 2 + 0.15}
              minPolarAngle={Math.PI / 3}
              rotateSpeed={0.65}
              autoRotate={!activeHotspot}
              autoRotateSpeed={0.8}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
