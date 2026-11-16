"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { site } from "@/data/site";
import { Button } from "@/components/ui/button";
import { useResume } from "@/components/resume/resume-provider";
import { IconClose, IconMenu } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

export function SiteHeader() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const shellRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const { openResume } = useResume();
  const reduceMotion = useReducedMotion();

  // Scroll-spy: the last section whose top has crossed the upper third wins.
  useEffect(() => {
    const sections = site.nav
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((element): element is HTMLElement => element !== null);

    if (sections.length === 0) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const probe = window.innerHeight * 0.38;
      let current = sections[0]?.id ?? "home";
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= probe) current = section.id;
      }
      setActive((previous) => (previous === current ? previous : current));
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  // Escape and outside-click close the mobile menu.
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.offsetParent !== null);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!shellRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    const focusFrame = window.requestAnimationFrame(() => {
      panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    });

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      window.cancelAnimationFrame(focusFrame);
    };
  }, [menuOpen]);

  const selectSection = (id: string) => {
    setActive(id);
    setMenuOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-[80] pt-3 sm:pt-4">
      <div className="container-page">
        <div ref={shellRef} className="relative mx-auto w-full max-w-5xl">
          <nav
            aria-label="Primary"
            className="flex items-center justify-between gap-2 rounded-pill border border-line/80 bg-[#08080c]/85 p-2 pl-2.5 shadow-[0_16px_50px_-24px_rgba(0,0,0,0.9)] backdrop-blur-xl"
          >
            <a
              href="#home"
              onClick={() => selectSection("home")}
              aria-label={`${site.name} — home`}
              className="group flex items-center gap-2.5 rounded-pill py-1 pl-1 pr-2"
            >
              <span className="grid size-8 place-items-center rounded-full border border-accent/40 bg-accent/10 font-display text-[0.6rem] text-accent transition-colors group-hover:border-accent/70 group-hover:bg-accent/20">
                AJ
              </span>
              <span className="hidden text-xs font-medium tracking-tight text-ink sm:block">
                {site.name}
              </span>
            </a>

            <ul className="hidden items-center gap-0.5 lg:flex">
              {site.nav.map((item) => {
                const id = item.href.slice(1);
                const isActive = active === id;
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => selectSection(id)}
                      aria-current={isActive ? "location" : undefined}
                      className={cn(
                        "relative flex items-center gap-1.5 rounded-pill px-2.5 py-2 text-[0.625rem] font-medium uppercase tracking-[0.13em] transition-colors duration-200",
                        isActive
                          ? "bg-accent-soft text-ink"
                          : "text-muted hover:bg-white/[0.04] hover:text-ink",
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "size-1 rounded-full bg-accent transition-opacity duration-200",
                          isActive ? "opacity-100" : "opacity-0",
                        )}
                      />
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="sm"
                onClick={openResume}
                className="hidden px-4 py-2.5 text-[0.5625rem] sm:inline-flex"
              >
                Resume
              </Button>
              <button
                ref={menuButtonRef}
                type="button"
                onClick={() => setMenuOpen((value) => !value)}
                aria-expanded={menuOpen}
                aria-controls="mobile-nav"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                className="grid size-9 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent/50 hover:text-ink lg:hidden"
              >
                {menuOpen ? <IconClose className="size-4" /> : <IconMenu className="size-4" />}
              </button>
            </div>
          </nav>

          <AnimatePresence>
            {menuOpen ? (
              <motion.div
                ref={panelRef}
                id="mobile-nav"
                initial={{ opacity: 0, y: reduceMotion ? 0 : -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
                transition={{ duration: reduceMotion ? 0 : 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-x-0 top-[calc(100%+0.5rem)] rounded-[26px] border border-line bg-[#08080c]/95 p-3 shadow-[0_30px_80px_-30px_rgba(0,0,0,1)] backdrop-blur-xl"
              >
                <ul className="grid grid-cols-2 gap-1">
                  {site.nav.map((item, index) => {
                    const id = item.href.slice(1);
                    const isActive = active === id;
                    return (
                      <li key={item.href}>
                        <a
                          href={item.href}
                          onClick={() => selectSection(id)}
                          aria-current={isActive ? "location" : undefined}
                          className={cn(
                            "flex items-center justify-between rounded-2xl px-3.5 py-3 text-[0.6875rem] uppercase tracking-[0.13em] transition-colors",
                            isActive
                              ? "bg-accent-soft text-ink"
                              : "text-muted hover:bg-white/[0.04] hover:text-ink",
                          )}
                        >
                          {item.label}
                          <span aria-hidden="true" className="font-display text-[0.5rem] text-accent/50">
                            0{index + 1}
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setMenuOpen(false);
                    openResume();
                  }}
                  className="mt-2 w-full"
                >
                  View Resume
                </Button>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
