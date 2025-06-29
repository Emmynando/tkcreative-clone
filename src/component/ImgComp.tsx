import { useRef, useEffect, type SetStateAction } from "react";
import gsap from "gsap";
import { Observer } from "gsap/all";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";

const IMG_FILE = [
  {
    id: "tk0",
    img: "/image/tk_1.avif",
    containerStyle: {
      width: "100%",
      maxWidth: "calc(3.968rem + 39.903dvw)",
      // height: "calc(-1.778rem + -2.404dvw + 100dvh)",
      marginBottom: "calc(-1.0815rem + 7.512dvw)",
    },
    imgStyle: {
      aspectRatio: 1717 / 2136,
      width: "100%",
      height: "calc(-1.778rem + -2.404dvw + 100dvh)",
    },
  },
  {
    id: "tk1",
    img: "/image/tk_2.avif",
    imgStyle: {
      aspectRatio: 1024 / 1536,
      width: "calc(40.509dvw)",
    },
  },
  {
    id: "tk2",
    img: "/image/tk_3.avif",
    imgStyle: {
      aspectRatio: 960 / 1440,
      width: "calc(23.148dvw)",
    },
  },
  {
    id: "tk3",
    img: "/image/tk_4.avif",
    imgStyle: {
      aspectRatio: 1024 / 1280,
      width: "calc(40.509dvw)",
    },
  },
  {
    id: "tk4",
    img: "/image/tk_5.avif",
    imgStyle: {
      aspectRatio: 2578 / 1719,
      width: "calc(61.921dvw)",
    },
  },
  {
    id: "tk5",
    img: "/image/tk_6.avif",
    imgStyle: {
      aspectRatio: 1835 / 2336,
      width: "calc(44.271dvw)",
    },
  },
  {
    id: "tk6",
    img: "/image/tk_7.avif",
    imgStyle: {
      aspectRatio: 1407 / 1734,
      width: "calc(33.854dvw)",
    },
  },
  {
    id: "tk7",
    img: "/image/tk_8.avif",
    imgStyle: {
      aspectRatio: 2295 / 1531,
      width: "calc(55.266dvw)",
    },
  },
  {
    id: "tk8",
    img: "/image/tk_9.avif",
    imgStyle: {
      aspectRatio: 1818 / 2575,
      width: "calc(43.692dvw)",
    },
  },
  {
    id: "tk9",
    img: "/image/tk_10.avif",
    imgStyle: {
      aspectRatio: 1289 / 1951,
      width: "calc(31.829dvw)",
    },
  },
];

// register plugin
gsap.registerPlugin(ScrollToPlugin, Observer);

interface ImgCompProps {
  startScrollingDown: boolean;
  setStartScrollingDown: React.Dispatch<SetStateAction<boolean>>;
  inViewRef: React.RefObject<HTMLImageElement | null>;
}
export default function ImgComp({
  startScrollingDown,
  setStartScrollingDown,
  inViewRef,
}: ImgCompProps) {
  let mm = gsap.matchMedia();
  const scrollTween = useRef<gsap.core.Timeline | null>(null);
  const currentDirection = useRef<"up" | "down" | null>(null);

  // Get current max scroll value
  const getMaxScroll = () => {
    return Math.max(0, document.body.scrollHeight - window.innerHeight);
  };

  useEffect(() => {
    const isLargeScreen = window.innerWidth > 768;
    if (startScrollingDown && isLargeScreen) {
      handleAutoScrollDown();
    }
  }, [startScrollingDown]);

  // Stop any existing scroll
  const stopCurrentScroll = () => {
    if (scrollTween.current) {
      scrollTween.current.kill();
      scrollTween.current = null;
    }
    currentDirection.current = null;
  };

  // handle scrolling down
  const handleAutoScrollDown = () => {
    const maxScroll = getMaxScroll();
    const currentScroll = window.scrollY;

    // If already scrolling down, don't restart
    if (currentDirection.current === "down") return;

    stopCurrentScroll();

    // if ((scrollerRef.current && maxScroll > 0) || startScrollingDown) {
    if (currentScroll < maxScroll - 20 || startScrollingDown) {
      scrollTween.current = gsap.timeline();
      scrollTween.current.to(window, {
        scrollTo: { y: maxScroll },
        duration: 60,
        ease: "none",
        // onComplete: clearAutoScroll,
        onComplete: () => {
          scrollTween.current = null;
          currentDirection.current = null;
          if (startScrollingDown) {
            setStartScrollingDown(false);
          }
        },
      });
    }
  };

  // handle scroll up
  const handleAutoScrollUp = () => {
    const currentScroll = window.scrollY;
    // If already scrolling up, don't restart
    if (currentDirection.current === "up") return;

    stopCurrentScroll();

    // if my window is greater than 1.8,
    // my margin top of the component, animate to the top
    if (currentScroll > 30) {
      // currentDirection.current = "up";
      scrollTween.current = gsap.timeline();
      scrollTween.current.to(window, {
        scrollTo: { y: 0 },
        duration: 60,
        ease: "none",

        onComplete: () => {
          scrollTween.current = null;
          currentDirection.current = null;
        },
      });
    }
  };

  useGSAP(
    () => {
      // for only desktop devices
      mm.add("(min-width: 800px)", () => {
        const observer = Observer.create({
          // the event that should should be listened to
          target: window,
          // action - listen for mouse wheel
          type: "wheel",
          onDown: handleAutoScrollDown,
          onUp: handleAutoScrollUp,
        });

        const handleVisibilityChange = () => {
          // stop auto scroll if tab is hidden
          if (document.hidden) {
            if (scrollTween.current && scrollTween.current.isActive()) {
              scrollTween.current.pause();
            }
          } else {
            if (scrollTween.current && scrollTween.current.paused()) {
              scrollTween.current.play();
            }
          }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
          observer.disable();
          document.removeEventListener(
            "visibilitychange",
            handleVisibilityChange
          );
          if (scrollTween.current) scrollTween.current.kill();
        };
      });
    },
    { dependencies: [scrollTween] }
  );

  const commonContainerStyle: React.CSSProperties = {
    maxWidth: "calc(-1.782rem + 97.33dvw)",
    paddingTop: "calc(-2.163rem + 15.024dvw)",
    marginBottom: "0px",
    marginLeft: "auto",
    display: "flex",
    justifyContent: "flex-end",
  };

  const padTheTop = {
    paddingTop: "1rem",
    marginBottom: "1rem",
  };

  return (
    <main className="relative w-full flex flex-col items-end cursor-pointer">
      <div className="flex flex-col items-end mt-[1.8rem]">
        {IMG_FILE.map((item) => (
          <div
            key={item.id}
            style={
              item.id !== "tk0"
                ? { ...commonContainerStyle, ...item.containerStyle }
                : item.containerStyle
            }
          >
            <img
              ref={item.id === "tk4" ? inViewRef : null}
              src={item.img}
              alt={`Image ${item.id}`}
              className="object-cover w-full"
              style={item.imgStyle}
            />
          </div>
        ))}
        <p className="text-lg" style={padTheTop}>
          Selected Projects
        </p>
      </div>
    </main>
  );
}
