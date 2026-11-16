import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  /** Plain white part of the title. */
  title: string;
  /** Purple Audiowide part, rendered uppercase. */
  accent: string;
  eyebrow?: string;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  /** Heading level; sections use h2, page titles use h1. */
  as?: "h1" | "h2" | "h3";
  id?: string;
};

export function SectionHeading({
  title,
  accent,
  eyebrow,
  description,
  align = "left",
  className,
  as: Heading = "h2",
  id,
}: SectionHeadingProps) {
  return (
    <header className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <p className={cn("eyebrow mb-4 flex items-center gap-3", align === "center" && "justify-center")}>
          <span aria-hidden="true" className="h-px w-8 bg-accent/50" />
          {eyebrow}
        </p>
      ) : null}
      <Heading
        id={id}
        className="text-balance text-3xl font-semibold leading-[1.08] tracking-[-0.03em] sm:text-4xl lg:text-[2.85rem]"
      >
        {title}{" "}
        <span className="font-display text-[0.78em] font-normal uppercase tracking-[0.01em] text-accent">
          {accent}
        </span>
      </Heading>
      {description ? (
        <p className="mt-5 text-[0.95rem] leading-relaxed text-muted sm:text-base">{description}</p>
      ) : null}
    </header>
  );
}
