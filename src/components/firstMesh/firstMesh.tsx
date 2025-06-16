'use client';

import { extend, useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import CustomObject from '@/components/firstMesh/CustomObject';

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
      {/* The default light comes from straight above */}
      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />
      <group ref={groupRef}>
        <mesh position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>
        <mesh
          ref={cubeRef}
          rotation-y={Math.PI * 0.25}
          scale={1.5}
          position={[2, 0, 0]}
        >
          <boxGeometry scale={1.5} />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>
      </group>

      <mesh position-y={-1.5} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
      <CustomObject />
    </>
  );
};

export default FirstMesh;

/* 
Creating a custom geometry 

Create a mesh with its geometry composed of random triangles,
Process in native jS
1. Create a Float32Array
2. Put a bunch of values in it
3. Create a BufferAttribute out of this Float32Array
4. Add it to the attributes of the BufferGeometry
*/
