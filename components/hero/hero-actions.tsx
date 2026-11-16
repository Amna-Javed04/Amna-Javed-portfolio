"use client";

import { Button } from "@/components/ui/button";
import { useResume } from "@/components/resume/resume-provider";
import { hero } from "@/data/hero";

export function HeroActions() {
  const { openResume } = useResume();

  return (
    <div className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
      <Button href={hero.primaryCta.href} variant="primary" size="lg" withArrow>
        {hero.primaryCta.label}
      </Button>
      <Button variant="outline" size="lg" onClick={openResume}>
        {hero.secondaryCta.label}
      </Button>
    </div>
  );
}
