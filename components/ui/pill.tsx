import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type PillProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: "accent" | "outline" | "muted" | "success";
  size?: "sm" | "md";
};

const variants = {
  accent: "border border-accent/30 bg-accent-soft/70 text-[#e9d5ff]",
  outline: "border border-line-bright/70 bg-white/[0.03] text-muted",
  muted: "border border-line/80 bg-surface text-muted",
  success: "border border-emerald-400/25 bg-emerald-400/10 text-emerald-300",
} as const;

export function Pill({ className, variant = "outline", size = "sm", ...props }: PillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill font-medium",
        size === "sm" ? "px-3 py-1 text-[0.6875rem]" : "px-4 py-1.5 text-xs",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
