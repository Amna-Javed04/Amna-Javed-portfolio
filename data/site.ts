/**
 * Single place to keep the portfolio's identity and contact details.
 * Editing this file updates metadata, the footer, profiles and JSON-LD.
 */
export const site = {
  name: "Amna Javed",
  firstName: "Amna",
  role: "Full-Stack & AI-Integration Developer",
  tagline: "I build thoughtful software for people the internet usually forgets.",
  description:
    "Portfolio of Amna Javed, a Computer Science undergraduate building web applications, AI/ML tools and mental-health technology for Pakistan.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://amna-javed.vercel.app",
  email: "amnajaved004@gmail.com",
  location: "Pakistan",
  handle: "@Amna-Javed04",
  resumePath: "/resume/Amna-Javed-CV.pdf",
  education: {
    institution: "University of Gujrat",
    degree: "BS Computer Science",
    startYear: 2022,
    endYear: 2027,
    cgpa: "3.45",
  },
  socials: [
    { label: "LinkedIn", handle: "Amna-javed2004", href: "https://www.linkedin.com/in/amna-javed2004/" },
    { label: "GitHub", handle: "Amna-Javed04", href: "https://github.com/Amna-Javed04" },
    // Placeholder: replace with the real Kaggle profile URL when available.
    { label: "Kaggle", handle: "Amna-Javed04", href: "#" },
  ],
  nav: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Certs", href: "#certs" },
    { label: "Profiles", href: "#profiles" },
    { label: "Contact", href: "#contact" },
  ],
} as const;

export type NavItem = (typeof site.nav)[number];
