import React, { useState, useEffect } from "react";

type Props = {};

function getDimension() {
  const hasWindow = typeof window !== "undefined";

  const width = hasWindow ? window.innerWidth : 0;
  const height = hasWindow ? window.innerHeight : 0;

  return {
    width,
    height,
  };
}

export default function GetWidownDimensoins() {
  const [windowDimensions, setWindowDimensions] = useState(getDimension());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getDimension());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}
