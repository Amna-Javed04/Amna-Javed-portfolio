"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { site } from "@/data/site";
import { IconClose, IconDownload, IconExternal } from "@/components/ui/icons";

type ResumeContextValue = { openResume: () => void };

const ResumeContext = createContext<ResumeContextValue | null>(null);

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) throw new Error("useResume must be used inside <ResumeProvider>");
  return context;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])';

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const openResume = useCallback(() => {
    setLoaded(false);
    setOpen(true);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  // Escape, focus trap, scroll lock and focus restoration.
  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const panel = panelRef.current;
    const initial = panel?.querySelector<HTMLElement>("[data-autofocus]");
    initial?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }

      if (event.key !== "Tab" || !panel) return;
      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null,
      );
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

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [open, close]);

  const duration = reduceMotion ? 0 : 0.3;

  return (
    <ResumeContext.Provider value={{ openResume }}>
      {children}
      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[120] flex items-end justify-center p-0 sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
          >
            <button
              type="button"
              aria-hidden="true"
              tabIndex={-1}
              onClick={close}
              className="absolute inset-0 cursor-default bg-[#030305]/85 backdrop-blur-md"
            />
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="resume-title"
              className="relative flex h-[92dvh] w-full max-w-4xl flex-col overflow-hidden rounded-t-[26px] border border-line bg-[#0a0a0f] shadow-[0_-10px_80px_-20px_rgba(168,85,247,0.35)] sm:h-[86dvh] sm:rounded-[26px]"
              initial={{ y: reduceMotion ? 0 : 26, opacity: 0, scale: reduceMotion ? 1 : 0.985 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: reduceMotion ? 0 : 18, opacity: 0 }}
              transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center justify-between gap-3 border-b border-line/80 px-4 py-3.5 sm:px-5">
                <div className="min-w-0">
                  <p className="eyebrow text-[0.5625rem]">Résumé · PDF</p>
                  <h2
                    id="resume-title"
                    className="mt-1 truncate text-sm font-semibold tracking-tight text-ink sm:text-base"
                  >
                    {site.name} — {site.role}
                  </h2>
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                  <a
                    href={site.resumePath}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="hidden items-center gap-1.5 rounded-pill border border-line px-3 py-2 text-[0.625rem] uppercase tracking-[0.14em] text-muted transition-colors hover:border-accent/50 hover:text-ink sm:inline-flex"
                  >
                    <IconExternal className="size-3.5" />
                    New tab
                  </a>
                  <a
                    href={site.resumePath}
                    download
                    className="inline-flex items-center gap-1.5 rounded-pill border border-line px-3 py-2 text-[0.625rem] uppercase tracking-[0.14em] text-muted transition-colors hover:border-accent/50 hover:text-ink"
                  >
                    <IconDownload className="size-3.5" />
                    <span className="hidden sm:inline">Download</span>
                  </a>
                  <button
                    type="button"
                    onClick={close}
                    data-autofocus
                    className="grid size-9 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent/60 hover:text-ink"
                    aria-label="Close résumé viewer"
                  >
                    <IconClose className="size-4" />
                  </button>
                </div>
              </div>

              <div className="relative flex-1 bg-[#141419]">
                {!loaded ? (
                  <div className="absolute inset-0 grid place-items-center" aria-hidden="true">
                    <p className="animate-pulse text-[0.6875rem] uppercase tracking-[0.24em] text-muted">
                      Loading résumé…
                    </p>
                  </div>
                ) : null}
                <iframe
                  src={`${site.resumePath}#view=FitH`}
                  title={`${site.name} résumé (PDF)`}
                  onLoad={() => setLoaded(true)}
                  className="relative h-full w-full"
                />
              </div>

              <p className="border-t border-line/80 px-4 py-2.5 text-center text-[0.625rem] leading-relaxed text-muted sm:px-5">
                Viewer not rendering?{" "}
                <a
                  href={site.resumePath}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-accent underline underline-offset-2 hover:text-[#c084fc]"
                >
                  Open the PDF in a new tab
                </a>
                .
              </p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </ResumeContext.Provider>
  );
}
