'use client';

import { extend, useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

extend({ OrbitControls });
const FirstMesh = () => {
  //   Retreive the camera
  const { camera, gl } = useThree();

  const cubeRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (cubeRef.current) {
      cubeRef.current.rotation.y += delta; // Rotate the cube
      //   groupRef.current!.rotation.z += delta; // Rotate the group
    }
  });

  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />
      <group ref={groupRef}>
        <mesh position-x={-2}>
          <sphereGeometry />
          <meshBasicMaterial color="orange" />
        </mesh>
        <mesh
          ref={cubeRef}
          rotation-y={Math.PI * 0.25}
          scale={1.5}
          position={[2, 0, 0]}
        >
          <boxGeometry scale={1.5} />
          <meshBasicMaterial color="mediumpurple" />
        </mesh>
      </group>

      <mesh position-y={-1.5} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshBasicMaterial color="greenyellow" />
      </mesh>
    </>
  );
};

export default FirstMesh;
