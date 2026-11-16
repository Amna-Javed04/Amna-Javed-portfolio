import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  /** Lifts and glows on hover — use for clickable cards only. */
  interactive?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
};

const paddings = {
  none: "",
  sm: "p-5",
  md: "p-6 sm:p-8",
  lg: "p-8 sm:p-10",
} as const;

export function Card({ className, interactive = false, padding = "md", ...props }: CardProps) {
  return (
    <div
      className={cn(
        "glass-card glow-hover relative",
        paddings[padding],
        interactive && "transition-transform duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-1",
        className,
      )}
      {...props}
    />
  );
}
