/** PROFILES — the places that are actually maintained. */
export type Profile = {
  id: string;
  label: string;
  handle: string;
  /** null when no public URL exists yet; the card then shows a labelled placeholder. */
  href: string | null;
  description: string;
  icon: "linkedin" | "github" | "kaggle" | "mail";
  monogram: string;
};

type ProfilesContent = {
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  handle: string;
  items: readonly Profile[];
};

export const profiles: ProfilesContent = {
  eyebrow: "08 · Elsewhere",
  title: "Profiles",
  accent: "On the web",
  description: "The places I actually maintain — code, writing and professional work.",
  handle: "@Amna-Javed04",
  items: [
    {
      id: "linkedin",
      label: "LinkedIn",
      handle: "Amna-javed2004",
      href: "https://www.linkedin.com/in/amna-javed2004/",
      description: "Professional profile, roles and updates.",
      icon: "linkedin",
      monogram: "IN",
    },
    {
      id: "github",
      label: "GitHub",
      handle: "Amna-Javed04",
      href: "https://github.com/Amna-Javed04",
      description: "Source code for the projects on this site.",
      icon: "github",
      monogram: "GH",
    },
    {
      id: "kaggle",
      label: "Kaggle",
      handle: "Amna-Javed04",
      href: null,
      description: "Notebooks and machine-learning work.",
      icon: "kaggle",
      monogram: "KG",
    },
    {
      id: "email",
      label: "Email",
      handle: "amnajaved004@gmail.com",
      href: "mailto:amnajaved004@gmail.com",
      description: "The fastest way to reach me.",
      icon: "mail",
      monogram: "@",
    },
  ],
};
