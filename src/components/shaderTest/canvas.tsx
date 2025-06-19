'use client';
import { Canvas } from '@react-three/fiber';
import React from 'react';

import PlexusSphere from '@/components/plexusTest/PlexusComponent';
import CameraSetup from '@/components/shaderTest/CameraSetup';
// import ParticlesMesh from '@/components/shaderTest/ParticlesMesh';
interface Props {
  scrollProgress: number;
  particlesCount: number;
}

const ShaderCanvas = ({ particlesCount, scrollProgress }: Props) => {
  return (
    <Canvas>
      <color attach="background" args={['#fff']} />
      <CameraSetup />
      {/* <ParticlesMesh /> */}
      <PlexusSphere
        scrollProgress={scrollProgress}
        particlesCount={particlesCount}
      />
    </Canvas>
  );
};

export default ShaderCanvas;
