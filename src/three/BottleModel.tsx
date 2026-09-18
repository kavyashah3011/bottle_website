import React, { useMemo, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { createBottleLabelTexture } from './BottleTexture';

interface BottleModelProps {
  rotation?: [number, number, number];
  position?: [number, number, number];
  scale?: number;
  interactive?: boolean;
  edition?: '500ml' | '750ml';
  showRipple?: boolean;
}

export function BottleModel({
  rotation = [0, 0, 0],
  position = [0, 0, 0],
  scale = 1,
  interactive = true,
  edition = '500ml',
  showRipple = true,
}: BottleModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const bottleInnerRef = useRef<THREE.Group>(null);
  const bubblesRef = useRef<THREE.Points>(null);
  const rippleRef = useRef<THREE.Mesh>(null);

  // Height scale for 750ml vs 500ml
  const heightMultiplier = edition === '750ml' ? 1.18 : 1.0;

  // 1. Procedural Glass Profile (LatheGeometry - 36 segments)
  const glassGeometry = useMemo(() => {
    const points: THREE.Vector2[] = [];
    const hm = heightMultiplier;

    // Center bottom inner
    points.push(new THREE.Vector2(0, -1.6 * hm));
    // Flat bottom base
    points.push(new THREE.Vector2(0.68, -1.6 * hm));
    // Base bevel corner
    points.push(new THREE.Vector2(0.75, -1.52 * hm));
    // Lower body cylinder
    points.push(new THREE.Vector2(0.74, -0.4 * hm));
    // Ergonomic waist taper
    points.push(new THREE.Vector2(0.66, 0.25 * hm));
    // Shoulder flare
    points.push(new THREE.Vector2(0.74, 0.95 * hm));
    // Shoulder curve in
    points.push(new THREE.Vector2(0.65, 1.25 * hm));
    // Neck base
    points.push(new THREE.Vector2(0.36, 1.45 * hm));
    // Neck cylinder
    points.push(new THREE.Vector2(0.34, 1.76 * hm));
    // Thread ring
    points.push(new THREE.Vector2(0.38, 1.80 * hm));
    // Top lip
    points.push(new THREE.Vector2(0.32, 1.84 * hm));
    // Inner lip thickness
    points.push(new THREE.Vector2(0.26, 1.84 * hm));
    points.push(new THREE.Vector2(0.26, 1.45 * hm));
    // Inner glass wall
    points.push(new THREE.Vector2(0.56, 1.20 * hm));
    points.push(new THREE.Vector2(0.58, 0.25 * hm));
    points.push(new THREE.Vector2(0.65, -0.4 * hm));
    points.push(new THREE.Vector2(0.65, -1.45 * hm));
    // Solid thick bottom floor
    points.push(new THREE.Vector2(0, -1.45 * hm));

    return new THREE.LatheGeometry(points, 36);
  }, [heightMultiplier]);

  // 2. Procedural Water Geometry
  const waterGeometry = useMemo(() => {
    const points: THREE.Vector2[] = [];
    const hm = heightMultiplier;
    points.push(new THREE.Vector2(0, -1.44 * hm));
    points.push(new THREE.Vector2(0.64, -1.44 * hm));
    points.push(new THREE.Vector2(0.64, -0.4 * hm));
    points.push(new THREE.Vector2(0.57, 0.25 * hm));
    points.push(new THREE.Vector2(0.64, 0.95 * hm));
    points.push(new THREE.Vector2(0.54, 1.20 * hm));
    points.push(new THREE.Vector2(0, 1.20 * hm));

    return new THREE.LatheGeometry(points, 36);
  }, [heightMultiplier]);

  // 3. Label Mesh & Texture
  const labelTexture = useMemo(() => createBottleLabelTexture(), []);

  // 4. Floating Micro-bubbles
  const bubbleCount = 45;
  const bubblePositions = useMemo(() => {
    const pos = new Float32Array(bubbleCount * 3);
    for (let i = 0; i < bubbleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 0.45;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = (Math.random() * 2.4 - 1.2) * heightMultiplier;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return pos;
  }, [heightMultiplier]);

  // 5. Materials
  const glassMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      roughness: 0.04,
      transmission: 0.96,
      thickness: 1.1,
      ior: 1.52,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
      transparent: true,
      opacity: 1.0,
      color: new THREE.Color('#ffffff'),
      attenuationColor: new THREE.Color('#dbeafe'),
      attenuationDistance: 1.8,
    });
  }, []);

  const waterMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      roughness: 0.02,
      transmission: 0.88,
      ior: 1.333,
      color: new THREE.Color('#e0f2fe'),
      transparent: true,
      opacity: 0.9,
    });
  }, []);

  const capMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#161B22'), // Deep matte graphite
      metalness: 0.88,
      roughness: 0.28,
    });
  }, []);

  const capBandMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#2A313C'),
      metalness: 0.92,
      roughness: 0.35,
    });
  }, []);

  const labelMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      map: labelTexture,
      transparent: true,
      opacity: 0.95,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
  }, [labelTexture]);

  // Comprehensive WebGL resource disposal on unmount (solves BUG-03)
  useEffect(() => {
    return () => {
      glassGeometry.dispose();
      waterGeometry.dispose();
      glassMaterial.dispose();
      waterMaterial.dispose();
      capMaterial.dispose();
      capBandMaterial.dispose();
      labelMaterial.dispose();
    };
  }, [
    glassGeometry,
    waterGeometry,
    glassMaterial,
    waterMaterial,
    capMaterial,
    capBandMaterial,
    labelMaterial,
  ]);

  // Frame Loop Animation
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Subtle gentle floating if idle
    if (interactive) {
      const t = state.clock.getElapsedTime();
      bottleInnerRef.current!.position.y = Math.sin(t * 1.2) * 0.04;
      
      // Floating rising micro-bubbles
      if (bubblesRef.current) {
        const positions = bubblesRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < bubbleCount; i++) {
          positions[i * 3 + 1] += delta * 0.15;
          if (positions[i * 3 + 1] > 1.2 * heightMultiplier) {
            positions[i * 3 + 1] = -1.4 * heightMultiplier;
          }
        }
        bubblesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      // Expanding water ripple on floor (frame 028)
      if (rippleRef.current && showRipple) {
        const rippleScale = (t * 0.4) % 1.5 + 0.6;
        rippleRef.current.scale.set(rippleScale, rippleScale, 1);
        const mat = rippleRef.current.material as THREE.MeshBasicMaterial;
        mat.opacity = Math.max(0, 0.4 - (rippleScale - 0.6) * 0.35);
      }
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <group ref={bottleInnerRef}>
        {/* Glass Body */}
        <mesh geometry={glassGeometry} material={glassMaterial} castShadow receiveShadow />

        {/* Water Volume Inside */}
        <mesh geometry={waterGeometry} material={waterMaterial} position={[0, -0.01, 0]} />

        {/* Label Curved Mesh facing camera */}
        <mesh position={[0, 0.2 * heightMultiplier, 0]} material={labelMaterial}>
          <cylinderGeometry
            args={[
              0.675, // top radius matching waist
              0.748, // bottom radius
              1.65 * heightMultiplier, // height
              48,
              1,
              true,
              Math.PI * 0.2,
              Math.PI * 0.6
            ]}
          />
        </mesh>

        {/* Floating Bubble Particles */}
        <points ref={bubblesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[bubblePositions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.022}
            color="#ffffff"
            transparent
            opacity={0.65}
            blending={THREE.AdditiveBlending}
          />
        </points>

        {/* Bottle Cap */}
        <group position={[0, (1.80 + 0.1) * heightMultiplier, 0]}>
          {/* Main Cap Cylinder */}
          <mesh material={capMaterial} castShadow>
            <cylinderGeometry args={[0.36, 0.36, 0.22 * heightMultiplier, 32]} />
          </mesh>
          {/* Knurled Detail Bands */}
          <mesh material={capBandMaterial} position={[0, 0.05 * heightMultiplier, 0]}>
            <cylinderGeometry args={[0.365, 0.365, 0.04 * heightMultiplier, 32]} />
          </mesh>
          <mesh material={capBandMaterial} position={[0, -0.05 * heightMultiplier, 0]}>
            <cylinderGeometry args={[0.365, 0.365, 0.04 * heightMultiplier, 32]} />
          </mesh>
        </group>
      </group>

      {/* Ripple on ground plane (Frame 028) */}
      {showRipple && (
        <mesh
          ref={rippleRef}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -1.61 * heightMultiplier, 0]}
        >
          <ringGeometry args={[0.75, 0.78, 48]} />
          <meshBasicMaterial
            color="#38BDF8"
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
}
