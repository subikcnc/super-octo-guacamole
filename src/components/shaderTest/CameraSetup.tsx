import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';

const CameraSetup = () => {
  const { camera } = useThree();

  useEffect(() => {
    // camera.position.set(0, 0.2, 1); // x, y, z
    // camera.lookAt(0, 0, 0); // optional: make it look at center
  }, [camera]);

  return null; // no JSX needed
};

export default CameraSetup;
