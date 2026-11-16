import { site } from "@/data/site";
import { profiles } from "@/data/profiles";
import { ContactForm } from "@/components/contact/contact-form";
import { IconArrowUp, IconMail } from "@/components/ui/icons";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="scroll-mt-28 border-t border-line/50"
    >
      <div className="container-page py-20 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <Reveal>
              <SectionHeading
                id="contact-title"
                eyebrow="09 · Get in touch"
                title="Contact"
                accent="Say hello"
                description="Open to web development, AI/ML and software internships. Tell me what you're working on and I'll reply by email."
              />
            </Reveal>

            <Reveal delay={0.06}>
              <div className="mt-8 flex flex-col gap-3">
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2.5 text-sm text-ink transition-colors hover:text-accent"
                >
                  <IconMail className="size-4 text-accent/80" />
                  {site.email}
                </a>
                <p className="text-[0.625rem] uppercase tracking-[0.18em] text-muted/70">
                  {site.location} · {profiles.handle}
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <Card className="relative">
              <p className="eyebrow text-[0.5625rem]">Message</p>
              <ContactForm />
            </Card>
          </Reveal>
        </div>

        <div className="mt-16 flex justify-center">
          <a
            href="#home"
            className="inline-flex items-center gap-2 rounded-pill border border-line px-4 py-2.5 text-[0.5625rem] uppercase tracking-[0.18em] text-muted transition-colors hover:border-accent/60 hover:text-ink"
          >
            <IconArrowUp className="size-3.5" />
            Back to top
          </a>
        </div>
      </div>
    </section>
  );
}
