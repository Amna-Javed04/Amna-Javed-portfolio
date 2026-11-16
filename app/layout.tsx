import type { Metadata, Viewport } from "next";
import { Audiowide, Inter } from "next/font/google";
import { site } from "@/data/site";
import { AmbientBackground, NoiseOverlay } from "@/components/chrome/ambient-background";
import { CustomCursor } from "@/components/chrome/custom-cursor";
import { ScrollProgress } from "@/components/chrome/scroll-progress";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ResumeProvider } from "@/components/resume/resume-provider";
import { Starfield } from "@/components/three/starfield-lazy";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-audiowide",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: `${site.name} Portfolio`,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    "Amna Javed",
    "frontend developer",
    "web developer portfolio",
    "machine learning",
    "AI engineer intern",
    "Computer Science student Pakistan",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: `${site.name} — Portfolio`,
    title: `${site.name} — ${site.role}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: site.url },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  email: `mailto:${site.email}`,
  jobTitle: site.role,
  description: site.description,
  address: {
    "@type": "PostalAddress",
    addressCountry: "PK",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: site.education.institution,
  },
  sameAs: site.socials
    .map((social) => social.href)
    .filter((href) => href.startsWith("http")),
};

export const viewport: Viewport = {
  themeColor: "#050507",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

/**
 * Scroll-reveal content is hidden only under `@media (scripting: enabled)`,
 * so it stays visible for no-JS visitors without a hydration mismatch.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${audiowide.variable}`}>
      <body className="min-h-dvh antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only z-[110] rounded-pill bg-accent px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#14081f] focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Starfield />
        <AmbientBackground />
        <ScrollProgress />
        <CustomCursor />
        <ResumeProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
        </ResumeProvider>
        <NoiseOverlay />
      </body>
    </html>
  );
}
