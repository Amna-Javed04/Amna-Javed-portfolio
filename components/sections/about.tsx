import { about } from "@/data/about";
import { AboutStats } from "@/components/about/about-stats";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="scroll-mt-28 border-t border-line/50"
    >
      <div className="container-page py-20 sm:py-24">
        <Reveal>
          <SectionHeading
            id="about-title"
            align="center"
            eyebrow={about.eyebrow}
            title={about.title}
            accent={about.accent}
            description={about.paragraphs[0]}
          />
        </Reveal>

        <Reveal delay={0.08}>
          <Card className="mx-auto mt-9 max-w-3xl text-center">
            <div className="mx-auto flex max-w-xl flex-col gap-4">
              {about.paragraphs.slice(1).map((paragraph) => (
                <p key={paragraph} className="text-[0.95rem] leading-relaxed text-muted">
                  {paragraph}
                </p>
              ))}
            </div>

            <AboutStats />
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
