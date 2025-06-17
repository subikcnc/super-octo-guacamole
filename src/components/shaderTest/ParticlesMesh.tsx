import { extend, useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import GUI from 'lil-gui';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import fragmentShader from './fragment.glsl';
import vertexShader from './vertex.glsl';
const vShader = vertexShader;
const fShader = fragmentShader;

gsap.registerPlugin(ScrollTrigger);

extend({ OrbitControls });
const ParticlesMesh = () => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  // const { camera, gl, size } = useThree();
  const { size } = useThree();
  const particlesCount = 2700;
  const targetParticlesCount = 2700;

  // Current particles positions
  const particlesPositions = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < positions.length; i++) {
      const i3 = i * 3;
      positions[i3 + 0] = (Math.random() - 0.5) * 10; // X: random left/right
      positions[i3 + 1] = (Math.random() - 0.5) * 0.09; // Y: flat on the plane
      positions[i3 + 2] = (Math.random() - 0.5) * 10; // Z: random forward/back
    }
    return positions;
  }, [particlesCount]);

  // Target particles positions
  const targetPositions = useMemo(() => {
    const positions = new Float32Array(targetParticlesCount * 3);
    const radius = 2;

    for (let i = 0; i < targetParticlesCount; i++) {
      const i3 = i * 3;

      // Sphere (Fibonacci sphere distribution)
      const phi = Math.acos(1 - (2 * (i + 0.5)) / targetParticlesCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions[i3 + 0] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;
    }

    return positions;
  }, [targetParticlesCount]);

  // Adding a GUI using useEffect
  // useEffect(() => {
  //   const gui = new GUI();
  //   if (!materialRef.current) return;

  //   const settings = {
  //     uColor: '#ffaa00', // Initial hex color
  //   };

  //   gui.addColor(settings, 'uColor').onChange((value) => {
  //     materialRef.current!.uniforms.uColor.value.set(value);
  //   });

  //   return () => gui.destroy();
  // }, []);

  // GSAP scroll animation
  useEffect(() => {
    if (!materialRef.current) return;

    gsap.to(materialRef.current.uniforms.uProgress, {
      value: 1,
      scrollTrigger: {
        trigger: '#scroll-container',
        start: 'top top',
        markers: true,
        end: 'bottom bottom',
        scrub: true,
      },
    });

    return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }, []);

  // useFrame((state) => {
  //   if (!materialRef.current) return;

  //   materialRef.current.uniforms.uProgress.value =
  //     Math.sin(state.clock.elapsedTime * 0.5) * 0.5 + 0.5;
  // });

  return (
    <>
      {/* <orbitControls args={[camera, gl.domElement]} /> */}
      <points position={[0, -0.07, 0]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlesPositions, 3]}
          />
          <bufferAttribute
            attach="attributes-aPositionTarget"
            args={[targetPositions, 3]}
          />
        </bufferGeometry>
        {/* <sphereGeometry /> */}
        <shaderMaterial
          ref={materialRef}
          vertexShader={vShader}
          fragmentShader={fShader}
          uniforms={{
            uSize: { value: 0.01 },
            uResolution: { value: new THREE.Vector2(size.width, size.height) },
            uProgress: { value: 0 },
            uColor: { value: new THREE.Color('orange') },
          }}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </>
  );
};

export default ParticlesMesh;
