/**
 * CERTS & ACHIEVEMENTS — only the entries supplied in the brief.
 * `credentialUrl` and `image` are null until a real link or image exists.
 */
export type Cert = {
  id: string;
  title: string;
  issuer: string;
  date: string | null;
  description: string;
  credentialUrl: string | null;
  image: { src: string; alt: string } | null;
};

type CertsContent = {
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  items: readonly Cert[];
};

export const certs: CertsContent = {
  eyebrow: "07 · Proof of work",
  title: "Certs",
  accent: "Achievements",
  description:
    "Hackathon finals, data analytics simulations and coursework certificates — with credentials where they exist.",
  items: [
    {
      id: "bano-qabil",
      title: "AI Hackathon National Finalist",
      issuer: "Alibaba Cloud × Bano Qabil",
      date: "Oct 2026",
      description:
        "National Finalist at Alibaba Cloud AI Hackathon Pakistan 2026, presenting Zehni Sukoon. Certificate FNL-24OCT26-PO2680-1.",
      credentialUrl: "https://aihackathon.cognix-pk.com/certificate/RECN-NW90-7JSQ",
      image: {
        src: "/certs/ai-hackathon-2026.webp",
        alt: "AI Hackathon Pakistan 2026 National Final certificate awarded to Amna Javed for Zehni Sukoon",
      },
    },
    {
      id: "kaggle-python",
      title: "Python",
      issuer: "Kaggle",
      date: "Jul 2026",
      description: "Kaggle's Python course certificate.",
      credentialUrl: null,
      image: null,
    },
    {
      id: "deloitte-forage",
      title: "Data Analytics Job Simulation",
      issuer: "Deloitte via Forage",
      date: "Feb 2026",
      description:
        "Practical data analytics tasks modelled on Deloitte client work. Enrolment verification code WejHXBJGsFy2nF4Xy; user verification code 69a1bcc1de4e0a7538879282.",
      credentialUrl: null,
      image: null,
    },
    {
      id: "anthropic-fluency",
      title: "AI Fluency for Students",
      issuer: "Anthropic",
      date: null,
      description: "Foundations of working effectively with AI systems.",
      credentialUrl: null,
      image: null,
    },
    {
      id: "uiux-beginners",
      title: "UI/UX for Beginners",
      issuer: "Course certificate",
      date: "Mar 2026",
      description: "Interface and experience design fundamentals. Certificate code 9906897.",
      credentialUrl: null,
      image: null,
    },
    {
      id: "uog-academics",
      title: "Academic Certificates & Awards",
      issuer: "University of Gujrat",
      date: null,
      description: "Certificates and awards from University of Gujrat — details to be added.",
      credentialUrl: null,
      image: null,
    },
  ],
};
