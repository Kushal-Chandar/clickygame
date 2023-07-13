"use client";

import { useState } from "react";

export default function App() {
  type Size = {
    w: number;
    h: number;
  };
  const container: Size = { w: 600, h: 600 };
  const button: Size = { w: 70, h: 20 };
  const [position, setPosition] = useState({
    x: (container.w - button.w) / 2,
    y: (container.h - button.h) / 2,
  });

  const getRandomPosition = () => {
    return {
      x: Math.floor(Math.random() * (container.w - button.w)),
      y: Math.floor(Math.random() * (container.h - button.h)),
    };
  };

  console.log(position);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Hello World</h1>
      <div
        style={{
          width: `${container.w}px`,
          height: `${container.h}px`,
        }}
        className={`bg-neutral-400  mx-auto rounded`}
      >
        <button
          className={`rounded`}
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
      </div>
    </div>
  );
}
