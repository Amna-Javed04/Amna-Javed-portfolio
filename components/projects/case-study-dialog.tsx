"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { IconClose, IconExternal } from "@/components/ui/icons";
import { Pill } from "@/components/ui/pill";
import type { Project, Screenshot } from "@/data/projects";

const FOCUSABLE =
  'a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])';

function StudyBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-8 first:mt-0">
      <h3 className="eyebrow text-[0.625rem]">{title}</h3>
      <div className="mt-3 text-sm leading-relaxed text-muted">{children}</div>
    </section>
  );
}

function PlaceholderPanel({ label, hint }: { label: string; hint: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-line-bright/60 bg-surface/40 p-5">
      <p className="text-[0.625rem] uppercase tracking-[0.2em] text-muted">{label}</p>
      <p className="mt-2 text-xs leading-relaxed text-muted/80">{hint}</p>
    </div>
  );
}

type CaseStudyDialogProps = {
  project: Project | null;
  onClose: () => void;
};

/**
 * Case-study viewer: problem, role, architecture, stack, challenges, results,
 * gallery and demo. Runs the same focus-trap and scroll-lock contract as the
 * résumé viewer.
 */
export function CaseStudyDialog({ project, onClose }: CaseStudyDialogProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const lightboxTriggerRef = useRef<HTMLElement | null>(null);
  const [lightbox, setLightbox] = useState<Screenshot | null>(null);
  const reduceMotion = useReducedMotion();
  const openId = project?.id ?? null;

  // A new case study always starts at the top with the gallery closed.
  useEffect(() => {
    setLightbox(null);
  }, [openId]);

  useEffect(() => {
    if (!project) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const panel = panelRef.current;
    panel?.scrollTo({ top: 0 });
    panel?.querySelector<HTMLElement>("[data-autofocus]")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        if (lightboxRef.current) {
          setLightbox(null);
          lightboxTriggerRef.current?.focus();
          return;
        }
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      // Trap inside the lightbox when it is open, otherwise inside the panel.
      const scope = lightboxRef.current ?? panel;
      if (!scope) return;
      const focusable = Array.from(scope.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null,
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [project, onClose]);

  useEffect(() => {
    if (!lightbox) {
      lightboxTriggerRef.current?.focus({ preventScroll: true });
      return;
    }
    lightboxTriggerRef.current = document.activeElement as HTMLElement | null;
    lightboxRef.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
  }, [lightbox]);

  if (!project) return null;

  const study = project.caseStudy;
  const hasLinks = Boolean(study.links.live || study.links.github);
  const duration = reduceMotion ? 0 : 0.28;

  return (
    <div className="fixed inset-0 z-[120] flex items-end justify-center sm:items-center sm:p-6">
      <button
        type="button"
        aria-hidden="true"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-[#030305]/85 backdrop-blur-md"
      />

      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`case-${project.id}-title`}
        className="relative flex max-h-[92dvh] w-full max-w-3xl flex-col overflow-y-auto rounded-t-[26px] border border-line bg-[#0a0a0f] shadow-[0_-10px_80px_-20px_rgba(168,85,247,0.35)] sm:max-h-[86dvh] sm:rounded-[26px]"
        initial={{ y: reduceMotion ? 0 : 26, opacity: 0, scale: reduceMotion ? 1 : 0.985 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-line/80 bg-[#0a0a0f]/95 px-5 py-4 backdrop-blur sm:px-8">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <Pill variant="accent">{project.category}</Pill>
              {project.year ? (
                <span className="text-[0.625rem] uppercase tracking-[0.18em] text-muted">
                  {project.year}
                </span>
              ) : null}
              {project.status === "in-development" ? (
                <Pill variant="muted">In development</Pill>
              ) : null}
            </div>
            <h2
              id={`case-${project.id}-title`}
              className="mt-2 truncate text-xl font-semibold tracking-[-0.02em] text-ink sm:text-2xl"
            >
              {project.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            data-autofocus
            aria-label={`Close ${project.title} case study`}
            className="grid size-9 shrink-0 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent/60 hover:text-ink"
          >
            <IconClose className="size-4" />
          </button>
        </div>

        <div className="px-5 py-6 sm:px-8 sm:py-8">
          <StudyBlock title="The problem">
            <p>{study.problem}</p>
          </StudyBlock>

          <StudyBlock title="My role">
            <p>{study.role}</p>
          </StudyBlock>

          <StudyBlock title="Architecture">
            <PlaceholderPanel
              label="Architecture diagram placeholder"
              hint={`${study.architecture} Add the exported diagram at public/projects/${project.id}/architecture.(svg|png) and render it here.`}
            />
          </StudyBlock>

          {project.stack.length > 0 ? (
            <StudyBlock title="Tech stack">
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li key={tech}>
                    <Pill variant="outline">{tech}</Pill>
                  </li>
                ))}
              </ul>
            </StudyBlock>
          ) : null}

          {study.challenges.length > 0 ? (
            <StudyBlock title="Challenges">
              <ol className="space-y-3">
                {study.challenges.map((challenge, index) => (
                  <li key={challenge} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 font-display text-[0.625rem] text-accent"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{challenge}</span>
                  </li>
                ))}
              </ol>
            </StudyBlock>
          ) : null}

          {study.results.length > 0 ? (
            <StudyBlock title="Results">
              <ul className="space-y-2.5">
                {study.results.map((result) => (
                  <li key={result} className="flex gap-2.5">
                    <span
                      aria-hidden="true"
                      className="mt-[0.5rem] size-1.5 shrink-0 rounded-full bg-accent/80"
                    />
                    {result}
                  </li>
                ))}
              </ul>
            </StudyBlock>
          ) : null}

          <StudyBlock title="Screenshots">
            {study.screenshots.length > 0 ? (
              <ul className="grid gap-3 sm:grid-cols-2">
                {study.screenshots.map((shot) => (
                  <li key={shot.src}>
                    <button
                      type="button"
                      onClick={() => setLightbox(shot)}
                      className="group block w-full overflow-hidden rounded-2xl border border-line bg-surface"
                    >
                      {/* Plain img keeps the gallery portable; screenshots are added as static files. */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={shot.src}
                        alt={shot.alt}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="grid gap-3 sm:grid-cols-3">
                {["01", "02", "03"].map((slot) => (
                  <PlaceholderPanel
                    key={slot}
                    label={`Screenshot ${slot} placeholder`}
                    hint={`Add public/projects/${project.id}/${slot}.webp and list it in data/projects.ts.`}
                  />
                ))}
              </div>
            )}
          </StudyBlock>

          <StudyBlock title="Demo">
            {study.demoVideoUrl ? (
              <div className="overflow-hidden rounded-2xl border border-line bg-black">
                <iframe
                  src={study.demoVideoUrl}
                  title={`${project.title} demo video`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  className="aspect-video w-full"
                />
              </div>
            ) : (
              <PlaceholderPanel
                label="Demo video placeholder"
                hint="Add the unlisted YouTube URL to data/projects.ts to embed the walkthrough here."
              />
            )}
          </StudyBlock>

          <div className="mt-9 flex flex-wrap items-center gap-3 border-t border-line/70 pt-6">
            {study.links.live ? (
              <a
                href={study.links.live}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-pill border border-accent/45 bg-accent/[0.06] px-4 py-2.5 text-[0.625rem] uppercase tracking-[0.16em] text-ink transition-colors hover:border-accent/80 hover:bg-accent/[0.12]"
              >
                Live demo
                <IconExternal className="size-3.5" />
              </a>
            ) : null}
            {study.links.github ? (
              <a
                href={study.links.github}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-pill border border-line px-4 py-2.5 text-[0.625rem] uppercase tracking-[0.16em] text-muted transition-colors hover:border-accent/60 hover:text-ink"
              >
                GitHub
                <IconExternal className="size-3.5" />
              </a>
            ) : null}
            {!hasLinks ? (
              <p className="text-xs leading-relaxed text-muted/80">
                Live and repository links are added here once this project is published.
              </p>
            ) : null}
          </div>
        </div>
      </motion.div>

      {lightbox ? (
        <div
          ref={lightboxRef}
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.alt}
          className="fixed inset-0 z-[140] flex items-center justify-center p-4 sm:p-8"
        >
          <button
            type="button"
            aria-hidden="true"
            tabIndex={-1}
            onClick={() => setLightbox(null)}
            className="absolute inset-0 cursor-zoom-out bg-[#030305]/95"
          />
          <figure className="relative max-h-full w-full max-w-4xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              className="mx-auto max-h-[80dvh] w-auto rounded-2xl border border-line object-contain"
            />
            <figcaption className="mt-3 text-center text-xs text-muted">{lightbox.alt}</figcaption>
          </figure>
          <button
            type="button"
            data-autofocus
            onClick={() => setLightbox(null)}
            aria-label="Close screenshot"
            className="absolute right-4 top-4 grid size-10 place-items-center rounded-full border border-line bg-[#0a0a0f] text-muted transition-colors hover:border-accent/60 hover:text-ink"
          >
            <IconClose className="size-4" />
          </button>
        </div>
      ) : null}
    </div>
  );
}
