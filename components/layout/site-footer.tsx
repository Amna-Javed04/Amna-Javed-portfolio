import { site } from "@/data/site";
import { profiles } from "@/data/profiles";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const links = profiles.items.filter((profile) => profile.href && profile.id !== "email");

  return (
    <footer className="border-t border-line/60 bg-[#07070a]/60">
      <div className="container-page py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <a href="#home" className="inline-flex items-baseline gap-2.5">
              <span className="grid size-8 place-items-center rounded-lg border border-accent/40 bg-accent-soft/60 font-display text-[0.625rem] text-ink">
                AJ
              </span>
              <span className="text-sm font-semibold tracking-tight text-ink">{site.name}</span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{site.tagline}</p>
            <p className="mt-4 text-[0.625rem] uppercase tracking-[0.18em] text-muted/60">
              {site.location} · {profiles.handle}
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="eyebrow text-[0.5625rem]">Sections</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-[0.6875rem] uppercase tracking-[0.12em] text-muted transition-colors hover:text-ink"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow text-[0.5625rem]">Elsewhere</p>
            <ul className="mt-4 space-y-2.5">
              {links.map((profile) => (
                <li key={profile.id}>
                  <a
                    href={profile.href ?? "#"}
                    {...(profile.href?.startsWith("http")
                      ? { target: "_blank", rel: "noreferrer noopener" }
                      : {})}
                    className="text-[0.6875rem] uppercase tracking-[0.12em] text-muted transition-colors hover:text-ink"
                  >
                    {profile.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-[0.6875rem] uppercase tracking-[0.12em] text-muted transition-colors hover:text-ink"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line/50 pt-6 text-[0.625rem] text-muted/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>Next.js · TypeScript · Tailwind CSS · GSAP · Three.js</p>
        </div>
      </div>
    </footer>
  );
}
