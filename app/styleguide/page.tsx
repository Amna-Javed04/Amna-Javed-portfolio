import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Design System",
  robots: { index: false, follow: false },
};

const colors = [
  { name: "Void", hex: "#050507", className: "bg-void", border: true },
  { name: "Surface", hex: "#0E0E12", className: "bg-surface", border: true },
  { name: "Line", hex: "#241A33", className: "bg-line" },
  { name: "Accent", hex: "#A855F7", className: "bg-accent" },
  { name: "Accent deep", hex: "#7C3AED", className: "bg-accent-deep" },
  { name: "Accent soft", hex: "#2A1646", className: "bg-accent-soft" },
  { name: "Ink", hex: "#F2F2F7", className: "bg-ink" },
  { name: "Muted", hex: "#A1A1AA", className: "bg-muted" },
];

const phases = [
  "Scaffold and design system",
  "Hero and navigation",
  "About, experience, projects and case studies",
  "Skills, certs, profiles, contact and footer",
  "Performance, accessibility, SEO and polish",
];

export default function StyleguidePage() {
  return (
    <main id="main" className="container-page py-24 sm:py-28">
      <nav aria-label="Breadcrumb" className="mb-10">
        <Link
          href="/"
          className="text-[0.6875rem] uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent"
        >
          ← Back to phase review
        </Link>
      </nav>

      <Reveal>
        <SectionHeading
          as="h1"
          eyebrow="Living reference"
          title="Design"
          accent="System"
          description="Tokens and primitives that every section will reuse. Change a token here and the whole portfolio follows."
        />
      </Reveal>

      {/* Colour */}
      <section aria-labelledby="colour" className="mt-20">
        <Reveal>
          <h2 id="colour" className="eyebrow">
            Colour
          </h2>
        </Reveal>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {colors.map((color, index) => (
            <Reveal key={color.name} delay={index * 0.04}>
              <div className="glass-card overflow-hidden">
                <div className={`h-20 w-full ${color.className} ${color.border ? "border-b border-line" : ""}`} />
                <div className="p-3.5">
                  <p className="text-xs font-medium text-ink">{color.name}</p>
                  <p className="mt-1 font-mono text-[0.6875rem] uppercase tracking-wider text-muted">
                    {color.hex}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Type */}
      <section aria-labelledby="type" className="mt-20">
        <Reveal>
          <h2 id="type" className="eyebrow">
            Typography
          </h2>
        </Reveal>
        <div className="mt-6 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <Card className="h-full">
              <p className="text-[0.6875rem] uppercase tracking-[0.2em] text-muted">Inter · body and UI</p>
              <p className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.035em] text-ink sm:text-5xl">
                Building calmly, shipping precisely.
              </p>
              <p className="mt-5 max-w-prose text-sm leading-relaxed text-muted">
                Body copy sits at 15–17px with 1.7 line height. Paragraphs are capped near 68
                characters so long-form case studies stay comfortable on wide screens.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-xs text-muted">
                <span>Regular 400</span>
                <span className="font-medium text-ink">Medium 500</span>
                <span className="font-semibold text-ink">Semibold 600</span>
                <span className="font-mono">Mono · 0.6875rem</span>
              </div>
            </Card>
          </Reveal>
          <Reveal delay={0.08}>
            <Card className="h-full bg-accent-soft/20">
              <p className="text-[0.6875rem] uppercase tracking-[0.2em] text-muted">Audiowide · display accents</p>
              <p className="mt-5 font-display text-3xl uppercase leading-tight text-accent sm:text-4xl">
                DESIGNER
                <br />
                DEVELOPER
              </p>
              <p className="mt-5 text-sm leading-relaxed text-muted">
                Reserved for the cycling hero word, big outlined numbers, section accents and
                credential labels. Never for paragraphs.
              </p>
            </Card>
          </Reveal>
        </div>
      </section>

      {/* Buttons */}
      <section aria-labelledby="buttons" className="mt-20">
        <Reveal>
          <h2 id="buttons" className="eyebrow">
            Buttons
          </h2>
        </Reveal>
        <Reveal>
          <Card className="mt-6">
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary" withArrow>
                Primary
              </Button>
              <Button variant="outline" withArrow>
                Outline glow
              </Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="outline" disabled>
                Disabled
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap items-end gap-3 border-t border-line pt-6">
              <Button size="sm" variant="outline">
                Small
              </Button>
              <Button size="md" variant="outline">
                Medium
              </Button>
              <Button size="lg" variant="outline">
                Large
              </Button>
            </div>
            <p className="mt-6 text-xs leading-relaxed text-muted">
              Labels are uppercase, letter-spaced pills. Primary uses dark ink on purple for
              AA contrast; the outline variant is the default for secondary actions.
            </p>
          </Card>
        </Reveal>
      </section>

      {/* Cards and pills */}
      <section aria-labelledby="surfaces" className="mt-20">
        <Reveal>
          <h2 id="surfaces" className="eyebrow">
            Surfaces and tags
          </h2>
        </Reveal>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Reveal>
            <Card interactive className="group h-full">
              <Pill variant="accent">Machine learning</Pill>
              <h3 className="mt-4 text-xl font-semibold tracking-tight text-ink">
                Interactive project card
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Cards lift a few pixels and grow a violet halo on hover and keyboard focus.
                Rounded at 22px with a one-pixel #241A33 border.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Pill>Python</Pill>
                <Pill>Flask</Pill>
                <Pill>XGBoost</Pill>
              </div>
            </Card>
          </Reveal>
          <Reveal delay={0.08}>
            <Card className="h-full">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-ink">Status</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                <Pill variant="success">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                  Live
                </Pill>
                <Pill variant="muted">In development</Pill>
                <Pill variant="outline">Placeholder</Pill>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-muted">
                Pills also carry filters, tech chips, dates and categories. Keep them short and
                sentence-case.
              </p>
            </Card>
          </Reveal>
        </div>
      </section>

      {/* Section headings */}
      <section aria-labelledby="headings" className="mt-20">
        <Reveal>
          <h2 id="headings" className="eyebrow">
            Section title pattern
          </h2>
        </Reveal>
        <Reveal>
          <Card className="mt-6">
            <SectionHeading
              eyebrow="Pattern"
              title="Plain title —"
              accent="accent words"
              description="White Inter carries the meaning; Audiowide purple carries the personality."
            />
          </Card>
        </Reveal>
      </section>

      {/* Motion */}
      <section aria-labelledby="motion" className="mt-20">
        <Reveal>
          <h2 id="motion" className="eyebrow">
            Motion
          </h2>
        </Reveal>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {["Fade + 24px lift", "Stagger 80ms", "Once per element"].map((label, index) => (
            <Reveal key={label} delay={index * 0.08} distance={28}>
              <Card padding="sm" className="h-full text-center">
                <p className="font-display text-xs uppercase tracking-[0.2em] text-accent">
                  {label}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-muted">
                  Scroll-triggered, power3 easing, 0.9s duration.
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
        <p className="mt-4 text-xs leading-relaxed text-muted">
          With <code className="text-ink">prefers-reduced-motion</code>, reveals resolve
          immediately and the cursor ring stops trailing. Content is never hidden behind motion.
        </p>
      </section>

      {/* Roadmap */}
      <section aria-labelledby="roadmap" className="mt-20">
        <Reveal>
          <h2 id="roadmap" className="eyebrow">
            Build roadmap
          </h2>
        </Reveal>
        <ol className="mt-6 space-y-2">
          {phases.map((phase, index) => (
            <Reveal key={phase} delay={index * 0.04}>
              <li className="flex items-center gap-4 rounded-2xl border border-line bg-surface/60 px-4 py-3.5">
                <span
                  className={`font-display text-[0.65rem] ${index === 0 ? "text-accent" : "text-muted/60"}`}
                >
                  0{index + 1}
                </span>
                <span className={`text-sm ${index === 0 ? "text-ink" : "text-muted"}`}>{phase}</span>
                <Pill variant="success" className="ml-auto">
                  Done
                </Pill>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>
    </main>
  );
}
