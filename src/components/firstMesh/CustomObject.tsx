import { useMemo } from 'react';
import * as THREE from 'three';

const CustomObject = () => {
  const verticesCount = 10 * 3; // 10 triangles with 3 vertices per triangle
  const positions = useMemo(() => {
    const positions = new Float32Array(verticesCount * 3);
    for (let i = 0; i < verticesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 3;
    }
    return positions;
  }, [verticesCount]); // 3 values per vertex

  return (
    <mesh>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <meshBasicMaterial color="red" side={THREE.DoubleSide} />
    </mesh>
  );
};

export default CustomObject;
