"use client";

import { useEffect, useRef } from "react";

export default function CursorHalo() {
  const haloRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const halo = haloRef.current;
    if (!halo) return;

    // عدم نمایش در موبایل
    const isTouch =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) {
      halo.style.display = "none";
      return;
    }

    const handleMove = (e: MouseEvent) => {
      halo.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      ref={haloRef}
      className="
        pointer-events-none fixed left-0 top-0 z-50
        h-[600px] w-[600px] rounded-full
        blur-3xl opacity-50
        mix-blend-screen
      "
      style={{
        willChange: "transform",
        background: 'rgba(29, 78, 216, 0.15)'
      }}
    />
  );
}
