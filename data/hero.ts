import { site } from "@/data/site";

/** Hero copy and the decorative bubbles that orbit it. */
export const hero = {
  intro: "Welcome to the portfolio of",
  words: ["DESIGNER", "DEVELOPER", "PROGRAMMER", "AI BUILDER"],
  /** Longest word reserves the line height so cycling never shifts layout. */
  longestWord: "PROGRAMMER",
  name: "Amna Javed",
  meta: ["Pakistan", "BS Computer Science ’27", "Open to internships"],
  primaryCta: {
    label: "Let’s Connect",
    href: "https://www.linkedin.com/in/amna-javed2004/",
  },
  secondaryCta: { label: "View Resume" },
  resumePath: site.resumePath,
  bubbles: [
    { icon: "code", label: "Code", position: "tl", depth: 18, delay: 0, duration: 8 },
    { icon: "brain", label: "AI & ML", position: "tr", depth: 26, delay: 1.4, duration: 9.5 },
    { icon: "trophy", label: "Hackathons", position: "bl", depth: 22, delay: 0.8, duration: 8.8 },
    { icon: "bulb", label: "Ideas", position: "br", depth: 14, delay: 2.1, duration: 7.4 },
  ],
} as const;

export type HeroBubble = (typeof hero.bubbles)[number];
