/**
 * PROJECTS — cards plus the case study behind each one.
 *
 * Only facts supplied in the brief appear here. Anything that needs a URL,
 * image, diagram or video is `null`/empty and the UI shows a clearly labelled
 * placeholder instead of inventing a link or a metric.
 */
export type Screenshot = { src: string; alt: string };

export type Project = {
  id: string;
  title: string;
  category: string;
  /** Omitted when the brief did not supply a year. */
  year: string | null;
  status: "shipped" | "in-development";
  /** Two-line summary for the card. */
  blurb: string;
  stack: readonly string[];
  caseStudy: {
    problem: string;
    role: string;
    /** Caption for the architecture placeholder panel. */
    architecture: string;
    challenges: readonly string[];
    results: readonly string[];
    screenshots: readonly Screenshot[];
    /** Unlisted YouTube URL once one exists. */
    demoVideoUrl: string | null;
    links: { live: string | null; github: string | null };
  };
};

type ProjectsContent = {
  eyebrow: string;
  title: string;
  accent: string;
  items: readonly Project[];
};

export const projects: ProjectsContent = {
  eyebrow: "04 · Things I’ve built",
  title: "Projects",
  accent: "Case studies",
  items: [
    {
      id: "zehni-sukoon",
      title: "Zehni Sukoon",
      category: "Mental health · Full stack",
      year: "2026",
      status: "shipped",
      blurb:
        "Bilingual Urdu/English mental-health screening that turns a natural conversation into clinically scored PHQ-9/GAD-7 results — with deterministic safety guards the AI cannot override.",
      stack: [
        "Python",
        "Flask",
        "SQLAlchemy",
        "Jinja2",
        "JavaScript",
        "PostgreSQL",
        "SQLite",
        "Docker",
        "Gunicorn",
        "PyJWT",
        "ReportLab",
      ],
      caseStudy: {
        problem:
          "Mental-health tools overwhelmingly assume fluent English and a desktop form. Someone who speaks Urdu but types Roman Urdu has almost no clinically structured tool in their own language or script, and stigma makes account-gated forms a reason not to start.",
        role:
          "Solo full-stack build for the Bano Qabil × Alibaba Cloud AI Hackathon: architecture, Flask backend, Jinja/vanilla-JS frontend, LLM layer, tests and deployment. Presented Zehni Sukoon at the National Final on 24 October 2026.",
        architecture:
          "A Flask app factory with auth, screening, chat, therapist, admin and PDF blueprints over SQLite in development and PostgreSQL 15 in production. A vendor-SDK-free LLM client fails over across Qwen → Groq → Gemini, while server-side guards score every item from the user's own words and detect crisis phrases before any model call.",
        challenges: [
          "The LLM proposes, deterministic guards dispose: every score must quote the user's own words, stay within 0–3, and coverage is monotonic so an item cannot be silently un-scored.",
          "A three-layer production failure — prose instead of JSON, Groq's per-minute token budget reserving room its own retry needed, and a retired Gemini fallback — was fixed with per-route token caps, JSON salvage and a verified current model.",
          "A Random Forest / XGBoost / SVM ensemble was trained and then deliberately removed from the live path because a black-box vote can disagree with the validated band and cannot be explained to a clinician.",
          "Crisis detection runs independently of the model in English, Roman Urdu and Urdu script, and bypasses the daily usage cap so an outage or quota error can never suppress a cry for help.",
        ],
        results: [
          "National Finalist at Alibaba Cloud AI Hackathon Pakistan 2026, presenting Zehni Sukoon.",
          "281 automated checks across five offline suites and 49 live checks across two server-dependent suites.",
          "23 API endpoints, 13 page routes, 11 templates and six JS modules, with runtime Urdu RTL / English LTR switching and no page reload.",
          "Privacy enforced at the schema level: guest sessions store no identifying fields, chat transcripts are never persisted, and therapist access is consent-gated and revocable.",
        ],
        screenshots: [],
        demoVideoUrl: null,
        links: {
          live: "https://zehni-sukoon-1.onrender.com/",
          github: "https://github.com/Amna-Javed04/Zehni-Sukoon",
        },
      },
    },
    {
      id: "bursarly",
      title: "Bursarly",
      category: "Scholarships · Full stack",
      year: "2026",
      status: "shipped",
      blurb:
        "A scholarship deadline tracker that only marks a date confirmed when it appears on the provider's official page — and labels everything else as expected.",
      stack: [
        "Next.js 16",
        "React 19",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
        "FastAPI",
        "Python",
        "SQLAlchemy",
        "Pydantic",
        "Supabase",
        "PostgreSQL",
      ],
      caseStudy: {
        problem:
          "Scholarships are easy to list and hard to trust. Dates differ by country, embassy, university consortium and intake, aggregator sites copy each other's stale numbers, and none of them say where a date came from. For an international applicant, one wrong date costs an entire year.",
        role:
          "Built the product end to end: a typed Next.js 16 App Router frontend, FastAPI API, Supabase auth and Postgres, a Python verification pipeline, and a two-service Render deployment driven by render.yaml.",
        architecture:
          "Next.js 16 server components and client islands over a CORS-scoped FastAPI REST API. SQLAlchemy 2 and Supabase Postgres/Auth sit behind it; an offline scraper dedupes entries, fetches official pages, grades dates and requirements, and runs on a weekly schedule.",
        challenges: [
          "Making trust structural: is_estimated is a first-class column and the API exposes nearest_deadline separately from expected_deadline, so a UI bug cannot render an estimate as a confirmed deadline.",
          "Every authenticated request returned 403 because new Supabase tokens omit email_confirmed_at; fixed by reading confirmation from the admin API with a 120-second cache.",
          "Programmes with multiple deadlines crashed the detail page because a .scalar() call lacked .limit(1); the chatbot also matched \"Korea\" to the wrong programme until substring matching became a scored matcher.",
          "Render deploys failed with \"Network is unreachable\" because Supabase's direct host is IPv6-only; switched to the IPv4 pooler and taught the config layer to accept the legacy postgres:// scheme.",
        ],
        results: [
          "36 programmes across 23 countries, 232 documents, 161 eligibility criteria and 28 curated resources.",
          "34 programmes carry a labelled expected date, one has a confirmed date for the current cycle, and one legitimately has none.",
          "12 unit tests, tsc clean, 19 routes building and every page returning 200 in production.",
          "Full signup → confirm → login → tracker → admin flow verified against a live Supabase project.",
        ],
        screenshots: [],
        demoVideoUrl: null,
        links: {
          live: "https://bursarly-web.onrender.com/",
          github: "https://github.com/Amna-Javed04/Bursarly",
        },
      },
    },
    {
      id: "mindcheck",
      title: "MindCheck",
      category: "Research · ML ensemble",
      year: null,
      status: "shipped",
      blurb:
        "Depression severity detection trained on NHANES, combining three classifiers in a majority-voting ensemble that reaches 98.7% accuracy.",
      stack: ["Python", "Flask", "scikit-learn", "TensorFlow", "SQLite", "Selenium"],
      caseStudy: {
        problem:
          "Depression screening usually rests on questionnaires alone. This Final Year Project asks how well routinely collected survey data predicts severity, and how much a combined model improves on any single classifier.",
        role:
          "Final Year Project: trained Random Forest, XGBoost and SVM models on NHANES, combined them in a majority-voting ensemble, experimented with a TensorFlow LSTM, and shipped a Flask app with an LLM-based chatbot for coping tips.",
        architecture:
          "Flask app over a SQLite store, with the trained ensemble loaded as the severity service and Selenium covering the end-to-end flow.",
        challenges: [
          "Each classifier already cleared 94% on its own, so the ensemble became a question of agreement rather than rescuing a weak model.",
          "The app had to behave outside the notebook, which is why Selenium tests and regression checks guard the Flask flow.",
          "Coping tips come from an LLM and stay visibly separate from the model's severity prediction.",
        ],
        results: [
          "Random Forest, XGBoost and SVM each above 94% accuracy.",
          "Majority-voting ensemble reaches 98.7%.",
          "TensorFlow LSTM explored as an alternative sequence model.",
        ],
        screenshots: [],
        demoVideoUrl: null,
        links: {
          live: null,
          github: "https://github.com/Amna-Javed04/FYP-MindCheck-1",
        },
      },
    },
    {
      id: "chaosbros",
      title: "ChaosBros Esports",
      category: "Esports · Team site",
      year: null,
      status: "shipped",
      blurb:
        "The official site for a competitive esports team: cinematic hero, interactive roster, media hub, storefront and sponsor enquiry forms.",
      stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
      caseStudy: {
        problem:
          "A competitive team's home is usually a social page. The brief was a site that carries the team's identity — roster, media, store and sponsor enquiries — without feeling like a template.",
        role:
          "Built the site with 15+ custom animations, an interactive roster, a media hub and a storefront, and wired sponsor forms through Formspree and Web3Forms.",
        architecture:
          "Next.js App Router site with Framer Motion driving the transitions, static media assets, and third-party form endpoints for sponsor enquiries.",
        challenges: [
          "Fifteen-plus custom animations only work if they stay out of the way on slower phones, so motion had to degrade gracefully.",
          "Sponsor enquiries leave the app through third-party endpoints, which means submissions need explicit success and failure states.",
        ],
        results: [
          "15+ custom animations across the site.",
          "Formspree and Web3Forms integrations for sponsor enquiries.",
        ],
        screenshots: [],
        demoVideoUrl: null,
        links: {
          live: null,
          github: "https://github.com/Amna-Javed04/ChaosBros",
        },
      },
    },
    {
      id: "sandbox",
      title: "Sandbox Pakistan",
      category: "Community · Website",
      year: null,
      status: "in-development",
      blurb:
        "The official Sandbox Pakistan website, in development alongside the team's research work.",
      stack: [],
      caseStudy: {
        problem:
          "Sandbox Pakistan needed a home for its programmes and research that matched the work the team is actually doing.",
        role: "Leading the build as Tech Team Head.",
        architecture:
          "The stack and diagram are documented here once the first public release is ready.",
        challenges: [],
        results: [],
        screenshots: [],
        demoVideoUrl: null,
        links: { live: null, github: null },
      },
    },
  ],
};
