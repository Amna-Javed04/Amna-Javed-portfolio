"use client";

import { useEffect, useRef } from "react";

/**
 * A purple dot with a softly trailing ring.
 * Mounted only for fine pointers; touch devices keep the native cursor.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!finePointer.matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    document.body.dataset.customCursor = "on";

    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let ringX = pointerX;
    let ringY = pointerY;
    let frame = 0;
    let visible = false;

    const setVisible = (next: boolean) => {
      if (next === visible) return;
      visible = next;
      dot.style.opacity = next ? "1" : "0";
      ring.style.opacity = next ? "1" : "0";
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      dot.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0) translate(-50%, -50%)`;
      setVisible(true);

      const target = event.target as Element | null;
      const interactive = target?.closest(
        'a, button, [role="button"], [data-cursor="hover"], summary',
      );
      ring.dataset.hover = interactive ? "true" : "false";
    };

    const onPointerLeave = () => setVisible(false);
    const onPointerEnter = () => setVisible(true);

    const tick = () => {
      const ease = reduceMotion.matches ? 1 : 0.16;
      ringX += (pointerX - ringX) * ease;
      ringY += (pointerY - ringY) * ease;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      frame = window.requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("pointerenter", onPointerEnter);
    frame = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("pointerenter", onPointerEnter);
      window.cancelAnimationFrame(frame);
      delete document.body.dataset.customCursor;
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100] hidden [@media(hover:hover)and(pointer:fine)]:block">
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-accent opacity-0 shadow-glow-dot transition-opacity duration-200"
      />
      <div
        ref={ringRef}
        className="cursor-ring fixed left-0 top-0 opacity-0 transition-opacity duration-200"
        data-hover="false"
      >
        <div className="cursor-ring__inner h-9 w-9 rounded-full border border-accent/60" />
      </div>
    </div>
  );
}
