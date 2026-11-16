/**
 * ABOUT — copy and stats.
 *
 * PLACEHOLDER COPY: the two paragraphs below only arrange the raw facts from
 * the brief (pre-medical → Computer Science, web + AI/ML, mental-health tech
 * for Pakistan). Replace `paragraphs` with the final text; the layout will not
 * change. Set `draft: false` once the final copy is in place.
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
  draft: boolean;
  paragraphs: readonly string[];
  draftNote: string;
  stats: readonly AboutStat[];
};

export const about: About = {
  eyebrow: "02 · The short version",
  title: "About",
  accent: "Me",
  draft: true,
  paragraphs: [
    "I started in pre-medical, heading for medicine. What kept pulling me was never the memorising — it was building something, breaking it, and discovering why it broke. So I switched to Computer Science, and it stuck.",
    "Today I build web applications and AI/ML tools, and I keep coming back to mental-health technology for Pakistan: tools that fit the language people actually think in, and the stigma they actually face.",
  ],
  /** Shown while `draft` is true so the placeholder state is unmistakable. */
  draftNote: "Draft copy · final text is edited in data/about.ts",
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
      value: "98.7",
      countTo: 98.7,
      decimals: 1,
      suffix: "%",
      label: "Ensemble accuracy",
      detail: "MindCheck — majority-voting model",
    },
    {
      value: "Tech Team Head",
      label: "Sandbox Pakistan",
      detail: "Official website, team tech work, research team",
    },
  ],
};
