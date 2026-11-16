"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { hero } from "@/data/hero";
import { IconBulb, IconBrain, IconCode, IconTrophy } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

const positions = {
  tl: "left-[1%] top-[22%] sm:left-[3%] lg:left-[7%]",
  tr: "right-[1%] top-[26%] sm:right-[3%] lg:right-[7%]",
  bl: "bottom-[20%] left-[4%] sm:left-[6%] lg:left-[11%]",
  br: "bottom-[17%] right-[4%] sm:right-[6%] lg:right-[11%]",
} as const;

const icons = {
  code: IconCode,
  brain: IconBrain,
  trophy: IconTrophy,
  bulb: IconBulb,
} as const;

export function HeroBubbles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const node = containerRef.current;
    if (!node || reduceMotion) return;

    let frame = 0;
    const onPointerMove = (event: PointerEvent) => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const x = event.clientX / window.innerWidth - 0.5;
        const y = event.clientY / window.innerHeight - 0.5;
        node.style.setProperty("--px", x.toFixed(3));
        node.style.setProperty("--py", y.toFixed(3));
      });
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reduceMotion]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="hero-parallax pointer-events-none absolute inset-0 hidden md:block"
    >
      {hero.bubbles.map((bubble) => {
        const Icon = icons[bubble.icon];
        return (
          <div
            key={bubble.label}
            className={cn("absolute", positions[bubble.position])}
            style={{
              transform: `translate3d(calc(var(--px) * ${bubble.depth}px), calc(var(--py) * ${bubble.depth}px), 0)`,
            }}
          >
            <div
              className="bubble-float"
              style={{
                animationDelay: `-${bubble.delay}s`,
                animationDuration: `${bubble.duration}s`,
              }}
            >
              <div className="bubble-glow flex flex-col items-center gap-2">
                <span className="grid size-14 place-items-center rounded-[20px] border border-line-bright/70 bg-surface/80 text-accent backdrop-blur-md lg:size-16">
                  <Icon className="size-6 lg:size-7" />
                </span>
                <span className="font-display text-[0.5rem] uppercase tracking-[0.18em] text-muted/70">
                  {bubble.label}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
