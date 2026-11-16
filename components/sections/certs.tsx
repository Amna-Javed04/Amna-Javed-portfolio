"use client";

import { useEffect, useRef, useState } from "react";
import { certs, type Cert } from "@/data/certs";
import { Card } from "@/components/ui/card";
import { IconClose, IconExternal, IconTrophy } from "@/components/ui/icons";
import { Pill } from "@/components/ui/pill";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

function CertArt({ cert }: { cert: Cert }) {
  if (cert.image) {
    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        src={cert.image.src}
        alt={cert.image.alt}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
      />
    );
  }

  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
      <span className="grid size-11 place-items-center rounded-2xl border border-line-bright/60 bg-white/[0.02] text-accent/80">
        <IconTrophy className="size-5" />
      </span>
      <span className="text-[0.5625rem] uppercase tracking-[0.18em] text-muted/70">
        Certificate image placeholder
      </span>
    </div>
  );
}

export function Certs() {
  const [active, setActive] = useState<Cert | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!active) {
      triggerRef.current?.focus({ preventScroll: true });
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setActive(null);
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.offsetParent !== null);
      if (focusable.length === 0) return;
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
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [active]);

  return (
    <section id="certs" aria-labelledby="certs-title" className="scroll-mt-28 border-t border-line/50">
      <div className="container-page py-20 sm:py-24">
        <Reveal>
          <SectionHeading
            id="certs-title"
            eyebrow={certs.eyebrow}
            title={certs.title}
            accent={certs.accent}
            description={certs.description}
          />
        </Reveal>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certs.items.map((cert, index) => (
            <li key={cert.id} className="h-full">
              <Reveal delay={(index % 3) * 0.05} className="h-full">
                <Card interactive padding="none" className="group flex h-full flex-col overflow-hidden">
                  <div className="relative grid aspect-[4/3] place-items-center overflow-hidden border-b border-line/70 bg-[radial-gradient(circle_at_50%_20%,rgba(168,85,247,0.16),transparent_65%)]">
                    {cert.image ? (
                      <button
                        type="button"
                        onClick={(event) => {
                          triggerRef.current = event.currentTarget;
                          setActive(cert);
                        }}
                        className="h-full w-full"
                        aria-label={`Enlarge ${cert.title} certificate`}
                      >
                        <CertArt cert={cert} />
                      </button>
                    ) : (
                      <CertArt cert={cert} />
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <Pill variant="accent">{cert.issuer}</Pill>
                      {cert.date ? (
                        <span className="text-[0.625rem] uppercase tracking-[0.18em] text-muted">
                          {cert.date}
                        </span>
                      ) : null}
                    </div>

                    <h3 className="mt-3.5 text-base font-semibold leading-snug tracking-[-0.01em] text-ink">
                      {cert.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted">{cert.description}</p>

                    <div className="mt-auto pt-5">
                      {cert.credentialUrl ? (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="inline-flex items-center gap-1.5 text-[0.625rem] uppercase tracking-[0.16em] text-accent transition-colors hover:text-[#c084fc]"
                        >
                          View credential
                          <IconExternal className="size-3.5" />
                        </a>
                      ) : (
                        <span className="text-[0.5625rem] uppercase tracking-[0.16em] text-muted/60">
                          Credential link pending
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>

      {active?.image ? (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={active.image.alt}
          className="fixed inset-0 z-[140] flex items-center justify-center p-4 sm:p-8"
        >
          <button
            type="button"
            aria-hidden="true"
            tabIndex={-1}
            onClick={() => setActive(null)}
            className="absolute inset-0 cursor-zoom-out bg-[#030305]/95"
          />
          <figure className="relative max-h-full w-full max-w-4xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={active.image.src}
              alt={active.image.alt}
              className="mx-auto max-h-[80dvh] w-auto rounded-2xl border border-line object-contain"
            />
            <figcaption className="mt-3 text-center text-xs text-muted">{active.image.alt}</figcaption>
          </figure>
          <button
            type="button"
            autoFocus
            onClick={() => setActive(null)}
            aria-label="Close certificate image"
            className="absolute right-4 top-4 grid size-10 place-items-center rounded-full border border-line bg-[#0a0a0f] text-muted transition-colors hover:border-accent/60 hover:text-ink"
          >
            <IconClose className="size-4" />
          </button>
        </div>
      ) : null}
    </section>
  );
}
