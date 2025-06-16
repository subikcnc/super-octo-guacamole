// 'use client';
// import { OrbitControls, useGLTF, useHelper } from '@react-three/drei';
// import { Canvas, useFrame, useThree } from '@react-three/fiber';
// import gsap from 'gsap';
// import { GUI } from 'lil-gui';
// import {
//   forwardRef,
//   useEffect,
//   useImperativeHandle,
//   useMemo,
//   useRef,
//   useState,
// } from 'react';
// import * as THREE from 'three';

// type ParticlesHandle = {
//   setProgress: (val: number) => void;
// };

// // import particlesFragmentShader from './shaders/vertex.glsl';
// // import particlesVertexShader from './shaders/vertex.glsl';

// // const vertexShader = particlesVertexShader;
// // const fragmentShader = particlesFragmentShader;

// const Particles = forwardRef((props, ref) => {
//   const pointsRef = useRef<THREE.Points>(null);
//   const materialRef = useRef<THREE.ShaderMaterial>(null);
//   const { size, viewport } = useThree();
//   const [progress, setProgress] = useState(0);

//   const count = 2700;
//   const targetCount = 800;
//   const targetRadius = 5;

//   const positions = useMemo(
//     () => new Float32Array(count * 3).map(() => (Math.random() - 0.5) * 10),
//     []
//   );

//   const targetPositions = useMemo(() => {
//     const arr = new Float32Array(targetCount * 3);
//     for (let i = 0; i < targetCount; i++) {
//       const phi = Math.acos(1 - (2 * (i + 0.5)) / targetCount);
//       const theta = Math.PI * (1 + Math.sqrt(5)) * i;
//       const x = targetRadius * Math.sin(phi) * Math.cos(theta);
//       const y = targetRadius * Math.sin(phi) * Math.sin(theta);
//       const z = targetRadius * Math.cos(phi);
//       arr.set([x, y, z], i * 3);
//     }
//     return arr;
//   }, []);

//   const randomDelays = useMemo(
//     () => new Float32Array(count).map(() => Math.random()),
//     []
//   );

//   const geometry = useMemo(() => {
//     const geom = new THREE.BufferGeometry();
//     const aPositionTarget = new Float32Array(count * 3);
//     for (let i = 0; i < count * 3; i++) {
//       aPositionTarget[i] = targetPositions[i % (targetCount * 3)];
//     }
//     geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
//     geom.setAttribute(
//       'aPositionTarget',
//       new THREE.BufferAttribute(aPositionTarget, 3)
//     );
//     geom.setAttribute('aDelay', new THREE.BufferAttribute(randomDelays, 1));
//     return geom;
//   }, [positions, targetPositions, randomDelays]);

//   useImperativeHandle(ref, () => ({
//     setProgress: (val: number) => setProgress(val),
//   }));

//   useFrame(({ clock }) => {
//     if (!pointsRef.current || !materialRef.current) return;
//     pointsRef.current.rotation.y = clock.getElapsedTime() * Math.PI * 0.01;
//     materialRef.current.uniforms.uProgress.value = progress;
//   });

//   return (
//     <points ref={pointsRef} geometry={geometry}>
//       <shaderMaterial
//         ref={materialRef}
//         vertexShader={`uniform vec2 uResolution;
// uniform float uSize;
// uniform float uProgress;

// attribute vec3 aPositionTarget; // Should be points on a sphere
// varying vec3 vColor;

// void main()
// {
//     // Just linear progress from position to aPositionTarget
//     vec3 from = position;
//     vec3 to = normalize(aPositionTarget) * length(aPositionTarget); // ensure sphere shape

//     // Progress eased linearly (or use smoothstep if you want easing)
//     float progress = smoothstep(0.0, 1.0, uProgress);
//     vec3 mixedPosition = mix(from, to, progress);

//     // Transform to clip space
//     vec4 modelPosition = modelMatrix * vec4(mixedPosition, 1.0);
//     vec4 viewPosition = viewMatrix * modelPosition;
//     vec4 projectedPosition = projectionMatrix * viewPosition;
//     gl_Position = projectedPosition;

//     // Point size and color
//     gl_PointSize = uSize * uResolution.y;
//     gl_PointSize *= (1.0 / -viewPosition.z);

//     // Just assign a fixed color or based on position if you want
//     vColor = vec3(1.0); // white color, or use any fixed vec3 value
// }
// `}
//         fragmentShader={`varying vec3 vColor;

// void main()
// {
//     vec2 uv = gl_PointCoord;
//     float distanceToCenter = length(uv - 0.5);
//     float alpha = 0.05 / distanceToCenter - 0.1;

//     gl_FragColor = vec4(1.0, 0.0, 0.0, alpha);
//     // gl_FragColor = vec4(vColor, alpha);
//     #include <tonemapping_fragment>
//     #include <colorspace_fragment>
// }`}
//         uniforms={{
//           uSize: { value: 0.2 },
//           uResolution: { value: new THREE.Vector2(size.width, size.height) },
//           uProgress: { value: 0 },
//         }}
//         transparent
//         blending={THREE.AdditiveBlending}
//         depthWrite={false}
//       />
//     </points>
//   );
// });

// export default function ShaderTestMesh() {
//   const [isSphere, setIsSphere] = useState(false);
//   const particlesRef = useRef<ParticlesHandle>(null);

//   const handleClick = () => {
//     gsap.registerPlugin();
//     gsap.to(particlesRef.current, {
//       progress: isSphere ? 0 : 1,
//       duration: 5,
//       ease: 'linear',
//       onUpdate() {
//         if (particlesRef.current) {
//           particlesRef.current.setProgress(this.targets()[0].progress);
//         }
//       },
//       onComplete: () => setIsSphere(!isSphere),
//     });
//   };

//   return (
//     <>
//       <Canvas
//         camera={{ position: [0, 0, 16], fov: 35 }}
//         className="fixed top-0 left-0 h-full w-full"
//       >
//         <color attach="background" args={['#160920']} />
//         <OrbitControls enableDamping />
//         <Particles ref={particlesRef} />
//       </Canvas>
//       <button
//         className="animate fixed top-4 right-4 z-10 rounded-xl bg-white px-4 py-2"
//         onClick={handleClick}
//       >
//         Animate
//       </button>
//     </>
//   );
// }
