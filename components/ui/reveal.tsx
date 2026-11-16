"use client";

import { createElement, useEffect, useRef, type ElementType, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap, ScrollTrigger, useGsap } from "@/lib/gsap";
import { cn } from "@/lib/cn";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds of stagger delay. */
  delay?: number;
  /** Vertical travel in pixels. */
  distance?: number;
  as?: ElementType;
};

/**
 * Fades and lifts its children into view once.
 * Content stays visible without JS or with reduced motion enabled.
 */
export function Reveal({ children, className, delay = 0, distance = 24, as }: RevealProps) {
  const Component = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  useGsap();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reduceMotion) {
      el.removeAttribute("data-reveal");
      gsap.set(el, { clearProps: "all" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(el, { y: distance, opacity: 0 });
      el.removeAttribute("data-reveal");

      const tween = gsap.to(el, {
        y: 0,
        opacity: 1,
        duration: 0.9,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
      });

      // Safety net: never leave content hidden if ScrollTrigger cannot fire.
      const fallback = window.setTimeout(() => {
        if (Number(gsap.getProperty(el, "opacity")) === 0) {
          gsap.to(el, { y: 0, opacity: 1, duration: 0.4, overwrite: true });
        }
      }, 2600);

      return () => {
        window.clearTimeout(fallback);
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    }, el);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [delay, distance, reduceMotion]);

  return createElement(
    Component,
    { ref, "data-reveal": "pending", className: cn(className) },
    children,
  );
}
