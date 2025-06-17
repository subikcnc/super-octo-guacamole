import ShaderCanvas from '@/components/shaderTest/canvas';

export default function Home() {
  return (
    <>
      <div className="fixed top-0 left-0 h-full w-full">
        <ShaderCanvas />
      </div>
      <div id="scroll-container" className="h-[200vh] w-full">
        <h1>Scroll to animate the particles</h1>
      </div>
    </>
  );
}
