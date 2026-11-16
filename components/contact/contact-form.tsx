"use client";

import { useId, useState, type FormEvent } from "react";
import { site } from "@/data/site";
import { Button } from "@/components/ui/button";

/**
 * Delivery is delegated to a Formspree endpoint set in
 * NEXT_PUBLIC_CONTACT_ENDPOINT. Without one the form says so instead of
 * pretending the message was sent.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? "";

type Status = "idle" | "sending" | "success" | "error" | "unconfigured";
type FieldErrors = { name?: string; email?: string; message?: string };

const fieldClass =
  "w-full border-b border-line bg-transparent py-3 text-sm text-ink placeholder:text-muted/50 transition-colors focus:border-accent focus:outline-none";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const ids = {
    name: useId(),
    email: useId(),
    message: useId(),
    status: useId(),
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot: a real person never fills this hidden field.
    if (String(data.get("company") ?? "").trim()) {
      setStatus("success");
      form.reset();
      return;
    }

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const nextErrors: FieldErrors = {};
    if (name.length < 2) nextErrors.name = "Tell me what to call you.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      nextErrors.email = "Enter an email address I can reply to.";
    }
    if (message.length < 10) nextErrors.message = "A sentence or two is plenty.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("idle");
      return;
    }

    if (!ENDPOINT) {
      setStatus("unconfigured");
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!response.ok) throw new Error(`Request failed with ${response.status}`);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label
            htmlFor={ids.name}
            className="text-[0.5625rem] uppercase tracking-[0.2em] text-muted"
          >
            Name
          </label>
          <input
            id={ids.name}
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${ids.name}-error` : undefined}
            placeholder="Your name"
            className={fieldClass}
          />
          {errors.name ? (
            <p id={`${ids.name}-error`} className="mt-2 text-xs text-rose-300">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div className="sm:col-span-1">
          <label
            htmlFor={ids.email}
            className="text-[0.5625rem] uppercase tracking-[0.2em] text-muted"
          >
            Email
          </label>
          <input
            id={ids.email}
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${ids.email}-error` : undefined}
            placeholder="you@example.com"
            className={fieldClass}
          />
          {errors.email ? (
            <p id={`${ids.email}-error`} className="mt-2 text-xs text-rose-300">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor={ids.message}
            className="text-[0.5625rem] uppercase tracking-[0.2em] text-muted"
          >
            Message
          </label>
          <textarea
            id={ids.message}
            name="message"
            rows={4}
            required
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? `${ids.message}-error` : undefined}
            placeholder="What are you building, and where could I help?"
            className={`${fieldClass} resize-none`}
          />
          {errors.message ? (
            <p id={`${ids.message}-error`} className="mt-2 text-xs text-rose-300">
              {errors.message}
            </p>
          ) : null}
        </div>
      </div>

      {/* Honeypot — visually hidden and skipped by keyboard and screen readers. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor={`${ids.name}-company`}>Company</label>
        <input
          id={`${ids.name}-company`}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <Button type="submit" variant="primary" size="md" withArrow disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send message"}
        </Button>
        <a
          href={`mailto:${site.email}`}
          className="text-[0.625rem] uppercase tracking-[0.16em] text-muted underline underline-offset-4 transition-colors hover:text-ink"
        >
          Or email directly
        </a>
      </div>

      <div
        id={ids.status}
        aria-live="polite"
        role="status"
        className="mt-5 min-h-[1.25rem] text-xs leading-relaxed"
      >
        {status === "success" ? (
          <p className="text-emerald-300">Message sent — thanks, I&apos;ll reply by email.</p>
        ) : null}
        {status === "error" ? (
          <p className="text-rose-300">
            Something went wrong sending that. Try again, or email{" "}
            <a href={`mailto:${site.email}`} className="underline underline-offset-2">
              {site.email}
            </a>
            .
          </p>
        ) : null}
        {status === "unconfigured" ? (
          <p className="text-muted">
            This form isn&apos;t connected to a delivery service yet. Email{" "}
            <a href={`mailto:${site.email}`} className="text-accent underline underline-offset-2">
              {site.email}
            </a>{" "}
            directly, or set <code className="text-[0.6875rem]">NEXT_PUBLIC_CONTACT_ENDPOINT</code>{" "}
            to a Formspree endpoint.
          </p>
        ) : null}
      </div>
    </form>
  );
}
