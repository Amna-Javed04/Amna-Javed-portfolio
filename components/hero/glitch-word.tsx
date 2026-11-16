"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/cn";

type GlitchWordProps = {
  words: readonly string[];
  /** Longest word, rendered invisibly to reserve a stable line box. */
  longest: string;
  className?: string;
};

const SCRAMBLE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+";

export function GlitchWord({ words, longest, className }: GlitchWordProps) {
  const textRef = useRef<HTMLSpanElement>(null);
  const wrapRef = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const text = textRef.current;
    const wrap = wrapRef.current;
    const firstWord = words[0];
    if (!text || !wrap || !firstWord) return;

    const staticWord = words[1] ?? firstWord;

    if (reduceMotion) {
      text.textContent = staticWord;
      wrap.dataset.text = staticWord;
      return;
    }

    let glitchTimeout = 0;

    const flash = (duration: number) => {
      wrap.dataset.glitch = "true";
      window.clearTimeout(glitchTimeout);
      glitchTimeout = window.setTimeout(() => {
        wrap.dataset.glitch = "false";
      }, duration);
    };

    const renderPartial = (word: string, revealed: number) => {
      const typed = word.slice(0, revealed);
      const tailLength = Math.min(3, Math.max(0, word.length - revealed));
      let tail = "";
      for (let i = 0; i < tailLength; i += 1) {
        tail += SCRAMBLE[Math.floor(Math.random() * SCRAMBLE.length)];
      }
      text.textContent = typed + tail;
      wrap.dataset.text = typed + tail;
    };

    const timeline = gsap.timeline({ repeat: -1, delay: 0.7 });

    words.forEach((word) => {
      const state = { revealed: 0 };
      timeline.call(() => flash(420));
      timeline.to(state, {
        revealed: word.length,
        duration: Math.max(0.8, word.length * 0.08),
        ease: "none",
        onUpdate: () => renderPartial(word, Math.ceil(state.revealed)),
      });
      timeline.call(() => {
        text.textContent = word;
        wrap.dataset.text = word;
      });
      timeline.to({}, { duration: 1.45 });
    });

    return () => {
      timeline.kill();
      window.clearTimeout(glitchTimeout);
      delete wrap.dataset.glitch;
    };
  }, [reduceMotion, words]);

  return (
    <span className="relative block w-full" aria-hidden="true">
      <span
        className={cn(
          "invisible block font-display uppercase leading-[1.05] tracking-[-0.005em]",
          className,
        )}
      >
        {longest}
      </span>
      <span
        ref={wrapRef}
        data-text={words[0]}
        className={cn(
          "glitch-word absolute inset-0 grid place-items-center font-display uppercase leading-[1.05] tracking-[-0.005em]",
          className,
        )}
      >
        <span ref={textRef} className="whitespace-pre">
          {words[0]}
        </span>
      </span>
    </span>
  );
}
