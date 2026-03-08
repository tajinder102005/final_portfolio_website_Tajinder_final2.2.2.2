/**
 * 3D Globe for Contact section using React Three Fiber + Drei.
 * Inspired by react-bits style: soft dark sphere with orbital arcs.
 */
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Line } from "@react-three/drei";

function createOrbit(radius, tilt = 0) {
  const points = [];
  const segments = 64;
  for (let i = 0; i <= segments; i += 1) {
    const theta = (i / segments) * Math.PI * 2;
    const x = Math.cos(theta) * radius;
    const y = Math.sin(theta) * radius * Math.cos(tilt);
    const z = Math.sin(theta) * radius * Math.sin(tilt);
    points.push([x, y, z]);
  }
  return points;
}

function GlobeMesh() {
  const globeRef = useRef(null);

  useFrame((_, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.12;
    }
  });

  const orbitColor = "#00ff88";

  return (
    <group ref={globeRef}>
      <Sphere args={[1.6, 64, 64]}>
        <meshStandardMaterial
          color="#050908"
          emissive={orbitColor}
          emissiveIntensity={0.15}
          roughness={0.6}
          metalness={0.2}
        />
      </Sphere>

      <Line points={createOrbit(2.1, 0.3)} color={orbitColor} lineWidth={1} transparent opacity={0.6} />
      <Line points={createOrbit(2.1, -0.4)} color={orbitColor} lineWidth={1} transparent opacity={0.6} />
      <Line points={createOrbit(2.1, 0.9)} color={orbitColor} lineWidth={1} transparent opacity={0.4} />
    </group>
  );
}

export default GlobeMesh;
