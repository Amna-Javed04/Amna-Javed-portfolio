"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap } from "@/lib/gsap";
import { about } from "@/data/about";

function formatValue(value: number, decimals: number) {
  return decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString("en-US");
}

/**
 * Three supplied facts, counted up the first time they enter the viewport.
 * The markup ships the final values, so the numbers stay correct without JS
 * or if the observer never fires.
 */
export function AboutStats() {
  const listRef = useRef<HTMLDListElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const root = listRef.current;
    if (!root || reduceMotion || typeof IntersectionObserver === "undefined") return;

    const counters = Array.from(root.querySelectorAll<HTMLElement>("[data-count-to]"));
    const tweens: gsap.core.Tween[] = [];
    const started = new WeakSet<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          if (started.has(el)) return;
          started.add(el);
          observer.unobserve(el);

          const target = Number(el.dataset.countTo);
          const decimals = Number(el.dataset.decimals ?? "0");
          if (!Number.isFinite(target)) return;

          const state = { value: 0 };
          tweens.push(
            gsap.to(state, {
              value: target,
              duration: 1.5,
              ease: "power3.out",
              onUpdate: () => {
                el.textContent = formatValue(state.value, decimals);
              },
              onComplete: () => {
                el.textContent = formatValue(target, decimals);
              },
            }),
          );
        });
      },
      { threshold: 0.6 },
    );

    // Each number watches its own box, so tall stat rows still trigger on short viewports.
    counters.forEach((counter) => observer.observe(counter));

    return () => {
      observer.disconnect();
      tweens.forEach((tween) => tween.kill());
    };
  }, [reduceMotion]);

  return (
    <dl
      ref={listRef}
      className="mt-10 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2"
    >
      {about.stats.map((stat) => (
        <div key={stat.label} className="flex flex-col gap-1.5 bg-surface/80 p-6">
          <dt className="order-2 text-[0.625rem] uppercase tracking-[0.18em] text-muted">
            {stat.label}
          </dt>
          <dd className="order-1 font-display text-2xl leading-tight tracking-[-0.01em] text-ink sm:text-[1.6rem]">
            {stat.prefix}
            <span data-count-to={stat.countTo} data-decimals={stat.decimals ?? 0}>
              {stat.value}
            </span>
            {stat.suffix}
          </dd>
          <p className="order-3 text-xs leading-relaxed text-muted/80">{stat.detail}</p>
        </div>
      ))}
    </dl>
  );
}
