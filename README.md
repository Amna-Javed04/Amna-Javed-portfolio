# Amna Javed — Portfolio

A dark, cosmic single-page portfolio built with Next.js (App Router), TypeScript, Tailwind CSS v4,
GSAP + ScrollTrigger, Three.js and Framer Motion.

> **Status: Phase 5 of 5 — performance, accessibility, SEO and polish complete.**
> All nine content sections plus the footer are live. Lighthouse targets: 90+ performance,
> accessibility, best practices and SEO. `/styleguide` documents the design system.

---

## Run locally

Requires Node.js 20+.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run typecheck` | TypeScript, no emit |

---

## How the project is organised

```
app/
  layout.tsx          Fonts, metadata, skip link, chrome, header and modal provider
  page.tsx            Hero + Phase 3 section scaffolding
  styleguide/         Living design-system reference (noindex)
  globals.css         Design tokens, base styles, utilities
components/
  chrome/             Custom cursor, scroll progress, ambient background, grain
  about/              Animated stat row
  contact/            Contact form with validation, honeypot and status states
  hero/               Glitch word cycle, parallax bubbles, CTA cluster
  layout/             Floating navbar with scroll-spy, mobile menu and footer
  projects/           Case-study dialog with gallery, diagram and video slots
  resume/             Accessible résumé modal provider
  sections/           One component per page section
  three/              Lazy-loaded starfield
  ui/                 Button, Card, Pill, SectionHeading, Reveal, icons
data/
  site.ts             Name, role, links, nav, resume path (edit me)
  hero.ts             Hero copy, cycling words, bubble labels
  about.ts            About copy (draft) and the three stats
  experience.ts       Timeline roles, dates and bullets
  projects.ts         Cards plus each case study's content and links
  research.ts         Paper title, status and abstract placeholder
  skills.ts           30 skills across six groups, with devicon slugs
  certs.ts            Certificates, issuers, dates and credential links
  profiles.ts         LinkedIn, GitHub, Kaggle, email
lib/
  cn.ts               Class-name merge helper
  gsap.ts             ScrollTrigger registration
public/
  resume/             Résumé served for the modal viewer
```

### Design tokens

All colours, radii and fonts live in the `@theme` block at the top of `app/globals.css`.
Changing `--color-accent` restyles every button, glow and highlight on the site.

| Token | Value | Use |
| --- | --- | --- |
| `void` | `#050507` | Page background |
| `surface` | `#0E0E12` | Cards |
| `line` | `#241A33` | 1px borders |
| `accent` | `#A855F7` | Primary purple |
| `accent-deep` | `#7C3AED` | Gradients and shadows |
| `accent-soft` | `#2A1646` | Pills, active states |
| `ink` | `#F2F2F7` | Body text |
| `muted` | `#A1A1AA` | Secondary text |

Fonts: **Inter** (body/UI) and **Audiowide** (display accents), loaded through `next/font`.

---

## Editing content

From Phase 3 onward, all copy lives in typed files under `data/` — `about.ts`, `experience.ts`,
`projects.ts`, `skills.ts`, `certs.ts`, `profiles.ts` — so no component edits are needed for
routine updates.

**Placeholders** are marked with `PLACEHOLDER` or `TODO` in the source and render as visibly
labelled placeholders in the UI. No metrics, links or quotes are invented.

---

## Hero and navigation behaviour

- The cycling **DESIGNER → DEVELOPER → PROGRAMMER → AI BUILDER** word types with a short
  chromatic glitch and reserves its line box with the longest word, so nothing shifts.
- Four decorative bubbles float and follow the pointer at different depths; they are hidden below
  `md` and ignored by assistive tech.
- The navbar highlights the section nearest the upper third of the viewport and exposes
  `aria-current="location"`. On mobile it becomes a glass dropdown that closes on Escape, outside
  click or selection.
- **Resume** opens a focus-trapped dialog with the PDF in an iframe, plus new-tab and download
  fallbacks. Escape closes it, body scroll locks, and focus returns to the trigger.
- The starfield imports Three.js only after hydration, caps device pixel ratio, pauses on hidden
  tabs and renders a single static frame under reduced motion.

## About, experience and projects

- **About** is a centred glass card with draft copy (marked in the UI until `about.draft` is set
  to `false`) and a three-fact stat row that counts up when it enters the viewport.
- **Experience** alternates cards around a vertical line that draws itself with ScrollTrigger;
  the outlined 01–04 numerals are decorative and the list is a real ordered list.
- **Projects** open a focus-trapped case-study dialog: problem, role, architecture placeholder,
  stack, challenges, results, screenshot gallery with lightbox, and a demo slot. “Live demo” and
  “GitHub” only appear when a real URL exists in `data/projects.ts`; Bursarly and Zehni Sukoon now
  link to their deployed demos and repositories.
- Missing screenshots, diagrams, videos and links render as labelled placeholders; add files under
  `public/projects/<id>/` and fill the matching field in `data/projects.ts`.

## Skills, certs, profiles and contact

- **Skills** filters 30 tools across Languages, Frontend, Backend, ML & Data, Databases and Tools.
  Icons come from the devicon CDN; a two-letter monogram is used where no icon exists. Tiles
  re-layout with Framer Motion when the filter changes.
- **Certs** shows each certificate with its issuer and date. The AI Hackathon certificate uses the
  supplied image and opens in a lightbox; certificates without a supplied image or verification URL
  keep their labelled placeholders.
- **Profiles** lists LinkedIn, GitHub, Kaggle and email. Kaggle shows “Link pending” until a
  public URL is added in `data/profiles.ts`.
- **Contact** validates name, email and message inline, hides a honeypot field, and announces
  every result through an `aria-live` status region.

### Contact form delivery

The form posts JSON to the Formspree endpoint in `NEXT_PUBLIC_CONTACT_ENDPOINT`. Create a free
Formspree form, copy its endpoint (`https://formspree.io/f/xxxxxxx`), then add it to `.env.local`
and to the Vercel project's environment variables:

```bash
NEXT_PUBLIC_CONTACT_ENDPOINT=https://formspree.io/f/your-form-id
```

Without that variable the form says delivery is not configured and offers the email address —
it never reports a message as sent when nothing was sent.

## Accessibility and motion

- Semantic landmarks, a skip link, visible `:focus-visible` rings and AA-contrast text.
- `prefers-reduced-motion` disables reveals, the trailing cursor and ambient drift; content stays
  fully readable.
- Scroll reveals have a no-JS fallback and a safety timeout so text is never trapped at opacity 0.

---

## Deployment (free, Vercel)

The repository is Vercel-ready: Next.js is auto-detected, `npm run build` is the build step, and
`package.json` declares Node.js 20+.

1. Push this folder to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new), import the repository and accept the detected
   Next.js defaults (`npm install`, `npm run build`).
3. Add these Environment Variables in **Vercel → Project → Settings → Environment Variables**:
   - `NEXT_PUBLIC_SITE_URL` — the production URL Vercel assigns (no trailing slash). This drives
     canonical metadata, Open Graph URLs, JSON-LD, `robots.txt` and `sitemap.xml`.
   - `NEXT_PUBLIC_CONTACT_ENDPOINT` — optional Formspree endpoint for contact delivery. Without
     it the form honestly reports that delivery is not configured.
4. Redeploy after adding or changing either variable.

`.env.example` lists both variables for local reference. `NEXT_PUBLIC_SITE_URL` defaults to
`https://amna-javed.vercel.app` in `data/site.ts`, so set the real assigned URL before launch.

Project screenshots go in `public/projects/<id>/` and are listed in `data/projects.ts`; the demo
video takes an unlisted YouTube embed URL in the same file. The AI Hackathon certificate image is
served from `public/certs/ai-hackathon-2026.webp`.
