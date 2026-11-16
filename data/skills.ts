/**
 * SKILLS — 30 tools across six groups, with devicon slugs where one exists.
 * `dark: true` marks logos that are black and need inverting on this theme.
 */
export const skillGroups = [
  "Languages",
  "Frontend",
  "Backend",
  "ML & Data",
  "Databases",
  "Tools",
] as const;

export type SkillGroup = (typeof skillGroups)[number];

export type Skill = {
  name: string;
  group: SkillGroup;
  /** devicon slug; omit when the icon set has no match so a monogram is used. */
  icon?: string;
  dark?: boolean;
};

type SkillsContent = {
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  skills: readonly Skill[];
};

export const skills: SkillsContent = {
  eyebrow: "06 · What I build with",
  title: "Skills",
  accent: "Toolkit",
  description:
    "Languages, frontend, backend, ML and data, databases and tooling — the stack behind the projects above.",
  skills: [
    { name: "Python", group: "Languages", icon: "python" },
    { name: "JavaScript", group: "Languages", icon: "javascript" },
    { name: "TypeScript", group: "Languages", icon: "typescript" },
    { name: "C++", group: "Languages", icon: "cplusplus" },
    { name: "C#", group: "Languages", icon: "csharp" },
    { name: "SQL", group: "Languages", icon: "azuresqldatabase" },

    { name: "HTML", group: "Frontend", icon: "html5" },
    { name: "CSS", group: "Frontend", icon: "css3" },
    { name: "React", group: "Frontend", icon: "react" },
    { name: "Next.js", group: "Frontend", icon: "nextjs", dark: true },
    { name: "Tailwind CSS", group: "Frontend", icon: "tailwindcss" },

    { name: "Flask", group: "Backend", icon: "flask", dark: true },
    { name: "FastAPI", group: "Backend", icon: "fastapi" },
    { name: "ASP.NET MVC", group: "Backend", icon: "dot-net" },
    { name: "REST APIs", group: "Backend" },
    { name: "JWT", group: "Backend" },

    { name: "Pandas", group: "ML & Data", icon: "pandas", dark: true },
    { name: "NumPy", group: "ML & Data", icon: "numpy" },
    { name: "scikit-learn", group: "ML & Data", icon: "scikitlearn" },
    { name: "XGBoost", group: "ML & Data" },
    { name: "TensorFlow", group: "ML & Data", icon: "tensorflow" },

    { name: "PostgreSQL", group: "Databases", icon: "postgresql" },
    { name: "Supabase", group: "Databases", icon: "supabase" },
    { name: "MySQL", group: "Databases", icon: "mysql" },
    { name: "MS SQL Server", group: "Databases", icon: "mssql" },
    { name: "SQLite", group: "Databases", icon: "sqlite" },

    { name: "Git", group: "Tools", icon: "git" },
    { name: "GitHub", group: "Tools", icon: "github", dark: true },
    { name: "Selenium", group: "Tools", icon: "selenium" },
    { name: "Vercel", group: "Tools", icon: "vercel", dark: true },
  ],
};
