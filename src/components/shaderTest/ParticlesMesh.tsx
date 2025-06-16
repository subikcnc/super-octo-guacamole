import { extend, useThree } from '@react-three/fiber';
import { useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import fragmentShader from './fragment.glsl';
import vertexShader from './vertex.glsl';
const vShader = vertexShader;
const fShader = fragmentShader;

extend({ OrbitControls });
const ParticlesMesh = () => {
  const { camera, gl, size } = useThree();
  const particlesCount = 2700;
  const particlesPositions = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < positions.length; i++) {
      const i3 = i * 3;
      positions[i3 + 0] = (Math.random() - 0.5) * 10; // X: random left/right
      positions[i3 + 1] = (Math.random() - 0.5) * 0.5; // Y: flat on the plane
      positions[i3 + 2] = (Math.random() - 0.5) * 10; // Z: random forward/back
    }
    return positions;
  }, [particlesCount]);

  // useFrame((state, delta) => {});

  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlesPositions, 3]}
          />
        </bufferGeometry>
        {/* <sphereGeometry /> */}
        <shaderMaterial
          vertexShader={vShader}
          fragmentShader={fShader}
          uniforms={{
            uSize: { value: 0.01 },
            uResolution: { value: new THREE.Vector2(size.width, size.height) },
            uProgress: { value: 0 },
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
