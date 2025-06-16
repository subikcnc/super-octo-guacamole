'use client';
import { Canvas } from '@react-three/fiber';

const FirstMesh = () => {
  return (
    <Canvas>
      <mesh rotation-y={Math.PI * 0.5} scale={1.5} position={[2, 0, 0]}>
        {/* <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial args={[{ color: 'red', wireframe: true }]} /> */}
        {/* <sphereGeometry args={[1.5, 32, 32]} /> */}
        <boxGeometry />
        <meshBasicMaterial color="mediumpurple" wireframe />
      </mesh>
    </Canvas>
  );
};

export default FirstMesh;
