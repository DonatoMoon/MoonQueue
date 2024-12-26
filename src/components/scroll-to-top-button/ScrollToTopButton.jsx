import { useState, useRef, useEffect } from "react";
import style from "./ScrollToTopButton.module.scss";

const ScrollToTopButton = () => {
  const [pathLength, setPathLength] = useState(0);
  const progressPathRef = useRef(null);
  const progressWrapRef = useRef(null);
  const [isActiveProgress, setIsActiveProgress] = useState(false);

  useEffect(() => {
    const progressPath = progressPathRef.current;

    if (progressPath) {
      const path = progressPath.querySelector("path");
      const length = path.getTotalLength();

      path.style.transition = "none";
      path.style.strokeDasharray = `${length} ${length}`;
      path.style.strokeDashoffset = `${length}`;
      path.getBoundingClientRect();
      path.style.transition = "stroke-dashoffset 10ms linear";

      setPathLength(length);
    }

    const handleScroll = () => {
      const scroll = window.scrollY || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = pathLength - (scroll * pathLength) / height;

      if (progressPath) {
        const path = progressPath.querySelector("path");
        path.style.strokeDashoffset = `${progress}`;
      }

      const offset = 50;
      setIsActiveProgress(scroll > offset);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathLength]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      ref={progressWrapRef}
      onClick={scrollToTop}
      className={`${style.progressWrap} ${
        isActiveProgress ? style.activeProgress : ""
      }`}
    >
      <svg
        className={`${style.progressCircle} svgContent`}
        width="75"
        height="75"
        viewBox="-10 -8 120 115"
        ref={progressPathRef}
      >
        <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
      </svg>
    </div>
  );
};

export default ScrollToTopButton;
