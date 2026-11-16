"use client";

import { useEffect } from "react";

export function ScrollProgress() {
  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;

    const update = () => {
      frame = 0;
      const max = root.scrollHeight - root.clientHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, root.scrollTop / max)) : 0;
      root.style.setProperty("--scroll-progress", progress.toFixed(4));
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-0 z-[90] h-0.5 bg-transparent">
      <div
        className="h-full origin-left bg-gradient-to-r from-accent-deep via-accent to-[#e9d5ff] shadow-[0_0_12px_#a855f7cc]"
        style={{ transform: "scaleX(var(--scroll-progress))" }}
      />
    </div>
  );
}
