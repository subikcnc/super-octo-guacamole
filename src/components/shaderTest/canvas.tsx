'use client';
import { Canvas } from '@react-three/fiber';
import React from 'react';

import ParticlesMesh from '@/components/shaderTest/ParticlesMesh';

const ShaderCanvas = () => {
  return (
    <Canvas>
      {/* <color attach="background" args={['#160920']} /> */}
      <ParticlesMesh />
    </Canvas>
  );
};

export default ShaderCanvas;
