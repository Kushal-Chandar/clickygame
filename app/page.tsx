"use client";

import { useState, useRef, useLayoutEffect } from "react";

type Size = {
  h: number;
  w: number;
};

function Game() {
  const button: Size = { w: 70, h: 20 };
  const ref = useRef<HTMLDivElement | null>(null);
  const [canvas, setCanvas] = useState<Size>({ h: 0, w: 0 }); // You don't know real width, height
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [start, setStart] = useState(true);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        const height = ref.current.offsetHeight;
        const width = ref.current.offsetWidth;
        console.log(height, width);
        setCanvas({ h: height, w: width }); // Re-render now that you know the real width height
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getRandomPosition = () => {
    return {
      x: Math.floor(Math.random() * (canvas.w - button.w)),
      y: Math.floor(Math.random() * (canvas.h - button.h)),
    };
  };

  return (
    <div
      ref={ref}
      className={
        "bg-neutral-400 rounded h-[95vh] w-[95vw] max-h-[600px] max-w-[600px]"
      }
    >
      {start ? (
        <button
          className={
            "rounded relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          }
          style={{
            width: `${button.w}px`,
            height: `${button.h}px`,
          }}
          onClick={() => {
            setStart(false);
            setPosition(getRandomPosition());
          }}
        >
          Click Me
        </button>
      ) : (
        <button
          className={"rounded"}
          style={{
            position: "relative",
            top: `${position.y}px`,
            left: `${position.x}px`,
            width: `${button.w}px`,
            height: `${button.h}px`,
          }}
          onClick={() => {
            setPosition(getRandomPosition());
          }}
        >
          Click Me
        </button>
      )}
    </div>
  );
}

export default function App() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Hello World</h1>
      <Game />
    </div>
  );
}
