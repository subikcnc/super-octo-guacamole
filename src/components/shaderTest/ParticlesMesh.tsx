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
    const arr = new Float32Array(particlesCount * 3);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = (Math.random() - 0.5) * 3;
    }
    return arr;
  }, [particlesCount]);

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
        <shaderMaterial
          vertexShader={vShader}
          fragmentShader={fShader}
          uniforms={{
            uSize: { value: 0.2 },
            uResolution: { value: new THREE.Vector2(size.width, size.height) },
            uProgress: { value: 0 },
          }}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </>
  );
};

export default ParticlesMesh;
