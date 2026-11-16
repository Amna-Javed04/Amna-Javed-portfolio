import { research } from "@/data/research";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function Research() {
  return (
    <section
      id="research"
      aria-labelledby="research-title"
      className="scroll-mt-28 border-t border-line/50"
    >
      <div className="container-page py-20 sm:py-24">
        <Reveal>
          <SectionHeading
            id="research-title"
            eyebrow={research.eyebrow}
            title={research.title}
            accent={research.accent}
            description={research.summary}
          />
        </Reveal>

        <Reveal delay={0.08}>
          <Card className="relative mt-9 max-w-3xl overflow-hidden">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 size-64 rounded-full bg-accent/10 blur-3xl"
            />

            <div className="relative">
              <div className="flex flex-wrap items-center gap-2">
                <Pill variant="success">{research.status}</Pill>
                <span className="text-[0.5625rem] uppercase tracking-[0.18em] text-muted/70">
                  Paper · abstract pending
                </span>
              </div>

              <h3 className="mt-4 text-balance text-lg font-semibold leading-snug tracking-[-0.02em] text-ink sm:text-xl">
                {research.paperTitle}
              </h3>

              <div className="mt-5 rounded-2xl border border-dashed border-line-bright/60 bg-surface/40 p-5">
                <p className="text-[0.5625rem] uppercase tracking-[0.2em] text-muted">
                  Abstract placeholder
                </p>
                <p className="mt-2 text-xs leading-relaxed text-muted/80">
                  {research.abstractPlaceholder}
                </p>
              </div>

              <div className="mt-6">
                {research.link ? (
                  <Button href={research.link} variant="outline" size="sm" withArrow>
                    Read the paper
                  </Button>
                ) : (
                  <p className="text-[0.5625rem] uppercase tracking-[0.16em] text-muted/60">
                    PDF / preprint link pending publication
                  </p>
                )}
              </div>
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
