import { useEffect, useRef, useState } from "react";
import ImgComp from "./component/ImgComp";
import gsap from "gsap";
import TKCreativeSVG from "./component/svgs/svg";

function App() {
  const topTextRef = useRef<HTMLDivElement>(null);
  const bottomTextRef = useRef<HTMLDivElement>(null);
  const tl = gsap.timeline();
  const [startScrolling, setStartScrolling] = useState(false);

  useEffect(() => {
    // Scroll to top of the page on reload
    window.scrollTo({ top: 0, behavior: "auto" });

    if (!topTextRef.current || !bottomTextRef.current) return;
    tl.fromTo(
      topTextRef.current,
      { opacity: 0 },
      { opacity: 1, ease: "power2.out", duration: 3 },
      //insert exactly 0.8 seconds from the start of the timeline
      0.8
    );
    tl.fromTo(
      bottomTextRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        ease: "power2.out",
        duration: 0.8,
        onComplete: () => setStartScrolling(true),
      },
      // start immediately after the first one
      ">"
    );
  }, []);

  const topTextStyle = {
    top: "5%",
    width: "calc(19.111rem + 14.423dvw)",
    fontSize: "calc(1.096rem + 0.721dvw)",
    lineHeight: "calc(1.2604rem + 0.82915dvw)",
  };
  return (
    <div className="relative px-4">
      <p
        style={topTextStyle}
        className="fixed z-5"
        // className="fixed z-5 top-[5%] font-normal md:w-ful lg:w-[36rem] text-[1.2rem] md:text-lg lg:text-[1.98rem] leading-[22.2594px] md:leading-[36.5244px] lg:leading-[36.5244px]"
        ref={topTextRef}
      >
        We believe in experiential design, placing importance on how an
        environment makes us feel & how a new space can transform and enhance
        our lives.
      </p>
      <ImgComp
        startScrollingDown={startScrolling}
        setStartScrollingDown={setStartScrolling}
      />
      {/* <ImgComp /> */}
      <h2
        className="fixed bottom-[5%] z-5 w-full md:w-[30rem] lg:w-[40rem] pr-4"
        ref={bottomTextRef}
      >
        <TKCreativeSVG />
      </h2>
    </div>
  );
}

export default App;
