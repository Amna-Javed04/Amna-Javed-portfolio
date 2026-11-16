import { profiles } from "@/data/profiles";
import {
  IconExternal,
  IconGithub,
  IconKaggle,
  IconLinkedin,
  IconMail,
} from "@/components/ui/icons";
import { Card } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const icons = {
  linkedin: IconLinkedin,
  github: IconGithub,
  kaggle: IconKaggle,
  mail: IconMail,
} as const;

export function Profiles() {
  return (
    <section
      id="profiles"
      aria-labelledby="profiles-title"
      className="scroll-mt-28 border-t border-line/50"
    >
      <div className="container-page py-20 sm:py-24">
        <Reveal>
          <SectionHeading
            id="profiles-title"
            align="center"
            eyebrow={profiles.eyebrow}
            title={profiles.title}
            accent={profiles.accent}
            description={profiles.description}
          />
        </Reveal>

        <Reveal delay={0.06}>
          <div className="mt-10 flex flex-col items-center">
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-5 rounded-full bg-accent/20 blur-2xl"
              />
              <div className="relative grid size-32 place-items-center rounded-full border border-accent/40 bg-[radial-gradient(circle_at_35%_25%,#2a1646,#0e0e12_70%)] shadow-glow">
                <span className="font-display text-2xl uppercase tracking-[0.06em] text-ink">
                  AJ
                </span>
              </div>
            </div>

            <p className="mt-5 font-display text-sm uppercase tracking-[0.14em] text-accent">
              {profiles.handle}
            </p>
            <p className="mt-2 text-[0.5625rem] uppercase tracking-[0.18em] text-muted/60">
              Portrait placeholder · add public/portrait.jpg
            </p>
          </div>
        </Reveal>

        <ul className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2">
          {profiles.items.map((profile, index) => {
            const IconComponent = icons[profile.icon];

            const body = (
              <>
                <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line/80 bg-white/[0.03] text-accent/80">
                  <IconComponent className="size-[18px]" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-ink">{profile.label}</span>
                    {profile.href ? (
                      <IconExternal className="size-3 shrink-0 text-muted/60" />
                    ) : (
                      <Pill variant="muted" className="text-[0.5rem] uppercase tracking-[0.14em]">
                        Link pending
                      </Pill>
                    )}
                  </span>
                  <span className="mt-1 block truncate text-[0.6875rem] text-accent/80">
                    {profile.handle}
                  </span>
                  <span className="mt-1 block text-xs leading-relaxed text-muted">
                    {profile.description}
                  </span>
                </span>
              </>
            );

            return (
              <li key={profile.id}>
                <Reveal delay={(index % 2) * 0.05}>
                  {profile.href ? (
                    <a
                      href={profile.href}
                      {...(profile.href.startsWith("http")
                        ? { target: "_blank", rel: "noreferrer noopener" }
                        : {})}
                      className="glass-card glow-hover flex h-full items-start gap-4 p-5"
                    >
                      {body}
                    </a>
                  ) : (
                    <Card padding="none" className="flex h-full items-start gap-4 p-5">
                      {body}
                    </Card>
                  )}
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
