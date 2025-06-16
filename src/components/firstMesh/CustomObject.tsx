import React from 'react';

const CustomObject = () => {
  const verticesCount = 10 * 3; // 10 triangles with 3 vertices per triangle
  const positions = new Float32Array(verticesCount * 3); // 3 values per vertex

  for (let i = 0; i < verticesCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 3;
  }
  return (
    <mesh>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <meshBasicMaterial color="red" />
    </mesh>
  );
};

export default CustomObject;
