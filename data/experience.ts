/** EXPERIENCE — only roles, dates and responsibilities supplied in the brief. */
export type Role = {
  id: string;
  company: string;
  role: string;
  /** Human-readable dates. `null` when the dates were not supplied. */
  period: string | null;
  current: boolean;
  /** One-line scope of the role. */
  focus: string;
  bullets: readonly string[];
};

type ExperienceContent = {
  eyebrow: string;
  title: string;
  accent: string;
  roles: readonly Role[];
};

export const experience: ExperienceContent = {
  eyebrow: "03 · Where I’ve worked",
  title: "Experience",
  accent: "Timeline",
  roles: [
    {
      id: "sandbox",
      company: "Sandbox Pakistan",
      role: "Tech Team Head",
      period: "Jul 2026 — Present",
      current: true,
      focus: "Leading the team’s technology work alongside the research team.",
      bullets: [
        "Building the organisation’s official website end to end.",
        "Handling the team’s technical work and contributing to the research team.",
      ],
    },
    {
      id: "nobel",
      company: "Nobel Learning PBC",
      role: "Technology & Facilitation Intern",
      period: "Mar 2026 — Present",
      current: true,
      focus: "Technology and facilitation initiatives across sessions and teams.",
      bullets: [
        "Supporting technology and facilitation initiatives, including team presentations.",
        "Coordinating sessions and the workflows that keep them running.",
      ],
    },
    {
      id: "arch",
      company: "Arch Technologies",
      role: "Machine Learning Intern",
      period: "Aug 2025",
      current: false,
      focus: "Classical ML pipelines, from preprocessing to documented metrics.",
      bullets: [
        "Built MNIST image classification and spam detection with scikit-learn.",
        "Worked through full pipelines — preprocessing, feature engineering, training and evaluation — with documented metrics.",
      ],
    },
    {
      id: "tcf",
      company: "The Citizens Foundation",
      role: "Rahbar Program Mentor",
      period: null,
      current: false,
      focus: "Volunteer mentoring for grade 8 students.",
      bullets: ["Mentored grade 8 students through the Rahbar program."],
    },
  ],
};
