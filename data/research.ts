/**
 * RESEARCH — the paper supplied in the brief.
 * No abstract, findings or links are invented: both stay labelled placeholders
 * until the paper is public.
 */
type ResearchContent = {
  eyebrow: string;
  title: string;
  accent: string;
  status: string;
  paperTitle: string;
  summary: string;
  abstractPlaceholder: string;
  link: string | null;
};

export const research: ResearchContent = {
  eyebrow: "05 · Questions worth asking",
  title: "Research",
  accent: "In progress",
  status: "In progress",
  paperTitle:
    "The Label Reliability Trap: How Stigma-Driven Underreporting Undermines Western-Trained Depression Screening AI in Pakistan",
  summary:
    "An in-progress paper on why stigma-driven underreporting breaks Western-trained depression screening models in Pakistan.",
  abstractPlaceholder:
    "Abstract placeholder — the final abstract is published here with the paper. No findings are claimed while the work is in progress.",
  link: null,
};
