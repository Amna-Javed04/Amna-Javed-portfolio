import { hero } from "@/data/hero";
import { GlitchWord } from "@/components/hero/glitch-word";
import { HeroBubbles } from "@/components/hero/hero-bubbles";
import { HeroActions } from "@/components/hero/hero-actions";
import { IconSparkle } from "@/components/ui/icons";

const wordSize = "text-[clamp(2.4rem,11vw,7.5rem)]";

export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-1/4 mx-auto h-[24rem] max-w-4xl rounded-full bg-accent/[0.09] blur-[130px]"
      />

      <HeroBubbles />

      <div className="container-page relative z-10 flex flex-col items-center pb-20 pt-28 text-center sm:pb-24 sm:pt-32">
        <p className="eyebrow flex items-center gap-2.5">
          <IconSparkle className="size-3.5 text-accent/80" />
          {hero.intro}
        </p>

        <div className="mt-5 w-full sm:mt-6">
          <GlitchWord words={hero.words} longest={hero.longestWord} className={wordSize} />
        </div>
        <p className="sr-only">Designer, developer, programmer and AI builder.</p>

        <h1
          id="hero-title"
          aria-label={`${hero.name}, ${hero.role}`}
          className="mt-7 text-balance text-xl font-semibold tracking-[-0.02em] sm:text-2xl"
        >
          {hero.name}
          <span aria-hidden="true" className="mx-2.5 font-normal text-line-bright">
            |
          </span>
          <span className="font-normal text-muted">{hero.role}</span>
          <span
            aria-hidden="true"
            className="caret ml-1.5 inline-block h-[1.05em] w-[2px] translate-y-[0.16em] bg-accent"
          />
        </h1>

        <HeroActions />

        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[0.625rem] uppercase tracking-[0.18em] text-muted/80">
          {hero.meta.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span aria-hidden="true" className="size-1 rounded-full bg-accent/60" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <a
        href="#about"
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.5625rem] uppercase tracking-[0.24em] text-muted/70 transition-colors hover:text-accent sm:flex"
      >
        <span>Scroll</span>
        <span aria-hidden="true" className="h-8 w-px bg-gradient-to-b from-accent/60 to-transparent" />
      </a>
    </section>
  );
}
