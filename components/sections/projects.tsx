"use client";

import { useCallback, useState } from "react";
import { projects } from "@/data/projects";
import { CaseStudyDialog } from "@/components/projects/case-study-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function Projects() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const close = useCallback(() => setActiveId(null), []);
  const active = projects.items.find((project) => project.id === activeId) ?? null;

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="scroll-mt-28 border-t border-line/50"
    >
      <div className="container-page py-20 sm:py-24">
        <Reveal>
          <SectionHeading
            id="projects-title"
            eyebrow={projects.eyebrow}
            title={projects.title}
            accent={projects.accent}
            description="Mental-health screening, a scholarship tracker, an ML ensemble and a team esports site — with the engineering decisions behind each."
          />
        </Reveal>

        <ul className="mt-12 grid gap-5 sm:gap-6 lg:grid-cols-2">
          {projects.items.map((project, index) => (
            <li key={project.id} className="h-full">
              <Reveal delay={(index % 2) * 0.06} className="h-full">
                <Card interactive padding="md" className="flex h-full flex-col">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <Pill variant="accent">{project.category}</Pill>
                    <div className="flex items-center gap-2">
                      {project.status === "in-development" ? (
                        <Pill variant="muted">In development</Pill>
                      ) : null}
                      {project.year ? (
                        <span className="text-[0.625rem] uppercase tracking-[0.18em] text-muted">
                          {project.year}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <h3 className="mt-5 text-xl font-semibold tracking-[-0.02em] text-ink sm:text-2xl">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{project.blurb}</p>

                  {project.stack.length > 0 ? (
                    <ul className="mt-5 flex flex-wrap gap-1.5">
                      {project.stack.map((tech) => (
                        <li key={tech}>
                          <Pill
                            size="sm"
                            className="border-line/80 bg-white/[0.02] text-[0.625rem] text-muted"
                          >
                            {tech}
                          </Pill>
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  <div className="mt-auto flex flex-wrap items-center gap-2.5 pt-7">
                    <Button
                      size="sm"
                      variant="outline"
                      withArrow
                      onClick={() => setActiveId(project.id)}
                      aria-haspopup="dialog"
                    >
                      Read case study
                    </Button>
                    {project.caseStudy.links.live ? (
                      <Button
                        size="sm"
                        variant="ghost"
                        href={project.caseStudy.links.live}
                        withArrow
                      >
                        Live demo
                      </Button>
                    ) : null}
                    {project.caseStudy.links.github ? (
                      <Button size="sm" variant="ghost" href={project.caseStudy.links.github}>
                        GitHub
                      </Button>
                    ) : null}
                  </div>
                </Card>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>

      <CaseStudyDialog project={active} onClose={close} />
    </section>
  );
}
