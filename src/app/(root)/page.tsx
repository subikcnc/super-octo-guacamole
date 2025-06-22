import Section1 from '@/sections/section1';
import Section2 from '@/sections/section2';
// import Section3 from '@/sections/section3';
import Section4 from '@/sections/section4';

export default function Home() {
  return (
    <>
      <Section1 />
      <Section2 />
      {/* <Section3 /> */}
      <Section4 />
      {/* <div
        id="scroll-container"
        className="fixed bottom-0 left-0 h-[200vh] w-full"
      >
        <h1>Scroll to animate the particles</h1>
      </div> */}
    </>
  );
}
