"use client";

import dynamic from "next/dynamic";

const StarfieldCanvas = dynamic(() => import("@/components/three/starfield"), {
  ssr: false,
  loading: () => null,
});

/** Keeps Three.js out of the initial bundle; stars fade in after hydration. */
export function Starfield() {
  return <StarfieldCanvas />;
}
