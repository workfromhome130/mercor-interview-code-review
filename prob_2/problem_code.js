import React, { useState, useEffect } from "react";

function WindowWidthLogger() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const onResize = () => {
      console.log("Window resized to", window.innerWidth);
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", onResize);

    return () => {
      // Clean up event listener
      window.removeEventListener("resize", () => onResize());
    };
  }, []);

  return (
    <div>
      <h1>Current Width:</h1>
      <p>{width}px</p>
    </div>
  );
}

export default WindowWidthLogger;
