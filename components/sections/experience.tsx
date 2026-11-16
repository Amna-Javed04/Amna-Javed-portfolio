"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { experience } from "@/data/experience";
import { gsap, ScrollTrigger, useGsap } from "@/lib/gsap";
import { cn } from "@/lib/cn";
import { Card } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

/** Alternating timeline whose accent line draws as the section scrolls. */
export function Experience() {
  const listRef = useRef<HTMLOListElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();
  useGsap();

  useEffect(() => {
    const line = lineRef.current;
    const list = listRef.current;
    if (!line || !list || reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.set(line, { scaleY: 0, transformOrigin: "top center" });
      gsap.to(line, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: list,
          start: "top 72%",
          end: "bottom 65%",
          scrub: 0.4,
        },
      });
    }, list);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="scroll-mt-28 border-t border-line/50"
    >
      <div className="container-page py-20 sm:py-24">
        <Reveal>
          <SectionHeading
            id="experience-title"
            eyebrow={experience.eyebrow}
            title={experience.title}
            accent={experience.accent}
            description="Four roles across community tech, facilitation and machine learning — each one built around shipping and explaining real work."
          />
        </Reveal>

        <ol ref={listRef} className="relative mt-12 space-y-10 sm:mt-14 sm:space-y-12">
          <span
            aria-hidden="true"
            className="absolute bottom-8 left-[7px] top-8 w-px bg-line/80 lg:left-1/2"
          />
          <span
            ref={lineRef}
            aria-hidden="true"
            className="absolute bottom-8 left-[7px] top-8 w-px bg-gradient-to-b from-accent via-accent/70 to-accent/20 lg:left-1/2"
          />

          {experience.roles.map((role, index) => {
            const onRight = index % 2 === 1;

            return (
              <li
                key={role.id}
                className="relative pl-9 sm:pl-12 lg:grid lg:grid-cols-2 lg:gap-16 lg:pl-0"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-[3px] top-8 size-2.5 rounded-full border border-accent/80 bg-void shadow-glow-dot lg:left-1/2 lg:-translate-x-1/2"
                />

                <Reveal
                  delay={index * 0.04}
                  className={cn("lg:col-start-1", onRight && "lg:col-start-2 lg:row-start-1")}
                >
                  <Card padding="none" className="h-full overflow-hidden p-6 sm:p-7">
                    <span
                      aria-hidden="true"
                      className="timeline-number pointer-events-none absolute right-5 top-4 font-display text-[2.75rem] leading-none"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="flex flex-wrap items-center gap-2">
                      <Pill variant="accent">{role.company}</Pill>
                      {role.current ? <Pill variant="success">Current</Pill> : null}
                    </div>

                    <h3 className="mt-4 max-w-[16rem] text-lg font-semibold leading-snug tracking-[-0.01em] text-ink">
                      {role.role}
                    </h3>

                    {role.period ? (
                      <p className="mt-1.5 text-[0.625rem] uppercase tracking-[0.18em] text-muted">
                        {role.period}
                      </p>
                    ) : null}

                    <p className="mt-4 text-sm leading-relaxed text-muted">{role.focus}</p>

                    <ul className="mt-5 space-y-2.5 border-t border-line/70 pt-5">
                      {role.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-2.5 text-xs leading-relaxed text-muted">
                          <span
                            aria-hidden="true"
                            className="mt-[0.45rem] h-px w-3 shrink-0 bg-accent/60"
                          />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
