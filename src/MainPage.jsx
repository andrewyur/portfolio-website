import { useRef, useEffect, useLayoutEffect } from "react";
import "./MainPage.css";
import { AboutHim } from "./AboutHim/AboutHim";
import { Header } from "./Header";
import { Projects } from "./Projects/Projects";
import { Contact } from "./Contact/Contact";

export function MainPage() {
  const appRef = useRef();

  let mainOffset = 0;

  let layer1 = useRef();
  let layer1Offset = 0;

  let layer2 = useRef();
  let layer2Offset = 0;

  let scrollPosition = 0;

  // easing value: low == fast, high == slow
  function linearInterpolation(x1, x2, easingValue) {
    return (1 - easingValue) * x1 + easingValue * x2;
  }

  useLayoutEffect(() => {
    layer1.current = document.querySelectorAll(".layer1");
    layer2.current = document.querySelectorAll(".layer2");
    const resizeObserver = new ResizeObserver(() => {
      document.body.style.height = getComputedStyle(appRef.current).height;
    });
    resizeObserver.observe(appRef.current);
    window.requestAnimationFrame(render);
    return () => resizeObserver.disconnect();
  });

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const handleScroll = () => {
    scrollPosition = window.scrollY;
  };

  // this is laggy on some machines, and very laggy on mobile
  // will have to optimize when making mobile view
  const render = () => {
    //base page movement
    mainOffset = linearInterpolation(mainOffset, scrollPosition, 0.14);
    //text
    layer1Offset = linearInterpolation(layer1Offset, scrollPosition, 0.11);
    //accents
    layer2Offset = linearInterpolation(layer2Offset, scrollPosition, 0.16);

    layer1.current.forEach((e) => {
      e.style.transform = `translateY(-${
        Math.floor(Math.abs(mainOffset - layer1Offset) * 100) / 100
      }px)`;
    });
    layer2.current.forEach((e) => {
      // this sucks!!!
      if (e.id == "accent1") {
        e.style.transform = `rotate(7.64deg) translateY(-${
          Math.floor(Math.abs(mainOffset - layer2Offset) * 100) / 100
        }px)`;
      } else {
        e.style.transform = `translateY(-${
          Math.floor(Math.abs(mainOffset - layer2Offset) * 100) / 100
        }px)`;
      }
    });
    if (appRef.current) {
      appRef.current.style.transform = `translateY(-${
        Math.floor(mainOffset * 100) / 100
      }px)`;
    }
    window.requestAnimationFrame(render);
  };

  return (
    <>
      <header>
        <Header />
      </header>
      <main id="main" ref={appRef}>
        <AboutHim />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
