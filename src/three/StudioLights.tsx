import { useRef } from 'react';
import * as THREE from 'three';

export function StudioLights() {
  const spotRef = useRef<THREE.SpotLight>(null);

  return (
    <>
      {/* Ambient base */}
      <ambientLight intensity={0.4} color="#e0f2fe" />

      {/* Main Overhead Studio Spotlight (Frame 026) */}
      <spotLight
        ref={spotRef}
        position={[0, 8, 2]}
        angle={0.4}
        penumbra={0.8}
        intensity={2.5}
        color="#ffffff"
        castShadow
        shadow-bias={-0.0001}
      />

      {/* Golden Hour / Amber Rim Light (Right Flank) */}
      <directionalLight
        position={[4, 2, -3]}
        intensity={1.8}
        color="#F5C77E"
      />

      {/* Skyline Blue Architectural Rim Light (Left Flank) */}
      <directionalLight
        position={[-4, 1, -2]}
        intensity={1.5}
        color="#38BDF8"
      />

      {/* Subtle bottom bounce from marble pedestal */}
      <directionalLight
        position={[0, -4, 2]}
        intensity={0.4}
        color="#94a3b8"
      />
    </>
  );
}
