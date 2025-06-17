'use client';
import { Canvas } from '@react-three/fiber';
import React from 'react';

import PlexusSphere from '@/components/plexusTest/PlexusComponent';
import CameraSetup from '@/components/shaderTest/CameraSetup';
// import ParticlesMesh from '@/components/shaderTest/ParticlesMesh';

const ShaderCanvas = () => {
  return (
    <Canvas>
      <color attach="background" args={['#fff']} />
      <CameraSetup />
      {/* <ParticlesMesh /> */}
      <PlexusSphere />
    </Canvas>
  );
};

export default ShaderCanvas;
