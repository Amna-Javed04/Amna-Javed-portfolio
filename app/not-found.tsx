import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="container-page flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <p className="eyebrow">404 · Page not found</p>
      <h1 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.02em] text-ink sm:text-4xl">
        That page drifted out of orbit.
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
        The link you followed doesn&apos;t exist here. Head back home and keep exploring.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-pill border border-accent/45 bg-accent/[0.06] px-5 py-2.5 text-[0.625rem] uppercase tracking-[0.16em] text-ink transition-colors hover:border-accent/80 hover:bg-accent/[0.12]"
      >
        Back home
      </Link>
    </main>
  );
}
