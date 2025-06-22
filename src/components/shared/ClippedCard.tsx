function ClippedCard() {
  return (
    <>
      {/* 
        Define the SVG filter here. It's hidden using absolute positioning.
      */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          {/* A filter that mimics Tailwind's 'shadow-md' class */}
          <filter
            id="shadow-md-filter"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            {/* First layer of the shadow */}
            <feDropShadow
              dx="0"
              dy="4"
              stdDeviation="3" // blur-6px / 2
              floodColor="rgb(0 0 0 / 0.1)"
              result="shadow1"
            />
            {/* Second layer of the shadow */}
            <feDropShadow
              dx="0"
              dy="2"
              stdDeviation="2" // blur-4px / 2
              floodColor="rgb(0 0 0 / 0.1)"
              result="shadow2"
            />
            {/* Merge the two shadows and place the original element on top */}
            <feMerge>
              <feMergeNode in="shadow1" />
              <feMergeNode in="shadow2" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* A style tag to apply our new lighter filter. */}
      <style>{`
        .apply-light-shadow {
          filter: url(#shadow-md-filter);
        }
      `}</style>

      <div className="bg-secondary-100 mb-10 flex h-screen items-center justify-center">
        {/* 
            This wrapper now gets the new, lighter shadow filter applied.
          */}
        <div className="apply-light-shadow m-2 w-[600px]">
          {/* No shadow class on this div */}
          <div className="rounded-t-4xl bg-white p-5">
            We pursue AI research to expand the horizons of human knowledge. Our
            work addresses urgent challenges spanning diverse sectors with bold
            ideas, rigorous methods, and a deep commitment to turn insights into
            impact. We pursue AI research to expand the horizons of human
            knowledge. Our work addresses urgent challenges spanning diverse
            sectors with bold ideas, rigorous methods, and a deep commitment to
            turn insights into impact.
          </div>

          <svg
            className="mb-10 h-[91px] w-full"
            viewBox="0 0 500 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              d="M500 0H0V74.6036C0 83.6593 6.68231 91 14.9254 91H387.046C392.699 91 397.866 87.492 400.395 81.9384L426.11 25.4579C428.64 19.9043 433.807 16.3964 439.459 16.3964H485.075C493.318 16.3964 500 9.05548 500 0Z"
              fill="white"
            />
            Learn More
            <text x="5" y="20" fill="red">
              Learn More
            </text>
          </svg>
        </div>
      </div>
    </>
  );
}

export default ClippedCard;
