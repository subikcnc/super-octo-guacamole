// src/PlexusSphere.tsx
import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
// NEW: Import useTexture from drei
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

interface Props {
  scrollProgress: number;
}
interface ParticleData {
  initial: THREE.Vector3;
  sphere: THREE.Vector3;
  current: THREE.Vector3;
}

// NEW: A Data URI for a simple circle texture. No need for an external file.
const circleDataUri =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTEiIGZpbGw9IiNmZmYiLz48L3N2Zz4=';

const PlexusSphere = ({ scrollProgress }: Props) => {
  // --- CONFIGURATION ---
  const PARTICLE_COUNT = 500;
  const PLEXUS_THRESHOLD = 0.5;
  const SPHERE_RADIUS = 2.7;
  // NEW: Define a darker color for contrast on the white background
  const PARTICLE_COLOR = 'rgb(98,0,2)';
  const PARTICLE_OPACITY = 0.9;

  // --- REFS & STATE ---
  const particleGeoRef = useRef<THREE.BufferGeometry>(null);
  const lineGeoRef = useRef<THREE.BufferGeometry>(null);
  const particlesData = useRef<ParticleData[]>([]);
  // const [scrollPercent] = useState<number>(0);

  // NEW: Load the circle texture
  const circleTexture = useTexture(circleDataUri);

  // --- INITIALIZATION ---
  useMemo(() => {
    particlesData.current = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const initialPos = new THREE.Vector3(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 0.4,
        (Math.random() - 0.5) * 8
      );
      const phi = Math.acos(-1 + (2 * i) / PARTICLE_COUNT);
      const theta = Math.sqrt(PARTICLE_COUNT * Math.PI) * phi;
      const spherePos = new THREE.Vector3().setFromSphericalCoords(
        SPHERE_RADIUS,
        phi,
        theta
      );
      particlesData.current.push({
        initial: initialPos,
        sphere: spherePos,
        current: initialPos.clone(),
      });
    }
  }, [PARTICLE_COUNT, SPHERE_RADIUS]);

  const { particlePositions, linePositions, lineColors } = useMemo(() => {
    const particlePositions = new Float32Array(PARTICLE_COUNT * 3);
    const maxConnections = PARTICLE_COUNT * 10;
    const linePositions = new Float32Array(maxConnections * 3 * 2);
    const lineColors = new Float32Array(maxConnections * 3 * 2);
    return { particlePositions, linePositions, lineColors };
  }, [PARTICLE_COUNT]);

  // --- SCROLL LISTENER ---
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollableHeight =
  //       document.documentElement.scrollHeight - window.innerHeight;
  //     const newScrollPercent = window.scrollY / scrollableHeight;
  //     setScrollPercent(Math.max(0, Math.min(1, newScrollPercent)));
  //   };
  //   // window.addEventListener('scroll', handleScroll, { passive: true });
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  // useEffect(() => {
  //   gsap.registerPlugin(ScrollTrigger);

  //   ScrollTrigger.create({
  //     trigger: '#particles-canvas',
  //     start: 'top top',
  //     end: '+=100%',
  //     pin: true,
  //     scrub: true,
  //     markers: true,
  //     onUpdate: (self) => {
  //       setScrollProgress(self.progress); // value from 0 to 1
  //     },
  //   });
  // }, []);

  // --- ANIMATION LOOP ---
  useFrame((state) => {
    const { clock } = state;
    let lineVertexIndex = 0;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = particlesData.current[i];
      const targetPos = new THREE.Vector3().lerpVectors(
        p.initial,
        p.sphere,
        // scrollPercent
        scrollProgress
      );
      const time = clock.elapsedTime;
      targetPos.add(
        new THREE.Vector3(
          Math.sin(time * 0.5 + i) * 0.1,
          Math.cos(time * 0.3 + i * 2) * 0.1,
          Math.sin(time * 0.2 + i * 3) * 0.09
        )
      );
      p.current.lerp(targetPos, 0.1);
      particlePositions.set([p.current.x, p.current.y, p.current.z], i * 3);
    }

    // NEW: Use the new dark color for the lines
    const color = new THREE.Color(PARTICLE_COLOR);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const p1 = particlesData.current[i].current;
        const p2 = particlesData.current[j].current;
        const dist = p1.distanceTo(p2);

        if (dist < PLEXUS_THRESHOLD) {
          linePositions.set([p1.x, p1.y, p1.z], lineVertexIndex * 3);
          lineColors.set([color.r, color.g, color.b], lineVertexIndex * 3);
          lineVertexIndex++;
          linePositions.set([p2.x, p2.y, p2.z], lineVertexIndex * 3);
          lineColors.set([color.r, color.g, color.b], lineVertexIndex * 3);
          lineVertexIndex++;
        }
      }
    }

    if (particleGeoRef.current && lineGeoRef.current) {
      particleGeoRef.current.attributes.position.needsUpdate = true;
      lineGeoRef.current.attributes.position.needsUpdate = true;
      lineGeoRef.current.attributes.color.needsUpdate = true;
      lineGeoRef.current.setDrawRange(0, lineVertexIndex);
    }
  });

  // --- RENDER ---
  return (
    <group position={[0, -0.1, 0]}>
      {/* NEW: Set the scene's background color to white */}
      {/* <color attach="background" args={['#ffffff']} /> */}

      {/* The particles */}
      <points>
        <bufferGeometry ref={particleGeoRef}>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          // NEW: Change color, size, and blending. Add the map.
          color={PARTICLE_COLOR}
          opacity={PARTICLE_OPACITY}
          size={0.05}
          transparent
          blending={THREE.NormalBlending}
          depthWrite={false}
          map={circleTexture}
        />
      </points>

      {/* The plexus lines */}
      <lineSegments>
        <bufferGeometry ref={lineGeoRef}>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
          <bufferAttribute attach="attributes-color" args={[lineColors, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          // NEW: Change blending and opacity
          vertexColors
          blending={THREE.NormalBlending}
          transparent
          opacity={0.1}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
};

export default PlexusSphere;
