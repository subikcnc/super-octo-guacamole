'use client';
import { Canvas } from '@react-three/fiber';
import React from 'react';

import FirstMesh from '@/components/firstMesh/firstMesh';

const FirstCanvas = () => {
  return (
    <Canvas>
      <FirstMesh />
    </Canvas>
  );
};

export default FirstCanvas;
