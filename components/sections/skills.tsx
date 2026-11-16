"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { skillGroups, skills, type Skill, type SkillGroup } from "@/data/skills";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

type Filter = "All" | SkillGroup;

const filters: readonly Filter[] = ["All", ...skillGroups];

function deviconUrl(slug: string) {
  return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${slug}/${slug}-original.svg`;
}

function monogram(name: string) {
  const words = name.split(/\s+/).filter(Boolean);
  if (words.length > 1) return words.slice(0, 2).map((word) => word[0]).join("");
  return name.slice(0, 2);
}

function SkillTile({ skill }: { skill: Skill }) {
  return (
    <div className="glass-card flex h-full items-center gap-3 rounded-2xl p-3.5">
      <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-line/80 bg-white/[0.03]">
        {skill.icon ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={deviconUrl(skill.icon)}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            width={22}
            height={22}
            className={cn("size-[22px] object-contain", skill.dark && "brightness-0 invert")}
          />
        ) : (
          <span
            aria-hidden="true"
            className="font-display text-[0.625rem] uppercase tracking-tight text-accent"
          >
            {monogram(skill.name)}
          </span>
        )}
      </span>
      <span className="text-xs font-medium leading-tight text-ink">{skill.name}</span>
    </div>
  );
}

export function Skills() {
  const [filter, setFilter] = useState<Filter>("All");
  const reduceMotion = useReducedMotion();

  const visible = useMemo(
    () => (filter === "All" ? skills.skills : skills.skills.filter((skill) => skill.group === filter)),
    [filter],
  );

  return (
    <section id="skills" aria-labelledby="skills-title" className="scroll-mt-28 border-t border-line/50">
      <div className="container-page py-20 sm:py-24">
        <Reveal>
          <SectionHeading
            id="skills-title"
            eyebrow={skills.eyebrow}
            title={skills.title}
            accent={skills.accent}
            description={skills.description}
          />
        </Reveal>

        <Reveal delay={0.06}>
          <div
            role="group"
            aria-label="Filter skills by group"
            className="mt-9 flex flex-wrap gap-2"
          >
            {filters.map((option) => {
              const active = option === filter;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setFilter(option)}
                  aria-pressed={active}
                  className={cn(
                    "rounded-pill border px-4 py-2 text-[0.625rem] uppercase tracking-[0.16em] transition-colors duration-300",
                    active
                      ? "border-accent/60 bg-accent-soft/70 text-[#e9d5ff]"
                      : "border-line bg-white/[0.02] text-muted hover:border-accent/40 hover:text-ink",
                  )}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </Reveal>

        <p className="mt-4 text-[0.6875rem] uppercase tracking-[0.18em] text-muted/70" aria-live="polite">
          {visible.length} {visible.length === 1 ? "skill" : "skills"}
          {filter === "All" ? "" : ` · ${filter}`}
        </p>

        <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {visible.map((skill, index) => (
            <motion.li
              key={skill.name}
              layout={!reduceMotion}
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.3,
                delay: reduceMotion ? 0 : Math.min(index * 0.015, 0.18),
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <SkillTile skill={skill} />
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
