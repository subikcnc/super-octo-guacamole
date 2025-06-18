import ShaderCanvas from '@/components/shaderTest/canvas';
import Section1 from '@/sections/section1';

export default function Home() {
  return (
    <>
      <Section1 />
      <div className="fixed bottom-[-390px] left-0 h-screen w-full">
        <ShaderCanvas />
      </div>
      <div
        id="scroll-container"
        className="fixed bottom-0 left-0 h-[200vh] w-full"
      >
        <h1>Scroll to animate the particles</h1>
      </div>
    </>
  );
}
