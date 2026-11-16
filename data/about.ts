/**
 * ABOUT — copy and stats.
 *
 * The copy is a general overview of Amna's work and interests. Keep the stats
 * limited to supplied facts; the layout adapts to the number of entries.
 */
export type AboutStat = {
  /** Final value shown once the count-up finishes. */
  value: string;
  /** Numeric target for the count-up animation. Omit for text-only stats. */
  countTo?: number;
  /** Decimal places for `countTo`. */
  decimals?: number;
  prefix?: string;
  suffix?: string;
  /** Short label under the value. */
  label: string;
  /** One-line context under the label. */
  detail: string;
};

type About = {
  eyebrow: string;
  title: string;
  accent: string;
  paragraphs: readonly string[];
  stats: readonly AboutStat[];
};

export const about: About = {
  eyebrow: "02 · The short version",
  title: "About",
  accent: "Me",
  paragraphs: [
    "I'm a final-year Computer Science student at the University of Gujrat who builds full-stack web applications and AI-integrated tools. I like working across the stack, from data models and APIs to the interface people actually use.",
    "I care about the details that make software trustworthy — clear interfaces, reliable APIs, testing and privacy by design — and I learn best by shipping real products rather than stopping at prototypes.",
  ],
  stats: [
    {
      value: "300",
      countTo: 300,
      prefix: "Top ",
      suffix: " of 16,000",
      label: "Hackathon finalist",
      detail: "Alibaba Cloud × Bano Qabil AI Hackathon",
    },
    {
      value: "Tech Team Head",
      label: "Sandbox Pakistan",
      detail: "Official website, team tech work, research team",
    },
  ],
};
