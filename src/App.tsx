import { useEffect, useRef, useState } from "react";
import ImgComp from "./component/ImgComp";
import gsap from "gsap";
import TKCreativeSVG from "./component/svgs/svg";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { FaArrowRightLong } from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger, useGSAP);
function App() {
  const tl = gsap.timeline();
  let mm = gsap.matchMedia();
  const inViewRef = useRef<HTMLImageElement>(null);
  const topTextRef = useRef<HTMLDivElement>(null);
  const bottomTextRef = useRef<HTMLDivElement>(null);
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

  useGSAP(
    () => {
      if (!inViewRef.current || !topTextRef.current) return;
      // for only mobile devices
      mm.add(
        "(max-width: 799px)",
        () => {
          gsap.to(topTextRef.current, {
            scrollTrigger: {
              trigger: inViewRef.current,
              start: "2px 96%",
              end: "bottom 10%",
              toggleActions: "play play none none",
              scrub: true,
            },
            opacity: 0,
          });

          gsap.to(bottomTextRef.current, {
            scrollTrigger: {
              trigger: inViewRef.current,
              start: "2px 96%",
              end: "bottom 10%",
              toggleActions: "play play none none",
              scrub: true,
            },
            scale: 0.8,
            top: "-1rem",
            width: "30%",
          });
        },
        // scope
        inViewRef
      );
    },
    {
      dependencies: [inViewRef, topTextRef, bottomTextRef],
      revertOnUpdate: true,
    }
  );

  mm.revert();

  const topTextStyle = {
    top: "5%",
    width: "calc(19.111rem + 14.423dvw)",
    fontSize: "calc(1.096rem + 0.721dvw)",
    lineHeight: "calc(1.2604rem + 0.82915dvw)",
  };
  return (
    <div className="relative px-4">
      <p ref={topTextRef} style={topTextStyle} className=" fixed z-5 text-lg">
        We believe in experiential design, placing importance on how an
        environment makes us feel & how a new space can transform and enhance
        our lives.
      </p>
      <ImgComp
        startScrollingDown={startScrolling}
        setStartScrollingDown={setStartScrolling}
        inViewRef={inViewRef}
      />
      <button className="flex items-center justify-center gap-2 w-max mt-[6rem] block md:hidden mx-auto">
        <p className="text-lg text-center">Selected Projects</p>
        <FaArrowRightLong />
      </button>
      <div
        className="fixed bottom-[5%] z-5 w-full md:w-[30rem] lg:w-[40rem] pr-4"
        ref={bottomTextRef}
      >
        <TKCreativeSVG />
      </div>
    </div>
  );
}

export default App;
